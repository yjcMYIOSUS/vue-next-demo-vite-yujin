// 引入公共js文件
import request from "/@/hooks/request";

/**
 * @name:提交友情链接
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-01 
 */
export const applyFriendLink = (data: any) => request.post("/index.php/friendlink/applyFriendLink", data, '');

/**
 * @name:获取友情链接列表
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-01 
 */
export const getFriendLinkList = (data: any) => request.get("/index.php/friendlink/getFriendLinkList", data, '');
