import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/dataMain";

export function fetchList(params) {
    return request({
        url: BASEPATH + '/professionClearData/getList' ,
        method: 'get',
        params: params
    })
}

export function fetchAdminList(params) {
    return request({
        url: BASEPATH + '/adminProfessionClearData/getList' ,
        method: 'get',
        params: params
    })
}

export function fetchProfessionPositionList(params) {
    return request({
        url: BASEPATH + '/professionPosition/getList' ,
        method: 'get',
        params: params
    })
}

export function fetchGroups() {
    return request({
        url: BASEPATH + '/adminProfessionClearData/getSmallClassGroups' ,
        method: 'get'
    })
}



export default {
    fetchList,
    fetchProfessionPositionList,
    fetchAdminList,
    fetchGroups
}