<!--
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 16:40:23
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:29:08
 * @email: 1980738748@qq.com
 -->
<template>
  <div>
    <Header />
    <Content />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Header from './default/Header.vue';
import Content from './default/Content.vue';
@Component({
  components: {
    Header,
    Content,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style></style>
