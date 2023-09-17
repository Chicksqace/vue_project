<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
    </el-card>
    <el-card style="margin: 20px 0px">
      <!-- 底部这里将来是有三部分进行切换 -->
      <div v-show="scene==0">
        <!-- 展示spu列表的结构 -->
        <el-button type="primary" icon="el-icon-plus"> 添加spu </el-button>
        <el-table border style="width: 100%;" :data="records">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column label="SPU名称" width="width" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" width="width" prop="description"></el-table-column>
          <el-table-column label="操作" width="width" prop="prop">
            <template slot-scope="{row,$index}">
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加属性"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="参看当前spu全部sku列表"></hint-button>
              <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  @size-change="sizeChange"
          @current-change="currentChange" -->
        <el-pagination
        style="text-align:center;"
        :current-page="page"
          :page-sizes="[3,5,10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total" background
          @current-change="getSpuList"
          @size-change="sizeChange"
          >
        </el-pagination>
        
      </div>
      <SpuForm v-show="scene==1"></SpuForm>
      <SkuForm v-show="scene==2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
// 引入子组件
import SpuForm from './SpuFrom';
import SkuForm from './SkuFrom';
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
      scene:0,//0代表战术spu列表数据 1添加spu 2添加sku
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
    async getSpuList(pages=1){
      this.page=pages
      const {page,limit,category3Id}=this
      let result=await this.$Api.spu.reqSpuList(page,limit,category3Id);
      if(result.code==200){
        this.total=result.data.total;
        this.records=result.data.records;
      }
    },
    // 分页器的某一页数据条数发生变化的回调
    sizeChange(limit){
      this.limit=limit
      this.getSpuList()
    }
    // 点击分页器第几页按钮的回调
    // handleCurrentChange(page){
    //   this.page=page
    //   this.getSpuList()
    // }
  },
  components:{
    SpuForm,
    SkuForm
  }
}
</script>

<style>
</style>