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
                    <el-button class="myCheckButton" size="mini" type="primary" @click="abandonPosition()">放弃
                    </el-button>
                    <el-button class="myCheckButton" size="mini" type="primary" @click="showLastOrNextPosition('last')">
                        上一条</el-button>
                    <el-button class="myCheckButton" size="mini" type="primary" @click="saveSubmit()">保存</el-button>
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
                    <div v-show="activeName=='first'"
                        style="height:400px;text-align:left;background-color:white;padding:10px;overflow-y:auto;">
                        {{this.passedPositionItem.positionDetail}}</div>
                    <!-- <div v-show="activeName=='second'" id="div1111" style="height:400px;text-align:left;"  ></div> -->
                    <el-button v-show="activeName=='second'" class="el-icon-d-arrow-right myCheckButton" type="primary"
                        style="float: right;margin-bottom: 5px;" @click="showChooseDialog()">选择维度</el-button>
                    <el-table v-show="activeName=='second'" ref="multipleTable" height="480px" :data="tableData"
                        tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" :selectable="checkSelectable"> </el-table-column>
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
            <div class="div_title">{{item.name}}
                <el-button class="myCheckButton el-icon-plus" style="float:right;margin: 4px;" type="primary" @click="addMarkedFenju(item) "></el-button>
            </div>
            <div style="padding:10px;">
                <div v-for="(arr,index) in item.children" :key="index">
                    <el-row>
                        <el-col :span="22">
                            <el-input v-model="item.children[index]"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button class="el-icon-delete" @click="item.children.splice(index, 1)">
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-row>
    </el-row>
</el-col>
</el-row>
</div>
<el-dialog custom-class="step-dialog-radius" :visible.sync="dialogVisible" width="30%">
    <div slot="title" class="dialog-title">
        <span class="tringle-red-icon"></span>
        <span class="model-title-font">请选择维度</span>
    </div>
    <el-radio-group v-model="radio">
        <el-radio v-for="(item,index) in options3" :label="index" :key="index">{{item.name}}</el-radio>
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogConfirm()">确 定</el-button>
            </span>
