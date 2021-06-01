<template>
    <el-card class="box-card h100p">
        <div slot="header" class="clearfix">
            <el-page-header @back="$router.back();" content="行业内容"></el-page-header>
        </div>

        <el-container>
                        <div style="background: #f5f5f5;margin-top: 10px;min-height: 700px;width: 100%" id="industryContent">

                        </div>
        </el-container>

    </el-card>

</template>

<script>
    import dataManageIndustry from "@/api/dataManageIndustry";
    export default {
        name: "industryContent",
        data() {
            return {
                formLoading: false,
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData(){
                dataManageIndustry.getData(this.$route.query.id).then(response => {
                    const industrialContent = response.data.content;
                    if(industrialContent!=undefined){
                        $("#industryContent").html(industrialContent);
                    }else{
                        $("#industryContent").html("暂无相关数据");
                    }
                }).catch(error =>{
                    this.$message.error(error.message);
                });

            },
        }
    }
</script>

<style scoped>
</style>