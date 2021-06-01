<template>
    <div class="main_contain">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 分词管理</p>
            <div class="nav">
                <span class="lt">专业：{{className}}</span>
            </div>
        </div>
        <div class="mycontain">
            <el-container >
                <el-container>
                    <el-aside  width="600px" style="border: 1px solid lightgrey;background-color:white;">
                        <div class="headder_title lt" style="color:black;background: #e9effc;">标准：</div>
                        <div class="headder_box lt" style="background: #e9effc;">
                            <div class="longSelect">
                                <el-select v-model="value" placeholder="请选择标准"  @change="changeOption(value)">
                                    <el-option
                                            v-for="item in standardOptions"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <el-table ref="multipleTableRef" :data="oriList" tooltip-effect="dark" height="550px" style="width: 100%" class="containdes_item_box"
                            @selection-change="handleSelectionChange" >
                            <el-table-column type="selection"  width="55"> </el-table-column>
                            <el-table-column prop="sentence"> </el-table-column>
                        </el-table>
                    </el-aside>
                    <el-main class="p0">
                        <el-container>
                            <el-aside width="350px" style="margin-left: 10px;background-color: white;border: 1px solid lightgrey;">
                                <div class="headder_title " style="color:black;background: #e9effc;width:100%;"> 自动分词结果 </div>
                                <el-checkbox-group v-model="checkboxGroup1" style="height:550px;overflow:auto;" @change="changeCheckbox">
                                    <el-checkbox-button v-for="word in oriWordList" :label="word" :key="word">{{word}}</el-checkbox-button>
                                </el-checkbox-group>
                            </el-aside>
                            <el-aside width="250px" style="margin-left: 10px;background-color: white;border: 1px solid lightgrey;">
                                <div class="headder_title " style="color:black;background: #e9effc;width:100%">  我筛选的关键词 
                                        <el-button  class="el-icon-d-arrow-right myCheckButton" @click="dialogVisible=true;" type="primary" style="float: right;margin-top: 10px;margin-right: 5px;"  >筛选</el-button>
                                </div>
                                <el-table :data="choosedWordList" style="width: 100%" height="550px" @selection-change="handleMySelectionChange"   empty-text="请选择左侧的关键词">
                                    <el-table-column type="selection"  width="45"> </el-table-column>
                                    <el-table-column prop="word"   > 
                                        <template slot-scope="scope">
                                            <el-input  v-model="choosedWordList[scope.$index]" @blur="scope.row.inputFlag=false"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop=" " width="45" >
                                        <template slot-scope="scope">
                                        <el-button   class="myCheckButton rt el-icon-delete" style="margin-top:10px;" size="mini" @click="delWord(scope.$index, choosedWordList)"  type="primary"></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-aside>
                            <el-main style="padding:0;margin-left: 10px;background-color: white;border: 1px solid lightgrey;">
                                <el-row style="height:33%">
                                    <div class="headder_title " style="color:black;background: #e9effc;width:100%;"> 社会能力 </div>
                                    <div style="height:150px;" >
                                        <div style="width:100%;height:100%;overflow:auto;border-radius: 4px;border: 1px solid #DCDFE6;background:white;text-align:left;">
                                            <span v-for="(user,i) in shArr" style="border: 1px solid red;margin: 5px;font-size: 14px;">
                                                {{user}}<span class="el-icon-circle-close"  @click="deleteRow(i, shArr)"></span>
                                            </span>
                                        </div>
                                    </div>
                                </el-row>
                                <el-row style="height:33%">
                                    <div class="headder_title " style="color:black;background: #e9effc;width:100%;"> 操作能力 </div>
                                    <div style="height:150px;" >
                                        <div style="width:100%;height:100%;overflow:auto;border-radius: 4px;border: 1px solid #DCDFE6;background:white;text-align:left;">
                                            <span v-for="(user,i) in czArr" style="border: 1px solid red;margin: 5px;font-size: 14px;">
                                                {{user}}<span class="el-icon-circle-close"  @click="deleteRow(i, czArr)"></span>
                                            </span>
                                        </div>
                                    </div>
                                </el-row>
                                <el-row style="height:33%">
                                    <div class="headder_title " style="color:black;background: #e9effc;width:100%;"> 发展能力 </div>
                                    <div style="height:150px;" >
                                        <div style="width:100%;height:100%;overflow:auto;border-radius: 4px;border: 1px solid #DCDFE6;background:white;text-align:left;">
                                            <span v-for="(user,i) in fzArr" style="border: 1px solid red;margin: 5px;font-size: 14px;">
                                                {{user}}<span class="el-icon-circle-close"  @click="deleteRow(i, fzArr)"></span>
                                            </span>
                                        </div>
                                    </div>
                                </el-row>
                            </el-main>
                        </el-container>
                    </el-main>
                </el-container>
                <el-footer>
                    <el-button class="myCheckButton rt" size="mini"  type="primary" @click="saveToDetail">保存筛选结果</el-button>
                    <el-button style="margin:0 10px" class="myCheckButton rt" size="mini"  type="primary" @click="$router.go(-1)">上一步</el-button>
                </el-footer>
            </el-container>
        </div>
        <el-dialog
            title="请选择维度" custom-class="step-dialog-radius"
            :visible.sync="dialogVisible"
            width="30%">
            <div slot="title" class="dialog-title">
                <span class="tringle-red-icon"></span>
                <span class="model-title-font">请选择维度</span>
            </div>
            <el-radio-group v-model="radio">
                <el-radio  label="0">社会能力</el-radio>
                <el-radio  label="1">操作能力</el-radio>
                <el-radio  label="2">发展能力</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import service from '@/api/wordMgntAPI.js';
