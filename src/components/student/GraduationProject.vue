<template>
  <!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">毕业设计</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-left: 100px;margin-top: 50px">
      <div style="width: 85%">
        <el-descriptions title="课题信息" :column="2" border>
          <el-descriptions-item label="姓名">{{data.userName}}</el-descriptions-item>
          <el-descriptions-item label="学号">{{data.userId}}</el-descriptions-item>
          <el-descriptions-item label="学院">{{data.faculty}}</el-descriptions-item>
          <el-descriptions-item label="年级">{{'20'+data.userId.substring(0,2)+'级'}}</el-descriptions-item>
          <el-descriptions-item label="专业">{{data.major}}</el-descriptions-item>
          <el-descriptions-item label="班级">{{data.classBj}}</el-descriptions-item>
          <el-descriptions-item label="指导教师">{{data.instructor}}</el-descriptions-item>
          <el-descriptions-item label="职称">{{data.title}}</el-descriptions-item>
          <el-descriptions-item label="课题名称">{{data.graduationProjectName}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="开题报告模板">
            <el-tag>模板下载</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="论文排版要求">
            <el-button @click="downLoadFile">排版要求下载</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

  </div>


</template>

<script>
export default {
  name: "GraduationProject",
  data() {
    return {
      data:{
        fileName:''
      }
    }
  },
  created() {
    document.title = '毕业设计'
    this.getGradProInfo()
  },
  methods:{
    async getGradProInfo(){
      const {data: response} = await this.$http.get('http://localhost:8880/user/getGradProInfo')
      console.log(response)
      if (response.data.title === '1'){
        response.data.title = '讲师'
      }
      if (response.data.title === '2'){
        response.data.title = '副教授'
      }
      if (response.data.title === '3'){
        response.data.title = '教授'
      }
      this.data = response.data
    },
    async downLoadFile(){
      let fileName = this.fileName = '南阳理工学院毕业设计论文格式.pdf'
      const {data: response} = await  this.$http.get('http://localhost:8880/user/downloadLocal', {params: {fileName:this.fileName} })
      const url = window.URL.createObjectURL(new Blob([response],{type: 'application/pdf;charset=UTF-8'}))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${fileName}`)
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url); // 释放
      console.log(response)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
