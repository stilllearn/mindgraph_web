<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <span class="svg-container"></span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container"></span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <el-checkbox v-model="checked" @change="showPwd">显示密码</el-checkbox>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100px;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录
      </el-button>
      <el-button type="primary" style="margin-left:30px;width:100px;margin-bottom:30px;"
                 @click="dialogVisible=true">忘记密码
      </el-button>
      <el-dialog title="密码找回" :visible.sync="dialogVisible" class="pwd-dialog">
        <el-form-item label="用户名" style="width: 280px;margin-top:20px">
          <el-input v-model="id_card"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" style="width: 280px;margin-top:10px">
          <el-input v-model="email"></el-input>
        </el-form-item>

        <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="ChangePsw">确 定</el-button>
                    </span>
      </el-dialog>
      <!--        <el-form-item>-->
      <!--            <router-link :to="{ path:'/register/StudentRegisterList'}" style="font-size: 12px">招生公告</router-link>-->
      <!--        </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('The password can not be less than 3 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {required: true, trigger: 'blur', validator: validateUsername}
        ],
        password: [
          {required: true, trigger: 'blur', validator: validatePassword}
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log(valid)
          console.log(this)
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({path: this.redirect || '/'})
              this.loading = false
            })
            .catch((err) => {
              const errorType = err.response && err.response.status.toString()[0]
              if (errorType === '4') {
                this.$message.error('用户名或密码错误')
              } else if (errorType === '5') {
                this.$message.error('服务器出错，请稍后再试')
              }
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>

<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
  }

  .login-container form {
    width: 500px;
    height: 300px;
    padding: 20px 20px 20px 20px;
    background-color: #FFFFFF;
  }

</style>
