<template>
  <div class="myUpload">
    <!-- 上传文件列表 -->
    <div class="myUpload-img center" v-for="(item,index) in mydata" :key="index">
      <img :src="item.url" v-if="type=='image'" />
      <div class="fileLogo" v-else>
        {{item.ext}}
      </div>
      <!-- 删除文件 -->
      <div class="delete" @click="del(item)">
        <i class="icon-delete">+</i>
      </div>
    </div>
    <!-- 上传框 -->
    <label class="btn center" v-if="(limit == 1 && mydata.length < 1) || limit > 1">
      <i class="icon-add">+</i>
      <!-- 多图 -->
      <input type="file"  v-if="multiple == 1 " multiple  class="inputfile" @change="handlerUpload($event)" :accept="accept" />
      <!-- 单图 -->
      <input type="file"  v-else  class="inputfile" @change="handlerUpload($event)" :accept="accept" />
    </label>
  </div>
</template>

<style scoped>
  @import "../../assets/css/components/pc/Uploads.scss";
</style>

<script>
  // 引入js文件
  import Uploads from "/@/assets/js/components/pc/Uploads";
  // 使用js对象
  export default {
    ...Uploads,
  };
</script>