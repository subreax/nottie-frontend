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

    this.changeNotes((notes) => {
      if (idx !== null) {
        notes[idx] = note;
      } else {
        notes.push(note);
      }
      return notes;
    })
  }

  addNote(note: Note) {
    const existingNoteIdx = this.findIndexById(note.id);

    this.changeNotes((notes) => {
      if (existingNoteIdx) {
        notes[existingNoteIdx] = note;
      } else {
        notes.push(note);
      }
      return notes;
    });
  }

  deleteNote(note: Note) {
    this.notes.value = this.notes.value.filter((n) => n.id !== note.id);
  }

  replaceAll(newNotes: Note[]) {
    this.notes.value = newNotes.sort(noteComparator);
  }

  private changeNotes(onChange: (clonedNotes: Note[]) => Note[]) {
    /* todo: is it required to clone note array in order to avoid unnecessary reactive updates? */
    this.notes.value = onChange([ ...this.notes.value ])
      .sort(noteComparator);
  }
}

function noteComparator(a: Note, b: Note): number {
  return b.lastEdit.getTime() - a.lastEdit.getTime();
}
