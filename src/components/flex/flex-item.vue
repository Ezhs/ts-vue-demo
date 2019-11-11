<template>
  <div class="flexbox-item" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FlexItem',
  props: {
    column: {
      type: [Number, String],
      default: 1,
    },
  },
  computed: {
    classes() {
      const { column } = this;
      const col = column === 1 ? '' : `flexbox-item-col-${column}`;
      return {
        [col]: [col],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.flexbox-item {
  flex: 1;
  box-sizing: border-box;
  width: 100%;

  &-col-2 {
    flex: 2;
  }
  &-col-3 {
    flex: 3;
  }
  &-col-4 {
    flex: 4;
  }
  &-col-auto {
    flex: 0;
  }
}
</style>
