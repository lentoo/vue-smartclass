<template>
    <div>
        <div id="class-detail" v-loading="Logging" element-loading-text="拼命加载中">
            <h1 class=".h40">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><span v-text="BuildingName"></span></el-breadcrumb-item>
                    <el-breadcrumb-item><span v-text="layerName"></span></el-breadcrumb-item>
                    <el-breadcrumb-item><span v-text="Name"></span></el-breadcrumb-item>
                </el-breadcrumb>
            </h1>
            <el-row class="detail-body">
                <el-collapse accordion v-model="activeNames">
                    <el-collapse-item title="设备列表" name="1">
                        <el-col :span="8" v-for="(item, index) in SonserList" :key="index">
                            <el-card :body-style="{ padding: '15px 15px 0 15px'}" style="margin-bottom:5px;padding-bottom:0;height:114px;margin-right:10px;">
                                <el-row>
                                    <el-col :span="5">
                                        <!-- <img :src="'/src/assets/images/'+Imgs[item.Type]" class="image" /> -->
                                        <img :src="'/src/assets/images/'+(Imgs[item.Type]!=null?Imgs[item.Type]:'default.jpg')" class="image" />
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
                                                <el-tag type="primary" v-if="item.Value!=null">
                                                    {{item.Value}}
                                                </el-tag>
                                                <el-switch v-model="item.IsOpen" on-text="打开" off-text="关闭" on-color="#13ce66" off-color="#ff4949" @change="change(ClassId,item)"
                                                    v-if="(item.Type<=5 || item.Type==12) && (item.Online=='OnLine')">
                                                </el-switch>
                                                <el-tag type="primary" v-if="item.Type>5 && item.Type<8">{{item.IsOpen?'正常':'异常'}}</el-tag>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-collapse-item>
                    <el-collapse-item title="异常设备" name="2">
                        <p v-if="SonserExcList.length==0">
                            <el-alert title="" description="当前该教室没有异常设备">
                            </el-alert>
                        </p>
                        <el-col :span="8" v-for="(item, index) in SonserExcList" :key="index">
                            <el-card :body-style="{ padding: '15px 15px 0 15px'}" style="margin-bottom:5px;padding-bottom:0;height:114px;margin-right:10px;">
                                <el-row>
                                    <el-col :span="5">
                                        <img :src="'/src/assets/images/'+Imgs[item.Type]!=null?Imgs[item.Type]:'default.jpg'" class="image" />
                                        <!-- <img :src="'/src/assets/images/default.jpg'" class="image" /> -->
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
                                                <el-tag type="primary" v-if="item.Value!=null">
                                                    {{item.Value}}
                                                </el-tag>
                                                <el-tag type="primary" v-if="item.Type>5&&item.Type<8">{{item.IsOpen?'正常':'异常'}}</el-tag>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-collapse-item>
                    <el-collapse-item title="摄像头信息" name="3">
                        <el-row>
                            <el-col :span="5">
                                <el-row>
                                    <el-card :body-style="{ padding: '10px' }">
                                        <div class="body">
                                            <object id="remote" name="remote" classid="clsid:1E125331-B4E3-4EE3-B3C1-24AD1A3E5DEB" WIDTH="320" HEIGHT="311">
                                                <strong style="color:red; font-size:20px"> 未安装插件，请<a href='http://cn-download.eyecloud.so/download/application/ipcamax.exe'>点击这里</a>下载安装</strong>
                                            </object>
                                        </div>
                                        <div style="padding: 10px;">
                                            <el-row>
                                                <div @mousedown="setAction(remote1,0,31)" @mouseup="setAction(remote1,-1,0)" style="float:left;margin-right: 20px">
                                                    <el-button type="info" size="mini" class="button">向上</el-button>
                                                </div>
                                                <div @mousedown="setAction(remote1,3,31)" @mouseup="setAction(remote1,-1,0)" style="float:left;margin-right: 20px">
                                                    <el-button type="info" size="mini" class="button">向下</el-button>
                                                </div>
                                                <div @mousedown="setAction(remote1,1,31)" @mouseup="setAction(remote1,-1,0)" style="float:left;margin-right: 20px">
                                                    <el-button type="info" size="mini" class="button">向左</el-button>
                                                </div>

                                                <div @mousedown="setAction(remote1,2,31)" @mouseup="setAction(remote1,-1,0)" style="float:left">
                                                    <el-button type="info" size="mini" class="button">向右</el-button>
                                                </div>
                                            </el-row>
                                            <el-button type="info" size="mini" class="button" @click="fullScreen(remote1)">全屏</el-button>
                                        </div>
                                    </el-card>
                                </el-row>
                            </el-col>
                            <el-col :span="5" :offset="1">
                                <el-row>
                                    <el-card :body-style="{ padding: '10px' }">
                                        <div class="body">
                                            <object id="remote1" name="remote1" classid="clsid:1E125331-B4E3-4EE3-B3C1-24AD1A3E5DEB" WIDTH="320" HEIGHT="311">
                                      <strong style="color:red; font-size:20px"> 未安装插件，请<a href='http://cn-download.eyecloud.so/download/application/ipcamax.exe'>点击这里</a>下载安装</strong>
                                    </object>
                                        </div>
                                        <div style="padding: 10px;">
                                            <el-row>
                                                <div @mousedown="setAction(remote2,0,31)" @mouseup="setAction(remote2,-1,0)" style="float:left;margin-right: 20px">
                                                    <el-button type="info" size="mini" class="button">向上</el-button>
                                                </div>
                                                <div @mousedown="setAction(remote2,3,31)" @mouseup="setAction(remote2,-1,0)" style="float:left;margin-right: 20px">
                                                    <el-button type="info" size="mini" class="button">向下</el-button>
                                                </div>
                                                <div @mousedown="setAction(remote2,1,31)" @mouseup="setAction(remote2,-1,0)" style="float:left;margin-right: 20px">
                                                    <el-button type="info" size="mini" class="button">向左</el-button>
                                                </div>

                                                <div @mousedown="setAction(remote2,2,31)" @mouseup="setAction(remote2,-1,0)" style="float:left">
                                                    <el-button type="info" size="mini" class="button">向右</el-button>
                                                </div>
                                            </el-row>
                                            <el-button type="info" size="mini" class="button" @click="fullScreen(remote2)">全屏</el-button>
                                        </div>
                                    </el-card>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </el-row>
        </div>
    </div>
    </div>
