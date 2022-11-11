<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showErrorSet">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>AP Application Error Set</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>AP Application Error Set</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputErrorSetName' @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/error'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showErrorRef" x-small color="indigo">
                                            <v-icon>{{ isErrorRefOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Error Reference
                                    <v-btn @click="isCheckErrorRef" text x-small color="indigo" v-if="isErrorRefOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isErrorRefOpenClose && isdeleteErrorRefItem" @click="deletErrorRef" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isErrorRefOpenClose">
                                    <v-data-table v-model="selectDelectErrorRef" :headers="headerErrorRef" :items="element.errorref" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteErrorRefItem" item-key="id" height="140px" dense hide-default-footer @click:row="rowClick" single-select>
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteErrorRefItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refError === item.id ? 'red' : null " @click="rowClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openErrorRef(idx)" @cancel="cancelErrorRef" @save="editErrorRef(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editItem.error' label='Error Reference' :items='selError' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingError" clearable @click="setErrorSelect()" 
                                                                            @click:clear='clearErrorRef' @blur="isEditingError=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newError">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @cancel="cancelErrorRef" @save="addErrorRef()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editItem.error' label='Error Reference' :items='selError' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingError" clearable @click="setErrorSelect()" 
                                                                            @click:clear='clearErrorRef' @blur="isEditingError=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newError">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
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
                            <label style="padding:10px;height: 50px;">&#60;AP-APPLICATION-ERROR-REFS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextErrorRef()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 180px;">
                            <br>
                            <v-row v-for="(item, i) in editARXML.errorref" :key="i" style="height: 40px;">
                                <v-btn style="margin: 10px -15px 0px 15px" @click="deletTextErrorRef(i)" text x-small color="indigo">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <label style="padding:10px;">&#60;AP-APPLICATION-ERROR-REF&#62;</label>
                                <v-text-field v-model="item.error" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                                <label style="padding:10px;">&#60;&#47;AP-APPLICATION-ERROR-REF&#62;</label>
                            </v-row>
                        </div>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;AP-APPLICATION-ERROR-REFS&#62;</label>
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
    props: ['element', 'isDatailView', 'minimaptoolbar'],
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
            editARXML: {name:'', errorref: []},
            editTextItem: { error : null, id: ''},        
            isErrorRefOpenClose: true,
            selError: this.$store.getters.getError,
            isEditingError: true,
            isdeleteErrorRefItem: false,
            selectDelectErrorRef: [],
            headerErrorRef: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'AP Application Error Ref', align: 'start', sortable: false, value: 'error' },
            ],
            errorItem: [],
            editItem: { error : null, id: ''},
            deleteChangeLine : [],
            refError: null,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID) => {
            this.refError = null
            if (refNum == 1) {
                this.refError = idxID
            }
        })
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
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
        showErrorSet () {
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showErrorRef() {
            this.clickOtherFields()
            this.isErrorRefOpenClose = this.isErrorRefOpenClose ? false : true
        },
        inputErrorSetName () {
            this.$store.commit('editErrorSet', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            this.refError = null
            this.deleteOpenElement()
        },
        rowClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refError != this.element.errorref[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.deleteOpenElement()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+this.element.errorref[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorPath(this.element.errorref[idx].error)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    var isExist = true
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editError', {compo:"drag", uuid: endLine, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Error_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/error', endLine, isExist)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/error', end:endLine, iscircle:false, refNum:1, idxID: this.element.errorref[idx].id})
                }
                this.refError = this.element.errorref[idx].id
            }
        },

        isCheckErrorRef() {
            if (this.isdeleteErrorRefItem == true) {
                this.isdeleteErrorRefItem = false
                this.selectDelectErrorRef = []
            } else {
                if (this.refError != null) {
                    this.deleteOpenElement()
                    this.refError = null
                }
                this.isdeleteErrorRefItem = true
            }
        },
        deletErrorRef() {
            if (this.isdeleteErrorRefItem == true) {
                this.selectDelectErrorRef.forEach(item => {
                    for(let i=0; i<this.element.errorref.length; i++){
                        if (item.id == this.element.errorref[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+this.element.errorref[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/error-'+this.element.errorref[i].id)
                            }
                        }
                    }
                })

                this.element.errorref = this.element.errorref.filter(item => {
                        return this.selectDelectErrorRef.indexOf(item) < 0 })

                this.isdeleteErrorRefItem = false
                this.selectDelectErrorRef = []
            } 
        },
        openErrorRef(idx) {
            this.selError = this.$store.getters.getError
            if ( this.element.errorref[idx].error != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+this.element.errorref[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorPath(this.element.errorref[idx].error)
                }
                this.editItem.error = { name: this.element.errorref[idx].error, uuid: endLine }
            }
        },
        editErrorRef(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+this.element.errorref[idx].id)
            if (endLine != undefined && this.editItem.error == null) {
                this.deleteLine(this.element.uuid+'/error-'+this.element.errorref[idx].id)
                this.element.errorref[idx].error = null
            } else if (endLine != undefined && endLine != this.editItem.error.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/error-'+this.element.errorref[idx].id)
                this.newLine(this.element.uuid+'/error-'+this.element.errorref[idx].id, this.element.uuid+'/error', this.editItem.error.uuid, false)
                this.element.errorref[idx].error = this.editItem.error.name
            } else if (endLine == undefined && this.editItem.error != null && this.editItem.error.uuid != null) {
                this.newLine(this.element.uuid+'/error-'+this.element.errorref[idx].id, this.element.uuid+'/error', this.editItem.error.uuid, false)
                this.element.errorref[idx].error = this.editItem.error.name
            }

            if (this.refError == this.element.errorref[idx].id) {
                this.deleteOpenElement()
                if (this.editItem.error != null && this.editItem.error.uuid != null) {
                    var isExist = true, endLineChange = this.editItem.error.uuid
                    if (this.$store.getters.getDeleteOpenElement(this.editItem.error.uuid) == -1) {
                        this.$store.commit('editError', {compo:"drag", uuid: this.editItem.error.uuid, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Error_str, uuid: this.editItem.error.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/error', endLineChange, isExist)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/error', end:this.editItem.error.uuid, iscircle:false, refNum:1, idxID: this.refError})
                }
            }
            
            this.cancelErrorRef()
        },
        cancelErrorRef() {
            this.editItem.error = null
            this.setactiveUUID()
        },
        addErrorRef() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.errorref.some(item => item.id === n)
            }
            this.editItem.id = n
            this.deleteOpenElement()
            if( this.editItem.error != null) {
                var endLine = this.editItem.error.uuid
                var isExist = true
                if (this.$store.getters.getDeleteOpenElement(this.editItem.error.uuid) == -1) {
                    this.$store.commit('editError', {compo:"drag", uuid: this.editItem.error.uuid, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                    isExist = false
                }
                this.$store.commit('setzIndexVisible', {parent:constant.Error_str, uuid: this.editItem.error.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editItem.error = this.editItem.error.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/error-'+n, this.element.uuid+'/error', endLine, true, isExist)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/error', end:endLine, iscircle:false, refNum:1, idxID: this.editItem.id})
            }
            const addObj = Object.assign({}, this.editItem)
            this.element.errorref.push(addObj);
            this.refError = n
            console.log('//  ' + this.refError)

            this.cancelErrorRef()
        },

        clearErrorRef() {
            this.isEditingError = true
            this.editItem.error = null
        },
        setErrorSelect() {
            if (this.isEditingError == true) {
                if (this.editItem.error != null && this.editItem.error.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editItem.error.uuid, element: constant.Error_str} )
                    /*document.getElementById(this.editItem.error.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editItem.error.uuid)*/
                }
                this.setErrorList()
                this.isEditingError = false
            } else {
                this.isEditingError = true
            }
        },
        setErrorList() {
            this.selError = this.$store.getters.getError
            this.setactiveUUID()
        },
        newError() {
            this.$store.commit('addElementError', {
                name: this.$store.getters.getNameError, path: '', input: false,
                top: this.element.top + 100, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                desc: '', errorcode: '', errorDref: null
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.Error_str)
            this.$store.commit('editErrorSet', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editErrorSet', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
        newLine(startLine, drawLine, endLine, isView, isExist) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            if (isView) {
                EventBus.$emit('new-line', drawLine, endLine, isExist)
            }
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.errorref = JSON.parse(JSON.stringify(this.element.errorref))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editErrorSet', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            
            if (this.editARXML.errorref.length > 0) {
                this.editARXML.errorref.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.errorref.length; n++){
                        if (this.element.errorref[n].id == item.id &&
                            this.element.errorref[n].error == item.error) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/error-'+item.id)
                        }
                        var chandEndLine = this.$store.getters.getErrorPath(item.error)
                        if (chandEndLine != null) {
                            this.newLine(this.element.uuid+'/error-'+item.id, this.element.uuid+'/error', chandEndLine, false)
                        }
                    }
                })
                this.element.errorref.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.errorref.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/error-'+item.id)
                        }
                    }
                })
            } else {
                this.element.errorref.forEach(item => {
                    if (item.error != null) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/error-'+item.id)
                        }
                    }
                })
            }
            this.element.errorref = JSON.parse(JSON.stringify(this.editARXML.errorref))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', errorref: []}
            this.editTextItem = { error : null, id: ''}
            this.dialogText = false
        },
        newTextErrorRef() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.errorref.some(item => item.id === n)
            }
            this.editTextItem.id = n

            const addObj = Object.assign({}, this.editTextItem)
            this.editARXML.errorref.push(addObj);
        },
        deletTextErrorRef(idx) {
            this.editARXML.errorref.splice(idx,1)
        },
    },
}
</script>