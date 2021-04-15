<template>
  <div class="modal-backdrop" v-if="modalShow">
     <div class="modal" >
        <div class="modal-header">
          <div><h3>{{title}}</h3></div>
          <div>
            <img src="../../assets/img/close.png" class="close-img" @click="confirmModal(false)">
          </div>
        </div>
        <div class="modal-body">
          <!-- 插槽 官方文档：https://cn.vuejs.org/v2/guide/components-slots.html -->
          <slot />
        </div>
        <div class="modal-footer">
            <button type="button" class="btn-close" @click="confirmModal(false)">关闭</button>
            <button type="button" class="btn-confirm" @click="confirmModal(true)">确认</button>
        </div>
    </div>
 
  </div>
</template>
 
<style lang="scss" scoped>
  @import "../../assets/css/components/pc/Modal.scss";
</style>
 
<script lang="ts">
// 引入路由
import {  
    reactive, 
    toRefs, 
} from "vue";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 引入axios钩子
import axios from "/@/hooks/axios";
export default {
  name: 'modal',
  props: {  
    modalShow: {
        type: Boolean,
        default: false, 
    },
    title: {
        type: String,
        default: '提示', 
    },
  },
  // VUE3语法 setup函数
  // setup官方文档：https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
  setup(props: any, content: any)
  {             
    /**
     * @name: 声明data
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const data = reactive({
        // 菜单显示标识
        modalShow: props.modalShow
    });

    /**
     * @name: 点击确定/关闭按钮（父组件监听点击）
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-26 
     */
    const confirmModal = (sign:boolean) => {
      // 子组件向父组件传值 
      content.emit('confirmModal', sign);
    }

    /**
     * @name: 将data绑定值dataRef
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */ 
    const dataRef = toRefs(data);
    return {
      confirmModal,
      ...dataRef
    }
  },
}
</script>