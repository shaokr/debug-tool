
import _ from 'lodash';
import Dom from 'helpers/dom';

import { main as logMain } from 'component/log'; // log组件

import pure from 'less/pure.less'; // 样式
import css from 'less/pages/index.less'; // 样式

const Debug = new Dom();
Debug.class(css.main);

const Box = new Dom();

const Ul = new Dom('ul');
Ul.class(css.nav);
const liConfig = [
    {
        title: '打印', // 名称
        default: true,
        onClick() { // 点击事件
            Box.html(logMain);
        }
    }
];

const liList = _.map(liConfig, (item) => {
    const Li = new Dom('li');
    const onClick = (e) => {
        _.forEach(liList, (val) => { val.class(pure['pure-button']); });
        Li.class([pure['pure-button'], css['button-secondary']]);
        item.onClick(e);
    };
    Li.html(item.title).class(pure['pure-button']).onClick(onClick);
    if (item.default) {
        Li.click();
    }
    Ul.append(Li);
    return Li;
});

Debug.append(Ul);
Debug.append(Box);

export const has = () => Debug.hasClass(css.main__show);

export default Debug;
