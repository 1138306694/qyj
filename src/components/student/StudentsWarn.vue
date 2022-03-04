<template>
  <!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/studentsWarn'}">学业预警</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-left: 100px;margin-top: 50px">
      <div style="width: 85%">
        <template v-for="item in data">
          <el-descriptions title="学业预警" border>
            <el-descriptions-item label="学号">{{ item.userId }}</el-descriptions-item>
            <el-descriptions-item label="班级">{{ item.classBj }}</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag type="danger">{{item.remarks}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="预警学科">{{ item.className }}</el-descriptions-item>
            <el-descriptions-item label="学分">{{ item.credit }}</el-descriptions-item>
            <el-descriptions-item label="成绩">{{ item.score }}</el-descriptions-item>
          </el-descriptions>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentsWarn",
  data() {
    return {
      data: [],
      css: '',
    }
  },
  created() {
    document.title = '学业预警'
    this.getStudentsWarn()
  },
  methods: {
    async getStudentsWarn() {
      const {data: response} = await this.$http.get('http://localhost:8880/user/studentsWarn');
      this.data = response.data
      for (let item of response.data) {
        if (item.credit <= '1'){
          item.remarks = '低级预警'
        }
        if (item.credit <= '3' && item.credit > '1'){
          item.remarks = '中级预警'
        }
        if (item.credit > '3'){
          item.remarks = '高级预警'
        }
      }
      console.log(response)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
