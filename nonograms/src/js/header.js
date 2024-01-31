import { createNode } from './util';
import { templates } from './templates';

const headerNode = createNode(document.body, 'header', 'header');

createNode(headerNode, 'h1', 'header__title', 'Nonograms');

const timerNode = createNode(headerNode, 'span', 'header__timer', '00:00');

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

const fillSizeSelectNode = () => {
  const sizes = [...new Set(templates.map((template) => template.size))];

  sizeSelectNode.innerHTML = '';

  sizes.forEach(size => {
    createNode(sizeSelectNode, 'option', 'header__option', `${size}x${size}`);
  });
};

const fillTemplateSelectNode = () => {
  const selectedNumber = +sizeSelectNode.value.split('x')[0];

  templateSelectNode.innerHTML = '';

  const filteredTemplates = templates.filter((template) => template.size === selectedNumber);

  filteredTemplates.forEach((template) => {
    createNode(templateSelectNode, 'option', 'header__option', `${template.name}`);
  });
};

const getCurrentTemplateMatrix = () =>
  templates.find((template) => template.name === templateSelectNode.value).matrix;

fillSizeSelectNode();
fillTemplateSelectNode();
sizeSelectNode.addEventListener('change', fillTemplateSelectNode);
sizeSelectNode.addEventListener('change', fillTemplateSelectNode);

export { getCurrentTemplateMatrix };
