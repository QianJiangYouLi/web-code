<template>
  <li>
    <label>
      <input
          type="checkbox"
          :checked="todo.done"
          @change="handleCheck(todo.id)"
      />
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input
          type="text"
          v-show="todo.isEdit"
          :value="todo.title"
          @blur="handlerBlur(todo,$event)"
      >
    </label>
    <button class="btn btn-danger" @click="handlerDelete(todo.id)">删除</button>
    <button
        class="btn btn-edit"
        @click="handlerEdit(todo)"
        v-show="!todo.isEdit"
        ref="inputTitle"
    >编辑
    </button>
  </li>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
  name: 'MyItem',
  // 声明接收传递的todo数据
  props: ['todo'],
  methods: {
    // 勾选
    handleCheck(id) {
      // 通知App组件将对应的todo的done值取反
      this.$bus.$emit('checkTodo', id)
    },
    // 删除
    handlerDelete(id) {
      if (confirm('确定删除吗？')) {
        // 通知App组件将对应的todo删除
        // this.$bus.$emit('deleteTodo', id)
        pubsub.publish('deleteTodo', id)
      }
    },
    // 编辑
    handlerEdit(todo) {
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      } else {
        this.$set(todo, 'isEdit', true)
      }
      this.$nextTick(() => this.$refs.inputTitle.focus())
    },
    // 失去焦点，真正执行编辑功能
    handlerBlur(todo, e) {
      todo.isEdit = false
      if (e.target.value.trim() === '') return alert('输入不能为空')
      this.$bus.$emit('updateTodo', todo.id, e.target.value)
    }
  }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>