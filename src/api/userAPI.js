const API_USERSYSTEM = "/userManager/getList";
const API_SET_EDIT = "/userManager";
const API_SET_ADD = "/userManager";

// 获取table列表数据
export function userGetList(vueCtx, option) {
    vueCtx.sendPostRequest({
        url : API_USERSYSTEM,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}

// 编辑table列表数据
export function userEditData(vueCtx,option) {
    vueCtx.sendPutRequest({
        url : API_SET_EDIT,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}

// 新增table列表数据
export function userAddData(vueCtx, option) {
    vueCtx.sendPostRequest({
        url : API_SET_ADD,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}

// 删除table列表数据
export function userDeleteData(vueCtx, option) {
    vueCtx.sendDeleteRequest({
        url : option.url,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}

export default {
    userGetList,
    userEditData,
    userAddData,
    userDeleteData
}