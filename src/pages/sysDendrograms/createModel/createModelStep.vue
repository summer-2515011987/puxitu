<template>
  <el-main class="p0">
    <el-container>
      <el-aside width="280px" class="darkBlueBckg">
        <el-container>
          <el-header class="model-msg-aside-top p0">
            <div class="model-msg-title">
              <el-tooltip :content="modelLoadData.name" placement="bottom" effect="light">
                <span>{{ modelLoadData.name }}</span>
              </el-tooltip>
              <el-button class="el-icon-back searchBtn returnBtn" @click="returnList()"></el-button>
            </div>
            <el-tree class="filter-tree darkBlueBckg model-msg-aside-tree" :data="modelLoadData.professionTreeData"
              :props="defaultProps" default-expand-all node-key="id" ref="tree">
            </el-tree>
          </el-header>
          <el-main ref="flowTool" id="flowToolId" class="model-msg-aside-bottom">
            <div class="darkBlueBckg_shadow title">工具栏</div>
            <flowTool @addNode="addNode" :existedNodes="data.nodeList" class="darkBlueBckg_shadow"></flowTool>
          </el-main>
          <el-footer>
            <div style="color: white;padding:10px 0 20px;text-align:left;">
              <p>创建者：{{modelLoadData.createUserName}}</p>
              <p>创建时间：{{modelLoadData.createTime}}</p>
            </div>
          </el-footer>
        </el-container>
      </el-aside>
      <el-container>
        <el-header class="main-header-step-progress">
          <el-container class="m0 p0">
            <el-main style="padding:0;overflow: hidden;">
              <el-steps :active="(modelLoadData.progress/20 - 1)" simple>
                <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                <el-step title="步骤 2" icon="el-icon-edit"></el-step>
                <el-step title="步骤 3" icon="el-icon-edit"></el-step>
                <el-step title="步骤 4" icon="el-icon-edit"></el-step>
                <el-step title="步骤 5" icon="el-icon-edit"></el-step>
              </el-steps>
            </el-main>
            <el-aside width="300px" style="overflow:hidden;">
              <el-progress :percentage="modelLoadData.progress" style="line-height:60px;"></el-progress>
            </el-aside>
          </el-container>
        </el-header>
        <el-main class="p0" v-show="!lastNodeResultVisible">
          <div class="thirdSearch" v-show="thirdSearchConVisible">
            横向分类数目：
            <el-radio-group @change="changeHorizontalCategories" size="mini" v-loading="secondEchartLoading"
              v-model="modelLoadData.stepData2.selectHorizontalCategories" style="margin-right:30px;">
              <el-radio-button v-for="item in horizontalCategoriesDatas" :key="item.value" :label="item.value"
                :disabled="item.disabled">{{item.label}}</el-radio-button>
            </el-radio-group>
            模型批次序号：
            <el-radio-group size="mini" v-loading="secondEchartLoading"
              v-model="modelLoadData.stepData2.selectBatchData" style="margin-right:30px;">
              <template v-for="item in batchData">
                <el-radio-button :label="item.value">{{item.label}}</el-radio-button>
              </template>
</el-radio-group>
<el-button type="primary" @click="searchSecondEchart()" size="mini" style="padding: 6px 14px;height: 28px;">
    生成横向趋势图</el-button>
</div>
<div class="thirdSearch" v-show="selectFouthEchartVisible">
    纵向分级数目：
    <el-radio-group size="mini" v-model="modelLoadData.stepData4.verticalClassifications" style="margin-right:30px;">
        <el-radio-button label=1>1</el-radio-button>
        <el-radio-button label=2>2</el-radio-button>
        <el-radio-button label=3>3</el-radio-button>
        <el-radio-button label=4>4</el-radio-button>
        <el-radio-button label=5>5</el-radio-button>
        <el-radio-button label=6>6</el-radio-button>
    </el-radio-group>
    <el-button type="primary" @click="searchFourthEchart()" size="mini" style="padding: 6px 14px;height: 28px;" v-loading="searchFourthEchartBtnLoading">生成纵向分级图</el-button>
</div>
<el-container v-loading="panelLoading">
    <el-main id="flowContainer" class="container" v-if="easyFlowVisible" v-loading="node2_1_loading">
        <template v-for="node in data.nodeList">
                <flow-node :id="node.id" :node="node" @deleteNode="deleteNode" @changeNodeSite="changeNodeSite"
                  @nodeRightMenu="nodeRightMenu" @clickNode="clickNode">
                </flow-node>
              </template>
    </el-main>
    <el-header v-show="secondEchartVisible" style="height:55%;padding-top:10px;overflow:auto;" class="jbColor">
        <div style="text-align:left">
            基于平台自动生成的职业仓横向分类模型，下列横向分类趋势图旨在结合您的专业知识经验和招聘大数据，建立合理的职业仓横向分类体系。请您根据自身经验，挑选出性能较好的职业仓横向分类模型。</div>
        <el-table :data="secondtableData" style="margin:20px;width:98%" header-row-class-name="light_grey_table" :cell-style="secondTablecellStyle" border>
            <el-table-column prop="batchData" label="批次" width="60"> </el-table-column>
            <el-table-column label="横向分类信息">
                <template v-for="item in horizontalCategoriesDatas">
                    <el-table-column v-if="item.disabled !== true" :prop="item.value" :label="item.label">
                    </el-table-column>
                  </template>
            </el-table-column>
        </el-table>
        <div style="text-align:left">
            注：上图横坐标为横向分类的数目，纵坐标为“连贯性得分”，纵坐标数值越大模型性能越佳。此外，为了避免模型的不稳定性，提供了特定数目下不同计算批次中（1-3）的模型性能。 首先，请根据自身经验，选择整体上连贯性得分较高且符合常理的横向分类数目；其次，在所选择的横向分类数目下，选择性能最好的批次序号。 </div>
    </el-header>
    <el-header v-show="thirdEchartVisible" style="height:50%;padding: 0;">
        <el-container>
            <el-aside width="80%">
                <div id="ldavis_third_id" style="text-align:left;"></div>
            </el-aside>
            <el-main>
                <div style="padding: 10px;text-align: left;">左侧红、蓝圆圈为职业方向的主题，圆圈的大小（或者圆圈的次序）代表该职业方向的重要程度； 右侧为被选中的职业方向主题的关键词列表，其中蓝色条形为关键词在该职业小类下、所有职业方向主题中的总频次，红色长条为关键词在该主题中的频次。 右上角λ系数为词频绝对数量（红色条形）与词频占比（红色与蓝色条形之间的比值）的调节参数。λ越大，词频绝对数量在排序中的权重越大；λ越小，词频占比在排序中的权重越大，建议将λ设置在0.5以下。
                </div>
            </el-main>
        </el-container>
    </el-header>
    <el-header v-show="thirdEditableTableVisible" style="height:50%;padding:0;">
        <el-container>
            <el-main style="margin:0;padding:0;">
                <el-table header-row-class-name="light_grey_table" key="name" :data="step3_tableDataList" border style="width: 100%" stripe>
                    <el-table-column prop="name" label="分类名称" width="360">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.name" placeholder="请输入内容"
                          @change="changeThirdEditableTableVisibleName(scope.row.topicNo, scope.row.name)"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="keyWord" label="分类关键词" key="2">
                        <template slot-scope="scope">
                        <div v-show="scope.row.showMoreVisible">
                          <div style="float:left;width:85%">
                            <span class="long_text" :ref="scope.row.name+'_'+scope.$index"
                              v-html="renderTextColors(scope.row.keyWord)"></span>
                          </div>
                          <div style="float:right;width:50px;color: #949494;margin-top:20px;"
                            @click="clickShowMore(scope.$index,scope.row);">更多↓</div>
                        </div>
                        <div v-show="!scope.row.showMoreVisible">
                          <div style="float:left;width:85%">
                            <span v-html="renderTextColors(scope.row.keyWord)"></span>
                          </div>
                          <div style="float:right;width:50px;color: #949494;margin-top:20px;"
                            @click="clickShowMore(scope.$index,scope.row);">收缩↑</div>
                        </div>
                      </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-header>
    <el-header v-show="fouthEchartVisible" style="height:50%;padding:0;">
        <el-container>
            <el-main style="margin:0;">
                <!-- 纵向分级 -->
                <el-row style="min-width:1000px;float:left;">
                    <template v-for="num in pointNum">
                      <div :id='setPointEchartId(num)' v-loading="forthEchartLoading"
                        style="display:none;width:500px;height:200px;float:left;margin-bottom:20px;margin-right: 20px;">
                      </div>
                    </template>
                </el-row>
            </el-main>
        </el-container>
    </el-header>
    <el-header v-show="fouthSecondVisible" style="height:50%;padding:0;">
        <el-container>
            <el-main class="testTable p0 m0">
                <el-table header-row-class-name="light_grey_table" :data="modelLoadData.stepData4.gradedPositionsDataList" style="width: 100%" id="dragedTableId" stripe border row-key="id" align="left">

                    <el-table-column type="index" width="120" label="纵向分级">
                        <template slot-scope="scope">
                        <template v-if="scope.row.verticalClassification !== ''">
                          {{scope.$index +1}}
                        </template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="education" label="学历要求">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.education" placeholder="请输入内容" @change="changeStep4Data()">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="experience" label="经验要求" width="360">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.experience" placeholder="请输入内容" @change="changeStep4Data()">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="salaryMonth" label="薪资要求" width="160">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.salaryMonth" placeholder="请输入内容" @change="changeStep4Data()">
                        </el-input>
                      </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-header>
