import type { Note } from "@/model/Note";
import { http } from "./http";
import type { Tag } from "@/model/Tag";

interface NoteDto {
  id: string,
  title: string,
  content: string,
  tags: Tag[],
  lastEdit: number
}

export interface UpdateNoteReqDto {
  title?: string,
  content?: string,
  tags?: Tag[]
}

export interface GenerateNoteIdDto {
  id: string
}

export const notesApi = {
  async getNote(id: string): Promise<Note> {
    return (await http.get<Note>(`/notes/${id}`)).data;
  },
  async updateNote(id: string, dto: UpdateNoteReqDto): Promise<Note> {
    console.log(dto);
    return (await http.post<Note>(`/notes/${id}`, dto)).data;
  },
  async generateId(): Promise<GenerateNoteIdDto> {
    return (await http.get<GenerateNoteIdDto>('/notes/generate-id')).data;
  },
  async getNotes(): Promise<Note[]> {
    return (await http.get<NoteDto[]>('/notes')).data
      .map(dto => toModel(dto));
  }
}

function toModel(dto: NoteDto): Note {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    tags: dto.tags,
    lastEdit: new Date(dto.lastEdit)
  }
}
