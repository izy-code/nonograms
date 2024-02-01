import { initGameBoard } from './game-board';

const printSolution = (matrix) => {
  let result = '';

  matrix.forEach(row => {
    result += `${row.map(cell => cell ? '⬛' : '⬜').join('')}\n`;
  });

  console.clear();
  console.log(result);
};
const countTemplateBoxedCells =
  (matrix) => matrix.reduce((sum, row) => sum + row.reduce((rowSum, cell) => rowSum + cell), 0);

const listeners = new Map();

const startGame = (evt) => {
  const currentTemplateMatrix = evt.detail;
  const templateBoxedCellsCount = countTemplateBoxedCells(currentTemplateMatrix);

  initGameBoard(currentTemplateMatrix);
  printSolution(currentTemplateMatrix);

  const onBoxedCellsCountChange = (event) => {
    if (templateBoxedCellsCount === event.detail) {
      alert('You won!');
    }
  };

  document.removeEventListener('boxedCellsCountChange', listeners.get('boxedCellsCountChange'));
  document.addEventListener('boxedCellsCountChange', onBoxedCellsCountChange);

  listeners.set('boxedCellsCountChange', onBoxedCellsCountChange);
};

const initGame = () => {
  document.addEventListener('templateChange', startGame);
};

export { initGame };
