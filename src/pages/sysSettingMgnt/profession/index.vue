<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>专业目录管理
    </div>
    <div class="myTable">
      <el-container>
            <el-aside width="35%" v-loading="treeLoading">
              <span>专业菜单</span>
              <el-tree
                      :data="professionData"
                      :props="defaultProps"
                      highlight-current
                      :current-node-key="nodekeys"
                      @node-click="handleNode"
                      :render-content="renderContent">
              </el-tree>
            </el-aside>
            <el-main style="overflow:hidden;">
                <el-table ref="menuTable" :height="tableHeight" header-row-class-name="light_grey_table" 
                          style="width: 100%;"
                          :data="list"
                          v-loading="listLoading" border >
                  <el-table-column label="序号"
                          type="index"
                          width="60">
                  </el-table-column>
                  <el-table-column label="专业名称" >
                    <template slot-scope="scope">{{ scope.row.title}}</template>
                  </el-table-column>
                  <el-table-column label="专业代码">
                    <template slot-scope="scope">{{ scope.row.code }}</template>
                  </el-table-column>
                  <el-table-column label="专业增补年份">
                    <template slot-scope="scope">{{ scope.row.professionCreatetime }}</template>
                  </el-table-column>
                  <el-table-column label="操作" width="400px">
                    <template slot-scope="scope">
                      <el-button
                              size="mini"
                              @click="handleUpdate(scope.$index, scope.row)">编辑专业教学标准
                      </el-button>
                      <el-button
                              size="mini"
                              type="danger"
                              @click="handleKeyWords(scope.$index, scope.row)">预览专业教学标准关键词
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
      </el-container>
	  </div>
    <el-dialog
            :title="isEdit?'编辑':'添加'"
            :visible.sync="dialogVisible"
            width="50%">
      <el-form
              v-loading="formLoading"
              :model="resource"
              :rules="rules"
              ref="resourceForm"
              label-width="100px" size="small">
        <el-form-item label="专业代码：" prop="code">
          <el-input v-model="resource.code" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="专业名称：" prop="title">
          <el-input v-model="resource.title" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="父id：">
          <el-input v-model="resource.parentId" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="resource.orderno" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="入学要求：">
          <el-input v-model="resource.admissionRequirements" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="素质能力：">
          <el-input v-model="resource.studyLife" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="职业面向：">
          <div class="table">
            <editor id="editor_id_jobFace" height="500px" width="700px" :content.sync="resource.jobFace"
                    :afterChange="afterChange()"
                    pluginsPath="../../../static/kindeditor/plugins/"
                    :loadStyleMode="false"
                    @on-content-change="onContentChange"></editor>
          </div>
        </el-form-item>
        <el-form-item label="培养目标：">
          <div class="table">
            <editor id="editor_id_trainGoal" height="500px" width="700px" :content.sync="resource.trainGoal"
                    :afterChange="afterChange()"
                    pluginsPath="../../../static/kindeditor/plugins/"
                    :loadStyleMode="false"
                    @on-content-change="onContentChange"></editor>
          </div>
        </el-form-item>
        <el-form-item label="培养规格：">
          <div class="table">
            <editor id="editor_id_trainType" height="500px" width="700px" :content.sync="resource.trainType"
                    :afterChange="afterChange()"
                    pluginsPath="../../../static/kindeditor/plugins/"
                    :loadStyleMode="false"
                    @on-content-change="onContentChange"></editor>
          </div>
        </el-form-item>
        <el-form-item label="课程设置学时安排：">
          <div class="table">
            <editor id="editor_id_courseinfo" height="500px" width="700px" :content.sync="resource.courseinfo"
                    :afterChange="afterChange()"
                    pluginsPath="../../../static/kindeditor/plugins/"
                    :loadStyleMode="false"
                    @on-content-change="onContentChange"></editor>
          </div>
        </el-form-item>
        <el-form-item label="教学基本条件：">
          <div class="table">
            <editor id="editor_id_teachingCondition" height="500px" width="700px" :content.sync="resource.teachingCondition"
                    :afterChange="afterChange()"
                    pluginsPath="../../../static/kindeditor/plugins/"
                    :loadStyleMode="false"
                    @on-content-change="onContentChange"></editor>
          </div>
        </el-form-item>
        <el-form-item label="质量保证：">
          <div class="table">
            <editor id="editor_id_qualityEnsure" height="500px" width="700px" :content.sync="resource.qualityEnsure"
                    :afterChange="afterChange()"
                    pluginsPath="../../../static/kindeditor/plugins/"
                    :loadStyleMode="false"
                    @on-content-change="onContentChange"></editor>
          </div>
        </el-form-item>
        <el-form-item label="就业面向 专家校验：">
          <el-input v-model="resource.jobfaceProfession" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="职业能力 专家校验：">
          <el-input v-model="resource.jobabilityProfession" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="课程设置及学时安排：">
          <el-input v-model="resource.coursinfo" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="专业原始关键词：">
          <el-input v-model="resource.keywords" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="衔接中职：">
          <el-input v-model="resource.zhongzhi" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="衔接高职：">
          <el-input v-model="resource.gaozhi" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="专业增补年份：">
          <el-input v-model="resource.professionCreatetime" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="resource.describeContent"
                    type="textarea"
                    :rows="5"
                    style="width: 700px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDialogConfirm('resourceForm')" size="small" :loading="formLoading">确 定</el-button>
          </span>
    </el-dialog>
