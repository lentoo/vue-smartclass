<template>
    <div>
        <div id="class-detail" v-loading="Logging" element-loading-text="拼命加载中">
            <h1 class=".h40">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><span v-text="collegeName"></span></el-breadcrumb-item>
                    <el-breadcrumb-item><span v-text="layerName"></span></el-breadcrumb-item>
                    <el-breadcrumb-item><span v-text="Name"></span></el-breadcrumb-item>
                </el-breadcrumb>
            </h1>
            <el-row class="detail-body">
                <el-row>
                    <el-collapse accordion v-model="activeNames">
                        <el-collapse-item title="设备列表" name="1">
                            <el-col :span="8" v-for="(item, index) in SonserList" :key="index">
                                <el-card :body-style="{ padding: '15px 15px 0 15px'}" style="margin-bottom:5px;padding-bottom:0;height:114px;margin-right:10px;">
                                    <el-row>
                                        <el-col :span="5">
                                            <img :src="'/src/assets/images/'+Imgs[item.Type]" class="image" />
                                        </el-col>
                                        <el-col :span="18" :offset="1">
                                            <el-row>
                                                <el-col :span="12"><span>在线状态：</span>
                                                    <el-tag :type="item.Online=='OnLine'?'success':'danger'">{{item.Online}}</el-tag>
                                                </el-col>
                                                <el-col :span="12"> <span>编号：</span>
                                                    <el-tag type="primary">{{item.Id}}</el-tag>
                                                </el-col>
                                            </el-row>
                                            <el-row class="switch">
                                                <el-col :span="12"><span>设备名称：</span>
                                                    <el-tag type="primary">{{item.Name}}</el-tag>
                                                </el-col>
                                                <el-col :span="12">
                                                    <span>状态：</span>
                                                    <el-tag type="primary" v-if="item.value!=null">
                                                        {{item.value}}
                                                    </el-tag>
                                                    <el-switch v-model="item.IsOpen" on-text="打开" off-text="关闭" on-color="#13ce66" off-color="#ff4949" @change="change(ClassId,item)"
                                                        v-if="item.Type<=5 || item.Type==12">
                                                    </el-switch>
                                                    <el-tag type="primary" v-if="item.Type>5&&item.Type<8">{{item.IsOpen?'正常':'异常'}}</el-tag>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-col>
                        </el-collapse-item>
                        <el-collapse-item title="环境信息" name="2">
                            <el-col :span="5" v-for="(item, index) in Analog" :key="index" :offset="index%4==0?0:index > 0 ? 1 : 0" class="text item">
                                <el-card class="box-card">
                                    <div class="text item">
                                        <span>设备名称：</span>
                                        <el-tag type="primary">{{item.Name}}</el-tag>
                                        <span>状态：</span>
                                        <el-tag :type="item.Online=='OnLine'?'success':'danger'">{{item.Online}}</el-tag>
                                    </div>
                                    <div><span>设备信息：</span>
                                        <el-tag type="primary">{{item.value}}</el-tag>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-collapse-item>
                    </el-collapse>
                </el-row>
            </el-row>
        </div>
    </div>
    </div>
</template>
<script>
    import config from '../js/config.js'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        created() {
            this.Logging = true;
            this.request();
            this.time = setInterval(this.request, 90000);
        },
        computed: mapGetters(['collegeName', 'layerName']),
        beforeRouteLeave: (to, from, next) => {
            next();
        },
        destroyed() {
            clearInterval(this.time);
            this.time = null;
            console.log(111);
        },
        data() {
            return {
                Count: 0,
                jsondata: {},
                SonserList: [], //所有传感器
                Digitals: [],   //数字量传感器
                Analog: [],     //模拟量传感器
                Name: '',       //教室名称
                ClassId: '',
                token: '',
                Logging: true,
                Imgs: config.Imgs,
                activeNames: ['2'],
                time: {},

            }
        },
        methods: {
            request: function () {
                var token = localStorage.token;
                this.token = token;
                var classId = this.$route.params.classId;
                var params = 'classroom=' + classId + '&Access=' + token;
                this.$http.post(
                    config.SearchAll,
                    //'/data.json',
                    params
                ).then(function (res) {
                    if (res.data.AppendData != null) {
                        this.jsondata = res.data.AppendData;
                        this.Count = res.data.Count;
                        this.SonserList = this.jsondata.SonserList;
                        this.Name = this.jsondata.Name;
                        this.ClassId = this.jsondata.Id;
                        this.Logging = false;
                        this.Init(this.SonserList);
                    } else {
                        this.$message({
                            message: res.data.Message,
                            showClose: true,
                            duration: 1500,
                            type: 'error'
                        });
                        this.Logging = false;
                    }
                }.bind(this)).catch(function (err) {
                    this.$message({
                        message: err.data.Message,
                        showClose: true,
                        duration: 1500,
                        type: 'error'
                    })
                }.bind(this));
            },
            change(ClassId, item) {     //改变传感器状态
                var token = localStorage.token;
                var url = config.Apis[parseInt(item.Type)];
                var onoff = item.IsOpen ? 'close' : 'open';
                var params = 'classroom=' + ClassId + '&nodeAdd=' + item.Id + '&onoff=' + onoff + '&Access=' + token
                this.$http.post(url,
                    params
                ).then(function (res) {
                    if (res.data.ResultCode == 0) {
                        this.$message({
                            message: '操作成功',
                            showClose: true,
                            duration: 1500,
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '操作失败',
                            showClose: true,
                            duration: 1500,
                            type: 'error'
                        });
                        item.IsOpen = !item.IsOpen
                    }
                }.bind(this)).catch(function (err) {
                    console.log(err)
                });
            },
            Init(SonserList) {
                this.Digitals = [];
                this.Analog = [];
                for (var item in SonserList) {
                    if (SonserList[item].Type <= 8) {
                        this.Digitals.push(SonserList[item]);
                    } else {
                        this.Analog.push(SonserList[item]);
                    }
                }
            }

        }
    }

</script>
<style scoped>
    .image {
        width: 100%;
        border-radius: 5px;
        margin-right: 5px;
        display: block;
    }

    .bl-1 {
        border-left: 1px solid #ccc;
        padding-left: 5px;
    }

    #class-detail {
        padding: 0 40px;
        background-color: #f5f5f5;
    }

    #class-detail h1 {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .h40,
    .h40 a {
        display: block;
        height: 40px;
        width: 100%;
        line-height: 40px;
    }

    .el-card {
        min-width: 200px;
        cursor: pointer;
        padding-bottom: 10px;
    }

    .class-body {
        padding: 10px 0;
    }

    .switch-left {
        float: left;
    }

    .switch {
        margin-bottom: 0;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 0 0 18px 0;
    }

    .box-card {
        width: 100%;
    }
</style>