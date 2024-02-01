import { initGameBoard, blockGameField } from './game-board';
import { showModal } from './modal';

const printSolution = (matrix) => {
  let result = '';

  matrix.forEach(row => {
    result += `${row.map(cell => cell ? '⬛' : '⬜').join('')}\n`;
  });

  console.clear();
  console.log(result);
};

const listeners = new Map();

const startGame = (evt) => {
  const currentTemplateMatrix = evt.detail;

  initGameBoard(currentTemplateMatrix);
  printSolution(currentTemplateMatrix);

  const onCorrectCellsCountChange = (event) => {
    if (currentTemplateMatrix.length ** 2 === event.detail) {
      showModal();
      blockGameField();
    }
  };

  document.removeEventListener('correctCellsCountChange', listeners.get('correctCellsCountChange'));
  document.addEventListener('correctCellsCountChange', onCorrectCellsCountChange);

  listeners.set('correctCellsCountChange', onCorrectCellsCountChange);
};

const initGame = () => {
  document.addEventListener('templateChange', startGame);
};

export { initGame };
