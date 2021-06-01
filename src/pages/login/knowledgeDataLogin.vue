<template xmlns="">
  <div class="login-wrap">
    <el-form
        label-position="left"
        :model="loginData"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
        class="demo-ruleForm login-container" 
        style="width: 30%;margin-top: 45vh;">
      <el-form-item prop="username">
        <el-input type="text" v-model.trim="loginData.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <hr class="hr15"/>
      <el-form-item prop="password">
        <el-input
            type="password"
            v-model.trim="loginData.password"
            auto-complete="off"
            placeholder="密码"
            v-on:keyup.13.native="submitForm('loginForm')"
        ></el-input>
      </el-form-item>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item prop="code">
            <el-input type="text" v-model.trim="loginData.code" auto-complete="off" placeholder="图形验证码" @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="code-box">
          <img :src="loginForm.codeimg" alt="" class="codeimg" @click="getcode()">
        </el-col>
      </el-row>-->
      <!-- <hr class="hr15"/>
      <el-checkbox class="remember" v-model="loginData.rememberpwd">记住密码</el-checkbox> -->
      <!-- <hr class="hr15"/> -->
      <el-form-item style="width:100%;">
        <el-button
            type="primary"
            class="button"
            style="width:100%;"
            @click="submitForm('loginForm')"
            :loading="loading"
        >登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {validUsername} from "@/utils/validate";
// import {setToken,getToken} from '@/utils/tokenActions.js';

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
      loading: false,
      // 记住密码
      loginData: {
        username: "",
        password: "",
        rememberpwd: false
      },
      loginRules: {
        username: [
          {required: true, trigger: "blur", validator: validateUsername},
        ],
        password: [
          {required: true, trigger: "blur", validator: validatePassword},
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
      //  this.$router.push({path: '/sysadmin'})
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("GetPublicKey").then((resp)=>{
            let passwordStr = null;
            var jsencrypt = new JSEncrypt();
            jsencrypt.setPublicKey(resp.data.publicKey);
            passwordStr = jsencrypt.encrypt(resp.data.randomKey +":"+  this.loginData.password).replace(/\+/g, '%2B');
            return passwordStr;
          }).then((resp)=>{
            this.loginData.password = resp;
            this.$store.dispatch('Login', this.loginData).then(() => {
              this.loading = false;
              // if (this.loginData.rememberpwd){//如果用户选择 记住登录信息
              //   setCookie("username",this.loginData.username,15);
              //   setCookie("password",this.loginData.password,15);
              // }
              this.$router.push({path: '/knowledgeDataMain'})
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
