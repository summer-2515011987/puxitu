const getters = {
    sidebar: state => state.app.sidebar,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    addRouters: state => state.serMenuPermission.addRouters,
    routers: state => state.serMenuPermission.routers
}
export default getters