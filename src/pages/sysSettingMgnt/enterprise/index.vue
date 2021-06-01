<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>企业信息列表
    </div>
    <div class="myTable">
         <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.company" class="input-width" placeholder="企业名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
            <el-button type="primary" @click="handleAdd()" class="searchBtn"> 添加</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="adminTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%; min-height: 500px"
                  v-loading="listLoading" stripe border>
          <el-table-column label="企业名称" width="200">
            <template slot-scope="scope">{{ scope.row.enterprise }}</template>
          </el-table-column>
          <el-table-column label="统一社会信用代码" width="180">
            <template slot-scope="scope">{{ scope.row.creditCode }}</template>
          </el-table-column>
          <el-table-column label="所在地区" width="160">
            <template slot-scope="scope">{{ scope.row.province }}</template>
          </el-table-column>
          <el-table-column label="企业类型" >
            <template slot-scope="scope">{{ scope.row.type }}</template>
          </el-table-column>
          <el-table-column label="所在行业" width="160">
            <template slot-scope="scope">{{ scope.row.industry }}</template>
          </el-table-column>


          <el-table-column label="操作" width="180">
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
            :page-sizes="[10,15,20]"
            :total="total">
        </el-pagination>
    </div>
    <el-dialog
            :title="isEdit?'编辑企业信息':'添加企业信息'"
            :visible.sync="dialogVisible"
            width="500px">
          <el-form :model="enterprise"
                   ref="adminForm"
                   label-width="150px" size="small">
            <el-form-item label="企业名称：">
              <el-input v-model="enterprise.enterprise" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码：">
              <el-input v-model="enterprise.creditCode" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="企业类型：">
              <el-input v-model="enterprise.type" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="省：">
              <el-input v-model="enterprise.province"  style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="市：">
              <el-input v-model="enterprise.city" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="区：">
              <el-input v-model="enterprise.district" style="width: 300px"></el-input>
            </el-form-item>

            <el-form-item label="登记机关：">
              <el-input v-model="enterprise.registerDepartment" style="width: 300px"></el-input>
            </el-form-item>

            <el-form-item label="行业属性：">
              <el-input v-model="enterprise.industry" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="登记状态：">
              <el-input v-model="enterprise.registerState" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="经营范围：">
              <el-input v-model="enterprise.scope"
                        type="textarea"
                        :rows="3"
                        style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="企业地址：">
              <el-input v-model="enterprise.address"
                        type="textarea"
                        :rows="3"
                        style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
        </el-dialog>
</div>
  <!-- <el-card class="box-card ">

    <div slot="header" class="clearfix">
      <span class="el-page-header__content">企业信息列表</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="getEnterpriseData">刷新</el-button>
    </div>

    <el-container>

      <el-header style="padding-left: 0" height="50px">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.company" class="input-width" placeholder="企业名称" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearchList()">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()">重置</el-button>
            <el-button type="primary" @click="handleAdd()"> 添加</el-button>
          </el-form-item>

        </el-form>
      </el-header>

      <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0;height:500px;">

        <el-table ref="adminTable"
                  :data="list"
                  style="width: 100%; min-height: 500px"
                  v-loading="listLoading" stripe border>
          <el-table-column label="企业名称" width="200">
            <template slot-scope="scope">{{ scope.row.enterprise }}</template>
          </el-table-column>
          <el-table-column label="统一社会信用代码" width="180">
            <template slot-scope="scope">{{ scope.row.creditCode }}</template>
          </el-table-column>
          <el-table-column label="所在地区" width="160">
            <template slot-scope="scope">{{ scope.row.province }}</template>
          </el-table-column>
          <el-table-column label="企业类型" >
            <template slot-scope="scope">{{ scope.row.type }}</template>
          </el-table-column>
          <el-table-column label="所在行业" width="160">
            <template slot-scope="scope">{{ scope.row.industry }}</template>
          </el-table-column>


          <el-table-column label="操作" width="180">
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
            :title="isEdit?'编辑企业信息':'添加企业信息'"
            :visible.sync="dialogVisible"
            width="500px">
          <el-form :model="enterprise"
                   ref="adminForm"
                   label-width="150px" size="small">
            <el-form-item label="企业名称：">
              <el-input v-model="enterprise.enterprise" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码：">
              <el-input v-model="enterprise.creditCode" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="企业类型：">
              <el-input v-model="enterprise.type" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="省：">
              <el-input v-model="enterprise.province"  style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="市：">
              <el-input v-model="enterprise.city" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="区：">
              <el-input v-model="enterprise.district" style="width: 300px"></el-input>
            </el-form-item>

            <el-form-item label="登记机关：">
              <el-input v-model="enterprise.registerDepartment" style="width: 300px"></el-input>
            </el-form-item>

            <el-form-item label="行业属性：">
              <el-input v-model="enterprise.industry" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="登记状态：">
              <el-input v-model="enterprise.registerState" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="经营范围：">
              <el-input v-model="enterprise.scope"
                        type="textarea"
                        :rows="3"
                        style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="企业地址：">
              <el-input v-model="enterprise.address"
                        type="textarea"
                        :rows="3"
                        style="width: 300px"></el-input>
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
            :page-sizes="[10,15,20]"
            :total="total">
        </el-pagination>

      </el-footer>

    </el-container>

  </el-card> -->
