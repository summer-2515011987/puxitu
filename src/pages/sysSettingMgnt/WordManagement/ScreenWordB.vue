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
                    <div class="contain_l_header">
                        标准中的能力关键词
                    </div>
                    <div class="containdes">
                        <div v-for="item in wordlist" class="wordDiv">
                            <span class="wordSpan wordSpanhover">
                                {{item.word}}
                            </span>

                        </div>
                    </div>
                </div>
                <div class="contain_c">
                    <div class="contain_l_header">
                        标准中的能力关键词
                    </div>
                    <div class="containdes">
                        <div v-for="item in wordlist" class="wordDiv">
                            <span class="wordSpan wordSpanhover">
                                {{item.word}}
<!--                                <el-popover-->
<!--                                        placement="top"-->
<!--                                        width="160"-->
<!--                                        popper-class="DotPopover"-->
<!--                                        title="参考标准："-->
<!--                                        trigger="hover"-->
<!--                                >-->
<!--                                   <div style="text-align: right; margin: 0">-->
<!--                                   1111-->
<!--                                  </div>-->
<!--                                  <span  slot="reference">{{item.word}}</span>-->
<!--                            </el-popover>-->
                            </span>

                        </div>
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
                <el-button class="myCheckButton rt" size="mini"  type="primary">保存筛结果并自动分词</el-button>
                <el-button style="margin:0 10px" class="myCheckButton rt" size="mini"  type="primary" @click="$router.go(-1)">上一步</el-button>
                <el-button class="myCheckButton rt" size="mini"  type="primary">标注详情</el-button>
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
				wordlist:[
					{
						word:'关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},
					{
						word:'关键词A关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},
					{
						word:'关键词A关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},
					{
						word:'关键词A关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},{
						word:'关键词A关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},{
						word:'关键词A关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
					},{
						word:'关键词A关键词A',
						status:1
					},
					{
						word:'关键词A',
						status:1
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
            }
		}

	}
</script>

<style scoped>
    @import "../../../assets/css/sysSet/screenwordB.css";
</style>