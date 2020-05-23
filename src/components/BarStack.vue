<template>
  <div class="barStackChart">
    <div id="barStackChart" :style="{width: '380px', height: '710px'}"></div>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "BarStackChart",
  props:['rawDataProp'],
  data() {
    return {
      upId: [],
      follows: [],
      likes: [],
      view: [],
      name: [],
      rawData: [],
      map: new Map()
    };
  },
  mounted() {
    this.loadData()
      .then(this.processData)
      .then(this.draw);
  },
  methods: {
    loadData() {
      return this.$props.rawDataProp.then(d => {
        this.rawData = d;
      });
    },
    processData() {
      let data = this.rawData
      console.log(data);
      data.sort((a,b) => parseInt(a.follower)-parseInt(b.follower))
      let idx = 0;
      for (let item of data) {
        // console.log(item.likes)
        this.upId.push(item.mid);
        this.follows.push(item.follower);
        this.view.push(item.view);
        this.likes.push(parseInt(item.likes));
        this.name.push(item.name);
        this.map.set(item.name, item.mid)
      }
    },
    draw() {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["粉丝数", "点赞"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLabel:{
          interval: 0,
          rotate: 30
        },
        },
        yAxis: {
          type: "category",
          data: this.name,
        },        
        dataZoom: [
          {
          yAxisIndex: [0],
          show: true,
          realtime: true,
          start: 100,
          end: 80
        },
        // {
				// 	type: 'slider',
				// 	show: true,
				// 	xAxisIndex: [0],
				// 	start: 0, 
				// 	end: 90
        // }
        ],
        series: [
          {
            // barWidth: 20,
            name: "粉丝数",
            type: "bar",
            stack: "总量",
            label: {
              show: false,
              position: "insideRight"
            },
            data: this.follows,
            color: "#ffd876"
            
          },
        //   {
        //     name: "观看数",
        //     type: "bar",
        //     stack: "总量",
        //     label: {
        //       show: true,
        //       position: "insideRight"
        //     },
        //     data: this.view
        //   },
          {
            name: "点赞",
            type: "bar",
            stack: "总量",
            label: {
              show: false,
              position: "insideRight"
            },
            data: this.likes,
            color: "#ff6c98"
          },
        ]
      };
        let myChart = this.$echarts.init(document.getElementById('barStackChart'))
        myChart.setOption(option)
        
        myChart.on('click', params => {
            this.$emit('selectUp', this.map.get(params.name))
            this.$emit('selectUpName', params.name)
            // console.log(params.name)
        })
    }
  }
};
</script>