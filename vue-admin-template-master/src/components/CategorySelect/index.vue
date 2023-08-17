<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cFrom">
  <el-form-item label="一级分类">
    <el-select  placeholder="请选择" v-model="cFrom.category1Id">
      <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key="c1.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="二级分类">
    <el-select  placeholder="请选择" value="">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="三级分类">
    <el-select  placeholder="请选择" value="">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
    name:'CategorySelect',
    // 组件挂载完毕，向服务器发请求
    data() {
      return {
        list1:[],
        cFrom:{
          category1Id:'',
          category2Id:'',
          category3Id:'',
        }
      }
    },
    mounted(){
      this.getCategory1List();
    },
    methods:{
      async getCategory1List(){
        let result=await this.$Api.attr.reqCategory1List();
        console.log(result);
        if(result.code==200){
          this.list1=result.data
        }
      }
    }
}
</script>

<style>

</style>