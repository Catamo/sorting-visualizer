export const GenerateRandomNumber = (maxNumber = 100) => {
  return Math.round(Math.random() * (maxNumber - 1) + 1);
};

export const GenerateRandomDataSet = size => {
  const addedNumbers = {};
  const result = [];

  let randomNumber;
  let currentIndex = 0;
  while (currentIndex < size) {
    randomNumber = GenerateRandomNumber(size);

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
