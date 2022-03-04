<template>
<!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/examNotification'}">考试通报</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-left: 100px;margin-top: 50px">
        <div style="width: 85%">
          <el-descriptions title="用户信息" border>
            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="详情">
              <el-link href="" target="_blank">默认链接</el-link>
            </el-descriptions-item>
          </el-descriptions>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "examNotification",
  data(){
    return{

    }
  },
  created() {
    document.title = '考试通报'
  }
}
</script>

<style lang="less" scoped>

</style>
