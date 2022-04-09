<template>
  <div class="contents">
    <div class="top">
      <div class="tool">
        <div class="tool-list">
          <div class="conditions">
            <span class="title">标题：</span>
            <el-input v-model="searchForm.title" placeholder="标题"></el-input>
          </div>
          <div class="conditions">
            <el-button size="medium" type="primary" @click="search">搜索</el-button>
            <el-button size="medium" type="primary" @click="reset">重置</el-button>
          </div>
          <div class="conditions">
            <el-button size="medium" type="primary" @click="showAdd">添加广告</el-button>
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
        <el-table-column prop="title" label="标题" min-width="150" />
        <el-table-column prop="content" label="内容" min-width="300" />
        <el-table-column prop="adImageUrl" label="图片" min-width="300">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:8090' + scope.row.adImgUrl"
              style="width: 250px; height: 120px"
            >
          </template>
        </el-table-column>
        <el-table-column prop="inEnable" label="使用状态" :formatter="isEnableWord" />
        <el-table-column prop="sortNo" label="序号" min-width="50" />
        <el-table-column fixed="right" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteAd(scope.row)"
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
        :title="dialogType==1?'添加':'编辑'"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :center="true"
      >
        <el-form ref="adForm" :rules="rules" label-width="100px" :model="adForm">
          <el-form-item prop="title" label="标题">
            <el-input v-model="adForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
            <el-input v-model="adForm.content" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="图片地址" prop="adImgUrl">
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
          <el-form-item prop="sortNo" label="序号">
            <el-input v-model.number="adForm.sortNo" placeholder="请输入序号"></el-input>
          </el-form-item>
          <el-form-item prop="isEnable" label="状态" placeholder="请选择">
            <el-select v-model="adForm.isEnable">
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
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdManages',
  components: {},
  props: {},
  data() {
    return {
      searchForm: {
        pageSize: 10,
        pageNo: 1,
        title: ''
      },
      upLoadUrl: 'http://localhost:8090/common/upload',
      tableData: [],
      dialogFormVisible: false,
      confirmDialog: false,
      total: 0,
      adForm: {
        adId: null,
        title: '',
        content: '',
        adImgUrl: '',
        sortNo: '',
        isEnable: 0
      },
      dialogType: 1, // 1添加 2编辑
      fileList: [],
      row: {},
      loading: false,
      dialogImg: false,
      dialogImgUrl: '',
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        adImgUrl: [
          { required: true, message: '图片不能为空', trigger: 'blur' }
        ],
        isEnable: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        sortNo: [
          {
            // pattern: /^[0-9]$/,
            required: true,
            message: '序号不能为空',
            trigger: 'blur'
          }
        ]
      },
      standTypeList: [],
      isEnableList: [
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
    this.search()
  },
  methods: {
    // 搜索
    search() {
      this.searchForm.pageNo = 1
      this.getAdList()
    },
    // 重置
    reset() {
      this.searchForm = {
        pageSize: 10,
        pageNo: 1,
        title: ''
      }
      this.search()
    },
    // 分页搜素
    changePage(page) {
      this.searchForm.pageNo = page
      this.getAdList()
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.getAdList()
    },
    // 获取广告列表
    getAdList() {
      this.$store.dispatch('adManages/getAdList', this.searchForm)
        .then(res => {
          this.tableData = res.rows
          this.total = res.total
        })
        .catch(() => {})
    },
    // 添加弹窗
    showAdd() {
      this.dialogType = 1
      this.adForm = {
        adId: null,
        title: '',
        content: '',
        adImgUrl: '',
        sortNo: '',
        isEnable: 0
      }
      this.fileList = []
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['adForm'].clearValidate()
      })
    },
    // 编辑
    showEdit(row) {
      this.dialogType = 2
      this.adForm = {
        adId: row.adId,
        title: row.title,
        content: row.content,
        adImgUrl: row.adImgUrl,
        sortNo: row.sortNo,
        isEnable: row.isEnable
      }
      this.fileList = []
      this.fileList.push()
      this.fileList[0] = {
        name: 'his',
        url: 'http://localhost:8090' + row.adImgUrl
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['adForm'].clearValidate()
      })
    },
    submitForm() {
      this.$refs['adForm'].validate((valid) => {
        if (valid) {
          // 添加
          if (this.dialogType == 1) {
            this.$store.dispatch('adManages/addAdment', this.adForm)
              .then(res => {
                this.getAdList()
                this.dialogFormVisible = false
                this.fileList = []
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 2 * 1000
                })
              })
              .catch(() => {
              })
          }
          // 编辑
          console.log(this.dialogType)
          if (this.dialogType == 2) {
            this.$store.dispatch('adManages/editAdment', this.adForm)
              .then(res => {
                this.getAdList()
                this.dialogFormVisible = false
                this.fileList = []
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 2 * 1000
                })
              })
              .catch(() => {
              })
          }
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
            this.adForm.adImgUrl = res.url
          })
          .catch(() => {})
      }
    },
    // 删除广告
    deleteAd(row) {
      this.$confirm('确定删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('adManages/deleteAdment', { adId: row.adId })
          .then((res) => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 2 * 1000
            })
            this.getAdList()
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
    isEnableWord(rows) {
      var result = ''
      this.isEnableList.map(res => {
        if (res.code == rows.isEnable) {
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
