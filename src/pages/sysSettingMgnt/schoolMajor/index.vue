<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>院校专业管理
    </div>
    <div class="myTable">
         <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="院校名称：">
            <el-input v-model="listQuery.schoolName" class="input-width" placeholder="院校名称" clearable></el-input>
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
                   label-width="100px" size="small">
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
import dataManageSchoolMajor from '@/api/dataManageSchoolMajor';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
    schoolName: null
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
      dataTable: Object.assign({}, defaultTable),
      isEdit: false,
    }
  },
  created() {
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
          dataManageSchoolMajor.deleteTable(row.id).then(response => {
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
            dataManageSchoolMajor.updateData(this.dataTable.id, this.dataTable).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
            dataManageSchoolMajor.createData(this.dataTable).then(response => {
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
        dataManageSchoolMajor.fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>