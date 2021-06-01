<template>
    <div class="main_contain2">
         <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 标注管理-新增任务</p>
            <div class="nav">
                <span class="lt">专业：{{className}}</span>
                <span class="rt">
                    <el-button class="myCheckButton" size="mini"  type="primary" @click="returnTaskList">返回任务列表</el-button>
                </span>
            </div>
        </div>
        <div class="myTable">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" style="margin-top:50px;width:50%;">
                <el-form-item label="任务名称" prop="taskName">
                    <el-input v-model="ruleForm.taskName"></el-input>
                </el-form-item>
                <el-form-item label="分配标注人员"  >
                    <el-col :span="18">
                        <div style="width:100%;height:80px;overflow:auto;border-radius: 4px;border: 1px solid #DCDFE6;background:white;">
                            <span v-for="(user,i) in multipleUserSelection" style="border: 1px solid red;margin: 5px;">
                                {{user.name}}<span class="el-icon-circle-close"  @click="deleteRow(i, multipleUserSelection)"></span>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-button @click.prevent="showUserDialog()" style="margin: 20px 0 0 20px;">选择标注人员</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择岗位" type="textarea" prop="name">
                    <el-button @click="showJobDialog">选择岗位</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="returnTaskList">取消</el-button>
                    <el-button type="primary" @click="submitCreateTask('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog  custom-class="step-dialog-radius" width="50%" 
            :visible.sync="userDialogVisible" :close-on-click-modal="false" :show-close="true" >
            <div slot="title" class="dialog-title">
                <span class="tringle-red-icon"></span>
                <span class="model-title-font">标注人员列表</span>
            </div>
            <el-form  :inline="true"   class="demo-form-inline" style="text-align:left;">
                <el-form-item label="姓名："  >
                    <el-input  v-model="userSearchName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUserList">检索</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style="color:red;">注：只能选择一个标注人员</span>
                    <!-- 已选择人员个数：{{multipleUserSelection.length}} -->
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable" :data="markUserList" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleUserSelectionChange" :row-key="getUserRowKeys" height="400px">
                <el-table-column  type="selection"  width="55" :reserve-selection="true"> </el-table-column>
                <el-table-column label="序号" type="index"  width="55"> </el-table-column>
                <el-table-column label="标注员ID"  width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="现有任务数"  width="120"> </el-table-column>
                <el-table-column  prop="address" label="月均标注数" show-overflow-tooltip> </el-table-column>
                <el-table-column  prop="address" label="日均标注数" show-overflow-tooltip> </el-table-column>
                <el-table-column  prop="address" label="工作总时长" show-overflow-tooltip> </el-table-column>
            </el-table>
            <el-pagination class="footer-pagination"
                background
                @size-change="handleUserSizeChange"
                @current-change="handleUserCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="userListQuery.pageNum"
                :page-size="userListQuery.pageSize"
                :page-sizes="[50,100,150]"
                :total="userTotal">
            </el-pagination>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button @click="userDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUser()" class='searchBtn'>确定选择</el-button>
            </div>
        </el-dialog>
        <el-dialog  custom-class="step-dialog-radius" width="50%" 
            :visible.sync="jobDialogVisible" :close-on-click-modal="false" :show-close="true" >
            <div slot="title" class="dialog-title">
                <span class="tringle-red-icon"></span>
                <span class="model-title-font">岗位列表</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：只显示未被分配标注任务的岗位
            </div>
            <el-form  :inline="true"   class="demo-form-inline" style="text-align:left;">
                <el-form-item label="名称：">
                    <el-input  v-model="jobSearchName" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getJobList">检索</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已选择{{multipleJobSelection.length}}条
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" height="500px"  v-loading="jobLoading"
                @selection-change="handleJobSelectionChange" :row-key="getRowKeys">
                <el-table-column  type="selection"  width="55" :reserve-selection="true"> </el-table-column>
                <el-table-column label="序号" type="index"  width="55"> </el-table-column>
                <el-table-column prop="positionTitle" label="职位名称"  width="200"></el-table-column>
                <el-table-column prop="companyName" label="公司名称"  width="120"> </el-table-column>
                <el-table-column  prop="industry" label="行业" show-overflow-tooltip> </el-table-column>
                <el-table-column  prop="dataSourcesPlatform" label="数据来源平台" show-overflow-tooltip> </el-table-column>
                <el-table-column  prop="date" label="创建时间" show-overflow-tooltip> 
                     <template slot-scope="scope">  
                        <span v-if="scope.row.date">{{ scope.row.date.split("T")[0] }}</span>
                        <span v-else> </span>

                     </template>
                </el-table-column>
            </el-table>
            <el-pagination class="footer-pagination"
                background
                @size-change="handleJobSizeChange"
                @current-change="handleJobCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="jobListQuery.pageNum"
                :page-size="jobListQuery.pageSize"
                :page-sizes="[50,100,150]"
                :total="jobTotal">
            </el-pagination>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button @click="jobDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitJob()" class='searchBtn'>确定选择</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 50,
    keyword: null
};
import service from '@/api/markMgntAPI.js';
export default {
    name: "index",
    data(){
        return {
            userListQuery: Object.assign({}, defaultListQuery),
            jobListQuery: Object.assign({}, defaultListQuery),
            userTotal: 0,
            jobTotal: 0,
            markUserList: [],
            userSearchName: '',
            jobSearchName: '',
            jobDialogVisible: false,
            jobClassification: {
                name: ''
            },
            userDialogVisible: false,
            ruleForm: {
                taskName: '',
                region: '',
            },
            assignedMarkUserIds: '',
            assignedMarkUserNames: '',
            choosedJobIds: '',
            jobLoading: false,
            rules: {
                taskName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
            },
            list:[{
                type:1,
                name:1,
                status:0,
                relationstatus:1
            },{
                type:1,
                name:1,
                status:1,
                relationstatus:1
            }],
            listLoading:false,
            tableData: [],
            multipleUserSelection: [],
            multipleJobSelection: [],
            className: sessionStorage.getItem("taskClassName"),
        }
    },
    methods:{
        getUserRowKeys(row){
            return row.uid;
        },
        getRowKeys(row){
            return row.id;
        },
        returnTaskList(){
            this.$router.push({
                path:'/markMain/taskList' 
            })
        },
        submitCreateTask(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.assignedMarkUserIds==''){
                        this.$message({
                            message: '选择一个标注人员!',
                            type: 'warning'
                        });
                        return;
                    }
                    if(this.choosedJobIds==''){
                        this.$message({
                            message: '至少选择一个岗位!',
                            type: 'warning'
                        });
                        return;
                    }
                    var params = {
                        taskName: this.ruleForm.taskName,
                        jobId: this.choosedJobIds,
                        userId: this.assignedMarkUserIds,
                        taskId: '',
                        userName: this.assignedMarkUserNames,
                        afterJobclassId: sessionStorage.getItem("smallClassId"),//专业大类的Id
                    }
                    service.saveTask(params).then(response => {
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        this.$router.push({
                            path:'/markMain/taskList' 
                        })
                    });
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        deleteRow(index, rows){
            rows.splice(index, 1);
        },
        showUserDialog(){
            this.userDialogVisible = true;
            this.getUserList()
        },
        showJobDialog(){
            this.jobDialogVisible = true;
            this.getJobList();
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
        handleUserSelectionChange(val) {
            if(val.length>1){
                this.$message({
                    message: '只能选择一个标注人员!',
                    type: 'warning'
                });
                return;
            }
            this.multipleUserSelection = val;
        },
        handleJobSelectionChange(val){
            this.multipleJobSelection = val;
        },
        submitUser(){
            this.userDialogVisible = false;
            var idArr = [];
            var nameArr = [];
            for(var data of this.multipleUserSelection){
                idArr.push(data.uid);
                nameArr.push(data.name);
            }
            this.assignedMarkUserIds = idArr.toString();
            this.assignedMarkUserNames = nameArr.toString();
        },
        submitJob(){
            var idArr = [];
            for(var data of this.multipleJobSelection){
                idArr.push(JSON.parse(data.id).$oid);
            }
            this.choosedJobIds = idArr.toString();
            this.jobDialogVisible = false;
        },
        handleUserSizeChange(val) {
            this.userListQuery.pageNum = 1;
            this.userListQuery.pageSize = val;                                                            
            this.getUserList();
        },
        handleUserCurrentChange(val) {
            this.userListQuery.pageNum = val;
            this.getUserList();
        },
        handleJobSizeChange(val) {
            this.jobListQuery.pageNum = 1;
            this.jobListQuery.pageSize = val;                                                            
            this.getJobList();
        },
        handleJobCurrentChange(val) {
            this.jobListQuery.pageNum = val;
            this.getJobList();
        },
        getUserList(){
            var params = {
                name: this.userSearchName,
                pageSize: this.jobListQuery.pageSize,
                pageNum: this.jobListQuery.pageNum,
            }
            service.getMarkingUser(params).then(response => {
                this.markUserList = response.data.list;
                this.userTotal = response.data.total;
            });
        },
        getJobList(){
            var params = {
                smallClassGroup: sessionStorage.getItem("smallClassName"),
                positionTitle: this.jobSearchName,
                // smallClass: sessionStorage.getItem("smallClassName"),
                pageSize: this.jobListQuery.pageSize,
                pageIndex: this.jobListQuery.pageNum,
            }
            this.jobLoading = true;
            service.getJobListByClassId(params).then(response => {
                this.jobLoading = false;
                this.tableData = response.data.outPositionInfo;
                this.jobTotal = response.data.count;
            });
        }
    },
    created(){
        
    }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>