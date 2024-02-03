import { createNode, dispatchCustomEvent } from './util';

let currentTemplateMatrix = [];
let mouseListeners = [];
let correctCellsCount;
let isFirstCellClick;

const gameFieldNode = createNode(
  null,
  'div',
  'game-board__game-field game-field'
);

const renderGameField = (size) => {
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

const blockGameField = () => {
  gameFieldNode.removeEventListener('click', mouseListeners[0]);
  gameFieldNode.removeEventListener('contextmenu', mouseListeners[1]);
  gameFieldNode.classList.add('game-field--default-cursor');
  cleanCrossedCells();
};

const unblockGameField = () => {
  gameFieldNode.addEventListener('click', mouseListeners[0]);
  gameFieldNode.addEventListener('contextmenu', mouseListeners[1]);
  gameFieldNode.classList.remove('game-field--default-cursor');
  cleanFilledCells();
};

const handelCellClick = (cellNode, isLeftClick = true) => {
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
  dispatchCustomEvent(document, 'correctCellsCountChange', correctCellsCount);
};

const dispatchCellFlag = (cellNode, isLeftClick = true) => {
  if (isLeftClick) {
    if (cellNode.classList.contains('game-field__cell--box')) {
      dispatchCustomEvent(document, 'emptyCellFlagChange');
    } else {
      dispatchCustomEvent(document, 'boxedCellFlagChange');
    }
  } else if (cellNode.classList.contains('game-field__cell--cross')) {
    dispatchCustomEvent(document, 'emptyCellFlagChange');
  } else {
    dispatchCustomEvent(document, 'crossedCellFlagChange');
  }
};

const onCellLeftClick = (evt) => {
  const cellNode = evt.target.closest('.game-field__cell');

  if (cellNode) {
    handelCellClick(cellNode);
    dispatchCellFlag(cellNode);
    cellNode.classList.remove('game-field__cell--cross');
    cellNode.classList.toggle('game-field__cell--box');
  }
};

const onCellRightClick = (evt) => {
  const cellNode = evt.target.closest('.game-field__cell');

  if (cellNode) {
    handelCellClick(cellNode, false);
    dispatchCellFlag(cellNode, false);
    cellNode.classList.remove('game-field__cell--box');
    cellNode.classList.toggle('game-field__cell--cross');
  }
};

const initGameField = (templateMatrix) => {
  currentTemplateMatrix = templateMatrix;
  correctCellsCount = countTemplateEmptyCells();
  isFirstCellClick = true;

  gameFieldNode.classList.remove('game-field--default-cursor');

  gameFieldNode.removeEventListener('click', mouseListeners[0]);
  gameFieldNode.removeEventListener('contextmenu', mouseListeners[1]);
  gameFieldNode.addEventListener('click', onCellLeftClick);
  gameFieldNode.addEventListener('contextmenu', onCellRightClick);

  mouseListeners = [onCellLeftClick, onCellRightClick];
};

const resetGameField = () => {
  correctCellsCount = countTemplateEmptyCells();
  isFirstCellClick = true;

  unblockGameField();
};

const saveGameField = () => {};

const getGameFieldNode = () => gameFieldNode;

gameFieldNode.addEventListener('contextmenu', (evt) => evt.preventDefault());

export {
  getGameFieldNode,
  renderGameField,
  initGameField,
  resetGameField,
  blockGameField,
  saveGameField,
};
