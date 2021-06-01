import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Config from './Config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
// import CommonService from '@/utils/CommonService.js'

import Resumable from '@/assets/resumable/resumable.js'
import JSEncrypt from 'jsencrypt';
import echarts from 'echarts';
import VueKindEditor from './plugin/kindeditor.js'
import '../static/kindeditor/themes/default/default.css'
import '../static/kindeditor/kindeditor-all.js'
import '../static/kindeditor/lang/zh-CN.js'

//时间处理插件
import moment from 'moment'
import "@/assets/css/common.css";
// import VueResumable from '@/assets/vue-resumable/lib/index.js'
import '@/permission';
import $ from 'jquery';
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(codemirror)

Vue.prototype.$getRsaCode = JSEncrypt

Vue.config.productionTip = false
// 挂载配置
Vue.prototype.Config = Config;
Vue.prototype.echarts = echarts;
Vue.prototype.moment = moment;

/* 注册iView组件 */
Vue.use(iView);
/* 注册El组件 */
Vue.use(ElementUI)

// Vue.use(CommonService)
/* 注册上传组件 */
Vue.use(Resumable)
/*
富文本
 */
Vue.use(VueKindEditor)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
})
