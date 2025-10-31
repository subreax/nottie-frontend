export type TagIconId = 'default' | 'plus';

export interface Tag {
  id: string,
  text: string,
  iconId: TagIconId
}
