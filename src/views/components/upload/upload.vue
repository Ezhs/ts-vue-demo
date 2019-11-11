<template>
  <section class="upload" v-viewer="{title: false}">
    <!-- 图片列表 -->
    <image-item
      v-for="(image, index) in $attrs['file-list']"
      :key="index"
      :image="image"
    >
      <div class="image-item-actions">
        <span
          v-if="viewer"
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(image, index)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(image, index)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </div>
    </image-item>

    <!-- 点击上传触发区域 -->
    <uploader
      v-if="!disabled"
      v-bind="$attrs"
      v-on="$listeners"
      :auto-upload="true"
      multiple
      name="files"
      :class="{
        'exceed': isExceed,
      }"
    ></uploader>

    <!-- 粘贴或者拖放上传 -->
    <uploader-by-paste
      v-if="showPaste && !disabled"
      v-bind="$attrs"
      v-on="$listeners"
    ></uploader-by-paste>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>

<script>
import ImageItem from './image-item';
import Uploader from './uploader';
import UploaderByPaste from './uploader-by-paste';

export default {
  name: 'Upload',
  components: {
    ImageItem,
    Uploader,
    UploaderByPaste,
  },
  mixins: [],
  props: {
    // 是否可以查看大图
    viewer: {
      type: Boolean,
      default: true,
    },
    // 是否显示粘贴上传
    paste: {
      type: Boolean,
      default: true,
    },
    // 禁用编辑
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  inheritAttrs: false,
  computed: {
    isExceed() {
      const { 'file-list': fileList, limit } = this.$attrs;
      const isExceed = fileList.length >= limit;
      return isExceed;
    },
    showPaste() {
      if (!this.paste) {
        return false;
      }

      return !this.isExceed;
    },
  },
  watch: {},
  directives: {},
  filters: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleRemove(file, index) {
      const fileList = this.$attrs['file-list'];
      const [deleteItem] = fileList.splice(index, 1);
      this.$emit('delete', deleteItem);
      this.$emit('update', fileList);
    },
    handlePictureCardPreview(file, index) {
      const viewer = this.$el.$viewer;
      viewer.view(index);
    },
  },
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>
