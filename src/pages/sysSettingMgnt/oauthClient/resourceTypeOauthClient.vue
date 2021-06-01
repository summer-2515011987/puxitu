<template>
  <el-card class="box-card h100p">
    <div slot="header" class="clearfix">
      <el-page-header @back="$router.back();" :content="pageHeaderContent"></el-page-header>
    </div>

    <el-header style="padding-left: 0; padding-right: 0" height="50px">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
        <el-form-item label="分类名称：">
          <el-input v-model="listQuery.resourceCategoryId" class="input-width" placeholder="资源名称" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
          <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
        </el-form-item>
        <el-button type="primary" @click="handleAdd()" class="searchBtn fr"> 添加</el-button>
      </el-form>
    </el-header>

    <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">

      <!-- <ul style="margin: 0; padding: 0 0 10px;float: left">
        
      </ul> -->

      <el-table ref="resourceTable"
                :data="list"
                style="width: 100%;"
                height="500"
                max-height="650"
                v-loading="listLoading" border>
        <el-table-column label="资源分类">
          <template slot-scope="scope">{{ scope.row.resourceCategoryName }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog  custom-class="step-dialog-radius"
          :visible.sync="dialogVisible" top="20%"
          width="500px">
          <div slot="title" class="dialog-title">
            <span class="tringle-red-icon"></span>
            <span class="model-title-font">添加资源分类</span>
          </div>
        <el-form
            v-loading="formLoading"
            :model="oauthClientResourceCategory"
            ref="resourceForm"
            label-width="100px" size="small">
          <el-form-item label="资源分类：">
            <el-select v-model="oauthClientResourceCategory.resourceCategoryId" placeholder="全部" clearable style="width: 250px">
              <el-option v-for="item in categoryOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
                         :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDialogConfirm()" size="small" :loading="formLoading">确 定</el-button>
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

  </el-card>
</template>

<script>

import {
  listAllCate,
  fetchOauthClientAndResourceCategoryList,
  createOauthClientAndResourceCategory,
  deleteOauthClientAndResourceCategory
} from '@/api/resourceCategory';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  resourceCategoryId:null
};

const defaultOauthClientResourceCategory = {
  resourceCategoryId: null,
  oauthClientId: null
}

export default {
  name: "resourceTypeOauthClient",
  data() {
    return {
      categoryOptions: [],
      categoryIdDataLoading: true,
      defaultOauthClientId: this.$route.query.id,
      pageHeaderContent: this.$route.query.id + '授权服务器与资源分类关系配置',
      formLoading: true,
      listLoading: true,
      dialogVisible: false,
      listQuery: Object.assign({}, defaultListQuery),
      oauthClientResourceCategory: Object.assign({}, defaultOauthClientResourceCategory),
      list: null,
      listMap: new Map(),
      total: null
    }
  },
  created() {
    this.getCateList();
    this.getList();
  },
  methods: {
    /**
     * 获取资源分类
     */
    getCateList() {
      this.categoryIdDataLoading = true;
      listAllCate().then(response => {
        let cateList = response.data;
        for (let i = 0; i < cateList.length; i++) {
          let cate = cateList[i];
          this.categoryOptions.push({label: cate.name, value: cate.id});
        }
        this.categoryIdDataLoading = false;
      }).catch(error => {
        this.categoryIdDataLoading = false;
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
    handleDialogConfirm() {
      this.$confirm('是否要确认添加关系?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formLoading = true;
        createOauthClientAndResourceCategory(this.oauthClientResourceCategory.resourceCategoryId, this.oauthClientResourceCategory.oauthClientId).then(response => {
          this.$message({
            message: '添加成功！',
            type: 'success'
          });
          this.formLoading = false;
          this.dialogVisible = false;
          this.getList();
        }).catch(error => {
          this.formLoading = false;
          this.dialogVisible = false;
        });
      }).catch(error =>{});
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    /**
     * 获取授权服务器与资源分类关系
     */
    getList() {
      this.listLoading = true;
      fetchOauthClientAndResourceCategoryList(this.defaultOauthClientId, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;

        this.listMap.clear();
        this.list.forEach(obj =>{
          this.listMap.set(obj.resourceCategoryId, obj.resourceCategoryName);
        });

      }).catch(error =>{
        this.listLoading = false;
      });
    },
    /**
     * 添加授权服务器
     */
    handleAdd() {
      this.dialogVisible = true;
      this.oauthClientResourceCategory = Object.assign({}, defaultOauthClientResourceCategory);
      this.oauthClientResourceCategory.oauthClientId = this.defaultOauthClientId;

      for (const categoryOption of this.categoryOptions) {
        if (this.listMap.has(categoryOption.value)){
          categoryOption.disabled = true;
        } else {
          categoryOption.disabled = false;
        }
      }
      this.formLoading = false;
    },
    /**
     * 删除资源分类
     * @param index 当前行数
     * @param row 当前行绑定数据
     */
    handleDelete(index, row) {
      this.$confirm('是否要删除该资源分类关系?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        deleteOauthClientAndResourceCategory(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        }).catch(error =>{
          this.listLoading = false;
        });
      }).catch(error =>{});
    },
    /**
     * 查詢搜索
     */
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    }
  }
}
</script>

<style scoped>

</style>