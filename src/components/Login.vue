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
                axios.get(config.Login).then(function (res) {
                    var token = res.data.AppendData;
                    localStorage.setItem('token',token);
                }.bind(this)).catch(function(err){
                    console.log(err);
                })
            }
        }
    }

</script>