<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.state" placeholder="请选择">
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
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
      >
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="title" label="文章标题" width="230">
        </el-table-column>
        <el-table-column prop="thumhup" label="浏览量" width="130">
        </el-table-column>
        <el-table-column prop="viewCount" label="点赞数" width="130">
        </el-table-column>
        <el-table-column prop="categoryName" label="是否公开" width="100">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status !== 0">
              公开
            </el-tag>
            <el-tag type="danger" v-if="scope.row.status === 0">
              不公开
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.ispublic !== 0">
              审核通过
            </el-tag>
            <el-tag type="danger" v-if="scope.row.ispublic === 0">
              未审核
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="最后更新时间" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="onEdit(scope.row)"
              >查看</el-button
            >
            <el-button
              type="primary"
              @click="examine(scope.row.id)"
              v-if="scope.row.ispublic === 0"
              >审核</el-button
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
    <!-- 查看 -->
    <el-dialog title="文章详情" :visible.sync="seeShow">
      <el-form :model="seeList">
        <el-form-item label="文章标题">
          <el-input v-model="seeList.title" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="seeList.thumhup" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="点赞数">
          <el-input v-model="seeList.viewCount" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="是否公开">
          <el-tag type="warning" v-if="seeList.status !== 0">
              公开
            </el-tag>
            <el-tag type="danger" v-if="seeList.status === 0">
              不公开
            </el-tag>
        </el-form-item>
        <el-form-item label="状态">
           <el-tag type="primary" v-if="seeList.ispublic !== 0">
              审核通过
            </el-tag>
            <el-tag type="danger" v-if="seeList.ispublic === 0">
              未审核
            </el-tag>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/table.js";
import { log } from 'util';
const open = [
  {
    openCode: 0,
    openText: "禁用"
  },
  {
    openCode: 1,
    openText: "正常"
  }
];
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
      formInline: {
        user: "",
        state: ""
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
      page: {
        // 分页对象
        current: 1, // 当前页码
        size: 10, // 每页显示多少条
        total: 0 // 总记录数
      },

      query: {}, // 查询条件
      seeShow: false,
      seeList: {
        ispublic:"",
        status:"",
        thumhup:"",
        title:"",
        updateDate:"",
        viewCount:""
      }
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
    //审核
    examine(id) {
      api.examine(id).then(res=>{
        this.$message({
          message: res.message,
          type: 'success'
        });
        this.fetchData()
      })
    },
    // 添加
    onAdd() {
      if (this.addList.name === "" || this.addList.categoryName === "") {
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
    // 查看
    onEdit(item) {
      console.log(item);
      this.seeShow = true;
      this.seeList.ispublic=item.ispublic
      this.seeList.status=item.status
      this.seeList.thumhup=item.thumhup
      this.seeList.title=item.title
      this.seeList.updateDate=item.updateDate
      this.seeList.viewCount=item.viewCount
      console.log(this.seeList);
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
// .el-table .cell {
//   text-align: center;
// }
</style>
