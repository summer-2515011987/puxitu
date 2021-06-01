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
                        <div class="headder_title lt">能力描述</div>
                        <div class="headder_box lt">
                            <div class="longSelect">
                                <el-select v-model="value" placeholder="请选择标准">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="containdes">
                        <div class="containdes_item">
                            <div class="containdes_item_box" v-for="item in deslist">
                                <div class="containdes_item_box_word">{{item.word}}</div>
                                <div class="containdes_item_box_btz">
                                    <div class="centerDiv">
                                        <el-button v-if="item.status==1" class="myCheckButton rt" size="mini"  type="primary">选择</el-button>
                                        <span v-else>{{item.status}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contain_r">
                    <div class="contain_l_header">
                      筛选结果
                    </div>
                    <div class="containdes">
                        <div class="GDdiv">
                            <div class="containdes_item_box_word heighttextarea"><el-input
                                    type="textarea"
                                    placeholder="在这里输入您想添加的描述"
                                    v-model="textarea"
                            >
                            </el-input></div>
                            <div class="containdes_item_box_btz">
                                <div class="centerDiv">
                                    <el-button class="myCheckButton rt" size="mini"  type="primary">保存</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="containdes_item">
                            <div class="containdes_item_box" v-for="item in deslist">
                                <div class="containdes_item_box_word">{{item.word}}</div>
                                <div class="containdes_item_box_btz">
                                    <div class="centerDiv">
                                        <el-button v-if="item.status==1" class="myCheckButton rt" size="mini"  type="primary">选择</el-button>

                                        <el-button v-else class="myCheckButton rt" size="mini"  type="primary">删除</el-button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contain_f">
                <el-button class="myCheckButton rt" size="mini"  type="primary" @click="keepWord">保存筛结果并自动分词</el-button>
            </div>
        </div>
    </div>
</template>

<script>
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
                deslist:[
                    {
                    	word:'培养目标：培养具有汽车等各类机动车的制造、运行、维修与技术管理能力的技术应用型人才。毕业生可在汽车制造厂、汽车改装厂等各类机动车的制造、维修等技术与管理工作。',
                        status:1
                    },
					{
						word:'培养目标：培养具有汽车等各类机动车的制造、运行、维修与技术管理能力的技术应用型人才。毕业生可在汽车制造厂、汽车改装厂等各类机动车的制造、维修等技术与管理工作。',
						status:1
					},
					{
						word:'培养目标：培养具有汽车等各类机动车的制造、运行、维修与技术管理能力的技术应用型人才。毕业生可在汽车制造厂、汽车改装厂等各类机动车的制造、维修等技术与管理工作。',
						status:1
					},
					{
						word:'培养目标：培养具有汽车等各类机动车的制造、运行、维修与技术管理能力的技术应用型人才。毕业生可在汽车制造厂、汽车改装厂等各类机动车的制造、维修等技术与管理工作。',
						status:1
					},
					{
						word:'培养目标：培养具有汽车等各类机动车的制造、运行、维修与技术管理能力的技术应用型人才。毕业生可在汽车制造厂、汽车改装厂等各类机动车的制造、维修等技术与管理工作。',
						status:1
					},
					{
						word:'培养目标：培养具有汽车等各类机动车的制造、运行、维修与技术管理能力的技术应用型人才。毕业生可在汽车制造厂、汽车改装厂等各类机动车的制造、维修等技术与管理工作。',
						status:1
					},
					{
						word:'培养目标：培养具有汽车等各类机动车的制造、运行、维修与技术管理能力的技术应用型人才。毕业生可在汽车制造厂、汽车改装厂等各类机动车的制造、维修等技术与管理工作。',
						status:1
					},
                ],
				textarea:'',
			}
		},
		methods:{
			keepWord(){
				this.$router.push('/sysadmin/screenWordb')
            }
		}
	}
</script>

<style scoped>
    @import "../../../assets/css/sysSet/screenword.css";
</style>