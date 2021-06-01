import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/dataClear/rule";

export function createData(data) {
    return request({
        url: BASEPATH + '/create',
        method: 'post',
        data: data
    })
}

export function updateData(data) {
    return request({
        url: BASEPATH + '/update',
        method: 'post',
        data: data
    })
}


export function fetchList(params) {
    return request({
        url: BASEPATH + '/getList' ,
        method: 'get',
        params: params
    })
}

export function deleteTableColumn(id) {
    return request({
        url: BASEPATH + '/delete/' + id,
        method: 'post',
    })
}

export function getRuleFieldList() {
    return request({
        url: BASEPATH + '/getRuleFieldList',
        method: 'get'
    })
}

export default {
    createData,
    updateData,
    fetchList,
    deleteTableColumn,
    getRuleFieldList
}