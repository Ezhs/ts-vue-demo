
import { parseTime } from '@/utils';

/*
* 说明：Element-ui表格formatter方法引用的统一格式化方法集合(以混入方式引用)；
* 作者：min-liao;
* */
const formatContent = {

  // 格式化时间；
  methods: {
    formatTime(row, column) {
      if (!row[column.property]) {
        return '-';
      }
      return parseTime(row[column.property], 'yyyy-MM-dd HH:mm:ss');
    },
  },
};

export default formatContent;
