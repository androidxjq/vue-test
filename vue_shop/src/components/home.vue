<template>
  <div>
    <el-button @click="goOut" type="info">退出</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    goOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped></style>
