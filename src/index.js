// 引入 css
import './style/style1.css'
import './style/style2.less'

import { sum } from './math' //有公共资源 math.j s

import _ from 'lodash' //引入 lodash 第三方模块

const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

/**
 * 懒加载 -- 引入动态数据
 * import 返回promise
 * 1.5s 之后加载 dynamic-data.js
 * 异步加载也会产出 chunk
 */
// setTimeout(() => {
//     import('./dynamic-data').then((res) => {
//         console.log(res.default.message) //注意default
//     })
// },1500)
setTimeout(() => {
    import('./dynamic-data').then(res => {
        console.log(res)
    })
},1500)//1.5s

// // 增加，开启热更新之后的代码逻辑
// if (module.hot) {
//     module.hot.accept(['./math'], () => {
//         const sumRes = sum(10, 30)
//         console.log('sumRes in hot', sumRes)
//     })
// }
