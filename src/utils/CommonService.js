import 'vue';
import axios from 'axios'
import {Loading} from 'element-ui';
import Config from '../Config'
import router from '../router'

let loading;

// 使用Element loading-start 方法
function _start_procgress() {
    loading = Loading.service({
        lock: true,
        text: '正在请求......'
    })
}

// 使用Element loading-close 方法
function _close_procgress() {
    loading.close()
}

// 同步请求计数器
let needLoadingRequestCount = 0;

function _show_loading() {
    if (needLoadingRequestCount === 0) {
        _start_procgress();
    }
    needLoadingRequestCount++;
}

function _close_loading() {
    if (needLoadingRequestCount <= 0)
        return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        _close_procgress();
    }
}
/* 创建实例 */
const HttpClientService = axios.create({
    baseURL: Config.basePath,
    timeout: Config.connectionTimeout
});
HttpClientService.defaults.withCredentials = true;
/**请求拦截 */
HttpClientService.interceptors.request.use(    
    config => {
        config.headers["Authorization"] =sessionStorage.tokenHead + sessionStorage.token;
        config.headers["X-Custom-Header"] = 'Asdc-web Client Agent';
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    }
);

/**
 * 创建连接
 * @param option 参数<br/>
 * <p>option = { </p>
 * <p>    url 请求地址， </p>
 * <p>    method 请求方式  </p>
 * <p>    data 请求数据  </p>
 * <p>    timeout 超时事件 default 60s  </p>
 * <p>    isLoading 是否需要出现加载样式  </p>
 * <p>    loadingText 加载文本  </p>
 * <p></p>
 * <p>}</p>
 */
function httpConnection(option) {
    const params = {
        url: option.url,
        method: option.method || 'post',
        data: option.data || {},
        timeout: option.timeout || Config.connectionTimeout,
    };

    let first = true;
    if (option.method === "GET"){
        params.url += "?";

        for(let key  in params.data){

            if (first){
                params.url += key + "=" + params.data[key];
                first = false;
            } else{
                params.url += "&" + key + "=" + params.data[key];
            }
        }

    }

    const isLoad = option.isLoading;
    if (isLoad) {
        _show_loading();
        if (option.loadingText) {
            loading.text = option.loadingText;
        }
    }
    HttpClientService(params).then(response => {
        if (isLoad)
            _close_loading();

        // 如果back回调处理出现异常(语法错误等),会触发error回调,造成两次回调
        try {
            if (!response.data || response.data === "") {
                option.back({"code": "09", "msg": "服务无数据返回"});
            } else{
                let code =  response.data.code;
                switch (code) {
                    case 401:
                        router.push({
                            path: "/"
                          })
                        break;
                    default:
                        option.back(response.data);
                }
                //option.back(response.data);
            }
                
        } catch (e) {
            console.log("请求回调出现错误[" + (e.message || '') + "]");
        }
    }).catch(error => {
        if (isLoad)
            _close_loading();
        if (error.response) {
            
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误(400)';
                    break;
                case 401:
                    error.message = '未授权，请重新登录(401)';
                    break;
                case 403:
                    error.message = '拒绝访问(403)';
                    break;
                case 404:
                    error.message = '请求出错(404)';
                    break;
                case 408:
                    error.message = '请求超时(408)';
                    break;
                case 500:
                    error.message = '服务器错误(500)';
                    break;
                case 501:
                    error.message = '服务未实现(501)';
                    break;
                case 502:
                    error.message = '网络错误(502)';
                    break;
                case 503:
                    error.message = '服务不可用(503)';
                    break;
                case 504:
                    error.message = '网络超时(504)';
                    break;
                case 505:
                    error.message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    error.message = `连接出错(${error.response.status})!`;
            }
        } else if (error.request) {
            error.message = error.message || '其它错误';
        } else {
            error.message = "未知错误" + (error.message || '');
        }
    });
}

/**
 * 一些方法的封装
 * @param context 上下文
 * @param option 参数<br/>
 * <p>option = { </p>
 * <p>    url 请求地址， </p>
 * <p>    method 请求方式  </p>
 * <p>    data 请求数据  </p>
 * <p>    timeout 超时事件 default 60s  </p>
 * <p>    isLoading 是否需要出现加载样式  </p>
 * <p>    loadingText 加载文本  </p>
 * <p></p>
 * <p>}</p>
 */
export default function (context) {

    /** Post
     * @param option 参数<br/>
     * <p>option = { </p>
     * <p>    url 请求地址， </p>
     * <p>    method 请求方式  </p>
     * <p>    data 请求数据  </p>
     * <p>    timeout 超时事件 default 60s  </p>
     * <p>    isLoading 是否需要出现加载样式  </p>
     * <p>    loadingText 加载文本  </p>
     * <p></p>
     * <p>}</p>
     */
    context.prototype.sendPostRequest = function (option) {
        httpConnection(option);
    };
    /** get */
    context.prototype.sendGetRequest = function (option) {
        option.method="GET";
        httpConnection(option);
    };
    /** Delete */
    context.prototype.sendDeleteRequest = function (option) {
        option.method="DELETE";
        httpConnection(option);
    };
    /** put */
    context.prototype.sendPutRequest = function (option) {
        option.method="PUT";
        httpConnection(option);
    };
}
