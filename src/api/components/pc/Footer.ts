// 引入公共js文件
import request from "/@/hooks/request";
/**
 * @name: 获取底部信息及session信息
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-08 
 */
export const getFooterDataApi = (data: any) => request.get("/index.php/footer/getFooterData", data, '');