</el-dialog>
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
                className: sessionStorage.getItem("taskClassName"),
                radio: 0,
                transferHeight: (document.documentElement.clientHeight - 300) + 'px',
                data: [],
                transferValue: [],
                positionIds: sessionStorage.getItem("positionIds"),
                passedTaskItem: JSON.parse(sessionStorage.getItem("taskItem")),
                passedPositionItem: JSON.parse(sessionStorage.getItem("passedPositionItem")),
                currentPositionItem: '', //当前岗位数据对象
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
                dialogVisible: false,
                hasSavedFenjuJson: '',
                editor1: '',
                loginUserRoles: sessionStorage.getItem("roles"),
            }
        },
        methods: {
            checkSelectable(row) { //设置分句check置灰状态
                for (var i = 0; i < this.options3.length; i++) {
                    var item = this.options3[i];
                    if (item.children) {
                        for (var j = 0; j < item.children.length; j++) {
                            var chi = item.children[j];
                            if (chi == row) {
                                // this.$refs.multipleTable.toggleRowSelection(item,false);
                                return false;
                            }
                        }
                    }
                }
                return true;
            },
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
                        // this.initEditor1()
                    } else {
                        this.initSavedFenju(); // 给维度保存的分句赋值
                    }
                });
            },
            addMarkedFenju(item) {
                if (item.children) {
                    item.children.push('');
                } else {
                    item.children = [];
                    item.children.push('');
                }
            },
            returnList() {
                if (this.loginUserRoles.indexOf('管理员') != -1) {
                    this.$router.push({
                        path: "/markMain/taskList"
                    })
                } else {
                    this.$router.push({
                        path: "/markMain/tempTaskList"
                    })
                }
            },
            showMark() {

            },
            handleClick(tab, event) {
                console.log(tab, event);
                if (tab.index == 0) {
                    // this.initEditor1();
                } else {
                    this.initSavedFenju(); // 给维度保存的分句赋值
                }
            },
            initEditor1() {
                this.editor1 = new E(this.$refs.div123); //new E("#div123");
                editor1.config.menus = [];
                editor1.create();
                editor1.txt.html(this.passedPositionItem.positionDetail);
            },
            // initEditor2(length){
            //     this.editor2 = new E("#div1111");
            //     if(length){
            //         if(length == 0){
            //             this.editor2.config.colors = [];
            //         }else{
            //             this.editor2.config.colors = [];
            //             this.$set(this.editor2.config, 'colors', this.colorsArr.slice(0,length));
            //         }
            //     }else{
            //         this.editor2.config.colors = this.colorsArr.slice(0,5);
            //     }
            //     var that = this;
            //     document.getElementById('div1111').addEventListener('click', function () { // 
            //         that.editor2FocusFlag = true;
            //         that.editor2LastHtml = that.editor2.$textElem.elems[0].innerText;
            //     });
            //     this.editor2.config.onchange = html => {
            //         this.lastHtmlContent = html;

            //         if(that.editor2FocusFlag){//非第一次初始化
            //             console.log('lasthtml:----'+ that.editor2LastHtml)
            //             var length = that.options3.length;
            //             if(that.options3 &&  that.options3.length!=0){
            //                 for(var i=0; i<length; i++){
            //                     that.options3[i].children = that.returnColorStringLists(html, '<span style="background-color: ' + that.colorsArr[i] + ';">');
            //                 }
            //             }else{
            //                 that.$message({
            //                     message: '请先选择右侧的维度信息',
            //                     type: 'warning'
            //                 });
            //             }
            //             that.editor2FocusFlag = false;
            //         }
            //     };
            //     this.editor2.config.menus = [
            //         'backColor', // 背景颜色
            //     ];
            //     this.editor2.create();
            //     this.lastHtmlContent = this.passedPositionItem.positionDetail;
            //     this.editor2.txt.html(this.passedPositionItem.positionDetail);
            // },
            returnColorStringLists(htmlStr, colorStr) {
                var strArr = [];
                this.findColorString(htmlStr, colorStr, strArr);
                return strArr;
            },
            findColorString(findHtml, colorStr, strArr) {
                if (findHtml.indexOf(colorStr) != -1) {
                    var colorLength = colorStr.length;
                    var syStr = findHtml.slice(findHtml.indexOf(colorStr) + colorLength);
                    var result = syStr.slice(0, syStr.indexOf('</span>'));
                    strArr.push(result);
                    var nextStr = syStr.slice(syStr.indexOf('</span>') + 7);
                    this.findColorString(nextStr, colorStr, strArr);
                }
            },
            //左边往右边拖动时的事件
            end1(e) {
                var dragedItemToRight = e.item.innerText;
                var items = this.arr2.filter(function(m) {
                        return m == dragedItemToRight
                    })
                    //如果左边
                if (items.length < 2) return;
                this.arr2.splice(e.newDraggableIndex, 1)
                    // this.arr2.push(dragedItemToRight);
            },
            //右边往左边拖动时的事件
            end2(e) {
                var dragedItemToLeft = e.item.innerText;
                var items = this.arr1.filter(function(m) {
                        return m == dragedItemToLeft
                    })
                    //如果左边
                if (items.length < 2) return;
                this.arr1.splice(e.newDraggableIndex, 1);
            },

            //move回调方法
            onMove(e) {
                if (this.dragedKeyword == '已选列表') {
                    return false;
                }
                return true;
            },
            abandonPosition() {
                var currentPositionId = this.passedPositionItem.id;

                this.$confirm('确定放弃吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    service.abandonPosition(currentPositionId).then(response => {
                        if (response.code == 200) {
                            this.$message({
                                message: '放弃成功!',
                                type: 'success'
                            });
                        }
                    });
                }).catch(() => {});

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
            showChooseDialog() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: '请先选择分句!',
                        type: 'warning'
                    });
                    return;
                }
                this.dialogVisible = true;
            },
            saveSubmit() {
                var mapObj = {};
                for (var child of this.options3) {
                    if (child.children) {
                        mapObj[child.name] = child.children;
                    } else {
                        mapObj[child.name] = null;
                    }
                }
                var keywordArr = [];
                for (var da of this.data) {
                    for (var va of this.transferValue) {
                        if (da.key == va) {
                            keywordArr.push(da.label);
                        }
                    }
                }
                // this.arr2.splice(this.arr2.indexOf('已选列表'), 1);

                var params = {
                    positionId: this.passedPositionItem.id,
                    htmlContent: this.lastHtmlContent,
                    keyword: this.activeName == 'first' ? keywordArr.toString() : null, //不为空时，更新关键词，下边字段无效
                    positionWhere: {
                        small_class_group: sessionStorage.getItem("smallClassName"),
                        create_time: this.passedTaskItem.createTime ? this.passedTaskItem.createTime.split('T')[0] : '',
                        job_topic_atrr: this.passedPositionItem.jobTopicAttr,
                        vertical_classification: this.passedPositionItem.verticalClassification
                    },
                    professionalOnetInfo: mapObj,
                };
                service.savePositionInfo(params).then(response => {
                    if (response.code == 200) {
                        this.$message({
                            message: '恭喜你，保存成功!',
                            type: 'success'
                        });
                    }
                });
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
                // this.data;//全列表
                for (var da of this.data) {
                    for (var sa of hasSavedKeyWords) {
                        if (da.label == sa) {
                            this.transferValue.push(da.key);
                        }
                    }
                }
                // transferValue赋值
            },
            initSavedFenju() {
                if ((this.hasSavedFenjuJson == "") || (this.hasSavedFenjuJson == null) || (this.hasSavedFenjuJson ==
                        undefined)) {
                    return;
                }
                var hasSavedFenJuObj = JSON.parse(this.hasSavedFenjuJson);
                for (var op of this.options3) {
                    var name = op.name;
                    op.children = hasSavedFenJuObj[name];
                }
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleDialogConfirm() {
                if (this.options3[this.radio].children == null) {
                    this.options3[this.radio].children = [];
                }
                this.options3[this.radio].children = this.options3[this.radio].children.concat(this.multipleSelection);
                this.$refs.multipleTable.clearSelection(); //已经勾选的，取消勾选
                this.dialogVisible = false;
            }
        },
        mounted() {
            var pId = this.passedPositionItem.id;
            debugger;
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