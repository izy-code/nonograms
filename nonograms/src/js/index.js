import '../scss/style.scss';
import { headerNode, initHeader } from './header';
import { initTemplateSelect } from './template-select';
import { mainNode } from './game-board';
import { footerNode, initFooter } from './footer';
import { modalNode } from './modal';
import initGame from './game';

document.body.append(headerNode, mainNode, footerNode, modalNode);

initHeader();
initGame();
initTemplateSelect();
initFooter();