</template>
<script>
    import config from '../js/config.js'
    import { mapActions, mapGetters, mapState } from 'vuex'
    export default {
        //页面创建时触发
        mounted() {

        },
        //进入页面时触发
        activated() {
            this.remote1 = remote;
            this.remote2 = remote1;
            this.InitIpCarema(this.remote1, 'VSTA396906EZKMT', 5);
            this.InitIpCarema(this.remote2, 'VSTA396908FLVYJ', 6)
            this.Logging = true;
            this.request();
            this.time = setInterval(this.request, 90000);
            if (this.collegeName == '') {
                this.$store.commit('BuildingName', localStorage.getItem('BuildingName'))
            }
            if (this.layerName == '') {
                this.$store.commit('layerName', localStorage.getItem('layerName'))
            }
        },
        computed: mapGetters(['BuildingName', 'layerName']),
        //开始路由跳转时触发
        beforeRouteLeave: (to, from, next) => {
            next();
        },
        //离开页面时触发
        deactivated() {
            try {
                clearInterval(this.time);

                this.time = null;
                remote1.ClearDevs(); //清除网络摄像机参数
                remote2.ClearDevs(); //清除网络摄像机参数
            }
            catch (exception) {
                return;
            }

        },
        data() {
            return {
                Count: 0,
                jsondata: {},
                SonserList: [], //所有传感器
                Name: '',       //教室名称
                ClassId: '',
                Logging: false,
                Imgs: config.Imgs,
                activeNames: ['3'],
                time: {},
                SonserExcList: [],
                preActTime: 0,
                bNeedStop: false,
                remote1: {},
                remote2: {}
            }
        },
        methods: {
            request: function () {
                var classId = this.$route.params.classId;
                var params = 'classroom=' + classId
                this.$http.post(
                    config.SearchAll,
                    //config.SearchTest,
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
                        this.SonserExcList = this.jsondata.AbnormalSonserList;
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

                var url = config.Apis[parseInt(item.Type)]; //传感器类型

                var onoff = item.IsOpen ? 'close' : 'open'; //当前状态

                var params = 'classroom=' + ClassId + '&nodeAdd=' + item.Id + '&onoff=' + onoff;

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
            InitIpCarema(dev, devIP, channelId) {     //初始化摄像头数据
                let VER_AX_LOCALE = "1.1.15.174"
                let szDevIP = devIP//"VSTA396906EZKMT" //VSTA396908FLVYJ
                let nPort = 81      //端口
                let szAuthAcc = "admin", szAuthPwd = "888888"   //账号密码
                let szDevName = "网络摄像头1"    //摄像机名称
                let nDevType = 922  //设备类型
                let bInLan = 1      //whether in LAN,1:LAN, 0：WAN
                let nImgW = 100
                let nImgH = 100
                let nChannelID = channelId  //通道数，第一个通道为1，后面的依此类推
                try {
                    dev.ClearDevs(); //清除网络摄像机参数
                }
                catch (exception) {
                    return;
                }
                dev.Lan = 'cn'   //语言    cn -> chinese  en -> english
                dev.ShowOSDName = 1
                dev.Width = nImgW      //width of the window
                dev.Height = nImgH    //height of the window
                dev.ShowToolBar = 0 //显示工具栏
                dev.ShowFPS = 0
                dev.ShowRate = 0
                dev.SavePath = 'E:\\'
                dev.AddDev4(nDevType, bInLan, szDevIP, nPort, szDevName, szAuthAcc, szAuthPwd, nChannelID)
                dev.Listen = 1         // 是否监听声音
                dev.TurnImg = 0     //视频图像是否倒转。
                dev.ConnectAll();        //连接网络摄像机
                //remote.Start();
            },
            stopRec(dev) {
                dev.StopRec()
            },
            fullScreen(dev) {
                console.log(dev)
                dev.FullScreen();
            },
            //set action and send to ipcam
            setAction(dev, action, time) {
                if ((action == -1) && (!this.bNeedStop))
                    return 0;

                var now_time = new Date();
                //alert(now_time - this.preActTime);
                if ((this.preActTime > 0) && (now_time - this.preActTime < 300)) {
                    if (action == -1) {
                        setTimeout(this.StopAction, 500, dev);
                        return 0;
                    }
                    else
                        return 0;
                }

                dev.PTZ(1, 1, action, time, 0, 0);
                //Set pause time  
                this.bNeedStop = action != -1;
                this.preActTime = now_time;
            },
            StopAction(dev) {
                //	alert("a");
                dev.PTZ(1, 1, -1, 0, 0, 0);
                this.bNeedStop = false;
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

    OBJECT {
        width: 242px;
        height: 230px;
        border-radius: 5px;
    }

    .body {
        border-radius: 5px;
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