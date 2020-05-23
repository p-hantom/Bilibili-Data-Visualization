<template>
<v-chart  class="echarts" :options="line"/>
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
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'

export default {
    name: "LineChart",
    components: {
        'v-chart': ECharts
    },
    data() {
        return{
        line: {
        title : {
            text: '未来一周气温变化',
            subtext: '纯属虚构',
        },
        tooltip : {
        	show: true,
            trigger: 'axis'
        },
        legend: {
            data:['蒸发量','降水量'],
            left: "left"
            },
        calculable : true,
        dataZoom:{
        	show: true,
        	realtime: true,
        	start: 50,
        	end: 100
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap: false, // 类目起始和结束两端空白策略,默认true留空,false则顶头
                data : function(){
                	var list = [];
                	for(var i=1;i<=30;i++){
                    list.push('2013-03-'+i);
                	}
                	return list;
                }()
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'最高',
                type:'line',
                data:function(){
                	var list = [];
                	for(var i=1;i<=30;i++){
                    list.push(Math.round(Math.random()*30));
                	}
                	return list;
                }()
            },
            {
                name:'最低',
                type:'line',
                data:function(){
                	var list = [];
                	for(var i=1;i<=30;i++){
                    list.push(Math.round(Math.random()*10));
                	}
                	return list;
                }()
            }
        ]
    }
        }
    }
}
</script>