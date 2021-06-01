<template>
    <el-container class="den-wrap h100p">
        <el-container class="h100p w100p">
            <el-header style="height: 80px;">
                <img src="../../assets/images/header/title_left_icon.png" alt="" @click="$router.push('/loginNav')"
                    width="64" height="64" style="float:left;margin-top:7px;">
                <img src="../../assets/images/header/headtitle3.png" alt="" @click="$router.push('/loginNav')"
                    height="80" style="float:center;">
                <div class="header-right-login-msg-div">
                    <span class="redIcon"></span>
                    <span class="el-icon-user "> 管理员 | 张三</span>
                    <img src="../../assets/images/sysEchart/logoutIcon.png" alt="" />
                    <el-button type="text" class="loginButton" @click="loginOut"> 退出登录</el-button>
                </div>
            </el-header>
            <el-main class="job_main_container" style="height:120%;">
                <el-row :gutter="20" style='height: 120%!important;' class="job-echart_container">
                    <el-col :span="8" class=" h100p" style="padding-left:30px;">
                        <el-container class=" h100p">
                            <el-header class=" p20 div-border-shadow mb20" style="height:50%;">
                                <el-container class=" h100p">
                                    <el-header class="job-unit-title-div ">
                                        <span class="tringle-red-icon"></span>专业就业排名</el-header>
                                    <el-main>
                                        <div id="myChart1" style="height: 100%"></div>
                                    </el-main>
                                </el-container>
                            </el-header>
                            <el-main class="div-border-shadow h100p">
                                <el-container class=" h100p">
                                    <el-header class="job-unit-title-div">
                                        <span class="tringle-red-icon"></span>专业平均薪酬排名</el-header>
                                    <el-main>
                                        <div id="myChart2" style="height: 100%"></div>
                                    </el-main>
                                </el-container>
                            </el-main>
                        </el-container>
                    </el-col>
                    <el-col :span="8" class=" h100p">
                        <el-container class=" h100p">
                            <el-header style="height:70px;" class="row-four-number-unit mb20">
                                <el-row :gutter="20" class=" h100p" style="margin:0;color:white;">
                                    <el-col :span="6" class=" h100p">
                                        <el-header class="f-unit-header">
                                            <span class="title">院校数据</span>
                                        </el-header>
                                        <el-main class="f-unit-main">
                                            <span class="number">{{schoolNum}}</span>
                                        </el-main>
                                    </el-col>
                                    <el-col :span="6" class=" h100p">
                                        <el-header class="f-unit-header">
                                            <span class="title">企业数据</span>
                                        </el-header>
                                        <el-main class="f-unit-main">
                                            <span class="number">{{enterpriseNum}}</span>
                                        </el-main>
                                    </el-col>
                                    <el-col :span="6" class=" h100p">
                                        <el-header class="f-unit-header">
                                            <span class="title">岗位数据</span>
                                        </el-header>
                                        <el-main class="f-unit-main">
                                            <span class="number">{{positionNum}}</span>
                                        </el-main>
                                    </el-col>
                                    <el-col :span="6" class=" h100p">
                                        <el-header class="f-unit-header">
                                            <span class="title">行业数据</span>
                                        </el-header>
                                        <el-main class="f-unit-main">
                                            <span class="number">{{industryNum}}</span>
                                        </el-main>
                                    </el-col>
                                </el-row>
                            </el-header>
                            <el-header style="height:40%;" class="div-border-shadow mb20">
                                <el-container class=" h100p">
                                    <el-header class="job-unit-title-div p20">
                                        <span class="tringle-red-icon"></span>行业就业排名</el-header>
                                    <el-main>
                                        <div id="myChart4" style="height: 100%"></div>
                                    </el-main>
                                </el-container>
                            </el-header>
                            <el-main class="div-border-shadow h100p">
                                <el-container class=" h100p">
                                    <el-header class="job-unit-title-div">
                                        <span class="tringle-red-icon"></span>就业岗位地域排名</el-header>
                                    <el-main>
                                        <div id="myChart3" style="height: 100%"></div>
                                    </el-main>
                                </el-container>
                            </el-main>
                        </el-container>
                    </el-col>
                    <el-col :span="8" class=" h100p" style="padding-right:30px;">
                        <el-container class=" h100p">
                            <el-header style="height:50%;" class="div-border-shadow mb20 p20">
                                <el-container class=" h100p">
                                    <el-header class="job-unit-title-div">
                                        <span class="tringle-red-icon"></span>行业分布情况</el-header>
                                    <el-main>
                                        <div id="myChart5" style="height: 100%"></div>
                                    </el-main>
                                </el-container>
                            </el-header>

                            <el-main class="div-border-shadow h100p">
                                <el-container class=" h100p">
                                    <el-header class="job-unit-title-div">
                                        <span class="tringle-red-icon"></span>主流招聘网站近两年招聘职位量</el-header>
                                    <el-main>
                                        <div id="myChart6" style="height: 100%"></div>
                                    </el-main>
                                </el-container>
                            </el-main>
                        </el-container>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="job-table-container">
                    <el-col :span="12" class=" h100p" style="padding-left:0px;">
                        <el-container class="mb20 unit_table_container div-border-shadow">
                            <el-header class="job-unit-title-div" style="height:50%;">
                                <span class="tringle-red-icon"></span>院校开设专业
                            </el-header>
                            <el-main class="table_div">
                                <el-form :inline="true" :model="listQueryOne" class="demo-form-inline unit-search-form">
                                    <el-form-item label="院校名称">
                                        <el-input v-model="listQueryOne.schoolName" placeholder="院校名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="专业名称" class="mr0">
                                        <el-input v-model="listQueryOne.professionName" placeholder="专业名称"></el-input>
                                    </el-form-item>
                                    <el-form-item class="mr0">
                                        <el-button type="primary" @click="onSubmit1" class="searchBtn">查询</el-button>
                                    </el-form-item>
                                    <el-form-item class="mr0">
                                        <el-button type="primary" @click="reset1" class="searchBtn">重置</el-button>
                                    </el-form-item>
                                </el-form>
                                <el-table :show-header="true" stripe class="job_dark_table" :data="formListOne"
                                    height="430px" style="width: 100%">
                                    <el-table-column prop="schoolName" label="院校名称" width="180">
                                    </el-table-column>
                                    <el-table-column prop="schoolCode" label="院校识别码" width="180">
                                    </el-table-column>
                                    <el-table-column prop="majorName" label="专业名称">
                                    </el-table-column>
                                    <el-table-column prop="majorCode" label="专业代码">
                                    </el-table-column>
                                </el-table>
                            </el-main>
                            <el-footer class="job_footer" height="40px">
                                <el-pagination background @size-change="handleSizeChangeOne"
                                    @current-change="handleCurrentChangeOne"
                                    layout="total, sizes,prev, pager, next,jumper" :pager-count="5"
                                    :page-size="listQueryOne.pageSize" :page-sizes="[4,8,16]"
                                    :current-page.sync="listQueryOne.pageNum" :total="totalOne">
                                </el-pagination>
                            </el-footer>
                        </el-container>
                        <el-container class="mb20 unit_table_container div-border-shadow">
                            <el-header class="job-unit-title-div" style="height:50%;">
                                <span class="tringle-red-icon"></span>岗位信息</el-header>
                            <el-main class="table_div">
                                <el-form :inline="true" :model="listQueryThree"
                                    class="demo-form-inline unit-search-form">
                                    <el-form-item label="岗位名称">
                                        <el-input v-model="listQueryThree.keywords" placeholder="岗位名称"></el-input>
                                    </el-form-item>

                                    <el-form-item label="公司名称" class="mr0">
                                        <el-input v-model="listQueryThree.companyName" placeholder="公司名称"></el-input>
                                    </el-form-item>
                                    <el-form-item class="mr0">
                                        <el-button type="primary" @click="onSubmit3" class="searchBtn">查询</el-button>
                                    </el-form-item>
                                    <el-form-item class="mr0">
                                        <el-button type="primary" @click="reset3" class="searchBtn">重置</el-button>
                                    </el-form-item>
                                </el-form>
                                <el-table :show-header="false" height="430px" :data="formListThree"
                                    class="job_dark_msg_table" style="width: 100%">
                                    <el-table-column prop="positionTitle" label="岗位名称">
                                    </el-table-column>
                                    <el-table-column prop="companyName" label="公司名称">
                                    </el-table-column>
                                    <el-table-column prop="salary" label="薪资" width="120">
                                    </el-table-column>
                                    <el-table-column prop="companyAddr" label="地区" width="120">
                                    </el-table-column>
                                    <el-table-column prop="createTime" label="发布时间" :formatter="dateFormat" width="120">
                                    </el-table-column>
                                    <el-table-column label="详细信息" width="120">
                                        <template slot-scope="scope">
                                            <a :href="scope.row.positionUrl" target="_blank"
                                                class="buttonText">点击查看详情</a>
                                        </template>
