import { Router } from "vue-router";
export default
{
    /**
     * 路由守卫检查权限
     * @param guard 
     * @param router 
     */
    checkAuth(guard: any, router: Router) 
    {
        //检查路由是否存在
        if (!router.hasRoute(guard.name)) {
            //三层不同404路由
            if (guard.fullPath.indexOf("/frame") >= 0) 
            {
                router.push("/404");
            } 
            else if (guard.fullPath.indexOf("/pages") >= 0) 
            {
                router.push("/404");
            } 
            else 
            {
                router.push("/404");
            }
            return;
        }

        /*//检查是否Home页
        if(guard.fullPath.indexOf('/home/') >= 0){
            return;
        }
        //检查登录状态
        let continueFlag: boolean = authInstance.init(guard).checkLogin(router);
        if (!continueFlag) {
            return;
        }
        //检查权限
        authInstance.checkAuth(router);//*/
    }
}