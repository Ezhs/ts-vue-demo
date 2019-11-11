<template>
  <span
    @click.prevent
    class="label-edit"
  >
    <span
      class="label-edit-text"
      v-if="!isEdit"
      @click.prevent
      @dblclick="handelDoubleClick"
      title="双击即可编辑"
    >{{ val }}</span>

    <el-input
      v-else
      ref="elInput"
      size="small"
      v-model.trim="val"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </span>

</template>

<script>
export default {
  name: 'LabelEdit',
  props: {
    label: {
      type: String,
      default: '',
      requied: true,
    },
    focus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEdit: this.focus,
      val: this.label,
      valTemp: this.label,
    };
  },
  created() {
    if (this.focus) {
      this.$nextTick(() => {
        this.$refs.elInput.$refs.input.focus();
      });
    }
  },
  methods: {
    handelDoubleClick(e) {
      e.preventDefault();
      this.isEdit = true;
      this.$nextTick(() => {
        this.$refs.elInput.$refs.input.focus();
      });
    },
    handleBlur() {
      const { val, valTemp } = this;
      if (val === '') {
        this.$message.info('编辑值不能为空');
        this.val = valTemp;
      }
      this.isEdit = false;
      this.$emit('blur', this.val, this.valTemp);
      this.valTemp = this.val;
    },
    handleFocus() {
      const { val, valTemp } = this;
      this.isEdit = true;
      this.$emit('focus', val, valTemp);
    },
  },
};
</script>

<style lang="scss" scoped>
.label-edit {
  .label-edit-text {
    display: inline-block;
    width: 90px;
    word-break: break-all;
    word-wrap: break-word;
  }
  .el-input {
    width: 90px;

    input {
      padding: 0 10px;
    }
  }
}
</style>
