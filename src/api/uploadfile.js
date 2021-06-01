import request from '@/utils/request'
import {batchDelete, createData, deleteInfo, fetchList, getDictList, updateData} from "./profession/professionSetUpMgt";
const BASEPATH="/asdc-datamanage"

/**
 * 导入excel
 */
export function importExcel(file, dataTableId) {
    const url = BASEPATH + '/excelApi/importExcel'
    const form = new FormData();
    // 文件对象
    form.append("file", file);
    // 导入的数据文件类型
    form.append("dataTableId", dataTableId);
    return request.post(url, form, {
        headers: {"content-type": "multipart/form-data"}
    })
}

export default {
    importExcel
}