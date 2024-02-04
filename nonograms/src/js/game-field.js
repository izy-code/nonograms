import { createNode, dispatchCustomEvent } from './util';

const CellInfoIndex = {
  ROW: 0,
  COLUMN: 1,
  FLAG_TYPE: 2,
};
const FlagType = {
  BOX: 1,
  CROSS: 2,
};

let currentTemplateMatrix = [];
let correctCellsCount;
let isFirstCellClick;

const gameFieldNode = createNode(
  null,
  'div',
  'game-board__game-field game-field'
);

const renderGameField = () => {
  const size = currentTemplateMatrix.length;

  gameFieldNode.innerHTML = '';

  for (let rowIndex = 0; rowIndex < size; rowIndex += 1) {
    const rowNode = createNode(gameFieldNode, 'div', 'game-field__row', '', {
      'data-row': rowIndex,
    });

    for (let colIndex = 0; colIndex < size; colIndex += 1) {
      createNode(rowNode, 'div', 'game-field__cell', '', {
        'data-column': colIndex,
      });
    }
  }
};

const countTemplateEmptyCells = () =>
  currentTemplateMatrix.reduce(
    (count, row) =>
      count +
      row.reduce((rowCount, cell) => (cell === 0 ? rowCount + 1 : rowCount), 0),
    0
  );

const isMatchingTemplateCellBoxed = (cellNode) => {
  const cellRowIndex = parseInt(cellNode.parentNode.dataset.row, 10);
  const cellColIndex = parseInt(cellNode.dataset.column, 10);

  return currentTemplateMatrix[cellRowIndex][cellColIndex] === 1;
};

const cleanCrossedCells = () => {
  const crossedCells = gameFieldNode.querySelectorAll(
    '.game-field__cell--cross'
  );

  crossedCells.forEach((cell) =>
    cell.classList.remove('game-field__cell--cross')
  );
};

const cleanFilledCells = () => {
  const filledCells = gameFieldNode.querySelectorAll('.game-field__cell');

  filledCells.forEach((cell) => {
    cell.classList.remove('game-field__cell--box');
    cell.classList.remove('game-field__cell--cross');
  });
};

const handleCellClick = (cellNode, isLeftClick = true) => {
  if (isMatchingTemplateCellBoxed(cellNode, currentTemplateMatrix)) {
    if (cellNode.classList.contains('game-field__cell--box')) {
      correctCellsCount -= 1;
    } else if (isLeftClick) {
      correctCellsCount += 1;
    }
  } else if (cellNode.classList.contains('game-field__cell--box')) {
    correctCellsCount += 1;
  } else if (isLeftClick) {
    correctCellsCount -= 1;
  }

  if (isFirstCellClick) {
    dispatchCustomEvent(document, 'timerStart');
  }

  isFirstCellClick = false;

  if (correctCellsCount === currentTemplateMatrix.length ** 2) {
    dispatchCustomEvent(document, 'gameWin', correctCellsCount);
    blockGameField();
  }
};

const dispatchCellFlag = (cellNode, isLeftClick = true) => {
  if (isLeftClick) {
    if (cellNode.classList.contains('game-field__cell--box')) {
      dispatchCustomEvent(document, 'cellFlagChange', 'empty');
    } else {
      dispatchCustomEvent(document, 'cellFlagChange', 'box');
    }
  } else if (cellNode.classList.contains('game-field__cell--cross')) {
    dispatchCustomEvent(document, 'cellFlagChange', 'empty');
  } else {
    dispatchCustomEvent(document, 'cellFlagChange', 'cross');
  }
};

const onCellLeftClick = (evt) => {
  const cellNode = evt.target.closest('.game-field__cell');

  if (cellNode) {
    dispatchCellFlag(cellNode);
    handleCellClick(cellNode);
    cellNode.classList.remove('game-field__cell--cross');
    cellNode.classList.toggle('game-field__cell--box');
  }
};

const onCellRightClick = (evt) => {
  const cellNode = evt.target.closest('.game-field__cell');

  if (cellNode) {
    handleCellClick(cellNode, false);
    dispatchCellFlag(cellNode, false);
    cellNode.classList.remove('game-field__cell--box');
    cellNode.classList.toggle('game-field__cell--cross');
  }
};

function blockGameField() {
  gameFieldNode.removeEventListener('click', onCellLeftClick);
  gameFieldNode.removeEventListener('contextmenu', onCellRightClick);
  gameFieldNode.classList.add('game-field--default-cursor');
  cleanCrossedCells();
}

const handleGameField = () => {
  gameFieldNode.removeEventListener('click', onCellLeftClick);
  gameFieldNode.removeEventListener('contextmenu', onCellRightClick);
  gameFieldNode.addEventListener('click', onCellLeftClick);
  gameFieldNode.addEventListener('contextmenu', onCellRightClick);
  gameFieldNode.classList.remove('game-field--default-cursor');
};

const initGameField = (templateMatrix) => {
  currentTemplateMatrix = templateMatrix;
  correctCellsCount = countTemplateEmptyCells();
  isFirstCellClick = true;

  renderGameField();
  handleGameField();
};

const resetGameField = () => {
  correctCellsCount = countTemplateEmptyCells();
  isFirstCellClick = true;

  handleGameField();
  cleanFilledCells();
};

const getFlaggedCells = () => {
  const flaggedCells = [];
  const cellNodes = gameFieldNode.querySelectorAll('.game-field__cell');

  cellNodes.forEach((cellNode) => {
    if (cellNode.classList.contains('game-field__cell--box')) {
      flaggedCells.push([
        cellNode.parentNode.dataset.row,
        cellNode.dataset.column,
        FlagType.BOX,
      ]);
    } else if (cellNode.classList.contains('game-field__cell--cross')) {
      flaggedCells.push([
        cellNode.parentNode.dataset.row,
        cellNode.dataset.column,
        FlagType.CROSS,
      ]);
    }
  });

  return flaggedCells;
};

const fillFlaggedCells = (flaggedCells) => {
  flaggedCells.forEach((cell) => {
    const cellNode = gameFieldNode
      .querySelector(`[data-row="${cell[CellInfoIndex.ROW]}"]`)
      .querySelector(`[data-column="${cell[CellInfoIndex.COLUMN]}"]`);

    cellNode.classList.add(
      `game-field__cell--${
        cell[CellInfoIndex.FLAG_TYPE] === FlagType.BOX ? 'box' : 'cross'
      }`
    );

    if (
      isMatchingTemplateCellBoxed(cellNode) &&
      cell[CellInfoIndex.FLAG_TYPE] === FlagType.BOX
    ) {
      correctCellsCount += 1;
    } else if (cell[CellInfoIndex.FLAG_TYPE] === FlagType.BOX) {
      correctCellsCount -= 1;
    }
  });
};

const showSolution = () => {
  const cellNodes = gameFieldNode.querySelectorAll('.game-field__cell');

  gameFieldNode.removeEventListener('click', onCellLeftClick);
  gameFieldNode.removeEventListener('contextmenu', onCellRightClick);
  gameFieldNode.classList.add('game-field--default-cursor');
  cleanFilledCells();

  cellNodes.forEach((cellNode) => {
    if (isMatchingTemplateCellBoxed(cellNode)) {
      cellNode.classList.add('game-field__cell--box');
    }
  });
};

const getGameFieldNode = () => gameFieldNode;

gameFieldNode.addEventListener('contextmenu', (evt) => evt.preventDefault());

export {
  getGameFieldNode,
  initGameField,
  resetGameField,
  getFlaggedCells,
  fillFlaggedCells,
  showSolution,
};
