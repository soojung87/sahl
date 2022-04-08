<template>
  <div oncontextmenu='return false'> <!--mouse오른쪽 클릭금지 적용-->
    <v-app>
        <!-- <mainview/> -->
        <mainscreen/>
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
      }
  },
  methods: {
  },
}
</script>