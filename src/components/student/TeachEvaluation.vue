<template>
  <!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/teachEvaluation'}">教学评价表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div style="margin-left: 100px;margin-top: 50px">
        <div style="width: 85%">
          <el-form ref="searchForm" :inline="true" :rules="rules" :model="searchFrom">
            <el-form-item label="学年" prop="schoolYear">
              <el-select placeholder="请选择学年" v-model="searchFrom.schoolYear">
                <el-option v-for="(item) in semester" :key="item.id" :label="item"
                           :value="item.substring(0,4)"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学期" prop="semester">
              <el-select placeholder="请选择学期" v-model="searchFrom.semester">
                <el-option label="春季" value="1"></el-option>
                <el-option label="秋季" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" prop="majorType">
              <el-select placeholder="请选择专业" v-model="searchFrom.majorType">
                <el-option v-for="(item) in major" :key="item.id" :label="item.substring(5,item.length)"
                           :value="item.substring(0,4)"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">检索</el-button>
            </el-form-item>
          </el-form>
          <el-divider content-position="center">教学评价表</el-divider>
          <el-table
              :data="teaEvaluation"
              border
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{ textAlign: 'center' }">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="className"
                label="课程名称"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="semester"
                label="学年"
                width="150">
            </el-table-column>
            <el-table-column
                prop="teacherName"
                label="任课老师"
                width="auto">
            </el-table-column>
            <el-table-column
                label="评分"
                width="auto"
                prop="score">
            </el-table-column>
            <el-table-column
                label="操作"
                width="auto">
              <template slot-scope="scope">
                <el-button plain @click="teaEvaluationDetail(scope.row)">评教</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeachEvaluation",
  data() {
    return {
      teaEvaluation: [],
      semester: [],
      major: [],
      searchFrom: {
        schoolYear: '',
        semester: '',
        majorType: '',
      },
      rules: {
        schoolYear: [
          {required: true, message: '请选择课程范围', trigger: 'change'}
        ],
        semester: [
          {required: true, message: '请选择学期', trigger: 'change'}
        ],
        majorType: [
          {required: true, message: '请选择专业', trigger: 'change'}
        ]
      }
    }
  },
  created() {
    document.title = '教学评价表'
    this.getMajor()
    this.getUserId()
  },
  methods: {
    async getMajor() {
      const {data: major} = await this.$http.get('http://localhost:8880/user/getMajor');
      console.log(major.data)
      if (major.code === 200) {
        this.major = major.data;
      }
    },
    async getUserId() {
      const {data: userId} = await this.$http.get('http://localhost:8880/user/userId');
      let id = userId.data;
      for (let i = 0; i < 5; i++) {
        this.semester[i] = '20' + (id.substring(0, 2) - 0 + i) + '学年'
      }
    },
    search: function () {
      this.$refs.searchForm.validate(async (valid) => {
        if (!valid) {
          return;
        }
        if (valid) {
          let schoolYear = this.searchFrom.schoolYear;
          let semester = this.searchFrom.semester;
          let majorType = this.searchFrom.majorType;
          const {data: response} = await this.$http.post('http://localhost:8880/user/getTeaEvaInfo', {
            "schoolYear": schoolYear, "semester": semester, "majorType": majorType
          })
          for (let item of response.data) {
            let oldSemester = item.semester;
            item.semester = '20' + oldSemester.substring(0, 2) + '学年第' + oldSemester.charAt(2) + '学期';
          }
          this.teaEvaluation = response.data;
        }
      })
    },
    teaEvaluationDetail(data){
      let className = data.className
      let teacherName = data.teacherName
      let semester = data.semester
      this.$router.push({path:'/teaEvaluationDetail',query:{"className":className,"teacherName":teacherName,"semester":semester}})
    }

  }
}
</script>

<style lang="less" scoped>

</style>
