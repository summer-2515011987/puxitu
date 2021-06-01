<template>

<div class="container">
  <div class="crumbs">
   <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item><i class="el-icon-date"></i> 招聘岗位大数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>采集规则管理</el-breadcrumb-item>
    </el-breadcrumb>-->
  </div>
  <div class="container">
    <el-tabs type="border-card" v-model="tabActiveName">
      <el-tab-pane label="采集规则管理" name="rulemanage">
        <rulemanage></rulemanage>
      </el-tab-pane>
      <el-tab-pane label="采集任务调度" name="crawlrulemanage">
        <crawlrulemanage></crawlrulemanage>
      </el-tab-pane>
      <el-tab-pane label="清洗规则管理" name="clearrulemanage">
        <clearrulemanage></clearrulemanage>
      </el-tab-pane>


    </el-tabs>
  </div>

</div>

</template>
<script>
import rulemanage from './rulemanage/RuleManage';
import crawlrulemanage from './rulemanage/CrawlRuleManage';
import clearrulemanage from './rulemanage/clearrulemanage';
export default {
  name: 'spidemanage',
  components: {
    rulemanage, crawlrulemanage,clearrulemanage
  },
  data() {
    return {
      tabActiveName: 'rulemanage'
    };
  },
  mounted() {

  },
  created(){

  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
li{
  float:none
}
</style>