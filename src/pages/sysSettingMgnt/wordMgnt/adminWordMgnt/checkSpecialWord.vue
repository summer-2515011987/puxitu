<template>
    <div class="main_contain">
        <div class="headerd">
            <p><span class="el-icon-caret-right"></span> 分词管理</p>
            <div class="nav">
                <span class="lt">专业：{{className}}</span>
                <!-- <span class="rt">
                  能力维度 > 操作能力 > 专业能力
                </span> -->
            </div>
        </div>
        <div class="mycontain">
            <div class="contain_a">
                <div class="treeBox">
                    <div class="search">
                        <el-input  v-model="zName" placeholder="搜索专家" >
                            <el-button @click="getExperterList" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <div class="treeBox_tree" style="text-align:left;">
                        <div class="treeBox_treeLI" :class="{'index':Index==index}" @click="nameClick(index,item)" v-for="(item,index) in expertList">
                            <span  >{{item.name}}</span>
                            <span class="rt" v-show="Index==index"> > </span>
                        </div>
                    </div>
                </div>
                <div class="contain_l">
                    <div class="contain_l_header">
                        筛选的关键词
                    </div>
                    <div class="containdes">
                        <div v-for="(item,index) in wordlist" class="wordDiv">
                            <span class="wordSpan wordSpanhover">
								<span  slot="reference">{{wordlist[index]}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="contain_l" >
                    <el-row style="height:33%">
                        <div class="headder_title threeTitle" > 社会能力 </div>
                        <div class="threeCon">
                            <span class="threeSpan" v-for="(item,index) in shArr">
                                <span  slot="reference">{{shArr[index]}}</span>
                            </span>
                        </div>
                    </el-row>
                    <el-row style="height:33%">
                        <div class="headder_title threeTitle"  > 操作能力 </div>
                        <div class="threeCon">
                            <span class="threeSpan" v-for="(item,index) in czArr"  >
                                <span  slot="reference">{{czArr[index]}}</span>
                            </span>
                        </div>
                    </el-row>
                    <el-row style="height:33%">
                        <div class="headder_title threeTitle" > 发展能力 </div>
                        <div class="threeCon">
                            <span class="threeSpan" v-for="(item,index) in fzArr">
                                <span  slot="reference">{{fzArr[index]}}</span>
                            </span>
                        </div>
                    </el-row>
                </div>
            </div>
            <div class="contain_f">
                <el-button class="myCheckButton rt" size="mini"  type="primary" @click="$router.go(-1);">返回标注详情</el-button>
            </div>
        </div>
    </div>
</template>

<script>
	import service from '@/api/wordMgntAPI.js';
	export default {
		name: "majordetail",
		data(){
			return {
				zId : sessionStorage.getItem("zId"),
				wordlist:[],
                zName:null,
                expertList:[],
                Index: 0,
				loginUserRoles:  sessionStorage.getItem("roles"),
                className: sessionStorage.getItem("className"),
                shArr: [],
                czArr: [],
                fzArr: []
			}
		},
		methods:{
			nameClick(index, item){
				this.Index = index;
				if(item.keywords){
					this.wordlist = item.keywords.split(',');
				}else{
					this.wordlist = []
				}
                if(item.sh){
                    this.shArr = item.sh.split(',');
                }
                if(item.cz){
                    this.czArr = item.cz.split(',');
                }
                if(item.fz){
                    this.fzArr = item.fz.split(',');
                }
            },
			getExperterList(){
				var params = {
					id: this.zId,
					name: this.zName
				};
				service.getAllExpertJobClass(params).then(response => {
					if(response.code == 200){
						this.expertList = response.data;
                        this.nameClick(this.Index, this.expertList[this.Index]);
					}
                });
			}
		},
		created(){
			this.getExperterList();
		}
	}
</script>

<style scoped>
    @import "../../../../assets/css/sysSet/expertSelection.css";
    .threeTitle{
        width:100%;
        height: 50px;
        background: #0F4482;
    }
    .threeCon{
        text-align:left;
        height:150px;
        box-shadow: 0px 0px 3px 3px #ccc;
        overflow:auto;
    }
    .threeSpan{
        padding: 5px;
        margin: 8px;
        color: #000A12;
        border: 1px solid #c6c5c5;
        background: #f5f3f3;
        border-radius: 2px;
    }
</style>