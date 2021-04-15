import { createStore } from "vuex";

export default createStore({
  // 访问状态对象
    state:{
        // admininfo:[],//存储用户列表信息
    },
    // 访问触发状态（是一个同步的批处理方式）
    mutations:{
        // 获取列表数据
        // adminlistinfo(state,info){
        //     console.log(info.adminCount);
        //     state.admininfo = info.adminCount;
        //     state.admininfoshow = info.adminListShow;
        // },
    },
    // 是一个异步的批处理方式
    actions:{

    }
});
