<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 左侧 -->
      <div class="left">
        <i @click="collapse = !collapse " class="icon el-icon-s-fold"></i>
        <img class="logo" src="../../assets/index_logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <img class="avatar" :src="userInfo.avatar" alt />
        <span class="username">{{ userInfo.username }},您好</span>
        <el-button @click="logout" size="small" type="primary">退出</el-button>
      </div>
    </el-header>

    <el-container>
      <!-- 左侧 -->
      <el-aside class="my-side" width="auto">
        <el-menu :default-active="$route.path" router   class="el-menu-vertical-demo" :collapse="collapse">
          <el-menu-item index="/index/chart">
            <!-- e-charts -->
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { info, logout } from "../../api/login.js";
import { removeToken } from "../../utils/token.js";

export default {
  name: "index",
  data() {
    return {
      userInfo: {},
      collapse: false
    };
  },
  created() {
    info().then(res => {
      this.userInfo = res.data.data;

      //头像没有基地址 自己拼接
      this.userInfo.avatar =
        process.env.VUE_APP_BASEURL + "/" + this.userInfo.avatar;
    });
  },

  methods: {
    logout() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            if (res.data.code === 200) {
              removeToken();
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          //点击取消
        });
    }
  }
};
</script>

<style lang='less'>
.index-container {
  height: 100%;
  .my-header {
    //background: yellow;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 22px;
      }

      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }

      .title {
        margin-right: 11px;
        font-size: 22px;
        width: 92px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }

      .username {
        font-size: 14px;
        color: #636363;
        margin-right: 38px;
      }
    }
  }

  .my-side {
    //background: #0094ff;
  }

  .my-main {
    //background-color: pink;
  }

  //导航菜单的 样式
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>