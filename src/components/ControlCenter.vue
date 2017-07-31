<template>
    <div id="control-center">
        <h1>
            控制中心
        </h1>
        <div class="body">
            <el-menu default-active="0" class="el-menu-vertical-demo" :unique-opened="uniqueOpened">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-menu"></i>按楼栋控制</template>
                    <el-menu-item-group>
                        <el-menu-item :index="Math.random()*1000+''" v-for="(val,i) in jsonData" :key="i" @click="goBuildingControl(val)">
                            {{val.Name}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-star-on"></i>按楼层控制</template>
                    <el-submenu :index="Math.random()*1000+''" v-for="(val,i) in jsonData" :key="i">
                        <template slot="title">
                            {{val.Name}}
                        </template>
                        <el-menu-item :index="Math.random()*1000+''" v-for="(v,index) in jsonData[i].Floors" :key="index" @click="goLayerControl(v,val)">
                            {{v.Name}}
                        </el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>
<script>
    import config from '../js/config.js'
    export default {
        mounted() {
            this.request();
        },
        data() {
            return {
                regions: [{
                    'name': '按楼栋控制'
                }, {
                    'name': '按楼层控制'
                }],
                jsonData: {},
                uniqueOpened: true  //	是否只保持一个子菜单的展开

            };
        },
        methods: {
            request() {
                var _this = this;
                this.$http.post(
                    config.SearchAllClass       //请求所有教室数据
                ).then(function (res) {
                    _this.jsonData = res.data;
                }).catch(function (err) {
                    console.log('err', err);
                });
            },

            goBuildingControl(item) { //触发楼栋选中事件                                                
                var name = item.Name;
                this.$router.push({
                    path: '/controlCenter/controlDetail', query: {
                        Name: name
                    }
                })
            },
            goLayerControl(children, parent) { //触发楼层选中事件
                this.$router.push({
                    path: '/controlCenter/controlDetail', query: {
                        Name: parent.Name,
                        floorName: children.Name
                    }
                })
            }
        }
    };

</script>
<style scoped>
    .body {
        padding: 10px 0;
    }
</style>