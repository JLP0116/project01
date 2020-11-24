<template>
  <div></div>
</template>

<script>
import api from "@/api/category";
export default {
  data() {
    return {
      list: [],
      page: {
        //分页相关的
        total: 0,   //总共记录
        current:1,  //当前页面
        size:20,    //每页显示20条数据
      },
      query:{}      //查询条数
    };
  },
  created() {

  },
  mounted() {},
  methods: {
      fetchData(){
          api.getList(this.query , this.page.current , this.page.size ).then(response=>{
             this.list = response.data.records
             this.page.total= response.data.total
          })
      }
  },
};
</script>

<style scoped>
</style>
