<template>
    <div class="main_contain">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 分词管理</p>
            <div class="nav">
                <span class="lt">计算机类 > 大数据技术与应用</span>
                <span class="rt">
                  能力维度 > 操作能力 > 专业能力
                </span>
            </div>
        </div>
        <div class="mycontain">
            <div class="contain_a">
                <div class="contain_l">
                    <div class="contain_l_header"> 自动分词结果 </div>
                    <div class="containdes">
						<el-table :data="oriWordList" style="width: 100%" :show-header="false">
							<el-table-column prop="word" label="日期" width="180"> </el-table-column>
							<el-table-column prop=" "  >
								<template slot-scope="scope">
								 <el-button v-if="scope.row.status==1" class="myCheckButton rt" style="margin-top:10px;" size="mini" @click="chooseOriData(scope.row)"  type="primary">选择</el-button>
								</template>
							</el-table-column>
						</el-table>
                    </div>
                </div>
                <div class="contain_c">
                    <div class="contain_l_header">  我筛选的关键词 </div>
                    <div class="containdes">
						<el-table :data="choosedWordList" style="width: 100%" :show-header="false" empty-text="请选择左侧的关键词">
							<el-table-column prop="word"   width="180"> 
								<template slot-scope="scope">
									<el-input v-if="scope.row.inputFlag==true" v-model="scope.row.word" @blur="scope.row.inputFlag=false"></el-input>
									<span v-else>{{scope.row.word}}</span>
								</template>
							</el-table-column>
							<el-table-column prop=" "  >
								<template slot-scope="scope">
								 <el-button   class="myCheckButton rt el-icon-delete" style="margin-top:10px;" size="mini" @click="delWord(scope.$index, choosedWordList)"  type="primary"></el-button>
								 <el-button   class="myCheckButton rt el-icon-edit" style="margin-top:10px;margin-right:10px;" size="mini" @click="scope.row.inputFlag=true"  type="primary"></el-button>
								</template>
							</el-table-column>
						</el-table>
                    </div>
                </div>
                <div class="contain_r">
                    <div class="contain_r_t">
                        <div class="contain_r_t_header">
                            参考：国家职业数据大典
                        </div>
                        <div class="contain_r_t_box">
                            就业方向：主要面向汽车整车制造业、汽车零部件生产企业，专用车辆改装企业的生产过程中汽车零部件与整车装配作业、汽车零部件检验与整车装配过程中的过程检验、整车夏先检查和调试、汽车性能监测与评价、汽车保险理赔和配件销售检验等各项工作。
                        </div>
                    </div>
                    <div class="contain_r_b">
                        <div class="contain_r_t_header">
                            参考：美国ONET标准
                        </div>
                        <div class="contain_r_t_box">
                            就业方向：主要面向汽车整车制造业、汽车零部件生产企业，专用车辆改装企业的生产过程中汽车零部件与整车装配作业、汽车零部件检验与整车装配过程中的过程检验、整车夏先检查和调试、汽车性能监测与评价、汽车保险理赔和配件销售检验等各项工作。
                        </div>
                    </div>
                </div>
            </div>
            <div class="contain_f">
                <el-button class="myCheckButton rt" size="mini"  type="primary" @click="saveToDetail">保存筛选结果</el-button>
                <el-button style="margin:0 10px" class="myCheckButton rt" size="mini"  type="primary" @click="$router.go(-1)">上一步</el-button>
                <!-- <el-button class="myCheckButton rt" size="mini"  type="primary">标注详情</el-button> -->
            </div>
        </div>
    </div>
</template>

<script>
	import Sortable from 'sortablejs'  //可拖拽表格
	export default {
		name: "majordetail",
		data(){
			return {
				options: [{
					value: '1',
					label: '标准1'
				}, {
					value: '2',
					label: '标准2'
				}, {
					value: '3',
					label: '标准3'
				}, {
					value: '4',
					label: '标准4'
				}],
				value: '',
				choosedWordList: [],
				oriWordList:[
					{
						id: 1,//必须有
						word:'关键词A1',
						status:1,
						inputFlag : false //这个实际不应该加在此处
					},
					{
						id: 2,
						word:'关键词A2',
						status:1,
						inputFlag : false
					},
					{
						id: 3,
						word:'关键词A3',
						status:1,
						inputFlag : false
					},
					{
						id: 4,
						word:'关键词A4',
						status:1,
						inputFlag : false
					},
					{
						id: 5,
						word:'关键词A5',
						status:1,
						inputFlag : false
					},
					{
						id: 6,
						word:'关键词A关键词A6',
						status:1,
						inputFlag : false
					},
					{
						id: 7,
						word:'关键词A',
						status:1,
						inputFlag : false
					},
					{
						id: 8,
						word:'关键词A关键词A',
						status:1,
						inputFlag : false
					},
					{
						id: 9,
						word:'关键词A关键词A11',
						status:1,
						inputFlag : false
					},
				],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				textarea:'',
			}
		},
        mounted() {
			this.rowDrop();
		},
		methods:{
			//行拖拽
			rowDrop() {
				const tbody = document.querySelector('.wordtable .el-table__body-wrapper tbody')
				const _this = this
				Sortable.create(tbody, {
					onEnd({ newIndex, oldIndex }) {
						const currRow = _this.tableData.splice(oldIndex, 1)[0]
						_this.tableData.splice(newIndex, 0, currRow);
					}
				})
			},
			cellClass(obj){
				if(obj.columnIndex==0){
					return 'OrangeCell'
                }
			},
			chooseOriData(item){
				item.status = 0;
				var data = Object.assign({}, item);
				data.inputFlag = false;
				this.choosedWordList.push(data);
			},
			delWord(index, rows){
				// 更改左侧同条数据的status
				for(var data of this.oriWordList){
					if(data.id == rows[index].id){
						data.status = 1;
					}
				}
				rows.splice(index, 1);
			},
			saveToDetail(){
				this.$router.push({
                    path:'/sysadmin/majordetail'
                })
			}
		}

	}
</script>

<style scoped>
    @import "../../../../assets/css/sysSet/screenwordB.css";
</style>