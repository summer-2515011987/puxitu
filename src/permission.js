import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
    getToken
} from '@/utils/tokenActions'

const whiteList = ['/login', '/setLogin', '/markLogin', '/dataLogin', '/knowledgeDataLogin'] // 不重定向白名单

// 全局路由钩子
router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (getToken()) {
        if (to.path === '/login') {
            NProgress.done();
            // next({ path: '/' });
            next();
        } else if (to.path === "/setLogin") {
            NProgress.done();
            next({
                path: '/sysadmin'
            });
        } else if (to.path === "/markLogin") {
            NProgress.done();
            next({
                path: '/markMain'
            });
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => { // 拉取用户信息
                    console.log('mwk', res)
                    let menus = res.data.menus;
                    let username = res.data.username;
                    let roles = res.data.roles;
                    sessionStorage.setItem("roles", roles);
                    store.dispatch('GenerateRoutes', {
                        menus,
                        username
                    }).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        NProgress.done();
                        next({
                            ...to,
                            replace: true
                        })
                    });
                }).catch((err) => {
                    store.dispatch('LogOut').then(() => {
                        sessionStorage.clear();
                        localStorage.clear();
                        NProgress.done();
                        next({
                            path: '/'
                        });
                    });
                });
            } else {
                NProgress.done();
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            NProgress.done();
            next();
        } else {
            NProgress.done();
            next('/login');
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})