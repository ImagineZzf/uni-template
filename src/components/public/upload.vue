<template>
  <view class="upload">
    <view class="upload-preview"
          v-for="(item,index) in value"
          :key="index">
      <image :src="item"
             mode="aspectFill"
             class="image"
             @tap="handlePreviewImage(item)"></image>
      <icon class="icon"
            type="clear"
            size="20"
            @tap="handleDeleteImage(index)" />
    </view>
    <view v-if="value.length < limit"
          class="upload-select"
          @tap="handleChooseImage"></view>
  </view>
</template>

<script>
// 上传组件
import { chooseImage, previewImage } from '@utils/index'
export default {
  props: {
    // 待上传的列表数据
    value: {
      type: Array,
      default: []
    },
    // 可以选择图片的数量
    limit: {
      type: Number,
      default: 9
    },
    // 是否可以预览
    preview: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 选择图片
    handleChooseImage() {
      chooseImage({
        count: this.limit - this.value.length,
        sizeType: ['compressed']
      })
        .then(res => {
          const list = [
            ...this.value,
            ...res.tempFilePaths
          ]
          this.$emit('update:value', list)
        })
        .catch(err => {

        })
    },
    // 预览图片
    handlePreviewImage(data) {
      if (!this.preview) {
        return
      }
      previewImage(data, this.value)
    },
    // 删除图片
    handleDeleteImage(index) {
      let list = [...this.value]
      list.splice(index, 1)
      this.$emit('update:value', list)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  margin-bottom: 15rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  &-preview {
    position: relative;
    margin: 0 20rpx 20rpx 0;
    width: 170rpx;
    height: 170rpx;
    .image {
      width: 170rpx;
      height: 170rpx;
    }
    .icon {
      position: absolute;
      top: -10rpx;
      right: -10rpx;
      z-index: 2;
    }
  }
  &-select {
    position: relative;
    margin: 0 20rpx 20rpx 0;
    width: 170rpx;
    height: 170rpx;
    border: 2rpx dashed $uni-border-color__one;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: $uni-bg-color-gray;
      transform: translate(-50%, -50%);
    }
    &::before {
      width: 55rpx;
      height: 6rpx;
    }
    &::after {
      width: 6rpx;
      height: 55rpx;
    }
  }
}
</style>
