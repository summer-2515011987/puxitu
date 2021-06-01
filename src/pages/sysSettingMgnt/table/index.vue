<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>表管理
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="表名称：">
            <el-input v-model="listQuery.tableName" class="input-width" placeholder="表名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
            <el-button type="primary" @click="handleAdd()" class="searchBtn">添加</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="roleTable"  header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%;flex:1; min-height: 500px"
                  v-loading="listLoading" stripe border>
          <el-table-column label="表名称">
            <template slot-scope="scope">{{ scope.row.tableName }}</template>
          </el-table-column>
          <el-table-column label="数据库表名称">
            <template slot-scope="scope">{{ scope.row.databaseTableName }}</template>
          </el-table-column>
            <el-table-column label="描述">
                <template slot-scope="scope">{{ scope.row.describe }}</template>
            </el-table-column>
            <el-table-column label="数据库类型">
                <template slot-scope="scope">{{ scope.row.databaseType }}</template>
            </el-table-column>
            <el-table-column label="主机">
                <template slot-scope="scope">{{ scope.row.host }}</template>
            </el-table-column>
            <el-table-column label="端口">
                <template slot-scope="scope">{{ scope.row.port }}</template>
            </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
          </el-table-column>
          <el-table-column label="是否分库" width="100px">
                <template slot-scope="scope" >
                    <div v-show="scope.row.enableSplitDatabase===1?true:false">是</div>
                    <div v-show="scope.row.enableSplitDatabase===0?true:false">否</div>
                </template>
          </el-table-column>
          <el-table-column label="操作" width="400px">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleUpdate(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="mini"
                       @click="handleColumn(scope.$index, scope.row)">字段处理
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
                   label-width="150px" size="small">
            <el-form-item label="表名称：">
              <el-input v-model="dataTable.tableName" style="width: 250px"></el-input>
            </el-form-item>
              <el-form-item label="数据库表名称：">
                  <el-input v-model="dataTable.databaseTableName" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="描述：">
                  <el-input v-model="dataTable.describe"
                            type="textarea"
                            :rows="5"
                            style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="数据库类型：">
                  <el-input v-model="dataTable.databaseType" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="主机：">
                  <el-input v-model="dataTable.host" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="端口：">
                  <el-input v-model="dataTable.port" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="数据库名称：">
                  <el-input v-model="dataTable.database" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="数据库用户名：">
                  <el-input v-model="dataTable.databaseUser" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="数据库密码：">
                  <el-input v-model="dataTable.databasePassword" style="width: 250px"></el-input>
              </el-form-item>
            <el-form-item label="是否分库：">
              <el-radio-group v-model="dataTable.enableSplitDatabase">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
              <el-form-item label="是否分表：">
                  <el-radio-group v-model="dataTable.enableSplitTable">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="分库字段：">
                  <el-input v-model="dataTable.splitTableColumn" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="分库规则：">
                  <el-input v-model="dataTable.splitTableReg" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="分表粒度：">
                  <el-input v-model="dataTable.splitTableGranularity" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="创建人：">
                  <el-select v-model="dataTable.creater" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
                      <el-option v-for="(item, index) in userData" :key="index" :label="item.label" :value="item.value"
                                 :disabled="item.disabled"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker v-model="dataTable.createTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
              </el-form-item>
              <el-form-item label="更新人：">
                  <el-select v-model="dataTable.updater" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
                      <el-option v-for="(item, index) in userData" :key="index" :label="item.label" :value="item.value"
                                 :disabled="item.disabled"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="更新时间" prop="updateTime">
                  <el-date-picker v-model="dataTable.updateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
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
import dataManageTable from '@/api/dataManageTable';
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  tableName: null
};
const defaultTable = {
    id: 0,
    tableName: null,
    databaseTableName: null,
    describe: null,
    databaseType: null,
    host: null,
    port: null,
    database: null,
    databaseUser: null,
    databasePassword: null,
    enableSplitDatabase: 0,
    enableSplitTable: 0,
    splitTableColumn: null,
    splitTableReg: null,
    splitTableGranularity: null,
    creater: null,
    createTime: null,
    updater: null,
    updateTime: null,
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
        userData: [],
      isEdit: false,
      rules:{
          updateTime: [{
              required: true,
              message: '请选择日期选择',
              trigger: 'change'
          }],
          createTime: [{
              required: true,
              message: '请选择日期选择',
              trigger: 'change'
          }],
      }
    }
  },
  created() {
      this.getUserList();


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
        dataManageTable.getDataUrlInfo().then(response => {
            const result=response.data;
            defaultTable.databaseType=result.source
            defaultTable.host=result.ip
            defaultTable.port=result.port
            defaultTable.database=result.database
            defaultTable.databaseUser=result.username
            defaultTable.databasePassword=result.password
            this.dataTable = Object.assign({}, defaultTable);


        })

    },
    handleDelete(index, row) {
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          dataManageTable.deleteTable(row.id).then(response => {
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
            dataManageTable.updateData(this.dataTable.id, this.dataTable).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
            dataManageTable.createData(this.dataTable).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            const id=response.data;
            const tablename=this.dataTable.databaseTableName;
            //路由到表字段页面
            this.$router.push({path:'/datamanage/tableColumnCreate',query: {id: id,tablename:tablename}});
          })
        }
      })
    },
    handleColumn(index, row){
        this.$router.push({path:'/datamanage/columnChange',query: {id: row.id,tablename:row.databaseTableName}});
    },
    getList() {
      this.listLoading = true;
        dataManageTable.fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
      getUserList() {
          dataManageTable.getUserList().then(response => {
              const result=response.data;
              const datas=new Array();
              for (let i=0;i<result.length;i++){
                  datas.push({
                          "label":result[i].username,
                          "value":result[i].id
                      })
              }
              this.userData =datas;
              //this.dataTable.creater=datas[0];
          });
      }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";


</style>