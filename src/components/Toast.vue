<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export const useToastEffect = () => {
  const toastData = reactive({
    showToastFlag: false,
    toastMessage: ''
  })
  const { showToastFlag, toastMessage } = toRefs(toastData)
  // 弹窗显示
  const showToast = (message) => {
    toastData.showToastFlag = true
    toastData.toastMessage = message
    // 三秒后消失
    setTimeout(() => {
      toastData.showToastFlag = false
      toastData.toastMessage = ''
    }, 2000)
  }
  return { showToastFlag, toastMessage, showToast }
}

export default {
  props: ['message']
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';
.toast{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem;
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: $bgColor;
}
</style>
