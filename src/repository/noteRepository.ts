import { notesApi } from "@/api/notesApi"
import { Debouncer } from "@/Debouncer";
import type { Note } from "@/model/Note"
import { ref, type Ref } from "vue";


function createNoteRepository() {
  const notes = ref<Note[]>([]);
  const noteUpdater = new Debouncer<Note>(500, async (note) => {
    await notesApi.updateNote(note);
    const idx = notes.value.findIndex((note0) => note0.id === note.id);
    if (idx > -1) {
      notes.value[idx] = note;
    } else {
      notes.value.push(note);
    }
  });

  notesApi.getNotes().then((result) => {
    notes.value = result
  });

  return {
    getNote(id: string): Promise<Note> {
      return notesApi.getNote(id);
    },
    updateNote(note: Note): void {
      noteUpdater.update(note);
    },
    async generateId(): Promise<string> {
      return (await notesApi.generateId()).id;
    },
    getNotes(): Ref<Note[]> {
      return notes;
    }
  }
}

export const noteRepository = createNoteRepository();