</el-container>
<flow-info v-if="flowInfoVisible" ref="flowInfo" :data="data"></flow-info>
</el-main>
<el-main v-show="lastNodeResultVisible" v-loading="lastNodeResultVisibleLoading" class="jbColor jbColorHoverCell">
    <el-container style="overflow:hidden;">
        <el-main style="padding:0;">
            <el-table :data="puxituData" @cell-click="clickCell" header-row-class-name="light_grey_table" border style="width: 100%;" :height="(clientHeight-305)+'px'" ref="puxituDataTable" id="puxituDataTable">
                <el-table-column type="index" label="纵向分级" width="60">
                    <template slot-scope="scope">
                    <template v-if="scope.row.verticalClassification !== ''">
                      {{scope.$index +1}}
                    </template>
                    </template>
                </el-table-column>
                <el-table-column prop="jobDemandPercentage" label="分级信息" width="120">
                    <template slot-scope="scope">
                    <template v-if="scope.row.verticalClassification !== ''">
                      <p>学历要求：{{scope.row.education}}</p>
                      <p>经验要求：{{scope.row.experience}}</p>
                      <p>薪资要求：{{scope.row.salaryMonth}}</p>
                    </template>
                    </template>
                </el-table-column>
                <template v-for="data in modelLoadData.stepData2.horizontalCategoriesData">
                  <el-table-column :prop="createJobNameId(data -2)" label="">
                    <template slot-scope="scope">
                      <template v-for="job in scope.row[createJobNameId(data-1)]">
                        <span>{{job}}</span><br>
                      </template>
                </template>
                </el-table-column>
                </template>
            </el-table>
        </el-main>
        <el-header style="text-align:left;font-size:14px;">
            以上为专业的职业方向、教育层级和典型岗位表。请首先根据典型岗位名称，修改横向分类坐标名称。其次，根据先前的纵向分级信息表，填写纵向分级序号对应的学历、经验要求和薪资水平。最后，删改典型岗位信息。如果更改完毕，请点击典型岗位，进入岗位对应能力分级填写界面，作为后续制定岗位说明书的依据。
        </el-header>
        <el-footer style="text-align:right;padding-top:20px;">
            <el-button @click="exportPuxituTable" icon="el-icon-download">导出</el-button>
            <el-button @click="lastNodeResultVisible = false" icon="el-icon-close">返回</el-button>
            <el-button type="primary" icon="el-icon-check" @click="queryButton()" class="searchBtn">确定</el-button>
        </el-footer>
    </el-container>
</el-main>
</el-container>

<!-- 右侧详细信息一栏 -->
<el-aside width="280px" class="right-aside-msg">
    <div class="right_aside_div_title" style="height: 60px;line-height: 60px;">数据源</div>
    <el-form label-position="right" label-width="60px" class="demo-ruleForm rightForm">
        <el-form-item label="来源：" style="line-height: 40px;">
            <span>
              <template v-for="item in modelLoadData.stepData1.source">
                {{item}}
              </template>
            </span>
        </el-form-item>
        <el-form-item label="时间：">{{rederDate(modelLoadData.stepData1.start)}}&nbsp;<span v-if="modelLoadData.stepData1.end">~</span>&nbsp;{{rederDate(modelLoadData.stepData1.end)}}
        </el-form-item>
        <el-form-item label="地区：">
            <el-select v-model="modelLoadData.stepData1.city" filterable disabled placeholder="" style="width: 90px;" @change="getRole($event)">
                <el-option v-for="item in cityData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="modelLoadData.stepData1.area" filterable disabled placeholder="" style="width: 90px;">
                <el-option v-for="item in areaData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <div class="right_aside_div_title">横向分类数：<span style="font-size: 24px;color: #FF6F00;" v-if="modelLoadData.stepData2.selectHorizontalCategories > 1">{{modelLoadData.stepData2.selectHorizontalCategories}}</span>
    </div>
    <div class="right_aside_div_title">模型批次序号： <span v-if="modelLoadData.stepData2.selectBatchData">批次</span>{{modelLoadData.stepData2.selectBatchData}}</div>
    <div v-for="data in step3_tableDataList" class="divList">{{data.name}}</div>
    <div class="right_aside_div_title">纵向分级数：<span style="font-size: 24px;color: #FF6F00;">{{modelLoadData.stepData4.verticalClassifications}}</span></div>
    <div v-for="data in puxituData" class="divList">{{renderSum(data)}}</div>
</el-aside>
</el-container>

<!-- 设定数据源对话框 -->
<el-dialog custom-class="step-dialog-radius" @open="dialogOpen()" v-loading="formLabelAlignLoading" title="设定数据源" :visible.sync="dialogVisible" width="460px" center>
    <div slot="title" class="dialog-title">
        <span class="tringle-red-icon"></span>
        <span class="model-title-font">设定数据源</span>
    </div>
    <el-form label-position="right" label-width="60px" :model="modelLoadData.stepData1">
        <el-form-item label="来源：" style="line-height: 40px;">
            <el-checkbox-group v-model="modelLoadData.stepData1.source">
                <el-checkbox v-for="item in sourceData" :key="item.value" :label="item.label" :value="item.value">
                </el-checkbox>
                <el-checkbox disabled key="中华英才网" label="中华英才网" value="中华英才网"> </el-checkbox>
                <el-checkbox disabled key="BOSS直聘" label="BOSS直聘" value="BOSS直聘"> </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="时间：">
            <el-date-picker v-model="modelLoadData.stepData1.start" style="width: 145px;" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            <el-date-picker v-model="modelLoadData.stepData1.end" style="width: 145px;" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地区：">
            <el-select v-model="modelLoadData.stepData1.city" filterable placeholder="请选择城市" style="width: 145px;" @change="getRole($event)">
                <el-option v-for="item in cityData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="modelLoadData.stepData1.area" filterable placeholder="请选择地区" style="width: 145px;">
                <el-option v-for="item in areaData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <span slot="footer" style="text-align:center;">
        <el-button type="primary" @click="clickImportDataSource(modelLoadData.stepData1)" class="searchBtn">确 定
        </el-button>
        <el-button type="primary" @click="getPreviewDatas" class="searchBtn">预览数据</el-button>
      </span>
</el-dialog>

<!-- 谱系图编辑对话框 -->
<last-node-dialog v-if="goalDialogVisible" ref="lastNodeDialogRef" :id="modelLoadData.id" :selectObj="selectObj" :tableData3="tableData3" :horizontalCategoriesData="modelLoadData.stepData2.horizontalCategoriesData">
</last-node-dialog>

