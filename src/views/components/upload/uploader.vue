<template>
  <section class="uploader">
    <el-upload
      v-bind="$attrs"
      v-on="$listeners"
      list-type="picture-card"
      :show-file-list="false"
      :action="action"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :on-progress="handleProgress"
      :on-error="handleError"
      :before-upload="handleBeforeUpload"
    >
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>
  </section>
</template>

<script>
import { Loading } from 'element-ui';
// import { UPLOA_FILE_API } from '@/api/global';

const loadingInstance = new Map();

export default {
  name: 'Uploader',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      action: '', // UPLOA_FILE_API,
    };
  },
  inheritAttrs: false,
  computed: {},
  watch: {},
  directives: {},
  filters: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleExceed(files, fileList) {
      const maxLeng = this.$attrs.limit - fileList.length;
      this.$message.warning(`最多还能上传${maxLeng}张图片`);
    },
    handleBeforeUpload(file) {
      this.startLoading(file);
      console.log('handleBeforeUpload =>>', file);
    },
    handleSuccess(response, file, fileList) {
      this.endLoading(file);
      const { statusCode } = response;
      if (statusCode === 1) {
        // 将file 文件的url(blob类型的url) 转成 接口放回的 url
        file.url = response.data[0].url;
        this.$message.closeAll();
        this.$message.success('上传成功');
        this.$emit('update', fileList);
      } else {
        console.log('上传失败 =>>', response);
      }
    },
    handleProgress(e) {
      console.log('handleProgress =>>', e);
    },
    handleError(err, file) {
      console.log(err, file);
      this.endLoading(file);
    },
    startLoading(file, message = '正在上传...') {
      const { uid } = file;
      loadingInstance.set(uid, Loading.service({
        mask: true,
        duration: 0,
        forbidClick: true,
        message,
      }));
    },
    endLoading(file) {
      const { uid } = file;
      loadingInstance.get(uid).close();
      loadingInstance.delete(uid);
    },
  },
};
</script>

<style lang="scss">
.uploader {
  &.exceed {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.uploader {
  display: inline-block;
  vertical-align: top;
  margin: 0 8px 8px 0;
}
</style>
