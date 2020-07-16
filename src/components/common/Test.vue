<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统测试</h3>
    <el-form-item>
      <el-input type="text" v-model="DataModel.chemicalcategory.id"
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
    <el-form-item>
    <el-input type="text" v-model="DataModel.dno"
              auto-complete="off" placeholder="删除编号"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="testAddOrUpdate">发送post请求</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="testDelete">删除测试</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="searchResultByCategory">按类别查询</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="testModifyBean">修改某个药品</el-button>
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
        chemicalno: '812000',
        dno: ''
      },
      responseResult: []
    }
  },
  mounted: function () {
    this.loadData()
  //  钩子函数：启动自执行，可以发送请求，也可以改变dom元素内容，参考books.vue里面的_this.books = resp.data
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
          .post('/deletechemical', {id: this.DataModel.dno}).then(resp => {
            if (resp && resp.status === 200) {
              console.log('delete success')
            }
          }).catch(() => {
            console.log('delete fail')
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    loadData () {
      this.$axios.get('/chemical').then(resp => {
        if (resp && resp.status === 200) {
          console.log(resp.data)
        }
      })
    },
    searchResultByCategory () {
      this.$axios
        .get('/categories/chemical?cid=' + this.DataModel.chemicalcategory.id, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            console.log(resp.data)
          }
        })
    },
    testModifyBean () {
      this.$axios
        .post('/chemical', {
          id: '10',
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
    searchResult () {
      var _this = this
      this.$axios
        .get('/search?keywords=' + this.$refs.searchBar.keywords, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data
          }
        })
    },
    deleteBook (id) {
      this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/delete', {id: id}).then(resp => {
            if (resp && resp.status === 200) {
              this.loadBooks()
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // alert(id)
    },
    editBook (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        }
      }
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
