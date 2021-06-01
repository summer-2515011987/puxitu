<template>
  <div class="main_contain">
    <div class="headerd">
      <span class="el-icon-caret-right"></span>专业群原始岗位
    </div>
    <div class="myTable">
      <el-form :inline="true" :model="listQuery" label-width="140px" style="text-align:left;">     
        <el-form-item label="专业群名称：">
          <el-input v-model="listQuery.professionGroupName" class="input-width" placeholder="专业群名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="职位名称：">
          <el-input v-model="listQuery.keywords" class="input-width" placeholder="职位名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="行业名称：">
          <el-input v-model="listQuery.industry" class="input-width" placeholder="行业名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="招聘城市：">
          <el-input v-model="listQuery.companyAddr" class="input-width" placeholder="招聘城市" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-input v-model="listQuery.companyName" class="input-width" placeholder="公司名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="发布时间：">
          <el-date-picker   v-model="listQuery.startTime" type="date" placeholder="发布时间起" value-format="yyyy-MM-dd"></el-date-picker>
          <i>-</i>
           <el-date-picker  v-model="listQuery.endTime" type="date" placeholder="发布时间止" value-format="yyyy-MM-dd"></el-date-picker>
          <i class="el-icon-sort" @click="setSortValue" style="font-size:20px;margin-right:20px" :title="this.sortTitle"></i>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearchList()"  class="searchBtn">查询</el-button>
          <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                :data="list"
                style="width: 100%;flex:1; min-height: 500px"
                v-loading="listLoading" stripe border>
        <!-- <el-table-column label="专业群名称"  prop="professionGroupName" :formatter="formatterGroupName" ></el-table-column> -->
        <el-table-column label="专业群名称" prop="professionGroupName">
          <template slot-scope="scope" >
              <span v-if="listQuery.professionGroupName">
                  <span>{{scope.row.professionGroupName.slice(0, scope.row.professionGroupName.indexOf(listQuery.professionGroupName))}}</span>
                  <span style="color:red">{{scope.row.professionGroupName.slice(scope.row.professionGroupName.indexOf(listQuery.professionGroupName), scope.row.professionGroupName.indexOf(listQuery.professionGroupName) + listQuery.professionGroupName.length)}}</span>
                  <span>{{scope.row.professionGroupName.slice(scope.row.professionGroupName.indexOf(listQuery.professionGroupName)+listQuery.professionGroupName.length)}}</span>
              </span>
              <span v-else>{{scope.row.professionGroupName}}</span>
            </template>
        </el-table-column>
        <el-table-column label="职位名称">
          <template slot-scope="scope">{{ scope.row.positionTitle }}</template>
        </el-table-column>
        <el-table-column label="薪资需求" align="center">
          <template slot-scope="scope">{{ scope.row.salary }}</template>
        </el-table-column>
        <!--<el-table-column label="招聘职位公司信息地址">
          <template slot-scope="scope">{{ scope.row.positionCompanyUrl }}</template>
        </el-table-column>-->
        <el-table-column label="公司名称">
          <template slot-scope="scope">{{ scope.row.companyName }}</template>
        </el-table-column>
        <el-table-column label="公司地址" align="center">
          <template slot-scope="scope">{{ scope.row.companyAddr }}</template>
        </el-table-column>
        <el-table-column label="行业">
          <template slot-scope="scope">{{ scope.row.industry }}</template>
        </el-table-column>
        <el-table-column label="数据来源平台" align="center">
          <template slot-scope="scope">{{ scope.row.dataSourcesPlatform }}</template>
        </el-table-column>
        <!--<el-table-column label="工作地址">
          <template slot-scope="scope">{{ scope.row.workAddr }}</template>
        </el-table-column>-->
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column
                label="操作"
                width="120" align="center">
          <template slot-scope="scope">
            <a @click="handleUpdate(scope.$index, scope.row)" class="buttonText">编辑</a>
            <a @click="handleDelete(scope.$index, scope.row)" class="buttonText">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination  class="footer-pagination"
                      background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      layout="total, sizes,prev, pager, next,jumper"
                      :current-page.sync="listQuery.pageNumMore"
                      :page-size="listQuery.pageSize"
                      :page-sizes="[10,20,30]"
                      :total="total">
      </el-pagination>
    </div>
    <el-dialog
            :title="'编辑岗位信息'"
            :visible.sync="dialogVisible"
            width="750px">
      <div style="height:500px">
        <el-form :model="dataTable"
                 ref="tableForm"
                 label-width="140px" size="small" :inline="true">
          <el-form-item label="职位名称：">
            <el-input class="formStyle" v-model="dataTable.positionTitle" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="职位标签：">
            <el-input class="formStyle" v-model="dataTable.positionLabel" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="薪资需求：">
            <el-input class="formStyle" v-model="dataTable.salary" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="企业类型：">
            <el-input class="formStyle" v-model="dataTable.companyType" ></el-input>
          </el-form-item>
          <el-form-item label="行业：">
            <el-input class="formStyle" v-model="dataTable.industry" ></el-input>
          </el-form-item>
          <el-form-item label="行业代码：">
            <el-input class="formStyle" v-model="dataTable.industryCode" ></el-input>
          </el-form-item>
          <el-form-item label="数据来源平台：">
            <el-input class="formStyle" v-model="dataTable.dataSourcesPlatform" ></el-input>
          </el-form-item>
          <el-form-item label="招聘详情地址：">
            <el-input class="formStyle" v-model="dataTable.positionUrl" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="工作地址：">
            <el-input class="formStyle" v-model="dataTable.workAddr" ></el-input>
          </el-form-item>
          <el-form-item label="公司信息地址：">
            <el-input class="formStyle" v-model="dataTable.positionCompanyUrl" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：">
            <el-input class="formStyle" v-model="dataTable.companyName" ></el-input>
          </el-form-item>
          <el-form-item label="公司地址：">
            <el-input class="formStyle" v-model="dataTable.companyAddr" ></el-input>
          </el-form-item>
          <el-col :span="46">
            <el-form-item label="公司福利：">
              <el-input class="formStyle" v-model="dataTable.companyWelfare" style="width:550px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="46">
            <el-form-item label="职位详情：">
              <el-input type="textarea" class="formStyle" v-model="dataTable.positionDetail" rows="7" style="width: 550px;"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import dataManagePositionInfo from '@/api/dataManageZhuanYeQun';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 0,
    pageSize: 10,
    keywords:null,
    sort:0,
    industry: null,
    companyAddr: null,
    professionGroupName:null
  };
  const defaultTable = {
    id: 0,
    positionId: null,
    positionLabel: null,
    positionTitle: null,
    positionDetail: null,
    positionUrl: null,
    salary: null,
    salaryNum: null,
    positionCompanyUrl: null,
    companyName: null,
    companyAddr: null,
    companyWelfare: null,
    companyDetail: null,
    companyType: null,
    workAddr: null,
    industryCode: null,
    industry: null,
    dataSourcesPlatform: null,
    createTime: null
  };
  export default {
    name: 'positionInfo',
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
        sortTitle:"按发布时间由远到近排序"
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    mounted(){

    },
    methods: {
      // formatterGroupName(row, column){
      //   if(row.professionGroupName){
      //     return '<span style="color:red;">sdjfsldjf</span>'
      //   }
      // },
      handleResetSearch() {
        this.listQuery=Object.assign({}, defaultListQuery);
        this.getList();
      },
      handleSearchList() {
        this.listQuery.pageNum = 0;
        this.listQuery.pageNumMore = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageNumMore = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNumMore =val;
        this.listQuery.pageNum = val-1;
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
      getList() {
        this.listLoading = true;
        dataManagePositionInfo.fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      setSortValue(){
        let sortv = this.listQuery.sort;
        if(sortv==0){
          this.sortTitle = "按发布时间由近到远排序";
          this.listQuery.sort = 1;
        }else{
          this.sortTitle = "按发布时间由远到近排序";
          this.listQuery.sort = 0;
        }
        this.getList();
      },
      renderMajorName(str){
        if(this.listQuery.professionGroupName){
          var index = str.subString(this.listQuery.professionGroupName);
          return str.subString(0, index)+'<span style="color:red;">'+ this.listQuery.professionGroupName +'</span>' + str.subString(index);
        }
        
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/sysSet/wordManagement.css";
</style>