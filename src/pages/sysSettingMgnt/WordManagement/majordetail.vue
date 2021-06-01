<template>
    <div class="main_contain2">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 分词管理</p>
            <div class="nav">
                <span class="lt">计算机类 > 大数据技术与应用</span>
                <span class="rt">
                    <el-button class="myCheckButton" size="mini"  type="primary">返回专业列表</el-button>
                    <el-button class="myCheckButton" size="mini"  type="primary">预览图谱</el-button>
                </span>
            </div>
        </div>
        <div class="myTable">
            <el-table ref="roleTable"
                      :data="list"
                      style="width: 100%"
                      class="textcenterTable"
                      :header-cell-class-name="headerCell"
                      :cell-class-name="cellClass"
                      :header-row-class-name="headerRowClass"
                      :stripe="false"
                      v-loading="listLoading" border>
                <el-table-column label="能力维度 - 社会能力" :key="Math.random()" prop="title" width="150px"></el-table-column>
                <el-table-column label="筛选分词" prop="name" :key="Math.random()">
                    <el-table-column label="NoneHeader" :key="Math.random()" prop="status" width="80px"></el-table-column>
                    <el-table-column label="NoneHeader" :key="Math.random()" prop="name" width="120px">
                        <template slot-scope="scope" v-if="scope.row.status!=''">
                            <el-button size="mini" type="primary" class="myCheckButton" @click="checkWord">筛选分词</el-button>
                        </template>
                    </el-table-column>

                </el-table-column>
                <el-table-column label="筛选结果" :key="Math.random()" prop="response"></el-table-column>
                <el-table-column label="筛选关联词" :key="Math.random()">
                    <el-table-column label="NoneHeader" :key="Math.random()" prop="type" width="80px"></el-table-column>
                    <el-table-column label="NoneHeader" :key="Math.random()" width="260px">
                        <template slot-scope="scope" v-if="scope.row.status!=''">
                            <el-button size="mini" type="primary" class="myCheckButton" @click="RelatedWord">筛选关联词</el-button>
                            <el-button size="mini" type="primary" class="myCheckButton" @click="ExpertSelection">专家标注结果</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>

            </el-table>
            <el-table ref="roleTable"
                      :data="list"
                      style="width: 100%;margin-top:30px"
                      class="textcenterTable"
                      :header-cell-class-name="headerCell"
                      :cell-class-name="cellClass"
                      :header-row-class-name="headerRowClass"
                      v-loading="listLoading" border>
                <el-table-column label="能力维度 - 操作能力" prop="title" width="150px"></el-table-column>
                <el-table-column label="筛选分词">
                    <el-table-column label="NoneHeader" prop="status" width="80px"></el-table-column>
                    <el-table-column label="NoneHeader"  width="120px">
                        <template slot-scope="scope" v-if="scope.row.status!=''">
                            <el-button size="mini" type="primary" class="myCheckButton" @click="checkWord">筛选分词</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="筛选结果" prop="response"></el-table-column>

                <el-table-column label="筛选关联词">
                    <el-table-column label="NoneHeader" prop="type" width="80px"></el-table-column>
                    <el-table-column label="NoneHeader" width="260px">
                        <template slot-scope="scope" v-if="scope.row.status!=''">
                            <el-button size="mini" type="primary" class="myCheckButton" @click="RelatedWord">筛选关联词</el-button>
                            <el-button size="mini" type="primary" class="myCheckButton" @click="ExpertSelection">专家标注结果</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import service from '@/api/wordManagementAPI.js';
	export default {
		name: "majordetail",
		data(){
			return {
				list:[{
					title:'道德责任',
					type:'',
                    response:'',
					status:'',
				},
                 {
						title:'职业道德',
						type:'未完成',
						response:'关键词A/关键词B/关键词C/关键词D/关键词E',
						status:'未完成',
					},
					{
						title:'法律责任',
						type:'未完成',
						response:'关键词A/关键词B/关键词C/关键词D/关键词E',
						status:'未完成',
					},
					{
						title:'道德责任',
						type:'未完成',
						response:'关键词A/关键词B/关键词C/关键词D/关键词E',
						status:'未完成',
					}],
				listLoading:false,
			}
		},
		methods:{
			/*跳转到筛选分词*/
			checkWord(){
				this.$router.push({
                    path:"/sysadmin/screenWord"
                })
            },
			/*隐藏列头*/
			headerCell(obj){
                if(obj.rowIndex===0&&obj.columnIndex===0){
                	return 'firstCell'
                }else if(obj.rowIndex===0&&obj.columnIndex>0&&obj.column.label!='NoneHeader'){
					return 'NofirstCell'
				}else if(obj.rowIndex>0&&obj.column.label==='NoneHeader'){
					return 'NoneHeader';
                };
            },
            /*单元格title改变*/
			cellClass(obj){
                if((obj.row.status=='')&&(obj.row.response=='')&&(obj.row.type=='')&&(obj.columnIndex==0)){
                	return 'titleCell';
                }
            },
            /*头部样式*/
			headerRowClass(obj){
				return 'headerRowClass';
            },
			RelatedWord(){
				this.$router.push({
					path:'/sysadmin/RelatedWord'
				})
			},
			ExpertSelection(){
				this.$router.push({
					path:'/sysadmin/ExpertSelection'
				})
            }
		}
	}
</script>

<style scoped>
    @import "../../../assets/css/sysSet/wordManagement.css";
</style>