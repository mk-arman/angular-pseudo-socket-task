/// <reference lib="webworker" />

import { getElements } from './elements';

addEventListener('message', ({ data }) => {
  setInterval(() => {
    postMessage({ result: getElements(data.arraySize) });
  }, data.timer);
});
