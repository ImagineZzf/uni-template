<template>
  <view class="iconBtn">
    <image class="iconBtn-icon"
           :src="icon"></image>
    <view class="iconBtn-text"
          v-if="text">{{ text }}
    </view>
  </view>
</template>

<script>
// 图标按钮
export default {
  props: {
    // 图标路径
    icon: {
      type: String,
      required: true
    },
    // 按钮文案
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.iconBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  &-icon {
    width: 44rpx;
    height: 46rpx;
  }
  &-text {
    margin-top: 5rpx;
    font-size: 18rpx;
  }
}
</style>
