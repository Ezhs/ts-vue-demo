<template>
  <el-timeline class="timeline">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity[timestampKey] || '-'"
      v-bind="$attrs"
    >
      <h4 v-if="activity[operatorKey] || activity[operatorDecKey]">
        {{ activity[operatorKey] }} {{ activity[operatorDecKey] }}
      </h4>
      <p>{{ activity[operateDescKey] }}</p>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  props: {
    activities: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 时间 key
    timestampKey: {
      type: String,
      default: 'created',
    },
    // 操作人 key
    operatorKey: {
      type: String,
      default: 'operator',
    },
    // 操作 key
    operatorDecKey: {
      type: String,
      default: 'operatorDec',
    },
    // 具体内容 key
    operateDescKey: {
      type: String,
      default: 'operateDesc',
    },
  },
};
</script>

<style lang="scss">
.timeline {
  .el-timeline-item__content {
    h4 {
      margin-bottom: 12px;
      padding-top: 2px;
      line-height: 1.4;
    }
    p {
      opacity: 0.7;
      margin-bottom: 8px;
    }
  }
  .el-timeline-item__tail {
    border-color: rgb(140, 197, 255);
  }
  .el-timeline-item__node {
    background-color: rgb(140, 197, 255);
  }
}
</style>
