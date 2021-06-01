import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/profession/group";


export function createData(data) {
    return request({
        url: BASEPATH + '/create',
        method: 'post',
        data: data
    })
}

export function updateData(data) {
    return request({
        url: BASEPATH + '/update' ,
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

export function deleteInfo(id) {
    return request({
        url: BASEPATH + '/delete/' + id,
        method: 'post'
    })
}

export function batchDelete(ids) {
    return request({
        url: BASEPATH + '/batchDelete',
        method: 'post',
        data:{"ids":ids}
    })
}

export function getItem(code) {
    return request({
        url: BASEPATH + '/getItem?code='+code,
        method: 'get'
    })
}


export default {
    createData,
    updateData,
    fetchList,
    deleteInfo,
    batchDelete,
    getItem
}