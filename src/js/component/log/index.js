/**
 * 打印块
*/
import $ from 'jquery';
import param from 'util/param';

import pure from 'less/pure.less'; // 样式
import css from './style.less';

export const main = $('<div id="DLog" />'); // new Dom();

const list = {};
const getLogGroup = (id, group) => {
    let _LogGroup = list[id];
    if (!_LogGroup) {
        _LogGroup = $(`<div class="${css['log-group']}" />`);

        const DQc = $(`
            <button class="${pure['pure-button']}">
                清除'${group}'组内容信息
            </button>
        `); // ${}new Dom('button');
        DQc.on('click', () => _LogGroup.html(''));
        //
        main.append(DQc, _LogGroup);
        list[id] = _LogGroup;
    }
    return _LogGroup;
};
/**
 * [打印数据]
 * @param  {[type]} str   [需要打印的数据]
 * @param  {Number} group [打印数据分组默认为 0]
 * @return {[type]}       [毛都木有返回]
 */
const logGroup = {};
const log = (str, group = 0) => {
    if (param.console) {
        console.trace(str);
    } else {
        console.log(str);
    }
    logGroup[group] = logGroup[group] >> 0; // 当前编号
    const _group = ++logGroup[group];
    const DLogGroup = getLogGroup(`Log-${group}`, group);
    DLogGroup.append(`<pre class="${css.pre}" >${_group}----<br/>${JSON.stringify(str, undefined, 2)}<hr/></pre>`);
    return main;
};

log.group = (name) => {
    console.group(name);
};

log.groupEnd = () => {
    console.groupEnd();
};

export default log;
