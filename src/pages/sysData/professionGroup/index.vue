<template>
  <div class="main_contain">
    <div class="headerd">
      <span class="el-icon-caret-right"></span>专业群定义
    </div>
    <div class="myTable">
      <el-form :inline="true" :model="listQuery" label-width="140px" style="text-align:left;">
        <el-form-item label="专业群名称：">
          <el-input v-model="listQuery.groupName" class="input-width" placeholder="专业群名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询</el-button>
          <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
          <el-button type="primary" @click="handleAdd()" class="searchBtn" style="">添加专业群</el-button>
        </el-form-item>
        <el-button  type="primary" @click="exportGroup()"  class="searchBtn" style="float:right;margin-right:20px">导出专业群</el-button>
      </el-form>
      <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                :data="list"
                style="width: 100%;flex:1; min-height: 500px"
                v-loading="listLoading" stripe border>
        <el-table-column label="专业群名称" width="500" align="center">
          <template slot-scope="scope">{{ scope.row.groupName }}</template>
        </el-table-column>
        <el-table-column label="专业列表">
          <template slot-scope="scope">{{ scope.row.professions }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <a @click="handleBindProfession(scope.$index, scope.row)" target="_blank" class="buttonText">组建专业群</a>
            <span style="margin-left:20px"></span>
            <a @click="handleUpdate(scope.$index, scope.row)" class="buttonText">编辑</a>
            <span style="margin-left:20px"></span>
            <a @click="handleDelete(scope.$index, scope.row)" class="buttonText">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination  class="footer-pagination"
                      background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      layout="total, sizes,prev, pager, next,jumper"
                      :current-page.sync="listQuery.pageNumMore"
                      :page-size="listQuery.pageSize"
                      :page-sizes="[10,20,30]"
                      :total="total">
      </el-pagination>
    </div>
    <el-dialog
            :title="isEdit?'编辑专业群':'新增专业群'"
            :visible.sync="dialogVisible"
            width="450px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="100px" size="small" :inline="true">
              <el-form-item label="专业群名称：">
                  <el-input class="formStyle" v-model="dataTable.groupName" ></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDialogConfirm()" size="small">保 存</el-button>
          </span>
    </el-dialog>
    <el-dialog
            :title="'关联专业群'"
            :visible.sync="bindProfessionDialogVisible"
            width="650px">
              <div style="text-align:left">
                <el-input class="formStyle" placeholder="请输入专业名称查询（只检索第三级）" v-model="filterText" style="width:400px"></el-input>
              </div>
              <el-tree
                    :data="professionDatas"
                    :props="defaultProps"
                    ref="professionTree"
                    show-checkbox
                    node-key="code"
                    :render-content="renderContent"
                    @node-click="handleNodeClick"
                    :default-expanded-keys="expandProfessionCodes"
                    :filter-node-method="filterNode"
                    @node-expand="handleExpand"
                    style="height:500px;overflow:auto"></el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="bindProfessionDialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="saveBindData()" size="small">保 存</el-button>
          </span>
    </el-dialog>
  </div>

</template>
<script>
  import professionGroup from '@/api/professionGroup/professionGroupMgt';
  import {formatDate} from '@/utils/date';
  import dataManage from "@/api/dataManage";

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    groupName:null
  };
  const defaultTable = {
    id: 0,
    groupName: null,
    professions: null,
    professionCodes:null
  };
  export default {
    name: 'positionInfo',
    data() {
      return {
        tableHeight : (document.documentElement.clientHeight-380)+'px',
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        dialogVisible: false,
        listLoading: false,
        bindProfessionDialogVisible:false,
        dataTable: Object.assign({}, defaultTable),
        professionDatas:[],
        professionName:"",
        isEdit: false,
        defaultProps:{               
            value: 'code',
            label: 'label',
            children: 'children',
            disabled: 'disabled'
        },
        expandProfessionCodes:[],
        filterText:null
      }
    },
    created() {
      this.getList();
      this.getProfessionInfo();
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
    //监听搜索框的查询参数变化，然后进行过滤
    watch:{
      filterText(val) {
          this.$refs.professionTree.filter(val)
        }
    },
    mounted(){
    },
    methods: {
     handleExpand(){//节点被展开时触发的事件
      //因为该函数执行在renderContent函数之前，所以得加this.$nextTick()
     	this.$nextTick(()=>{
			  this.changeCss();
		  })
    },
      renderContent(h, { node, data, store }) {
            let classname = ''
            if (node.level === 3) {
              classname = 'levelname'
            }
          return (
                  <span class={classname} style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                  <span>
                  <span>{node.label}</span>
                  </span>
                  <span>
          </span>
          </span>);
      },
      changeCss() {
        var levelName = document.getElementsByClassName('levelname') // levelname是上面的最底层节点的名字
        for (var i = 0; i < levelName.length; i++) {
          // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
          levelName[i].parentNode.style.cssFloat = 'left' // 最底层的节点，包括多选框和名字都让他左浮动
          levelName[i].parentNode.style.styleFloat = 'left'
        }
      },
      filterNode(value, data, node) {
          if (!value) {
            return true
          }
          if(node.label.indexOf(value)!=-1&&node.level==3){//包含关系，并且是第三级
             return node
          }
      },
      handleResetSearch() {
        this.listQuery=Object.assign({}, defaultListQuery);
        this.getList();
      },
      handleSearchList() {
        this.listQuery.pageNumMore = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNumMore = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNumMore =val;
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.dataTable = Object.assign({}, defaultTable);
      },
      exportGroup() {
        window.open(process.env.BASE_API+"/asdc-datamanage/profession/group/exportGroup")
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.dataTable = Object.assign({}, row);
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          professionGroup.deleteInfo(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      getList() {
        this.listLoading = true;
        professionGroup.fetchList(this.listQuery).then(response => {
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
        });
      },handleDialogConfirm() {
            if (this.isEdit) {
                professionGroup.updateData(this.dataTable).then(response => {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.getList();
                })
            } else {
              professionGroup.createData(this.dataTable).then(response => {
                  this.$message({
                      message: '添加成功！',
                      type: 'success'
                  });
                  this.dialogVisible = false;
                  this.getList();
              })
            }
      },getProfessionInfo(){
          dataManage.getProfessionInfo().then(response => {
            const result=response.data;
            const datas=new Array();
            for (let i=0;i<result.length;i++){
              datas.push({
                "code":result[i].code,
                "label":result[i].title,
                "children":this.getTreeData(result[i].children),
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
                  "code":childrenData[i].code,
                  "label":childrenData[i].title,
                  "children":this.getTreeData(childrenData[i].children)
                }
              )
            }
            return datas;
      },handleNodeClick:function(node){
          if(!node.children){
              this.professionName = node.label;
              this.dataTable.classifycode = node.value;
          }
      },handleBindProfession(index, row){
        this.getProfessionInfo();
        this.dataTable.id = row.id;
        this.dataTable.groupName = row.groupName;
        this.bindProfessionDialogVisible = true;
        let codes = JSON.parse(row.professionCodes);
        this.currentRowProfessionCodes = codes;
        this.$nextTick(() => {
            this.expandProfessionCodes = codes;
            this.$refs['professionTree'].setCheckedKeys(codes);
            setTimeout(() => {
              this.changeCss();
            }, 500);
        });
      },saveBindData(){
        let checkedNodes = this.$refs['professionTree'].getCheckedNodes();
        let checkedNodesCodes = new Array();
        let checkedNodesNames = new Array();
        for (let i = 0; i < checkedNodes.length; i++) {
          if(checkedNodes[i].code==null){
            checkedNodesCodes.push("-");
          }else{
            if(checkedNodes[i].label.indexOf("类") < 0){
              checkedNodesCodes.push(checkedNodes[i].code);
              checkedNodesNames.push(checkedNodes[i].label);
            }
          }
        }
        this.dataTable.professions = JSON.stringify(checkedNodesNames).replaceAll("[","").replaceAll("]","").replaceAll("\"","");
        this.dataTable.professionCodes = JSON.stringify(checkedNodesCodes);
        professionGroup.updateData(this.dataTable).then(response => {
              this.$message({
                  message: '绑定成功！',
                  type: 'success'
              });
              this.bindProfessionDialogVisible = false;
              this.getList();
          })

      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/sysSet/wordManagement.css";
</style>