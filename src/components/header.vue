<template>
    <header id="header">
        <el-row>
            <el-col :span="10">
                <div>
                    <h2>设备管理中心</h2>
                </div>
            </el-col>
            <el-col :span="4">
                <div>
                    <h2>
                        <form>
                            <el-input placeholder="请输入教室名称" icon="search" v-model="value" @keyup.submite.prevent="submite()">
                            </el-input>
                        </form>
                    </h2>
                </div>
            </el-col>
            <el-col :span="4" :offset="6">
                <div>
                    <h2>
                        <el-button :plain="true" type="success" @click="goLogin">登录</el-button>
                    </h2>
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
            return {
                value: ''
            }
        },
        watch: {
            value() {
                this.$store.commit('classFilter', this.value)
            }
        },
        methods: {
            goLogin() {
                this.$router.push({ path: '/Login' });
            },
            submite() {
                console.log(12);
            }
        },
        computed: mapGetters(['filtersClass'])
    }

</script>