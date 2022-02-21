<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/studentsProgress' }">学业进度</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/classDetailInfo'}">课程详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 50px;margin-left: 100px;width: 70%">
      <el-descriptions border :column=3 title="课程详情">
        <el-descriptions-item label="课程名称">{{ Data.className }}</el-descriptions-item>
        <el-descriptions-item label="学期学年">{{ Data.semester }}</el-descriptions-item>
        <el-descriptions-item label="学分">{{ Data.credit }}</el-descriptions-item>
        <el-descriptions-item label="课程类别">{{ Data.classType }}</el-descriptions-item>
        <el-descriptions-item label="考核类型">{{ Data.assMethod }}</el-descriptions-item>
        <el-descriptions-item label="总学时">{{ Data.classHours }}</el-descriptions-item>
        <el-descriptions-item label="讲授学时">{{ Data.teachHours }}</el-descriptions-item>
        <el-descriptions-item label="实验学时">{{ Data.expHours }}</el-descriptions-item>
        <el-descriptions-item label="其他学时">{{ Data.otherHours }}</el-descriptions-item>
        <el-descriptions-item label="承教院系">{{ Data.teachFaculty }}</el-descriptions-item>
        <el-descriptions-item label="教学大纲">{{ Data.teacherRule }}</el-descriptions-item>
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
    document.title='课程详情'
    this.className = this.$route.query.className;
    this.getDetailInfo()
  },
  methods:{
    async getDetailInfo(){
      const {data:classDetailInfo} = await this.$http.get('http://localhost:8880/user/getClassDetailInfo',{params:{className:this.className}})
      classDetailInfo.data.semester = '20' + classDetailInfo.data.semester.substring(0,2) + '学年第' + classDetailInfo.data.semester.charAt(2) + '学期';
      if (classDetailInfo.data.classType === '1') {
        classDetailInfo.data.classType = '必修公共课'
      }
      if (classDetailInfo.data.classType === '2') {
        classDetailInfo.data.classType = '必修专业基础课'
      }
      if (classDetailInfo.data.classType === '3') {
        classDetailInfo.data.classType = '任选公共课'
      }
      if (classDetailInfo.data.classType === '4') {
        classDetailInfo.data.classType = '限选课'
      }
      if (classDetailInfo.data.assMethod === '1') {
        classDetailInfo.data.assMethod = '考试'
      }
      if (classDetailInfo.data.assMethod === '2') {
        classDetailInfo.data.assMethod = '考察'
      }
      this.Data = classDetailInfo.data;
    }
  }
}
</script>

<style scoped>

</style>
