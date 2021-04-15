// 引入公共js文件
import request from "/@/hooks/request";
/**
 * @name: 账号密码登录/注册/更改密码
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-08 
 */
export const accountLogin = (data: any) => request.post("/index.php/user/accountLogin", data, '');
/**
 * @name: 退出登录
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-08 22:07:58
 */
export const layout = (data: any) => request.get("/index.php/user/layout", data, '');
/**
 * @name: 获取底部信息及session信息
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-08 
 */
export const getFooterDataApi = (data: any) => request.get("/index.php/footer/getFooterData", data, '');
/**
 * @name: 修改昵称
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-08 
 */
export const updateNicknameApi = (data: any) => request.post("/index.php/user/updateNickname", data, '');
/**
 * @name: 发邮件验证码
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-08 22:22:14
 */
export const sendEmailCodeApi = (data: any) => request.post("/index.php/user/sendEmailCode", data, '');