<template>
    <div  ref="tool">
        <el-menu :default-openeds="defaultOpeneds" style="text-align:left;background: transparent;color:white;"   class="model-step-menu" >
            <el-submenu :index="menu.type+index" v-for="(menu,index)  in  menuList" :key="menu.type+index">
                <template slot="title">
                    <span style="font-weight:bold;height:40px;line-height:40px;background: transparent;color:white;">{{menu.name}}</span>
                </template>
                <el-menu-item-group >
                    <draggable @end="addNode" @choose="move" v-model="menu.children" :options="draggableOptions" 
                        style="background: #242B43;color:white;">
                        <el-menu-item v-for="(son,i) in menu.children"  
                                      :key="son.type+i" :index="son.type+i" :type="son.type" :aaa="son.type" :bbb="son.type" >
                             <img  v-if="son.type=='1-1'"  :src="url1_1"  width="50" height="50"  alt="" />
                                <span v-if="son.type=='1-1'" style="color:white;">数据源</span>
                             <img  v-if="son.type=='2-1'"  :src="url2_1"  width="50" height="50"  alt="" />
                                <span v-if="son.type=='2-1'" style="color:white;">横向分类模型</span>
                                <img  v-if="son.type=='3-2'"  :src="url3_2"   width="50" height="50"  alt="" />
                                <span v-if="son.type=='3-2'" style="color:white;">职业横向分类</span>
                             <img  v-if="son.type=='3-1'"  :src="url3_1"  width="50" height="50"  alt="" />
                                <span v-if="son.type=='3-1'" style="color:white;">横向分类趋势图</span>
                             <img  v-if="son.type=='4-1'"  :src="url4_1"   width="50" height="50"  alt="" />
                                <span v-if="son.type=='4-1'" style="color:white;"> 纵向分级</span>
                             <img  v-if="son.type=='4-2'"  :src="url4_2"   width="50" height="50"  alt="" />
                                <span v-if="son.type=='4-2'" style="color:white;">分级岗位</span>
                             <img  v-if="son.type=='5-1'"  :src="url5_1"   width="50" height="50"  alt="" />
                                <span v-if="son.type=='5-1'" style="color:white;">谱系图</span>
                        </el-menu-item>
                    </draggable>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import url1_1 from '@/assets/images/sysDen/step/1-1.png'
import url2_1 from '@/assets/images/sysDen/step/2-1.png'
import url3_1 from '@/assets/images/sysDen/step/3-1.png'
import url3_2 from '@/assets/images/sysDen/step/3-2.png'
import url4_1 from '@/assets/images/sysDen/step/4-1.png'
import url4_2 from '@/assets/images/sysDen/step/4-2.png'
import url5_1 from '@/assets/images/sysDen/step/5-1.png'
import urls_1_1 from '@/assets/images/sysDen/step/s-1-1.png'
import urls_2_1 from '@/assets/images/sysDen/step/s-2-1.png'
import urls_3_1 from '@/assets/images/sysDen/step/s-3-1.png'
import urls_3_2 from '@/assets/images/sysDen/step/s-3-2.png'
import urls_4_1 from '@/assets/images/sysDen/step/s-4-1.png'
import urls_4_2 from '@/assets/images/sysDen/step/s-4-2.png'
import urls_5_1 from '@/assets/images/sysDen/step/s-5-1.png'

var mousePosition = {
    left: -1,
    top: -1
}

