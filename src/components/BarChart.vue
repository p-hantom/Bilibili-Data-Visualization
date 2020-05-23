<template>
<v-chart class="echarts" :options="bar"/>
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 600px;
  height: 710px;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'

export default {
    name: "BarChart",
  components: {
    'v-chart': ECharts
  },
  data () {
    let category = ['小王', '小李', '小赵', '小马', '小刘', '小张', '小齐'];
    let barData = [3100, 2142, 1218, 581, 431, 383, 163];

    return {
      bar: {
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
        xAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: category,
            splitLine: {show: false},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            offset: 10,
            nameTextStyle: {
                fontSize: 15
            }
        },
        dataZoom: [
        {
            type: 'slider',
            yAxisIndex: 0,
            start: 30,
            end: 80
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            start: 30,
            end: 80
        }
    ],       
        series: [
            {
                name: '数量',
                type: 'bar',
                data: barData,
                barWidth: 14,
                barGap: 10,
                smooth: true,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        offset: [5, -2],
                        textStyle: {
                            color: '#F68300',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7,
                        // color: new Echarts.graphic.LinearGradient(
                        //     0, 0, 1, 0,
                        //     [
                        //         {offset: 0, color: '#3977E6'},
                        //         {offset: 1, color: '#37BBF8'}

                        //     ]
                        // )
                    }
                }
            }
        ]
    }
    }
  }
}
</script>