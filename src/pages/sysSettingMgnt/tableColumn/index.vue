<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>列管理
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="数据库字段名称：">
            <el-input v-model="listQuery.columnName" class="input-width" placeholder="字段名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
<!--            <el-button type="primary" @click="handleAdd()" class="searchBtn">添加</el-button>-->
          </el-form-item>
        </el-form>
        <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%;flex:1; min-height: 500px"
                  v-loading="listLoading" stripe border>
            <el-table-column label="所属表">
                <template slot-scope="scope">{{ scope.row.tablename }}</template>
            </el-table-column>
          <el-table-column label="字段名称">
            <template slot-scope="scope">{{ scope.row.columnname }}</template>
          </el-table-column>
            <el-table-column label="是否作为搜索条件">
                <template slot-scope="scope">
                    <p v-if="scope.row.issearch=='1'">是</p>
                    <p v-if="scope.row.issearch=='2'">否</p>
                </template>
            </el-table-column>
          <el-table-column label="数据库字段名称">
            <template slot-scope="scope">{{ scope.row.dbcolumn }}</template>
          </el-table-column>
            <el-table-column label="类型">
                <template slot-scope="scope">{{ scope.row.columntype }}</template>
            </el-table-column>
            <el-table-column label="长度">
                <template slot-scope="scope">{{ scope.row.columnlength }}</template>
            </el-table-column>
<!--            <el-table-column label="是否为空">-->
<!--                <template slot-scope="scope">-->
<!--                    <div v-show="scope.row.isNull==0">否</div>-->
<!--                    <div v-show="scope.row.isNull==1">是</div>-->
<!--                </template>-->
<!--            </el-table-column>-->
          <el-table-column label="创建时间">
            <template slot-scope="scope">{{ scope.row.creationtime | formatDateTime }}</template>
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
            :title="isEdit?'编辑':'添加'"
            :visible.sync="dialogVisible"
            width="500px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="150px" size="small">
            <el-form-item label="元数据表：">
                <el-select v-model="dataTable.dbid" placeholder="请选择下拉选择" disabled :style="{width: '100%'}">
                    <el-option v-for="(item, index) in dbLists" :key="index" :label="item.label" :value="item.value"
                               :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="字段名称：">
                  <el-input v-model="dataTable.columnname" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="数据库字段名称" prop="dbColumn">
                  <el-input v-model="dataTable.dbcolumn" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="字段类型id：">
                  <el-select v-model="dataTable.typeid" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
                      <el-option v-for="(item, index) in typeLists" :key="index" :label="item.label" :value="item.value"
                                 :disabled="item.disabled"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="校验规则id：">
                  <el-input v-model="dataTable.validid" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="清洗规则id：">
                  <el-input v-model="dataTable.washid" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="描述：">
                  <el-input v-model="dataTable.description"
                            type="textarea"
                            :rows="5"
                            style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="字段长度：">
                  <el-input v-model="dataTable.columnlength" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="是否可以为空：">
                  <el-radio-group v-model="dataTable.isnull">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="是否作为搜索条件：">
                  <el-radio-group v-model="dataTable.issearch">
                      <el-radio :label="'1'">是</el-radio>
                      <el-radio :label="'2'">否</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="创建人：">
                  <el-input v-model="dataTable.creator" style="width: 250px"></el-input>

              </el-form-item>
              <el-form-item label="创建时间" prop="creationTime">
                  <el-date-picker v-model="dataTable.creationtime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
              </el-form-item>
              <el-form-item label="更新人：">
                  <el-input v-model="dataTable.updateperson" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="更新时间" prop="updateTime">
                  <el-date-picker v-model="dataTable.updatetime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
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
import dataManageTableColumn from '@/api/dataManageTableColumn';
import dataManageTable from '@/api/dataManageTable';
import dataManageVerify from "@/api/dataManageVerify";
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  columnname: null
};
const defaultTable = {
    id: 0,
    dbid:0,
    columnname: null,
    dbcolumn: null,
    typeid: null,
    columntype:null,
    validid: null,
    washid: null,
    description: null,
    columnlength: null,
    isnull: null,
    issearch: null,
    creator: null,
    creationtime: null,
    updateperson: null,
    updatetime: null,
    tablename:null
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
        typeLists:[],
        dbLists:[],
      rules:{
          updatetime: [{
              required: true,
              message: '请选择日期选择',
              trigger: 'change'
          }],
          creationtime: [{
              required: true,
              message: '请选择日期选择',
              trigger: 'change'
          }],
      }
    }
  },
  created() {

      this.getDbList();
      this.getTypeList();
  },

  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  },
    mounted(){
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
          dataManageTableColumn.deleteTableColumn(row.id,row).then(response => {
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
            dataManageTableColumn.updateData(this.dataTable.id, this.dataTable).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
            dataManageTableColumn.createData(this.dataTable).then(response => {
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
        dataManageTableColumn.fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
      getTypeList() {
          dataManageTableColumn.getTypeList().then(response => {
              const result = response.data;
              const datas=new Array();
              for(let i=0;i<result.length;i++){
                  datas.push({
                      "label":result[i].typeName,
                      "value":result[i].id
                  })
              }
              this.typeLists=datas;
          });
      },
      getDbList() {
          dataManageTable.getDbList().then(response => {
              const result = response.data;
              const datas=new Array();
              for(let i=0;i<result.length;i++){
                  datas.push({
                      "label":result[i].tableName,
                      "value":result[i].id
                  })
              }
              this.dbLists=datas;
          });
      },
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>