<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <VChart />
    </div>
    <div>
      <BarChart />
    </div>
    <h1>hello</h1>
    <!-- <LineChart></LineChart> -->
  </div>
  
</template>

<script>
import VChart from '@/components/V-Chart'
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
export default {
  name: 'HelloWorld',
  components: {
    VChart,
    LineChart,
    BarChart
  },
  data () {
    return {
      msg: 'HelloWorld.vue'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>
