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
    <el-dialog center width='603px' title="用户注册" :visible.sync="dialogFormVisible">
      <el-form ref='registerForm' :model="form" :rules="dialog">
        <!-- 头像 -->
        <el-form-item prop='avatar' label="头像" :label-width="formLabelWidth">
          <el-upload
            name="image"
            class="avatar-uploader"
            :action="uploadURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="username" label="昵称" :label-width="formLabelWidth">
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
            <el-col :span="17">
              <el-input prefix-icon="el-icon-key" v-model="form.arcode" autocomplete="off"></el-input>
            </el-col>
            <el-col class="code-col" :span="6" :offset='1'>
              <img @click="changesign" :src="regCodeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="code" label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset='1'>
              <el-button @click="getMessage">{{ btnMessage }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegister">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//import axios from "axios";
import { login,sendsms,register } from "../../api/login.js";
import { setToken } from "../../utils/token.js";

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

const valdataEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("邮箱不能为空"));
  } else {
    const em = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (em.test(value) == true) {
      callback();
    } else {
      callback(new Error("邮箱格式错误"));
    }
  }
};

export default {
  name: "login",

  data() {
    return {
      
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

      dialog: {
        email: [{ required:true,validator: valdataEmail, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 11, message: "长度必须至少为6位", trigger: "change" }
        ],
        arcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入完整验证码", trigger: "blur" }
        ],
        phone: [{ required:true,validator: valdataPhone, trigger: "blur" }],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        avatar:[{ required: true, message: "请输入昵称", trigger: "change" }]
      },

      form: {
        username: "",
        password: "",
        phone: "",
        code: "",
        arcode: "",
        email: "",
        avatar:''   
      },

      //左侧间隙
      formLabelWidth: "68px",
      
      dialogFormVisible: false,

      imageUrl: "",
      //验证码图片的地址
      regCodeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      //文件上传的地址
      uploadURL : process.env.VUE_APP_BASEURL+ '/uploads',

      delayTime:0,
      btnMessage:'获取用户验证码',

      
      

      
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
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }).then(res => {
            //成功回调
            window.console.log(res)
            if (res.data.code == 202) {
   
              //错误
              this.$message.error(res.data.message);
            } else if (res.data.code == 200) {
              window.console.log(123)
              this.$message.success("登录成功");
              setToken(res.data.data.token);
              this.$router.push('/index');
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
    changesign() {
      this.regCodeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&t=" + Date.now();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);

      this.form.avatar = res.data.file_path;
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
    },

    getMessage(){
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if(reg.test(this.form.phone) == false ){
        return this.$message.error('手机号码格式不对')
      }

      if(this.form.arcode.length != 4 ){
        return this.$message.error('图像验证码不对')
      }

      if(this.delayTime === 0){
        //改成60
        this.delayTime = 60;
        //判断一些值
        const interId = setInterval(()=>{
          //递减
          this.delayTime --;
          this.btnMessage = `还剩下${this.delayTime}秒哦!`
          if(this.delayTime === 0){
            //倒计时介绍
            //清除定时器
            clearInterval(interId);
            //还原文本
            this.btnMessage = '获取用户验证码';
          }
        },1000)
      } else {
        //正在倒计时中
        return;
      }

      sendsms({
        code: this.form.arcode,
        phone: this.form.phone
      }).then(res => {
         //window.console.log(res)
         //window.console.log(this.form.arcode)
        if (res.data.code == 200) {
          this.$message.success("短信验证码是:" + res.data.data.captcha);
        }
      });
    },

    submitRegister(){
      //验证表单
      this.$refs.registerForm.validate(valid =>{
        if(valid){
          register({
            username:this.form.username,
            phone:this.form.phone,
            email:this.form.email,
            avatar:this.form.avatar,
            rcode:this.form.code,
            password:this.form.password
          }).then(res=>{
            if(res.data.code == 200){
              this.$message.success('注册成功,请登录')
              //关闭弹窗
              this.dialogFormVisible = false
            }else if(res.data.code == 201) {
              this.$message.warning(res.data.message)
            }
          })
        } else {
          this.$message.error('格式不对,请检查')
          return false;
        }
      })
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
  //transform: translateY(74px);
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

 .el-dialog__header {
    background: linear-gradient(to right, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1));
  }
  // 对话框的颜色
  .el-dialog__title {
    color: white;
  }

  el-dialog__headerbtn {
   color:white; 
  }





}
</style>

