<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header class="header" style="height: 80px">
      <el-row>
        <el-col :span="6">
          <span style="font-size: 20px;font-weight: bolder;width: 100%;height: 80px;display: flex;align-items: center;color: white;letter-spacing: 10px">信息工程学院</span>
        </el-col>
        <el-col :span="12" :offset="3">
          <span style="font-size: 38px;font-weight: bolder;width: 100%;height: 80px;display: flex;align-items: center;color: white;letter-spacing: 20px">智慧教务平台</span>
        </el-col>
      </el-row>

    </el-header>
<!--    页面主体部分-->
    <el-container>
<!--      侧边栏-->
      <el-aside class="aside" :width="isOpen ? '66px':'200px'">
        <div class="toggle-button">
            <i :class="isOpen ? 'el-icon-s-unfold':'el-icon-s-fold'" @click="asideOpen"></i>
        </div>
        <el-menu default-active="1" background-color="#b4e7ff" text-color="black"
                 active-text-color="orange" :unique-opened="true" :collapse=isOpen :collapse-transition="false" :router="true">
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.iconClass" style="color: black"></i>
<!--              学生，老师的基本信息的查询，老师可以修改学生的基本信息，超级管理员可以直接修改表信息来达到修改所有人信息，修改密码-->
              <span>{{item.menuName}}</span>
            </template>
              <el-menu-item :index="subItem.path" v-for="subItem in item.child">
                <template>
                  <i :class="subItem.iconClass" style="color: black"></i>
                  <span>{{subItem.menuName}}</span>
                </template>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--      右侧主体部分-->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      //左侧菜单数据
      menuList:[],
      isOpen:false,
    }
  },
  name: "home",
  created() {
    document.title = '首页'
    this.getMenuList()
  },
  methods:{
    loginOut: async function (){
      const {data: loginOut}  = await this.$http.post("http://localhost:8880/user/loginOut");
      window.sessionStorage.clear();
      await this.$router.push('/login');
      this.$message.success(loginOut.msg);
    },
    getMenuList: async function(){
      const {data:res}  = await this.$http.get("http://localhost:8880/user/menuList");
      console.log(res)
      if (res.code === 200){
        this.menuList = res.data;
      }
    },
    //菜单折叠与展开的方法
    asideOpen:function (){
      this.isOpen = !this.isOpen;
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.header{
  background-color: #00b2ff;
}
.aside{
  background-color: #b4e7ff;
}
.main{
  background-color: #ffffff;
}
.toggle-button{
  background-color: #b4e7ff;
  line-height: 40px;
  text-align: center;
}
</style>
