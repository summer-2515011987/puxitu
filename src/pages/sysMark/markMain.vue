<template>
    <el-container style="height: 100%">
        <el-header style="padding: 0;height: 77px">
            <setHeaderTop></setHeaderTop>
        </el-header>
        <el-container style="height: calc(100% - 77px);">
            <el-aside width="270px"  style="background-color: #304156">
                <el-menu background-color="#304156"
                        text-color="#bfcbd9"  
                        active-text-color="#409EFF" router  
                        style="border-right:none;margin: 0; text-align: left;"
                        default-active="/markMain/markMgnt"
                        class="el-menu-vertical-demo">
                    <el-menu-item index="/markMain/markMgnt" v-if="loginUserRoles.indexOf('管理员')!=-1">
                        <i class="el-icon-location"></i>
                        <span slot="title">标注管理</span>
                    </el-menu-item>
                    <el-menu-item index="/markMain/tempTaskList" v-if="loginUserRoles.indexOf('标注')!=-1">
                        <i class="el-icon-location"></i>
                        <span slot="title">标注管理</span>
                    </el-menu-item>
                    <el-menu-item index="/markMain/preview" v-if="loginUserRoles.indexOf('管理员')!=-1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">图谱预览</span>
                    </el-menu-item>
                    <el-menu-item index="/markMain/adminProfessionClearData" v-if="loginUserRoles.indexOf('管理员')!=-1">
                      <i class="el-icon-menu"></i>
                      <span slot="title">标注数据管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main_div">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import setHeaderTop from "@/pages/sysMark/setLayout/setHeaderTop";

export default {
  name: "index",
  components: {
    setHeaderTop,
  },
  data() {
    return {
      loginUserRoles:  sessionStorage.getItem("roles"),
    };
  },
}
</script>

<style scoped>
.main_div{
  padding: 30px;
  background:#e9effc75;
  overflow: hidden;

}
.el-header{
  padding: 0;
}
</style>
