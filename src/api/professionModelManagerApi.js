import request from '@/utils/request'
const BASEPATH = "/asdc-dataclear"
const API_CREATE = BASEPATH + "/professionModelManager/create";
const GET_SOURCEDATA = BASEPATH + "/professionModelManager/getSourceData";
const LOAD_MODEL_DATA = BASEPATH + "/professionModelManager/loadModelData";
const PUT_PROFESSION_MODEL_DATA = BASEPATH + "/professionModelManager/putProfessionModelData";
const FETCH_LIST = BASEPATH + "/professionModelManager/list";

const GET_AFTER_JOB_CLASS = BASEPATH + "/professionModelManager/getAfterJobClass";
const LOAD_STEP2_DATA = BASEPATH + "/professionModelManager/loadStep2Data";
const LOAD_LDAVIS_DATA = BASEPATH + "/professionModelManager/loadLdavisData";
const LOAD_VERTICAL_CLASSIFICATION_DATA = BASEPATH + "/professionModelManager/loadVerticalClassificationData";
const LOAD_HORIZONTAL_CATEGORIES_DATA = BASEPATH + "/professionModelManager/loadHorizontalCategoriesData";
const UPDATE_HORIZONTAL_CATEGORIES_DATA = BASEPATH + "/professionModelManager/updateHorizontalCategoriesData";
const LOAD_GRADED_POSITIONS_DATA = BASEPATH + "/professionModelManager/loadGradedPositionsData";
const LOAD_TYPICAL_JOB_DEMAND_DTO = BASEPATH + "/professionModelManager/loadTypicalJobDemandDto";
const LoAd_loadScatterPlotData = BASEPATH+"/professionModelManager/loadScatterPlotData";
const LOAD_PROFESSIONAL_ONET_INFO_DATA = BASEPATH + "/professionModelManager/loadProfessionalOnetInfoData";

const UPDATE_PROFESS_IONALONET_INFO_DATA = BASEPATH + "/professionModelManager/putProfessionalOnetInfoData";

const UPDATE_loadProfessionalOnetInfoDataDtoBySmallClass = BASEPATH + "/professionModelManager/loadProfessionalOnetInfoDataDtoBySmallClass";

const DELETE_MODEL = BASEPATH + "/professionModelManager/delete";

const CHANGE_DISPLAY = BASEPATH + "/professionModelManager/changeDisplay";

const GET_MODEL_TEMPLATE = BASEPATH + "/professionModelManager/getTemplate";//一键构建获取模板数据

const AUTO_CREATE = BASEPATH + "/professionModelManager/autoCreate"; //自动构建

const GET_PREVIEW_DATAS = BASEPATH + "/positionManager/getPreview"; //预览数据

/**
 * 创建一个
 * @param professionId 专业ID
 * @param name  名称
 * @param progress  进度
 * @param setp1Data 第一步内容
 * @return {AxiosPromise}
 */
export function createProfessionModelManager(professionId, name, progress,setp1Data) {
    return request({
        url: API_CREATE,
        method: 'POST',
        data: {
            professionId:professionId,
            name:name,
            progress:progress,
            setp1Data:setp1Data
        }
    })
}

/**
 * 获取第一步需要数据
 */
export function getStep1DataSource(){
    return request({
        url: GET_SOURCEDATA,
        method: 'get',
        params: null
    })
}

/**
 * 获取模型数据
 * @param id
 */
export function loadData(id){
    return request({
        url: LOAD_MODEL_DATA,
        method: 'get',
        params:{
            "id": id
        }
    })
}

/**
 * 查询所有
 * @param params
 * @return {AxiosPromise}
 */
export function fetchList(params) {
    return request({
        url: FETCH_LIST,
        method: 'get',
        params: params
    })
}
// 获得级联专业列表数据
export function getAfterJobClass() {
    return request({
        url: GET_AFTER_JOB_CLASS,
        method: 'get',
    })
}

/**
 * 更新第一步数据
 * @param id
 * @param stepData1
 * @param progress
 */
export function updateStep1Data(id , stepData1, progress){
    return request({
        url: PUT_PROFESSION_MODEL_DATA,
        method: 'put',
        data:{
            "id": id,
            "stepData1": JSON.stringify(stepData1),
            "progress": progress
        }
    })
}

export function updateProgress(id , progress){
    return request({
        url: PUT_PROFESSION_MODEL_DATA,
        method: 'put',
        data:{
            "id": id,
            "progress": progress
        }
    })
}

/**
 * 更新第二步数据
 * @param id
 * @param stepData2
 * @param progress
 * @returns {AxiosPromise}
 */
export function updateStep2Data(id , stepData2, progress){
    return request({
        url: PUT_PROFESSION_MODEL_DATA,
        method: 'put',
        data:{
            "id": id,
            "stepData2": JSON.stringify(stepData2),
            "stepData3":'',
            "progress": progress
        }
    })
}

/**
 * 更新第四步数据
 * @param id
 * @param stepData2
 * @param progress
 * @returns {AxiosPromise}
 */
