<template>
  <!--学业预警-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/studentsProgress'}">学业进度</el-breadcrumb-item>
      </el-breadcrumb>

      <div style="margin-top: 50px;margin-left: 150px;width: 75%">
        <el-descriptions border :column="4">
          <el-descriptions-item label="院系">信息工程学院</el-descriptions-item>
          <el-descriptions-item label="主修专业">通信工程</el-descriptions-item>
          <el-descriptions-item label="年级">2018</el-descriptions-item>
          <el-descriptions-item label="班级">18通信1班</el-descriptions-item>
        </el-descriptions>
      </div>
      <div style="margin-top: 10px;margin-left: 120px;width: 80%">
        <el-divider content-position="center">理论课程</el-divider>
        <el-table
            :data="courses"
            border
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            style="margin-top: 10px">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="createDate"
              label="学年学期"
              width="150">
          </el-table-column>
          <el-table-column
              prop="startDate"
              label="课程"
              width="200">
          </el-table-column>
          <el-table-column
              prop="endDate"
              label="学分"
              width="89">
          </el-table-column>
          <el-table-column
              prop="instructor"
              label="课程类别"
              width="150">
          </el-table-column>
          <el-table-column
              prop="type"
              label="考核方式"
              width="80">
          </el-table-column>
          <el-table-column
              prop="type"
              label="学时"
              width="80">
          </el-table-column>
          <el-table-column
              label="操作"
              width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="showCoursesInfo(scope.row)">详情</el-button>
            </template>

          </el-table-column>
        </el-table>
        <el-divider content-position="center">实践环节</el-divider>
        <el-table
            :data="practice"
            border
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            style="margin-top: 10px">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="createDate"
              label="学年学期"
              width="150">
          </el-table-column>
          <el-table-column
              prop="startDate"
              label="环节"
              width="200">
          </el-table-column>
          <el-table-column
              prop="endDate"
              label="学分"
              width="89">
          </el-table-column>
          <el-table-column
              prop="instructor"
              label="环节类别"
              width="150">
          </el-table-column>
          <el-table-column
              prop="type"
              label="考核方式"
              width="80">
          </el-table-column>
          <el-table-column
              prop="type"
              label="周数"
              width="80">
          </el-table-column>
          <el-table-column
              label="操作"
              width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="showPracticeInfo(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentsProgress",
  data() {
    return {
      courses:[],
      practice:[]
    }
  },
  created() {
    document.title = '学业进度'
  }
}
</script>

<style lang="less" scoped>

</style>
