import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/knowledgeDataMain/professionIndustryJobRelation"; 

function getAllItems() {
    return request({
        url: BASEPATH+"/getAllItems",
        method: 'get',
    })
}

function getProfessionRelation(professionCode,professionName){
    return request({
        url: BASEPATH+"/getRealtionByProfesssionCode?professionCode="+professionCode+"&professionName="+professionName,
        method: 'get',
    })
}

function saveRelation(currentSelectProfessionCode,industryCodes,jobCodes,certificateIds){
    return request({
        url: BASEPATH+"/saveRelation",
        method: 'post',
        params: {"currentSelectProfessionCode":currentSelectProfessionCode,"industryCodes":industryCodes,"jobCodes":jobCodes,"certificateIds":certificateIds}
    })
}

function deleteRelation(id){
    return request({
        url: BASEPATH+"/deleteRelation",
        method: 'post',
        params: {"id":id}
    })
}

function updateRelation(id,currentSelectProfessionCode,industryCodes,jobCodes,certificateIds){
    return request({
        url: BASEPATH+"/updateRelation",
        method: 'post',
        params: {"id":id,"currentSelectProfessionCode":currentSelectProfessionCode,
        "industryCodes":industryCodes,"jobCodes":jobCodes,"certificateIds":certificateIds}
    })
}

export default {
    getAllItems,
    getProfessionRelation,
    saveRelation,
    deleteRelation,
    updateRelation
}