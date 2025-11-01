import type { Note } from "@/model/Note";
import { ref } from "vue";

export class NoteCache {
  notes = ref<Note[]>([]);

  findById(id: string): Note | null {
    const idx = this.findIndexById(id);
    if (idx !== null) {
      return this.notes.value[idx]!;
    }
    return null;
  }

  findIndexById(id: string): number | null {
    const idx = this.notes.value.findIndex((note) => note.id === id);
    return idx >= 0 ? idx : null;
  }

  updateNote(note: Note) {
    const idx = this.findIndexById(note.id);
    if (idx !== null) {
      this.notes.value[idx] = note;
    }
    else {
      this.notes.value.push(note);
    }
  }

  addNote(note: Note) {
    this.notes.value.push(note);
  }

  replaceAll(newNotes: Note[]) {
    this.notes.value = newNotes;
  }
}