export function updateStep4Data(id , stepData4, progress){
    return request({
        url: PUT_PROFESSION_MODEL_DATA,
        method: 'put',
        data:{
            "id": id,
            "stepData4": JSON.stringify(stepData4),
            "progress": progress
        }
    })
}

/**
 * 更新流程图数据
 * @param id
 * @param processModelData
 * @return {AxiosPromise}
 */
export function updateProcessModelData(id, processModelData){
    return request({
        url: PUT_PROFESSION_MODEL_DATA,
        method: 'put',
        data:{
            "id": id,
            "processModelData": JSON.stringify(processModelData)
        }
    })
}

/**
 * 获取第二部数据
 * @param id 模型ID
 */
export function loadStep2Data(id){
    return request({
        url: LOAD_STEP2_DATA,
        method: 'get',
        params: {"id": id}
    })
}

/**
 * 获取横向分类趋势图数据
 * @param id
 */
export function loadLdavisData(id){
    return request({
        url: LOAD_LDAVIS_DATA,
        method: 'get',
        params: {"id": id}
    });
}

/**
 * 获取纵向分级数据
 * @param id
 * @param verticalClassifications
 */
export function loadVerticalClassificationData(id, verticalClassifications){
    return request({
        url: LOAD_VERTICAL_CLASSIFICATION_DATA,
        method: 'get',
        params: {
            "id": id,
            "verticalClassifications": verticalClassifications
        }
    })
}

/**
 * 获取职业横向分类数据
 * @param id
 */
export function loadHorizontalCategoriesData(id){
    return request({
        url: LOAD_HORIZONTAL_CATEGORIES_DATA,
        method: 'get',
        params: {
            "id": id
        }
    })
}

/**
 * 修改职业横向分类数据
 * @param id
 * @param topicNo
 * @param name
 * @returns {AxiosPromise}
 */
export function updateHorizontalCategoriesData(id, topicNo, name){
    return request({
        url: UPDATE_HORIZONTAL_CATEGORIES_DATA + "/" + id,
        method: 'put',
        data: {
            "topicNo":topicNo,
            "name":name
        }
    })
}
export function updatePutProfessionalOnetInfoData(id, stepData5Dto){
    return request({
        url: UPDATE_PROFESS_IONALONET_INFO_DATA + "/" + id,
        method: 'put',
        data: {
            "verticalClassificationMap":stepData5Dto
        }
    })
}


/**
 * 获取分级岗位数据
 * @param id
 */
export function loadGradedPositionsData(id){
    return request({
        url: LOAD_GRADED_POSITIONS_DATA,
        method: 'get',
        params: {
            "id": id
        }
    })
}

/**
 * 获取谱系图岗位信息
 * @param id
 * @returns {AxiosPromise}
 */
export function loadTypicalJobDemandDto(id){
    return request({
        url: LOAD_TYPICAL_JOB_DEMAND_DTO,
        method: 'get',
        params: {
            "id": id
        }
    })
}
/**
 * 获取职业横向分类数据
 * @param id
 */
export function loadScatterPlotData(id){
    return request({
        url: LoAd_loadScatterPlotData,
        method: 'get',
        params: {
            "id": id
        }
    })
}

/**
 *
 * @param id
 * @param verticalClassification
 * @param horizontalClassification
 * @returns {AxiosPromise}
 */
export function loadProfessionalOnetInfoData(id, verticalClassification, horizontalClassification){

    return request({
        url: LOAD_PROFESSIONAL_ONET_INFO_DATA,
        method: 'get',
        params: {
            "id": id,
            "verticalClassification": verticalClassification,
            "horizontalClassification":horizontalClassification
        }
    })
}

export function loadProfessionalOnetInfoDataDtoBySmallClass(id, verticalClassification, horizontalClassification){
    return request({
        url: UPDATE_loadProfessionalOnetInfoDataDtoBySmallClass,
        method: 'get',
        params: {
            "id": id,
            "verticalClassification": verticalClassification,
            "horizontalClassification":horizontalClassification
        }
    })
}

/**
 * 删除模型
 */
export function deleteModel(id){
    return request({
        url: DELETE_MODEL + "/" + id,
        method: 'delete'
    })
}

/**
 * 更改是否展示最新数据
 */
export function changeDisplay(id){
    return request({
        url: CHANGE_DISPLAY ,
        method: 'get',
        params: {
            "id":id
        }
    })
}
export function getModelTemplateDatas(id){
    return request({
        url: GET_MODEL_TEMPLATE ,
        method: 'get',
    })
}
// AUTO_CREATE
export function autoCreate(professionId, name){
    return request({
        url: AUTO_CREATE ,
        method: 'post',
        data: {
            professionId:professionId,
            name:name,
            // progress:progress,
            // setp1Data:setp1Data
        }
        // data: {
        //     "verticalClassificationMap":stepData5Dto
        // }
    })
}

export function  getPreviewDatas(data){
    return request({
        url: GET_PREVIEW_DATAS ,
        method: 'get',
        params: {
            smallClassGroup: data.smallClassGroup,
            start: data.start,
            city: data.city,
            end: data.end,
            area: data.area,
            pageNum: data.pageNum,
            pageSize: data.pageSize
        }
    })
}

