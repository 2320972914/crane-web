<template>
  <div class="contents">
    <div class="top">
      <div class="tool">
        <div class="tool-list">
          <div class="conditions">
            <el-button size="medium" type="primary" @click="showDialog">新增吊车规格</el-button>
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
        <el-table-column prop="standType" label="规格类型" width="150" />
        <el-table-column prop="craneStandard" label="吊车规格" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showEditDialog(scope.row)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.delflag != 2"
              type="text"
              size="small"
              @click="deleteAuth(scope.row)"
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
        :title="title"
        :visible.sync="addDialogFormVisible"
        :close-on-click-modal="false"
        :center="true"
        class="minDialog"
      >
        <el-form
          ref="standardForm"
          :model="standardForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="吊车规格" prop="craneStandard">
            <el-input v-model="standardForm.craneStandard" placeholder="请输入吊车规格" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="standardForm.remark" placeholder="请输入备注" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit()">保存</el-button>
            <el-button @click="addDialogFormVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CraneStandardManages',
  components: {
  },
  props: {},
  data() {
    return {
      search: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      title: '',
      addDialogFormVisible: false,
      standardForm: {
        standType: null,
        craneStandard: '',
        remark: ''
      },
      submitType: 1, // 1添加2编辑
      rules: {
        craneStandard: [
          { required: true, message: '吊车规格不能为空', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getStandardList()
  },
  methods: {
    // 分页搜素
    changePage(page) {
      this.searchForm.pageNo = page
      this.getStandardList()
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getStandardList()
    },
    // 获取规格列表
    getStandardList() {
      this.$store.dispatch('craneManages/getStandardList', this.search)
        .then((res) => {
          this.tableData = res.rows
          this.total = res.total
        })
        .catch(() => {})
    },
    // 新增弹窗
    showDialog() {
      this.submitType = 1
      this.title = '新增吊车规格'
      this.standardForm.standType = null
      this.standardForm.craneStandard = ''
      this.standardForm.remark = ''
      this.addDialogFormVisible = true
    },
    showEditDialog(row) {
      this.submitType = 2
      this.title = '编辑吊车规格'
      this.standardForm.standType = row.standType
      this.standardForm.craneStandard = row.craneStandard
      this.standardForm.remark = row.remark
      this.addDialogFormVisible = true
    },
    // 添加
    submit() {
      this.$refs['standardForm'].validate((valid) => {
        if (valid) {
          if (this.submitType == 1) {
            this.$store.dispatch('craneManages/addStandard', this.standardForm)
              .then((res) => {
                this.getStandardList()
                this.addDialogFormVisible = false
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 2 * 1000
                })
              })
              .catch(() => {})
          }
          if (this.submitType == 2) {
            this.$store.dispatch('craneManages/editStandard', this.standardForm)
              .then((res) => {
                this.getStandardList()
                this.addDialogFormVisible = false
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 2 * 1000
                })
              })
              .catch(() => {})
          }
        }
      })
    },
    // 删除
    deleteAuth(row) {
      this.$confirm('确定删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('craneManages/deleteStandard', { standType: row.standType })
          .then((res) => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 2 * 1000
            })
            this.getStandardList()
          })
          .catch(() => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style scoped lang='scss'>
</style>
