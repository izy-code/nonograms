import '../scss/style.scss';
import { headerNode, initHeader } from './header';
import { mainNode } from './game-board';
import { footerNode } from './footer';
import { modalNode } from './modal';
import { initGame } from './game';

document.body.append(headerNode, mainNode, footerNode, modalNode);

initGame();
initHeader();
