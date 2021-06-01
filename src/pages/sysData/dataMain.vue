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
                        default-active="/dataMain/spiderMgt"
                        class="el-menu-vertical-demo">

                    <el-menu-item index="/dataMain/spiderMgt">
                        <i class="el-icon-menu"></i>
                        <span slot="title" >采集规则管理</span>
                    </el-menu-item>
                    <el-menu-item index="/dataMain/positionMining">
                        <i class="el-icon-location"></i>
                        <span slot="title">招聘岗位数据挖掘</span>
                    </el-menu-item>
                    <el-menu-item index="/dataMain/professionGroup">
                        <i class="el-icon-location"></i>
                        <span slot="title">专业群定义</span>
                    </el-menu-item>
                    <el-menu-item index="/dataMain/platformProfessionInfo">
                        <i class="el-icon-location"></i>
                        <span slot="title">专业群与行业招聘大数据关联</span>
                    </el-menu-item>

                    <!--<el-menu-item index="/dataMain/spiderScheduler">
                        <i class="el-icon-menu"></i>
                        <span slot="title">采集任务调度</span>
                    </el-menu-item>
                    <el-menu-item index="/dataMain/clearMgt">
                        <i class="el-icon-menu"></i>
                        <span slot="title">预清洗规则管理</span>
                    </el-menu-item>
                    <el-menu-item index="/dataMain/customClearRuleMgt">
                        <i class="el-icon-menu"></i>
                        <span slot="title">自定义清洗规则管理</span>
                    </el-menu-item>-->
                    <el-menu-item index="/dataMain/professionPost">
                        <i class="el-icon-menu"></i>
                        <span slot="title">专业群原始岗位</span>
                    </el-menu-item>
                    <el-menu-item index="/dataMain/professionClearData">
                        <i class="el-icon-menu"></i>
                        <span slot="title">专业群清洗数据</span>
                    </el-menu-item><!--
                    <el-menu-item index="/dataMain/professionCertifAnalyse">
                        <i class="el-icon-location"></i>
                        <span slot="title">证书匹配分析</span>
                    </el-menu-item>-->
                </el-menu>
            </el-aside>
            <el-main class="main_div">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import setHeaderTop from "@/pages/sysData/setLayout/setHeaderTop";

export default {
  name: "index",
  components: {
    setHeaderTop,
  },
  data() {
    return {};
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
