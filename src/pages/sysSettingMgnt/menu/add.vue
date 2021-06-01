<template>
  <menu-detail :is-edit='false' :title="title"></menu-detail>
</template>
<script>
  import MenuDetail from './components/MenuDetail'
  export default {
    name: 'addMenu',
    components: { MenuDetail },
    data() {
      return {
        title: "新增菜单"
      }
    }
  }
</script>
<style>
</style>


