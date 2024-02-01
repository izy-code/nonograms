import '../scss/style.scss';
import {headerNode} from './header';
import { mainNode } from './game-board';
import { footerNode } from './footer';
import { initGame } from './game';


document.body.append(headerNode, mainNode, footerNode);
initGame();
