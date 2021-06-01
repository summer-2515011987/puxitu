<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>职业大典 
        <el-button style="float: right; margin:8px" type="text" @click="exportData" class="searchBtn">导出职业大典</el-button>
    </div>
    <div class="myTable">
        <el-container>
          <el-aside width="400px" v-loading="treeLoading" style="min-height: 400px">
              <span style="line-height: 36px;">职业大典目录</span>
              <div class="custom-tree-container">
                  <div class="block">
                      <el-tree
                              :data="treeDate"
                              node-key="id"
                              :expand-on-click-node="false">
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                                <div  v-if="node.level==4" ><span @click="() => showContent(data.id)" key="1">{{ node.label }}</span></div>
                                <span v-else key="2">{{ node.label }}</span>
                                <span>
                                    <span v-if="node.level  < 4 ">
                                      <el-button style="margin-left: 0px;"
                                              type="text"
                                              size="mini"
                                              @click="() => append(node,data)">
                                        添加子节点
                                      </el-button>
                                    </span>
                                    <el-button style="margin-left: 0px;"
                                            type="text"
                                            size="mini"
                                            @click="() => update(node, data)"> 修改
                                    </el-button>
                                    <el-button style="margin-left: 0px;"
                                            type="text"
                                            size="mini"
                                            @click="() => remove(node, data)"> 删除
                                    </el-button>
                                </span>
                          </span>
                      </el-tree>
                  </div>
              </div>
          </el-aside>
          <el-main v-show="showContentFlag">
              <el-header style="padding-left: 0" height="50px" >
                   职业大典内容
              </el-header>
              <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">
                <textarea v-model="defaultEntity.jobDescribe" placeholder="" style="width:80%;height:400px;font-size: larger;border: 1px solid #ccc;padding: 20px;" ></textarea>
              </el-main>
              <el-form :inline="true"  class="demo-form-inline" style="text-align:center;">
                <el-form-item>
                  <el-button type="primary" @click="handleSave()" class="searchBtn">保存</el-button>
                </el-form-item>
              </el-form>
          </el-main>
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
</div>		

  <!-- <el-card class="box-card" style="min-height: 500px">
    <div slot="header" class="clearfix">
      <span  class="el-page-header__content">职业大典
      <el-button style="float: right; padding: 3px 0" type="text" @click="exportData">导出职业大典</el-button>
      </span>
    </div>
    <el-container>

      <el-aside width="400px" v-loading="treeLoading" style="min-height: 400px">
        <span style="line-height: 36px;">职业大典目录</span>
        <div class="custom-tree-container">
          <div class="block">
            <el-tree
                    :data="treeDate"
                    node-key="id"
                    :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div  v-if="node.level==4" ><span @click="() => showContent(data.id)" key="1">{{ node.label }}</span></div>
        <span v-else key="2">{{ node.label }}</span>
<span>
        <span v-if="node.level  < 4 ">
          <el-button style="margin-left: 0px;"
                  type="text"
                  size="mini"
                  @click="() => append(node,data)">
            添加子节点
          </el-button>
           </span>
          <el-button style="margin-left: 0px;"
                  type="text"
                  size="mini"
                  @click="() => update(node, data)">
            修改
          </el-button>
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
          职业大典内容
        </el-header>

        <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">
          <textarea v-model="defaultEntity.jobDescribe" placeholder="" style="width:80%;height:400px;font-size: larger;border: 1px solid #ccc;padding: 20px;" ></textarea>
        </el-main>

        <el-form :inline="true"  class="demo-form-inline" style="text-align:center;">
          <el-form-item>
            <el-button type="primary" @click="handleSave()">保存</el-button>
          </el-form-item>
        </el-form>



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
    </el-container>
  </el-card> -->

</template>

<script>
import {getJobClassificationtTree,getJobClassificationById,create,update,remove,exportData} from '@/api/jobClassificationtAPI'
const defaultQueryTree={
  parentId: 0
}
const defaultEntity={
  id: 0,
  parentId:0,
  type:0,
  name:'',
  jobDescribe:'',
  jobCode:'',
  createTime: "",
  updateTime: ""
}
export default {
  name: "menuList",
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      defaultQueryTree : Object.assign({}, defaultQueryTree),
      defaultEntity:Object.assign({}, defaultEntity),
      treeDate: [],
      list: null,
      total: null,
      dialogVisible:false,
      listLoading: true,
      treeLoading:true,
      menuTree: [],
      menuLoading : true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      isEdit: false,
      content:"",
      parentId: 0,
      showContentFlag:false,
      data:Object
    }
  },
  created() {
    this.getTree()
    //this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    getList() {
      this.listLoading = true;

    },
    getTree() {
      this.treeLoading = true;
      getJobClassificationtTree(this.defaultQueryTree).then(response => {
        this.treeLoading = false;
        this.treeDate = response.data;

      }).then(response => {

      });
    },
    append(node,data) {
      //开启点击事件
      this.defaultEntity.name=''
      this.defaultEntity.type=node.level+1
      this.defaultEntity.parentId=data.id
      this.defaultEntity.jobDescribe=''
      this.showContentFlag=false
      this.dialogVisible=true
      this.data=data
     /* const newChild = { id: 0, label: "this.defaultEntity.name"+node.id, children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);*/
    },
    update(node,data) {
      //开启点击事件
      this.showContent(data.id)
      this.isEdit=true
      //this.defaultEntity.name=data.label
      this.showContentFlag=false
      this.dialogVisible=true
      this.data=data
      /* const newChild = { id: 0, label: "this.defaultEntity.name"+node.id, children: [] };
       if (!data.children) {
         this.$set(data, 'children', []);
       }
       data.children.push(newChild);*/
    },
    exportData(){
      //exportData(0);
      window.open(process.env.BASE_API+"/asdc-datamanage/job_classification/exportJobClassificationtAll?parentId=0")
    },
    handleDialogConfirm(){
      //处理确定后的保存或者修改
      //先保存数据
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        if (this.isEdit) {
          update(this.defaultEntity.id,this.defaultEntity).then(response => {
            this.data.label=this.defaultEntity.name
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            this.dialogVisible = false;
            this.listLoading = false;
          }).then(response => {

          });
        } else {
          create(this.defaultEntity).then(response => {
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
            this.listLoading = false;
          })
        }
      }).catch(()=>{
        this.listLoading = false;
      })



    },
    handleSave(){
      update(this.defaultEntity.id,this.defaultEntity).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      }).then(response => {

      });
    },
    remove(node, data) {
      remove(data.id).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1000
        });
      }).then(response => {

      });
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    showContent(id){
      getJobClassificationById(id).then(response => {
        this.defaultEntity.jobDescribe = response.data.jobDescribe;
        this.defaultEntity.id = response.data.id;
        this.defaultEntity.parentId = response.data.parentId;
        this.defaultEntity.type = response.data.type;
        this.defaultEntity.name = response.data.name;
        this.defaultEntity.jobCode = response.data.jobCode;
        this.defaultEntity.createTime = response.data.createTime;
        this.defaultEntity.updateTime = response.data.updateTime;
        this.showContentFlag=true
      }).then(response => {

      });
    },
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
