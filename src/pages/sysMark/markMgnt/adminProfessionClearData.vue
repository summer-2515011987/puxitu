<template>
  <div class="main_contain">
    <div class="headerd">
      <span class="el-icon-caret-right"></span>标注数据管理
    </div>
    <div class="myTable">
      <el-form :inline="true" :model="listQuery" label-width="140px" style="text-align:left;">
        <el-form-item label="专业群名称：">
          <el-select v-model="listQuery.professionGroup" clearable placeholder="请选择专业群">
            <el-option
                v-for="item in groups"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位名称：">
          <el-input v-model="listQuery.positionTitle" class="input-width" placeholder="职位名称" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="行业名称：">
          <el-input v-model="listQuery.industry" class="input-width" placeholder="行业名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="招聘城市：">
          <el-input v-model="listQuery.city" class="input-width" placeholder="招聘城市" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-input v-model="listQuery.companyName" class="input-width" placeholder="公司名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="发布时间：">
          <el-date-picker   v-model="listQuery.startTime" type="date" placeholder="发布时间起"></el-date-picker>
          <i>-</i>
           <el-date-picker  v-model="listQuery.endTime" type="date" placeholder="发布时间止"></el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <i class="el-icon-sort" @click="setSortValue" style="font-size:20px;margin-right:20px" :title="this.sortTitle"></i>
          <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询</el-button>
          <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                :data="list"
                style="width: 100%;flex:1; min-height: 500px"
                v-loading="listLoading" stripe border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-html="props.row.expandhtml"></div>

          </template>
        </el-table-column>
        <el-table-column label="任务名称" width="180px">
          <template slot-scope="scope">{{ scope.row.taskName }}</template>
        </el-table-column>
        <el-table-column label="专业群名称" width="170px">
          <template slot-scope="scope">{{ scope.row.small_class_group }}</template>
        </el-table-column>
        <el-table-column label="职位名称" width="240px">
          <template slot-scope="scope">{{ scope.row.position_title }}</template>
        </el-table-column>
        <el-table-column label="岗位描述（关键词）" align="center">
          <template slot-scope="scope">{{ scope.row.position_detail_keywords_mv | formatKeywords}}</template>
        </el-table-column>
        <el-table-column label="岗位描述（句子）" align="center">
          <template slot-scope="scope">{{ scope.row.htmlContent | formatSentenceLimit}}</template>
        </el-table-column>
        <el-table-column label="是否放弃" align="center" width="100px">
          <template slot-scope="scope">{{ scope.row.postion_status | statusFormat}}</template>
        </el-table-column>
        <!-- <el-table-column label="公司名称">
          <template slot-scope="scope">{{ scope.row.companyName }}</template>
        </el-table-column>
        <el-table-column label="招聘城市" align="center">
          <template slot-scope="scope">{{ scope.row.city }}</template>
        </el-table-column>
        <el-table-column label="行业">
          <template slot-scope="scope">{{ scope.row.industry }}</template>
        </el-table-column>
        <el-table-column label="数据来源平台" align="center">
          <template slot-scope="scope">{{ scope.row.dataSourcesPlatform }}</template>
        </el-table-column> -->
        <el-table-column label="创建时间" align="center" width="120px">
          <template slot-scope="scope">{{ scope.row.date | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template slot-scope="scope"><a :href="scope.row.id | generateViewUrl" v-if="scope.row.taskName">查看详细</a></template>

        </el-table-column>
      </el-table>
      <el-pagination  class="footer-pagination"
                      background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      layout="total, sizes,prev, pager, next,jumper"
                      :current-page.sync="listQuery.pageNum"
                      :page-size="listQuery.pageSize"
                      :page-sizes="[10,20,30]"
                      :total="total">
      </el-pagination>
    </div>
  </div>


</template>
<script>
import professionClearData from '@/api/sysapi/professionClearData';
import {formatDate} from '@/utils/date';
import {fetchAdminList} from "../../../api/sysapi/professionClearData";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
const defaultTable = {
  id: 0,
  positionLabel: null,
  positionTitle: null,
  positionDetail: null,
  companyName: null,
  industryCode: null,
  industry: null,
  dataSourcesPlatform: null,
  positionUrl: null,
  salary: null,
  salaryNum: null,
  positionCompanyUrl: null,
  companyAddr: null,
  companyWelfare: null,
  companyDetail: null,
  companyType: null,
  workAddr: null,
  createTime: null
};
export default {
  name: 'adminProfessionClearData',
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      dataTable: Object.assign({}, defaultTable),
      isEdit: false,
      rules:{
        createTime: [{
          required: true,
          message: '请选择日期选择',
          trigger: 'change'
        }],
      },
      sortTitle:"按发布时间由远到近排序",
      groups:[]
    }
  },
  created() {
    this.getGroups();
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    },
    formatKeywords(keywords) {
      if (keywords == null || keywords === '') {
        return '';
      }
      return JSON.stringify(keywords).replaceAll("[","").replaceAll("]","").substr(0,50);
    },
    formatSentenceLimit(htmlcontent){
      if(!htmlcontent){
        return '';
      }
      var con = "";
      var sentenceobj = JSON.parse(htmlcontent);
      for(var key in sentenceobj){
        var sents = sentenceobj[key];
        if(sents){
          con+=key+":"+sents.join(";");
        }else{
          con+=key+": ;";
        }

      }
      return con.substr(0,30);
    },
    statusFormat(status){
      var ret = "否";
      if(status==2){
        ret = "已放弃";
      }
      return ret;
    },
    formatSentenceExpand(htmlcontent){
      if(!htmlcontent){
        return '';
      }
      var con = "";
      var sentenceobj = JSON.parse(htmlcontent);
      for(var key in sentenceobj){
        var sents = sentenceobj[key];
        if(sents){
          con+=key+":"+sents.join(";<br/>");
        }else{
          con+=key+": ;<br/>";
        }

      }
      return con;
    },
    generateViewUrl(id){

      return "/#/markMain/markDetailMsg?positionId="+id.substring(9,33);
    }
  },
  mounted(){

  },
  methods: {
    formatSentenceExpand(htmlcontent){
      var con = "<span style='font-weight: bold'>标注的维度句子</span><br/></span><table style='border: 0px;width: 100%'><tr><td width='100px'>维度</td><td>句子</td></tr>";
      if(htmlcontent){
        var sentenceobj = JSON.parse(htmlcontent);

        for(var key in sentenceobj){
          var sents = sentenceobj[key];
          if(sents){
            con+="<tr><td>"+key+"</td><td>"+sents.join("<br/>")+"</td></tr>";
          }else{
            con+="<tr><td>"+key+"</td><td> </td></tr>";
          }
        }
      }
      con+="</<table>";
      return con;
    },
    formatKeywordExpand(keyword){
      var html = "<span style='font-weight: bold'>标注的关键词</span><br/>";
      if(keyword){
        console.log(keyword)
        for(var i=0;i<keyword.length;i++){
          html+=keyword[i]+", ";
        }
      }
      html+="<br/>";
      return html;
    },
    handleResetSearch() {
      this.listQuery=Object.assign({}, defaultListQuery);
      this.getList();
    },handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dataManagePositionInfo.deleteTableColumn(row.id,row.professionCode).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.dataTable = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          dataManagePositionInfo.updateData(this.dataTable).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          dataManagePositionInfo.createData(this.dataTable).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        }
      })
    },
    getGroups(){
      var that = this;
      professionClearData.fetchGroups().then(response => {
        that.groups = response.data
      });
    },
    getList() {
      this.listLoading = true;
      var that = this;
      professionClearData.fetchAdminList(this.listQuery).then(response => {
        that.listLoading = false;
        that.list = response.data.list;
        for(var i=0;i<that.list.length;i++){
          var hc = that.list[i].htmlContent;
          that.list[i].htmlContentExpand = that.formatSentenceExpand(hc)
          that.list[i].keywordExpand = that.formatKeywordExpand(that.list[i].position_detail_keywords_mv)
          that.list[i].expandhtml = that.list[i].keywordExpand+that.list[i].htmlContentExpand;
        }
        that.total = response.data.total;
      });
    },setSortValue(){
      let sortv = this.listQuery.sortType;
      if(sortv==0){
        this.sortTitle = "按发布时间由近到远排序";
        this.listQuery.sortType = 1;
      }else{
        this.sortTitle = "按发布时间由远到近排序";
        this.listQuery.sortType = 0;
      }
      this.getList();
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>