<!--
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 16:06:25
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:31:02
 * @email: 1980738748@qq.com
 -->
<template>
  <el-dialog title="新建接口" :visible.sync="dialogVisible">
    <el-form
      :model="newInterfaceForm"
      :rules="rules"
      ref="newInterfaceForm"
      label-width="80px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="newInterfaceForm.name"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="url">
        <el-input v-model="newInterfaceForm.url"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="method">
        <el-select
          v-model="newInterfaceForm.method"
          placeholder="请选择请求类型"
        >
          <el-option
            v-for="(item, index) in METHOD_LIST"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态码" prop="status">
        <el-select v-model="newInterfaceForm.status" placeholder="请选择状态码">
          <el-option
            v-for="(item, index) in STATUS_LIST"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="newInterfaceForm.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addTab('newInterfaceForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { interForm, interRuleForm } from '@/types/index';
import { METHOD_LIST, STATUS_LIST } from '@/const/base';

@Component
export default class NewInterDialog extends Vue {
  @Prop() private visible!: boolean;
  @Prop() private currentModule!: string;
  private METHOD_LIST: Array<any> = METHOD_LIST;
  private STATUS_LIST: Array<any> = STATUS_LIST;
  private newInterfaceForm: interForm = {
    name: '',
    url: '',
    method: METHOD_LIST[0].value,
    status: STATUS_LIST[0].value,
    description: '',
  };
  private rules: interRuleForm = {
    name: [{ required: true, message: '请输入接口名称', trigger: 'blur' }],
    url: [
      { required: true, message: '请输入接口地址', trigger: 'blur' },
      { pattern: /^[/].*$/, message: '地址请以/开头', trigger: 'change' },
    ],
  };
  // computed
  get dialogVisible(): boolean {
    return this.visible;
  }
  set dialogVisible(visible: boolean) {
    this.$emit('update:visible', visible);
  }
  // computed
  get pathName(): string {
    return this.currentModule;
  }
  // 新增接口
  async addTab(formName: string) {
    await this.$nextTick();
    const ref: any = this.$refs[formName];
    ref.validate(async (valid: boolean) => {
      if (valid) {
        try {
          const res = await this.$api.interface.createData({
            pathName: this.pathName,
            ...this.newInterfaceForm,
            // 响应默认值
            response: [
              {
                id: 96,
                parentId: -1,
                name: 'success',
                required: true,
                type: 'Boolean',
                value: 'true',
                // disabled: true,
                handle: true,
              },
              {
                id: 97,
                parentId: -1,
                name: 'data',
                required: true,
                type: 'Object',
                handle: true,
                children: [],
              },
              {
                id: 98,
                parentId: -1,
                name: 'code',
                required: true,
                type: 'Number',
                // disabled: true,
                value: '0',
                handle: true,
              },
              {
                id: 99,
                parentId: -1,
                name: 'msg',
                required: true,
                type: 'String',
                // disabled: true,
                handle: true,
              },
            ],
          });
          if (res.success) {
            this.$message({
              message: res.message,
              type: 'success',
            });
            this.$emit('addSuccess', res.data);
            this.resetForm('newInterfaceForm');
            this.dialogVisible = false;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  // 重置表单
  async resetForm(formName: string) {
    await this.$nextTick();
    const ref: any = this.$refs[formName];
    ref.resetFields();
  }
}
</script>
