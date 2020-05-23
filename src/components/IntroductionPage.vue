<template>
  <div class="hello bg-gray">
	<el-main>
		<el-carousel height="700px" width="100%">
			<!--el-carousel-item v-for="item in 4" :key="item">
				<h3 class="small">{{item}}</h3>
			</el-carousel-item-->
			<el-carousel-item>
				<el-col :span="24">
					<video src="../assets/video_Trim.mp4" style="width: 100%; height: 100%;" autoplay loop muted></video>
					<el-image 
							:src="require('@/assets/title3.png')">
					</el-image>
					<div style="margin-top: 520px;">
					<el-row type="flex" justify="start" height="28px">
						<!-- <el-col :span="1">
							<el-button @click="drawer = true" type="text" style="color: #FFFFFF;">
								HELP
							</el-button>
						</el-col> -->
						<el-col :span="2" offset="21" >
                            
							<el-link icon="el-icon-arrow-right" href="/chartx" >
								<div class="text-white">
									<router-link :to="{ name: 'Charts'}">进入可视化</router-link>
								</div>
							</el-link>
						</el-col>
					</el-row>
					</div>
				</el-col>
			</el-carousel-item>
			<el-carousel-item>
				<el-row :gutter="10">
					<el-col :span="18">
						<el-image :src="require('@/assets/UP_introx.png')"></el-image>
					</el-col>
					<el-col :span="6">
						<el-image :src="require('@/assets/25.png')"></el-image>
					</el-col>
				</el-row>
			</el-carousel-item>
			<el-carousel-item v-for="i in 6" :key="i">
				<el-row :gutter="10">
					<el-col :span="6" v-for="j in 4" :key="j">
						<el-image :src="require('@/assets/'+((i-1)*4+j)+'.png')"></el-image>
					</el-col>
				</el-row>
				<!--el-image :src="require('@/assets/'+item+'.png')"></el-image-->
			</el-carousel-item>
		</el-carousel>
		<!-- <el-drawer
			title="帮助文档"
			:visible.sync="drawer"
			:with-header="false">
			<el-scrollbar style="height: 58%;">
				<div v-html="HelpHtml" >{{HelpHtml}}</div>
			</el-scrollbar>
		</el-drawer> -->
	</el-main>
  </div>
</template>

<script>
export default {
  name: 'IntroductionPage',
  props: {
    msg: String
  },
	data() {
    //this.getList()
    this.title = this.readFile('static/帮助文档.html')
    //console.log("xxxx"+this.title)
	return {
		drawer: false,
		vedioCanPlay: false,
		fixStyle: '',
		rawHtml:'<span style="color:red">利用vue添加了插入一个span 元素</span>',
		HelpHtml:this.title.response,
	}
  },
  mounted() {
	this.readFile();
  },
  methods: {
    readFile(filePath) {
      // 创建一个新的xhr对象
      let xhr = null
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        // eslint-disable-next-line
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
		console.log(xhr)
		//console.log("xxxxxx"+xhr.responseText)
      //const okStatus = document.location.protocol === 'file' ? 0 : 200
      xhr.open('GET', filePath, false)
      xhr.overrideMimeType('text/html;charset=utf-8')
      xhr.send(null)
      //return xhr.status === okStatus ? xhr.responseText : null
		return xhr
    },
  }
//   router
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 *{  
    margin: 0px;  
    padding: 0px;  
}  
video{  
    position: fixed;  
    right: 0px;  
    bottom: 0px;  
    min-width: 100%;  
    min-height: 100%;  
    height: auto;  
    width: 100%;  
    z-index:-11
}  
source{  
    min-width: 100%;  
    min-height: 100%;  
    height: auto;  
    width: auto;  
} 
.el-scrollbar__wrap {
   overflow-x: hidden;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-row :hover{
	background-color: burlywood;
	border-radius: 4px;
}
.grid-content{
	border-radius: 4px;
	min-height: 800px;
}
.grid-content2{
	border-radius: 4px;
	min-height: 40px;
}
.bg-purple{
	background: rgba(170, 170, 255, 0.9);
	
}
.bg-star{
	width: 100%;
	height: 80%;
	margin: 0 auto;
	background-image: url(../assets/bg-star.jpg);
	background-repeat: no-repeat;
	background-size: cover;
	overflow: auto;
}
.bg-gray{
	background: #000000;
}
.text-white{
	color: aliceblue;
	font-weight: 300;
}
</style>
