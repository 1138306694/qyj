<template>
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/class'}">正选</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/pickClassResult'}">正选结果</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-left: 150px;margin-top: 50px;width: 70%">
        <el-divider content-position="center">正选结果</el-divider>
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
              <el-button type="primary" size="mini" plain @click="classDetailInfo(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "PickClassResult",
  data(){
    return{
      classList: [],
    }
  },
  created() {
    document.title = '正选结果'
    this.getPickClassList()
  },
  methods:{
    async getPickClassList(){
      const {data: response} = await this.$http.get('http://localhost:8880/user/pickClassInfo');
      console.log(response)
      this.classList = response.data;
      for (let item of response.data) {
        let oldSemester = item.semester;
        item.semester = '20' + oldSemester.substring(0, 2) + '学年第' + oldSemester.charAt(2) + '学期';
        if (item.assMethod === '1') {
          item.assMethod = '考试'
        }
        if (item.assMethod === '2') {
          item.assMethod = '考察'
        }
      }
    },
    classDetailInfo(data){
      let className =  data.className;
      this.$router.push({path:'/classDetailInfo',query:{"className":className}});
    }
  }

}
</script>

<style scoped>

</style>
