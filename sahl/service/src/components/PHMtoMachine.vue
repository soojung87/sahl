<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showPHMtoMachine">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>PHM Contribution To Machine Mapping</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>PHM Contribution To Machine Mapping</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputPHMtoMachineName' outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.machine" readonly @click="setMachineSelect()" clearable @click:clear='clearMachine()' label="Design Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/PHMtoMachine'" dark icon v-bind="attrs" v-on="on" @click="setMachineList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selMachine" :key="i" link @click="setMachine(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newMachine()" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/PHMContri'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showContri" x-small color="indigo">
                                            <v-icon>{{ isContriOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    PHM Contribution Refs
                                    <v-btn @click="isCheckContri" text x-small color="indigo" v-if="isContriOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isContriOpenClose && isdeleteContriItem" @click="deletContri" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isContriOpenClose">
                                    <v-data-table v-model="selectDelectContri" :headers="headerContri" :items="element.contri" :items-per-page='20'
                                            :show-select="isdeleteContriItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteContriItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editContri(idx)" @open="openContri(idx)" @save="cancelContri" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editItem.con' label='Contribution Reference' :items='selPHMManagement' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingCon" clearable @click="setConSelect()" 
                                                                            @click:clear='clearConRef' @blur="isEditingCon=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newPHMContribution">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addContri()" @save="cancelContri"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editItem.con' label='Contribution Reference' :items='selPHMManagement' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingCon" clearable @click="setConSelect()" 
                                                                            @click:clear='clearConRef' @blur="isEditingCon=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newPHMContribution">
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
            selMachine: this.$store.getters.getMachine,
            selPHMManagement: this.$store.getters.getPHMContribution,
            isContriOpenClose: true,
            isEditingCon: true,
            isdeleteContriItem: false,
            selectDelectContri: [],
            headerContri: [
                { text: 'PHM Contribution ref', align: 'start', sortable: false, value: 'con' },
            ],
            editItem: { con : null, id: ''},
            deleteChangeLine : [],
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
        showPHMtoMachine () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showContri() {
            this.isContriOpenClose = this.isContriOpenClose ? false : true
        },
        inputPHMtoMachineName () {
            this.$store.commit('editPHMtoMachine', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clearMachine() {
            this.element.machine = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMtoMachine')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PHMtoMachine')
            }
        },
        
        setMachineSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMtoMachine')
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinePath(this.element.machine)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Machine_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setMachineList() {
            this.selMachine = this.$store.getters.getMachine
            this.setactiveUUID()
        },
        setMachine(item) {
            if(this.element.machine != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMtoMachine')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PHMtoMachine')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/PHMtoMachine', this.element.uuid+'/PHMtoMachine', item.uuid)
                this.element.machine = item.name
            }
            this.setactiveUUID()
        },
        newMachine() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementMachine', {
                name: this.$store.getters.getNameMachine, path: '',
                top: elementY, left: elementX, zindex: 10, machinedesign:null, timeout:'', hwelement:[], executable:null, admin: '',
                functiongroup:[], environ: [], processor: [], moduleinstant: [], ucm: [], iam: [], crypto: [], icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.Machine_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editPHMtoMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckContri() {
            if (this.isdeleteContriItem == true) {
                this.isdeleteContriItem = false
                this.selectDelectContri = []
            } else {
                this.isdeleteContriItem = true
            }
        },
        deletContri() {
            if (this.isdeleteContriItem == true) {
                for(let i=0; i<this.element.contri.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMContri-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLine.push({id:this.element.contri[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/PHMContri-'+i)
                    }
                }

                this.element.contri = this.element.contri.filter(item => {
                        return this.selectDelectContri.indexOf(item) < 0 })

                for(let n=0; n<this.element.contri.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLine.length; idx++) {
                        if (this.element.contri[n].id == this.deleteChangeLine[idx].id) {
                            this.newLine(this.element.uuid+'/PHMContri-'+n, this.element.uuid+'/PHMContri', this.deleteChangeLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteContriItem = false
                this.selectDelectContri = []
                this.deleteChangeLine = []
            } 
        },
        openContri(idx) {
            this.selPHMManagement = this.$store.getters.getPHMContribution
            if ( this.element.contri[idx].con != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMContri-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getPHMContributionPath(this.element.contri[idx].con)
                }
                this.editItem.con = { name: this.element.contri[idx].con, uuid: endLine }
            }
        },
        editContri(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMContri-'+idx)
            if (endLine != undefined && this.editItem.con == null) {
                this.deleteLine(this.element.uuid+'/PHMContri-'+idx)
                this.element.contri[idx].con = null
            } else if (endLine != undefined && endLine != this.editItem.con.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/PHMContri-'+idx)
                this.newLine(this.element.uuid+'/PHMContri-'+idx, this.element.uuid+'/PHMContri', this.editItem.con.uuid)
                this.element.contri[idx].con = this.editItem.con.name
            } else if (endLine == undefined && this.editItem.con != null && this.editItem.con.uuid != null) {
                this.newLine(this.element.uuid+'/PHMContri-'+idx, this.element.uuid+'/PHMContri', this.editItem.con.uuid)
                this.element.contri[idx].con = this.editItem.con.name
            }

            this.cancelContri()
        },
        cancelContri() {
            this.editItem.con = null
            this.setactiveUUID()
        },
        addContri() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.contri.some(item => item.id === n)
            }
            this.editItem.id = n

            if( this.editItem.con != null) {
                var datacount = this.element.contri.length
                this.newLine(this.element.uuid+'/PHMContri-'+datacount, this.element.uuid+'/PHMContri', this.editItem.con.uuid)
                this.editItem.con = this.editItem.con.name
            }
            const addObj = Object.assign({}, this.editItem)
            this.element.contri.push(addObj);
            this.cancelContri()
        },

        clearConRef() {
            this.isEditingCon = true
            this.editItem.con = null
        },
        setConSelect() {
            if (this.isEditingCon == true) {
                if (this.editItem.con != null && this.editItem.con.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editItem.con.uuid, element: constant.PlatformHealthManagC_str} )
                    document.getElementById(this.editItem.con.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editItem.con.uuid)
                }
                this.setConList()
                this.isEditingCon = false
            } else {
                this.isEditingCon = true
            }
        },
        setConList() {
            this.selPHMManagement = this.$store.getters.getPHMContribution
            this.setactiveUUID()
        },
        newPHMContribution() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            this.$store.commit('addElementPHMContribution', {
                name: this.$store.getters.getNamePHMContribution, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
            })
            EventBus.$emit('add-element', constant.Platform_str)
            EventBus.$emit('add-element', constant.PHM_str)
            EventBus.$emit('add-element', constant.PlatformHealthManagC_str)
            this.$store.commit('editPHMtoMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editPHMtoMachine', {compo:"z", uuid:this.element.uuid, zindex:10} )
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