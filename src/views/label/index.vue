<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="标签名称">
        <el-input v-model="query.name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-select v-model="query.categoryName" filterable placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery" icon="el-icon-search"
          >查询</el-button
        >
        <el-button @click="onReset" icon="el-icon-refresh">重置</el-button>
        <el-button
          type="primary"
          @click="addShow = true"
          icon="el-icon-circle-plus-outline"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <template>
      <el-table
        :data="list"
        border
        style="width: 100%;text-align:center;"
        stripe
        height="600"
      >
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="标签名称" width="230">
        </el-table-column>
        <el-table-column prop="categoryName" label="分类名称" width="400">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="onEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="onRemoce(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
    <!-- 新增弹窗 -->
    <el-dialog title="新增标签" :visible.sync="addShow">
      <el-form :model="addList">
        <el-form-item label="标签名称">
          <el-input v-model="addList.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input
            v-model="addList.categoryName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="onAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑内容" :visible.sync="editShow">
      <el-form :model="editList">
        <el-form-item label="标签名称">
          <el-input v-model="editList.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input
            v-model="editList.categoryName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="onEditx">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/label.js";
export default {
  data() {
    return {
      // 新增弹窗
      addShow: false,
      addList: {
        name: "",
        categoryName: "",
        sort: "",
        remark: ""
      },
      // 编辑内容
      editShow: false,
      editList: {
        name: "",
        categoryName: "",
        sort: "",
        remark: "",
        id: ""
      },
      list: [],
      listx: [],
      page: {
        // 分页对象
        current: 1, // 当前页码
        size: 10, // 每页显示多少条
        total: 0 // 总记录数
      },

      query: {
        name:"",
        categoryName:""
      }, // 查询条件
      options:[]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取数据
    fetchData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      api
        .getList(this.query, this.page.current, this.page.size)
        .then(response => {
          console.log(response);
          // 列表数据
          loading.close();
          this.list = response.data.records;
          this.listx = response.data.records;
          this.page.total = response.data.total;
          this.options=[]
          this.list.forEach(item=>{
            this.options.push(item.categoryName)
          });
        });
    },
    onSubmit() {
      console.log("submit!");
    },
    onQuery() {
      this.size=1
      this.fetchData()
    },
    // 添加
    onAdd() {
      if (this.addList.name === "" || this.addList.categoryName === "") {
        this.$notify({
          title: "提示",
          message: "分类名称、排序和状态不能为空!",
          duration: 2000
        });
      } else {
        this.addShow = false;
        api.getAdd(this.addList).then(res => {
          this.$message({
            message: "新增成功",
            type: "success"
          });
        });
      }
    },
    //重置
    onReset() {
      this.fetchData();
    },
    // 删除
    onRemoce(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.remove(id).then(res => {
            this.$message({
              message: res.message,
              type: "warning"
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑
    onEdit(item) {
      this.editShow = true;
      this.editList.name = item.name;
      this.editList.categoryName = item.categoryName;
      this.editList.id = item.id;
      console.log(item);
    },
    onEditx() {
      api.edit(this.editList).then(res => {
        console.log(res);
        this.$message({
          message: res.message,
          type: "success"
        });
        this.editShow = false;
        this.fetchData();
      });
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.fetchData();
    },

    // 当页码改变后触发到此方法，val 是当前点击（或输入）的那个页码，
    handleCurrentChange(val) {
      this.page.current = val;
      this.fetchData();
    }
  }
};
</script>
<style lang="scss">
.el-table .cell {
  text-align: center;
}
</style>
