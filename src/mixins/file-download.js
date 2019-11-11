import axios from 'axios';

// 插入隐藏域，用于避免浏览器拦截弹窗
function createIframe() {
  if (document.getElementById('downloadHiddenFrame')) {
    return;
  }
  const downloadHiddenFrame = document.createElement('iframe');
  downloadHiddenFrame.setAttribute('id', 'downloadHiddenFrame');
  downloadHiddenFrame.setAttribute('name', 'downloadHiddenFrame');
  downloadHiddenFrame.setAttribute('style', 'display:none;');
  document.body.appendChild(downloadHiddenFrame);
}
export default {
  methods: {
    exportByForm(config) {
      createIframe();
      const form = document.createElement('form');
      form.setAttribute('method', config.method || 'get');
      form.setAttribute('action', config.url);
      form.setAttribute('target', 'downloadHiddenFrame');

      let { data = null } = config;
      if (form.method === 'get') {
        data = config.params;
      }

      if (data && typeof data === 'object') {
        Object.keys(data).forEach((key) => {
          const curVal = data[key];
          const createEl = (val) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', val);
            form.appendChild(input);
          };

          if (curVal instanceof Array) {
            curVal.forEach((val) => {
              createEl(val);
            });
          } else {
            createEl(data[key]);
          }
        });
      }
      document.body.appendChild(form);
      form.submit();
      form.remove();
    },
    exportByBlob(config) {
      const { url, data = null, params = null, method = 'post' } = config;

      axios.request({
        url,
        data,
        params,
        method,
        responseType: 'blob',
      }).then((res) => {
        const { headers } = res; // 下载后文件名
        const contentDisposition = headers['content-disposition'];
        const filename = decodeURIComponent(contentDisposition.split(';')[1].split('filename=')[1]);
        const blob = new Blob([res.data]);
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = filename;
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href);
      });
    },
  },
};
