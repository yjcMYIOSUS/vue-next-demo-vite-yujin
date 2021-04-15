<template>
    <nav class="menu" v-if="menuShow == 1">
      <div class="menu-wrap">
        <div class="menu-close" @click="closeMenu" >
          <!-- <i class="el-icon-close"></i> -->
          <img src="../../assets/img/close.png" alt="" style="width:35px;">
        </div>
        <!-- 登录框 -->
        <span v-if="menuSign == 'is_login'" class="span login">
          <!-- 登录 -->
          <div v-if="!loginSign" class="login-div">
            <div>
              <input type="text" v-model="email" placeholder="请输入您的邮箱">
            </div>
            <br>
            <div >
              <input type="password" v-model="password" placeholder="请输入您的密码">
            </div>
            <br>
            <div v-if="is_login != 'login'">
              <input type="text" v-model="emailCode" placeholder="请输入验证码"  class="code-input">
              <button @click="sendEmailCode()" v-if="emailButton == false" class="login-button sendcode"  >{{sendCodeButton}} </button>
              <button v-else disabled class="login-button nosendcode"  >{{sendCodeButton}} </button>
            </div>
            <br v-if="is_login != 'login'">
            <div class="tip-text" v-if="is_login == 'login'">
              <span  @click="switchLoginStatus('register')">
                没有账号？点击注册一个。
              </span>
              |&nbsp;
              <span @click="switchLoginStatus('password')">
                忘记密码。
              </span>
            </div>
            <br> 
            <div style="text-align:center">
              <button @click="loginExec()" class="login-button"  v-html="buttonMsg"></button>
              <button class="login-button back-button"  @click="switchLoginStatus('login')" v-if="is_login != 'login'"> 回&nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;录 </button>
              <button class="login-button back-button"   @click="qqLogin()" v-if="is_login == 'login'"> QQ&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;录 </button>
            </div>
          </div>
          <!-- 用户信息 + 退出 -->
          <div v-else style="text-align:center">
            <div>
              <Uploads class="upload" :limit="1" :type="'image'" :ext="ext" :data="userLogoInfo"
              :action="'/index.php/user/uploadFile'" :autoName="1" :size="5*1024*1024" :multiple="0">
            </Uploads>
            </div><br>
            <div >
              <input type="text" v-model="nickname" placeholder="请输入您的昵称" style="width:385px;" @blur.prevent="updateNickname()">
            </div><br>
            <div>
              <button @click="logoutExec()" class="login-button" >退 出 登 录</button>
            </div>
          </div>
        </span>
        <!-- 搜索框 -->
        <span v-else-if="menuSign == 'is_search'" class="span">
          <input type="text" v-model="search" placeholder="请出入您要搜索的内容">
          <button @click="searchExec()" class="login-button">搜&nbsp;&nbsp;&nbsp;索</button>
        </span>
        <!-- 导航 -->
        <ul class="menu-content" v-else>
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/articleList',44)"> 前端</span></li>
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/articleList',42)"> 后端</span></li>
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/articleList',43)"> 数据库</span></li>
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/articleList',53)"> 服务器</span></li>
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/articleList',75)"> 数据结构</span></li>
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/articleList',57)"> 乱七八糟</span></li>
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/placeOnFile')"> 归档</span></li>
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/label')"> 标签</span></li>
          <!-- <li class="menu-item"><span class="underline" @click="jumPage('/pc/shoot')"> 摄影</span></li> -->
          <!-- <li class="menu-item"><span class="underline" @click="jumPage('/pc/other')"> 其他</span></li> -->
          <li class="menu-item"><span class="underline" @click="jumPage('/pc/about')"> 关于</span></li>
        </ul>

        <!-- 底部 -->
        <div class="menu-copyright">
          <p>Copyright© 2017 - 2021 | <a target="_blank" href="https://guanchao.site">时间里的</a> .AllRightsReserved</p>
        </div>
      </div>
    </nav>
</template>

<script lang="ts">
  import "/@/assets/css/components/pc/Header.scss";
  // 引入js文件
  import Header from "/@/assets/js/components/pc/Header";

  // 使用js对象
  export default {
    ...Header,
  };
</script>

