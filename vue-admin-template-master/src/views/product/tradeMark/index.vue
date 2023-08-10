<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px;">添加</el-button>
    <!-- 表格组件 -->
    <el-table style="width: 100%;" border>
      <el-table-column  prop="prop" label="序号" width="80px">
      </el-table-column>
      <el-table-column  prop="prop" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column  prop="prop" label="品牌logo" width="width">
      </el-table-column>
      <el-table-column  prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- 
      当前第几页，数据总条数，每一页战术条数，连续页码数
      @size-change="sizeChange"
      @current-change="currentChange"

      current-page:代表的是当前是第几页
      total:代表分页器一共需要展示数据条数
      page-size:代表的是每一页需要展示多少条数据
      page-sizes:代表可以设置每一页展示多少条数据
      layout：可以实现分页器布局
      pager-count:按钮的数量 如果是9 连续页码是7


     -->
    <el-pagination
    style="margin-top: 20px;text-align: center;"
     :current-page="6"
      :page-sizes="[3,5,10]"
      :page-size="3"
      :pager-count="9"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="99" background>
      >
    </el-pagination>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 代表分页器是第几页
      page:1,
      // 当前页数展示多少条数据
      limit:3,
    }
  },
  mounted(){
    // 获取列表数据方法
    this.getPageList()
  },
  methods:{
    async getPageList(){
      console.log(1);
      const {page,limit}=this;
      // 这个写接口需要传参
      let result=await this.$Api.trademark.reqTradeMarkList(page,limit);
      console.log(result);
    }
  }
}
</script>

<style></style>