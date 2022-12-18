const utils = require('./utils')
// 添加
// utils.addData({
// 	bookname: '退出体育圈后我成了厨神',
// 	author: '亡灵大白菜',
// 	publisher: '晋江文学城'
// })

// 获取
// utils.getData()

// 删除
// utils.delData(3)

// 修改
utils.editData({
					bookname: '退出娱乐圈后我成了大明星',
					author: '亡灵大白菜',
					publisher: '晋江文学城',
					id: 7
				}
)

// 注意：测试的时候需要先注释有冲突的内容，以免报错