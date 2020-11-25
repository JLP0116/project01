<template>
  <div class="form">
    <!-- 表格 -->
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="title" label="广告标题" width="180">
        </el-table-column>
        <el-table-column prop="name" label="广告图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="advertUrl" label="广告连接" width="180">
        </el-table-column>
        <el-table-column prop="name" label="状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | filterStatus">
              {{ scope.row.status ? "正常" : "禁用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="180">
        </el-table-column>
        <el-table-column prop="name" label="操作"> 
           <el-button>编辑</el-button>
           <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
     />
  </div>
</template>

<script>
import api from "@/api/form.js";
const status = [
  {
    statusCode: 0,
    statusText: "禁用"
  },
  {
    statusCode: 1,
    statusText: "正常"
  }
];
export default {
  data() {
    return {
      status,
      list: [],
      page: {
        // 分页对象
        current: 1, // 当前页码
        size: 10, // 每页显示多少条
        total: 0 // 总记录数
      }
    };
  },
  mounted() {
    this.formList();
  },
  methods: {
    formList() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      api
        .getList(this.formInline, this.page.current, this.page.size)
        .then(response => {
          console.log(response);
          // 列表数据
          loading.close();
          this.list = response.data.records;
          this.page.total = response.data.total;
        });
    },

     handleSizeChange(val) {
      this.page.size = val;
      this.formList();
    },

    // 当页码改变后触发到此方法，val 是当前点击（或输入）的那个页码，
    handleCurrentChange(val) {
      this.page.current = val;
      this.formList();
    }
  },
  filters: {
    filterStatus(status) {
      return status == 0 ? "danger" : "success";
    }
  }
};
</script>
<style lang="scss">
.form {
  padding: 10px 20px;
  img {
    height: 60px;
  }
  .el-table .cell{
    text-align: center;
  }
}
</style>
