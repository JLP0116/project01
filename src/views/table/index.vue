<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="remart" label="备注"></el-table-column>
      <el-table-column prop="status" label="状态" width="160"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">默认按钮</el-button>
          <el-button type="danger" size="mini">危险按钮</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import api from "@/api/category";
export default {
  data() {
    return {
      list: [],
      page: {
        //分页相关的
        total: 0, //总共记录
        current: 1, //当前页面
        size: 20, //每页显示20条数据
      },
      query: {}, //查询条数
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    fetchData() {
      api
        .getList(this.query, this.page.current, this.page.size)
        .then((response) => {
          this.list = response.data.records;
          this.page.total = response.data.total;
        });
    },
  },
};
</script>