</el-table-column>
</el-table>
</el-main>
<el-footer class="job_footer" height="40px">
    <el-pagination background @size-change="handleSizeChangeThree" @current-change="handleCurrentChangeThree" layout="total, sizes,prev, pager, next,jumper" :page-size="listQueryThree.pageSize" :page-sizes="[4,8,16]" :pager-count="5" :current-page.sync="listQueryThree.pageNumMore"
        :total="totalThree">
    </el-pagination>
</el-footer>
</el-container>
<!-- <el-container  class="mb20 unit_table_container div-border-shadow">
                            <el-header class="job-unit-title-div" style="height:50%;">
                                <span class="tringle-red-icon"></span>人的数据</el-header>
                            <el-main class="table_div" >
                            </el-main>
                        </el-container> -->
</el-col>
<el-col :span="12" class=" h100p" style="padding-right:0px;height:1200px;">
    <el-container class="mb20 unit_table_container div-border-shadow">
        <el-header class="job-unit-title-div" style="height:50%;">
            <span class="tringle-red-icon"></span>企业信息</el-header>
        <el-main class="table_div">
            <el-form :inline="true" :model="listQueryFour" class="demo-form-inline unit-search-form">
                <el-form-item label="企业名称" class="mr0">
                    <el-input v-model="listQueryFour.company" placeholder="企业名称"></el-input>
                </el-form-item>
                <el-form-item class="mr0">
                    <el-button type="primary" @click="onSubmit4" class="searchBtn">查询</el-button>
                </el-form-item>
                <el-form-item class="mr0">
                    <el-button type="primary" @click="reset4" class="searchBtn">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :show-header="true" class="job_dark_table" :data="formListFour" style="width: 100%" height="430px">
                <el-table-column prop="enterprise" label="公司名称">
                </el-table-column>
                <el-table-column prop="creditCode" label="统一社会信用代码">
                </el-table-column>
                <el-table-column prop="province" label="所在地区">
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer class="job_footer" height="40px">
            <el-pagination background @size-change="handleSizeChangeFour" @current-change="handleCurrentChangeFour" layout="total, sizes,prev, pager, next,jumper" :page-size="listQueryFour.pageSize" :page-sizes="[4,8,16]" :pager-count="5" :current-page.sync="listQueryFour.pageNum"
                :total="totalFour">
            </el-pagination>
        </el-footer>

    </el-container>
    <el-container class="mb20 unit_table_container div-border-shadow">
        <el-header class="job-unit-title-div" style="height:50%;color:white">
            <span class="tringle-red-icon"></span>行业资讯</el-header>
        <el-main class="table_div">
            <el-form :inline="true" :model="listQueryTwo" class="demo-form-inline unit-search-form">
                <el-form-item label="标题名称" class="mr0">
                    <el-input v-model="listQueryTwo.title" placeholder="标题名称"></el-input>
                </el-form-item>

                <!--<el-form-item label="活动区域">
                                        <el-select v-model="formInline.region" placeholder="活动区域">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>-->
                <el-form-item class="mr0">
                    <el-button type="primary" @click="onSubmit2" class="searchBtn">查询</el-button>
                </el-form-item>
                <el-form-item class="mr0">
                    <el-button type="primary" @click="reset2" class="searchBtn">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :show-header="false" height="430px" class="job_dark_msg_table" :data="formListTwo" style="width: 100%">
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop="publishDate" :formatter="dateFormat" label="发布时间" width="120">
                </el-table-column>
                <el-table-column label="发布平台" width="160">
                    <template slot-scope="scope">
                                            <p v-if="scope.row.platform=='chexun'">车讯网</p>
                                            <p v-if="scope.row.platform=='pcauto'">太平洋汽车网</p>
                                            <p v-if="scope.row.platform=='gasgoo'">盖世汽车资讯</p>
                                            <p v-if="scope.row.platform=='bitauto'">易车网</p>
                                        </template>
                </el-table-column>
                <el-table-column width="180" label="详细信息">
                    <template slot-scope="scope">
                                            <a :href="scope.row.url" target="_blank" class="buttonText">点击查看详情</a>
                                        </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer class="job_footer" height="40px">
            <el-pagination background @size-change="handleSizeChangeTwo" @current-change="handleCurrentChangeTwo" layout="total, sizes,prev, pager, next,jumper" :page-size="listQueryTwo.pageSize" :page-sizes="[4,8,16]" :pager-count="5" :current-page.sync="listQueryTwo.pageNum"
                :total="totalTwo">
            </el-pagination>
        </el-footer>
    </el-container>
</el-col>
</el-row>
</el-main>
</el-container>
</el-container>
</template>

