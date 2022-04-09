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
        :tree-props="{children: 'children'}"
      >
        <el-table-column prop="routerTitle" label="路由标题" width="200" align="left" />
        <el-table-column prop="routerName" label="路由名称" width="200" />
        <el-table-column prop="path" label="路由路径" width="300" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status === 0 ? "启用" : "停用" }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0" type="text" size="small" @click="showDialog(2, scope.row)">添加</el-button>
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="enabled(scope.row)">{{ scope.row.status === 0 ? "停用" : "起用" }}</el-button>
            <el-button type="text" size="small" @click="detele(scope.row)">删除</el-button> -->
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
          <el-form-item label="路由标题" prop="routerTitle">
            <el-input v-model="routerForm.routerTitle" placeholder="请输入路由名称" />
          </el-form-item>
          <el-form-item label="路由名称" prop="routerName">
            <el-input v-model="routerForm.routerName" placeholder="请输入路由名称" />
          </el-form-item>
          <el-form-item label="路由路径" prop="path">
            <el-input v-model="routerForm.path" placeholder="请输入路由路径" />
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="routerForm.icon" placeholder="请输入路由路径" />
          </el-form-item>
          <el-form-item label="路由排序" prop="sort">
            <el-input v-model="routerForm.sort" placeholder="请输入路由排序(越大越前)" />
          </el-form-item>
          <el-form-item label="父路由" prop="parentId">
            <el-input v-model="routerForm.parentId" disabled />
          </el-form-item>
          <el-form-item label="权限类型" prop="authType">
            <el-select v-model="routerForm.authType">
              <el-option
                v-for="item in authList"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialogButtom">
          <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
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
      rules: {
        routerName: [
          { required: true, message: '请输入路由名称', trigger: 'blur' }
        ],
        routerTitle: [
          { required: true, message: '请输入路由标题', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入路由路径', trigger: 'blur' }
        ],
        authType: [
          { required: true, message: '请选择路由权限', trigger: 'blur' }
        ]
      },
      dialogType: 1,
      routerForm: {
        routerTitle: '',
        routerName: '',
        path: '',
        sort: '',
        icon: '',
        parentId: 0,
        routerId: null,
        authType: null
      },
      loading: false,
      parentRouter: '',
      routerData: [],
      isFirst: false, // 添加的是否为一级路由
      authList: [
        {
          code: 0,
          value: 'admin'
        },
        {
          code: 1,
          value: 'user'
        }
      ],
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
  mounted() {
    this.getRoueterList()
  },
  methods: {
    // 查询路由
    getRoueterList() {
      this.$store.dispatch('basicManages/getRouterList')
        .then(res => {
          this.routerData = res.rows
        })
        .catch(() => {})
    },
    // 添加路由 1 一级 2 子路由
    showDialog(type, row) {
      if (type === 1) {
        this.routerForm.parentId = 0
      }
      if (type === 2) {
        this.routerForm.parentId = row.routerId
      }
      this.routerForm.path = ''
      this.routerForm.icon = ''
      this.routerForm.routerName = ''
      this.routerForm.sort = ''
      this.routerForm.authType = null
      this.routerForm.routerTitle = ''
      this.dialogType = 1
      this.dialogFormVisible = true
    },
    // 编辑
    edit(row) {
      this.routerForm.parentId = row.parentId
      this.routerForm.path = row.path
      this.routerForm.icon = row.icon
      this.routerForm.routerName = row.routerName
      this.routerForm.sort = row.sort
      this.routerForm.authType = row.authType
      this.routerForm.routerTitle = row.routerTitle
      this.routerForm.routerId = row.routerId
      this.dialogType = 2
      this.dialogFormVisible = true
    },
    // 启用停用
    enabled(row) {

    },
    // 删除
    detele(row) {

    },
    // 提交表单 1添加2编辑
    submitForm() {
      this.loading = true
      this.$refs['routerForm'].validate((valid) => {
        if (valid) {
          if (this.dialogType == 1) {
            this.$store.dispatch('basicManages/addRouter', this.routerForm)
              .then((res) => {
                this.getRoueterList()
                this.loading = false
                this.dialogFormVisible = false
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 2 * 1000
                })
              })
              .catch(() => {
                this.loading = false
              })
          }
          if (this.dialogType == 2) {
            this.$store.dispatch('basicManages/editRouter', this.routerForm)
              .then((res) => {
                this.getRoueterList()
                this.loading = false
                this.dialogFormVisible = false
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 2 * 1000
                })
              })
              .catch(() => {
                this.loading = false
              })
          }
        }
      })
    }
  }
}
</script>
<style scoped lang='scss'>
</style>