</div>	

</template>

<script>
import dataManage from "@/api/dataManage";
const defaultResource = {
  id: null,
  code: null,
  title: null,
  parentId: null,
  orderno: '',
  admissionRequirements: null,
  studyLife: null,
  jobFace: null,
  trainGoal: null,
  trainType: '',
  courseinfo: null,
  teachingCondition: null,
  qualityEnsure: null,
  jobfaceProfession: null,
  jobabilityProfession: '',
  coursinfo: null,
  keywords: null,
  professionCreatetime: null,
  zhongzhi: null,
  gaozhi: '',
  describeContent: '',

};
export default {
  inject:['reload'],
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-305)+'px',
      list: null,
      total: null,
      treeLoading: true,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        professionName:''
      },
      editorText: '', // 双向同步的变量
      editorTextCopy: '' , // content-change 事件回掉改变的对象
      parentId:776425,
      nodeId:'',
      professionData:[],
      dialogVisible: false,
      formLoading: false,
      resource: Object.assign({}, defaultResource),
      isEdit: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        title: [
          {required: true, message: '请输入专业名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  props: {
    nodekeys:{
      type:String
    }
  },
  mounted() {
    this.getProfessionInfo();
    this.getList();
  },
  methods: {
    getProfessionInfo(){
      dataManage.getProfessionInfo().then(response => {
        const result=response.data;
        const datas=new Array();
        for (let i=0;i<result.length;i++){
          datas.push({
            "id":result[i].id,
            "label":result[i].title,
            "children":this.getTreeData(result[i].children)
            }
          )
        }
        this.professionData=datas;
        this.treeLoading=false
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
              "label":childrenData[i].title,
              "children":this.getTreeData(childrenData[i].children)
            }
        )
      }
      return datas;
    },
    remove(node, data) {
      dataManage.deleteProfessionInfo(data.id).then(response => {
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
      this.dialogVisible = true;
      this.isEdit = false;
      this.resource = Object.assign({}, defaultResource);
      this.resource.parentId=data.id;
    },
    handleUpdate(node, data) {
      this.getData(data.id);
      this.dialogVisible = true;
      this.isEdit = true;
    },
    handleKeyWords(node, data) {
      this.$router.push({path:'/datamanage/keyWords',query: {id: data.id}});
      //window.open('@/pages/sysSettingMgnt/profession/keyWords.vue')
    },
    getData(id) {
      dataManage.getData(id).then(response => {
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
                  dataManage.updateData(this.resource.id, this.resource).then(response => {
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
                  dataManage.createData(this.resource).then(response => {
                    this.$message({
                      message: '添加成功！',
                      type: 'success'
                    });

                  /*  const newChild = { id: response.data, label: this.resource.title, children: [] };
                    if (!this.resource.children) {
                      this.$set(this.resource, 'children', []);
                    }
                    this.resource.children.push(newChild);*/
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
      if(node.level<3){
      return (
              <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                <span>{node.label}</span>
                </span>
              <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.handleAdd(node, data) }>添加</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
            </span>)
      }else {
        return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                <span>{node.label}</span>
                </span>
                <span>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
        </span>
        </span>)
      };
    },
    onContentChange (val) {
      this.editorTextCopy = val;
      console.log(this.editorTextCopy)
    },
    afterChange () {
    },
    handleNode(obj, node, data){
      this.nodeId=obj.id;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      dataManage.fetchList(this.nodeId, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      }).then(response => {
        //this.getProfessionInfo();
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
  }
}
</script>
<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>
