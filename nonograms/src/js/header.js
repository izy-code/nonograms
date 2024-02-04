import { createNode } from './util';
import { getTimerNode } from './timer';
import { getSelectsWrapperNode, initTemplateSelect } from './template-select';
import { getSoundItemNode } from './sound';
import {
  getLocalStorageProperty,
  setLocalStorageProperty,
} from './local-storage';

const localStorageTheme = getLocalStorageProperty('theme');

let theme = localStorageTheme === null ? 'light' : localStorageTheme;

const headerNode = createNode(null, 'header', 'header');

createNode(headerNode, 'h1', 'header__title', 'Nonograms');

headerNode.append(getTimerNode(), getSelectsWrapperNode());

const buttonsListNode = createNode(headerNode, 'ul', 'header__buttons');

const themeItemNode = createNode(buttonsListNode, 'li', 'header__item');
buttonsListNode.append(getSoundItemNode());
const scoresItemNode = createNode(buttonsListNode, 'li', 'header__item');

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

themeButtonNode.addEventListener('click', () => {
  if (theme === 'light') {
    theme = 'dark';
  } else {
    theme = 'light';
  }

  themeButtonTextNode.textContent = `${theme
    .charAt(0)
    .toUpperCase()}${theme.slice(1)} theme`;
  themeButtonNode.classList.toggle('header__button--theme_light');
  themeButtonNode.classList.toggle('header__button--theme_dark');
  document.body.classList.toggle('dark-theme');
  setLocalStorageProperty('theme', theme);
});

const initHeader = () => {
  initTemplateSelect();

  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  }
};

export { headerNode, initHeader };
