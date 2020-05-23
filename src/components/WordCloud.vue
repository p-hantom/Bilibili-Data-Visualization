<template>
  <div>
	<div class="title">
		<div>{{upName}}</div>
	</div>
	<div class="wordCloud">
		<div class="upname">
			<div>{{upName}}</div>
		</div>
		<div id="wordCloud" ></div>
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
#wordCloud{
	height: 151px;
	width: 575px;
}
	.wordCloud{
		border-bottom: 1px solid black;
		height: 151px;
	}
	.title{		
		display: flex;
		font-weight: bold;
		font-size: 20px;
		padding-bottom: 10px;
		border-bottom: 1px solid black;
		justify-content: center;
	}
</style>

<script>
import "echarts-wordcloud";
export default {
  name: "WordCloud",
  props:['upId','upName'],
  data() {
    return {
	//   upId: "",
	  data: []
    };
  },
  mounted() {
    this.setCloud().then(this.draw)
  },
  watch:{
    'upId'(){
      this.draw()
    }
  },
  methods: {
    setCloud(){
        // let loadDsv = this.$d3.dsv(",","iso-8859-1")
		return this.$d3.dsv(",","static/word_data_new.csv",function(data){
			// console.log(data);
			return {
				
				mid: ""+data.mid,
				words: ""+data.words,
			};
		}).then((data) => this.data = data);
	},
	draw(){
			let curData = this.data.filter(x => x.mid==this.$props.upId)[0];

			var str = curData.words.split(",");
			//console.log(str);
			str[0] = str[0].substring(1,str[0].length)
			str[str.length-1] = str[str.length-1].substring(0, str[str.length-1]-1);
			var upWord=[]
			for(var i=0;i<str.length;i++){
				var array = str[i].replace("\"","");
				array = array.replace(':', ',');
				// console.log(array.split(','));
				upWord.push(array.split(','));
			}
			// console.log(upWord[0][0].replace("'","").replace("'",""),upWord[0][1]);

			var cloudData=[str.length-1];
			for(i=0;i<str.length-1;i++){
				var t={
					name: String,
					value: Number
				}
				t.name=upWord[i][0];
				t.name = t.name.replace("'","").replace("'","")
				t.value = Number(upWord[i][1])*100;
				// console.log(t);
				cloudData.push(t);
			}
			// console.log(cloudData);
			let wordCloud = this.$echarts.init(document.getElementById('wordCloud'))
			
			var option = {
				series: [
					{
						type: "wordCloud",
						gridSize: 10,
						sizeRange: [14, 60],
						rotationRange: [0, 0],
						//maskImage: maskImage,
						textStyle: {
							normal: {
								color: function() {
									return (
										"rgb(" + Math.round(Math.random()*255) + ", " +
										Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")"
									);
								}
							}
						},
						// left: "center",
						// width: "150%",
						// height: "100%",
						data: cloudData
					}
				]
			}
			wordCloud.setOption(option);
	}
  }
};
</script>