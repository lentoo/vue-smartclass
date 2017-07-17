<template>
    <div>
        <div id="main-left">
            <el-row class="tac">
                <el-col :span="24">
                    <el-menu default-active="1" class="el-menu-vertical-demo">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-menu"></i>管理中心</template>
                            <el-menu-item-group title="分组名称">
                                <el-menu-item index="1-1" @click="goClassList">教室列表
                                </el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2"><i class="el-icon-setting"></i>设置</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            goClassList() {
                this.$router.push({ path: '/classList' }); //路由跳转
            },
        }
    }

</script>