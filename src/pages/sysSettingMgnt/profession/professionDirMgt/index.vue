<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>专业目录管理
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
            <el-form-item label="年份：">
                <el-input v-model="listQuery.year" style="width: 100px" placeholder="年份" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业名称：">
                <el-input v-model="listQuery.professionalName" class="input-width" placeholder="专业名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="职业名称：">
                <el-input v-model="listQuery.jobName" class="input-width" placeholder="职业名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
                <el-button type="primary" @click="handleAdd()" class="searchBtn">新增</el-button>
                <el-button type="primary" @click="handleBatchDelete()" class="searchBtn">删除</el-button>
                <el-upload
                    style="margin-left:10px; display: inline-block;"
                    :on-success="handleFileSuccess"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :before-upload="beforeImport"
                    accept=".xls,.xlsx"
                    action>
                <el-button class="searchBtn" type="primary">导入</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%;flex:1; min-height: 500px" @selection-change="changeFun"
                  v-loading="listLoading" stripe border @row-dblclick="tableDbEdit">
            <el-table-column
                    type="selection"
                    width="55" >
            </el-table-column>
          <el-table-column label="年份" width="100">
            <template slot-scope="scope">{{ scope.row.year}}</template>
          </el-table-column>
            <el-table-column label="门类" align="center">
                <template slot-scope="scope">{{ scope.row.category }}</template>
            </el-table-column>
            <el-table-column label="专业类" align="center">
                <template slot-scope="scope">{{ scope.row.professionalClass }}</template>
            </el-table-column>
            <el-table-column label="专业代码" align="center">
                <template slot-scope="scope">{{ scope.row.professionalCode }}</template>
            </el-table-column>
            <el-table-column label="职业名称" align="center">
                <template slot-scope="scope">{{ scope.row.jobName }}</template>
            </el-table-column>
            <el-table-column label="专业名称" align="center">
                <template slot-scope="scope">{{ scope.row.professionalName }}</template>
            </el-table-column>
            <el-table-column label="主要应对职业类别" width="200px" align="center">
                <template slot-scope="scope">{{ scope.row.mainJobtype}}</template>
            </el-table-column>
            <el-table-column label="学位授予门类" align="center">
                <template slot-scope="scope">{{ scope.row.awardCategory }}</template>
            </el-table-column>
            <el-table-column label="修业年限" align="center">
                <template slot-scope="scope">{{ scope.row.studyDuration }}</template>
            </el-table-column>
            <el-table-column label="增设年份" align="center">
                <template slot-scope="scope">{{ scope.row.createYear}}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleUpdate(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>

                </template>
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
     <el-dialog
            :title="isEdit?'编辑专业目录':'新增专业目录'"
            :visible.sync="dialogVisible"
            width="750px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="140px" size="small" :inline="true">
              <el-form-item label="年份：">
                  <el-input class="formStyle" v-model="dataTable.year" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="门类：">
                  <el-input class="formStyle" v-model="dataTable.category" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="专业类：">
                  <el-input class="formStyle" v-model="dataTable.professionalClass" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="专业代码：">
                  <el-input class="formStyle" v-model="dataTable.professionalCode" ></el-input>
              </el-form-item>
              <el-form-item label="专业名称：">
                  <el-input class="formStyle" v-model="dataTable.professionalName" ></el-input>
              </el-form-item>
              <el-form-item label="职业名称：">
                  <el-input class="formStyle" v-model="dataTable.jobName" ></el-input>
              </el-form-item>
              <el-form-item label="主要应对职业类别：">
                  <el-input class="formStyle" v-model="dataTable.mainJobtype" ></el-input>
              </el-form-item>
              <el-form-item label="学位授予门类：">
                  <el-input class="formStyle" v-model="dataTable.awardCategory" ></el-input>
              </el-form-item>
              <el-form-item label="修业年限：">
                  <el-input class="formStyle" v-model="dataTable.studyDuration" ></el-input>
              </el-form-item>
              <el-form-item label="增设年份：">
                  <el-input class="formStyle" v-model="dataTable.createYear" ></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">保 存</el-button>
      </span>
        </el-dialog>
</div>


</template>
<script>
import {formatDate} from '@/utils/date';
import professionDir from "@/api/profession/professionDirMgt";
import {fetchList,fetchListById,fetchDataListByDictName} from '@/api/dict'
import uploadfile from '@/api/uploadfile'
const DATATABLEID=20
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  year: null,
  professionalName:null,
  jobName:null
};
const defaultTable = {
    id: 0,
    year: null,
    category: null,
    professionalClass:null,
    professionalCode:null,
    professionalName:null,
    awardCategory:null,
    studyDuration: null,
    createYear: null,
    mainJobtype: null,
    jobName:null
};
export default {
  name: 'tableList',
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
      professionDirLists:[],
      dbLists:[],
      multipleSelection:[],
      dictLists:[],
      dictName:null,
    }
  },
  created() {
    this.getList();
    //this.getDictList();
  },

  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd') // hh:mm:ss
    }
  },
    mounted(){

    },
  methods: {
      beforeImport(file){
          const fileext = file.name.toLowerCase();
          const isExcel = fileext.endsWith(".xls") || fileext.endsWith(".xlsx")
          if(!isExcel){
            this.$message({type:'error', message:"只能导入excel"})
          }
          return isExcel
        },
        uploadFile(fileObj){
          console.log(fileObj)
          uploadfile.importExcel(fileObj.file,DATATABLEID).then(response => {
            const retdata = response
            console.log(retdata)
            if(retdata.code==200){
              //成功了
              this.$message({
                message: '成功导入'+retdata.data.success+'条',
                type: 'success'
              });
            }else{
              this.$message({
                message: retdata.message,
                type: 'error'
              });
            }
            this.getList()
          }).catch(err=>{
            console.log(err)
          });
      },
       handleFileSuccess(res, file){
        console.log(res, file)
      },
      handleResetSearch() {
          this.listQuery = Object.assign({}, defaultListQuery);
          this.getList();
      },
      handleSearchList() {
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
      handleAdd() {
          this.dialogVisible = true;
          this.isEdit = false;
          this.dataTable = Object.assign({}, defaultTable);
      },
      handleDelete(index, row) {
          this.$confirm('是否要删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              professionDir.deleteProfessionDir(row.id).then(response => {
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                  this.getList();
              });
          });
      },changeFun(val) {
          this.multipleSelection = val;
      }, handleBatchDelete(index, row) {
          const rows = this.multipleSelection;
          if(rows.length==0){
              this.$message({
                  type: 'warning',
                  message: '请选择记录!'
              });
              return;
          }
          this.$confirm('是否要删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              const ids = new Array();
              for (let i = 0; i < rows.length; i++) {
                  ids.push(rows[i].id);
              }
              professionDir.batchDeleteProfessionDir(ids).then(response => {
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
          if (this.isEdit) {
              professionDir.updateData(this.dataTable.id, this.dataTable).then(response => {
                  this.$message({
                      message: '修改成功！',
                      type: 'success'
                  });
                  this.dialogVisible = false;
                  this.getList();
              })
          } else {
              professionDir.createData(this.dataTable).then(response => {
                  this.$message({
                      message: '添加成功！',
                      type: 'success'
                  });
                  this.dialogVisible = false;
                  this.getList();
              })
          }
      },
      getList() {
          this.listLoading = true;
          professionDir.fetchList(this.listQuery).then(response => {
              this.listLoading = false;
              this.list = response.data.list;
              this.total = response.data.total;
          });
      }, tableDbEdit(row, column, cell, event) {
          this.handleUpdate(0, row);
      }
  }
}
</script>

<style scoped>
@import "../../../../assets/css/sysSet/wordManagement.css";
.el-table td, .el-table th {
    padding: 12px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
}

.el-input {
    position: relative;
    font-size: 14px;
    /* display: inline-block; */
    width: 100%;
}
.el-select {
    /* display: inline-block; */
    position: relative;
}
</style>