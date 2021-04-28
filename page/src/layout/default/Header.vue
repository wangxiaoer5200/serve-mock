<!--
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 17:00:05
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:29:23
 * @email: 1980738748@qq.com
 -->
<template>
  <div class="main-header">
    <h2 class="logo-text">{{ logoText }}</h2>
    <div class="url_wrap">
      <el-input
        v-model="testUrl"
        placeholder="请输入地址"
        size="mini"
      ></el-input>
      <el-button size="mini" @click="changeUrl">地址更换</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { AppModule } from '@/store/modules/app';

@Component({
  name: 'Header',
})
export default class Header extends Vue {
  private logoText: string = '本地MOCK数据生成系统';
  private testUrl: string =
    localStorage.getItem('url') || `${process.env.VUE_APP_BASE_TARGET}`;
  changeUrl() {
    localStorage.setItem('url', this.testUrl);
    window.location.reload();
    // AppModule.saveBaseUrlFN(this.testUrl);
  }
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 65px;
  padding: 0 12px 0 0;
  overflow: hidden;
  line-height: 65px;
  vertical-align: middle;
  background-image: linear-gradient(130deg, #1b65b9 11%, #0f4894);
  .logo-text {
    width: 300px;
    margin-left: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: #fff;
  }
  .url_wrap {
    width: 400px;
    .el-input {
      width: 250px;
      margin-right: 20px;
    }
  }
}
</style>
