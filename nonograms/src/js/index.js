import '../scss/style.scss';
import { createNode } from './util';
import './header';

const mainNode = createNode(document.body, 'main', 'main-content');

document.body.append(mainNode);
