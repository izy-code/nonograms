import { initGameBoard, blockGameField } from './game-board';
import { showModal } from './modal';
import { stopTimer, getPassedTimeInSeconds } from './timer';

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
  printSolution(currentTemplateMatrix);

  const onCorrectCellsCountChange = (cellsCountChangeEvt) => {
    if (currentTemplateMatrix.length ** 2 === cellsCountChangeEvt.detail) {
      stopTimer();
      blockGameField();
      showModal(
        `You have solved the ${templateChangeEvt.detail.name.toLowerCase()} nonogram in ${getPassedTimeInSeconds()}\u00A0seconds!`
      );
    }
  };

  document.removeEventListener(
    'correctCellsCountChange',
    listeners.get('correctCellsCountChange')
  );
  document.addEventListener(
    'correctCellsCountChange',
    onCorrectCellsCountChange
  );

  listeners.set('correctCellsCountChange', onCorrectCellsCountChange);
};

const initGame = () => {
  document.addEventListener('templateChange', startGame);
};

export { initGame };
