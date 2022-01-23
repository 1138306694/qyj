<template>
<!--基本信息页面-->
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">修改密码</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 80px;margin-left: 150px;width: 50%" >
      <el-form label-width="80px" ref="UpdateForm" :rules="rules" :model="updatePassword">
        <el-form-item label="旧密码" prop="oldPassword" >
          <el-input v-model="updatePassword.oldPassword" type="text" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="updatePassword.newPassword" type="password" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="reNewPassword">
          <el-input v-model="updatePassword.reNewPassword" type="password" placeholder="请确认新密码" show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="6" :offset="5">
              <el-button type="primary"  style="width: 100%" @click="onSubmit">确认</el-button>
            </el-col>
            <el-col :span="6" :offset="3">
              <el-button style="width: 100%" @click="resetForm('updatePassword')">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
export default {
  name: "UpdatePassword",
  data(){
    const equalToPassword = (rule, value, callback) => {
      if (this.updatePassword.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return{
      updatePassword: {
        oldPassword:'',
        newPassword:'',
        reNewPassword:''
      },
      rules:{
        oldPassword:[
          {required: true, message: '请输入旧密码', trigger: 'blur'}
        ],
        newPassword:[
          {required: true, message: '请输入新密码', trigger: 'blur'}
        ],
        reNewPassword:[
          {required: true, message: '请确认新密码', trigger: 'blur'},
          { required: true, validator: equalToPassword, trigger: "blur" }
        ],

      },
    }
  },
  methods:{
    loginOut: async function (){
      const {data: loginOut}  = await this.$http.post("http://localhost:8880/user/loginOut");
      window.sessionStorage.clear();
      await this.$router.push('/login');
      this.$message.success(loginOut.msg);
    },
    onSubmit: function () {
      let newPassword = this.updatePassword.newPassword;
      this.$refs.UpdateForm.validate(async (valid)=>{
        if (!valid){
          return;
        }
        if (valid){
          const {data: result} = await this.$http.post('http://localhost:8880/user/updatePassword',{"newPassword":newPassword});
          if (result.code === 200){
            await this.loginOut();
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs["UpdateForm"].resetFields();
    }
  },
  created() {
    document.title = '密码修改'
  }
}
</script>

<style lang="less" scoped>
@import "/src/assets/css/global.css";

</style>
