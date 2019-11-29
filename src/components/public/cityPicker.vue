<template>
  <picker mode="region"
          @change="bindRegionChange"
          :value="region"
          :custom-item="customItem">
    <slot></slot>
  </picker>
</template>

<script>
// 城市选择组件
import { getCity } from "@utils/common";
export default {
  props: {
    // 选择器的值
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      region: ["全部", "全部", "全部"],
      customItem: "全部"
    };
  },
  methods: {
    // 选择城市
    bindRegionChange(e) {
      const { nowplace, province, city, area } = getCity(e.detail.value);
      this.$emit('update:value', nowplace)
      this.$emit('regionChange', {
        nowplace, province, city, area
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
