<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{spu.spuName}} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" value="" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"  v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择"  v-model="saleAttr.attrIdAndValueId">
              <el-option v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handlerSelectionChange">
          <el-table-column type="selection" prop="prop" label="label" width="80"> </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="width: 100px;height: 100px;" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width"> </el-table-column>
          <el-table-column prop="prop" label="操作" width="width"> 
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      // 存储图片
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrList: [],
      //存储平台数据
      attrInfoList: [],
      // 收集sku数据的字段
      skuInfo: {
        "category3Id": 0,
        "price": 0,
        "spuId": 0,
        "tmId": 0,
        "skuName": "",
        "weight": "",
        "skuDesc": "",
        // 平台属性
        "skuAttrValueList": [
          // {
          //   "attrId": 0,
          //   "valueId": 0,
          // }
        ],
        // 默认图片
        "skuDefaultImg": "",
        //收集图片的字段 
        "skuImageList": [
          // {
          //   "id": 0,
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "isDefault": "string",
          //   "skuId": 0,
          //   "spuImgId": 0
          // }
        ],
        // 销售属性
        "skuSaleAttrValueList": [
          // {
          //   "id": 0,
          //   "saleAttrId": 0,
          //   "saleAttrName": "string",
          //   "saleAttrValueId": 0,
          //   "saleAttrValueName": "string",
          //   "skuId": 0,
          //   "spuId": 0
          // }
        ],

       
      },
      spu:{

      },
      // 收集图片的数据字段
      imageList:[

      ],
    }
  },
  methods: {
    // 获取sku数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件给予的数据
      this.skuInfo.category3Id=spu.category3Id;
      this.skuInfo.spuId=spu.id;
      this.skuInfo.tmId=spu.tmId;
      this.spu=spu;
      let result = await this.$Api.spu.reqSpuImageList(spu.id)
      if (result.code == 200) {
        let list=result.data
        list.forEach(item=>{
          item.isDefault=0;
        })
        this.spuImageList = list
      }
      let result1 = await this.$Api.spu.reqSpuSaleAttrList(spu.id)
      console.log(result1.data);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data
      }
      let result2 = await this.$Api.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      if (result2.code == 200) {
        this.attrInfoList = result2.data
      }
    },
    // 复选框勾选上的回调
    handlerSelectionChange(selection){
      // 当前收集的字段缺少
    },
    changeDefault(row){
      this.spuImageList.forEach(item=>{
        item.isDefault=0
      })
      row.isDefault=1;
      // 默认图片的地址
      this.skuInfo.skuDefaultImg=row.imgUrl;
    },
    cancel(){
      // 切换场景为0  
      this.$emit('changScenes',0)
      // 清除数据
      Object.assign(this._data,this.$options.data());
    },
    async save(){
      // 整理参数
      const {attrInfoList,skuInfo,spuSaleAttrList,imageList}=this;
      // 方法1
      // let arr=[];
      // attrInfoList.forEach(item=>{
      //   if(item.attrIdAndValueId){
      //     const [attrId,valueId]= item.attrIdAndValueId.split(":");
      //     let obj={valueId,attrId};
      //     arr.push(obj)
      //   }
      // })
      // 方法2
      // 整理平台属性
     skuInfo.skuAttrValueList= attrInfoList.reduce((prev,item)=>{
        if(item.attrIdAndValueId){
          const [attrId,valueId]= item.attrIdAndValueId.split(":");
          prev.push({attrId,valueId})
        }
        return prev
      },[])
      // 整理销售属性
      skuInfo.skuSaleAttrValueList= spuSaleAttrList.reduce((prev,item)=>{
        if(item.attrIdAndValueId){
          const [saleAttrId,saleAttrValueId]= item.attrIdAndValueId.split(":");
          prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
      },[])
      // 整理图片的数据
      skuInfo.skuImageList=imageList.map(item=>{
        return{
            "imgName": item.imgName,
            "imgUrl": item.imgUrl,
            "isDefault": item.isDefault,
            "spuImgId": item.id
        }
      })
     // 发请求
     let result=await this.$Api.spu.reqAddSku(skuInfo)
     if(result.code==200){
      this.$message({type:'success',message:'添加sku成功'})
      this.emit('changeScenes',0)
     }
    }
   
  }
}
</script>

<style></style>