<!-- 预览数据-岗位列表对话框 -->
<el-dialog custom-class="step-dialog-radius" width="50%" :visible.sync="jobDialogVisible" :close-on-click-modal="false" :show-close="true">
    <div slot="title" class="dialog-title">
        <span class="tringle-red-icon"></span>
        <span class="model-title-font">岗位列表</span>
    </div>
    <!-- <el-form  :inline="true"   class="demo-form-inline" style="text-align:left;">
                <el-form-item label="名称：">
                    <el-input  v-model="jobSearchName" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getJobList">检索</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已选择{{multipleJobSelection.length}}条
                </el-form-item>
            </el-form> -->
    <el-table ref="multipleTable" :data="jobTableData" tooltip-effect="dark" style="width: 100%" height="500px" v-loading="jobLoading" :row-key="getRowKeys">
        <!-- <el-table-column  type="selection"  width="55" :reserve-selection="true"> </el-table-column> -->
        <el-table-column label="序号" type="index" width="55"> </el-table-column>
        <el-table-column prop="positionTitle" label="职位名称" width="200"></el-table-column>
        <el-table-column prop="companyName" label="公司名称" width="120"> </el-table-column>
        <el-table-column prop="industry" label="行业" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="dataSourcesPlatform" label="数据来源平台" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="date" label="创建时间" show-overflow-tooltip>
            <template slot-scope="scope">
            <span v-if="scope.row.date">{{ scope.row.date.split("T")[0] }}</span>
            <span v-else> </span>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination class="footer-pagination" background @size-change="handleJobSizeChange" @current-change="handleJobCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="jobListQuery.pageNum" :page-size="jobListQuery.pageSize"
        :page-sizes="[50,100,150]" :total="jobTotal">
    </el-pagination>
    <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button @click="jobDialogVisible = false">关闭</el-button>
        <!-- <el-button type="primary" @click="submitJob()" class='searchBtn'>确定选择</el-button> -->
    </div>
</el-dialog>
</el-main>
</template>

