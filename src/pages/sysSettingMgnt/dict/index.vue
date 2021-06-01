<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>字典列表
    </div>
    <div class="myTable">
      <!-- <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">          
        <el-button type="primary" @click="handleAdd()" class="searchBtn">添加</el-button>          
      </el-form>
      <el-table ref="adminTable" :height="tableHeight" header-row-class-name="light_grey_table" 
		  :data="list"
		  style="width: 100%;"
		  v-loading="listLoading" stripe border>                      
      </el-table>
      <el-pagination class="footer-pagination"
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			layout="total, sizes,prev, pager, next,jumper"
			:current-page.sync="listQuery.pageNum"
			:page-size="listQuery.pageSize"
			:page-sizes="[10,15,20]"
			:total="total">
		</el-pagination> -->
    <el-container>
      <el-aside width="500px" style="margin-right:30px;">
        <!-- <el-container> -->
          <!-- <el-header style="padding-left: 0; padding-right: 0" height="50px"> -->
            <el-button type="primary" @click="dictVisible=true" class="searchBtn fr mb20" >添加</el-button>
          <!-- </el-header> -->
          <!-- <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0"> -->
            <el-table v-loading="listLoading" ref="menuTable" :data="tableData"
                      @current-change="handleCurrentChange" style="width: 100%;" :height="tableHeight" header-row-class-name="light_grey_table" 
                      highlight-current-row stripe border>
              <el-table-column property="name" label="字典"></el-table-column>
              <el-table-column label="操作" width="100px" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <!-- </el-main> -->
        <!-- </el-container> -->
      </el-aside>
      <el-main class="m0 p0">
          <el-button type="primary" @click="dictDataAdd()" class="searchBtn fr mb20 " style="margin-left: 10px;">新增</el-button>
          <el-button type="primary" @click="dataShow =true;" class="searchBtn fr mb20 ">编辑</el-button>
          <el-button v-show="dataShow" type="primary" @click="dictDataSubmit()" class="searchBtn fr mb20 ">提交</el-button>
          <el-table :data="tableDictData" border style="width: 100%" :height="tableHeight" header-row-class-name="light_grey_table"  v-loading="tableDictDataTableLoading">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="code">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-show="dataShow" v-model="scope.row.code"></el-input>
                <span v-show="!dataShow">{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="text">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-show="dataShow" v-model="scope.row.text"></el-input>
                <span v-show="!dataShow">{{ scope.row.text }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteDictData(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
    </el-container>
	</div>
  <el-dialog    custom-class="step-dialog-radius" :visible.sync="dictVisible" width="30%" ref="dictForm" top="20%">
      <div slot="title" class="dialog-title">
        <span class="tringle-red-icon"></span>
        <span class="model-title-font">新增字典</span>
      </div>
      <el-form :model="dictForm" status-icon ref="dictForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dictForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </span>
    </el-dialog>
</div>	
  <!-- <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="el-page-header__content">字典列表</span>
    </div>
    <el-container>

      <el-aside width="500px">

        <el-container>

          <el-header style="padding-left: 0; padding-right: 0" height="50px">
            <el-button type="primary" @click="dictVisible=true">添加</el-button>
          </el-header>

          <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">
            <el-table v-loading="listLoading" ref="menuTable" :data="tableData"
                      @current-change="handleCurrentChange" style="width: 100%;min-height: 500px"
                      highlight-current-row stripe border>
              <el-table-column property="name" label="字典"></el-table-column>
              <el-table-column label="操作" width="100px" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>

        </el-container>
      </el-aside>

      <el-container style="min-height: 768px">

        <el-header style="padding-left: 0; padding-right: 0" height="50px">
          <el-button type="primary" @click="dictDataAdd()">新增</el-button>
          <el-button type="primary" @click="dataShow =true;">编辑</el-button>
          <el-button v-show="dataShow" type="primary" @click="dictDataSubmit()">提交</el-button>
        </el-header>

        <el-main style="padding-right: 0 ;padding-top: 0"
                 v-loading="tableDictDataTableLoading">
          <el-table :data="tableDictData" border style="width: 100%" max-height="768">
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="code">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-show="dataShow" v-model="scope.row.code"></el-input>
                <span v-show="!dataShow">{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="text">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-show="dataShow" v-model="scope.row.text"></el-input>
                <span v-show="!dataShow">{{ scope.row.text }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteDictData(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>

      </el-container>


    </el-container>
    <el-dialog title="新增字典" :visible.sync="dictVisible" width="30%" ref="dictForm">
      <el-form :model="dictForm" status-icon ref="dictForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dictForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card> -->
</template>

<script>
import {fetchList, fetchDataList, createDict, updateDict, deleteDict, createDatas} from '@/api/dict'

export default {
  data() {
    var name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名称不能为空'));
      }
    };
    return {
      
      tableHeight : (document.documentElement.clientHeight-320)+'px',
      tableData: [],
      tableDictData: [],
      currentRow: null,
      listLoading: true,
      tableDictDataTableLoading: false,
      dictVisible: false,
      dictForm: {
        name: ''
      },
      row: null,
      dataShow: false,
      dictId: null
    }
  },

  created() {
    this.getList();
  },
  watch: {
    $route(route) {
      this.getList();
    }
  },

  methods: {
    getList() {
      this.listLoading = true;
      fetchList().then(response => {
        this.listLoading = false;
        this.tableData = response.data;
      }).catch(error => {
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.dictId = val.id;
      this.tableDictDataTableLoading = true;
      this.dataShow = false;
      fetchDataList(val.id).then(response => {
        this.tableDictData = response.data;
        this.tableDictDataTableLoading = false;
      }).catch(error => {
        this.tableDictDataTableLoading = false;
      });
    },
    handleAddDict(row) {
      this.row = row;
      this.dictVisible = true;
    },
    submitForm() {
      if (this.row) {
        updateDict(this.row.id, this.dictForm).then(response => {
          if (response.code === 200) {
            this.listLoading = true;
            fetchList().then(response => {
              this.listLoading = false;
              this.tableData = response.data;
            }).catch(error => {
              this.listLoading = false;
            });
          }
        });
      } else {
        createDict(this.dictForm).then(response => {
          if (response.code === 200) {
            this.listLoading = true;
            fetchList().then(response => {
              this.listLoading = false;
              this.tableData = response.data;
            }).catch(error => {
              this.listLoading = false;
            });
          }
        });

      }
      this.row = null;
      this.dictVisible = false;
    },
    handleDelete(row) {
      var data = [];
      data.push(row.id);
      deleteDict(data).then(response => {
        if (response.code === 200) {
          this.listLoading = true;
          fetchList().then(response => {
            this.listLoading = false;
            this.tableData = response.data;
          }).catch(error => {
            this.listLoading = false;
          });
        }
      });
    },
    dictDataSubmit() {
      if (this.dataShow && this.dictId) {
        createDatas(this.dictId, this.tableDictData).then(response => {
          if (response.code === 200) {

          }
        });
        this.dataShow = false;
      }
    },
    dictDataAdd() {
      this.dataShow = true;
      this.isEdit = true
      this.tableDictData.push({code: "", text: ""});
    },
    deleteDictData(row) {
      for (var i = 0; i < this.tableDictData.length; i++) {
        if (row.code === this.tableDictData[i].code) {
          this.tableDictData.splice(i, 1);
          break;
        }
      }
    }
  }
}
</script>
<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>
