<script setup lang="ts">
const area = useTemplateRef<HTMLTextAreaElement>("textarea");

const text: Ref<string> = defineModel<string>();

const emit = defineEmits<{
  runCode: () => void
}>()

function pressKey(e: KeyboardEvent) {
  if (e.key === "Tab" && text.value != null) {
    e.preventDefault();
    insertString("\t");
  } else if (e.key === "Enter" && e.ctrlKey) {
    e.preventDefault();
    emit("runCode");
  }
}

function insertString(str: string) {
  const selectionStart = area.value?.selectionStart;
  const selectionEnd = area.value?.selectionEnd;

  if (selectionStart == null || selectionEnd == null) return;

  text.value = text.value.slice(0, selectionStart) + str + text.value.slice(selectionEnd);
  nextTick(() => {
    area.value!.selectionStart = selectionStart + str.length;
    area.value!.selectionEnd = selectionStart + str.length;
  });
}
</script>

<template>
  <textarea v-model="text" @keydown="pressKey" ref="textarea"></textarea>
</template>

<style scoped>
textarea {
  tab-size: 4;
  overflow: auto;
  text-wrap: nowrap;

  background: var(--col-bg-dark);
  outline: none;
  border: none;
  border-radius: var(--radius);
  padding: var(--spacing);
}
</style>