import { createNode, dispatchCustomEvent } from './util';
import { getLocalStorageProperty } from './local-storage';

const footerNode = createNode(null, 'footer', 'footer');

const restartButtonNode = createNode(
  footerNode,
  'button',
  'footer__button',
  'Restart game',
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

if (getLocalStorageProperty('savedTemplateSize') === null) {
  continueButtonNode.disabled = true;
}

restartButtonNode.addEventListener('click', () => {
  dispatchCustomEvent(document, 'gameRestart');
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

export { footerNode, disableSaveButton, enableSaveButton };
