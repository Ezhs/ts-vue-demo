<template>
  <el-pagination
    v-bind="$attrs"
    background
    :layout="layout"
    :page-sizes="pageSizes"
    :page-size="size"
    :pager-count="pagerCount"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 10,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    // 是否固定到顶部
    autoScroll: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val);
      if (this.autoScroll) {
        this.$$_scrollTo();
      }
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val);
      if (this.autoScroll) {
        this.$_scrollTo();
      }
    },
    $_scrollTo(val = 0) {
      window.scrollTo(0, val);
    },
  },
};
</script>

<style>

</style>
