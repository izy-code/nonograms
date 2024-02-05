import { createNode } from './util';

const OPACITY_TRANSITION_TIME_MS = 600;

const sizeToDifficulty = {
  '5x5': 'Easy',
  '10x10': 'Medium',
  '15x15': 'Hard',
};

const modalNode = createNode(null, 'div', 'modal modal--closed');
const contentNode = createNode(modalNode, 'div', 'modal__content');
const titleNode = createNode(contentNode, 'h2', 'modal__title');
const buttonNode = createNode(contentNode, 'button', 'modal__button', 'OK', {
  type: 'button',
});
const textNode = createNode(null, 'p', 'modal__text');
const tableNode = createNode(null, 'table', 'modal__table');

const createTableRow = (isHeaderRow, ...data) => {
  const rowNode = createNode(tableNode, 'tr', 'modal__row');

  let isFirstCell = true;

  data.forEach((item) => {
    if (isHeaderRow)
      createNode(rowNode, 'th', 'modal__cell modal__cell--header', item);
    else if (isFirstCell)
      createNode(rowNode, 'th', 'modal__cell modal__cell--header', item);
    else createNode(rowNode, 'td', 'modal__cell', item);

    isFirstCell = false;
  });

  return rowNode;
};

const fillTableNode = (wins) => {
  const winsSortedByTime = wins.toSorted((a, b) => a.time - b.time);

  tableNode.innerHTML = '';
  createTableRow(true, 'Rank', 'Nonogram', 'Difficulty', 'Time');

  winsSortedByTime.forEach((win, index) => {
    createTableRow(
      false,
      index + 1,
      win.name,
      `${sizeToDifficulty[win.size]} (${win.size})`,
      win.formattedTime
    );
  });
};

const showModal = () => {
  setTimeout(() => {
    buttonNode.focus();
    modalNode.classList.add('modal--opaque');
  }, 0);

  modalNode.classList.remove('modal--closed');
  document.body.classList.add('no-scroll');
};

const showModalWinMessage = (textContent) => {
  showModal();
  titleNode.textContent = 'Great!';
  textNode.textContent = textContent;
  titleNode.after(textNode);
};

const showModalScores = (wins) => {
  showModal();
  titleNode.textContent = 'List of recent win results:';
  fillTableNode(wins);
  titleNode.after(tableNode);
};

const closeModal = () => {
  modalNode.classList.remove('modal--opaque');

  setTimeout(() => {
    modalNode.classList.add('modal--closed');
    document.body.classList.remove('no-scroll');
    textNode.remove();
    tableNode.remove();
  }, OPACITY_TRANSITION_TIME_MS);
};

const onDocumentEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

const onModalClick = (evt) => {
  if (!evt.composedPath().includes(contentNode)) {
    closeModal();
  }
};

document.addEventListener('keydown', onDocumentEscapeKeydown);
buttonNode.addEventListener('click', closeModal);
modalNode.addEventListener('click', onModalClick);

export { modalNode, showModalWinMessage, showModalScores };
