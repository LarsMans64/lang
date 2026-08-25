<script setup lang="ts">

defineProps<{
  inverted?: boolean
}>();
</script>

<template>
  <button :class="{inverted}">
    <slot/>
  </button>
</template>

<style scoped>
button {
  background: var(--col-bg-light);
  border-radius: 100vw;
  border: none;
  cursor: pointer;
  font-size: inherit;
  padding: 0.3rem 0.8rem;

  &:hover {
    background: var(--col-bg-lighter);
  }

  &.inverted {
    background: var(--col-text);
    color: var(--col-bg);
    font-weight: bold;

    &:hover {
      /*color: var(--col-bg-lighter);*/
      background: white;
    }
  }
}
</style>