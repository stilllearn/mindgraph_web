<template>
  <div class='outer'>
    <h2>mindGraph</h2>
    <div class='daohang'>
      <el-button>正方形</el-button>
    </div>
    <div id='map' class='graph' @contextmenu.prevent="show">
    </div>
    <el-dialog :visible.sync="menuVisible" >
      <ul id="menu" class="menu">
        <li class="menu__item" @click="isAddCardPing = true">平级添加</li>
        <li class="menu__item" @click="addCard">下级添加</li>
        <li class="menu__item" @click="deleteCard">删除</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import Raphael from 'raphael'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      china: [],
      menuVisible: false
    }
  },

  created: function () {
    var paper = Raphael('map', 800, 600)
    var circle = paper.circle(100, 100, 500)
    circle.attr({'fill': 'yellow'})
  },

  mounted: function () {
  },

  methods: {
    show: function (e) {
      if (e.button === 2) {
        this.menuVisible = true
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer{
  height:600px;
  width:100%;
  background-color:rgb(50, 153, 127);
}
.daohang{
  height:80px;
  width:100%;
  background-color:rgb(164, 224, 206);
}
.graph{
  height:80%;
  width:100%;
  background-color:azure;
}
</style>
