<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>专业关联设置
    </div>
    <div class="myTable">
     <el-container>
        <el-aside width="25%" v-loading="treeLoading">
            <span style="font-size:20px">专业列表</span>
            <div style="text-align:left">
                搜索：<el-input class="formStyle" placeholder="请输入专业名称查询" v-model="filterProfessionText" style="width:300px"></el-input>
             </div>
            <el-tree
                    ref="professionTree"
                    :data="professionData"
                    :props="defaultProps"
                    node-key="code"
                    :expand-on-click-node="false"
                    :highlight-current="true"
                    :filter-node-method="filterProfessionNode"
                    @node-click="professionGroupNodeClick">
            </el-tree>
        </el-aside>
          <el-main style="padding:0 0 0 20px;border-left:1px solid blue;margin-left:20px">
            <span style="font-size:20px">专业-行业-职业关联列表
              <el-button style="float:right;margin:5px" size="mini" @click="handleAdd()">设置关联</el-button>
            </span>
            <el-table ref="menuTable" :height="tableHeight" header-row-class-name="light_grey_table"
                style="width: 100%;"
                :data="professionRelationData"
                v-loading="listLoading" border >
                  <el-table-column label="序号"
                                  type="index"
                                  width="60">
                  </el-table-column>
                  <el-table-column label="专业" width="200px">
                    <template slot-scope="scope">{{ scope.row.profession}}{{ scope.row.professioncode}}</template>
                  </el-table-column>
                  <el-table-column label="行业">
                    <template slot-scope="scope">{{ scope.row.industry }}</template>
                  </el-table-column>
                  <el-table-column label="职业">
                    <template slot-scope="scope">{{ scope.row.job }}</template>
                  </el-table-column>
                  <el-table-column label="证书">
                    <template slot-scope="scope">{{ scope.row.certificatesCn }}</template>
                  </el-table-column>
                  <el-table-column label="操作" width="200px" align="center">
                    <template slot-scope="scope">
                      <el-button
                              size="mini"
                              @click="handleUpdate(scope.$index, scope.row)">编辑
                      </el-button>
                      <el-button
                              size="mini"
                              @click="handleDelete(scope.$index, scope.row)">删除
                      </el-button>
                    </template>
                  </el-table-column>
            </el-table>
          </el-main>
    </el-container>
    <el-dialog
        :title="isEdit?'编辑关联(当前专业：'+this.currentSelectProfessionName+')':'新增关联(当前专业：'+ this.currentSelectProfessionName +')'"
        :visible.sync="dialogVisible"
        width="1500px">
        <el-container>
            <el-aside width="30%" v-loading="industryLoading">
              <span style="font-size:20px">行业列表</span>
              <div style="text-align:left">
                搜索：<el-input class="formStyle" placeholder="请输入行业名称查询（只检索最后一级）" v-model="filterIndustryText" style="width:300px"></el-input>
             </div>
              <div style="height:500px;overfloat:auto">
                  <el-tree
                    ref="industryTree"
                    show-checkbox
                    :data="industryTreeData"
                    :props="defaultProps"
                    node-key="code"
                    :expand-on-click-node="false"
                    :highlight-current="true"
                    :filter-node-method="filterIndustryNode"
                    :default-expanded-keys="expandIndustryCodes">
                  </el-tree>
              </div>
            </el-aside>
            <el-main style="padding:0">
              <div class="overfloatclass" style="float:left;height:600px"  v-loading="jobLoading">
                  <span style="font-size:20px">职业列表</span>
                  <div style="text-align:left;margin-left:20px">
                    搜索：<el-input class="formStyle" placeholder="请输入职业名称查询（只检索最后一级）" v-model="filterJobText" style="width:300px"></el-input>
                  </div>
                  <el-tree
                          ref="jobTree"
                          show-checkbox
                          :data="jobTreeData"
                          :props="defaultProps"
                          node-key="code"
                          :expand-on-click-node="false"
                          :highlight-current="true"
                          :filter-node-method="filterJobNode"
                          :default-expanded-keys="expandJobCodes">
                  </el-tree>
              </div>
              <div class="overfloatclass" style="float:left;margin-left:50px;width:400px;height:600px;"  v-loading="certificateLoading">
                  <span style="font-size:20px">证书列表</span>
                  <div style="text-align:left">
                    搜索：<el-input class="formStyle" placeholder="请输入证书名称查询" v-model="filterCertificateText" style="width:300px"></el-input>
                  </div>
                  <el-tree
                      ref="certificateTree"
                      show-checkbox
                      :data="certificateTreeData"
                      :props="defaultProps"
                      node-key="id"
                      :expand-on-click-node="false"
                      :highlight-current="true"
                      :filter-node-method="filterCertificateNode"
                      :default-expanded-keys="expandcertificateCodes">
                </el-tree>              
              </div>
            </el-main>
        </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleSave()" size="small">保 存</el-button>
      </span>
    </el-dialog>
	</div>
