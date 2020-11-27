<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form
      :rules="rules"
      ref="formData"
      :model="formData"
      label-width="100px"
      label-position="right"
      style="width: 400px"
      status-icon
    >
      <el-form-item label="类型：" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3" v-if="formData.parentId !== 0">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限标识：" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="请求地址：" prop="url" v-if="formData.type != 3">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="图标：" prop="icon" v-if="formData.type != 3">
        <el-input v-model="formData.icon"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number
          v-model="formData.sort"
          :min="1"
          :max="10000"
          style="width: 300px"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" size="mini"
          >确定</el-button
        >
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import api from "@/api/menu";

export default {
  props: {
    title: {
      // 弹窗的标题
      type: String,
      default: ""
    },
    // 弹出窗口，true弹出
    visible: {
      type: Boolean,
      default: false
    },
    // 提交表单数据
    formData: {
      type: Object,
      default: {}
    },

    remoteClose: Function // 用于关闭窗口
  },

  data() {
    return {
      rules: {
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入权限标识",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    // 关闭窗口
    handleClose() {
      this.$refs["formData"].resetFields();
      this.remoteClose();
    },

    // 提交表单数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formData.type === 3) {
            this.formData.url = "";
            this.formData.icon = "";
          }
          this.submitData();
        } else {
          return false;
        }
      });
    },

    async submitData() {
      let response = null;

      if (this.formData.id) {
        response = await api.update(this.formData);
      } else {
        response = await api.add(this.formData);
      }

      if (response.code === 20000) {
        this.$message({ message: "保存成功", type: "success" });
        this.handleClose();
      } else {
        this.$message({ message: "保存失败", type: "error" });
      }
    }
  }
};
</script>
