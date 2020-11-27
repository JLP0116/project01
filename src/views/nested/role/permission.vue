<template>
    <el-dialog :title="title" :visible.sync="visible" width="500px"
    :before-close="handleClose">
        <el-form ref="formData" v-loading="loading" label-width="80px">
            <el-tree
                ref="tree"
                :data="menuList"
                show-checkbox
                node-key="id"
                :props="{children: 'children', label: 'name'}"
                accordion
                :default-checked-keys="menuIds">
            </el-tree>

            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" size="mini">确定</el-button>
                <el-button size="mini" @click="handleClose">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>

import menuApi from '@/api/menu'
import roleApi from '@/api/role'

  export default {

    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        remoteClose: Function,

        roleId: null 
    },

    data() {
      return {

        menuList: [], 
        loading: false, 
        menuIds: []
      };
    },

    watch: {
        visible(val) {
            if(val) {
                this.getMenuList()
            }
        }
    },

    methods: {

        getMenuList() {
            this.loading = true
            menuApi.getList( {} ).then(response => {
                this.menuList = response.data
                this.getMenuIdsByRoleId()
            })
            this.loading = false
        },
        async getMenuIdsByRoleId() {
            const {data} = await roleApi.getMenuIdsByRoleId(this.roleId)
            this.menuIds = data
        },

        submitForm(formName) {
           const checkedMenuIds = this.$refs.tree.getCheckedKeys()
           roleApi.saveRoleMenu(this.roleId, checkedMenuIds ).then(response => {
               if(response.code === 20000) {
                   this.$message({message: '分配权限成功', type: 'success'})
                   this.handleClose()
               }else {
                   this.$message({message: '分配权限失败', type: 'error'})
               }
           })
        },
        handleClose() {
            this.menuList = []
            this.menuIds = []
            this.remoteClose()
        }
    }
  };
</script>