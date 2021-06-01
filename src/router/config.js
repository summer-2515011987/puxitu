// 路由配置
const routersConfig = [
    {
        path: '/', 
        hidden: true,
        component: () => import('../pages/login/login')},
        
    {
        path: '/login', //谱系图登录
        hidden: true,
        component: () => import('../pages/login/login')},
    {
        path: '/setLogin', //后台管理登录
        hidden: true,
        component: () => import('../pages/login/setLogin')},
    {
        path: '/markLogin', //标注管理登录
        hidden: true,
        component: () => import('../pages/login/markLogin')},
    {
        path: '/dataLogin', //招聘岗位大数据管理后台
        hidden: true,
        component: () => import('../pages/login/dataLogin')},
    {
        path: '/knowledgeDataLogin', //招聘岗位大数据管理后台
        hidden: true,
        component: () => import('../pages/login/knowledgeDataLogin')},
    {
        path: '/loginNav', //前台登录导航
        hidden: true,
        component: () => import('../pages/login/loginNav/loginNavPage')},//ui\src\pages\login\loginNav\loginNavPage.vue
    /**
     * 学校端// 专业与职业谱系图前台系统： sysDendrograms
     */
    {
        path: '/denIndex',
        hidden: true,
        component: () => import('../pages/sysDendrograms/index'),
    },   {
        path: '/denIndex/JobDescription',
        hidden: true,
        component: () => import('../pages/sysDendrograms/JobDescription/JobDescription'),
    },
    /**
     * 学校端// 数据可视化前台系统：sysEchart
     */
    {
        path: '/echartIndex',
        hidden: true,
        component: () => import('../pages/sysEchart/echartMain'),
    },
    {
        path: '/jobnameSelect',
        hidden: true,
        component: () => import('../pages/sysEchart/jobnameSelect'),
    },
    /*专业与职业谱系图知识库自动构建系统*/
    {
        path: '/autobuild',
        hidden: true,
        component: () => import('../pages/Autobuild/autobuild'),
    },
    /**
     * 后台设置管理系统： sysSettingMgnt
     */
    {
        path: '/setIndex',  
        hidden: true,
        component: () => import('../pages/sysSettingMgnt/setMain'), 
        children: [
            {
                path: 'zysjgl',
                name: 'zysjgl',
                hidden: true,
                component: () => import('../pages/sysSettingMgnt/zysjgl') 
            },
            {
                path: 'page1',
                name: 'page1',
                hidden: true,
                component: () => import('../pages/sysSettingMgnt/page1') 
            }
        ]
    },
    /***
     * 学院端  专业行业大数据
     */
    {
        path: '/jobIndex',  
        hidden: true,
        component: () => import('../pages/sysJob/jobMain'), 
    },
    {
        path: '/model',  
        hidden: true,
        component: () => import('../pages/sysDendrograms/createModel/createModelMain'), 
        children: [
            {
                path: 'list',
                hidden: true,
                name: 'list',
                component: () => import('../pages/sysDendrograms/createModel/createModelList') 
            },
            {
                path: 'step',
                hidden: true,
                name: 'modelStep',
                component: () => import('../pages/sysDendrograms/createModel/createModelStep') 
            }
        ]
    }
];

export { routersConfig }
