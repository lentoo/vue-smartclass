<template>
    <div>
        <h1>登录成功</h1>
    </div>
</template>
<script>
    import axios from 'axios'
    import config from '../js/config.js'

    export default {
        created() {
            this.request();
        },
        methods: {
            request() {
                console.log(config);
                var params = "account=admin&Pwd=4a7d1ed414474e4033ac29ccb8653d9b&imei=0000"
                axios.post(config.Login, params).then(function (res) {
                    var token = res.data.AppendData;
                    localStorage.setItem('token', token);
                }.bind(this)).catch(function (err) {
                    console.log(err);
                })
            }
        }
    }

</script>