// 引入公共js文件
import request from "/@/hooks/request";

/**
 * @name:获取友情链接列表
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-01 
 */
export const getdata = (data: any) => request.get("/index.php/index/getdata", data, '');