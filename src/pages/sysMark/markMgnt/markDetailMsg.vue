<template>
    <div class="main_contain2">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 标注管理 - 详情</p>
            <div class="nav">
                <span class="lt">专业：{{className}}</span>
                <span class="rt">
                    <span>任务id：{{passedTaskItem.taskId}} &nbsp;&nbsp;&nbsp;&nbsp;任务名称：{{passedTaskItem.taskName}}
                        &nbsp;&nbsp;&nbsp;&nbsp;创建时间：{{passedTaskItem.createTime?passedTaskItem.createTime.split("T")[0]:''}}
                        &nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-button class="myCheckButton" size="mini" type="primary" @click="returnList">返回任务列表</el-button>
                </span>
            </div>
        </div>
        <div class="myTable">
            <div style="text-align:left;font-size:16px;height:25px;">
                <span
                    class="lt">岗位：{{passedPositionItem.positionTitle}}&nbsp;&nbsp;&nbsp;&nbsp;发布公司：{{passedPositionItem.companyName}}&nbsp;&nbsp;&nbsp;&nbsp;发布时间：{{passedPositionItem.date?passedPositionItem.date.split("T")[0]:''}}</span>
                <span class="rt">
                    <el-button class="myCheckButton" size="mini" type="primary" @click="showLastOrNextPosition('last')">
                        上一条</el-button>
                    <el-button class="myCheckButton" size="mini" type="primary" @click="showLastOrNextPosition('next')">
                        下一条</el-button>
                </span>
            </div>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="12">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="关键词标注" name="first"> </el-tab-pane>
                        <el-tab-pane label="句子标注" name="second"> </el-tab-pane>
                    </el-tabs>
                    <!-- <div v-show="activeName=='first'"  id="div123" style="height:400px;text-align:left;"  ></div> -->
                    <div v-show="activeName=='first'"
                        style="height:400px;text-align:left;background-color:white;padding:10px;overflow-y:auto;">
                        {{passedPositionItem.positionDetail}}</div>

                    <el-table v-show="activeName=='second'" ref="multipleTable" height="500px" :data="tableData"
                        tooltip-effect="dark" style="width: 100%">
                        <el-table-column label="分句数据列表">
                            <template slot-scope="scope">{{ scope.row}}</template>
</el-table-column>
</el-table>

</el-col>
<el-col :span="12" style="height:535px;text-align:left;">
    <!-- 关键字 -->
    <el-row v-show="activeName=='first'" style="margin: 30px 0 0 30px;">
        <el-transfer filterable :filter-method="filterMethod" filter-placeholder="" :titles="['自动标注结果', '关键词筛选结果']" v-model="transferValue" :data="data">
        </el-transfer>
    </el-row>
    <!-- 句子标注 -->
    <el-row v-show="activeName=='second'" style="margin: 30px 0 0 30px;height:100%;overflow:auto;">
        <el-row v-for="item in options3" :key="item" style="height: 35%;border: 1px solid lightgrey;overflow:auto;background-color: white;">
            <div class="div_title">{{item.name}}</div>
            <div style="padding:10px;">
                <div v-for="(arr,index) in item.children" :key="index">
                    <el-row>
                        <el-col :span="24">
                            <el-input v-model="item.children[index]"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-row>
    </el-row>
</el-col>
</el-row>
</div>
</div>
</template>

