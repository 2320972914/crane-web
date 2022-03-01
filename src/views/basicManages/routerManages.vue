<template>
  <div class="contents">
    <div class="top">
      <div class="tool">
        <div class="tool-list">
          <div class="conditions">
            <el-button size="medium" type="primary" @click="showDialog(1)">添加一级路由</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="routerData"
        style="width: 100%;margin-bottom: 20px;"
        empty-text="暂无数据"
        row-key="routerId"
      >
        <el-table-column prop="num" label="序号" width="160" />
        <el-table-column prop="routerName" label="路由名称" width="200" />
        <el-table-column prop="path" label="路由路径" width="300" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status === 1 ? "启用" : "停用" }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 1" type="text" size="small" @click="showDialog(2, scope.row)">添加</el-button>
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="enabled(scope.row)">{{ scope.row.status === 0 ? "启用" : "停用" }}</el-button>
            <el-button type="text" size="small" @click="detele(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="routerDialog">
      <el-dialog
        class="midDialog"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :center="true"
        title="添加路由"
      >
        <el-form ref="routerForm" :model="routerForm" label-width="100px" :rules="rules">
          <el-form-item label="路由名称" prop="routerName">
            <el-input v-model="routerForm.routerName" placeholder="请输入路由名称" />
          </el-form-item>
          <el-form-item label="路由路径" prop="path">
            <el-input v-model="routerForm.path" placeholder="请输入路由路径" />
          </el-form-item>
          <el-form-item label="路由排序" prop="sort">
            <el-input v-model="routerForm.sort" placeholder="请输入路由排序(越大越前)" />
          </el-form-item>
          <el-form-item v-if="isFirst" label="父路由" prop="parentRouter">
            <el-input v-model="routerForm.parentRouter" />
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RouterManages',
  components: {},
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      rules: [],
      routerForm: {
        routerName: '',
        path: '',
        sort: '',
        parentRouter: '',
        parentId: ''
      },
      routerData: [],
      isFirst: false, // 添加的是否为一级路由
      statusList: [
        {
          code: 0,
          value: '启用'
        },
        {
          code: 1,
          value: '停用'
        }
      ]

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 添加路由 1 一级 2 子路由
    showDialog(type, row) {
      this.isFirst = false
      if (type === 1) {
        this.isFirst = true
      }
      this.dialogFormVisible = true
    },
    // 启用停用
    enabled(row) {

    },
    // 删除
    detele(row) {

    }
  }
}
</script>
<style scoped lang='scss'>
</style>
