<template>
  <div class="login-nav">
    <div class="topToolBar">
      <span class="redIcon"></span>
      <span class="el-icon-user"> 管理员 | 张三</span>
      <el-button type="text" class="loginButton" @click="loginOut"> 退出登录</el-button>
    </div>
    <div class="sysOne">
      <img   :src="url1" @mouseenter="enter1"  @mouseleave="leave1" alt="" @click="clickImg(1)"/> 
    </div>
    <div class="sysSec" >
       <img :src="url2" @mouseenter="enter2"  @mouseleave="leave2"  alt="" @click="clickImg(2)"/>
    </div>
    <div class="sysThird" >
       <img :src="url3" @mouseenter="enter3"  @mouseleave="leave3"   alt="" @click="clickImg(3)"/>
    </div>
    <div class="sysFor" >
       <img :src="url4" @mouseenter="enter4"  @mouseleave="leave4"  alt=""  @click="clickImg(4)"/> 
    </div>
  </div>
</template>

<script>
import store from "@/store";
import NProgress from 'nprogress' 
import img1 from '../../../assets/images/loginNav/1.png';
import img1_hover from './../../../assets/images/loginNav/D-1.gif';
import img2 from '../../../assets/images/loginNav/2.png';
import img2_hover from './../../../assets/images/loginNav/D-2.gif';
import img3 from '../../../assets/images/loginNav/3.png';
import img3_hover from './../../../assets/images/loginNav/D-3.gif';
import img4 from '../../../assets/images/loginNav/4.png';
import img4_hover from './../../../assets/images/loginNav/D-4.gif';
export default {
  name: "Login",

  data() {
    return {
      logining: false,
      url1: img1,
      url2: img2,
      url3: img3,
      url4: img4,

    };
  },
  mounted() {
    // sessionStorage.clear();
    // localStorage.clear();
  },
  methods: {
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
					// this.$message({
					// 	type: 'info',
					// 	message: '已取消退出'
					// });          
				});
      
    },
    clickImg(index) {
      if(index==1){
        this.$router.push({ path: "/jobIndex" });
      }else if(index==4){
        this.$router.push({ path: "/echartIndex" });
      }else if(index==2){
        this.$router.push({ path: "/autobuild" });
      }else if(index==3){
        this.$router.push({ path: "/denIndex" });
      }
    },
    enter1(){
      this.url1 = img1_hover;
    },
    leave1(){
      this.url1 = img1;
    },
    enter2(){
      this.url2 = img2_hover;
    },
    leave2(){
      this.url2 = img2;
    },
    enter3(){
      this.url3 = img3_hover;
    },
    leave3(){
      this.url3 = img3;
    },
    enter4(){
      this.url4 = img4_hover;
    },
    leave4(){
      this.url4 = img4;
    },
  }
};
</script>

<style scoped>
.login-nav {
  background-image: url('./../../../assets/images/loginNav/login_nav_background.png'); 
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size: 100% 100%;
  height: 100%;
  width: 100%;
}
.login-nav .sysOne,.sysSec,.sysThird,.sysFor{
  width: 25%;
  height: 100%;
  float: left;
}
 .login-nav .topToolBar{
  color: white;
}

/*.login-nav img:hover{
  width: 100%
} */

.topToolBar{
  position: absolute;
  width: 210px;
  top: 20px;
  right: 20px;
  height: 32px;
  /* filter:alpha(Opacity=80);
  -moz-opacity:0.5;
  opacity: 0.5; */
  /* background-color: red; */

}
/* .login-nav img{
  width: 95%;
} */
.sysOne {
  padding-top: 200px;
}
/* .sysOne img:hover{
   background-image: url('./../../../assets/images/loginNav/D-1.gif'); 
} */
/* .sysSec img:hover{
   background-image: url('./../../../assets/images/loginNav/D-2.gif'); 
}
.sysThird img:hover{
   background-image: url('./../../../assets/images/loginNav/D-3.gif'); 
}
.sysFor img:hover{
   background-image: url('./../../../assets/images/loginNav/D-4.gif'); 
} */
.sysSec {
  padding-top: 50px;
}
.sysThird{
  padding-top: 50px;
}
.sysFor {
  padding-top: 200px;
}
/* .sysOne{

} */
 .login-container {
  min-height: 230px;
  width: 365px;
  max-width: 365px;
  background-color: transparent;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  padding: 0;
  text-align: left;
  padding-top: 220px;
  
}
</style>
