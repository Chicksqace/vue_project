<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px;">添加</el-button>
    <!-- 表格组件 -->
    <el-table style="width: 100%;" border :data="list">
      <el-table-column type="index" prop="prop" label="序号" width="80px">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column  prop="logoUrl" label="品牌logo" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column  prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
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
    style="margin-top: 20px;textAlign: center;"
     :current-page="page"
      :page-sizes="[3,5,10]"
      :page-size="3"
      :pager-count="7"
      layout="prev, pager, next, jumper,->,sizes,total"
      @size-change="sizeChange"
      @current-change="getPageList"
      :total="total" background>
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
      // 总共数据条数
      total:0,
      // 列表展示的数据
      list:[]
    }
  },
  mounted(){
    // 获取列表数据方法
    this.getPageList()
  },
  methods:{
    async getPageList(pager=1){
      this.page=pager
      const {page,limit}=this;
      // 这个写接口需要传参
      let result=await this.$Api.trademark.reqTradeMarkList(page,limit);
      if(result.code==200){
        this.total=result.data.total;
        this.list=result.data.records;
      }
    },
    // 当分页器某一页需要战术数据条数发生变化的时候触发
    sizeChange(limit){
      this.limit=limit
      this.getPageList()
    }
  }
}
</script>

<style></style>