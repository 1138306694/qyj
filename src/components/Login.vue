<template>
  <div class="login">
    <div class="login_core">
      <!--      头像区-->
      <div class="avatar_box">
        <el-avatar :size="100"
                   src=""></el-avatar>
      </div>
      <!--      通过ref直接获取表单的引用对象-->
      <el-form ref="LoginRef" :rules="rules" :model="loginForm" label-width="10px" class="logoIn_form"
               style="margin-top: 40px">
        <!--    角色选择-->
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item prop="roleType">
              <el-select v-model="loginForm.roleType" style="width: 100%">
                <el-option label="学生" value="1"></el-option>
                <el-option label="老师" value="2"></el-option>
                <el-option label="辅导员" value="3"></el-option>
                <el-option label="系统管理员" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--    账号输入-->
        <el-row>
          <el-col :span="4" :offset="4">
            <el-form-item>
              <span style="font-size: 15px">用户名:</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="userId">
              <el-input v-model="loginForm.userId" placeholder="请输入账户名">
                <i slot="suffix" class="el-icon-user-solid"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--    密码输入-->
        <el-row>
          <el-col :span="4" :offset="4">
            <el-form-item>
              <span style="font-size: 15px">密    码：</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--    验证码输入，验证码显示-->
        <el-row>
          <el-col :span="10" :offset="4">
            <el-form-item prop="verificationCode">
              <el-input v-model="loginForm.verificationCode" placeholder="请输入验证码" @load="getVerCode">
                <i slot="suffix" class="el-icon-coordinate"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item>
              <el-image style="height: 40px" :src="code_url" @click="getVerCode" title="看不清？点击切换"></el-image>
            </el-form-item>
          </el-col>

        </el-row>


        <!--登录，忘记密码按钮-->
        <el-form-item>
          <el-row>
            <el-col :span="7" :offset="4">
              <el-button @keydown.enter="onSubmit" @click="onSubmit" type="primary" style="width: 100%">登录</el-button>
            </el-col>
            <el-col :span="7" :offset="2">
              <el-button style="width: 100%">忘记密码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      code_url: '',
      loginForm: {
        roleType: '',
        userId: '',
        password: '',
        verificationCode:''
      },
      rules: {
        roleType: [
          {required: true, message: '请选择角色', trigger: 'change'}
        ],
        userId: [
          {required: true, message: '请输入账户名', trigger: 'blur'},
          {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
        ],
        verificationCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
        ],

      },
    }
  },
  created() {
    document.title = '登录',
        this.getVerCode();
  },
  methods: {
    onSubmit: function () {
      this.$refs.LoginRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        if (valid) {
          let roleType = this.loginForm.roleType;
          let userId = this.loginForm.userId;
          let password = this.loginForm.password;
          let verificationCode = this.loginForm.verificationCode;
          const {data: result} = await this.$http.post('http://localhost:8880/user/login',
              {"roleType": roleType, "userId": userId, "password": password,"verificationCode": verificationCode});    //发起网络请求
          if (result.code === 200) {
            this.$message.success(result.msg);
            //记录token
            window.sessionStorage.setItem('token', result.data.token);
            //跳转到/home
            await this.$router.push('/baseInfo');
          }
          if (result.code === 500) {
            this.$message.error(result.msg);
            await this.getVerCode();
            this.loginForm.verificationCode = '';
          }
        }
      })
    },
    getVerCode: async function () {
      let verificationCode = this.loginForm.verificationCode;
      const {data: verCode} = await this.$http.get('http://localhost:8880/user/verCode');
      console.log(verCode)
      this.code_url = verCode;
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background: url("../assets/image/bgImg.jpg");
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
