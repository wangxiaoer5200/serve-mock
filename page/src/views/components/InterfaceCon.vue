<!--
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 16:06:25
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:30:43
 * @email: 1980738748@qq.com
 -->
<template>
  <div>
    <el-row :gutter="60">
      <el-col :span="12">
        <el-form ref="form" :model="interForm" label-width="80px" size="mini">
          <el-form-item label="名称">
            <el-input v-model="interForm.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="interForm.url">
              <template slot="prepend">{{ pathName }}</template>
            </el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="interForm.method" placeholder="请选择请求类型">
              <el-option
                v-for="(item, index) in METHOD_LIST"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态码">
            <el-select v-model="interForm.status" placeholder="请选择状态码">
              <el-option
                v-for="(item, index) in STATUS_LIST"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="interForm.description"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-tooltip
          class="item"
          effect="dark"
          content="点击按钮保存表单和表格信息"
          placement="top"
        >
          <el-button @click="saveData" type="success">保存</el-button>
        </el-tooltip>
        <el-button @click="testInterface" type="primary">测试接口</el-button>
      </el-col>
    </el-row>
    <g-table
      :headTitle="reqTitle"
      :gridConfig="gridConfig"
      :gridBtnConfig="gridBtnConfigReq"
      @change="reqDataChange"
      :gridData="reqData"
    ></g-table>
    <g-table
      :headTitle="resTitle"
      :gridConfig="gridConfig"
      :gridBtnConfig="gridBtnConfigRes"
      @change="resDataChange"
      :gridData="resData"
    ></g-table>
    <PreviewDialog
      :visible.sync="dialogPreVisible"
      :preDataJson="preDataJson"
    ></PreviewDialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import config from '../data';
import { BtnConfig, interForm, moduleForm } from '@/types/index';
import { json2Tree, flatTreeData } from '@/utils/TreeHelper';
import { typeCheck, mockTransform } from '@/utils/dataHandle';
import { METHOD_LIST, STATUS_LIST } from '@/const/base';
import axios from '@/utils/axios';
import Mock from 'mockjs';
import PreviewDialog from './PreviewDialog.vue';

@Component({
  components: {
    PreviewDialog,
  },
})
export default class InterfaceCon extends Vue {
  @Prop() private msg!: string;
  @Prop() private currentTab!: string;
  @Prop() private currentModule!: moduleForm;
  private METHOD_LIST: Array<any> = METHOD_LIST;
  private STATUS_LIST: Array<any> = STATUS_LIST;
  private tabIndex: number = 2;
  private reqTitle: string = '请求参数';
  private resTitle: string = '响应内容';
  // private fetch: Function = this.$api.interface.test
  private gridConfig: Array<any> = config.gridConfig;
  private gridBtnConfigReq: BtnConfig = {
    create: true,
    preview: true,
  };
  private gridBtnConfigRes: BtnConfig = {
    create: false,
    preview: true,
  };
  private interForm: interForm = {
    name: '',
    url: '',
    method: METHOD_LIST[0].value,
    status: STATUS_LIST[0].value,
    description: '',
  };
  private reqData: Array<any> = [];
  private resData: Array<any> = [];
  private dialogPreVisible: boolean = false;
  private preDataJson: any = {};

  // computed
  get pathName(): string {
    return `${this.currentModule.pathName}`;
  }
  @Watch('currentTab')
  private watchCurrentTab(val: string): void {
    this.$nextTick(() => {
      console.log(this.currentModule);
      this.getDetailDataval(val);
    });
  }
  // 获取接口详细信息
  async getDetailDataval(val: string) {
    await this.$nextTick();
    try {
      const res = await this.$api.interface.getDetailData({
        url: val,
        pathName: this.pathName,
      });
      this.interForm = res.data;
      this.reqData = res.data.request || [];
      this.resData = res.data.response || [];
    } catch (err) {
      console.log(err);
    }
  }
  async saveData() {
    // children不传
    let resData = [],
      reqData = [];
    if (this.reqData.length !== 0) {
      for (const item of this.reqData) {
        let { children, ...data } = item;
        reqData.push({ ...data, children: [] });
      }
    }
    if (this.resData.length !== 0) {
      for (const item of this.resData) {
        let { children, ...data } = item;
        resData.push({ ...data, children: [] });
      }
    }

    const params = {
      ...this.interForm,
      request: reqData,
      response: resData,
      pathName: this.pathName,
    };
    console.log(params);
    const res = await this.$api.interface.updateData(params);
    this.$message({
      showClose: true,
      message: res.message,
      type: 'success',
    });
  }
  reqDataChange(data: any) {
    this.reqData = data;
  }
  resDataChange(data: any) {
    this.resData = data;
  }
  // 测试接口运行
  async testInterface() {
    const method: string = this.interForm.method?.toLowerCase() || 'get';
    let reqData: any = [],
      params: any = {};
    if (!this.reqData) {
      let params = {};
    } else {
      reqData = json2Tree(this.reqData, {}, -1).map((item: any) => {
        const val = typeCheck(item.type, item.value, false);
        return { ...item, value: val };
      });
      params = Mock.mock(mockTransform(reqData));
    }
    if (method === 'post') {
      try {
        const res = await axios.post(
          this.pathName + this.interForm.url,
          params,
        );
        // this.preDataJson = res.data;
        this.preDataJson = res;
        this.dialogPreVisible = true;
      } catch (err) {
        console.log(err);
      }
    } else if (method === 'get') {
      try {
        const res = await axios.get(this.pathName + this.interForm.url, {
          params,
        });
        // this.preDataJson = res.data;
        this.preDataJson = res;
        this.dialogPreVisible = true;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  padding: 20px;
  overflow: auto;
}
</style>
