<template>
	<div>
		<div id="myChart" style="width: 80%;height: 600px;"></div>
	</div>
	
</template>

<script>
import echarts from 'echarts'
import * as d3 from 'd3'
export default {
  name: 'Test',
  mounted(){
    //his.SetEchart();
	this.DealData();
	// this.$nextTick(() => {
	// 	this.DealData();
	// });
  },
  data () {
    return {
      msg: 'Welcome',
    }
  },
  methods: {
	DealData(){
		d3.dsv(",","static/temp_data_sorb.csv", function(data1){
			console.log(data1);
			return {
				time: ""+data1.time,
				view: [""+data1.time.substring(0,10), +data1.view],
				favorite: [""+data1.time.substring(0,10), +data1.favorite],
				coin: [""+data1.time.substring(0,10), +data1.coin],
				share: [""+data1.time.substring(0,10), +data1.share],
			};
		}).then(function(data){
			
			console.log(data,"test");
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
			// console.log("view"+viewData);
			// console.log("favorite"+favoriteData);
			// console.log("coin"+coinData);
			// console.log("share"+shareData);
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
						return value.min;
						// return value.min-30000;
					},
					max: function(value){
						return value.max;
						// return value.max+30000;
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
				series:[
				// 	{
				// 	name: '播放量',
				// 	type: 'line',
				// 	//smooth: true,
				// 	//stack: '总量',
				// 	data: viewData,
				// },
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
    SetEchart(){
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
		var option = {
			title: {
				text: '4.1.4',    
			},
			tooltip : {
				//trigger: 'axis',
			},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar', 
				data: [5, 20, 36, 10, 10, 20]
			}]
	};
	myChart.setOption(option);
    }
  }
}

</script>

<style>
#myChart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  left:100px;
}
</style>
