<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.state" filterable placeholder="请选择">
          <el-option
            v-for="item in status"
            :key="item.statusCode"
            :label="item.statusText"
            :value="item.statusCode"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
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
        <el-table-column prop="name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="180">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | filterStatus">
              {{ scope.row.status ? "正常" : "禁用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
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
    <el-dialog title="新增分类" :visible.sync="addShow">
      <el-form :model="addList">
        <el-form-item label="分类名称">
          <el-input v-model="addList.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addList.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="addList.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addList.remark" autocomplete="off"></el-input>
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
        <el-form-item label="分类名称">
          <el-input v-model="editList.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editList.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="editList.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editList.remark" autocomplete="off"></el-input>
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
import api from "@/api/tree.js";
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
      // 新增弹窗
      addShow: false,
      status,
      addList: {
        name: "",
        status: "",
        sort: "",
        remark: ""
      },
      formInline: {
        user: "",
        state: ""
      },
      // 编辑内容
      editShow: false,
      editList: {
        name: "",
        status: "",
        sort: "",
        remark: "",
        id: ""
      },
      list: [],
      page: {
        // 分页对象
        current: 1, // 当前页码
        size: 10, // 每页显示多少条
        total: 0 // 总记录数
      },
    };
  },
  mounted() {
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
        .getList(this.formInline, this.page.current, this.page.size)
        .then(response => {
          console.log(response);
          // 列表数据
          loading.close();
          this.list = response.data.records;
          this.page.total = response.data.total;
        });
    },
    onSubmit() {
      this.size=1;
      this.fetchData()
    },
    // 添加
    onAdd() {
      if (
        this.addList.name === "" ||
        this.addList.status === "" ||
        this.addList.sort === ""
      ) {
        const h = this.$createElement;
        this.$notify({
          message: h(
            "i",
            { style: "color: teal" },
            "分类名称、排序和状态不能为空！"
          )
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
      this.editList.status = item.status;
      this.editList.sort = item.sort;
      this.editList.remark = item.remark;
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
  },
  filters: {
    filterStatus(status) {
      return status == 0 ? "danger" : "success";
    }
  }
};
</script>
<style lang="scss">
.el-table .cell {
  text-align: center;
}
</style>
