const largeCommand = require("./realCommands");
// const { smallCommand, largeCommand, smallestCommand } = require("./mock");
const { processMovements } = require("./process");

// console.log(processMovements(smallCommand.split("\n"), 10));
// console.log(processMovements(smallCommand.split("\n"), 2));
console.log(processMovements(largeCommand.split("\n"), 10));
