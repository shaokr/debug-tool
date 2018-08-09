/**
 * 解析参数等
 * shaokr 2016.8.29
 */
let {location} = window;
const param = (() => {
    let args = {};
    let match = null;
    const search = location.search.substring(1);
    const reg = /(?:([^&]+)=([^&]+))/g;
    while ((match = reg.exec(search)) !== null) {
        if (match[2]) {
            args[match[1]] = decodeURIComponent(match[2]);
        }
    }
    return args;
})();
const debug = param.debug || window.debug;
if (typeof debug !== 'undefined') {
    param.debug = debug;
}

export default param;
