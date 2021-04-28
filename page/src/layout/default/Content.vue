<!--
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 16:41:34
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:29:15
 * @email: 1980738748@qq.com
 -->
<template>
  <div class="main-content">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Content',
})
export default class Content extends Vue {}
</script>

<style lang="less" scoped>
.main-content {
  padding: 65px 0 0 0;
  overflow: hidden;
}
</style>
