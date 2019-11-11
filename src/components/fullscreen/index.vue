<template>
  <span @click="handleClick">
    <icon-svg :name="iconName" style="vertical-align: middle;"/>
    <span class="margin-left-5" style="font-size: 14px;">全屏（F11）</span>
  </span>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'Fullscreen',
  props: {
    // unusable message
    unusableMsg: {
      type: String,
      default: 'you browser can not work',
    },
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    iconName() {
      return this.isFullscreen ? 'exit-fullscreen' : 'fullscreen';
    },
  },
  created() {
    this.handleChangeFullscreen();
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 122 || e.code === 'F11') {
        this.handleClick();
      }
    });
  },
  methods: {
    handleChangeFullscreen() {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen;
        });
      }
    },
    handleClick() {
      if (!screenfull.enabled) {
        this.$message.warning(this.unusableMsg);
        return;
      }
      screenfull.toggle();
    },
  },
};
</script>
