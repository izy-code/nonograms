import { initGameBoard } from './game-board';
import { resetGameField, blockGameField, getFlaggedCells } from './game-field';
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

let currentTemplateObject = {};

const printSolution = (matrix) => {
  let result = '';

  matrix.forEach((row) => {
    result += `${row.map((cell) => (cell ? '⬛' : '⬜')).join('')}\n`;
  });

  console.clear();
  console.log(result);
};

const onCorrectCellsCountChange = (cellsCountChangeEvt) => {
  if (currentTemplateObject.matrix.length ** 2 === cellsCountChangeEvt.detail) {
    stopTimer();
    blockGameField();
    showModal(
      `You have solved the ${currentTemplateObject.name.toLowerCase()} nonogram in ${getPassedTimeInSeconds()}\u00A0seconds!`
    );
    playWinSound();
  }
};

const onGameRestart = () => {
  resetGameField(currentTemplateObject.matrix);
  resetTimer();
};

const onGameSave = () => {};

const onTemplateChange = (templateChangeEvt) => {
  currentTemplateObject = templateChangeEvt.detail;

  initGameBoard(currentTemplateObject.matrix);
  resetTimer();
  printSolution(currentTemplateObject.matrix);
};

const initGame = () => {
  document.addEventListener('templateChange', onTemplateChange);
  document.addEventListener(
    'correctCellsCountChange',
    onCorrectCellsCountChange
  );
  document.addEventListener('gameRestart', onGameRestart);
  document.addEventListener('gameSave', onGameSave);
  document.addEventListener('timerStart', startTimer);
  document.addEventListener('boxedCellFlagChange', playBoxCellSound);
  document.addEventListener('crossedCellFlagChange', playCrossCellSound);
  document.addEventListener('emptyCellFlagChange', playEmptyCellSound);
};

export { initGame };
