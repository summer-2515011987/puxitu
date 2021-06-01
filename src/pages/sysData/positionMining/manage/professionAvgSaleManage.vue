<template>
  <div class="main_contain" style="height: 700px">
    <div class="headerd">
      <span class="el-icon-caret-right"></span>专业平均薪酬排名
    </div>
    <div class="myTable">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
        <el-form-item label="规则名称：">
          <el-input v-model="listQuery.ruleName" class="input-width" placeholder="规则名称" clearable></el-input>
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
        <el-table-column label="规则名称">
          <template slot-scope="scope">{{ scope.row.ruleName }}</template>
        </el-table-column>
        <el-table-column label="规则描述">
          <template slot-scope="scope">{{ scope.row.ruleDescript }}</template>
        </el-table-column>
        <el-table-column label="规则设置">
          <template slot-scope="scope">{{ scope.row.ruleSetting }}</template>
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleUpdate(scope.$index, scope.row)">规则设置
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">规则删除
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
        <el-form-item label="规则名称：">
          <el-input v-model="dataTable.ruleName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="规则描述：">
          <el-input v-model="dataTable.ruleDescript"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
       <!-- <el-form-item label="专业名称：">
          <el-input v-model="dataTable.professionName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="专业代码：">
          <el-input v-model="dataTable.professionCode" style="width: 250px"></el-input>
        </el-form-item>-->
        <el-form-item label="规则设置：">
          <el-input v-model="dataTable.ruleSetting" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="规则字段：">
          <el-select v-model="dataTable.ruleField" placeholder="请选择" clearable :style="{width: '250px'}">
            <el-option v-for="(item, index) in ruleFields" :key="index" :label="item.label" :value="item.label"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import dataManageClearRule from '@/api/dataManageClearRule';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    ruleName: null,
    customFlag: 1
  };
  const defaultTable = {
    id: 0,
    ruleName: null,
    ruleDescript: null,
    ruleSetting: null,
    ruleField: null,
    customFlag: 1,
    professionName:null,
    professionCode:null
  };
  export default {
    name: 'clearrulemanage',
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
        ruleFields:[]
      }
    },
    created() {
      this.getList();
      this.getRuleFields();
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
          dataManageClearRule.deleteTableColumn(row.id).then(response => {
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
            dataManageClearRule.updateData(this.dataTable).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible = false;
              this.getList();
            })
          } else {
            dataManageClearRule.createData(this.dataTable).then(response => {
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
        dataManageClearRule.fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },getRuleFields(){
        dataManageClearRule.getRuleFieldList().then(response => {
          const result = response.data.list;
          const datas = new Array();
          for (let i = 0; i < result.length; i++) {
            datas.push({
              "label": result[i],
              "value": result[i]
            })
          }
          this.ruleFields = datas;
        });
      }
    }
  }
</script>

<style scoped>
  @import "../../../../assets/css/sysSet/wordManagement.css";
  li{
    float:none
  }
</style>
