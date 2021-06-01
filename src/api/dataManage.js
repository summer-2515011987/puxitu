import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/profession";
const API_PROFESSION_TREE_INFO = "/getAllProfessionData";
const API_PROFESSION_DELETE = "/delete/";


export function getProfessionInfo() {
    return request({
        url: BASEPATH+API_PROFESSION_TREE_INFO,
        method: 'get',
    })
}

export function deleteProfessionInfo(nodeId) {
    return request({
        url: BASEPATH + API_PROFESSION_DELETE + nodeId,
        method: 'post'
    })
}

export function createData(data) {
    return request({
        url: BASEPATH + '/create',
        method: 'post',
        data: data
    })
}

export function updateData(id, data) {
    return request({
        url: BASEPATH + '/update/' + id,
        method: 'post',
        data: data
    })
}

export function getData(id) {
    return request({
        url: BASEPATH + '/' + id,
        method: 'get',
    })
}

export function fetchList(id, params) {
    if (id==''){
        return request({
            url: BASEPATH + '/getListWithOutId' ,
            method: 'get',
            params: params
        })
    }else {
        return request({
            url: BASEPATH + '/list/' + id,
            method: 'get',
            params: params
        })
    }

}

export function updatePostName(data) {
    return request({
        url:  '/asdc-datamanage/bigDataIndustry/changePostNeed' ,
        method: 'get',
        params: data
    })
}

export default {
    getProfessionInfo,
    deleteProfessionInfo,
    createData,
    updateData,
    getData,
    fetchList,
    updatePostName
}