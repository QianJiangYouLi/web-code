import thenFs from 'then-fs'

const URL = './data.json'

export async function getData() {
  return JSON.parse(await thenFs.readFile(URL, 'utf8'))
}

// 添加
export async function addData(obj) {
  let arr = await getData()
  obj.id = arr[arr.length - 1].id * 1 + 1
  arr.push(obj)
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
  let newArr = arr.filter(ele => ele.id != id)
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
