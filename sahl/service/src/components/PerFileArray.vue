<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showPERFileArray">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Persistency File Array</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Persistency File Array</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputPERFileArrayName' outlined dense  @click="setactiveUUID"></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/PERArraySDG'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showSDGS" x-small color="indigo">
                                            <v-icon>{{ isSDGSOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Admin Data
                                    <v-btn @click="isCheckSDGS" text x-small color="indigo" v-if="isSDGSOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isSDGSOpenClose && isdeleteSDGSItem" @click="deletSDGS" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isSDGSOpenClose">
                                    <v-data-table v-model="selectDelectSDGS" :headers="headerSDGS" :items="element.sdgs" :items-per-page='20'
                                            :show-select="isdeleteSDGSItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteSDGSItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openSDGS(idx)" @cancel="editSDGS(idx)" @save="cancelSDGS" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSDGSItem.sdg' label='SDG' :items='selSDG' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                        return-object @click:clear='clearSDGS' clearable>
                                                                </v-autocomplete>
                                                                <v-select v-if="editSDGSItem.sdg !=null && editSDGSItem.sdg.uuid == 1" v-model="editSDGSItem.sd" :items="enumSD" label="SD" @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-autocomplete v-if="editSDGSItem.sdg !=null && editSDGSItem.sdg.uuid == 2" v-model='editSDGSItem.port' label='SDX Reference' :items='selPort' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingPort" clearable @click="setPortSelect()" 
                                                                            @click:clear='clearPort' @blur="isEditingPort=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addSDGS()" @save="cancelSDGS"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSDGSItem.sdg' label='SDG' :items='selSDG' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                        return-object @click:clear='clearSDGS' clearable>
                                                                </v-autocomplete>
                                                                <v-select v-if="editSDGSItem.sdg !=null && editSDGSItem.sdg.uuid == 1" v-model="editSDGSItem.sd" :items="enumSD" label="SD" @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-autocomplete v-if="editSDGSItem.sdg !=null && editSDGSItem.sdg.uuid == 2" v-model='editSDGSItem.port' label='SDX Reference' :items='selPort' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingPort" clearable @click="setPortSelect()" 
                                                                            @click:clear='clearPort' @blur="isEditingPort=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                            <v-text-field v-model="element.maxSize" label="Max Allowed Size" placeholder="Integer" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.miniSize" label="Minimun Sustained Size" placeholder="Integer" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-select v-model="element.updateS" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-text-field v-model="element.uri" label="URI" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showFile" x-small color="indigo">
                                            <v-icon>{{ isFileOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Files
                                    <v-btn @click="isCheckFile" text x-small color="indigo" v-if="isFileOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isFileOpenClose && isdeleteFileItem" @click="deletFile" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isFileOpenClose">
                                    <v-data-table v-model="selectDelectFile" :headers="headerFile" :items="element.files" :items-per-page='20'
                                            :show-select="isdeleteFileItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteFileItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openFile(idx)" @cancel="editFile(idx)" @save="cancelFile" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editItem.url" label="Content URL" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editItem.filename" label="File Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-select v-model="editItem.strategy" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addFile()" @save="cancelFile"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editItem.url" label="Content URL" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editItem.filename" label="File Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-select v-model="editItem.strategy" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
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
import dialogPathSetting from './dialogPathSetting.vue'

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar', 'location'],
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
            strategy: ['DELETE', 'KEEPEXISTING', 'OVERWRITE'],
            isSDGSOpenClose: true,
            isdeleteSDGSItem: false,
            selectDelectSDGS: [],
            headerSDGS: [
                { text: 'SDG', align: 'start', sortable: false, value: 'sdg' },
                { text: 'SD', align: 'start', sortable: false, value: 'sd' },
                { text: 'SDX Ref', align: 'start', sortable: false, value: 'port' },
            ],
            editSDGSItem: { sdg: null, sd : null, port: null, id: ''},
            selSDG: [{name:"DATA-ENCRYPTION", uuid:1},{name:"PERSISTENCY-DEPLOYMENT-EXTENSION", uuid:2},],
            enumSD: ['Yes', 'No'],
            selPort: this.$store.getters.getPRPortPrototype,
            isEditingPort: true,
            deleteChangeLine: [],

            isFileOpenClose: true,
            isdeleteFileItem: false,
            selectDelectFile: [],
            headerFile: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Content URL', align: 'start', sortable: false, value: 'url' },
                { text: 'File Name', align: 'start', sortable: false, value: 'filename' },
                { text: 'Update Strategy', align: 'start', sortable: false, value: 'strategy' },
            ],
            editItem: { name : '', url: '', filename: '', strategy: null, id: ''},
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
        showPERFileArray() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showSDGS() {
            this.isSDGSOpenClose = this.isSDGSOpenClose ? false : true
        },
        showFile() {
            this.isFileOpenClose = this.isFileOpenClose ? false : true
        },
        inputPERFileArrayName() {
            this.$store.commit('editPERFileArray', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        isCheckSDGS() {
            if (this.isdeleteSDGSItem == true) {
                this.isdeleteSDGSItem = false
                this.selectDelectSDGS = []
            } else {
                this.isdeleteSDGSItem = true
            }
        },
        deletSDGS() {
            if (this.isdeleteSDGSItem == true) {
                for(let i=0; i<this.element.sdgs.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERArraySDG-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLine.push({id:this.element.sdgs[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/PERArraySDG-'+i)
                    }
                }

                this.element.sdgs = this.element.sdgs.filter(item => {
                        return this.selectDelectSDGS.indexOf(item) < 0 })

                for(let n=0; n<this.element.sdgs.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLine.length; idx++) {
                        if (this.element.sdgs[n].id == this.deleteChangeLine[idx].id) {
                            this.newLine(this.element.uuid+'/PERArraySDG-'+n, this.element.uuid+'/PERArraySDG', this.deleteChangeLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteSDGSItem = false
                this.selectDelectSDGS = []
                this.deleteChangeLine = []
            } 
        },
        editSDGS(idx) {
            var endLine
            this.element.sdgs[idx].sdg = this.editSDGSItem.sdg.name
            if (this.element.sdgs[idx].sdg == "DATA-ENCRYPTION") {
                this.element.sdgs[idx].sd = this.editSDGSItem.sd
                if (this.editSDGSItem.port != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERArraySDG-'+idx)
                    if (endLine != undefined) {
                        this.deleteLine(this.element.uuid+'/PERArraySDG-'+idx)
                        this.element.sdgs[idx].port = null
                    } 
                }
            } else if (this.element.sdgs[idx].sdg == "PERSISTENCY-DEPLOYMENT-EXTENSION"){
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERArraySDG-'+idx)
                if (endLine != undefined && this.editSDGSItem.port == null) {
                    this.deleteLine(this.element.uuid+'/PERArraySDG-'+idx)
                    this.element.sdgs[idx].port = null
                } else if (endLine != undefined && endLine != this.editSDGSItem.port.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PERArraySDG-'+idx)
                    this.newLine(this.element.uuid+'/PERArraySDG-'+idx, this.element.uuid+'/PERArraySDG', this.editSDGSItem.port.uuid)
                    this.element.sdgs[idx].port = this.editSDGSItem.port.name
                } else if (endLine == undefined && this.editSDGSItem.port != null && this.editSDGSItem.port.uuid != null) {
                    this.newLine(this.element.uuid+'/PERArraySDG-'+idx, this.element.uuid+'/PERArraySDG', this.editSDGSItem.port.uuid)
                    this.element.sdgs[idx].port = this.editSDGSItem.port.name
                }
                this.element.sdgs[idx].sd = null
            }

            this.cancelSDGS()
        },
        cancelSDGS() {
            this.editSDGSItem.sdg = null
            this.editSDGSItem.sd = null
            this.editSDGSItem.port = null
            this.editSDGSItem.id = ''
            this.setactiveUUID()
        },
        openSDGS(idx) {
            var id = null
            if (this.element.sdgs[idx].sdg == "DATA-ENCRYPTION") {
                id = 1
                this.editSDGSItem.sd = this.element.sdgs[idx].sd
            } else if (this.element.sdgs[idx].sdg == "PERSISTENCY-DEPLOYMENT-EXTENSION"){
                id = 2
                this.selPort = this.$store.getters.getPRPortPrototype
                if ( this.element.sdgs[idx].port != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERArraySDG-'+idx)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getSWComponentPath(this.element.sdgs[idx].port, 3)
                    }
                    this.editSDGSItem.port = { name: this.element.sdgs[idx].port, uuid: endLine }
                }
            }
            this.editSDGSItem.sdg = { name: this.element.sdgs[idx].sdg, uuid: id}
        },
        addSDGS() {
            let res = true, n = 0
            var datacount = this.element.sdgs.length
            while (res) {
                n++
                res = this.element.sdgs.some(item => item.id === n)
            }
            this.editSDGSItem.id = n
            this.editSDGSItem.sdg = this.editSDGSItem.sdg.name
            if( this.editSDGSItem.port != null) {
                this.newLine(this.element.uuid+'/PERArraySDG-'+datacount, this.element.uuid+'/PERArraySDG', this.editSDGSItem.port.uuid)
                this.editSDGSItem.port = this.editSDGSItem.port.name
            }

            const addObj = Object.assign({}, this.editSDGSItem)
            this.element.sdgs.push(addObj)
            this.cancelSDGS()
        },
        clearSDGS() {
            this.editSDGSItem.sdg = null
        },
        setPortSelect() {            
            if (this.isEditingPort == true) {
                if (this.editSDGSItem.port != null && this.editSDGSItem.port.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSDGSItem.port.uuid, element: constant.SWComponents_str} )
                    document.getElementById(this.editSDGSItem.port.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editSDGSItem.port.uuid)
                }
                this.setPortList()
                this.isEditingPort = false
            } else {
                this.isEditingPort = true
            }
        },
        setPortList() {
            this.selPort = this.$store.getters.getPRPortPrototype
            this.setactiveUUID()
        },
        clearPort() {
            this.isEditingPort = true
            this.editSDGSItem.port = null
        },

        isCheckFile() {
            if (this.isdeleteFileItem == true) {
                this.isdeleteFileItem = false
                this.selectDelectFile = []
            } else {
                this.isdeleteFileItem = true
            }
        },
        deletFile() {
            if (this.isdeleteFileItem == true) {
                this.element.files = this.element.files.filter(item => {
                        return this.selectDelectFile.indexOf(item) < 0 })

                this.isdeleteFileItem = false
                this.selectDelectFile = []
            } 
        },
        editFile(idx) {
            /*if (this.element.files[idx].name != this.editItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'PerFile', listname: this.editItem.name} )
            }*/
            this.element.files[idx].name = this.editItem.name
            this.element.files[idx].url = this.editItem.url
            this.element.files[idx].filename = this.editItem.filename
            this.element.files[idx].strategy = this.editItem.strategy
            this.cancelFile()
        },
        cancelFile() {
            this.editItem.name = ''
            this.editItem.url = ''
            this.editItem.filename = ''
            this.editItem.strategy = null
            this.setactiveUUID()
        },
        openFile(idx) {
            this.editItem.name = this.element.files[idx].name
            this.editItem.url = this.element.files[idx].url
            this.editItem.filename = this.element.files[idx].filename
            this.editItem.strategy = this.element.files[idx].strategy
        },
        addFile() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.files.some(item => item.id === n)
            }
            this.editItem.id = n

            const addObj = Object.assign({}, this.editItem)
            this.element.files.push(addObj)
            this.cancelFile()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editPERFileArray', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
