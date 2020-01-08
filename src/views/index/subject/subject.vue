<template>
  <div class=subject-container>
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
            <el-option label='启用' value="1"></el-option>
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

        <el-table-column label="学科编号" width="180"></el-table-column>

        <el-table-column label="学科名称" width="180"> </el-table-column>

        <el-table-column label="简称" width="180"></el-table-column>

        <el-table-column label="创作者" width="180"></el-table-column>

        <el-table-column label="创建日期" width="180"></el-table-column>

        <el-table-column prop="status" label="状态" >
          <template slot-scope="scope">
            <span v-if='scope.row.status == 0'>禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text" @click="changeStatus(scop.row)">{{ scope.row.status == 0 ? '禁用' : '启用' }}</el-button>
            <el-button size="mini" type='text'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      
        <el-pagination
        class="Mypagination"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      
    </el-card>

    <!-- dialog 新增对话框 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
import addDialog from "./components/addDialog";
//import {subjectAdd,subjectList} from '../../../api/subject';


export default {
  name: "chart",


  components: {
    addDialog
  },

  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },

      tableData: [
        {
          date: "QD001",
          name: "启用",
          address: "上海市普陀区金沙江路 1518 弄",
          cp: "张三",
          jc: "前端",
          mc: "前端学科"
        }
      ],

      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      //dialog 对话框
      dialogTableVisible: false,
      dialogFormVisible: false,
      
      formLabelWidth: "120px",

      
    };
  },

  methods: {
    onSubmit() {
      window.console.log("submit!");
    },
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    handleDelete(index, row) {
      window.console.log(index, row);
    },

    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style  lang='less'>
.subject-container{
    .small {
        width: 100px;
    }

    .normal{
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