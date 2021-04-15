// 引入路由
import { useRouter, useRoute } from "vue-router";
import {
  PropType,
  ref,
  watch,
  reactive,
  toRefs,
  inject,
  provide
} from "vue";
import { common, userinfo } from "/@/hooks/common.ts";
// 引入公共js文件
import utils from "/@/assets/js/public/function";
// 引入axios钩子
import axios from "/@/hooks/axios.ts";

export default {
  name: "Uploads",
  /**
   * @name: 父组件传递来的参数
   * @author: camellia
   * @email: guanchao_gc@qq.com
   * @date: 2021-01-10
   */
  props: {
    // 多文件上传(0:单文件上传，1：多文件上传)
    multiple:{
      type: Number,
      default: 0, 
    },
    // 上传数量
    limit:{
      type: Number,
      default: 0, 
    },
    // 上传地址 url
    action:{
      type: String,
      default: '', 
    },
    // 文件类型
    ext:{
      type: Array,// 数组类型
      default: [".gif", ".jpeg", ".jpg",".png",".bmp",".doc",".docx",".xls",".mp4",".rmvb",".zip"], 
    },
    // 文件大小（mb）
    size:{
      type: Number,
      default: 0, 
    },
    // 列表初始值
    data:{
      type: Array,// 数组类型
      default: [],
    },
    // 上传文件类型（image | file）
    type:{
      type: String,
      default: 'image', 
    },
    // 随机名(1或者0)
    autoName:{
      type: Boolean,
      default: 1,
    }
  },
  // VUE3语法 setup函数
  // setup官方文档：https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
  setup(props: any, content: any)
  {
    const router = useRouter();
    /**
     * @name: 声明data
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-01-10 
     */
    const data = reactive({
      mydata: props.data ? props.data.slice() : [],
      accept: props.ext,
    });

    /**
     * @name: 整理目前已有文件
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-02-20 
     * @param:	file	object	文件对象
     * @param:	obj	object	文件上传成功之后返回的信息对象
     */
    const isImg = (file:any, obj:any) => {
      if (props.type == "image") 
      {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (ev:any) {
          // 这是base64文件编码
          // obj.url = ev.target.result;
          if(props.limit == 1)
          {
            data.mydata = [];
          }
          data.mydata.push(obj);
        };
      } 
      else 
      {
        if (props.limit == 1) 
        {
          data.mydata = [];
        }
        data.mydata.push(obj);
      }
    };

    /**
     * @name: 删除文件
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-02-20 
     * @param:	item	object	文件信息
     */
    const del = (item:any) => {
      data.mydata = data.mydata.filter(function (obj:any) {
        return obj != item;
      });
    };

    /**
     * @name: 组装上传数据(可多文件上传)
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-02-20 
     * @param:	e	obj	文件流
     */
    const handlerUpload = (e:any) => {
      var file = '';
      // 判断文件上传数量是否超限
      if (data.mydata.length >= props.limit) 
      {
        utils.alertMsg(2000, '上传文件数量已达到上限！'); return;
      }
      for (var i = 0; i < e.target.files.length; i++)
      {
        // 判断文件上传数量是否超限
        if (data.mydata.length >= props.limit) 
        {
          utils.alertMsg(2000, '上传文件数量已达到上限！'); return;
        }
        file = e.target.files[i];
        // 上传文件信息
        let dataObj = {
          file: file,
          ext: data.accept,
          size: props.size,
          autoName: props.autoName == 0 ? props.autoName : 1
        };
        // 调用上传方法
        postUpload(dataObj)
          .then(function (res: any) {
            let obj = res.data;
            isImg(file, obj);
            utils.alertMsg(2000, '操作成功！'); return;
          })
          .catch(function (error: any) {
            console.log(error);
            utils.alertMsg(2000, error.data.msg); return;
          });
      }
    };

    /**
     * @name: 上传接口
     * @author: camellia
     * @email: guanchao_gc@qq.com
     * @date: 2021-02-18 
     * @param:	data	object	上传文件数据对象
     */
    const postUpload = (data:any) => {
      var obj = new FormData();
      for (let item in data) 
      {
        obj.append(item, data[item]);
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (e:any) => {
          var completeProgress = ((e.loaded / e.total) * 100) | 0;
          // props.progress = completeProgress; //上传过程
            // 关闭 上传进度显示
          utils.alertLoadExec(false);
          utils.alertLoadExec(true, '上传进度：'+completeProgress+'%');
        }
      };
      return new Promise(function (resolve, reject) {
        axios
          .post(props.action, obj, config)
          .then(function (res) {
            // 关闭 上传进度显示
            utils.alertLoadExec(false);
            if (res.data.code == 1) 
            {
              resolve(res);
            }
            else 
            {
              reject(res);
            }
          })
          .catch(function (error) {
            reject(error);
            // 关闭 上传进度显示
            utils.alertLoadExec(false);
          });
      });
    }

    /**
      * @name: 将data绑定值dataRef
      * @author: camellia
      * @email: guanchao_gc@qq.com
      * @date: 2021-01-10 
      */
    const dataRef = toRefs(data);
    return {
      isImg, handlerUpload, postUpload, del,
      ...dataRef
    }

  }

};