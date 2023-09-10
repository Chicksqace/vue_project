<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
    </el-card>
    <el-card style="margin: 20px 0px">
      <!-- 底部这里将来是有三部分进行切换 -->
      <div>
        <!-- 展示spu列表的结构 -->
        <el-button type="primary" icon="el-icon-plus"> 添加spu </el-button>
        <el-table border style="width: 100%;" :data="records">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column label="SPU名称" width="width" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" width="width" prop="description"></el-table-column>
          <el-table-column label="操作" width="width" prop="prop">
            <template slot-scope="{row,$index}">
              <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
              <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="info" icon="el-icon-info" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  @size-change="sizeChange"
          @current-change="currentChange" -->
        <el-pagination
        style="text-align:center;"
          :page-sizes="[3,5,10]"
          :page-size="3"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="23" background>
          :pager-count="7">
        </el-pagination>
        
      </div>
      <div></div>
      <div></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 控制三级联动的可操作
      show: true,
      page:1,//分页器当前第几页
      limit:3,//每一页需要展示多少条数据
      records:[],//spu列表的数据
      total:0,//分页器一共需要展示数据的条数
    }
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      // categoryId：获取到一，二，三级分类的id level：为了区分是几级的id
      if (level == 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        //代表三级分类的id有了
        this.category3Id = categoryId
        //发请求获取平台的属性数据
        this.getSpuList()
      }
    },
    async getSpuList(){
      const {page,limit,category3Id}=this
      let result=await this.$Api.spu.reqSpuList(page,limit,category3Id);
      if(result.code==200){
        this.total=result.data.total;
        this.records=result.data.records;
      }
    }
  }
}
</script>

<style>
</style>