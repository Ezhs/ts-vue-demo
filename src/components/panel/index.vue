<template>
  <section
    class="panel"
    :class="{
      'panel-bottom': bottom,
    }"
  >
    <div class="panel-head" v-if="title || hasExtra">
      <h3 class="title">{{ title }}</h3>
      <div class="extra" v-if="hasExtra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
    <div class="panel-footer">
      <slot name="footer"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: {
      type: String,
      default: '',
    },
    bottom: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasExtra() {
      return !!this.$slots.extra;
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  &-bottom {
    margin-bottom: 25px;
  }

  &-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .title {
      line-height: 36px;
      font-weight: 600;
      font-size: 15px;
    }
  }
}
</style>
