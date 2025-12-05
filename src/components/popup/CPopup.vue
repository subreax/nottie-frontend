<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";
import CIconButton from "../CIconButton.vue";
import Icon from "../icons/Icon.vue";
import type { IconId } from "../icons/IconRegister";

interface Props {
  icon: IconId;
  visible: boolean;
}

const props = defineProps<Props>();
const popupItemsStyle = ref("");
const btnEl = useTemplateRef("button");
const popupEl = useTemplateRef("popup");

let isDismissListenerSet = false;

const emit = defineEmits<{
  onToggle: [visible: boolean];
}>();

function toggleVisibility(e: Event) {
  e.stopPropagation();
  emit("onToggle", !props.visible);
}

function dismissIfClickedOutside(e: MouseEvent) {
  if (!isElementChildOfPopup(e.target!)) {
    emit("onToggle", false);
  }
}

function isElementChildOfPopup(el: EventTarget): boolean {
  if (el === popupEl.value) {
    return true;
  } else if (!(el instanceof Element)) {
    return false;
  } else if (el === document.body) {
    return false;
  } else if (el.parentElement === null) {
    return false;
  } else {
    return isElementChildOfPopup(el.parentElement);
  }
}

function setDismissListener() {
  if (!isDismissListenerSet) {
    document.addEventListener("click", dismissIfClickedOutside);
  }
}

function clearDismissListener() {
  if (isDismissListenerSet) {
    document.removeEventListener("click", dismissIfClickedOutside);
  }
}

watch(props, () => {
  if (props.visible) {
    const rect = btnEl.value!.getBoundingClientRect();
    popupItemsStyle.value = `top: ${rect.y + rect.height}px; left: ${rect.x
      }px;`;
    setDismissListener();
  } else {
    clearDismissListener();
  }
});
</script>

<template>
  <div ref="button">
    <CIconButton @click="(e: Event) => toggleVisibility(e)">
      <Icon :icon-id="icon" :size="24" />
    </CIconButton>

    <template v-if="visible">
      <Teleport to="body">
        <div class="popup" ref="popup" :style="popupItemsStyle">
          <div class="popup-inner">
            <slot></slot>
          </div>
        </div>
      </Teleport>
    </template>
  </div>
</template>

<style scoped>
.popup {
  position: absolute;
  padding: 8px;
  margin: 0;
  list-style: none;
  background-color: var(--color-base10);
  border-radius: 8px;

  display: inline-flex;

  box-shadow: 0 0 25px var(--color-base03);
}
</style>
