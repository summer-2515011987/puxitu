<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>{{tablename}}
    </div>
    <div class="myTable">
      <el-container>
          <el-header style="padding-left: 0; padding-right: 0" height="50px">
            <el-button type="primary" @click="dictDataAdd()">新增</el-button>
            <el-button v-show="dataShow" type="primary" @click="dictDataSubmit()">提交</el-button>
          </el-header>
          <el-main style="padding-right: 0 ;padding-top: 0"
                  v-loading="tableDictDataTableLoading">
            <el-table :data="tableDictData" border style="width: 100%"  :height="tableHeight" header-row-class-name="light_grey_table">
              <el-table-column label="序号" type="index" width="80"></el-table-column>
              <el-table-column label="数据库字段名">
                <template slot-scope="scope">
                  <el-input placeholder="请输入数据库字段名" v-show="dataShow" v-model="scope.row.columnName"></el-input>
                  <span v-show="!dataShow">{{ scope.row.columnName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="字段类型">
                <template slot-scope="scope">
                  <el-input placeholder="请输入字段类型" v-show="dataShow" v-model="scope.row.type"></el-input>
                  <span v-show="!dataShow">{{ scope.row.type }}</span>
                </template>
                  <template slot-scope="scope">
                      <!--<el-input placeholder="请输入字段类型" v-show="dataShow" v-model="scope.row.type"></el-input>
                      <span v-show="!dataShow">{{ scope.row.type }}</span>-->
                      <el-select v-model="scope.row.type" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
                          <el-option v-for="(item, index) in typeLists" :key="index" :label="item.label" :value="item.label"
                                     :disabled="item.disabled"></el-option>
                      </el-select>
                  </template>
              </el-table-column>
                <el-table-column label="字段长度">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入字段长度" v-show="dataShow" v-model="scope.row.length"></el-input>
                        <span v-show="!dataShow">{{ scope.row.length }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="默认值">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入是否为数值类型（1是0否）" v-show="dataShow" v-model="scope.row.defaultValue"></el-input>
                        <span v-show="!dataShow">{{ scope.row.defaultValue }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="注释">
                    <template slot-scope="scope">
                        <el-input placeholder="注释" v-show="dataShow" v-model="scope.row.comment"></el-input>
                        <span v-show="!dataShow">{{ scope.row.comment }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否作为查询条件">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.issearch" label="1">是</el-radio>
                        <el-radio v-model="scope.row.issearch" label="2">否</el-radio>
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
	</div>
</div>


</template>

<script>
import dataManageTable from '@/api/dataManageTable';
import dataManageTableColumn from '@/api/dataManageTableColumn';
const defaultResource={
  id: 0,
  content:''
}
export default {
  name: "tableColumnCreate",
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-330)+'px',
      content:"",
        typeLists:[],
      tableDictData: [],
      dataShow:true,
      tableDictDataTableLoading:false,
      tablename:''
    }
  },
  created() {
      this.tablename=this.$route.query.tablename;
  },
  // computed: {
  //   newContent() {
  //     return this.defaultEntity.content;
  //   },
  //   newDictId() {
  //     return this.dictId;
  //   },
  //   newDictLabel() {
  //     return this.dictLabel;
  //   },
  // },
  // watch: {
  //   newContent(val) {
  //     this.content = val;
  //   },
  //   newDictId(val) {
  //     this.dictId= val;
  //   },
  //   newDictLabel(val) {
  //      this.dictLabel= val;
  //   },
  // },
    mounted(){
        this.getTypeList();
    },
  methods: {
    dictDataAdd() {
      this.tableDictData.push({ columnName:"",type: "",length:"",defaultValue: "",comment:"",issearch:"2"});
    },
      getTypeList() {
          dataManageTableColumn.getTypeList().then(response => {
              const result = response.data;
              const datas=new Array();
              for(let i=0;i<result.length;i++){
                  datas.push({
                      "label":result[i].typeName,
                      "value":result[i].id
                  })
              }
              this.typeLists=datas;
          });
      },
    dictDataSubmit() {
      if (this.dataShow && this.tablename) {
          dataManageTable.createTable(this.tablename, this.tableDictData).then(response => {
          this.$message({
            message: '添加成功！',
            type: 'success'
          });
          this.dataShow = false;
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