export default {
    props: {
        existedNodes: {
            type: Array,
            default:[]
            // required: true
        },
        
    },
    data() {
        return {
            url1_1: url1_1,
            url2_1: url2_1,
            url3_1: url3_1,
            url3_2: url3_2,
            url4_1: url4_1,
            url4_2: url4_2,
            url5_1: url5_1,
            draggableOptions: {
                preventOnFilter: false
            },
            defaultOpeneds: ['group0', 'group1', 'group2', 'group3', 'group4'],
            menuList: [{
                type: 'group',
                name: '第一步',
                children: [{
                    type: '1-1',
                    name: '数据源',
                }]
            },{
                type: 'group',
                name: '第二步',
                children: [{
                    type: '2-1',
                    name: '横向分类模型',
                }]
            },{
                type: 'group',
                name: '第三步',
                children: [{
                    type: '3-1',
                    name: '横向分类趋势图',
                }, {
                    type: '3-2',
                    name: '职业横向分类',
                }]
            }, {
                type: 'group',
                name: '第四步',
                children: [{
                    type: '4-1',
                    name: '纵向分级',
                }, {
                    type: '4-2',
                    name: '分级岗位',
                }]
            },{
                type: 'group',
                name: '第五步',
                children: [{
                    type: '5-1',
                    name: '谱系图',
                }]
            }],
            nodeMenu: {},
            /**
             * 节点关系
             */
            nodeRelationship:{
                "1-1": {
                    left:50,
                    top:55
                },
                "2-1" :{
                    from:"1-1",
                    to:"3-1",
                    left:250,
                    top:55
                },
                "3-1": {
                    from:"2-1",
                    to: "4-1",
                    left:450,
                    top:55
                },
                "3-2":{
                    from:"3-1",
                    to: null,
                    left:456,
                    top:180
                },
                "4-1":{
                    from:"3-1",
                    to:"5-1",
                    left:650,
                    top:55
                },
                "4-2":{
                    from:"4-1",
                    to: null,
                    left:650,
                    top:180
                },
                "5-1":{
                    from:"4-1",
                    to: null,
                    left:850,
                    top:55
                }
            }
        }
    },
    components: {
        draggable
    },
    created() {
        this.setNodeDisble();
        /**
         * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
         * @param event
         */
        if (this.isFirefox()) {
            document.body.ondrop = function (event) {
                // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
                mousePosition.left = event.layerX
                mousePosition.top = event.clientY - 50
                event.preventDefault();
                event.stopPropagation();
            }
        }
    },
    watch:{
        existedNodes:function(data){//监听属性变化
            for(var da of data){
                this.setImgUrl(da.type);
            }
            // this.startDate = initStartDate;
            // this.endDate = initEndDate;
            // this.timepartValue = initTimepart;
        }
    },
    methods: {
        // 根据类型获取左侧菜单对象
        getMenu(type) {
            for (let i = 0; i < this.menuList.length; i++) {
                let children = this.menuList[i].children;
                for (let j = 0; j < children.length; j++) {
                    let son = children[j]
                    if (son.type === type) {
                        return son
                    }
                }
            }
        },
        move(evt) {
            let attrs = evt.item.attributes;
            this.nodeMenu = this.getMenu(attrs.type.nodeValue)
        },
        // 添加节点
        addNode(evt, e) {
            // this.setImgUrl(this.nodeMenu.type);
            this.$emit('addNode', evt, this.nodeMenu,this.nodeRelationship[this.nodeMenu.type] , mousePosition)
        },
        // 是否是火狐浏览器
        isFirefox() {
            let userAgent = navigator.userAgent
            return userAgent.indexOf("Firefox") > -1;
        },
        // setNode
        setNodeDisble(){
            var me = this;
            this.existedNodes;//画布上已经存在的节点，也就是已经保存的节点数据
            for(var data of this.existedNodes){
                me.setImgUrl(data.type);
            }
        },
        setImgUrl(type){
            if(type=='1-1'){
                this.url1_1 = urls_1_1;
            }else if(type=='2-1'){
                this.url2_1 = urls_2_1;
            }else if(type=='3-1'){
                this.url3_1 = urls_3_1;
            }else if(type=='3-2'){
                this.url3_2 = urls_3_2;
            }else if(type=='4-1'){
                this.url4_1 = urls_4_1;
            }else if(type=='4-2'){
                this.url4_2 = urls_4_2;
            }else if(type=='5-1'){
                this.url5_1 = urls_5_1;
            }
        }
    }
}
</script>
<style >
    #flowToolId  .el-menu-item-group__title {
        padding: 0;
    }
    #flowToolId .el-submenu__title:hover {
        background-color:  #333A52;;
    }

    /* #flowToolId .el-menu-item:hover {
        background-color: #333A52;
    } */
    #flowToolId .el-menu-item:hover {
        background-color: #333A52;
    }
    #flowToolId .el-menu-item {
        height: 55px;
        line-height: 55px;
        width: 177px;
        min-width: 177px;
        padding-left: 0!important;
    }
    #flowToolId .el-submenu {
        display: flex;
    }
    #flowToolId .el-submenu__title {
        height: 30px;
        line-height: 30px;
    }
    #flowToolId .el-menu-item span{
        font-size:12px;
    }

    #flowToolId  .el-submenu__icon-arrow {
        font-size: 0px;
    }
    
</style>
