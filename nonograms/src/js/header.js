import { createNode, dispatchCustomEvent } from './util';
import { timerNode } from './timer';
import { selectsWrapperNode } from './template-select';
import { soundItemNode } from './sound';
import {
  getLocalStorageProperty,
  setLocalStorageProperty,
} from './local-storage';

const localStorageTheme = getLocalStorageProperty('theme');
let theme = localStorageTheme === null ? 'light' : localStorageTheme;

const headerNode = createNode(null, 'header', 'header');
const titleNode = createNode(null, 'h1', 'header__title', 'Nonograms');
const buttonsListNode = createNode(null, 'ul', 'header__buttons');
const themeItemNode = createNode(null, 'li', 'header__item');
const scoresItemNode = createNode(null, 'li', 'header__item');
const themeButtonNode = createNode(
  themeItemNode,
  'button',
  `header__button header__button--theme_${theme}`,
  '',
  { type: 'button' }
);
const scoresButtonNode = createNode(
  scoresItemNode,
  'button',
  'header__button header__button--scores',
  '',
  { type: 'button' }
);
const themeButtonTextNode = createNode(
  themeButtonNode,
  'span',
  'visually-hidden',
  `${theme.charAt(0).toUpperCase()}${theme.slice(1)} theme`
);
createNode(scoresButtonNode, 'span', 'visually-hidden', 'High score table');

headerNode.append(titleNode, timerNode, selectsWrapperNode, buttonsListNode);
buttonsListNode.append(themeItemNode, soundItemNode, scoresItemNode);

const enableScoresButton = () => {
  scoresButtonNode.disabled = false;
};

const onThemeButtonClick = () => {
  if (theme === 'light') {
    theme = 'dark';
  } else {
    theme = 'light';
  }

  document.body.classList.toggle('dark-theme');
  setLocalStorageProperty('theme', theme);
  themeButtonNode.classList.toggle('header__button--theme_light');
  themeButtonNode.classList.toggle('header__button--theme_dark');
  themeButtonTextNode.textContent = `${theme
    .charAt(0)
    .toUpperCase()}${theme.slice(1)} theme`;
};

const onScoresButtonClick = () => {
  if (getLocalStorageProperty('wins') === null) {
    scoresButtonNode.disabled = true;
  } else dispatchCustomEvent(document, 'scoresShow');
};

const initHeader = () => {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  if (getLocalStorageProperty('wins') === null) {
    scoresButtonNode.disabled = true;
  }

  themeButtonNode.addEventListener('click', onThemeButtonClick);
  scoresButtonNode.addEventListener('click', onScoresButtonClick);
};

export { headerNode, initHeader, enableScoresButton };
