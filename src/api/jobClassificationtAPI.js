import request from '@/utils/request'
const API_GETJOBCLASSIFICATIONTREE = "/job_classification/getJobClassificationtTree";
const API_GETJOBCLASSIFICATIONBYID = "/job_classification/";
const API_CREASTE = "/job_classification/create";
const API_UPDATE = "/job_classification/update/";
const API_DELETE = "/job_classification/delete/";
const API_EXPORT = "/job_classification/exportJobClassificationtAll";
let BASEPATH = "/asdc-datamanage"

const API_GETJOBCLASSIFICATIONTREEBYPARENTID = BASEPATH + "/job_classification/getJobClassificationTreeByParentId";


export function getJobClassificationtTree(params) {
    return request({
        url: BASEPATH + API_GETJOBCLASSIFICATIONTREE,
        method: 'get',
        params: params

    })
}

/**
 * 根据父级id查询职业大典(根据父级查询当前父级下的子集)
 * @param parentId 父级id（顶级父类id为0）
 * @return {*}
 */
export function getJobClassificationTreeByParentId(parentId){

    return request({
       url: API_GETJOBCLASSIFICATIONTREEBYPARENTID,
        method: 'get',
        params:{
           "parentId": parentId
        }

    });

}

export function getJobClassificationById(params) {
    return request({
        url: BASEPATH + API_GETJOBCLASSIFICATIONBYID+params,
        method: 'get',
        params: {}

    })
}

export function exportData(id) {
    request({
        url: BASEPATH + API_EXPORT,
        method: 'get',
        params: {
            parentId:id
        }

    })
}
export function update(id,params) {
    return request({
        url: BASEPATH + API_UPDATE+id,
        method: 'post',
        data: params

    })
}


export function create(params) {
    return request({
        url: BASEPATH + API_CREASTE,
        method: 'post',
        data: params
    })
}
export function remove(id) {
    return request({
        url: BASEPATH + API_DELETE+id,
        method: 'get',
        params: {}
    })
}

export default {
    getJobClassificationtTree
}

