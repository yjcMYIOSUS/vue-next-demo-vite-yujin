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
      <div class="container">
        <!-- 头部 -->
        <header>
          <div class="name-wrapper">
            <div id="fullname" class="title">关 超</div>
            <div id="jobtitle" class="sub-title">PHP工程师</div>
          </div>
          <div id="contact" class="contact">
            <div class="contact-item">guanchao_gc@qq.com</div>

            <!-- <div class="contact-item">your-phone-num</div> -->

            <div class="contact-item">
              <a
                href="https://gitee.com/camelliass"
                target="_blank"
                rel="noopener"
              >
                码云：Gitee
              </a>
            </div>

            <!-- <div class="contact-item">
              <a
                href="https://github.com/crispgm/resume"
                target="_blank"
                rel="noopener"
              >
                your-github
              </a>
            </div> -->
          </div>
        </header>
        <!-- 教育经历 -->
        <section id="education">
          <div class="section-title">Education</div>
          <div class="section-content">
            <div class="block">
              <div class="block-title">Your First University</div>
              <div class="block-subtitle">
                Jul 2011 - Dec 2012 | Consectetur adipiscing elit
              </div>
              <div class="block-content">Lorem ipsum dolor sit amet</div>
            </div>

            <div class="block">
              <div class="block-title">Your Second University</div>
              <div class="block-subtitle">
                Aug 2007 - Jun 2011 | Ut enim ad minim veniam
              </div>
              <div class="block-content">
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat
              </div>
            </div>
          </div>
        </section>
        <!-- 技能 -->
        <section id="skills">
          <div class="section-title">Skills</div>
          <div class="section-content">
            <div class="block">
              <div class="block-title">Skill Group 1</div>
              <div class="block-content">Lorem, Ipsum, Dolor, Sit, Amet</div>
            </div>

            <div class="block">
              <div class="block-title">Skill Group 2</div>
              <div class="block-content">Consectetur, Adipiscing, Elit</div>
            </div>

            <div class="block">
              <div class="block-title">Skill Group 3</div>
              <div class="block-content">
                Sed do, Eiusmod, Tempor, Incididunt
              </div>
            </div>
          </div>
        </section>
        <!-- 经历 -->
        <section id="experience">
          <div class="section-title">Experience</div>
          <div class="section-content">
            <div class="block">
              <div class="block-title">Job Title 1</div>
              <div class="block-subtitle">Apr 2016 - Now | Your 1st, Inc.</div>
              <div class="block-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>

            <div class="block">
              <div class="block-title">Job Title 2</div>
              <div class="block-subtitle">
                Apr 2013 - Mar 2016 | Your 2nd, Inc.
              </div>
              <div class="block-content">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </div>
            </div>

            <div class="block">
              <div class="block-title">Job Title 3</div>
              <div class="block-subtitle">
                Dec 2011 - Mar 2012 | Your 3rd Co, Ltd.
              </div>
              <div class="block-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>
        </section>
        <!-- 项目 -->
        <section id="projects">
          <div class="section-title">Projects</div>
          <div class="section-content">
            <div class="block">
              <div class="block-title">Project Name 1</div>
              <div class="block-subtitle">Contributor.</div>
              <div class="block-content">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </div>
            </div>

            <div class="block">
              <div class="block-title">Project Name 2</div>
              <div class="block-subtitle">Creator and maintainer.</div>
              <div class="block-content">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </div>
            </div>
          </div>
        </section>
        <!-- 语言 -->
        <section id="languages">
          <div class="section-title">Languages</div>
          <div class="section-content section-flex">
            <div class="block block-square">
              <div class="block-title">English</div>
              <div class="block-content">Work proficiency</div>
            </div>

            <div class="block block-square">
              <div class="block-title">Mandarin Chinese</div>
              <div class="block-content">Native</div>
            </div>
          </div>
        </section>

      </div>
    </main>
    <!-- 抽屉组件 -->
    <drawer ></drawer>
    <!-- 置顶和IM按钮 -->
    <TopIM />
    <!-- 网站底部组件 -->
    <footer>
      <div class="menu-copyright">
        <p style="text-align: center">
          Copyright© 2017 - 2021 |
          <a target="_blank" href="https://guanchao.site">时间里的</a>
          .AllRightsReserved
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
// @import "../../assets/css/pc/article-detail.scss";
@import "../../assets/css/pc/resume.scss";
</style>

<script lang="ts">
// 引入js文件
import resume from "/@/assets/js/pc/resume";

// 使用js对象
export default {
  ...resume,
};
</script>
