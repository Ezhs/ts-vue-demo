<template>
  <div class="org-tree-wrap">
    <div style="position: absolute; top: 15px; right: 15px; z-index: 1;">
      <el-select @change="expandChange" v-model="levelValue">
        <el-option value="all" label="展开全部"></el-option>
        <el-option :value="0" label="收起全部"></el-option>
        <el-option :value="1" label="展开一级"></el-option>
        <el-option :value="2" label="展开二级"></el-option>
        <el-option :value="3" label="展开三级"></el-option>
      </el-select>
      <div class="el-icon-plus scale-btn" @click="handleScale('plus')"></div>
      <div class="el-icon-minus scale-btn" @click="handleScale('minus')"></div>
    </div>

    <!--  todo 生成图片    -->
    <org-tree
      ref="orgTree"
      :data="data"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :label-class-name="labelClassName"
      :render-content="renderContent"
      @on-expand="onExpand"
      @on-node-click="onNodeClick">
    </org-tree>
  </div>
</template>

<script>
import orgTree from '@/components/org-tree';

export default {
  name: 'OrgTreeDemo',
  components: {
    orgTree,
  },
  data() {
    return {
      levelValue: 'all',
      horizontal: false,
      collapsable: true,
      labelClassName: 'bg-white',
      data: {
        level: 1,
        id: 0,
        label: 'XXX科技有限公司',
        children: [{
          level: 2,
          id: 2,
          label: '产品研发部',
          children: [{
            id: 5,
            level: 3,
            label: '研发-前端',
          }, {
            id: 6,
            level: 3,
            label: '研发-后端',
          }, {
            id: 9,
            level: 3,
            label: 'UI设计',
          }, {
            id: 10,
            level: 3,
            label: '产品经理',
          }, {
            id: 11,
            level: 3,
            label: '产品经理',
          }, {
            id: 12,
            level: 3,
            label: '产品经理',
          }, {
            id: 13,
            level: 3,
            label: '产品经理',
          }],
        }, {
          level: 2,
          id: 3,
          label: '销售部',
        }],
      },
    };
  },
  methods: {
    handleScale(scaleType) {
      this.$refs.orgTree.handleScale(scaleType);
    },
    handleCLick(handleType) {
      console.log(handleType);
    },
    renderContent(h, data) {
      return (
        <el-dropdown on-command={this.handleCLick} trigger="click">
          <div class="render-content">
            <div class="render-content-left">
              百
            </div>
            <div class="render-content-right">
              <p>{data.label}</p>
              <p>{data.label}</p>
            </div>
            <el-dropdown-menu>
              {
                ['黄金糕', '狮子头', '螺蛳粉'].map((item) => {
                  return (
                    <el-dropdown-item>{ item + data.label }</el-dropdown-item>
                  );
                })
              }
            </el-dropdown-menu>
          </div>
        </el-dropdown>
      );
    },
    onExpand(e, data) {
      this.$set(data, 'expand', !data.expand);
      if (!data.expand && data.children) {
        this.collapse(data.children);
      }
      this.$nextTick(() => {
        this.$refs.orgTree.handleAlignCenter();
      });
    },
    onNodeClick(e, data) {
      console.log(data.label);
    },
    collapse(list) {
      list.forEach((child) => {
        if (child.expand) {
          child.expand = false;
        }
        // eslint-disable-next-line no-unused-expressions
        child.children && this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.levelValue);
      this.$nextTick(() => {
        this.$refs.orgTree.handleAlignCenter();
      });
    },
    toggleExpand(data, level) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (item.children) {
            const isExpand = item.level <= level || level === 'all';
            this.$set(item, 'expand', isExpand);
            this.toggleExpand(item.children, level);
          }
        });
      } else if (data.children) {
        const isExpand = data.level <= level || level === 'all';
        this.$set(data, 'expand', isExpand);
        this.toggleExpand(data.children, level);
      }
    },
  },
  mounted() {
    this.expandChange();
  },
};
</script>

<style lang="scss" scoped>
.org-tree-wrap {
  overflow: hidden;
  position: absolute;
  width: calc(100% - 30px);
  height: calc(100% - 15px);
  background-color: #ffffff;
  .scale-btn {
    background-color: #666666;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    display: block;
    margin-top: 1px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.org-tree-wrap {
  .render-content {
    display: flex;
    &-left {
      display: flex;
      align-items: center;
      padding: 0 25px;
      float: left;
      color: #ffffff;
      font-size: 20px;
      background-color: rgba(0, 125, 0, 0.8);
    }
    &-right {
      align-items: flex-start;
      line-height: 20px;
      display: flex;
      flex-direction: column;
      width: 200px;
      padding: 15px;
      float: left;
      color: rgb(0, 125, 0);
      background-color: rgba(0, 125, 0, 0.4);
    }
  }
}
</style>
