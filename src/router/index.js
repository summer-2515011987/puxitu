import Vue from 'vue'
import Router from 'vue-router'
import {routersConfig} from '@/router/config'
Vue.use(Router);

//最全后台setSys菜单
export const asyncRouterMap = [
    {
        path:'/sysadmin',
        component: () => import('@/pages/sysSettingMgnt/setMain'),
        redirect: '/sysadmin/admin',
        name: 'sysadmin',
        meta: {title: '系统管理', icon: 'ums',isLeaf: false},
        children: [{
            path: 'admin',
            name: 'admin',
            component: () => import("@/pages/sysSettingMgnt/admin/index"),
            meta: {title: '用户列表', icon: 'ums-admin',isLeaf: true}
        },{
            path: 'role',
                name: 'role',
            component: () => import("@/pages/sysSettingMgnt/role/index"),
            meta: {title: '角色列表', icon: 'ums-role',isLeaf: true}
        },{
            path: 'allocMenu',
                name: 'allocMenu',
            component: () => import('@/pages/sysSettingMgnt/role/allocMenu'),
            meta: {title: '分配菜单',isLeaf: true},
            hidden: true
        },{
            path: 'allocResource',
                name: 'allocResource',
            component: () => import('@/pages/sysSettingMgnt/role/allocResource'),
            meta: {title: '分配资源',isLeaf: true},
            hidden: true
        },{
            path: 'menu',
            name: 'menu',
            component: () => import('@/pages/sysSettingMgnt/menu/index'),
            meta: {title: '菜单列表', icon: 'ums-menu',isLeaf: true}
        },{
            path: 'addMenu',
            name: 'addMenu',
            component: () => import('@/pages/sysSettingMgnt/menu/add'),
            meta: {title: '添加菜单',isLeaf: true},
            hidden: true
        },{
            path: 'updateMenu',
            name: 'updateMenu',
            component: () => import('@/pages/sysSettingMgnt/menu/update'),
            meta: {title: '修改菜单',isLeaf: true},
            hidden: true
        },{
            path: 'resource',
            name: 'resource',
            component: () => import('@/pages/sysSettingMgnt/resource/index'),
            meta: {title: '资源列表', icon: 'ums-resource',isLeaf: true}
        },{
            path: 'resourceCategory',
            name: 'resourceCategory',
            component: () => import('@/pages/sysSettingMgnt/resource/categoryList'),
            meta: {title: '资源分类',isLeaf: true},
            hidden: true
        },{
            path: 'oauthClient',
            name: 'oauthClient',
            component: () => import('@/pages/sysSettingMgnt/oauthClient/index'),
            meta: {title: '授权服务器配置列表',isLeaf: true}
        },{
            path: 'addOauthClientDetail',
            name: 'addOauthClientDetail',
            component: () => import('@/pages/sysSettingMgnt/oauthClient/add'),
            meta: {title: '新增授权服务器配置',isLeaf: true},
            hidden: true
        },{
            path: 'dict',
            name: 'dict',
            component: () => import('@/pages/sysSettingMgnt/dict/index'),
            meta: {title: '数据字典',isLeaf: true},
            // hidden: true
        },{
            path: 'updateOauthClientDetail',
            name: 'updateOauthClientDetail',
            component: () => import('@/pages/sysSettingMgnt/oauthClient/update'),
            meta: {title: '修改授权服务器配置',isLeaf: true},
            hidden: true
        },{
            path: 'resourceTypeOauthClient',
            name: 'resourceTypeOauthClient',
            component: () => import('@/pages/sysSettingMgnt/oauthClient/resourceTypeOauthClient'),
            meta: {title: '修改授权服务器与资源分类关系',isLeaf: true},
            hidden: true
        },{
            path: 'wordMgnt',
            name: 'wordMgnt',
            component: () => import('@/pages/sysSettingMgnt/wordMgnt/specialWordMgnt/index'),
            meta: {title: '分词管理',isLeaf: true},
        },{
            path: 'preview',
            name: 'preview',
            component: () => import('@/pages/sysSettingMgnt/wordMgnt/specialWordMgnt/preview'),
            meta: {title: '预览图谱',isLeaf: true},
            hidden:true
        },{
            path: 'majordetail',
            name: 'majordetail',
            component: () => import('@/pages/sysSettingMgnt/wordMgnt/specialWordMgnt/majordetail'),
            meta: {title: '专业详情',isLeaf: true},
            hidden:true
        },{
            path: 'screenWord',
            name: 'screenWord',
            component: () => import('@/pages/sysSettingMgnt/wordMgnt/specialWordMgnt/ScreenWordA'),
            meta: {title: '筛选分词A',isLeaf: true},
            hidden:true
        },{
            path: 'screenWordb',
            name: 'screenWordb',
            component: () => import('@/pages/sysSettingMgnt/wordMgnt/specialWordMgnt/ScreenWordB'),
            meta: {title: '筛选分词B',isLeaf: true},
            hidden:true
        },{
            path: 'checkSpecialWord',
            name: 'checkSpecialWord',
            component: () => import('@/pages/sysSettingMgnt/wordMgnt/adminWordMgnt/checkSpecialWord'),
            meta: {title: '查看专家分词结果',isLeaf: true},
            hidden:true
        }, {
            path: 'RelatedWord',
            name: 'RelatedWord',
            component: () => import('@/pages/sysSettingMgnt/wordMgnt/specialWordMgnt/RelatedWords'),
            meta: {title: '筛选关联词',isLeaf: true},
            hidden:true
        },{
            path: 'ExpertSelection',
            name: 'ExpertSelection',
            component: () => import('@/pages/sysSettingMgnt/wordMgnt/specialWordMgnt/ExpertSelection'),
            meta: {title: '专家标注结果',isLeaf: true},
            hidden:true
        }]
    },
    {
        path:'/markMain',
        component: () => import('@/pages/sysMark/markMain'),
        // redirect: '/markMain/markMgnt',
        redirect: to => {
            var loginUserRoles =  sessionStorage.getItem("roles");
            if(loginUserRoles){
                if(loginUserRoles.indexOf('管理员')!=-1){
                    return '/markMain/markMgnt';
                }
                return '/markMain/tempTaskList';
            }
        },
        name: 'markMain',
        meta: {title: '标注系统', icon: 'ums',isLeaf: false},
        hidden:true,
        children: [{
            path: 'markMgnt',
            name: 'markMgnt',
            component: () => import('@/pages/sysMark/markMgnt/index'),
            meta: {title: '标注管理',isLeaf: true},
            hidden:true
        },
        {
            path: 'taskList',
            name: 'taskList',
            component: () => import('@/pages/sysMark/markMgnt/taskList'),
            meta: {title: '任务列表',isLeaf: true},
            hidden:true
        },
        {
            path: 'tempTaskList',
            name: 'tempTaskList',
            component: () => import('@/pages/sysMark/markMgnt/temp/taskList'),
            meta: {title: '任务列表',isLeaf: true},
            hidden:true
        },
        {
            path: 'markDetail',
            name: 'markDetail',
            component: () => import('@/pages/sysMark/markMgnt/markDetail'),
            meta: {title: '标注',isLeaf: true},
            hidden:true
        },
        {
            path: 'markDetailMsg',
            name: 'markDetailMsg',
            component: () => import('@/pages/sysMark/markMgnt/markDetailMsg'),
            meta: {title: '标注详情',isLeaf: true},
            hidden:true
        },
        {
            path: 'createTask',
            name: 'createTask',
            component: () => import('@/pages/sysMark/markMgnt/createTask'),
            meta: {title: '创建任务',isLeaf: true},
            hidden:true
        },{
            path: 'taskDetail',
            name: 'taskDetail',
            component: () => import('@/pages/sysMark/markMgnt/taskDetail'),
            meta: {title: '任务详情',isLeaf: true},
            hidden:true
        },{
            path: 'preview',
            name: 'preview',
            component: () => import('@/pages/sysMark/preview'),
            meta: {title: '预览图谱',isLeaf: true},
            hidden:true
        },{
                path: 'adminProfessionClearData',
                name: 'adminProfessionClearData',
                component: () => import('@/pages/sysMark/markMgnt/adminProfessionClearData'),
                meta: {title: '专业群清洗数据'},
                hidden: false
        }]
    },
    {
        path:'/dataMain',
        component: () => import('@/pages/sysData/dataMain'),
        redirect: '/dataMain/spiderMgt',
        name: 'dataMain',
        hidden:true,
        meta: {title: '岗位大数据管理', icon: 'ums',isLeaf: false},
        children: [{
            path: 'spiderMgt',
            name: 'spiderMgt',
            component: () => import('@/pages/sysData/spiderMgt/index'),
            meta: {title: '采集规则管理'},
            hidden: false
        },{
            path: 'positionMining',
            name: 'positionMining',
            component: () => import('@/pages/sysData/positionMining/index'),
            meta: {title: '招聘岗位数据挖掘'},
            hidden: false
        },{
            path: 'professionGroup',
            name: 'professionGroup',
            component: () => import('@/pages/sysData/professionGroup/index'),
            meta: {title: '专业群定义'},
            hidden: false
        },{
            path: 'platformProfessionInfo',
            name: 'platformProfessionInfo',
            component: () => import('@/pages/sysData/platformProfession/index'),
            meta: {title: '专业群与行业招聘大数据关联'},
            hidden: false
        },

         /**
        {
            path: 'spiderScheduler',
            name: 'spiderScheduler',
            component: () => import('@/pages/sysData/spiderScheduler/index'),
            meta: {title: '采集任务调度'},
            hidden: false
        },
        {
            path: 'clearMgt',
            name: 'clearMgt',
            component: () => import('@/pages/sysData/clearMgt/index'),
            meta: {title: '预清洗规则管理'},
            hidden: false
        },
        {
            path: 'customClearRuleMgt',
            name: 'customClearRuleMgt',
            component: () => import('@/pages/sysData/customClearRuleMgt/index'),
            meta: {title: '自定义清洗规则管理'},
            hidden: false
        },**/
        {
            path: 'professionPost',
            name: 'professionPost',
            component: () => import('@/pages/sysData/professionPost/index'),
            meta: {title: '专业群原始岗位'},
            hidden: false
        },{
            path: 'professionClearData',
            name: 'professionClearData',
            component: () => import('@/pages/sysData/professionClearData/index'),
            meta: {title: '专业群清洗数据'},
            hidden: false
        }]
    },
    {
        path:'/knowledgeDataMain',
            component: () => import('@/pages/sysKnowledgeData/knowledgeDataMain'),
        redirect: '/knowledgeDataMain/professionStandard',
        name: 'knowledgeDataMain',
        meta: {title: '专业标准初始化管理', icon: 'ums',isLeaf: false},
        hidden:true,
        children: [{
            path: 'professionStandard',
            name: 'professionStandard',
            component: () => import('@/pages/sysKnowledgeData/professionStandard/index'),
            meta: {title: '专业标准初始化管理'},
            hidden: false
        },{
            path: 'professionPositionMgt',
            name: 'professionPositionMgt',
            component: () => import('@/pages/sysKnowledgeData/professionPositionMgt/index'),
            meta: {title: '专业岗位数据管理'},
            hidden: false
        },{
            path: 'professionRelationSetting',
            name: 'professionRelationSetting',
            component: () => import('@/pages/sysKnowledgeData/professionRelationSetting/index'),
            meta: {title: '专业关联设置'},
            hidden: false
        },{
            path: 'professionKeyWordMgt',
            name: 'professionKeyWordMgt',
            component: () => import('@/pages/sysKnowledgeData/professionKeyWordMgt/index'),
            meta: {title: '专业核心关键词管理'},
            hidden: false
        }]
    },
    {
            path:'/datamanage',
            component: () => import('@/pages/sysSettingMgnt/setMain'),
            redirect: '',
            name: 'datamanage',
            meta: {title: '岗位数据管理', icon: 'ums',isLeaf: false},
            hidden:true,
            children: [{
                path: 'professionManage',
                name: 'professionManage',
                component: () => import('@/pages/sysSettingMgnt/profession/index'),
                meta: {title: '专业目录管理',isLeaf: true},
                hidden:true
            },{
                path: 'jobClassification',
                name: 'jobClassification',
                component: () => import("@/pages/sysSettingMgnt/jobClassification/index"),
                meta: {title: '职业大典数据管理', icon: 'ums-admin',isLeaf: true},
                hidden:true
            },{
                path: 'news',
                name: 'news',
                component: () => import("@/pages/sysSettingMgnt/news/index"),
                meta: {title: '行业资讯管理', icon: 'ums-admin',isLeaf: true},
                hidden:true
            },{
                path: 'enterprise',
                name: 'enterprise',
                component: () => import("@/pages/sysSettingMgnt/enterprise/index"),
                meta: {title: '企业信息管理', icon: 'ums-admin',isLeaf: true},
                hidden:true
            },{
                path: 'visualManagement',
                name: 'visualManagement',
                component: () => import("@/pages/sysSettingMgnt/visualManagement/index"),
                meta: {title: '可视化后台管理', icon: 'ums-admin',isLeaf: true},
                hidden:true
            },{
                path: 'industryManage',
                name: 'industryManage',
                component: () => import('@/pages/sysSettingMgnt/industry/index'),
                meta: {title: '专业目录管理',isLeaf: true},
                hidden:true
            },{
                path: 'industrialManage',
                name: 'industrialManage',
                component: () => import('@/pages/sysSettingMgnt/insustrial/index'),
                meta: {title: '产业管理',isLeaf: true},
                hidden:true
            },
            {
                path: 'keyWords',
                name: 'keyWords',
                component: () => import('@/pages/sysSettingMgnt/profession/keyWords'),
                meta: {title: '专业关键词预览',isLeaf: true},
                hidden: true
            },{
                path: 'industrialContent',
                name: 'industrialContent',
                component: () => import('@/pages/sysSettingMgnt/insustrial/industrialContent'),
                meta: {title: '产业内容页',isLeaf: true},
                hidden: true
            },{
                path: 'industryContent',
                name: 'industryContent',
                component: () => import('@/pages/sysSettingMgnt/industry/industryContent'),
                meta: {title: '行业内容页',isLeaf: true},
                hidden: true
            },{
                path: 'tableData',
                name: 'tableData',
                component: () => import('@/pages/sysSettingMgnt/table/index'),
                meta: {title: '元数据表管理', isLeaf: true},
                hidden: true
            },{
                path: 'dataVerify',
                name: 'dataVerify',
                component: () => import('@/pages/sysSettingMgnt/dataVerify/index'),
                meta: {title: '数据校验', isLeaf: true},
                hidden: true
            },{
                path: 'tableColumn',
                name: 'tableColumn',
                component: () => import('@/pages/sysSettingMgnt/tableColumn/index'),
                meta: {title: '元数据列管理', isLeaf: true},
                hidden: true
            },
            {
                path: 'tableView',
                name: 'tableView',
                component: () => import('@/pages/sysSettingMgnt/tableView/index'),
                meta: {title: '元数据表浏览', isLeaf: true},
                hidden: true
            },
            {
                path: 'schoolMajor',
                name: 'schoolMajor',
                component: () => import('@/pages/sysSettingMgnt/schoolMajor/index'),
                meta: {title: '院校专业管理', isLeaf: true},
                hidden: true
            },
            {
                path: 'tableColumnCreate',
                name: 'tableColumnCreate',
                component: () => import('@/pages/sysSettingMgnt/table/tableColumns'),
                meta: {title: '表创建'},
                hidden: true
            },
            {
                path: 'columnChange',
                name: 'columnChange',
                component: () => import('@/pages/sysSettingMgnt/table/columnChange'),
                meta: {title: '字段修改'},
                hidden: true
            },
            {
                path: 'positionInfo',
                name: 'positionInfo',
                component: () => import('@/pages/sysSettingMgnt/position/index'),
                meta: {title: '职位信息'},
                hidden: true
            },
            // {
            //     path: 'platformProfessionInfo',
            //     name: 'platformProfessionInfo',
            //     component: () => import('@/pages/sysSettingMgnt/platformProfession/index'),
            //     meta: {title: '行业与岗位关联'},
            //     hidden: false
            // },
            // {
            //     path: 'spiderMgt',
            //     name: 'spiderMgt',
            //     component: () => import('@/pages/sysSettingMgnt/spiderMgt/index'),
            //     meta: {title: '采集规则管理'},
            //     hidden: false
            // },
            // {
            //     path: 'spiderScheduler',
            //     name: 'spiderScheduler',
            //     component: () => import('@/pages/sysSettingMgnt/spiderScheduler/index'),
            //     meta: {title: '采集任务调度'},
            //     hidden: false
            // },
            // {
            //     path: 'clearMgt',
            //     name: 'clearMgt',
            //     component: () => import('@/pages/sysSettingMgnt/clearMgt/index'),
            //     meta: {title: '预清洗规则管理'},
            //     hidden: false
            // },
            // {
            //     path: 'customClearRuleMgt',
            //     name: 'customClearRuleMgt',
            //     component: () => import('@/pages/sysSettingMgnt/customClearRuleMgt/index'),
            //     meta: {title: '自定义清洗规则管理'},
            //     hidden: false
            // },
            // {
            //     path: 'professionPost',
            //     name: 'professionPost',
            //     component: () => import('@/pages/sysSettingMgnt/professionPost/index'),
            //     meta: {title: '行业原始岗位'},
            //     hidden: false
            // }
        ]
    },

    {
        path:'/sysdatamanage',
        component: () => import('@/pages/sysSettingMgnt/setMain'),
        redirect: '',
        name: 'sysdatamanage',
        meta: {title: '系统数据管理', icon: 'ums',isLeaf: false},
        children: [{
            path: 'professionManage',
            name: 'professionManage',
            component: () => import('@/pages/sysSettingMgnt/profession/index'),
            meta: {title: '专业目录管理',isLeaf: true},
            hidden:false
        },{
            path: 'jobClassification',
            name: 'jobClassification',
            component: () => import("@/pages/sysSettingMgnt/jobClassification/index"),
            meta: {title: '职业大典数据管理', icon: 'ums-admin',isLeaf: true},
            hidden:false
        },{
            path: 'news',
            name: 'news',
            component: () => import("@/pages/sysSettingMgnt/news/index"),
            meta: {title: '行业资讯管理', icon: 'ums-admin',isLeaf: true},
            hidden:false
        },{
            path: 'enterprise',
            name: 'enterprise',
            component: () => import("@/pages/sysSettingMgnt/enterprise/index"),
            meta: {title: '企业信息管理', icon: 'ums-admin',isLeaf: true},
            hidden:false
        },{
            path: 'visualManagement',
            name: 'visualManagement',
            component: () => import("@/pages/sysSettingMgnt/visualManagement/index"),
            meta: {title: '可视化后台管理', icon: 'ums-admin',isLeaf: true},
            hidden:false
        },{
            path: 'industryManage',
            name: 'industryManage',
            component: () => import('@/pages/sysSettingMgnt/industry/index'),
            meta: {title: '行业目录管理',isLeaf: true},
            hidden:false
        },{
            path: 'industrialManage',
            name: 'industrialManage',
            component: () => import('@/pages/sysSettingMgnt/insustrial/index'),
            meta: {title: '产业管理',isLeaf: true},
            hidden:false
        },
        {
            path: 'keyWords',
            name: 'keyWords',
            component: () => import('@/pages/sysSettingMgnt/profession/keyWords'),
            meta: {title: '专业关键词预览',isLeaf: true},
            hidden: true
        },{
            path: 'industrialContent',
                name: 'industrialContent',
            component: () => import('@/pages/sysSettingMgnt/insustrial/industrialContent'),
            meta: {title: '产业内容页',isLeaf: true},
            hidden: true
        },
        {
            path: 'industryContent',
            name: 'industryContent',
            component: () => import('@/pages/sysSettingMgnt/industry/industryContent'),
            meta: {title: '行业内容页',isLeaf: true},
            hidden: true
        },
        {
            path: 'tableData',
            name: 'tableData',
            component: () => import('@/pages/sysSettingMgnt/table/index'),
            meta: {title: '元数据表管理', isLeaf: true},
            hidden: false
        },
        {
            path: 'dataVerify',
            name: 'dataVerify',
            component: () => import('@/pages/sysSettingMgnt/dataVerify/index'),
            meta: {title: '数据校验', isLeaf: true},
            hidden: false
        },
        {
            path: 'tableColumn',
            name: 'tableColumn',
            component: () => import('@/pages/sysSettingMgnt/tableColumn/index'),
            meta: {title: '元数据列管理', isLeaf: true},
            hidden: false
        },
        {
            path: 'tableView',
            name: 'tableView',
            component: () => import('@/pages/sysSettingMgnt/tableView/index'),
            meta: {title: '元数据表浏览', isLeaf: true},
            hidden: false
        },
        {
            path: 'tableColumnCreate',
            name: 'tableColumnCreate',
            component: () => import('@/pages/sysSettingMgnt/table/tableColumns'),
            meta: {title: '表创建'},
            hidden: true
        },
        {
            path: 'columnChange',
            name: 'columnChange',
            component: () => import('@/pages/sysSettingMgnt/table/columnChange'),
            meta: {title: '字段修改'},
            hidden: true
        }/*,
        {
            path: 'positionInfo',
                name: 'positionInfo',
            component: () => import('@/pages/sysSettingMgnt/position/index'),
            meta: {title: '职位信息'},
            hidden: false
        }*/
        ]
    },
    {
        path:'/profession',
        component: () => import('@/pages/sysSettingMgnt/setMain'),
        redirect: '',
        name: 'profession',
        meta: {title: '专业数据管理', icon: 'ums',isLeaf: false},
        hidden: false,
        children: [{
            path: 'professionSetUpMgt',
            name: 'professionSetUpMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/professionSetUpMgt/index'),
            meta: {title: '专业开设情况',isLeaf: true}
        },{
            path: 'professionDirMgt',
            name: 'professionDirMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/professionDirMgt/index'),
            meta: {title: '专业目录数据管理',isLeaf: true}
        },
        {
            path: 'professionCertifMgt',
            name: 'professionCertifMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/professionCertifMgt/index'),
            meta: {title: '专业证书管理',isLeaf: true}
        },
        {
            path: 'professionSchoolMgt',
            name: 'professionSchoolMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/professionSchoolMgt/index'),
            meta: {title: '专业院校数据',isLeaf: true}
        },
        {
            path: 'professionTeacherMgt',
            name: 'professionTeacherMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/professionTeacherMgt/index'),
            meta: {title: '专业教师数据',isLeaf: true}
        },
        {
            path: 'professionStudentMgt',
            name: 'professionStudentMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/professionStudentMgt/index'),
            meta: {title: '专业学生数据',isLeaf: true}
        },
        {
            path: 'professionJiuyeMgt',
            name: 'professionJiuyeMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/professionJiuyeMgt/index'),
            meta: {title: '专业就业数据',isLeaf: true}
        },
        {
            path: 'professionQiyeMgt',
            name: 'professionQiyeMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/professionQiyeMgt/index'),
            meta: {title: '专业企业数据',isLeaf: true}
        },
        {
            path: 'zhuanyehangyeMgt',
            name: 'zhuanyehangyeMgt',
            component: () => import('@/pages/sysSettingMgnt/profession/zhuanyehangyeMgt/index'),
            meta: {title: '专业行业数据',isLeaf: true}
        }]
    },
    {path: '*', redirect: '/404', hidden: true}
]


export const constantRouterMap = routersConfig;

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: routersConfig
})
// export default router;
