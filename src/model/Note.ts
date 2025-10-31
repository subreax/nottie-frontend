import type { Tag } from "./Tag";

export interface Note {
  id: string,
  title: string,
  content: string,
  tags: Tag[],
  lastEdit: Date
}

export function emptyNote(): Note {
  return {
    id: '', 
    title: '', 
    content: '', 
    tags: [], 
    lastEdit: new Date()
  };
}
