import '../scss/style.scss';
import { createNode } from './util';
import { renderHeader } from './header';

const mainNode = createNode(document.body, 'main', 'main-content');

renderHeader();

document.body.append(mainNode);
