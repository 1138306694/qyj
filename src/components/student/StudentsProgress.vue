<template>
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/studentsProgress'}">培养方案</el-breadcrumb-item>
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
              prop="semester"
              label="学年学期"
              width="auto">
          </el-table-column>
          <el-table-column
              prop="className"
              label="课程"
              width="auto">
          </el-table-column>
          <el-table-column
              prop="credit"
              label="学分"
              width="auto">
          </el-table-column>
          <el-table-column
              prop="classType"
              label="课程类别"
              width="auto">
          </el-table-column>
          <el-table-column
              prop="assMethod"
              label="考核方式"
              width="auto">
          </el-table-column>
          <el-table-column
              prop="classHours"
              label="学时"
              width="auto">
          </el-table-column>
          <el-table-column
              label="操作"
              width="auto">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="showDetailClassInfo(scope.row)">详情</el-button>
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
              prop="semester"
              label="学年学期"
              width="150">
          </el-table-column>
          <el-table-column
              prop="practiceName"
              label="环节"
              width="200">
          </el-table-column>
          <el-table-column
              prop="credit"
              label="学分"
              width="89">
          </el-table-column>
          <el-table-column
              prop="practiceType"
              label="环节类别"
              width="150">
          </el-table-column>
          <el-table-column
              prop="assMethod"
              label="考核方式"
              width="80">
          </el-table-column>
          <el-table-column
              prop="practiceWeek"
              label="周数"
              width="80">
          </el-table-column>
          <el-table-column
              label="操作"
              width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="showDetailPracticeInfo(scope.row)">详情</el-button>
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
      courses: [],
      practice: []
    }
  },
  created() {
    document.title = '学业进度'
    this.getClassInfo()
    this.getPracticeInfo()
  },
  methods: {
    //渲染课程信息
    async getClassInfo() {
      const {data: classInfo} = await this.$http.get("http://localhost:8880/user/getClassInfo");
      console.log(classInfo);
      for (let item of classInfo.data) {
        let oldSemester = item.semester;
        item.semester = '20' + oldSemester.substring(0, 2) + '学年第' + oldSemester.charAt(2) + '学期';

        if (item.classType === '1') {
          item.classType = '必修公共课'
        }
        if (item.classType === '2') {
          item.classType = '必修专业基础课'
        }
        if (item.classType === '3') {
          item.classType = '任选公共课'
        }
        if (item.classType === '4') {
          item.classType = '限选课'
        }
        if (item.assMethod === '1') {
          item.assMethod = '考试'
        }
        if (item.assMethod === '2') {
          item.assMethod = '考察'
        }
      }
      this.courses = classInfo.data;
    },
    //渲染实践活动信息
    async getPracticeInfo() {
      const {data: classInfo} = await this.$http.get("http://localhost:8880/user/getPracticeInfo");
      console.log(classInfo);
      for (let item of classInfo.data) {
        let oldSemester = item.semester;
        item.semester = '20' + oldSemester.substring(0, 2) + '学年第' + oldSemester.charAt(2) + '学期';
        if (item.assMethod === '1') {
          item.assMethod = '考查'
        }
        if (item.assMethod === '2') {
          item.assMethod = '考核'
        }
        if (item.assMethod === '3') {
          item.assMethod = '其他'
        }
      }
      this.practice = classInfo.data;
    },
    //课程详情展示页面跳转
    showDetailClassInfo(data){
      let className =  data.className;
      this.$router.push({path:'/classDetailInfo',query:{"className":className}});
    },
    //实践活动详细展示页面跳转
    showDetailPracticeInfo(data){
      let practiceName =  data.practiceName;
      this.$router.push({path:'/practiceDetailInfo',query:{"practiceName":practiceName}});
    }
  }
}
</script>

<style lang="less" scoped>

</style>
