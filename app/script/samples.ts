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

/*
Start:
    move 1 r1;
Condition:
    gte r0 10 r2;
    branch r2 End;
Loop:
    add 1 r0 r0;
    add r1 r1 r1;
    store r1 r0;
    jump Condition;
End:


*/