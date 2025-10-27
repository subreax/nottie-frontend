import type { Note } from "./Note";

export interface NoteDto {
  title: string,
  content: string
}

const BASE_URL = 'http://localhost:3000'


export abstract class Api {
  abstract getNote(id: string): Promise<Note>
  abstract updateNote(note: Note): Promise<void>
  abstract createNote(): Promise<Note>

  abstract getNotes(): Promise<Note[]>
}


export class BackendApi extends Api {
  getNote(id: string): Promise<Note> {
    return new Promise(async (resolve) => {
      const raw = await fetch(`${BASE_URL}/notes/${id}`);
      resolve(await raw.json());
    });
  }
  updateNote(note: Note): Promise<void> {
    return new Promise(async (resolve) => {
      const raw = await fetch(`${BASE_URL}/notes/${note.id}`, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      });
      resolve(await raw.json());
    });
  }
  createNote(): Promise<Note> {
    return new Promise(async (resolve) => {
      const raw = await fetch(`${BASE_URL}/notes/new`);
      resolve(await raw.json());
    });
  }

  getNotes(): Promise<Note[]> {
    return new Promise(async (resolve) => {
      const raw = await fetch(`${BASE_URL}/notes`);
      resolve(await raw.json());
    });
  }
}
