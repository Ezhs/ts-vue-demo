<template>
  <div
    ref="orgTreeContainer"
    :style="{transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`}"
    class="org-tree-container"
    @mousedown="handleMousedown"
    @mousemove="handleMousemove"
    @mouseup="handleMouseup">
    <div class="org-tree" :class="{horizontal, collapsable}">
      <org-tree-node
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        @on-expand="(e, data) => {$emit('on-expand', e, data)}"
        @on-node-click="(e, data) => {$emit('on-node-click', e, data)}">
      </org-tree-node>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-named-as-default
import render from './node';
import NP from 'number-precision';

const MAX_SCALE = 2;
const MIN_SCALE = 0.1;
const STEP_SCALE = 0.1;

export default {
  name: 'OrgTree',
  components: {
    OrgTreeNode: {
      render,
      functional: true,
    },
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        expand: 'expand',
        children: 'children',
      }),
    },
    horizontal: Boolean,
    selectedKey: String,
    collapsable: Boolean,
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [Function, String],
    selectedClassName: [Function, String],
  },
  data() {
    return {
      scale: 1,
      isMove: false,
      // 点击开始拖拽的时候的初始值
      start: {
        x: 0,
        y: 0,
      },
      // 缓存上次拖拽的数值
      cacheOffset: {
        x: 0,
        y: 0,
      },
      // 当次拖拽的数值
      offset: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    handleScale(scaleType) {
      if (scaleType === 'plus' && this.scale < MAX_SCALE) {
        this.scale = NP.plus(this.scale, STEP_SCALE);
      } else if (scaleType === 'minus' && this.scale > MIN_SCALE) {
        this.scale = NP.minus(this.scale, STEP_SCALE);
      }
    },
    handleMousedown(e) {
      this.start.x = e.pageX;
      this.start.y = e.pageY;
      this.isMove = true;
    },
    handleMousemove(e) {
      if (this.isMove) {
        this.offset.x = this.cacheOffset.x + e.pageX - this.start.x;
        this.offset.y = this.cacheOffset.y + e.pageY - this.start.y;
      }
    },
    handleMouseup() {
      this.cacheOffset = {
        x: this.offset.x,
        y: this.offset.y,
      };
      this.isMove = false;
    },
    // 处理居中
    handleAlignCenter() {
      const offsetX = ((this.$parent.$el.clientWidth)
        - this.$refs.orgTreeContainer.clientWidth) / 2;
      this.cacheOffset.x = offsetX;
      this.offset.x = offsetX;
    },
  },
  mounted() {
    this.handleAlignCenter();
  },
};
</script>

<style lang="scss">
  @import './org-tree';
</style>
