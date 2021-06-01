<template>
    <div class="main_contain">
        <div class="headerd">
            <span class="el-icon-caret-right"></span>
                分词管理
        </div>
        <div class="myTable">
            <el-table ref="roleTable" header-row-class-name="light_grey_table" 
                      :data="list"
                      style="width: 100%;flex:1;"
                      :span-method="objectSpanMethod"
                      v-loading="listLoading" stripe border>
                <el-table-column label="专业大类" prop="type"></el-table-column>
                <el-table-column label="专业名称" prop="name"></el-table-column>
                <el-table-column label="筛选分词状态" prop="status"></el-table-column>
                <el-table-column label="筛选关联词状态" prop="relationstatus"></el-table-column>

                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <!-- 管理员角色 -->
                        <el-button size="mini" @click="Lookdetail">查看详情</el-button>
                        <!-- 专家角色 -->
                        <el-button size="mini" @click="showFilterWords">筛选分词</el-button>
                        <el-button size="mini">预览</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="height:40px"
                    background
                    layout="total, sizes,prev, pager, next,jumper"
                    :page-sizes="[10,20,30]"
                    >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import service from '@/api/wordManagementAPI.js';
	export default {
		name: "index",
        data(){
			return {
				list:[{
					type:1,
                    name:1,
					status:1,
					relationstatus:1
                }],
				listLoading:false,
            }
        },
        methods:{
            

			Lookdetail(){
				this.$router.push({
                    path:'/sysadmin/majordetail'
                })
            },
            
			//合并行
			objectSpanMethod({ row, column, rowIndex, columnIndex }) {
				if (columnIndex === 0) {
					if (rowIndex % 2 === 0) {
						return {
							rowspan: 2,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			}
        },
       
	}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>