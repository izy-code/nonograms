import { initGameBoard } from './game-board';
import { resetGameField, blockGameField } from './game-field';
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

const printSolution = (matrix) => {
  let result = '';

  matrix.forEach((row) => {
    result += `${row.map((cell) => (cell ? '⬛' : '⬜')).join('')}\n`;
  });

  console.clear();
  console.log(result);
};

const listeners = new Map();

const startGame = (templateChangeEvt) => {
  const currentTemplateMatrix = templateChangeEvt.detail.matrix;

  initGameBoard(currentTemplateMatrix);
  resetTimer();
  printSolution(currentTemplateMatrix);

  const onCorrectCellsCountChange = (cellsCountChangeEvt) => {
    if (currentTemplateMatrix.length ** 2 === cellsCountChangeEvt.detail) {
      stopTimer();
      blockGameField();
      showModal(
        `You have solved the ${templateChangeEvt.detail.name.toLowerCase()} nonogram in ${getPassedTimeInSeconds()}\u00A0seconds!`
      );
      playWinSound();
    }
  };

  const onGameRestart = () => {
    resetGameField(currentTemplateMatrix);
    resetTimer();
  };

  listeners.forEach(({ eventType, handler }) =>
    document.removeEventListener(eventType, handler)
  );

  document.addEventListener(
    'correctCellsCountChange',
    onCorrectCellsCountChange
  );
  document.addEventListener('gameRestart', onGameRestart);

  listeners.set('correctCellsCountChange', onCorrectCellsCountChange);
  listeners.set('gameRestart', onGameRestart);
};

const initGame = () => {
  document.addEventListener('templateChange', startGame);
  document.addEventListener('timerStart', startTimer);
  document.addEventListener('boxedCellFlagChange', playBoxCellSound);
  document.addEventListener('crossedCellFlagChange', playCrossCellSound);
  document.addEventListener('emptyCellFlagChange', playEmptyCellSound);
};

export { initGame };
