import request from "@/utils/request"

export default{
    // 分页的条件查询
    getList(query,current = 1 , size = 20){
       return request ({
           url:`/article/category/search`,
           method:"post",
           data:{
               ...query,
               current,
               size
           }
       })
    }
}