<template>
    <div class="main_contain">
        <div class="headerd">
            <span class="el-icon-caret-right"></span>
                标注管理
        </div>
        <div class="myTable">
            <el-table :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="value"
                height="530px"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column label="专业类别及分类" prop="label"></el-table-column>
                <el-table-column label="任务总数" prop="task"></el-table-column>
                <el-table-column label="剩余数" prop="incomplete"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.children==undefined"  @click="showTaskList(scope.row)">任务列表</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import service from '@/api/markMgntAPI.js';
 
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};
export default {
    name: "index",
    data(){
        return {
            listQuery: Object.assign({}, defaultListQuery),
            total: 0 ,
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
        }
    },
    methods:{
        showTaskList(item){
            sessionStorage.setItem("smallClassId", item.value);
            var className = item.label;
            sessionStorage.setItem("smallClassName", item.label);
            sessionStorage.setItem("taskClassName",  className);
            sessionStorage.setItem("taskClassLabel", item.label);
            this.$router.push({
                path:'/markMain/taskList' 
            })
        },
        getClassList(){
             service.getAllMarkJobClass().then(response => {
                this.tableData = response.data.jobClass;
            });
        },
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;                                                            
            this.getClassList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.getClassList();
        },
        
    },
    created(){
        this.getClassList();
    }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>