<script>
    // import draggable from 'vuedraggable'
    // import FlowNodeForm from './node_form'
    // import lodash from 'lodash'
    // import d3 from 'd3'

    import {
        jsPlumb
    } from 'jsplumb'
    import flowNode from '@/pages/sysDendrograms/createModel/node'
    import flowTool from '@/pages/sysDendrograms/createModel/tool'
    import FlowInfo from '@/pages/sysDendrograms/createModel/info'
    import d3 from '../../../../static/js/d3.min.js'
    import {
        LDAvis
    } from '../../../../static/js/ldavis.v1.0.0.js'
    import LastNodeDialog from './node_5_1_dialog'
    import Sortable from 'sortablejs' //可拖拽表格
    import FileSaver from 'file-saver' //
    import XLSX from 'xlsx'

    import {
        loadProfessionalOnetInfoData,
        updateProgress,
        getPreviewDatas
    } from "@/api/professionModelManagerApi"
    import {
        getStep1DataSource,
        loadData,
        updateStep1Data,
        updateStep2Data,
        updateProcessModelData,
        loadStep2Data,
        loadLdavisData,
        loadVerticalClassificationData,
        loadHorizontalCategoriesData,
        updateHorizontalCategoriesData,
        loadGradedPositionsData,
        updateStep4Data,
        loadTypicalJobDemandDto
    } from "@/api/professionModelManagerApi"
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 50,
        keyword: null
    };
    export default {
        name: "easyFlow",
        data() {
            return {
                secondtableData: [],
                lastNodeResultVisible: false, //谱系图展示
                lastNodeResultVisibleLoading: false,
                clientHeight: 0,
                clientWidth: 0,
                secondEchartVisible: false,
                selectFouthEchartVisible: false,
                thirdEchartVisible: false,
                node2_1_loading: false,
                /**
                 *职业横向分类名称是否变更
                 */
                thirdEditableTableVisibleNameChange: false,
                /**
                 * 横向分类数目div动画控制
                 */
                thirdSearchConVisible: false,

                /**
                 * 职业横向分类div
                 */
                thirdEditableTableVisible: false,
                /**
                 * 纵向分级echart图面板
                 */
                fouthEchartVisible: false,
                fouthSecondVisible: false,
                /**
                 * 纵向分级echart图动画控制
                 */
                forthEchartLoading: false,
                /**
                 * 纵向分级按钮加载动画控制
                 */
                searchFourthEchartBtnLoading: false,
                /**
                 * 横向分类页面按钮加载动画控制
                 */
                secondEchartLoading: false,
                formLabelAlignLoading: false,
                horizontalCategoriesDatas: [],
                batchData: [],
                pointNum: [0, 1, 2, 3, 4],
                panelLoading: false,
                dialogVisible: false,
                goalDialogVisible: false,
                sourceData: [],
                tableData3: [],
                selectObj: {},
                cityData: [],
                areaData: [{
                    value: "",
                    label: "全部"
                }],
                cityMap: null,
                jobDialogVisible: false,
                jobTableData: [],
                jobLoading: false,
                jobListQuery: Object.assign({}, defaultListQuery),
                jobTotal: 0,
                smallClassGroup: '', // this.$router.query.smallClassGroup,

                modelLoadData: { //建模整个界面，所有步骤保存的数据对象
                    id: this.$route.query.id, //list页面传入的建模id
                    name: '',
                    progress: 0,
                    stepData1: {
                        source: [],
                        start: '',
                        end: '',
                        city: null,
                        area: null,
                    },
                    stepData2: {
                        isCreateHorizontalCategoriesData: false,
                        selectHorizontalCategories: null,
                        selectBatchData: null,
                        horizontalCategoriesData: [],
                    },
                    stepData4: {
                        verticalClassifications: null, //纵向分级数目
                        gradedPositionsDataList: [{ //分级岗位数据
                            verticalClassification: null,
                            education: null,
                            experience: null,
                            salaryMonth: null
                        }]
                    },
                    createUser: 0,
                    createTime: '',
                    createUserName: '',
                    processModelData: null,
                    professionTreeData: [{
                        id: 0,
                        label: '',
                        type: 0,
                        childrenSize: 0,
                        children: []
                    }]
                },
                sliderNumber: 40,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                step3_tableDataList: [],
                puxituData: [],
                // value: '',
                jsPlumb: jsPlumb.getInstance(), // jsPlumb 实例
                easyFlowVisible: true,
                flowInfoVisible: false,
                // nodeFormVisible: false,
                // 默认设置参数
                jsplumbSetting: {
                    // 动态锚点、位置自适应
                    Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter',
                        'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'
                    ],
                    Container: 'flowContainer',
                    // 连线的样式 StateMachine、Flowchart
                    Connector: 'Flowchart',
                    // 鼠标不能拖动删除线
                    ConnectionsDetachable: true,
                    // 删除线的时候节点不删除
                    DeleteEndpointsOnDetach: false,
                    // 连线的端点
                    // Endpoint: ["Dot", {radius: 5}],
                    Endpoint: ["Rectangle", {
                        height: 10,
                        width: 10
                    }],
                    // 线端点的样式
                    EndpointStyle: {
                        fill: 'rgba(255,255,255,0)',
                        outlineWidth: 1
                    },
                    LogEnabled: true, //是否打开jsPlumb的内部日志记录
                    // 绘制线
                    PaintStyle: {
                        stroke: 'black',
                        strokeWidth: 1
                    },
                    // 绘制箭头
                    Overlays: [
                        ['Arrow', {
                            width: 12,
                            length: 15,
                            location: 1
                        }]
                    ],
                    RenderMode: "svg"
                },
                // jsplumb连接参数
                jsplumbConnectOptions: {
                    isSource: false,
                    isTarget: false,
                    // 动态锚点、提供了4个方向 Continuous、AutoDefault
                    anchor: "AutoDefault"
                },
                jsplumbSourceOptions: {
                    filter: "img",
                    /*"span"表示标签，".className"表示类，"#id"表示元素id*/
                    filterExclude: false,
                    anchor: "AutoDefault",
                    allowLoopback: false,
                    maxConnections: 1
                },
                jsplumbTargetOptions: {
                    filter: "img",
                    /*"span"表示标签，".className"表示类，"#id"表示元素id .flow-node-drag*/
                    filterExclude: false,
                    anchor: "AutoDefault",
                    allowLoopback: false,
                    maxConnections: 1
                },

                loadEasyFlowFinish: false, // 是否加载完毕
                data: {
                    nodeList: [],
                    lineList: []
                }, // 画布上拖拽的节点数据
            }
        },
        components: {
            flowNode,
            flowTool,
            FlowInfo,
            LastNodeDialog
        },
        computed: {
            //第二个柱状图div样式
            secondNodeEchartDiv: {
                get() {
                    return {
                        width: (this.clientWidth - 650) + 'px',
                        height: ((this.clientHeight - 90) * 0.4) + 'px'
                    }
                }
            },
            nodeClass() {
                let nodeclass = {};
                // nodeclass[this.node.ico] = true
                nodeclass['flow-node-drag'] = true
                return nodeclass
            }
        },
        created() {
            //初始化, this.modelLoadData.id：新增模型或者编辑的模型的id
            var me = this;
            loadData(this.modelLoadData.id).then(rep => {
                if (rep.code === 200) {
                    // me.modelLoadData = rep.data;
                    Object.assign(me.modelLoadData, rep.data);
                    if (rep.data.stepData1 != null) { //数据源选择的参数
                        me.$set(me.modelLoadData, "stepData1", JSON.parse(rep.data.stepData1));
                    } else {
                        me.modelLoadData.stepData1 = {
                            source: [],
                            start: '',
                            end: '',
                            city: null,
                            area: null,
                        }
                    }
                    if (rep.data.stepData2 == null) {
                        me.modelLoadData.stepData2 = {
                            isCreateHorizontalCategoriesData: false,
                            selectHorizontalCategories: null,
                            selectBatchData: null,
                            horizontalCategoriesData: [],
                        }
                    }
                    if (rep.data.stepData3 !== null && rep.data.stepData3 !== '') {
                        me.step3_tableDataList = JSON.parse(rep.data.stepData3)['horizontalCategoriesDataVoList'];
                    }
                    if (rep.data.stepData4 == null) {
                        me.modelLoadData.stepData4 = {
                            verticalClassifications: null, //纵向分级数目
                            gradedPositionsDataList: [] //分级岗位数据
                        }
                    }

                    if (rep.data.processModelData != null) {
                        // me.data 画布上拖拽的节点数据
                        Object.assign(me.data, JSON.parse(rep.data.processModelData));
                    } else {
                        me.data.nodeList = [];
                        me.data.lineList = [];
                    }
                    me.dataReload();
                } else {
                    me.$message.error(rep.message);
                }

            }).catch(reason => {
                console.error(reason);
                me.$message.error("初始化数据失败");
            });
        },
        mounted() {
            this.clientHeight = document.documentElement.clientHeight;
            this.clientWidth = document.documentElement.clientWidth;
            this.jsPlumb = jsPlumb.getInstance()
                // this.$nextTick(() => {
                //     this.dataReloadA()
                // })
                // 阻止默认行为
            document.body.ondrop = function(event) {
                event.preventDefault();
                event.stopPropagation();
            };
            this.rowDrop();
            // this.drawZEchart3();

        },
        methods: {

            queryButton() {
                this.lastNodeResultVisibleLoading = true;
                updateProgress(this.modelLoadData.id, 100).then(rep => {
                    this.lastNodeResultVisibleLoading = false;
                    if (rep.code === 200) {
                        this.$message.success("构建成功！")
                        this.$router.push({
                            path: "/model/list"
                        });
                    }
                }).catch(errpr => {
                    console.error(errpr);
                    this.lastNodeResultVisibleLoading = false;
                });
            },
            renderSum(data) {
                if (data.verticalClassification) {
                    let sum = 0;
                    for (let i = 0; i < this.modelLoadData.stepData2.horizontalCategoriesData.length; i++) {
                        let index = this.modelLoadData.stepData2.horizontalCategoriesData[i];
                        let name = 'data' + (index - 1);
                        let value = data[name];
                        if (value !== undefined) {
                            sum = sum + value.length;
                        }
                    }
                    return '纵向' + data.verticalClassification + '职位数: ' + sum;
                }
            },
            secondTablecellStyle({
                row,
                column,
                rowIndex,
                columnIndex
            }) {
                // this.modelLoadData.stepData2.selectHorizontalCategories;//横向分类数目
                if ((rowIndex + 1 === this.modelLoadData.stepData2.selectBatchData) && (columnIndex + 1 === Number(this
                        .modelLoadData.stepData2.selectHorizontalCategories))) {
                    return 'color: red';
                }
            },

            clickShowMore(index, data) {
                data.showMoreVisible = !data.showMoreVisible;
                this.$set(data, 'showMoreVisible', data.showMoreVisible);
                this.$set(this.step3_tableDataList, index, data)
            },
            renderTextColors(text) {
                if (text) {
                    let redText = '';
                    let orangeText = '';
                    let greenText = '';
                    const textArr = text.split('、');
                    for (let i in textArr) {
                        if (i <= 3) {
                            redText = redText + '、' + textArr[i];
                        } else if (i <= 7) {
                            orangeText = orangeText + '、' + textArr[i];
                        } else {
                            greenText = greenText + '、' + textArr[i];
                        }
                    }
                    redText = redText.substring(1);
                    orangeText = orangeText.substring(1);
                    greenText = greenText.substring(1);
                    text = text.replace(redText, "<span style=\"color:Red;\">" + redText + "</span>");
                    text = text.replace(orangeText, "<span style=\"color:orange;\">" + orangeText + "</span>");
                    text = text.replace(greenText, "<span style=\"color:green;\">" + greenText + "</span>");
                    return text;
                }
                return text;
            },
            returnList() {
                this.$router.push({
                    path: "/model/list"
                });
            },
            rederDate(date1) {
                debugger
                if (date1) {
                    return date1;
                } else {
                    return '';
                }
            },
            setPointEchartId(row) {
                return 'fourthPointEchartDivId_' + row;
            },
            clickCell(row, column, cell, event) {
                if (cell.cellIndex >= 2 && row.verticalClassification !== '') {
                    this.lastNodeResultVisibleLoading = true;
                    //这里减去2是因为，这里页面展示是从2列开始，但是数据索引是从0开始
                    loadProfessionalOnetInfoData(this.modelLoadData.id, row.verticalClassification, cell.cellIndex - 2).then(
                        rep => {
                            if (rep.code === 200) {
                                this.goalDialogVisible = true;
                                this.selectObj = row;
                                this.selectObj.horizontalClassification = cell.cellIndex;
                                this.tableData3 = [];
                                let index = 1;
                                var reg = new RegExp('<br>', "g")
                                for (let data of rep.data) {
                                    data.desc = '关键字';
                                    data.id = index++;
                                    data.positionDetailClause = data.positionDetailClause.replace(reg, "\n");
                                    this.tableData3.push(data);
                                }
                                this.$refs.lastNodeDialogRef.editVisible = true;
                            }
                            this.lastNodeResultVisibleLoading = false;
                        }).catch(error => {
                        this.lastNodeResultVisibleLoading = false;
                        console.error(error);
                    });
                }
            },
            createJobNameId(index) {
                return "data" + index
            },
            getRowKeys(row) {
                return row.id
            },

            dialogOpen() {
                this.formLabelAlignLoading = true;
                getStep1DataSource().then(rep => {
                    this.formLabelAlignLoading = false;

                    if (rep.code === 200) {
                        this.sourceData = [];
                        this.cityData = [];
                        for (let i = 0; i < rep.data.sourceData.length; i++) {
                            this.sourceData[i] = {
                                value: rep.data.sourceData[i],
                                label: rep.data.sourceData[i]
                            };
                        }
                        for (const key in rep.data.city) {
                            this.cityData.push({
                                value: key,
                                label: key
                            });
                        }
                        this.cityMap = rep.data.city;
                    } else {
                        this.$message.error(rep.message);
                    }

                }).catch(rep => {
                    console.error(rep);
                    this.formLabelAlignLoading = false;
                    this.$message.error('获取数据异常');
                });
            },
            getRole(prov) {
                this.areaData = [{
                    value: "",
                    label: "全部"
                }];
                for (const key in this.cityMap[prov]) {
                    this.areaData.push({
                        value: this.cityMap[prov][key],
                        label: this.cityMap[prov][key]
                    });
                }
            },
            jsPlumbInit() {
                const _this = this
                this.jsPlumb.ready(function() {

                    // 导入默认配置
                    _this.jsPlumb.importDefaults(_this.jsplumbSetting)
                        // 会使整个jsPlumb立即重绘。
                    _this.jsPlumb.setSuspendDrawing(false, true);
                    // 初始化节点
                    _this.$nextTick(function() {
                        _this.loadEasyFlow();
                    });

                    // 单点击了连接线,
                    _this.jsPlumb.bind('click', function(conn) {
                            // console.log("click", conn)
                            //
                            // _this.$confirm('确定删除所点击的线吗?', '提示', {
                            //   confirmButtonText: '确定',
                            //   cancelButtonText: '取消',
                            //   type: 'warning'
                            // }).then(() => {
                            //   _this.jsPlumb.deleteConnection(conn)
                            // }).catch(reason => {
                            //   console.error(reason);
                            // })
                        })
                        // 连线
                    _this.jsPlumb.bind("connection", function(evt) {
                        console.log('connection', evt)
                        let from = evt.source.id
                        let to = evt.target.id
                        if (_this.loadEasyFlowFinish) {
                            _this.data.lineList.push({
                                from: from,
                                to: to
                            });
                            _this.updateProcessLoadToDb();
                        }
                    })

                    // 删除连线
                    _this.jsPlumb.bind("connectionDetached", function(evt) {
                        console.log('connectionDetached', evt)
                        _this.deleteLine(evt.sourceId, evt.targetId)
                    })

                    // 改变线的连接节点
                    _this.jsPlumb.bind("connectionMoved", function(evt) {
                        console.log('connectionMoved', evt)
                        _this.changeLine(evt.originalSourceId, evt.originalTargetId)
                    })

                    // 单击endpoint
                    // jsPlumb.bind("endpointClick", function (evt) {
                    //   console.log('endpointClick', evt)
                    // })
                    //
                    // // 双击endpoint
                    // jsPlumb.bind("endpointDblClick", function (evt) {
                    //   console.log('endpointDblClick', evt)
                    // })

                    // contextmenu
                    _this.jsPlumb.bind("contextmenu", function(evt) {
                            console.log('contextmenu', evt)
                        })
                        // beforeDrop
                    _this.jsPlumb.bind("beforeDrop", function(evt) {
                        let from = evt.sourceId
                        let to = evt.targetId
                        if (from === to) {
                            // _this.$message.error('不能连接自己');
                            return false
                        }
                        if (_this.hasLine(from, to)) {
                            // _this.$message.error('不能重复连线');
                            return false
                        }
                        if (_this.hashOppositeLine(from, to)) {
                            // _this.$message.error('不能回环哦');
                            return false
                        }

                        return true
                    })

                    // beforeDetach
                    _this.jsPlumb.bind("beforeDetach", function(evt) {
                        console.log('beforeDetach', evt)
                    })
                })
            },
            // 加载流程图
            loadEasyFlow() {
                this.panelLoading = true;
                // 初始化节点
                for (let i = 0; i < this.data.nodeList.length; i++) {
                    let node = this.data.nodeList[i];
                    this.jsPlumb.addEndpoint(node.id);
                    // // 设置源点，可以拖出线连接其他节点
                    // this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions)
                    // // 设置目标点，其他源点拖出的线可以连接该节点
                    // this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
                    // 设置可拖拽
                    // jsPlumb.draggable(node.id, {
                    //     containment: 'parent',
                    //     grid: [10, 10]
                    // })
                    // this.jsPlumb.draggable(node.id, {
                    //   containment: 'parent'
                    // })

                    // jsPlumb.draggable(node.id)
                }

                // 初始化连线
                for (let i = 0; i < this.data.lineList.length; i++) {
                    let line = this.data.lineList[i]
                    this.lineConnect(line.from, line.to);
                }
                this.$nextTick(function() {
                    this.loadEasyFlowFinish = true;
                    this.panelLoading = false;
                });
            },
            /**
             * 将两端连接起来
             * @param source 源
             * @param target 目标
             */
            lineConnect(source, target) {
                this.jsPlumb.connect({
                    source: source,
                    target: target
                }, this.jsplumbConnectOptions);
            },
            getNodes() {
                console.log(jsPlumb)
                console.log(jsPlumb)
            },
            getLines() {
                console.log('线', jsPlumb.getConnections())
            },
            // 删除线
            deleteLine(from, to) {

                let _this = this;
                this.$nextTick(function() {
                    _this.data.nodeList = _this.data.nodeList.filter(obj => obj.id !== to);
                    _this.data.lineList = _this.data.lineList.filter(function(line) {
                        return line.from !== from && line.to !== to
                    });
                    // _this.updateProcessLoadToDb();
                });
            },
            // 改变连线
            changeLine(oldFrom, oldTo) {
                this.deleteLine(oldFrom, oldTo)
            },
            // 改变节点的位置
            changeNodeSite(data) {
                for (let i = 0; i < this.data.nodeList.length; i++) {
                    let node = this.data.nodeList[i]
                    if (node.id === data.nodeId) {
                        node.left = data.left
                        node.top = data.top
                    }
                }
            },
            // 添加新的节点
            addNode(evt, nodeMenu, nodeRelationship, mousePosition) {
                let _this = this;

                //判断添加的节点是否存在, 添加节点时判断是否节点列表中已经存在；按照类型判断
                let isExisted = false;
                for (var existNode of this.data.nodeList) {
                    if (nodeMenu.type == existNode.type) {
                        isExisted = true;
                    }
                }
                if (isExisted) { //如果节点已经存在，走节点的点击事件
                    this.clickNode({
                        nodeType: nodeMenu.type,
                        visible: false
                    });
                } else { //如果节点不存在

                    if (nodeMenu.type === '1-1') { //第一节点：数据源，弹出对话框，选择来源
                        this.createAndSaveNode(nodeMenu, nodeRelationship);
                        this.clickNode({
                            nodeType: nodeMenu.type,
                            visible: false
                        });

                    } else if (nodeMenu.type === '2-1') { //第二个节点，应该展示出参数选择控件，和对应的表格数据
                        var hasFlag = this.hasNode('1-1');
                        if (hasFlag) { //保存节点数据，同时展示clickNode的内容
                            this.createAndSaveNode(nodeMenu, nodeRelationship);
                            this.clickNode({
                                nodeType: nodeMenu.type,
                                visible: false
                            });
                        } else {
                            this.$message.error("请按照顺序拖拽节点！");
                            return;
                        }

                    } else if (nodeMenu.type === '3-1') {
                        if (this.modelLoadData.stepData2.isCreateHorizontalCategoriesData) { //第二步已经生成了横向祛湿图
                            this.createAndSaveNode(nodeMenu, nodeRelationship);
                            this.clickNode({
                                nodeType: nodeMenu.type,
                                visible: false
                            });
                        } else {
                            this.$message.error("请先在第二步生成横向趋势图数据！");
                        }

                    } else if (nodeMenu.type === '3-2') {
                        var hasFlag = this.hasNode('3-1');
                        if (hasFlag) { //保存节点数据，同时展示clickNode的内容
                            this.createAndSaveNode(nodeMenu, nodeRelationship);
                            this.clickNode({
                                nodeType: nodeMenu.type,
                                visible: false
                            });
                        } else {
                            this.$message.error("请按照顺序拖拽节点，先添加职业横向分类！");
                            return;
                        }

                    } else if (nodeMenu.type === '4-1') {
                        var hasFlag = this.hasNode('3-2');
                        if (hasFlag) { //保存节点数据，同时展示clickNode的内容
                            this.createAndSaveNode(nodeMenu, nodeRelationship);
                            this.clickNode({
                                nodeType: nodeMenu.type,
                                visible: false
                            });
                        } else {
                            this.$message.error("请按照顺序拖拽节点！");
                            return;
                        }

                    } else if (nodeMenu.type === '4-2') {
                        var hasFlag = this.hasNode('4-1');
                        if (hasFlag) { //保存节点数据，同时展示clickNode的内容
                            this.createAndSaveNode(nodeMenu, nodeRelationship);
                            this.clickNode({
                                nodeType: nodeMenu.type,
                                visible: false
                            });
                        } else {
                            this.$message.error("请按照顺序拖拽节点！");
                            return;
                        }

                    } else if (nodeMenu.type === '5-1') { //生成图谱
                        var hasFlag = this.hasNode('4-2');
                        if (hasFlag) {
                            this.createAndSaveNode(nodeMenu, nodeRelationship);
                        } else {
                            this.$message.error("请按照顺序拖拽节点！");
                            return;
                        }
                    }
                }
            },
            hasNode(type) {
                var hasFlag = false;
                for (var da of this.data.nodeList) {
                    if (da.type == type) {
                        hasFlag = true;
                        return hasFlag;
                    }
                }
                return hasFlag;
            },
            createAndSaveNode(nodeMenu, nodeRelationship) {
                let fromNodeId = null;
                let nodeId = 'node' + (this.data.nodeList.length + 1);
                let left = nodeRelationship.left;
                let top = nodeRelationship.top;
                let _this = this;

                for (let existedNode of this.data.nodeList) { //existedNode
                    if (existedNode.type === nodeRelationship.from) {
                        left = nodeRelationship.left;
                        top = nodeRelationship.top;
                        fromNodeId = existedNode.id;
                        break;
                    }
                }
                let node = {
                    id: nodeId,
                    type: nodeMenu.type,
                    name: nodeMenu.name,
                    left: left + 'px',
                    top: top + 'px'
                }
                this.data.nodeList.push(node);
                this.$nextTick(function() {
                    _this.jsPlumb.addEndpoint(node.id);
                    if (fromNodeId != null) {
                        _this.lineConnect(fromNodeId, nodeId);
                    }
                    _this.updateProcessLoadToDb();
                });
            },
            // 是否具有该线
            hasLine(from, to) {
                for (let i = 0; i < this.data.lineList.length; i++) {
                    let line = this.data.lineList[i]
                    if (line.from === from && line.to === to) {
                        return true
                    }
                }
                return false
            },
            // 是否含有相反的线
            hashOppositeLine(from, to) {
                return this.hasLine(to, from)
            },
            nodeRightMenu(nodeId, evt) {
                this.menu.show = true
                this.menu.curNodeId = nodeId
                this.menu.left = evt.x + 'px'
                this.menu.top = evt.y + 'px'
            },
            deleteNode(nodeId) {
                let _this = this;
                this.$nextTick(function() {
                    console.log('删除' + nodeId)
                    _this.jsPlumb.remove(nodeId);
                    // _this.data.nodeList = _this.data.nodeList.filter(obj=> obj.id !== nodeId);
                    // _this.data.lineList = _this.jsPlumb.getConnections()
                    _this.updateProcessLoadToDb();
                });
            },
            hiddenNode() {
                this.thirdSearchConVisible = false;
                this.secondEchartVisible = false;
                this.thirdEchartVisible = false;
                this.thirdEditableTableVisible = false;
                this.fouthEchartVisible = false;
                this.fouthSecondVisible = false;
                this.selectFouthEchartVisible = false;
            },
            /**
             * 加载职业横向分类数据
             */
            getHorizontalCategoriesData() {
                let vm = this;
                loadHorizontalCategoriesData(this.modelLoadData.id).then(rep => {
                    this.thirdEditableTableVisible = true;
                    if (rep.code === 200) {
                        this.step3_tableDataList = rep.data;
                        for (let data of this.step3_tableDataList) {
                            data.showMoreVisible = true; //显示更多
                            vm.$set(data, 'showMoreVisible', true);
                        }
                    } else {
                        this.$message.error(rep.message);
                    }
                    this.panelLoading = false;
                }).catch(error => {
                    console.error(error);
                    this.panelLoading = false;
                })
            },
            clickNode(params) {
                let nodeType = params.nodeType;
                this.panelLoading = true;

                if (params.visible) {
                    return;
                }

                this.hiddenNode();
                if (nodeType === '1-1') { //第一节点：数据源，弹出对话框，选择来源
                    this.dialogVisible = true;
                    this.panelLoading = false;
                    this.modelLoadData.progress = 20;

                    //设定数据源中的时间范围
                    if (!this.modelLoadData.stepData1.start) {
                        var dates = new Date();
                        this.modelLoadData.stepData1.start = dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates
                            .getDate();
                    }
                    if (!this.modelLoadData.stepData1.end) {
                        var datee = new Date(new Date().setMonth(new Date().getMonth() + 1));
                        this.modelLoadData.stepData1.end = datee.getFullYear() + '-' + (datee.getMonth() + 1) + '-' + datee
                            .getDate();
                    }
                    debugger


                } else if (nodeType === '2-1') {
                    this.modelLoadData.progress = 40;
                    this.drawZEchart3();
                } else if (nodeType === '3-1') {
                    this.thirdEchartVisible = true;
                    this.modelLoadData.progress = 60;
                    this.drawThireTroubleEchart();
                } else if (nodeType === '3-2') { //职业横向分类
                    this.getHorizontalCategoriesData();
                    this.modelLoadData.progress = 60;
                } else if (nodeType === '4-1') { //纵向分级点状图
                    this.selectFouthEchartVisible = true;
                    if (this.modelLoadData.stepData4.verticalClassifications != null) {
                        this.drawPointEchart4();
                    } else {
                        this.panelLoading = false;
                    }
                    this.modelLoadData.progress = 80;
                } else if (nodeType === '4-2') { //纵向分级
                    this.fouthSecondVisible = true;
                    this.getGradedPositionsData();
                    this.modelLoadData.progress = 80;
                } else if (nodeType === '5-1') { //点击图谱
                    this.lastNodeResultVisible = true;
                    this.modelLoadData.progress = 100;
                    this.getTypicalJobDemandDto();
                }
            },
            dataReload() {
                this.panelLoading = true;
                // this.easyFlowVisible = false
                this.easyFlowVisible = true //
                    // this.data = data
                this.$nextTick(function() {
                    // this.jsPlumb = jsPlumb.getInstance()
                    this.jsPlumbInit();
                });
            },
            getTypicalJobDemandDto() {
                this.lastNodeResultVisibleLoading = true;

                loadTypicalJobDemandDto(this.modelLoadData.id).then(rep => {
                    this.panelLoading = false;
                    if (rep.code === 200) {
                        this.puxituData = rep.data;
                        for (let obj in this.puxituData) {
                            for (let jobNameInde in this.puxituData[obj].jobName) {
                                this.puxituData[obj]["data" + jobNameInde] = this.puxituData[obj].jobName[jobNameInde];
                            }
                        }
                        let newData = {
                            education: "",
                            experience: "",
                            salaryMonth: "",
                            verticalClassification: ""
                        }
                        for (let jobNameInde in this.step3_tableDataList) {
                            newData["data" + (this.step3_tableDataList[jobNameInde].topicNo - 1)] = [this.step3_tableDataList[
                                jobNameInde].name];
                        }
                        this.puxituData.push(newData);
                        this.lastNodeResultVisibleLoading = false;
                        // this.$refs.lastNodeDialogRef.visible = true;
                    } else {
                        this.$message.error(rep.message);
                    }

                }).catch(errpr => {
                    this.panelLoading = false;
                });
            },
            /**
             * 更新流程数据
             */
            updateProcessLoadToDb() {
                this.panelLoading = true;
                updateProcessModelData(this.modelLoadData.id, this.data).then(rep => {
                    this.panelLoading = false;
                    if (rep.code === 200) {
                        this.$message.success("保存流程数据成功！");
                    } else {
                        this.$message.error(rep.message);
                    }
                }).catch(reason => {
                    console.error(reason);
                    this.panelLoading = false;
                    this.$message.error("保存流程数据成功");
                });
            },
            changeLabel() {
                let lines = this.jsPlumb.getConnections({
                    source: 'nodeA',
                    target: 'nodeB'
                });
                lines[0].setLabel({
                    label: 'admin',
                    cssClass: 'labelClass a b'
                })
            },
            /**
             * 保存第一步数据
             * @param fromData
             */
            clickImportDataSource(fromData) {
                this.dialogVisible = false;
                this.panelLoading = true;
                this.data.nodeList.forEach(node => {
                    if (node.type === '1-1') {
                        node.name = "";
                        for (let i in this.modelLoadData.stepData1.source) {
                            if (node.name !== "") {
                                node.name += "/";
                            }
                            node.name += this.modelLoadData.stepData1.source[i];
                        }

                        if (node.name === "") {
                            node.name = "数据源";
                        }
                    }
                });

                // 保存数据到数据库
                updateStep1Data(this.modelLoadData.id, this.modelLoadData.stepData1, this.modelLoadData.progress).then(rep => {

                    this.panelLoading = false;
                    if (rep.code === 200) {
                        this.$message.success("保存成功！");
                    } else {
                        this.$message.error(rep.message);
                    }

                }).catch(reason => {
                    console.error(reason);
                    this.panelLoading = false;
                    this.$message.error("保存数据异常");
                });
            },
            //预览数据
            getPreviewDatas() {
                this.jobDialogVisible = true;

                this.jobLoading = true;
                var params = {
                    smallClassGroup: '汽车类专业群', //this.smallClassGroup,
                    start: this.modelLoadData.stepData1.start.indexOf('T') != -1 ? this.modelLoadData.stepData1.start.split(
                        "T")[0] : this.modelLoadData.stepData1.start,
                    end: this.modelLoadData.stepData1.end ? this.modelLoadData.stepData1.end.split("T")[0] : '',
                    city: this.modelLoadData.stepData1.city,
                    area: this.modelLoadData.stepData1.area,
                    pageNum: this.jobListQuery.pageNum,
                    pageSize: this.jobListQuery.pageSize
                };
                getPreviewDatas(params).then(rep => {
                    this.jobLoading = false;
                    this.jobTotal = rep.data.total;
                    this.jobTableData = rep.data.PositionInfo;
                }).catch(reason => {
                    this.jobLoading = false;
                    this.$message.error("数据异常");
                });

            },
            handleJobSizeChange(val) {
                this.jobListQuery.pageNum = 1;
                this.jobListQuery.pageSize = val;
                this.getPreviewDatas();
            },
            handleJobCurrentChange(val) {
                this.jobListQuery.pageNum = val;
                this.getPreviewDatas();
            },
            /**
             * 更新第一步名称
             * @param fromData
             */
            loadStepData1(fromData) {
                this.data.nodeList = _this.data.nodeList.filter(function(node) {
                    if (node.type === '1-1') {

                        let nameArr = fromData.source;
                        let strName = '';
                        for (let obj of nameArr) {
                            strName = strName + '/' + obj;
                        }
                        strName = strName.substring(1, strName.length);

                        node.name = strName;
                    }
                    return true;
                });
            },
            searchSecondEchart() {
                if (this.modelLoadData.stepData2.selectHorizontalCategories === null) {
                    this.$message.error("请选择分类数目!");
                } else if (this.modelLoadData.stepData2.selectBatchData === null) {
                    //赋值批次1
                    this.modelLoadData.stepData2.selectBatchData = 1;
                } else {
                    this.modelLoadData.progress = 40;
                    this.modelLoadData.stepData2.horizontalCategoriesData = [];
                    for (let key in this.horizontalCategoriesDatas) {
                        if (this.horizontalCategoriesDatas[key].value <= this.modelLoadData.stepData2.selectHorizontalCategories) {
                            this.modelLoadData.stepData2.horizontalCategoriesData.push(this.horizontalCategoriesDatas[key].value);
                        }
                    }
                    updateStep2Data(this.modelLoadData.id, this.modelLoadData.stepData2, this.modelLoadData.progress).then(
                        rep => {
                            this.panelLoading = false;
                            if (rep.code === 200) {
                                this.$message.success("生成横向趋势图数据成功！");
                                this.modelLoadData.stepData2.isCreateHorizontalCategoriesData = true;
                            } else {
                                this.$message.error(rep.message);
                            }
                        }).catch(reason => {
                        console.error(reason);
                        this.panelLoading = false;
                        this.$message.error("保存数据异常");
                    });
                }
            },
            searchFourthEchart() {
                let _this = this;
                if (this.modelLoadData.stepData4.verticalClassifications === null) {
                    this.$message.error("请先选择纵向分级数目！")
                } else {
                    this.searchFourthEchartBtnLoading = true;
                    this.pointNum = [];
                    for (let i = 0; i < this.modelLoadData.stepData4.verticalClassifications; i++) {
                        this.pointNum.push(i);
                    }
                    this.$nextTick(() => {
                        _this.drawPointEchart4();
                    });
                }
            },
            /**
             * 横向分类数值改变事件
             */
            Z(value) {
                console.log(value);

                let horizontalValue = 0;
                let batchValue = 1;

                for (let obj of this.secondtableData) {
                    if (horizontalValue < obj[value]) {
                        horizontalValue = obj[value];
                        batchValue = obj["batchData"];
                    }
                }

                this.modelLoadData.stepData2.selectBatchData = batchValue;

            },
            //行拖拽
            rowDrop() {
                const tbody = document.querySelector('.testTable .el-table__body-wrapper tbody')
                const _this = this;

                // Sortable.create(tbody, {
                //   onEnd({ newIndex, oldIndex }) {
                //     _this.changeIndexEnd(newIndex, oldIndex);
                //   }
                // })
                Sortable.create(tbody, {
                    onEnd({
                        newIndex,
                        oldIndex
                    }) {
                        // const currRow = _this.modelLoadData.stepData4.gradedPositionsDataList.splice(oldIndex, 1)[0]
                        // _this.modelLoadData.stepData4.gradedPositionsDataList.splice(newIndex, 0, currRow)
                        // 获取排序之后的data数据
                        _this.modelLoadData.stepData4.gradedPositionsDataList.splice(newIndex, 0, _this.modelLoadData.stepData4
                            .gradedPositionsDataList.splice(oldIndex, 1)[0])
                        var newArray = _this.modelLoadData.stepData4.gradedPositionsDataList.slice(0)
                        _this.modelLoadData.stepData4.gradedPositionsDataList = []
                        _this.$nextTick(function() {
                            _this.modelLoadData.stepData4.gradedPositionsDataList = newArray
                            this.changeStep4Data();
                        })
                    }
                })
            },
            changeIndexEnd(newI, oldI) {
                if (oldI < newI) {
                    do {
                        let oldData = this.modelLoadData.stepData4.gradedPositionsDataList[oldI];
                        let changeData = this.modelLoadData.stepData4.gradedPositionsDataList[(oldI + 1)];

                        this.modelLoadData.stepData4.gradedPositionsDataList[oldI] = changeData;
                        this.modelLoadData.stepData4.gradedPositionsDataList[(oldI + 1)] = oldData;

                        oldI = oldI + 1;

                    } while (oldI < newI);
                } else {

                    do {

                        let oldData = this.modelLoadData.stepData4.gradedPositionsDataList[oldI];
                        let changeData = this.modelLoadData.stepData4.gradedPositionsDataList[(oldI - 1)];

                        this.modelLoadData.stepData4.gradedPositionsDataList[oldI] = changeData;
                        this.modelLoadData.stepData4.gradedPositionsDataList[(oldI - 1)] = oldData;

                        oldI = oldI - 1;

                    } while (oldI > newI);

                }

                for (let i = 0; i < this.modelLoadData.stepData4.gradedPositionsDataList.length; i++) {
                    this.modelLoadData.stepData4.gradedPositionsDataList[i].verticalClassification = (i + 1);
                }
                // this.changeStep4Data();
            },
            drawZEchart3() {
                // let myChart = this.echarts.init(document.getElementById("secondNodeEchartId"));
                this.panelLoading = false;
                this.node2_1_loading = true;
                // // 绘制图表
                loadStep2Data(this.modelLoadData.id).then(rep => {
                    if (rep.code === 200) {
                        this.batchData = [];
                        let tableData = [];
                        for (let data in rep.data.batch) {
                            let objData = {
                                label: "批次" + rep.data.batch[data],
                                value: rep.data.batch[data]
                            }
                            this.batchData.push(objData);
                            let keyObject = {};
                            keyObject["batchData"] = rep.data.batch[data];
                            for (let key in rep.data.source) {
                                if (rep.data.source[key][data]) {
                                    keyObject[key] = rep.data.source[key][data].toFixed(7);
                                }
                            }
                            tableData.push(keyObject);
                        }
                        this.horizontalCategoriesDatas = [{
                            label: 1,
                            value: 1,
                            disabled: true
                        }];

                        for (let key in rep.data.source) {
                            this.horizontalCategoriesDatas.push({
                                label: key,
                                value: key,
                                disabled: false
                            });
                        }
                        this.secondtableData = tableData;
                        // myChart.setOption({
                        //   color: ['#009BFF','#67BFFF', '#9DD6FF'],
                        //   legend: {},
                        //   tooltip: {},
                        //   dataset: {
                        //     source: sourceData
                        //   },
                        //   xAxis: {type: 'category'},
                        //   yAxis: {},
                        //   series: [
                        //     {type: 'bar'},
                        //     {type: 'bar'},
                        //     {type: 'bar'}
                        //   ]
                        // });
                    } else {
                        this.$message.error(rep.message);
                    }

                    this.node2_1_loading = false;
                    this.secondEchartVisible = true;
                    this.thirdSearchConVisible = true;
                    this.secondEchartLoading = false;
                }).catch(rep => {
                    this.node2_1_loading = false;
                    this.secondEchartVisible = true;
                    this.thirdSearchConVisible = true;
                    console.error(rep);
                });
            },
            // 第四步的点状图
            drawPointEchart4() {
                this.fouthEchartVisible = true;
                this.forthEchartLoading = true;
                this.searchFourthEchartBtnLoading = true;
                this.modelLoadData.progress = 80;
                loadVerticalClassificationData(this.modelLoadData.id, this.modelLoadData.stepData4.verticalClassifications)
                    .then(rep => {
                        if (rep.code === 200) {
                            let verticalData = {};
                            this.forthEchartLoading = false;
                            for (const obj of rep.data) {

                                let id = "fourthPointEchartDivId_" + obj.verticalClassification;

                                if (verticalData[id] === undefined) {
                                    verticalData[id] = {
                                        "博士": [],
                                        "硕士": [],
                                        "本科": [],
                                        "大专": [],
                                        "高中": [],
                                        "中技": [],
                                        "中专": [],
                                        "初中及以下": []
                                    };
                                }
                                if (verticalData[id][obj.education] === undefined) {
                                    verticalData[id][obj.education] = [];
                                }
                                verticalData[id][obj.education].push([obj.salaryMonth, obj.experience]);
                            }

                            for (let i = 0; i < this.modelLoadData.stepData4.verticalClassifications; i++) {
                                let id = "fourthPointEchartDivId_" + i;
                                let createData = {
                                    "博士": [],
                                    "硕士": [],
                                    "本科": [],
                                    "大专": [],
                                    "高中": [],
                                    "中技": [],
                                    "中专": [],
                                    "初中及以下": []
                                };
                                for (let j = 0; j <= i; j++) {
                                    let id = "fourthPointEchartDivId_" + j;
                                    for (let key in verticalData[id]) {
                                        if (verticalData[id][key] !== undefined && verticalData[id][key].length > 0) {
                                            createData[key] = createData[key].concat(verticalData[id][key]);
                                        }
                                    }
                                }

                                let option = this.setPointEchartOption(createData, '纵向分级-' + (i + 1));
                                document.getElementById(id).style.display = "";
                                let myChart = this.echarts.init(document.getElementById(id));
                                myChart.setOption(option);

                            }
                        } else {
                            this.$message.error(rep.message);
                        }
                        this.getTypicalJobDemandDto();
                        this.panelLoading = false;
                        this.searchFourthEchartBtnLoading = false;
                    }).catch(error => {
                        this.panelLoading = false;
                        this.searchFourthEchartBtnLoading = false;
                        console.error(error);
                    })

            },
            setPointEchartOption(data, titleIndex) {
                return {
                    title: {
                        x: 'center',
                        text: titleIndex
                    },
                    legend: {
                        right: 0,
                        y: 'bottom',
                        padding: 0,
                        data: ['博士', '硕士', '本科', '大专', '高中', '中技', '中专', '初中及以下']
                    },
                    grid: {
                        left: '3%',
                        right: '20%',
                        bottom: '6%',
                        containLabel: true
                    },
                    xAxis: {
                        name: '薪资（k）',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        scale: true
                    },
                    yAxis: {
                        name: '经验（年）',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        scale: true
                    },
                    series: [{
                        name: '博士',
                        data: data['博士'],
                        type: 'scatter',
                        symbolSize: 15,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            color: '#EE0000'
                        }
                    }, {
                        name: '硕士',
                        data: data['硕士'],
                        type: 'scatter',
                        symbolSize: 15,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            color: '#FF7D00'
                        }
                    }, {
                        name: '本科',
                        data: data['本科'],
                        type: 'scatter',
                        symbolSize: 15,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            color: '#F6CE00'
                        }
                    }, {
                        name: '大专',
                        data: data['大专'],
                        type: 'scatter',
                        symbolSize: 15,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            color: '#94DF00'
                        }
                    }, {
                        name: '高中',
                        data: data['高中'],
                        type: 'scatter',
                        symbolSize: 15,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            color: '#00B54E'
                        }
                    }, {
                        name: '中技',
                        data: data[5],
                        type: 'scatter',
                        symbolSize: 15,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            color: '#00D5D2'
                        }
                    }, {
                        name: '中专',
                        data: data['中专'],
                        type: 'scatter',
                        symbolSize: 15,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            color: '#0083FF'
                        }
                    }, {
                        name: '初中及以下',
                        data: data['初中及以下'],
                        type: 'scatter',
                        symbolSize: 15,
                        emphasis: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            color: '#A743EE'
                        }
                    }]
                }
            },
            // 第三个节点的双饼图
            drawThireTroubleEchart() {
                this.panelLoading = true;
                $("#ldavis_third_id").html("");
                window.d3 = d3;
                this.thirdEchartVisible = true;
                loadLdavisData(this.modelLoadData.id).then(rep => {
                    this.panelLoading = false;
                    if (rep.code === 200) {
                        LDAvis("#" + "ldavis_third_id", JSON.parse(rep.data));
                    } else {
                        this.$message.error(rep.message);
                    }

                }).catch(error => {
                    console.error(error);
                    this.panelLoading = false;
                });

            },
            /**
             * 修改
             */
            changeThirdEditableTableVisibleName(topicNo, name) {
                updateHorizontalCategoriesData(this.modelLoadData.id, topicNo, name).then(rep => {

                    if (rep.code === 200) {
                        this.$message.success("保存成功！");
                    } else {
                        this.$message.error(rep.message);
                    }
                }).catch(error => {
                    console.error(error);
                });
            },
            /**
             * 修改分级岗位数据
             */
            changeStep4Data() {
                updateStep4Data(this.modelLoadData.id, this.modelLoadData.stepData4, 80).then(rep => {

                    if (rep.code === 200) {
                        this.$message.success("保存成功！");
                    } else {
                        this.$message.error(rep.message);
                    }
                }).catch(error => {
                    console.error(error);
                });
            },
            /**
             * 获取分级岗位数据
             */
            getGradedPositionsData() {
                loadGradedPositionsData(this.modelLoadData.id).then(rep => {
                    if (rep.code === 200) {
                        this.modelLoadData.stepData4.gradedPositionsDataList = rep.data;
                    } else {
                        this.$message.error(rep.message);
                    }
                    this.panelLoading = false;
                }).catch(error => {
                    this.panelLoading = false;
                    console.error(error);
                });
            },
            exportPuxituTable() {
                let name = "职业谱系图.xlsx"
                if (this.modelLoadData.name) {
                    name = this.modelLoadData.name + "-" + name
                }
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.getElementById("puxituDataTable"))
                    /* get binary string as output */
                var wbout = XLSX.write(wb, {
                    bookType: 'xlsx',
                    bookSST: true,
                    type: 'array'
                })
                try {
                    FileSaver.saveAs(new Blob([wbout], {
                        type: 'application/vnd.ms-excel'
                    }), name)
                } catch (e) {
                    if (typeof console !== 'undefined') console.log(e, wbout)
                }
                return wbout
            }
        }
    }
</script>

<style scoped>
    @import "./../../../assets/css/sysDen/createModel.css";
    #flowContainer {
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
        /* height: 500px; */
        position: relative;
        background-image: url('./grid.png');
        background-color: #F5F7F9;
        background-size: 30px 30px;
        background-repeat: repeat;
    }
    
    .labelClass {
        background-color: white;
        padding: 5px;
        opacity: 0.7;
        border: 1px solid #346789;
        /*border-radius: 10px;*/
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    .zZindex {
        z-index: 3333;
    }
    
    .el-table>>>thead.is-group th {
        background: linear-gradient(180deg, #F4F6FF 0%, #E1E3E9 100%);
    }
</style>