</template>

<script>

import {getEnterpriseData} from '@/api/showAPI';
import {deleteEnterprise,updateEnterprise,addEnterprise} from '@/api/enterpriseAPI';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  company:''
};
const defaultEnterprise = {
  id: null,
  enterprise: null,
  creditCode: null,
  type: null,
  province: null,
  city: null,
  district: null,
  address: null,
  registerDepartment: null,
  scope: null,
  industry: null,
  registerState: null,
};


export default {
  name: 'adminList',
  data() {
    return {
      tableHeight:window.innerHeight * 0.8,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      enterprise: Object.assign({}, defaultEnterprise),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocAdminId: null
    }
  },
  created() {


    this.getEnterpriseData();

  },
  mounted(){
  // 获取浏览器可视区域高度
    //this.tableHeight =   `${document.documentElement.clientHeight}`-32+"px"
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    getEnterpriseData(){
      this.listLoading=true
      getEnterpriseData(this.listQuery).then(response => {
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading=false
      })
    },
    dateFormat(row,column){
      var date = row[column.property];
      if(date == undefined){return ''};
      return this.moment(date).format("YYYY-MM-DD")
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getEnterpriseData();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getEnterpriseData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getEnterpriseData();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.enterprise = Object.assign({}, defaultEnterprise);
    },
    handleStatusChange(index, row) {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatus(row.id, {status: row.status}).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
        this.getEnterpriseData();
      });
    },
    handleDelete(index, row) {
      this.$confirm('是否要企业信息信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        deleteEnterprise(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getEnterpriseData();
        });
      }).catch(()=>{
        this.listLoading = false;
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.enterprise = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        if (this.isEdit) {
          updateEnterprise(this.enterprise.id, this.enterprise).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.listLoading = false;
            this.getEnterpriseData();
          })
        } else {
          addEnterprise(this.enterprise).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.listLoading = false;
            this.getEnterpriseData();
          })
        }
      }).catch(()=>{
        this.listLoading = false;
      })
    },
    handleAllocDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        let params = new URLSearchParams();
        params.append("adminId", this.allocAdminId);
        params.append("roleIds", this.allocRoleIds);
        allocRole(params).then(response => {
          this.$message({
            message: '分配成功！',
            type: 'success'
          });
          this.listLoading = false;
          this.allocDialogVisible = false;
        })
      }).catch(error =>{
        this.listLoading = false;
      })
    },
    handleSelectRole(index, row) {
      this.allocAdminId = row.id;
      this.allocDialogVisible = true;
      this.getRoleListByAdmin(row.id);
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    getAllRoleList() {
      fetchAllRoleList().then(response => {
        this.allRoleList = response.data;
      });
    },
    getRoleListByAdmin(adminId) {
      getRoleByAdmin(adminId).then(response => {
        let allocRoleList = response.data;
        this.allocRoleIds = [];
        if (allocRoleList != null && allocRoleList.length > 0) {
          for (let i = 0; i < allocRoleList.length; i++) {
            this.allocRoleIds.push(allocRoleList[i].id);
          }
        }
      });
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>