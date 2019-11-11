<template>
  <!-- name=fade/fade-transform -->
  <transition name="fade-transform" mode="out-in">
    <keep-alive :include='cachedViews' :exclude="['']">
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
// 需要缓存的三级路由使用改占位组建
export default {
  name: 'CacheLayoutEmpty',
  computed: {
    cachedViews() {
      return this.$store.state['tags-view'] ? this.$store.state['tags-view'].cachedViews : [];
    },
  },
};
</script>
