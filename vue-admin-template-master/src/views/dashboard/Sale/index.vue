<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <div slot="header" class="clearfix">
        <!-- v-model="activeName" @tab-click="handleClick" -->
        <!-- 头部左侧内容 -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <!-- v-model="value1" -->
          <el-date-picker v-model="date" class="date" size="mini" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']" value-format="yyyy-MM-dd"> </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="16">
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="8" class="right">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="rindex">0</span>
                <span>KFC</span>
                <span class="rvalue">131432</span>
              </li>
              <li>
                <span class="rindex">1</span>
                <span>KFC</span>
                <span class="rvalue">131432</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span>KFC</span>
                <span class="rvalue">131432</span>
              </li>
              <li> <span>3</span>
                <span>KFC</span>
                <span class="rvalue">131432</span></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts';
import dayjs from 'dayjs';
import {mapState} from 'vuex'
export default {
  data() {
    return {
      activeName: 'sale',
      myCharts:null,
      date:[]
    }
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts)
    console.log('myCharts');
    this.myCharts.setOption({
      title:{
        text:this.title+'趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [],
          color:'yellowgreen'
        }
      ]
    })
  },
  watch:{
    title(){
      this.myCharts.setOption({
        title:{
          text:this.title
        },
        xAxis:{
          data:this.title='销售额'?this.listState.orderFullYearAxis:this.listState.userFullYearAxis
        },
        series:{
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: this.title=='销售额'?this.listState.orderFullYear:this.listState.userFullYear,
          color:'yellowgreen'
        }

})
    },
    listState(){
      this.myCharts.setOption({
      title:{
        text:this.title+'趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: this.listState.orderFullYear,
          color:'yellowgreen'
        }
      ]
    })
    }
   
  },
  computed:{
    title(){
      return this.activeName=='sale' ?'销售额':'访问量'
    },
    ...mapState({
      listState:state=>state.home.list
    })
  },
  methods:{
    setDay(){
      const day =dayjs().format('YYYY-MM-DD')
      this.date=[day,day]
    },
    setWeek(){
      const start =dayjs().day(1).format('YYYY-MM-DD')
      const end =dayjs().day(7).format('YYYY-MM-DD')
      this.date=[start,end]
    },
    setMonth(){
      const start =dayjs().startOf('month').format('YYYY-MM-DD')
      const end =dayjs().endOf('month').format('YYYY-MM-DD')
      this.date=[start,end]
    },
    setYear(){
      const start =dayjs().startOf('year').format('YYYY-MM-DD')
      const end =dayjs().endOf('year').format('YYYY-MM-DD')
      this.date=[start,end]
    },
  }
}
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0px 10px;
}
.date {
  width: 340px;
  margin: 0px 20px;
}
.charts{
  width: 100%;
  height: 300px;
}
ul{
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li{
  height: 8%;
  margin: 10px 0px;
}
.rindex{
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue{
  float: right;
}
</style>