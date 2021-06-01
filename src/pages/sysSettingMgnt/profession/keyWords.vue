<template>
    <el-card class="box-card h100p">
        <div slot="header" class="clearfix">
            <el-page-header @back="$router.back();" content="专业关键词"></el-page-header>
        </div>

        <el-container>

            <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">
              <!--  <ul>
                    专业名称：
                        <li v-model="list.title"></li>
                    
                    培养目标：
                        <li v-model="list.trainGoal"></li>
                    
                    就业面向：
                        <li v-model="list.jobFace"></li>
                    
                    职业能力：
                        <li v-model="list.jobabilityProfession"></li>
                    
                    课程实训：
                        <li v-model="list.courseinfo"></li>
                    
                </ul>-->
                <el-form
                        v-loading="formLoading"
                        :model="resource"
                        label-width="100px" size="small">
                    <el-form-item label="专业名称：" prop="title">
                        <el-tag  style="width: 700px"><p v-html="resource.title"></p></el-tag>
                    </el-form-item>
                    <el-form-item label="培养目标：">
                        <el-tag  style="height:300px;width: 700px"><p v-html="resource.trainGoal"></p></el-tag>
                    </el-form-item>
                    <el-form-item label="就业面向：">
                        <el-tag  style="height:300px;width: 700px"><p v-html="resource.jobFace"></p></el-tag>
                    </el-form-item>
                    <el-form-item label="职业能力：">
                        <el-tag  style="height:300px;width: 700px"><p v-html="resource.jobabilityProfession"></p></el-tag>
                    </el-form-item>
                    <el-form-item label="课程实训：">
                        <el-tag  style="height:900px;width: 700px"><p v-html="resource.courseinfo"></p></el-tag>
                    </el-form-item>
                </el-form>
            </el-main>

        </el-container>

    </el-card>

</template>

<script>
    const defaultResource = {
        id: null,
        code: null,
        title: null,
        parentId: null,
        orderno: '',
        admissionRequirements: null,
        studyLife: null,
        jobFace: null,
        trainGoal: null,
        trainType: '',
        courseinfo: null,
        teachingCondition: null,
        qualityEnsure: null,
        jobfaceProfession: null,
        jobabilityProfession: '',
        coursinfo: null,
        keywords: null,
        professionCreatetime: null,
        zhongzhi: null,
        gaozhi: '',
        describeContent: '',

    };
    import dataManage from "@/api/dataManage";
    export default {
        name: "keyWords",
        data() {
            return {
                formLoading: false,
                resource: Object.assign({}, defaultResource),
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData(){
                dataManage.getData(this.$route.query.id).then(response => {
                    this.resource = Object.assign({}, response.data);
                }).catch(error =>{
                    this.$message.error(error.data);
                });

            },
        }
    }
</script>

<style scoped>

</style>