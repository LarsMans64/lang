<script setup lang="ts">
import {executeProgram, initHardware} from "~/script/machine.ts";
import {parseProgram} from "~/script/parsing.ts";
import {manual, samples} from "~/script/samples.ts";

const hardware = ref(initHardware());
const code = useLocalStorage("asm-code", "");
const output = ref<string>("");
const cooldownFactor = useLocalStorage<number>("asm-cooldown", 8);
const cooldown = computed(() => cooldownFactor.value == -1 ? 0 : 2 ** cooldownFactor.value);

const running = ref(false);

function runProgram() {
  running.value = true;
  hardware.value = initHardware();
  output.value = "";
  const program = parseProgram(code.value);
  executeProgram(program, hardware.value, s => output.value += s, cooldown);
  running.value = false;
}
</script>

<template>
  <div class="page">
    <div class="section editor-section">
      <div class="editor-buttons">
        <NiceButton @click="runProgram" inverted>Run code</NiceButton>
        <NiceButton v-for="(sample, i) in samples" @click="code = sample">Sample {{i + 1}}</NiceButton>
      </div>
      <Editor v-model="code" @run-code="runProgram" class="editor"/>
    </div>

    <div class="section info-section">
      <div class="title">Machine</div>
      <div class="setting">
        <input type="range" v-model="cooldownFactor" min="-1" max="11">
        {{cooldown}} ms instruction delay
      </div>
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
      <div>
        <div class="title">Instructions:</div>
        <div v-for="section in manual" class="instructions-section">
          <div class="instructions-title">{{section.title}}</div>
          <div v-for="line in section.instructions">
            <span class="instruction-head">{{ line.head }}</span> <span class="instruction-args">{{line.args}}</span>
          </div>
        </div>
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

  .setting {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .instructions-section {
    margin-bottom: 1rem;

    .instructions-title {
      font-weight: bold;
    }

    .instruction-args {
      color: #79d4f9;
      white-space: pre;
    }
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