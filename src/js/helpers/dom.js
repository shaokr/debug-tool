import _ from 'lodash';
import classnames from 'classnames';

export default class NewDom {
    constructor(data = 'div') {
        this.dom = document.createElement(data);
    }
    // 设置html
    html = (data) => {
        this.dom.innerHTML = '';
        if (_.isString(data)) {
            this.dom.innerHTML = data;
        } else {
            this.append(data);
        }
        return this;
    }
    // 设置点击事件
    onClick = (ck) => {
        this.dom.addEventListener('click', ck);
        return this;
    }
    // 触发点击事件
    click = () => this.dom.click()
    // jq那种的嗯哼
    hasClass(www) {
        const _classNameList = this.className.split(' ');
        const classNameList = www.split(' ');
        // const classList = _.union(_classNameList, classNameList);
        _.forEach(classNameList, (item) => {
            const i = _.indexOf(_classNameList, item);
            if (~i) {
                _classNameList.splice(i, 1);
            } else {
                _classNameList.push(item);
            }
        });
        this.class(_classNameList);
    }
    // jq那种的嗯哼
    append(dom) {
        if (_.isElement(dom)) {
            this.dom.appendChild(dom);
        } else if (_.isElement(_.get(dom, 'dom'))) {
            this.dom.appendChild(_.get(dom, 'dom'));
        }
        return this;
    }
    // 查看样式
    get className() {
        return this.dom.className;
    }
    // 设置样式
    class(className) {
        if (_.isString(className)) {
            this.dom.className = className;
        } else {
            this.dom.className = classnames(className);
        }
        return this;
    }
    // 设置各种属性
    setattribute = (...arrt) => {
        this.dom.setAttribute(...arrt);
    }
}
