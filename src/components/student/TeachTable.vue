<template>
<!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">教学安排表</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeachTable",
  data(){
    return{

    }
  },
  created() {
    document.title = '教学安排表'
  }
}
</script>

<style lang="less" scoped>

</style>
