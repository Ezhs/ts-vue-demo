<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :before-close="handleHideDialog"
    :close-on-click-modal="false"
    center
    :custom-class="className"
  >
    <slot>
      <section class="sections-types">
        <div
          v-for="(type, index) in types"
          :key="index"
          @click="handleSelect(index, type)"
          class="type-item"
        >
          {{ type.title }}
        </div>
      </section>
    </slot>
  </el-dialog>
</template>

<script>
/**
 * 选择类型的弹窗
 */
export default {
  name: 'DialogSelectType',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    // 选择类型数据
    types: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 是否关闭在点击选择之后
    closeAfterSelect: {
      type: Boolean,
      default: true,
    },
    // 弹窗标题
    title: {
      type: String,
      default: '选择类型',
    },
    // 弹窗 className
    className: {
      type: String,
      default: 'dialog-width-small',
    },
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {
    handleSelect(index, type) {
      if (this.closeAfterSelect) {
        this.handleHideDialog();
      }
      this.$emit('select', index, type);
    },
    handleHideDialog() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
$size : 100px;

.sections-types {
  text-align: center;
  font-size: 0;
  margin: -10px;

  .type-item {
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    width: $size;
    height: $size;
    margin: 10px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
    background-color: #f6f9fd;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      border-color: #409eff;
      background-color: #eef5fb;
    }
  }
}
</style>
