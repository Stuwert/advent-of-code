const Queue = require("./queue");

const queueOne = new Queue(["Z", "N"]);
const queueTwo = new Queue(["M", "C", "D"]);
const queueThree = new Queue(["P"]);

const queues = {
  1: queueOne,
  2: queueTwo,
  3: queueThree,
};

const stacks = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

module.exports = {
  queues,
  stacks,
};
