<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showSomeIPtoMachine">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>SomeIP Service Instance To Machine Mapping</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>SomeIP Service Instance To Machine Mapping</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputSomeIPtoMachineName' outlined dense></v-text-field>
                    <v-row style="height: 45px">
                        <v-col cols="10">
                            <v-text-field v-model="element.ccref" readonly @click="setCCRefSelect()" clearable @click:clear='clearCCRef()' label="Communication Connector Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/tomachinCC'" icon v-bind="attrs" v-on="on" @click="setCCRefList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list >
                                    <v-list-item v-for="(item, i) in selCommuniConnect" :key="i" link @click="setCCRef(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item v-if="selCommuniConnect.length == 0">
                                        <v-list-item-title>No Data Available</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="element.siref" readonly @click="setServiceInstanceSelect()" clearable @click:clear='clearServiceInstance()' label="Service Instance Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/tomachinServiceIns'" dark icon v-bind="attrs" v-on="on" @click="setRequiredSomeIPList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selServiceInstance" :key="i" link @click="setRequiredSomeIP(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newRequiredSomeIP" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="element.udp" label="UDP Port" placeholder="int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.tcp" label="TCP Port" placeholder="int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
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
            rules: {
                name:  [val => (val || '').length > 0 ],
            },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            selCommuniConnect: this.$store.getters.getCommunicationConnect, //MachineDesign에 있다.
            selServiceInstance: this.$store.getters.getRequiredSomeIP
        }
    },
    mounted () {
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
        setToolbarColorDetailView(isdetail) {
            if(this.element.uuid == isdetail) {
                this.colorToolbar = "#B0E0E6" 
            } else if (this.element.uuid == this.$store.state.activeUUID) {
                this.colorToolbar  = "#FF1493"
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        showSomeIPtoMachine () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        inputSomeIPtoMachineName () {
            this.$store.commit('editSomeIPtoMachine', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            //this.$store.commit('changeNameDataConstr', {uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        clearCCRef() {
            this.element.ccref = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/tomachinCC')
            }
        },
        setCCRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinDesignPath(this.element.ccref, 1)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.MachineDesigne_str} )
            }
        },
        setCCRef(item){
            console.log(item)
            if( this.element.ccref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/tomachinCC')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/tomachinCC', this.element.uuid+'/tomachinCC', item.uuid)
                }
                this.element.ccref = item.name
            }
            this.setactiveUUID()
        },
        setCCRefList() {
            this.selCommuniConnect = this.$store.getters.getCommunicationConnect
            this.setactiveUUID()
        },

        clearServiceInstance() {
            this.element.siref = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinServiceIns')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/tomachinServiceIns')
            }
        },
        setServiceInstanceSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinServiceIns')
            if (endLine == undefined) {
                endLine = this.$store.getters.getRequiredSomeIPPath(this.element.siref)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.RequiredSomeIP_str} )
            }
        },
        setRequiredSomeIP(item){
            console.log(item)
            if( this.element.siref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinServiceIns')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/tomachinServiceIns')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/tomachinServiceIns', this.element.uuid+'/tomachinServiceIns', item.uuid)
                }
                this.element.siref = item.name
            }
            this.setactiveUUID()
        },
        setRequiredSomeIPList() {
            this.selServiceInstance = this.$store.getters.getRequiredSomeIP
            this.setactiveUUID()
        },
        newRequiredSomeIP() {
            this.$store.commit('addElementRequiredSomeIP', { 
                name: this.$store.getters.getNameRequiredSomeIP, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                deployref: null, minover: '', id: '', clientref: null, ver: null, method: [], requiredevent: [],
            })
            EventBus.$emit('add-element', constant.RequiredSomeIP_str)
            EventBus.$emit('add-element', constant.ServiceInstances_str)
            EventBus.$emit('add-element', constant.Service_str)
            this.$store.commit('editSomeIPtoMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSomeIPtoMachine', {compo:"z", uuid:this.element.uuid, zindex:10} )
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