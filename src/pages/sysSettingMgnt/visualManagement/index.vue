<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>可视化后台管理
    </div>
    <div class="myTable">
     <el-container>
        <el-aside width="25%" v-loading="treeLoading">
            <span>专业菜单</span>
            <el-tree
                    :data="professionData"
                    :props="defaultProps"
                    node-key="id"
                    :expand-on-click-node="false"
                    :render-content="renderContent">
            </el-tree>
        </el-aside>
        <el-main style="padding:0 0 0 20px;overflow:hidden;">
            <span>专业大数据展示内容设置<span v-if="professionName !=''">({{professionName}})</span></span>

            <el-table ref="menuTable" :height="tableHeight" header-row-class-name="light_grey_table" 
                      style="width: 100%;"
                      :data="list"
                      v-loading="listLoading" border>
                <el-table-column label="控件名称">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="是否显示" width="100">
                  <template slot-scope="scope">
                    <el-switch
                            @change="changeValue(scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.enable">
                    </el-switch>
                  </template>
                </el-table-column>
            </el-table>
          </el-main>
    </el-container>
	</div>
</div>	
  <!-- <el-card class="box-card" style="min-height: 500px">
    <div slot="header" class="clearfix">

    </div>
    <el-container>
      <el-aside width="25%" v-loading="treeLoading">
        <span>专业菜单</span>
        <el-tree
                :data="professionData"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                :render-content="renderContent">
        </el-tree>
      </el-aside>
      <el-container>
        <el-header style="padding-left: 0" height="50px">
          <span>专业大数据展示内容设置<span v-if="professionName !=''">({{professionName}})</span></span>
        </el-header>

        <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0;height:500px;">
          <el-table ref="menuTable"
                    style="width: 100%;min-height: 500px"
                    :data="list"
                    v-loading="listLoading" border>
            <el-table-column label="控件名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="是否显示" width="100">
              <template slot-scope="scope">
                <el-switch
                        @change="changeValue(scope.row)"
                        :active-value="1"
                        :inactive-value="0"
                        v-model="scope.row.enable">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </el-card> -->

</template>

<script>
import dataManage from "@/api/dataManage";
import {getVisualList,getVisualListByProfessionId,updateProfessionVisual} from "@/api/visualManagementAPI";
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
  data() {
    return {
        list:[],
        tableHeight : (document.documentElement.clientHeight-300)+'px',
        professionId:0,
      treeLoading:true,
      professionName:'',
      editorText: '', // 双向同步的变量
      editorTextCopy: '' , // content-change 事件回掉改变的对象
      parentId:776425,
      nodeId:'',
      professionData:[],
      listLoading: false,
      dialogVisible: false,
      formLoading: false,
      resource: Object.assign({}, defaultResource),
      isEdit: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        code: [
          {required: true, message: '请输入专业代码', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        title: [
          {required: true, message: '请输入专业名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.getProfessionInfo();
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
    getData(id) {
      dataManage.getData(id).then(response => {
        this.resource = Object.assign({}, response.data);
      }).catch(error =>{
        this.$message.error(error.data);
      });
    },
  renderContent(h, { node, data, store }) {
      if(node.level==3){
        return (
                <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                <span on-click={ () => this.showVisual(node, data) }>{node.label}</span>
                </span>
                <span>
        </span>
        </span>);
      }else{
        return (
                <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                <span>{node.label}</span>
                </span>
                <span>
        </span>
        </span>);
      }

  },
    showVisual(node, data){
      this.professionName=node.label
        this.professionId=data.id
        getVisualListByProfessionId(this.professionId).then(response => {
            //右边列表
            this.list=response.data
        });
    },
  changeValue(row){
      updateProfessionVisual(this.professionId,row.id,row.enable).then(response => {

      });

  },
    onContentChange (val) {
      this.editorTextCopy = val;
      console.log(this.editorTextCopy)
    },
    afterChange () {
    }
  }
}
</script>
<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>
