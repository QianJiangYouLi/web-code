<template>
  <div>
    <h3>{{ msg }}</h3>
    <p>姓名：{{ name }}</p>
    <p>职位：{{ position }}</p>
    <p>性别：{{ gender }}</p>
    <p>年龄：{{ myAge }}</p>
    <button @click="updateInfo">修改信息</button>
  </div>
</template>

<script>
export default {
  name: 'Employee',
  data() {
    return {
      msg: '员工信息',
      myAge: this.age
    }
  },
  // props: ['name', 'gender', 'position', 'age'] // 简单声明接收
  // 接收的同时进行类型限定
  /* props: {
     name: String,
     age: Number,
     position: String,
     gender: String
   }*/
  // 接收的同时对数据进行类型、必要性、默认值设置
  props: {
    name: {
      type: String, // 类型
      required: true // 必要
    },
    age: {
      type: Number,
      default: 24 // 默认值
    },
    gender: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    }
  },
  methods: {
    updateInfo() {
      this.myAge = 26
    }
  }
}
</script>