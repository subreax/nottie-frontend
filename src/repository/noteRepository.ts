import { notesApi } from "@/api/notesApi"
import { Debouncer } from "@/Debouncer";
import type { Note } from "@/model/Note"
import { type Ref } from "vue";
import { NoteCache } from "./NoteCache";
import type { Tag } from "@/model/Tag";
import { TaskQueue } from "@/utils/TaskQueue";


class NoteRepository {
  private requestQueue = new TaskQueue();
  private cache = new NoteCache();

  private noteUpdater = new Debouncer<{id: string, note: Note}>(500, async (data) => {
    await this.performUpdateNote(data.id, data.note);
  });

  constructor() {
    this.refresh();
  }

  refresh() {
    this.requestQueue.push(async () => {
      const notes = await notesApi.getNotes();
      this.cache.replaceAll(notes);
    });
  }

  getNote(id: string): Promise<Note> {
    return this.requestQueue.push<Note>(async () => {
      const note = this.cache.findById(id);
      if (note) {
        return note;
      }

      const remoteNote = await notesApi.getNote(id);
      this.cache.addNote(remoteNote);
      return remoteNote;
    });
  }

  updateNote(id: string, note: Note) {
    this.noteUpdater.update({
      id: id,
      note: note
    });
  }

  deleteNote(note: Note): Promise<boolean> {
    this.cache.deleteNote(note);
    return notesApi.deleteNote(note.id);
  }

  async generateId(): Promise<string> {
    return (await notesApi.generateId()).id;
  }

  getNotes(): Ref<Note[]> {
    return this.cache.notes;
  }

  private async performUpdateNote(id: string, note: Note) {
    const initialNote = await this.cache.findById(id);
    if (initialNote === null) {
      const result = await notesApi.updateNote(id, note);
      this.cache.updateNote(result);
    }
    else {
      const changes = this.getNoteChanges(initialNote, note);
      if (changes === null) {
        return;
      }
  
      const result = await notesApi.updateNote(id, changes);
      this.cache.updateNote(result);
    }
  }

  private getNoteChanges(initial: Note, changed: Note): Partial<Note> | null {
    const result: Partial<Note> = {};
    if (initial.title !== changed.title) {
      result.title = changed.title;
    }
    if (initial.content !== changed.content) {
      result.content = changed.content;
    }
    if (!this.areTagArraysEqual(initial.tags, changed.tags)) {
      result.tags = changed.tags;
    }

    if (Object.entries(result).length === 0) {
      return null;
    }

    return result;
  }
  
  private areTagArraysEqual(initial: Tag[], changed: Tag[]): boolean {
    if (initial.length !== changed.length) {
      return false;
    }
  
    for (const tag of changed) {
      if (initial.find((it) => this.areTagsEqual(it, tag)) === undefined) {
        return false;
      }
    }
    return true;
  }
  
  private areTagsEqual(a: Tag, b: Tag): boolean {
    const keys = Object.keys(a) as (keyof Tag)[];
    for (const key of keys) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
}

export const noteRepository = new NoteRepository();
