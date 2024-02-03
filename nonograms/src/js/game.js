import { initGameBoard } from './game-board';
import {
  resetGameField,
  getFlaggedCells,
  fillFlaggedCells,
} from './game-field';
import { showModal } from './modal';
import { setTemplateValues } from './template-select';
import { disableSaveButton, enableSaveButton } from './footer';
import {
  startTimer,
  resetTimer,
  stopTimer,
  setTimer,
  getPassedTimeInSeconds,
} from './timer';
import {
  playBoxCellSound,
  playCrossCellSound,
  playEmptyCellSound,
  playWinSound,
} from './sound';
import {
  getLocalStorageProperty,
  setLocalStorageProperty,
} from './local-storage';

let currentTemplate = {};

const printSolution = (matrix) => {
  let result = '';

  matrix.forEach((row) => {
    result += `${row.map((cell) => (cell ? '⬛' : '⬜')).join('')}\n`;
  });

  console.clear();
  console.log(result);
};

const onGameWin = () => {
  stopTimer();
  showModal(
    `You have solved the ${currentTemplate.name.toLowerCase()} nonogram in ${getPassedTimeInSeconds()}\u00A0seconds!`
  );
  playWinSound();
  disableSaveButton();
};

const onGameRestart = () => {
  resetGameField(currentTemplate.matrix);
  resetTimer();
  enableSaveButton();
};

const onGameSave = () => {
  setLocalStorageProperty('savedTemplateSize', currentTemplate.size);
  setLocalStorageProperty('savedTemplateName', currentTemplate.name);
  setLocalStorageProperty('savedFlaggedCells', getFlaggedCells());
  setLocalStorageProperty('savedTimeInSeconds', getPassedTimeInSeconds());
};

const onGameContinue = () => {
  setTemplateValues(
    getLocalStorageProperty('savedTemplateSize'),
    getLocalStorageProperty('savedTemplateName')
  );
  setTimer(getLocalStorageProperty('savedTimeInSeconds'));
  fillFlaggedCells(getLocalStorageProperty('savedFlaggedCells'));
  disableSaveButton();
};

const onTemplateChange = (evt) => {
  currentTemplate = evt.detail;

  initGameBoard(currentTemplate.matrix);
  resetTimer();
  printSolution(currentTemplate.matrix);

  enableSaveButton();
};

const onCellFlagChange = (evt) => {
  if (evt.detail === 'box') {
    playBoxCellSound();
  } else if (evt.detail === 'cross') {
    playCrossCellSound();
  } else {
    playEmptyCellSound();
  }

  enableSaveButton();
};

const initGame = () => {
  document.addEventListener('templateChange', onTemplateChange);
  document.addEventListener('cellFlagChange', onCellFlagChange);
  document.addEventListener('gameWin', onGameWin);
  document.addEventListener('gameRestart', onGameRestart);
  document.addEventListener('gameSave', onGameSave);
  document.addEventListener('gameContinue', onGameContinue);
  document.addEventListener('timerStart', startTimer);
};

export { initGame };
