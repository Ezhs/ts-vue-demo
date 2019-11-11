/**
 * 员工岗位
 */

const getJobs = () => {
  console.log('获取岗位数据...');
  const JOBS = [
    '前端工程师',
    '测试',
    '安装开发',
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        statusCode: 1,
        data: JOBS,
      });
    }, 1500);
  });
};

const job = {
  state: {
    jobs: [],
    // 是否需要重新获取
    refresh: true,
  },
  getters: {
    jobs: state => state.jobs,
  },
  actions: {
    async getJobs({ commit, state }) {
      if (!state.refresh) {
        return;
      }

      try {
        const res = await getJobs();
        if (res.statusCode === 0) {
          this.$message.error(res.message || '获取岗位数据失败，请重试');
        } else {
          const jobs = res.data || [];
          const isRefresh = false;
          commit('SET_JOBS', jobs);
          commit('SET_REFRESH_JOBS', isRefresh);
        }
      } catch (error) {
        console.log('getJobs error =>>', error);
      }
    },
    setRefreshJobs({ commit }) {
      const isRefresh = true;
      commit('SET_REFRESH_JOBS', isRefresh);
    },
  },
  mutations: {
    SET_JOBS: (state, jobs) => {
      state.jobs = jobs;
    },
    SET_REFRESH_JOBS: (state, isRefresh = false) => {
      state.refresh = isRefresh;
    },
  },
};

export default job;
