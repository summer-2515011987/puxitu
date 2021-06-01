<template>

  <div class="main_contain" style="height: 700px">
    <div class="headerd">
      <span class="el-icon-caret-right"></span>采集规则管理
    </div>
    <div class="myTable">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
        <el-form-item label="采集规则名称：">
          <el-input v-model="listQuery.name" class="input-width" placeholder="采集规则名称" clearable></el-input>
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
        <el-table-column label="采集规则名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="规则概述">
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
               label-width="100px" size="small">
        <el-form-item label="采集规则名称：">
          <el-input v-model="dataTable.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="规则概述：">
          <el-input v-model="dataTable.describe"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="指定网站：">
          <el-input v-model="dataTable.mainUrl" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备用网站：">
          <el-input v-model="dataTable.unmianUrl" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="关键词位置：">
          <template slot-scope="scope">
            <el-radio-group v-model="dataTable.type" @change="keywordchange">
              <el-radio  :label="0">全文</el-radio>
              <el-radio  :label="1">仅标题</el-radio>
              <el-radio  :label="2">仅正文</el-radio>
              <!--<el-radio  :label="3">内部分类</el-radio>-->
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="主关键词：" v-if="keywordshow">
          <el-input v-model="dataTable.mianKeyword" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="辅关键词：" v-if="keywordshow">
          <el-input v-model="dataTable.unmianKeyword" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="排除关键词：" v-if="keywordshow">
          <el-input v-model="dataTable.exceptKeyword" style="width: 250px"></el-input>
        </el-form-item>
       <!-- <el-form-item label="内部分类：" v-if="inclassshow">
          <el-select v-model="professionName" placeholder="请选择分类"  style="width: 250px" ref="selectReport">
            <el-option :value="this.dataTable.classifycode" style="width: 250px;height:200px;overflow: auto;background-color:#fff">
              <el-tree
                  :data="professionDatas"
                  :props="defaultProps"
                  ref="professionTree"
                  node-key="code"
                  @node-click="handleNodeClick"
              ></el-tree>
            </el-option>
          </el-select>-->
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
import dataManageSpiderMgt from '@/api/dataManageSpiderMgt';
import dataManage from "@/api/dataManage";

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
  type:0,
  classifycode: null
};
export default {
  name: 'schoolMajorList',
  data() {
    return {
      tabActiveName: '',
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      dataTable: Object.assign({}, defaultTable),
      isEdit: false,
      keywordshow:true,
      inclassshow:false,
      professionDatas:[],
      professionName:"",
      defaultProps:{
        value: 'value',
        label: 'label',
        children: 'children',
      }
    }
  },
  created() {
    this.getList();
    this.getProfessionInfo();
  },
  methods: {
    getProfessionInfo(){
      dataManage.getProfessionInfo().then(response => {
        const result=response.data;
        const datas=new Array();
        for (let i=0;i<result.length;i++){
          datas.push({
                "value":result[i].code,
                "label":result[i].title,
                "children":this.getTreeData(result[i].children)
              }
          )
        }
        this.professionDatas=datas;
      });
    },
    getTreeData(childrenData){
      const datas=new Array();
      if (childrenData == undefined) {
        return datas;
      }
      for (let i=0;i<childrenData.length;i++){
        datas.push({
              "value":childrenData[i].code,
              "label":childrenData[i].title,
              "children":null
            }
        )
      }
      return datas;
    },
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
        dataManageSpiderMgt.deleteTable(row.id).then(response => {
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
      let type = row.type;
      this.keywordchange(type);
      this.selectNode(row.classifycode);//选中当前已有值
    },
    selectNode(classifycode){
      if(classifycode==null || classifycode==undefined){
        this.professionName = "";
      }else{
        for(let i=0;i<this.professionDatas.length;i++){
          for(let j=0;j<this.professionDatas[i].children.length;j++){
            if(this.professionDatas[i].children[j].value==classifycode){
              this.professionName = this.professionDatas[i].children[j].label;
            }
          }
        }
      }
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          dataManageSpiderMgt.updateData(this.dataTable.id, this.dataTable).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          dataManageSpiderMgt.createData(this.dataTable).then(response => {
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
      dataManageSpiderMgt.fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },keywordchange:function(val){
      if(val==3){
        this.keywordshow = false;
        this.inclassshow = true;
      }else{
        this.inclassshow = false
        this.keywordshow = true;
      }
    },handleNodeClick:function(node){
      if(!node.children){
        this.professionName = node.label;
        this.dataTable.classifycode = node.value;
        this.$refs.selectReport.blur();
      }
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