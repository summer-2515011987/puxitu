<template>
    <div class="login-wrap">
       <img src="../../assets/images/login/left_top_icon.png" alt="" width="324" height="56" 
       style="float:left;margin:20px">
            
       <div class="login-form-div">
          <el-form
              :model="loginData"
              :rules="loginRules"
              ref="loginForm"
              label-width="0px"
              class="login-container">
              <el-form-item prop="username">
                  <el-input type="text" v-model.trim="loginData.username" auto-complete="off" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" v-model.trim="loginData.password"
                    auto-complete="off" placeholder="密码"  v-on:keyup.13.native="submitForm('loginForm')"></el-input>
              </el-form-item>
              <el-form-item style="width:100%;">
                  <el-button
                    type="primary"
                    class="button"
                    style="width:100%;"
                    @click="submitForm('loginForm')"
                    :loading="loading"
                  >登录</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
</template>

<script>
import {validUsername} from "@/utils/validate";

export default {
  name: "Login",

  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("用户名不能为空"));
      } else if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("密码不能为空"));
      } else if (value.length < 6) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        callback();
      }
    };
    return {
      //定义loading默认为false
      loading: false,
      // 记住密码
      loginData: {
        username: "",
        password: "",
        rememberpwd: false
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        cookieName: ""
        // ,code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
    };
  },
  mounted() {
    sessionStorage.clear();
    localStorage.clear();
  },
  methods: {
    submitForm(formName) {
      var me = this;
      this.$refs[formName].validate((valid) =>{

        if (valid){
          this.loading = true;
          this.$store.dispatch("GetPublicKey").then((resp) =>{
              let passwordStr = null;
              let jsencrypt = new JSEncrypt();
              jsencrypt.setPublicKey(resp.data.publicKey);
              passwordStr = jsencrypt.encrypt(resp.data.randomKey +":"+  me.loginData.password).replace(/\+/g, '%2B');
              return passwordStr;
          }).then((resp)=>{
            this.loginData.password = resp;
            this.$store.dispatch("Login", this.loginData).then(()=>{
              this.loading = false;
              // if (this.loginData.rememberpwd){
              //   setCookie("username",this.loginData.username,7);
              //   setCookie("password",this.loginData.password,7);
              // }
              this.$router.push({ path: "/loginNav" });
            }).catch((reason => {
              this.loading = false;
              this.loginData.password = "";
            }));
          }).catch((rep)=>{
            this.loading = false;
            this.$message.error('登录异常，请稍后再试！');
          });
        }
      });
    },
  }
};
</script>

<style scoped>
@import "./../../assets/css/logins.css";
</style>
