import { createNode } from './util';
import { getTimerNode } from './timer';
import { getSelectsWrapperNode, initTemplateSelect } from './template-select';
import {getSoundItemNode} from './sound';

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
  'header__button header__button--theme_light',
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

createNode(themeButtonNode, 'span', 'visually-hidden', 'Dark theme');
createNode(scoresButtonNode, 'span', 'visually-hidden', 'High score table');

const initHeader = () => {
  initTemplateSelect();
};

export { headerNode, initHeader };
