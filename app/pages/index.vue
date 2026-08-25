<script setup lang="ts">
import {executeProgram, initHardware} from "~/script/machine.ts";
import {parseProgram} from "~/script/parsing.ts";
import {samples} from "~/script/samples.ts";

const hardware = ref(initHardware());
const code = useLocalStorage("asm-code", "");
const output = ref<string>("");

const running = ref(false);

function runProgram() {
  running.value = true;
  hardware.value = initHardware();
  output.value = "";
  const program = parseProgram(code.value);
  executeProgram(program, hardware.value, s => output.value += s);
  running.value = false;
}
</script>

<template>
  <div class="page">
    <div class="section editor-section">
      <div class="editor-buttons">
        <NiceButton @click="runProgram()" inverted>Run code</NiceButton>
        <NiceButton v-for="(sample, i) in samples" @click="code = sample">Sample {{i + 1}}</NiceButton>
      </div>
      <Editor v-model="code" @run-code="runProgram" class="editor"/>
    </div>

    <div class="section info-section">
      <div class="title">Machine info</div>
      <div>Program counter: {{ hardware.programCounter }}</div>
      <div>
        <div class="title">Registers:</div>
        <MemoryTable :values="hardware.registers" :titles="hardware.registers.map((_, i) => 'r' + i)"/>
      </div>
      <div v-if="hardware.stack.length > 0">
        <div class="title">Stack:</div>
        <MemoryTable :values="hardware.stack"/>
      </div>
      <div>
        <div class="title">Heap:</div>
        <MemoryTable :values="hardware.heap"/>
      </div>
    </div>

    <div class="section output-section">
      Output:
      <div class="output-box">
        {{ output }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  width: 100vw;
  height: 100vh;
  padding: 1rem;

  .section {
    flex-grow: 1;
    overflow: auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.editor-section {
  .editor {
    flex-grow: 1;
    resize: none;
  }

  .editor-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}

.info-section {
  .title {
    font-weight: bold;
    margin-block: 0.5rem;
  }
}

.output-section {
  .output-box {
    flex-grow: 1;
    text-wrap: nowrap;
    white-space: pre;
    padding: var(--spacing);
    background: var(--col-bg-dark);
    border-radius: var(--radius);
    overflow: auto;
  }
}

table {
  text-align: center;
}
</style>