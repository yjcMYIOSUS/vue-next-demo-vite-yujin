<template>
  <!-- 公共loading组件 -->
  <load :loading=loading />
  <!-- 主体内容 -->
  <div v-if="loading == false">
    <!-- 公共标题组件 -->
    <Header v-on:closeMenu=closeMenu :show=showRef  />
    <main id="main">
      <!-- 公共导航组件 -->
      <Menu v-on:showMenuByChild=showMenuByChild  />
      <!-- 主体内容 -->
      <div class="article-wrap">
        <div class="row container">
          <div class="col-xl-1"></div>
          <div class="col-xl-9">
            <article class="article">
              <div class="wrap">
                <!-- 顶部头 -->
                <section class="head">
                  <img class="lazyload" data-original="static/picture/20191211070006.jpg"
                    :src="articleDetail.artlogo"
                    draggable="false">
                  <div class="head-mask">
                    <h1 class="head-title">{{articleDetail.arttitle}}</h1>
                    <div class="head-info">
                      <span class="post-info-item"><i class="iconfont iconcalendar"></i>{{articleDetail.putime}}</span>
                      <span class="post-info-item">
                        <i class="iconfont iconeye"></i><span  class="leancloud"
                          :data-flag-title="articleDetail.arttitle"></span>
                      </span>
                      <span class="post-info-item"><i class="iconfont iconfont-size"></i>{{articleDetail.click_num}}</span>
                    </div>
                  </div>
                </section>
                <!-- 正文 -->
                <section class="main">
                  <!-- 内容 -->
                  <section class="content" v-html="content"></section>

                  <section class="resource " v-if="resource != ''">
                    <div class="right">
                      资源下载：<button class="login-button right" @click="downloadResource(resource.file_url)">{{resource.filename}}</button>
                    </div> 
                  </section>

                  <!-- 打赏 -->
                  <section class="extra">
                    <section class="donate">
                      <div class="float-img">
                        <img src="../../assets/img/alipay.jpg" alt="" class="icon-pay" v-if="ALIconShowSign">
                        <img src="../../assets/img/wxpay.png" alt="" class="icon-pay" v-else-if="WXIconShowSign">
                      </div>
                      <div class="icon">
                        <a href="javascript:;" id="alipay" @mouseover="changeMask('ali_in')" @mouseout="changeMask('ali_out')">
                          <img src="../../assets/img/ali.png" alt="" class="icon-img" v-if="!ALIconShowSign">
                          <img src="../../assets/img/ali_hover.png" alt="" class="icon-img" v-else>
                        </a>
                        <a href="javascript:;" id="wechat" @mouseover="changeMask('wx_in')" @mouseout="changeMask('wx_out')">
                          <img src="../../assets/img/wx.png" alt="" class="icon-img" v-if="!WXIconShowSign">
                          <img src="../../assets/img/wx_hover.png" alt="" class="icon-img" v-else>
                        </a>
                      </div>
                    </section>
                    <!-- 标签 -->
                    <ul class="tag-list" itemprop="keywords">
                      <li class="tag-list-item" v-for="(item, index) in labelList" :key="index">
                        <a class="tag-list-link" @click="goToList(item.id)" rel="tag" >{{item.labelname}}</a>
                      </li>
                    </ul>

                    <!-- 上一页/下一页 -->
                    <nav class="nav">
                      <a @click="jumPage(frontArticle.id)" v-if="frontArticle" class="cursor" >
                        <img src="../../assets/img/front.png" alt="" style="width: 20px;margin-right: 10px;"> 
                        {{frontArticle.arttitle}}
                      </a>
                      <a @click="jumPage(frontArticle.id)" v-else>没有了</a>
                      <a @click="jumPage(afterArticle.id)" v-if="afterArticle" class="cursor" >
                        {{afterArticle.arttitle}}
                        <img src="../../assets/img/after.png" alt="" style="width: 20px;margin-left: 10px;">
                      </a>
                      <a @click="jumPage(afterArticle.id)" v-else>没有了</a>
                    </nav>

                  </section>

                  <!-- 评论框 -->
                  <section class="comments">
                    <Wangeditor v-on:getWangEditorValue=getWangEditorValue ></Wangeditor>

                    <div class="input-button">
                      <button class="login-button right" @click="confirmModal(true)">提交评论</button>
                      <input type="text" placeholder="请输入您的邮箱！" v-model="email" v-if="!loginSign" class="right">
                    </div>

                    <!-- 显示评论框 -->
                    <div class="vcount" style="display: block;"><span class="vnum">{{commentCount}}</span> 评论</div>
                    <div class="vcards" v-for="(item, index) in commonList" :key="index">
                        <div class="vcard" >
                            <img class="vimg" :src="item.figureurl_qq">
                            <div class="vh">
                                <div class="vhead">
                                  <span class="vnick">{{item.nickname}}</span> 
                                </div>
                                <div class="vmeta">
                                  <span class="vtime">{{item.addtime}}</span>
                                  <span class="vat" @click="openModal(item.id)">回复</span>
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
                                              <span class="vat" @click="openModal(value.id)">回复</span>
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
    <!-- 网页大图组件 -->
    <big-img v-if="showImg" v-on:closeBigImg="closeBigImg" :imgSrc="imgSrc"></big-img>
  </div>
</template>


<style lang="css" >
  /* 代码高亮文件只能以css形式引入 */
  @import 'highlight.js/styles/atom-one-dark-reasonable.css';
  /* @import 'highlight.js/styles/atom-one-dark.css'; */
</style>

<style lang="scss" scoped>
  @import "../../assets/css/pc/article-detail.scss";
</style>

<script lang="ts">
  // 引入js文件
  import articleDetail from "/@/assets/js/pc/articleDetail";
  // 使用js对象
  export default {
    ...articleDetail,
  };
</script>
