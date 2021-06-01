<template>
    <el-menu :show-timeout="200" :default-active="$route.path"  background-color="#304156"
        text-color="#bfcbd9"  active-text-color="#409EFF" router  style="border-right:none;margin: 0; text-align: left;">
        
        <template v-for="item in routes" v-if="!item.hidden" >
            <el-menu-item v-if="item.meta.isleaf " :index="item.path" router="true">
                <span v-if="item.meta.title">{{ item.meta.title }} </span>
            </el-menu-item>
            <el-submenu v-if="!item.meta.isleaf"   :index="item.path" :key="item.name">
                <template slot="title">
                  <span v-if="item.meta&&item.meta.title">{{ item.meta.title }}</span>
                </template>
                 <el-menu-item v-for="child in item.children"   v-if="!child.hidden" :index="item.path+'/'+child.path"  :key="child.path" >
                      <span v-if="child.meta&&child.meta.title">{{ child.meta.title }} </span>
                 </el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'routers',
      'sidebar',
    ]),
    routes() {
      return this.routers
    },
    isCollapse() {
      return false;
    }
  },
   methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      return showingChildren.length === 1;

    }
  }
}
</script>

<style scoped>

</style>