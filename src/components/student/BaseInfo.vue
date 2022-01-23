<template>
<!--基本信息页面-->
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }"> <span>首页</span></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/"><span>基本信息</span></a></el-breadcrumb-item>
    </el-breadcrumb>


    <div style="margin-left: 150px;margin-top: 50px;width: 70%;">
      <el-divider>基本信息</el-divider>
      <el-row>
        <el-col :span="18">
          <el-descriptions class="InfoTable" :column="2" border>
            <el-descriptions-item>
              <template slot="label" >
                姓名
              </template>
              {{baseInfo.userName}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                性别
              </template>
              {{baseInfo.sex}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                民族
              </template>
              {{baseInfo.nameFamily}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                出生日期
              </template>
              {{baseInfo.birthDate}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                籍贯
              </template>
              {{baseInfo.nativePlace}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                政治面貌
              </template>
              {{baseInfo.politicalOutlook}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                出生地
              </template>
              {{baseInfo.birthPlace}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                身份证号
              </template>
              {{baseInfo.idCard}}
            </el-descriptions-item>

          </el-descriptions>
        </el-col>
        <el-col :span="6">
          <div style="border: 1px solid #e6e8f5;border-left: none">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <el-descriptions class="InfoTable" :column="3" border>
        <el-descriptions-item style="border-top: none">
          <template slot="label" style="border-top: none">
            联系电话
          </template>
          {{baseInfo.phone}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            学号
          </template>
          {{baseInfo.userId}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            宿舍号
          </template>
          {{baseInfo.dormitory}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            院系
          </template>
          {{baseInfo.faculty}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            专业
          </template>
          {{baseInfo.major}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            行政班级
          </template>
          {{baseInfo.classBj}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            电子邮箱
          </template>
          {{baseInfo.email}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            入学成绩
          </template>
          {{baseInfo.admissionResults}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            入学年份
          </template>
          {{baseInfo.enrollmentYear}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            培养层次
          </template>
          {{baseInfo.cultivationLevel}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            辅导员
          </template>
          {{baseInfo.instructor}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            学制
          </template>
          {{baseInfo.educationalSystem}}
        </el-descriptions-item>
        <el-descriptions-item label="主修外语语种">
          {{baseInfo.majorForeignLanguages}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            毕业类别
          </template>
          {{baseInfo.graduationCategory}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            毕业时间
          </template>
          {{baseInfo.graduationDate}}
        </el-descriptions-item>
      </el-descriptions>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>



  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  data(){
    return{
      data:null,
      baseInfo:{},
      imageUrl: '',
    }
  },
  created() {
    document.title = '基本信息'
    this.getBaseInfo();
  },
  methods:{
    getBaseInfo:async function () {
      const {data:res} = await this.$http.get("http://localhost:8880/user/baseInfo");
      console.log(res);
      this.baseInfo = res.data;
      console.log(this.baseInfo);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传照片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传照片图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style lang="less" scoped>
.my-label{
  background: #b4e7ff;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 206.8px;
  height: 183px;
  line-height: 185px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}


</style>
