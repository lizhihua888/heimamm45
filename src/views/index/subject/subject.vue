<template>
  <div class="subject-container">
    <el-card class="card-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="small" v-model="formInline.user" placeholder></el-input>
        </el-form-item>

        <el-form-item label="学科名称" prop="name">
          <el-input class="normal" v-model="formInline.user" placeholder></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input class="small" v-model="formInline.user" placeholder></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.region" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchSubject">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="clearQuery">清除</el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.addDialog.dialogFormVisible = true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="card-main">
      <!-- 自定义表格模板 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="180"></el-table-column>

        <el-table-column label="学科编号" prop="rid" width="180"></el-table-column>

        <el-table-column label="学科名称" prop="name" width="180"></el-table-column>

        <el-table-column label="简称" prop="short_name" width="180"></el-table-column>

        <el-table-column label="创作者" prop="username" width="180"></el-table-column>

        <el-table-column label="创建日期" prop="create_time" width="180">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime}}
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- 编辑  -->
            <el-button @click="enterEdit(scope.row)" size="mini" type="text">编辑</el-button>
            <!-- 状态变更 scope.row 这是一整行数据 全部传到了 changeStatus这个方法  -->
            <el-button
              @click="changeStatus(scope.row)"
              size="mini"
              type="text"
            >{{ scope.row.status == 0 ? '禁用' : '启用' }}</el-button>
            <!-- 删除 -->
            <el-button @click="removesubject(scope.row)" size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->

      <el-pagination
        class="Mypagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- dialog 新增对话框 -->
    <addDialog ref="addDialog"></addDialog>

    <editDialog ref='editDialog'></editDialog>
  </div>
</template>

<script>
import addDialog from "./components/addDialog";
import editDialog from "./components/editDialog";

import {
  subjectList,
  subjectStatus,
  subjectRemove
} from "../../../api/subject";

export default {
  name: "chart",

  components: {
    addDialog,editDialog
  },

  created() {
    //获取列表数据
    this.getList();
  },

  data() {
    return {
      //行内表单的数据
      formInline: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      },

      //表格的数据
      tableData: [],

      //默认的页码
      page: 1,
      //页容量选项
      pageSizes: [2, 4, 6, 8],
      //页容量
      size: 2,
      //总条数
      total: 0
    };
  },

  methods: {
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    handleDelete(index, row) {
      window.console.log(index, row);
    },

    //每一页的数据量 改变 (页容量)
    handleSizeChange(val) {
      //window.console.log(`每页 ${val} 条`);
      this.size = val;
      //会到第一页
      this.page = 1;
      //通过新的页面去调用数据
      this.getList();
    },

    //页码
    handleCurrentChange(current) {
      //window.console.log(`当前页: ${val}`);
      //把页码保存起来
      this.page = current;
      //通过新的页面去调用数据
      this.getList();
    },

    searchSubject() {
      this.page = 1;
      this.getList();
      
    },

    clearQuery() {
      this.$refs.formInline.resetFields();
      this.getList();
    },

    getList() {
      subjectList({
        //使用定义好的数据,方便后期维护
        //页码
        page: this.page,
        //页容量
        limit: this.size,

        //将formInline合并进来
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.items;
        
        //赋值 总条数
        this.total = res.data.pagination.total;
      });
    },

    enterEdit(item) {
      window.console.log(item);
     this.$refs.editDialog.dialogFormVisible = true;

      //设置编辑框的数据
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    },

    changeStatus(item) {
      subjectStatus({
        id: item.id
      }).then(res => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.getList();
        }
      });
    },

    removesubject(item) {
      //弹框
      this.$confirm("你真的要把他删掉吗？哭唧唧", "友情提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确认
          subjectRemove({
            id: item.id
          }).then(res => {
              window.console.log(res);
            // window.console.log(res)
            if (res.code === 200) {
              this.$message.success("删除成功了哦");
              //判断这一页是否已经没有数据了
              if(this.tableData.length == 1){
                //上一页
                this.page--;
                //如果=0 变为1
                //this.page = this.page==0?1:this.page
                if(this.page == 0){
                  this.page = 1;
                }
              }
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
  }
};
</script>

<style  lang='less'>
.subject-container {
  .small {
    width: 100px;
  }

  .normal {
    width: 150px;
  }

  .Mypagination {
    text-align: center;
    margin-top: 30px;
  }
}

.el-dialog__header {
  background: linear-gradient(
    to right,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
}

.card-header {
  margin-top: 20px;
}

.card-main {
  margin-top: 21px;
}
</style>