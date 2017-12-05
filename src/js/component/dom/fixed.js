
import Dom from 'helpers/dom';

import { has } from './main';
// import pure from 'less/pure.less'; // 样式
import css from 'less/pages/index.less'; // 样式

const Fixed = new Dom();
Fixed.class(css.fixed).onClick(has);

export default Fixed;
