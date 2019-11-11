<template>
  <div class="image-item">
    <el-image
      style="width: 100%; height: 100%;"
      :src="image.url"
      fit="cover"
    >
      <span slot="placeholder" class="image-placeholder">加载中...</span>
    </el-image>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
$image-item-width :  148px;

.image-item {
  display: inline-block;
  vertical-align: top;
  width: $image-item-width;
  height: $image-item-width;
  position: relative;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  margin: 0 8px 8px 0;
  overflow: hidden;
}
</style>

<style lang="scss">
.el-image {
  position: relative;

  .image-placeholder {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999;
  }
}

.image-item:hover {
  .image-item-actions {
    opacity: 1;
  }
}
.image-item-actions {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity .3s;

  > span {
    color: #fff;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
    opacity: 0.8;
    position: initial;
    margin: 0 3px;
    padding: 5px;
    transition: opacity .3s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
