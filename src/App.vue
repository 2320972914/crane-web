<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.app-main {
  min-width: 1000px;
  background-color: #f0f2f5;
}

.el-table tbody tr {
  background-color: #fff !important;
}
.el-table tbody td {
  // text-align: center !important;
}
.el-table th,
.el-table tr {
  background-color: #f5f7fa !important;
  // text-align: center !important;
}

.contents{
  padding: 20px;
  .top{
    background: #ffffff;
    padding: 10px;
  }
  .table{
    margin-top:20px;
  }
  .title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    margin-right: 5px;
  }
  .tool {
    .tool-list {
      position: relative;
      top: 5px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-left: 10px;
      .el-date-editor{
        height: 32px;
      }
      .el-range-separator,.el-input__icon{
        line-height: 24px;
      }
      .el-input,
      .el-select {
        width: 150px;
        .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        .el-select__caret {
          line-height: 32px;
        }
      }
      .el-button--primary {
        background: #1890ff;
      }
      .conditions {
        margin-bottom: 10px;
        margin-right: 10px;
        .el-button--medium {
          height: 32px;
          line-height: 8px;
        }
      }
    }
  }
  .table {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    ::v-deep thead{
      ::v-deep .cell{
        text-align: center;
      }
    }
    .el-table__row {
      .cell {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
      .el-button--text {
        font-size: 14px;
        color: #1890ff;
      }
    }
    .pagination {
      text-align: center;
      ::v-deep .btn-prev,
      .btn-next {
        background-color: #fff !important;
      }
      ::v-deep .el-pager {
        li {
          background-color: #fff !important;
        }
      }
      .el-pager li:not(.disabled).active {
        background-color: #fff !important;
        color: #409eff !important;
        border: 1px solid #409eff !important;
      }
    }
  }
  .minDialog {
      width: 400px !important;
      margin: auto;
      .el-input{
        width: 200px !important;
      }
    }

  .midDialog{
    width: 600px !important;
    margin: auto;
     .el-input{
        width: 300px !important;
      }
  }
  .bigDialog{
    width: 800px;
    margin: auto;
  }
  .wl-transfer .transfer-title {
    margin: 0;
  }
  .dialogButtom{
    margin:20px auto 0;
    width: 200px;
  }

}
</style>
