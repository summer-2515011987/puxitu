import request from '@/utils/request'
const BASEPATH="/asdc-dataclear/positionManager";

//-------------------任务相关-----------------------------------
// const GET_ALL_JOB_CLASS = "/getAllJobClass";  //
const GET_ALL_TASK = "/asdc-dataclear/marking/getAllTask";//获得标注管理主界面的专业列表

const GET_TASK_LIST = "/asdc-dataclear/marking/getTaskList"; //获取任务列表

const GET_TEMP_TASK_LIST = "/asdc-dataclear/marking/getMyTask"; //标注人员获取所有专业群对应的任务列表


const GET_LIST = "/asdc-dataclear/positionManager/list";   //新建任务界面，选择未分配的岗位列表
const GET_MARK_USER = "/asdc-dataclear/marking/getMarkingUser";//新建任务界面，获得标注人员列表

const SAVE_TASK = "/asdc-dataclear/marking/saveTask";

const DELETE_TASK = "/asdc-dataclear/marking/delete";

// ------------------标注相关----------------------------------
const FIND_INFO_BY_POSITIONID = "/asdc-dataclear/positionManager/findInfoByPositionId";//根据岗位id获取岗位信息
const FIND_INFO_BY_TASKID = "/asdc-dataclear/positionManager/findInfoByTaskId";//任务列表界面，点击详情，详情界面根据任务ID获取当前任务所有的岗位信息
const GET_DIM_LIST = "/asdc-dataclear/positionManager/getDimList";//岗位标注句子，右侧的三级维度数据
const NOT_ASSIGNED_JOB_LIST = "/asdc-dataclear/positionManager/list"; //根据岗位ID获取未分配的任务的岗位列表
const SAVE_POSITION_INFO = "/asdc-dataclear/positionManager/savePositionInfo";//保存标注数据

const ABANDON_POSITION_URL = "/asdc-dataclear/positionManager/abandonPosition";    //放弃岗位 put
const DELETE_POSITION_URL = "/asdc-dataclear/positionManager/deletePosition"   //删除岗位 delete
const TRANSFER_POSITION_URL = "/asdc-dataclear/positionManager/transferPosition"; //转移岗位 put

function abandonPosition(positionId) {
    return request({
        url: ABANDON_POSITION_URL ,
        method: 'post',
        data: {
            positionId: positionId
        }
    })
}
function deletePosition(positionId) {
    return request({
        url: DELETE_POSITION_URL ,
        method: 'delete',
        params: {
            positionId: positionId
        }
    })
}
function transferPosition(data) {
    return request({
        url: TRANSFER_POSITION_URL ,
        method: 'post',
        data: {
            positionId: data.positionId,
            smallClassGroup: data.smallClassGroup
        }
    })
}


function getAllMarkJobClass() {
    return request({
        url: GET_ALL_TASK, //AA + GET_ALL_JOB_CLASS,
        method: 'get',
    })
}
function getTaskList(data) {
    return request({
        url: GET_TASK_LIST,
        method: 'get',
        params: {
            name: data.name,
            user: data.user,
            status: data.status,
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            afterJobclassId: data.afterJobclassId,
            roles: data.roles
        }
    })
}
function getTempTaskList(data) {
    return request({
        url: GET_TEMP_TASK_LIST,
        method: 'get',
        params: {
            name: data.name,
            user: data.user,
            status: data.status,
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            afterJobclassId: data.afterJobclassId,
            roles: data.roles
        }
    })
}
function getJobListByClassId(data) {
    return request({
        url: GET_LIST,
        method: 'get',
        params: {
            positionTitle: data.positionTitle,
            smallClassGroup: data.smallClassGroup,
            pageIndex: data.pageIndex,
            pageSize: data.pageSize
        }
    })
}
function getMarkingUser(data) {
    return request({
        url: GET_MARK_USER,
        method: 'get',
        params: {
            name: data.name,
            pageSize: data.pageSize,
            pageNum: data.pageNum
        }
    })
}
function saveTask(data) {
    return request({
        url: SAVE_TASK ,
        method: 'post',
        data: data
    })
}
function deleteTask(data) {
    return request({
        url: DELETE_TASK ,
        method: 'delete',
        data: data
    })
}
function findInfoByPositionId(id) {
    return request({
        url: FIND_INFO_BY_POSITIONID+ '/' + id,
        method: 'get',
    })
}
function findInfoByTaskId(data) {
    return request({
        url: FIND_INFO_BY_TASKID + '/' + data.taskId,
        method: 'get',
        params: {
            taskId: data.taskId,
            name: data.name,
            status: data.status,
            pageSize: data.pageSize,
            pageIndex: data.pageNum
        }
    })
}
function getDimList() {
    return request({
        url: GET_DIM_LIST,
        method: 'get',
    })
}
function getNotAssignedJobList(data) {
    return request({
        url: NOT_ASSIGNED_JOB_LIST,
        method: 'get',
        params: {
            name: data.name,
            pageSize: data.pageSize,
            pageNum: data.pageNum
        }
    })
}
function savePositionInfo(data) {
    return request({
        url: SAVE_POSITION_INFO ,
        method: 'post',
        data: data
    })
}
var service = {
    getAllMarkJobClass,
    getJobListByClassId,
    getMarkingUser,
    saveTask,
    getTaskList,
    getTempTaskList,
    deleteTask,
    findInfoByPositionId,
    findInfoByTaskId,
    getDimList,
    getNotAssignedJobList,
    savePositionInfo,
    abandonPosition,
    deletePosition,
    transferPosition
}
export default service;