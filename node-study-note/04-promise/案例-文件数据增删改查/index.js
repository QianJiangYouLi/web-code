import thenFs from 'then-fs'
// 在"type":"module" 情况下，__dirname不能用，忽略绝对路径问题
// 获取路径
const URL = './data.json'

export async function getData() {
  // 通过async和await读取文件内容，并将转为数组
  return JSON.parse(await thenFs.readFile(URL, 'utf8'))
}

// 添加
export async function addData(obj) {
  // 获取图书信息
  let arr = await getData()
  // 处理id
  obj.id = arr[arr.length - 1].id * 1 + 1
  arr.push(obj)
//  重新写入数据,需要判断是否写入成功
  try {
    await thenFs.writeFile(URL, JSON.stringify(arr))
    return '添加成功'
  } catch (e) {
    console.log(e.message)
    return '添加失败'
  }
}

// 修改
export async function editData(obj) {
  let arr = await getData()
  let index = arr.findIndex(ele => ele.id == obj.id)
  arr.splice(index, 1, obj)
  try {
    thenFs.writeFile(URL, JSON.stringify(arr))
    return '修改成功'
  } catch (e) {
    console.log(e.message)
    return '修改失败'
  }
}

// 删除
export async function delData(id) {
  let arr = await getData()
  // 删除指定的内容（过滤）id相同则删除
  let newArr = arr.filter(ele => ele.id !== id)
  // 重新写入文件
  try {
    thenFs.writeFile(URL, JSON.stringify(newArr))
    return ' 删除成功'
  } catch (e) {
    console.log(e.message)
    return '删除失败'
  }
  
}


export default {
  getData,
  addData,
  editData,
  delData
}
// 测试
// getData().then(res => console.log(res))

/*
addData({
  bookname: '我在汉朝养老',
  author: '不记得了',
  publisher: '晋江文学城'
}).then(res => console.log(res))
*/

// delData(1).then(res => console.log(res))

/*
editData({
  id:2,
  bookname:'昭如日月',
  author:'小狐昔里',
  publisher:'晋江文学城'
}).then(res => console.log(res))
*/
