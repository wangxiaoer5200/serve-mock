<template>
  <div class="crud">
    <div class="crud-header">
      <h2>{{ headTitle }}</h2>
      <div>
        <el-button
          type="primary"
          size="mini"
          v-if="gridBtnConfig.create"
          @click="addRow"
        >新增
        </el-button>
        <el-button
          type="info"
          size="mini"
          v-if="gridBtnConfig.preview"
          @click="previewJson"
        >预览
        </el-button>
      </div>
    </div>
    <el-table
      :data="showGridData"
      border
      v-loading="listLoading"
      style="width: 100%;"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        v-for="(item, index) in gridConfig"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
      >
        <template slot-scope="scope">
          <el-checkbox
            v-if="item.type === 'checkbox'"
            v-model="scope.row[item.prop]"
            @change="dataChange"
          ></el-checkbox>
          <el-select
            v-if="item.type === 'select'"
            size="mini"
            v-model="scope.row[item.prop]"
            placeholder="请选择"
            @change="dataChange"
          >
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            v-if="item.type === 'input'"
            size="mini"
            :placeholder="
              (scope.row.type === 'Object' || scope.row.type === 'Array') &&
              item.prop === 'value'
                ? '无'
                : '请输入内容'
            "
            :class="{ el_input_width: item.fixedWidth }"
            v-model="scope.row[item.prop]"
            @change="dataChange"
            :disabled="
              (scope.row.type === 'Object' || scope.row.type === 'Array') &&
              item.prop === 'value'
            "
          >
          </el-input>
          <el-button
            v-if="
              item.type === 'handle' &&
              (scope.row.type === 'Array' || scope.row.type === 'Object')
            "
            size="mini"
            type="primary"
            @click="addChildren(scope.row)"
          >新增</el-button>
          <el-button
            v-if="item.type === 'handle'"
            size="mini"
            type="danger"
            :disabled="scope.row[item.prop]"
            @click="remove(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--crud的分页组件-->
    <div class="crud-pagination">
      <!--如果不是异步请求展示数据，需要隐藏分页-->
      <el-pagination
        v-if="isAsync"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal"
      >
      </el-pagination>
    </div>
    <PreviewDialog
      :visible.sync="dialogPreVisible"
      :preTempJson="preTempJson"
      :preDataJson="preDataJson"
    ></PreviewDialog>
  </div>
</template>

<script>
import { json2Tree, flatTreeData } from '@/utils/TreeHelper';
import { typeCheck, mockTransform, deepClone } from '@/utils/dataHandle';
import PreviewDialog from './PreviewDialog';
import Mock from 'mockjs';

export default {
  globName: 'GTable',
  name: 'GTable',
  components: {
    PreviewDialog,
  },
  props: {
    // 请求对象
    fetch: {
      type: [Object, Function],
      default: () => {},
    },
    headTitle: {
      type: String,
      default: '',
    },
    // 表格配置
    gridConfig: {
      type: Array,
      default: () => [],
    },
    // 表格按钮配置
    gridBtnConfig: {
      type: Object,
      default: () => {
        return {
          create: false,
          preview: false,
        };
      },
    },
    // 表格死数据
    gridData: {
      type: Array,
      default: () => [],
    },
    // 判断是否是异步数据
    isAsync: {
      type: Boolean,
      default: false,
    },
    gridEditWidth: {
      type: Number,
      default: null,
    },
    //  是否隐藏表格操作
    hideEditArea: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 新增修改模态框title
      dialogTitle: '',
      // 展示的表格数据，数据来源可能是父组件传递的固定数据，可能是接口请求数据
      showGridData: [],
      // 当前页码
      currentPage: 1,
      // 每页显示数量
      currentPageSize: 10,
      // 列表数据总数
      dataTotal: 0,
      // 表单数据
      formModel: {},
      //  表格加载状态
      listLoading: false,
      rowNum: 0,
      preTempJson: {},
      preDataJson: {},
      dialogPreVisible: false,
    };
  },
  mounted() {
    // this.getData()
  },
  watch: {
    gridData() {
      this.showGridData = json2Tree(this.gridData, {}, -1);
      // console.log(this.showGridData);
      // console.log(this.showGridData, this.gridData);
      if (this.gridData.length !== 0) {
        const arr = this.gridData.slice(0);
        const max = arr.reduce((a, b) => {
          return a.id > b.id ? a : b;
        });
        this.rowNum = max.id;
      }
    },
  },
  methods: {
    // 获取列表数据
    async getData() {
      // this.listLoading = true
      let parame = {
        page: this.currentPage,
        size: this.currentPageSize,
        credObjType: '1',
      };
      const res = await this.fetch(parame);
      this.showGridData = res.data;
      this.listLoading = false;
      // this.apiService.list(params).then(
      //   (res) => {
      //     this.showGridData = res.data.list
      //     this.dataTotal = res.data.total
      //     this.listLoading = false
      //   },
      //   (err) => {
      //     this.listLoading = false
      //   }
      // )
    },
    async addRow() {
      this.rowNum += 1;
      let list = {
        id: this.rowNum,
        parentId: -1,
        name: '',
        required: false,
        type: '',
        rule: '',
        value: '',
        description: '',
        children: [],
      };
      this.showGridData.push(list);
    },
    addChildren(row) {
      this.rowNum += 1;
      let list = {
        id: this.rowNum,
        parentId: row.id,
        name: '',
        required: false,
        type: '',
        rule: '',
        value: '',
        description: '',
        children: [],
      };
      row.children.push(list);
    },
    // 处理相应父组件的事件方法
    handleEmit(emitName, row) {
      this.$emit(emitName, row);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getData();
    },
    handleSizeChange(size) {
      this.currentPageSize = size;
      this.getData();
    },
    async remove(index, row) {
      await this.removeData(this.showGridData, row);
      this.dataChange();
    },
    removeData(data, row) {
      data.forEach((item) => {
        if (item === row) {
          const inx = data.indexOf(item);
          data.splice(inx, 1);
        }
        if (item !== row && item.children) {
          this.removeData(item.children, row);
        }
      });
    },
    dataChange() {
      const data = flatTreeData({ data: this.showGridData });
      this.$emit('change', data);
    },
    check(arr, bool) {
      const arrData =
        arr.length !== 0 &&
        arr.map((item) => {
          if (item.children.length !== 0) {
            this.check(item.children);
          }
          const val = typeCheck(item.type, item.value, bool);
          return Object.assign(item, { value: val });
        });
      return arrData;
    },
    previewJson() {
      // 预览数据处理
      this.dialogPreVisible = true;
      let copyArrOne = deepClone(this.showGridData),
        copyArrTwo = deepClone(this.showGridData);
      let showGridData = this.check(copyArrOne, true);
      let mockGridData = this.check(copyArrTwo, false);
      this.preTempJson = mockTransform(showGridData);
      this.preDataJson = Mock.mock(mockTransform(mockGridData));
    },
  },
};
</script>

<style lang="scss" scoped>
.crud {
  margin-left: 25px;
  .crud-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    line-height: 30px;
  }

  .crud-pagination {
    text-align: right;
    margin-top: 10px;
  }
}
.el_input_width {
  width: 150px;
}
</style>
