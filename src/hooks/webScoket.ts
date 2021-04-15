/**
 * 自定义公共函数
 */
const wsUtils =
{
    /**
     * @name: webscoket连接建立时触发
     * @desc: 描述
     * @author: camellia
     * @email:guanchao_gc@qq.com
     * @date: 2020-12-21 
     * @param:	sock	json	webscoket对象
     */
    onOpen(sock:any) 
    {
        // 连接建立时触发
        sock.onopen = (event:any) => {
            console.log("Connection open ...");
            var timer = window.setInterval(function () { //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
                console.log('每隔10秒钟发送一次心跳');
                var ping = { "type": "ping" };
                sock.send(JSON.stringify(ping));
            }, 10000);
        }
    },
    /**
     * @name: 接收到服务端推送时执行
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-03-29 21:40:47
     * @param:	sock	json	webscoket对象
     */
    onMessage(sock:any)
    {
        // 接收到服务端推送时执行
        sock.onmessage = (event:any) => {
            var msg = event.data;
            // console.log(event);
            console.log(msg);
            console.log("webscoket 接收到返回消息！");
        };
    },
    /**
     * @name: 连接关闭时触发
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-03-29 21:40:47
     * @param:	sock	json	webscoket对象
     */
    onClose(sock: any)
    {
        // 连接关闭时触发
        sock.onclose = (event:any) => {
            console.log("Connection closed ...");
        };
    },
    /**
     * @name: 出错时触发
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-03-29 21:40:47
     * @param:	sock	json	webscoket对象
     */
    onError(sock: any)
    {
        // 出错时触发
        sock.onerror = (event: any) => {
            console.log('Error occured: ' + event.data);
        };
    },
    /**
     * @name: webscoket发送消息
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-03-29 21:29:27
     * @param:	sock	json	webscoket对象
     * @param:	msg	string	发送字符串（html）
     * @param:	userid	string	发送字符串（html）
     */
    sendMessage(sock: any, msg:string,userid:number)
    {
        var data: any = {};
        data.msg = msg;
        data.id = userid;
        var str = JSON.stringify(data);
        // 将输入框变更信息通过 send 方法发送到服务器
        if (sock.readyState === 1) 
        {
            sock.send(str);
            console.log('消息发送---success!');
        }
        else 
        {
            console.log('消息发送---faild!');
        }  
    },



}
export default wsUtils;