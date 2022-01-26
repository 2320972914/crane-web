<template>
  <div class="contents">
    <div class="top">
      <div class="search">
        <div class="search-list">
          <div class="conditions">
            <el-button size="medium" type="primary" @click="showDialog">添加权限</el-button>
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
        <el-table-column label="id" width="150" />
        <el-table-column label="角色名称" />
        <el-table-column label="状态" />
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 1"
              type="text"
              size="small"
              @click="showEdit()"
            >编辑</el-button>
            <el-button
              v-if="scope.row.status == 1"
              type="text"
              size="small"
              @click="enabled()"
            >{{ text }}</el-button>
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

  </div>
</template>
<script>
export default {
  name: 'AuthManages',
  components: {},
  props: {},
  data() {
    return {
      search: {
        pageNo: 1,
        pageSize: 10
      },
      tableData: []
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
    // 新增弹窗
    showDialog() {

    },
    // 编辑弹窗
    showEdit() {

    },
    // 启用停用
    enabled() {

    }
  }
}
</script>
<style scoped lang='scss'>

</style>
