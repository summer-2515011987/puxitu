<template>
    <div style=" width:100%;height:100%;background-color:white;
        border-radius: 4px;
        border: 1px solid #93A5E0;"> 
        <el-container class="h100p">
            <el-header class="page1-unit-title-div">
                <span class="tringle-red-icon"></span>全国区域本专业所对应的岗位信息</el-header>
            <el-main>
                <el-container class="h100p">
                    <el-aside width="297px">
                        <el-container class="h100p">
                            <el-header class="page1-rank2-title-div">专业目录</el-header>
                            <el-header style="padding:10px;    border-right: 1px solid #93A5E0;">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align:left;">
                                    <el-form-item label="">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="searchBtn" type="primary" @click="onSubmit">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-header>
                            <el-main style="padding:10px;    border-right: 1px solid #93A5E0;">
                                <el-tree
                                    :data="data"
                                    show-checkbox
                                    node-key="id"
                                    :default-expanded-keys="[2, 3]"
                                    :default-checked-keys="[5]"
                                    :props="defaultProps">
                                </el-tree>
                            </el-main>
                        </el-container>
                    </el-aside>
                    <el-container>
                        <el-header class="page1-rank2-title-div">专业列表</el-header>
                        <el-header style="padding:10px 0px 10px 30px;">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align:left;">
                                <el-form-item label="审批人">
                                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                </el-form-item>
                                <el-form-item label="活动区域">
                                    <el-select v-model="formInline.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="searchBtn" type="primary" @click="onSubmit">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-header>
                        <el-main style="padding: 0 30px 0;">
                            <el-table 
                                    :data="tableData"
                                    :height="clientHeight-380" stripe
                                    border
                                    style="width: 100%;flex:1">
                                <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="地址">
                                </el-table-column>
                            </el-table> 
                            <div class="block toolbar">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage4"
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400">
                                </el-pagination>
                            </div>
                        </el-main>
                    </el-container>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>
<script>
// import basicMsg from "./basicMsg";
export default {
    data() {
        return {
            activeName: 'accountManagement',
            tabIndex: 0,
            localData: {},
            tabBox: {},
            formInline: {
                user: '',
                region: ''
            },
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
                }],
                defaultProps: {
                children: 'children',
                label: 'label'
                }
            };
        // };
    },
    mounted () {
    },
    methods: {
    },
    components: {
        // basicMsg
    }
}
</script>
<style scoped>
@import "./../../assets/css/common.css";
@import "./../../assets/css/common-table.css";
@import "./../../assets/css/sysSet/page1.css";
</style>
