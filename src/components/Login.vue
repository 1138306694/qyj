<template>
  <div class="login">
    <el-container class="login_core">
      <!--      头像区-->
      <div class="avatar_box">
        <el-avatar :size="100"
                   src=""></el-avatar>
      </div>
      <el-form :rules="rules" :model="loginForm" label-width="20px" class="logoIn_form" style="margin-top: 40px">
        <!--    角色选择-->
        <el-row>
          <el-col :span="22" :offset="2">
            <el-form-item>
              <el-select v-model="loginForm.role" style="width: 100%">
                <el-option label="学生" value="1"></el-option>
                <el-option label="老师" value="2"></el-option>
                <el-option label="系统管理员" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--    账号输入-->
        <el-row>
          <el-col :span="4" :offset="3">
            <el-form-item>
              <span style="font-size: 15px">用户名:</span>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item>
              <el-input v-model="loginForm.userName" placeholder="请输入账户名">
                <i slot="suffix" class="el-icon-user-solid"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--    密码输入-->
        <el-row>
          <el-col :span="4" :offset="3">
            <el-form-item>
              <span style="font-size: 15px">密    码：</span>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item>
              <el-input type="password" v-model="loginForm.passWord" placeholder="请输入密码">
                <i slot="suffix" class="el-icon-key"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--    验证码输入，验证码显示-->
        <el-form-item>
          <el-row>
            <el-col :span="14" :gutter="20" :offset="2">
              <el-input v-model="loginForm.verificationCode" placeholder="请输入验证码">
                <i slot="suffix" class="el-icon-coordinate"></i>
              </el-input>
            </el-col>
            <el-col :span="7" :gutter="20" :offset="1">
              <el-input>

              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <!--登录，忘记密码按钮-->
        <el-form-item>
          <el-row>
            <el-col :span="11" :gutter="20" :offset="2">
              <el-button @keydown.enter="onSubmit" @click="onSubmit" type="primary" style="width: 100%">登录</el-button>
            </el-col>
            <el-col :span="10" :gutter="20" :offset="1">
              <el-button style="width: 100%">忘记密码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        role: '',
        userName: '',
        passWord: '',
        verificationCode: ''

      },
      rules:{

      },
    }
  },

  methods:{
    onSubmit() {
      console.log(this.loginForm)
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  background: url("../assets/image/bgImg.jpg") ;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.login_core {
  width: 500px;
  height: 360px;
  background-color: #88b4a5;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -240%);
}


</style>
