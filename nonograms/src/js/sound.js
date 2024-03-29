import boxCellSound from '../assets/sound/box-cell.mp3';
import crossCellSound from '../assets/sound/cross-cell.mp3';
import emptyCellSound from '../assets/sound/empty-cell.mp3';
import winSound from '../assets/sound/win.mp3';
import { createNode } from './util';
import {
  getLocalStorageProperty,
  setLocalStorageProperty,
} from './local-storage';

const localStorageSound = getLocalStorageProperty('isSoundOn');
let isSoundOn = localStorageSound === null ? true : localStorageSound;

const soundItemNode = createNode(null, 'li', 'header__item');
const soundButtonNode = createNode(
  soundItemNode,
  'button',
  `header__button header__button--sound_${isSoundOn ? 'on' : 'off'}`,
  '',
  { type: 'button' }
);
const soundButtonTextNode = createNode(
  soundButtonNode,
  'span',
  'visually-hidden',
  `Sound ${isSoundOn ? 'on' : 'off'}`
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

soundButtonNode.addEventListener('click', () => {
  isSoundOn = !isSoundOn;
  setLocalStorageProperty('isSoundOn', isSoundOn);
  soundButtonNode.classList.toggle('header__button--sound_on');
  soundButtonNode.classList.toggle('header__button--sound_off');
  soundButtonTextNode.textContent = isSoundOn ? 'Sound on' : 'Sound off';
});

export {
  soundItemNode,
  playBoxCellSound,
  playCrossCellSound,
  playEmptyCellSound,
  playWinSound,
};
