import request from '@/utils/request'
const API_POSTNEED = "/asdc-datamanage/bigDataIndustry/getPostNeed";
const API_POSTNEED_CHANGE = "/asdc-datamanage/bigDataIndustry/getPostNeedChange";
const API_NATION_MAP = "/asdc-datamanage/bigDataIndustry/getNationMap";
const API_ENTERPRISE_TYPE = "/asdc-datamanage/bigDataIndustry/getEnterpriseType";
const API_PROVINCE_MAP = "/asdc-datamanage/bigDataIndustry/getProvinceMap";
const API_SALARY_LEVEL = "/asdc-datamanage/bigDataIndustry/getSalaryLevel";
const API_WORK_EXPERINCE = "/asdc-datamanage/bigDataIndustry/getWorkExperince";
const API_XUELI = "/asdc-datamanage/bigDataIndustry/getXueLi";
const API_AREA_SALARY = "/asdc-datamanage/bigDataIndustryArea/getAreaSalary";
const API_AREA_WORKEXPERIENCE = "/asdc-datamanage/bigDataIndustryArea/getAreaWorkExperience";
const API_AREA_EDUCATION = "/asdc-datamanage/bigDataIndustryArea/getAreaEducation";
const API_AREA_POST_NEED = "/asdc-datamanage/bigDataIndustryArea/getAreaPostNeed";
const API_PROFESSION_INFO = "/asdc-datamanage/bigDataIndustry/getProfessionInfo";
const API_INDUSTRY = "/asdc-datamanage/bigDataIndustry/getIndustry";
const API_INDUSTRY_AREA = "/asdc-datamanage/bigDataIndustryArea/getIndustryArea";
const API_SKILL = "/asdc-datamanage/bigDataIndustry/getSkill";
const API_SKILL_AREA = "/asdc-datamanage/bigDataIndustryArea/getSkillArea";
const API_ABILITY = "/asdc-datamanage/bigDataIndustry/getAbility";
const API_ABILITY_AREA = "/asdc-datamanage/bigDataIndustryArea/getAbilityArea";
const API_SOCIETY_ABILITY = "/asdc-datamanage/bigDataIndustry/getSocietyAbility";
const API_MANUPLUTION_ABILITY = "/asdc-datamanage/bigDataIndustry/getManuplutionAbility";
const API_DEVELOP_ABILITY = "/asdc-datamanage/bigDataIndustry/getDevelopAbility";
const API_JOBCLASS_PROFESSION = "/asdc-datamanage/bigDataIndustry/getJobClassProfession";
const API_PROFESSION_VISUAL_SHOW = "/asdc-datamanage/bigDataIndustry/getProfessionVisualShow";

//获取专业可视化图表功能点是否显示
 function getProfessionVisualShow(professionId,visualName) {
    return request({
        url: API_PROFESSION_VISUAL_SHOW,
        method: 'get',
        params: {professionId:professionId,visualName:visualName},
    })
}  

function getPostNeed(professionCode) {
    return request({
        url: API_POSTNEED,
        method: 'get',
        params: {professionCode:professionCode}
    })
}
function getIndustry(professionCode) {
    return request({
        url: API_INDUSTRY,
        method: 'get',
        params: {professionCode:professionCode}
    })
}
function getIndustryArea(professionCode) {
    return request({
        url: API_INDUSTRY_AREA,
        method: 'get',
        params: {professionCode:professionCode}
    })
}
function getSkill(professionCode) {
    return request({
        url: API_SKILL,
        method: 'get',
        params: {professionCode:professionCode}
    })
}
function getSkillArea(professionCode) {
    return request({
        url: API_SKILL_AREA,
        method: 'get',
        params: {professionCode:professionCode}
    })
}
function getAbility(professionCode) {
    return request({
        url: API_ABILITY,
        method: 'get',
        params: {professionCode:professionCode}
    })
}
function getAbilityArea(professionCode) {
    return request({
        url: API_ABILITY_AREA,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getPostNeedChange(professionCode,flag) {
    return request({
        url: API_POSTNEED_CHANGE,
        method: 'get',
        params: {professionCode:professionCode,flag:flag}
    })
}

function getNationMap(professionCode) {
    return request({
        url: API_NATION_MAP,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getEnterpriseType(professionCode) {
    return request({
        url: API_ENTERPRISE_TYPE,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getProvinceMap(professionCode) {
    return request({
        url: API_PROVINCE_MAP,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getSalaryLevel(professionCode) {
    return request({
        url: API_SALARY_LEVEL,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getWorkExperince(professionCode) {
    return request({
        url: API_WORK_EXPERINCE,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getXueLi(professionCode) {
    return request({
        url: API_XUELI,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getAreaSalary(professionCode) {
    return request({
        url: API_AREA_SALARY,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getAreaWorkExperience(professionCode) {
    return request({
        url: API_AREA_WORKEXPERIENCE,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getAreaEducation(professionCode) {
    return request({
        url: API_AREA_EDUCATION,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getAreaPostNeed(professionCode,flag) {
    return request({
        url: API_AREA_POST_NEED,
        method: 'get',
        params: {professionCode:professionCode,flag:flag}
    })
}

function getProfessionInfo(professionCode) {
    return request({
        url: API_PROFESSION_INFO,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getSocietyAbility(professionCode) {
    return request({
        url: API_SOCIETY_ABILITY,
        method: 'get',
        params: {professionCode:professionCode}
    })
}
function getManuplutionAbility(professionCode) {
    return request({
        url: API_MANUPLUTION_ABILITY,
        method: 'get',
        params: {professionCode:professionCode}
    })
}
function getDevelopAbility(professionCode) {
    return request({
        url: API_DEVELOP_ABILITY,
        method: 'get',
        params: {professionCode:professionCode}
    })
}

function getJobClassProfession() {
    return request({
        url: API_JOBCLASS_PROFESSION,
        method: 'get',
    })
}

export default {
    getPostNeed,
    getPostNeedChange,
    getNationMap,
    getEnterpriseType,
    getProvinceMap,
    getSalaryLevel,
    getWorkExperince,
    getXueLi,
    getAreaSalary,
    getAreaWorkExperience,
    getAreaEducation,
    getAreaPostNeed,
    getProfessionInfo,
    getIndustry,
    getIndustryArea,
    getSkill,
    getSkillArea,
    getAbility,
    getAbilityArea,
    getSocietyAbility,
    getManuplutionAbility,
    getDevelopAbility,
    getJobClassProfession,
    getProfessionVisualShow
}