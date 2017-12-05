/**
 * 打印块
*/
import param from 'util/param';
import Dom from 'helpers/dom';

import pure from 'less/pure.less'; // 样式
import css from './style.less';

export const main = new Dom();
const list = {};
const getLogGroup = (id, group) => {
    let _LogGroup = list[id];
    if (!_LogGroup) {
        _LogGroup = new Dom(); // document.createElement('div');
        _LogGroup.class(['log-group']);

        const DQc = new Dom('button');
        DQc.class(pure['pure-button']).html(`清除'${group}'组内容信息`).onClick(() => _LogGroup.html(''));
        //
        main.append(DQc).append(_LogGroup);
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
    const _p = new Dom('p');
    _p.html(`${_group}----${JSON.stringify(str)}<hr>`);
    DLogGroup.append(_p);
    return main;
};

log.group = (name) => {
    console.group(name);
};

log.groupEnd = () => {
    console.groupEnd();
};

export default log;
