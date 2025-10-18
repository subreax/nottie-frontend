import type { Note } from "./Note";

export interface NoteDto {
  title: string,
  content: string
}

const BASE_URL = 'http://localhost:3000'


export abstract class Api {
  abstract getNote(): Promise<Note>
  abstract updateNote(note: Note): Promise<void>
}


export class BackendApi extends Api {
  getNote(): Promise<Note> {
    return new Promise(async (resolve) => {
      const raw = await fetch(`${BASE_URL}/note`);
      resolve(await raw.json());
    });
  }
  updateNote(note: Note): Promise<void> {
    console.log("updateNote");
    return new Promise(async (resolve) => {
      const raw = await fetch(`${BASE_URL}/note`, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      });
      resolve(await raw.json());
    });
  }
}
