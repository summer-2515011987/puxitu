<template>

<div class="container">
  <div class="crumbs">
  </div>
  <div class="container">
    <el-tabs type="border-card" v-model="tabActiveName">
      <el-tab-pane label="专业就业排名" name="professionRankingManage">
        <professionRankingManage></professionRankingManage>
      </el-tab-pane>
      <el-tab-pane label="行业就业排名" name="industryRankingManage">
        <industryRankingManage></industryRankingManage>
      </el-tab-pane>
      <el-tab-pane label="行业分布情况" name="industryDistributeManage">
        <industryDistributeManage></industryDistributeManage>
      </el-tab-pane>
      <el-tab-pane label="专业平均薪酬排名" name="professionAvgSaleManage">
        <professionAvgSaleManage></professionAvgSaleManage>
      </el-tab-pane>
      <el-tab-pane label="就业岗位地域排名" name="positionAreaManage">
        <positionAreaManage></positionAreaManage>
      </el-tab-pane>
      <el-tab-pane label="主流招聘网站近两年招聘职位量" name="positionNumManage">
        <positionNumManage></positionNumManage>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
<script>
import professionRankingManage from './manage/professionRankingManage';
import industryRankingManage from './manage/industryRankingManage';
import industryDistributeManage from './manage/industryDistributeManage';
import professionAvgSaleManage from './manage/professionAvgSaleManage';
import positionAreaManage from './manage/positionAreaManage';
import positionNumManage from './manage/positionNumManage';
export default {
  name: 'positionMiningmanage',
  components: {
    professionRankingManage, industryRankingManage,industryDistributeManage,
    professionAvgSaleManage,positionAreaManage,positionNumManage
  },
  data() {
    return {
      tabActiveName: 'professionRankingManage'
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