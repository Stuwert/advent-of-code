/**
 *
 * 1. Start by mapping the Head and tail to coordinate values.
 * 2. Update the value of the coordinates of the head
 * 3. Compare the values of the coordinates of the head and tail
 * 4. Move the tail to the next coordinate based on the relationship to the head.
 *
 *
 *
 */

function calculateHeadTailDelta(head, tail) {
  return { x: head.x - tail.x, y: head.y - tail.y };
}

function calculateNewHeadPosition(head, direction) {
  const { x, y } = head;

  switch (direction) {
    case "U":
      return { x, y: y - 1 };
    case "D":
      return { x, y: y + 1 };
    case "L":
      return { x: x - 1, y };
    case "R":
      return { x: x + 1, y };
    default:
      throw new Error("Should not hit");
  }
}

function calculatePositionalMove(delta) {
  if (delta === 0) {
    return 0;
  }

  return delta / Math.abs(delta);
}

function getTailCoordinateDelta(delta) {
  const { x: deltaX, y: deltaY } = delta;

  if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) {
    return {
      x: 0,
      y: 0,
    };
  }

  return {
    x: calculatePositionalMove(deltaX),
    y: calculatePositionalMove(deltaY),
  };

  /**
   *
   * Diagonal Up Left: -2,1 || -1,2
   * Diagonal Up Right: 2,1 || 1,2
   * Diagonal Down Left: -2,-1 || -1,-2
   * Diagonal Down Right: 2,-1 || 1,-2
   */
}

function calculateTailPosition(tail, delta) {
  const { x: deltaX, y: deltaY } = delta;

  return {
    x: tail.x + deltaX,
    y: tail.y + deltaY,
  };
}

function moveTail(head, tail) {
  const delta = calculateHeadTailDelta(head, tail);
  const tailDelta = getTailCoordinateDelta(delta);
  const newTail = calculateTailPosition(tail, tailDelta);

  return newTail;
}

function coordinatesToString({ x, y }) {
  return `${x},${y}`;
}

function createRopeOfLength(length) {
  return Array.from({ length }, () => ({ x: 0, y: 0 }));
}

function processMovements(listOfCommands, ropeLength) {
  const connectedRope = createRopeOfLength(ropeLength);
  const placesTailHasBeen = new Set([
    coordinatesToString(connectedRope[connectedRope.length - 1]),
  ]);

  listOfCommands.forEach((command) => {
    const [direction, countString] = command.split(" ");

    const movementCount = parseInt(countString, 10);
    for (let i = 0; i < movementCount; i++) {
      const newHead = calculateNewHeadPosition(connectedRope[0], direction);
      connectedRope[0] = newHead;

      for (let j = 1; j < connectedRope.length; j++) {
        const leadLink = connectedRope[j - 1];
        const followLink = connectedRope[j];

        const newTail = moveTail(leadLink, followLink);
        connectedRope[j] = newTail;

        if (j === connectedRope.length - 1) {
          placesTailHasBeen.add(coordinatesToString(newTail));
        }
      }
    }
  });

  return placesTailHasBeen.size;
}

module.exports = {
  getTailCoordinateDelta,
  processMovements,
};
