# 1-Vuex简介

概念：专门在Vue中实现集中式状态（数据）管理的一个Vue插件，对Vue应用中多个组件的共享状态进行集中式的管理（读写），是一种组件间的通信方式，适用于任意组件间的通信。

使用场景：

（1）多个组件依赖于同一状态

（2）来自不同组件的行为需要变更到同一状态

简单理解：**共享**

# 2-搭建Vuex环境

（1）安装vuex：`yarn add vuex@3` **注意：vue2只能使用Vuex3版本，不要安装成了Vuex4，会获取不到store**

（2）创建文件：`src/store/index.js`

```js
/*该文件用于创建store*/

import Vue from 'vue'
import Vuex from 'vuex'

// 准备actions，用于响应组件中的动作
const actions = {}
// 准备mutations，用于操作数据（状态）
const mutations = {}
// 准备state，用于存储数据（状态）
const state = {}

Vue.use(Vuex)

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
```

(3) 在`mian.js`中创建Vue实例时传入`store`配置项

```js
// ...
// 引入store
import store from '@/store'

new Vue({
  // ...
  store
})
```

# 3-基本使用

（1）在`store/index.js`中初始化数据，配置`actions`、`mutations`

```js
/*该文件用于创建store*/

import Vue from 'vue'
import Vuex from 'vuex'

// 准备actions，用于响应组件中的动作
const actions = {
  /*jia(context, value) {
    context.commit('JIA', value)
  },
  jian(context, value) {
    context.commit('JIAN', value)
  },*/
  jiaOdd(context, value) {
    if (context.state.sum % 2) context.commit('JIA', value)
  },
  jiaWait(context, value) {
    setTimeout(() => context.commit('JIA', value), 1000)
  }
}
// 准备mutations，用于操作数据（状态）
const mutations = {
  JIA(state, value) {
    state.sum += value
  },
  JIAN(state, value) {
    state.sum -= value
  }
}
// 准备state，用于存储数据（状态）
const state = {
  sum: 0
}

Vue.use(Vuex)

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
```

（2）组件中读取vuex中的数据：`$store.state.数据`

（3）组件中修改vuex中的数据：`$store.dispatch('actions中的方法名', 数据)`或者`$store.commit('mutations中的方法名', 数据)`

```js
// Count组件
export default {
  name: 'Count',
  data() {
    return {
      n: 1//当前选择的数字
    }
  },
  methods: {
    increment() {
      // this.$store.dispatch('jia',this.n)
      this.$store.commit('JIA', this.n)
    },
    decrement() {
      // this.$store.dispatch('jian',this.n)
      this.$store.commit('JIAN', this.n)
    },
    incrementOdd() {
      this.$store.dispatch('jiaOdd', this.n)
    },
    incrementWait() {
      this.$store.dispatch('jiaWait', this.n)
    }
  }
}
```

><span style="color:#f00;font-size:20px">如果没有网络请求或者其他业务逻辑，组件中可以越过actions，即不写dispatch直接写commit</span>

# 4-getters的使用

概念：当state中的数据需要进行加工后再使用，可以使用`getters`配置项

在`store/index.js`中添加配置项`getters`:

```js
// ...
// 准备getters，用于将state中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10
  }
}
// 创建并暴露store
export default new Vuex.Store({
  // ...
  getters
})
```

组件中读取数据：`$store.getters.数据`

# 5-四个map方法的使用

## mapState

`mapState`方法，用于映射`state`中的数据为计算属性

两种写法：对象式和数组式

```js
import { mapState } from 'vuex'
export default {
 // ... 
  computed: {
    /*
    // 自己动手写计算属性处理数据（从state中读取数据）
    sum() {
      return this.$store.state.sum
    },
    company() {
      return this.$store.state.company
    },
    position() {
      return this.$store.state.position
    },
    */

    // 借助mapState自动生成计算属性，从state中读取数据（对象写法）
    // ...mapState({sum: 'sum', company: 'company', position: 'position'}),

    // 借助mapState自动生成计算属性，从state中读取数据（数组写法）
    ...mapState(['sum', 'company', 'position']),
  }
}
```

## mapGetters

`mapGetters`方法用于映射`getters`中的数据为计算属性

两种写法：对象式和数组式

```js
import {mapState,mapGetters} from 'vuex'

export default {
 // ...
  computed: {
   // ...
    /*
        bigSum() {
          return this.$store.getters.bigSum
        },
        */

    // 借助mapGetters自动生成计算属性，从getters中读取数据（对象写法）
    // ...mapGetters({bigSum: 'bigSum'})
    // 借助mapGetters自动生成计算属性，从getters中读取数据（数组写法）
    ...mapGetters(['bigSum'])
  }
}
```

## mapActions

`mapActions`方法用于生成`actions`对话方法，即包含`$store.dispatch(xxx)`的函数

```js
import {mapActions} from 'vuex'

export default {
 // ...
  methods: {
    // ...

    /*
    incrementOdd() {
      this.$store.dispatch('jiaOdd', this.n)
    },
    incrementWait() {
      this.$store.dispatch('jiaWait', this.n)
    }
    */

    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
    ...mapActions({incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
    
    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（数组写法）
    // ...mapActions(['jiaOdd', 'jiaWait'])
  },
  // ...
}
```

## mapMutations

`mapMutations`方法用于生成`mutations`对话方法，即包含`$store.commit(xxx)`的函数

```js
import { mapActions} from 'vuex'

export default {
  //...
  methods: {
    // ...
    /*
    incrementOdd() {
      this.$store.dispatch('jiaOdd', this.n)
    },
    incrementWait() {
      this.$store.dispatch('jiaWait', this.n)
    }
    */

    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
    ...mapActions({incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
    
    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（数组写法）
    // ...mapActions(['jiaOdd', 'jiaWait'])
  },
  // ...
}
```

><span style="color:#f00;font-size:20px">mapMutations和mapActions使用时，若需要传递参数，在模板中绑定事件时要传递参数，否则参数是事件对象</span>

# 6-模块化+命名空间

模块化+命名空间的目的是让代码更好维护，多种数据分类更加明确

(1) 修改代码

修改`store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

import countOptions from '@/store/count'
import personOptions from '@/store/person'

Vue.use(Vuex)

// 创建并暴露store
export default new Vuex.Store({
  modules: {
    countOptions,
    personOptions
  }
})
```

`store/count.js`

```js
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
```

`store/person.js`

```js
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
```

（2）开启命名空间后，组件读取state数据

```js
 // 方式1：自己读
this.$store.state.personOptions.personsList

// 方式2：自动读
...mapState('countOptions', ['sum', 'company', 'position']),
...mapState('personOptions', ['personsList']),
```

(3) 开启命名空间后，组件读取getters数据

```js
// 方式1：自己读
this.$store.getters['personOptions/firstPersonName']

// 方式2：自动读
...mapGetters('countOptions',['bigSum'])
```

(4) 开启命名空间后，组件中调用dispatch

```js
// 方式1：自己调
this.$store.dispatch('personOptions/addPersonWang', personObj)

// 方式2：自动调
...mapActions('countOptions', {incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
```

（5） 开启命名空间后，组件中调用commit

```js
// 方式1：自己调
this.$store.commit('personOptions/ADD_PERSON', personObj)

// 方式2：自动调
...mapMutations('countOptions', {increment: 'JIA', decrement: 'JIAN'}),
```

