import request from "@/utils/request"
export default {
    // 分页条件查询分类列表 
    getList(query, current = 1, size = 20) {
        return request({
            url: `/article/label/search`,
            method: 'post',
            data: { ...query, current, size } // 合并成一个对象
        })
    },
    getAdd(addList) {
        var name = addList.name
        var id = addList.id
        return request({
            url: "/article/label",
            method: "post",
            data: {
                name,
                id
            }
        })
    },
    remove(id) {
        return request({
            url: "/article/label/:id",
            method: "delete",
            data: { id }
        })
    },
    // 修改
    edit(item) {
        var id = item.id
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