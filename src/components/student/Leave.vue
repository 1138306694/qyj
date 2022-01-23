<template>
  <!--请假页面-->
  <div class="login">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">请假</a></el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-top: 50px;margin-left:150px;width: 50%;">
      <el-form label-width="80px" ref="leaveForm" :rules="rules" :model="leaveFormData">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="leaveFormData.userName" label="姓名" type="text"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classBj">
          <el-input v-model="leaveFormData.classBj" type="text"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="userId">
          <el-input v-model="leaveFormData.userId" type="text"></el-input>
        </el-form-item>
        <el-form-item label="请假类别" prop="leaveType">
          <el-select v-model="leaveFormData.leaveType" style="width: 100%">
            <el-option label="事假" value="1"></el-option>
            <el-option label="病假" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请假时间">
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker v-model="leaveFormData.startDate" type="datetime" placeholder="开始时间" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item prop="endDate">
              <el-date-picker v-model="leaveFormData.endDate" type="datetime" placeholder="结束时间" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="具体原因" prop="leaveReason">
          <el-input type="textarea" v-model="leaveFormData.leaveReason" placeholder="具体请假原因">
          </el-input>
        </el-form-item>
        <el-form-item label="审批人" prop="instructor">
          <el-input v-model="leaveFormData.instructor"></el-input>
        </el-form-item>

        <el-form-item>
          <el-row>
            <el-col :span="6" :offset="5">
              <el-button type="primary" style="width: 100%" @click="onSubmit">提交</el-button>
            </el-col>
            <el-col :span="6" :offset="3">
              <el-button style="width: 100%" @click="resetForm('leaveForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  name: "Leave",
  data() {
    return {
      leaveFormData: {
        userName: '',
        classBj: '',
        userId: '',
        leaveType: '',
        instructor: '',
        startDate: '',
        leaveReason:'',
        endDate: '',
      },
      rules: {
        userName:[{required: true, message: '请核对用户名', trigger: 'blur'}],
        classBj:[{required: true, message: '请核对班级', trigger: 'blur'}],
        userId:[{required: true, message: '请核对学号', trigger: 'blur'}],
        leaveType:[{required: true, message: '请选择请假类别', trigger: 'blur'}],
        instructor:[{required: true, message: '请核对辅导员', trigger: 'blur'}],
        startDate:[{required: true, message: '请选择开始日期', trigger: 'blur'}],
        leaveReason:[
          {required: true, message: '请输入详细理由', trigger: 'blur'},
          {min: 20, max: 100, message: '理由不少于20字，不多于100字，若有特殊情况请当面请假', trigger: 'blur'}
        ],
        endDate:[{required: true, message: '请选择结束日期', trigger: 'blur'}],
      },


    }
  },
  created() {
    document.title = '请假'
    this.defaultInfo()
  },
  methods: {
    resetForm(formName) {
      this.$refs["leaveForm"].resetFields();
      this.defaultInfo();
    },
    async defaultInfo(){
      const {data: leaveData} = await this.$http.get("http://localhost:8880/user/leaveDefaultInfo");
      console.log(leaveData.data);
      this.leaveFormData.userName = leaveData.data.userName;
      this.leaveFormData.classBj = leaveData.data.classBj;
      this.leaveFormData.userId = leaveData.data.userId;
      this.leaveFormData.instructor = leaveData.data.instructor;
    },
    onSubmit: async function () {
      let userName = this.leaveFormData.userName;
      let classBj = this.leaveFormData.classBj;
      let userId = this.leaveFormData.userId;
      let leaveType = this.leaveFormData.leaveType;
      let instructor = this.leaveFormData.instructor;
      let startDate = this.leaveFormData.startDate;
      let leaveReason = this.leaveFormData.leaveReason;
      let endDate = this.leaveFormData.endDate;
      let formData =  JSON.stringify(this.leaveFormData);
      const {data: leaveData} = await this.$http.post("http://localhost:8880/user/leave",{
        "userName":userName,
        "classBj":classBj,
        "userId":userId,
        "leaveType":leaveType,
        "instructor":instructor,
        "startDate":startDate,
        "leaveReason":leaveReason,
        "endDate":endDate,
        "formData":formData,
      });
      console.log(leaveData);

      if(leaveData.code === 200){
        this.$message.success(leaveData.msg);
        await this.$router.push('/leaveCancellation');
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
