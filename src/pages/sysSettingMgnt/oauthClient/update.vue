<template>
  <oauth-client-detail :is-edit='true' :title="title"></oauth-client-detail>
</template>
<script>
  import OauthClientDetail from './components/OauthClientDetail'
  export default {
    name: 'updateOauthClientDetail',
    components: { OauthClientDetail },
    data() {
      return {
        title: "编辑授权服务器配置"
      }
    }
  }
</script>
<style>
</style>


