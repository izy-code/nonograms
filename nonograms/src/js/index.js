import '../scss/style.scss';
import { createNode } from './util';
import { headerNode } from './header';

const mainNode = createNode('main', 'main-content');

document.body.append(headerNode, mainNode);
