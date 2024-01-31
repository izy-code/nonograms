import '../scss/style.scss';
import {headerNode} from './header';
import { mainNode } from './game-board';
import { footerNode } from './footer';
import { startGame } from './game';


document.body.append(headerNode, mainNode, footerNode);
startGame();
