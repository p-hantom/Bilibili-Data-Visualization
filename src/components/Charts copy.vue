<template>
    <div id="app">
        <div class="container">
        <div class="col1">
            <BarStackChart @selectUp="selectUp($event)" @selectUpName="selectUpName($event)" :rawDataProp="getUpData"/>
        </div>
        <div class="col2">
            <MainChart @selectUp="selectUp($event)" @selectUpName="selectUpName($event)" :rawDataProp="getUpData"/>
            <VideoLineChart :upId="upId" :rawDataProp="getVideoData"/>
        </div>
        <div class="col3">
            <WordCloud :upId="upId" :upName="upName" />
            <PopularityLineAndBarChart :upId="upId" :rawDataProp="getVideoData"/>
        </div>
        </div>
  </div>
</template>

<script>
import MainChart from './MainChart'
import VideoLineChart from './VideoLineChart'
import BarStackChart from './BarStack'
import PieAndLineChart from './PieAndLineChart'
import PopularityLineAndBarChart from './PopularityLineAndBarChart'
import WordCloud from './WordCloud'
export default {
  name: 'Charts',
  components: {
    MainChart,
    BarStackChart,
    VideoLineChart,
    PopularityLineAndBarChart,
    WordCloud,
  },
  data(){
    return {
      upId: "38351330",
      upName: "阿幕降临",
      upData: [],
      videoData: [],
    }
  },
  computed:{
    getUpData(){
      return this.$d3.csv('static/up_data.csv').then((d) => {
        this.upData = d;
        return d;
      })
    },
    getVideoData(){
      return this.$d3.csv('static/video_data.csv').then((d) => {
        this.videoData = d;
        return d;
      })
    }
  },
  methods:{
    selectUp(upId){
      this.upId = upId;
    },
    selectUpName(upName){
        this.upName = upName
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
}
.col1{
  width: 380px;
}
.col2{
  width: 575px;
}
.col3{
  border-left: 1px solid black;
  width: 700px;
}
.grid-content{
	border-radius: 4px;
	min-height: 1000px;
}
.grid-content2{
	border-radius: 4px;
	min-height: 700px;
	margin-bottom: 10px;
}
.grid-content3{
	border-radius: 4px;
	min-height: 400px;
}
.grid-content4{
	border-radius: 4px;
	min-height: 290px;
	margin-bottom: 10px;
}
.grid-content5{
	border-radius: 4px;
	min-height: 700px;
}
.bg-purple{
	background: rgba(170, 170, 255, 0.9);
	
}
</style>
