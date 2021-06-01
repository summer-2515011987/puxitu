<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>专业院校情况
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="年份：">
            <el-input v-model="listQuery.year" style="width: 100px" placeholder="年份" clearable></el-input>
          </el-form-item>
            <el-form-item label="省份：">
                <el-input v-model="listQuery.province" class="input-width" placeholder="省份" clearable></el-input>
            </el-form-item>
            <el-form-item label="院校名称：">
                <el-input v-model="listQuery.schoolName" class="input-width" placeholder="院校名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业名称：">
                <el-input v-model="listQuery.professionName" class="input-width" placeholder="专业名称" clearable></el-input>
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
            <el-table-column label="年份" width="100" align="center">
                <template slot-scope="scope">{{ scope.row.year}}</template>
            </el-table-column>
            <el-table-column label="省份" align="center">
                <template slot-scope="scope">{{ scope.row.province}}</template>
            </el-table-column>
            <el-table-column label="所属城市" align="center">
                <template slot-scope="scope">{{ scope.row.city}}</template>
            </el-table-column>
            <el-table-column label="院校名称" width="300">
                <template slot-scope="scope">{{scope.row.schoolName}}</template>
            </el-table-column>
            <el-table-column label="院校代码" align="center">
                <template slot-scope="scope">{{scope.row.schoolCode}}</template>
            </el-table-column>
            <el-table-column label="所属院系" align="center">
                <template slot-scope="scope">{{ scope.row.departments}}</template>
            </el-table-column>
            <el-table-column label="专业名称" align="center">
                <template slot-scope="scope">{{ scope.row.professionName}}</template>
            </el-table-column>
            <el-table-column label="专业代码" align="center">
                <template slot-scope="scope">{{ scope.row.professionCode}}</template>
            </el-table-column>
            <el-table-column label="合作企业" align="center">
                <template slot-scope="scope">{{ scope.row.cooperativeEnterprise}}</template>
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
            :title="isEdit?'编辑院校数据':'新增院校数据'"
            :visible.sync="dialogVisible"
            width="750px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="140px" size="small" :inline="true">
              <el-form-item label="年份：">
                  <el-input class="formStyle" v-model="dataTable.year" ></el-input>
              </el-form-item>
              <el-form-item label="省份：">
                  <el-select v-model="dataTable.province" placeholder="请选择" clearable :style="{width: '200px'}" @change="proviceChange">
                      <el-option v-for="(item, index) in proviceLists" :key="index" :label="item.label" :value="item.label" :code="item.label"></el-option>
                  </el-select>
                  <el-input v-show="false" v-model="dataTable.provinceId"></el-input>
              </el-form-item>
              <el-form-item label="所属城市：">
                  <el-select v-model="dataTable.city" placeholder="请选择" clearable :style="{width: '200px'}" @change="cityChange">
                      <el-option v-for="(item, index) in cityLists" :key="index" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                  <el-input v-show="false" v-model="dataTable.cityId"></el-input>
              </el-form-item>
              <el-form-item label="院校名称：">
                  <el-input class="formStyle" v-model="dataTable.schoolName" ></el-input>
              </el-form-item>
              <el-form-item label="院校类型：">
                  <el-select v-model="dataTable.schoolType" placeholder="请选择" clearable :style="{width: '200px'}">
                      <el-option v-for="(item, index) in schoolTypes" :key="index" :label="item.label" :value="item.label"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="院校属性：">
                  <el-select v-model="dataTable.schoolAttr" placeholder="请选择" clearable :style="{width: '200px'}">
                      <el-option v-for="(item, index) in schoolAttrs" :key="index" :label="item.label" :value="item.label"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="学校简介：">
                  <el-input class="formStyle" v-model="dataTable.schoolOverview" ></el-input>
              </el-form-item>
              <el-form-item label="建校时间：">
                  <el-date-picker  style="width: 200px" v-model="dataTable.setupTime" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="历史沿革：">
                  <el-input class="formStyle" v-model="dataTable.historyDevelop" ></el-input>
              </el-form-item>
              <el-form-item label="标签画像：">
                  <el-input class="formStyle" v-model="dataTable.labelPicture" ></el-input>
              </el-form-item>
              <el-form-item label="特色专业：">
                  <el-input class="formStyle" v-model="dataTable.professionSpecialty" ></el-input>
              </el-form-item>
              <el-form-item label="院校地址：">
                  <el-input class="formStyle" v-model="dataTable.schoolAddr" ></el-input>
              </el-form-item>
              <el-form-item label="就业满意度：">
                  <el-input class="formStyle" v-model="dataTable.jobSatisfact" ></el-input>
              </el-form-item>
              <el-form-item label="母校满意度：">
                  <el-input class="formStyle" v-model="dataTable.schoolSatisfact" ></el-input>
              </el-form-item>
              <el-form-item label="雇主满意度：">
                  <el-input class="formStyle" v-model="dataTable.employerSatisfact" ></el-input>
              </el-form-item>
              <el-form-item label="院校代码：">
                  <el-input class="formStyle" v-model="dataTable.schoolCode" ></el-input>
              </el-form-item>
              <el-form-item label="专业名称：">
                  <el-input class="formStyle" v-model="dataTable.professionName" ></el-input>
              </el-form-item>
              <el-form-item label="合作企业：">
                  <el-input class="formStyle" v-model="dataTable.cooperativeEnterprise" ></el-input>
              </el-form-item>
              <el-form-item label="所属院系：">
                  <el-input class="formStyle" v-model="dataTable.departments" ></el-input>
              </el-form-item>
              <el-col :span="12">
                  <el-form-item label="专业代码：">
                      <el-input class="formStyle" v-model="dataTable.professionCode" ></el-input>
                  </el-form-item>
              </el-col>
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
import school from "@/api/profession/professionSchoolMgt";
import dictArea from '@/api/dict_area'
import uploadfile from '@/api/uploadfile'
const DATATABLEID=22

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null
};
const defaultTable = {
    id: 0,
    province: null,
    city: null,
    schoolName:null,
    schoolType:null,
    schoolAttr:null,
    schoolOverview:null,
    setupTime: null,
    historyDevelop: null,
    labelPicture: null,
    professionSpecialty: null,
    schoolAddr: null,
    jobSatisfact: null,
    schoolSatisfact: null,
    employerSatisfact: null,
    schoolCode: null,
    professionName: null,
    cooperativeEnterprise: null,
    departments: null,
    professionCode: null,
    provinceId:null,
    cityId:null,
    year:null
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
            proviceLists:[],
            cityLists:[],
            schoolTypes:[{value: '0',label: '综合'}, {value: '1', label: '理工'},{value: '2', label: '农业'},{value: '3', label: '林业'},{value: '4', label: '医药'},
                {value: '5', label: '师范'},{value: '6', label: '语文'},{value: '7', label: '财经'},{value: '8', label: '政法'},{value: '9', label: '体育'},
                {value: '10', label: '艺术'},{value: '11', label: '民族'}],
            schoolAttrs:[{value:'0',label:'示范性'},{value:'1',label:'骨干校'},{value:'2',label:'双高校'}]
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
        this.getProviceList();
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
                school.deleteInfo(row.id).then(response => {
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
                school.batchDelete(ids).then(response => {
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
            this.getCityList(this.dataTable.provinceId);
        },
        handleDialogConfirm() {
            if (this.isEdit) {
                school.updateData(this.dataTable.id, this.dataTable).then(response => {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.getList();
                })
            } else {
                school.createData(this.dataTable).then(response => {
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
            school.fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data.list;
                this.total = response.data.total;
            });
        }, tableDbEdit(row, column, cell, event) {
            this.handleUpdate(0, row);
        },getProviceList(){
            dictArea.fetchListByPid(1).then(response => {
                const result = response.data;
                const datas = new Array();
                for (let i = 0; i < result.length; i++) {
                    datas.push({
                        "label": result[i].name,
                        "value": result[i].id
                    })
                }
                this.proviceLists = datas;
            });
        },proviceChange(val) {
            dictArea.fetchListByPid(1).then(response => {
                const result = response.data;
                for (let i = 0; i < result.length; i++) {
                    if(result[i].name==val){
                        this.dataTable.provinceId = result[i].id;
                        this.getCityList(result[i].id);
                    }
                }
            });
        },getCityList(pid){
            //判空
            if(pid=="" || pid==null || pid == undefined){
                pid = 1
            }
            dictArea.fetchListByPid(pid).then(response => {
                const result = response.data;
                const datas = new Array();
                for (let i = 0; i < result.length; i++) {
                    datas.push({
                        "label": result[i].name,
                        "value": result[i].id
                    })
                }
                this.cityLists = datas;
            });
        },cityChange(val) {
            dictArea.fetchListByPid(this.dataTable.provinceId).then(response => {
                const result = response.data;
                for (let i = 0; i < result.length; i++) {
                    if(result[i].name==val){
                        this.dataTable.cityId = result[i].id;
                    }
                }
            });
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