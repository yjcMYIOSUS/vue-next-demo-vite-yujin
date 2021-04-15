import { createStore } from "vuex";

import fonted_index from './fonted_index';//引入某个store对象

export default createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
  modules: {
    fonted_index: fonted_index,

  }
});
