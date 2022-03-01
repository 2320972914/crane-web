<template>
  <div class="contents">
    <div class="top">
      <div class="tool">
        <div class="tool-list">
          <div class="conditions">
            <el-button size="medium" type="primary" @click="showDialog">添加权限角色</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        empty-text="暂无数据"
      >
        <el-table-column label="角色编号" prop="authId" width="150" />
        <el-table-column prop="authName" label="角色名称" />
        <el-table-column prop="status" :formatter="statusWord" label="状态" />
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showEdit(row)"
            >编辑权限路由</el-button>
            <el-button
              v-if="scope.row.status != 2"
              type="text"
              size="small"
              @click="enabled(row)"
            >{{ scope.row.status==1?"启用":"停用" }}</el-button>
            <el-button
              v-if="scope.row.status != 2"
              type="text"
              size="small"
              @click="deleteAuth(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="total > 10" class="pagination">
        <el-pagination
          background
          :page-size="search.pageSize"
          :current-page="search.pageNo"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 50]"
          :total="total"
          @current-change="changePage"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <div class="addAuth">
      <el-dialog
        title="新增权限"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :center="true"
        class="minDialog"
      >
        <el-form
          ref="authForm"
          :model="authForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="authName">
            <el-input v-model="authForm.authName" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-select v-model="authForm.status" placeholder="请选择">
              <el-option label="启用" :value="0" />
              <el-option label="停用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAuth()">添加</el-button>
            <el-button @click="dialogFormVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="editRole">
      <el-dialog
        title="编辑权限"
        class="bigDialog"
        :visible.sync="EditDialogFormVisible"
        :close-on-click-modal="false"
        :center="true"
      >
        <tree-transfer
          :title="title"
          :from_data="fromData"
          :to_data="toData"
          :default-props="{label:'label'}"
          height="540px"
          filter
          open-all
          @add-btn="add"
          @remove-btn="remove"
        />
        <div class="dialogButtom">
          <el-button type="primary" @click="submitEdit">保存</el-button>
          <el-button @click="EditDialogFormVisible = false">取消</el-button>
        </div>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import treeTransfer from 'el-tree-transfer'
export default {
  name: 'AuthManages',
  components: {
    treeTransfer
  },
  props: {},
  data() {
    return {
      search: {
        pageNo: 1,
        pageSize: 10
      },
      total: 1,
      dialogFormVisible: false,
      EditDialogFormVisible: false,
      authForm: {
        authName: '',
        status: 0
      },
      rules: {
        authName: [
          { required: true, message: '权限名称不能为空', trigger: 'change' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ]
      },
      tableData: [
        {
          authId: 1,
          authName: 'superAdmin',
          status: 0
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
        },
        {
          code: 2,
          value: '删除'
        }
      ],
      title: ['未分配路由', '已分配路由'],
      fromData: [
        {
          id: '1',
          pid: 0,
          label: '一级 1',
          children: [
            {
              id: '1-1',
              pid: '1',
              label: '二级 1-1',
              disabled: true,
              children: []
            },
            {
              id: '1-2',
              pid: '1',
              label: '二级 1-2',
              children: [
                {
                  id: '1-2-1',
                  pid: '1-2',
                  children: [],
                  label: '二级 1-2-1'
                },
                {
                  id: '1-2-2',
                  pid: '1-2',
                  children: [],
                  label: '二级 1-2-2'
                }
              ]
            }
          ]
        }
      ],
      toData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 分页-翻页
    changePage() {

    },
    // 分页-每页条数
    handleSizeChange() {

    },
    // 获取权限列表
    getList() {

    },
    // 新增弹窗
    showDialog() {
      this.$nextTick(() => {
        if (this.$refs['authForm'] !== undefined) { this.$refs['authForm'].resetFields() }
      })
      this.dialogFormVisible = true
    },
    // 添加权限
    addAuth() {

    },
    // 编辑弹窗
    showEdit(row) {
      this.EditDialogFormVisible = true
    },
    // 启用停用
    enabled(row) {

    },
    // 删除
    deleteAuth(row) {

    },
    // 状态转文字
    statusWord(rows) {
      var result = ''
      this.statusList.map(res => {
        if (res.code == rows.status) {
          result = res.value
        }
      })
      return result
    },
    // 保存路由权限编辑
    submitEdit() {
      this.EditDialogFormVisible = false
    }
  }
}
</script>
<style scoped lang='scss'>
.dialogButtom{
  margin:20px auto 0;
  width: 200px;
}

</style>
