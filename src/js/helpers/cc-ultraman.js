/**
 * 主要与ios调试使用
 */
const { CCUltraman = () => {} } = window;

/**
 * 打印数据
 * @param {*} value 需要打印的值
 */
export const log = (value) => {
    CCUltraman({
        key: 'log',
        data: {
            value
        }
    });
};
