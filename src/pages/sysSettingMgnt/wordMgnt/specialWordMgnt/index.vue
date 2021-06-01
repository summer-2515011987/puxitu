<template>
    <div class="main_contain">
        <div class="headerd">
            <span class="el-icon-caret-right"></span>
                分词管理
        </div>
        <div class="myTable">
            <el-table :data="tablelist"
                style="width: 100%;margin-bottom: 20px;"
                row-key="value"
                height="500px"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column label="专业类别及分类" prop="label" width="350"></el-table-column>
                <el-table-column label="筛选分词状态"   width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status=='未开始'" style="color:red;">{{scope.row.status}}</span>
                        <span v-if="scope.row.status=='已完成'" style="color:green;">{{scope.row.status}}</span>
                        <span v-if="(scope.row.status!='未开始') && (scope.row.status!='已完成')">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="筛选结果" prop="keywords"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <!-- 专家角色 -->
                        <el-button   type="primary" v-if="loginUserRoles.indexOf('专家')!=-1 && (scope.row.children==undefined)" @click="Lookdetail(scope.row)">筛选分词</el-button>
                        <!-- 管理员 -->
                        <el-button size="mini" type="primary"  v-if="loginUserRoles.indexOf('管理员')!=-1 &&  (scope.row.children==undefined)" @click="checkSpecialWord(scope.row)">查看详情</el-button>
                        <el-button size="mini" v-if="loginUserRoles.indexOf('管理员')!=-1 &&  (scope.row.children==undefined)" @click="preview">预览</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import service from '@/api/wordMgntAPI.js';
	export default {
		name: "index",
        data(){
			return {
				tablelist:[],
				listLoading:false,
                loginUserRoles:  sessionStorage.getItem("roles"),
            }
        },
        methods:{
			Lookdetail(item){
				// this.$router.push({
                //     path:'/sysadmin/majordetail'
                // })
                var className = item.parentName + " > " + item.label;
                sessionStorage.setItem("className",  className);
                sessionStorage.setItem("zId", item.value);
                this.$router.push({
                    path:"/sysadmin/screenWord"
                })
                
            },
            checkSpecialWord(item){
                var className = item.parentName + " > " + item.label;
                sessionStorage.setItem("className",  className);
                sessionStorage.setItem("zId", item.value);
                this.$router.push({
                    path:"/sysadmin/checkSpecialWord"
                })
            },
            preview(){
                this.$router.push({
                    path:'/sysadmin/preview'
                })
            },
            getAllJobs(){
                service.getAllJobClass().then(response => {
                    this.tablelist = response.data.jobClass;
                });
            },
        },
        created() {
            this.getAllJobs();
        }
	}
</script>

<style scoped>
@import "../../../../assets/css/sysSet/wordManagement.css";
</style>