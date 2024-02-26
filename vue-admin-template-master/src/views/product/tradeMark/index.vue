<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="showDialog">添加</el-button>
    <!-- 表格组件 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" prop="prop" label="序号" width="80px"> </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"> </el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradMark(row)">删除</el-button>
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
    <el-pagination style="margin-top: 20px; textalign: center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="3" :pager-count="7" layout="prev, pager, next, jumper,->,sizes,total" @size-change="sizeChange" @current-change="getPageList" :total="total" background> > </el-pagination>

    <!-- 对话框 
      visible.sync：控制对话框显示与隐藏的
    
    -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
          <!-- 这里收集数据：不能使用v-model，因为不是表单元素
              action：设置图片上传的路径
              on-succes:图片上传成功执行一次
              before-upload:图片上传之前，执行一次
          -->
          <el-upload class="avatar-uploader" action="/dev1-api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
        
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    // 自定义校验规则
    var validateTmName = (rule, value, callback) => {
      console.log(value);
       if(value.length<2||value.length>10){
        callback(new Error('品牌名称2-10位'));
       }else{
        callback();
       }
      };
    return {
      // 代表分页器是第几页
      page: 1,
      // 当前页数展示多少条数据
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      // 上传图片
      imageUrl: '',
      tmForm:{
        tmName:'',
        logoUrl:''
      },
     //表单验证规则
     rules: {
        //品牌名称的验证规则
        //require:必须要校验字段（前面五角星有关系）  message 提示信息    trigger:用户行为设置（事件的设置:blur、change）
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          //自定义校验规则
          { validator: validateTmName, trigger: "change" },
        ],
        //品牌的logo验证规则
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  mounted() {
    // 获取列表数据方法
    this.getPageList()
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      // 这个写接口需要传参
      let result = await this.$Api.trademark.reqTradeMarkList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 当分页器某一页需要战术数据条数发生变化的时候触发
    sizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 点击显示对话框
    showDialog() {
      this.dialogFormVisible = true
      // 清理数据
      this.tmForm={tmName:'',logoUrl:''}
    },
    // 修改名牌
    updateTradeMark(row) {
      console.log(row);
      this.dialogFormVisible = true
      this.tmForm={...row}
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      // res 上传成功之后返回前端数据
      // file 上传成功之后服务器返回的数据
      this.tmForm.logoUrl=res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //添加按钮（添加品牌|修改品牌）
    addOrUpdateTradeMark() {
      //当全部验证字段通过，再去书写业务逻辑
      this.$refs.ruleForm.validate(async (success) => {
        //如果全部字段符合条件
        if (success) {
          this.dialogFormVisible = false;
          //发请求（添加品牌|修改品牌）
          let result = await this.$Api.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            //弹出信息:添加品牌成功、修改品牌成功
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            //添加或者修改品牌成功以后，需要再次获取品牌列表进行展示
            //如果添加品牌： 停留在第一页，修改品牌应该留在当前页面
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除品牌信息
    deleteTradMark(row){
      this.$confirm(`你确定删除${row.tmName}?`,  '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 向服务器发请求
          let result=await this.$Api.trademark.reqDeleteTradeMark(row.id);
          if(result.code==200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPageList(this.list.length>1?this.page:this.page-1);
          }
        }).catch(() => {
          // 
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
    },}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>