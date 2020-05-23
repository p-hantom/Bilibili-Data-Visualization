<template>
  <div>
    <div class="container">
      <div ref="map" id="map" :style="{width: '700px', height: '700px'}"></div>
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

<script src="http://api.map.baidu.com/api?v=2.0&ak=xNc0dyS0cncf77zrGGWoauzfUBeymAdW"></script>

<!--  <script src="dist/extension/bmap.min.js"></script> -->
 <script src="../../node_modules/_echarts@4.7.0@echarts/dist/extension/bmap.min.js"></script>
<script>
// import '../../node_modules/_echarts@4.7.0@echarts/dist/extension/bmap.min.js'
// import 'echarts/extension/bmap/bmap'
export default {
  name: "Map",
  components: {},
  data() {
    return {
      // geojsonRaw: geojsonRaw,
      geojson: {},
      provTotal: [],
      echartsData: [],
      chart: this.$echarts.ECharts,
      bmap: {},
      option: {
        title: {
          text: "全国主要城市空气质量 - 百度地图",
          subtext: "data from PM25.in",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd"
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.convertData,
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false
            },
            itemStyle: {
              color: "purple"
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
        //   {
        //     name: "Top 5",
        //     type: "effectScatter",
        //     coordinateSystem: "bmap",
        //     data: convertData(
        //       data
        //         .sort(function(a, b) {
        //           return b.value - a.value;
        //         })
        //         .slice(0, 6)
        //     ),
        //     symbolSize: function(val) {
        //       return val[2] / 10;
        //     },
        //     showEffectOn: "render",
        //     rippleEffect: {
        //       brushType: "stroke"
        //     },
        //     hoverAnimation: true,
        //     label: {
        //       formatter: "{b}",
        //       position: "right",
        //       show: true
        //     },
        //     itemStyle: {
        //       color: "purple",
        //       shadowBlur: 10,
        //       shadowColor: "#333"
        //     },
        //     zlevel: 1
        //   }
        ]
      }
    };
  },
  mounted() {
    // this.loadData()
    this.loadData().then(this.drawMap);
  },
  methods: {
    loadData() {
      // this.$papa.parse('../assets/province_confirmed_total.csv',{
      //     complete: function(results){
      //         this.provTotal = results;
      //         console.log(results)
      //     }
      // })
      // this.provTotal = this.$d3.csv('../assets/province_confirmed_total.csv');
      // console.log(this.provTotal)
      // console.log(this.geojsonRaw.features[0])

      // this.geojson = this.geojsonRaw.features.map(x => {
      //     return {
      //         name: x.properties.name,
      //         coords: x.properties.cp
      // }})
      // console.log(this.geojson)
      // this.$d3.json('../assets/province_geo.json').then(data => {
      //     console.log(data)
      // })
      // this.$d3.csv('../assets/province_confirmed_total.csv').then(data => {
      //     console.log(data)
      // })

      // return Promise.all([
      //     this.$d3.csv('../assets/province_confirmed_total.csv'),
      //     // this.$d3.json('../assets/province_geo.json'),
      // ]).then(datasets => {
      //     this.provTotal = datasets[0];
      //     // this.geojson = datasets[1];
      // })

      // this.$axios.get('../../static/province_confirmed_total.csv')
      //     .then((res)=>{
      //         console.log(res)
      //     })

      return this.$axios
        .all([
            this.$axios.get("static/province_confirmed_total.csv"),
          // this.$axios.get("../../static/province_confirmed_total.csv"),
          this.$axios.get("../../static/province_geo.json")
        ])
        .then(
          this.$axios.spread((...responses) => {
            // console.log(responses[0])
            // console.log(responses[1])
            let temp = responses[0].data.split("\n");
            this.provTotal = temp.slice(1).map(item => {
              let x = item.split(",");
              return {
                name: x[0],
                value: x[1]
              };
            });
            console.log(this.provTotal);

            // this.geojson = responses[1].data.features.map(x => {
            //   return {
                
            //     name: x.properties.name,
            //     coords: x.properties.cp
            //   };
            // });
            this.geojson={};
            for(let x of responses[1].data.features){
                this.geojson[x.properties.name] = x.properties.cp
            }
            console.log(this.geojson);
            return [this.provTotal, this.geojson];
          })
        );
    },
    convertData(){
        for(let i=0;i<this.provTotal.length;i++){
            let provName = this.provTotal[i].name;
            let geoCoord = this.geojson[provName];
            if(geoCoord){
                res.push({
                    name: provName,
                    value: geoCoord.concat(this.provTotal[i].value)
                });
            }
        }
        console.log(res)
        return res;
    },
    drawMap() {
//         console.log(this.$refs.map)
//         let myMap1 = this.$echarts.init(this.$refs.map);
//     //   let myMap = this.$echarts.init(document.getElementById("map"));
//       myMap1.setOption(this.option);
//       console.log("mymap")
// console.dir(myMap1.getModel())
//       this.bmap = myMap1.getModel().getComponent('bmap').getBMap()
      this.chart = this.$echarts.init(this.$refs.map)
      this.bmap = this.chart.getModel().getComponent('bmap').getBMap()
    //   this.bmap.setMinZoom(6) // 设置地图最小缩放比例
    //   this.bmap.setMaxZoom(12) // 设置地图最大缩放比例
      // this.bmap.addControl(new BMap.MapTypeControl({ mapTypes: [] })) // 不显示地图右上方的控件
    //   this.bmap.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT })) // 在左下角显示比例尺控件
    //   const _this = this
      // 监听地图比例缩放， 可以根据缩放等级控制某些图标的显示
    //   this.bmap.addEventListener('zoomend', function () {
    //     _this.mapZoom = _this.bmap.getZoom()
    //   })

    }
  }
};
</script>