<template>
  <div>
    <el-tabs
      v-model="moduleTabsValue"
      type="card"
      :before-leave="beforeLeave"
      @tab-remove="removeModule"
    >
      <el-tab-pane
        v-for="item in moduleTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        class="wrap"
        closable
      >
        <div style="width: 207px;">
          <el-button @click="editModule" style="margin-bottom: 20px;">
            修改模块
          </el-button>
          <el-button
            @click="dialogInterfaceVisible = true"
            style="margin-bottom: 20px;"
          >
            新建接口
          </el-button>

          <el-alert
            title="暂无接口，请新建"
            type="info"
            :closable="false"
            v-if="interfaceTabs.length === 0"
          >
          </el-alert>
        </div>
        <el-tabs
          v-model="interfaceTabsValue"
          type="card"
          closable
          tab-position="left"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in interfaceTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            class="wrap"
          ></el-tab-pane>
          <InterfaceCon
            v-show="interfaceTabs.length !== 0"
            :currentModule="currentModule"
            :currentTab="interfaceTabsValue"
          ></InterfaceCon>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane key="add" name="add">
        <span slot="label" style="padding: 8px;">
          + 新建模块
        </span>
      </el-tab-pane>
    </el-tabs>
    <NewInterDialog
      :visible.sync="dialogInterfaceVisible"
      :currentModule="moduleTabsValue"
      @addSuccess="addTab"
    ></NewInterDialog>
    <ModuleDialog
      :visible.sync="dialogModuleVisible"
      :type="moduleType"
      :pathName="pathName"
      @moduleSuccess="moduleSuccess"
    ></ModuleDialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import config from './data';
import { BtnConfig, moduleForm } from '@/types/index';
import InterfaceCon from './components/InterfaceCon.vue';
import NewInterDialog from './components/NewInterDialog.vue';
import ModuleDialog from './components/ModuleDialog.vue';
@Component({
  components: {
    InterfaceCon,
    NewInterDialog,
    ModuleDialog,
  },
})
export default class Home extends Vue {
  @Prop() private msg!: string;
  private moduleTabsValue: string = '0';
  private interfaceTabsValue: string = '0';
  private moduleType: string = 'add';
  private moduleTabs: Array<any> = [];
  private interfaceTabs: Array<any> = [];
  private tabIndex: number = 1;
  // private fetch: Function = this.$api.user.test
  private gridConfig: Array<any> = config.gridConfig;
  private gridBtnConfig: BtnConfig = {
    create: true,
  };
  private dialogInterfaceVisible: boolean = false;
  private dialogModuleVisible: boolean = false;
  private currentModule: moduleForm = {
    id: null,
    name: '',
    pathName: '',
    description: '',
  };
  // computed
  get pathName(): string {
    return this.moduleTabsValue;
  }
  async mounted() {
    await this.getModule();
    if (this.moduleTabs.length !== 0) {
      this.moduleTabsValue = this.moduleTabs[0].name;
      await this.getModuleDetail(this.moduleTabs[0].name);
      await this.getInterface();
    }
  }
  // 获取模块
  async getModule() {
    const res = await this.$api.section.getSectionList({ isPage: false });
    if (res.data.list.length !== 0) {
      this.moduleTabs = res.data.list.map((item: any) => {
        return {
          ...item,
          title: item.name,
          name: item.pathName,
          // name: item.id.toString(),
        };
      });
    }
  }
  // 获取模块详情
  async getModuleDetail(pathName: string) {
    // async getModuleDetail(id: number) {
    const res = await this.$api.section.getSectionDetail({ pathName });
    this.currentModule = res.data;
  }
  //新增模块
  moduleSuccess(data: any) {
    this.getModule();
    this.moduleTabsValue = data.pathName;
    // this.moduleTabsValue = data.id.toString();
    this.getModuleDetail(data.pathName);
  }
  // 获取接口
  async getInterface() {
    const res = await this.$api.interface.getDataList({
      isPage: false,
      pathName: this.pathName,
    });
    if (res.data.list) {
      this.interfaceTabs = res.data.list.map((item: any) => {
        return {
          ...item,
          title: item.name,
          name: item.url,
          // name: item.id.toString(),
        };
      });
      if (this.interfaceTabs.length !== 0) {
        this.interfaceTabsValue = this.interfaceTabs[0].name;
      }
    }
  }
  // 新增接口
  async addTab(data: any) {
    this.interfaceTabs.push({
      title: data.name,
      name: data.url,
      // name: data.id.toString(),
    });
    this.interfaceTabsValue = data.url;
  }
  // 删除接口
  removeTab(targetName: string) {
    this.$confirm('此操作将删除该接口, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      // let id = parseInt(targetName);
      const res = await this.$api.interface.deleteData({
        url: targetName,
        pathName: this.pathName,
      });
      if (res.success) {
        let tabs = this.interfaceTabs;
        let activeName = this.interfaceTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.interfaceTabsValue = activeName;
        this.interfaceTabs = tabs.filter((tab) => tab.name !== targetName);
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }
    });
  }
  // 删除模块
  removeModule(targetName: string) {
    this.$confirm('此操作将删除该模块, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      // let id = parseInt(targetName);
      const res = await this.$api.section.deleteSection({
        pathName: targetName,
      });
      if (res.success) {
        let tabs = this.moduleTabs;
        let activeName = this.moduleTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.moduleTabsValue = activeName;
        this.moduleTabs = tabs.filter((tab) => tab.name !== targetName);
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }
    });
  }
  beforeLeave(currentName: string, oldName: string) {
    if (currentName == 'add') {
      // 新增模块
      this.moduleType = 'add';
      this.dialogModuleVisible = true;
      return false;
    } else {
      this.moduleTabsValue = currentName;
      this.getModuleDetail(currentName);
      this.getInterface();
    }
  }
  editModule() {
    // 修改模块
    this.moduleType = 'edit';
    this.dialogModuleVisible = true;
  }
}
</script>
<style lang="less" scoped>
.wrap {
  padding: 0 20px;
  overflow: auto;
}
</style>
