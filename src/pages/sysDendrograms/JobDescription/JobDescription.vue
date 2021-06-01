<template>
    <el-container class="den-wrap h100p">
        <el-header style="height: 80px;">
            <div class="header-left-choose-div" style="left: 20px">
                <el-cascader   id="den-cascader-id" ref="den-cascader-id"
                               v-model="value" :popper-append-to-body="false" popper-class="qian-cascade"
                               :options="options"
                               :props="{ expandTrigger: 'hover' }"
                               @change="handleChange">
                </el-cascader>
                <span class="redIcon"></span>
            </div>
            <div class="header-buttonl" @click="$router.push('/loginNav')">返回导航页</div>
            <div class="header-buttonr"  @click="$router.push('/model/list')">构建职业谱系图</div>
            <div class="header-right-login-msg-div">
                <span class="redIcon"></span>
                <span class="el-icon-user "> 管理员 | 张三</span>
                <img src="../../../assets/images/sysEchart/logoutIcon.png"  alt="" />
                <el-button type="text" class="loginButton" @click="loginOut"> 退出登录</el-button>
            </div>
        </el-header>
        <el-main>
            <el-aside>
                <div class="Mapbox">
                    <div class="MapboxItem" v-for="item in MapNum">
                        <span :class="{'deepcolor':son.Ishave,'checkColor':son.checked}" v-for="son in item" style="color: transparent"></span>
                    </div>
                </div>
                <div class="jobdescription">
                    <p class="jobdescription_title">
                       <span class="jobdescription_title_s1" :title="message.jobName">岗位分类名称:{{message.jobName}}</span> <span class="jobdescription_title_s2"><span class="jobdescription_title_s3">{{rowN}}</span>级</span>
                    </p>
                    <p class="jobdescription_req">市场需求比率 ：{{message.jobDemandPercentage?message.jobDemandPercentage+"%":null}}</p>
                    <p class="jobdescription_req">学历要求 ：{{message.education}}</p>
                    <p class="jobdescription_req">经验要求 ：{{message.experience}}</p>
                    <p class="jobdescription_req">薪资要求 ：{{message.salaryMonth}}</p>
                </div>
                <div class="jobdescription_nav">
                    <p class="p1"><span style="margin-left:2px;font-size: 20px" class="el-icon-bottom"></span>岗位数 ：{{navdata.length}}</p>
                    <div @click="navclick(index)" class="nav" :class="{'navcheck':navIndex==index}" v-for="(son,index) in navdata" >
                        <span class="nav1">{{son.jobName}}</span>
                        <span class="nav2" v-if="navIndex==index"> > </span>
                    </div>
                </div>
            </el-aside>
            <el-container>
                <div class="container_title">职业说明书<span class="el-icon-close" @click="$router.go(-1)"></span></div>
                <div class="textDiv div-border-shadow">
                    <div v-for="item in desMesdage" style="margin-bottom: 30px">
<!--                        <div class="desBox_header_one">-->
<!--                            <span class="bigType">{{item.typeName}}</span>-->
<!--                        </div>-->
                        <div class="desBox" v-for="son in item.professionalOnetInfoDataDtos">
                            <div class="desBox_header">
                                <span class="borderSpan"></span>
                                <span class="titleSpan">{{son.onetName}}</span>
                            </div>
                            <div class="desBox_body" v-html="son.positionDetailClause">
                            </div>
                        </div>
                    </div>
                </div>
            </el-container>
        </el-main>
    </el-container>
</template>
<script>
	import Cookies from 'js-cookie'
	import store from "@/store";
	import NProgress from 'nprogress' 
	import {loadScatterPlotData,loadProfessionalOnetInfoDataDtoBySmallClass,getAfterJobClass} from "@/api/professionModelManagerApi"
	export default {
		name: "index",
		data() {
			return {
				value: [],
				options: [],
				professionCode: null,
				MapNum:[
                    [{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false}],
					[{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false}],
					[{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false}],
					[{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false}],
					[{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false}],
					[{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false},{Ishave:false,checked:false}],
				],
                navdata:[],
                navIndex:0,
                desMesdage:[],
                message:{},
                rowN:null,
				colN:null,
				passedGoSm: window.sessionStorage.getItem('goSm')
            };
		},
		mounted() {
			
			
        },
		created(){
			// var obj = window.sessionStorage.getItem('goSm');
			var obj2 = JSON.parse(this.passedGoSm);
			this.navdata = obj2.obj1;
			this.message = obj2.obj2;
			// this.value = obj2.obj3;
			this.professionCode = this.$route.query.id;
			let rowN = this.$route.query.r/1;
			this.rowN =this.$route.query.len - rowN;
			let colN = this.$route.query.c/1;
			this.colN = colN;
			this.MapNum[rowN][colN].checked = true;
			this.gettableList();
			this.getdesbook();
			this.getProList();
		},
		methods: {
			/*或取说明书*/
            getdesbook(){
				loadProfessionalOnetInfoDataDtoBySmallClass(this.professionCode,this.rowN,this.colN).then(rep=>{
					if (rep.code === 200){
						this.desMesdage = rep.data;
					}
				}).catch(error=>{
					console.error(error);
				});
            },
			getProList() {
				var that = this;
				getAfterJobClass().then(response => {
					that.options = response.data;

					var passedobj2 = JSON.parse(that.passedGoSm);
					that.value = passedobj2.obj3.value;
					that.professionCode = that.$route.query.id;
					
				}).catch(reason => {
					this.$message.error(reason.message);
				});
			},
			/*获取表格信息*/
			gettableList(){
				loadScatterPlotData(this.professionCode).then(rep=>{
					if (rep.code === 200){
						let data = rep.data.reverse();
                        for(let ind in data){
                        	for(let key in data[ind]){
                        		let name = key.substr(key.length-1,1);
                        		if(['1','2','3','4','5','6'].indexOf(name)>-1){
									if((data[ind][key])&&(data[ind][key].length>0)){
									this.MapNum[ind][name-1].Ishave  = true;
									};
                                };
                            };
                        };
					} else {
						this.$message.error(rep.message);
					}
				}).catch(errpr=>{

					this.$message.error(errpr);
				});
			},
			navclick(index){
				this.navIndex = index;
            },
			loginOut(){
				this.$confirm('确定要退出系统吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					sessionStorage.clear();
					localStorage.clear();
					store.dispatch('LogOut').then(() => {
						NProgress.done();
						this.$router.push({ path: "/" });
					});
				}).catch(() => {
				});
			},
			handleChange(value) {
				this.$router.go(-1)
			},
		}
	}
</script>
<style scoped>
	@import "./../../../assets/css/sysDen/denMain.css";
    @import "./../../../assets/css/sysDen/jobDescription.css";
</style>
