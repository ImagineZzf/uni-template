<template>
  <view class="select">
    <view v-if="label"
          :class="className"
          @tap="activeChange">{{label}}</view>
    <slot v-else></slot>
  </view>
</template>

<script>
// 自定义checkbox/radio
export default {
  props: {
    // 显示的文本
    label: {
      type: String,
      default: ''
    },
    // 选择器的值
    value: {
      type: String | Number,
      required: true
    },
    // 样式
    className: {
      type: String | Array,
      default: ''
    }
  },
  methods: {
    // 选择
    activeChange() {
      this.$parent.$emit('change', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
