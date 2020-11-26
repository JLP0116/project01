import requery from "@/utils/request";
export default {
    roleList(query, current = 1, size = 20) {
        return requery({
            url: `/system/role/search`,
            method: 'post',
            data: { ...query, current, size } //合并到 query 中
        })
    },
}