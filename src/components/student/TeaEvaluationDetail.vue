<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/teachTable' }">教学安排表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/teachTableDetail' }">评教详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-left: 100px;margin-top: 50px">
      <div style="margin-left: 80px; width: 70%">
        <el-descriptions style="margin-left: 200px" :column="2">
          <el-descriptions-item label="课程名称">{{ className }}</el-descriptions-item>
          <el-descriptions-item label="任课老师">{{ teacherName }}</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="center">提交教学评价</el-divider>
        <div>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[0]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[1]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[2]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[3]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[4]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[5]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[6]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[7]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[8]" :max="10"></el-rate>
            </el-descriptions-item>
            <el-descriptions-item label="课程名称">
              <el-rate show-score score-template="{value}" v-model="value[9]" :max="10"></el-rate>
            </el-descriptions-item>
          </el-descriptions>
          <div style="margin-left: 700px;margin-top: 3px">
            <el-button type="primary" @click="submitScore">提交</el-button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "TeaEvaluationDetail",
  data() {
    return {
      className: '',
      teacherName: '',
      semester:'',
      value: []
    }
  },
  methods: {
    async submitScore() {
      let sum = 0
      for (let i = 0; i < this.value.length; i++) {
        sum += this.value[i]
      }
      let className = this.className
      let teacherName = this.teacherName
      const {data: response} = await this.$http.post('http://localhost:8880/user/saveTeaEvaScore', {
        "className": className, "teacherName": teacherName,"value":sum
      })
      if (response.code === 200){
        this.$message.success(response.msg)
        await this.$router.push('/teachEvaluation')
      }

    }
  },
  created() {
    document.title = '评教详情'
    this.className = this.$route.query.className;
    this.teacherName = this.$route.query.teacherName;
  },

}
</script>

<style scoped>

</style>
