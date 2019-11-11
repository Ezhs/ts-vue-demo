<template>
  <div class="el-dialog-style">
    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="onOff" top="5vh"
               custom-class="dialog-class" ref="dialog">
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
/*
* 说明：当引用el-dialog组件，业务过多造成内容过长时，引用该组件优化交互和UI；
* 功能：内容过长时，el-dialog组件，title固定，内容内滚动；
* 作者：min-liao;
* */

export default {
  name: 'elDialogStyle',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  created() {

  },

  mounted() {

  },

  updated() {

  },

  computed: {
    onOff: {
      get() {
        if (this.show) {
          this.dialogBodyScroll();
        }
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      },
    },
  },

  components: {},

  methods: {
    dialogBodyScroll() {
      this.$nextTick(() => {
        const dialogHeader = this.$refs.dialog.$el.getElementsByClassName('el-dialog__header')[0];
        const dialogBody = this.$refs.dialog.$el.getElementsByClassName('el-dialog__body')[0];
        // 滚动条回到顶部；
        if (dialogBody && dialogBody.scrollTop) {
          dialogBody.scrollTop = 0;
        }

        // 向下滚动时header头部下显示阴影；
        if (dialogHeader && dialogBody) {
          dialogBody.onscroll = () => {
            if (dialogBody.scrollTop) {
              dialogHeader.classList.add('box-shadow');
            } else {
              dialogHeader.classList.remove('box-shadow');
            }
          };
        }
      });
    },
  },
};
</script>

<style>
  .el-dialog-style .dialog-class{
    height: 90vh;
    margin-bottom: 0;
    overflow: hidden;
  }
  .el-dialog-style .dialog-class .el-dialog__header{
    position: relative;
    z-index: 10;
  }
  .el-dialog-style .dialog-class .el-dialog__header.box-shadow{
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .el-dialog-style .dialog-class .el-dialog__body{
    height: calc(88vh - 54px);
    overflow-y: auto;
  }

  /*---------------------------------伪类滚动条自定义（css3）------------------------------------------*/
  /*滚动条整体部分*/
  .el-dialog-style ::-webkit-scrollbar{width: 8px; height: 8px; background-color: #F5F5F5;}
  /*滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）*/
  .el-dialog-style ::-webkit-scrollbar-thumb{
    border-radius: 9px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    box-shadow: inset 0 0 6px rgba(0,0,0,0);
    background-color: #CCCCCC;
  }
  /*滚动条的轨道（里面装有Thumb）*/
  .el-dialog-style ::-webkit-scrollbar-thumb:hover {background-color: #929292; }
  .el-dialog-style ::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    box-shadow: inset 0 0 6px rgba(0,0,0,0);
    border-radius: 10px;
    background-color: #FFFFFF;
  }
</style>
