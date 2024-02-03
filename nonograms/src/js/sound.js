import boxCellSound from '../assets/sound/box-cell.mp3';
import crossCellSound from '../assets/sound/cross-cell.mp3';
import emptyCellSound from '../assets/sound/empty-cell.mp3';
import winSound from '../assets/sound/win.mp3';
import { createNode } from './util';
import { setLocalStorageObjectProperty } from './local-storage';

let isSoundOn = true;

const soundItemNode = createNode(null, 'li', 'header__item');
const soundButtonNode = createNode(
  soundItemNode,
  'button',
  'header__button header__button--sound_on',
  '',
  { type: 'button' }
);
const soundButtonTextNode = createNode(
  soundButtonNode,
  'span',
  'visually-hidden',
  'Sound on'
);

const playSound = (soundSrc) => {
  if (isSoundOn) {
    const audio = new Audio(soundSrc);

    audio.play();
  }
};

const playBoxCellSound = () => playSound(boxCellSound);
const playCrossCellSound = () => playSound(crossCellSound);
const playEmptyCellSound = () => playSound(emptyCellSound);
const playWinSound = () => playSound(winSound);

const getSoundItemNode = () => soundItemNode;

soundButtonNode.addEventListener('click', () => {
  isSoundOn = !isSoundOn;
  soundButtonTextNode.textContent = isSoundOn ? 'Sound on' : 'Sound off';
  soundButtonNode.classList.toggle('header__button--sound_on');
  soundButtonNode.classList.toggle('header__button--sound_off');
  setLocalStorageObjectProperty('isSoundOn', isSoundOn);
});

export {
  getSoundItemNode,
  playBoxCellSound,
  playCrossCellSound,
  playEmptyCellSound,
  playWinSound,
};
