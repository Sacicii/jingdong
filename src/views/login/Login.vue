<template>
    <div class="wrapper">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
      <div class="wrapper__input">
        <input type="text" class="wrapper__input__content" placeholder="请输入用户名" v-model="username">
      </div>
      <div class="wrapper__input">
        <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password">
      </div>
      <div class="wrapper__login-button" @click="handleLogin">登录</div>
      <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
      <Toast v-if="showToastFlag" :message='toastMessage' />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 登录
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const res = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      console.log(res)
      if (res?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        // 登录失败提示
        showToast('登录失败')
      }
    } catch (e) {
      // 请求失败提示
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup () {
    const { showToastFlag, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()
    // 注册
    return {
      handleLogin,
      handleRegister,
      showToastFlag,
      toastMessage,
      username,
      password
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
.wrapper{
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img{
    display: block;
    width: .66rem;
    height: .66rem;
    margin: 0 auto .4rem auto;
  }
  &__input{
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #f9f9f9;
    border: .01rem solid rgba(0, 0, 0, .1);
    border-radius: .06rem;
    &__content{
      line-height: .48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontColor;
      &::placeholder{
        color: $content-notice-fontColor;
      }
    }
  }
  &__login-button{
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    font-size: .16rem;
    text-align: center;
    color: $bgColor;
    background: $btn-bgColor;
    border-radius: .04rem;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, .32);
  }
  &__login-link{
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontColor;
  }
}
</style>
