<template>
    <div>
        <Authorize
            :image="authorizeInfo.image"
            :title="authorizeInfo.title"
            :authorities="authorizeInfo.authorities"></Authorize>
    </div> 
</template>
<script>
import Authorize from '@/components/Authorize'
import config from '@/config'
export default {
  components: {
    Authorize
  },
  data () {
    return {
      authorizeInfo: {}
    }
  },
  mounted () {
    this.authorizeInfo = config.authorizeInfo
  }
}
</script>
<style lang="scss" scoped>

</style>
