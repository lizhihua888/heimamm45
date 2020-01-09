<template>
  <el-dialog width="600px" title="新增学科" center :visible.sync="dialogFormVisible">
    <el-form :model="addForm" :rules="addRules" ref='addForm'>
      <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="short_name" label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="学科简介" :label-width="formLabelWidth">
        <el-input type="textarea" rows="2" v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd } from "../../../../api/subject.js";
export default {
  name: "addDialog",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",

      addForm: {
        rid: "", // 学科编号
        name: "", // 学科名称
        short_name: "", // 学科简称
        intro: "", // 学科简介
        remark: "" // 学科备注
      },

      addRules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: 'change' }],
        name: [{ required: true, message: "请输入学科编号", trigger: 'change' }]
      }
    };
  },
  
  methods: {
      submitAdd(){
          //表单效验
          //登录点击事件
          //等同于 this.$refs.ruleFrom
          this.$refs.addForm.validate(valid => {
              if(valid){
                  //this.$message.success('验证成功')
                  //调用接口
                  subjectAdd(this.addForm).then(res =>{
                      if(res.code === 200){
                          this.$message.success('新增成功')
                          //关闭对话框
                          this.dialogFormVisible = false;
                          //清空内容
                          this.$refs.addForm.resetFields();
                          this.$parent.getList();
                      } else if(res.code === 201 ){
                          //id重复
                          this.$message.error('格式不对哦,检查一下呗!')
                          return false;
                      }
                  })
              }
          })
          
      }
  },
};
</script>