import { createNode } from './util';

const renderFooter = () => {
  const footerNode = createNode(document.body, 'footer', 'footer');

  const randomButtonNode = createNode(footerNode, 'button', 'footer__button', 'Random game', { type: 'button' });
  const solutionButtonNode = createNode(footerNode, 'button', 'footer__button', 'Solution', { type: 'button' });
  const saveButtonNode = createNode(footerNode, 'button', 'footer__button', 'Save game', { type: 'button' });
  const continueButtonNode = createNode(footerNode, 'button', 'footer__button', 'Continue saved game', { type: 'button' });
};

export { renderFooter };
