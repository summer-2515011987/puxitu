<template>
    <el-card class="box-card h100p">
        <div slot="header" class="clearfix">
            <el-page-header @back="$router.back();" content="产业内容"></el-page-header>
        </div>

        <el-container>
                        <div style="background: #f5f5f5;margin-top: 10px;min-height: 700px;width: 100%" id="industrialContent">

                        </div>
        </el-container>

    </el-card>

</template>

<script>
    import dataManageIndustrial from "@/api/dataManageIndustrial";
    export default {
        name: "keyWords",
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
                dataManageIndustrial.getIndustrialContent(this.$route.query.id).then(response => {
                    const industrialContent = [];
                    const industrialContentList = response.data;
                    for (let i = 0; i <industrialContentList.length; i++) {
                        industrialContent.push("<br />"+(i+1)+"、"+industrialContentList[i].content);
                    }
                    if(industrialContent.length>=1){
                        $("#industrialContent").html(industrialContent.join(""));
                    }else{
                        $("#industrialContent").html("暂无相关数据");
                    }
                }).catch(error =>{
                    this.$message.error(error.data);
                });

            },
        }
    }
</script>

<style scoped>
</style>