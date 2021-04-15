// 引入公共js文件
import request from "/@/hooks/request";

/**
 * @name:根据分类获取文章列表
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-03-01 
 */
export const getArticleListByCategory = (data: any) => request.get("/index.php/article/getArticleListByCategory", data, '');
