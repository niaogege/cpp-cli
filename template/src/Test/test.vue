<!--
 * @Author: your name
 * @Date: 2020-11-17 17:26:26
 * @LastEditTime: 2020-12-05 20:16:26
 * @LastEditors: cpp
 * @Description: In User Settings Edit
 * @FilePath: \plugin-cppd:\learn\webpack-learn\src\Test\test.vue
-->
<!--
 * @Author: your name
 * @Date: 2020-11-15 19:47:42
 * @LastEditTime: 2020-11-17 17:16:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \plugin-cppd:\learn\webpack-learn\src\components\name.vue
-->
<template>
  <div>
    Test 组件-{{name}}
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '这是 test 组件'
    }
  }, 
  mounted() {
    // console.log('333');
  }
}
</script>
