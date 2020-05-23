<template>
  <div class="hello bg-gray">
	<el-main>
		<el-carousel height="635px" width="100%">
			<!--el-carousel-item v-for="item in 4" :key="item">
				<h3 class="small">{{item}}</h3>
			</el-carousel-item-->
			<el-carousel-item>
				<el-col :span="2"><div class="grid-content bg-star"></div></el-col>
				<el-col :span="20">
					<el-image style="width: 100%; height: 100%;"
							:src="require('@/assets/index.png')">
					</el-image>
				</el-col>
				<el-col :span="2"><div class="grid-content bg-star"></div></el-col>
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
			<el-carousel-item v-for="i in 4" :key="i">
				<el-row :gutter="10">
					<el-col :span="6" v-for="j in 4" :key="j">
						<el-image :src="require('@/assets/'+((i-1)*4+j)+'.png')"></el-image>
					</el-col>
				</el-row>
				<!--el-image :src="require('@/assets/'+item+'.png')"></el-image-->
			</el-carousel-item>
		</el-carousel>
	</el-main>
	<el-footer height="25px" >
		<el-row type="flex" justify="end" >
			<!--div class="grid-content2 bg-star">
				<el-link icon="el-icon-arrow-right" href="/chartx" >
					<div class="text-white">
						Next
					</div>
				</el-link>
			</div-->
            <router-link :to="{ name: 'Charts'}">进入可视化</router-link>
			<!-- <el-link icon="el-icon-arrow-right" href="/chartx" >
				<div class="text-white">
					进入可视化
				</div>
			</el-link> -->
		</el-row>
		
	</el-footer>
  </div>
</template>

<script>
// import * as router from '@/router/index.js'
export default {
  name: 'IntroductionPage',
  props: {
    msg: String
  },
//   router
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
