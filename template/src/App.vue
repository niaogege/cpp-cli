<template>
  <div id='app'>
    App Vue Demo
    <h1 class='name'>{{name}}</h1>
    <NameComponent name='来自父组件'/>
    <Test name='来自Parent组件'/>
  </div>
</template>
<script>
import NameComponent from './Test/name'
import Test from './Test/test'

export default {
  components: {
    NameComponent,
    Test
  },
  data() {
    return {
      name: 'chendap'
    }
  },
  mounted() {
    console.log(Test, 'Test')
  }
}
</script>
<style lang="less" scoped>
.name {
  color: red;
}
</style>