
import _ from 'lodash';
import $ from 'jquery';

import { main as logMain } from 'component/log'; // log组件
import { main as dataChannelMain } from 'component/data-channel'; // log组件

import pure from 'less/pure.less'; // 样式
import css from 'less/pages/index.less'; // 样式

const Debug = $(`<div class="${css.main}" />`);

const Box = $(`<div />`);

const Ul = $(`<ul class="${css.nav}" />`);

const liConfig = [
    {
        title: '刷新页面', // 名称
        onClick() { // 点击事件
            window.location.reload(true);
        }
    },
    {
        title: '打印', // 名称
        default: true,
        onClick() { // 点击事件
            Box.html(logMain);
        }
    },
    {
        title: '远程数据通讯', // 名称
        onClick() { // 点击事件
            Box.html(dataChannelMain);
        }
    }
];

_.forEach(liConfig, (item) => {
    const Li = $(`<li class=${pure['pure-button']}/>`);
    Li
        .html(item.title)
        .on('click', (e) => {
            $('>li', Ul).removeClass(css['button-secondary']);
            Li.addClass(css['button-secondary']);
            item.onClick(e);
        });
    if (item.default) {
        Li.click();
    }
    Ul.append(Li);
    return Li;
});

Debug.append(Ul, Box);

export const has = () => Debug.toggleClass(css.main__show);

export default Debug;
