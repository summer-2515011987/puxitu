<template>
  <el-menu-item-group>
    <template v-for="menuItem in menuItemsData" v-if="!menuItem.hidden">
      <el-submenu :index="menuItem.name" :key="menuItem.name">
        <template slot="title">
          <span v-if="menuItem.title">{{ menuItem.title }}</span>
        </template>
        <el-menu-item-group>
          <template v-for="child in menuItem.children" v-if="!child.hidden">
            <menu-tree-item v-if="child.children && child.children.length > 0"
                            :menuItemsData="[child.children]"
                            :key="child.name">
            </menu-tree-item>
            <el-menu-item :index="child.name" :key="child.name">
              <span v-if="child.title">{{ child.title }} </span>
            </el-menu-item>
          </template>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu-item-group>
</template>

<script>
export default {
  name: "menuTreeItem",
  props: {
    menuItemsData: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>