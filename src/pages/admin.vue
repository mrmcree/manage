<template>
  <div class="admin">
    <el-container style="height: 100vh;background: #ffffff">
      <el-aside width="200px" style="background-color: #333">
        <el-menu :router="true" backgroundColor="#333" textColor="#fff">
          <el-submenu index="/" >
            <template slot="title"><router-link to="/admin" style="color:#fff"><i class="el-icon-menu"></i>首页</router-link></template>
          </el-submenu>
          <el-submenu index="#">
            <template slot="title"><i class="el-icon-menu"></i>待建设</template>

              <el-menu-item index="#">待建设</el-menu-item>
              <el-menu-item index="#">待建设</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>待建设</template>
            <el-menu-item index="#">待建设</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          
        
         <el-button>{{username}}</el-button>
          <el-button plain round @click='loginout'>登出</el-button>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import {getCookie,delCookie} from '../utils'
  export default {
    name: 'admin',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      loginout(){
        delCookie('userdata')
        window.reload()
      }
    },
    data() {
      return {
        enbleRoute:true,
        username:''
      };
    },
    created:function(){
      this.username=JSON.parse(getCookie('userdata')).username
    
    },
    name:'admin'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
body
  overflow-y hidden
.admin
  .el-header
    background-color: #333;
    color: #fff;
    line-height: 60px;
.el-menu
  border none
</style>