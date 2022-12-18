// 求和相关配置
export default {
  namespaced: true,
  actions: {
    jiaOdd(context, value) {
      if (context.state.sum % 2) context.commit('JIA', value)
    },
    jiaWait(context, value) {
      setTimeout(() => context.commit('JIA', value), 1000)
    }
  },
  mutations: {
    JIA(state, value) {
      state.sum += value
    },
    JIAN(state, value) {
      state.sum -= value
    }
  },
  state: {
    sum: 0,
    company: '虹软',
    position: '前端开发工程师'
  },
  getters: {
    bigSum(state) {
      return state.sum * 10
    }
  }
}