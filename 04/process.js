// const { pairs: elfPairs } = require("./mock");
const { pairs: elfPairs } = require("./file");

function stringToNumber(string) {
  return parseInt(string, 10);
}

function allLessThan(elfPair1, elfPair2) {
  return elfPair1[0] < elfPair2[0] && elfPair1[1] < elfPair2[0];
}

function allMoreThan(elfPair1, elfPair2) {
  return elfPair1[0] > elfPair2[1] && elfPair1[1] > elfPair2[1];
}

function elvesOverlap(elfPair1, elfPair2) {
  if (allLessThan(elfPair1, elfPair2)) {
    return false;
  }
  if (allMoreThan(elfPair1, elfPair2)) {
    return false;
  }

  return true;
}

function firstContainsSecond(first, second) {
  return first[0] <= second[0] && first[1] >= second[1];
}

function elfStringToArray(elfString) {
  return elfString.split("-").map(stringToNumber);
}

function elfPairToArray(elfPairs) {
  const elfPairArray = elfPairs.split(",").map(elfStringToArray);

  return elfPairArray;
}

function findElfsWithTotalOverlaps(elfString) {
  const elfStringsArray = elfString.split("\n");

  const elfPairsWithOverlaps = elfStringsArray.filter((elfString) => {
    const elfPairArray = elfPairToArray(elfString);
    const elfPair1 = elfPairArray[0];
    const elfPair2 = elfPairArray[1];

    return (
      firstContainsSecond(elfPair1, elfPair2) ||
      firstContainsSecond(elfPair2, elfPair1)
    );
  });

  return elfPairsWithOverlaps.length;
}

function findElfsWithAnyOverlap(elfString) {
  const elfStringsArray = elfString.split("\n");

  const elfPairsWithOverlaps = elfStringsArray.filter((elfString) => {
    const elfPairArray = elfPairToArray(elfString);
    const elfPair1 = elfPairArray[0];
    const elfPair2 = elfPairArray[1];

    return elvesOverlap(elfPair1, elfPair2);
  });

  return elfPairsWithOverlaps.length;
}

console.log(findElfsWithTotalOverlaps(elfPairs));
console.log(findElfsWithAnyOverlap(elfPairs));
