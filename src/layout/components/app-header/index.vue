<template>
  <header
    class="app-layout-header fixed"
    :class="{
      'app-layout-header-tags-view': showTagsView,
    }"
  >
    <div class="app-layout-header-inner">
      <div class="app-layout-header-nav">
        <div class="app-layout-header-nav-left">
          <hamburger
            @toggleClick="handleToggleSideBar"
            :is-actived="sidebar.opened"
            class="hamburger-container"
          />

          <!-- 面包屑 & 页面描述说明 -->
          <template v-if="pageHeader.length > 0">
            <breadcrumb
              v-if="pageHeader.includes('breadcrumb')"
              class="app-breadcrumb hide-in-mobile"
            />
          </template>
        </div>

        <div class="app-layout-header-nav-right">
          <!-- <el-tooltip
            effect="dark"
            content="使用文档"
            placement="bottom"
            class="hide-in-mobile"
          >
            <a href="https://www.github.com" target="_blank" class="action action-document">
              <icon-svg name="help" />
            </a>
          </el-tooltip> -->

          <!-- 切换语言. 超过2种语言配置才显示 -->
          <!-- <div
            v-if="languages.length > 1"
            class="action hide-in-mobile"
          >
            <el-dropdown trigger="hover" placement="top">
              <div class="action-button">
                <icon-svg name="language" />
              </div>
              <el-dropdown-menu slot="dropdown" placement="bottom-end">
                <el-dropdown-item v-for="item in languages" :key="item.lang">
                  <span @click="handleSetLang(item.lang)">{{item.name}}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div> -->

          <!-- 全局通知信息 -->
          <!-- <div class="action">
            <el-popover
              placement="bottom"
              width="350"
              trigger="click"
              @show="handleMessagePopoverShow"
            >
              <messages ref="messages" @syncUnreadCount="handleSyncUnreadCount" />
              <el-badge :hidden="unreadCount === 0" slot="reference" :value="unreadCount" :max="99">
                <icon-svg name="bell" />
              </el-badge>
            </el-popover>
          </div> -->

          <!-- 账户操作 -->
          <div class="action">
            <el-dropdown class="action-button" trigger="hover" placement="top">
              <div class="action-button-inner">
                <icon-svg v-if="!account || !account.avatar" name="user" />
                <img class="avatar" v-if="account && account.avatar" :src="account.avatar" alt="">
                <span class="name">{{ account ? (account.name || '---') : '---' }}</span>
              </div>
              <el-dropdown-menu slot="dropdown" placement="bottom-end">
                <el-dropdown-item disabled>
                  <router-link to="/accounts/edit">{{ '基本资料' }}</router-link>
                </el-dropdown-item>
                <el-dropdown-item disabled>
                  <router-link to="/accounts/password">{{ '修改密码' }}</router-link>
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="handleLogout">
                  <a href="javascript:;">{{ '退出登录' }}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <el-tooltip
            effect="dark"
            content="全屏"
            placement="bottom"
          >
            <span class="action action-fullscreen">
              <fullscreen />
            </span>
          </el-tooltip>

        </div>
      </div>

      <tags-view v-if="showTagsView" />
    </div>

  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from '@/components/hamburger';
import Fullscreen from '@/components/fullscreen';
import Breadcrumb from '@/components/breadcrumb';
import { LANGUAGES, PAGE_HEADER, SHOW_TAGS_VIEW } from '@/config';
import TagsView from '../tags-view';

export default {
  name: 'AppHeader',
  components: {
    Hamburger,
    Fullscreen,
    Breadcrumb,
    TagsView,
  },
  data() {
    return {
      unreadCount: 0,
      languages: LANGUAGES,
      // 页面头部需要显示的内容
      pageHeader: PAGE_HEADER,
      showTagsView: SHOW_TAGS_VIEW,
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'account',
    ]),
  },
  mounted() {
    console.log('account', this.account);
  },
  methods: {
    handleToggleSideBar() {
      this.$store.dispatch('toggleSidebar');
    },
    /**
     * 设置 语言
     *
     * @param {string} lang 语言 code
     */
    handleSetLang(lang) {
      console.log('switch language to', lang);
    },
    /**
     * 退出登录
     */
    async handleLogout() {
      await this.$store.dispatch('logout');
      // redirect to login
      this.$router.replace('/login');
    },
    /**
     * 显示全局信息中心
     */
    handleMessagePopoverShow() {
      // 触发加载数据
      this.$refs.messages.getMessages();
    },
    /**
     * 同步未读信息数量
     *
     * @param {number} count 未读数量
     */
    handleSyncUnreadCount(count) {
      this.unreadCount = count;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  // 头部
  &-header {
    height: $app-header-height;
    transition: width .2s;

    &-inner {
      position: relative;
      z-index: 200;
    }

    &-nav {
      height: $app-header-height;
      line-height: $app-header-height;
      background-color: $fill-base;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
      transition: width .2s;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &-right {
        color: #808080;
        display: flex;
        align-items: center;

        a {
          color: inherit;
        }
      }
    }

    .hamburger-container {
      padding: 0 20px;
      line-height: $app-header-height;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;
      float: left;

      &:hover {
        background: rgba(0, 0, 0, .025);
      }
    }

    .breadcrumb-container {
      height: $app-header-height;
      line-height: $app-header-height;
      float: left;
    }

    .action {
      padding: 0 12px;
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
      font-size: 20px;
      transition: background-color 0.25s;

      &-button {
        cursor: pointer;
        position: relative;
        font-size: 22px;
        top: 0;
        color: #808080;
        height: $app-header-height;
        display: flex;
        justify-content: center;
        align-items: center;

        &-inner {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }

      &:hover {
        background: rgba(0, 0, 0, .025);
      }

      .name {
        font-size: 14px;
        margin-left: 8px;
        vertical-align: middle;
        line-height: 1;
      }

      .avatar {
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, .05);
        line-height: 1;
      }

      .el-badge {
        line-height: normal;
        position: relative;
        top: -3px;
      }
    }

    // 固定头部
    &.fixed {
      .app-layout-header-inner {
        position: fixed;
        top: 0;
        right: 0;
        // left: $app-sider-width;
        width: calc(100% - #{$app-sider-width});
      }
    }
    &.min {
      .app-layout-header-inner {
        width: calc(100% - #{$app-sider-width-min});
      }
    }

  }

  // 有 tags-view 的头部
  &-header-tags-view {
    height: $app-header-height + 34px;
  }
}
</style>
