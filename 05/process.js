const { queues, stacks } = require("./stacks");
// const { queues, stacks } = require("./mock");

console.log(queues);

function convertOrderStringToCommands(orderString) {
  const result =
    /move (?<numberToMove>\d*) from (?<startingQueue>\d*) to (?<endingQueue>\d*)/g.exec(
      orderString
    );
  const { numberToMove, startingQueue, endingQueue } = result.groups;

  return {
    numberToMove: parseInt(numberToMove, 10),
    startingQueue: parseInt(startingQueue, 10),
    endingQueue: parseInt(endingQueue, 10),
  };
}

function splitOrdersIntoActionableCommands(orderString) {
  const orders = orderString.split("\n");

  return orders.map((order) => {
    return convertOrderStringToCommands(order);
  });
}

function moveItemBetweenQueues(itemCountToMove, startingQueue, endingQueue) {
  const item = queues[startingQueue].dequeueCount(itemCountToMove);
  queues[endingQueue].enqueue(item);
  // for (let i = 0; i < itemCountToMove; i++) {
  //   const item = queues[startingQueue].dequeue();
  //   queues[endingQueue].enqueue(item);
  // }
}

function printLastItemInEachQueue() {
  return Object.entries(queues).map(([key, queue]) => {
    return queue.getLastItem();
  });
}

function processQueues(queueOrderString) {
  const commands = splitOrdersIntoActionableCommands(queueOrderString);

  commands.forEach((command) => {
    moveItemBetweenQueues(
      command.numberToMove,
      command.startingQueue,
      command.endingQueue
    );
  });

  return printLastItemInEachQueue().join("");
}

console.log(processQueues(stacks));
