<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>任务调度计划管理
    </div>
    <div class="myTable">
         <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="专业名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="专业名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()"  class="searchBtn">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()"  class="searchBtn">重置</el-button>
            <el-button type="primary" @click="handleAdd()"  class="searchBtn">添加</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%;flex:1; min-height: 500px"
                  v-loading="listLoading" stripe border>
          <el-table-column label="任务调度计划名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="计划概述">
            <template slot-scope="scope">{{ scope.row.describe }}</template>
          </el-table-column>
          <el-table-column label="操作" width="400px">
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
        <el-pagination class="footer-pagination"
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
            :title="isEdit?'编辑':'添加'"
            :visible.sync="dialogVisible"
            width="500px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="120px" size="small">
            <el-form-item label="任务调度计划：">
              <el-input v-model="dataTable.name" style="width: 250px"></el-input>
            </el-form-item>
              <el-form-item label="调度概述：">
                  <el-input v-model="dataTable.describe"
                            type="textarea"
                            :rows="5"
                            style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="专业名称：">
                  <el-select  v-model="dataTable.spidermgtId" placeholder="请选择" clearable :style="{width: '200px'}" >
                      <el-option v-for="(item, index) in spiderLists" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="调度方式：">
                  <template slot-scope="scope">
                      <el-radio v-model="dataTable.type"  :label="0" >每小时</el-radio>
                      <el-radio v-model="dataTable.type"  :label="1">每分钟</el-radio>
                      <el-radio v-model="dataTable.type"  :label="2">每天</el-radio>
                      <el-radio v-model="dataTable.type"  :label="3">每周</el-radio>
                      <el-radio v-model="dataTable.type"  :label="4">每月</el-radio>
                  </template>
              </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
        </el-dialog>
</div>
  <!-- <el-card class="box-card">

    <div slot="header" class="clearfix">
      <span class="el-page-header__content">院校专业管理</span>
      <el-button  style="float: right; padding: 3px 0" type="text" @click="getList()">刷新</el-button>
    </div>
    <el-container>

      <el-header style="padding-left: 0" height="50px">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="院校名称：">
            <el-input v-model="listQuery.schoolName" class="input-width" placeholder="院校名称" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearchList()">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()">重置</el-button>
            <el-button type="primary" @click="handleAdd()">添加</el-button>
          </el-form-item>

        </el-form>
      </el-header>

      <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">


        <el-table ref="roleTable"
                  :data="list"
                  style="width: 100%;flex:1; min-height: 500px"
                  v-loading="listLoading" stripe border>
          <el-table-column label="年份">
            <template slot-scope="scope">{{ scope.row.year }}</template>
          </el-table-column>
          <el-table-column label="省份">
            <template slot-scope="scope">{{ scope.row.province }}</template>
          </el-table-column>
            <el-table-column label="专业代码">
                <template slot-scope="scope">{{ scope.row.majorCode }}</template>
            </el-table-column>
            <el-table-column label="专业名称">
                <template slot-scope="scope">{{ scope.row.majorName }}</template>
            </el-table-column>
            <el-table-column label="院校名称">
                <template slot-scope="scope">{{ scope.row.schoolName }}</template>
            </el-table-column>
          <el-table-column label="操作" width="400px">
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

        <el-dialog
            :title="isEdit?'编辑':'添加'"
            :visible.sync="dialogVisible"
            width="500px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="150px" size="small">
            <el-form-item label="年份：">
              <el-input v-model="dataTable.year" style="width: 250px"></el-input>
            </el-form-item>
              <el-form-item label="省份：">
                  <el-input v-model="dataTable.province" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="专业代码：">
                  <el-input v-model="dataTable.majorCode" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="专业名称：">
                  <el-input v-model="dataTable.majorName" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="院校代码：">
                  <el-input v-model="dataTable.schoolCode" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="院校名称：">
                  <el-input v-model="dataTable.schoolName" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="年限：">
                  <el-input v-model="dataTable.majorYear" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                  <el-input v-model="dataTable.comment"
                            type="textarea"
                            :rows="5"
                            style="width: 250px"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
        </el-dialog>

      </el-main>

      <el-footer style="padding-left: 0; padding-right: 0" height="32px">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[10,20,30]"
            :total="total">
        </el-pagination>
      </el-footer>

    </el-container>

  </el-card> -->

</template>
<script>
import dataManageSpiderscheduler from '@/api/dataManageSpiderscheduler';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null
};
const defaultTable = {
    id: 0,
    year: null,
    province: null,
    majorCode: null,
    majorName: null,
    schoolCode: null,
    schoolName: null,
    majorYear: null,
    comment: null,
};
export default {
  name: 'schoolMajorList',
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
        spiderLists:[],
      dataTable: Object.assign({}, defaultTable),
      isEdit: false,
    }
  },
  created() {
      this.getUnuseSpiderMgtList();
    this.getList();
  },
  methods: {
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
          dataManageSpiderscheduler.deleteTable(row.id).then(response => {
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
            dataManageSpiderscheduler.updateData(this.dataTable.id, this.dataTable).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
                this.getUnuseSpiderMgtList();
            this.getList();
          })
        } else {
            dataManageSpiderscheduler.createData(this.dataTable).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
                this.getUnuseSpiderMgtList();
            this.getList();
          })
        }
      })
    },
    getList() {
      this.listLoading = true;
        dataManageSpiderscheduler.fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
      getUnuseSpiderMgtList(){//获取没有任务的爬虫规则
          dataManageSpiderscheduler.unuseSpiderMgtList().then(response => {

              const result = response.data;
              const datas = new Array();

              for (let i = 0; i < result.length; i++) {
                  datas.push({
                      "label": result[i]['name'],
                      "value": result[i]['id']
                  })
              }
              this.spiderLists = datas;
          });
      }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>