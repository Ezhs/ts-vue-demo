<template>
  <div
    class="data-empty-simple"
    :class="{
      'data-empty-simple-center': center,
    }"
  >{{ description }}</div>
</template>

<script>
export default {
  name: 'DataEmptySimple',
  props: {
    description: {
      type: String,
      default: '暂无数据 ~',
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


<style lang="scss" scoped>
.data-empty-simple {
  font-size: 13px;
  opacity: 0.7;
  height: 100%;
  display: flex;
  align-items: center;

  &-center {
    display: block;
    text-align: center;
    padding: 15px;
  }
}
</style>
