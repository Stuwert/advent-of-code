const { elves } = require("./elves.js");

const process = () => {
  const elfCalories = elves.split("\n\n");

  const mappedCalories = elfCalories.map((elfCalorie, currentIndex) => {
    const elfCaloriesNumbers = elfCalorie
      .split("\n")
      .map((calorieString) => Number.parseInt(calorieString))
      .filter((calorieNumber) => !Number.isNaN(calorieNumber));

    const highestCalorie = elfCaloriesNumbers.reduce((highest, current) => {
      return current > highest ? current : highest;
    }, 0);

    const totalCalories = elfCaloriesNumbers.reduce(
      (total, current) => total + current
    );

    return {
      totalCalories,
      order: currentIndex,
      highestCalorie,
    };
  });

  const sortedCalories = mappedCalories.sort(
    (a, b) => b.totalCalories - a.totalCalories
  );

  console.log(
    sortedCalories[0].totalCalories +
      sortedCalories[1].totalCalories +
      sortedCalories[2].totalCalories
  );
};

process();
