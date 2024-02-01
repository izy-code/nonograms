import { createNode, dispatchCustomEvent } from './util';

const CluePosition = {
  TOP: 'top',
  LEFT: 'left'
};

const mainNode = createNode(null, 'main', 'main-content');
const gameBoardNode = createNode(mainNode, 'div', 'game-board');
const topClueNode = createNode(gameBoardNode, 'div', 'game-board__top-clue top-clue');
const leftClueNode = createNode(gameBoardNode, 'div', 'game-board__left-clue left-clue');
const gameFieldNode = createNode(gameBoardNode, 'div', 'game-board__game-field game-field');

const renderGameField = (size) => {
  gameFieldNode.innerHTML = '';

  for (let rowIndex = 0; rowIndex < size; rowIndex += 1) {
    const rowNode = createNode(gameFieldNode, 'div', 'game-field__row', '', { 'data-row': rowIndex });

    for (let colIndex = 0; colIndex < size; colIndex += 1) {
      createNode(rowNode, 'div', 'game-field__cell', '', { 'data-column': colIndex });
    }
  }
};

const renderClueNode = (size, clues, position) => {
  const clueNode = (position === CluePosition.LEFT) ? leftClueNode : topClueNode;
  const clueGroupName = (position === CluePosition.LEFT) ? 'row' : 'column';

  clueNode.innerHTML = '';

  for (let i = 0; i < size; i += 1) {
    const groupNode = createNode(clueNode, 'div', `${position}-clue__${clueGroupName}`);

    for (let j = 0; j < clues[i].length; j += 1) {
      createNode(groupNode, 'div', `${position}-clue__cell`, clues[i][j]);
    }
  }
};

const getLeftClues = (matrix) => {
  const steppedMatrix = matrix.map(row =>
    row.reduce((rowClues, cellValue) => {
      if (cellValue) rowClues[rowClues.length - 1] += 1;
      else rowClues.push(0);

      return rowClues;
    }, [0]).filter(item => item > 0));

  const leftClueWidth = Math.max(...steppedMatrix.map(row => row.length));

  return steppedMatrix.map(row => {
    const paddingLength = leftClueWidth - row.length;
    const paddingStart = Array(paddingLength).fill('');

    return [...paddingStart, ...row];
  });
};

const getTopClues = (matrix) => {
  const transposedMatrix = matrix[0].map((_, columnIndex) => matrix.map(row => row[columnIndex]));

  return getLeftClues(transposedMatrix);
};

const renderGameBoard = (matrix) => {
  const leftClues = getLeftClues(matrix);
  const topClues = getTopClues(matrix);
  const topClueHeight = topClues[0].length;
  const leftClueWidth = leftClues[0].length;

  renderGameField(matrix.length);
  renderClueNode(matrix.length, topClues, CluePosition.TOP);
  renderClueNode(matrix.length, leftClues, CluePosition.LEFT);

  gameBoardNode.style.setProperty('--field-size', matrix.length);
  gameBoardNode.style.setProperty('--top-clue-height', topClueHeight);
  gameBoardNode.style.setProperty('--left-clue-width', leftClueWidth);
};

const isMatchingTemplateCellBoxed = (cellNode, templateMatrix) => {
  const cellRowIndex = parseInt(cellNode.parentNode.dataset.row, 10);
  const cellColIndex = parseInt(cellNode.dataset.column, 10);

  return templateMatrix[cellRowIndex][cellColIndex] === 1;
};

let mouseListeners = [];

const initGameBoard = (templateMatrix) => {
  let currentBoxedCellsCount = 0;

  const handleClick = (cellNode, isLeftClick = true) => {
    if (isMatchingTemplateCellBoxed(cellNode, templateMatrix)) {
      if (cellNode.classList.contains('game-field__cell--box')) {
        currentBoxedCellsCount -= 1;
        dispatchCustomEvent(cellNode, 'boxedCellsCountChange', currentBoxedCellsCount);
      } else if (isLeftClick) {
        currentBoxedCellsCount += 1;
        dispatchCustomEvent(cellNode, 'boxedCellsCountChange', currentBoxedCellsCount);
      }
    }
  };

  const onCellLeftClick = (evt) => {
    const cellNode = evt.target.closest('.game-field__cell');

    if (cellNode) {
      handleClick(cellNode);
      cellNode.classList.remove('game-field__cell--cross');
      cellNode.classList.toggle('game-field__cell--box');
    }
  };

  const onCellRightClick = (evt) => {
    const cellNode = evt.target.closest('.game-field__cell');

    if (cellNode) {
      evt.preventDefault();

      handleClick(cellNode, false);
      cellNode.classList.remove('game-field__cell--box');
      cellNode.classList.toggle('game-field__cell--cross');
    }
  };

  renderGameBoard(templateMatrix);

  gameFieldNode.removeEventListener('click', mouseListeners[0]);
  gameFieldNode.removeEventListener('contextmenu', mouseListeners[1]);
  gameFieldNode.addEventListener('click', onCellLeftClick);
  gameFieldNode.addEventListener('contextmenu', onCellRightClick);

  mouseListeners = [onCellLeftClick, onCellRightClick];
};

export { mainNode, initGameBoard };
