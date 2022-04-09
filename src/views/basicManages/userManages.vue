<template>
  <div class="contents">
    <div class="top">
      <div class="tool">
        <div class="tool-list">
          <div class="conditions">
            <span class="title">姓名</span>
            <el-input v-model="searchForm.username" placeholder="请输入姓名" />
          </div>
          <div class="conditions">
            <span class="title">手机号</span>
            <el-input v-model="searchForm.phone" placeholder="请输入手机号" />
          </div>
          <div class="conditions">
            <el-button size="medium" type="primary" @click="search">搜索</el-button>
            <el-button size="medium" type="primary" @click="reset">重置</el-button>
          </div>
          <div class="conditions">
            <el-button size="medium" type="primary" @click="showAdd">添加用户</el-button>
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
        <el-table-column prop="username" label="账号" width="150" />
        <el-table-column prop="nickName" label="姓名" />
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="authType" label="权限类型" :formatter="authWord" />
        <el-table-column prop="idCard" label="身份证号" />
        <el-table-column prop="isEnable" label="状态" :formatter="isEnableWord" />
        <el-table-column prop="userType" label="用户类型" :formatter="userTypeWord" />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="showConfirm(scope.row)"
            >重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="total > 10" class="pagination">
        <el-pagination
          background
          :page-size="searchForm.pageSize"
          :current-page="searchForm.pageNo"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 50]"
          :total="total"
          @current-change="changePage"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <div class="userDialog">
      <el-dialog
        class="minDialog"
        :title="dialogType==0?'添加':'编辑'"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :center="true"
      >
        <el-form ref="userForm" :rules="rules" label-width="100px" :model="userForm">
          <el-form-item prop="username" label="账号">
            <el-input v-model="userForm.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item v-if="!dialogType" prop="password" label="密码">
            <el-input v-model="userForm.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="nickName" label="姓名">
            <el-input v-model="userForm.nickName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机号">
            <el-input v-model="userForm.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="idCard" label="身份证号">
            <el-input v-model="userForm.idCard" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别" placeholder="请选择">
            <el-select v-model="userForm.sex">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item prop="userType" label="用户类型" placeholder="请选择">
            <el-select v-model="userForm.userType">
              <el-option
                v-for="item in userTypeList"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="authType" label="权限角色" placeholder="authType">
            <el-select v-model="userForm.authType">
              <el-option
                v-for="item in authList"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="isEnable" label="状态" placeholder="请选择">
            <el-select v-model="userForm.isEnable">
              <el-option
                v-for="item in isEnableList"
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
    <div class="confirm">
      <el-dialog
        title="确认"
        :visible.sync="confirmDialog"
        width="30%"
        :close-on-click-modal="false"
      >
        <span>确定要重置该用户的密码？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="resetPassword">确 定</el-button>
          <el-button @click="confirmDialog = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CraneInfoManages',
  components: {},
  props: {},
  data() {
    return {
      searchForm: {
        pageSize: 10,
        pageNo: 1,
        username: '',
        phone: ''
      },
      tableData: [],
      dialogFormVisible: false,
      confirmDialog: false,
      total: 0,
      dialogType: 0, // 0 添加 1 编辑
      userForm: {
        userId: null,
        username: '',
        password: '',
        nickName: '',
        phone: '',
        sex: '',
        userType: '',
        idCard: '',
        authType: '',
        isEnable: ''
      },
      row: {},
      loading: false,
      rules: {

      },
      isEnableList: [
        {
          code: 0,
          value: '启用'
        },
        {
          code: 1,
          value: '停用'
        }
      ],
      userTypeList: [
        {
          code: '00',
          value: '系统用户'
        },
        {
          code: '01',
          value: '管理端用户'
        },
        {
          code: '02',
          value: '手机端用户'
        }
      ],
      authList: [
        {
          code: 0,
          value: 'admin'
        },
        {
          code: 1,
          value: 'user'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.search()
  },
  methods: {
    // 搜索
    search() {
      this.searchForm.pageNo = 1
      this.getUserList()
    },
    // 重置
    reset() {
      this.searchForm = {
        pageSize: 10,
        pageNo: 1,
        username: '',
        phone: ''
      }
      this.getUserList()
    },
    // 分页搜素
    changePage(page) {
      this.searchForm.pageNo = page
      this.getUserList()
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getUserList()
    },
    // 获取用户列表
    getUserList() {
      this.$store.dispatch('basicManages/getUserList', this.searchForm)
        .then(res => {
          this.tableData = res.rows
          this.total = res.total
        })
        .catch(() => {})
    },
    // 添加弹窗
    showAdd() {
      this.userForm = {
        userId: null,
        username: '',
        password: '',
        nickName: '',
        sex: '',
        phone: '',
        userType: '',
        idCard: '',
        authType: '',
        isEnable: ''
      }
      this.dialogType = 0
      this.dialogFormVisible = true
    },
    // 编辑
    showEdit(row) {
      this.dialogType = 1
      this.userForm.userId = row.userId
      this.userForm.username = row.username
      this.userForm.nickName = row.nickName
      this.userForm.sex = row.sex
      this.userForm.phone = row.phone
      this.userForm.userType = row.userType
      this.userForm.idCard = row.idCard
      this.userForm.isEnable = row.isEnable
      this.userForm.authType = row.authType
      this.dialogFormVisible = true
    },
    submitForm() {
      this.loading = true
      if (this.dialogType === 0) {
        // 添加
        this.$store.dispatch('basicManages/addUser', this.userForm)
          .then(res => {
            this.loading = false
            this.getUserList()
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
      } else {
        // 编辑
        this.$store.dispatch('basicManages/editUser', this.userForm)
          .then(res => {
            this.loading = false
            this.getUserList()
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
    },
    showConfirm(row) {
      this.row = row
      this.confirmDialog = true
    },
    // 重置密码
    resetPassword() {
      this.$store.dispatch('basicManages/resetPassword', { userId: this.row.userId })
        .then(res => {
          this.confirmDialog = false
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 2 * 1000
          })
        })
        .catch(() => {
          this.confirmDialog = false
        })
    },
    // 状态转文字
    isEnableWord(rows) {
      var result = ''
      this.isEnableList.map(res => {
        if (res.code == rows.isEnable) {
          result = res.value
        }
      })
      return result
    },
    userTypeWord(rows) {
      var result = ''
      this.userTypeList.map(res => {
        if (res.code == rows.userType) {
          result = res.value
        }
      })
      return result
    },
    authWord(rows) {
      var result = ''
      this.authList.map(res => {
        if (res.code == rows.authType) {
          result = res.value
        }
      })
      return result
    },
    getAuthList() {
      this.$store.dispatch('basicManages/getAuthList', { pageSize: 99, pageNo: 1 })
        .then((res) => {
          this.authList = res.rows
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped lang='scss'>
</style>
