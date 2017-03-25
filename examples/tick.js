function delayed(arg, arg2, arg3) {
    console.log("delayed ", arg, arg2, arg3)
}

console.log("Calling ");
process.nextTick(delayed, "test", "two", "three");

console.log("Calling done ");
