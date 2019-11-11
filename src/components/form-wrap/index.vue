<template>
  <div class="form-wrap">
    <div class="search-form">
      <slot :formItemVisible="formVisible"></slot>
    </div>
    <el-button
      size="small"
      :class="formVisible ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
      :title="formVisible ? '收起' : '展开'"
      class="ctrl-btn"
      @click="handleClick">
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'form-wrap',
  data() {
    return {
      formVisible: true,
    };
  },
  methods: {
    handleClick() {
      this.formVisible = !this.formVisible;
    },
  },
  mounted() {
    // debugger;
  },
};
</script>

<style lang="scss" scoped>
  .form-wrap {
    margin-bottom: 30px;
    position: relative;
    .search-form {
      border: 1px solid #EBEEF5;
    }
    .ctrl-btn {
      border-top: none;
      position: absolute;
      bottom: -17px;
      left: 50%;
      margin-left: -50px;
      padding: 0;
      font-size: 12px;
      width: 100px;
      height: 18px;
      border-color: #EBEEF5;
      border-radius: 0 0 5px 5px;
    }
    .ctrl-btn:hover,
    .ctrl-btn:focus {
      color: #606266;
      background-color: #fff;
      border-color: #EBEEF5;
    }
  }
</style>
