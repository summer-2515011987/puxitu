<template>
  <el-menu
      :show-timeout="200"
      style="border-right:none;margin: 0; text-align: center;"
      v-loading="menuLoading"
  >
    <menu-tree-item :menuItemsData="menuData"></menu-tree-item>
  </el-menu>
</template>

<script>
import MenuTreeItem from "@/pages/sysSettingMgnt/menu/components/menuTree/menuTreeItem";

export default {
  name: "menuTree",
  components: {MenuTreeItem},
  props: {
    menuData: {
      type: Array
    },
    menuLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>