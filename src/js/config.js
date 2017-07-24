const Host = 'http://localhost:8080/api';
const Login = Host + '/Logon'
const Lamp = Host + '/Home/SetLamp';
const SearchAll = Host + '/Home/SearchAll'
const SearchAllClass = Host + '/Classes/SearchAllClass'
const Door = Host + '/Home/SetDoor'
const Curtain = Host + '/Home/SetCurtain'
const Window = Host + '/Home/SetWindow'
const ControlBuildingEquipment = Host + '/Home/ControlBuildingEquipment'
const ControlFloorEquipment = Host+'/Home/ControlFloorEquipment'
const SearchBuildingAllRoomEquipmentInfo = Host+'/Home/SearchBuildingAllRoomEquipmentInfo'
const Apis = ['', Lamp, Door, Curtain, Window]
const Imgs = ['', 'Lamp.jpg', 'door.jpg', 'curtain.jpg', 'window.jpg', '', 'rthw.jpg', 'co2.png']
export default {
    Host,
    Lamp,
    Login,
    SearchAll,
    Door,
    Apis,
    Imgs,
    SearchAllClass,
    ControlBuildingEquipment,
    ControlFloorEquipment,
    SearchBuildingAllRoomEquipmentInfo
}