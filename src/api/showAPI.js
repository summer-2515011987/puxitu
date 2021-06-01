import request from '@/utils/request'
const API_GETVISUALLIST = "/show/getProfessionRank";
const API_GETSCHOOLDATA = "/show/getSchoolData";
const API_GETNEWSDATA = "/show/getNewsData";
const API_GETPOSITIONINFODATA = "/show/getPositionInfoData";
const API_GETENTERPRISEDATA = "/show/getEnterpriseData";


let BASEPATH = "/asdc-datamanage"
export function getProfessionRank() {
    return request({
        url: BASEPATH + API_GETVISUALLIST,
        method: 'get',
        data: {}

    })
}

export function getSchoolData(params) {
    return request({
        url: BASEPATH + API_GETSCHOOLDATA,
        method: 'get',
        params: params
    })
}
export function getNewsData(params) {
    return request({
        url: BASEPATH + API_GETNEWSDATA,
        method: 'get',
        params: params
    })
}

export function getPositionInfoData(params) {
    return request({
        url: BASEPATH + API_GETPOSITIONINFODATA,
        method: 'get',
        params: params
    })
}

export function getEnterpriseData(params) {
    return request({
        url: BASEPATH + API_GETENTERPRISEDATA,
        method: 'get',
        params: params
    })
}

