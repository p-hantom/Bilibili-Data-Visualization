<template>
<!-- <el-main> -->
    <div id="app">
        <div class="container">
          <div class="col1">
               <el-button @click="drawer = true" type="text" class="helpButton">
								HELP
							</el-button>
              <BarStackChart @selectUp="selectUp($event)" @selectUpName="selectUpName($event)" :rawDataProp="getUpData"/>
          </div>
          <div class="col2">
              <MainChart @selectUp="selectUp($event)" @selectUpName="selectUpName($event)" :rawDataProp="getUpData"/>
              <VideoLineChart :upId="upId" :rawDataProp="getVideoData" :upName="upName"/>
          </div>
          <div class="col3">
              <WordCloud :upId="upId" :upName="upName" />
              <PopularityLineAndBarChart :upId="upId" :rawDataProp="getVideoData" :upName="upName"/>
          </div>
        </div>

        <el-drawer
          title="帮助文档"
          :visible.sync="drawer"
          :with-header="false">
          <el-scrollbar style="height: 70%;">
            <!-- <div>hello</div>
            <div v-html="HelpHtml" >{{HelpHtml}}</div> -->
            <div  id='write'  class = 'help-text'>
              <h1><a name="帮助文档" class="md-header-anchor"></a><span>帮助文档</span></h1>
              <h3><a name="一概述" class="md-header-anchor"></a><span>一、概述</span></h3>
              <p><span>本帮助文档旨在帮助用户轻松理解并使用基于2019年B站百大UP主数据的可视分析系统。</span></p>
              <h3><a name="二操作流程" class="md-header-anchor"></a><span>二、操作流程</span></h3>
              <p><span>首先进入网站主页（推荐使用Chrome浏览器），可观看展示视频及以走马灯形式呈现的2019年百大UP主介绍。然后，点击右下角的“进入可视分析系统”字样可进入可视分析页面，进行可视分析操作。</span></p>
              <h3><a name="三up主粉丝数及点赞数堆叠条形图" class="md-header-anchor"></a><span>三、UP主粉丝数及点赞数堆叠条形图</span></h3>
              <p><span>该视图位于可视分析页面的左侧，可以显示2019年百大UP主粉丝数和点赞数的相关信息。用户可以鼠标悬停在某一条形图上查看具体数据，也可以点击某一条形使得其他与之联动的视图显示此UP主的其他信息。拖动右侧的滚动条可以查看未显示在区域内的UP主的内容。拖动滚动条末端可以改变显示范围。</span></p>
              <h3><a name="四up主总体数据分布情况旭日图主视图）" class="md-header-anchor"></a><span>四、UP主总体数据分布情况旭日图（主视图）</span></h3><p><span>该视图位于屏幕中央，显示2019年百大UP主制作视频的分区分布情况及投稿量分布情况。用户可以通过点击查看某一分区的详细情况，或点击某一UP主对应方格，使得其他与之联动的视图显示此UP主的其他信息。</span></p>
              <h3><a name="五up主制作视频播放量点赞量投币量分享量复合折线图" class="md-header-anchor"></a><span>五、UP主制作视频播放量、点赞量、投币量、分享量复合折线图</span></h3><p><span>该视图位于屏幕中间下方，显示2019年百大UP主在B站制作的全部视频的播放量、点赞量、投币量、分享量的变化情况。可以点击文字“播放量”、“点赞量”等文字左侧的图标消去或显示某一数据的折线；点击图例右侧的按钮可分别实现缩放、缩放、还原及保存为图片的功能。视图的下方与右侧各有一滚动条，以实现查看不同区域信息及改变显示范围。</span></p>
              <h3><a name="六视频时长条形图及视频受欢迎程度折线图复合图" class="md-header-anchor"></a><span>六、视频时长条形图及视频受欢迎程度折线图复合图</span></h3><p><span>该视图位于屏幕右下方，显示显示2019年百大UP主在B站制作的全部视频的视频时长分布、分区分布及视频受欢迎成都变化趋势。</span></p><p>&nbsp;</p></div>
          </el-scrollbar>
          <!-- <div v-html="HelpHtml">{{HelpHtml}}</div> -->
        </el-drawer>
  </div>
  
<!-- </el-main> -->
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
    this.title = this.readFile('static/帮助文档.html');
    return {
      upId: "38351330",
      upName: "阿幕降临",
      upData: [],
      videoData: [],
      drawer: false,
      HelpHtml: this.title.response,
    }
  },
  mounted() {
	  this.readFile();
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
    },
    readFile(filePath) {
      // 创建一个新的xhr对象
      let xhr = null
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        // eslint-disable-next-line
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
      console.log(xhr)
      //console.log("xxxxxx"+xhr.responseText)
        //const okStatus = document.location.protocol === 'file' ? 0 : 200
        xhr.open('GET', filePath, false)
        xhr.overrideMimeType('text/html;charset=utf-8')
        xhr.send(null)
        //return xhr.status === okStatus ? xhr.responseText : null
      return xhr
    },
  }
}
</script>

<style scoped>
.container{
  display: flex;
}
#write { margin: 0px auto; height: auto; width: inherit; word-break: normal; word-wrap: break-word; position: relative; white-space: normal; overflow-x: visible; padding-top: 40px; }
.help-text{
  height: 100%;
  background-color: rgb(37, 37, 37);
}
.help-text h1{
  color: #DEDEDE;
}
.help-text h3{
  color: rgb(153, 153, 153);
}
.help-text p{
  color: #DEDEDE;
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
.helpButton{
  color:aliceblue;
  background-color: gold;
  float: left;
  position: relative;
  z-index: 10;
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
