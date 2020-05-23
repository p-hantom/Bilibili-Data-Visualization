<template>
  <div>

    <div class="pieChart">
          <div class="upname">
      <div>{{upName}}</div>
		</div>
      <div id="pieChart" :style="{width: '550px', height: '250px'}"></div>
    </div>
    <div class="lineAndBarChart">
          <div class="upname">
      <div>{{upName}}</div>
		</div>
      <div id="lineAndBarChart"></div>
    </div>
    
  </div>
</template>

<style>
.upname{
	position: relative;
	float: left;
	font-size: 12px;
	color: #747677;
}
#pieChart{
  padding-left: 20px;
  /* padding-top: 10px; */
  border-bottom: 1px solid black;
}
#lineAndBarChart{
  width: 590px;
  height: 260px;
  /* padding-left: 45px; */
}
</style>

<script>
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";

export default {
  name: "PopularityLineAndBarChart",
  props:['upId','rawDataProp','upName'],
  data() {
    return {
      rawData:{},
      data: {},
      myChart:{},
      colors: [
            "#ff6c98",
            "#958dfa",
            "#54d497",
            "#ffd876",
            "#f7be71",
            "#8ec218",
            "#f5a3c7",
            "#ee9a37",
            "#7978f8",
            "#ff7276",
            "#119bff",
            "#ffbe0a",
            "#a029a9",
            "#89c152",
            "#357aa1"
        ],
      upid: "38351330",
      videos: [],
      popularityList: [], //line chart
      lengthSecondsList: [], //bar chart
      timeList: [], //xaxis
      titleList: [],
      bvidList: [],
      types: [],
      typeAndValue: []
    };
  },
  mounted() {
    this.loadData()
      .then(this.processData)
      .then(this.draw);
  },
  watch:{
    'upId'(){
      this.processData()
      this.draw()
    }
  },
  methods: {
    loadData() {
      this.myChart = this.$echarts.init(
        document.getElementById("lineAndBarChart")
      );
      // return this.$d3.csv("static/video_data.csv").then(d => {
      //   this.rawData = d;
      // });
      return this.$props.rawDataProp.then(d => {
        // console.log(d[0])
        this.rawData = d;
      });
    },
    processData() {
      
      this.videos = [];
      this.popularityList=[];
      this.lengthSecondsList = [];
      this.timeList = [];
      this.typeAndValue = [];
      this.types = [];
      this.titleList = [];
      this.bvidList = [];
      this.data = this.rawData.filter(video => video.owner == this.$props.upId);

      this.videos = this.data
        .map(video => {
          let lengthSecondsArr = video.length.split(":");
          let x60 = (lengthSecondsArr.length - 1) * 60;
          let lengthSeconds = 0;
          for (let time of lengthSecondsArr) {
            lengthSeconds += parseInt(time) * x60;
            x60 /= 60;
          }
          let popularity =
            parseInt(video.view) * 0.2 +
            parseInt(video.favorite) * 0.2 +
            parseInt(video.share) * 0.3 +
            parseInt(video.coin) * 0.3;

          return {
            bvid: video.bvid,
            title: video.title,
            // coin: parseInt(video.coin),
            // favorite: parseInt(video.favorite),
            // share: parseInt(video.share),
            // view: parseInt(video.view),
            popularity: popularity.toFixed(0),
            length: video.length,
            lengthSeconds: lengthSeconds,
            type_name: video.type_name,
            time: new Date(video.time),
            timeFormatted: video.time.split(" ")[0]
          };
        })
        .sort((a, b) => a.time - b.time);

      for (let video of this.videos) {
        this.popularityList.push(video.popularity);
        this.lengthSecondsList.push(video.lengthSeconds);
        this.timeList.push(video.timeFormatted);
        this.bvidList.push(video.bvid);
        this.titleList.push(video.title);
      }

      let typeAndValueTemp = this.data.reduce((acc, cur) => {
        let current = acc[cur.type_name] || {
          type: cur.type_name,
          value: 0
        };
        current.value += 1;
        acc[cur.type_name] = current;
        return acc;
      }, {});
      // console.log(typeAndValueTemp);
      this.typeAndValue = Object.keys(typeAndValueTemp).map(x => {
        this.types.push(x);
        return {
          name: x,
          value: typeAndValueTemp[x].value
        };
      });
      // console.log(this.types)
      // console.log(this.typeAndValue);

      // return this.videos;
    },
    draw() {
      let popilarityMax = Math.max(...this.popularityList);
      let lengthMax = Math.max(...this.lengthSecondsList);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          },
          formatter(params){
						console.log(params)
            let result = params[0].name + '<br/>';
            result+=params[params.length-2].seriesName+": "+params[params.length-2].value+'<br/>';
            result+=params[params.length-1].seriesName+": "+params[params.length-1].value+'<br/>';

            if(params.length==4){
                result+=params[0].marker+params[0].seriesName+": "+params[0].value+'<br/>';
                let time = parseInt(params[1].value);                
                result+=params[1].marker+params[1].seriesName+": "+
                  `${Math.floor(time/60)}'${(time%60).toFixed(0)}''`
            }
            else{
              if(params[0].seriesName!='视频受欢迎程度'){
                let time = parseInt(params[0].value);
                result+=params[0].marker+params[0].seriesName+": "+
                  `${Math.floor(time/60)}'${(time%60).toFixed(0)}''`
                }
              else{
                result+=params[0].marker+params[0].seriesName+": "+params[0].value+'<br/>';
              }
            }
            
						return result;
					}
        },
        grid: {
          x:80
        },
        legend: {
          data: ["视频时长", "视频受欢迎程度"]
        },
        xAxis: [
          {
            type: "category",
            data: this.timeList,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "视频受欢迎程度",
            min: 0,
            max: popilarityMax,
            interval: popilarityMax / 5,
            axisLabel: {
              // formatter: "{value}"
              formatter: (value, index) => {
                return Math.floor(value)
              }
            }
          },
          {
            type: "value",
            name: "视频时长",
            min: 0,
            max: lengthMax,
            interval: (lengthMax/5),
            axisLabel: {
              formatter: (value, index) => {
                let interval = lengthMax/5;
                let arr = [0, `${interval%60}'${(interval/60).toFixed(0)}''`]
                // console.log(`${value%60}'${(value/60).toFixed(0)}''`)
                return `${Math.floor(value/60)}'${(value%60).toFixed(0)}''`
                // return `${(value%60).toFixed(0)}'${(value/60).toFixed(0)}''`
              }
            }
          }
        ],
        dataZoom: {
          show: true,
          realtime: true,
          start: 0,
          end: 30
        },
        calculable: false,
        series: [
          {
            name: "视频受欢迎程度",
            type: "line",
            data: this.popularityList,
            lineStyle: {
              color: '#2f4554'
            }
          },
          {
            name: "视频时长",
            type: "bar",
            yAxisIndex: 1,
            data: this.lengthSecondsList,
            itemStyle: {
              normal: {
                color: (params) => {
                  let curType = this.videos[params.dataIndex].type_name;
                  let index = this.types.indexOf(curType);
                  // console.log(index)
                  // console.log(this.colors[index % this.colors.length])
                  return this.colors[index % this.colors.length];
                }
              }
            }
          },
          {
            name: '视频号',
            type: 'line',
            //stack: '总量',
            data: this.bvidList,
          },
          {
            name: '标题',
            type: 'line',
            //stack: '总量',
            data: this.titleList,
          }
        ]
      };
      // let myChart = this.$echarts.init(
      //   document.getElementById("lineAndBarChart")
      // );
      this.myChart.setOption(option);
      
      //---------------------------------

      let pieOption = {
        title: {
          text: "视频分区统计",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: "right",
          data: this.types
        },
        color: this.colors,
        series: [
          {
            name: "视频分区",
            type: "pie",
            radius: "55%",
            center: ["40%", "60%"],
            data: this.typeAndValue,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        grid: {
          x:70
        }
      };
      let myPieChart = this.$echarts.init(
        document.getElementById("pieChart")
      );
      myPieChart.setOption(pieOption);
    }
  }
};
</script>