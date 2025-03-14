<template>
  <div class="login-container">
    <!-- 头部 -->
    <div>{{ $t('sys.login') }}</div>
    <!-- 表单 -->
    <div class="login-card">
      <van-form @submit="onLogin">
        <van-cell-group inset>
          <van-field v-model="loginForm.logname" placeholder="请输入用户名" required />
          <van-field
            v-model="loginForm.password"
            placeholder="请输入密码"
            required
            :rules="passwordValidator"
          />
        </van-cell-group>
        <van-button type="primary" block round nativeType="submit">登录</van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const loginForm = ref({
  logname: '',
  password: '',
})

const passwordValidator = []

const userStore = useUserStore()
const onLogin = () => {
  userStore.login(loginForm.value)
}
</script>
<style lang='scss' scoped>
</style>
