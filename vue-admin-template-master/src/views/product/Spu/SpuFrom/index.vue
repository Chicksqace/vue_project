<template>
  <div>
    {{ unSelectSaleAttr }}
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="spu名称">
        <el-input placeholder="spu名称" value="123" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.Name" :value="tm.id" v-for="(tm, index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload action="/dev1-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="spuImageList" :on-success="handlerSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}项未选择`" v-model="attrIdAndName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect, index) in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width"></el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <!-- -->
              <el-tag :key="tag" v-for="(tag, index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"-->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm(row)"> </el-input>
              <!--  @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="index" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpateSpu">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import LogoVue from '../../../../layout/components/Sidebar/Logo.vue'
export default {
  name: 'SpuFrom',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        category3Id: 0,
        tmId: '',
        description: '',
        spuName: '',
        spuImageList: [
          // {
          //   "id": 0,
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "spuId": 0
          // }
        ],

        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: 'string',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: 'string',
          //       saleAttrName: 'string',
          //       saleAttrValueName: 'string',
          //       spuId: 0
          //     }
          //   ]
          // }
        ]
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
      attrIdAndName: '' //未选择的销售属性的id
    }
  },
  methods: {
    // 照片墙删除某个照片
    handleRemove(file, fileList) {
      // file 代表删除的照片
      // fileList 照片墙剩余的照片
      // 赋值
      this.spuImageList = file.url
      // 对于已有的图片，显示数据需要name，url字段，但是对于服务器来说，不需要这些字段，因此要对数据进行处理
    },
    // 图片预览回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 照片墙上传成功
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    // 初始化SpuForm数据
    async initSpuData(spu) {
      // spu信息
      let spuResult = await this.$Api.spu.reqSpu(spu.id)
      if (spuResult.code == 200) {
        this.spu = spuResult.data
      }
      // 品牌信息
      let tradeMarkResult = await this.$Api.spu.reqTradeMarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // spu图片
      let spuImageResult = await this.$Api.spu.reqSpuImageList(spu.id)
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data
        listArr.forEach((item) => {
          ;(item.name = item.imgName), (item.url = item.imgUrl)
        })
        this.spuImageList = listArr
      }
      // 平台全部的销售属性
      let saleResult = await this.$Api.spu.reqBaseSaleAttrList()
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 处理后的销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      // 向spu对象中的spuSaleAttrList属性中添加新的销售属性
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndName = ''
    },
    addSaleAttrValue(row) {
      console.log(row)
      // 点击销售属性当中添加按钮，需要button变成input，通过当前属性的inputVisible控制
      // 添加这个属性
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row
      // 属性值不能为空
      if (inputValue.trim() == '') {
        this.$message('属性值不能未空')
        return
      }
      // 属性值重复
      let result = row.spuSaleAttrValueList.every((item) => item.saleAttrValueName != inputValue)
      if (!result) {
        this.$message('属性值不能重复')
        return
      }
      // 新增的销售属性的值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      // 新增
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    async addOrUpateSpu() {
      // 整理参数
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url
        }
      })
      let result = await this.$Api.spu.reqAddOrUpdateSpu(this.spu)
      console.log(result)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '保存成功' })
        // 通知父组件回到场景0
        this.$emit('changeScene', {scene:0,flag:this.spu.id?'修改':'添加'});
      }
      Object.assign(this._data,this.$options.data());
    },
    //点击添加spu按钮的时候，发请求的函数
    async addSpuData(category3Id) {
      // 收集category3Id
      this.spu.category3Id=category3Id
      // 品牌信息
      let tradeMarkResult = await this.$Api.spu.reqTradeMarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 平台全部的销售属性
      let saleResult = await this.$Api.spu.reqBaseSaleAttrList()
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data
      }
      
    },
    // 取消按钮
    cancle(){
      this.$emit('changeScene', {scene:0,flag:''});
      // 清除数据
      Object.assign(this._data,this.$options.data());
      console.log(this.$options);
    }
  },
  computed: {
    unSelectSaleAttr() {
      let result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>