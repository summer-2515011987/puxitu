<template>
  <div class="main_contain">
      <div class="headerd">
          <span class="el-icon-caret-right"></span>行业菜单
      </div>
      <div class="myTable">
        <el-container>
            <el-aside width="100%">
              <!-- <span>行业菜单</span> -->
              <el-tree
                      :data="professionData"
                      :props="defaultProps"
                      node-key="id"
                      :expand-on-click-node="false"
                      :render-content="renderContent">
              </el-tree>
            </el-aside>
        </el-container>
      </div>
      <el-dialog
              :title="isEdit?'编辑':'添加'"
              :visible.sync="dialogVisible"
              width="900px">
        <el-form
                v-loading="formLoading"
                :model="resource"
                :rules="rules"
                ref="resourceForm"
                label-width="100px" size="small">
          <el-form-item label="行业代码：" prop="code">
            <el-input v-model="resource.code" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="行业名称：" prop="name">
            <el-input v-model="resource.name" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="父id：">
            <el-input v-model="resource.parent" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <div class="table">
              <editor id="editor_id_qualityEnsure" height="500px" width="400px" :content.sync="resource.content"
                      pluginsPath="../../../static/kindeditor/plugins/"
                      :loadStyleMode="false"
                      ></editor>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="small">取 消</el-button>
              <el-button type="primary" @click="handleDialogConfirm('resourceForm')" size="small" :loading="formLoading">确 定</el-button>
            </span>
      </el-dialog>
  </div>	
  <!-- <el-card class="box-card" style="min-height: 500px">
    <div slot="header" class="clearfix">
      <el-button style="float: right; padding: 3px 0" type="text" @click="getIndustryInfo">刷新</el-button>
    </div>
    <el-container>

      <el-aside width="35%">
        <span>行业菜单</span>
        <el-tree
                :data="professionData"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                :render-content="renderContent">
        </el-tree>
      </el-aside>

    </el-container>
    <el-dialog
            :title="isEdit?'编辑':'添加'"
            :visible.sync="dialogVisible"
            width="900px">
      <el-form
              v-loading="formLoading"
              :model="resource"
              :rules="rules"
              ref="resourceForm"
              label-width="150px" size="small">
        <el-form-item label="行业代码：" prop="code">
          <el-input v-model="resource.code" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="行业名称：" prop="name">
          <el-input v-model="resource.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="父id：">
          <el-input v-model="resource.parent" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <div class="table">
            <editor id="editor_id_qualityEnsure" height="500px" width="400px" :content.sync="resource.content"
                    pluginsPath="../../../static/kindeditor/plugins/"
                    :loadStyleMode="false"
                    ></editor>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDialogConfirm('resourceForm')" size="small" :loading="formLoading">确 定</el-button>
          </span>
    </el-dialog>
  </el-card> -->

</template>

<script>
import dataManageIndustry from "@/api/dataManageIndustry";
export default {
  inject:['reload'],
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      defaultResource:{
        id: null,
        code: null,
        name: null,
        parent: null,
        content: '',
      },
      professionData:[],
      listLoading: false,
      dialogVisible: false,
      formLoading: false,
      resource: Object.assign({}, this.defaultResource),
      isEdit: false,
      showVisible:false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        code: [
          {required: true, message: '请输入行业代码', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入行业名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.getIndustryInfo();
  },
  methods: {
    getIndustryInfo(){
      dataManageIndustry.getIndustryInfo().then(response => {
        const result=response.data;
        const datas=new Array();
        for (let i=0;i<result.length;i++){
          datas.push({
            "id":result[i].id,
            "label":result[i].name,
            "children":this.getTreeData(result[i].children)
            }
          )
        }
        this.professionData=datas;
      });

    },
    getTreeData(childrenData){
      const datas=new Array();
      if (childrenData == undefined) {
        return datas;
      }
      for (let i=0;i<childrenData.length;i++){
        datas.push({
              "id":childrenData[i].id,
              "label":childrenData[i].name,
              "children":this.getTreeData(childrenData[i].children)
            }
        )
      }
      return datas;
    },
    remove(node, data) {
      dataManageIndustry.deleteIndustryInfo(data.id).then(response => {
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      }).catch(error =>{
        this.$message.error(error.data);
      });
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleAdd(node, data) {
      dataManageIndustry.getData(data.id).then(response => {
        this.defaultResource.parent=response.data.code;
        this.dialogVisible = true;
        this.isEdit = false;
        this.resource = Object.assign({}, this.defaultResource);
      }).catch(error =>{
        this.$message.error(error.data);
      });
    },
    handleUpdate(node, data) {
      this.getData(data.id);
      this.dialogVisible = true;
      this.isEdit = true;
    },
    handleShow(node, data) {
      this.$router.push({path:'/datamanage/industryContent',query: {id: data.id}});
    },
    getData(id) {
      dataManageIndustry.getData(id).then(response => {
        this.resource = Object.assign({}, response.data);
      }).catch(error =>{
        this.$message.error(error.data);
      });
    },
    handleDialogConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
              this.$confirm('是否要确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.formLoading = true;
                if (this.isEdit) {
                  dataManageIndustry.updateData(this.resource.id, this.resource).then(response => {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    });
                    this.formLoading = false;
                    this.dialogVisible = false;
                  }).catch(error => {
                    this.formLoading = false;
                  });
                } else {
                  dataManageIndustry.createData(this.resource).then(response => {
                    this.$message({
                      message: '添加成功！',
                      type: 'success'
                    });
                    this.formLoading = false;
                    this.dialogVisible = false;
                  }).catch(error => {
                    this.formLoading = false;
                  });
                }
              }).catch(error =>{
                this.formLoading = false;
                this.dialogVisible = false;
              }).then(() => {
                this.reload();
              });
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
    },
    renderContent(h, { node, data, store }) {
      if(node.level<5){
        return (
                <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                <span>{node.label}</span>
                </span>
                <span>
                <el-button style="font-size: 12px;" type="text" on-click={ () => this.handleAdd(node, data) }>添加</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.handleUpdate(node, data) }>修改</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
        </span>
        </span>)
      }else{
        return (
                <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                <span>{node.label}</span>
                </span>
                <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.handleShow(node, data) }>查看</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.handleUpdate(node, data) }>修改</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
        </span>
        </span>)
      }
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>
