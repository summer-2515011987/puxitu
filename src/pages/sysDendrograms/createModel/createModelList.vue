<template>
  <el-main class="model-main-container">
    <el-container class="h100p model-main">
      <el-header class="model-main-title">
          <span class="tringle-red-icon"></span>
          <span class="model-title-font">职业仓建模管理</span>
      </el-header>
      <el-main style="padding:20px 20px 0;" v-loading="bodyLoading">
          <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
            <el-form-item label="行业">
              <el-input v-model="listQuery.keyword" placeholder="请输入行业"></el-input>
            </el-form-item>
            <el-form-item label="创建日期：" >
                  <el-form-item prop="startDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="listQuery.startDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>-
                  <el-form-item prop="endDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="listQuery.endDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
              </el-form-item>
            <el-form-item>
              <el-button type="primary" class="searchBtn" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item class="fr">
              <!-- 管理员显示【创建模板】 -->
              <el-button type="primary" class="searchBtn" @click="showCreateModelDialog">创建模板</el-button>
              <el-button type="primary" class="searchBtn" @click="chooseMajorVisible=true;getProList()">新建</el-button>
            </el-form-item>
          </el-form>
          <el-table header-row-class-name="light_grey_table"  :data="tableData" border style="width: 100%"  stripe
          :height="tableHeight" v-loading="listLoading">
              <el-table-column
                type="index" label="编号"
                width="60">
              </el-table-column>
              <el-table-column prop="professionName" label="行业" width="280">
              </el-table-column>
              <el-table-column prop="name" label="名称" width="280">
              </el-table-column>
              <el-table-column prop="createTime" label="创建日期" width="150">
              </el-table-column>
              <el-table-column prop="createUser" label="创建者">
              </el-table-column>
              <el-table-column prop="createTime" label="版本">
              </el-table-column>
              <el-table-column prop="progress" label="状态">
                  <template slot-scope="scope">
                    <div class="block">
                      <el-progress :percentage="scope.row.progress" :format="format"></el-progress>
                    </div>
                  </template>
              </el-table-column>
              <el-table-column label="是否展示新数据" width="150">
                <template slot-scope="scope" >
                  <el-radio v-model="scope.row.isDisplay" label="1" @change="changeShowNewData(scope.row)">是</el-radio>
                  <el-radio v-model="scope.row.isDisplay" label="0" @change="changeShowNewData(scope.row)">否</el-radio>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                  <el-button size="mini" class="el-icon-edit"
                            @click="handleSelectRole(scope.$index, scope.row)"></el-button>
                  <el-button @click="delModel(scope.$index, scope.row)" size="mini" type="danger" class="el-icon-delete"></el-button>
                </template>
              </el-table-column>
          </el-table>
      </el-main>
      <el-footer style="height:40px;">
          <div class="block toolbar">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="listQuery.pageNum"
                  :page-size="listQuery.pageSize"
                  :page-sizes="[10,15,20]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
          </div>
      </el-footer>

      <!-- 创建模板对话框 -->
      <el-dialog  custom-class="step-dialog-radius" width="30%" 
          :visible.sync="createModelDialogVisible" :close-on-click-modal="false" :show-close="true" >
          <div slot="title" class="dialog-title">
              <span class="tringle-red-icon"></span>
              <span class="model-title-font">{{modelDialogTitle}}</span>
          </div>
          <el-form :model="createModelData" ref="createModelDataRef" id="createModelDataFormId" label-width="120px" class="demo-ruleForm">
              <el-form-item label="选择专业：" prop="age" style="width:100%;">
                  <el-cascader   ref="jobClassificationCascader" style="width: 100%;"
                        v-model="createModelData.classification" :popper-append-to-body="false"
                        popper-class="test-cascade"
                        :options="propsOption"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleMajorChange">
                  </el-cascader>
              </el-form-item>
              <el-form-item label="来源：" style="line-height: 40px;">{{createModelData.source}}
                <!-- <el-checkbox-group v-model="createModelData.source">
                    <el-checkbox v-for="item in sourceData" :key="item.value"  :label="item.label" :value="item.value"> </el-checkbox> 
                    <el-checkbox disabled key="中华英才网"  label="中华英才网"  value="中华英才网"> </el-checkbox>
                    <el-checkbox disabled key="BOSS直聘"  label="BOSS直聘"  value="BOSS直聘"> </el-checkbox>
                </el-checkbox-group> -->
              </el-form-item>
              <el-form-item label="时间：">
                <el-date-picker v-model="createModelData.start"  style="width: 145px;" type="date"  value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                <el-date-picker v-model="createModelData.end"  style="width: 145px;"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="地区：" >{{createModelData.city}}{{createModelData.area}}
                <!-- <el-select v-model="createModelData.city" filterable placeholder="请选择城市" style="width: 145px;"  @change="getRole($event)">
                  <el-option
                      v-for="item in cityData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select> -->
                <!-- <el-select v-model="createModelData.area" filterable placeholder="请选择地区" style="width: 145px;">
                  <el-option
                      v-for="item in areaData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="横向分类数："  prop="name">{{createModelData.selectHorizontalCategories}}
                  <!-- <el-radio-group  size="mini"  v-model="createModelData.selectHorizontalCategories" style="margin-right:30px;">
                    <el-radio-button v-for="item in horizontalCategoriesDatas" :key="item.value" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio-button>
                </el-radio-group> -->
              </el-form-item>
              <el-form-item label="模型批次序号："  prop="name">{{createModelData.selectBatchData}}
                  <!-- <el-radio-group size="mini"  v-model="createModelData.selectBatchData" style="margin-right:30px;">
                    <template v-for="item in batchData">
                        <el-radio-button :label="item.value">{{item.label}}</el-radio-button>
                    </template>
                </el-radio-group> -->
              </el-form-item>
              <el-form-item label="纵向分级数目："  prop="name">{{createModelData.verticalClassifications}}
                  <!-- <el-radio-group size="mini" v-model="createModelData.verticalClassifications" style="margin-right:30px;">
                  <el-radio-button label=1>1</el-radio-button>
                  <el-radio-button label=2>2</el-radio-button>
                  <el-radio-button label=3>3</el-radio-button>
                  <el-radio-button label=4>4</el-radio-button>
                  <el-radio-button label=5>5</el-radio-button>
                  <el-radio-button label=6>6</el-radio-button>
                </el-radio-group> -->
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center;">
              <el-button @click="createModelDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="autoCreate()" class='searchBtn'>确 定</el-button>
          </div>
      </el-dialog>

      <!-- 新建职业仓对话框 -->
      <el-dialog  custom-class="step-dialog-radius" width="30%" 
          :visible.sync="chooseMajorVisible" :close-on-click-modal="false" :show-close="true" >
          <div slot="title" class="dialog-title">
              <span class="tringle-red-icon"></span>
              <span class="model-title-font">新建职业仓</span>
          </div>
          <el-form :model="jobClassification" ref="jobClassification" label-width="90px" class="demo-ruleForm">
              <el-form-item label="选择专业：" prop="age" style="width:100%;">
                  <el-cascader   ref="jobClassificationCascader" style="width: 100%;"
                               v-model="jobClassification.classification" :popper-append-to-body="false"
                               popper-class="test-cascade"
                               :options="propsOption"
                               :props="{ expandTrigger: 'hover' }"
                               @change="handleChange">
                  </el-cascader>
              </el-form-item>
              <el-form-item label="名称："  prop="name">
                  <el-input type="age" v-model="jobClassification.name" autocomplete="off"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center;">
              <el-button @click="chooseMajorVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitMajor(jobClassification)" class='searchBtn'>确 定</el-button>
              <el-button type="primary" @click="showModelMsgDialog()" class='searchBtn'>一键构建</el-button>
          </div>
      </el-dialog>
    </el-container>
  </el-main>
