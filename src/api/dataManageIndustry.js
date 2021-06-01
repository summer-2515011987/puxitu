import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/industry";
const API_INDUSTRY_TREE_INFO = "/getAllIndustryData";


function getIndustryInfo() {
    return request({
        url: BASEPATH+API_INDUSTRY_TREE_INFO,
        method: 'get',
    })
}

function deleteIndustryInfo(nodeId) {
    return request({
        url: BASEPATH + '/delete/' + nodeId,
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

export default {
    getIndustryInfo,
    deleteIndustryInfo,
    createData,
    updateData,
    getData
}