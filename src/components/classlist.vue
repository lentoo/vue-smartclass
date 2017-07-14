<template>
    <div>
            <div id="class-list" v-loading="Logging" element-loading-text="拼命加载中">
                <h1 class=".h40">
                    教室列表
                </h1>
                <div class="class-body">
                    <el-row>
                        <el-tree :data="Collegess" :props="defaultProps" :accordion="true" @node-click="handleNodeClick">
                        </el-tree>
                    </el-row>
                </div>
            </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import config from '../js/config.js'
    export default {
        created() {
            this.request();
        },
        data() {
            return {
                currentDate: new Date().toLocaleString(),
                activeNames: 'abc',
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
            };

        },
        methods: {
            goClass() {
                this.$router.push({ path: '/classList/classDetail' })   //路由跳转
            },
            request() {
                this.Logging = true;
                axios.get(//'/data.json'
                    config.SearchAllClass,
                    {
                        params: {
                            Access: localStorage.token
                        }
                    }
                ).then(function (res) {
                    // console.log(res.data)
                    this.Logging = false;
                    this.Colleges = res.data;
                    this.Collegess = this.Init(this.Colleges);
                }.bind(this)).catch(function (err) {
                    console.log(err);
                })
            },
            Init(data) {
                var list = [];
                //  console.log(data[0].Floors[0])
                for (var i in data) {
                    var floors = [];
                    //console.log(data[i].Floors[0].ClassRooms)
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
            handleNodeClick(data) {
                if (data.ClassNo != null) { //点击的是不是具体教室
                    console.log(data);
                    this.$router.push({ path: '/classList/classDetail/' + data.Id })
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