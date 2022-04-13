<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showApplicationArray">
                            <v-icon>{{ istoolbarOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Application Array Data Type</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Application Array Data Type</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="istoolbarOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputApplicaionAName' outlined dense></v-text-field>
                    <v-text-field v-model="element.category" label="Category" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.dynamicArrySize" label="Dynamic Array Size Profile" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/element'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showAAItem" x-small color="indigo">
                                    <v-icon>{{ isElementOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Element
                        </div>
                        <v-card-text v-if="isElementOpenClose">  
                            <v-text-field v-model="element.elename" label="Name" :rules="rules.name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-select v-model="element.elehandling" :items="handlingLaunch" clearable label="Array Size Handling" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-select v-model="element.elesemantics" :items="semanticsLaunch" clearable label="Array Size Semantics" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-text-field v-model="element.elemaxnumber" label="Max Number of Elements" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-card-text v-else>
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                readonly outlined dense></v-text-field>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
//import constant from "../store/constants.js"
import dialogPathSetting from '../components/dialogPathSetting.vue'

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar'],
    components:{dialogPathSetting},
    computed: {
        activeUUID() {
            return this.$store.state.activeUUID
        },
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        }
    },
    created() {
        this.setToolbarColor(this.$store.state.activeUUID)
    },
    data() {
        return {
            rules: {
                name:  [val => (val || '').length > 0 ],
            },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            istoolbarOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            isElementOpenClose: true,
            handlingLaunch: ['ALL-INDICES-DIFFERENT-ARRAY-SIZE',],
            semanticsLaunch: ['FIXED-SIZE'],
        }
    },
    mounted () {
        this.$nextTick(() => {
            console.log('applicationAttay mounted')
        })
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
        },
        setToolbarColor(uuid) 
        {
            if(this.element.uuid == uuid) {
                this.colorToolbar = "#FF1493" 
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },

        showApplicationArray () {
            this.istoolbarOpenClose = this.istoolbarOpenClose ? false : true
        },
        showAAItem () {
            this.isElementOpenClose = this.isElementOpenClose ? false : true
        },
        inputApplicaionAName () {
            this.$store.commit('editApplicationArray', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editApplicationArray', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
    },

}
</script>