/*  默认导入 不能解构 */
// es6模块导入不难省略后缀
import obj from './a-子模块.js'

console.log(obj)

/* 按需导入，必须解构 */
import {a, b, fn} from './a-子模块.js'

console.log(a)
console.log(b)
console.log(fn(4, 2))

/* 只导入文件，不接收 */
import './a-子模块.js'