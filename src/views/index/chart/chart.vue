<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="学科编号">
        <el-input v-model="formInline.user" placeholder></el-input>
      </el-form-item>
      <el-form-item label="学科名称">
        <el-input v-model="formInline.user" placeholder></el-input>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input v-model="formInline.user" placeholder></el-input>
      </el-form-item>
      <el-form-item label="搜索">
        <el-select v-model="formInline.region" placeholder="请选择状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">清除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="onSubmit">新增学科</el-button>
      </el-form-item>
    </el-form>

    <!-- 自定义表格模板 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope>
          <i></i>
          <span style="margin-left: 10px">1</span>
        </template>
      </el-table-column>

      <el-table-column label="学科编号" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学科名称" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.mc }}</span>
        </template>
      </el-table-column>

      <el-table-column label="简称" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.jc }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创作者" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.cp }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">启用</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "chart",
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
      currentPage4: 4
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

<style >
  .pagination {
    text-align: center;
  }
</style>