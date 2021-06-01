<template>
    <div class="container-unit">  
        <div class="unit-title-div">
            <span class="tringle-red-icon"></span>
            <span class="unit-title">职业数据管理</span>
        </div>
        <div class="unit-choose-div">
            <div class="block">
                <el-cascader id="set-cascader-id" :popper-append-to-body="false" popper-class="test-cascade" :options="options" :props="{ expandTrigger: 'hover' }" v-model="value"  @change="handleChange">
                    <template slot-scope="{ node, data }">
                        <span>{{ data.label }}</span>
                        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                    </template>
                </el-cascader>
            </div>
        </div>
        <div class="unit-main-div">
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
        </div>
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
            value: [],
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            clientHeight: 0,
            formInline: {
                user: '',
                region: ''
            },
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                    value: 'yizhi',
                    label: '一致'
                    }, {
                    value: 'fankui',
                    label: '反馈'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                    }, {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                    }]
                }]}, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                        }, {
                        value: 'color',
                        label: 'Color 色彩'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                        }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                        },{
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                        },{
                        value: 'form',
                        label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                        value: 'table',
                        label: 'Table 表格'
                        }, {
                        value: 'tag',
                        label: 'Tag 标签'
                        }, {
                        value: 'badge',
                        label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                        }, {
                        value: 'notification',
                        label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                        },  {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                        }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                        }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                        }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                        }]
                    }]
                    }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
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
            }]
        };
    },
    mounted () {
        this.clientHeight = document.documentElement.clientHeight;
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        onSubmit() {
            console.log('submit!');
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    components: {
        // basicMsg
    }
}
</script>
<style scoped>
@import "./../../assets/css/common.css";
@import "./../../assets/css/common-table.css";
@import "./../../assets/css/sysSet/zysjgl.css";
</style>
