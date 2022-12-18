/*  默认导出 */
// 可以导出任意类型
export default {name: '苏白', age: 24}

/* 按需导出 */
export let a = 1
export const b = 'XYZ'

export function fn(m, n) {
  console.log('函数fn')
  return m - n
}

/* 不导出内容，只提供功能 */
for (let i = 0; i < 10; i++) {
  console.log(i)
}