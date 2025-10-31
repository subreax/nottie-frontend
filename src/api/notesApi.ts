import type { Note } from "@/model/Note";
import { http } from "./http";

export interface GenerateNoteIdDto {
  id: string
}

export const notesApi = {
  async getNote(id: string): Promise<Note> {
    return (await http.get(`/notes/${id}`)).data;
  },
  async updateNote(note: Note): Promise<Note> {
    return (await http.post(`/notes/${note.id}`, note)).data;
  },
  async generateId(): Promise<GenerateNoteIdDto> {
    return (await http.get('/notes/generate-id')).data;
  },
  async getNotes(): Promise<Note[]> {
    return (await http.get('/notes')).data;
  }
}
