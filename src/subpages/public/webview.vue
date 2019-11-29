<template>
  <web-view :src="url"></web-view>
</template>

<script>
// webview
export default {
  data() {
    return {
      url: ''
    }
  },
  onLoad(option) {
    this.url = JSON.parse(option.link)
  }
};
</script>

<style lang="scss" scoped></style>
