<template>
  <!-- 公共loading组件 -->
  <load :loading=loading />
  <!-- 主体内容 -->
  <div v-if="loading == false">
    <!-- 公共标题组件 -->
    <Header v-on:closeMenu="closeMenu" :show="showRef" />
    <main id="main">
      <!-- 公共导航组件 -->
      <Menu v-on:showMenuByChild="showMenuByChild" />
      <!-- 主体内容 -->
      <section >
        <div class="xttblog">
          <!-- 本站信息 -->
          <div>
            <h2> <p>链接申请说明</p> </h2>
              <p>交换友链可在下方点击留言.本站链接如下：</p>
              <p>名称：时间里的博客</p>
              <p>网址：https://guanchao.site</p>
              <p>图标：https://resource.guanchao.site/uploads/website/5c093bf268185.png</p>
              <br>
              <p>申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)</p>
          </div> <br>
          <!-- 友情链接列表 -->
          <ul class="box">
              <li>
                <a  @click="openModal()" class="cursor">
                  <img src="/@/assets/img/plus.png" class="plus" />
                </a>
              </li>
              <li v-for="(item, index) in friendLinkList" :key="index" >
                <a href="#" @click="jumpFriendLink(item.friendlink)">
                  <img :src="item.logo" class="show" /> 
                  <br> <br>
                  {{item.friendname}}
                </a>
              </li>
          </ul>
        </div>
      </section>
    </main>
    <!-- 抽屉组件 -->
    <drawer ></drawer>
    <!-- 置顶和IM按钮 -->
    <TopIM />
    <!-- 网站底部组件 -->
    <Footer />
    <Modal v-on:confirmModal="confirmModal" :modalShow="modalShow" :title="modalTitle">
      <div style="width:100%;padding-left:20px" >
        友情链接名称：&nbsp;<input type="text" v-model="friendname" class="input" placeholder="请输入友情链接名称"><br><br>
        友情链接url：&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="friendlink" class="input" placeholder="请输入友情链接url"><br><br>
        友情icon链接：&nbsp;<input type="text" v-model="friendlogo" class="input" placeholder="请输入友情icon链接"><br>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/pc/friendlink.scss";
</style>

<script lang="ts">
// 引入js文件
import friendlink from "/@/assets/js/pc/friendlink";
import Modal from '/@/components/pc/Modal.vue';

// 使用js对象
export default {
  ...friendlink,
};
</script>
