import { createNode, dispatchCustomEvent } from './util';
import { getLocalStorageProperty } from './local-storage';

const footerNode = createNode(null, 'footer', 'footer');
const resetButtonNode = createNode(
  footerNode,
  'button',
  'footer__button',
  'Reset game',
  { type: 'button' }
);
const randomButtonNode = createNode(
  footerNode,
  'button',
  'footer__button',
  'Random game',
  { type: 'button' }
);
const solutionButtonNode = createNode(
  footerNode,
  'button',
  'footer__button',
  'Solution',
  { type: 'button' }
);
const saveButtonNode = createNode(
  footerNode,
  'button',
  'footer__button',
  'Save game',
  { type: 'button' }
);
const continueButtonNode = createNode(
  footerNode,
  'button',
  'footer__button',
  'Continue saved game',
  { type: 'button' }
);

const disableSaveButton = () => {
  saveButtonNode.disabled = true;
};

const enableSaveButton = () => {
  saveButtonNode.disabled = false;
};

const disableSolutionButton = () => {
  solutionButtonNode.disabled = true;
};

const enableSolutionButton = () => {
  solutionButtonNode.disabled = false;
};

const initFooter = () => {
  if (getLocalStorageProperty('savedTemplateSize') === null) {
    continueButtonNode.disabled = true;
  }

  resetButtonNode.addEventListener('click', () => {
    dispatchCustomEvent(document, 'gameReset');
  });
  saveButtonNode.addEventListener('click', () => {
    dispatchCustomEvent(document, 'gameSave');
    continueButtonNode.disabled = false;
  });
  continueButtonNode.addEventListener('click', () => {
    if (getLocalStorageProperty('savedTemplateSize') === null) {
      continueButtonNode.disabled = true;
    } else {
      dispatchCustomEvent(document, 'gameContinue');
    }
  });
  randomButtonNode.addEventListener('click', () => {
    dispatchCustomEvent(document, 'gameRandom');
  });
  solutionButtonNode.addEventListener('click', () => {
    dispatchCustomEvent(document, 'gameSolution');
    disableSolutionButton();
  });
};

export {
  footerNode,
  initFooter,
  disableSaveButton,
  enableSaveButton,
  disableSolutionButton,
  enableSolutionButton,
};
