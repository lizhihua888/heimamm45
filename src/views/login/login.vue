<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="../../assets/M.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <div class="demo-input-suffix">
        <el-input class="input1" placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="input1"></el-input>
        <el-input class="input1" placeholder="请输入密码" v-model="input" prefix-icon="el-icon-lock"  show-password></el-input>
        <el-input class="input" placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input2"></el-input>
        <el-radio class="radio" v-model="radio" label="1">我已阅读同意</el-radio>
         <el-button class="btn" type="primary">登录</el-button>
          <el-button class="btn" type="primary">注册</el-button>
      </div>
    </div>
    <img class="bg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>
<script>
export default {
  name: "login",

  data() {
    return {
      input: "",
      input1: "",
      input2: "",
      radio:'1'
    };
  }
};
</script>
<style lang="less">
.login-container {
  display: flex;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  align-items: center;
  justify-content: space-around;

  .left {
    width: 478px;
    height: 550px;
    background-color: border-box; //内减模型
    background-color: #f5f5f5;
    padding-top: 44px;
    box-sizing: border-box;

    .title-box {
      display: flex;
      margin-left: 48px;
      align-items: center;

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

    .input1 {
          width: 394px;
          height: 45px;
          margin: 25px 41px 0px 44px;

        }

    .input {
        width: 284px;
          height: 44px;
          margin-left: 42px;
          margin-right: 152px;
          margin-top:25px ;
    }
    
    .btn {
        width: 394px;
        height: 40px;
        margin: 25px 40px 0px;
    }

    .radio {
        left: 40px;
    }
  }
}
</style>