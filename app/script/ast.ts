export interface Program {
    instructions: Instruction[]
    labels: Map<string, number>
}

export type Instruction = Computation | Move | StackPush | StackPop | HeapLoad | HeapStore | Jump | Branch | Print | Debug | NoOperation

export interface Computation {
    type: "computation"
    computation: ComputationType
    val1: Value
    val2: Value
    toRegister: number
}

export type ComputationType = "add" | "sub" | "mul" | "eq" | "neq" | "gt" | "lt" | "gte" | "lte" | "and" | "nand" | "or" | "nor" | "xor" | "xnor";

export interface Move {
    type: "move"
    value: Value
    toRegister: number
}

export interface Jump {
    type: "jump"
    destination: Destination
}

export interface Branch {
    type: "branch"
    value: Value
    destination: Destination
}

export interface StackPush {
    type: "stack-push"
    value: Value
}

export interface StackPop {
    type: "stack-pop"
    register: number
}

export interface HeapLoad {
    type: "heap-load"
    address: Value
    register: number
}

export interface HeapStore {
    type: "heap-store"
    address: Value
    value: Value
}

export interface Print {
    type: "print"
    value: Value
}

export interface Debug {
    type: "debug"
    value: Value
}

export interface NoOperation {
    type: "no-operation"
}

export type Value = LiteralNumber | Register;

export type Destination = LiteralNumber | Label;

export interface LiteralNumber {
    type: "literal"
    value: number
}

export interface Register {
    type: "register"
    value: number
}

export interface Label {
    type: "label"
    value: string
}

export const sample: Program = {
    // statements: [
    //     {type: "print", value: {type: "register", value: 1}},
    //     {type: "computation", instruction: "add", val1: {type: "literal", value: 10}, val2: {type: "register", value: 1}, toRegister: 1},
    //     {type: "print", value: {type: "register", value: 1}},
    //     {type: "computation", instruction: "add", val1: {type: "literal", value: 5}, val2: {type: "register", value: 1}, toRegister: 1},
    //     {type: "print", value: {type: "register", value: 1}},
    //     // {type: "jump", destination: {type: "label", value: "Start"}},
    // ],
    // labels: new Map<string, number>([["Start", 3]]),

    instructions: [
        // Init
        {type: "computation", computation: "add", val1: {type: "literal", value: 0}, val2: {type: "literal", value: 1}, toRegister: 1},

        // Condition
        {type: "computation", computation: "gte", val1: {type: "register", value: 0}, val2: {type: "literal", value: 10}, toRegister: 2},
        {type: "branch", value: {type: "register", value: 2}, destination: {type: "label", value: "End"}},

        // Loop
        {type: "computation", computation: "add", val1: {type: "literal", value: 1}, val2: {type: "register", value: 0}, toRegister: 0},
        {type: "computation", computation: "add", val1: {type: "register", value: 1}, val2: {type: "register", value: 1}, toRegister: 1},
        {type: "heap-store", value: {type: "register", value: 1}, address: {type: "register", value: 0}},
        {type: "jump", destination: {type: "label", value: "Condition"}}
    ],
    labels: new Map<string, number>([["Condition", 1], ["End", 7]]),
}
