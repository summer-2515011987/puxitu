<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>分配菜单
    </div>
    <div class="myTable">
      <el-container>
          <el-aside width="200px">
            <span style="text-align:left;font-size:14px;"> 效果预览</span>
            <menu-tree :menu-data="menuTree" :menuLoading="menuLoading" style="text-align:left;" ></menu-tree>
          </el-aside>
          <el-main style="padding: 0 0 0 20px;overflow:hidden;">
              <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:right;">
                <el-form-item>
                  <el-button type="primary" @click="handleAddMenu()" class="searchBtn fr">添加</el-button>
                </el-form-item>
              </el-form>
              <el-table ref="menuTable" :height="tableHeight" header-row-class-name="light_grey_table" 
                        style="width: 100%;" stripe
                        :data="list"
                        v-loading="listLoading" border>
                <el-table-column label="菜单名称">
                  <template slot-scope="scope">{{ scope.row.title }}</template>
                </el-table-column>
                <el-table-column label="菜单级数" width="100">
                  <template slot-scope="scope">{{ scope.row.level | levelFilter }}</template>
                </el-table-column>
                <el-table-column label="前端名称">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="是否显示" width="100">
                  <template slot-scope="scope">
                    <el-switch
                        @change="handleHiddenChange(scope.$index, scope.row)"
                        :active-value="0"
                        :inactive-value="1"
                        v-model="scope.row.hidden">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="排序" width="100">
                  <template slot-scope="scope">{{ scope.row.sort }}</template>
                </el-table-column>
                <el-table-column label="设置" width="120">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        :disabled="scope.row.level | disableNextLevel"
                        @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleUpdate(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="mini"
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
                  :page-size="listQuery.pageSize"
                  :page-sizes="[10,20,30]"
                  :current-page.sync="listQuery.pageNum"
                  :total="total">
              </el-pagination>
          </el-main>
      </el-container>
    </div>
</div>

  <!-- <el-card class="box-card" style="min-height: 500px">
    <div slot="header" class="clearfix">
      <el-page-header v-if="this.parentId !== 0" @back="$router.back();" content="分配菜单"></el-page-header>

      <span v-else class="el-page-header__content">菜单列表
      <el-button style="float: right; padding: 3px 0" type="text" @click="getList">刷新</el-button>
      </span>

    </div>
    <el-container>

      <el-aside width="200px">
        <span>效果预览</span>
        <menu-tree :menu-data="menuTree" :menuLoading="menuLoading" ></menu-tree>
      </el-aside>

      <el-container>
        <el-header style="padding-left: 0" height="50px">
          <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
            <el-form-item>
              <el-button type="primary" @click="handleAddMenu()">添加</el-button>
            </el-form-item>
          </el-form>
        </el-header>

        <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">
          <el-table ref="menuTable"
                    style="width: 100%;min-height: 500px"
                    :data="list"
                    v-loading="listLoading" border>
            <el-table-column label="菜单名称">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="菜单级数" width="100">
              <template slot-scope="scope">{{ scope.row.level | levelFilter }}</template>
            </el-table-column>
            <el-table-column label="前端名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="是否显示" width="100">
              <template slot-scope="scope">
                <el-switch
                    @change="handleHiddenChange(scope.$index, scope.row)"
                    :active-value="0"
                    :inactive-value="1"
                    v-model="scope.row.hidden">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="排序" width="100">
              <template slot-scope="scope">{{ scope.row.sort }}</template>
            </el-table-column>
            <el-table-column label="设置" width="120">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="text"
                    :disabled="scope.row.level | disableNextLevel"
                    @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleUpdate(scope.$index, scope.row)">编辑
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

        <el-footer style="padding-left: 0; padding-right: 0" height="32px">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="total, sizes,prev, pager, next,jumper"
              :page-size="listQuery.pageSize"
              :page-sizes="[10,20,30]"
              :current-page.sync="listQuery.pageNum"
              :total="total">
          </el-pagination>
        </el-footer>

      </el-container>
    </el-container>
  </el-card> -->

</template>

<script>
import {fetchList, deleteMenu, updateHidden, fetchTreeList} from '@/api/menu'
import MenuTree from "@/pages/sysSettingMgnt/menu/components/menuTree/menuTree";

export default {
  name: "menuList",
  components: {MenuTree},
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-360)+'px',
      list: null,
      total: null,
      listLoading: true,
      menuTree: [],
      menuLoading : true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      parentId: 0
    }
  },
  created() {
    this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddMenu() {
      this.$router.push('/sysadmin/addMenu');
    },
    getList() {
      this.listLoading = true;
      fetchList(this.parentId, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      }).then(response => {
        this.getMenuTreeList();
      });
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
    handleHiddenChange(index, row) {
      this.menuLoading = true;
      updateHidden(row.id, {hidden: row.hidden}).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      }).then(response => {
        this.getMenuTreeList();
      }).catch(error =>{
        this.menuLoading = false;
      });
    },
    handleShowNextLevel(index, row) {
      this.$router.push({path: '/sysadmin/menu', query: {parentId: row.id}})
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/sysadmin/updateMenu', query: {id: row.id}});
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该菜单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        deleteMenu(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      }).catch(()=>{
        this.listLoading = false;
      });
    }, getMenuTreeList() {
      this.menuLoading = true;
      fetchTreeList().then(response => {
        this.menuTree = response.data;
        this.menuLoading = false;
      }).catch(error =>{
        this.menuLoading = false;
      });
    }
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return '一级';
      } else if (value === 1) {
        return '二级';
      }
    },
    disableNextLevel(value) {
      return value !== 0;
    }
  }
}
</script>
<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>
