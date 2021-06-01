<template>
  <oauth-client-detail :is-edit='false' :title="title"></oauth-client-detail>
</template>

<script>
import OauthClientDetail from "@/pages/sysSettingMgnt/oauthClient/components/OauthClientDetail";
export default {
name: "addOauthClientDetail",
  components: {OauthClientDetail},
  data() {
    return {
      title: "新增授权服务器配置"
    }
  }
}
</script>

<style scoped>

</style>