<template>
    <div class="main_contain" style="height: 700px">
        <div class="headerd">
            <span class="el-icon-caret-right"></span>国民经济行业分类
            <el-button style="float: right; margin:8px" type="text" @click="exportData" class="searchBtn">导出职业大典</el-button>
        </div>
        <div class="myTable">
            <el-container>
                <el-aside width="400px" v-loading="treeLoading" style="min-height: 400px">
                    <span style="line-height: 36px;">国民经济目录</span>
                    <div class="custom-tree-container">
                        <div class="block">
                            <el-tree
                                    :data="treeDate"
                                    node-key="id"
                                    :expand-on-click-node="false">
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                                <div  v-if="node.level==4" ><span @click="() => showContent(data.id)" key="1">{{ node.label }}</span></div>
                                <span v-else key="2">{{ node.label }}</span>
                                <span>
                                    <span v-if="node.level  == 3 ">
                                      <el-button style="margin-left: 0px;"
                                                 type="text"
                                                 size="mini"
                                                 @click="() => append(node,data)">
                                        添加子节点
                                      </el-button>
                                    </span>
                                    <el-button style="margin-left: 0px;"
                                               type="text"
                                               size="mini"
                                               @click="() => update(node, data)"> 修改
                                    </el-button>
                                    <el-button style="margin-left: 0px;"
                                               type="text"
                                               size="mini"
                                               @click="() => remove(node, data)"> 删除
                                    </el-button>
                                </span>
                          </span>
                            </el-tree>
                        </div>
                    </div>
                </el-aside>
                <el-main v-show="showContentFlag">
                    <el-header style="padding-left: 0" height="50px" >
                        国民经济内容
                    </el-header>
                    <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">
                        <textarea v-model="defaultEntity.content" placeholder="" style="width:80%;height:400px;font-size: larger;border: 1px solid #ccc;padding: 20px;" ></textarea>
                    </el-main>
                    <el-form :inline="true"  class="demo-form-inline" style="text-align:center;">
                        <el-form-item>
                            <el-button type="primary" @click="handleSave()" class="searchBtn">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </div>
        <el-dialog
                :title="isEdit?'编辑':'添加'"
                :visible.sync="dialogVisible"
                width="500px">
            <el-form :model="defaultEntity"
                     ref="adminForm"
                     label-width="100px" size="small">
                <el-form-item label="名称：">
                    <el-input v-model="defaultEntity.name" style="width: 300px"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import dataManageIndustry from '@/api/dataManageIndustry';
    const defaultQueryTree={
        parentId: 0
    }
    const defaultEntity={
        id: 0,
        parentId:0,
        type:0,
        name:'',
        createTime: "",
        updateTime: "",
        content: ""
    }
    export default {
        name: 'economy',
        data() {
            return {
                tableHeight : (document.documentElement.clientHeight-380)+'px',
                defaultQueryTree : Object.assign({}, defaultQueryTree),
                defaultEntity:Object.assign({}, defaultEntity),
                treeDate: [],
                list: null,
                total: null,
                dialogVisible:false,
                listLoading: true,
                treeLoading:true,
                menuTree: [],
                menuLoading : true,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10
                },
                isEdit: false,
                content:"",
                parentId: 0,
                showContentFlag:false,
                data:Object
            }
        },
        created() {
            this.getTree()
        },
        watch: {
            $route(route) {
                //this.resetParentId();
                this.getList();
            }
        },
        methods: {
            getList() {
                this.listLoading = true;

            },
            getTree() {
                this.treeLoading = true;
                dataManageIndustry.getIndustryInfo().then(response => {
                    this.treeLoading = false;
                     let result = response.data;
                     let datas = new Array();
                        for (let i=0;i<result.length;i++){
                          datas.push({
                            "id":result[i].id,
                            "label":result[i].name,
                            "children":this.getTreeData(result[i].children)
                          })
                        }
                      this.treeDate = datas;
                }).then(response => {

                });
            },
            getTreeData(childrenData){
              const datas=new Array();
              if (childrenData == undefined) {
                return datas;
              }
              for (let i=0;i<childrenData.length;i++){
                datas.push({
                    "id":childrenData[i].id,
                    "label":childrenData[i].name,
                    "children":this.getTreeData(childrenData[i].children)
                  })
              }
              return datas;
            },
            append(node,data) {
                //开启点击事件
                this.defaultEntity.name=''
                this.defaultEntity.type=node.level+1
                this.defaultEntity.parentId=data.id
                this.defaultEntity.jobDescribe=''
                this.showContentFlag=false
                this.dialogVisible=true
                this.data=data
            },
            update(node,data) {
                //开启点击事件
                this.showContent(data.id)
                this.isEdit=true
                //this.defaultEntity.name=data.label
                this.showContentFlag=false
                this.dialogVisible=true
                this.data=data
            },
            handleDialogConfirm(){
                //处理确定后的保存或者修改
                //先保存数据
                // this.$confirm('是否要确认?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     this.listLoading = true;
                //     if (this.isEdit) {
                //         update(this.defaultEntity.id,this.defaultEntity).then(response => {
                //             this.data.label=this.defaultEntity.name
                //             this.$message({
                //                 message: '修改成功',
                //                 type: 'success',
                //                 duration: 1000
                //             });
                //             this.dialogVisible = false;
                //             this.listLoading = false;
                //         }).then(response => {

                //         });
                //     } else {
                //         create(this.defaultEntity).then(response => {
                //             this.$message({
                //                 message: '添加成功！',
                //                 type: 'success'
                //             });
                //             const newChild = { id: response.data, label: this.defaultEntity.name, children: [] };
                //             if (!this.data.children) {
                //                 this.$set(this.data, 'children', []);
                //             }
                //             this.data.children.push(newChild);

                //             this.dialogVisible = false;
                //             this.listLoading = false;
                //         })
                //     }
                // }).catch(()=>{
                //     this.listLoading = false;
                // })
            },
            handleSave(){
                // update(this.defaultEntity.id,this.defaultEntity).then(response => {
                //     this.$message({
                //         message: '修改成功',
                //         type: 'success',
                //         duration: 1000
                //     });
                // }).then(response => {

                // });
            },
            remove(node, data) {
                //  this.$confirm('是否要删除?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     remove(data.id).then(response => {
                //         this.$message({
                //             message: '删除成功',
                //             type: 'success',
                //             duration: 1000
                //         });
                //     }).then(response => {

                //     });
                //     const parent = node.parent;
                //     const children = parent.data.children || parent.data;
                //     const index = children.findIndex(d => d.id === data.id);
                //     children.splice(index, 1);
                // });
            },
            showContent(id){
                dataManageIndustry.getData(id).then(response => {
                    this.defaultEntity.id = response.data.id;
                    this.defaultEntity.parentId = response.data.parentId;
                    this.defaultEntity.name = response.data.name;
                    this.defaultEntity.content = response.data.content.replaceAll("<br>","\n");
                    this.showContentFlag=true
                }).then(response => {

                });
            },
        },
        filters: {
            levelFilter(value) {
                if (value === 0) {
                    return '一级';
                } else if (value === 1) {
                    return '二级';
                }
            },
            disableNextLevel(value) {
                return value !== 0;
            }
        }
    }
</script>


<style scoped>
    @import "../../../../assets/css/sysSet/wordManagement.css";

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
