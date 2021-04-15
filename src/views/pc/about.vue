<template>
  <!-- 公共loading组件 -->
  <load :loading=loading />
  <div v-if="loading == false">
    <!-- 公共标题组件 -->
    <Header v-on:closeMenu="closeMenu" :show="showRef" />
    <main id="main" class="mar-bottom">
      <!-- 公共导航组件 -->
      <Menu v-on:showMenuByChild="showMenuByChild" />
      <!-- 主体内容 -->
      <div class="article-wrap">
        <div class="row container">
          <div class="col-xl-3"></div>
          <div class="col-xl-6">
            <article class="article">
              <div class="wrap">
                <section class="head">
                  <img
                    class="lazyload"
                    data-original="https://resource.guanchao.site/uploads/sowing/welcome-image4.jpg"
                    src="https://resource.guanchao.site/uploads/sowing/welcome-image4.jpg"
                    draggable="false"
                  />
                  <div class="head-mask">
                    <h1 class="head-title">关于</h1>
                    <div class="head-info">
                      <span class="post-info-item"
                        ><i class="iconfont iconcalendar"></i>岁月无路可退，惟愿殊途同归</span>
                    </div>
                  </div>
                </section>
                <section class="main">

                  <section class="content">
                    <!-- 自我介绍 -->
                    <h1 id="Me">
                      <a href="#Me" class="headerlink" title="Me"></a>Me
                    </h1>
                    <p class="cursor">
                      <a @click="goToMyResume()">去我的简历页>>></a> 
                    </p>
                    <!-- 我的项目 -->
                    <h1 id="Projects">
                      <a href="#Projects" class="headerlink" title="Projects"></a>Projects
                    </h1>
                    <p>
                      <strong ><a
                          href="https://gitee.com/camelliass/vue3blog"
                          target="_blank"
                          rel="noopener" >vue3blog</a></strong >
                    </p>
                    <p>
                      vue3.0 + vite2.1.2 + vue-router4.0 制作的个人博客
                    </p>
                    <p>
                      <strong ><a
                          href="https://gitee.com/camelliass/vue2-backend"
                          target="_blank"
                          rel="noopener" >vue2后端管理系统</a></strong >
                    </p>
                    <p>
                      早年接触VUE的时候，自己写的一个后端管理系统。vue2 + iview + vue-cli3 + vue-router3
                    </p>

                    <!-- 联系方式 -->
                    <h1 id="Contact">
                      <a href="#Contact" class="headerlink" title="Contact"></a>Contact
                    </h1>
                    <p>
                      E-Mail：<a >guanchao_gc@qq.com</a><br />
                      Gitee： <a href="https://gitee.com/camelliass" target="_blank" rel="noopener">https://gitee.com/camelliass</a><br />
                      CSDN：<a href="https://blog.csdn.net/qq_39708228" target="_blank" rel="noopener" >https://blog.csdn.net/qq_39708228</a ><br />
                      博客园：<a href="https://www.cnblogs.com/camellias/" target="_blank" rel="noopener" >https://www.cnblogs.com/camellias/</a ><br />
                    </p>
                  </section>

                  <section class="comments">
                    <!-- 显示评论框 -->
                    <div class="vcount" style="display: block; line-height:45px">
                      <span class="vnum">留言列表</span> 
                      <span class="right" style="margin-right:3%">
                        <button class="login-button" @click="openModal('留言')">点我留言</button>
                      </span>
                    </div>
                    <div class="vcards" v-for="(item, index) in messageList" :key="index">
                        <div class="vcard" >
                            <img class="vimg" :src="item.figureurl_qq">
                            <div class="vh">
                                <div class="vhead">
                                  <span class="vnick">{{item.nickname}}</span> 
                                </div>
                                <div class="vmeta">
                                  <span class="vtime">{{item.addtime}}</span>
                                  <span class="vat" @click="openModal('留言回复',item.id)">回复</span>
                                </div>
                                <div class="vcontent" >
                                    <p v-html="item.content"></p>
                                </div>
                                <div class="vreply-wrapper" ></div>
                                <div class="vquote" v-for="(value, key) in item.com_two" :key="key">
                                    <div class="vcard" ><img class="vimg"
                                            :src="value.figureurl_qq">
                                        <div class="vh">
                                            <div class="vhead">
                                              <span class="vnick">{{value.nickname}} 回复 {{value.reply_nickname}}</span> 
                                            </div>
                                            <div class="vmeta">
                                              <span class="vtime">{{value.addtime}}</span>
                                              <span class="vat" @click="openModal('留言回复',value.id)">回复</span>
                                            </div>
                                            <div class="vcontent" >
                                                <p v-html="value.content"></p>
                                            </div>
                                            <div class="vreply-wrapper" ></div>
                                            <div class="vquote" ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </section>

                </section>
              </div>
            </article>
          </div>
          <div class="col-xl-3"></div>
        </div>
      </div>
    </main>
    <!-- 抽屉组件 -->
    <drawer ></drawer>
    <!-- 置顶和IM按钮 -->
    <TopIM />
    <!-- 网站底部组件 -->
    <Footer />
    <Modal v-on:confirmModal="confirmModal" :modalShow="modalShow" :title="modalTitle">
      <div style="width:100%;padding-left:20px" >
        <Wangeditor v-on:getWangEditorValue="getWangEditorReplayValue" ></Wangeditor>
        <div class="input-button" style="margin-bottom:0px" v-if="!loginSign">
          <input type="text" placeholder="请输入您的邮箱！" v-model="email"  style="width:100%">
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/css/pc/article-detail.scss";
@import "../../assets/css/pc/about.scss";
</style>

<script lang="ts">
// 引入js文件
import about from "/@/assets/js/pc/about";

// 使用js对象
export default {
  ...about,
};
</script>
