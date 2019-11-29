<template>
  <view class="authbtn"
        v-if="authStatus">
    <view :class="btnClass"
          @tap="handleClick">
      <template v-if="text">{{text}}</template>
      <slot v-else></slot>
    </view>
  </view>
  <view v-else
        class="authbtn">
    <button :class="btnClass"
            open-type="getUserInfo"
            lang="zh_CN"
            @getuserinfo="onGetUserInfo">
      <template v-if="text">{{text}}</template>
      <slot v-else></slot>
    </button>
  </view>
</template>

<script>
// 权限按钮
import { mapState } from 'vuex'
import { SET_AUTH_STATUS, SET_USER_INFO } from '@store/contants'
import { setStorage } from '@utils/index'
import { USER_INFO } from '@utils/contants'
export default {
  props: {
    // 自定义按钮样式
    btnClass: {
      type: String,
      default: ''
    },
    // 按钮文案，为空，则可自定义按钮内容
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('user', ['authStatus'])
  },
  methods: {
    // 授权获取用户信息
    onGetUserInfo(e) {
      const result = e.detail.errMsg.split(' ')[0].split(':')[1]
      // 若同意授权，则改变状态
      if (result.includes('ok')) {
        // 全局vuex存一份
        this.$store.commit(`user/${SET_AUTH_STATUS}`, 1)
        this.$store.commit(`user/${SET_USER_INFO}`, e.detail.userInfo)
        // 本地缓存存一份（启动时，需要重新获取并放入vuex）
        setStorage(e.detail.userInfo, USER_INFO)
      }
    },
    // 点击按钮回调
    handleClick() {
      this.$emit('onTap')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
