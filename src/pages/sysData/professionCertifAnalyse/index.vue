<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>证书匹配分析
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="年份：">
            <el-input v-model="listQuery.year" style="width: 100px" placeholder="年份" clearable></el-input>
          </el-form-item>
            <el-form-item label="批次：">
                <el-input v-model="listQuery.batch" class="input-width" placeholder="批次" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业名称：">
                <el-input v-model="listQuery.professionName" class="input-width" placeholder="专业名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="证书名称：">
                <el-input v-model="listQuery.certificateTitle" class="input-width" placeholder="证书名称" clearable></el-input>
            </el-form-item>
          <el-form-item>
                <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
                <el-button type="primary" @click="handleAdd()" class="searchBtn">新增</el-button>
                <!--<el-button type="primary" @click="handleBatchDelete()" class="searchBtn">删除</el-button>
                <el-upload
                    style="margin-left:10px; display: inline-block;"
                    :on-success="handleFileSuccess"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :before-upload="beforeImport"
                    accept=".xls,.xlsx"
                    action>
                <el-button class="searchBtn" type="primary">导入</el-button>
                </el-upload>-->
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
         <!-- <el-table-column label="年份" width="100" align="center">
            <template slot-scope="scope">{{ scope.row.year}}</template>
          </el-table-column>-->
            <el-table-column label="批次" align="center">
                <template slot-scope="scope">{{ scope.row.batch }}</template>
            </el-table-column>
           <!-- <el-table-column label="专业名称" align="center">
                <template slot-scope="scope">{{ scope.row.professionName }}</template>
            </el-table-column>
            <el-table-column label="专业代码" align="center">
                <template slot-scope="scope">{{ scope.row.professionCode }}</template>
            </el-table-column>
            <el-table-column label="学历层次" align="center">
                <template slot-scope="scope">{{ scope.row.educationLevel }}</template>
            </el-table-column>-->
            <el-table-column label="证书名称" align="center" width="200">
                <template slot-scope="scope">{{ scope.row.certificateTitle }}</template>
            </el-table-column>
            <el-table-column label="培训评价组织名称" width="200" align="center">
                <template slot-scope="scope">{{ scope.row.orgName }}</template>
            </el-table-column>
            <el-table-column label="所属省市" align="center">
                <template slot-scope="scope">{{ scope.row.province}} - {{scope.row.city}}</template>
            </el-table-column>
            <el-table-column label="培训评价组织性质" align="center" width="200">
                <template slot-scope="scope">{{ scope.row.orgNature }}</template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <a @click="showResult(scope.$index, scope.row)" target="_blank" class="buttonText">分析结果</a>
                    <span style="margin-left:20px"></span>
                    <a @click="handleUpdate(scope.$index, scope.row)" target="_blank" class="buttonText">编辑</a>
                    <span style="margin-left:20px"></span>
                    <a @click="handleDelete(scope.$index, scope.row)" target="_blank" class="buttonText">删除</a>
                   <!-- <span style="margin-left:20px"></span>
                    <el-button size="mini"
                               @click="showResult(scope.$index, scope.row)">分析结果1
                    </el-button>
                    <el-button size="mini"
                               @click="handleUpdate(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>-->
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
              <el-form-item label="年份：">
                  <el-input class="formStyle" v-model="dataTable.year" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="批次：">
                  <el-input class="formStyle" v-model="dataTable.batch" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="专业名称：">
                  <el-input class="formStyle" v-model="dataTable.professionName" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="专业代码：">
                  <el-input class="formStyle" v-model="dataTable.professionCode" ></el-input>
              </el-form-item>
              <el-form-item label="学历层次：">
                  <el-input class="formStyle" v-model="dataTable.educationLevel" ></el-input>
              </el-form-item>
              <el-form-item label="证书名称：">
                  <el-input class="formStyle" v-model="dataTable.certificateTitle" ></el-input>
              </el-form-item>
              <el-form-item label="培训评价组织名称：">
                  <el-input class="formStyle" v-model="dataTable.orgName" ></el-input>
              </el-form-item>
              <el-form-item label="省份：">
                  <el-select v-model="dataTable.province" placeholder="请选择" clearable :style="{width: '200px'}" @change="proviceChange">
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
              <el-form-item label="培训评价组织性质：">
                  <el-select v-model="dataTable.orgNature" placeholder="请选择" clearable :style="{width: '200px'}">
                      <el-option v-for="(item, index) in orgNatures" :key="index" :label="item.label" :value="item.label"></el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">保 存</el-button>
      </span>
        </el-dialog>

    <el-dialog
            :title="'证书占比统计'"
            :visible.sync="dialogResultVisible"
            width="750px">
        <div id="myChart14" style="width:100%;height:60%"></div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogResultVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">保 存</el-button>
      </span>
    </el-dialog>
</div>


</template>
<script>
import {formatDate} from '@/utils/date';
import certificate from "@/api/profession/professionCertificateMgt";
import dictArea from '@/api/dict_area'
import uploadfile from '@/api/uploadfile'
const DATATABLEID=18

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    year:null,
    batch:null,
    professionName: null,
    certificateTitle:null
};
const defaultTable = {
    id: 0,
    year: null,
    professionName: null,
    professionCode:null,
    educationLevel:null,
    certificateTitle:null,
    orgName:null,
    orgNature: null,
    batch: null,
    provinces: null,
    city: null,
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
            dialogResultVisible: false,
            dataTable: Object.assign({}, defaultTable),
            isEdit: false,
            isResult: false,
            professionDirLists:[],
            dbLists:[],
            multipleSelection:[],
            dictLists:[],
            dictName:null,
            proviceLists:[],
            cityLists:[],
            orgNatures:[{value:'0',label:'企业'},{value:'1',label:'行业协会'},{value:'2',label:'研究机构'},{value:'3',label:'事业单位'},{value:'4',label:'民办非企'}]
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
                certificate.deleteInfo(row.id).then(response => {
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
                certificate.batchDelete(ids).then(response => {
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
        showResult(index, row) {
            this.dialogResultVisible = true;
            let myChart = this.echarts.init(document.getElementById("myChart14"));
            certificate.findX(row.certificateTitle).then(response => {

                const options = $.extend(true, {}, this.industryPieOption);
                const nameList = response.data.nameList;
                const areaList = response.data.areaList;
                // options.legend.data=nameList;
                const datas=new Array();
                let total=0;
                for (let i = 0; i <nameList.length; i++) {
                    datas.push({
                        "name":nameList[i],
                        "value":parseInt(areaList[i])
                    });
                    total+=areaList[i];
                }
                this.provinceIndustryTypeList.data=this.getMaxThree(nameList,areaList);
                //options.legend.data=nameList;
                options.series[0].data =datas;
                options.series[0].name = "证书占比";
                //options.title.subtext=total;
                myChart.setOption(options);



            });

        },
        handleDialogConfirm() {
            if (this.isEdit) {
                certificate.updateData(this.dataTable.id, this.dataTable).then(response => {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.getList();
                })
            } else {
                certificate.createData(this.dataTable).then(response => {
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
            certificate.fetchList(this.listQuery).then(response => {
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
    @import "../../../assets/css/sysSet/wordManagement.css";
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