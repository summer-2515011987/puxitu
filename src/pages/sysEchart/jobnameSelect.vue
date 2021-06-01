<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>岗位名称过滤
    </div>

      <el-form
              :model="resource"
              :rules="rules"
              ref="resourceForm"
              label-width="150px" size="small">
        <el-form-item label="专业代码：" prop="professionCode">
          <el-input v-model="resource.professionCode" style="width: 700px"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称：" prop="postName">
          <el-input v-model="resource.postName" style="width: 700px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleDialogConfirm('resourceForm')" size="small" >确 定</el-button>
          </span>
</div>
</template>

<script>
import dataManage from "@/api/dataManage";
const defaultResource = {
  professionCode: null,
  postName: null,
};
export default {
  data() {
    return {
      resource: Object.assign({}, defaultResource),
      rules: {
        professionCode: [
          {required: true, message: '请输入专业代码', trigger: 'blur'},
        ],
        postName: [
          {required: true, message: '请输入岗位名称', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    handleDialogConfirm(formName) {
                  dataManage.updatePostName( this.resource).then(response => {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    });

                  });
                }
    },
}
</script>
