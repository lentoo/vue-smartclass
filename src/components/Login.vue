<template>
    <div>
        <h1>{{LoginResult}}</h1>
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
        data() {
            return {
                LoginResult: ''
            }
        },
        methods: {

            //请求服务器登录接口
            request() {
                let params = "account=admin&Pwd=4a7d1ed414474e4033ac29ccb8653d9b&imei=0000"
                axios.post(config.Login, params).then(function (res) {
                    let token = res.data.AppendData;
                    localStorage.setItem('token', token);
                    this.LoginResult = '登录成功';
                }.bind(this)).catch(function (err) {
                    this.LoginResult = '登录异常,' + err;
                    console.log('err', err);
                })
            }
        }
    }

</script>