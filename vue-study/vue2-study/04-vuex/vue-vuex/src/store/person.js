// 人员列表相关配置
export default {
  namespaced: true,
  actions: {
    addPersonWang(content, value) {
      if (value.name.indexOf('王') === 0) {
        content.commit('ADD_PERSON', value)
      } else {
        alert('添加的名字不符合要求，必须姓王')
      }
    }
  },
  mutations: {
    ADD_PERSON(state, value) {
      state.personsList.unshift(value)
    }
  },
  state: {
    personsList: [{id: '001', name: '苏白'}]
  },
  getters: {
    firstPersonName(state) {
      return state.personsList[0].name
    }
  }
}