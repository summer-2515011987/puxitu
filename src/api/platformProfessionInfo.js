import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/platformPositionRelation"; 

function getPositionInfo() {
    return request({
        url: BASEPATH+"/getAllPythonPositionData",
        method: 'get',
    })
}

function savePositionRelation(professionId,positionCodes) {
    return request({
        url: BASEPATH+"/savePositionRelation",
        method: 'post',
        data:{"professionId":professionId,"positionCodes":positionCodes}
    })
}

function getPositionRelation(professionId) {
    return request({
        url: BASEPATH+"/getPositionRelation/"+professionId,
        method: 'get',
    })
}

export default {
    getPositionInfo,
    savePositionRelation,
    getPositionRelation
}