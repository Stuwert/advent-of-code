/**
 * 1. Each rucksack is a string
 * 2. Each string has an even length, split into two halves of equal length
 * 
 * Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

 */

console.log("Z".charCodeAt(0));

// a = 97
// z = 122

// A = 65
// Z = 90

// lowercase process charCode - 96
// uppercase process charCode - 38

// process the first half of the string into an object
// check keys in object

const test = "testesin";

console.log(test.substring(0, test.length / 2));
console.log(test.substring(test.length / 2, test.length));

// Split string in half
// Convert first half string to object of keys with string and value of character value
// loop over the second half, adding value of keys in object to sum.

function assignCharacterValue(char) {
  const charVal = char.charCodeAt(0);

  if (charVal >= 97 && charVal <= 122) {
    return charVal - 96;
  }

  if (charVal >= 65 && charVal <= 90) {
    return charVal - 38;
  }

  throw new Error("Should not hit here");
}

function processStringToObject(str) {
  const obj = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charVal = assignCharacterValue(char);

    obj[char] = charVal;
  }

  return obj;
}

function splitStringInHalf(str) {
  const firstHalf = str.substring(0, str.length / 2);
  const secondHalf = str.substring(str.length / 2, str.length);

  return [firstHalf, secondHalf];
}

function calculateStringIntersect(strOneStrOrObj, strTwo) {
  let strOneObj;

  if (typeof strOneStrOrObj === "string") {
    strOneObj = processStringToObject(strOneStrOrObj);
  } else {
    strOneObj = strOneStrOrObj;
  }

  const charIntersect = strTwo.split("").reduce((acc, char) => {
    if (char in strOneObj) {
      acc[char] = strOneObj[char];
    }
    return acc;
  }, {});

  return charIntersect;
}

function processRucksackPriorityValues(rucksack) {
  const ruckSackElements = rucksack.split("\n");

  const ruckSackPriorityValue = ruckSackElements.reduce((acc, str) => {
    const [firstHalf, secondHalf] = splitStringInHalf(str);

    const charIntersect = calculateStringIntersect(firstHalf, secondHalf);

    const strValue = Object.values(charIntersect).reduce(
      (acc, val) => acc + val,
      0
    );

    // console.log(strValue);
    return acc + strValue;
  }, 0);

  return ruckSackPriorityValue;
}

function processRucksackSharedPriorityKeys(rucksack) {
  const ruckSackElements = rucksack.split("\n");
  let sumOfElfSharedValues = 0;

  for (let i = 0; i < ruckSackElements.length; i += 3) {
    const firstElf = ruckSackElements[i];
    const secondElf = ruckSackElements[i + 1];
    const thirdElf = ruckSackElements[i + 2];

    const charIntersectElfOneAndTwo = calculateStringIntersect(
      firstElf,
      secondElf
    );

    const charIntersectAllThree = calculateStringIntersect(
      charIntersectElfOneAndTwo,
      thirdElf
    );

    const strValue = Object.values(charIntersectAllThree).reduce(
      (acc, val) => acc + val,
      0
    );

    sumOfElfSharedValues += strValue;
  }

  return sumOfElfSharedValues;
}

const { rucksack } = require("./rucksack");
// const { rucksack } = require("./rucksack.test");

console.log(processRucksackPriorityValues(rucksack));
console.log(processRucksackSharedPriorityKeys(rucksack));
// 7878
