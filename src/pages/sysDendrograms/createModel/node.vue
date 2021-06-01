<template>
    <div ref="node"
         :style="flowNodeContainer"
         @mouseenter="showDelete"
         @mouseleave="hideDelete"
         @mouseup="changeNodeSite" @click="clickNode(node.type, visible)">
         <div class="flow-node-header">
            <!--左上角的那个图标样式-->
            <img v-if="node.type==='1-1'" src="@/assets/images/sysDen/step/1-1.png" width="62" height="62" :alt="node.name" />
            <img v-if="node.type==='2-1'" src="@/assets/images/sysDen/step/2-1.png" width="62" height="62" :alt="node.name" />
            <img v-if="node.type==='3-1'" src="@/assets/images/sysDen/step/3-1.png" width="62" height="62" :alt="node.name" />
            <img v-if="node.type==='3-2'" src="@/assets/images/sysDen/step/3-2.png" width="62" height="62" :alt="node.name" />
            <img v-if="node.type==='4-1'" src="@/assets/images/sysDen/step/4-1.png" width="62" height="62" :alt="node.name" />
            <img v-if="node.type==='4-2'" src="@/assets/images/sysDen/step/4-2.png" width="62" height="62" :alt="node.name" />
            <img v-if="node.type==='5-1'" src="@/assets/images/sysDen/step/5-1.png" width="62" height="62" :alt="node.name" />
            
            <!--鼠标移入到节点中时右上角的【删除】 按钮-->
            <div style="position: absolute;top: -10px;right: -15px;line-height: 30px;z-index:4444;" v-show="mouseEnter">
                <!-- <a href="#"  style="height: 100%"  type="button" @click="deleteNode"><img src="@/assets/css/sysDen/delete.png"></a> &nbsp; -->
<!--                <el-popover placement="top"-->
<!--                    width="160"-->
<!--                    v-model="visible">-->
<!--                    <p>确定要删除此节点及子节点吗？</p>-->
<!--                    <div style="text-align: right; margin: 0">-->
<!--                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>-->
<!--                        <el-button type="primary" size="mini"  @click="deleteNode">确定</el-button>-->
<!--                    </div>-->
<!--                    <a href="#" slot="reference" >-->
<!--                        <img src="@/assets/images/sysDen/delete.png">-->
<!--                        </a> &nbsp;-->
<!--                </el-popover>-->
            </div> 
        </div>
        <!--节点的正文部分-->
        <div class="flow-node-body">
          {{node.name}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            node: Object
        },
        data() {
            return {
                visible:false,
                mouseEnter: false // 控制节点操作显示
            }
        },
        computed: {
            
            // 节点容器样式
            flowNodeContainer: {
                
                get() {
                    return {
                        position: 'absolute',
                        // width: '100px',
                        top: this.node.top,
                        left: this.node.left,
                        boxShadow: this.mouseEnter ? '#66a6e0 0px 0px 12px 0px' : '',
                        backgroundColor: 'transparent'
                    }
                }
            },
            nodeClass() {
                var nodeclass = {}
                // nodeclass[this.node.ico] = true
                nodeclass['flow-node-drag'] = true
                return nodeclass
            }
        },
        methods: {
            // 删除节点
            deleteNode() {
                this.$emit('deleteNode', this.node.id);
                this.visible = false;
            },
            // 鼠标进入
            showDelete() {
                this.mouseEnter = true
            },
            // 鼠标离开
            hideDelete() {
                this.mouseEnter = false
            },
            // 鼠标移动后抬起
            changeNodeSite() {
                // 避免抖动
                if (this.node.left === this.$refs.node.style.left && this.node.top === this.$refs.node.style.top) {
                    return;
                }
                this.$emit('changeNodeSite', {
                    nodeId: this.node.id,
                    left: this.$refs.node.style.left,
                    top: this.$refs.node.style.top,
                })
            },
            clickNode(nodeType, visible){
                this.$emit('clickNode', {
                    nodeType: nodeType,
                  visible: visible
                });
            }
        }
    }
</script>

<style>

    .flow-node-drag {
        width: 25px;
        height: 25px;
    }

    .flow-node-header {
        /* background-color: #66a6e0; */
        height: 62px;
        cursor: pointer;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .flow-node-header a {
        text-decoration: none;
        line-height: 30px;
        vertical-align: middle;
    }

    .flow-node-header a img,span {
        /* line-height: 30px; */
        vertical-align: middle;
        margin-bottom: 5px;
    }

    .flow-node-body {
        /*background-color: beige;*/
        /* background-color: white; */
        text-align: center;
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }

</style>
