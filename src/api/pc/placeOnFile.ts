// 引入公共js文件
import request from "/@/hooks/request";
/**
 * @name:提交友情链接
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-01 
 */
export const getFileList = (data: any) => request.get("/index.php/placeonfile/getFileList", data, '');

