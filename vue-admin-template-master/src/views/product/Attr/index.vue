<template>
  <div>
    <el-card style="margin: 20px 0px;">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
export default {
 data() {
  return {
   category1Id:'',
   category2Id:'',
   category3Id:'' 
  }
 },
 methods:{
  getCategoryId({categoryId,level}){
    if(level==1){
      this.category1Id=categoryId;
      this.category2Id='',
      this.category3Id=''
    }else if(level==2){
      this.category2Id=categoryId;
      this.category3Id='';
    }else{
      // 代表三级分类的id有了
      this.category3Id=categoryId
      // 发请求获取品牌属性
      this.getAttrList()
    }
  }
 }
}
</script>

<style>

</style>