</template>
<script>
import {getStep1DataSource, createProfessionModelManager, loadStep2Data, fetchList, deleteModel, changeDisplay, getAfterJobClass, getModelTemplateDatas,autoCreate} from '@/api/professionModelManagerApi';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  user: null,
  startData:null,
  endData:null,
  keyword: null
};

export default {
  name: "index",
  components: {},
  data() {
    return {
      radio: '1',
      listQuery: Object.assign({}, defaultListQuery),
      total: null,
      chooseMajorVisible: false,
      currentPage: 1,
      bodyLoading: true,
      listLoading: false,
      jobClassification: {
        classification: '',
        classificationTree: {},
        name: ''
      },
      tableData: [],
      tableHeight: (document.documentElement.clientHeight-330)+'px',
      propsOption: [],
      createModelDialogVisible: false,
      createModelData: {
        classification: '',
        source: '',
        start: '',
        end: '',
        city: '',
        selectHorizontalCategories: '',//横向分类数
        selectBatchData: '',  //模型批次
        verticalClassifications: '',
      },
      areaData:[{value:"", label:"全部"}],
      cityData: [],
      sourceData: [],
      horizontalCategoriesDatas:[],//横向分类数据列表
      modelDialogTitle: '创建模板'
    };
  },
  mounted() {
      this.getList();
      this.bodyLoading = false;
  },
  methods: {
      rederDate(date1){
        if(date1){
          return date1;
        }else{
          return '';
        }
      },
      // 一键构建
      showModelMsgDialog(){
        if(this.jobClassification.classification=='' || this.jobClassification.name==''){
            this.$message.warning('请选择专业和填写名称');
            return;
        }

        this.createModelDialogVisible = true;
        this.modelDialogTitle = '模板参数信息';
        this.dialogOpen();

      },
      showCreateModelDialog(){
        this.createModelDialogVisible = true; 
        this.getProList();  //获得专业列表
        this.dialogOpen();  //获得dataSource
        this.drawZEchart3();  //获得横向分类 批次
      },
      //显示建模信息窗口
      dialogOpen(){
        this.jobClassification.classification = this.jobClassification.classification;
        getStep1DataSource().then(rep=>{
          if (rep.code === 200){
            this.sourceData = [];
            this.cityData = [];
            for (let i = 0 ; i <rep.data.sourceData.length ; i++){
              this.sourceData[i] = {
                value: rep.data.sourceData[i],
                label: rep.data.sourceData[i]
              };
            }
            for (const key in rep.data.city){
              this.cityData.push({value: key, label: key});
            }
            this.cityMap = rep.data.city;
          } else {
            this.$message.error(rep.message);
          }
        }).catch(rep =>{
          console.error(rep);
          this.formLabelAlignLoading = false;
          this.$message.error('获取数据异常');
        });
        //获取数据
        getModelTemplateDatas().then(rep=>{
          
          debugger;
          var data = rep.data;
          // horizontalCategoriesData;
          // area;
          this.createModelData.classification = 
          this.createModelData.selectHorizontalCategories = data.selectHorizontalCategories;//横向分类数
          this.createModelData.selectBatchData = data.selectBatchData;//模型批次
          this.createModelData.verticalClassifications = data.verticalClassifications; 
          this.createModelData.start = data.start; 
          this.createModelData.end = data.end; 
          this.createModelData.source = data.source.slice(1, data.source.length-1);  
          this.createModelData.city = data.city; 
          for(let key in data.source){
            this.horizontalCategoriesDatas.push({
              label:key,
              value:key,
              disabled: true
            });
          }

          // createModelData: {
          //   classification: '',
          // },


        }).catch(rep =>{
          console.error(rep);
          this.formLabelAlignLoading = false;
          this.$message.error('获取数据异常');
        });
      },
      drawZEchart3(){
        loadStep2Data(this.modelLoadData.id).then(rep=>{
          if (rep.code === 200){
            this.batchData = [];
            for(let data in rep.data.batch){
              let objData = {
                label: "批次"+ rep.data.batch[data],
                value:rep.data.batch[data]
              }
              this.batchData.push(objData);
            }
            this.horizontalCategoriesDatas = [{
              label:1,
              value:1,
              disabled: true
            }];

            for(let key in rep.data.source){
              this.horizontalCategoriesDatas.push({
                label:key,
                value:key,
                disabled: false
              });
            }
          } else {
            this.$message.error(rep.message);
          }
        }).catch(rep=>{
          console.error(rep);
        });
      },
      getRole(prov){
        this.areaData = [{value:"", label:"全部"}];
        for (const key in this.cityMap[prov]){
          this.areaData.push({value: this.cityMap[prov][key], label: this.cityMap[prov][key]});
        }
      },
      format(percentage) {
        return percentage === 100 ? '已完成' : `${percentage}%`;
      },
      handleSelectRole(index, row) {
        this.$router.push({
          name: 'modelStep',
          query: {
            id: row.id
          }
        });
      },
      onSubmit() {
        this.getList();
      },
      handleChange(value) {
        console.log(value);
        var name = '';
        for(var data of this.propsOption){
          if(data.value == value[0]){
            name = name + data.label;
            for(var child of data.children){
              if(child.value == value[1]){
                name = name + '-' + child.label;
                this.jobClassification.name = name;
                return;
              }
            }
          }
        }
      },
      handleMajorChange(value){
        this.createModelData.classification;
        debugger;

      },
      submitMajor(obj) {//创建模型数据，返回新模型的数据对象
        if(this.jobClassification.classification=='' || this.jobClassification.name==''){
            this.$message.warning('请选择专业和填写名称');
            return;
        }
        this.bodyLoading = true;
        createProfessionModelManager(this.jobClassification.classification[this.jobClassification.classification.length-1], this.jobClassification.name, 0, null).then(rep => {
          if (rep.code === 200) {
            this.$router.push({
              name: 'modelStep',
              query: { 
                id: rep.data.id,
                smallClassGroup: this.jobClassification.name.split('-')[0] } //传入id
            });
          } else {
            this.$message.error(resp.msg);
          }
        }).catch(rep => {
            this.bodyLoading = false;
        });
      },  
      // 自动构建
      autoCreate(){
        this.bodyLoading = true;
        autoCreate(this.jobClassification.classification[this.jobClassification.classification.length-1], this.jobClassification.name).then(rep => {
          if (rep.code === 200) {
            this.$router.push({
              name: 'modelStep',
              query: { id: rep.data.id,
              smallClassGroup: this.jobClassification.name.split('-')[0]  } //传入id
            });
          } else {
            this.$message.error(resp.msg);
          }
        }).catch(rep => {
            this.bodyLoading = false;
        });

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList() {
        this.tableHeight = (document.documentElement.clientHeight-330)+'px',
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.tableData = response.data.list;
          for(var data of this.tableData){
            if(data.isDisplay!=null){
              data.isDisplay = data.isDisplay.toString();
            }
          }
          this.total = response.data.total;
        }).catch(reason => {
          this.listLoading = false;
        });
      },
      changeShowNewData(row){
        this.$confirm('确定更改吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            changeDisplay(row.id).then(rep => {
              if (rep.code === 200){
                this.$message.success("修改成功！")
                // this.getList();
              } else {
                this.$message.error(rep.message);
              }
            }).catch(error => {
              console.error(error);
            });
        }).catch(() => {
        });
      },
      delModel(index, row){
        this.$confirm('确定删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteModel(row.id).then(rep => {
                if (rep.code === 200){
                  this.$message.success("删除成功！")
                  this.getList();
                } else {
                  this.$message.error(rep.message);
                }

              }).catch(error => {
                console.error(error);
              });
          }).catch(() => {
          });
      },
      //新建对话框中获得专业下拉列表
      getProList() {
        getAfterJobClass(this.listQuery).then(response => {
          this.propsOption = response.data;
        }).catch(reason => {
          this.$message.error(reason.message);
        });
      },
  },
  computed: {
    // sidebar() {
    //   return this.$store.state.app.sidebar
    // }
  }
}
</script>

<style scoped>
@import "./../../../assets/css/sysDen/createModel.css";
#createModelDataFormId >>>.el-form-item__content {
    text-align: left;
}
</style>
