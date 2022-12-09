class Queue {
  constructor(startingQueue = []) {
    this.queue = startingQueue;
  }

  enqueue(item) {
    if (!Array.isArray(item)) {
      item = [item];
    }
    this.queue = this.queue.concat(item);
  }

  dequeue() {
    return this.queue.pop();
  }

  dequeueCount(count) {
    return this.queue.splice(count * -1);
  }

  getLastItem() {
    return this.queue[this.queue.length - 1];
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = Queue;
