<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>行业资讯列表
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.title" class="input-width" placeholder="标题名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-table ref="resourceTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"  style="width: 100%;" v-loading="listLoading" border>
        </el-table> -->
        <el-table ref="adminTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list" style="width: 100%;min-height: 500px"
                  v-loading="listLoading" stripe border>
          <el-table-column label="标题">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="小标题">
            <template slot-scope="scope">{{ scope.row.littleTitle }}</template>
          </el-table-column>
          <el-table-column width="180"
                           prop="publishDate"
                           label="发布时间"
                           :formatter="dateFormat"
          >

          </el-table-column>
          <el-table-column label="发布平台" width="160">
            <template slot-scope="scope" v-if=" scope.row.platform == 'https://www.tech.net.cn'">中国高职高专教育网
             </template>
          </el-table-column>
          <el-table-column label="详细信息" width="160">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank" class="buttonText">点击查看详情</a>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
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
</div>
  <!-- <el-card class="box-card ">

    <div slot="header" class="clearfix">
      <span class="el-page-header__content">行业资讯列表</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="getNewsData">刷新</el-button>
    </div>

    <el-container>

      <el-header style="padding-left: 0" height="50px">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.title" class="input-width" placeholder="标题名称" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearchList()">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()">重置</el-button>
          </el-form-item>

        </el-form>
      </el-header>

      <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0;height:500px;" >

        <el-table ref="adminTable"
                  :data="list"
                  style="width: 100%;min-height: 500px"
                  v-loading="listLoading" stripe border>
          <el-table-column label="标题">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="小标题">
            <template slot-scope="scope">{{ scope.row.littleTitle }}</template>
          </el-table-column>
          <el-table-column width="180"
                           prop="publishDate"
                           label="发布时间"
                           :formatter="dateFormat"
          >

          </el-table-column>
          <el-table-column label="发布平台" width="160">
            <template slot-scope="scope" v-if=" scope.row.platform == 'https://www.tech.net.cn'">中国高职高专教育网
             </template>
          </el-table-column>
          <el-table-column label="详细信息" width="160">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank" class="buttonText">点击查看详情</a>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
            :title="isEdit?'编辑用户':'添加用户'"
            :visible.sync="dialogVisible"
            width="500px">
          <el-form :model="admin"
                   ref="adminForm"
                   label-width="150px" size="small">
            <el-form-item label="帐号：">
              <el-input v-model="admin.username" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="admin.nickName" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="admin.email" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="admin.password" type="password" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input v-model="admin.note"
                        type="textarea"
                        :rows="5"
                        style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用：">
              <el-radio-group v-model="admin.status" style="width: 250px; display: inline-flex;">
                <el-radio :label="1" style="padding-right: 10px;">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog
            title="分配角色"
            :visible.sync="allocDialogVisible"
            width="30%">
          <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
            <el-option
                v-for="item in allRoleList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()">确 定</el-button>
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

import {getNewsData} from '@/api/showAPI';
import {deleteNews} from '@/api/newsAPI';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  title:''
};
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1
};


export default {
  name: 'adminList',
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocAdminId: null
    }
  },
  created() {


    this.getNewsData();

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
    getNewsData(){
      this.listLoading=true
      getNewsData(this.listQuery).then(response => {
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
      this.getNewsData();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getNewsData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getNewsData();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.admin = Object.assign({}, defaultAdmin);
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
        this.getList();
      });
    },
    handleDelete(index, row) {
      this.$confirm('是否要资讯信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        deleteNews(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getNewsData();
        });
      }).catch(()=>{
        this.listLoading = false;
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.admin = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        if (this.isEdit) {
          updateAdmin(this.admin.id, this.admin).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.listLoading = false;
            this.getList();
          })
        } else {
          createAdmin(this.admin).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.listLoading = false;
            this.getList();
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