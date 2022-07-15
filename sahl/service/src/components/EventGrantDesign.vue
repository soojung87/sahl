<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showEventGD">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Com Event Grant Design</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Com Event Grant Design</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputEventGDName' outlined dense  @click="setactiveUUID"></v-text-field>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.processD" readonly @click="setProcessDRefSelect()" clearable @click:clear='clearProcessDRef()' label="Process Design Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/EGDproD'" dark icon v-bind="attrs" v-on="on" @click="setProcessDList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selProcessD" :key="i" link @click="setProcessD(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newProcessD" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.SIEvent" readonly @click="setSIEventSelect()" clearable @click:clear='clearSIEvent()' label="Target Event Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/EGDserviceI'" icon v-bind="attrs" v-on="on" @click="setSIEventList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list >
                                            <v-list-item v-for="(item, i) in selSIEvent" :key="i" link @click="setSIEvent(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item v-if="selSIEvent.length == 0">
                                                <v-list-item-title>No Data Available</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-text v-else-if="zoomvalue > $setZoominElement || !minimaptoolbar">
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
    props: ['element', 'isDatailView', 'minimaptoolbar'],
    components:{dialogPathSetting},
    computed: {
        activeUUID() {
            return this.$store.state.activeUUID
        },
        detailViewUUID() {
            return this.$store.state.detailViewUUID
        },
        setting() {
            return this.$store.state.setting
        },
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        },
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
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            selProcessD: this.$store.getters.getProcessDesign,
            selSIEvent: this.$store.getters.getVariableDataPrototype,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
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
        showEventGD() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        inputEventGDName() {
            this.$store.commit('editEventGD', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clearProcessDRef() {
            this.element.processD = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/EGDproD')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/EGDproD')
            }
        },
        setProcessDRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/EGDproD')
            if (endLine == undefined) {
                endLine = this.$store.getters.getProcessDesignPath(this.element.processD, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ProcessDesign_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setProcessDList() {
            this.selProcessD = this.$store.getters.getProcessDesign
            this.setactiveUUID()
        },
        setProcessD(item) {
            if(this.element.processD != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/EGDproD')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/EGDproD')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/EGDproD', this.element.uuid+'/EGDproD', item.uuid)
                this.element.processD = item.name
            }
            this.setactiveUUID()
        },
        newProcessD() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementProcessDesign', { //executableref 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameProcessDesign, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                executableref: null, determin: [],
            })
            EventBus.$emit('add-element', constant.ProcessDesign_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editEventGD', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setSIEventSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/EGDserviceI')
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfacePath(this.element.SIEvent, 3)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        clearSIEvent() {
            this.element.SIEvent = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/EGDserviceI')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/EGDserviceI')
            }
        },
        setSIEventList() {
            this.selSIEvent = this.$store.getters.getVariableDataPrototype
            this.setactiveUUID()
        },
        setSIEvent(item) {
            if(this.element.SIEvent != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/EGDserviceI')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/EGDserviceI')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/EGDserviceI', this.element.uuid+'/EGDserviceI', item.uuid)
                }
                this.element.SIEvent = item.name
            }
            this.setactiveUUID()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editEventGD', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
        deleteLine(fineLine) {
            var linenum = this.$store.getters.getconnectLineNum(fineLine)
            if (linenum != -1) {
                EventBus.$emit('delete-line', linenum)
                this.$store.commit('deletConnectionline', {startnum: linenum} )
            }
        },
        newLine(startLine, drawLine, endLine) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            EventBus.$emit('new-line', drawLine, endLine)
        },

    },
}
</script>
