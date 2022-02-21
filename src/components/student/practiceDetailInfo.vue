<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/studentsProgress' }">学业进度</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/practiceDetailInfo'}">实践活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 50px;margin-left: 100px;width: 70%">
      <el-descriptions border :column=3 title="实践活动详情">
        <el-descriptions-item label="活动名称">{{ Data.practiceName }}</el-descriptions-item>
        <el-descriptions-item label="学期学年">{{ Data.semester }}</el-descriptions-item>
        <el-descriptions-item label="学分">{{ Data.credit }}</el-descriptions-item>
        <el-descriptions-item label="课程类别">{{ Data.practiceType }}</el-descriptions-item>
        <el-descriptions-item label="考核类型">{{ Data.assMethod }}</el-descriptions-item>
        <el-descriptions-item label="实践大纲">{{}}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  name: "classDetailInfo",
  data() {
    return {
      className:'',
      Data:{}
    }
  },
  created() {
    document.title='实践活动详情'
    this.practiceName = this.$route.query.practiceName;
    this.getDetailInfo()
  },
  methods:{
    async getDetailInfo(){
      const {data:classDetailInfo} = await this.$http.get('http://localhost:8880/user/getPracticeDetailInfo',{params:{practiceName:this.practiceName}})
      classDetailInfo.data.semester = '20' + classDetailInfo.data.semester.substring(0,2) + '学年第' + classDetailInfo.data.semester.charAt(2) + '学期';
      console.log(classDetailInfo.data)
      if (classDetailInfo.data.assMethod === '1') {
        classDetailInfo.data.assMethod = '考查'
      }
      if (classDetailInfo.data.assMethod === '2') {
        classDetailInfo.data.assMethod = '考核'
      }
      if (classDetailInfo.data.assMethod === '3') {
        classDetailInfo.data.assMethod = '其他'
      }
      this.Data = classDetailInfo.data;
    }
  }
}
</script>

<style scoped>

</style>