</div>	
</template>

<script>
import professionindustryjob from '@/api/professionindustryjob/professionindustryjobData';
import jobclassification from '@/api/jobClassificationtAPI';
import dataManageIndustry from '@/api/dataManageIndustry';
import certificate from "@/api/profession/professionCertificateMgt";

const defaultListQuery = {
    pageNum: 1,
    pageSize: 99999
};
export default {
  data() {
    return {
        list:[],
        listQuery: Object.assign({}, defaultListQuery),
        tableHeight : (document.documentElement.clientHeight-300)+'px',
        professioncode:0,
        treeLoading:true,
        jobLoading:true,
        certificateLoading:true,
        industryLoading:true,
        listLoading:true,
        isEdit:false,
        dialogVisible:false,
        nodeId:'',
        professionData:[],
        industryTreeData:[],
        jobTreeData:[],
        expandIndustryCodes:[],
        expandJobCodes:[],
        professionRelationData:[],
        certificateTreeData:[],
        expandcertificateCodes:[],
        currentSelectProfessionName:null,
        currentSelectProfessionCode:null,
        currentid:0,
        defaultProps: {
          value: 'code',
          children: 'children',
          label: 'label'
        },
        filterIndustryText:null,
        filterJobText:null,
        filterCertificateText:null,
        filterProfessionText:null
    }
  },watch:{//监听搜索框的查询参数变化，然后进行过滤
      filterProfessionText(val) {
        this.$refs.professionTree.filter(val)
      },
      filterIndustryText(val) {
        this.$refs.industryTree.filter(val)
      },
      filterJobText(val) {
        this.$refs.jobTree.filter(val)
      },
      filterCertificateText(val) {
        this.$refs.certificateTree.filter(val)
      }
  },
  filters: {
    
  },
  created() {
    this.getProfessionData();
  },
  mounted(){
  },
  methods: {
    filterProfessionNode(value, data, node) {
        if (!value) {
          return true
        }
        if(node.label.indexOf(value)!=-1){
            return node
        }
    },
    filterIndustryNode(value, data, node) {
        if (!value) {
          return true
        }
        if(node.label.indexOf(value)!=-1&&node.level==5){//包含关系，并且是第五级
            return node
        }
    },
    filterJobNode(value, data, node) {
        if (!value) {
          return true
        }
        if(node.label.indexOf(value)!=-1&&node.level==4){//包含关系，并且是第五级
            return node
        }
    },
    filterCertificateNode(value, data, node) {
        if (!value) {
          return true
        }
        if(node.label.indexOf(value)!=-1){//包含关系
            return node
        }
    },
    getProfessionData(){
      professionindustryjob.getAllItems("").then(response => {
        const result=response.data;
        const datas=new Array();
        for (let i=0;i<result.length;i++){
          datas.push({
            "code":result[i].code,
            "label":result[i].title,
            "children":null
            }
          )
        }
        this.getProfessionRelation(result[0].code,result[0].title);
        this.currentSelectProfessionName = result[0].title;
        this.currentSelectProfessionCode = result[0].code;
        this.professionData=datas;
        this.treeLoading=false;
        this.$nextTick(()=>{
          this.$refs.professionTree.setCurrentKey(result[0].code)
        })
      });
    },getProfessionRelation(professionCode,currentSelectProfessionName){
        professionindustryjob.getProfessionRelation(professionCode,currentSelectProfessionName).then(response => {
          const result=response.data;
          this.professionRelationData=result;
          this.listLoading=false
        });
    },professionGroupNodeClick(data, node){
      this.currentSelectProfessionName = data.label;
      this.currentSelectProfessionCode = data.code;
      //点击加载对应专业的关联关系
      this.getProfessionRelation(this.currentSelectProfessionCode,this.currentSelectProfessionName);
    },getJobTreeData(){
      jobclassification.getJobClassificationtTree({"parentId":0}).then(response => {
        const result=response.data;
        const datas=new Array();
        for (let i=0;i<result.length;i++){
          datas.push({
            "code":result[i].code,
            "label":result[i].label,
            "children":result[i].children
            }
          )
        }
        this.jobTreeData=datas;
        this.jobLoading=false;
      });
    },getIndustryTreeData(){
      dataManageIndustry.getIndustryInfo().then(response => {
        const result=response.data;
        const datas=new Array();
        for (let i=0;i<result.length;i++){
          datas.push({
            "code":result[i].code,
            "label":result[i].name,
            "children":this.getTreeData(result[i].children)
            }
          )
        }
        this.industryTreeData=datas;
        this.industryLoading=false;
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
            "label":childrenData[i].name,
            "children":this.getTreeData(childrenData[i].children)
          })
      }
      return datas;
    },handleAdd(){
      this.dialogVisible = true;
      this.filterJobText = null;
      this.filterCertificateText = null;
      this.filterIndustryText = null;
      this.getJobTreeData();
      this.getIndustryTreeData();
      this.getCertificateTree();
      this.$nextTick(()=>{
        this.$refs.industryTree.setCheckedKeys([]);
        this.$refs.jobTree.setCheckedKeys([]);
        this.$refs.certificateTree.setCheckedKeys([]);
        this.expandIndustryCodes = [];
        this.expandJobCodes = [];
      })
    },handleSave(){
       let industryCodes = this.$refs.industryTree.getCheckedKeys(true);
       let jobCodes = this.$refs.jobTree.getCheckedKeys(true);
       let certificateIds = this.$refs.certificateTree.getCheckedKeys(true);
       if(industryCodes.length==0||jobCodes.length==0||certificateIds.length==0){
          this.$message({
            type: 'error',
            message: '请选择对应关系!'
          });
         return;
       }
       let currentSelectProfessionCode = this.currentSelectProfessionCode;
       industryCodes = JSON.stringify(industryCodes);
       jobCodes = JSON.stringify(jobCodes);
       certificateIds = JSON.stringify(certificateIds);
       industryCodes = industryCodes.replaceAll("[","").replaceAll("]","").replaceAll("\"","");
       jobCodes = jobCodes.replaceAll("[","").replaceAll("]","").replaceAll("\"","");
       certificateIds = certificateIds.replaceAll("[","").replaceAll("]","").replaceAll("\"","");
       if(this.isEdit){
         //修改对应关系
          professionindustryjob.updateRelation(this.currentid,currentSelectProfessionCode,industryCodes,jobCodes,certificateIds).then(response => {
              const result = response.data;
              if(result){
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.dialogVisible = false;
                this.getProfessionRelation(currentSelectProfessionCode,this.currentSelectProfessionName);//展示对应关系列表
              }
          });
       }else{
         //保存对应关系
          professionindustryjob.saveRelation(currentSelectProfessionCode,industryCodes,jobCodes,certificateIds).then(response => {
              const result = response.data;
              if(result){
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                this.dialogVisible = false;
                this.getProfessionRelation(currentSelectProfessionCode,this.currentSelectProfessionName);
              }
          });
       }
    },handleUpdate(index,row){
      this.isEdit = true;
      this.dialogVisible = true;
      this.getJobTreeData();
      this.getIndustryTreeData();
      this.getCertificateTree();
      let industryCodes = row.industrycode;
      let jobcode = row.jobcode;
      let certificateids = row.certificateids;
      this.currentid = row.id;
      this.$nextTick(()=>{
        if(industryCodes!=null && industryCodes != ""){
            let industryCodesArray = industryCodes.split(",")
            this.$refs.industryTree.setCheckedKeys(industryCodesArray);
            this.expandIndustryCodes = industryCodesArray;
        }
        if(jobcode!=null && jobcode != ""){
            let jobCodesArray = jobcode.split(",")
            this.$refs.jobTree.setCheckedKeys(jobCodesArray);
            this.expandJobCodes = jobCodesArray;
        }
        if(certificateids!=null && certificateids != ""){
            let certificateArray = certificateids.split(",");
            this.$refs.certificateTree.setCheckedKeys(certificateArray);
        }
        
      })
    },handleDelete(index,row){
        this.$confirm('是否要删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            professionindustryjob.deleteRelation(row.id).then(response => {
              const result = response.data;
              if(result){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.dialogVisible = false;
                this.getProfessionRelation(this.currentSelectProfessionCode,this.currentSelectProfessionName);
              }
            });
        });
    },getCertificateTree(){
        certificate.fetchList(this.listQuery).then(response => {
            let result = response.data.list;
            const datas=new Array();
            for (let i=0;i<result.length;i++){
                datas.push({
                  "id":result[i].id,
                  "label":result[i].certificateTitle,
                  "children":null
                })
            }
            this.certificateTreeData=datas;
            this.certificateLoading=false;
        });
    }
  }
}
</script>
<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
.overfloatclass{
  overflow: auto
}
</style>
