const Host='http://localhost:50287';
const Lamp=Host+'/Home/SetLamp';
const Login=Host+'/Logon'
const SearchAll = Host+'/Home/SearchAll'
const SearchAllClass=Host + '/Classes/SearchAllClass'
const Door = Host+ '/Home/SetDoor'
const Apis=['',Lamp,Door]
const Imgs=['','Lamp.jpg','door.jpg','curtain.jpg','window.jpg','','rthw.jpg','co2.png']
export default {
    Host,
    Lamp,
    Login,
    SearchAll,
    Door,
    Apis,
    Imgs,
    SearchAllClass
}