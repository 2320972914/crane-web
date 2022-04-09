<template>
  <div class="contents">
    <div class="top">
      <div class="tool">
        <div class="tool-list">
          <div class="conditions">
            <span class="title">规格类型</span>
            <el-select v-model="searchForm.standType">
              <el-option
                v-for="item in standTypeList"
                :key="item.standType"
                :label="item.craneStandard"
                :value="item.standType"
              >
              </el-option>
            </el-select>
          </div>
          <div class="conditions">
            <el-button size="medium" type="primary" @click="search">搜索</el-button>
            <el-button size="medium" type="primary" @click="reset">重置</el-button>
          </div>
          <div class="conditions">
            <el-button size="medium" type="primary" @click="showAdd">添加吊车</el-button>
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
        <el-table-column prop="belonger" label="归属人/公司" width="150" />
        <el-table-column prop="standType" label="规格类型" :formatter="standTypeWord" />
        <el-table-column prop="cranePrice" label="吊车积分单价/小时" />
        <el-table-column prop="craneImageUrl" label="吊车图片">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:8090' + scope.row.craneImageUrl"
              style="width: 100px; height: 100px"
            >
          </template>
        </el-table-column>
        <el-table-column prop="isUsed" label="使用状态" :formatter="isUsedWord" />
        <el-table-column prop="usedBy" label="使用人" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isUsed==0"
              type="text"
              size="small"
              @click="deleteCrane(scope.row)"
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
    <div class="infoDialog">
      <el-dialog
        class="minDialog"
        title="添加"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :center="true"
      >
        <el-form ref="infoForm" :rules="rules" label-width="100px" :model="infoForm">
          <el-form-item prop="standType" label="规格类型" placeholder="请选择">
            <el-select v-model="infoForm.standType">
              <el-option
                v-for="item in standTypeList"
                :key="item.standType"
                :label="item.craneStandard"
                :value="item.standType"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="cranePrice" label="积分单价">
            <el-input v-model.number="infoForm.cranePrice" placeholder="请输入积分单价"></el-input>
          </el-form-item>
          <el-form-item label="图片地址" prop="imgUrls">
            <el-upload
              ref="uploads"
              :action="upLoadUrl"
              list-type="picture-card"
              :on-remove="handleRemove"
              :file-list="fileList"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <el-input v-model="infoForm.remark" placeholder="请输入备注"></el-input>
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
  name: 'UserManages',
  components: {},
  props: {},
  data() {
    return {
      searchForm: {
        pageSize: 10,
        pageNo: 1,
        standType: ''
      },
      upLoadUrl: 'http://localhost:8090/common/upload',
      tableData: [],
      dialogFormVisible: false,
      confirmDialog: false,
      total: 0,
      infoForm: {
        craneId: null,
        standType: '',
        cranePrice: 0,
        craneImageUrl: '',
        remark: ''
      },
      fileList: [],
      row: {},
      loading: false,
      dialogImg: false,
      dialogImgUrl: '',
      rules: {
        standType: [
          { required: true, message: '规格类型不能为空', trigger: 'blur' }
        ],
        cranePrice: [
          {
            // pattern: /^[0-9]$/,
            required: true,
            message: '请输入积分单价',
            trigger: 'blur'
          }
        ]
      },
      standTypeList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.search()
    this.getStandardList()
  },
  methods: {
    // 搜索
    search() {
      this.searchForm.pageNo = 1
      this.getCraneInfoList()
    },
    // 重置
    reset() {
      this.searchForm = {
        pageSize: 10,
        pageNo: 1,
        standType: ''
      }
      this.getCraneInfoList()
    },
    // 分页搜素
    changePage(page) {
      this.searchForm.pageNo = page
      this.getCraneInfoList()
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getCraneInfoList()
    },
    // 获取规格
    getStandardList() {
      this.$store.dispatch('craneManages/getStandardList', {
        pageSize: 9999,
        pageNo: 1
      })
        .then((res) => {
          this.standTypeList = res.rows
        })
        .catch(() => {})
    },
    // 获取吊车列表
    getCraneInfoList() {
      this.$store.dispatch('craneManages/getCraneInfoList', this.searchForm)
        .then(res => {
          this.tableData = res.rows
          this.total = res.total
        })
        .catch(() => {})
    },
    // 添加弹窗
    showAdd() {
      this.infoForm = {
        craneId: null,
        standType: '',
        cranePrice: '',
        craneImageUrl: '',
        remark: ''
      }
      this.fileList = []
      this.dialogFormVisible = true
    },
    submitForm() {
      // this.loading = true
      this.$refs['infoForm'].validate((valid) => {
        if (valid) {
          // 添加
          this.$store.dispatch('craneManages/addCrane', this.infoForm)
            .then(res => {
              // this.loading = false
              this.getCraneInfoList()
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
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      // console.log(testmsg)
      if (testmsg != 'png' && testmsg != 'jpg') {
        this.$message({
          message: '只能上传jpg、png格式',
          type: 'error'
        })
        setTimeout(() => this.$refs.uploads.clearFiles(), 1000)
      } else {
        const fd = new FormData()
        console.log(fd)
        fd.append('file', file)
        this.$store.dispatch('user/upload', fd)
          .then(res => {
            console.log(res)
            this.infoForm.craneImageUrl = res.url
          })
          .catch(() => {})
      }
    },
    // 删除吊车
    deleteCrane(row) {
      this.$confirm('确定删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('craneManages/deleteCrane', { craneId: row.craneId })
          .then((res) => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 2 * 1000
            })
            this.getCraneInfoList()
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
    standTypeWord(rows) {
      var result = ''
      this.standTypeList.map(res => {
        if (res.standType == rows.standType) {
          result = res.craneStandard
        }
      })
      return result
    },
    isUsedWord(rows) {
      var result = ''
      if (rows.isUsed == 0) {
        result = '未使用'
      } else {
        result = '已使用'
      }
      return result
    }
  }
}
</script>
<style scoped lang='scss'>
</style>

