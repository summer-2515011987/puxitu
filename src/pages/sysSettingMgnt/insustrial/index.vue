<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>产业管理
    </div>
    <div class="myTable">
      <el-container>
        <el-aside width="600px" v-loading="treeLoading" style="min-height: 300px;max-height: 500px">
          <span style="line-height: 36px;">产业管理目录</span>
          <div class="custom-tree-container">
            <div class="block">
              <el-tree
                      :data="treeDate"
                      node-key="id"
                      :expand-on-click-node="false">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                      <div  v-if="node.level==2" ><span  key="1">{{ node.label }}</span></div>
                      <span v-else key="2">{{ node.label }}</span>
                      <span>
                          <span v-if="node.level  < 2 ">
                            <el-button style="margin-left: 0px;" 
                                    type="text"
                                    size="mini"
                                    @click="() => append(node,data)"> 添加子节点
                            </el-button>
                          </span>
                          <span v-if="node.level  == 2 ">
                            <el-button style="margin-left: 0px;"
                                          type="text"
                                          size="mini"
                                          @click="() => addContent(node,data)"> 新增产业内容
                            </el-button>
                            <el-button style="margin-left: 0px;"
                                        type="text"
                                        size="mini"
                                        @click="() => showContent(data.id)">编辑产业内容
                            </el-button>
                            <el-button style="margin-left: 0px;"
                                    type="text"
                                    size="mini"
                                    @click="() => search(node,data)"> 查看产业内容
                            </el-button>
                            <el-button style="margin-left: 0px;"
                                      type="text"
                                      size="mini"
                                      @click="() => update(node, data)">修改
                            </el-button>
                          </span>
                          <el-button style="margin-left: 0px;"
                                  type="text"
                                  size="mini"
                                  @click="() => remove(node, data)">
                            删除
                          </el-button>
                      </span>
                  </span>
              </el-tree>
            </div>
          </div>
        </el-aside>
        <el-main v-show="showContentFlag" style="overflow:hidden;">
            <div style="padding-left: 0" height="50px" >产业管理内容</div>
            <el-table ref="menuTable" :height="tableHeight" header-row-class-name="light_grey_table" 
                      style="width: 100%;"
                      :data="list"
                      v-loading="listLoading" border >
              <el-table-column label="序号" 
                                type="index"
                                width="50">
              </el-table-column>
                <el-table-column label="产业内容" width="160">
                    <template slot-scope="scope">
                        <el-popover
                                placement="top-start"
                                width="300"
                                trigger="hover"
                                :disabled="scope.row.content.length <= 10"
                        >
                            <div>{{ scope.row.content }}</div>
                            <span   slot="reference" v-if="scope.row.content.length <= 10">{{scope.row.content}}</span>
                            <span  slot="reference"  v-if="scope.row.content.length > 10">{{scope.row.content.substr(0, 10) + "..."}}</span>
                        </el-popover>
                    </template>
                </el-table-column>
              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <el-button
                          size="mini"
                          @click="handleUpdate(scope.$index, scope.row)">编辑产业内容
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="footer-pagination"
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
        <el-container style="min-height: 768px" v-show="showAdd">
          <el-header style="padding-left: 0; padding-right: 0" height="50px">
            <el-button type="primary" @click="dictDataAdd()">新增</el-button>
            <el-button v-show="dataShow" type="primary" @click="dictDataSubmit()">提交</el-button>
          </el-header>
          <el-main style="padding-right: 0 ;padding-top: 0"
                  v-loading="tableDictDataTableLoading">
            <el-table :data="tableDictData" border style="width: 100%"  :height="tableHeight" header-row-class-name="light_grey_table">
              <el-table-column label="序号" type="index" width="80"></el-table-column>
              <el-table-column label="name">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-show="dataShow" v-model="scope.row.name"></el-input>
                  <span v-show="!dataShow">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="content">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-show="dataShow" v-model="scope.row.content"></el-input>
                  <span v-show="!dataShow">{{ scope.row.content }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="deleteDictData(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
	</div>
   <el-dialog
            :title="isEdit?'编辑':'添加'"
            :visible.sync="dialogVisible"
            width="500px">
      <el-form :model="defaultEntity"
                ref="adminForm"
                label-width="100px" size="small">
        <el-form-item label="名称：">
          <el-input v-model="defaultEntity.name" style="width: 300px"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
            :title="isEditContent?'编辑':'添加'"
            :visible.sync="dialogVisibleContent"
            width="80%">
        <el-form :model="resource"
                ref="adminForm"
                label-width="100px" size="small">
          <el-form-item label="内容：">
            <textarea v-model="resource.content" style="width:80%;height:400px;font-size: larger;border: 1px solid #ccc;padding: 20px;"></textarea>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleContent = false" size="small">取 消</el-button>
          <el-button type="primary" @click="handleContentConfirm()" size="small">确 定</el-button>
        </span>
    </el-dialog>
</div>

  <!--<el-card class="box-card" style="min-height: 500px">
    <div slot="header" class="clearfix">
      <span  class="el-page-header__content">产业管理
      </span>
    </div>
    <el-container>

      <el-aside width="600px" v-loading="treeLoading" style="min-height: 300px;max-height: 500px">
        <span style="line-height: 36px;">产业管理目录</span>
        <div class="custom-tree-container">
          <div class="block">
            <el-tree
                    :data="treeDate"
                    node-key="id"
                    :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div  v-if="node.level==2" ><span  key="1">{{ node.label }}</span></div>
        <span v-else key="2">{{ node.label }}</span>
<span>
        <span v-if="node.level  < 2 ">
          <el-button style="margin-left: 0px;"
                  type="text"
                  size="mini"
                  @click="() => append(node,data)">
            添加子节点
          </el-button>
           </span>
          <span v-if="node.level  == 2 ">
            <el-button style="margin-left: 0px;"
                           type="text"
                           size="mini"
                           @click="() => addContent(node,data)">
            新增产业内容
          </el-button>
             <el-button style="margin-left: 0px;"
                        type="text"
                        size="mini"
                        @click="() => showContent(data.id)">
            编辑产业内容
          </el-button>
          <el-button style="margin-left: 0px;"
                     type="text"
                     size="mini"
                     @click="() => search(node,data)">
            查看产业内容
          </el-button>
            <el-button style="margin-left: 0px;"
                       type="text"
                       size="mini"
                       @click="() => update(node, data)">
            修改
          </el-button>
           </span>
          <el-button style="margin-left: 0px;"
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            删除
          </el-button>
      </span>
        </span>
            </el-tree>
          </div>
        </div>
      </el-aside>

      <el-container v-show="showContentFlag">
        <el-header style="padding-left: 0" height="50px" >
          产业管理内容
        </el-header>
          <el-main style="padding-left: 0; padding-right: 0" height="32px">
            <el-table ref="menuTable"
                      style="width: 100%;min-height: 500px"
                      :data="list"
                      v-loading="listLoading" border height="32px">
              <el-table-column label="序号"
                               type="index"
                               width="50">
              </el-table-column>
              <el-table-column label="产业内容" width="160">
                <template slot-scope="scope">
                  <el-popover
                          placement="top-start"
                          width="300"
                          trigger="hover"
                          :disabled="scope.row.content.length <= 10"
                  >
                    <div>{{ scope.row.content }}</div>
                  <span   slot="reference" v-if="scope.row.content.length <= 10">{{scope.row.content}}</span>
                  <span  slot="reference"  v-if="scope.row.content.length > 10">{{scope.row.content.substr(0, 10) + "..."}}</span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <el-button
                          size="mini"
                          @click="handleUpdate(scope.$index, scope.row)">编辑产业内容
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

      <el-container style="min-height: 768px" v-show="showAdd">

        <el-header style="padding-left: 0; padding-right: 0" height="50px">
          <el-button type="primary" @click="dictDataAdd()">新增</el-button>
          <el-button v-show="dataShow" type="primary" @click="dictDataSubmit()">提交</el-button>
        </el-header>

        <el-main style="padding-right: 0 ;padding-top: 0"
                 v-loading="tableDictDataTableLoading">
          <el-table :data="tableDictData" border style="width: 100%" max-height="768">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="name">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-show="dataShow" v-model="scope.row.name"></el-input>
                <span v-show="!dataShow">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="content">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-show="dataShow" v-model="scope.row.content"></el-input>
                <span v-show="!dataShow">{{ scope.row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteDictData(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>

      </el-container>
      <el-dialog
              :title="isEdit?'编辑':'添加'"
              :visible.sync="dialogVisible"
              width="500px">
        <el-form :model="defaultEntity"
                 ref="adminForm"
                 label-width="150px" size="small">
          <el-form-item label="名称：">
            <el-input v-model="defaultEntity.name" style="width: 300px"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
              :title="isEditContent?'编辑':'添加'"
              :visible.sync="dialogVisibleContent"
              width="80%">
        <el-form :model="resource"
                 ref="adminForm"
                 label-width="150px" size="small">
          <el-form-item label="内容：">
            <textarea v-model="resource.content" style="width:80%;height:400px;font-size: larger;border: 1px solid #ccc;padding: 20px;"></textarea>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleContent = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleContentConfirm()" size="small">确 定</el-button>
      </span>
      </el-dialog>
    </el-container>
  </el-card> -->

</template>

<script>
import dataManageIndustrial from "@/api/dataManageIndustrial";
const defaultEntity={
  id: 0,
  type:0,
  name:'',
}
const defaultResource={
  id: 0,
  content:''
}
export default {
  inject:['reload'],
  name: "industrialTree",
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-330)+'px',
      defaultEntity:Object.assign({}, defaultEntity),
      treeDate: [],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible:false,
      dialogVisibleContent:false,
      isEditContent: false,
      treeLoading:true,
      menuTree: [],
      menuLoading : true,
      isEdit: false,
      content:"",
      parentId: 0,
      showContentFlag:false,
      data:Object,
      resource: Object.assign({}, defaultResource),
      showAdd:false,
      tableDictData: [],
      dataShow:false,
      tableDictDataTableLoading:false,
    }
  },
  props: {
    nodekeys:{
      type:String
    }
  },
  created() {
    this.getTree()
  },
  computed: {
    newContent() {
      return this.defaultEntity.content;
    },
    newDictId() {
      return this.dictId;
    },
    newDictLabel() {
      return this.dictLabel;
    },
  },
  watch: {
    newContent(val) {
      this.content = val;
    },
    newDictId(val) {
      this.dictId= val;
    },
    newDictLabel(val) {
       this.dictLabel= val;
    },
  },
  methods: {
    getTree() {
      this.treeLoading = true;
      dataManageIndustrial.getIndustrialInfo().then(response => {
        this.treeLoading = false;
        this.treeDate = response.data;

      }).then(response => {

      });
    },
    append(node,data) {
      //开启点击事件

      this.defaultEntity.type=data.label
      this.showContentFlag=false
      this.dialogVisible=true
      //this.data=data
    },
    search(node,data) {
      //新的查看标签页
      this.$router.push({path:'/datamanage/industrialContent',query: {id: data.id}});
    },
    update(node,data) {
      //开启点击事件
      this.getNodeData(data.id)
      this.isEdit=true
      this.showContentFlag=false
      this.dialogVisible=true
      //this.data=data
    },
    getNodeData(id) {
      dataManageIndustrial.getNodeData(id).then(response => {
        this.defaultEntity = Object.assign({}, response.data);
      }).catch(error =>{
        this.$message.error(error.data);
      });
    },
    handleDialogConfirm(){
      //处理确定后的保存或者修改
      //先保存数据
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          dataManageIndustrial.updateData(this.defaultEntity.id,this.defaultEntity).then(response => {
            this.data.label=this.defaultEntity.name
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            this.dialogVisible = false;
          }).catch(error =>{
            this.$message.error(error.data);
          });
        } else {
          dataManageIndustrial.createData(this.defaultEntity).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            const newChild = { id: response.data, label: this.defaultEntity.name, children: [] };
            if (!this.data.children) {
              this.$set(this.data, 'children', []);
            }
            this.data.children.push(newChild);
            this.dialogVisible = false;
          }).catch(error =>{
            this.$message.error(error.data);
          });
        }
      }).then(() => {
        this.reload();
      });
    },
    handleSave(){
      dataManageIndustrial.updateData(this.defaultEntity.id,this.defaultEntity).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      }).then(response => {

      });
    },
    remove(node, data) {
      dataManageIndustrial.deleteIndustrialInfo(data.id).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1000
        });
      }).catch(error =>{
        this.$message.error(error.data);
      });
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    showContent(id){
      this.showAdd= false;
      this.showContentFlag=true
      this.parentId=id;
      this.listLoading = true;
      dataManageIndustrial.getListData(id, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    getList() {
      this.listLoading = true;
      dataManageIndustrial.getListData(this.parentId, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    getData(id) {
      dataManageIndustrial.getData(id).then(response => {
        this.resource = Object.assign({}, response.data);
      }).catch(error =>{
        this.$message.error(error.data);
      });
    },
    handleContentConfirm(){
      //处理确定后的保存或者修改
      //先保存数据
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        if (this.isEditContent) {
          dataManageIndustrial.updateContentData(this.resource.id,this.resource).then(response => {
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            this.dialogVisibleContent = false;
            this.listLoading = false;
          }).then(response => {

          });
        } else {
          dataManageIndustrial.createContentData(this.resource).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });

            this.dialogVisible = false;
            this.listLoading = false;
          })
        }
      }).catch(()=>{
        this.listLoading = false;
      })
    },
    handleUpdate(node, data) {
      this.getData(data.id);
      this.dialogVisibleContent = true;
      this.isEditContent = true;
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
    addContent(node, data) {
      this.deleteAllDictData();
      this.dictId=data.id;
      this.dictLabel=data.label;
      this.showContentFlag=false;
      this.dataShow = true;
      this.showAdd= true;
    },
    dictDataAdd() {
      this.tableDictData.push({ name:this.dictLabel,content: ""});
    },
    dictDataSubmit() {
      if (this.dataShow && this.dictId) {
        dataManageIndustrial.createContentDatas(this.dictId, this.tableDictData).then(response => {
          this.$message({
            message: '添加成功！',
            type: 'success'
          });
          this.dataShow = false;
          this.showAdd= false;
        }).catch(error =>{
          this.$message.error(error.data);
        });
      }
    },
    deleteDictData(row) {
      for (let i = 0; i < this.tableDictData.length; i++) {
        if (row.content === this.tableDictData[i].content) {
          this.tableDictData.splice(i, 1);
          break;
        }
      }
    },
    deleteAllDictData() {
      if (this.tableDictData.length!=0){
          this.tableDictData.splice(0, this.tableDictData.length);
      }

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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
