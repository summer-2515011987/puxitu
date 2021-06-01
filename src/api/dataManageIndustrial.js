import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/industrial";


function getIndustrialInfo() {
    return request({
        url: BASEPATH+'/getIndustrialTree',
        method: 'get',
    })
}

function deleteIndustrialInfo(nodeId) {
    return request({
        url: BASEPATH + '/delete/' + nodeId,
        method: 'post'
    })
}

export function createData(data) {
    return request({
        url: BASEPATH + '/insertSelected',
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

export function getListData(id, params) {
    return request({
        url: BASEPATH + '/searchIndustrialContent/list/'+id ,
        method: 'get',
        params: params
    })
}

export function getData(id) {
    return request({
        url: BASEPATH + '/searchIndustrialContent/'+id ,
        method: 'get',
    })
}

export function getNodeData(id) {
    return request({
        url: BASEPATH + '/searchIndustrial/'+id ,
        method: 'get',
    })
}
export function createContentData(data) {
    return request({
        url: BASEPATH + '/insertContentSelected',
        method: 'post',
        data: data
    })
}

export function updateContentData(id, data) {
    return request({
        url: BASEPATH + '/updateContent/' + id,
        method: 'post',
        data: data
    })
}

export function getIndustrialContent(id) {
    return request({
        url: BASEPATH + '/getIndustrialContent/parentId' ,
        method: 'get',
        params: {parentId:id}
    })
}


export function createContentDatas(id,data) {
    return request({
        url: BASEPATH + '/addContent/parent/'+id,
        method: 'post',
        data: data
    })
}
export default {
    getIndustrialInfo,
    deleteIndustrialInfo,
    createData,
    updateData,
    getData,
    getListData,
    createContentData,
    updateContentData,
    getNodeData,
    getIndustrialContent,
    createContentDatas
}