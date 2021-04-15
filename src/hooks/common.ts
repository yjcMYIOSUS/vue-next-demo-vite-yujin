// 公共状态文件：替代VUEX
import { reactive } from 'vue';
/**
 * @name: 全局状态显示
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-01-23 
 */
export const common = reactive({ 
    // 测试全局状态
    glabl: 0 ,
    // 自定义loading组件
    loading:true,
    // 回到顶部是否显示
    topShow:false,
    // 聊天抽屉是否显示
    drawerShow:false,
    // 搜索字符串
    search:'',
    // 菜单显示标识（is_menu,is_search,is_login）
    menuSign:'is_menu',
    // 当前网页url
    currectUrl:'',
    // 大图显示
    bigImgShow:false,
});

/**
 * @name: 用户信息全局状态
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-01-23 
 */
export const userinfo = reactive({
    // 用户id，加密之后的
    userid:'',
    // 用户昵称
    nickname:'',
    // 用户头像链接
    figureurl:'',
    // 用户邮箱
    email:'',
});

/**
 * @name: webScoket 全局状态对象
 * @author: camellia
 * @email: guanchao_gc@qq.com
 * @date: 2021-01-23 
 */
export const webScoketObject = reactive({
    // webscoket 对象
    scoketObject: new WebSocket('wss://guanchao.site/websocket/'),
    // timer定时器对象
    timer:0,
    // 是否存在webscoket对象
    webscoketSign:false,
});

