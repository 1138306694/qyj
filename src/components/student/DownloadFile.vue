<template>
<!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">文件下载</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownloadFile",
  data(){
    return{

    }
  },
  created() {
    document.title = '文件下载'
  }
}
</script>

<style lang="less" scoped>

</style>
