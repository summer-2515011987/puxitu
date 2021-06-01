<template>
    <el-header class="model-header">
        <el-container>
            <el-aside class="model-header-left-logo"> 
            </el-aside>
            <el-main class="model-header-right">
                <span class="header-text">招聘岗位大数据后台管理系统</span>
                    <el-button @click="returnDataLogin" class="setLogout">退出</el-button>
            </el-main>
        </el-container>
    </el-header>
</template>
<script>
import NProgress from 'nprogress' // Progress 进度条
import store from "@/store";
export default {
    name: "headerTop",
    data() {
        return {
            
        };
    },
    mounted() {
    },
    methods: {
        returnDataLogin(){
            this.$confirm('确定要退出系统吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					sessionStorage.clear();
					localStorage.clear();
					store.dispatch('LogOut').then(() => {
						NProgress.done();
						this.$router.push({ path: "/dataLogin" });
					});
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '已取消退出'
					// });          
				});
        }
    }
}
</script>

<style scoped>
@import "./../../../assets/css/sysDen/createModel.css";
.setLogout{
    background: linear-gradient(180deg, #FFD7A3 0%, #FF7300 100%);
    box-shadow: 0px 3px 5px 0px #A8A399;
    border-radius: 2px;
    color: white;
    float: right;
    margin-right: 40px;
}
</style>
