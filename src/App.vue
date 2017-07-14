<template>
  <div id="app">
    <header id="header">
      <el-row>
        <el-col :span="12">
          <div>
            <h2>设备管理中心</h2>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <h2>
              <form>
                <el-input placeholder="请输入教室名称" icon="search">
                </el-input>
              </form>
            </h2>
          </div>
        </el-col>
        <el-col :span="4" :offset="4">
          <div>
            <h2>
              <el-button :plain="true" type="success" @click="goLogin">登录</el-button>
            </h2>
          </div>
        </el-col>
      </el-row>
    </header>
    <main>
      <el-row>
        <el-col :span="3">
          <div id="main-left">
            <el-row class="tac">
              <el-col :span="24">
                <el-menu default-active="1" class="el-menu-vertical-demo">
                  <el-submenu index="1">
                    <template slot="title"><i class="el-icon-menu"></i>管理中心</template>
                    <el-menu-item-group title="分组名称">
                      <el-menu-item index="1-1" @click="goClassList">教室列表
                      </el-menu-item>
                      <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                      <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                      <template slot="title">选项4</template>
                      <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-menu-item index="2"><i class="el-icon-setting"></i>设置</el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="21">
          <router-view></router-view>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {

      }
    },
    methods: {
      goClassList() {
        this.$router.push({ path: '/classList' }); //路由跳转
      },
      goLogin(){
        this.$router.push({ path: '/Login' });
      }
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
</style>