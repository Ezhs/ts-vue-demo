/**
 * 路由增强函数
 *
 */

export default {
  methods: {
    /**
     * 跳转页面 - 保持历史记录
     *
     * @params {string} path 路径
     * @params {object} query 查询参数
     * @params {object} params 动态参数
     */
    handleRouterPush({ path = '', query = {}, params = {} }) {
      const options = {
        path: this.getPathWithParems(path, params),
        query,
      };

      this.handleGoPage(options, 'push');
    },

    /**
     * 跳转页面 - 没有历史记录
     *
     * @params {string} path 路径
     * @params {object} query 查询参数
     * @params {object} params 动态参数
     */
    handleRouterReplace({ path = '', query = {}, params = {} }) {
      const options = {
        path: this.getPathWithParems(path, params),
        query,
      };

      this.handleGoPage(options, 'replace');
    },

    /**
     * 页面跳转
     *
     * @param {*} options
     * @param {string} [action='push'] ['push', 'replace']
     */
    handleGoPage(options, action = 'push') {
      this.$router[action](options);
    },

    /**
     * 获取真实路径
     *
     * @param {*} path
     * @param {*} [params={}]
     * @returns
     */
    getPathWithParems(path, params = {}) {
      let realyPath = path;
      Object.keys(params).forEach((key) => {
        const val = params[key];
        realyPath = realyPath.replace(`{${key}}`, val);
      });

      return realyPath;
    },
  },
};
