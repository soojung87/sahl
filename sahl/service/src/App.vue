<template>
  <div oncontextmenu='return false'> <!--mouse오른쪽 클릭금지 적용-->
    <v-app>
        <!-- <mainview/> -->
        <!-- <v-row v-if="!isFullScreen" align="center" justify="space-around">
          <v-btn x-large color="success" dark @click="openFullscreen()">저작툴을 실행합니다.</v-btn>
        </v-row>
        <div v-else> -->
          <mainscreen />
        <!-- </div> -->
      <!-- <vue-draggable-resizable
        class-name='mini-map' 
        :draggable="false" :resizable="false" 
        x="1400" y="20" w="300" h="200" z="100">
      </vue-draggable-resizable>
       -->
    </v-app>
  </div>
</template>

<script>
//import mainview from '@/components/mainview.vue'
import mainscreen from '@/components/mainscreen.vue'

export default {
  components: {  mainscreen }, 
  data() {
      return {
        isFullScreen: false,
      }
  },
  methods: {
    openFullscreen() {
      this.isFullScreen = true
      
      var docV = document.documentElement

      if (docV.requestFullscreen) {
        docV.requestFullscreen()
      } else if (docV.webkitRequestFullscreen) { //Chrome, Safari
        docV.webkitRequestFullscreen()
      } else if (docV.mozRequestFullScreen) { //Firefox
        docV.moxRequestFullScreen()
      } else if (docV.msRequestFullscreen) { //IE or Edge
        docV.msRequestFullscreen()
      }
    },
  },
}
</script>