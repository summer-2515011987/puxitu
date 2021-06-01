<template>
    <div class="main_contain2">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 分词管理</p>
            <div class="nav">
                <span class="lt">专业：计算机类 > 大数据技术与应用</span>
                <span class="rt">
                    <el-button class="myCheckButton" size="mini"  type="primary" @click="returnList">返回专业列表</el-button>
                    <el-button class="myCheckButton" size="mini"  type="primary" @click="preview">预览图谱</el-button>
                </span>
            </div>
        </div>
        <div class="myTable">
            <el-table   :data="tableData" style="width: 100%;" ref="table1"
                    row-key="id" 
                    :header-cell-class-name="headerCell"
                    :cell-class-name="cellClass"
                    :header-row-class-name="headerRowClass"
                    :stripe="false"
                    v-loading="listLoading" 
                    border default-expand-all 
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column prop="title" label="能力维度 - 社会能力"   width="180"> </el-table-column>
                <el-table-column label="关键词筛选结果" :key="Math.random()" prop="response"></el-table-column>
                <!-- 专家角色有状态 -->
                <el-table-column label="状态" :key="Math.random()" prop="status" width="80px"></el-table-column>
                <el-table-column prop="name" label="操作"   width="280"> 
                    <el-table-column label="NoneHeader" :key="Math.random()" prop="name" width="200px">
                        <template slot-scope="scope" v-if="scope.row.status!=''">
                            <!-- 如果是专家，【筛选分词】，
                            如果是管理员，【查看专家分词结果】 -->
                            <el-button size="mini" type="primary" class="myCheckButton" @click="checkWord">筛选分词</el-button>
                            <!-- <el-button size="mini" type="primary" class="myCheckButton" @click="checkWord">查看专家标注结果</el-button> -->
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="tableData2" ref="table2"
                      row-key="id" 
                      style="width: 100%;margin-top:30px"
                      :header-cell-class-name="headerCell"
                      :cell-class-name="cellClass"
                      :header-row-class-name="headerRowClass" 
                      default-expand-all 
                      v-loading="listLoading" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column label="能力维度 - 操作能力" prop="title"  width="180"></el-table-column>
                <el-table-column label="关键词筛选结果" prop="response"></el-table-column>

                <!-- 专家角色有状态 -->
                <!-- <el-table-column label="状态" :key="Math.random()" prop="status" width="80px"></el-table-column> -->
                <el-table-column prop="name" label="操作"   width="280"> 
                    <el-table-column label="NoneHeader" :key="Math.random()" prop="name" width="200px">
                        <template slot-scope="scope" v-if="scope.row.status!=''">
                            <!-- 如果是专家，【筛选分词】，
                            如果是管理员，【查看专家分词结果】 -->
                            <!-- <el-button size="mini" type="primary" class="myCheckButton" @click="checkWord">筛选分词</el-button> -->
                            <el-button size="mini" type="primary" class="myCheckButton" @click="showSpecialWord">查看专家标注结果</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-table :data="tableData3" ref="table3"
                      row-key="id" 
                      style="width: 100%;margin-top:30px"
                      :header-cell-class-name="headerCell"
                      :cell-class-name="cellClass"
                      :header-row-class-name="headerRowClass" 
                      default-expand-all 
                      v-loading="listLoading" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column label="能力维度 - 发展能力" prop="title"  width="180"></el-table-column>
                <el-table-column label="关键词筛选结果" prop="response"></el-table-column>
                
                <!-- 专家角色有状态 -->
                <el-table-column label="状态" :key="Math.random()" prop="status" width="80px"></el-table-column>
                <el-table-column prop="name" label="操作"   width="280"> 
                    <el-table-column label="NoneHeader" :key="Math.random()" prop="name" width="200px">
                        <template slot-scope="scope" v-if="scope.row.status!=''">
                            <!-- 如果是专家，【筛选分词】， 如果是管理员，【查看专家分词结果】 -->
                            <el-button size="mini" type="primary" class="myCheckButton" @click="checkWord">筛选分词</el-button>
                            <!-- <el-button size="mini" type="primary" class="myCheckButton" @click="checkWord">查看专家标注结果</el-button> -->
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
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
                tableData: [{
                        id: 1,
                        title:'道德责任',
                        type:'',
                        response: '',
                        status:'',
                        children: [{
                            id: 11,
                            title: '职业道德',
                            type:'未完成',
                            response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                            status:'未完成',
                            }, {
                            id: 12,
                            title: '法律责任',
                            response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                            type:'未完成',
                            status:'未完成',
                        }]
                    }, {
                        id: 2,
                        title:'安全环保',
                        type: '',
                        status:'',
                        response: '',
                        children: [{
                            id: 21,
                            title: '健康安全',
                            type:'未完成',
                            response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                            status:'未完成',
                            }, {
                            id: 22,
                            title: '环境保护',
                            type:'未完成',
                            response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                            status:'未完成',
                    }]
                    }, {
                        id: 3,
                        title: '沟通合作',
                        type:'',
                        status:'',
                        response: '',
                        children: [{
                            id: 31,
                            title: '沟通交流',
                            type:'未完成',
                            response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                            status:'未完成',
                            }, {
                            id: 32,
                            title: '与人合作',
                            type:'未完成',
                            response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                            status:'未完成',
                        }]
                }],
                tableData2: [{
                    id: 1,
                    title:'专业能力',
                    type:'未完成',
                    response: '',
                    status:'',
                    children: []
                }, {
                    id: 2,
                    title:'通用能力',
                    type: '',
                    status:'',
                    response: '',
                    children: [{
                        id: 21,
                        title: '通用技术能力',
                        type:'未完成',
                        response:' ',
                        status:'未完成',
                        }, {
                        id: 22,
                        title: '信息处理能力',
                        type:'已完成',
                        response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                        status:'未完成',
                        },{
                        id: 23,
                        title: '数字应用能力',
                        type:'未完成',
                        response:' ',
                        status:'未完成',
                        }, {
                        id: 24,
                        title: '自我学习能力',
                        type:'已完成',
                        response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                        status:'已完成',
                        }, {
                        id: 25,
                        title: '外语应用能力',
                        type:'已完成',
                        response:'关键词A/关键词B/关键词C/关键词D/关键词E',
                        status:'已完成',
                        }]
                }],
                tableData3: [{
                    id: 1,
                    title:'学习能力',
                    type:'未完成',
                    response: '',
                    status:'',
                    children: []
                }, {
                    id: 2,
                    title:'信息能力',
                    type: '未完成',
                    status:'未完成',
                    response: '',
                    children: []
                }, {
                    id: 2,
                    title:'创业能力',
                    type: '已完成',
                    status:'未完成',
                    response: '关键词A/关键词B/关键词C/关键词D/关键词E',
                    children: []
                }],
				listLoading:false,
			}
		},
		methods:{
            returnList(){
                this.$router.push({
                    path:"/sysadmin/WordManagement"
                })
            },
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
            },
            preview(){
                this.$router.push({
                    path:'/sysadmin/preview'
                })
            },
            showSpecialWord(){
                this.$router.push({
                    path:'/sysadmin/checkSpecialWord'
                })
            }
		}
	}
</script>

<style scoped>
    @import "../../../../assets/css/sysSet/wordManagement.css";
</style>