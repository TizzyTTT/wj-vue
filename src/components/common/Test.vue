<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统测试</h3>
    <el-form-item>
      <el-input type="text" v-model="DataModel.chemicalcategory"
                auto-complete="off" placeholder="类别"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="DataModel.chemicalname"
                auto-complete="off" placeholder="药品名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="DataModel.danwei"
                auto-complete="off" placeholder="单位"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="DataModel.chemicalno"
                auto-complete="off" placeholder="药品编号"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="testDelete">发送post请求</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'Test',
  data () {
    return {
      DataModel: {
        chemicalcategory: {
          id: '1'
        },
        chemicalname: '锌粉',
        danwei: 'ml',
        chemicalno: '770004'
      },
      responseResult: []
    }
  },
  methods: {
    testAddOrUpdate () {
      this.$axios
        .post('/chemical', {
          chemicalcategory: this.DataModel.chemicalcategory,
          chemicalname: this.DataModel.chemicalname,
          danwei: this.DataModel.danwei,
          chemicalno: this.DataModel.chemicalno
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
          }
        })
        .catch(failResponse => {
        })
    },
    testDelete () {
      this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/deletechemical', {id: 3}).then(resp => {
            if (resp && resp.status === 200) {
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
