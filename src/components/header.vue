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
                        <!-- <el-input placeholder="请输入教室名称" icon="search" v-model="value" @keyup.enter.native="goClass(value)">
                        </el-input> -->
                        <el-autocomplete width="200px" v-model="value" :fetch-suggestions="querySearchAsync" placeholder="请输入教室名称或编号" @select="handleSelect"></el-autocomplete>
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
    import config from '../js/config.js'
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
            querySearchAsync(queryString, cb) {
                if (queryString) {
                    this.$http.get(
                        config.SearchClassListByNameOrNo + '?name=' + queryString,
                    ).then(function (res) {
                        cb(res.data)
                    }).catch(function (err) {
                        console.log('err', err)
                    })
                }
            },
            handleSelect(item) {
                this.$router.push({ path: '/classList/classDetail/' + item.F_RoomNo });
            }
        },
        computed: mapGetters(['filtersClass'])
    }

</script>