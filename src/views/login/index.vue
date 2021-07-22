<template>
  <div class="login">
    <!-- header -->
    <van-nav-bar
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- form表单 -->
    <van-form
      validate-first
      @failed="onFailed"
      @submit="onSubmit"
      :show-error="false"
      :show-error-message="false"
      ref="user-form"
    >
      <van-field
        v-model="user.mobile"
        name="用户名"
        label=""
        left-icon="manager-o"
        placeholder="用户名"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        type="text"
        name="验证码"
        label=""
        icon-prefix="toutiao"
        placeholder="验证码"
        left-icon="mima"
        class="code-form"
        :rules="formRules.code"
      >
        <template #button>
          <van-button size="small" type="default" round color="#eee" class="code" @click.prevent="sendCode">
            <span v-if="isCode">发送验证码</span>
            <van-count-down
              v-else
              :time="60 * 1000"
              format="ss s"
              @finish="isCode = true"
              class="count"
            />
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px;" class="login-btn-wrap">
        <van-button
          block
          type="info"
          native-type="submit"
          class="login-btn"
          loading-type="spinner"
          :loading="loginLoading"
          loading-text="登录中..."
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        mobile: '',
        code: '',
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /\d{6}$/, message: '请输入正确的验证码' }
        ]
      },
      isCode: true,
      loginLoading: false
    }
  },
  mounted() {
  },
  methods: {
    async onSubmit() {
      // this.formTest()
      // this.loginLoading = true
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res= await login(this.user)
        this.$store.commit('SET_TOKEN', res.data.data)
        this.$toast.success('登录成功')
        // this.loginLoading = false
        this.$router.push('/my')
      } catch(err) {
        console.log(11)
        this.$toast.fail('手机号或验证码错误');
      }
    },

    async sendCode() {
      if(!this.isCode){
        return
      } else {
        this.isCode = false
      }
      try {
        await this.$refs['user-form'].validate('用户名')
        await getCode(this.user.mobile)
      } catch(err) {
        let message = ''
        if(err && err.response && err.response.status === 429){
          message = '请不要重复获取验证码'
        } else if (err.name === '用户名') {
          message = err.message
        } else {
          message = '请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
    },

    onFailed(err) {
      if(err.errors[0]){
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .code-form {
    .code {
      .van-button__content {
        .van-button__text {
          color:#767676;
          .van-count-down {
            color:#767676;
            display: block;
            width: 60px;
          }
        }
      }
    }
  }
  .login-btn-wrap {
    margin-top: 30px !important;
  }
}
</style>