import { initGameBoard } from './game-board';

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

  const onBoxedCellsCountChange = (event) => {
    if (currentTemplateMatrix.length ** 2 === event.detail) {
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
