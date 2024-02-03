import { createNode, dispatchCustomEvent } from './util';

const SECONDS_PER_MINUTE = 60;
const MS_PER_SECOND = 1000;

let timerInterval;
let passedSeconds = 0;

const timerNode = createNode(null, 'span', 'header__timer', '00:00');

const getPassedTimeInSeconds = () => passedSeconds;

const getFormattedTime = () => {
  const minutes = Math.floor(passedSeconds / SECONDS_PER_MINUTE);
  const remainingSeconds = passedSeconds % SECONDS_PER_MINUTE;
  const formattedMinutes = `${minutes}`.padStart(2, '0');
  const formattedSeconds = `${remainingSeconds}`.padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

const updateTimerDisplay = () => {
  timerNode.textContent = getFormattedTime();
};

const startTimer = () => {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    passedSeconds += 1;
    updateTimerDisplay();
  }, MS_PER_SECOND);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

const resetTimer = () => {
  clearInterval(timerInterval);
  passedSeconds = 0;
  updateTimerDisplay();
};

const setTimer = (timeInSeconds) => {
  passedSeconds = timeInSeconds;
  updateTimerDisplay();
  startTimer();
};

const getTimerNode = () => timerNode;

export {
  getTimerNode,
  startTimer,
  stopTimer,
  resetTimer,
  setTimer,
  getFormattedTime,
  getPassedTimeInSeconds,
};
