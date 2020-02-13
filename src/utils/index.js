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

export const OpenFullscreen = () => {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

export const CloseFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}
