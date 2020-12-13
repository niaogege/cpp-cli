<!--
 * @Author: your name
 * @Date: 2020-11-15 19:47:42
 * @LastEditTime: 2020-12-05 20:05:25
 * @LastEditors: cpp
 * @Description: In User Settings Edit
 * @FilePath: \plugin-cppd:\learn\webpack-learn\src\Test\name.vue
-->
<template>
  <div>
    name 组件-{{name}}
  </div>
</template>
<script>
export default {
  props: ['name'],
  mounted() {
    // console.log('111');
  }
}
</script>
