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
          ref="id_card"
          v-model="loginForm.id_card"
          placeholder="身份证"
          name="id_card"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="name">
        <span class="svg-container"></span>
        <el-input
          ref="name"
          v-model="loginForm.name"
          placeholder="用户名"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="passwords">
        <span class="svg-container"></span>
        <el-input
          :key="passwordType"
          ref="passwords"
          v-model="loginForm.passwords"
          :type="passwordType"
          placeholder="密码"
          name="passwords"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100px;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >创建
      </el-button>
    </el-form>
  </div>
</template>

<script>
import axios from '../api/index'
export default {

  name: 'UserCreate',
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
        name: '',
        id_card: '',
        passwords: ''
      },
      loginRules: {
        name: [
          {required: true, trigger: 'blur', validator: validateUsername}
        ],
        passwords: [
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
          axios.post('api/users/create_user/', this.loginForm)
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
