import { createNode } from './util';
import { currentMatrix } from './header';

const CluePosition = {
  TOP: 'top',
  LEFT: 'left'
};

const renderMain = () => {
  const mainNode = createNode(document.body, 'main', 'main-content');
  const gameBoardNode = createNode(mainNode, 'div', 'game-board');
  const topClueNode = createNode(gameBoardNode, 'div', 'game-board__top-clue top-clue');
  const leftClueNode = createNode(gameBoardNode, 'div', 'game-board__left-clue left-clue');
  const gameFieldNode = createNode(gameBoardNode, 'div', 'game-board__game-field game-field');

  const restartGameField = (size) => {
    for (let rowIndex = 0; rowIndex < size; rowIndex += 1) {
      const rowNode = createNode(gameFieldNode, 'div', 'game-field__row', '', { 'data-row': rowIndex });

      for (let colIndex = 0; colIndex < size; colIndex += 1) {
        createNode(rowNode, 'div', 'game-field__cell', '', { 'data-column': colIndex });
      }
    }
  };

  const restartClueNode = (size, clueCount, position) => {
    const clueNode = (position === CluePosition.LEFT) ? leftClueNode : topClueNode;
    const clueGroupName = (position === CluePosition.LEFT) ? 'row' : 'column';

    for (let i = 0; i < size; i += 1) {
      const groupNode = createNode(clueNode, 'div', `${position}-clue__${clueGroupName}`);

      for (let j = 0; j < clueCount; j += 1) {
        createNode(groupNode, 'div', `${position}-clue__cell`);
      }
    }
  };

  const getLeftClues = (matrix) => matrix.map(row =>
    row.reduce((rowClues, cellValue) => {
      if (cellValue) rowClues[rowClues.length - 1] += 1;
      else rowClues.push(0);

      return rowClues;
    }, []).filter(item => item > 0)
  );

  const getTopClues = (matrix) => {
    const transposedMatrix = matrix[0].map((_, columnIndex) => matrix.map(row => row[columnIndex]));

    return getLeftClues(transposedMatrix);
  };

  const leftClues = getLeftClues(currentMatrix);
  const topClues = getTopClues(currentMatrix);
  const topClueHeight = topClues.reduce((max, row) => Math.max(max, row.length), 0);
  const leftClueWidth = leftClues.reduce((max, row) => Math.max(max, row.length), 0);
  const templateBoxedCellCount = leftClues.reduce((sum, clue) => sum + clue);

  restartClueNode(15, 8, CluePosition.TOP);
  restartClueNode(15, 8, CluePosition.LEFT);
  restartGameField(15);

  gameBoardNode.style.setProperty('--field-size', currentMatrix.length);
  gameBoardNode.style.setProperty('--top-clue-height', topClueHeight);
  gameBoardNode.style.setProperty('--left-clue-width', leftClueWidth);

  gameFieldNode.addEventListener('click', (evt) => {
    const cellNode = evt.target.closest('.game-field__cell');

    if (cellNode) {
      cellNode.classList.remove('game-field__cell--cross');
      cellNode.classList.toggle('game-field__cell--box');
    }
  });

  gameFieldNode.addEventListener('contextmenu', (evt) => {
    const cellNode = evt.target.closest('.game-field__cell');

    if (cellNode) {
      evt.preventDefault();

      cellNode.classList.remove('game-field__cell--box');
      cellNode.classList.toggle('game-field__cell--cross');
    }
  });
};

export { renderMain };
