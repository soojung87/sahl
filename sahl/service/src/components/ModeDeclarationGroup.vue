<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined  :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color="colorToolbar" dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="shoeModeDeclaration">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Mode Declaration Group</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Mode Declaration Group</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputModeDeclarationName' outlined dense></v-text-field>
                    <v-select v-model="element.initmode" :items="modedeclarationItem" label="Initial Mode" @click="setactiveUUID()" outlined dense style="height: 45px;" class="lable-placeholer-color"></v-select>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showModeDeclarationItem" x-small color="indigo">
                                    <v-icon>{{ isModeDeclarationOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Mode Declarations
                        </div>
                        <v-card-text v-if="isModeDeclarationOpenClose">
                            <v-row>
                                <v-col v-for="(item, i) in modedeclarationItem" :key="i"  class="shrink">
                                    <v-chip close @click:close="deleteModeDeclaration(i)" small>
                                        {{item}}
                                    </v-chip>
                                </v-col>
                                <v-col>
                                    <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addmodedeclaration" @save="editmodeDeclaration=''"> 
                                        <v-btn outlined color="indigo" dense text small block width="270px" >
                                            <v-icon >mdi-plus</v-icon>New Item
                                        </v-btn>
                                        <template v-slot:input>
                                            <br>
                                            <v-text-field v-model="editmodeDeclaration" label="Mode declaration" placeholder="String" @click="setactiveUUID()" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </v-col>
                            </v-row>
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
//import { EventBus } from "../main.js"
import dialogPathSetting from '../components/dialogPathSetting.vue'

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar'],
    components:{dialogPathSetting},
    computed: { 
        activeUUID() {
            return this.$store.state.activeUUID
        },
        detailViewUUID() {
            return this.$store.state.detailViewUUID
        }
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        }
    },
    created() {
        this.setToolbarColor(this.$store.state.activeUUID)
    },

    data() {
        return {
            rules: { name:  [val => (val || '').length > 0 ], },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            iselementOpenClose: this.minimaptoolbar,
            isModeDeclarationOpenClose: true,
            modedeclarationItem: [],
            editmodeDeclaration: '',
        }
    },
    mounted () {
        this.$nextTick(() => {
            if(this.element.modedeclaration != undefined) {
                this.modedeclarationItem = this.element.modedeclaration.slice()
            }
        })
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
        },
        setToolbarColor(activeid) 
        {
            if(this.element.uuid == activeid) {
                this.colorToolbar = "#FF1493" 
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        setToolbarColorDetailView(isdetail) {
            if(this.element.uuid == isdetail) {
                this.colorToolbar = "#B0E0E6" 
            } else if (this.element.uuid == this.$store.state.activeUUID) {
                this.colorToolbar  = "#FF1493"
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        shoeModeDeclaration () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
        },
        showModeDeclarationItem () {
            this.isModeDeclarationOpenClose = this.isModeDeclarationOpenClose ? false : true
        },
        inputModeDeclarationName() {
            this.$store.commit('editModeDeclarationGroup', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        addmodedeclaration() {
            this.modedeclarationItem.push(this.editmodeDeclaration)
            this.editmodeDeclaration = ''
            this.$store.commit('editModeDeclarationGroup', {compo:"Mode declaration", uuid:this.element.uuid, modedeclaration:this.modedeclarationItem} )
        },
        deleteModeDeclaration(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'modeDeclar', deleteTab: true, tabName : this.modedeclarationItem[idx], path: this.element.path, name: this.element.name})
            this.modedeclarationItem.splice(idx, 1)
        },
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editModeDeclarationGroup', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
    }
}
</script>

<style>
</style>
