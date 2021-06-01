const API_ROLE_LISTALL = "/asdc-admin/role/list";
// 获取table列表数据
export function roleGetAll(vueCtx, data, back) {
    vueCtx.sendGetRequest({
        url : API_ROLE_LISTALL,
        data: data || {},
        procgress: true,
        back: back
    });
}

export default {
    roleGetAll
}