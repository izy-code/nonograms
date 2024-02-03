import { initGameBoard } from './game-board';
import { resetGameField, getFlaggedCells } from './game-field';
import { showModal } from './modal';
import {
  startTimer,
  resetTimer,
  stopTimer,
  getPassedTimeInSeconds,
} from './timer';
import {
  playBoxCellSound,
  playCrossCellSound,
  playEmptyCellSound,
  playWinSound,
} from './sound';
import { setLocalStorageObjectProperty } from './local-storage';

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
};

const onGameRestart = () => {
  resetGameField(currentTemplate.matrix);
  resetTimer();
};

const onGameSave = () => {
  setLocalStorageObjectProperty('savedTemplateSize', currentTemplate.size);
  setLocalStorageObjectProperty('savedTemplateName', currentTemplate.name);
  setLocalStorageObjectProperty('savedFlaggedCells', getFlaggedCells());
  setLocalStorageObjectProperty('savedTimeInSeconds', getPassedTimeInSeconds());
};

const onTemplateChange = (evt) => {
  currentTemplate = evt.detail;

  initGameBoard(currentTemplate.matrix);
  resetTimer();
  printSolution(currentTemplate.matrix);
};

const initGame = () => {
  document.addEventListener('templateChange', onTemplateChange);
  document.addEventListener('gameWin', onGameWin);
  document.addEventListener('gameRestart', onGameRestart);
  document.addEventListener('gameSave', onGameSave);
  document.addEventListener('timerStart', startTimer);
  document.addEventListener('boxedCellFlagChange', playBoxCellSound);
  document.addEventListener('crossedCellFlagChange', playCrossCellSound);
  document.addEventListener('emptyCellFlagChange', playEmptyCellSound);
};

export { initGame };
