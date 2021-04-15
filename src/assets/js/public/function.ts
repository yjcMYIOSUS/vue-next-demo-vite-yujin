import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import qs from "qs";
import {
    nextTick
} from "vue";

const router = useRouter();

/**
 * 自定义公共函数
 */
const utils = 
{
    /**
     * @name: 判断当前访问是pc还是phone
     * @desc: 描述
     * @author: camellia
     * @email:guanchao_gc@qq.com
     * @date: 2020-12-21 
     */
    IsPC()
    {
        var sUserAgent = navigator.userAgent;
        if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) 
        {
            return false;
        } 
        else
        {
            return true;
        }
    },
    /**
     * @name: 获取当前访问路径
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2020-12-21 
     */
    getUrlPath()
    {
        var pathname = window.location.pathname;
        return pathname;
    },
    /**
     * @name: 设置标签样式
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-03-29 
     * @param:	label	str	标签
     * @param:	style	str	样式
     */
    setLabelStyle(label: any, style: any)
    {
        document.querySelector(label).setAttribute('style', style)
    },
    /**
     * @name: 获取当前访问参数
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-13 
     */
    getUrlParams(url:String='')
    {
        if(url == '')
        {
            url = document.location.toString();
        }
        let arrUrl = url.split("?");
        if (arrUrl.length < 2 )
        {
            return '';
        }
        return arrUrl[1];
    },
    /**
     * @name: 程序停止执行时间（睡一会儿）
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2020-12-21 
     * @param:	time	number	显示时间
     */
    sleep(time:number) 
    {
        return new Promise((resolve) => setTimeout(resolve, time));
    },
    /**
     * @name: 获取不带参数的路由
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2020-12-21 
     */
    getRoutePathNoParam(route:String)
    {
        let array = route.split('?');
        if (array.length > 0)
        {
            return array[0];
        }
        else
        {
            return false;
        }
    },
    /**
     * @name: 创建路由参数对象
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-17 
     * @param:	param	json	{'param':123,'id':582}
     */
    createRouterParam(param: Object)
    {
        let data: any = {};
        for (const key of Object.keys(param)) 
        {
            if (param[key] != '' && param[key] != 0)
            {
                data[key] = param[key];
            }
        }
        return data;
    },
    /**
     * @name: 设置cookie值
     * @author: camellia
     * @date: 2020-12-28 
     * @param:	cname	string	cookie名称
     * @param:	cvalue	any	cookie值
     * @param:	exdays	number	cookie保存天数
     */
    setCookie(cname:string, cvalue:any, exdays = 720) 
    {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    /**
     * @name: 获取cookie值
     * @author: camellia
     * @date: 2020-12-28 
     */
    getCookie(cname:string) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    /**
     * @name: 清除cookie值
     * @author: camellia
     * @date: 2020-12-28 
     * @param:	cname	string	cookie名称
     */
    clearCookie(cname:string) {
        var d = new Date();
        d.setTime(-1);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=''; " + expires;
    },
    /**
     * @name: 去固定的滚动条高度
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-19 
     */
    async goToScrollTop(val:number = 0){
        if (val == 0)
        {
            val = parseInt(utils.getCookie("scrollTop_val"));
        }
        await nextTick(() => {
            document.body.scrollTop = document.documentElement.scrollTop = val;
        });
    },
    /**
     * @name:crypto-js 加密
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-22 
     */
    encryptCode(param:any) {
        var text = JSON.stringify(param);
        var key = CryptoJS.enc.Latin1.parse('!@#$%^&!@#$%^@#$'); //为了避免补位，直接用16位的秘钥
        var iv = CryptoJS.enc.Latin1.parse('!@#$%^&!@#$%^@#$'); //16位初始向量
        var encrypted = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        }).toString();
        return encrypted;
    },
    /**
     * @name: 自定义alert(确定，取消)
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-23 
     * @param:	data	string	显示的文字
     * @param:	callbackTure	function	点击确定回调函数
     * @param:	callbackFalse	function	点击取消回调函数
     */
    alert(data: any, callbackTure: any = '', callbackFalse:any = '') 
    { 
        var alert_bg = document.createElement('div');
        var alert_box = document.createElement('div');
        var alert_text = document.createElement('div');
        var alert_btn_true = document.createElement('div');
        var alert_btn_false = document.createElement('div');
        var textNode = document.createTextNode(data ? data : '')
        var btnText_false = document.createTextNode('取 消');
        var btnText_true = document.createTextNode('确 定');
        // 控制背景样式
        utils.setCss(alert_bg, {
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'right': '0',
            'bottom': '0',
            'background-color': 'rgba(0, 0, 0, 0.1)',
            'z-index': '999999999'
        });
        // 控制 提示框样式
        utils.setCss(alert_box, {
            'width': '350px',
            'max-width': '90%',
            'font-size': '18px',
            'text-align': 'center',
            'background-color': '#fff',
            'border-radius': '15px',
            'position': 'absolute',
            'top': '40%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)'
        });
        // 控制提示字体样式
        utils.setCss(alert_text, {
            'padding': '32px 15px',
            'border-bottom': '1px solid #ddd'
        });
        // 控制确定按钮样式
        utils.setCss(alert_btn_true, {
            'padding': '10px 0',
            'color': '#007aff',
            'font-weight': '600',
            'cursor': 'pointer',
            'float':'right',
            'text-align': 'center',
            'width': '49%',
        });
        // 控制取消按钮样式
        utils.setCss(alert_btn_false, {
            'padding': '10px 0',
            'color': '#007aff',
            'font-weight': '600',
            'cursor': 'pointer',
            'float': 'right',
            'text-align': 'center',
            'width': '50%',
            'border-right': '1px solid #CCC',
        });
        // 内部结构套入
        alert_text.appendChild(textNode);
        alert_btn_true.appendChild(btnText_true);
        alert_btn_false.appendChild(btnText_false);
        alert_box.appendChild(alert_text);
        alert_box.appendChild(alert_btn_true);
        alert_box.appendChild(alert_btn_false);
        alert_bg.appendChild(alert_box);
        // 整体显示到页面内
        document.getElementsByTagName('body')[0].appendChild(alert_bg);
        // 确定按钮绑定点击事件
        alert_btn_true.onclick = function () {
            // alert_bg.parentNode.removeChild(alert_bg);
            if (typeof callbackTure === 'function') 
            {
                callbackTure(); //回调
            }
            utils.setCss(alert_bg, {
                'display': 'none'
            });
        }
        // 取消按钮绑定点击事件
        alert_btn_false.onclick = function () {
            if (typeof callbackFalse === 'function') 
            {
                callbackFalse(); //回调
            }
            else if (typeof callbackTure === 'function')
            {
                callbackTure(); //回调
            }
            utils.setCss(alert_bg, {
                'display': 'none'
            });
        }
    },
    /**
     * @name: 自定义alert，在自定义时间消失
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-23 
     * @param:	data	string	显示的文字
     * @param:	callbackTure	function	点击确定回调函数
     * @param:	time	number	显示时间
     */
    alertMsg(time: number, data: any = '',  callbackTure: any = '') {
        var alert_bg = document.createElement('div');
        var alert_box = document.createElement('div');
        var alert_text = document.createElement('div');
        var textNode = document.createTextNode(data ? data : '')
        // 控制背景样式
        utils.setCss(alert_bg, {
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'right': '0',
            'bottom': '0',
            'z-index': '999999999'
        });
        // 控制 提示框样式
        utils.setCss(alert_box, {
            'width': '100%',
            'max-width': '90%',
            'font-size': '18px',
            'text-align': 'center',
            'border-radius': '15px',
            'position': 'absolute',
            'top': '40%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)'
        });
        if (data)
        {
            // 控制提示字体样式
            utils.setCss(alert_text, {
                'width': '350px',
                'border-bottom': '1px solid #ddd',
                'padding': '16px 10px',
                'color': 'white',
                'background-color': 'rgba(0, 0, 0, 0.7)',
                'opacity': 1,
                'border-radius': '4px',
                'margin': 'auto',
            });
        }
        else
        {
            // 控制load图片显示样式
            utils.setCss(alert_text, {
                'width': '100px',
                'height':'100px',
                'background':' url("/src/assets/img/loading-0.gif") no-repeat center',
                'margin':'auto'
            });
        }
        
        // 内部结构套入
        alert_text.appendChild(textNode);
        alert_box.appendChild(alert_text);
        alert_bg.appendChild(alert_box);
        // 整体显示到页面内
        document.getElementsByTagName('body')[0].appendChild(alert_bg);

        setTimeout(function () {
            if (typeof callbackTure === 'function') {
                callbackTure(); //回调
            }
            // 弹窗消失~
            utils.setCss(alert_bg, {
                'display': 'none'
            });
        }, time);
    },
    /**
     * @name: 下方自定义loading使用节点
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-02-22 21:28:32
     */
    element : '', 
    /**
     * @name: 执行显示loading（提示词）
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-02-22 21:32:27
     * @param:	sign	boolean	true:显示，false：删除
     * @param:	msg	string	提示词
     */
    alertLoadExec(sign:any,msg:any='')
    {
        if(sign)
        {
            utils.element = utils.alertLoading(true, msg);
        }
        else
        {
            if (utils.element)
            {
                utils.alertLoading(utils.element);
            }
        }
    },
    /**
     * @name: 自定义loading，true/false
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-23 
     * @param:	sign	boolean	true:显示，false：删除
     * @param:	msg	string	提示词
     */
    alertLoading(sign:any,msg:any='') 
    {
        if (sign === true)
        {
            var alert_bg = document.createElement('div');
            var alert_box = document.createElement('div');
            var alert_text = document.createElement('div');
            var textNode = document.createTextNode(msg ? msg : '')
            // 控制背景样式
            utils.setCss(alert_bg, {
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'right': '0',
                'bottom': '0',
                'z-index': '999999999'
            });
            // 控制 提示框样式
            utils.setCss(alert_box, {
                'width': '100%',
                'max-width': '90%',
                'font-size': '18px',
                'text-align': 'center',
                'border-radius': '15px',
                'position': 'absolute',
                'top': '40%',
                'left': '50%',
                'transform': 'translate(-50%, -50%)'
            });
            if (msg) 
            {
                // 控制提示字体样式
                utils.setCss(alert_text, {
                    'width': '350px',
                    'border-bottom': '1px solid #ddd',
                    'padding': '16px 10px',
                    'color': 'white',
                    'background-color': 'rgba(0, 0, 0, 0.7)',
                    'opacity': 1,
                    'border-radius': '4px',
                    'margin': 'auto',
                });
            }
            else 
            {
                // 控制load图片显示样式
                utils.setCss(alert_text, {
                    'width': '100px',
                    'height': '100px',
                    'background': ' url("/src/assets/img/loading-0.gif") no-repeat center',
                    'margin': 'auto'
                });
            }
            // 内部结构套入
            alert_text.appendChild(textNode);
            alert_box.appendChild(alert_text);
            alert_bg.appendChild(alert_box);
            // 整体显示到页面内
            document.getElementsByTagName('body')[0].appendChild(alert_bg);
            return alert_bg;
        }
        else
        {
            // for(var i = 0; i< sign.length;i++)
            // {
            // var _parentElement = sign[i].parentNode;
            var _parentElement = sign.parentNode;
            if (_parentElement) {
                _parentElement.removeChild(sign);
            }
            // }
        }
    },
    /**
     * @name: 自定义alert添加css
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-23 
     */
    setCss(targetObj:any, cssObj:any) {
        var str = targetObj.getAttribute("style") ? targetObj.getAttribute('style') : '';
        for (var i in cssObj) 
        {
            str += i + ':' + cssObj[i] + ';';
        }
        targetObj.style.cssText = str;
    }
}
export default utils;