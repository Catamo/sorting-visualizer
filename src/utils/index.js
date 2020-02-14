export const GenerateRandomDataSet = size => {
  const addedNumbers = {};
  const result = [];

  let randomNumber;
  let currentIndex = 0;
  while (currentIndex < size) {
    randomNumber = Math.round(Math.random() * (size - 1) + 1);

    if (!addedNumbers[randomNumber]) {
      //if the number was not added before...
      addedNumbers[randomNumber] = true;
      //add it, and increase the currentIndex
      currentIndex++;

      result.push(randomNumber);
    }
  }

  return result;
};

export const Pause = milliseconds => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};
