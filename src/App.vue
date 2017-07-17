<template>
  <div id="app">
    <SmartHeader></SmartHeader>
    <main>
      <el-row>
        <el-col :span="3">
          <SmartNav></SmartNav>
        </el-col>
        <el-col :span="21">
          <transition name="slide-down">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
  import SmartHeader from './components/header.vue'
  import SmartNav from './components/Nav.vue'
  export default {
    components: {
      SmartHeader,
      SmartNav
    },
    data() {
      return {
      }
    },
    methods: {

    }
  }

</script>

<style>
  #header {
    line-height: 50px;
    background-color: #20a0ff;
    max-height: 100px;
    min-height: 50px;
    width: 100%;
    border-radius: 4px;
    padding-left: 15px;
    color: #fff;
  }

  #header .el-row {
    margin-bottom: 0;
  }

  .h40,
  .h40 a {
    display: block;
    height: 40px;
    width: 100%;
    line-height: 40px;
  }

  .border2 {
    border: 2px solid #ccc;
  }

  .center {
    text-align: center;
    margin: 0 auto;
  }

  .br5 {
    border-radius: 5px
  }

  .el-row {
    margin-bottom: 20px;
  }

  .slide-down-enter-active,
  .slide-down-leave-active {
    opacity: .5;
    transition: .5s all ease-in;    
    transform: translate3d(1000px, 0, 0);
  }

  .slide-down-enter,
  .slide-down-leave {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
</style>