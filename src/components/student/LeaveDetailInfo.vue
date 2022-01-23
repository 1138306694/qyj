<template>
<!--请假信息详情页-->
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/leaveCancellation'}">请假记录</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/leaveDetailInfo'}">请假详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-top: 50px;margin-left: 100px;width: 70%">
      <el-descriptions border :column=2 title="请假详情">
        <el-descriptions-item label="姓名">{{listData.userName}}</el-descriptions-item>
        <el-descriptions-item label="学号">{{listData.userId}}</el-descriptions-item>
        <el-descriptions-item label="班级">{{listData.classBj}}</el-descriptions-item>
        <el-descriptions-item label="状态">{{type}}</el-descriptions-item>
        <el-descriptions-item label="请假类别">{{leaveType}}</el-descriptions-item>
        <el-descriptions-item label="辅导员">{{listData.instructor}}</el-descriptions-item>
        <el-descriptions-item label="请假时间">{{createDate}}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{listData.startDate | date('yyyy-MM-dd hh:mm:ss')}}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{listData.endDate | date('yyyy-MM-dd hh:mm:ss')}}</el-descriptions-item>
        <el-descriptions-item label="请假时长">{{leaveTime}}</el-descriptions-item>
        <el-descriptions-item label="具体原因">{{listData.leaveReason}}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>

export default {
  name: "LeaveDetailInfo",
  data(){
    return{
      createDate:'',
      listData:{},
      leaveTime:'',
      type:'',
      leaveType:''
    }
  },
  created() {
    document.title='请假详情'
    this.createDate = this.$route.query.createDate;
    console.log(this.createDate)
    this.getDetailInfo();
  },
  methods:{
    async getDetailInfo(){
      const {data:leaveDetailInfo} = await this.$http.get('http://localhost:8880/user/leaveDetailInfo',{params:{createDate:this.createDate}})
      console.log(leaveDetailInfo)
      this.listData = leaveDetailInfo.data;
      const leaveTime =  leaveDetailInfo.data.endDate - leaveDetailInfo.data.startDate
      let day = Math.floor(leaveTime/(1000*60*60)/24)
      let hours = Math.floor(leaveTime%((1000*60*60)/24) / (1000 * 60 * 60))
      this.leaveTime =day+"天"+hours + "小时"
      console.log(leaveDetailInfo.data.type)
      if (leaveDetailInfo.data.type === '1'){
        this.type = '未审批'
      }
      if (leaveDetailInfo.data.type === '2'){
        this.type = '同意'
      }
      if (leaveDetailInfo.data.type === '3'){
        this.type = '拒绝'
      }

      if (leaveDetailInfo.data.leaveType === 1){
        this.leaveType = '事假'
      }
      if (leaveDetailInfo.data.leaveType === 2){
        this.leaveType = '病假'
      }


    },


  }

}
</script>

<style scoped>

</style>
