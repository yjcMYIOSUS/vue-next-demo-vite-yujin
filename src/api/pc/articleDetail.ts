// 引入公共js文件
import request from "/@/hooks/request";

/**
 * @name: 提交留言
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-01 
 */
export const putComment = (data: any) => request.get("/index.php/article/putComment", data, '');
/**
 * @name: 获取留言列表
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-01 
 */
export const getArticleDetail = (data: any) => request.get("/index.php/article/getArticleDetail", data, '');