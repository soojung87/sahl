<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showProcessDesign">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Process Design</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Process Design</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputProDesignName' outlined dense  @click="setactiveUUID"></v-text-field>
                    <v-row style="height: 70px">
                        <v-col cols="10">
                            <v-text-field v-model="element.executableref" readonly @click="setExecutableRefSelect()" clearable @click:clear='clearExecutableRef()' label="Executable Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/prodesignexecutable'" dark icon v-bind="attrs" v-on="on" @click="setExecutableList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selExecutable" :key="i" link @click="setExecutable(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newExecutable" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showDeterministric" x-small color="indigo">
                                    <v-icon>{{ isDeterminsticOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Determinstic Client Resource Needs
                            <v-btn v-if="isDeterminsticOpenClose" @click="addDeterministic" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-tabs v-model='determinTab' v-if="isDeterminsticOpenClose">
                            <v-tab v-for="(tab, idx) in determinItem" :key="idx" @click="clickDeterminstictab()"> 
                                {{idx}}
                                <v-btn text x-small @click="deleteDeterminstic(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="determinTab" v-if="isDeterminsticOpenClose">
                            <v-tab-item v-for="(tab, idx) in determinItem" :key="idx">
                                <v-card flat>
                                    <v-card-text>
                                        <v-text-field v-model="tab.swname" label="name" :rules="rules.name" @input="inputDeterministicName(tab.swname)" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                        <v-text-field v-model="tab.hardwareP" label="Hardware Platform" @input="inputDeterministicHardwareP(tab.hardwareP)" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                        <v-card outlined class="mx-auto">
                                            <div class="subtitle-2" style="height:20px">
                                                Init Resource
                                            </div>
                                            <v-card-text>
                                                <v-text-field v-model="tab.initnofinstruction" label="Number of Instructions" @input="inputInitNumofInstruct(tab.initnofinstruction)" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                <v-text-field v-model="tab.initsequentialbegin" label="Sequential Instructions Begin" @input="inputInitBegin(tab.initsequentialbegin)" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                <v-text-field v-model="tab.initsequentialend" label="Sequential Instructions End " @input="inputInitEnd(tab.initsequentialend)" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                <v-text-field v-model="tab.initspeedup" label="Speedup" placeholder="int" @input="inputInitSpeedup(tab.initspeedup)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-card-text>
                                        </v-card>
                                        <v-card outlined class="mx-auto">
                                            <div class="subtitle-2" style="height:20px">
                                                Run Resource
                                            </div>
                                            <v-card-text>
                                                <v-text-field v-model="tab.runnofinstruction" label="Number of Instructions" @input="inputRunNumofInstruct(tab.runnofinstruction)" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                <v-text-field v-model="tab.runsequentialbegin" label="Sequential Instructions Begin" @input="inputRunBegin(tab.runsequentialbegin)" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                <v-text-field v-model="tab.runsequentialend" label="Sequential Instructions End" @input="inputRunEnd(tab.runsequentialend)" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                <v-text-field v-model="tab.runspeedup" label="Speedup" @input="inputRunSpeedup(tab.runspeedup)" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-card-text>
                                        </v-card>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
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
            isDeterminsticOpenClose: true,
            selExecutable: this.$store.getters.getExecutable,
            determinItem: [],
            determinTab: 0,
        }
    },
    mounted () {
        this.$nextTick(() => {
            if(this.element.determin != undefined) {
                this.determinItem = this.element.determin.slice()
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
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        showProcessDesign() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showDeterministric() {
            this.isDeterminsticOpenClose = this.isDeterminsticOpenClose? false : true
        },
        inputProDesignName() {
            this.$store.commit('editProcessDesign', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        inputDeterminItem() {
            this.$store.commit('editProcessDesign', {compo:"determin", uuid:this.element.uuid, determin: this.determinItem} )
        },
        inputDeterministicName(name) {
            this.$store.commit('editProcessDesign', {compo:"Stort Name", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputDeterministicHardwareP(name) {
            this.$store.commit('editProcessDesign', {compo:"Hardware Platform", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputInitNumofInstruct(name) {
            this.$store.commit('editProcessDesign', {compo:"Init Instruct", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputInitBegin(name) {
            this.$store.commit('editProcessDesign', {compo:"Init Begin", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputInitEnd(name) {
            this.$store.commit('editProcessDesign', {compo:"Init End", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputInitSpeedup(name) {
            this.$store.commit('editProcessDesign', {compo:"Init Speedup", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputRunNumofInstruct(name) {
            this.$store.commit('editProcessDesign', {compo:"Run Instruct", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputRunBegin(name) {
            this.$store.commit('editProcessDesign', {compo:"Run Begin", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputRunEnd(name) {
            this.$store.commit('editProcessDesign', {compo:"Run End", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },
        inputRunSpeedup(name) {
            this.$store.commit('editProcessDesign', {compo:"Run Speedup", uuid:this.element.uuid, name:name, determinTab: this.determinTab} )
        },

        clearExecutableRef() {
            this.element.executableref = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prodesignexecutable')
            console.log('clearExecutableRef==' + endLine)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/prodesignexecutable')
            }
        },
        setExecutableRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prodesignexecutable')
            if (endLine == undefined) {
                endLine = this.$store.getters.getExecutablePath(this.element.executableref)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Executable_str} )
            }
        },
        setExecutableList() {
            this.selExecutable = this.$store.getters.getExecutable
            this.setactiveUUID()
        },
        setExecutable(item) {
            if( this.element.executableref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prodesignexecutable')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/prodesignexecutable')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/prodesignexecutable', this.element.uuid+'/prodesignexecutable', item.uuid)
                this.element.executableref = item.name
            }
            this.setactiveUUID()
        },
        newExecutable() {
            this.$store.commit('addElementExecutable', { //applicationtyperef 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameExecutable, input: false, path: '',
                    top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    version: '', category:'', buildType:null, loggingBehabior:null, reportingBehabior:null, swname:'', applicationtyperef: null,
                })
            EventBus.$emit('add-element', constant.Executable_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcessDesign', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addDeterministic() {
            const editItem = {swname: '', hardwareP:'', 
                initnofinstruction: '', initsequentialbegin: '', initsequentialend: '', initspeedup: '',
                runnofinstruction: '', runsequentialbegin: '', runsequentialend: '', runspeedup: ''}
            const addObj = new Object(editItem)
            this.determinItem.push(addObj)
            this.determinTab = this.determinItem.length-1
            this.inputDeterminItem()
        },
        clickDeterminstictab() {},
        deleteDeterminstic(idx) {
            this.determinItem.splice(idx, 1)
            this.inputDeterminItem()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editProcessDesign', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
