<script>
import { getStorage } from '@utils/index'
import { USER_INFO } from '@utils/contants'
import { SET_AUTH_STATUS, SET_USER_INFO } from '@store/contants'
export default {
  onLaunch: function () {
    const userInfo = getStorage(USER_INFO)
    if (userInfo) {
      // 若本地缓存已经有用户信息，则无需再授权
      this.$store.commit(`user/${SET_AUTH_STATUS}`, 1)
      this.$store.commit(`user/${SET_USER_INFO}`, userInfo)
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
</style>
