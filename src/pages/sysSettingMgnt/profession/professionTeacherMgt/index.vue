<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>专业教师数据
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="年份：">
            <el-input v-model="listQuery.year"  style="width: 100px" placeholder="年份" clearable></el-input>
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
            <el-table-column label="院校名称" width="300" align="center">
                <template slot-scope="scope">{{ scope.row.schoolName }}</template>
            </el-table-column>
            <el-table-column label="院校代码" align="center">
                <template slot-scope="scope">{{ scope.row.schoolCode }}</template>
            </el-table-column>
            <el-table-column label="所属院系" align="center">
                <template slot-scope="scope">{{ scope.row.departments }}</template>
            </el-table-column>
            <el-table-column label="专业名称 " align="center">
                <template slot-scope="scope">{{ scope.row.professionName }}</template>
            </el-table-column>
            <el-table-column label="专业代码 " align="center">
                <template slot-scope="scope">{{ scope.row.professionCode }}</template>
            </el-table-column>
            <el-table-column label="专业方向" align="center"    >
                <template slot-scope="scope">{{ scope.row.professionalDirection }}</template>
            </el-table-column>
            <el-table-column label="教师数量" align="center">
                <template slot-scope="scope"></template>
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
            :title="isEdit?'编辑教师数据':'新增教师数据'"
            :visible.sync="dialogVisible"
            width="750px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="140px" size="small" :inline="true">
              <el-form-item label="教师姓名：">
                  <el-input class="formStyle" v-model="dataTable.teacherName" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="性别：">
                  <el-select v-model="dataTable.teacherSex" placeholder="请选择" :style="{width: '200px'}">
                      <el-option v-for="item in sexLists" :key="item.value" :label="item.label" :value="item.label">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="学历：">
                  <el-select v-model="dataTable.education" placeholder="请选择" :style="{width: '200px'}">
                      <el-option v-for="item in educationLists" :key="item.value" :label="item.label" :value="item.label">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="年龄：">
                  <el-select v-model="dataTable.age" placeholder="请选择" :style="{width: '200px'}">
                      <el-option v-for="item in ageLists" :key="item.value" :label="item.label" :value="item.label">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="类型：">
                  <el-select v-model="dataTable.teacherType" placeholder="请选择" :style="{width: '200px'}">
                      <el-option v-for="item in typeLists" :key="item.value" :label="item.label" :value="item.label">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="职称：">
                  <el-select v-model="dataTable.technicalName" placeholder="请选择" :style="{width: '200px'}">
                      <el-option v-for="item in technicalLists" :key="item.value" :label="item.label" :value="item.label">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="年份：">
                  <el-input class="formStyle" v-model="dataTable.year" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="省份：">
                  <el-select v-model="dataTable.provinces" placeholder="请选择" clearable :style="{width: '200px'}" @change="proviceChange">
                      <el-option v-for="(item, index) in proviceLists" :key="index" :label="item.label" :value="item.label" :code="item.value"></el-option>
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
                  <el-select v-model="dataTable.schoolName" placeholder="请选择" clearable :style="{width: '200px'}" @change="schoolChange">
                      <el-option v-for="(item, index) in schoolLists" :key="index" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                  <el-input v-show="false" v-model="dataTable.schoolId"></el-input>
              </el-form-item>
              <el-form-item label="院校代码：">
                  <el-input class="formStyle" v-model="dataTable.schoolCode" ></el-input>
              </el-form-item>
              <el-form-item label="所属院系：">
                  <el-input class="formStyle" v-model="dataTable.departments" ></el-input>
              </el-form-item>
              <el-form-item label="专业名称：">
                  <el-input class="formStyle" v-model="dataTable.professionName" ></el-input>
              </el-form-item>
              <el-form-item label="专业代码：">
                  <el-input class="formStyle" v-model="dataTable.professionCode" ></el-input>
              </el-form-item>
              <el-col :span="12">
                  <el-form-item label="专业方向：">
                      <el-input class="formStyle" v-model="dataTable.professionalDirection" ></el-input>
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
import teacher from "@/api/profession/professionTeacherMgt";
import school from "@/api/profession/professionSchoolMgt";
import dictArea from '@/api/dict_area'
import uploadfile from '@/api/uploadfile'
const DATATABLEID=26

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    year: null,
    province:null,
    schoolName: null,
    professionName: null
};
const schoolListQuery = {
    pageNum: 1,
    pageSize: 9999,
    name: null
};
const defaultTable = {
    id: 0,
    teacherName: null,
    teacherSex: null,
    education:null,
    age:null,
    teacherType:null,
    technicalName:null,
    year: null,
    provinces: null,
    city: null,
    schoolName: null,
    schoolCode: null,
    departments: null,
    professionName: null,
    professionCode: null,
    professionalDirection: null,
    schoolId:null,
    provinceId:null,
    cityId:null
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
            proviceLists:[],
            cityLists:[],
            schoolLists:[],
            dictName:null,
            sexLists: [{
                value: '1',
                label: '男'
            }, {
                value: '0',
                label: '女'
            }],
            typeLists:[{
                value: '0',
                label: '双师型教师'
            }, {
                value: '1',
                label: '骨干教师'
            },{
                value: '2',
                label: '专业教师'
            }],
            technicalLists:[{
                value: '0',
                label: '教授'
            }, {
                value: '1',
                label: '副教授'
            },{
                value: '2',
                label: '讲师'
            },{
                value: '3',
                label: '助理教师'
            }],
            educationLists:[{
                value: '0',
                label: '本科'
            }, {
                value: '1',
                label: '硕士研究生'
            },{
                value: '2',
                label: '博士研究生'
            }],
            ageLists:[{
                value: '0',
                label: '35及以下'
            }, {
                value: '1',
                label: '36-45'
            },{
                value: '2',
                label: '46-55'
            },{
                value: '3',
                label: '56及以上'
            }]
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
            return formatDate(date, 'yyyy') // hh:mm:ss
        }
    },
    mounted(){
        this.getProviceList();
        this.getSchoolList();
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
                teacher.deleteInfo(row.id).then(response => {
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
                teacher.batchDelete(ids).then(response => {
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
                teacher.updateData(this.dataTable.id, this.dataTable).then(response => {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.getList();
                })
            } else {
                teacher.createData(this.dataTable).then(response => {
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
            teacher.fetchList(this.listQuery).then(response => {
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