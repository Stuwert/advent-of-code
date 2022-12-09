const { strategy } = require("./strategy");

// Opponent Move A for Rock, B for Paper, and C for Scissors
// Your Move X for Rock, Y for Paper, and Z for Scissors
// Values 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won

const mapLettersToMoves = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
};

const mapLettersToOutcomes = {
  X: "Lose",
  Y: "Draw",
  Z: "Win",
};

const outcomeValues = {
  Rock: {
    Rock: 4, // Rock Draws Rock 3, Rock is worth 1, = 4
    Paper: 8, // Rock Loss to Paper 6, Paper is worth 2, = 8
    Scissors: 3, // Rock Beats Scissors 0, Scissors is worth 3, = 3
  },
  Paper: {
    Rock: 1, // Paper Beats Rock 0, Rock is worth 1, = 1
    Paper: 5, // Paper Draws Paper 3, Paper is worth 2, = 5
    Scissors: 9, // Paper Loses to Scissors 6, Scissors is worth 3, = 9
  },
  Scissors: {
    Rock: 7, // Scissors Loses to Rock 6, Rock is worth 1 = 7
    Paper: 2, // Scissors Beats Paper 0, Paper is worth 2 = 2
    Scissors: 6, // Scissors Draws Scissors 3, Scissors is worth 3 = 6
  },
};

// X means you need to lose,
// Y means you need to end the round in a draw, and
// Z means you need to win. Good luck

// A Rock
// B Paper
// C Scissors

const outcomeToThrow = {
  // Needs to be read in reverse Value Key Parent Value (Rock.Lose = Scissor means Scissor Lose to Rock)
  Rock: {
    Lose: "Scissors",
    Draw: "Rock",
    Win: "Paper",
  },
  Paper: {
    Lose: "Rock",
    Draw: "Paper",
    Win: "Scissors",
  },
  Scissors: {
    Lose: "Paper",
    Draw: "Scissors",
    Win: "Rock",
  },
};

const calculate = () => {
  const pairings = strategy.split("\n");

  const total = pairings.reduce((currentTotal, pairing, index) => {
    // if (index > 4) {
    //   return;
    // }
    const [opponentMoveCipher, yourOutcomeCipher] = pairing.split(" ");

    const opponentMove = mapLettersToMoves[opponentMoveCipher];
    const yourOutcome = mapLettersToOutcomes[yourOutcomeCipher];

    const yourMove = outcomeToThrow[opponentMove][yourOutcome];

    // console.log({
    //   opponentMoveCipher,
    //   opponentMove,
    //   yourOutcomeCipher,
    //   yourOutcome,
    //   yourMove,
    // });

    return currentTotal + outcomeValues[opponentMove][yourMove];
  }, 0);

  console.log(total);
};

calculate();
