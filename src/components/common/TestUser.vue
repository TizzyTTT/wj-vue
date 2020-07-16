<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统测试</h3>
    <el-form-item>
      <el-input type="text" v-model="DataModel.id"
                auto-complete="off" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="DataModel.userno"
                auto-complete="off" placeholder="用户编号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="DataModel.username"
                auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="DataModel.realname"
                auto-complete="off" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="DataModel.orgid.id"
                auto-complete="off" placeholder="组织id"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="testAdd">添加</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="testDelete">删除</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="searchResultByCategory">按类别查询</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="testModifyBean">修改某个药品</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="deleteALot">部分删除测试</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'TestUser',
  data () {
    return {
      DataModel: {
        id: '',
        userno: 'user0001',
        username: 'hello_黎明',
        realname: '李三高',
        orgid: {
          id: '1'
        },
        userrole: 2
      },
      responseResult: []
    }
  },
  mounted: function () {
    this.loadData()
    //  钩子函数：启动自执行，可以发送请求，也可以改变dom元素内容，参考books.vue里面的_this.books = resp.data
  },
  methods: {
    testAdd () {
      this.$axios.post('/adduser', {
        id: this.DataModel.id,
        userno: this.DataModel.userno,
        username: this.DataModel.username,
        userrole: this.DataModel.userrole,
        realname: this.DataModel.realname
      })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            console.log('add user success')
          }
        })
        .catch(failResponse => {
          console.log('add user fail')
        })
    },
    testModify () {
      this.$axios.post('/modifyuser', {
        id: this.DataModel.id,
        userno: this.DataModel.userno,
        username: this.DataModel.username,
        userrole: this.DataModel.userrole,
        realname: this.DataModel.realname
      })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            console.log('add user success')
          }
        })
        .catch(failResponse => {
          console.log('add user fail')
        })
    },
    testDelete () {
      this.$axios.post('/deleteuser', {
        id: this.DataModel.id
      })
        .then(resp => {
          if (resp && resp.status === 200) {
            console.log('delete success')
          }
        }).catch(() => {
          console.log('delete fail')
        })
    },
    testQueryByNoOrName () {
      this.$axios.get('/queryByNoOrName?keywords=' + this.DataModel.queryphrase, {
      }).then(resp => {
        if (resp && resp.status === 200) {
          console.log(resp.data)
        }
      })
        .catch(() => {
          console.log('用户编号用户姓名查询失败')
        })
    },
    testQueryByOrgid () {
      this.$axios.post('/queryByOrgid', {
        orgid: this.DataModel.orgid
      }).then(resp => {
        if (resp && resp.status === 200) {
          console.log(resp.data)
        }
      }).catch(() => {
        console.log('单位编号查询失败')
      })
    }
  }
}
</script>

<style>
  #poster {
    background:url("../../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
