<template>
  <div class="contents">
    <div class="top">
      <div class="tool">
        <div class="tool-list">
          <div class="conditions">
            <span class="title">姓名</span>
            <el-input v-model="searchForm.name" placeholder="请输入规格" />
          </div>
          <div class="conditions">
            <span class="title">手机号</span>
            <el-input v-model="searchForm.phone" placeholder="请输入编号" />
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
        <el-table-column prop="account" label="账号" width="150" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="auth_name" label="权限名" />
        <el-table-column prop="id_card" label="身份证号" />
        <el-table-column prop="is_enable" label="状态" :formatter="statusWord" />
        <el-table-column prop="user_type" label="用户类型" />
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
    <div class="addDiaog">
      <el-dialog
        class="midDiaLog"
        :title="title"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :center="true"
      >
        <el-form ref="">
          <el-form-item prop="account" label="账号">

          </el-form-item>
        </el-form>
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
        name: '',
        phone: ''
      },
      dialogFormVisible: false,
      total: 0,
      title: '添加用户',
      userForm: {

      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 搜索
    search() {

    },
    // 重置
    reset() {

    },
    // 获取用户列表
    getUserList() {

    },
    // 添加弹窗
    showAdd() {

    }
  }
}
</script>
<style scoped lang='scss'>
</style>
