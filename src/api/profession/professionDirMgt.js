import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/profession/dir";


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
        url: BASEPATH + '/getProfessionDirList' ,
        method: 'get',
        params: params
    })
}

export function deleteProfessionDir(id) {
    return request({
        url: BASEPATH + '/delete/' + id,
        method: 'post'
    })
}

export function batchDeleteProfessionDir(ids) {
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
    deleteProfessionDir,
    batchDeleteProfessionDir,
    getDictList
}