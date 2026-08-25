import type {ComputationType, Destination, Instruction, Program, Value} from "~/script/ast.ts";

export function parseProgram(code: string): Program {
    const program: Program = {
        instructions: [],
        labels: new Map<string, number>(),
    }

    code.split(";").forEach((line, i) => {
        const split = line.split(":");
        if (split.length === 2) {
            program.labels.set(split[0]!.trim(), i);
            program.instructions.push(parseInstruction(split[1]!.trim()));
            return;
        }
        program.instructions.push(parseInstruction(split[0]!.trim()));
    })

    return program;
}

function parseInstruction(instruction: string): Instruction {
    const [head, ...args] = instruction.split(" ");
    if (head) {
        if (computationHeaders.includes(head)) {
            return {type: "computation", computation: head as ComputationType, val1: parseValue(args[0]!), val2: parseValue(args[1]!), toRegister: parseRegister(args[2]!)!};
        } else if (head == "move") {
            return {type: "move", value: parseValue(args[0]!), toRegister: parseRegister(args[1]!)!};
        } else if (head == "jump") {
            return {type: "jump", destination: parseDestination(args[0]!)};
        } else if (head == "branch") {
            return {type: "branch", value: parseValue(args[0]!), destination: parseDestination(args[1]!)};
        } else if (head == "push") {
            return {type: "stack-push", value: parseValue(args[0]!)};
        } else if (head == "pop") {
            return {type: "stack-pop", register: parseRegister(args[0]!)!};
        } else if (head == "store") {
            return {type: "heap-store", value: parseValue(args[0]!), address: parseValue(args[1]!)};
        } else if (head == "load") {
            return {type: "heap-load", address: parseValue(args[0]!), register: parseRegister(args[1]!)!};
        } else if (head == "print") {
            return {type: "print", value: parseValue(args[0]!)};
        } else if (head == "debug") {
            return {type: "debug", value: parseValue(args[0]!)};
        }
        throw new Error("Unknown head: " + head);
    }
    return {type: "no-operation"};
}

const computationHeaders: string[] = ["add", "sub", "mul", "eq", "neq", "gt", "lt", "gte", "lte", "and", "nand", "or", "nor", "xor", "xnor"];

function parseValue(value: string): Value {
    const register = parseRegister(value);
    if (register != null) {
        return {type: "register", value: register};
    }
    if (value.length == 3 && value.startsWith("\'") && value.endsWith("\'")) {
        return {type: "literal", value: value.codePointAt(1)!}
    }
    return {type: "literal", value: parseNumber(value)!};
}

function parseDestination(destination: string): Destination {
    const number = parseNumber(destination);
    if (number != null) {
        return {type: "literal", value: number};
    }
    return {type: "label", value: destination};
}

function parseRegister(value: string): number | undefined {
    if (value[0] === "r") {
        return parseNumber(value.slice(1));
    }
}

function parseNumber(value: string) {
    const number = Number.parseInt(value);
    return isNaN(number) ? undefined : number;
}


// export interface Program {
//     lines: Line[]
// }
//
// type Line = Instruction;
//
// interface Instruction {
//     header: InstructionHeader
//     arguments: (RegisterArg | NumberArg)[]
// }
//
// type InstructionHeader = string;
//
// interface RegisterArg {
//     "type": "register";
//
// }

