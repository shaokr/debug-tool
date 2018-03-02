/**
 * 入口文件(忘记要干啥了~~)
 * 不想写样式啊！嘤嘤嘤嘤嘤嘤嘤嘤!突然想起来！！主要支持手机！！！！！！！！！！！！嘤嘤嘤！
 * 一脸懵逼
*/
import _ from 'lodash';
import $ from 'jquery';

import Main from 'component/dom/main'; // 样式
import Fixed from 'component/dom/Fixed'; // 样式

import log from 'component/log'; // log组件
import { log as ccLog } from 'helpers/cc-ultraman'; // log组件
import DataChannel from 'component/data-channel'; // log组件

$('body').append(Main, Fixed);

const config = {
    log: (...res) => {
        log(...res);
        ccLog(...res);
    }
};

config.log(window.location, 'location喵!');

module.exports = (key, ...data) => {
    const ck = _.get(config, key);
    if (ck) return ck(...data);
};
