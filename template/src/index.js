/*
 * @Author: your name
 * @Date: 2020-11-15 17:20:16
 * @LastEditTime: 2020-12-05 21:52:00
 * @LastEditors: cpp
 * @Description: In User Settings Edit
 * @FilePath: \plugin-cppd:\learn\webpack-learn\src\index.js
 */
import Vue from '../node_modules/vue/dist/vue.js'
import app from './App.vue'

new Vue({
  render: (h) => h(app)
}).$mount('#app')