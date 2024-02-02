import { createNode, dispatchCustomEvent } from './util';
import { templates } from './templates';

const selectsWrapperNode = createNode(null, 'div', 'header__selects');
const sizeSelectNode = createNode(
  selectsWrapperNode,
  'select',
  'header__select header__select--size'
);
const templateSelectNode = createNode(
  selectsWrapperNode,
  'select',
  'header__select header__select--template'
);

const fillSizeSelectNode = () => {
  const sizes = [...new Set(templates.map((template) => template.size))];

  sizeSelectNode.innerHTML = '';

  sizes.forEach((size) => {
    createNode(sizeSelectNode, 'option', 'header__option', `${size}x${size}`);
  });
};

const fillTemplateSelectNode = () => {
  const selectedNumber = +sizeSelectNode.value.split('x')[0];

  templateSelectNode.innerHTML = '';

  const filteredTemplates = templates.filter(
    (template) => template.size === selectedNumber
  );

  filteredTemplates.forEach((template) => {
    createNode(
      templateSelectNode,
      'option',
      'header__option',
      `${template.name}`
    );
  });
};

const getCurrentTemplateMatrix = () =>
  templates.find((template) => template.name === templateSelectNode.value)
    .matrix;

const dispatchTemplateChange = () => {
  dispatchCustomEvent(document, 'templateChange', {
    name: templateSelectNode.value,
    matrix: getCurrentTemplateMatrix(),
  });
};

const initTemplateSelects = () => {
  fillSizeSelectNode();
  fillTemplateSelectNode();
  dispatchTemplateChange();

  sizeSelectNode.addEventListener('change', () => {
    fillTemplateSelectNode();
    dispatchTemplateChange();
    sizeSelectNode.blur();
  });

  templateSelectNode.addEventListener('change', () => {
    dispatchTemplateChange();
    templateSelectNode.blur();
  });
};

const getSelectsWrapperNode = () => selectsWrapperNode;

export { getSelectsWrapperNode, initTemplateSelects };
