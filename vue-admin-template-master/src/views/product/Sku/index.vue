<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border stripe :data="records">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" alt="" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="success" icon="el-icon-sort-down" size="mini" v-if="row.isSale == 0" @click="sale(row)"></el-button>
          <el-button type="success" icon="el-icon-sort-up" size="mini" v-else @click="cancel(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- @size-change="sizeChange"
      @current-change="currentChange" -->
    <el-pagination style="text-align: center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total" background @current-change="getSkuList" @size-change="sizeChange"> </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :show-close="false">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success" v-for="(attr, index) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right: 10px">{{ attr.attrId }}--{{ attr.valueId }}</el-tag>
          </template>
        </el-col>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      page: 1,
      limit: 10,
      records: [],
      total: 0,
      skuInfo: {},
      drawer: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    //获取sku列表
    async getSkuList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      let result = await this.$Api.sku.reqSkuList(page, limit)
      if (result.code == 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    sizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    async sale(row) {
      let result = await this.$Api.sku.reqSale(row.id)
      if (result.code == 200) {
        row.isSale = 1
        this.$message({ type: 'success', message: '上架成功' })
      }
    },
    async cancel(row) {
      let result = await this.$Api.sku.reqCancel(row.id)
      if (result.code == 200) {
        row.isSale = 0
        this.$message({ type: 'success', message: '下架成功' })
      }
    },
    edit() {
      this.$message('正在开发中')
    },
    // sku详情
    async getSkuInfo(sku) {
      this.drawer = true
      let result = await this.$Api.sku.reqSkuById(sku.id)
      if (result.code == 200) {
        this.skuInfo = result.data
      }
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
  }
</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
}
.el-col {
  margin: 10px 10px;
}

</style>