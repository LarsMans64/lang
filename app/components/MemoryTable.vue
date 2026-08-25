<script setup lang="ts">
defineProps<{
  titles?: string[]
  values: number[]
}>();
</script>

<template>
  <div class="table">
    <div v-for="(value, i) in values" class="table-item">
      <div class="title">{{titles?.[i] ?? i}}</div>
      <div class="value" :class="{dark: value === 0}">{{value}}</div>
    </div>
  </div>
</template>

<style scoped>
.table {
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
  gap: -1px;

  --table-border: 2px solid var(--col-bg-lighter);
  border-bottom: var(--table-border);
  border-right: var(--table-border);

  .table-item {
    flex: 1 0 8ch;

    text-align: center;
    width: fit-content;
    border-top: var(--table-border);
    border-left: var(--table-border);

    .title {
      background-color: var(--col-bg-light);
      padding: 0 0.3rem;
      color: var(--col-text-light);
    }

    .value {
      padding: 0.3rem;

      &.dark {
        color: var(--col-text-lighter);
      }
    }
  }
}
</style>