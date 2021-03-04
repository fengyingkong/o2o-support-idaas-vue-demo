<template>
  <div class="test">
    <el-button v-if="isSuccess" class="logout" type="primary" @click="logout">退出</el-button>
    <el-form v-if="isSuccess" v-loading="loading" class="form-class" ref="form" :model="form" label-width="80px">
      <el-form-item label="URL">
        <el-input class="input-width" v-model="inputVal" clearable></el-input>
        <el-button class="margin-left" type="primary" @click="test">测试</el-button>
      </el-form-item>
      <el-form-item label="code:">
        <el-input class="input-width" v-model="form.code">
          <i slot="prefix" v-if="form.code " :class="form.code === 200000 ? 'el-input__icon el-icon-circle-check green' : 'el-input__icon el-icon-circle-close red'"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="message:">
        <el-input class="input-width" v-model="form.message"></el-input>
      </el-form-item>
      <el-form-item label="result:">
        <el-input class="input-width" type="textarea" v-model="form.result" :autosize="{ minRows: 4, maxRows: 6}" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '../../common/api'
export default {
  data() {
    return {
      inputVal: '',
      loading: false,
      isSuccess: false,
      form: {}
    }
  },

  created() {
    this.checkCookie()
  },

  methods: {
    // 日常调用接口 检查有没有cookie
    async checkCookie() {
      this.loading = true
      try {
        const res = await api.get(`http://o2o-support-dev.cas-client.devgw.yonghui.cn/v1/user`, {})
        if (res.code === 200000) {
          this.isSuccess = true
          this.form = {
            ...res,
            result: JSON.stringify(res.result)
          }
        }
      } catch (error) {
        this.form = error
        this.$message.error(error.message)
      }
      this.loading = false
    },

    // 退出
    async logout() {
      try {
        await api.get(`http://o2o-support-dev.cas-client.devgw.yonghui.cn/v1/logout`, {})
        window.location.href = 'http://o2o-support-dev.o2o-support-idaas-cas.devgw.yonghui.cn/cas/logout?service=http://o2o-support-dev.o2o-support-idaas-vue-demo.devgw.yonghui.cn'
      } catch (error) {
        this.$message.error(error.message)
      }
    },

    // 测试url
    async test() {
      if (!this.inputVal) {
        this.$message.warning('请输入URL')
        return 
      }
      this.loading = true
      try {
        this.form = {}
        const res = await api.get(`${this.inputVal}`, {})
        if (res.code === 200000) {
          this.form = {
            ...res,
            result: JSON.stringify(res.result)
          }
        }
      } catch (error) {
        this.form = error
        this.$message.error(error.message)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.test{
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  .form-class{
    height: 500px;
  }
  .logout{
    position: fixed;
    top: 20px;
    right: 20px;
  }
  .red{
    color: red
  }
  .green{
    color: green
  }
  .margin-left{
    margin-left: 50px;
  }
  .margin-top{
    margin-top: 100px;
  }
  .input-width{
    width: 500px;
  }
}
</style>