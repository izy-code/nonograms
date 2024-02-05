import { createNode } from './util';
import { gameFieldNode, initGameField } from './game-field';

const CluePosition = {
  TOP: 'top',
  LEFT: 'left',
};

const mainNode = createNode(null, 'main', 'main-content');
const gameBoardNode = createNode(mainNode, 'div', 'game-board');
const topClueNode = createNode(null, 'div', 'game-board__top-clue top-clue');
const leftClueNode = createNode(null, 'div', 'game-board__left-clue left-clue');

gameBoardNode.append(topClueNode, leftClueNode, gameFieldNode);

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

  const paddedMatrix = steppedMatrix.map((row) => {
    const paddingLength = leftClueWidth - row.length;
    const startingPadding = Array(paddingLength).fill('');

    return [...startingPadding, ...row];
  });

  return paddedMatrix;
};

const getTopClues = (matrix) => {
  const transposedMatrix = matrix[0].map((_, columnIndex) =>
    matrix.map((row) => row[columnIndex])
  );

  return getLeftClues(transposedMatrix);
};

const initCluesAndStyles = (matrix) => {
  const leftClues = getLeftClues(matrix);
  const topClues = getTopClues(matrix);
  const topClueHeight = topClues[0].length;
  const leftClueWidth = leftClues[0].length;

  renderClueNode(matrix.length, topClues, CluePosition.TOP);
  renderClueNode(matrix.length, leftClues, CluePosition.LEFT);

  gameBoardNode.style.setProperty('--top-clue-height', topClueHeight);
  gameBoardNode.style.setProperty('--left-clue-width', leftClueWidth);
  gameBoardNode.style.setProperty('--field-size', matrix.length);
};

const initGameBoard = (templateMatrix) => {
  initCluesAndStyles(templateMatrix);
  initGameField(templateMatrix);
};

export { mainNode, initGameBoard };
