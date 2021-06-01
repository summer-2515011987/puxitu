import request from '@/utils/request'
const BASEPATH="/asdc-dataclear/keywordsManager";
const GET_ALL_JOB_CLASS = "/getAllJobClass";  //获得专业列表
const GET_SECOND_JOB_CLASS = "/getSecondJobClass"; //获取筛选分词列表
const SAVE_KEYWORD = "/saveKeywords"; //保存专家分词
const GET_ALL_EXPERTJOB_CLASS= "/getAllExpertJobClass";
const GET_STANDARD = "/getStandard";


function getAllJobClass() {
    return request({
        url: BASEPATH + GET_ALL_JOB_CLASS,
        method: 'get',
    })
}
function getStandard(){
    return request({
        url: BASEPATH + GET_STANDARD,
        method: 'get',
    })
}

function getSecondJobClass(data) {
    return request({
        url: BASEPATH + GET_SECOND_JOB_CLASS,
        method: 'get',
        params: {
            id: data.id,
            type: data.type
        }
    })
}
function saveKeywords(data) {
    return request({
        url: BASEPATH + SAVE_KEYWORD ,
        method: 'post',
        data: data
    })
}
function getAllExpertJobClass(data) {
    return request({
        url: BASEPATH + GET_ALL_EXPERTJOB_CLASS,
        method: 'post',
        data: data
    })
}
var service = {
    getAllJobClass,
    saveKeywords,
    getStandard,
    getSecondJobClass,
    getAllExpertJobClass
}

export default service;