<script>
    import E from "wangeditor";
    import draggable from 'vuedraggable'
    import service from '@/api/markMgntAPI.js';
    Array.prototype.filter = Array.prototype.filter || function(func) {
        var arr = this;
        var r = [];
        for (var i = 0; i < arr.length; i++) {
            if (func(arr[i], i, arr)) {
                -
                r.push(arr[i]);
            }
        }
        return r;
    }
    export default {
        name: "markDetail",
        components: {
            draggable
        },
        data() {
            return {
                className: sessionStorage.getItem("taskClassName") ? sessionStorage.getItem("taskClassName") : "",
                radio: 3,
                transferHeight: (document.documentElement.clientHeight - 300) + 'px',
                data: [],
                transferValue: [],
                positionIds: sessionStorage.getItem("positionIds"),
                passedTaskItem: sessionStorage.getItem("taskItem") ? JSON.parse(sessionStorage.getItem("taskItem")) : {},
                passedPositionItem: sessionStorage.getItem("passedPositionItem") ? JSON.parse(sessionStorage.getItem(
                    "passedPositionItem")) : {},
                drag: false,
                value: '',
                options3: [],
                selectValue1: '',
                selectValue2: '',
                arr1: [],
                arr2: ['已选列表'],
                dragedKeyword: '',
                activeName: 'first',
                listLoading: false,
                editor2FocusFlag: false,
                editor2LastHtml: '',
                editor2: null,
                lastHtmlContent: '',
                colorsArr: ["rgb(255, 218, 185)", "rgb(0, 139, 139)", "rgb(0, 245, 255)", "rgb(84, 255, 159)",
                    "rgb(100, 149, 237)", "rgb(255, 215, 0)", "rgb(255, 114, 86)", "rgb(255, 131, 250)"
                ],
                tableData: [],
                multipleSelection: [],
                hasSavedFenjuJson: '',
            }
        },
        methods: {
            filterMethod(query, item) {
                return item.label.indexOf(query) > -1;
            },
            findInfoByPositionId(currentPId) {
                this.hasSavedFenjuJson = "";
                this.arr1 = [];
                this.tableData = [];
                service.findInfoByPositionId(currentPId).then(response => {
                    this.passedTaskItem = response.data.taskPosition;
                    this.passedPositionItem = response.data.outPositionInfo[0];

                    var setWords = new Set(this.passedPositionItem.positionDetailSystemKeywords); //自动关键词列表
                    var hasSavedKeyWords = new Set(this.passedPositionItem.positionDetailKeywordsMv); //已经保存的关键词
                    this.hasSavedFenjuJson = response.data.taskPosition.htmlContent; //已经保存的分句

                    // 给自动标注结果赋值
                    this.arr1 = Array.from(setWords);
                    this.generateData();

                    // 给筛选结果列表赋值
                    this.initSavedKeywords(hasSavedKeyWords);
                    this.tableData = this.passedPositionItem.positionDetailSystemFenju;

                    if (this.activeName == 'first') {
                        this.initEditor1()
                    } else {
                        this.initSavedFenju(); // 给维度保存的分句赋值
                    }
                });
            },
            returnList() {
                this.$router.push({
                    path: "/markMain/taskList"
                })
            },
            handleClick(tab, event) {
                console.log(tab, event);
                if (tab.index == 0) {
                    this.initEditor1();
                } else {
                    this.initSavedFenju(); // 给维度保存的分句赋值
                }
            },
            initEditor1() {
                // const editor = new E("#div123");
                // editor.config.menus = [];
                // editor.create();
                // editor.txt.html(this.passedPositionItem.positionDetail);
            },
            showLastOrNextPosition(flag) {
                var currentPositionId = this.passedPositionItem.id;
                var positionArr = this.positionIds.split(',');
                var index = positionArr.indexOf(currentPositionId);
                var lastOrNextPositionId = '';
                var newIndex = '';

                if (flag == 'last') { //上一条
                    if (index == 0) {
                        this.$message({
                            message: '目前是第一条数据!',
                            type: 'warning'
                        });
                        return;
                    }
                    newIndex = index - 1;
                } else {
                    if (index == positionArr.length - 1) {
                        this.$message({
                            message: '已经是最后一条数据!',
                            type: 'warning'
                        });
                        return;
                    }
                    newIndex = index + 1;
                }
                //清空分句维度数据
                // debugger;
                for (var item of this.options3) {
                    if (item.children) {
                        item.children = [];
                    }
                }

                lastOrNextPositionId = positionArr[newIndex];
                this.findInfoByPositionId(lastOrNextPositionId);
            },
            getDimList() {
                service.getDimList().then(response => {
                    this.options3 = response.data;
                });
            },
            generateData() {
                this.data = [];
                this.arr1.forEach((city, index) => {
                    this.data.push({
                        label: city,
                        key: index,
                    });
                });
            },
            initSavedKeywords(hasSavedKeyWords) {
                this.transferValue = [];
                this.data; //全列表
                for (var da of this.data) {
                    for (var sa of hasSavedKeyWords) {
                        if (da.label == sa) {
                            this.transferValue.push(da.key);
                        }
                    }
                }
            },
            initSavedFenju() {
                if (this.hasSavedFenjuJson == "") {
                    return;
                }
                var hasSavedFenJuObj = JSON.parse(this.hasSavedFenjuJson);
                for (var op of this.options3) {
                    var name = op.name;
                    op.children = hasSavedFenJuObj[name];
                }
            },
        },
        mounted() {
            var pId = this.passedPositionItem.id;
            let positionId = this.$route.query.positionId
            if (positionId) {
                console.log('positionId:', positionId)
                pId = positionId;
            }
            this.findInfoByPositionId(pId);
            this.getDimList();
        },
        created() {

        }
    }
</script>

<style scoped>
    @import "../../../assets/css/sysSet/wordManagement.css";
    >>>.el-transfer-panel__body {
        height: 490px;
    }
    
    >>>.el-transfer-panel__list.is-filterable {
        height: 442px;
        padding-top: 0;
    }
    
    >>>.el-row {
        font-size: 14px;
    }
    
    >>>.el-radio-group {
        text-align: left;
    }
    
    >>>.el-radio {
        margin-bottom: 10px;
    }
    
    .title {
        margin: 10px 0 20px 15px;
    }
    
    .div_title {
        height: 40px;
        background-color: #e9effc;
        line-height: 40px;
        padding-left: 10px;
    }
    
    .itxst {
        margin: 10px;
        text-align: left;
    }
    
    .col {
        width: 40%;
        flex: 1;
        padding: 10px;
        border: solid 1px #eee;
        border-radius: 5px;
        float: left;
    }
    
    .col+.col {
        margin-left: 10px;
    }
    
    .item {
        padding: 6px 12px;
        margin: 0px 10px 0px 10px;
        border: solid 1px #eee;
        background-color: #f1f1f1;
        text-align: left;
    }
    
    .item+.item {
        border-top: none;
        margin-top: 6px;
    }
    
    .item:hover {
        background-color: #fdfdfd;
        cursor: move;
    }
    
    .item2 {
        padding: 6px 12px;
        margin: 0px 10px 0px 10px;
        border: solid 1px #eee;
        background-color: pink;
        text-align: left;
    }
    
    .item2+.item2 {
        border-top: none;
        margin-top: 6px;
    }
    
    .item2:hover {
        outline: solid 1px #ddd;
        cursor: move;
    }
</style>