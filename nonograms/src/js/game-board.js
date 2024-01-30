import { createNode } from './util';

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

  restartClueNode(15, 8, CluePosition.TOP);
  restartClueNode(15, 8, CluePosition.LEFT);
  restartGameField(15);
};

export { renderMain };
