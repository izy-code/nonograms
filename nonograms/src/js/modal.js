import { createNode } from './util';

const OPACITY_TRANSITION_TIME_MS = 600;

const modalNode = createNode(null, 'div', 'modal modal--closed');
const contentNode = createNode(modalNode, 'div', 'modal__content');
const titleNode = createNode(contentNode, 'h2', 'modal__title', 'Great! You have solved the nonogram!');
const textNode = createNode(contentNode, 'p', 'modal__text', 'You could choose another template and play again.');
const buttonNode = createNode(contentNode, 'button', 'modal__button', 'OK', { type: 'button' });

const showModal = () => {
  setTimeout(() => {
    buttonNode.focus();
    modalNode.classList.add('modal--opaque');
  }, 0);

  modalNode.classList.remove('modal--closed');
  document.body.classList.add('no-scroll');
};

const closeModal = () => {
  modalNode.classList.remove('modal--opaque');

  setTimeout(() => {
    modalNode.classList.add('modal--closed');
    document.body.classList.remove('no-scroll');
  }, OPACITY_TRANSITION_TIME_MS);
};

function onDocumentEscapeKeydown(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function onModalClick(evt) {
  if (!evt.composedPath().includes(contentNode)) {
    closeModal();
  }
}

document.addEventListener('keydown', onDocumentEscapeKeydown);
buttonNode.addEventListener('click', closeModal);
modalNode.addEventListener('click', onModalClick);

export { modalNode, showModal };
