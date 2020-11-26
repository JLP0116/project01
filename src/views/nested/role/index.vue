<template>
  <div class="role">
    <!-- 表单查询 -->
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="query.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        <el-button  size="default" icon="el-icon-refresh">重置</el-button>
        <el-button type="primary" size="default" @click="" icon="el-icon-circle-plus-outline">新增</el-button>
        
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="listData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="排序" align="center" width="50">
      </el-table-column>
      <el-table-column prop="name" align="center" label="角色名称">
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-button type="primary">权限分配</el-button>
        <el-button type="success">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/role";
export default {
  data() {
    return {
      listData: [],
      query: {}
    };
  },
  created() {
    this.roleList();
  },
  mounted() {},
  methods: {
    roleList() {
      api.roleList().then(res => {
        console.log(res);
        this.listData = res.data.records;
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    onSubmit() {
      console.log("查询");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.role {
  padding: 10px 20px;
}
</style>
