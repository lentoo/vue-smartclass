<template>
    <div>
        <h1>登录成功</h1>
    </div>
</template>
<script>
    import axios from 'axios'
    import config from '../js/config.js'

    export default {
        //元素创建完成后触发
        created() {

            this.request();
        },
        methods: {
            //请求服务器登录接口
            request() {
                var params = "account=admin&Pwd=4a7d1ed414474e4033ac29ccb8653d9b&imei=0000"
                axios.post(config.Login, params).then(function (res) {
                    var token = res.data.AppendData;
                    localStorage.setItem('token', token);
                }.bind(this)).catch(function (err) {
                    console.log('err', err);
                })
            }
        }
    }

</script>