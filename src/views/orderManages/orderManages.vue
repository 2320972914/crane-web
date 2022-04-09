<template>
  <div class="contents">
    <div class="top">
      <div class="tool">
        <div class="tool-list">
          <div class="conditions">
            <span class="title">订单用户 </span>
            <el-input v-model="searchForm.createBy" />
          </div>
          <div class="conditions">
            <span class="title">状态 </span>
            <el-select v-model="searchForm.status">
              <el-option
                v-for="item in statusList"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </div>
          <div class="conditions">
            <el-button size="medium" type="primary" @click="search">搜索</el-button>
            <el-button size="medium" type="primary" @click="reset">重置</el-button>
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
        <el-table-column prop="orderId" label="订单id" />
        <el-table-column prop="userId" label="用户id" />
        <el-table-column prop="createBy" label="订单用户" />
        <el-table-column prop="address" label="租赁地址" width="120" />
        <el-table-column prop="startTime" label="开始时间" width="120">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.startTime).toLocaleDateString() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="120">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.endTime).toLocaleDateString() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="craneStandard" label="吊车规格" />
        <el-table-column prop="leaseDuration" label="租赁时长/天" />
        <el-table-column prop="status" label="状态" :formatter="statusWord" />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==1"
              type="text"
              size="small"
              @click="operation(scope.row)"
            >吊车上门</el-button>
            <el-button
              v-if="scope.row.status==3"
              type="text"
              size="small"
              @click="backDeleteOrder(scope.row)"
            >删除</el-button>
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
  </div>
</template>
<script>
export default {
  name: 'OrderManages',
  components: {},
  props: {},
  data() {
    return {
      searchForm: {
        pageSize: 10,
        pageNo: 1,
        status: '',
        createBy: ''
      },
      tableData: [],
      dialogFormVisible: false,
      confirmDialog: false,
      total: 0,
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
      statusList: [
        {
          code: '',
          value: '全部'
        },
        {
          code: 1,
          value: '已预约'
        },
        {
          code: 2,
          value: '进行中'
        },
        {
          code: 3,
          value: '已完成'
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
      this.getOrderList()
    },
    // 重置
    reset() {
      this.searchForm = {
        pageSize: 10,
        pageNo: 1,
        status: '',
        createBy: ''
      }
      this.getOrderList()
    },
    // 分页搜素
    changePage(page) {
      this.searchForm.pageNo = page
      this.getOrderList()
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getOrderList()
    },
    // 获取用户列表
    getOrderList() {
      this.$store.dispatch('orderManages/getOrderList', this.searchForm)
        .then(res => {
          this.tableData = res.rows
          this.total = res.total
        })
        .catch(() => {})
    },
    // 订单操作
    operation(row) {
      this.$confirm('确定操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('orderManages/operation', { orderId: row.orderId, status: row.status })
          .then((res) => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 2 * 1000
            })
            this.getOrderList()
          })
          .catch(() => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 删除
    backDeleteOrder(row) {
      this.$confirm('确定删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('orderManages/backDeleteOrder', { orderId: row.orderId })
          .then((res) => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 2 * 1000
            })
            this.getOrderList()
          })
          .catch(() => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    }
  }
}
</script>
<style scoped lang='scss'>
</style>
