<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>专业类与行业招聘大数据关联
        <el-button @click="saveRelation" style="float:right;margin-top:8px;margin-right:20px">保存</el-button>
        <el-button @click="exportRelation" style="float:right;margin-top:8px;margin-right:20px">导出专业类-职位关联</el-button>
    </div>
    <div class="myTable">
     <el-container>
        <el-aside width="25%" v-loading="treeLoading">
            <span>专业群列表</span>
            <el-tree
                    :data="professionData"
                    :props="defaultProps"
                    node-key="id"
                    :render-after-expand="false"
                    :expand-on-click-node="false"
                    :highlight-current="true"
                    @node-click="professionGroupNodeClick">
            </el-tree>
        </el-aside>
          <el-main style="padding:0 0 0 20px;border-left:1px solid blue;margin-left:20px" v-loading="prositionTreeLoading">
            <span>招聘平台岗位</span>
            <div style="text-align:left">
                <el-input class="formStyle" placeholder="请输入岗位名称查询（只检索第三级）" v-model="filterText" style="width:300px"></el-input>
            </div>
            <el-tree
                    ref="positionTree"
                    :data="positionData"
                    :props="defaultProps"
                    node-key="code"
                    show-checkbox
                    :expand-on-click-node="false"
                    :render-content="renderContent"
                    @node-expand="handleExpand"
                    :filter-node-method="filterNode"
                    :default-expanded-keys="expandPositionIds">
            </el-tree>
          </el-main>
    </el-container>
	</div>
</div>	
</template>

<script>
import platformProfession from "@/api/platformProfessionInfo";
import professionGroup from '@/api/professionGroup/professionGroupMgt';

export default {
  data() {
    return {
        list:[],
        tableHeight : (document.documentElement.clientHeight-300)+'px',
        professionId:0,
        treeLoading:true,
        prositionTreeLoading:true,
        parentId:776425,
        nodeId:'',
        professionData:[],
        checkedPositions:[],
        uncheckedPositions:[],
        positionData:[],
        expandPositionIds:[],
        defaultProps: {
          value: 'code',
          children: 'children',
          label: 'label'
        },
        filterText:null
    }
  },//监听搜索框的查询参数变化，然后进行过滤
    watch:{
      filterText(val) {
          this.$refs.positionTree.filter(val)
        }
    },
  created() {
    this.getProfessionGroup();
    this.getPythonPosition();
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
    filterNode(value, data, node) {
        if (!value) {
          return true
        }
        if(node.label.indexOf(value)!=-1&&node.level==3){//包含关系，并且是第三级
            return node
        }
    },
    getProfessionGroup(){
      professionGroup.getItem("").then(response => {
        const result=response.data;
        const datas=new Array();
        for (let i=0;i<result.length;i++){
          datas.push({
            "id":result[i].id,
            "label":result[i].groupName,
            "children":null
            }
          )
        }
        this.professionData=datas;
        this.treeLoading=false
      });
    },getPythonPosition(){
      platformProfession.getPositionInfo().then(response => {
        const result=response.data;
        const datas=new Array();
        for (let i=0;i<result.length;i++){
          datas.push({
            "code":result[i].code,
            "label":result[i].title,
            "children":this.getPositionTreeData(result[i].children)
            }
          )
        }
        this.positionData=datas;
        this.prositionTreeLoading=false
      });
    },
    getPositionTreeData(childrenData){
      const datas=new Array();
      if (childrenData == undefined) {
        return datas;
      }
      for (let i=0;i<childrenData.length;i++){
        datas.push({
              "code":childrenData[i].code,
              "label":childrenData[i].title,
              "children":this.getPositionTreeData(childrenData[i].children)
            }
        )
      }
      return datas;
    },
    changeCss() {
      var levelName = document.getElementsByClassName('levelname') // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        levelName[i].parentNode.style.cssFloat = 'left' // 最底层的节点，包括多选框和名字都让他左浮动
        levelName[i].parentNode.style.styleFloat = 'left'
      }
    },
    renderContent(h, { node, data, store }) {
          let classname = ''
          let label = node.label;
          let positioncountStr = "";
          if (node.level === 3) {  
            classname = 'levelname';
            let labels = label.split("_");
            label = labels[0];
            positioncountStr = labels[1];
          }
        return (
                <span class={classname} style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;float:left">
                <span>
                <span>{label}<span style="color:blue">{positioncountStr}</span></span>
                </span>
                <span>
        </span>
        </span>);
    },
    professionGroupNodeClick(data, node){
        this.professionId = data.id;
        this.getPythonPosition();
        //获取对应关系
        platformProfession.getPositionRelation(this.professionId).then(response => {
            const result=response.data;
            let pythonPositionCodes = new Array();
            for (let i = 0; i < result.length; i++) {
              const pythonPositionCode = result[i].pythonPositionCode;
              pythonPositionCodes.push(pythonPositionCode);
            }
            this.$refs.positionTree.setCheckedKeys(pythonPositionCodes);
            this.expandPositionIds = pythonPositionCodes;
            this.$nextTick(()=>{
              this.changeCss();
            })
        })
    },exportRelation(){
          window.open(process.env.BASE_API+"/asdc-datamanage/platformPositionRelation/exportPlatformPositionRelation")
      }
    ,saveRelation(){
      if(this.professionId==0){
        this.$message({
          message: '请选择专业群！',
          type: 'warning'
        });
        return 
      }
      //获取所有选中的岗位id
      let checkedNodes = this.$refs['positionTree'].getCheckedNodes();
      let checkedNodesIds = new Array();
      for (let i = 0; i < checkedNodes.length; i++) {
        checkedNodesIds.push(checkedNodes[i].code)
      }
      //保存对应关系
      platformProfession.savePositionRelation(this.professionId,checkedNodesIds).then(response => {
          const result=response.data;
          if(result){
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          }
       })
    }
  }
}
</script>
<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>
