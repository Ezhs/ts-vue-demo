<template>
  <section class="uploader-by-paste">
    <div
      class="uploader-by-paste-handler"
      @click="handleShowDialog"
    >
      <slot name="default">
        <span>粘贴或拖放</span>
      </slot>
    </div>

    <!--  -->
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
      @open="handleDialogOpen"
      @close="handleDialogClose"
    >
      <h3 class="paste-title">在下面输入框中粘贴图片，或者把图片拖入输入框</h3>
      <div
        ref="pasteArea"
        :contenteditable="!uploading"
        class="paste-area"
      ></div>
    </el-dialog>
  </section>
</template>

<script>
// import { uploadFile } from '@/api/global';
import { checkFileExt } from './utils';

export default {
  name: 'UploaderByPaste',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      dialogVisible: false,
      uploading: false,
    };
  },
  computed: {},
  watch: {},
  directives: {},
  filters: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleShowDialog() {
      this.dialogVisible = true;
    },
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs.pasteArea.focus();
        this.$refs.pasteArea.addEventListener('paste', this.handlePaste);
        this.$refs.pasteArea.addEventListener('drop', this.handleDrop);
      });
    },
    handleDialogClose() {
      this.$refs.pasteArea.blur();
      this.$refs.pasteArea.innerHTML = '';
      this.$refs.pasteArea.removeEventListener('paste', this.handlePaste);
      this.$refs.pasteArea.removeEventListener('drop', this.handleDrop);
    },
    async uploadTrigger(file) {
      try {
        this.uploading = true;
        const form = new FormData();
        form.append('files', file, `${Date.now()}-paste.png`);
        const res = {}; // await uploadFile(form);
        this.$message.closeAll();
        if (res.statusCode === 1) {
          this.$message.success('上传成功');
          this.dialogVisible = false;
          this.$emit('upload-paste', res.data[0]);
        } else {
          this.$message.error(res.message || '上传失败，请重试');
          this.$refs.pasteArea.innerHTML = '';
        }
        console.log(res);
      } catch (error) {
        this.$message.closeAll();
        this.$message.error('上传失败，请重试');
        this.$refs.pasteArea.innerHTML = '';
        console.log(error);
      } finally {
        this.uploading = false;
      }
    },
    // 粘贴上传
    handlePaste(e) {
      const imageTyps = /image\//;
      const { clipboardData } = e;
      for (let i = 0; i < clipboardData.items.length; i += 1) {
        if (clipboardData.items[i].kind === 'file' && imageTyps.test(clipboardData.items[i].type)) {
          // get the blob
          const imageFile = clipboardData.items[i].getAsFile();
          this.readFile(imageFile);
          // prevent the default paste action;
          e.preventDefault();
          // only paste 1 image at a time;
          break;
        }
      }
    },
    // 拖拽上传
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();

      const { files } = e.dataTransfer;
      if (files.length < 1) {
        return false;
      }
      const imageFile = files[0];
      const suffixs = 'png|jpg|jpeg';
      const result = checkFileExt(imageFile, suffixs);
      if (!result) {
        return this.$message.warning(`只能上传${suffixs.replace(/\|/g, '、')}格式的图片`);
      }
      return this.readFile(imageFile);
    },
    // 读取文件
    readFile(imageFile) {
      // read the blob as a constants URL
      const fileReader = new FileReader();
      /* eslint-disable no-loop-func */
      fileReader.onloadend = (file) => {
        // create & insert an image
        const image = document.createElement('IMG');
        image.src = file.target.result;
        const range = window.getSelection().getRangeAt(0);
        range.insertNode(image);
        range.collapse(false);
        // set the selection to after the image
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        this.uploadTrigger(imageFile);
      };
      // TODO: Error Handling!
      // fileReader.onerror = ...
      fileReader.readAsDataURL(imageFile);
    },
  },
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.uploader-by-paste {
  display: inline-block;
  vertical-align: top;
}
.uploader-by-paste-handler {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
  color: #808080;

  &:hover {
    border-color: #409EFF;
    color: #409EFF;
  }

  span {
    font-weight: 500;
  }
}
.paste-title {
  text-align: center;
  margin-bottom: 16px;
}
.paste-area {
  width: 100%;
  text-align: center;
  padding: 15px;
  border: 1px solid #ddd;
  height: 250px;
  overflow-y: auto;
  border-radius: 5px;
}
</style>
