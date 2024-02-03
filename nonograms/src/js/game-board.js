import { createNode } from './util';
import { getGameFieldNode, renderGameField, initGameField } from './game-field';

const CluePosition = {
  TOP: 'top',
  LEFT: 'left',
};

const mainNode = createNode(null, 'main', 'main-content');
const gameBoardNode = createNode(mainNode, 'div', 'game-board');
const topClueNode = createNode(
  gameBoardNode,
  'div',
  'game-board__top-clue top-clue'
);
const leftClueNode = createNode(
  gameBoardNode,
  'div',
  'game-board__left-clue left-clue'
);

gameBoardNode.append(getGameFieldNode());

const renderClueNode = (size, clues, position) => {
  const clueNode = position === CluePosition.LEFT ? leftClueNode : topClueNode;
  const clueGroupName = position === CluePosition.LEFT ? 'row' : 'column';

  clueNode.innerHTML = '';

  for (let i = 0; i < size; i += 1) {
    const groupNode = createNode(
      clueNode,
      'div',
      `${position}-clue__${clueGroupName}`
    );

    for (let j = 0; j < clues[i].length; j += 1) {
      createNode(groupNode, 'div', `${position}-clue__cell`, clues[i][j]);
    }
  }
};

const getLeftClues = (matrix) => {
  const steppedMatrix = matrix.map((row) =>
    row
      .reduce(
        (rowClues, cellValue) => {
          if (cellValue) rowClues[rowClues.length - 1] += 1;
          else rowClues.push(0);

          return rowClues;
        },
        [0]
      )
      .filter((item) => item > 0)
  );

  const leftClueWidth = Math.max(...steppedMatrix.map((row) => row.length));

  return steppedMatrix.map((row) => {
    const paddingLength = leftClueWidth - row.length;
    const paddingStart = Array(paddingLength).fill('');

    return [...paddingStart, ...row];
  });
};

const getTopClues = (matrix) => {
  const transposedMatrix = matrix[0].map((_, columnIndex) =>
    matrix.map((row) => row[columnIndex])
  );

  return getLeftClues(transposedMatrix);
};

const renderGameBoard = (matrix) => {
  const leftClues = getLeftClues(matrix);
  const topClues = getTopClues(matrix);
  const topClueHeight = topClues[0].length;
  const leftClueWidth = leftClues[0].length;

  renderClueNode(matrix.length, topClues, CluePosition.TOP);
  renderClueNode(matrix.length, leftClues, CluePosition.LEFT);
  renderGameField(matrix.length);

  gameBoardNode.style.setProperty('--top-clue-height', topClueHeight);
  gameBoardNode.style.setProperty('--left-clue-width', leftClueWidth);
  gameBoardNode.style.setProperty('--field-size', matrix.length);
};

const initGameBoard = (templateMatrix) => {
  renderGameBoard(templateMatrix);
  initGameField(templateMatrix);
};

export { mainNode, initGameBoard };
