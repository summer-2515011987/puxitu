<template>
    <div class="main_contain2">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 分词管理</p>
            <div class="nav">
                <span class="lt">专业：计算机类 > 大数据技术与应用</span>
                <span class="rt">
                    <el-button class="myCheckButton" size="mini"  type="primary" @click="returnList">返回专业列表</el-button>
                </span>
            </div>
        </div>
        <div class="myTable">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="专业图谱" name="first">
                    专业图谱
                </el-tab-pane>
                <el-tab-pane label="职业图谱" name="second">
                    职业图谱
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
	export default {
		name: "majordetail",
		data(){
			return {
                activeName: 'second',
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
            handleClick(tab, event) {
                console.log(tab, event);
            },
            returnList(){
                this.$router.push({
                    path:"/sysadmin/wordMgnt"
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
            }
		}
	}
</script>

<style scoped>
    @import "../../../../assets/css/sysSet/wordManagement.css";
</style>