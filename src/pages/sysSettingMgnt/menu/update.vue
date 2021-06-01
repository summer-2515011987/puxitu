<template>
  <menu-detail :is-edit='true' :title="title"></menu-detail>
</template>
<script>
  import MenuDetail from './components/MenuDetail'
  export default {
    name: 'updateMenu',
    components: { MenuDetail },
    data() {
      return {
        title: "编辑菜单"
      }
    }
  }
</script>
<style>
</style>


