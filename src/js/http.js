import axios from 'axios'
import config from './config'
var $http = {
    Actuator: function (ClassId, Item) {
        var token = localStorage.token;
        var url = config.Apis[parseInt(item.Type)];
        var onoff = item.isOpen ? 'close' : 'open';
        item.isOpen = !item.isOpen;
        axios.get(url, {
            params: {
                classroom: ClassId,
                nodeAdd: item.Id,
                onoff: onoff,
                Access: token
            }
        }).then(function(res){
            return res;
        });
    },
    SearchAll: function (ClassId) {
        var token = localStorage.token;
        var url = config.SearchAll;
        
        axios.get(url,{
            params:{
                classroom:ClassId,
                Access:token
            }
        }).then(function(res){
            return res;
        }.bind(this))
    }
}

export default {
    $http
}