<template>
  <section class="upload-demo">
    <card
      title="文件下载"
      shadow="hover"
      borderDisabled
      bottom
    >
      <el-button @click="downLoadFile">下载文件</el-button>
    </card>

    <card
      title="文件上传"
      shadow="hover"
      borderDisabled
      bottom
    >
      <file-upload
        @download-err-excel="downloadErrExcel"
        fileTypeLimit="jpg"
        :uploadFileUrl="uploadFileUrl">
      </file-upload>
    </card>

    <card
      title="图片上传"
      shadow="hover"
      borderDisabled
      bottom
    >
      <upload
        accept=".jpg, .jpeg, .png"
        :limit="10"
        :file-list="images"
        @update="handleUploadUpdate"
        @upload-paste="handleUploadPaste"
      ></upload>
    </card>

    <card
      title="图片上传 - 无查看大图"
      shadow="hover"
      borderDisabled
      bottom
    >
      <upload
        accept=".jpg, .jpeg, .png"
        :limit="10"
        :viewer="false"
        :file-list="images"
        @update="handleUploadUpdate"
        @upload-paste="handleUploadPaste"
      ></upload>
    </card>

    <card
      title="图片列表 - 公用图片上传组建中的图片列表"
      shadow="hover"
      borderDisabled
      bottom
    >
      <upload
        :disabled="true"
        accept=".jpg, .jpeg, .png"
        :limit="10"
        :file-list="images"
        @update="handleUploadUpdate"
        @upload-paste="handleUploadPaste"
      ></upload>
    </card>

    <card
      title="图片列表"
      shadow="hover"
      borderDisabled
      bottom
    >
      <div class="image-list" ref="gallery" v-viewer="{title: false}">
        <image-item
          v-for="(image, index) in images"
          :key="index"
          :image="image"
        >
          <div class="image-item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(image, index, 'gallery')"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
          </div>
        </image-item>
      </div>
    </card>
  </section>
</template>

<script>
import Upload, { ImageItem, FileUpload } from '@/views/components/upload';
import { API_BASE } from '@/config';
import fileDownloadMixins from '@/mixins/file-download';

export default {
  name: 'UploadDemo',
  components: {
    Upload,
    ImageItem,
    FileUpload,
  },
  mixins: [fileDownloadMixins],
  props: {},
  data() {
    return {
      uploadFileUrl: `${API_BASE.open}/api/upload/uploadFile`,
      images: [
        { url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' },
        { url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' },
        { url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
      ],
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
    downloadErrExcel() {
      console.log('downloadErrExcel');
    },
    handleUploadPaste(image) {
      this.images.push(image);
    },
    handleUploadUpdate(images) {
      this.images = images;
    },
    handlePictureCardPreview(file, index, gallery) {
      const viewer = this.$refs[gallery].$viewer;
      viewer.view(index);
    },
    downLoadFile() {
      this.exportByForm({
        params: {
          a: 10,
          b: Math.random(),
          c: [1, 2, 3],
        },
        url: 'https://img.baibu.la/baibu_5ae4703ce44a47b4ae542eea423abace.xlsx',
      });
    },
  },
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>
