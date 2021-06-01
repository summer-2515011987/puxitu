
<template>
    <el-container class="den-wrap  h100p">
        <el-header style="height: 80px;">
            <img src="../../assets/images/header/title_left_icon.png" alt="" @click="$router.push('/loginNav')" width="64" height="64" style="float:left;margin-top:7px;">
            <div class="header-left-choose-div">
                <el-cascader   id="den-cascader-id" ref="den-cascader-id"
                               v-model="menuValue" :popper-append-to-body="false" popper-class="qian-cascade"
                               :options="propsOption"
                               :props="{ expandTrigger: 'hover' }" :show-all-levels="true"
                               @change="handleChange">
                </el-cascader>
                <span class="redIcon"></span>
            </div>
             <img src="../../assets/images/header/headtitle4.png" alt="" @click="$router.push('/loginNav')" height="80" style="float:center;">
            <a class="searchBtn exportAbtn" href="/static/pdf/245b6dcb80aef7b8c0ec67353b8a90e_0.pdf" target="_blank">导出市场需求报告</a>
            <div class="header-right-login-msg-div">
                <span class="redIcon"></span>
                <span class="el-icon-user "> 管理员 | 张三</span>
                <img src="../../assets/images/sysEchart/logoutIcon.png"  alt="" />
                <el-button type="text" class="loginButton" @click="loginOut"> 退出登录</el-button>
            </div>
        </el-header>
        <el-main style="padding:0 30px 0px">
            <el-row :gutter="30" v-show="echartShow1" style='height:1000px;'>
                <el-col :span="9" style='height:1000px;'>
                    <el-container class=" h100p">
                        <el-header style="height:30%;margin-bottom:30px;" class="div-border-shadow ">
                            <el-container class=" h100p">
                                <el-header class="echart-unit-title-div">
                                    <span class="tringle-red-icon"></span>专业基本信息</el-header>
                                <el-main>
                                   <!-- <lable >所属大类：<input v-model="professionBigCategory"></input></lable>
                                    <lable >所属产业大类：<input v-model="ppIndustryName"></input></lable>
                                    <lable >所属产业类：<input v-model="sysIndustryTypeName"></input></lable>
                                    专业就业方向：<input v-model="jobfaceProfession"></input>
                                    可从事的岗位：<input v-model="trainGoal"></input>-->
                                    <div  style="color: white;line-height: 22px;padding: 0 1%;margin-bottom: 20px;margin-left:20px;text-align: left;">
                                        所属大类：{{professionBigCategory}}
                                        <br/>
                                        所属产业大类：{{ppIndustryName}}
                                        <br/>
                                        所属产业类：{{sysIndustryTypeName}}
                                        <br/>
                                        专业就业方向：{{trainGoal}}
                                        <br/>
                                        可从事的岗位：{{jobfaceProfession}}
                                    </div>
                                </el-main>
                            </el-container>
                        </el-header>
                        <el-main  class="div-border-shadow h100p" style="padding:0 20px;">
                            <el-container class=" h100p">
                                <el-header class="echart-unit-title-div">
                                    <span class="tringle-red-icon"></span>全国区域本专业岗位需求地域分布情况</el-header>
                                <el-main>
                                    <div id="myChart3" style="width:100%;height:100%"></div>
                                </el-main>
                            </el-container>
                        </el-main>
                    </el-container>
                </el-col>
                <el-col :span="15" class=" h100p">
                    <el-container class=" h100p">
                        <el-header  style="height:50%;margin-bottom:30px;" class="div-border-shadow">
                            <el-container class="h100p">
                                <el-header class="echart-unit-title-div">
                                    <span class="tringle-red-icon"></span>全国区域本专业所对应的岗位信息</el-header>
                                <el-main>
                                    <div id="myChart1" style="height: 100%"></div>
                                </el-main>
                            </el-container>
                        </el-header>
                        <el-main class="div-border-shadow h100p" style="padding:0 20px;">
                            <el-container class=" h100p">
                                <el-header class="echart-unit-title-div">
                                    <span class="tringle-red-icon"></span>全国区域本专业市场岗位需求变动情况</el-header>
                                <el-main>
                                    <el-button type="primary" @click='getPostNeedChange(1)'>月度</el-button>
                                    <el-button type="success" @click='getPostNeedChange(2)'>季度</el-button>
                                    <div id="myChart2" style="height: 80%"></div>
                                </el-main>
                            </el-container>
                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
            <el-row :gutter="30" v-show="echartShow2" style='height:700px;'>
                <el-col :span="15" class=" h100p">
                    <el-container class="div-border-shadow h100p" style="width: 100%">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业招聘单位分布情况</el-header>
                        <el-main>
                            <div id="myChart4" style="height: 100%;width:66%;float:left;"></div>
                            <div class="table-wrapper" style="height: 100%;width:29%;float:left;">
                                <el-table

                                        :data="enterpriseTypeList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="企业类型"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
                <el-col :span="9" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>院校所在区域（{{area}}）岗位需求地域分布情况</el-header>
                        <el-main>
                            <div id="myChart5" style="height: 100%;width:66%;float:left;"></div>
                            <div class="table-wrapper" style="height: 100%;width:29%;float:left;">
                                <el-table

                                        :data="provinceJobNumberList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="区域"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
            <el-row :gutter="30"  v-show="echartShow3" style='height:700px;'>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业人才月薪分布情况
                        </el-header>
                        <el-main>
                            <div id="myChart6" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="salaryList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="月薪(K)"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container></el-col>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业人才经验要求情况</el-header>
                        <el-main>
                            <div id="myChart7" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="workExperienceList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="经验(年)"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业人才学历要求情况</el-header>
                        <el-main>
                            <div id="myChart8" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="xueLiList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="学历"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
            <el-row :gutter="30"  v-show="echartShow4" style='height:700px;'>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>院校所在区域（{{area}}）本专业人才月薪分布情况</el-header>
                        <el-main>
                            <div id="myChart9" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="salaryAreaList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="月薪(K)"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>院校所在区域（{{area}}）本专业人才经验要求情况</el-header>
                        <el-main>
                            <div id="myChart10" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="workExperienceAreaList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="经验(年)"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>院校所在区域（{{area}}）本专业人才学历要求情况</el-header>
                        <el-main>
                            <div id="myChart11" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="educationAreaList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="学历"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>

                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
            <el-row :gutter="30"  v-show="echartShow5" style='height:700px;'>
                <el-col :span="15" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>院校所在区域（{{area}}）本专业市场岗位需求变动情况</el-header>
                        <el-main>
                            <el-button type="primary" @click='getAreaPostNeed(1)'>月度</el-button>
                            <el-button type="success" @click='getAreaPostNeed(2)'>季度</el-button>
                            <div id="myChart12" style="height: 80%"></div>
                        </el-main>
                    </el-container>
                </el-col>
                <el-col :span="9" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业招聘岗位所属行业分布情况
                        </el-header>
                        <el-main>
                            <div id="myChart13" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="industryTypeList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="行业"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
            <el-row :gutter="30"  v-show="echartShow6" style='height:700px;'>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>院校所在区域（{{area}}）本专业招聘岗位所属行业分布情况
                        </el-header>
                        <el-main>
                            <div id="myChart14" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="provinceIndustryTypeList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="行业"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container></el-col>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业招聘岗位专业技能要求</el-header>
                        <el-main>
                            <div id="myChart15" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="skillList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="技能"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>院校所在区域（{{area}}）本专业招聘岗位专业技能要求</el-header>
                        <el-main>
                            <div id="myChart16" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="skillAreaList.data"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="技能"
                                            width="99%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
            <el-row :gutter="30"  v-show="echartShow7" style='height:700px;'>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业招聘岗位社会能力要求分析
                        </el-header>
                        <el-main>
                            <div id="myChart17" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="societyAbilityList"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="社会能力"
                                            width="200%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container></el-col>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业招聘岗位操作能力要求分析</el-header>
                        <el-main>
                            <div id="myChart18" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table

                                        :data="manuplutionAbilityList"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="操作能力"
                                            width="200%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
                <el-col :span="8" class=" h100p">
                    <el-container class="div-border-shadow h100p">
                        <el-header class="echart-unit-title-div">
                            <span class="tringle-red-icon"></span>全国区域本专业招聘岗位发展能力要求分析</el-header>
                        <el-main>
                            <div id="myChart19" style="width:100%;height:60%"></div>
                            <div class="table-wrapper" style="width:100%;height:40%">
                                <el-table
                                        :data="developAbilityList"
                                        :header-row-style="rowStyle"
                                        :header-cell-style="rowStyle"
                                        style="width: 100%;"
                                        :cell-style="cellStyle">
                                    <el-table-column
                                            prop="order"
                                            label="排名"
                                            width="99%" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="发展能力"
                                            width="200%">
                                    </el-table-column>
                                    <el-table-column
                                            prop="value"
                                            label="岗位数量"
                                            width="99%">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import store from "@/store";
	import NProgress from 'nprogress' 
    import bigDataIndustry from "@/api/bigDataIndustry";
    import '../../../node_modules/echarts/map/js/china.js';
    import {getAfterJobClass} from "@/api/professionModelManagerApi";
    let echartShow = true;
    export default {
        name: "index",
        components: {
        },
        data() {
            return {
                activeName: 'accountManagement',
                tabIndex: 0,
                localData: {},
                tabBox: {},
                value: [],
                menuValue:['qiche','560702'],
                echartVisuals:[{
                    name: '专业基本信息、全国区域本专业所对应的岗位信息、全国区域本专业岗位需求地域分布情况、全国区域本专业市场岗位需求变动情况',
                    value: 'echartShow1'
                },{
                    name: '全国区域本专业招聘单位分布情况、院校所在区域本专业岗位需求地域分布情况',
                    value: 'echartShow2'
                },{
                    name: '全国区域本专业人才月薪分布情况、全国区域本专业人才经验要求情况、全国区域本专业人才学历要求情况',
                    value: 'echartShow3'
                },{
                    name: '院校所在区域本专业人才月薪分布情况、院校所在区域本专业人才经验要求情情况、院校所在区域本专业人才学历要求情情况',
                    value: 'echartShow4'
                },{
                    name: '院校所在区域本专业市场岗位需求变动情况、全国区域本专业招聘岗位所属行业分布情况',
                    value: 'echartShow5'
                },{
                    name: '院校所在区域本专业招聘岗位所属行业分布情况、全国区域本专业招聘岗位专业技能要求、院校所在区域本专业招聘岗位专业技能要求',
                    value: 'echartShow6'
                },{
                    name: '全国区域本专业招聘岗位社会能力要求分析、全国区域本专业招聘岗位操作能力要求分析、全国区域本专业招聘岗位发展能力要求分析',
                    value: 'echartShow7'
                }],
                propsOption: [{
                    value: 'qiche',
                    label: '汽车制造类专业群',
                    children: [{
                        value: '560702',
                        label: '汽车检测与维修技术',
                    },{
                        value: '560701',
                        label: '汽车制造与装配技术',
                    },{
                        value: '560707',
                        label: '新能源汽车技术',
                    }]
                },{
                    value: 'shipin',
                    label: '食品工业类专业群',
                    // children: [{
                    //     value: '590103',
                    //     label: '食品营养与检测',
                    // }, {
                    //     value: '590107',
                    //     label: '食品质量与安全',
                    // }]
                },{
                    value: 'dianzi',
                    label: '电子信息类专业群',
                    // children: [{
                    //     value: '610101',
                    //     label: '电子信息工程技术',
                    // }, {
                    //     value: '610301',
                    //     label: '通信技术',
                    // }]
                },{
                    value: 'jisaunji',
                    label: '计算机类专业群',
                    children: [
                        /*    {
                            value: '610202',
                            label: '计算机网络技术',
                        }, {
                            value: '610201',
                            label: '计算机应用技术',
                        },*/
                        {
                            value: '610215',
                            label: '大数据技术与应用',
                        }]
                },{
                    value: 'chengshi',
                    label: '城市轨道交通类',
                    children: [{
                        value: '600602',
                        label: '城市轨道交通机电技术',
                    }]
                },{
                    value: 'shebei',
                    label: '建筑设备类专业群',
                    // children: [{
                    //     value: '540402',
                    //     label: '供热通风与空调工程技术',
                    // }, {
                    //     value: '540404',
                    //     label: '建筑智能化工程技术',
                    // }]
                },{
                    value: 'zidonghua',
                    label: '自动化类专业群',
                    // children: [{
                    //     value: '560301',
                    //     label: '机电一体化技术',
                    // }, {
                    //     value: '560302',
                    //     label: '电气自动化技术',
                    // }]
                },{
                    value: 'kuaiji',
                    label: '财务会计类专业群',
                    // children: [{
                    //     value: '630302',
                    //     label: '会计',
                    // }]
                },{
                    value: 'jixie',
                    label: '机械设计制造类',
                    // children: [{
                    //     value: '560102',
                    //     label: '机械制造与自动化',
                    // }]
                },{
                    value: 'shengwu',
                    label: '生物技术类专业群',
                    // children: [{
                    //     value: '570105',
                    //     label: '生物产品检验检疫',
                    // }, {
                    //     value: '570103',
                    //     label: '药品生物技术',
                    // }]
                },{
                    value: 'yishu',
                    label: '艺术设计类专业群',
                    children: [{
                        value: '650111',
                        label: '环境艺术设计',
                    }, {
                        value: '650104',
                        label: '数字媒体艺术设计',
                    }]
                }],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                clientHeight: 0,
                professionCode:560702,
                formInline: {
                    user: '',
                    region: ''
                },
                enterpriseTypeList:{
                    data:[]
                },
                industryTypeList:{
                    data:[]
                },
                provinceIndustryTypeList:{
                    data:[]
                },
                provinceJobNumberList:{
                    data:[]
                },
                salaryList:{
                    data:[]
                },
                workExperienceList:{
                    data:[]
                },
                xueLiList:{
                    data:[]
                },
                salaryAreaList:{
                    data:[]
                },
                workExperienceAreaList:{
                    data:[]
                },
                educationAreaList:{
                    data:[]
                },
                nationDateFlag:{
                    flag:1
                },
                areaDateFlag:{
                    flag:1
                },
                industryList:[],
                industryAreaList:[],
                societyAbilityList:[],
                manuplutionAbilityList:[],
                developAbilityList:[],
                skillList:{
                    dara:[]
                },
                skillAreaList:{
                    dara:[]
                },
                abilityList:{
                    dara:[]
                },
                abilityAreaList:{
                    dara:[]
                },
                professionBigCategory:'',
                ppIndustryName:'',
                sysIndustryTypeName:'',
                professionId:0,
                trainGoal:'',
                jobfaceProfession:'',
                area:'北京',
                cityMapName:'beijing',
                chinaId: "110101", // 地图 code
                chinaName: "beijing", // 地图 区域名
                chinaJson: null ,// 地图 json数据
                echartShow1:true,
                echartShow2:true,
                echartShow3:true,
                echartShow4:true,
                echartShow5:true,
                echartShow6:true,
                echartShow7:true,
                geoCoordMap:{ "合肥":[117.17,31.52],
                    "安庆":[117.02,30.31],
                    "蚌埠":[117.21,32.56],
                    "亳州":[115.47,33.52],
                    "巢湖":[117.52,31.36],
                    "滁州":[118.18,32.18],
                    "阜阳":[115.48,32.54],
                    "贵池":[117.28,30.39],
                    "淮北":[116.47,33.57],
                    "淮南":[116.58,32.37],
                    "黄山":[118.18,29.43],
                    "界首":[115.21,33.15],
                    "六安":[116.28,31.44],
                    "马鞍山":[118.28,31.43],
                    "明光":[117.58,32.47],
                    "宿州":[116.58,33.38],
                    "天长":[118.59,32.41],
                    "铜陵":[117.48,30.56],
                    "芜湖":[118.22,31.19],
                    "宣州":[118.44,30.57],
                    "澳门":[115.07,21.33],
                    "北京":[116.24,39.55],
                    "福州":[119.18,26.05],
                    "长乐":[119.31,25.58],
                    "福安":[119.39,27.06],
                    "福清":[119.23,25.42],
                    "建瓯":[118.2,27.03],
                    "建阳":[118.07,27.21],
                    "晋江":[118.35,24.49],
                    "龙海":[117.48,24.26],
                    "龙岩":[117.01,25.06],
                    "南安":[118.23,24.57],
                    "南平":[118.1,26.38],
                    "宁德":[119.31,26.39],
                    "莆田":[119.01,24.26],
                    "泉州":[118.36,24.56],
                    "三明":[117.36,26.13],
                    "邵武":[117.29,27.2],
                    "石狮":[118.38,24.44],
                    "武夷山":[118.02,27.46],
                    "厦门":[118.06,24.27],
                    "永安":[117.23,25.58],
                    "漳平":[117.24,25.17],
                    "漳州":[117.39,24.31],
                    "兰州":[103.51,36.04],
                    "白银":[104.12,36.33],
                    "敦煌":[94.41,40.08],
                    "嘉峪关":[98.14,39.48],
                    "金昌":[102.1,38.28],
                    "酒泉":[98.31,39.44],
                    "临夏":[103.12,35.37],
                    "平凉":[106.4,35.32],
                    "天水":[105.42,34.37],
                    "武威":[102.39,37.56],
                    "西峰":[107.4,35.45],
                    "玉门":[97.35,39.49],
                    "张掖":[100.26,38.56],
                    "广州":[113.14,23.08],
                    "潮阳":[116.36,23.16],
                    "潮州":[116.38,23.4],
                    "澄海":[116.46,23.28],
                    "从化":[113.33,23.33],
                    "东莞":[113.45,23.02],
                    "恩平":[112.19,22.12],
                    "佛山":[113.06,23.02],
                    "高明":[112.5,22.53],
                    "高要":[112.26,23.02],
                    "高州":[110.5,21.54],
                    "鹤山":[112.57,22.46],
                    "河源":[114.41,23.43],
                    "花都":[113.12,23.23],
                    "化州":[110.37,21.39],
                    "惠阳":[114.28,22.48],
                    "惠州":[114.22,23.05],
                    "江门":[113.04,22.35],
                    "揭阳":[116.21,22.32],
                    "开平":[112.4,22.22],
                    "乐昌":[113.21,25.09],
                    "雷州":[110.04,20.54],
                    "廉江":[110.17,21.37],
                    "连州":[112.23,24.48],
                    "罗定":[111.33,22.46],
                    "茂名":[110.53,21.4],
                    "梅州":[116.07,24.19],
                    "南海":[113.09,23.01],
                    "番禺":[113.22,22.57],
                    "普宁":[116.1,23.18],
                    "清远":[113.01,23.42],
                    "三水":[112.52,23.1],
                    "汕头":[116.41,23.22],
                    "汕尾":[115.21,22.47],
                    "韶关":[113.37,24.48],
                    "深圳":[114.07,22.33],
                    "顺德":[113.15,22.5],
                    "四会":[112.41,23.21],
                    "台山":[112.48,22.15],
                    "吴川":[110.47,21.26],
                    "新会":[113.01,22.32],
                    "兴宁":[115.43,24.09],
                    "阳春":[111.48,22.1],
                    "阳江":[111.58,21.5],
                    "英德":[113.22,24.1],
                    "云浮":[112.02,22.57],
                    "增城":[113.49,23.18],
                    "湛江":[110.24,21.11],
                    "肇庆":[112.27,23.03],
                    "中山":[113.22,22.31],
                    "珠海":[113.34,22.17],
                    "南宁":[108.19,22.48],
                    "北海":[109.07,21.28],
                    "北流":[110.21,22.42],
                    "百色":[106.36,23.54],
                    "防城港":[108.2,21.37],
                    "贵港":[109.36,23.06],
                    "桂林":[110.17,25.17],
                    "桂平":[110.04,23.22],
                    "河池":[108.03,24.42],
                    "合山":[108.52,23.47],
                    "柳州":[109.24,23.19],
                    "赁祥":[106.44,22.07],
                    "钦州":[108.37,21.57],
                    "梧州":[111.2,23.29],
                    "玉林":[110.09,22.38],
                    "宜州":[108.4,24.28],
                    "贵阳":[106.42,26.35],
                    "安顺":[105.55,26.14],
                    "毕节":[105.18,27.18],
                    "赤水":[105.42,28.34],
                    "都匀":[107.31,26.15],
                    "凯里":[107.58,26.35],
                    "六盘水":[104.5,26.35],
                    "清镇":[106.27,26.33],
                    "铜仁":[109.12,27.43],
                    "兴义":[104.53,25.05],
                    "遵义":[106.55,27.42],
                    "海口":[110.2,20.02],
                    "儋州":[109.34,19.31],
                    "琼海":[110.28,19.14],
                    "琼山":[110.21,19.59],
                    "三亚":[109.31,18.14],
                    "通什":[109.31,18.46],
                    "石家庄":[114.3,38.02],
                    "安国":[115.2,38.24],
                    "保定":[115.3,38.51],
                    "霸州":[116.24,39.06],
                    "泊头":[116.34,38.04],
                    "沧州":[116.52,38.18],
                    "承德":[117.57,40.59],
                    "定州":[115,38.3],
                    "丰南":[118.06,39.34],
                    "高碑店":[115.51,39.2],
                    "蒿城":[114.5,38.02],
                    "邯郸":[114.28,36.36],
                    "河间":[116.05,38.26],
                    "衡水":[115.42,37.44],
                    "黄骅":[117.21,38.21],
                    "晋州":[115.02,38.02],
                    "冀州":[115.33,37.34],
                    "廓坊":[116.42,39.31],
                    "鹿泉":[114.19,38.04],
                    "南宫":[115.23,37.22],
                    "秦皇岛":[119.35,39.55],
                    "任丘":[116.07,38.42],
                    "三河":[117.04,39.58],
                    "沙河":[114.3,36.51],
                    "深州":[115.32,38.01],
                    "唐山":[118.11,39.36],
                    "武安":[114.11,36.42],
                    "邢台":[114.3,37.04],
                    "辛集":[115.12,37.54],
                    "新乐":[114.41,38.2],
                    "张家口":[114.53,40.48],
                    "涿州":[115.59,39.29],
                    "遵化":[117.58,40.11],
                    "郑州":[11340,34.46],
                    "安阳":[114.21,36.06],
                    "长葛":[113.47,34.12],
                    "登封":[113.02,34.27],
                    "邓州":[112.05,32.42],
                    "巩义":[112.58,34.46],
                    "鹤壁":[114.11,35.54],
                    "辉县":[113.47,35.27],
                    "焦作":[113.12,35.14],
                    "济源":[112.35,35.04],
                    "开封":[114.21,34.47],
                    "灵宝":[110.52,34.31],
                    "林州":[113.49,36.03],
                    "漯河":[114.02,33.33],
                    "洛阳":[112.27,34.41],
                    "南阳":[112.32,33],
                    "平顶山":[113.17,33.44],
                    "濮阳":[115.01,35.44],
                    "沁阳":[112.57,35.05],
                    "汝州":[112.5,34.09],
                    "三门峡":[111.12,34.47],
                    "商丘":[115.38,34.26],
                    "卫辉":[114.03,35.24],
                    "舞钢":[113.3,33.17],
                    "项城":[114.54,33.26],
                    "荥阳":[113.21,34.46],
                    "新密":[113.22,34.31],
                    "新乡":[113.52,35.18],
                    "信阳":[114.04,32.07],
                    "新郑":[113.43,34.24],
                    "许昌":[113.49,34.01],
                    "偃师":[112.47,34.43],
                    "义马":[111.55,34.43],
                    "禹州":[113.28,34.09],
                    "周口":[114.38,33.37],
                    "驻马店":[114.01,32.58],
                    "哈尔滨":[126.36,45.44],
                    "阿城":[126.58,45.32],
                    "安达":[125.18,46.24],
                    "北安":[126.31,48.15],
                    "大庆":[125.01,46.36],
                    "富锦":[132.02,47.15],
                    "海林":[129.21,44.35],
                    "海伦":[126.57,47.28],
                    "鹤岗":[130.16,47.2],
                    "黑河":[127.29,50.14],
                    "佳木斯":[130.22,46.47],
                    "鸡西":[130.57,45.17],
                    "密山":[131.5,45.32],
                    "牡丹江":[129.36,44.35],
                    "讷河":[124.51,48.29],
                    "宁安":[129.28,44.21],
                    "齐齐哈尔":[123.57,47.2],
                    "七台河":[130.49,45.48],
                    "双城":[126.15,45.22],
                    "尚志":[127.55,45.14],
                    "双鸭山":[131.11,46.38],
                    "绥芬河":[131.11,44.25],
                    "绥化":[126.59,46.38],
                    "铁力":[128.01,46.59],
                    "同江":[132.3,47.39],
                    "五常":[127.11,44.55],
                    "五大连池":[126.07,48.38],
                    "伊春":[128.56,47.42],
                    "肇东":[125.58,46.04],
                    "武汉":[114.17,30.35],
                    "安陆":[113.41,31.15],
                    "当阳":[111.47,30.5],
                    "丹江口":[108.3,32.33],
                    "大冶":[114.58,30.06],
                    "恩施":[109.29,30.16],
                    "鄂州":[114.52,30.23],
                    "广水":[113.48,31.37],
                    "洪湖":[113.27,29.48],
                    "黄石":[115.06,30.12],
                    "黄州":[114.52,30.27],
                    "荆门":[112.12,31.02],
                    "荆沙":[112.16,30.18],
                    "老河口":[111.4,32.23],
                    "利川":[108.56,30.18],
                    "麻城":[115.01,31.1],
                    "浦圻":[113.51,29.42],
                    "潜江":[112.53,30.26],
                    "石首":[112.24,29.43],
                    "十堰":[110.47,32.4],
                    "随州":[113.22,31.42],
                    "天门":[113.1,60.39],
                    "武穴":[115.33,29.51],
                    "襄樊":[112.08,32.02],
                    "咸宁":[114.17,29.53],
                    "仙桃":[113.27,30.22],
                    "孝感":[113.54,30.56],
                    "宜昌":[111.17,30.42],
                    "宜城":[112.15,31.42],
                    "应城":[113.33,30.57],
                    "枣阳":[112.44,32.07],
                    "枝城":[111.27,30.23],
                    "钟祥":[112.34,31.1],
                    "长沙":[112.59,28.12],
                    "常德":[111.51,29.02],
                    "郴州":[113.02,25.46],
                    "衡阳":[112.37,26.53],
                    "洪江":[109.59,27.07],
                    "怀化":[109.58,27.33],
                    "凉山":[102.27,27.90],
                    "湘西":[109.73,28.32],
                    "抚州":[116.35,28.00],
                    "津市":[111.52,29.38],
                    "吉首":[109.43,28.18],
                    "耒阳":[112.51,26.24],
                    "冷水江":[111.26,27.42],
                    "冷水滩":[111.35,26.26],
                    "涟源":[111.41,27.41],
                    "醴陵":[113.3,27.4],
                    "临湘":[113.27,29.29],
                    "浏阳":[113.37,28.09],
                    "娄底":[111.59,27.44],
                    "汨罗":[113.03,28.49],
                    "韶山":[112.29,27.54],
                    "邵阳":[111.28,27.14],
                    "武冈":[110.37,26.43],
                    "湘潭":[112.53,27.52],
                    "湘乡":[112.31,27.44],
                    "益阳":[112.2,28.36],
                    "永州":[111.37,26.13],
                    "沅江":[112.22,28.5],
                    "岳阳":[113.06,29.22],
                    "张家界":[110.29,29.08],
                    "株洲":[113.09,27.51],
                    "资兴":[113.13,25.58],
                    "长春":[125.19,43.54],
                    "白城":[122.5,45.38],
                    "白山":[126.26,41.56],
                    "大安":[124.18,45.3],
                    "德惠":[125.42,44.32],
                    "敦化":[128.13,43.22],
                    "公主岭":[124.49,43.31],
                    "和龙":[129,42.32],
                    "桦甸":[126.44,42.58],
                    "珲春":[130.22,42.52],
                    "集安":[126.11,41.08],
                    "蛟河":[127.21,43.42],
                    "吉林":[126.33,43.52],
                    "九台":[125.51,44.09],
                    "辽源":[125.09,42.54],
                    "临江":[126.53,41.49],
                    "龙井":[129.26,42.46],
                    "梅河口":[125.4,42.32],
                    "舒兰":[126.57,44.24],
                    "四平":[124.22,43.1],
                    "松原":[124.49,45.11],
                    "洮南":[122.47,45.2],
                    "通化":[125.56,41.43],
                    "图们":[129.51,42.57],
                    "延吉":[129.3,42.54],
                    "愉树":[126.32,44.49],
                    "南京":[118.46,32.03],
                    "常熟":[120.43,31.39],
                    "常州":[119.58,31.47],
                    "丹阳":[119.32,32],
                    "东台":[120.19,32.51],
                    "高邮":[119.27,32.47],
                    "海门":[121.09,31.53],
                    "淮安":[119.09,33.3],
                    "淮阴":[119.02,33.36],
                    "江都":[119.32,32.26],
                    "姜堰":[120.08,32.34],
                    "江阴":[120.17,31.54],
                    "靖江":[120.17,32.02],
                    "金坛":[119.33,31.46],
                    "昆山":[120.57,31.23],
                    "连去港":[119.1,34.36],
                    "溧阳":[119.29,31.26],
                    "南通":[120.51,32.01],
                    "邳州":[117.59,34.19],
                    "启乐":[121.39,31.48],
                    "如皋":[120.33,32.23],
                    "宿迁":[118.18,33.58],
                    "苏州":[120.37,31.19],
                    "太仓":[121.06,31.27],
                    "泰兴":[120.01,32.1],
                    "泰州":[119.54,32.3],
                    "通州":[121.03,32.05],
                    "吴江":[120.39,31.1],
                    "无锡":[120.18,31.34],
                    "兴化":[119.5,32.56],
                    "新沂":[118.2,34.22],
                    "徐州":[117.11,34.15],
                    "盐在":[120.08,33.22],
                    "扬中":[119.49,32.14],
                    "扬州":[119.26,32.23],
                    "宜兴":[119.49,31.21],
                    "仪征":[119.1,32.16],
                    "张家港":[120.32,31.52],
                    "镇江":[119.27,32.11],
                    "南昌":[115.55,28.4],
                    "德兴":[117.35,28.57],
                    "丰城":[115.48,28.12],
                    "赣州":[114.56,28.52],
                    "高安":[115.22,28.25],
                    "吉安":[114.58,27.07],
                    "景德镇":[117.13,29.17],
                    "井冈山":[114.1,26.34],
                    "九江":[115.58,29.43],
                    "乐平":[117.08,28.58],
                    "临川":[116.21,27.59],
                    "萍乡":[113.5,27.37],
                    "瑞昌":[115.38,29.4],
                    "瑞金":[116.01,25.53],
                    "上饶":[117.58,25.27],
                    "新余":[114.56,27.48],
                    "宜春":[114.23,27.47],
                    "鹰潭":[117.03,28.14],
                    "樟树":[115.32,28.03],
                    "沈阳":[123.25,41.48],
                    "鞍山":[123,41.07],
                    "北票":[120.47,41.48],
                    "本溪":[123.46,41.18],
                    "朝阳":[120.27,41.34],
                    "大连":[121.36,38.55],
                    "丹东":[124.22,40.08],
                    "大石桥":[122.31,40.37],
                    "东港":[124.08,39.53],
                    "凤城":[124.02,40.28],
                    "抚顺":[123.54,41.51],
                    "阜新":[121.39,42.01],
                    "盖州":[122.21,40.24],
                    "海城":[122.43,40.51],
                    "葫芦岛":[120.51,40.45],
                    "锦州":[121.09,41.07],
                    "开原":[124.02,42.32],
                    "辽阳":[123.12,41.16],
                    "凌海":[121.21,41.1],
                    "凌源":[119.22,41.14],
                    "盘锦":[122.03,41.07],
                    "普兰店":[121.58,39.23],
                    "铁法":[123.32,42.28],
                    "铁岭":[123.51,42.18],
                    "瓦房店":[122,39.37],
                    "兴城":[120.41,40.37],
                    "新民":[122.49,41.59],
                    "营口":[122.13,40.39],
                    "庄河":[122.58,39.41],
                    "呼和浩特":[111.41,40.48],
                    "包头":[109.49,40.39],
                    "赤峰":[118.58,42.17],
                    "东胜":[109.59,39.48],
                    "二连浩特":[111.58,43.38],
                    "额尔古纳":[120.11,50.13],
                    "丰镇":[113.09,40.27],
                    "根河":[121.29,50.48],
                    "海拉尔":[119.39,49.12],
                    "霍林郭勒":[119.38,45.32],
                    "集宁":[113.06,41.02],
                    "临河":[107.22,40.46],
                    "满洲里":[117.23,49.35],
                    "通辽":[122.16,43.37],
                    "乌兰浩特":[122.03,46.03],
                    "乌海":[106.48,39.4],
                    "锡林浩特":[116.03,43.57],
                    "牙克石":[120.4,49.17],
                    "扎兰屯":[122.47,48],
                    "银川":[106.16,38.27],
                    "青铜峡":[105.59,37.56],
                    "石嘴山":[106.22,39.02],
                    "吴忠":[106.11,37.59],
                    "西宁":[101.48,36.38],
                    "德令哈":[97.23,37.22],
                    "格尔木":[94.55,36.26],
                    "济南":[117,36.4],
                    "安丘":[119.12,36.25],
                    "滨州":[118.02,37.22],
                    "昌邑":[119.24,39.52],
                    "德州":[116.17,37.26],
                    "东营":[118.3,37.27],
                    "肥城":[116.46,36.14],
                    "高密":[119.44,36.22],
                    "菏泽":[115.26,35.14],
                    "胶南":[119.58,35.53],
                    "胶州":[120,36.17],
                    "即墨":[120.28,36.22],
                    "济宁":[116.33,35.23],
                    "莱芜":[117.4,36.12],
                    "莱西":[120.31,36.52],
                    "莱阳":[120.42,36.58],
                    "莱州":[119.57,37.1],
                    "乐陵":[117.12,37.44],
                    "聊城":[115.57,36.26],
                    "临清":[115.42,36.51],
                    "临沂":[118.2,35.03],
                    "龙口":[120.21,37.39],
                    "蓬莱":[120.45,37.48],
                    "平度":[119.58,36.47],
                    "青岛":[120.18,36.03],
                    "青州":[118.28,36.42],
                    "曲阜":[116.58,35.36],
                    "日照":[119.32,35.23],
                    "荣成":[122.25,37.1],
                    "乳山":[121.31,36.54],
                    "寿光":[118.44,36.53],
                    "泰安":[117.08,36.11],
                    "滕州":[117.09,35.06],
                    "潍坊":[119.06,36.43],
                    "威海":[122.07,37.31],
                    "文登":[122.03,37.12],
                    "新泰":[117.45,35.54],
                    "烟台":[121.24,37.32],
                    "兖州":[116.49,35.32],
                    "禹城":[116.39,36.56],
                    "枣庄":[117.33,34.52],
                    "章丘":[117.32,36.43],
                    "招远":[120.23,37.21],
                    "诸城":[119.24,35.59],
                    "淄博":[118.03,36.48],
                    "邹城":[116.58,35.24],
                    "太原":[112.33,37.54],
                    "长治":[113.06,36.11],
                    "大同":[113.17,40.06],
                    "高平":[112.55,35.48],
                    "古交":[112.09,37.54],
                    "河津":[110.41,35.35],
                    "侯马":[111.21,35.37],
                    "霍州":[111.42,36.34],
                    "介休":[111.55,37.02],
                    "晋城":[112.51,35.3],
                    "临汾":[111.31,36.05],
                    "潞城":[113.14,36.21],
                    "朔州":[112.26,39.19],
                    "孝义":[111.48,37.08],
                    "忻州":[112.43,38.24],
                    "阳泉":[113.34,37.51],
                    "永济":[110.27,34.52],
                    "原平":[112.42,38.43],
                    "榆次":[112.43,37.41],
                    "运城":[110.59,35.02],
                    "西安":[108.57,34.17],
                    "安康":[109.01,32.41],
                    "宝鸡":[107.09,34.22],
                    "韩城":[110.27,35.28],
                    "汉中":[107.01,33.04],
                    "华阴":[110.05,34.34],
                    "商州":[109.57,33.52],
                    "铜川":[109.07,35.06],
                    "渭南":[109.3,34.3],
                    "咸阳":[108.43,34.2],
                    "兴平":[108.29,34.18],
                    "延安":[109.28,36.35],
                    "榆林":[109.47,38.18],
                    "上海":[121.29,31.14],
                    "成都":[104.04,30.4],
                    "巴中":[106.43,31.51],
                    "崇州":[103.4,30.39],
                    "达川":[107.29,31.14],
                    "德阳":[104.22,31.09],
                    "都江堰":[103.37,31.01],
                    "峨眉山":[103.29,29.36],
                    "涪陵":[107.22,29.42],
                    "广汉":[104.15,30.58],
                    "广元":[105.51,32.28],
                    "华蓥":[106.44,30.26],
                    "简阳":[104.32,30.24],
                    "江油":[104.42,31.48],
                    "阆中":[105.58,31.36],
                    "乐山":[103.44,29.36],
                    "泸州":[105.24,28.54],
                    "绵阳":[104.42,31.3],
                    "南充":[106.04,30.49],
                    "内江":[105.02,29.36],
                    "攀枝花":[101.43,26.34],
                    "彭州":[103.57,30.59],
                    "邛崃":[103.28,30.26],
                    "遂宁":[105.33,30.31],
                    "万县":[108.21,30.5],
                    "万源":[108.03,32.03],
                    "西昌":[102.16,27.54],
                    "雅安":[102.59,29.59],
                    "宜宾":[104.34,28.47],
                    "自贡":[104.46,29.23],
                    "资阳":[104.38,30.09],
                    "台北":[121.3,25.03],
                    "天津":[117.12,39.02],
                    "拉萨":[91.08,29.39],
                    "日喀则":[88.51,29.16],
                    "香港":[115.12,21.23],
                    "乌鲁木齐":[87.36,43.45],
                    "阿克苏":[80.19,41.09],
                    "阿勒泰":[88.12,47.5],
                    "阿图什":[76.08,39.42],
                    "博乐":[82.08,44.57],
                    "昌吉":[87.18,44.02],
                    "阜康":[87.58,44.09],
                    "哈密":[93.28,42.5],
                    "和田":[79.55,37.09],
                    "克拉玛依":[84.51,45.36],
                    "喀什":[75.59,39.3],
                    "库尔勒":[86.07,41.46],
                    "奎屯":[84.56,44.27],
                    "石河子":[86,44.18],
                    "塔城":[82.59,46.46],
                    "吐鲁番":[89.11,42.54],
                    "伊宁":[81.2,43.55],
                    "昆明":[102.42,25.04],
                    "保山":[99.1,25.08],
                    "楚雄":[101.32,25.01],
                    "大理":[100.13,25.34],
                    "东川":[103.12,26.06],
                    "个旧":[103.09,23.21],
                    "景洪":[100.48,22.01],
                    "开远":[103.13,23.43],
                    "曲靖":[103.48,25.3],
                    "瑞丽":[97.5,24],
                    "思茅":[100.58,22.48],
                    "畹町":[98.04,24.06],
                    "宣威":[104.06,26.13],
                    "玉溪":[102.32,24.22],
                    "昭通":[103.42,27.2],
                    "杭州":[120.1,30.16],
                    "慈溪":[121.15,30.11],
                    "东阳":[120.14,29.16],
                    "奉化":[121.24,29.39],
                    "富阳":[119.57,30.03],
                    "海宁":[120.42,30.32],
                    "湖州":[120.06,30.52],
                    "建德":[119.16,29.29],
                    "江山":[118.37,28.45],
                    "嘉兴":[120.45,30.46],
                    "金华":[119.39,29.07],
                    "兰溪":[119.28,29.12],
                    "临海":[121.08,28.51],
                    "丽水":[119.54,28.27],
                    "龙泉":[119.08,28.04],
                    "宁波":[121.33,29.52],
                    "平湖":[121.01,30.42],
                    "衢州":[118.52,28.58],
                    "瑞安":[120.38,27.48],
                    "上虞":[120.52,30.01],
                    "绍兴":[120.34,30],
                    "台州":[121.27,28.41],
                    "桐乡":[120.32,30.38],
                    "温岭":[121.21,28.22],
                    "温州":[120.39,28.01],
                    "萧山":[120.16,30.09],
                    "义乌":[120.04,29.18],
                    "乐清":[120.58,28.08],
                    "余杭":[120.18,30.26],
                    "余姚":[121.1,30.02],
                    "永康":[120.01,29.54],
                    "舟山":[122.06,30.01],
                    "诸暨":[120.14,29.43],
                    "重庆":[106.33,29.35],
                    "合川":[106.15,30.02],
                    "江津":[106.16,29.18],
                    "南川":[107.05,29.1],
                    "永川":[105.53,29.23],
                    "林芝":[94.36,29.65],
                    "天门":[113.17,30.65],
                    "迪庆":[99.66,27.82],
                    "晋中":[112.74,37.66],
                    "乌审旗":[108.82,38.61],
                    "荆州":[112.24,30.34],
                    "鄂尔多斯":[109.78,39.61],
                    "来宾":[109.22,23.75],
                    "池州":[117.48,30.67],
                    "阿坝":[102.22,31.90],
                    "神农架":[110.64,31.75],
                    "广安":[106.63,30.47],
                    "阿拉尔":[81.28,40.54],
                    "阿拉善盟":[105.72,38.85],
                    "阿里":[81.14,30.40],
                    "巴彦淖尔":[107.38,40.76],
                    "巴音郭楞":[86.14,41.76],
                    "白沙":[109.45,19.22],
                    "保亭":[109.70,18.63],
                    "博尔塔拉":[82.06,44.90],
                    "昌都":[97.18,31.13],
                    "昌江":[117.18,29.27],
                    "澄迈":[110.00,19.73],
                    "崇左":[107.35,22.40],
                    "达州":[107.51,31.19],
                    "大兴安岭":[124.59,51.92],
                    "德宏":[98.58,24.43],
                    "定安":[110.35,19.68],
                    "定西":[104.61,35.57],
                    "东方":[108.65,19.09],
                    "甘南":[102.91,34.98],
                    "甘孜":[101.96,30.04],
                    "固原":[106.28,36.00],
                    "果洛":[100.24,34.47],
                    "海北":[100.90,36.95],
                    "海东":[102.40,36.48],
                    "海西":[97.37,37.37],
                    "贺州":[111.55,24.41],
                    "红河州":[103.37,23.36],
                    "呼伦贝尔":[119.73,49.21],
                    "黄冈":[114.88,30.43],
                    "黄南":[102.01,35.51],
                    "喀什地区":[75.98,39.47],
                    "克孜勒苏柯尔克孜":[76.17,39.71],
                    "廊坊":[116.68,39.50],
                    "丽江":[100.22,26.85],
                    "连云港":[119.17,34.84],
                    "临沧":[100.08,23.89],
                    "临高":[109.66,19.91],
                    "陵水":[110.03,18.50],
                    "陇南":[104.92,33.39],
                    "吕梁":[111.15,37.51],
                    "眉山":[103.83,30.04],
                    "那曲":[92.05,31.47],
                    "怒江":[98.85,25.81],
                    "普洱":[100.97,22.78],
                    "黔东南":[107.98,26.58],
                    "黔南":[107.52,26.25],
                    "黔西南":[104.90,25.08],
                    "庆阳":[107.65,35.73],
                    "琼中":[109.83,19.03],
                    "三沙":[112.33,16.83],
                    "山南":[91.76,29.22],
                    "商洛":[109.94,33.86],
                    "图木舒克":[79.06,39.86],
                    "屯昌":[110.10,19.35],
                    "万宁":[110.38,18.79],
                    "文昌":[110.79,19.54],
                    "文山":[104.21,23.39],
                    "乌兰察布":[113.12,40.99],
                    "五家渠":[87.54,44.16],
                    "五指山":[109.51,18.77],
                    "西双版纳":[100.79,22.00],
                    "锡林郭勒盟":[116.04,43.93],
                    "襄阳":[112.13,32.04],
                    "兴安盟":[122.03,46.08],
                    "雄安新区":[121.56,31.24],
                    "宣城":[118.75,30.94],
                    "乐东":[109.17,18.74],
                    "盐城":[120.50,33.20],
                    "延边":[129.50,42.89],
                    "燕郊开发区":[116.80,39.94],
                    "洋浦经济开发区":[109.19,19.73],
                    "伊犁":[81.32,43.91],
                    "玉树":[97.00,33.00],
                    "中卫":[105.19,37.49],
                },
                areaFlag:["安庆","蚌埠","亳州","巢湖","滁州","阜阳","贵池","淮北","淮南","黄山","界首","六安","马鞍山","明光","宿州","天长","铜陵","芜湖","宣州","澳门","北京","福州","长乐","福安","福清","建瓯","建阳","晋江","龙海","龙岩","南安","南平","宁德","莆田","泉州","三明","邵武","石狮","武夷山","厦门","永安","漳平","漳州","兰州","白银","敦煌","嘉峪关","金昌","酒泉","临夏","平凉","天水","武威","西峰","玉门","张掖","广州","潮阳","潮州","澄海","从化","东莞","恩平","佛山","高明","高要","高州","鹤山","河源","花都","化州","惠阳","惠州","江门","揭阳","开平","乐昌","雷州","廉江","连州","罗定","茂名","梅州","南海","番禺","普宁","清远","三水","汕头","汕尾","韶关","深圳","顺德","四会","台山","吴川","新会","兴宁","阳春","阳江","英德","云浮","增城","湛江","肇庆","中山","珠海","南宁","北海","北流","百色","防城港","贵港","桂林","桂平","河池","合山","柳州","赁祥","钦州","梧州","玉林","宜州","贵阳","安顺","毕节","赤水","都匀","凯里","六盘水","清镇","铜仁","兴义","遵义","海口","儋州","琼海","琼山","三亚","通什","石家庄","安国","保定","霸州","泊头","沧州","承德","定州","丰南","高碑店","蒿城","邯郸","河间","衡水","黄骅","晋州","冀州","廓坊","鹿泉","南宫","秦皇岛","任丘","三河","沙河","深州","唐山","武安","邢台","辛集","新乐","张家口","涿州","遵化","郑州","安阳","长葛","登封","邓州","巩义","鹤壁","辉县","焦作","济源","开封","灵宝","林州","漯河","洛阳","南阳","平顶山","濮阳","沁阳","汝州","三门峡","商丘","卫辉","舞钢","项城","荥阳","新密","新乡","信阳","新郑","许昌","偃师","义马","禹州","周口","驻马店","哈尔滨","阿城","安达","北安","大庆","富锦","海林","海伦","鹤岗","黑河","佳木斯","鸡西","密山","牡丹江","讷河","宁安","齐齐哈尔","七台河","双城","尚志","双鸭山","绥芬河","绥化","铁力","同江","五常","五大连池","伊春","肇东","武汉","安陆","当阳","丹江口","大冶","恩施","鄂州","广水","洪湖","黄石","黄州","荆门","荆沙","老河口","利川","麻城","浦圻","潜江","石首","十堰","随州","天门","武穴","襄樊","咸宁","仙桃","孝感","宜昌","宜城","应城","枣阳","枝城","钟祥","长沙","常德","郴州","衡阳","洪江","怀化","凉山","湘西","抚州","津市","吉首","耒阳","冷水江","冷水滩","涟源","醴陵","临湘","浏阳","娄底","汨罗","韶山","邵阳","武冈","湘潭","湘乡","益阳","永州","沅江","岳阳","张家界","株洲","资兴","长春","白城","白山","大安","德惠","敦化","公主岭","和龙","桦甸","珲春","集安","蛟河","吉林","九台","辽源","临江","龙井","梅河口","舒兰","四平","松原","洮南","通化","图们","延吉","愉树","南京","常熟","常州","丹阳","东台","高邮","海门","淮安","淮阴","江都","姜堰","江阴","靖江","金坛","昆山","连去港","溧阳","南通","邳州","启乐","如皋","宿迁","苏州","太仓","泰兴","泰州","通州","吴江","无锡","兴化","新沂","徐州","盐在","扬中","扬州","宜兴","仪征","张家港","镇江","南昌","德兴","丰城","赣州","高安","吉安","景德镇","井冈山","九江","乐平","临川","萍乡","瑞昌","瑞金","上饶","新余","宜春","鹰潭","樟树","沈阳","鞍山","北票","本溪","朝阳","大连","丹东","大石桥","东港","凤城","抚顺","阜新","盖州","海城","葫芦岛","锦州","开原","辽阳","凌海","凌源","盘锦","普兰店","铁法","铁岭","瓦房店","兴城","新民","营口","庄河","呼和浩特","包头","赤峰","东胜","二连浩特","额尔古纳","丰镇","根河","海拉尔","霍林郭勒","集宁","临河","满洲里","通辽","乌兰浩特","乌海","锡林浩特","牙克石","扎兰屯","银川","青铜峡","石嘴山","吴忠","西宁","德令哈","格尔木","济南","安丘","滨州","昌邑","德州","东营","肥城","高密","菏泽","胶南","胶州","即墨","济宁","莱芜","莱西","莱阳","莱州","乐陵","聊城","临清","临沂","龙口","蓬莱","平度","青岛","青州","曲阜","日照","荣成","乳山","寿光","泰安","滕州","潍坊","威海","文登","新泰","烟台","兖州","禹城","枣庄","章丘","招远","诸城","淄博","邹城","太原","长治","大同","高平","古交","河津","侯马","霍州","介休","晋城","临汾","潞城","朔州","孝义","忻州","阳泉","永济","原平","榆次","运城","西安","安康","宝鸡","韩城","汉中","华阴","商州","铜川","渭南","咸阳","兴平","延安","榆林","上海","成都","巴中","崇州","达川","德阳","都江堰","峨眉山","涪陵","广汉","广元","华蓥","简阳","江油","阆中","乐山","泸州","绵阳","南充","内江","攀枝花","彭州","邛崃","遂宁","万县","万源","西昌","雅安","宜宾","自贡","资阳","台北","天津","拉萨","日喀则","香港","乌鲁木齐","阿克苏","阿勒泰","阿图什","博乐","昌吉","阜康","哈密","和田","克拉玛依","喀什","库尔勒","奎屯","石河子","塔城","吐鲁番","伊宁","昆明","保山","楚雄","大理","东川","个旧","景洪","开远","曲靖","瑞丽","思茅","畹町","宣威","玉溪","昭通","杭州","慈溪","东阳","奉化","富阳","海宁","湖州","建德","江山","嘉兴","金华","兰溪","临海","丽水","龙泉","宁波","平湖","衢州","瑞安","上虞","绍兴","台州","桐乡","温岭","温州","萧山","义乌","乐清","余杭","余姚","永康","舟山","诸暨","重庆","合川","江津","南川","永川","林芝","天门","迪庆","晋中","乌审旗","荆州","鄂尔多斯","来宾","池州","阿坝","神农架","广安"],
                //垂直柱状图配置
                verticalOption:{
                    tooltip : {trigger: 'axis', axisPointer : {type : 'shadow'}},
                    barWidth: 20,
                    color: ["#983ee6"],
                    itemStyle: {barBorderRadius: [10, 10, 0, 0]},
                    xAxis: {
                        type: 'category',
                        data: [],
                        axisLine: {lineStyle: {color: ['#fff'], width: 1}}
                    },
                    yAxis: {
                        splitLine: {show: true, lineStyle:{type:'dashed', color: ['#313758']}},
                        axisLine: {type: 'value', lineStyle: {color: ['#fff'], width: 1}}
                    },
                    series: [{
                        name: '数据',
                        type: 'bar',
                        data: []
                    }]
                },
                //垂直柱状图返回描述内容配置
                verticalTooltipOption:{
                    /* tooltip : {trigger: 'axis', axisPointer : {type : 'shadow'}},*/
                    tooltip: {
                        trigger: 'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。只有设置了这个参数才会出现竖直的线条
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        //指示器类型。
                        },
                        formatter: function (params) {//提示框自定义
                            const description=["具有良好的职业道德和科学的创新精神","具有良好的社会责任感","具有环境保护意识能按照5S管理的要求进行工作","具备安全规范的操作和管理能力","具备团队协作与沟通能力","具有利用网络、文献等获取信息的能力，具有较好表达个人意见能力","具有在工作中发现问题和解决问题的能力","具有一般的决策能力和执行能力","能够识读零件图、装配图、电路图、工艺文件、工艺卡作业指导书，绘制中等难度的机械和电气图","能够正确地使用常见机械、电气工量具，操作专业设备","能够对工量具和常用设备进行日常的维护和保养","能够使用万用表、示波器和智能设备检测较为复杂的汽车网络故障","能对检测设备具有一定的故障判断和检测的能力","具有较深的专业参数计算能力","能使用电气工具进行汽车电子器件检测与维修","熟悉汽车企业的管理模式和工作机制及特点","能够进行汽车核心零部件的装配和检查","能对检测的零部件和整车进行质量控制和评价","能进行整车调试和改装","能够及时发现和解决维修过程中出现的问题，进行总结和分享","能对售后车辆进行智能检测与管理","熟悉汽车零部件及机械电气自动化控制原理，掌握新型汽车网络技术","具有了解最新车辆智能化网联化等系统的能力","具有较高的自学能力","具有较好的知识积累和信息获取的能力","具有对未来汽车新技术的掌握能力","具有处理新一代信息技术能力和数字素养","具有较好的分析判断风险能力","具有较好的创新实践和经验总结能力","具备良好的抗压抗挫折能力，持续创新能力"];
                            const value=["1.a.1: 职业道德","1.b.1: 社会责任","1.c.1: 环境保护","1.d.1: 健康安全","1.e.1: 与人合作","1.f.1: 沟通交流","1.g.1: 解决问题","1.h.1: 执行能力","2.a.1:具有理解和执行标准、技术规范的能力","2.b.1:具有认识和使用生产工具的能力　","2.b.2:具有认识和使用生产工具的能力　","2.b.3:具有认识和使用生产工具的能力","2.b.4:具有认识和使用生产工具的能力","2.c.1: 具有掌握和运用工作方法的能力","2.c.2: 具有掌握和运用工作方法的能力","2.c.3: 具有掌握和运用工作方法的能力","2.c.4: 具有掌握和运用工作方法的能力","2.c.5:具有掌握和运用工作方法的能力","2.c.6: 具有掌握和运用工作方法的能力","2.e.1:具有信息处理能力","2.f.1: 具有数字应用能力","2.g.1: 具有自我学习能力　","2.g.2: 具有自我学习能力　","3.a.1: 学习能力　","3.a.2: 学习能力　","3.b.1:信息能力　","3.b.2:信息能力　","3.b.3:信息能力　","3.c.1:创业能力","3.c.2:创业能力"];
                            const map=new Map();
                            for (let i = 0; i <description.length; i++) {
                                map.set(value[i],description[i]);
                            }
                            //移除重复的数据
                            for (let i = 0; i < params.length; i++) {
                                for (let j = params.length - 1; j > i; j--) {
                                    if (params[j].data == params[i].data) {
                                        params.splice(j, 1);
                                        break;
                                    }
                                }
                            }

                            let tip = '';
                            for (let i = 0; i < params.length; i++) {//这里是自己定义样式， params[i].marker 表示是否显示左边的那个小圆圈
                                if (params[i].value != 0) {
                                    tip = tip + params[i].axisValue + '<br/>'+ map.get(params[i].axisValue);
                                }
                            }

                            return tip;
                        },
                    },
                    barWidth: 20,
                    color: ["#983ee6"],
                    itemStyle: {barBorderRadius: [10, 10, 0, 0]},
                    xAxis: {
                        type: 'category',
                        data: [],
                        axisLine: {lineStyle: {color: ['#fff'], width: 1}}
                    },
                    yAxis: {
                        splitLine: {show: true, lineStyle:{type:'dashed', color: ['#313758']}},
                        axisLine: {type: 'value', lineStyle: {color: ['#fff'], width: 1}}
                    },
                    series: [{
                        name: '数据',
                        type: 'bar',
                        data: []
                    }]
                },
                //曲线图 配置
                lineOption:{
                    tooltip: {trigger: 'axis', axisPointer: {type: 'cross', label:{color: '#f00'}}},
                    color: ["#2d98e6"],
                    xAxis: {
                        data: [],
                        axisLine: {lineStyle: {color: ['#fff'], width: 1}}
                    },
                    yAxis: {
                        splitLine: {show: true, lineStyle:{type:'dashed', color: ['#313758']}},
                        axisLine: {lineStyle: {color: ['#fff'], width: 1}}
                    },
                    series: [
                        {name: '岗位薪资', type: 'line', data: [],lineStyle:{width: 1}}
                    ]
                },
                //水平柱状图配置
                horizontalOption:{
                    tooltip : {trigger: 'axis', axisPointer : {type : 'shadow'}},
                    barWidth: 20,
                    color: ["#803ee6"],
                    itemStyle: {barBorderRadius: [0, 10, 10, 0]},
                    xAxis: {
                        axisLine: {lineStyle: {color: ['#fff'], width: 1}},
                        splitLine: {show: true, lineStyle:{type:'dashed', color: ['#313758']}}
                    },
                    yAxis: {
                        type: 'category',
                        data: [],
                        axisLine: {type: 'value', lineStyle: {color: ['#fff'], width: 1}}
                    },
                    series: [{
                        name: '数据',
                        type: 'bar',
                        data: []
                    }]
                },
                //饼状图 配置
                pieOption:{
                    title: {
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        textStyle:{
                            fontSize: 10,//字体大小
                            color: '#ffffff'//字体颜色
                        },
                    },
                    series: [
                        {
                            name: '姓名',
                            type: 'pie',
                            radius: '55%',
                            center: ['40%', '50%'],
                            data: [],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                }
                            }
                        }
                    ]
                },
                roseOption : {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        textStyle:{
                            fontSize: 10,//字体大小
                            color: '#ffffff'//字体颜色
                        },
                        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
                    },
                    series: [
                        {
                            name: '半径模式',
                            type: 'pie',
                            radius: [20, 110],
                            center: ['50%', '50%'],
                            roseType: 'radius',
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            data: [
                                {value: 10, name: 'rose1'},
                                {value: 5, name: 'rose2'},
                                {value: 15, name: 'rose3'},
                                {value: 25, name: 'rose4'},
                                {value: 20, name: 'rose5'},
                                {value: 35, name: 'rose6'},
                                {value: 30, name: 'rose7'},
                                {value: 40, name: 'rose8'}
                            ]
                        },
                    ]
                },

            //特殊饼图
                specialPieOption:{
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y: 'center',
                        textStyle:{
                            fontSize: 10,//字体大小
                            color: '#ffffff'//字体颜色
                        },

                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    color:[
                        'red','#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
                        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
                        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
                        '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
                    ],
                    title: {
                        text: '总数',
                        // subtext: 7789,
                        subtext: 1772,
                        textStyle: {
                            color: '#f2f2f2',
                            fontSize: 13,
                            top: '10px'
                            // align: 'center'
                        },
                        subtextStyle: {
                            fontSize: 13,
                            color: ['#ff9d19'],
                        },
                        x: 'center',
                        y: 'center'
                    },
                    grid: {
                        bottom: 150,
                        left: 100,
                        right: '10%'
                    },
                    series: [
                        // 主要展示层的
                        {
                            radius: ['40%', '81%'],
                            center: ['50%', '50%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: true,
                                    formatter: '{b}{d}%',
                                    textStyle: {
                                        fontSize: 13
                                    },
                                    position: 'outside'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 5,
                                    length2: 25
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {
                                    name: '完成数',
                                    value: 1151
                                },
                                {
                                    name: '未检查数',
                                    value: 620
                                }
                            ]
                        },
                        // 边框的设置
                        {
                            radius: ['40%', '44%'],
                            center: ['50%', '50%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            animation: false,
                            tooltip: {
                                show: false
                            },
                            data: [
                                {
                                    value: 1,
                                    itemStyle: {
                                        color: 'rgba(250,250,250,0.3)'
                                    }
                                }
                            ]
                        }
                    ]
                },
                //行业饼状图
                industryPieOption:{
                    title: {
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    color:['#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD','#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0','#4472C5','#ED7C30','#80FF80','#FF8096','#800080'],
                    legend: {
                        show:false,
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        textStyle:{
                            fontSize: 10,//字体大小
                            color: '#ffffff'//字体颜色
                        },
                    },
                    series: [
                        {
                            name: '姓名',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                }
                            }
                        }
                    ]
                },

                //中国地图
                nationMapOption:{
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
                            if(params.data['value']!=''&&params.data['value']!=undefined){
                                const value = params.data['value'][2];
                                if(value!=''&&value!=undefined){
                                    return params.name + '：' + params.data['value'][2];
                                }else{
                                    return params.name + '：' + params.data['value'];
                                }
                            }
                        },
                    },
                    series: [
                        {
                            name: '销量',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: [],
                            zoom: 1.2,
                            markPoint: {
                                symbol:'emptyCircle',
                                symbolSize : function (v){
                                    return 10 + v/6000
                                },
                                label:{
                                    show:false,
                                },
                                itemStyle: {
                                    color: '#00c1e6',
                                    borderColor: '#2d98e6',
                                    opacity: 0.3,
                                },
                                data: []
                            }
                        }
                    ]
                },
                //省份地图
                provinceMap:{
                    title: { // 设置标题
                        text: '选择所要查询的数据维度',
                        top: '3%',
                        left: '5%',
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 300,
                            color: '#b6d7ff'
                        }
                    },
                    tooltip: {
                        show: true,
                        formatter: function(params) {
                            const value = params.data['value'][2];
                            if(value!=''&&value!=undefined){
                                return params.name + '：' + params.data['value'][2];
                            }else{
                                return params.name + '：' + params.data['value'];
                            }
                        },
                    },
                    legend: {
                        orient: 'vertical',
                        top: '9%',
                        left: '5%',
                        icon: 'circle',
                        data: [],
                        selectedMode: 'single',
                        selected: {},
                        itemWidth: 12,
                        itemHeight: 12,
                        itemGap: 30,
                        inactiveColor: '#b6d7ff',
                        textStyle: {
                            color: '#ec808d',
                            fontSize: 14,
                            fontWeight: 300,
                            padding: [0, 0, 0, 15]
                        }
                    },
                    visualMap: { // 设置地图范围值显示的颜色
                        min: 0,
                        max: 500,
                        show: false,
                        splitNumber: 5,
                        inRange: {
                            color: ['#FACD91', '#74DFB2', '#81D3F8', '#768FDE', '#e9966f'].reverse()
                        },
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: { // 设置地图的显示信息
                        map: '重庆', // 注意  哪个区域的就显示哪个区域的名称
                        label: {
                            normal: { // 设置字体相关信息
                                show: true,
                                color: '#000'
                            },
                            emphasis: { // 设置鼠标移上去hover效果
                                show: true,
                                color: '#fff'
                            }
                        },
                        roam: false,
                        itemStyle: { // 设置地图块的相关显示信息
                            normal: {
                                areaColor: '#8db200',
                                borderColor: '#6367ad',
                                borderWidth: 1
                            },
                            emphasis: {
                                areaColor: '#feb6aa' // hover效果
                            }
                        },
                        left: '5%',
                        right: '5%',
                        top: '5%',
                        bottom: '5%'
                    },
                    series: [{ // 地图块的相关信息
                        name: '年度总项目数据查询',
                        type: 'map',
                        geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
                        data: []
                    }]

                }

            };
        },
        created(){
            
        },
        mounted() {
            
            //this.getProList();
            this.getProfessionInfo();
            this.getIndustryList();
            this.getIndustryAreaList();
            this.getSkillList();
            this.getSkillAreaList();
            this.getAbilityList();
           // this.getAbilityAreaList();
            this.getPostNeed();
            this.getPostNeedChange();
            this.getNationMap();
            this.getEnterpriseType();
            this.getProvinceMap();
            this.getSalaryLevel();
            this.getWorkExperince();
            this.getXueLi();
            this.getAreaSalary();
            this.getAreaWorkExperience();
            this.getAreaEducation();
            this.getAreaPostNeed();
            this.getIndustry();
            this.getIndustryArea();
            this.getSkill();
            this.getSkillArea();
            this.getAbility();
            //this.getAbilityArea();
            this.getManuplutionAbility();
            this.getManuplutionAbilityList();
            this.getDevelopAbility();
            this.getDevelopAbilityList();
        },
        methods: {
            getShowFlag(professionId){
                for(let i=0;i< this.echartVisuals.length;i++){
                    bigDataIndustry.getProfessionVisualShow(professionId,this.echartVisuals[i].name).then(response => {
                        switch(this.echartVisuals[i].value){
                            case "echartShow1":
                                this.echartShow1 = response.data;
                                break; 
                            case "echartShow2":
                                this.echartShow2 = response.data;
                                break; 
                            case "echartShow3":
                                 this.echartShow3 = response.data;
                                break; 
                            case "echartShow4":
                                 this.echartShow4 = response.data;
                                break; 
                            case "echartShow5":
                                 this.echartShow5 = response.data;
                                break; 
                            case "echartShow6":
                                 this.echartShow6 = response.data;
                                break; 
                            case "echartShow7":
                                 this.echartShow7 = response.data;
                                break; 
                        }
                    })
                }
                return echartShow;
            },
            getProList() {
				getAfterJobClass(this.listQuery).then(response => {
				this.propsOption = response.data;
				}).catch(reason => {
				this.$message.error(reason.message);
				});
			},
            menuCreate(){
                const datas=new Array();

                this.menuValue=datas;
            },
            loginOut(){
                this.$confirm('确定要退出系统吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					sessionStorage.clear();
					localStorage.clear();
					store.dispatch('LogOut').then(() => {
						NProgress.done();
						this.$router.push({ path: "/" });
					});
				}).catch(() => {
				});
            },
            handleChange(value) {
                console.log(value);
                this.professionCode=value[1];
                this.getProfessionInfo();
                this.getIndustryList();
                this.getIndustryAreaList();
                this.getSkillList();
                this.getSkillAreaList();
                this.getAbilityList();
                //this.getAbilityAreaList();
                this.getPostNeed();
                this.getPostNeedChange();
                this.getNationMap();
                this.getEnterpriseType();
                this.getProvinceMap();
                this.getSalaryLevel();
                this.getWorkExperince();
                this.getXueLi();
                this.getAreaSalary();
                this.getAreaWorkExperience();
                this.getAreaEducation();
                this.getAreaPostNeed();
                this.getIndustry();
                this.getIndustryArea();
                this.getSkill();
                this.getSkillArea();
                this.getAbility();
                //this.getAbilityArea();
                this.getManuplutionAbility();
                this.getManuplutionAbilityList();
                this.getDevelopAbility();
                this.getDevelopAbilityList();

            },
            onSubmit() {
                console.log('submit!');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            getPostNeed(){
                let myChart = this.echarts.init(document.getElementById("myChart1"));
                bigDataIndustry.getPostNeed(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.verticalOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "岗位（数量）";
                    myChart.setOption(options);
                });

            },
            getPostNeedChange(flag){
                let myChart = this.echarts.init(document.getElementById("myChart2"));
                if (flag == 2) {
                    flag = 2
                }else {
                    flag=this.areaDateFlag.flag;
                }
                bigDataIndustry.getPostNeedChange(this.professionCode,flag).then(response => {
                    const options = $.extend(true, {}, this.lineOption);
                    options.xAxis.data = response.data.trendName;
                    options.series[0].data =response.data.trendValue;
                    options.series[0].name = "岗位（数量）";
                    myChart.setOption(options);
                });
            },
            getNationMap(){
                let myChart = this.echarts.init(document.getElementById("myChart3"));
                bigDataIndustry.getNationMap(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.nationMapOption);
                    const nameList = response.data.nameList;
                    const areaList = response.data.areaList;
                    const datas=new Array();
                    for (let i = 0; i <nameList.length; i++) {
                        if($.inArray(nameList[i], this.areaFlag) >= 0){
                            datas.push({
                                "name":nameList[i],
                                "coord":this.geoCoordMap[nameList[i]],
                                "value":parseInt(areaList[i])
                            })
                        }
                    }
                    options.series[0].markPoint.data =datas;
                    options.series[0].name = "岗位（数量）";
                    myChart.setOption(options);
                });
            },
            getEnterpriseType(){
                let myChart = this.echarts.init(document.getElementById("myChart4"));
                bigDataIndustry.getEnterpriseType(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.specialPieOption);
                    const nameList = response.data.nameList;
                    const areaList = response.data.areaList;
                    // options.legend.data=nameList;
                    const datas=new Array();
                    let total=0;
                    let newname=new Array();
                    let newarea=new Array();
                    let minying=0
                    for (let i = 0; i <nameList.length; i++) {
                            if(nameList[i]=='民营公司' || nameList[i]=='私营/民营企业' || nameList[i]=='创业公司'){
                                minying+=areaList[i];
                            }else{
                                newname.push(nameList[i]);
                                newarea.push(areaList[i])
                                datas.push({
                                    "name":nameList[i],
                                    "value":parseInt(areaList[i])
                                });
                            }
                        total+=areaList[i];
                    }
                    /*newname.push('民营公司');
                    newarea.push(minying)*/
                    for (let i = 0; i <newarea.length; i++) {
                        if(newarea[i]<minying){
                            newname.splice(i,0,'民营公司');
                            //newarea.push(minying)
                            newarea.splice(i,0,minying);
                            break;
                        }
                    }
                    datas.push({
                        "name":'民营公司',
                        "value":minying
                    });
                    this.enterpriseTypeList.data=this.getMaxTeen(newname,newarea);
                    options.legend.data=newname;
                    options.series[0].data =datas;
                    options.title.subtext=total;
                    myChart.setOption(options);
                });
            },
            getProvinceMap(){
                let myChart = this.echarts.init(document.getElementById("myChart5"));
                bigDataIndustry.getProvinceMap(this.professionCode).then(response => {
                    const nameList = response.data.dataResultMap.nameList;
                    const areaList = response.data.dataResultMap.areaList;
                    const provincepinyin = response.data.provincepinyin;
                    const code = response.data.code;
                    const datas=new Array();
                    for (let i = 0; i <nameList.length; i++) {
                            datas.push({
                                "name":nameList[i],
                                "value":parseInt(areaList[i])
                            })
                    }
                    this.provinceJobNumberList.data=this.getMaxTeen(nameList,areaList);
                    this.cityMapName=provincepinyin;
                    this.chinaId=code; // 地图 code
                    this.chinaName=provincepinyin; // 地图 区域名
                    //this.chinaJson=datas;// 地图 json数据
                    const testJson = require("../../assets/provinceMap/" + this.cityMapName + ".json");          // 获取地图json文件
                    this.chinaJson = testJson;
                    this.mapOption(
                        myChart,
                        this.chinaId,
                        this.chinaName,
                        this.chinaJson,
                        datas
                    );

                });
            },
            // 地图option
            mapOption(myChart, id, name, mapJson,datas) {
                this.echarts.registerMap(name, mapJson);
                myChart.setOption({
                    tooltip: {
                        show: true,
                        formatter: function(params) {
                            const value = params.data['value'][2];
                            if(value!=''&&value!=undefined){
                                return params.name + '：' + params.data['value'][2];
                            }else{
                                return params.name + '：' + params.data['value'];
                            }
                        },
                    },
                    visualMap: {
                        min: 0,
                        max: 500,
                        show: false,
                        splitNumber: 5,
                        inRange: {
                            color: ['#74DFB2', '#81D3F8', '#768FDE'].reverse()
                        },
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series: [
                        {
                            type: "map",
                            map: name,
                            itemStyle: {
                                normal: {
                                    borderColor: "#1dc199",                     // 地图边框颜色
                                    borderWidth: 1                              // 地图边框宽度
                                }
                            },
                            data: datas              // 地图加载的后台数据可自行修改
                        }
                    ]
                });
            },
            getSalaryLevel(){
                let myChart = this.echarts.init(document.getElementById("myChart6"));
                bigDataIndustry.getSalaryLevel(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.pieOption);
                    const nameList = response.data.nameResultList;
                    const areaList = response.data.valueResultList;
                    const nameOrderList = response.data.nameList;
                    const valueOrderList = response.data.areaList;
                    this.salaryList.data=this.getMaxThree(nameOrderList,valueOrderList);
                    options.series[0].data =this.getDataArray(nameList,areaList);
                    options.series[0].name = "薪资（人数）";
                    const colors=new Array();
                    for(let i=0;i<200;i++){
                        colors.push('#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6));
                    }
                    options.color=colors;
                    myChart.setOption(options);
                });
            },
            getWorkExperince(){
                let myChart = this.echarts.init(document.getElementById("myChart7"));
                bigDataIndustry.getWorkExperince(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.pieOption);
                    const nameList = response.data.nameResultList;
                    const areaList = response.data.valueResultList;
                    const nameOrderList = response.data.nameList;
                    const valueOrderList = response.data.areaList;
                    this.workExperienceList.data=this.getMaxThree(nameOrderList,valueOrderList);
                    options.series[0].data =this.getDataArray(nameList,areaList);
                    options.series[0].name = "经验（人数）";
                    const colors=new Array();
                    for(let i=0;i<200;i++){
                        colors.push('#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6));
                    }
                    options.color=colors;
                    myChart.setOption(options);
                });
            },
            getXueLi(){
                let myChart = this.echarts.init(document.getElementById("myChart8"));
                bigDataIndustry.getXueLi(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.pieOption);
                    const nameList = response.data.nameResultList;
                    const areaList = response.data.valueResultList;
                    const nameOrderList = response.data.nameList;
                    const valueOrderList = response.data.areaList;
                    this.xueLiList.data=this.getMaxThree(nameOrderList,valueOrderList);
                    options.series[0].data =this.getDataArray(nameList,areaList);
                    options.series[0].name = "学历（人数）";
                    const colors=new Array();
                    for(let i=0;i<200;i++){
                        colors.push('#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6));
                    }
                    options.color=colors;
                    myChart.setOption(options);
                });
            },
            getAreaSalary(){
                let myChart = this.echarts.init(document.getElementById("myChart9"));
                bigDataIndustry.getAreaSalary(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.roseOption);
                    const nameList = response.data.nameResultList;
                    const areaList = response.data.valueResultList;
                    const nameOrderList = response.data.nameList;
                    const valueOrderList = response.data.areaList;
                    this.salaryAreaList.data=this.getMaxThree(nameOrderList,valueOrderList);
                    options.series[0].data =this.getDataArray(nameList,areaList);
                    options.series[0].name = "薪资（人数）";
                    options.legend.data=nameList;
                    const colors=new Array();
                    for(let i=0;i<200;i++){
                        colors.push('#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6));
                    }
                    options.color=colors;
                    myChart.setOption(options);
                });
            },
            getAreaWorkExperience(){
                let myChart = this.echarts.init(document.getElementById("myChart10"));
                bigDataIndustry.getAreaWorkExperience(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.roseOption);
                    const nameList = response.data.nameResultList;
                    const areaList = response.data.valueResultList;
                    const nameOrderList = response.data.nameList;
                    const valueOrderList = response.data.areaList;
                    this.workExperienceAreaList.data=this.getMaxThree(nameOrderList,valueOrderList);
                    options.series[0].data =this.getDataArray(nameList,areaList);
                    options.series[0].name = "经验（人数）";
                    options.legend.data=nameList;
                    const colors=new Array();
                    for(let i=0;i<200;i++){
                        colors.push('#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6));
                    }
                    options.color=colors;
                    myChart.setOption(options);
                });
            },
            getAreaEducation(){
                let myChart = this.echarts.init(document.getElementById("myChart11"));
                bigDataIndustry.getAreaEducation(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.roseOption);
                    const nameList = response.data.nameResultList;
                    const areaList = response.data.valueResultList;
                    const nameOrderList = response.data.nameList;
                    const valueOrderList = response.data.areaList;
                    this.educationAreaList.data=this.getMaxThree(nameOrderList,valueOrderList);
                    options.series[0].data =this.getDataArray(nameList,areaList);
                    options.series[0].name = "学历（人数）";
                    options.legend.data=nameList;
                    const colors=new Array();
                    for(let i=0;i<200;i++){
                        colors.push('#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6));
                    }
                    options.color=colors;
                    myChart.setOption(options);
                });
            },
            getAreaPostNeed(flag){
                let myChart = this.echarts.init(document.getElementById("myChart12"));
                if (flag == 2) {
                    flag = 2
                }else {
                    flag=this.areaDateFlag.flag;
                }
                bigDataIndustry.getAreaPostNeed(this.professionCode,flag).then(response => {
                    const options = $.extend(true, {}, this.lineOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "岗位（数量）";
                    myChart.setOption(options);
                });
            },
            getProfessionInfo(){
                const _this=this;
                bigDataIndustry.getProfessionInfo(this.professionCode).then(response => {
                    _this.professionBigCategory=response.data.professionBigCategory;
                    _this.ppIndustryName=response.data.ppIndustryName;
                    _this.sysIndustryTypeName=response.data.sysIndustryTypeName;
                    _this.trainGoal=response.data.trainGoal;
                    _this.jobfaceProfession=response.data.jobfaceProfession;
                    _this.professionId = response.data.professionId;
                    this.getShowFlag(response.data.professionId);
                });
            },
            getIndustry(){
                let myChart = this.echarts.init(document.getElementById("myChart13"));
                bigDataIndustry.getIndustry(this.professionCode).then(response => {



                    const options = $.extend(true, {}, this.industryPieOption);
                    const nameList = response.data.nameList;
                    const areaList = response.data.areaList;
                    // options.legend.data=nameList;
                    const datas=new Array();
                    let total=0;
                    for (let i = 0; i <nameList.length; i++) {
                        datas.push({
                            "name":nameList[i],
                            "value":parseInt(areaList[i])
                        });
                        total+=areaList[i];
                    }
                    this.industryTypeList.data=this.getMaxThree(nameList,areaList);
                    //options.legend.data=nameList;
                    options.series[0].data =datas;
                    options.series[0].name = "行业（数量）";
                    // options.title.subtext=total;
                    myChart.setOption(options);


                    /*const options = $.extend(true, {}, this.verticalOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "行业（数量）";
                    myChart.setOption(options);*/

                });

            },
            getIndustryList(){
                bigDataIndustry.getIndustry(this.professionCode).then(response => {
                    const nameList = response.data.nameList;
                    const valueList = response.data.areaList;
                    const result=this.getMaxCount(nameList,valueList,3)
                    this.industryList=result;
                });
            },
            getIndustryArea(){
                let myChart = this.echarts.init(document.getElementById("myChart14"));
                bigDataIndustry.getIndustryArea(this.professionCode).then(response => {

                    const options = $.extend(true, {}, this.industryPieOption);
                    const nameList = response.data.nameList;
                    const areaList = response.data.areaList;
                    // options.legend.data=nameList;
                    const datas=new Array();
                    let total=0;
                    for (let i = 0; i <nameList.length; i++) {
                        datas.push({
                            "name":nameList[i],
                            "value":parseInt(areaList[i])
                        });
                        total+=areaList[i];
                    }
                    this.provinceIndustryTypeList.data=this.getMaxThree(nameList,areaList);
                    //options.legend.data=nameList;
                    options.series[0].data =datas;
                    options.series[0].name = "行业（数量）";
                    //options.title.subtext=total;
                    myChart.setOption(options);

                    /* const options = $.extend(true, {}, this.verticalOption);
                     options.xAxis.data = response.data.nameList;
                     options.series[0].data =response.data.areaList;
                     options.series[0].name = "行业（数量）";
                     myChart.setOption(options);*/

                });

            },
            getIndustryAreaList(){
                bigDataIndustry.getIndustryArea(this.professionCode).then(response => {
                    const nameList = response.data.nameList;
                    const valueList = response.data.areaList;
                    const result =this.getMaxCount(nameList,valueList,3);
                    this.industryAreaList=result;
                });
            },
            getSkill(){
                let myChart = this.echarts.init(document.getElementById("myChart15"));
                bigDataIndustry.getSkill(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.verticalOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "技能（数量）";
                    myChart.setOption(options);

                });

            },
            getSkillList(){
                bigDataIndustry.getSkill(this.professionCode).then(response => {
                    const nameList = response.data.nameList;
                    const valueList = response.data.areaList;
                    const result =this.getMaxCount(nameList,valueList,3);
                    this.skillList.data=result;
                });
            },
            getSkillArea(){
                let myChart = this.echarts.init(document.getElementById("myChart16"));
                bigDataIndustry.getSkillArea(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.verticalOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "技能（数量）";
                    myChart.setOption(options);

                });

            },
            getSkillAreaList(){
                bigDataIndustry.getSkillArea(this.professionCode).then(response => {
                    const nameList = response.data.nameList;
                    const valueList = response.data.areaList;
                    const result =this.getMaxCount(nameList,valueList,3);
                    this.skillAreaList.data=result;
                });
            },
            getAbility(){
                /*let myChart = this.echarts.init(document.getElementById("myChart17"));
                bigDataIndustry.getAbility(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.verticalOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "能力（数量）";
                    myChart.setOption(options);

                });*/
                let myChart = this.echarts.init(document.getElementById("myChart17"));
                bigDataIndustry.getSocietyAbility(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.verticalTooltipOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "能力（数量）";
                    myChart.setOption(options);

                });

            },
            getAbilityList(){
              /*  bigDataIndustry.getAbility(this.professionCode).then(response => {
                    const nameList = response.data.nameList;
                    const valueList = response.data.areaList;
                    const result =this.getMaxCount(nameList,valueList,3);
                    this.abilityList.data=result;
                });*/
                bigDataIndustry.getSocietyAbility(this.professionCode).then(response => {
                    const nameList = response.data.nameList;
                    const valueList = response.data.areaList;
                    const result=this.getMaxCount(nameList,valueList,3)
                    this.societyAbilityList=result;
                });
            },
            getManuplutionAbility(){
                let myChart = this.echarts.init(document.getElementById("myChart18"));
                bigDataIndustry.getManuplutionAbility(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.verticalTooltipOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "能力（数量）";
                    myChart.setOption(options);

                });

            },
            getManuplutionAbilityList(){
                    bigDataIndustry.getManuplutionAbility(this.professionCode).then(response => {
                        const nameList = response.data.nameList;
                        const valueList = response.data.areaList;
                        const result=this.getMaxCount(nameList,valueList,3)
                        this.manuplutionAbilityList=result;
                    });
            },
            getDevelopAbility(){
                let myChart = this.echarts.init(document.getElementById("myChart19"));
                bigDataIndustry.getDevelopAbility(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.verticalTooltipOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "能力（数量）";
                    myChart.setOption(options);

                });

            },
            getDevelopAbilityList(){
                bigDataIndustry.getDevelopAbility(this.professionCode).then(response => {
                    const nameList = response.data.nameList;
                    const valueList = response.data.areaList;
                    const result=this.getMaxCount(nameList,valueList,3)
                    this.developAbilityList=result;
                });
            },
            getAbilityArea(){
                let myChart = this.echarts.init(document.getElementById("myChart18"));
                bigDataIndustry.getAbilityArea(this.professionCode).then(response => {
                    const options = $.extend(true, {}, this.verticalOption);
                    options.xAxis.data = response.data.nameList;
                    options.series[0].data =response.data.areaList;
                    options.series[0].name = "能力（数量）";
                    myChart.setOption(options);

                });

            },
            getAbilityAreaList(){
                bigDataIndustry.getAbilityArea(this.professionCode).then(response => {
                    const nameList = response.data.nameList;
                    const valueList = response.data.areaList;
                    const result =this.getMaxCount(nameList,valueList,3);
                    this.abilityAreaList.data=result;
                });
            },
            getDataArray(nameList,areaList){
                const datas=new Array();
                for (let i = 0; i <nameList.length; i++) {
                    datas.push({
                        "name":nameList[i],
                        "value":parseInt(areaList[i])
                    })
                }
                return datas;
            },
            getMaxThree(nameList,valueList){
                const datas=new Array();
                if (nameList.length > 3) {
                    for (let i = 0; i <3; i++) {
                        datas.push({
                            "order":i+1,
                            "name":nameList[i],
                            "value":valueList[i]
                        })
                    }
                }else {
                    for (let i = 0; i <nameList.length; i++) {
                        datas.push({
                            "order":i+1,
                            "name":nameList[i],
                            "value":valueList[i]
                        })
                    }
                }
                return datas;
            },
            getMaxTeen(nameList,valueList){
                const datas=new Array();
                if (nameList.length > 10) {
                    for (let i = 0; i <10; i++) {
                        datas.push({
                            "order":i+1,
                            "name":nameList[i],
                            "value":valueList[i]
                        })
                    }
                }else {
                    for (let i = 0; i <nameList.length; i++) {
                        datas.push({
                            "order":i+1,
                            "name":nameList[i],
                            "value":valueList[i]
                        })
                    }
                }
                return datas;

            },
            getMaxCount(nameList,valueList,count){
                const datas=new Array();
                if (nameList.length > count) {
                    for (let i = 0; i <count; i++) {
                        datas.push({
                            "order":i+1,
                            "name":nameList[i],
                            "value":valueList[i]
                        })
                    }
                }else {
                    for (let i = 0; i <nameList.length; i++) {
                        datas.push({
                            "order":i+1,
                            "name":nameList[i],
                            "value":valueList[i]
                        })
                    }
                }
                return datas;
            },
            cellStyle(row,column,rowIndex,columnIndex){
                // console.log(row);
                // console.log(row.column);
                return 'color:white'
            },
            rowStyle(row, rowIndex){
                 console.log(row);
                console.log(row.column);
                return {'color':'white','background-color': 'rgba(255, 0, 0, 0.2)'}
            },
        }
    }
</script>

<style scoped>
    @import "./../../assets/css/sysDen/denMain.css";
    @import "./../../assets/css/sysEchart/echartMain.css";

</style>
