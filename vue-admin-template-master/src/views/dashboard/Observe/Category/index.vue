<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="charts" ref="charts"></div>
  </el-card>
</template>
  
  <script>
import echarts from 'echarts'
export default {
  data() {
    return {
      value: '全部渠道'
    }
  },
  mounted() {
    //饼图
    let myCharts = echarts.init(this.$refs.charts)
    myCharts.setOption({
      title:{
        text:'Search Engine',
        subText:1048,
        left:'center',
        top:'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outsize'
          },
          
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    myCharts.on('mouseover',(params)=>{
      //  鼠标移上获取数据
      const {name,value}=params.data
      // 重新设置标题
      myCharts.setOption({
        title:{
          text:name,
          subtext:value
        }
      })
    })
  }
}
</script>
  
<style>
.header {
  border-bottom: 1px solid #eee;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>