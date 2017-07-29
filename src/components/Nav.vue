<template>
    <div>
        <div id="main-left">
            <el-row class="tac">
                <el-col :span="24">
                    <el-menu default-active="1-1" class="el-menu-vertical-demo" :router="startRouter">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-menu"></i>管理中心</template>
                            <el-menu-item index="/classList" path="/classList" v-focus="{server:currentServer}">
                                教室列表
                            </el-menu-item>
                            <el-menu-item index="/controlCenter" path="/controlCenter" v-focus="{server:currentServer}">
                                一键控制
                            </el-menu-item>
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
        created() {
            this.request()
        },
        data() {
            return {
                //开启路由模式
                startRouter: true,
                //当前的url路径
                currentServer: ''
            }
        },
        methods: {
            request() {
                //获取当前的url路径
                this.currentServer = this.$route.path;
            }
        },
        watch: {    //监测 $route 状态
            '$route': 'request'
        }
    }

</script>