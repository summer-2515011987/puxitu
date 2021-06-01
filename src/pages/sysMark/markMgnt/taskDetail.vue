<template>
    <div class="main_contain2">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 标注管理 - 详情</p>
            <div class="nav">
                <span class="lt">专业：{{className}}</span>
                <span class="rt">
                    <el-button class="myCheckButton" size="mini"  type="primary" @click="returnList">返回任务列表</el-button>
                </span>
            </div>
        </div>
        <div class="myTable">
            <div style="text-align:left;font-size:16px;">
                <span style="font-weight:500;">任务id：</span>{{passedTaskItem.taskId}} &nbsp;&nbsp;&nbsp;&nbsp;任务名称：{{passedTaskItem.taskName}} &nbsp;&nbsp;&nbsp;&nbsp;创建时间：{{passedTaskItem.createTime.split("T")[0]}}</div>
            <el-divider></el-divider>
            <el-form  :inline="true"   class="demo-form-inline" style="text-align:left;">
                <el-form-item label="名称：">
                    <el-input  v-model="searchName"></el-input>
                </el-form-item>
                <el-form-item label="标注状态：">
                     <el-select v-model="bzStatus" placeholder="请选择">
                        <el-option key="0" label="未开始" value="0"> </el-option>
                        <el-option key="1" label="已完成" value="1"> </el-option>
                        <el-option key="2" label="已放弃" value="2"> </el-option>
                        <el-option key="3" label="进行中" value="3"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="findInfoByTaskId">检索</el-button>
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"   v-loading="tableLoading" style="width: 100%" height="485px"       >
                <el-table-column label="序号" type="index"  width="55"> </el-table-column>
                <el-table-column label="职位名称" prop="positionTitle"  ></el-table-column>
                <el-table-column prop="companyName" label="公司名称"  > </el-table-column>
                <el-table-column  prop="industry" label="行业" show-overflow-tooltip> </el-table-column>
                <el-table-column  prop="dataSourcesPlatform" label="数据来源平台" show-overflow-tooltip> </el-table-column>
                <el-table-column  prop="keywordStatus" label="标注状态" show-overflow-tooltip> 
                    <template slot-scope="scope">
                        <span v-if="scope.row.positionStatus!=2">
                            <!-- 全部是 1 的时候就是 当前岗位标注完成 ；全部是 0 未开始； 其中一个是 0 一个是 1 就是进行中。-->
                            <span v-if="(scope.row.keywordStatus==1) && (scope.row.sentenceStatus==1)" style="color:green;">已完成</span>
                            <span v-else-if="(scope.row.keywordStatus==0) && (scope.row.sentenceStatus==0)" style="color:red;">未开始</span>
                            <span v-else style="color:orange;">进行中</span>
                        </span>
                        <span v-if="scope.row.positionStatus==2" style="color:blue">已放弃</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column  prop="sentenceStatus" label="分句标注状态" show-overflow-tooltip> </el-table-column> -->
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.positionStatus==2"  >
                            <!-- 管理员只能【查看】，标注人员可以【标注】 -->
                            <el-button size="mini" v-if="loginUserRoles.indexOf('管理员')!=-1" @click="showDetail(scope.row)">查看</el-button>
                            <el-button size="mini" v-if="loginUserRoles.indexOf('管理员')!=-1" @click="deletePosition(scope.row)">删除</el-button>
                            <el-button size="mini" v-if="loginUserRoles.indexOf('管理员')!=-1" @click="showTransferPositionWin(scope.row)">转移</el-button>
                            <!-- <el-button size="mini" v-if="loginUserRoles.indexOf('标注')!=-1" @click="showMark(scope.row)">标注</el-button> -->
                        </span>
                        <span v-if="scope.row.positionStatus!=2"  >
                            <el-button size="mini" v-if="loginUserRoles.indexOf('管理员')!=-1" @click="showDetail(scope.row)">查看</el-button>
                             <el-button size="mini" v-if="loginUserRoles.indexOf('标注')!=-1" @click="showMark(scope.row)">标注</el-button>
                        </span>
                        
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
                :page-sizes="[50,100,150]"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog custom-class="step-dialog-radius" :visible.sync="transferDialogVisible"  width="30%">
            <div slot="title" class="dialog-title">
                <span class="tringle-red-icon"></span>
                <span class="model-title-font">请选择专业群</span>
            </div>
           <el-table :data="transferTableData" @current-change="handleTransferCurrentChange"
                style="width: 100%;margin-bottom: 20px;" highlight-current-row
                row-key="value"
                height="550px"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column label="专业类别及分类" prop="label"></el-table-column>
                <!-- <el-table-column label="任务总数" prop="task"></el-table-column>
                <el-table-column label="剩余数" prop="incomplete"></el-table-column> -->
                <!-- <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.children==undefined"  @click="showTaskList(scope.row)">任务列表</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="transferPosition()">确 定</el-button>
            </span>
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
    name: "taskDetail",
    data(){
        return {
            taskId: sessionStorage.getItem("taskId"),
            passedTaskItem : JSON.parse(sessionStorage.getItem("taskItem")),
            listQuery: Object.assign({}, defaultListQuery),
            jobSearchName: '',
            className: sessionStorage.getItem("taskClassName"),
            tableData: [],
            transferTableData: [],
            listLoading:false,
            total:0,
            loginUserRoles:  sessionStorage.getItem("roles"),
            positionIds:[],
            searchName: '',
            tableLoading: false,
            transferDialogVisible: false,
            currentTransferRow: null,
            bzStatus: '',
            transferPositionId: '',
        }
    },
    methods:{
        returnList(){
            if(this.loginUserRoles.indexOf('管理员')!=-1){
                this.$router.push({
                    path:"/markMain/taskList"
                })
            }else{
                this.$router.push({
                    path:"/markMain/tempTaskList"
                })
            }
        },
        showMark(item){
            sessionStorage.setItem('positionIds', this.positionIds.toString());
            var data = Object.assign({}, item);
            sessionStorage.setItem("passedPositionItem",  JSON.stringify(data));
            this.$router.push({
                path:'/markMain/markDetail'
            })
        },
        showDetail(item){
            sessionStorage.setItem('positionIds', this.positionIds.toString());
            var data = Object.assign({}, item);
            sessionStorage.setItem("passedPositionItem",  JSON.stringify(data));
            this.$router.push({
                path:'/markMain/markDetailMsg'
            })
        },
        deletePosition(item){
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                service.deletePosition(item.id).then(response => {
                    if(response.code == 200){
                        this.findInfoByTaskId();
                        this.$message({
                            message: '删除成功!',
                            type: 'success'
                        });
                    }
                });
            }).catch(() => {});
        },
        showTransferPositionWin(row){
            this.transferPositionId = row.id;
            this.transferDialogVisible = true;
            this.getClassList();
        },
        transferPosition(){
            var params = {
                smallClassGroup: this.currentTransferRow.label,
                positionId: this.transferPositionId
            };
            service.transferPosition(params).then(response => {
                if(response.code == 200){
                    this.transferDialogVisible = false;
                    this.findInfoByTaskId();
                    this.$message({
                        message: '转移成功!',
                        type: 'success'
                    });
                }
            });
        },
        handleTransferCurrentChange(val) {
            this.currentTransferRow = val;
        },
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;                                                            
            this.findInfoByTaskId();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.findInfoByTaskId();
        },
        findInfoByTaskId(){
            var params = {
                taskId: this.taskId,//其实是label，非id
                name: this.searchName,
                status: this.bzStatus,
                pageNum: this.listQuery.pageNum,
                pageSize: this.listQuery.pageSize
            };
            this.tableLoading = true;
            service.findInfoByTaskId(params).then(response => {
                this.tableLoading = false;
                this.tableData = response.data.outPositionInfo;
                this.total = response.data.count;
                this.positionIds = response.data.positionIds; //所有列表的id集合
            });
        },
        getClassList(){
            service.getAllMarkJobClass().then(response => {
                this.transferTableData = response.data.jobClass;
            });
        },
    },
    created(){
        this.findInfoByTaskId()
    }
}
</script>

<style scoped>
    @import "../../../assets/css/sysSet/wordManagement.css";
</style>