<template>
  <view :class="['layouts', layoutsClass]">
    <view class="layouts-headerbox"
          :style="{height: header && headerType === 'default' ? `${statusBarHeight + height}px` : ''}"
          v-if="header">
      <template v-if="headerType === 'default'">
        <view :class="['layouts-header',headerShadow ? 'layouts-header__shadow' : '']"
              :style="{
                paddingTop: header ? `${statusBarHeight}px` : '',
                height: header ? `${height}px` : '',
                lineHeight: header ? `${height}px` : ''
              }">
          <view v-if="headerIcon !== 'none'"
                class="layouts-header__left"
                :style="{
                  top: header ? `${statusBarHeight}px` : '',
                  height: header ? `${height}px` : ''
                }"
                @tap="handleClickLeftBtn">
            <image v-if="headerIcon === 'home'"
                   src="/static/images/icon_gohome.png"></image>
            <image v-else
                   src="/static/images/icon_back.png"></image>
          </view>
          <view class="layouts-header__title">{{ title }}</view>
        </view>
      </template>
      <slot v-else
            name="header"></slot>
    </view>
    <view v-else-if="headerBorder"
          class="layouts-header__border"></view>
    <slot></slot>
    <view :class="['layouts-footerbox',footerBoxClass]"
          v-if="footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script>
// 自定义页面布局
import { reLaunch, goBack } from '@utils/index'
export default {
  props: {
    // 是否显示头部，若false，则只显示阴影部分
    header: {
      type: Boolean,
      default: false
    },
    // 是否显示底部，
    footer: {
      type: Boolean,
      default: false
    },
    // 是否是默认头部
    headerType: {
      type: String,
      default: 'default',
      validator: value => {
        return ['default', 'custom'].includes(value)
      }
    },
    // 头部底边框
    headerBorder: {
      type: Boolean,
      default: true
    },
    // 头部阴影
    headerShadow: {
      type: Boolean,
      default: true
    },
    // 布局样式
    layoutsClass: {
      type: String,
      default: ''
    },
    // 头部左侧按钮
    headerIcon: {
      type: String,
      default: 'back',
      validator: value => {
        return ['home', 'back', 'none'].includes(value)
      }
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 点击返回的页数
    backDelta: {
      type: Number,
      dafault: 1
    },
    // 底部样式
    footerBoxClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      statusBarHeight: 0, // 状态栏高度
      height: 44 // 导航栏高度
    }
  },
  created() {
    if (this.header) {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight
      // 微信、百度、头条、qq小程序支持获取右上角胶囊按钮布局信息
      //#ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
      const menuInfo = uni.getMenuButtonBoundingClientRect()
      const headerHeight =
        (menuInfo.top - this.statusBarHeight) * 2 + menuInfo.height
      this.height = headerHeight
      //#endif
    }
  },
  methods: {
    // 点击左上角按钮
    handleClickLeftBtn() {
      if (this.headerIcon === 'back') {
        // 返回
        goBack(this.backDelta)
      } else {
        // 跳转首页
        reLaunch(`/pages/index/index`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layouts {
  background: $uni-bg-color;
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: $uni-bg-color;
    &__border {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      height: 2rpx;
      background: $uni-border-color;
    }
    &__shadow {
      box-shadow: 0rpx 1rpx 20rpx 0rpx rgba(195, 195, 195, 0.38);
    }
    &__left {
      position: absolute;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 38rpx;
      image {
        width: 36rpx;
        height: 36rpx;
      }
    }
    &__title {
      margin: 0 auto;
      font-size: 36rpx;
      color: $uni-color-primary;
      font-weight: 500;
      text-align: center;
      @include ellipsis(250rpx);
    }
  }
}
</style>
