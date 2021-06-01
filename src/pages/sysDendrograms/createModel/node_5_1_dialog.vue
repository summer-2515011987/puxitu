<template>
<div>
    <el-dialog    custom-class="step-dialog-radius" 
            :visible.sync="editVisible" width="70%" height="60%" top="8vh">
          <div slot="title" class="dialog-title">
            <span class="tringle-red-icon"></span>
            <span class="model-title-font">编辑岗位说明书</span>
          </div>
        <p class="puxituDialog_title">横向：岗位分类<span style="font-weight:900;color:red;">{{selectObj.horizontalClassification}}</span>  
                                    纵向：岗位等级<span style="font-weight:900;color:red;">{{selectObj.verticalClassification}}</span></p>
        <el-table  id="editNode5Table"  :row-key="getRowKeys"   :data="tableData3" key="id"  :default-expand-all="true"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props" type="expand" >
                    <el-container>
                        <el-main style="margin:0;padding:10px;">
                            <el-input style="height:200px;overflow:auto;" 
                                type="textarea"
                                :rows="4"
                                placeholder="请输入内容"
                                class="textareaHeaderCss"
                                v-model.trim="props.row.positionDetailClause">
                            </el-input >
                        </el-main>
                        <el-aside width="35%" style="padding:10px;height:200px;overflow:auto;">
                          {{props.row.sentEmbFilted}}
                        </el-aside>
                    </el-container>
                </template>
            </el-table-column>
            <el-table-column label="" prop="onetName">
            </el-table-column>
            <el-table-column label="" prop="desc" width="300">
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer" style="text-align:center;">
            <el-button @click="editVisible = false" icon="el-icon-close">取消</el-button>
            <el-button @click="clickeUpdate" type="primary" icon="el-icon-check" class="searchBtn">确定</el-button>
        </span>
    </el-dialog>
</div>    
</template>

<script>

  import {updatePutProfessionalOnetInfoData} from "@/api/professionModelManagerApi";

  export default {
      props: {
        // datas: Array,
        tableData3: Array,
        horizontalCategoriesData: Array,
        id: {
          type: Number,
          default: null
        },
        selectObj:Object
      },
      data() {
          return {
              editVisible: false,
              node: {},
              // tableData3: []
          }
      },
      created() {
          this.getExpends();
      },
      methods: {
          createJobNameId(index){
            return "data"+ index
          },
          // clickCell(row, column, cell, event){
          //     if(cell.cellIndex>=5){

          //       loadProfessionalOnetInfoData(this.id, row.verticalClassification).then(rep=>{

          //         if (rep.code === 200){
          //           this.editVisible = true;
          //           this.selectObj = row;
          //           this.selectObj.horizontalClassification = cell.cellIndex;
          //           this.tableData3= [];
          //           let index = 1;
          //           for (let data of rep.data){
          //             data.desc = '关键字';
          //             data.id = index++;
          //             this.tableData3.push(data);
          //           }
          //         }

          //       }).catch(error=>{
          //         console.error(error);
          //       });


          //     }
          // },
          getExpends(){
              // var Id = this.tableData3.map(item => item.id)
              //     this.expends = Id;
          },
          getRowKeys(row){
              return row.id
          },
          clickeUpdate(){
            let setpData5 = {};
            setpData5[this.selectObj.verticalClassification + "-" + this.selectObj.horizontalClassification] = this.tableData3;

            updatePutProfessionalOnetInfoData(this.id, setpData5).then(response => {

              if(response.code === 200){

                this.$message.success("保存成功！");
                this.editVisible = false;
              } else {
                this.$message.error(response.message);
              }

            }).catch(response =>{
              console.error(response)
            });
          }
      }
  }
</script>

<style scoped>
@import "./../../../assets/css/sysDen/createModel.css";

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
