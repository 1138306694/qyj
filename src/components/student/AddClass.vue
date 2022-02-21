<template>
<!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/addClass' }">补选</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-left: 100px;margin-top: 50px">
        <div style="margin-left: 50px; width: 80%">
          <el-form ref="searchForm" :inline="true" :rules="rules" :model="searchFrom">
            <el-form-item label="课程范围" prop="type">
              <el-select placeholder="请选择课程范围" v-model="searchFrom.type">
                <el-option label="必修公共课" value="1"></el-option>
                <el-option label="必修专业基础课" value="2"></el-option>
                <el-option label="任选公共课" value="3"></el-option>
                <el-option label="限选课" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" style="margin-left: 30px" prop="majorType">
              <el-select placeholder="请选择专业" v-model="searchFrom.majorType">
                <el-option v-for="(item) in major" :key="item.id" :label="item.substring(5,item.length)"
                           :value="item.substring(0,4)"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 25px">
              <el-button type="primary" @click="search">检索</el-button>
            </el-form-item>

            <el-form-item style="margin-left: 25px">
              <el-button type="primary" plain @click="getPickResult">选课结果</el-button>
            </el-form-item>
          </el-form>
          <el-divider content-position="center">正选</el-divider>
          <el-table
              :data="classList"
              border
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{ textAlign: 'center' }">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="semester"
                label="学年"
                width="150">
            </el-table-column>
            <el-table-column
                prop="className"
                label="课程名称"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="classTime"
                label="上课时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="classPlace"
                label="上课地点"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="teacherName"
                label="任课老师"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="assMethod"
                label="考察类型"
                width="auto">
            </el-table-column>
            <el-table-column
                label="操作"
                width="auto">
              <template slot-scope="scope">
                <el-button ref="btn"  type="primary" size="mini" plain @click="choiceClass(scope.row)">补选</el-button>
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
  name: "AddClass",
  data() {
    return {
      major: [],
      classList: [],
      searchFrom: {
        type: '',
        majorType: '',
      },
      rules: {
        type: [
          {required: true, message: '请选择课程范围', trigger: 'change'}
        ],
        majorType: [
          {required: true, message: '请选择专业', trigger: 'change'}
        ]
      }
    }
  },
  created() {
    document.title = '补选'
    this.getMajor()
  },
  methods: {
    search: function () {
      this.$refs.searchForm.validate(async (valid) => {
        if (!valid) {
          return;
        }
        if (valid) {
          let type = this.searchFrom.type;
          let majorType = this.searchFrom.majorType;
          const {data: major} = await this.$http.post('http://localhost:8880/user/getClassInfo', {
            "type": type,
            "majorType": majorType
          });
          this.classList = major.data;
          for (let item of major.data) {
            let oldSemester = item.semester;
            item.semester = '20' + oldSemester.substring(0, 2) + '学年第' + oldSemester.charAt(2) + '学期';
            if (item.assMethod === '1') {
              item.assMethod = '考试'
            }
            if (item.assMethod === '2') {
              item.assMethod = '考察'
            }
          }
        }
      })
    },
    async getMajor() {
      const {data: major} = await this.$http.get('http://localhost:8880/user/getMajor');
      console.log(major.data)
      if (major.code === 200){
        this.major = major.data;
      }
      if (major.code === 300){
        this.$message.error('不在选课时间')
      }
    },
    async choiceClass(data) {
      //选择该课程为学生课程的方法
      let className = data.className;
      const {data: response} = await this.$http.get('http://localhost:8880/user/studentPickClass', {params: {className: className}});
      console.log(response)
      if (response.code === 200) {
        this.$message.success(response.msg)
        this.$refs.btn.disabled=true
      }
    },
    getPickResult(){
      this.$router.push('/pickClassResult')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
