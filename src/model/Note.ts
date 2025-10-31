import type { Tag } from "./Tag";

export interface Note {
  id: string,
  title: string,
  content: string,
  tags: Tag[],
  lastEdit: Date
}
