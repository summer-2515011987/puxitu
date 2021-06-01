<template>

<div class="container">
  <div class="crumbs">

  </div>
  <div class="container">
    <el-tabs type="border-card" v-model="tabActiveName">
      <el-tab-pane label="专业教学标准" name="professionStandard">
        <professionStandard></professionStandard>
      </el-tab-pane>
      <el-tab-pane label="职业大典" name="jobClassification">
        <jobClassification></jobClassification>
      </el-tab-pane>
      <el-tab-pane label="国民经济行业分类" name="economy">
        <economy></economy>
      </el-tab-pane>
      <el-tab-pane label="X证书标准" name="certifAnalyse">
        <certifAnalyse></certifAnalyse>
      </el-tab-pane>


    </el-tabs>
  </div>

</div>

</template>
<script>
import jobClassification from './standard/jobClassification';
import professionStandard from './standard/professionStandard';
import economy from './standard/economy';
import certifAnalyse from './standard/certifAnalyse';
export default {
  name: 'spidemanage',
  components: {
    jobClassification, professionStandard,economy,certifAnalyse
  },
  data() {
    return {
      tabActiveName: 'professionStandard'
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