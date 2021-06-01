const API_LOGSYSTEM = "/log/getList";
// 获取table列表数据
export function logGetList(vueCtx, option) {
    vueCtx.sendPostRequest({
        url : API_LOGSYSTEM,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}

export default {
    logGetList
}