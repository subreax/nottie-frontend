import type { Component } from "vue";
import AddNoteIcon from "./AddNoteIcon.vue";
import ChevronBackwardIcon from "./ChevronBackwardIcon.vue";
import FilterIcon from "./FilterIcon.vue";
import PlusIcon from "./PlusIcon.vue";
import SearchIcon from "./SearchIcon.vue";
import ShareIcon from "./ShareIcon.vue";
import TagIcon from "./TagIcon.vue";


export type IconId = 
  | 'add-note' 
  | 'chevron-backward' 
  | 'filter' 
  | 'plus'
  | 'search'
  | 'share'
  | 'tag'

const icons2components: Record<IconId, Component> = {
  'add-note': AddNoteIcon,
  'chevron-backward': ChevronBackwardIcon,
  'filter': FilterIcon,
  'plus': PlusIcon,
  'search': SearchIcon,
  'share': ShareIcon,
  'tag': TagIcon
}

export function resolveIcon(icon: IconId): Component {
  return icons2components[icon];
}

