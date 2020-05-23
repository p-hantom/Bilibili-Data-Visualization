<template>
  <div ref="map" class="map"></div>
</template>

<script src="http://api.map.baidu.com/api?v=2.0&ak=xNc0dyS0cncf77zrGGWoauzfUBeymAdW"></script>

<!--  <script src="dist/extension/bmap.min.js"></script> 
 <script src="echarts/dist/extension/bmap.min.js"></script>-->
 <script src="../../node_modules/_echarts@4.7.0@echarts/dist/extension/bmap.min.js"></script>

<script>
import echarts from 'echarts'

export default {
  name: 'Map',
  data () {
    return {
      chart: echarts.ECharts,
      bmap: {},
      linesSeries: [],
      scatterSeries: [],
      effectScatterSeries: [],
      mapZoom: 6,
      trainIcon: `path://M678.4 122.9c75.1-11.3 145.5 11.7 202.6 65.8 58 54.9 85.7 127.4 77.9 203.3-7.9 75-48.8 149-117.8 214.4-19.3 18.3-71 67.5-145.1 138.2-33.3 31.8-68.9 65.7-104.6 99.8l-34.8 33.1-13.8 13.2c-16.6 15.8-43 15.8-59.6 0L363.1 775.9l-25.4-24.2c-50.9-48.5-101.9-97-152.8-145.4C116 541 75 466.9 67.1 391.8c-7.9-76 19.9-148.3 77.9-203.3 57.1-54.1 127.6-77.1 202.6-65.8 55.8 8.5 112.3 35.4 165.4 78.5 53.2-43 109.7-70 165.4-78.3z`
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () { // echarts配置
    let option = {
      // 加载 bmap 组件
      bmap: {
          // 百度地图中心经纬度
          center: [120.13066322374, 30.240018034923],
          // 百度地图缩放
          zoom: 14,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          mapStyle: {}
      },
      series: [{
          type: 'scatter',
          // 使用百度地图坐标系
          coordinateSystem: 'bmap',
          // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
          data: [ [120, 30, 1] ]
      }]
    }
    this.chart = echarts.init(this.$refs.map)
    this.chart.setOption(option)
    // 获取百度地图实例，使用百度地图自带的控件
    console.dir(this.chart)
    var bmap = this.chart.getModel().getComponent('bmap').getBMap();
    bmap.addControl(new BMap.MapTypeControl());
    }
  }
}
</script>
