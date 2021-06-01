<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>专业开设情况
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
                <template slot-scope="scope">{{ scope.row.provinces }}</template>
            </el-table-column>
            <el-table-column label="院校名称" align="center">
                <template slot-scope="scope">{{ scope.row.schoolName }}</template>
            </el-table-column>
            <el-table-column label="院校代码" align="center">
                <template slot-scope="scope">{{ scope.row.schoolCode }}</template>
            </el-table-column>
            <el-table-column label="专业名称" align="center">
                <template slot-scope="scope">{{ scope.row.professionName }}</template>
            </el-table-column>
            <el-table-column label="证书名称" align="center">
                <template slot-scope="scope">{{ scope.row.certificateTitle }}</template>
            </el-table-column>
            <el-table-column label="修业年限" align="center">
                <template slot-scope="scope">{{ scope.row.studyduration }}</template>
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
            :title="isEdit?'编辑专业开设':'新增专业开设'"
            :visible.sync="dialogVisible"
            width="750px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="140px" size="small" :inline="true">
              <el-form-item label="专业名称：">
                  <el-input class="formStyle" v-model="dataTable.professionName" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="专业代码：">
                  <el-input class="formStyle" v-model="dataTable.professionCode" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="开设年份：">
                  <el-input class="formStyle" v-model="dataTable.year" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="衔接中职：">
                  <el-input class="formStyle" v-model="dataTable.secondary" ></el-input>
              </el-form-item>
              <el-form-item label="衔接本科：">
                  <el-input class="formStyle" v-model="dataTable.undergraduateCourse" ></el-input>
              </el-form-item>
              <el-form-item label="入学要求：">
                  <el-input class="formStyle" v-model="dataTable.require" ></el-input>
              </el-form-item>
              <el-form-item label="修业年限：">
                  <el-input class="formStyle" v-model="dataTable.studyduration" ></el-input>
              </el-form-item>
              <el-form-item label="对应行业（代码）：">
                  <el-input class="formStyle" v-model="dataTable.jobCode" ></el-input>
              </el-form-item>
              <el-form-item label="职业类别（代码）：">
                  <el-input class="formStyle" v-model="dataTable.jobTypecode" ></el-input>
              </el-form-item>
              <el-form-item label="主要岗位群：">
                  <el-input class="formStyle" v-model="dataTable.mainJob" ></el-input>
              </el-form-item>
              <el-form-item label="培养目标：">
                  <el-input class="formStyle" v-model="dataTable.trainingGoal" ></el-input>
              </el-form-item>
              <el-form-item label="培养规格：">
                  <el-input class="formStyle" v-model="dataTable.trainingStandard" ></el-input>
              </el-form-item>
              <el-form-item label="核心课程：">
                  <el-input class="formStyle" v-model="dataTable.coreCourse" ></el-input>
              </el-form-item>
              <el-form-item label="实训课程：">
                  <el-input class="formStyle" v-model="dataTable.trainingCourse" ></el-input>
              </el-form-item>
              <el-form-item label="师资条件：">
                  <el-input class="formStyle" v-model="dataTable.teachersCondition" ></el-input>
              </el-form-item>
              <el-form-item label="实训条件：">
                  <el-input class="formStyle" v-model="dataTable.practicalCondition" ></el-input>
              </el-form-item>
              <el-form-item label="质量保障：">
                  <el-input class="formStyle" v-model="dataTable.qualityAssurance"></el-input>
              </el-form-item>
              <el-form-item label="省份：">
                  <el-select v-model="dataTable.provinces" placeholder="请选择" clearable :style="{width: '200px'}" @change="proviceChange">
                      <el-option v-for="(item, index) in proviceLists" :key="index" :label="item.label" :value="item.label" :code="item.value"></el-option>
                  </el-select>
                  <el-input v-show="false" v-model="dataTable.provinceId"></el-input>
              </el-form-item>
              <el-form-item label="院校名称：">
                  <el-select v-model="dataTable.schoolName" placeholder="请选择" clearable :style="{width: '200px'}" @change="schoolChange">
                      <el-option v-for="(item, index) in schoolLists" :key="index" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                  <el-input v-show="false" v-model="dataTable.schoolId"></el-input>
              </el-form-item>
              <el-form-item label="院校代码：">
                  <el-input class="formStyle" v-model="dataTable.schoolCode" ></el-input>
              </el-form-item>
              <el-col :span="12">
                  <el-form-item label="证书名称 ：">
                      <el-input class="formStyle" v-model="dataTable.certificateTitle" ></el-input>
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
import setup from "@/api/profession/professionSetUpMgt";
import dictArea from '@/api/dict_area'
import school from "@/api/profession/professionSchoolMgt";
import uploadfile from '@/api/uploadfile'
const DATATABLEID=24
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    year: null,
    province:null,
    schoolName:null,
    professionName: null
};
const defaultTable = {
    id: 0,
    professionName: null,
    professionCode: null,
    year:null,
    secondary:null,
    undergraduateCourse:null,
    require:null,
    studyduration: null,
    jobCode: null,
    jobTypecode: null,
    mainJob: null,
    trainingGoal: null,
    trainingStandard: null,
    coreCourse: null,
    trainingCourse: null,
    teachersCondition: null,
    practicalCondition: null,
    qualityAssurance: null,
    schoolName: null,
    schoolCode: null,
    certificateTitle: null,
    provinces: null,
    schoolId:null,
    schoolLists:[]
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
            proviceLists:[]
        }
    },
    created() {
        this.getList();
        this.getProviceList();
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
        this.getSchoolList();
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
                setup.deleteInfo(row.id).then(response => {
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
                setup.batchDelete(ids).then(response => {
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
                setup.updateData(this.dataTable.id, this.dataTable).then(response => {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.getList();
                })
            } else {
                setup.createData(this.dataTable).then(response => {
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
            setup.fetchList(this.listQuery).then(response => {
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
        },getSchoolList(){
            school.fetchList(this.schoolListQuery).then(response => {
                const result = response.data.list;
                const datas = new Array();
                for (let i = 0; i < result.length; i++) {
                    datas.push({
                        "label": result[i].schoolName,
                        "value": result[i].id
                    })
                }
                this.schoolLists = datas;
            });
        },schoolChange(val) {
            school.fetchList(this.schoolListQuery).then(response => {
                const result = response.data.list;
                for (let i = 0; i < result.length; i++) {
                    if(result[i].schoolName==val){
                        this.dataTable.schoolId = result[i].id;
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