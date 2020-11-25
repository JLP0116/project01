import request from "@/utils/request"
export default {
    // 分页条件查询分类列表 
    getList(formInline, current = 1, size = 20) {
        return request({ // Promise
            url: `/article/article/search`,
            method: 'post',
            data: { // {name: '前端', status: 1, current: current, size: size}
                ...formInline,
                current,
                size
            }
        })
    },
    // 添加
    getAdd(addList) {
        var name = addList.name
        var status = addList.status
        var sort = addList.sort
        var remark = addList.remark
        return request({
            url: "/article/category",
            method: "post",
            data: {
                name,
                status,
                sort,
                remark,
            }
        })
    },
    remove(id) {
        return request({
            url: `/article/article/${id}`,
            method: "delete",
        })
    },
    //审核
    examine(id){
      return request({
        url:`/article/article/audit/success/${id}`,
        method:"get"
      })
    },
    // 修改
    edit(item) {
        var id =item.id
        var name = item.name
        var status = item.status
        var sort = item.sort
        var remark = item.remark
        return request({
            url: "/article/category",
            method: "put",
            data: {
                id,
                name,
                status,
                sort,
                remark,
            }
        })
    }
}