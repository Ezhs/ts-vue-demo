<template>
  <main class="app-layout-body">
    <section class="page-content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </section>
  </main>
</template>

<script>
// import Breadcrumb from '@/components/breadcrumb';
// import PageInfo from '@/components/page-info';
// import { PAGE_HEADER } from '@/config';

export default {
  name: 'AppBody',
  components: {
    // Breadcrumb,
    // PageInfo,
  },
  data() {
    return {};
  },
  computed: {
    cachedViews() {
      return this.$store.state['tags-view'] ? this.$store.state['tags-view'].cachedViews : [];
    },
    key() {
      return this.$route.path || +new Date();
    },
  },
  watch: {
    $route() {
      // // 初始化赋值
      // this.pageHeader = PAGE_HEADER;
      // this.getRouteMeta();
    },
  },
  created() {
    // this.getRouteMeta();
  },
  methods: {
    getRouteMeta() {
      const matched = this.$route.matched.filter(item => item.name);
      const last = matched[matched.length - 1].meta;

      // 是否显示整个页面信息
      if (last.pageHeader && last.pageHeader.constructor !== Array) {
        console.warn(`${last.title}'s pageHeader config was't array`);
      } else if (last.pageHeader !== undefined) {
        this.pageHeader = last.pageHeader;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout-body {
  flex: auto;
  min-height: 0;
  position: relative;

  a {
    color: $color-link;
  }
}
.page-header {
  padding: 16px 32px;
  background: $fill-base;
  border-bottom: 1px solid #e8e8e8;

  .app-breadcrumb {
    + .page-info {
      margin-top: 16px;
    }
  }
}
.page-content {
  margin: 15px 15px 0;
}
</style>

<style lang="scss">
.app-layout-body {
  a {
    color: $color-link;

    &:hover,
    &:active {
      color: $color-link-hover;
    }
  }
}
</style>
