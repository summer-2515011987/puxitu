<template>
  <el-card class="form-container h100p" shadow="never" v-loading="bodyLoading"
           element-loading-background="rgba(0, 0, 0, 0.8)">

    <div slot="header" class="clearfix">
      <el-page-header @back="$router.back();" :content="title"></el-page-header>
    </div>

    <el-form :model="oauthClientData"
             :rules="rules"
             ref="oauthClientFrom"
             label-width="200px">
      <el-form-item label="服务名称：" prop="clientId">
        <el-input v-model="oauthClientData.clientId"></el-input>
      </el-form-item>

      <el-form-item v-if="!isEdit" label="授权秘钥：" prop="clientSecret">
        <el-input type="password" v-model="oauthClientData.clientSecret"></el-input>
      </el-form-item>

      <el-form-item label="授权模式：" prop="authorizedGrantTypes">
        <el-select v-model="oauthClientData.authorizedGrantTypes"
                   multiple
                   :loading="getAuthorizedGrantTypesLoading"
                   placeholder="请选择授权模式" style="display: block">
          <el-option
              v-for="item in authorizedGrantTypeList"
              :key="item.id"
              :label="item.text"
              :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效期（秒）：" prop="accessTokenValiditySeconds">
        <el-input v-model.number="oauthClientData.accessTokenValiditySeconds"></el-input>
      </el-form-item>
      <el-form-item label="刷新授权有效期（秒）：" prop="refreshTokenValiditySeconds">
        <el-input v-model.number="oauthClientData.refreshTokenValiditySeconds"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('oauthClientFrom')">提交</el-button>
        <el-button  @click="resetForm('oauthClientFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {createOauthClient, updateOauthClient, findById} from '@/api/auth';
import {fetchDataListByDictName} from '@/api/dict';

const defaultOauthClient = {
  clientId: '',
  authorizedGrantTypes: [],
  accessTokenValiditySeconds: 3600,
  refreshTokenValiditySeconds: 7200
};
export default {
  name: "OauthClientDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {

    const validateAccessTokenValiditySeconds = (rule, value, callback) => {

      if (!value) {
        callback(new Error("请输入有效期"));
      } else if (3600 > value) {
        callback(new Error("有效期应大于3600秒"));
      } else if (this.oauthClientData.refreshTokenValiditySeconds > 0) {
        this.$refs.oauthClientFrom.validateField('refreshTokenValiditySeconds');
      }
      callback();
    };

    const validateRefreshTokenValiditySeconds = (rule, value, callback) => {

      if (!value) {
        callback(new Error("请输入刷新授权有效期"));
      } else if (value < this.oauthClientData.accessTokenValiditySeconds) {
        callback(new Error("刷新授权有效期不能小于有效期"));
      }
      callback();
    };

    return {
      oauthClientData: Object.assign({}, defaultOauthClient),
      authorizedGrantTypeList: [],
      getAuthorizedGrantTypesLoading: true,
      bodyLoading:true,
      rules: {
        clientId: [
          {required: true, message: '请输入授权服务名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        authorizedGrantTypes: [
          {required: true, message: '请选择授权模式', trigger: 'change'}
        ],
        clientSecret:[
          {required: true, message: '请输入授权服务秘钥', trigger: 'blur'},
          {min: 6, max: 64, message: '长度在 6 到 64 个字符', trigger: 'blur'}
        ],
        accessTokenValiditySeconds: [
          {validator: validateAccessTokenValiditySeconds, trigger: 'blur'}
        ],
        refreshTokenValiditySeconds: [
          {validator: validateRefreshTokenValiditySeconds, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData(){
      if (this.isEdit) {
        this.bodyLoading = true;
        this.getAuthorizedGrantTypesLoading = true;
        fetchDataListByDictName("AUTHORIZED_GRANT_TYPE").then(response => {
          this.authorizedGrantTypeList = response.data;
          this.getAuthorizedGrantTypesLoading = false;
        }).then(findById(this.$route.query.id).then(response => {
          this.oauthClientData = response.data;
          this.bodyLoading = false;
        }));
      } else {
        fetchDataListByDictName("AUTHORIZED_GRANT_TYPE").then(response => {
          this.authorizedGrantTypeList = response.data;
          this.getAuthorizedGrantTypesLoading = false;
          this.oauthClientData = Object.assign({}, defaultOauthClient);
          this.bodyLoading = false;
        })
      }
    },
    onSubmit(formName) {
      this.bodyLoading = true;
      this.$refs[formName].validate((valid) => {
        this.bodyLoading = false;
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.bodyLoading = true;
            if (this.isEdit) {
              updateOauthClient(this.oauthClientData.clientId, this.oauthClientData).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              }).catch(errpr=>{
                this.bodyLoading = false;
              });
            } else {
              createOauthClient(this.oauthClientData).then(response => {
                this.$refs[formName].resetFields();
                this.resetForm(formName);
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              }).catch(errpr=>{
                this.bodyLoading = false;
              });
            }
          });

        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.loadData();
    },
  }
}
</script>

<style scoped>

</style>