<script>
    import {
        getProfessionRank,
        getSchoolData,
        getNewsData,
        getPositionInfoData,
        getEnterpriseData
    } from '@/api/showAPI'
    import dataManagePositionInfo from '@/api/dataManageZhuanYeQun';
    import '../../../node_modules/echarts/map/js/china.js'
    import store from "@/store";
    import NProgress from 'nprogress'

    const defaultListQueryOne = {
        pageNum: 1,
        pageSize: 8,
        schoolName: '',
        professionName: ''
    }
    const defaultListQueryTwo = {
        pageNum: 1,
        pageSize: 8,
        title: ''
    }
    const defaultListQueryThree = {
        pageNum: 0,
        pageSize: 8,
        keywords: '',
        companyName: ''
    }
    const defaultListQueryFour = {
        pageNum: 1,
        pageSize: 8,
        company: ''
    }
    export default {
        name: "index",
        components: {},
        data() {
            return {
                activeName: 'accountManagement',
                tabIndex: 0,
                localData: {},
                tabBox: {},
                value: [],
                formInline: {
                    user: '',
                    region: ''
                },
                listQueryOne: Object.assign({}, defaultListQueryOne),
                listQueryTwo: Object.assign({}, defaultListQueryTwo),
                listQueryThree: Object.assign({}, defaultListQueryThree),
                listQueryFour: Object.assign({}, defaultListQueryFour),
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                clientHeight: 0,
                formInline: {
                    user: '',
                    region: ''
                },
                formListOne: null,
                formListTwo: null,
                formListThree: null,
                formListFour: null,
                totalOne: null,
                totalTwo: null,
                totalThree: null,
                totalFour: null,
                listLoading: true,
                schoolNum: 0,
                enterpriseNum: 0,
                industryNum: 0,
                positionNum: 0,
                geoCoordMap: {
                    "合肥": [117.17, 31.52],
                    "安庆": [117.02, 30.31],
                    "蚌埠": [117.21, 32.56],
                    "亳州": [115.47, 33.52],
                    "巢湖": [117.52, 31.36],
                    "滁州": [118.18, 32.18],
                    "阜阳": [115.48, 32.54],
                    "贵池": [117.28, 30.39],
                    "淮北": [116.47, 33.57],
                    "淮南": [116.58, 32.37],
                    "黄山": [118.18, 29.43],
                    "界首": [115.21, 33.15],
                    "六安": [116.28, 31.44],
                    "马鞍山": [118.28, 31.43],
                    "明光": [117.58, 32.47],
                    "宿州": [116.58, 33.38],
                    "天长": [118.59, 32.41],
                    "铜陵": [117.48, 30.56],
                    "芜湖": [118.22, 31.19],
                    "宣州": [118.44, 30.57],
                    "澳门": [115.07, 21.33],
                    "北京": [116.24, 39.55],
                    "福州": [119.18, 26.05],
                    "长乐": [119.31, 25.58],
                    "福安": [119.39, 27.06],
                    "福清": [119.23, 25.42],
                    "建瓯": [118.2, 27.03],
                    "建阳": [118.07, 27.21],
                    "晋江": [118.35, 24.49],
                    "龙海": [117.48, 24.26],
                    "龙岩": [117.01, 25.06],
                    "南安": [118.23, 24.57],
                    "南平": [118.1, 26.38],
                    "宁德": [119.31, 26.39],
                    "莆田": [119.01, 24.26],
                    "泉州": [118.36, 24.56],
                    "三明": [117.36, 26.13],
                    "邵武": [117.29, 27.2],
                    "石狮": [118.38, 24.44],
                    "武夷山": [118.02, 27.46],
                    "厦门": [118.06, 24.27],
                    "永安": [117.23, 25.58],
                    "漳平": [117.24, 25.17],
                    "漳州": [117.39, 24.31],
                    "兰州": [103.51, 36.04],
                    "白银": [104.12, 36.33],
                    "敦煌": [94.41, 40.08],
                    "嘉峪关": [98.14, 39.48],
                    "金昌": [102.1, 38.28],
                    "酒泉": [98.31, 39.44],
                    "临夏": [103.12, 35.37],
                    "平凉": [106.4, 35.32],
                    "天水": [105.42, 34.37],
                    "武威": [102.39, 37.56],
                    "西峰": [107.4, 35.45],
                    "玉门": [97.35, 39.49],
                    "张掖": [100.26, 38.56],
                    "广州": [113.14, 23.08],
                    "潮阳": [116.36, 23.16],
                    "潮州": [116.38, 23.4],
                    "澄海": [116.46, 23.28],
                    "从化": [113.33, 23.33],
                    "东莞": [113.45, 23.02],
                    "恩平": [112.19, 22.12],
                    "佛山": [113.06, 23.02],
                    "高明": [112.5, 22.53],
                    "高要": [112.26, 23.02],
                    "高州": [110.5, 21.54],
                    "鹤山": [112.57, 22.46],
                    "河源": [114.41, 23.43],
                    "花都": [113.12, 23.23],
                    "化州": [110.37, 21.39],
                    "惠阳": [114.28, 22.48],
                    "惠州": [114.22, 23.05],
                    "江门": [113.04, 22.35],
                    "揭阳": [116.21, 22.32],
                    "开平": [112.4, 22.22],
                    "乐昌": [113.21, 25.09],
                    "雷州": [110.04, 20.54],
                    "廉江": [110.17, 21.37],
                    "连州": [112.23, 24.48],
                    "罗定": [111.33, 22.46],
                    "茂名": [110.53, 21.4],
                    "梅州": [116.07, 24.19],
                    "南海": [113.09, 23.01],
                    "番禺": [113.22, 22.57],
                    "普宁": [116.1, 23.18],
                    "清远": [113.01, 23.42],
                    "三水": [112.52, 23.1],
                    "汕头": [116.41, 23.22],
                    "汕尾": [115.21, 22.47],
                    "韶关": [113.37, 24.48],
                    "深圳": [114.07, 22.33],
                    "顺德": [113.15, 22.5],
                    "四会": [112.41, 23.21],
                    "台山": [112.48, 22.15],
                    "吴川": [110.47, 21.26],
                    "新会": [113.01, 22.32],
                    "兴宁": [115.43, 24.09],
                    "阳春": [111.48, 22.1],
                    "阳江": [111.58, 21.5],
                    "英德": [113.22, 24.1],
                    "云浮": [112.02, 22.57],
                    "增城": [113.49, 23.18],
                    "湛江": [110.24, 21.11],
                    "肇庆": [112.27, 23.03],
                    "中山": [113.22, 22.31],
                    "珠海": [113.34, 22.17],
                    "南宁": [108.19, 22.48],
                    "北海": [109.07, 21.28],
                    "北流": [110.21, 22.42],
                    "百色": [106.36, 23.54],
                    "防城港": [108.2, 21.37],
                    "贵港": [109.36, 23.06],
                    "桂林": [110.17, 25.17],
                    "桂平": [110.04, 23.22],
                    "河池": [108.03, 24.42],
                    "合山": [108.52, 23.47],
                    "柳州": [109.24, 23.19],
                    "赁祥": [106.44, 22.07],
                    "钦州": [108.37, 21.57],
                    "梧州": [111.2, 23.29],
                    "玉林": [110.09, 22.38],
                    "宜州": [108.4, 24.28],
                    "贵阳": [106.42, 26.35],
                    "安顺": [105.55, 26.14],
                    "毕节": [105.18, 27.18],
                    "赤水": [105.42, 28.34],
                    "都匀": [107.31, 26.15],
                    "凯里": [107.58, 26.35],
                    "六盘水": [104.5, 26.35],
                    "清镇": [106.27, 26.33],
                    "铜仁": [109.12, 27.43],
                    "兴义": [104.53, 25.05],
                    "遵义": [106.55, 27.42],
                    "海口": [110.2, 20.02],
                    "儋州": [109.34, 19.31],
                    "琼海": [110.28, 19.14],
                    "琼山": [110.21, 19.59],
                    "三亚": [109.31, 18.14],
                    "通什": [109.31, 18.46],
                    "石家庄": [114.3, 38.02],
                    "安国": [115.2, 38.24],
                    "保定": [115.3, 38.51],
                    "霸州": [116.24, 39.06],
                    "泊头": [116.34, 38.04],
                    "沧州": [116.52, 38.18],
                    "承德": [117.57, 40.59],
                    "定州": [115, 38.3],
                    "丰南": [118.06, 39.34],
                    "高碑店": [115.51, 39.2],
                    "蒿城": [114.5, 38.02],
                    "邯郸": [114.28, 36.36],
                    "河间": [116.05, 38.26],
                    "衡水": [115.42, 37.44],
                    "黄骅": [117.21, 38.21],
                    "晋州": [115.02, 38.02],
                    "冀州": [115.33, 37.34],
                    "廓坊": [116.42, 39.31],
                    "鹿泉": [114.19, 38.04],
                    "南宫": [115.23, 37.22],
                    "秦皇岛": [119.35, 39.55],
                    "任丘": [116.07, 38.42],
                    "三河": [117.04, 39.58],
                    "沙河": [114.3, 36.51],
                    "深州": [115.32, 38.01],
                    "唐山": [118.11, 39.36],
                    "武安": [114.11, 36.42],
                    "邢台": [114.3, 37.04],
                    "辛集": [115.12, 37.54],
                    "新乐": [114.41, 38.2],
                    "张家口": [114.53, 40.48],
                    "涿州": [115.59, 39.29],
                    "遵化": [117.58, 40.11],
                    "郑州": [11340, 34.46],
                    "安阳": [114.21, 36.06],
                    "长葛": [113.47, 34.12],
                    "登封": [113.02, 34.27],
                    "邓州": [112.05, 32.42],
                    "巩义": [112.58, 34.46],
                    "鹤壁": [114.11, 35.54],
                    "辉县": [113.47, 35.27],
                    "焦作": [113.12, 35.14],
                    "济源": [112.35, 35.04],
                    "开封": [114.21, 34.47],
                    "灵宝": [110.52, 34.31],
                    "林州": [113.49, 36.03],
                    "漯河": [114.02, 33.33],
                    "洛阳": [112.27, 34.41],
                    "南阳": [112.32, 33],
                    "平顶山": [113.17, 33.44],
                    "濮阳": [115.01, 35.44],
                    "沁阳": [112.57, 35.05],
                    "汝州": [112.5, 34.09],
                    "三门峡": [111.12, 34.47],
                    "商丘": [115.38, 34.26],
                    "卫辉": [114.03, 35.24],
                    "舞钢": [113.3, 33.17],
                    "项城": [114.54, 33.26],
                    "荥阳": [113.21, 34.46],
                    "新密": [113.22, 34.31],
                    "新乡": [113.52, 35.18],
                    "信阳": [114.04, 32.07],
                    "新郑": [113.43, 34.24],
                    "许昌": [113.49, 34.01],
                    "偃师": [112.47, 34.43],
                    "义马": [111.55, 34.43],
                    "禹州": [113.28, 34.09],
                    "周口": [114.38, 33.37],
                    "驻马店": [114.01, 32.58],
                    "哈尔滨": [126.36, 45.44],
                    "阿城": [126.58, 45.32],
                    "安达": [125.18, 46.24],
                    "北安": [126.31, 48.15],
                    "大庆": [125.01, 46.36],
                    "富锦": [132.02, 47.15],
                    "海林": [129.21, 44.35],
                    "海伦": [126.57, 47.28],
                    "鹤岗": [130.16, 47.2],
                    "黑河": [127.29, 50.14],
                    "佳木斯": [130.22, 46.47],
                    "鸡西": [130.57, 45.17],
                    "密山": [131.5, 45.32],
                    "牡丹江": [129.36, 44.35],
                    "讷河": [124.51, 48.29],
                    "宁安": [129.28, 44.21],
                    "齐齐哈尔": [123.57, 47.2],
                    "七台河": [130.49, 45.48],
                    "双城": [126.15, 45.22],
                    "尚志": [127.55, 45.14],
                    "双鸭山": [131.11, 46.38],
                    "绥芬河": [131.11, 44.25],
                    "绥化": [126.59, 46.38],
                    "铁力": [128.01, 46.59],
                    "同江": [132.3, 47.39],
                    "五常": [127.11, 44.55],
                    "五大连池": [126.07, 48.38],
                    "伊春": [128.56, 47.42],
                    "肇东": [125.58, 46.04],
                    "武汉": [114.17, 30.35],
                    "安陆": [113.41, 31.15],
                    "当阳": [111.47, 30.5],
                    "丹江口": [108.3, 32.33],
                    "大冶": [114.58, 30.06],
                    "恩施": [109.29, 30.16],
                    "鄂州": [114.52, 30.23],
                    "广水": [113.48, 31.37],
                    "洪湖": [113.27, 29.48],
                    "黄石": [115.06, 30.12],
                    "黄州": [114.52, 30.27],
                    "荆门": [112.12, 31.02],
                    "荆沙": [112.16, 30.18],
                    "老河口": [111.4, 32.23],
                    "利川": [108.56, 30.18],
                    "麻城": [115.01, 31.1],
                    "浦圻": [113.51, 29.42],
                    "潜江": [112.53, 30.26],
                    "石首": [112.24, 29.43],
                    "十堰": [110.47, 32.4],
                    "随州": [113.22, 31.42],
                    "天门": [113.1, 60.39],
                    "武穴": [115.33, 29.51],
                    "襄樊": [112.08, 32.02],
                    "咸宁": [114.17, 29.53],
                    "仙桃": [113.27, 30.22],
                    "孝感": [113.54, 30.56],
                    "宜昌": [111.17, 30.42],
                    "宜城": [112.15, 31.42],
                    "应城": [113.33, 30.57],
                    "枣阳": [112.44, 32.07],
                    "枝城": [111.27, 30.23],
                    "钟祥": [112.34, 31.1],
                    "长沙": [112.59, 28.12],
                    "常德": [111.51, 29.02],
                    "郴州": [113.02, 25.46],
                    "衡阳": [112.37, 26.53],
                    "洪江": [109.59, 27.07],
                    "怀化": [109.58, 27.33],
                    "凉山": [102.27, 27.90],
                    "湘西": [109.73, 28.32],
                    "抚州": [116.35, 28.00],
                    "津市": [111.52, 29.38],
                    "吉首": [109.43, 28.18],
                    "耒阳": [112.51, 26.24],
                    "冷水江": [111.26, 27.42],
                    "冷水滩": [111.35, 26.26],
                    "涟源": [111.41, 27.41],
                    "醴陵": [113.3, 27.4],
                    "临湘": [113.27, 29.29],
                    "浏阳": [113.37, 28.09],
                    "娄底": [111.59, 27.44],
                    "汨罗": [113.03, 28.49],
                    "韶山": [112.29, 27.54],
                    "邵阳": [111.28, 27.14],
                    "武冈": [110.37, 26.43],
                    "湘潭": [112.53, 27.52],
                    "湘乡": [112.31, 27.44],
                    "益阳": [112.2, 28.36],
                    "永州": [111.37, 26.13],
                    "沅江": [112.22, 28.5],
                    "岳阳": [113.06, 29.22],
                    "张家界": [110.29, 29.08],
                    "株洲": [113.09, 27.51],
                    "资兴": [113.13, 25.58],
                    "长春": [125.19, 43.54],
                    "白城": [122.5, 45.38],
                    "白山": [126.26, 41.56],
                    "大安": [124.18, 45.3],
                    "德惠": [125.42, 44.32],
                    "敦化": [128.13, 43.22],
                    "公主岭": [124.49, 43.31],
                    "和龙": [129, 42.32],
                    "桦甸": [126.44, 42.58],
                    "珲春": [130.22, 42.52],
                    "集安": [126.11, 41.08],
                    "蛟河": [127.21, 43.42],
                    "吉林": [126.33, 43.52],
                    "九台": [125.51, 44.09],
                    "辽源": [125.09, 42.54],
                    "临江": [126.53, 41.49],
                    "龙井": [129.26, 42.46],
                    "梅河口": [125.4, 42.32],
                    "舒兰": [126.57, 44.24],
                    "四平": [124.22, 43.1],
                    "松原": [124.49, 45.11],
                    "洮南": [122.47, 45.2],
                    "通化": [125.56, 41.43],
                    "图们": [129.51, 42.57],
                    "延吉": [129.3, 42.54],
                    "愉树": [126.32, 44.49],
                    "南京": [118.46, 32.03],
                    "常熟": [120.43, 31.39],
                    "常州": [119.58, 31.47],
                    "丹阳": [119.32, 32],
                    "东台": [120.19, 32.51],
                    "高邮": [119.27, 32.47],
                    "海门": [121.09, 31.53],
                    "淮安": [119.09, 33.3],
                    "淮阴": [119.02, 33.36],
                    "江都": [119.32, 32.26],
                    "姜堰": [120.08, 32.34],
                    "江阴": [120.17, 31.54],
                    "靖江": [120.17, 32.02],
                    "金坛": [119.33, 31.46],
                    "昆山": [120.57, 31.23],
                    "连去港": [119.1, 34.36],
                    "溧阳": [119.29, 31.26],
                    "南通": [120.51, 32.01],
                    "邳州": [117.59, 34.19],
                    "启乐": [121.39, 31.48],
                    "如皋": [120.33, 32.23],
                    "宿迁": [118.18, 33.58],
                    "苏州": [120.37, 31.19],
                    "太仓": [121.06, 31.27],
                    "泰兴": [120.01, 32.1],
                    "泰州": [119.54, 32.3],
                    "通州": [121.03, 32.05],
                    "吴江": [120.39, 31.1],
                    "无锡": [120.18, 31.34],
                    "兴化": [119.5, 32.56],
                    "新沂": [118.2, 34.22],
                    "徐州": [117.11, 34.15],
                    "盐在": [120.08, 33.22],
                    "扬中": [119.49, 32.14],
                    "扬州": [119.26, 32.23],
                    "宜兴": [119.49, 31.21],
                    "仪征": [119.1, 32.16],
                    "张家港": [120.32, 31.52],
                    "镇江": [119.27, 32.11],
                    "南昌": [115.55, 28.4],
                    "德兴": [117.35, 28.57],
                    "丰城": [115.48, 28.12],
                    "赣州": [114.56, 28.52],
                    "高安": [115.22, 28.25],
                    "吉安": [114.58, 27.07],
                    "景德镇": [117.13, 29.17],
                    "井冈山": [114.1, 26.34],
                    "九江": [115.58, 29.43],
                    "乐平": [117.08, 28.58],
                    "临川": [116.21, 27.59],
                    "萍乡": [113.5, 27.37],
                    "瑞昌": [115.38, 29.4],
                    "瑞金": [116.01, 25.53],
                    "上饶": [117.58, 25.27],
                    "新余": [114.56, 27.48],
                    "宜春": [114.23, 27.47],
                    "鹰潭": [117.03, 28.14],
                    "樟树": [115.32, 28.03],
                    "沈阳": [123.25, 41.48],
                    "鞍山": [123, 41.07],
                    "北票": [120.47, 41.48],
                    "本溪": [123.46, 41.18],
                    "朝阳": [120.27, 41.34],
                    "大连": [121.36, 38.55],
                    "丹东": [124.22, 40.08],
                    "大石桥": [122.31, 40.37],
                    "东港": [124.08, 39.53],
                    "凤城": [124.02, 40.28],
                    "抚顺": [123.54, 41.51],
                    "阜新": [121.39, 42.01],
                    "盖州": [122.21, 40.24],
                    "海城": [122.43, 40.51],
                    "葫芦岛": [120.51, 40.45],
                    "锦州": [121.09, 41.07],
                    "开原": [124.02, 42.32],
                    "辽阳": [123.12, 41.16],
                    "凌海": [121.21, 41.1],
                    "凌源": [119.22, 41.14],
                    "盘锦": [122.03, 41.07],
                    "普兰店": [121.58, 39.23],
                    "铁法": [123.32, 42.28],
                    "铁岭": [123.51, 42.18],
                    "瓦房店": [122, 39.37],
                    "兴城": [120.41, 40.37],
                    "新民": [122.49, 41.59],
                    "营口": [122.13, 40.39],
                    "庄河": [122.58, 39.41],
                    "呼和浩特": [111.41, 40.48],
                    "包头": [109.49, 40.39],
                    "赤峰": [118.58, 42.17],
                    "东胜": [109.59, 39.48],
                    "二连浩特": [111.58, 43.38],
                    "额尔古纳": [120.11, 50.13],
                    "丰镇": [113.09, 40.27],
                    "根河": [121.29, 50.48],
                    "海拉尔": [119.39, 49.12],
                    "霍林郭勒": [119.38, 45.32],
                    "集宁": [113.06, 41.02],
                    "临河": [107.22, 40.46],
                    "满洲里": [117.23, 49.35],
                    "通辽": [122.16, 43.37],
                    "乌兰浩特": [122.03, 46.03],
                    "乌海": [106.48, 39.4],
                    "锡林浩特": [116.03, 43.57],
                    "牙克石": [120.4, 49.17],
                    "扎兰屯": [122.47, 48],
                    "银川": [106.16, 38.27],
                    "青铜峡": [105.59, 37.56],
                    "石嘴山": [106.22, 39.02],
                    "吴忠": [106.11, 37.59],
                    "西宁": [101.48, 36.38],
                    "德令哈": [97.23, 37.22],
                    "格尔木": [94.55, 36.26],
                    "济南": [117, 36.4],
                    "安丘": [119.12, 36.25],
                    "滨州": [118.02, 37.22],
                    "昌邑": [119.24, 39.52],
                    "德州": [116.17, 37.26],
                    "东营": [118.3, 37.27],
                    "肥城": [116.46, 36.14],
                    "高密": [119.44, 36.22],
                    "菏泽": [115.26, 35.14],
                    "胶南": [119.58, 35.53],
                    "胶州": [120, 36.17],
                    "即墨": [120.28, 36.22],
                    "济宁": [116.33, 35.23],
                    "莱芜": [117.4, 36.12],
                    "莱西": [120.31, 36.52],
                    "莱阳": [120.42, 36.58],
                    "莱州": [119.57, 37.1],
                    "乐陵": [117.12, 37.44],
                    "聊城": [115.57, 36.26],
                    "临清": [115.42, 36.51],
                    "临沂": [118.2, 35.03],
                    "龙口": [120.21, 37.39],
                    "蓬莱": [120.45, 37.48],
                    "平度": [119.58, 36.47],
                    "青岛": [120.18, 36.03],
                    "青州": [118.28, 36.42],
                    "曲阜": [116.58, 35.36],
                    "日照": [119.32, 35.23],
                    "荣成": [122.25, 37.1],
                    "乳山": [121.31, 36.54],
                    "寿光": [118.44, 36.53],
                    "泰安": [117.08, 36.11],
                    "滕州": [117.09, 35.06],
                    "潍坊": [119.06, 36.43],
                    "威海": [122.07, 37.31],
                    "文登": [122.03, 37.12],
                    "新泰": [117.45, 35.54],
                    "烟台": [121.24, 37.32],
                    "兖州": [116.49, 35.32],
                    "禹城": [116.39, 36.56],
                    "枣庄": [117.33, 34.52],
                    "章丘": [117.32, 36.43],
                    "招远": [120.23, 37.21],
                    "诸城": [119.24, 35.59],
                    "淄博": [118.03, 36.48],
                    "邹城": [116.58, 35.24],
                    "太原": [112.33, 37.54],
                    "长治": [113.06, 36.11],
                    "大同": [113.17, 40.06],
                    "高平": [112.55, 35.48],
                    "古交": [112.09, 37.54],
                    "河津": [110.41, 35.35],
                    "侯马": [111.21, 35.37],
                    "霍州": [111.42, 36.34],
                    "介休": [111.55, 37.02],
                    "晋城": [112.51, 35.3],
                    "临汾": [111.31, 36.05],
                    "潞城": [113.14, 36.21],
                    "朔州": [112.26, 39.19],
                    "孝义": [111.48, 37.08],
                    "忻州": [112.43, 38.24],
                    "阳泉": [113.34, 37.51],
                    "永济": [110.27, 34.52],
                    "原平": [112.42, 38.43],
                    "榆次": [112.43, 37.41],
                    "运城": [110.59, 35.02],
                    "西安": [108.57, 34.17],
                    "安康": [109.01, 32.41],
                    "宝鸡": [107.09, 34.22],
                    "韩城": [110.27, 35.28],
                    "汉中": [107.01, 33.04],
                    "华阴": [110.05, 34.34],
                    "商州": [109.57, 33.52],
                    "铜川": [109.07, 35.06],
                    "渭南": [109.3, 34.3],
                    "咸阳": [108.43, 34.2],
                    "兴平": [108.29, 34.18],
                    "延安": [109.28, 36.35],
                    "榆林": [109.47, 38.18],
                    "上海": [121.29, 31.14],
                    "成都": [104.04, 30.4],
                    "巴中": [106.43, 31.51],
                    "崇州": [103.4, 30.39],
                    "达川": [107.29, 31.14],
                    "德阳": [104.22, 31.09],
                    "都江堰": [103.37, 31.01],
                    "峨眉山": [103.29, 29.36],
                    "涪陵": [107.22, 29.42],
                    "广汉": [104.15, 30.58],
                    "广元": [105.51, 32.28],
                    "华蓥": [106.44, 30.26],
                    "简阳": [104.32, 30.24],
                    "江油": [104.42, 31.48],
                    "阆中": [105.58, 31.36],
                    "乐山": [103.44, 29.36],
                    "泸州": [105.24, 28.54],
                    "绵阳": [104.42, 31.3],
                    "南充": [106.04, 30.49],
                    "内江": [105.02, 29.36],
                    "攀枝花": [101.43, 26.34],
                    "彭州": [103.57, 30.59],
                    "邛崃": [103.28, 30.26],
                    "遂宁": [105.33, 30.31],
                    "万县": [108.21, 30.5],
                    "万源": [108.03, 32.03],
                    "西昌": [102.16, 27.54],
                    "雅安": [102.59, 29.59],
                    "宜宾": [104.34, 28.47],
                    "自贡": [104.46, 29.23],
                    "资阳": [104.38, 30.09],
                    "台北": [121.3, 25.03],
                    "天津": [117.12, 39.02],
                    "拉萨": [91.08, 29.39],
                    "日喀则": [88.51, 29.16],
                    "香港": [115.12, 21.23],
                    "乌鲁木齐": [87.36, 43.45],
                    "阿克苏": [80.19, 41.09],
                    "阿勒泰": [88.12, 47.5],
                    "阿图什": [76.08, 39.42],
                    "博乐": [82.08, 44.57],
                    "昌吉": [87.18, 44.02],
                    "阜康": [87.58, 44.09],
                    "哈密": [93.28, 42.5],
                    "和田": [79.55, 37.09],
                    "克拉玛依": [84.51, 45.36],
                    "喀什": [75.59, 39.3],
                    "库尔勒": [86.07, 41.46],
                    "奎屯": [84.56, 44.27],
                    "石河子": [86, 44.18],
                    "塔城": [82.59, 46.46],
                    "吐鲁番": [89.11, 42.54],
                    "伊宁": [81.2, 43.55],
                    "昆明": [102.42, 25.04],
                    "保山": [99.1, 25.08],
                    "楚雄": [101.32, 25.01],
                    "大理": [100.13, 25.34],
                    "东川": [103.12, 26.06],
                    "个旧": [103.09, 23.21],
                    "景洪": [100.48, 22.01],
                    "开远": [103.13, 23.43],
                    "曲靖": [103.48, 25.3],
                    "瑞丽": [97.5, 24],
                    "思茅": [100.58, 22.48],
                    "畹町": [98.04, 24.06],
                    "宣威": [104.06, 26.13],
                    "玉溪": [102.32, 24.22],
                    "昭通": [103.42, 27.2],
                    "杭州": [120.1, 30.16],
                    "慈溪": [121.15, 30.11],
                    "东阳": [120.14, 29.16],
                    "奉化": [121.24, 29.39],
                    "富阳": [119.57, 30.03],
                    "海宁": [120.42, 30.32],
                    "湖州": [120.06, 30.52],
                    "建德": [119.16, 29.29],
                    "江山": [118.37, 28.45],
                    "嘉兴": [120.45, 30.46],
                    "金华": [119.39, 29.07],
                    "兰溪": [119.28, 29.12],
                    "临海": [121.08, 28.51],
                    "丽水": [119.54, 28.27],
                    "龙泉": [119.08, 28.04],
                    "宁波": [121.33, 29.52],
                    "平湖": [121.01, 30.42],
                    "衢州": [118.52, 28.58],
                    "瑞安": [120.38, 27.48],
                    "上虞": [120.52, 30.01],
                    "绍兴": [120.34, 30],
                    "台州": [121.27, 28.41],
                    "桐乡": [120.32, 30.38],
                    "温岭": [121.21, 28.22],
                    "温州": [120.39, 28.01],
                    "萧山": [120.16, 30.09],
                    "义乌": [120.04, 29.18],
                    "乐清": [120.58, 28.08],
                    "余杭": [120.18, 30.26],
                    "余姚": [121.1, 30.02],
                    "永康": [120.01, 29.54],
                    "舟山": [122.06, 30.01],
                    "诸暨": [120.14, 29.43],
                    "重庆": [106.33, 29.35],
                    "合川": [106.15, 30.02],
                    "江津": [106.16, 29.18],
                    "南川": [107.05, 29.1],
                    "永川": [105.53, 29.23],
                    "林芝": [94.36, 29.65],
                    "天门": [113.17, 30.65],
                    "迪庆": [99.69, 27.82],
                    "晋中": [112.74, 37.69],
                    "乌审旗": [108.82, 38.61],
                    "荆州": [112.24, 30.34],
                    "鄂尔多斯": [109.78, 39.61],
                    "来宾": [109.22, 23.75],
                    "池州": [117.48, 30.67],
                    "阿坝": [102.22, 31.90],
                    "神农架": [110.64, 31.75],
                    "广安": [106.63, 30.47],
                    "阿拉尔": [81.28, 40.54],
                    "阿拉善盟": [105.72, 38.85],
                    "阿里": [81.14, 30.40],
                    "巴彦淖尔": [107.38, 40.76],
                    "巴音郭楞": [86.14, 41.76],
                    "白沙": [109.45, 19.22],
                    "保亭": [109.70, 18.63],
                    "博尔塔拉": [82.06, 44.90],
                    "昌都": [97.18, 31.13],
                    "昌江": [117.18, 29.27],
                    "澄迈": [110.00, 19.73],
                    "崇左": [107.35, 22.40],
                    "达州": [107.51, 31.19],
                    "大兴安岭": [124.59, 51.92],
                    "德宏": [98.58, 24.43],
                    "定安": [110.35, 19.68],
                    "定西": [104.61, 35.57],
                    "东方": [108.65, 19.09],
                    "甘南": [102.91, 34.98],
                    "甘孜": [101.96, 30.04],
                    "固原": [106.28, 36.00],
                    "果洛": [100.24, 34.47],
                    "海北": [100.90, 36.95],
                    "海东": [102.40, 36.48],
                    "海西": [97.37, 37.37],
                    "贺州": [111.55, 24.41],
                    "红河州": [103.37, 23.36],
                    "呼伦贝尔": [119.73, 49.21],
                    "黄冈": [114.88, 30.43],
                    "黄南": [102.01, 35.51],
                    "喀什地区": [75.98, 39.47],
                    "克孜勒苏柯尔克孜": [76.17, 39.71],
                    "廊坊": [116.68, 39.50],
                    "丽江": [100.22, 26.85],
                    "连云港": [119.17, 34.84],
                    "临沧": [100.08, 23.89],
                    "临高": [109.69, 19.91],
                    "陵水": [110.03, 18.50],
                    "陇南": [104.92, 33.39],
                    "吕梁": [111.15, 37.51],
                    "眉山": [103.83, 30.04],
                    "那曲": [92.05, 31.47],
                    "怒江": [98.85, 25.81],
                    "普洱": [100.97, 22.78],
                    "黔东南": [107.98, 26.58],
                    "黔南": [107.52, 26.25],
                    "黔西南": [104.90, 25.08],
                    "庆阳": [107.65, 35.73],
                    "琼中": [109.83, 19.03],
                    "三沙": [112.33, 16.83],
                    "山南": [91.76, 29.22],
                    "商洛": [109.94, 33.86],
                    "图木舒克": [79.06, 39.86],
                    "屯昌": [110.10, 19.35],
                    "万宁": [110.38, 18.79],
                    "文昌": [110.79, 19.54],
                    "文山": [104.21, 23.39],
                    "乌兰察布": [113.12, 40.99],
                    "五家渠": [87.54, 44.16],
                    "五指山": [109.51, 18.77],
                    "西双版纳": [100.79, 22.00],
                    "锡林郭勒盟": [116.04, 43.93],
                    "襄阳": [112.13, 32.04],
                    "兴安盟": [122.03, 46.08],
                    "雄安新区": [121.56, 31.24],
                    "宣城": [118.75, 30.94],
                    "乐东": [109.17, 18.74],
                    "盐城": [120.50, 33.20],
                    "延边": [129.50, 42.89],
                    "燕郊开发区": [116.80, 39.94],
                    "洋浦经济开发区": [109.19, 19.73],
                    "伊犁": [81.32, 43.91],
                    "玉树": [97.00, 33.00],
                    "中卫": [105.19, 37.49],
                },
                areaFlag: ["安庆", "蚌埠", "亳州", "巢湖", "滁州", "阜阳", "贵池", "淮北", "淮南", "黄山", "界首", "六安", "马鞍山", "明光", "宿州",
                    "天长", "铜陵", "芜湖", "宣州", "澳门", "北京", "福州", "长乐", "福安", "福清", "建瓯", "建阳", "晋江", "龙海", "龙岩", "南安",
                    "南平", "宁德", "莆田", "泉州", "三明", "邵武", "石狮", "武夷山", "厦门", "永安", "漳平", "漳州", "兰州", "白银", "敦煌",
                    "嘉峪关", "金昌", "酒泉", "临夏", "平凉", "天水", "武威", "西峰", "玉门", "张掖", "广州", "潮阳", "潮州", "澄海", "从化", "东莞",
                    "恩平", "佛山", "高明", "高要", "高州", "鹤山", "河源", "花都", "化州", "惠阳", "惠州", "江门", "揭阳", "开平", "乐昌", "雷州",
                    "廉江", "连州", "罗定", "茂名", "梅州", "南海", "番禺", "普宁", "清远", "三水", "汕头", "汕尾", "韶关", "深圳", "顺德", "四会",
                    "台山", "吴川", "新会", "兴宁", "阳春", "阳江", "英德", "云浮", "增城", "湛江", "肇庆", "中山", "珠海", "南宁", "北海", "北流",
                    "百色", "防城港", "贵港", "桂林", "桂平", "河池", "合山", "柳州", "赁祥", "钦州", "梧州", "玉林", "宜州", "贵阳", "安顺", "毕节",
                    "赤水", "都匀", "凯里", "六盘水", "清镇", "铜仁", "兴义", "遵义", "海口", "儋州", "琼海", "琼山", "三亚", "通什", "石家庄",
                    "安国", "保定", "霸州", "泊头", "沧州", "承德", "定州", "丰南", "高碑店", "蒿城", "邯郸", "河间", "衡水", "黄骅", "晋州", "冀州",
                    "廓坊", "鹿泉", "南宫", "秦皇岛", "任丘", "三河", "沙河", "深州", "唐山", "武安", "邢台", "辛集", "新乐", "张家口", "涿州",
                    "遵化", "郑州", "安阳", "长葛", "登封", "邓州", "巩义", "鹤壁", "辉县", "焦作", "济源", "开封", "灵宝", "林州", "漯河", "洛阳",
                    "南阳", "平顶山", "濮阳", "沁阳", "汝州", "三门峡", "商丘", "卫辉", "舞钢", "项城", "荥阳", "新密", "新乡", "信阳", "新郑",
                    "许昌", "偃师", "义马", "禹州", "周口", "驻马店", "哈尔滨", "阿城", "安达", "北安", "大庆", "富锦", "海林", "海伦", "鹤岗",
                    "黑河", "佳木斯", "鸡西", "密山", "牡丹江", "讷河", "宁安", "齐齐哈尔", "七台河", "双城", "尚志", "双鸭山", "绥芬河", "绥化", "铁力",
                    "同江", "五常", "五大连池", "伊春", "肇东", "武汉", "安陆", "当阳", "丹江口", "大冶", "恩施", "鄂州", "广水", "洪湖", "黄石",
                    "黄州", "荆门", "荆沙", "老河口", "利川", "麻城", "浦圻", "潜江", "石首", "十堰", "随州", "天门", "武穴", "襄樊", "咸宁", "仙桃",
                    "孝感", "宜昌", "宜城", "应城", "枣阳", "枝城", "钟祥", "长沙", "常德", "郴州", "衡阳", "洪江", "怀化", "凉山", "湘西", "抚州",
                    "津市", "吉首", "耒阳", "冷水江", "冷水滩", "涟源", "醴陵", "临湘", "浏阳", "娄底", "汨罗", "韶山", "邵阳", "武冈", "湘潭",
                    "湘乡", "益阳", "永州", "沅江", "岳阳", "张家界", "株洲", "资兴", "长春", "白城", "白山", "大安", "德惠", "敦化", "公主岭",
                    "和龙", "桦甸", "珲春", "集安", "蛟河", "吉林", "九台", "辽源", "临江", "龙井", "梅河口", "舒兰", "四平", "松原", "洮南", "通化",
                    "图们", "延吉", "愉树", "南京", "常熟", "常州", "丹阳", "东台", "高邮", "海门", "淮安", "淮阴", "江都", "姜堰", "江阴", "靖江",
                    "金坛", "昆山", "连去港", "溧阳", "南通", "邳州", "启乐", "如皋", "宿迁", "苏州", "太仓", "泰兴", "泰州", "通州", "吴江", "无锡",
                    "兴化", "新沂", "徐州", "盐在", "扬中", "扬州", "宜兴", "仪征", "张家港", "镇江", "南昌", "德兴", "丰城", "赣州", "高安", "吉安",
                    "景德镇", "井冈山", "九江", "乐平", "临川", "萍乡", "瑞昌", "瑞金", "上饶", "新余", "宜春", "鹰潭", "樟树", "沈阳", "鞍山",
                    "北票", "本溪", "朝阳", "大连", "丹东", "大石桥", "东港", "凤城", "抚顺", "阜新", "盖州", "海城", "葫芦岛", "锦州", "开原",
                    "辽阳", "凌海", "凌源", "盘锦", "普兰店", "铁法", "铁岭", "瓦房店", "兴城", "新民", "营口", "庄河", "呼和浩特", "包头", "赤峰",
                    "东胜", "二连浩特", "额尔古纳", "丰镇", "根河", "海拉尔", "霍林郭勒", "集宁", "临河", "满洲里", "通辽", "乌兰浩特", "乌海", "锡林浩特",
                    "牙克石", "扎兰屯", "银川", "青铜峡", "石嘴山", "吴忠", "西宁", "德令哈", "格尔木", "济南", "安丘", "滨州", "昌邑", "德州", "东营",
                    "肥城", "高密", "菏泽", "胶南", "胶州", "即墨", "济宁", "莱芜", "莱西", "莱阳", "莱州", "乐陵", "聊城", "临清", "临沂", "龙口",
                    "蓬莱", "平度", "青岛", "青州", "曲阜", "日照", "荣成", "乳山", "寿光", "泰安", "滕州", "潍坊", "威海", "文登", "新泰", "烟台",
                    "兖州", "禹城", "枣庄", "章丘", "招远", "诸城", "淄博", "邹城", "太原", "长治", "大同", "高平", "古交", "河津", "侯马", "霍州",
                    "介休", "晋城", "临汾", "潞城", "朔州", "孝义", "忻州", "阳泉", "永济", "原平", "榆次", "运城", "西安", "安康", "宝鸡", "韩城",
                    "汉中", "华阴", "商州", "铜川", "渭南", "咸阳", "兴平", "延安", "榆林", "上海", "成都", "巴中", "崇州", "达川", "德阳", "都江堰",
                    "峨眉山", "涪陵", "广汉", "广元", "华蓥", "简阳", "江油", "阆中", "乐山", "泸州", "绵阳", "南充", "内江", "攀枝花", "彭州",
                    "邛崃", "遂宁", "万县", "万源", "西昌", "雅安", "宜宾", "自贡", "资阳", "台北", "天津", "拉萨", "日喀则", "香港", "乌鲁木齐",
                    "阿克苏", "阿勒泰", "阿图什", "博乐", "昌吉", "阜康", "哈密", "和田", "克拉玛依", "喀什", "库尔勒", "奎屯", "石河子", "塔城",
                    "吐鲁番", "伊宁", "昆明", "保山", "楚雄", "大理", "东川", "个旧", "景洪", "开远", "曲靖", "瑞丽", "思茅", "畹町", "宣威", "玉溪",
                    "昭通", "杭州", "慈溪", "东阳", "奉化", "富阳", "海宁", "湖州", "建德", "江山", "嘉兴", "金华", "兰溪", "临海", "丽水", "龙泉",
                    "宁波", "平湖", "衢州", "瑞安", "上虞", "绍兴", "台州", "桐乡", "温岭", "温州", "萧山", "义乌", "乐清", "余杭", "余姚", "永康",
                    "舟山", "诸暨", "重庆", "合川", "江津", "南川", "永川", "林芝", "天门", "迪庆", "晋中", "乌审旗", "荆州", "鄂尔多斯", "来宾",
                    "池州", "阿坝", "神农架", "广安"
                ],
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                zOption: {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        source: [
                            ['product', '2015', '2016', '2017'],
                            ['Matcha Latte', 43.3, 85.8, 93.7],
                            ['Milk Tea', 83.1, 73.4, 55.1],
                            ['Cheese Cocoa', 86.4, 65.2, 82.5],
                            ['Walnut Brownie', 72.4, 53.9, 39.1]
                        ]
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [{
                        type: 'bar'
                    }, {
                        type: 'bar'
                    }, {
                        type: 'bar'
                    }]
                },
                options1: {
                    title: {
                        show: false,
                        text: '行业就业排名',
                        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            color: '#FFFFFF',
                        },
                        x: 'center'
                    },
                    grid: {
                        left: '0%',
                        top: '10%',
                        right: '0%',
                        bottom: '8%',
                        containLabel: true
                    },
                    xAxis: [{
                        show: false,
                    }],
                    yAxis: [{
                        axisTick: 'none',
                        axisLine: 'none',
                        offset: '0',
                        inverse: true,
                        axisLabel: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: '12',
                            }
                        },
                        data: []
                    }],
                    series: [{
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: [],
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '12',
                                }
                            }
                        },
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var myColor = ['#6908b3', '#950cb7', '#cf29da', '#2947da', '#00c0e9',
                                        '#0096f3', '#33CCFF', '#00e9db', '#34da62', '#33FFCC'
                                    ];
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                            }
                        },
                        z: 2
                    }]
                },
                options2: {
                    title: {
                        show: false,
                        text: '行业就业排名',
                        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            color: '#FFFFFF',
                        },
                        x: 'center'
                    },
                    grid: {
                        left: '0%',
                        top: '2%',
                        right: '0%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis: [{
                        show: false,
                    }],
                    yAxis: [{
                        axisTick: 'none',
                        axisLine: 'none',
                        offset: '0',
                        inverse: true,
                        axisLabel: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: '12',
                            }
                        },
                        data: []
                    }],
                    series: [{
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: [],
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '12',
                                }
                            }
                        },
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var myColor = [

                                        '#6ff825', '#48f16c', '#51f5bd',
                                        '#e24ef4', '#f44ecb',
                                        '#4ea4f4', '#4e69f4', '#714ef4', '#b74ef4', '#FF34B3',
                                        '#F08080', '#DC143C', '#C67171', '#B3EE3A', '#912CEE',
                                        '#7CFC00', '#4EEE94', '#0000FF', '#7D26CD'

                                    ];
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                            }
                        },
                        z: 2
                    }]
                },
                options3: {
                    geo: {
                        map: 'china',
                        itemStyle: {
                            normal: {
                                areaColor: '#106262',
                                borderColor: '#111',
                            },
                            emphasis: {
                                areaColor: '#2a333d',
                            }
                        }
                    },
                    tooltip: {
                        show: true,
                        formatter: function(params) {
                            const value = params.data['value'][2];
                            if (value != '' && value != undefined) {
                                return params.name + '：' + params.data['value'][2];
                            } else {
                                return params.name + '：' + params.data['value'];
                            }
                        },
                    },
                    series: [{
                        name: '销量',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: [],
                        zoom: 1.2,
                        markPoint: {
                            symbol: 'emptyCircle',
                            symbolSize: function(v) {
                                return 10 + v / 60000
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                show: false,
                            },
                            itemStyle: {
                                color: '#00c1e6',
                                borderColor: '#2d98e6',
                                opacity: 0.3,
                            },
                            data: []
                        }
                    }]
                },
                options4: {
                    title: {
                        show: false,
                        text: '行业就业排名',
                        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            color: '#FFFFFF',
                        },
                        x: 'center'
                    },
                    grid: {
                        left: '0%',
                        top: '1%',
                        right: '0%',
                        bottom: '1%',
                        containLabel: true
                    },
                    xAxis: [{
                        show: false,
                    }],
                    yAxis: [{

                        axisTick: 'none',
                        axisLine: 'none',
                        offset: '0',
                        inverse: true,
                        axisLabel: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: '12',
                            }
                        },
                        data: []
                    }],
                    series: [{
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: [],
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '12',
                                }
                            }
                        },
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var myColor = [
                                        '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                                        '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                                        '#42faeb', '#f44e84', '#fc2a42', '#4ecff4',
                                        '#fd5f5f', '#fec563', '#fee363', '#d4fe63',
                                        '#6ff825', '#48f16c', '#51f5bd',
                                        '#e24ef4', '#f44ecb',
                                        '#4ea4f4', '#4e69f4', '#714ef4', '#b74ef4', '#FF34B3',
                                        '#F08080', '#DC143C', '#C67171', '#B3EE3A', '#912CEE',
                                        '#7CFC00', '#4EEE94', '#0000FF', '#7D26CD',
                                        '#42faeb', '#f44e84', '#fc2a42', '#4ecff4',
                                        '#fd5f5f', '#fec563', '#fee363', '#d4fe63',
                                        '#6ff825', '#48f16c', '#51f5bd',
                                        '#e24ef4', '#f44ecb'
                                    ];
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                            }
                        },
                        z: 2
                    }]
                },
                options5: {
                    title: {
                        /*text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        left: 'center'*/
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    color: ['#42faeb', '#f44e84', '#fc2a42', '#4ecff4',
                        '#fd5f5f', '#fec563', '#fee363', '#d4fe63',
                        '#6ff825', '#48f16c', '#51f5bd',
                        '#e24ef4', '#f44ecb',
                        '#4ea4f4', '#4e69f4', '#714ef4', '#b74ef4'
                    ],
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y: 'center',
                        textStyle: {
                            color: '#ffffff'
                        },
                        data: ["汽车", "设备", "重工", "机械", "电子技术", "半导体", "集成电路", "计算机软件", "工业自动化", "仪器仪表", "互联网", "电子商务",
                            "通信", "进出口", "贸易", "房地产", "装潢", "室内设计", "家居", "环保", "网络设备", "电信", "新能源", "财会", "咨询",
                            "专业服务", "人力资源", "运输", "物流", "交通", "多元化业务集团公司", "数据服务", "计算机服务", "系统", "维修", "批发", "零售",
                            "器械", "医疗设备", "原材料和加工", "电力", "电气", "水利", "礼品", "家电", "家具"
                        ]
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['60%', '45%'],
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '12',
                        },
                        data: [{
                            value: 36731.0,
                            name: '汽车'
                        }, {
                            value: 36426,
                            name: '设备'
                        }, {
                            value: 36426,
                            name: '重工'
                        }, {
                            value: 6426,
                            name: '机械'
                        }, {
                            value: 31038,
                            name: '电子技术'
                        }, {
                            value: 31038,
                            name: '半导体'
                        }, {
                            value: 31038,
                            name: '集成电路'
                        }, {
                            value: 20645,
                            name: '计算机软件'
                        }, {
                            value: 19663,
                            name: '工业自动化'
                        }, {
                            value: 19663,
                            name: '仪器仪表'
                        }, {
                            value: 14112,
                            name: '互联网'
                        }, ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]

                },
                options6: {
                    xAxis: {
                        type: 'category',
                        data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08',
                            '2019-09', '2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03', '2020-04',
                            '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10'
                        ],
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#e0e0e0'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: false,
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#e0e0e0'
                            }
                        }
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 730, 1320, 820, 932, 901, 934, 990, 680, 650, 789, 990,
                            1135, 1020, 934, 990, 1135, 1020
                        ],
                        type: 'line',

                    }]
                }
            };
        },
        created() {
            this.getSchoolData();
            this.getNewsData();
            this.getEnterpriseData();
            this.getProfessionRank();
            this.getPositionInfoData();
        },
        mounted() {
            //vue创建后显示数据

        },
        methods: {
            loginOut() {
                this.$confirm('确定要退出系统吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    store.dispatch('LogOut').then(() => {
                        NProgress.done();
                        this.$router.push({
                            path: "/"
                        });
                    });
                }).catch(() => {});
            },
            handleChange(value) {
                console.log(value);
            },
            onSubmit1() {
                this.getSchoolData();
            },
            reset1() {
                this.listQueryOne = Object.assign({}, defaultListQueryOne);
                this.getSchoolData();
            },
            onSubmit2() {
                this.getNewsData();
            },
            reset2() {
                this.listQueryTwo = Object.assign({}, defaultListQueryTwo);
                this.getNewsData();
            },
            onSubmit3() {
                this.listQueryThree.pageNum = 0;
                this.listQueryThree.pageNumMore = 1;
                this.getPositionInfoData();
            },
            reset3() {
                this.listQueryThree = Object.assign({}, defaultListQueryFour);
                this.listQueryThree.pageNum = 0;
                this.listQueryThree.pageNumMore = 1;
                this.getPositionInfoData();
            },
            onSubmit4() {
                this.getEnterpriseData();
            },
            reset4() {
                this.listQueryFour = Object.assign({}, defaultListQueryThree);
                this.getEnterpriseData();
            },
            handleSizeChangeOne(val) {
                this.listQueryOne.pageNum = 1;
                this.listQueryOne.pageSize = val;
                this.getSchoolData();
            },
            handleCurrentChangeOne(val) {
                this.listQueryOne.pageNum = val;
                this.getSchoolData();
            },
            handleSizeChangeTwo(val) {
                this.listQueryTwo.pageNum = 1;
                this.listQueryTwo.pageSize = val;
                this.getNewsData();
            },
            handleCurrentChangeTwo(val) {
                this.listQueryTwo.pageNum = val;
                this.getNewsData();
            },
            handleSizeChangeThree(val) {
                this.listQueryThree.pageNum = 0;
                this.listQueryThree.pageNumMore = 1;
                this.listQueryThree.pageSize = val;
                this.getPositionInfoData();
            },
            handleCurrentChangeThree(val) {
                this.listQueryThree.pageNumMore = val;
                this.listQueryThree.pageNum = val - 1;
                this.getPositionInfoData();
            },
            handleSizeChangeFour(val) {
                this.listQueryFour.pageNum = 1;
                this.listQueryFour.pageSize = val;
                this.getEnterpriseData();
            },
            handleCurrentChangeFour(val) {
                this.listQueryFour.pageNum = val;
                this.getEnterpriseData();
            },
            getSchoolData() {
                getSchoolData(this.listQueryOne).then(response => {
                    this.formListOne = response.data.list;
                    this.totalOne = response.data.total;

                })
            },
            getNewsData() {
                getNewsData(this.listQueryTwo).then(response => {
                    this.formListTwo = response.data.list;
                    this.totalTwo = response.data.total;
                })
            },
            getPositionInfoData() {
                dataManagePositionInfo.fetchList(this.listQueryThree).then(response => {
                    this.formListThree = response.data.list;
                    this.totalThree = response.data.total;
                });
            },
            getEnterpriseData() {
                getEnterpriseData(this.listQueryFour).then(response => {
                    this.formListFour = response.data.list;
                    this.totalFour = response.data.total;
                })
            },
            dateFormat(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return ''
                };
                return this.moment(date).format("YYYY-MM-DD")
            },
            getProfessionRank() {
                getProfessionRank().then(response => {

                    //专业就业排名
                    this.options1.yAxis[0].data = response.data.professionKeys;
                    this.options1.series[0].data = response.data.professionValues;

                    //平均薪酬
                    this.options2.yAxis[0].data = response.data.salaryRankKeys;
                    this.options2.series[0].data = response.data.salaryRankValues;




                    let myChart1 = this.echarts.init(document.getElementById("myChart1"));
                    // 绘制图表
                    myChart1.setOption(this.options1);

                    let myChart2 = this.echarts.init(document.getElementById("myChart2"));
                    // 绘制图表
                    myChart2.setOption(this.options2);

                    let myChart3 = this.echarts.init(document.getElementById("myChart3"));

                    const nameList = response.data.areaKeys;
                    const areaList = response.data.areaValues;
                    const datas = new Array();
                    for (let i = 0; i < nameList.length; i++) {
                        if ($.inArray(nameList[i], this.areaFlag) >= 0) {
                            datas.push({
                                "name": nameList[i],
                                "coord": this.geoCoordMap[nameList[i]],
                                "value": parseInt(areaList[i])
                            })
                        }
                    }

                    this.options3.series[0].markPoint.data = datas;
                    this.options3.series[0].name = "岗位（数量）";
                    // 绘制图表
                    myChart3.setOption(this.options3);

                    //行业排名
                    this.options4.yAxis[0].data = response.data.hangyeKeys;
                    this.options4.series[0].data = response.data.hangyeValues;

                    let myChart4 = this.echarts.init(document.getElementById("myChart4"));

                    // 绘制图表
                    myChart4.setOption(this.options4);

                    this.schoolNum = response.data.schoolNum;
                    this.enterpriseNum = response.data.enterpriseNum;
                    this.industryNum = response.data.industryNum;
                    this.positionNum = response.data.positionNum;


                    let myChart5 = this.echarts.init(document.getElementById("myChart5"));

                    // 绘制图表
                    myChart5.setOption(this.options5);
                    let myChart6 = this.echarts.init(document.getElementById("myChart6"));

                    // 绘制图表
                    myChart6.setOption(this.options6);

                });
            },
            drawZEchart1() {

            },
            drawZEchart2() {
                let myChart = this.echarts.init(document.getElementById("myChart2"));
                var color = ["#19D672", "#FD517D"];
                // 绘制图表
                myChart.setOption({
                    legend: {},
                    tooltip: {},
                    dataset: {
                        source: [
                            ['product', '2015', '2016', '2017'],
                            ['Matcha Latte', 43.3, 85.8, 93.7],
                            ['Milk Tea', 83.1, 73.4, 55.1],
                            ['Cheese Cocoa', 86.4, 65.2, 82.5],
                            ['Walnut Brownie', 72.4, 53.9, 39.1]
                        ]
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [{
                        type: 'bar'
                    }, {
                        type: 'bar'
                    }, {
                        type: 'bar'
                    }]
                });
            },
        }
    }
</script>
<style scoped>
    @import "./../../assets/css/sysJob/jobMain.css";
</style>