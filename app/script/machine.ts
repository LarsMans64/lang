import {
    type Computation,
    type ComputationType, type Destination,
    type Program, type Instruction,
    type Value
} from "~/script/ast.ts";

interface Hardware {
    programCounter: number
    registers: number[]
    heap: number[]
    stack: number[]
}

export function initHardware(): Hardware {
    const heap = [];
    for (let i = 0; i < 64; i++) {
        heap[i] = 0;
    }
    return {
        programCounter: 0,
        registers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        heap,
        stack: [],
    }
}

export async function executeProgram(program: Program, hardware: Hardware, logger: (s: string) => void) {
    while (true) {
        const instruction = program.instructions[hardware.programCounter];
        if (!instruction) {
            break;
        }

        executeInstruction(instruction);

        hardware.programCounter++;

        await sleep(50);
    }


    // --- Functions ---

    function executeInstruction(instruction: Instruction) {
        switch (instruction.type) {
            case "computation":
                executeComputation(instruction);
                break;
            case "move":
                putValueInRegister(evalValue(instruction.value), instruction.toRegister);
                break;
            case "stack-push":
                hardware.stack.push(evalValue(instruction.value));
                break;
            case "stack-pop":
                putValueInRegister(hardware.stack.pop() ?? 0, instruction.register);
                break;
            case "heap-store":
                hardware.heap.splice(evalValue(instruction.address), 1, evalValue(instruction.value));
                break;
            case "heap-load":
                putValueInRegister(hardware.heap[evalValue(instruction.address)] ?? 0, instruction.register)
                break;
            case "jump":
                hardware.programCounter = evalDestination(instruction.destination) - 1;
                break;
            case "branch":
                if (evalValue(instruction.value) != 0) {
                    hardware.programCounter = evalDestination(instruction.destination) - 1;
                }
                break;
            case "print":
                logger(String.fromCodePoint(evalValue(instruction.value)));
                break;
            case "debug":
                logger(`Line ${hardware.programCounter}: ${evalValue(instruction.value)}\n`);
                break;
        }
    }

    function executeComputation(computation: Computation) {
        const value1 = evalValue(computation.val1);
        const value2 = evalValue(computation.val2);

        putValueInRegister(evaluateComputation(computation.computation, value1, value2), computation.toRegister);
    }

    function evaluateComputation(type: ComputationType, val1: number, val2: number): number {
        switch (type) {
            case "add": return val1 + val2;
            case "sub": return val1 - val2;
            case "mul": return val1 * val2;
            case "eq": return val1 == val2 ? 1 : 0;
            case "neq": return val1 != val2 ? 1 : 0;
            case "gt": return val1 > val2 ? 1 : 0;
            case "lt": return val1 < val2 ? 1 : 0;
            case "gte": return val1 >= val2 ? 1 : 0;
            case "lte": return val1 <= val2 ? 1 : 0;
            case "and": return val1 != 0 && val2 != 0 ? 1 : 0;
            case "nand": return val1 == 0 && val2 == 0 ? 1 : 0;
            case "or": return val1 != 0 || val2 != 0 ? 1 : 0;
            case "nor": return val1 == 0 || val2 == 0 ? 1 : 0;
            case "xor": return (val1 == 0) != (val2 == 0) ? 1 : 0;
            case "xnor": return (val1 == 0) == (val2 == 0) ? 1 : 0;
        }
    }

    function putValueInRegister(value: number, register: number) {
        hardware.registers.splice(register, 1, value);
    }

    function evalValue(value: Value): number {
        switch (value.type) {
            case "literal": return value.value;
            case "register": return hardware.registers[value.value] ?? 0;
        }
    }

    function evalDestination(destination: Destination): number {
        switch (destination.type) {
            case "literal": return hardware.programCounter + destination.value;
            case "label": return program.labels.get(destination.value) ?? program.instructions.length;
        }
    }
}

const sleep = (ms: number) => new Promise(resolve => {
    setTimeout(resolve, ms);
});