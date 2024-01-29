import { createNode } from './util';

const headerNode = createNode('header', 'header');
const titleNode = createNode('h1', 'header__title');
const selectsWrapperNode = createNode('div', 'header__selects');
const sizeSelectNode = createNode('select', 'header__select header__select--size');
const templateSelectNode = createNode('select', 'header__select header__select--template');
const buttonsListNode = createNode('ul', 'header__buttons');
const themeItemNode = createNode('li', 'header__item');
const themeButtonNode = createNode('button', 'header__button header__button--theme_light', { type: 'button' });
const themeButtonTextNode = createNode('span', 'visually-hidden');
const soundItemNode = createNode('li', 'header__item');
const soundButtonNode = createNode('button', 'header__button header__button--sound_on', { type: 'button' });
const soundButtonTextNode = createNode('span', 'visually-hidden');
const scoresItemNode = createNode('li', 'header__item');
const scoresButtonNode = createNode('button', 'header__button header__button--scores', { type: 'button' });
const scoresButtonTextNode = createNode('span', 'visually-hidden');

titleNode.textContent = 'Nonograms';
themeButtonTextNode.textContent = 'Dark theme';
soundButtonTextNode.textContent = 'Sound on';
scoresButtonTextNode.textContent = 'High score table';

//  Temporary options for selects
const sizeOptionNode = createNode('option', 'header__option');
const sizeOptionNode2 = createNode('option', 'header__option');
const templateOptionNode = createNode('option', 'header__option');
sizeOptionNode.textContent = '10x10';
sizeOptionNode2.textContent = '15x15';
templateOptionNode.textContent = 'Nutcracker';
sizeSelectNode.append(sizeOptionNode, sizeOptionNode2);
templateSelectNode.append(templateOptionNode);
// ****

themeButtonNode.append(themeButtonTextNode);
soundButtonNode.append(soundButtonTextNode);
scoresButtonNode.append(scoresButtonTextNode);
themeItemNode.append(themeButtonNode);
soundItemNode.append(soundButtonNode);
scoresItemNode.append(scoresButtonNode);
buttonsListNode.append(themeItemNode, soundItemNode, scoresItemNode);
selectsWrapperNode.append(sizeSelectNode, templateSelectNode);
headerNode.append(titleNode, selectsWrapperNode, buttonsListNode);

export { headerNode };
