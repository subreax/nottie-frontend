import type { Component } from "vue";
import PlusIcon from "./PlusIcon.vue";
import TagIcon from "./TagIcon.vue";
import type { TagIconId } from "@/model/Tag";



const icons2components: Record<TagIconId, Component> = {
  'default': TagIcon,
  'plus': PlusIcon
};

export function resolveTagIcon(icon: TagIconId): Component {
  return icons2components[icon];
}
