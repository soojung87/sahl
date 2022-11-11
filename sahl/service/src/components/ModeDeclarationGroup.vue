<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Mode Declaration Group</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputModeDeclarationName' outlined dense></v-text-field>
                            <v-select v-model="element.initmode" :items="element.modedeclaration" item-value="name" item-text="name" label="Initial Mode" clearable @click:clear='element.initmode=null' @click="setactiveUUID()" outlined dense style="height: 45px;" class="lable-placeholer-color"></v-select>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showModeDeclarationItem" x-small color="indigo">
                                            <v-icon>{{ isModeDeclarationOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Mode Declarations
                                    <v-btn @click="isCheckModeDeclaration" text x-small color="indigo" v-if="isModeDeclarationOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isModeDeclarationOpenClose && isdeleteModeDeclaration" @click="deleteModeDeclaration" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isModeDeclarationOpenClose">
                                    <v-data-table v-model="selectDelectModeDeclaration" :headers="headerModeDeclaration" :items="element.modedeclaration" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteModeDeclaration" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteModeDeclaration" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent @open="openModeDeclaration(idx)" @cancel="cancelModeDeclaration" @save="editModeDeclaration(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editModeDeclarationItem.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editModeDeclarationItem.value" label="Value" placeholder="Int" @click="setactiveUUID" style="height: 35px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @cancel="cancelModeDeclaration" @save="addModeDeclaration()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editModeDeclarationItem.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editModeDeclarationItem.value" label="Value" placeholder="Int" @click="setactiveUUID" style="height: 35px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
            <v-dialog v-model="dialogText" persistent width="800">
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
                            <label style="padding:10px;">&#60;INITIAL-MODE-REF&#62;</label>
                            <v-text-field v-model="editARXML.initmode" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;INITIAL-MODE-REF&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height:50px;">&#60;MODE-DECLARATIONS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextMD()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row>
                            <div class="text-editDialog" style="height: 300px;">
                                <v-row v-for="(item, i) in editARXML.modedeclaration" :key="i" style="height: 100px;">
                                    <div>
                                        <v-row style="height: 25px;margin:0px;">
                                            <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextMD(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            <label style="padding:10px;margin:2px 0px 2px 30px;">&#60;MODE-DECLARATION&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:90px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="item.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:90px;">&#60;VALUE&#62;</label>
                                            <v-text-field v-model="item.value" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;VALUE&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:75px;">&#60;&#47;MODE-DECLARATION&#62;</label>
                                        </v-row>
                                    </div>
                                </v-row>
                            </div>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height:20px;" >&#60;&#47;MODE-DECLARATIONS&#62;</label>
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
            }
        },
    },
    created() {
        this.setToolbarColor(this.$store.state.activeUUID)
    },

    data() {
        return {
            rules: { name:  [val => (val || '').length > 0 ], },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: true,
            dialogText: false,
            editARXML: {name:'', initmode: null, modedeclaration: []},
            editTextItem: { name: '', value: '', id: ''},
            isModeDeclarationOpenClose: true,

            isdeleteModeDeclaration: false,
            headerModeDeclaration: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Value', sortable: false, value: 'value' },
            ],
            selectDelectModeDeclaration: [],
            editModeDeclarationItem: { name: '', value: '', id: ''}
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on('Element-open', (isopen, uuid) => {
            if (this.element.uuid == uuid) {
                console.log(isopen)
                this.iselementOpenClose = isopen
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
            if (this.iselementOpenClose) { //SWComponent RClient에서 3개가 같이 뜰수있음 그때 하나만 펼치고 나머지 다 접으려고
                this.$store.commit('setOpenCloseCompuDataStrMachineModeD', {
                                uuid: this.element.uuid, left: this.element.left, top: this.element.top,
                                beforElement: constant.Process_str, closeElement: constant.Machine_str})
            }
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
                document.getElementById(this.element.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
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

        isCheckModeDeclaration() {
            if (this.isdeleteModeDeclaration == true) {
                this.isdeleteModeDeclaration = false
                this.selectDelectModeDeclaration = []
            } else {
                this.isdeleteModeDeclaration = true
            }
        },
        deleteModeDeclaration () {
            if (this.isdeleteModeDeclaration == true) {
                this.$store.commit('deleteRefTable', {deleteName:'modeDeclar', deletItemList: this.selectDelectModeDeclaration, path: this.element.path, name: this.element.name})

                this.element.modedeclaration = this.element.modedeclaration.filter(item => {
                         return this.selectDelectModeDeclaration.indexOf(item) < 0 })
                this.isdeleteModeDeclaration = false
                this.selectDelectModeDeclaration = []
            }
        },
        openModeDeclaration (idx) {
            this.editModeDeclarationItem.name = this.element.modedeclaration[idx].name
            this.editModeDeclarationItem.value = this.element.modedeclaration[idx].value
        },
        addModeDeclaration () {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.modedeclaration.some(item => item.id === n)
            }
            this.editModeDeclarationItem.id = n
            const addObj = Object.assign({}, this.editModeDeclarationItem);
            this.element.modedeclaration.push(addObj);
            this.cancelModeDeclaration()
        },
        editModeDeclaration (idx) {
            if (this.element.modedeclaration[idx].name != this.editModeDeclarationItem.name) {
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                            changeName: 'modeD', listname: this.editModeDeclarationItem.name, beforename:this.element.modedeclaration[idx].name} )
            }
            this.element.modedeclaration[idx].name = this.editModeDeclarationItem.name
            this.element.modedeclaration[idx].value = this.editModeDeclarationItem.value
            this.cancelModeDeclaration()
        },
        cancelModeDeclaration () {
            this.editModeDeclarationItem.name = ''
            this.editModeDeclarationItem.value = ''
            this.setactiveUUID()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editModeDeclarationGroup', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.initmode = this.element.initmode
            this.editARXML.modedeclaration = JSON.parse(JSON.stringify(this.element.modedeclaration))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editModeDeclarationGroup', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name

            this.editARXML.modedeclaration.forEach(element => {
                if (element.name == this.editARXML.initmode) {
                    this.element.initmode = this.editARXML.initmode
                }
            })

            if (this.editARXML.modedeclaration.length > 0) {
                var deleteItem = []
                this.element.modedeclaration.forEach(item => {
                    var isExistence = false
                    this.editARXML.modedeclaration.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'modeD', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'modeDeclar', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.modedeclaration.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'modeDeclar', deletItemList: this.element.modedeclaration, path: this.element.path, name: this.element.name})
                }
            }
            this.element.modedeclaration = JSON.parse(JSON.stringify(this.editARXML.modedeclaration))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', initmode: null, modedeclaration: []}
            this.editTextItem = { name: '', value: '', id: ''}
            this.dialogText = false
        },
        newTextMD() {
            this.editTextItem = { name: '', value: '', id: ''}

            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.modedeclaration.some(item => item.id === n)
            }
            this.editTextItem.id = n

            const addObj = Object.assign({}, this.editTextItem)
            this.editARXML.modedeclaration.push(addObj);
        },
        deletTextMD(idx) {
            this.editARXML.modedeclaration.splice(idx,1)
        },

    },
}
</script>