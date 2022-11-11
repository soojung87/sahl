<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showSoftWarePackage">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Software Package</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Software Package</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSoftWarePackageName' outlined dense></v-text-field>
                            <v-select v-model="element.action" :items="actiontype" clearable label="Action Type" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-select v-model="element.activation" :items="activationAction" clearable label="Activation Action" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-text-field v-model="element.compSWPsize" label="Compressed Software Package Size" placeholder="Integer" style="height: 30px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-checkbox v-model="element.deltaPakage" label="Is Delta Package" value="element.deltaPakage" :indeterminate="element.deltaPakage==null? true:false" true-value="true" false-value="false" style="height: 35px"></v-checkbox>
                            <v-text-field v-model="element.maximunVer" label="Maximun Supported UCM Version" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.minimunVer" label="minimun Supported UCM Version" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.id" label="Package ID" placeholder="Integer" style="height: 30px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-checkbox v-model="element.postReboot" label="Post Verification Reboot" value="element.postReboot" :indeterminate="element.postReboot==null? true:false" true-value="true" false-value="false" style="height: 15px"></v-checkbox>
                            <v-checkbox v-model="element.preReboot" label="Pre Activation Reboot" value="element.preReboot" :indeterminate="element.preReboot==null? true:false" true-value="true" false-value="false" style="height: 35px"></v-checkbox>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.swcluster" readonly @click="setSWClusterSelect()" clearable @click:clear='clearSWCluster()' label="Software Cluster Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/UCMSWPSWC'" dark icon v-bind="attrs" v-on="on" @click="setSWClusterList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selSWCluster" :key="i" link @click="setSWCluster(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newSWCluster" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-text-field v-model="element.uncompSWCsize" label="Uncompressed Software Cluster Size" placeholder="Integer" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-card-text>
                        <v-card-text v-else>
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        readonly outlined dense></v-text-field>
                        </v-card-text>
                    </v-card>
                </template>
                <span>{{ element.name }}</span>
            </v-tooltip>
        </v-container>
    </div>
</template>

<script>
import constant from "../store/constants.js"
import { EventBus } from "../main.js"
import dialogPathSetting from '../components/dialogPathSetting.vue'

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar', 'location'],
    components:{dialogPathSetting},
    computed: {
        activeUUID() {
            return this.$store.state.activeUUID
        },
        setting() {
            return this.$store.state.setting
        },
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        /*detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        },*/
        setting(value) {
            this.zoomvalue = value.zoomMain
            if (this.zoomvalue < this.$setZoominTooltip) {
                this.isTooltip = false
            } else {
                this.isTooltip = this.minimaptoolbar
            }
        },
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
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: true,//this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            actiontype: ['UPDATE', 'INSTALL', 'REMOVE'],
            activationAction: ['REBOOT', 'RESTART-APPLICATION', 'WAIT-FOR-REBOOT'],
            selSWCluster: this.$store.getters.getSWCluster
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, () => {
            //
        })
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
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
        showSoftWarePackage() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        inputSoftWarePackageName() {
            this.$store.commit('editSoftWarePackage', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        }, 
  
        clearSWCluster() {
            this.element.swcluster = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/UCMSWPSWC')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/UCMSWPSWC')
            }
        },
        setSWClusterSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/UCMSWPSWC')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSWClusterPath(this.element.swcluster)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SWCluster_str} )
                //document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                //EventBus.$emit('active-element', endLine)
            }
        },
        setSWClusterList() {
            this.selSWCluster = this.$store.getters.getSWCluster
            this.setactiveUUID()
        },
        setSWCluster(item) {
            if( this.element.swcluster != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/UCMSWPSWC')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/UCMSWPSWC')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/UCMSWPSWC', this.element.uuid+'/UCMSWPSWC', item.uuid, false)
                this.element.swcluster = item.name
            }
            this.setactiveUUID()
        },
        newSWCluster() {
            this.$store.commit('addElementSoftWareCluster', {
                name: this.$store.getters.getNameSoftWareCluster, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                category: '', inVendor: '', version: '', sdgs: [], executable: [], machineD: [], toMachine: [], process: [], sswc: [],
            })
            EventBus.$emit('add-element', constant.SWCluster_str)
            this.$store.commit('editSoftWarePackage', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSoftWarePackage', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
        deleteLine(fineLine) {
            var linenum = this.$store.getters.getconnectLineNum(fineLine)
            if (linenum != -1) {
                this.$store.commit('deletConnectionline', {startnum: linenum} )
                this.deleteOpenElement()
            }
        },
        deleteOpenElement() {
            //EventBus.$emit('delete-line', this.$store.getters.getDeleteOpenElement(this.element.uuid))
            this.$store.commit('deleteOpenElemnt', {uuid: this.element.uuid, isDeleteAll: false, startUUID: this.element.uuid} )
        },
        newLine(startLine, drawLine, endLine, isView) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            if (isView) {
                EventBus.$emit('new-line', drawLine, endLine)
            }
        },



    },
}
</script>
