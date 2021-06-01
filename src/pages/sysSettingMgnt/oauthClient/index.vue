<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>授权服务器配置
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:right;">
          <el-form-item>
            <el-button type="primary" @click="handleAddOAuthClient()" class="searchBtn">添加</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="oAuthClientTable"  header-row-class-name="light_grey_table"   :height="tableHeight"
                  style="width: 100% ;min-height: 500px"
                  :data="list"
                  resizable="false"
                  v-loading="listLoading">
          <el-table-column label="服务名称" align="center" >
            <template slot-scope="scope">{{ scope.row.clientId }}</template>
          </el-table-column>
          <el-table-column label="授权模式" align="center" >
            <template slot-scope="scope">
              <template v-for="item in scope.row.authorizedGrantTypes">
                <el-tag size="medium" type="info" style="margin-right: 5px;">{{ item | authorizedGrantTypesFilter}}</el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="有效期（秒）" align="center" >
            <template slot-scope="scope">{{ scope.row.accessTokenValiditySeconds }}</template>
          </el-table-column>
          <el-table-column label="刷新授权有效期（秒）" align="center" >
            <template slot-scope="scope">{{ scope.row.refreshTokenValiditySeconds }}</template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center" >
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleUpdate(scope.$index, scope.row)">编辑
              </el-button>

              <el-button
                  size="mini"
                  @click="handleResourceTypeOauthClient(scope.$index, scope.row)">配置资源分类
              </el-button>

              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</div>
  <!-- <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="el-page-header__content">授权服务器配置</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="getList">刷新</el-button>
    </div>

    <el-container>

      <el-header style="padding-left: 0" height="50px">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item>
            <el-button type="primary" @click="handleAddOAuthClient()">添加</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">
        <el-table ref="oAuthClientTable"
                  style="width: 100% ;min-height: 500px"
                  :data="list"
                  resizable="false"
                  v-loading="listLoading">
          <el-table-column label="服务名称" align="center" >
            <template slot-scope="scope">{{ scope.row.clientId }}</template>
          </el-table-column>
          <el-table-column label="授权模式" align="center" >
            <template slot-scope="scope">
              <template v-for="item in scope.row.authorizedGrantTypes">
                <el-tag size="medium" type="info" style="margin-right: 5px;">{{ item | authorizedGrantTypesFilter}}</el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="有效期（秒）" align="center" >
            <template slot-scope="scope">{{ scope.row.accessTokenValiditySeconds }}</template>
          </el-table-column>
          <el-table-column label="刷新授权有效期（秒）" align="center" >
            <template slot-scope="scope">{{ scope.row.refreshTokenValiditySeconds }}</template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center" >
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleUpdate(scope.$index, scope.row)">编辑
              </el-button>

              <el-button
                  size="mini"
                  @click="handleResourceTypeOauthClient(scope.$index, scope.row)">配置资源分类
              </el-button>

              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>


            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>


  </el-card> -->

</template>

<script>
import {fetchList, removeOauthClient} from '@/api/auth'

export default {
  name: "oauthClientList",
  data() {
    return {
       tableHeight : (document.documentElement.clientHeight-380)+'px',
      list: null,
      listLoading: true,
      listQuery: {}
    }
  },
  created() {
    this.getList();
  },
  watch: {
    $route(route) {
      this.getList();
    }
  },
  methods: {
    handleAddOAuthClient() {
      this.$router.push('/sysadmin/addOauthClientDetail');
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data;
      }).catch(error => {
        this.listLoading = false;
      });
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/sysadmin/updateOauthClientDetail', query: {id: row.clientId}});
    },
    /**
     * 跳转资源分类
     * @param index 选中行ID
     * @param row 选中行数据
     */
    handleResourceTypeOauthClient(index, row){
      this.$router.push({path:'/sysadmin/resourceTypeOauthClient', query:{id: row.clientId}})
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该授权服务器', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        removeOauthClient(row.clientId).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.getList();
        }).catch(error =>{
          this.listLoading = false;
        });
      });
    }
  },
  filters: {
    authorizedGrantTypesFilter(value) {
      let valueText = "";

      switch (value) {

        case "authorization_code":
          valueText = "授权码模式";
          break;
        case "password":
          valueText = "密码模式";
          break;
        case "refresh_token":
          valueText = "刷新token";
          break;
        case "implicit":
          valueText = "隐式模式";
          break;
        case "client_credentials":
          valueText = "客户端模式";
          break;
        default:
          valueText = value;
          break;
      }

      return valueText;
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";

</style>
