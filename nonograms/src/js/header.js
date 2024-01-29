import { createNode } from './util';

const headerNode = createNode(document.body, 'header', 'header');

createNode(headerNode, 'h1', 'header__title', 'Nonograms');

const selectsWrapperNode = createNode(headerNode, 'div', 'header__selects');
const sizeSelectNode = createNode(selectsWrapperNode, 'select', 'header__select header__select--size');
const templateSelectNode = createNode(selectsWrapperNode, 'select', 'header__select header__select--template');

const buttonsListNode = createNode(headerNode, 'ul', 'header__buttons');

const themeItemNode = createNode(buttonsListNode, 'li', 'header__item');
const soundItemNode = createNode(buttonsListNode, 'li', 'header__item');
const scoresItemNode = createNode(buttonsListNode, 'li', 'header__item');

const themeButtonNode = createNode(themeItemNode, 'button', 'header__button header__button--theme_light', '', { type: 'button' });
const soundButtonNode = createNode(soundItemNode, 'button', 'header__button header__button--sound_on', '', { type: 'button' });
const scoresButtonNode = createNode(scoresItemNode, 'button', 'header__button header__button--scores', '', { type: 'button' });

createNode(themeButtonNode, 'span', 'visually-hidden', 'Dark theme');
createNode(soundButtonNode, 'span', 'visually-hidden', 'Sound on');
createNode(scoresButtonNode, 'span', 'visually-hidden', 'High score table');

//  Temporary options for selects
createNode(sizeSelectNode, 'option', 'header__option', '10x10');
createNode(sizeSelectNode, 'option', 'header__option', '15x15');
createNode(templateSelectNode, 'option', 'header__option', 'Nutcracker');
// ****
