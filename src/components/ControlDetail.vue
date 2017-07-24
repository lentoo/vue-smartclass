<template>
    <div id="control-detail">
        <h1 class=".h40">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><span v-text="collegeName"></span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="floorName!=''"><span v-text="floorName"></span></el-breadcrumb-item>
                <!--  <el-breadcrumb-item><span v-text="Name"></span></el-breadcrumb-item> -->
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
                                        <img :src="'/src/assets/images/'+Imgs[1]" class="image" />
                                    </el-col>
                                    <el-col :span="18" :offset="1">
                                        <el-row>
                                            <el-col :span="12"><span>设备名称：</span>
                                                <el-tag type="primary">{{item.Name}}</el-tag>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="6"><span>控制：</span></el-col>
                                            <el-col :span="18">
                                                <el-button type="info" size="small" @click="allControl(item,'open')">全部打开</el-button>
                                                <el-button type="danger" size="small" @click="allControl(item,'close')">全部关闭</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-collapse-item>
                    <el-collapse-item title="异常设备" name="2">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="className" label="教室名称" width="180">
                            </el-table-column>
                            <el-table-column prop="classNo" label="教室编号" width="180">
                            </el-table-column>
                            <el-table-column prop="equiId" label="设备编号" width="180">
                            </el-table-column>
                            <el-table-column prop="equiName" label="设备名称" width="180">
                            </el-table-column>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button type="info" size="small">试着打开</el-button>
                                    <el-button type="info" size="small">试着关闭</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </el-row>
        </el-row>
    </div>
</template>
<script>
    import config from '../js/config.js'
    export default {
        mounted() {
            this.collegeName = this.$route.query.Name
            this.floorName = this.$route.query.floorName
            this.Init();
            this.request();
        },

        data() {
            return {
                collegeName: '',
                activeNames: ['1'],
                Imgs: config.Imgs,
                SonserList: [], //传感器列表
                jsondata: [],   //请求数据
                floorName: '',
                tableData: []    //表格数据
            }
        },
        methods: {
            //初始化传感器可控制设备
            Init() {
                this.SonserList.push({
                    Name: '灯',
                    Type: 1,
                });
                this.SonserList.push({
                    Name: '门',
                    Type: 2
                })
                this.SonserList.push({
                    Name: '窗帘',
                    Type: 3
                })
                this.SonserList.push({
                    Name: '窗户',
                    Type: 4
                })
                this.SonserList.push({
                    Name: '空调',
                    Type: 12
                })
            },
            //请求所有楼栋设备信息
            request() {
                var token = localStorage.token
                var params = 'buildingName=' + this.collegeName + '&Access=' + token
                var self = this
                this.$http.get(
                    '/data1.json'
                    //config.SearchBuildingAllRoomEquipmentInfo
                    , params
                ).then(function (res) {
                    self.jsondata = res.data
                    self.InitTableData(self.jsondata)
                }).catch(function (err) {
                    console.log('err', err)
                })
            },
            //控制开关
            allControl(item, onoff) {

                var token = localStorage.token;

                let floorName = this.floorName != null ? this.floorName : '';
                let api = config.ControlBuildingEquipment;
                var params = 'buildingName=' + this.collegeName
                if (floorName != '') {
                    api = config.ControlFloorEquipment
                    params += '&floorName=' + floorName
                }
                params += '&equipmentType=' + item.Type + '&onoff=' + onoff + '&Access=' + token;
                var self = this;

                this.$http.post(
                    api,
                    params
                ).then(function (res) {
                    self.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }).catch(function (err) {
                    console.log(err);
                    self.$message.error('操作异常，请刷新重试');
                })
            },
            //格式化表格数据
            InitTableData(data) {
                console.log(data)
                for (var key in data) {
                    for (var index in data[key].AppendData.SonserList) {    //教室
                        var cn = data[key].AppendData;
                        console.log(cn);
                        console.log(data[key].AppendData.SonserList[index])
                        var sonser = data[key].AppendData.SonserList[index]
                        this.tableData.push({
                            className: cn.Name,
                            classNo: cn.ClassNo,
                            equiId: sonser.Id,
                            equiName: sonser.Name
                        })
                    }
                }
            }
        }
    }

</script>
<style>
    .image {
        width: 100%;
        border-radius: 5px;
        margin-right: 5px;
        display: block;
    }

    .h40,
    .h40 a {
        display: block;
        height: 40px;
        width: 100%;
        line-height: 40px;
    }

    #control-detail {
        padding: 0 40px;
        background-color: #f5f5f5;
    }

    #control-detail h1 {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .detail-body {
        padding: 10px 0;
    }
</style>