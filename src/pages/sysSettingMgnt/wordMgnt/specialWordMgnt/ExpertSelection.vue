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
                <div class="treeBox">
                    <div class="search">
                        <el-input  v-model="name" placeholder="搜索专家" >
                            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <div class="treeBox_tree">
                        <div class="treeBox_treeLI" :class="{'index':Index==index}" @click="nameClick(index)" v-for="(item,index) in expertList">
                            <span class="lt" >{{item.name}}</span>
                            <span class="rt" v-show="Index==index"> > </span>
                        </div>
                    </div>
                </div>
                <div class="contain_l">
                    <div class="contain_l_header">
                        标准中的能力关键词
                    </div>
                    <div class="containdes">
                        <div v-for="item in wordlist" class="wordDiv">
                            <span class="wordSpan wordSpanhover">
                                <el-popover
                                        placement="top"
                                        width="160"
                                        popper-class="DotPopover"
                                        title="参考标准："
                                        trigger="hover"
                                >
                                   <div style="text-align: right; margin: 0">
                                   1111
                                  </div>
                                  <span  slot="reference">{{item.word}}</span>
                            </el-popover>
                            </span>

                        </div>
                    </div>
                </div>
                <div class="contain_r">
                    <div class="contain_l_header">
                        筛选结果
                    </div>
                    <div class="containdes">
                        <div class="alternative">
                            <div class="alternative_header">
                                备选关键词
                            </div>
                            <div class="alternative_box">
                                <div class="alternative_box_item" v-for="item in wordlist">
                                    <div class="alternative_box_itemN">
                                        <div class="alternative_box_iteml">{{item.word}}</div>
                                        <div class="alternative_box_itemr">
                                            <span class="el-icon-success"></span>
                                            筛选完成
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="check">
                            <div class="alternative_header">
                                选定的关键词（可按关联性拖拽关键词排序）
                            </div>
                            <div class="alternative_box">
                                <div class="alternative_box_table">
                                    <el-table
                                            :data="tableData"
                                            style="width:100%;height:100%"
                                            :show-header="false"
                                            class="wordtable"
                                            :cell-class-name="cellClass"
                                            row-key="date"
                                    >
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="date" label="日期" >  </el-table-column>
                                    </el-table>
                                </div>
                                <div class="alternative_box_footer">
                                    <el-button style="margin:0 10px" class="myCheckButton" size="mini"  type="primary">保存</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contain_f">
                <el-button style="margin:0 10px" class="myCheckButton rt" size="mini"  type="primary"  @click="toDetail">保存修改结果</el-button>
                <el-button class="myCheckButton rt" size="mini"  type="primary" @click="toDetail">返回标注详情</el-button>
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
				timeout:null,
                name:null,
				restaurants: [],
                expertList:[
                    {
                    	name:"专家1"
                    },
					{
						name:"专家2"
					},
					{
						name:"专家3"
					},
					{
						name:"专家4"
					},
                ],
                Index:0,
			}
		},
		mounted() {
			this.rowDrop();
		},
		methods:{
			toDetail(){
				this.$router.push({
                    path:'/sysadmin/majordetail'
                })
			},
			/*点击专家*/
			nameClick(index){
				this.Index = index;
            },
/*搜索专家*/
			search(){

            },
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
		}

	}
</script>

<style scoped>
    @import "../../../../assets/css/sysSet/expertSelection.css";
</style>