<template>
<!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/class'}">正选</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


  </div>
</template>

<script>
export default {
  name: "Class",
  data(){
    return{

    }
  },
  created() {
    document.title = '正选'
  }
}
</script>

<style lang="less" scoped>

</style>
