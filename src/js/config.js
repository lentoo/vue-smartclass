const Host = 'http://localhost:50287/api';       //服务地地址
const Login = Host + '/Logon'                   //登录接口
const Lamp = Host + '/Home/SetLamp';            //控制灯接口
const SearchAll = Host + '/Home/SearchAll'      //查询某个教室设备信息接口
const SearchTest =Host +'/Home/SearchTest'      
const SearchAllClass = Host + '/Classes/SearchAllClass'     //查询所有教室信息接口
const Door = Host + '/Home/SetDoor'             //控制门接口
const Curtain = Host + '/Home/SetCurtain'       //控制窗帘接口
const Window = Host + '/Home/SetWindow'         //控制窗户接口
const AirConditon = Host+'/Home/SetAirConditioning' //控制空调接口

const ControlBuildingEquipment = Host + '/Home/ControlBuildingEquipment'    //按楼栋控制设备接口
const ControlFloorEquipment = Host + '/Home/ControlFloorEquipment'          //按楼层控制设备接口
const SearchBuildingAllRoomEquipmentInfo = Host + '/Home/SearchBuildingAllRoomEquipmentInfo'    //按楼栋查询所有教室设备信息接口
const SearchClassByNameOrNo = Host +'/Classes/SearchClassByNameOrNo' //查询教室接口
const SearchClassListByNameOrNo = Host + '/classes/SearchClassListByNameOrNo' //模糊查询教室列表
const Apis = ['', Lamp, Door, Curtain, Window,'','','','','','','',AirConditon] //导出 Api 接口
const Imgs = [null, 'Lamp.jpg', 'door.jpg', 'curtain.jpg', 'window.jpg', null, 'rthw.jpg', 'co2.png',null,null,null,null,'air.jpg'] // 导出传感器图片
export default {
    Login,
    SearchAll,
    SearchTest,
    Apis,
    Imgs,
    SearchAllClass,
    ControlBuildingEquipment,
    ControlFloorEquipment,
    SearchBuildingAllRoomEquipmentInfo,
    SearchClassByNameOrNo,
    SearchClassListByNameOrNo
}