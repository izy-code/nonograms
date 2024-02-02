import { createNode, dispatchCustomEvent } from './util';

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

restartButtonNode.addEventListener('click', () => {
  dispatchCustomEvent(restartButtonNode, 'gameRestart');
});

export { footerNode };
