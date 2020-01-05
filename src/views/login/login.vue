<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="../../assets/M.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <!-- 表单验证 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="43px"
        class="demo-ruleForm login-form"
      >
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <!-- 验证码 -->
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col class="code-col" :span="6">
              <!-- 验证码 -->
              <!-- <img src="../../assets/code.jpg" alt="" /> -->
              <img @click="changeCode" :src="codeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')" class="login-btn" type="primary">登录</el-button>
          <!-- Dialog 对话框 按钮 -->
          <el-button @click="dialogFormVisible = true" class="login-btn reset-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt />

    <!-- Dialog 对话框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="dialog">
        <el-form-item label="头像">
          <!-- 头像 -->
          <el-upload
            name="image"
            class="avatar-uploader"
            action="http://127.0.0.1/heimamm/public/uploads"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop='username' label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input
            show-password
            prefix-icon="el-icon-lock"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="arcode" label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" v-model="form.arcode" autocomplete="off"></el-input>
            </el-col>
            <el-col class="code-col" :span="6">
              <img @click="changesign" :src="sign" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="code" label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span='18'><el-input v-model="form.code" autocomplete="off"></el-input></el-col>
            <el-col :span='6'>
              <el-button>获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//import axios from "axios";
import {login} from '../../api/login.js'

const valdataPhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("手机号不能为空"));
  } else {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("密码错误"));
    }
  }
};

const valdataEmail = (rule,value,callback)=>{
  if(value === ''){
    callback(new Error('邮箱不能为空'))
  } else {
    const em = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if(em.test(value) == true){
      callback()
    } else {
      callback(new Error("邮箱格式错误"));
    }
  }
};

export default {
  name: "login",

  data() {
    return {
      imageUrl: "",
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        code: "",
        password: "",
        phone: "",
        checked: false
      },

      rules: {
        phone: [
          // {  required: true, message: '请输入正确的手机号', trigger: 'blur' },
          // { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
          { validator: valdataPhone, trigger: "blur" }
        ],

        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度不够", trigger: "change" }
        ],

        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 10, message: "长度必须至少为4", trigger: "change" }
        ]
      },

      dialogTableVisible: false,
      dialogFormVisible: false,

      sign:process.env.VUE_APP_BASEURL + "/captcha?type=login",

      form: {
        username: "",
        password: "",
        phone: "",
        code: "",
        arcode: "",
        email: "",

        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px",

      dialog: {
        email:[
          {validator:valdataEmail,trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:6,max:11,message:'长度必须至少为6位',trigger:'change'}
        ],
        arcode:[
        {required:true,message:'请输入验证码',trigger:'blur'},
        {min:4,max:4,message:'请输入完整验证码',trigger:'blur'}
        ],
        phone:[
          {validator:valdataPhone,trigger:'blur'}
        ],
        code:[
          {required:true,message:'验证码不能为空',trigger:'blur'}
        ],
        username:[
          {required:true,message:'请输入昵称',trigger:'blur'}
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      if (this.ruleForm.checked == false) {
        //提示
        this.$message.warning("亲爱的用户,请先勾选用户协议");
        return;
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          login({
            phone:this.ruleForm.phone,
            password:this.password,
            code:this.ruleForm.code
          }).then(res => {
            //成功回调
            if (res.data.code == 202) {
              //错误
              this.message.error(res.data.message);
            } else if (res.data.code == 200) {
              this.$message.success("登录成功");
            }
          });
        } else {
          this.$message.error("格式不正确");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    changeCode() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    },
    changesign(){
      this.sign = process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    }
    ,
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="less">
.login-container {
  display: flex;
  /* 侧轴方向 居中 */
  align-items: center;
  /* 线型渐变 */
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  /* 主轴方向 均分 */
  justify-content: space-around;
  height: 100%;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 44px;
    // 盒模型 让padding不会撑开盒子
    box-sizing: border-box;
    // 标题盒子
    .title-box {
      display: flex;
      // 上下居中
      align-items: center;
      margin-left: 48px;
      img {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .title {
        font-size: 24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #dfdfdf;
        margin-right: 12px;
        height: 28px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400;
      }
    }
    // 登录表单
    .login-form {
      padding-right: 41px;
      margin-top: 27px;
      // 栅格 验证码
      .code-col {
        height: 40px;
        img {
          width: 100%;
          height: 100%;
          // 小手手
          cursor: pointer;
        }
      }
      // 更高的文本框
      .high-input > input {
        height: 45px;
        line-height: 45px;
      }
    }
    // 表单内部的 按钮
    .login-btn {
      width: 100%;
      margin-left: 0;
    }
    .reset-btn {
      margin-top: 28px;
    }
  }
  .bg {
  }
}
</style>

<style lang='less'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  transform: translateY(74px);
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader {
  text-align: center;
}

.code-col {
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    // 小手手
    cursor: pointer;
  }
}
</style>