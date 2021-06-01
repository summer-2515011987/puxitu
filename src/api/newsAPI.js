import request from '@/utils/request'
const API_DELETENEWSDATA = "/news/delete/";
let BASEPATH = "/asdc-datamanage"

export function deleteNews(id) {
    return request({
        url: BASEPATH + API_DELETENEWSDATA+id,
        method: 'get',
        params: null
    })
}


