<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import './index.scss'
import utils from '@/tool/utils'

export default {
  data () {
    return {
      isLogin : null
    }
  },
  mounted () {
  },

}
</script>

<style>
  body {
    margin: 0px;
  }
</style>