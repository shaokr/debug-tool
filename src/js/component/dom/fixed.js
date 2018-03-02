
import $ from 'jquery';

import { has } from './main';
// import pure from 'less/pure.less'; // 样式
import css from 'less/pages/index.less'; // 样式

const Fixed = $(`<div class="${css.fixed}" />`); // new Dom();
Fixed.on('click', has);

export default Fixed;
