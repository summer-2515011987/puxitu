<template>
    <div class="main_contain2">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 标注管理 - 任务列表</p>
            <div class="nav">
                <span class="lt">专业：{{className}}</span>
                <span class="rt">
                    <el-button class="myCheckButton" size="mini"  type="primary" @click="returnList">返回任务列表</el-button>
                </span>
            </div>
        </div>
        <div class="myTable">
            <el-form :inline="true" :model="searchCondition" ref="searchTaskRef" class="demo-form-inline" style="text-align:left">
                <el-form-item label="任务名称">
                    <el-input v-model="searchCondition.taskName"  ></el-input>
                </el-form-item>
                <el-form-item label="标注员">
                    <el-input v-model="searchCondition.userName"  ></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchCondition.status"  >
                        <el-option label="已完成" value="已完成"></el-option>
                        <el-option label="未完成" value="未完成"></el-option>
                        <el-option label="未开始" value="未开始"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTaskList">检索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="clearForm">清空</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button type="primary" v-if="loginUserRoles.indexOf('管理员')!=-1" @click="createTask">创建任务</el-button>
                    <el-button type="primary" v-if="loginUserRoles.indexOf('管理员')!=-1" @click="delTask()">删除任务</el-button>
                </el-form-item>
            </el-form>
            <el-table ref="roleTable" header-row-class-name="light_grey_table" 
                      :data="taskList" height="550px" @selection-change="handleSelectionChange"
                      style="width: 100%;flex:1;"
                      v-loading="listLoading" stripe border>
                <el-table-column  type="selection"  width="55"> </el-table-column>
                <el-table-column label="序号" type="index"   width="55"> </el-table-column>
                <el-table-column label="任务id" prop="taskId"></el-table-column>
                <el-table-column label="任务名称" prop="taskName" width="220"></el-table-column>
                <el-table-column label="创建时间" prop="createTime">
                    <template slot-scope="scope" >
                        <span v-if="scope.row.createTime">{{scope.row.createTime.split("T")[0]}} </span>
                    </template>
                </el-table-column>
                <el-table-column label="标注员" prop="userName"></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope" >
                        <span v-if="scope.row.status=='未完成'" style="color:orange;">{{scope.row.status}} </span>
                        <span v-if="scope.row.status=='未开始'" style="color:red;">{{scope.row.status}} </span>
                        <span v-if="scope.row.status=='已完成'" style="color:green;">{{scope.row.status}} </span>
                    </template>
                </el-table-column>
                <el-table-column label="完成时间" prop="finishTime">
                     <template slot-scope="scope">
                         <span v-if="scope.row.finishTime">{{scope.row.finishTime.split("T")[0]}} </span>
                     </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="showTaskDetail(scope.row)">详情</el-button>
                        <el-button type="primary" v-if="loginUserRoles.indexOf('管理员')!=-1" @click="delTask(scope.row.taskId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="footer-pagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-sizes="[10,20,30]"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null
};
import service from '@/api/markMgntAPI.js';
	export default {
		name: "majordetail",
		data(){
			return {
                listQuery: Object.assign({}, defaultListQuery),
                total: 0 ,
                searchCondition: {
                    taskName: '',
                    userName: '',
                    status: ''
                },
                tableData: [],
                listLoading:false,
                multipleSelection: [],
                className: sessionStorage.getItem("taskClassName"),
                taskList: [],
                loginUserRoles:  sessionStorage.getItem("roles"),
			}
		},
		methods:{
            returnList(){
                sessionStorage.removeItem("taskClassName");
                sessionStorage.removeItem("taskClassLabel");
                this.$router.push({
                    path:"/markMain/markMgnt"
                })
            },
            delTask(taskId){
                var delArr = [];
                if(taskId){
                    delArr.push(taskId);
                }else{
                    if(this.multipleSelection.length == 0){
                        this.$message({
                            message: '请选择删除的数据!',
                            type: 'warning'
                        });
                        return;
                    }
                    for(var data of this.multipleSelection){
                        delArr.push(data.taskId);
                    }
                }
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    service.deleteTask(delArr).then(response => {
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        this.getTaskList();
                    });
                }).catch(() => {
                });
            },
            showSpecialWord(){
                this.$router.push({
                    path:'/sysadmin/checkSpecialWord'
                })
            },
            showTaskDetail(data){
                sessionStorage.setItem("taskItem", JSON.stringify(data));
                sessionStorage.setItem("taskId",data.taskId);
                this.$router.push({
                    path:'/markMain/taskDetail'
                })
            },
            createTask(){
                this.$router.push({
                    path:'/markMain/createTask'
                })
            },
            getTaskList(){
                var params = {
                    name: this.searchCondition.taskName,
                    user: this.searchCondition.userName,
                    status: this.searchCondition.status,
                    pageSize: this.listQuery.pageSize,
                    pageNum: this.listQuery.pageNum,
                    afterJobclassId: sessionStorage.getItem("smallClassId"),    //专业大类的Id
                    roles: sessionStorage.getItem("roles")
                }
                this.listLoading = true;
                service.getTaskList(params).then(response => {
                    this.listLoading = false;
                    this.taskList = response.data.list;
                    this.total = response.data.total;
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;                                                            
                this.getTaskList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getTaskList();
            },
            clearForm(){
                // this.$refs.searchTaskRef.resetFields()
                this.searchCondition.taskName = '';
                this.searchCondition.userName = '';
                this.searchCondition.status = '';
            }
		},
        created(){
            this.getTaskList();
        }
	}
</script>

<style scoped>
    @import "../../../assets/css/sysSet/wordManagement.css";
</style>