
// window.channel = new DataChannel();
// var signaler = initReliableSignaler(channel, 'http://192.168.1.252:9999/');
// console.log(channel, signaler);
// channel.onopen = function (userid) {
//     console.log(userid);
// };
// channel.onmessage = function (message, userid) {
//     console.log(message, userid);
// };

// channel.onleave = function (userid) {
//     console.log(userid);
// };
// function ceOpen(roomid) {
//     signaler.createNewRoomOnServer(roomid, function() {
//         channel.userid = roomid;
//         channel.transmitRoomOnce = true;
//         channel.open(roomid);
//     });
// };

// function ceJoin(roomid) {
//     signaler.getRoomFromServer(roomid, function(roomid) {
//         channel.connect(roomid); // setting 'channel' & connecting socket

//         // setting 'roomToken' and 'broadcaster' and joining
//         channel.join({
//             id: roomid,
//             owner: roomid
//         });
//     });
// };
// search for existing data channels
// channel.connect();
// channel.open('111111');
// channel.send(file || data || 'text-message');
import _ from 'lodash';
import fp from 'lodash/fp';
import $ from 'jquery';
import Monitor from 'util/monitor';
import createUrlParams from 'util/create-url-params';
import param from 'util/param';
import 'datachannel';
import initReliableSignaler from './signaler';

import pure from 'less/pure.less'; // 样式
import email from 'less/email.less'; // 样式

export const main = $(`<div class="${pure['pure-form']} ${pure['pure-form-aligned']}" />`);
// <input id="ch-user" type="text" placeholder="用户名">
main.html(`
    <a id="ch-qr" href="">
        <img width="300" height="300" src="">
    </a>
    <br/>
    <label for="email">信命服务器(<a href="https://github.com/muaz-khan/Reliable-Signaler/tree/master/datachannel-client" target="_blank" >https://github.com/muaz-khan/Reliable-Signaler/tree/master/datachannel-client</a>)</label>
    <br/>
    <input id="ch-url" type="text" placeholder="信命服务器地址" value="${param.debugToolDataChannelUrl || 'http://192.168.1.252:9999/'}"  >
    <br/>
    
    <div class="${pure['pure-control-group']}">
        <input id="ch-room" type="text" placeholder="房间号" value="${param.debugToolDataChannelId || +new Date()}">
        <button id="ch-join" class="${pure['pure-button']}">加入房间</button>
    </div>
    <div class="${pure['pure-control-group']}">
        <textarea id="ch-text" placeholder="内容" />
        <button id="ch-send" class="${pure['pure-button']}">发送</button>
    </div>
    <div id="ch-log" class=${pure['pure-u-1']}></div>
`);
const itemStr = _.template(`<div class="${email['email-item']} ${pure['pure-g']} <%= unread %>">
    <div class="${pure['pure-u-3-4']}">
        <h5 class="${email['email-name']}"><%= name %></h5>
        <h4 class="${email['email-subject']}"><%= subject %></h4>
        <p class="${email['email-desc']}">
            <%= text %>
        </p>
    </div>
</div>`);
const itemAssign = fp.assign({
    name: '',
    subject: '',
    text: '',
    unread: ''
});
// itemStr
const $url = $('#ch-url', main);
const $qr = $('#ch-qr', main);
const $room = $('#ch-room', main);
const $join = $('#ch-join', main);
const $text = $('#ch-text', main);
const $send = $('#ch-send', main);

const $log = $('#ch-log', main);

$([$url[0], $room[0]]).on('change', () => {
    const val = $room.val();
    const url = $url.val();
    const text = createUrlParams({
        ...param,
        debugToolDataChannelId: val,
        debugToolDataChannelUrl: url
    }, `${window.location.origin}${window.location.pathname}${window.location.hash}`);
    const src = createUrlParams({
        text
    }, 'http://qr.liantu.com/api.php');
    $qr.attr('href', text).find('img').attr('src', '').attr('src', src);
}).change();
const onOpen = new Monitor(); // 某用户加入房间
const onMessage = new Monitor(); // 来新消息啦
const onLeave = new Monitor(); // 某用户退出了房间
const onClose = new Monitor();
class Omg {
    onOpen = onOpen
    onMessage = onMessage
    onLeave = onLeave
    onClose = onClose
    constructor(url) {
        const { DataChannel } = window;
        this.channel = new DataChannel();
        this.signaler = initReliableSignaler(this.channel, url);
        this.init();
    }
    userType = _.curry((ck, obj) => {
        const { channel } = this;
        if (obj.name === channel.userid) {
            obj.name = `你(${channel.userid})`;
            obj.unread = 'email-item-unread';
        } else if (obj.name === channel.channel) {
            obj.name = `房主大佬(${channel.channel})`;
        }
        return $log.prepend(ck(obj));
    }, 2)(_.flow([itemAssign, itemStr]))
    init = () => {
        const { channel, userType } = this;
        channel.onopen = this.onOpen.go;
        channel.onmessage = (data, userId) => this.onMessage.go({ data, userId, isThis: channel.userid === userId, isOwner: channel.userid === channel.channel });
        channel.onleave = this.onLeave.go;
        channel.onclose = this.onLeave.go;

        this.onOpen.on((userId) => {
            userType({
                name: userId,
                subject: '加入房间'
            });
        });
        this.onMessage.on(({ data, userId }) => {
            userType({
                name: userId,
                text: JSON.stringify(data, undefined, 2)
            });
        });
        this.onLeave.on((userId) => {
            if (fp.isString(userId)) {
                userType({
                    name: userId,
                    subject: '离开房间'
                });
            }
        });
        this.onClose.on(() => {
            userType({
                name: '系统通知',
                subject: '出错啦!',
                text: '可能是房主大佬断了(不影响已在用户使用'
            });
        });
    }
    // 创建房间
    create = (roomid, name) => {
        const { signaler, channel, userType } = this;
        const w = setTimeout(() => {
            userType({
                name: '系统通知',
                subject: '加入失败',
                text: '请查看信令服务器是否正常!'
            });
        }, 1000);
        signaler.createNewRoomOnServer(roomid, () => {
            clearTimeout(w);
            $log.append(userType({
                name: '系统通知',
                subject: '加入房间成功(然后你变成了大佬！'
            }));
            channel.userid = roomid; // ' //`${roomid}--${name}`;
            channel.transmitRoomOnce = true;
            channel.open(roomid);
        });
    }
    // 加入房间
    join = (roomid, name) => {
        const { signaler, channel, userType } = this;
        const w = setTimeout(() => {
            this.create(roomid);
        }, 1000);
        signaler.getRoomFromServer(roomid, (roomid) => {
            clearTimeout(w);
            if (channel.isInitiator) return;
            $log.append(userType({
                name: '系统通知',
                subject: '加入房间成功'
            }));
            channel.connect(roomid);
            channel.join({
                id: roomid,
                owner: roomid
            });
        });
    }
    // 发送数据
    send = (data) => {
        const { channel } = this;
        channel.send(data);
        this.userType({
            name: channel.userid,
            text: JSON.stringify(data, undefined, 2)
        });
        
    }
}
let _omg = false;
$join.on('click', () => {
    const url = $url.val();
    _omg = new Omg(url);
    const roomid = $room.val();
    // const userName = $user.val();
    _omg.join(roomid);
    $send.on('click', () => {
        _omg.send($text.val());
    });
});
if (param.debugToolDataChannelId) {
    $join.click();
}

export default {
    onOpen,
    onMessage,
    onLeave,
    onClose,
    send(data) {
        if (_omg) {
            _omg.send(data);
        }
    }
};
