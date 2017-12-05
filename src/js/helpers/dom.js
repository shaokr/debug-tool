import _ from 'lodash';
import classnames from 'classnames';

export default class NewDom {
    constructor(data = 'div') {
        this.dom = document.createElement(data);
    }
    html = (data) => {
        this.dom.innerHTML = '';
        if (_.isString(data)) {
            this.dom.innerHTML = data;
        } else {
            this.append(data);
        }
        return this;
    }
    onClick = (ck) => {
        this.dom.addEventListener('click', ck);
        return this;
    }
    click = () => this.dom.click()
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
    append(dom) {
        if (_.isElement(dom)) {
            this.dom.appendChild(dom);
        } else if (_.isElement(_.get(dom, 'dom'))) {
            this.dom.appendChild(_.get(dom, 'dom'));
        }
        return this;
    }
    get className() {
        return this.dom.className;
    }
    class(className) {
        if (_.isString(className)) {
            this.dom.className = className;
        } else {
            this.dom.className = classnames(className);
        }
        return this;
    }
}