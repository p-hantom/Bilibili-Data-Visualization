<template>
  <div id="app">
    <!-- <VideoLineChart :upId="upId" :rawDataProp="getVideoData"/> -->
    <!-- <Test /> -->
    
    <router-view />
    <!-- <IntroductionPage /> -->
    <!-- <div class="container"> -->
      <!-- <div class="col1">
        <BarStackChart @selectUp="selectUp($event)" :rawDataProp="getUpData"/>
      </div>
      <div class="col2">
        <MainChart @selectUp="selectUp($event)" :rawDataProp="getUpData"/>
        <VideoLineChart :upId="upId" :rawDataProp="getVideoData"/>
      </div>
      <div class="col3">
        <WordCloud :upId="upId" />
        <PopularityLineAndBarChart :upId="upId" :rawDataProp="getVideoData"/>
      </div>
    </div> -->
    <!-- <PopularityLineAndBarChart :upId="upId" :rawDataProp="getVideoData"/> -->
    <!-- <MainChart @selectUp="selectUp($event)" :rawDataProp="getUpData"/> -->
    <!-- <VideoLineChart :upId="upId" :rawDataProp="getVideoData"/> -->
    <!-- <BarStackChart @selectUp="selectUp($event)" :rawDataProp="getUpData"/> -->
    <!-- <WordCloud :upId="upId" /> -->
  </div>
</template>

<!--

<script>
import MainChart from '@/components/MainChart'
import VideoLineChart from '@/components/VideoLineChart'
import BarStackChart from '@/components/BarStack'
import PieAndLineChart from '@/components/PieAndLineChart'
import PopularityLineAndBarChart from '@/components/PopularityLineAndBarChart'
import WordCloud from '@/components/WordCloud'
import IntroductionPage from '@/components/IntroductionPage'
import Test from '@/components/Test'
export default {
  name: 'App',
  components: {
    MainChart,
    BarStackChart,
    VideoLineChart,
    PopularityLineAndBarChart,
    WordCloud,
    IntroductionPage,
    Test
  },
  data(){
    return {
      upId: "38351330",
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

-->