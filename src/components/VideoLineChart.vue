<template>
	<div>
		<div class="upname">
			<div>{{upName}}</div>
		</div>
		<div id="myChart" style="width: 530px;height: 260px;"></div>
	</div>
	
</template>

<script>
import echarts from 'echarts'
import * as d3 from 'd3'
export default {
  name: 'VideoLineChart',
  props:['upId','rawDataProp','upName'],
  mounted(){
	// this.DealData();
	// this.$nextTick(() => {
	// 	this.DealData();
    // });
    this.loadData().then(this.dealData)
    .then(this.draw)
  },
  data () {
    return {
      rawData: [],
      data: []
    }
  },
  watch:{
    'upId'(){
      this.dealData();
      this.draw()
    }
  },
  methods: {
      loadData(){
        return this.$props.rawDataProp.then(d => {
            // console.log(d[0])
            this.rawData = d;
        });
      },
      dealData(){
		//   console.log("upid: "+this.$props.upId)
          this.data = this.rawData
            .filter((d) => d.owner == this.$props.upId)
            .map((data1) => {
              return {
				bvid: [""+data1.time.substring(0,10), ""+data1.bvid],
				title: [""+data1.time.substring(0,10), ""+data1.title],
                time: ""+data1.time,
                // view: [""+data1.view],
				// favorite: [""+data1.favorite],
				// coin: [""+data1.coin],
                // share: [""+data1.share],
                datetime: new Date(data1.time),
				view: [""+data1.time.substring(0,10), +data1.view],
				favorite: [""+data1.time.substring(0,10), +data1.favorite],
				coin: [""+data1.time.substring(0,10), +data1.coin],
				share: [""+data1.time.substring(0,10), +data1.share],
                }            
            })
			.sort((a, b) => a.datetime - b.datetime);
		// console.log(this.data.length)
      },
      draw(){
          let data=this.data
        //   console.log(data,"video")
          var viewData=[];
			var favoriteData=[];
			var coinData=[];
			var shareData=[];
			var titleData=[];
			var bvidData=[];
			//var theData = [["2020-03-10", 8851508], ["2019-12-08", 6589367], ["2020-03-02", 802968]];
			for(var i=0;i<data.length;i++){
				viewData.push(data[i].view);
				favoriteData.push(data[i].favorite);
				coinData.push(data[i].coin);
				shareData.push(data[i].share);
				bvidData.push(data[i].bvid);
				titleData.push(data[i].title);
				//theData.time = data[i].time.substring(0, 9);
			}
			//var allData=[viewData,favoriteData,coinData,shareData];
			let xmin = Math.min(...viewData), xmax = Math.max(...viewData)
			let myChart = echarts.init(document.getElementById('myChart'))

			var option2 = {
				grid: {
					x:80
				},
				legend: {
					data:['播放量', '点赞量', '投币量', '分享量'],
				},
				tooltip: {
					show: true,
					trigger: 'axis',
					formatter(params){
						// console.log(params)
						let result = params[0].value[0] + '<br/>';
						if(params.length>6){
							result+=params[11].seriesName+": "+params[11].value[1]+'<br/>';
							result+=params[9].seriesName+": "+params[9].value[1]+'<br/>';
							result+=params[7].marker+params[7].seriesName+": "+params[7].value[1]+'<br/>';
							result+=params[5].marker+params[5].seriesName+": "+params[5].value[1]+'<br/>';
							result+=params[3].marker+params[3].seriesName+": "+params[3].value[1]+'<br/>';
							result+=params[1].marker+params[1].seriesName+": "+params[1].value[1]+'<br/>';

							result+=params[10].seriesName+": "+params[10].value[1]+'<br/>';
							result+=params[8].seriesName+": "+params[8].value[1]+'<br/>';
							result+=params[6].marker+params[6].seriesName+": "+params[6].value[1]+'<br/>';
							result+=params[4].marker+params[4].seriesName+": "+params[4].value[1]+'<br/>';
							result+=params[2].marker+params[2].seriesName+": "+params[2].value[1]+'<br/>';
							result+=params[0].marker+params[0].seriesName+": "+params[0].value[1]+'<br/>';
						}
						else{
							for(let i=4;i<params.length;i++){
								result+=params[i].seriesName+": "+params[i].value[1]+'<br/>';
							}
							for(let i=0;i<params.length-2;i++){
								result+=params[i].marker+params[i].seriesName+": "+params[i].value[1]+'<br/>';
							}
						}
						
						return result;
					}
				},
				title: {
					//left: 'center',
					text: '',
				},
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'time',
					splitNumber: 13,
					/*axisLable: {
						formatter: function(value){
							return new Date(value).toLocaleTimeString();
						}
					},*/
					
				},
				yAxis: { 
					type: 'value',
					//interval: 100000,
					boundaryGap: ["0", "100%"],
					min: function(value){
						return value.min-30000;
					},
					max: function(value){
						return value.max+30000;
					},
					// interval: ((xmax+30000)-(xmin-30000))/5
					// interval: (value) => {
					// 	console.log(value)
					// 	return ((value.max+30000)-(value.min-30000))/5},
					// axisLabel: {
					// 	formatter: "{value}"
					// }
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					yAxisIndex: [0],
					start: 0,
					end: 70
				}, {
					type: 'inside',
					yAxisIndex: [0],
					start: 1
				},{
					type: 'slider',
					show: true,
					xAxisIndex: [0],
					start: 1, 
					end: 30
				},{
					type: 'inside',
					xAxisIndex: [0],
					start: 1,
					end: 10
				}],
				series:[
					{
					name: '播放量',
					type: 'line',
					//smooth: true,
					//stack: '总量',
					data: viewData,
					color: "#ff6c98"
				},
				{
					name: '点赞量',
					type: 'line',
					//smooth: true,
					//stack: '总量',
					data: favoriteData,	
					color: "#958dfa"			
				},
				{
					name: '投币量',
					type: 'line',
					//stack: '总量',
					data: coinData,
					color: "#54d497"
				},
				{
					name: '分享量',
					type: 'line',
					//stack: '总量',
					data: shareData,
					color: "#ffd876"
				},
				{
					name: '视频号',
					type: 'line',
					//stack: '总量',
					data: bvidData,
				},
				{
					name: '标题',
					type: 'line',
					//stack: '总量',
					data: titleData,
				},]
			};
			myChart.setOption(option2,true);
      },
	DealData(){
		d3.dsv(",","static/temp_data_sorb.csv", function(data1){
			//console.log(data1);
			return {
				time: ""+data1.time,
				view: [""+data1.time.substring(0,10), +data1.view],
				favorite: [""+data1.time.substring(0,10), +data1.favorite],
				coin: [""+data1.time.substring(0,10), +data1.coin],
				share: [""+data1.time.substring(0,10), +data1.share],
			};
		}).then(function(data){
			
			//console.log(data);
			var viewData=[];
			var favoriteData=[];
			var coinData=[];
			var shareData=[];
			//var theData = [["2020-03-10", 8851508], ["2019-12-08", 6589367], ["2020-03-02", 802968]];
			for(var i=0;i<data.length;i++){
				viewData.push(data[i].view);
				favoriteData.push(data[i].favorite);
				coinData.push(data[i].coin);
				shareData.push(data[i].share);
				//theData.time = data[i].time.substring(0, 9);
			}
			//var allData=[viewData,favoriteData,coinData,shareData];
			let myChart = echarts.init(document.getElementById('myChart'))
			var option2 = {
				legend: {
					data:['播放量', '点赞量', '投币量', '分享量'],
				},
				tooltip: {
					show: true,
					trigger: 'axis',
				},
				title: {
					//left: 'center',
					text: '4.1.4',
				},
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'time',
					splitNumber: 13,
					/*axisLable: {
						formatter: function(value){
							return new Date(value).toLocaleTimeString();
						}
					},*/
					
				},
				yAxis: { 
					type: 'value',
					//interval: 100000,
					boundaryGap: ["0", "100%"],
					min: function(value){
						return value.min-30000;
					},
					max: function(value){
						return value.max+30000;
					},
					},
				dataZoom: [{
					type: 'slider',
					show: true,
					yAxisIndex: [0],
					start: 0,
					end: 100
				}, {
					type: 'inside',
					yAxisIndex: [0],
					start: 1
				},{
					type: 'slider',
					show: true,
					xAxisIndex: [0],
					start: 1, 
					end: 100
				},{
					type: 'inside',
					xAxisIndex: [0],
					start: 1,
					end: 10
				}],
				series:[{
					name: '播放量',
					type: 'line',
					//smooth: true,
					//stack: '总量',
					data: viewData,
				},
				{
					name: '点赞量',
					type: 'line',
					//smooth: true,
					//stack: '总量',
					data: favoriteData,					
				},
				{
					name: '投币量',
					type: 'line',
					//stack: '总量',
					data: coinData,
				},
				{
					name: '分享量',
					type: 'line',
					//stack: '总量',
					data: shareData,
				}]
			};
			myChart.setOption(option2,true);
		});


	},
  }
}

</script>

<style scoped>
.upname{
	position: relative;
	float: left;
	font-size: 12px;
	color: #747677;
}
#myChart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  border-top: 1px solid black;
  /* padding-top: 30px; */
  /* left:100px; */
}
</style>
