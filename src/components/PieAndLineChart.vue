<template>
<div>
    <p>hello</p>
    <div class="pieChart">
        <div id="pie" :style="{width: '300px', height: '300px'}"></div>
    </div>
    <div class="lineChart echarts">
        <div id="line" :style="{width: '300px', height: '300px'}"></div>
    </div>
</div>

</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 600px;
  height: 400px;
}
</style>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'

export default {
    name: "PieAndLineChart",
    props:['upName'],
    data(){
        return {
            provTotal:{},
            geojson:{}
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        loadData(){
            this.$d3.csv('static/up_data.csv').then(data => {
                console.log(data)
            })
            // Promise.all([
            //     this.$d3.csv('../assets/province_confirmed_total.csv'),
            //     this.$d3.json('../assets/province_geo.json'),
            // ]).then(datasets => {
            //     this.provTotal = datasets[0];
            //     this.geojson = datasets[1];
            //     console.log(this.provTotal)
            // })
        },
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById('line'))
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
}
</script>