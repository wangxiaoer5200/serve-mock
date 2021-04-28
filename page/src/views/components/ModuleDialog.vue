<!--
 * @description:
 * @author: wangxiaoer
 * @Date: 2021-04-25 16:06:25
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:30:51
 * @email: 1980738748@qq.com
 -->
<template>
  <el-dialog :title="computedTitle" :visible.sync="dialogVisible">
    <el-form
      :model="moduleForm"
      :rules="rules"
      ref="moduleForm"
      label-width="80px"
    >
      <el-form-item label="模块名称" prop="name">
        <el-input v-model="moduleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="接口前缀" prop="pathName">
        <el-input v-model="moduleForm.pathName"></el-input>
      </el-form-item>
      <el-form-item label="模块描述" prop="description">
        <el-input v-model="moduleForm.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditModule('moduleForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { moduleForm, moduleRuleForm } from '@/types/index';
@Component
export default class ModuleDialog extends Vue {
  @Prop() visible!: boolean;
  @Prop() type!: string;
  @Prop() pathName!: string;
  private moduleForm: moduleForm = {
    name: '',
    pathName: '',
    description: '',
  };
  private rules: moduleRuleForm = {
    name: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
    pathName: [{ required: true, message: '请输入接口前缀', trigger: 'blur' }],
  };
  // computed
  get dialogVisible(): boolean {
    return this.visible;
  }
  set dialogVisible(visible: boolean) {
    this.$emit('update:visible', visible);
  }
  get computedTitle() {
    const { type } = this;
    switch (type) {
      case 'add':
        return `新建模块`;
      case 'edit':
        return `修改模块`;
      default:
        return '';
    }
  }
  @Watch('visible')
  private watchVisible(val: boolean): void {
    if (this.type === 'edit') {
      this.setFormValues();
    }
  }
  // 设置初始值
  async setFormValues() {
    const res = await this.$api.section.getSectionDetail({
      pathName: this.pathName,
    });
    this.moduleForm = res.data;
  }
  addOrEditModule(formName: string) {
    this.type === 'add' ? this.addModule(formName) : this.editModule(formName);
  }
  // 新增模块
  async addModule(formName: string) {
    await this.$nextTick();
    const ref: any = this.$refs[formName];
    ref.validate(async (valid: boolean) => {
      if (valid) {
        try {
          const res = await this.$api.section.createSection(this.moduleForm);
          if (res.success) {
            this.$message({
              message: res.message,
              type: 'success',
            });
            this.$emit('moduleSuccess', res.data);
            this.resetForm('moduleForm');
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
  // 修改模块
  async editModule(formName: string) {
    await this.$nextTick();
    const ref: any = this.$refs[formName];
    ref.validate(async (valid: boolean) => {
      if (valid) {
        try {
          const res = await this.$api.section.updateSection(this.moduleForm);
          if (res.success) {
            this.$message({
              message: res.message,
              type: 'success',
            });
            this.$emit('moduleSuccess', res.data);
            this.resetForm('moduleForm');
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
