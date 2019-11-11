<template>
  <div class="cm-file-upload">
    <div class="title">
      {{ title }}
    </div>

    <slot name="tips"></slot>

    <div class="uploader">
      <el-upload
        v-bind="$attrs"
        v-on="$listeners"
        ref="upload"
        :action="uploadFileUrl"
        :show-file-list="false"
        :multiple="false"
        :on-success="uploadSuccess"
        :on-change="uploadChange"
        :on-error="uploadError"
        :before-upload="beforeUpload"
        :auto-upload="autoUpload"
        name="fileUpload">
        <div class="flex">
          <el-input
            class="flex-1"
            v-model="fileName"
            :readonly="true"
            :placeholder="placeholder">
          </el-input>
          <el-button class="margin-left-10">浏览</el-button>
        </div>
      </el-upload>
    </div>

    <div class="tips">
      <i class="icon" :class="[curUploadTips.color, curUploadTips.icon]"></i>
      {{curUploadTips.text}}
      <el-button
        type="text"
        @click="downloadErrorExcel()"
        v-show="curUploadTips.showLink"
        style="color: #c22c08; vertical-align: baseline;">
        &nbsp;查看错误内容
      </el-button>
    </div>

    <div class="flex flex-justify-between">
      <el-button
        class="fl"
        type="text"
        @click="downloadTpl()">
        下载标准模版
      </el-button>

      <div>
        <el-button
          v-if="!autoUpload"
          type="primary"
          size="small"
          @click="confirm()"
          :disabled="uploadCode !== 3">
          确 定
        </el-button>

        <el-button
          size="small"
          v-if="!autoUpload"
          @click="cancel">
          取 消
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 组件说明：
 * 【属性】resetFlag 初始化标识，当它的值改变时，文件上传表单就会被重置
 *                   (通常如果组件嵌在 dialog 弹窗中，控制 dialog 弹窗显隐的属性就可以用作 reset-flag 属性，
 *                   这样就能保证每次弹窗显示时，表单都是初始化过的)
 * 【属性】title：组件标题
 * 【属性】uploadFileUrl 文件上传地址
 * 【属性】placeholder 上传控件提示语
 * 【属性】autoUpload 是否自动上传
 * 【属性】fileTypeLimit  上传文件类型限制，多个不同类型用 "|" 隔开，如："png|jpg"
 * 【事件】success 上传成功之后的回调函数
 * 【事件】download-err-excel 下载失败模板
 * 【事件】download-tpl 下载标准模板
 * 【事件】cancel 取消
 * */
const uploadTips = {
  1: {
    color: 'yellow',
    icon: 'el-icon-warning',
    text: '请选择需要上传的文件',
    showLink: false,
  },
  2: {
    color: 'red',
    icon: 'el-icon-circle-check',
    text: '校验失败，文件类型不符合要求',
    showLink: false,
  },
  3: {
    color: 'green',
    icon: 'el-icon-circle-check',
    text: '文件类型校验成功，等待上传',
    showLink: false,
  },
  4: {
    color: 'green',
    icon: 'el-icon-circle-check',
    text: '文件上传成功...',
    showLink: false,
  },
  5: {
    color: 'red',
    icon: 'el-icon-circle-check',
    text: '上传失败，服务器错误',
    showLink: false,
  },
  6: {
    color: 'red',
    icon: 'el-icon-circle-check',
    text: '校验失败，Excel部分内容错误',
    showLink: true,
  },
  7: {
    color: 'red',
    icon: 'el-icon-circle-check',
    text: '校验失败，文件模版不正确！',
    showLink: false,
  },
};

export default {
  name: 'file-upload',
  props: {
    title: {
      type: String,
      default: '请选择上传文件',
    },
    uploadFileUrl: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择上传文件',
    },
    autoUpload: {
      type: Boolean,
      default: false,
    },
    resetFlag: {
      type: Boolean,
      default: false,
    },
    fileTypeLimit: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fileName: '', // 文件名称
      uploadCode: 1, // 上传状态
      errResData: null, // 失败响应
    };
  },
  computed: {
    curUploadTips() {
      return uploadTips[this.uploadCode];
    },
  },
  watch: {
    resetFlag() {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.fileName = '';
      this.uploadCode = 1;
      this.errResData = null;
    },

    // 获取文件名称 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    uploadChange(file) {
      if (file.status === 'ready') {
        this.fileName = file.name;
        this.handleCheckFileType(file);
      }
    },
    // 校验文件
    handleCheckFileType(file) {
      const fileName = file.name;
      const fileType = fileName.slice(fileName.lastIndexOf('.') + 1);
      const fileTypeLimit = this.fileTypeLimit ? this.fileTypeLimit.split('|') : [];

      let flag = true;
      // 校验文件 类型是否满足要起
      if (fileTypeLimit.length) {
        flag = fileTypeLimit.some(it => it === fileType);
      }
      // 如果不符合上传文件类型限制
      if (!flag) {
        this.uploadCode = 2;
        return false;
      }
      this.uploadCode = 3;
      return true;
    },
    // 上传之前
    beforeUpload(file) {
      return this.handleCheckFileType(file);
    },
    // 上传成功
    uploadSuccess(res) {
      // 成功
      if (res.code === '200') {
        this.uploadCode = 4;
        this.$emit('success', res);
      } else {
        // todo 处理 失败
        this.errResData = res;
        this.uploadCode = 7;
        const { message } = res;
        if (message) {
          this.$message({
            type: 'error',
            duration: 5000,
            showClose: true,
            message,
          });
        }
      }
    },
    // 上传失败
    uploadError() {
      this.uploadCode = 5;
    },
    // 下载错误原因Excel
    downloadErrorExcel() {
      this.$emit('download-err-excel', this.errResData);
    },
    // 下载模板
    downloadTpl() {
      this.$emit('download-tpl');
    },
    // 确定
    confirm() {
      this.$refs.upload.submit();
    },
    // 取消
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>
