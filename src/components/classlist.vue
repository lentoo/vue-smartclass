<template>
    <div>
        <div id="class-list" v-loading="Logging" element-loading-text="拼命加载中">
            <h1 class=".h40">
                教室列表
            </h1>
            <div class="class-body">
                <el-row>
                    <el-tree :data="Collegess" :props="defaultProps" :accordion="true" @node-click="handleNodeClick" :filter-node-method="filterNode"
                        ref="tree2">
                    </el-tree>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import config from '../js/config.js'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        mounted() {
            this.request();
        },
        computed: mapGetters(['filtersClass']),
        watch: {
            filtersClass(val) {
                this.$refs.tree2.filter(val);
            }
        },
        data() {
            return {
                jsondata: {},
                Colleges: [],
                Name: '',
                Logging: true,
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'Name'
                },
                Collegess: []
            }
        },
        methods: {
            // 树节点过滤
            filterNode(value, data) {
                if (!value) return true;
                return data.Name.indexOf(value) !== -1;
            },
            //请求数据
            request() {
                this.Logging = true;
                var params = 'Access=' + localStorage.token
                this.$http.post(
                    config.SearchAllClass,
                    params
                ).then(function (res) {
                    this.Logging = false;
                    this.Colleges = res.data;
                    this.Collegess = this.Init(this.Colleges);
                }.bind(this)).catch(function (err) {
                    console.log(err);
                })
            },
            //初始化树节点数据
            Init(data) {
                var list = [];
                for (var i in data) {
                    var floors = [];
                    for (var floor in data[i].Floors) {
                        var rooms = [];
                        for (var key in (data[i].Floors[floor].ClassRooms)) {
                            rooms.push(data[i].Floors[floor].ClassRooms[key]);
                        }
                        floors.push({ children: rooms, Name: data[i].Floors[floor].Name });
                    }
                    list.push({ children: floors, Name: data[i].Name });
                }
                return list;
            },
            //树节点点击事件
            handleNodeClick(data) {
                if (data.ClassNo != null) { //点击的是不是具体教室
                    this.$store.commit('collegeName', data.CollegeName);
                    this.$store.commit('layerName', data.LayerName);
                    this.$router.push({
                        path: '/classList/classDetail/' + data.Id,
                    })
                }
            }
        }
    }

</script>
<style scoped>
    .image {
        width: 100%;
        max-width: 320px;
        max-height: 311px;
        display: block;
    }
</style>