<template>
<!--基本信息页面-->
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">修改密码</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 80px;margin-left: 150px;width: 50%" >
      <el-form ref="form" label-width="80px">
        <el-form-item label="旧密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="6" :offset="5">
              <el-button type="primary" style="width: 100%">确认</el-button>
            </el-col>
            <el-col :span="6" :offset="3">
              <el-button style="width: 100%">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
export default {
  name: "UpdatePassword",
  data(){
    return{

    }
  },
  created() {
    document.title = '密码修改'
  }
}
</script>

<style lang="less" scoped>
@import "/src/assets/css/global.css";

</style>
