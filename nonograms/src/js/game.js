import { initGameBoard } from './game-board';
import {
  resetGameField,
  getFlaggedCells,
  fillFlaggedCells,
  showSolution,
} from './game-field';
import { showModalWinMessage, showModalScores } from './modal';
import { setTemplateValues } from './template-select';
import {
  disableSaveButton,
  enableSaveButton,
  enableSolutionButton,
  disableSolutionButton,
} from './footer';
import {
  startTimer,
  resetTimer,
  stopTimer,
  setTimer,
  getPassedTimeInSeconds,
  getFormattedTime,
} from './timer';
import {
  playBoxCellSound,
  playCrossCellSound,
  playEmptyCellSound,
  playWinSound,
} from './sound';
import {
  getLocalStorageProperty,
  setLocalStorageProperty,
  addWin,
  getWins,
} from './local-storage';
import { templates } from './templates';
import { enableScoresButton } from './header';

let excludedDataIndexes = [];
let currentTemplate = {};
let hasTemplateChangedRandomly = false;

const getRandomIndex = () => {
  const availableDataIndexes = [...templates.keys()].filter(
    (index) => !excludedDataIndexes.includes(index)
  );

  return availableDataIndexes[
    Math.floor(Math.random() * availableDataIndexes.length)
  ];
};

const printSolution = (matrix) => {
  let result = '';

  matrix.forEach((row) => {
    result += `${row.map((cell) => (cell ? '⬛' : '⬜')).join('')}\n`;
  });

  console.clear();
  console.log(result);
};

const getTemplateIndex = (size, name) =>
  templates.findIndex(
    (template) =>
      template.size === +size.split('x')[0] && template.name === name
  );

const onGameWin = () => {
  stopTimer();
  showModalWinMessage(
    `You have solved the ${
      currentTemplate.name
    } nonogram in ${getPassedTimeInSeconds()}\u00A0seconds!`
  );
  playWinSound();
  enableScoresButton();
  disableSaveButton();
  disableSolutionButton();
  addWin(
    currentTemplate.size,
    currentTemplate.name,
    getPassedTimeInSeconds(),
    getFormattedTime()
  );
};

const onGameReset = () => {
  resetGameField(currentTemplate.matrix);
  resetTimer();
  enableSaveButton();
  enableSolutionButton();
};

const onGameSave = () => {
  setLocalStorageProperty('savedTemplateSize', currentTemplate.size);
  setLocalStorageProperty('savedTemplateName', currentTemplate.name);
  setLocalStorageProperty('savedFlaggedCells', getFlaggedCells());
  setLocalStorageProperty('savedTimeInSeconds', getPassedTimeInSeconds());
};

const onGameContinue = () => {
  setTemplateValues(
    getLocalStorageProperty('savedTemplateSize'),
    getLocalStorageProperty('savedTemplateName')
  );
  setTimer(getLocalStorageProperty('savedTimeInSeconds'));
  fillFlaggedCells(getLocalStorageProperty('savedFlaggedCells'));
  disableSaveButton();
};

const onGameRandom = () => {
  hasTemplateChangedRandomly = true;
  const randomIndex = getRandomIndex();
  const { size } = templates[randomIndex];

  setTemplateValues(`${size}x${size}`, templates[randomIndex].name);
  excludedDataIndexes.push(randomIndex);

  if (excludedDataIndexes.length === templates.length) {
    excludedDataIndexes = [randomIndex];
  }
};

const onGameSolution = () => {
  showSolution();
  resetTimer();
  disableSaveButton();
};

const onScoresShow = () => {
  showModalScores(getWins());
};

const onTemplateChange = (evt) => {
  currentTemplate = evt.detail;

  initGameBoard(currentTemplate.matrix);
  resetTimer();
  printSolution(currentTemplate.matrix);

  enableSaveButton();
  enableSolutionButton();

  if (!hasTemplateChangedRandomly) {
    excludedDataIndexes = [
      getTemplateIndex(currentTemplate.size, currentTemplate.name),
    ];
  }

  hasTemplateChangedRandomly = false;
};

const onCellFlagChange = (evt) => {
  if (evt.detail === 'box') {
    playBoxCellSound();
  } else if (evt.detail === 'cross') {
    playCrossCellSound();
  } else {
    playEmptyCellSound();
  }

  enableSaveButton();
};

const initGame = () => {
  document.addEventListener('templateChange', onTemplateChange);
  document.addEventListener('cellFlagChange', onCellFlagChange);
  document.addEventListener('gameWin', onGameWin);
  document.addEventListener('gameReset', onGameReset);
  document.addEventListener('gameSave', onGameSave);
  document.addEventListener('gameContinue', onGameContinue);
  document.addEventListener('gameRandom', onGameRandom);
  document.addEventListener('gameSolution', onGameSolution);
  document.addEventListener('timerStart', startTimer);
  document.addEventListener('scoresShow', onScoresShow);
};

export { initGame };