export default {
		name: "majordetail",
		data(){
			return {
                className: sessionStorage.getItem("className"),
                multipleSelection: [],
                multipleMySelection: [],
				value: '1',
                oriList: [],
                choosedWordList: [],
				oriWordList:[],
                choosedList:[],
				textarea:'',
                dialogVisible: false,
                zId : sessionStorage.getItem("zId"),
                standardOptions: [],
                checkboxGroup1: [],
                radio: '0',
                shArr: [],
                czArr: [],
                fzArr: []
			}
        },
		methods:{
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            },
			keepWord(){
				this.$router.push('/sysadmin/screenWordb')
            },
            chooseOriData(item){
                item.status = 0;
                this.choosedList.push(item);
            },
            saveInput(){
                this.choosedList.push({
                    id: '',
                    word: this.textarea,
                    status: ''
                });
                this.textarea = '';
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTableRef.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTableRef.clearSelection();
                }
            },
            deleteRow(index, shArr){
                shArr.splice(index, 1);
            },
            changeCheckbox(){
                this.choosedWordList = this.checkboxGroup1;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                var arr = [];
                for(var i=0; i<this.multipleSelection.length; i++){
                    var keyword = this.multipleSelection[i].keywords;
                    var keyArr = keyword.split(",");
                    var sumArr = arr.concat(keyArr);
                    arr = [...new Set(sumArr)];
                }
                this.oriWordList = arr;
            },
            handleMySelectionChange(val){
                this.multipleMySelection = val;
            },
            handleDialogConfirm(){
                if(this.radio == '0'){
                    this.shArr = this.shArr.concat(this.multipleMySelection);
                    this.shArr = Array.from(new Set(this.shArr));
                }else if(this.radio == '1'){
                    this.czArr = this.czArr.concat(this.multipleMySelection);
                    this.czArr = Array.from(new Set(this.czArr));
                }else{
                    this.fzArr = this.fzArr.concat(this.multipleMySelection);
                    this.fzArr = Array.from(new Set(this.fzArr));
                }
                this.dialogVisible = false;
            },
            chooseOriWord(item){
				this.choosedWordList.push(item);
			},
			delWord(index, rows){
				rows.splice(index, 1);
			},
			saveToDetail(){
                var params = {
                    id: this.zId,
                    keywords: this.choosedWordList.toString(),
                    sh: this.shArr.toString(),
                    cz: this.czArr.toString(),
                    fz: this.fzArr.toString(),
                }
                service.saveKeywords(params).then(response => {
                    this.$message({
                        message: '恭喜你，保存成功!',
                        type: 'success'
                    });
                    this.$router.push({
                        path:'/sysadmin/WordMgnt'
                    })
                    sessionStorage.removeItem("zId");
                });
			},
            getSecondJobClass(initFlag){
                if(!this.value){
                    this.$message({
                        message: '请先选择标注!',
                        type: 'warning'
                    });
                }
                var params = {
                    id: this.zId,
                    type: this.value
                }
                let that = this;
                service.getSecondJobClass(params).then(response => {
                    this.oriList = response.data.keywordsList;
                    if(initFlag){
                        this.$nextTick(function(){
                            this.toggleSelection(this.oriList);
                        });
                    }
                    if(response.data.markedWords){//用于初始化
                        this.choosedWordList = response.data.markedWords.split(",");
                        this.checkboxGroup1 = this.choosedWordList;
                    }
                    //三个能力维度数据初始化
                    if(response.data.sh){//用于初始化
                        var arr1 = response.data.sh.split(",");
                        arr1.forEach((elem, index) => {
                            that.shArr.push(elem.trim());
                        });
                    }
                    if(response.data.cz){//用于初始化
                        this.czArr = response.data.cz.split(",");
                    }
                    if(response.data.fz){//用于初始化
                        this.fzArr = response.data.fz.split(",");
                    }
                });
            },
            getStandard(){
                service.getStandard().then(response => {
                    this.standardOptions = response.data;
                    this.getSecondJobClass(1);//初始化
                });
            },
            changeOption(){
                this.getSecondJobClass();
            },
		},
        created() {
            this.getStandard();
        }
	}
</script>

<style scoped>
    @import "../../../../assets/css/sysSet/screenword.css";
    >>>.el-checkbox-button, .el-checkbox-button__inner {
        margin-bottom: 5px;
        margin-top: 5px;
    }
    >>>.el-checkbox-button__inner {
        border-left: 1px solid #DCDFE6!important;
    }
</style>