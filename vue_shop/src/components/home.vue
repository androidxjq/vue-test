<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商管理平台</span>
      </div>
      <el-button @click="goOut" type="info">退出</el-button></el-header
    >
    <el-container>
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <div class="toggle_button" @click="togglecollapse">|||</div>
        <!--侧边栏菜单区-->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="lightblue"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="naveState"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconobj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + subitem.path + ''"
              v-for="subitem in item.children"
              v-bind:key="subitem.id"
              @click="saveNaveState('/' + subitem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subitem.authName }}</span>
              </template></el-menu-item
            >
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menulist: [],
      iconobj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      iscollapse: false,
      naveState: ''
    }
  },
  created () {
    this.getMenuList()
    this.naveState = window.sessionStorage.getItem('naveState')
  },
  methods: {
    goOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      } else {
        this.menulist = res.data
      }
    },
    togglecollapse () {
      console.log('togglecollapse执行了')
      this.iscollapse = !this.iscollapse
    },
    saveNaveState (value) {
      window.sessionStorage.setItem('naveState', value)
    }
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-menu-vertical-demo {
  height: 95%;
}
.el-header {
  padding-left: 5px;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-header span {
  font-size: 30px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 30px;
  > .el-menu {
    border-right: 0px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
body > .el-container {
  margin-bottom: 40px;
}
.iconfont {
  margin-right: 10px;
}
.toggle_button {
  background-color: grey;
  line-height: 24px;
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
