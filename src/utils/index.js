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

export const ToggleFullscreen = () => {
  let doc = window.document;
  let docEl = doc.documentElement;

  let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}
