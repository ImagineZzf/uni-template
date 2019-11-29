<template>
  <view class="group">
    <slot></slot>
  </view>
</template>

<script>
// 自定义checkbox/radio group
export default {
  props: {
    // 已选择的值
    value: {
      type: String | Number | Array,
      required: true
    }
  },
  mounted() {
    this.$on('change', this.changeValue)
  },
  methods: {
    changeValue(val) {
      let newValue = this.value
      // 如果是数组(为多选)
      if (Array.isArray(newValue)) {
        const index = newValue.indexOf(val)
        if (index === -1) {
          // 如果没有，则加入
          newValue.push(val)
        } else {
          newValue.splice(index, 1)
        }
      } else {
        newValue = val
      }
      this.$emit('update:value', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
