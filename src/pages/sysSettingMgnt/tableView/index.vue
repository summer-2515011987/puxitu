<template>
    <div class="main_contain">
        <div class="headerd">
            <span class="el-icon-caret-right"></span>表浏览
        </div>
        <div class="myTable">

            <el-form :inline="true" class="demo-form-inline" style="text-align:left;">
                <el-form-item label="表名称：">
                    <el-select v-model="defaultValue" placeholder="请选择" @change="getSearchByDbId">
                        <el-option v-for="item in list" :key="item.id" :label="item.tableName" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="handleAdd()" class="searchBtn">添加</el-button>
                </el-form-item>

                <el-form-item v-for="(item,index) in timeSet" :label="item.labelval" :key="index">
                    <el-input v-model="searchTableColumn[item.nameval]" :key="searchTableColumn[item.nameval]">
                    </el-input>
                </el-form-item>

                <el-form-item v-if="timeSet.length!==0">
                    <el-button type="primary" @click="getSearchTableColumn()" class="searchBtn">搜索</el-button>
                </el-form-item>

            </el-form>
            <el-table ref="multipleTable" header-row-class-name="light_grey_table" :height="tableHeight"
                :data="tableData" style="width: 100%;flex:1; min-height: 500px" stripe border>

                <template v-for="(tcl,index) in datamanageTableColumnList">
                    <el-table-column :label="tcl.columnName" :prop="tcl.dbColumn">
                    </el-table-column>
                </template>
<el-table-column label="操作">
    <template slot-scope="scope">
                        　　　　　　<el-button type="info" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                        　　　　　　<el-button type="info" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        　　　　</template>
</el-table-column>
</el-table>
<el-pagination class="footer-pagination" background layout="total, sizes,prev, pager, next,jumper" :current-page.sync="tablev.pageNum" @current-change="handleCurrentChange" :page-size="tablev.pageSize" :page-sizes="[10,20,30]" :total="total">
</el-pagination>

<el-dialog :title="isEdit?'编辑':'添加'" :visible.sync="dialogVisible" width="500px">
    <el-form ref="tableForm" label-width="150px" size="small">
        <el-form-item v-for="(item, index) in tableColumnData" :key="index" :label="item.titlename+':'" :prop="item.key" v-if="item.key!=='id'">
            <el-input v-model="item.value" style="width: 250px"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
                </span>
</el-dialog>
</div>
</div>


</template>
<script>
    import dataManageTable from '@/api/dataManageTable';
    import dataManageTableColumn from '@/api/dataManageTableColumn';

    export default {
        name: 'tableList',
        data() {
            return {
                tableHeight: (document.documentElement.clientHeight - 380) + '100px',
                list: null,
                listLoading: false,
                datamanageTableColumnList: null,
                defaultValue: null,
                tableValData: {},
                isEdit: false,
                dialogVisible: false,
                tableData: null,
                tableColumnData: null,
                tablev: {
                    dbId: null,
                    tablename: null,
                    pageNum: 1,
                    pageSize: 10
                },
                timeSet: [],
                searchTableColumn: {},
                total: 0
            }
        },
        created() {
            this.getList();

        },
        mounted() {},
        methods: {
            getList() {
                dataManageTable.getDbList().then(response => {
                    this.list = response.data;
                    this.defaultValue = response.data[0].id;
                    this.tablev.dbId = this.defaultValue;
                    this.tablev.tablename = response.data[0].databaseTableName;
                    this.getSearchByDbId(this.defaultValue);
                    dataManageTableColumn.getTableValList(this.tablev).then(response => {
                        this.tableData = response.data.list;
                        this.total = response.data.total;
                    });

                });
            },
            handleCurrentChange(val) {
                this.tablev.pageNum = val;
                dataManageTableColumn.getTableValList(this.tablev).then(response => {
                    this.tableData = response.data.list;
                    this.total = response.data.total;
                });
            },
            getSearchByDbId(val) {
                dataManageTableColumn.searchByDbId(val).then(response => {
                    this.datamanageTableColumnList = response.data;
                    this.timeSet = [];
                    this.searchTableColumn = {};
                    for (let i = 0; i < this.datamanageTableColumnList.length; i++) {
                        if (this.datamanageTableColumnList[i].isSearch === '1') {
                            this.timeSet.push({
                                labelval: this.datamanageTableColumnList[i].columnName.toString(),
                                nameval: this.datamanageTableColumnList[i].dbColumn.toString()
                            });
                            this.$set(this.searchTableColumn, this.datamanageTableColumnList[i].dbColumn
                                .toString(), '');
                        }
                    }
                });
                let obj = {};
                obj = this.list.find((item) => { //这里的list就是上面遍历的数据源
                    return item.id === val; //筛选出匹配数据
                });
                this.tablev.dbId = val;
                this.tablev.tablename = obj.databaseTableName;
                dataManageTableColumn.getTableValList(this.tablev).then(response => {
                    this.tableData = response.data.list;
                    this.total = response.data.total;
                });


            },
            handleDelete(index, row) {
                this.$confirm('是否要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    dataManageTableColumn.deleteTableVal(row.id, this.tablev.tablename).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getSearchByDbId(this.tablev.dbId);
                    });
                });
            },
            handleUpdate(index, row) {
                this.dialogVisible = true;
                this.isEdit = true;
                let obj = {};
                obj = this.tableData.find((item) => { //这里的list就是上面遍历的数据源
                    return item.id === row.id; //筛选出匹配数据
                });
                this.tableValData = obj;
                this.tableColumnData = new Array();
                let titlename = null;
                for (let [key, value] of Object.entries(obj)) {
                    titlename = this.datamanageTableColumnList.find((item) => { //这里的list就是上面遍历的数据源
                        return item.dbColumn === key; //筛选出匹配数据
                    }).columnName;
                    this.tableColumnData.push({
                        'key': key,
                        'value': value,
                        'titlename': titlename
                    });
                }
            },
            handleDialogConfirm() {
                this.$confirm('是否要确认?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.isEdit) {
                        dataManageTableColumn.updatetableValData(this.tablev.tablename, this.tableColumnData)
                            .then(response => {
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                this.dialogVisible = false;
                                this.getSearchByDbId(this.tablev.dbId);
                            })
                    } else {
                        dataManageTableColumn.updatetableValData(this.tablev.tablename, this.tableColumnData)
                            .then(response => {
                                this.$message({
                                    message: '添加成功！',
                                    type: 'success'
                                });
                                this.dialogVisible = false;
                                this.getSearchByDbId(this.tablev.dbId);
                            })
                    }
                })
            },
            handleAdd() {
                this.dialogVisible = true;
                this.isEdit = false;
                let obj = {};
                obj = this.tableData[0];
                this.tableValData = obj;
                this.tableColumnData = new Array();
                for (let val of this.datamanageTableColumnList) {
                    this.tableColumnData.push({
                        'key': val.dbColumn,
                        'value': '',
                        'titlename': val.columnName
                    });
                }
            },
            getSearchTableColumn() {
                dataManageTableColumn.getTableValList(this.tablev, this.searchTableColumn).then(response => {
                    this.tableData = response.data.list;
                    this.total = response.data.total;
                });
            }
        }
    }
</script>

<style scoped>
    @import "../../../assets/css/sysSet/wordManagement.css";
</style>