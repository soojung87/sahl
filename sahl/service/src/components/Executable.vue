<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Executable</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputExecutableName' outlined dense  @click="clickOtherFields()"></v-text-field>
                            <v-text-field v-model="element.category" label="Category"  @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-select :items="buildType" label="Build Type"  v-model="element.buildType" @click="[clickOtherFields(),setactiveUUID()]" clearable @click:clear="clickOtherFields()" outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                            <v-select :items="loggingBehabior" label="Logging Behavior"  v-model="element.loggingBehabior" @click="[clickOtherFields(),setactiveUUID()]" clearable @click:clear="clickOtherFields()"  outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                            <v-select :items="reportingBehabior" label="Reporting Behavior"  v-model="element.reportingBehabior" @click="[clickOtherFields(),setactiveUUID()]" clearable  @click:clear="clickOtherFields()" outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                            <v-text-field v-model="element.version" label="Version" placeholder="Int" style="height: 45px;" @click="clickOtherFields()" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-text-field v-model="element.swname" label="name" @input='inputRootSWName' @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                    <v-row style="height: 70px">
                                        <v-col cols="10">
                                            <v-text-field v-model="element.applicationtyperef" readonly @click="setApplicationTypeRefSelect()" :style="refSWComponemt ? 'height: 43px;border:solid red 2px' : ''" 
                                                        clearable @click:clear='clearApplicationTypeRef()' label="Application Type Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                </template>
                <span>{{ element.name }}</span>
            </v-tooltip>
            <v-dialog v-model="dialogText" persistent scrollable width="800">
                <v-card >
                    <v-card-title class="text-h6 green accent-1"> Edit Text </v-card-title>
                    <v-card-text>
                        <br>
                        <v-row>
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;CATEGORY&#62;</label>
                                <v-text-field v-model="editARXML.category" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;CATEGORY&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;BUILD-TYPE&#62;</label>
                            <v-text-field v-model="editARXML.buildType" placeholder="BUILD-TYPE-DEBUG or BUILD-TYPE-RELEASE" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;BUILD-TYPE&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;LOGGING-BEHAVIOR&#62;</label>
                            <v-text-field v-model="editARXML.loggingBehabior" placeholder="USES-LOGGING or DOES-NOT-USE-LOGGUNG" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;LOGGING-BEHAVIOR&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;REPORTING-BEHAVIOR&#62;</label>
                            <v-text-field v-model="editARXML.reportingBehabior" placeholder="REPORTS-EXECUTION-STATE or DOES-NOT-REPORT-EXECUTION-STATE" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;REPORTING-BEHAVIOR&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;VERSION&#62;</label>
                                <v-text-field v-model="editARXML.version" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;VERSION&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;ROOT-SW-COMPONENT-PROTOTYPE&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.swname" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;APPLICATION-TYPE-TREF&#62;</label>
                            <v-text-field v-model="editARXML.applicationtyperef" placeholder="Reference" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;APPLICATION-TYPE-TREF&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;ROOT-SW-COMPONENT-PROTOTYPE&#62;</label>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="saveARXML()" >
                            Save
                        </v-btn>
                        <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text @click="cancelARXML()">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
                if (this.zoomvalue  > this.$setZoominLineTitle && this.zoomvalue < this.$setZoominLineSetupStart) {
                    EventBus.$emit('drawLineTitleBar', this.element.uuid, false)
                } else if (this.zoomvalue > this.$setZoominLineSetupStart && this.zoomvalue < this.$setZoominLineSetupEnd) {
                    this.$nextTick(() => {
                        EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                    })
                }
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
            dialogText: false,
            editARXML: {name:'', category: '', buildType: null, loggingBehabior: null, reportingBehabior: null, version: '', swname: '', applicationtyperef: null},
            isRootSWComponentOpenClose: true,
            buildType: ['BUILD-TYPE-DEBUG', 'BUILD-TYPE-RELEASE'],
            loggingBehabior: ['USES-LOGGING', 'DOES-NOT-USE-LOGGUNG', ],
            reportingBehabior: ['REPORTS-EXECUTION-STATE', 'DOES-NOT-REPORT-EXECUTION-STATE', ],
            selApplicationType: this.$store.getters.getSWComponentType,
            refSWComponemt: false,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum) => {
            this.refSWComponemt = false
            if (refNum == 1) {
                this.refSWComponemt = true
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
        showExecutable() {
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
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
        inputRootSWName() {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                            changeName: 'swname', listname: this.element.swname} )
        },
        clickOtherFields() {
            if (this.refSWComponemt) {
                this.setactiveUUID()
                this.deleteOpenElement()
                this.refSWComponemt = false
            }
        },
        clearApplicationTypeRef() {
            this.element.applicationtyperef = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/applicationtyperef')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/applicationtyperef')
                this.refSWComponemt = false
            }
        },
        setApplicationTypeRefSelect() {
            if (this.element.applicationtyperef != null) {this.refSWComponemt = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/applicationtyperef')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getSWComponentPath(this.element.applicationtyperef, 0)
                }
                if (endLine != null) {
                    this.$store.commit('editSWComponents', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SWComponents_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/applicationtyperef', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/applicationtyperef', end:endLine, iscircle:false, refNum:1})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.SWComponents_str} )
                    /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)*/
                }
            }
        },
        setApplicationTypeList() {
            this.selApplicationType = this.$store.getters.getSWComponentType
            this.setactiveUUID()
        },
        setSWComponent(item) {
            this.clickOtherFields()
            if(this.element.applicationtyperef != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/applicationtyperef')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/applicationtyperef')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refSWComponemt = true
                    this.$store.commit('editSWComponents', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SWComponents_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/applicationtyperef', this.element.uuid+'/applicationtyperef', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/applicationtyperef', end: item.uuid, iscircle:false, refNum:1})
                }
                this.element.applicationtyperef = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refSWComponemt = true
                    this.$store.commit('editSWComponents', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SWComponents_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/applicationtyperef', this.element.uuid+'/applicationtyperef', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/applicationtyperef', end: item.uuid, iscircle:false, refNum:1})
                }
            }
            this.setactiveUUID()
        },
        newSWComponent() {
            this.$store.commit('addElementSWComponents', {
                    name: this.$store.getters.getNameSWComponents, path: '', input: false,
                    top: this.element.top + 235, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
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

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.category = this.element.category
            this.editARXML.buildType = this.element.buildType
            this.editARXML.loggingBehabior = this.element.loggingBehabior
            this.editARXML.reportingBehabior = this.element.reportingBehabior
            this.editARXML.version = this.element.version
            this.editARXML.swname = this.element.swname
            this.editARXML.applicationtyperef = this.element.applicationtyperef
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editExecutable', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.category = this.editARXML.category

            this.editARXML.buildType = this.editARXML.buildType.toUpperCase()
            if (this.editARXML.buildType == 'BUILD-TYPE-DEBUG' || this.editARXML.buildType == 'BUILD-TYPE-RELEASE') {
                this.element.buildType = this.editARXML.buildType
            }
            this.editARXML.loggingBehabior = this.editARXML.loggingBehabior.toUpperCase()
            if (this.editARXML.loggingBehabior == 'USES-LOGGING' || this.editARXML.loggingBehabior == 'DOES-NOT-USE-LOGGUNG') {
                this.element.loggingBehabior = this.editARXML.loggingBehabior
            }
            this.editARXML.reportingBehabior = this.editARXML.reportingBehabior.toUpperCase()
            if (this.editARXML.reportingBehabior == 'REPORTS-EXECUTION-STATE' || this.editARXML.reportingBehabior == 'DOES-NOT-REPORT-EXECUTION-STATE') {
                this.element.reportingBehabior = this.editARXML.reportingBehabior
            }

            this.element.version = this.editARXML.version
            if (this.element.swname != this.editARXML.swname) {
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                changeName: 'swname', listname: this.editARXML.swname} )

            }
            this.element.swname = this.editARXML.swname
            if (this.element.applicationtyperef != this.editARXML.applicationtyperef) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/applicationtyperef')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/applicationtyperef')
                }
                var chandEndLine = this.$store.getters.getSWComponentPath(this.editARXML.applicationtyperef, 0)
                if (chandEndLine != null) {
                    this.newLine(this.element.uuid+'/applicationtyperef', this.element.uuid+'/applicationtyperef', chandEndLine, false)
                }
            }
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', category: '', buildType: null, loggingBehabior: null, reportingBehabior: null, version: '', swname: '', applicationtyperef: null}
            this.dialogText = false
        },
    },
}
</script>
