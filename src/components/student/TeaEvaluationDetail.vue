<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/teachTable' }">教学安排表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/teachTableDetail' }">评教详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "TeaEvaluationDetail"
}
</script>

<style scoped>

</style>
