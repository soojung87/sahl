<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showExecutable">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Executable</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Executable</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputExecutableName' outlined dense  @click="setactiveUUID"></v-text-field>
                    <v-text-field v-model="element.category" label="Category"  @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-select :items="buildType" label="Build Type"  v-model="element.buildType" @click="setactiveUUID()" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                    <v-select :items="loggingBehabior" label="Logging Behavior"  v-model="element.loggingBehabior" @click="setactiveUUID()" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                    <v-select :items="reportingBehabior" label="Reporting Behavior"  v-model="element.reportingBehabior" @click="setactiveUUID()" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                    <v-text-field v-model="element.version" label="Version" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px">
                            <!-- <v-hover v-slot="{ hover }">
                                <v-btn text @click="showRootSWComponent" x-small color="indigo">
                                    <v-icon>{{ isRootSWComponentOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover> -->
                            <v-btn text x-small color="indigo">
                                <v-icon>mdi-chevron-double-right</v-icon>
                            </v-btn>
                            Root SW Component Prototype
                        </div>
                        <v-card-text v-if="isRootSWComponentOpenClose">
                            <v-text-field v-model="element.swname" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.applicationtyperef" readonly @click="setApplicationTypeRefSelect()" clearable @click:clear='clearApplicationTypeRef()' label="Application Type Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/applicationtyperef'" dark icon v-bind="attrs" v-on="on" @click="setApplicationTypeList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selApplicationType" :key="i" link @click="setSWComponent(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newSWComponent" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
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
            isRootSWComponentOpenClose: true,
            buildType: ['BUILD-TYPE-DEBUG', ],
            loggingBehabior: ['USES-LOGGING',],
            reportingBehabior: ['REPORTS-EXECUTION-STATE',],
            selApplicationType: this.$store.getters.getSWComponentType,
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
        showExecutable() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showRootSWComponent() {
            this.isRootSWComponentOpenClose = this.isRootSWComponentOpenClose? false : true
        },
        inputExecutableName() {
            this.$store.commit('editExecutable', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clearApplicationTypeRef() {
            this.element.applicationtyperef = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/applicationtyperef')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/applicationtyperef')
            }
        },
        setApplicationTypeRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/applicationtyperef')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSWComponentPath(this.element.applicationtyperef, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SWComponents_str} )
            }
        },
        setApplicationTypeList() {
            this.selApplicationType = this.$store.getters.getSWComponentType
            this.setactiveUUID()
        },
        setSWComponent(item) {
            if(this.element.applicationtyperef != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/applicationtyperef')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/applicationtyperef')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/applicationtyperef', this.element.uuid+'/applicationtyperef', item.uuid)
                this.element.applicationtyperef = item.name
            }
            this.setactiveUUID()
        },
        newSWComponent() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementSWComponents', {
                    name: this.$store.getters.getNameSWComponents,  input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    pport: [], rport: [], prport: [],
                })
            EventBus.$emit('add-element', constant.SWComponents_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editExecutable', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editExecutable', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
