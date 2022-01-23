<template>
  <!--基本信息页面-->
  <div>
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">请假记录</a></el-breadcrumb-item>
      </el-breadcrumb>

      <div>
        <el-table
            :data="data"
            border
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            style="width: 85%;margin-left: 100px;margin-top: 50px">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="createDate"
              label="请假日期"
              width="200">
          </el-table-column>
          <el-table-column
              prop="startDate"
              label="开始时间"
              width="200">
          </el-table-column>
          <el-table-column
              prop="endDate"
              label="结束时间"
              width="200">
          </el-table-column>
          <el-table-column
              prop="instructor"
              label="审批人"
              width="100">
          </el-table-column>
          <el-table-column
              prop="type"
              label="审批状态"
              width="80">
          </el-table-column>
          <el-table-column
              label="操作"
              width="189">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="showInfo(scope.row)">详情</el-button>
            </template>

          </el-table-column>
        </el-table>
        <div style="margin-left: 150px;margin-top: 10px;">
          <el-pagination @current-change="handleCurrentChange" background
                         :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next" :total=num></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaveCancellation",
  data() {
    return {
      num: 0,
      pageNum:1,
      pageSize:7,
      data:[],
    }
  },
  created() {
    document.title = '请假记录'
    this.getTableInfo(1)
  },
  methods:{
    getTableInfo: async function (val) {
      let pageNum =  val
      let pageSize =  this.pageSize;
      const  {data:leaveTable} = await this.$http.post('http://localhost:8880/user/leaveTable',{"pageNum": pageNum,"pageSize": pageSize});
      console.log(leaveTable)
      this.num = leaveTable.msg.substring(4,5) - 0;
      console.log(this.num)
      this.data = leaveTable.data.list;

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getTableInfo(val);
    },
    showInfo(data){
      let createDate =  data.createDate;
      this.$router.push({path:'/leaveDetailInfo',query:{"createDate":createDate}});

    }
  }
}
</script>

<style lang="less" scoped>

</style>
