export const samples = [
    "Start:\n" +
    "\tmove 1 r1;\n" +
    "Condition:\n" +
    "\tgte r0 10 r2;\n" +
    "\tbranch r2 End;\n" +
    "Loop:\n" +
    "\tadd 1 r0 r0;\n" +
    "\tadd r1 r1 r1;\n" +
    "\tstore r1 r0;\n" +
    "\tdebug r1;\n" +
    "\tjump Condition;\n" +
    "End:",

    "Start:\n" +
    "\tmove 1 r1;\n" +
    "Condition:\n" +
    "\tgte r0 20 r9;\n" +
    "\tbranch r9 End;\n" +
    "Loop:\n" +
    "\tadd r1 r2 r3;\n" +
    "\tstore r3 r0;\n" +
    "\tdebug r3;\n" +
    "\tmove r2 r1;\n" +
    "\tmove r3 r2;\n" +
    "\tadd 1 r0 r0;\n" +
    "\tjump Condition;\n" +
    "End:",

    "print 'H';\n" +
    "print 'e';\n" +
    "print 'l';\n" +
    "print 'l';\n" +
    "print 'o';\n" +
    "print 32;\n" +
    "print 'w';\n" +
    "print 'o';\n" +
    "print 'r';\n" +
    "print 'l';\n" +
    "print 'd';\n" +
    "print '!';",

    "Init:\n" +
    "\tmove 50 r0;\n" +
    "\tmove 5 r1;\n" +
    "\n" +
    "DivByZeroCheck:\n" +
    "\tlte r1 0 r5;\n" +
    "\tbranch r5 End;\n" +
    "\n" +
    "DivCondition:\n" +
    "\tlte r0 0 r5;\n" +
    "\tbranch r5 End;\n" +
    "\n" +
    "Division:\n" +
    "\tsub r0 r1 r0;\n" +
    "\tadd 1 r2 r2;\n" +
    "\tjump DivCondition;\n" +
    "\n" +
    "End:\n" +
    "\tdebug r2;",

    "Init:\n" +
    "\tmove 81 r0;\n" +
    "\tmove 1 r1;\n" +
    "\n" +
    "SquareRootLoop:\n" +
    "\tadd 2 r1 r1;\n" +
    "\tsub r0 r1 r0;\n" +
    "\tadd 1 r2 r2;\n" +
    "\t\n" +
    "\tgt r0 0 r3;\n" +
    "\tbranch r3 SquareRootLoop;\n" +
    "\n" +
    "End:\n" +
    "\tdebug r2;"
]

export const manual = [
    {
        title: "Data:",
        instructions: [
            {head: "move", args: "<val> <reg>"},
        ],
    },
    {
        title: "Control flow:",
        instructions: [
            {head: "jump", args: "<dest>"},
            {head: "branch", args: "<val> <dest>"},
        ]
    },
    {
        title: "Stack:",
        instructions: [
            {head: "push", args: "<val>"},
            {head: "pop", args: "<reg>"},
        ]
    },
    {
        title: "Heap:",
        instructions: [
            {head: "store", args: "<val> <val>"},
            {head: "load", args: "<val> <reg>"},
        ]
    },
    {
        title: "IO:",
        instructions: [
            {head: "print", args: "<val>"},
            {head: "debug", args: "<val>"},
        ]
    },
    {
        title: "Math:",
        instructions: [
            {head: "add", args: " <val> <val> <reg>"},
            {head: "sub", args: " <val> <val> <reg>"},
            {head: "mul", args: " <val> <val> <reg>"},
        ]
    },
    {
        title: "Logic",
        instructions: [
            {head: "eq", args: "  <val> <val> <reg>"},
            {head: "neq", args: " <val> <val> <reg>"},
            {head: "gt", args: "  <val> <val> <reg>"},
            {head: "lt", args: "  <val> <val> <reg>"},
            {head: "gte", args: " <val> <val> <reg>"},
            {head: "lte", args: " <val> <val> <reg>"},
            {head: "and", args: " <val> <val> <reg>"},
            {head: "nand", args: "<val> <val> <reg>"},
            {head: "or", args: "  <val> <val> <reg>"},
            {head: "nor", args: " <val> <val> <reg>"},
            {head: "xor", args: " <val> <val> <reg>"},
            {head: "xnor", args: "<val> <val> <reg>"},
        ]
    },
    {
        title: "Bitwise",
        instructions: [
            {head: "shl", args: " <val> <val> <reg>"},
            {head: "shr", args: " <val> <val> <reg>"},
            {head: "band", args: "<val> <val> <reg>"},
            {head: "bor", args: " <val> <val> <reg>"},
        ]
    },
]

// const p = () => {
//     let num = 123;
//     let res = "";
//     while (num > 0) {
//         const div = Math.floor(num / 10);
//         const rem = num % 10;
//         num = div
//         res += rem;
//     }
// }
