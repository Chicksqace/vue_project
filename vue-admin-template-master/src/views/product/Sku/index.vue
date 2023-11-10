<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%;" border stripe>
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="prop" label="名称" width="width" ></el-table-column>
      <el-table-column prop="prop" label="描述" width="width" ></el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110" ></el-table-column>
      <el-table-column prop="prop" label="重量" width="80" ></el-table-column>
      <el-table-column prop="prop" label="价格" width="80" ></el-table-column>
      <el-table-column prop="prop" label="操作" width="width" ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- @size-change="sizeChange"
      @current-change="currentChange" -->
    <el-pagination
      :current-page.sync="currentPage"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum" background>
      :pager-count="7">
    </el-pagination>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>