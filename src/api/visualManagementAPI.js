import request from '@/utils/request'
const API_GETVISUALLIST = "/visual_management/getVisualList";
const API_GETVISUALLISTBYPROFESSIONID = "/visual_management/getVisualListByProfessionId";
const API_UPDATEPROFESSIONID = "/visual_management/updateProfessionVisual";
let BASEPATH = "/asdc-datamanage"
export function getVisualList(name) {
    return request({
        url: BASEPATH + API_GETVISUALLIST,
        method: 'get',
        params: name

    })
}

export function getVisualListByProfessionId(professionId) {
    return request({
        url: BASEPATH + API_GETVISUALLISTBYPROFESSIONID,
        method: 'get',
        params: {
            professionId:professionId
        }

    })
}
export function updateProfessionVisual(professionId,visualId,enable) {
    return request({
        url: BASEPATH + API_UPDATEPROFESSIONID,
        method: 'get',
        params: {
            professionId:parseInt(professionId),
            visualId:parseInt(visualId),
            enable:parseInt(enable)
        }

    })
}
