<!--
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 16:11:45
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:28:41
 * @email: 1980738748@qq.com
 -->
<template>
  <el-dialog width="60%" title="预览" :visible.sync="dialogVisible">
    <el-row :gutter="20">
      <el-col :span="12">
        <h2 style="font-size: 14px;">MOCK模板</h2>
        <pre>{{ preTempJson }}</pre>
      </el-col>
      <el-col :span="12">
        <h2 style="font-size: 14px;">MOCK数据</h2>
        <pre>{{ preDataJson }}</pre>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PreviewDialog extends Vue {
  @Prop() private visible!: boolean;
  @Prop() private preTempJson!: string;
  @Prop() private preDataJson!: string;
  // computed
  get dialogVisible(): boolean {
    return this.visible;
  }
  set dialogVisible(visible: boolean) {
    this.$emit('update:visible', visible);
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__body {
    max-height: 600px !important;
    padding: 0 20px;
    overflow: auto;
  }
}
pre {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
}
</style>
