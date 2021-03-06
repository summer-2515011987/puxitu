import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/profession/setup";


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

export function getDictList() {
    return request({
        url: BASETYPEPATH + '/search' ,
        method: 'get',
    })
}

export default {
    createData,
    updateData,
    fetchList,
    deleteInfo,
    batchDelete,
    getDictList
}