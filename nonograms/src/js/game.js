import { renderGameBoard } from './game-board';
import { getCurrentTemplateMatrix } from './header';

const printSolution = (matrix) => {
  let result = '';

  matrix.forEach(row => {
    result += `${row.map(cell => cell ? '⬛' : '⬜').join('')}\n`;
  });

  console.clear();
  console.log(result);
};

const startGame = () => {
  const currentTemplateMatrix = getCurrentTemplateMatrix();

  renderGameBoard(currentTemplateMatrix);
  printSolution(currentTemplateMatrix);
};

export { startGame };
