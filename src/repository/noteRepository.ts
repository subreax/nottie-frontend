import { notesApi } from "@/api/notesApi"
import { Debouncer } from "@/Debouncer";
import type { Note } from "@/model/Note"
import { type Ref } from "vue";
import { NoteCache } from "./NoteCache";


class NoteRepository {
  private cache = new NoteCache();

  private noteUpdater = new Debouncer<Note>(500, async (note) => {
    const result = await notesApi.updateNote(note);
    this.cache.updateNote(result);
  });

  constructor() {
    this.refresh();
  }

  refresh() {
    notesApi.getNotes().then((notes) => this.cache.replaceAll(notes));
  }

  async getNote(id: string): Promise<Note> {
    const note = this.cache.findById(id);
    if (note) {
      return note;
    }

    const remoteNote = await notesApi.getNote(id);
    this.cache.addNote(remoteNote);
    return remoteNote;
  }

  updateNote(note: Note): void {
    this.noteUpdater.update(note);
  }

  async generateId(): Promise<string> {
    return (await notesApi.generateId()).id;
  }

  getNotes(): Ref<Note[]> {
    return this.cache.notes;
  }
}


export const noteRepository = new NoteRepository();
