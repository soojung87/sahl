<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showProcess">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Process</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Process</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-show="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputProcessName' outlined dense  @click="setactiveUUID"></v-text-field>
                    <v-row style="height: 45px">
                        <v-col cols="10">
                            <v-text-field v-model="element.prodesign" readonly @click="setProcessDesignSelect()" clearable @click:clear='clearProcessDesign()' label="Design Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/processprodesign'" dark icon v-bind="attrs" v-on="on" @click="setProcessDesignList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selProcessDesign" :key="i" link @click="setProcessDesign(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newProcessDesign" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row style="height: 45px">
                        <v-col cols="10">
                            <v-text-field v-model="element.determin" readonly @click="setDeterminSelect()" clearable @click:clear='clearDetermin()' label="Deterministic Client Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/processdetermin'" dark icon v-bind="attrs" v-on="on" @click="setDeterminList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selDeterministic" :key="i" link @click="setDeterministicClient(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newDeterministicClient" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row style="height: 70px">
                        <v-col cols="10">
                            <v-text-field v-model="element.execut" readonly @click="setExecutableSelect()" clearable @click:clear='clearExecutable()' label="Executable Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/processexecut'" dark icon v-bind="attrs" v-on="on" @click="setExecutableList()">
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
                        <div class="subtitle-2" :id="element.uuid+'/processmodedeclar'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showStateMachine" x-small color="indigo">
                                    <v-icon>{{ isStateMachineOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Process State Machine
                        </div>
                        <v-card-text v-show="isStateMachineOpenClose">
                            <v-text-field v-model="element.machinname" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.machinetype" readonly @click="setModeDeclarationSelect()" clearable @click:clear='clearModeDeclaration()' label="Type TReference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" dark icon v-bind="attrs" v-on="on" @click="setModeDeclarationList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selModeDeclaration" :key="i" link @click="setModeDeclaration(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newModeDeclarationGroup" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/processStarupC'">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showDependentStartup" x-small color="indigo">
                                    <v-icon>{{ isDependentStartupOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            State Dependent Startup Config
                            <v-btn v-if="isDependentStartupOpenClose" @click="addDependentStartup" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-tabs v-model='dependentStartupTab' v-show="isDependentStartupOpenClose" show-arrows @change="changeDependentStartupTab()">
                            <v-tab v-for="(tab, idx) in dependentStartupItem" :key="idx" @click="clickDependentStartuptab()"> 
                                {{idx}}
                                <v-btn text x-small @click="deleteDependentStartup(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="dependentStartupTab" v-show="isDependentStartupOpenClose">
                            <v-tab-item v-for="(tab, idx) in dependentStartupItem" :key="idx">
                                <v-card flat>
                                    <v-card-text>
                                        <v-card outlined class="mx-auto">
                                            <div class="subtitle-2" style="height:20px" :id="element.uuid+'/fgtable'+idx">
                                                <v-hover v-slot="{ hover }">
                                                    <v-btn text @click="showFunctionG" x-small color="indigo">
                                                        <v-icon>{{ isFunctionGOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                    </v-btn>
                                                </v-hover>
                                                Function Group State
                                                <v-btn  v-if="isFunctionGOpenClose" @click="isCheckFunctionG" text x-small color="indigo">
                                                    <v-icon>mdi-check</v-icon>
                                                </v-btn>
                                                <v-btn  v-if="isdeleteFunctionG && isFunctionGOpenClose" @click="deleteFunctionG" text x-small color="indigo">
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                            </div>
                                            <v-card-text v-show="isFunctionGOpenClose">
                                                <v-data-table v-model="selectDelectFunctionGItem" :headers="headerFunctionG" :items="tab.functionItem"
                                                        :show-select="isdeleteFunctionG" item-key="contextMode" height="100px" dense hide-default-footer >
                                                    <template v-slot:item.data-table-select="{ isSelected, select }">
                                                        <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                    </template>
                                                    <template v-if="!isdeleteFunctionG" v-slot:body="{ items, headers }">
                                                        <tbody>
                                                            <tr v-for="(item,idx) in items" :key="idx" >
                                                                <td v-for="(header,key) in headers" :key="key">
                                                                    <!-- <v-icon v-if="header.value == 'sort'" small class="sortHandle" >mdi-arrow-all</v-icon> -->
                                                                    <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openFunctionG(idx)" @cancel="editFunctionG(idx)" @save="cancelFunctionG" large >
                                                                        {{item[header.value]}}
                                                                        <template v-slot:input>
                                                                            <br> <!--v-autocomplete 여기에서 item의 uuid가 같을경우 item-text='name' item-value="uuid"로 해주면 uuid값이 같기 때문에 item의 list가 다 나오지 않는다 name으로 바꿔야지만 list가 잘나옴 -->
                                                                            <v-autocomplete v-model='editFunctionGItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                    return-object :readonly="!isEditingContextMode" @click="setContextModeSelect()" @blur="isEditingContextMode=true" 
                                                                                    clearable @click:clear='clearContextModeRef'>
                                                                            </v-autocomplete>
                                                                            <v-autocomplete v-model='editFunctionGItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                    return-object :readonly="!isEditingTargetMode"  @click="setTargetModeSelect()" @blur="isEditingTargetMode=true" 
                                                                                    clearable @click:clear='clearTargetModeRef'>
                                                                            </v-autocomplete>
                                                                        </template>
                                                                    </v-edit-dialog>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th colspan="3">
                                                                    <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addFunctionG()" @save="cancelFunctionG"> 
                                                                        <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                        <template v-slot:input>
                                                                            <br>
                                                                            <v-autocomplete v-model='editFunctionGItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                    return-object :readonly="!isEditingContextMode" @click="setContextModeSelect()" @blur="isEditingContextMode=true" 
                                                                                    clearable @click:clear='clearContextModeRef'>
                                                                            </v-autocomplete>
                                                                            <v-autocomplete v-model='editFunctionGItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                    return-object :readonly="!isEditingTargetMode"  @click="setTargetModeSelect()" @blur="isEditingTargetMode=true" 
                                                                                    clearable @click:clear='clearTargetModeRef'>
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
                                        <v-row style="height: 45px">
                                            <v-col cols="10">
                                                <v-text-field v-model="tab.resourceRef" readonly @click="setResourceGSelect(tab)" clearable @click:clear='clearResourceG(tab)' label="Resource Group Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-menu>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn color="deep-purple accent-4" :id="element.uuid+'/processresorce'+idx" icon v-bind="attrs" v-on="on" @click="setResourceGList()">
                                                            <v-icon>mdi-menu-down-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list >
                                                        <v-list-item v-for="(item, i) in selResourceG" :key="i" link @click="setResourceG(item, tab)">
                                                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                        </v-list-item>
                                                        <v-list-item v-if="selResourceG.length == 0">
                                                            <v-list-item-title>No Data Available</v-list-item-title>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </v-col>
                                        </v-row>
                                        <v-row style="height: 70px">
                                            <v-col cols="10">
                                                <v-text-field v-model="tab.startupConfigRef" readonly @click="setStartupCSelect(tab)" clearable @click:clear='clearStartupC(tab)' label="Startup Config Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-menu>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn color="deep-purple accent-4" :id="element.uuid+'/processstartup'+idx" dark icon v-bind="attrs" v-on="on" @click="setStartupCList()">
                                                            <v-icon>mdi-menu-down-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item v-for="(item, i) in selStartupC" :key="i" link @click="setStartupC(item, tab)">
                                                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                        </v-list-item>
                                                        <v-btn outlined color="indigo" dense text small block @click="newStartupC" >
                                                            <v-icon >mdi-plus</v-icon>New Item
                                                        </v-btn>
                                                    </v-list>
                                                </v-menu>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-card-text>
                <v-card-text v-show="!iselementOpenClose">
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
            isStateMachineOpenClose: true,
            isDependentStartupOpenClose: true,
            isFunctionGOpenClose : true,
            selProcessDesign: this.$store.getters.getProcessDesign,
            selDeterministic: this.$store.getters.getDeterministicClient,
            selExecutable: this.$store.getters.getExecutable,
            selModeDeclaration: this.$store.getters.getModeDeclarationG,
            selResourceG: this.$store.getters.getResourceGroup,
            selStartupC: this.$store.getters.getStartupConfig,
            dependentStartupItem: [],
            dependentStartupTab: 0,
            
            isdeleteFunctionG: false,
            selectDelectFunctionGItem: [],
            headerFunctionG: [
                { text: 'Context Mode Ref', align: 'start', sortable: false, value: 'contextMode' },
                { text: 'Target Mode Ref', sortable: false, value: 'targetMode' },
            ],
            isEditingContextMode: true,
            isEditingTargetMode: true,
            defaultFunctionGItem: { contextMode: null, targetMode: null },
            editFunctionGItem: { contextMode: null, targetMode: null },
            selContextMode: this.$store.getters.getModeDeclarationGP,
            selTargetMode: this.$store.getters.getModeDeclaration,
            changeLineFunc: [],

        }
    },
    mounted () {
        this.$nextTick(() => {
            if(this.element.dependent != undefined) {
                this.dependentStartupItem = this.element.dependent.slice()
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
        showProcess() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.dependentStartupItem.length > 0) {
                        if (this.isDependentStartupOpenClose) {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.dependentStartupTab)
                        } else {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                        }
                    }
                }
            })
        },
        showStateMachine() {
            this.isStateMachineOpenClose = this.isStateMachineOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showDependentStartup() {
            this.isDependentStartupOpenClose = this.isDependentStartupOpenClose ? false : true
            if(this.dependentStartupItem.length > 0) {
                this.$nextTick(() => {
                    if(this.isDependentStartupOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.dependentStartupTab)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        showFunctionG() {
            this.isFunctionGOpenClose = this.isFunctionGOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        inputProcessName() {
            this.$store.commit('editProcess', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        inputdependentStartupItem() {
            this.$store.commit('editProcess', {compo:"dependent", uuid:this.element.uuid, dependent: this.dependentStartupItem} )
        },

        clearProcessDesign() {
            this.element.prodesign = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processprodesign')
            }
        },
        setProcessDesignSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
            if (endLine == undefined) {
                endLine = this.$store.getters.getProcessDesignPath(this.element.prodesign)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ProcessDesign_str} )
            }
        },
        setProcessDesignList() {
            this.selProcessDesign = this.$store.getters.getProcessDesign
            this.setactiveUUID()
        },
        setProcessDesign(item) {
            if(this.element.prodesign != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processprodesign')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processprodesign', this.element.uuid+'/processprodesign', item.uuid)
                this.element.prodesign = item.name
            }
            this.setactiveUUID()
        },
        newProcessDesign() {
            this.$store.commit('addElementProcessDesign', { //executableref 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameProcessDesign, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                executableref: null, determin: [],
            })
            EventBus.$emit('add-element', constant.ProcessDesign_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearDetermin() {
            this.element.determin = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processdetermin')
            }
        },
        setDeterminSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
            if (endLine == undefined) {
                endLine = this.$store.getters.getDeterministicClientPath(this.element.determin)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.DeterministicClient_str} )
            }
        },
        setDeterminList() {
            this.selDeterministic = this.$store.getters.getDeterministicClient
            this.setactiveUUID()
        },
        setDeterministicClient(item) {
            if(this.element.determin != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processdetermin')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processdetermin', this.element.uuid+'/processdetermin', item.uuid)
                this.element.determin = item.name
            }
            this.setactiveUUID()
        },
        newDeterministicClient() {
            this.$store.commit('addElementDeterministicClien', {
                name: this.$store.getters.getNameDeterministicClient, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                cycletiem: '', numofworkers: '',
            })
            EventBus.$emit('add-element', constant.DeterministicClient_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearExecutable() {
            this.element.execut = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processexecut')
            }
        },
        setExecutableSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
            if (endLine == undefined) {
                endLine = this.$store.getters.getExecutablePath(this.element.execut)
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
            if(this.element.execut != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processexecut')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processexecut', this.element.uuid+'/processexecut', item.uuid)
                this.element.execut = item.name
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
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearModeDeclaration() {
            this.element.machinetype = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processmodedeclar')
            }
        },
        setModeDeclarationSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
            if (endLine == undefined) {
                endLine = this.$store.getters.getModeDeclarationPath(this.element.machinetype, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ModeDeclarationGroup_str} )
            }
        },
        setModeDeclarationList() {
            this.selModeDeclaration = this.$store.getters.getModeDeclarationG
            this.setactiveUUID()
        },
        setModeDeclaration(item) {
            if(this.element.machinetype != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processmodedeclar')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processmodedeclar', this.element.uuid+'/processmodedeclar', item.uuid)
                this.element.machinetype = item.name
            }
            this.setactiveUUID()
        },
        newModeDeclarationGroup() {
            this.$store.commit('addElementModeDeclarationGroup', {
                name: this.$store.getters.getNameModeDeclarationGroup, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, 
                modedeclaration:[], initmode:null, icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.ModeDeclarationGroup_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addDependentStartup() {
            const editItem = { functionItem: [], resourceRef: null, startupConfigRef: null}
            const addObj = new Object(editItem)
            this.dependentStartupItem.push(addObj)
            this.dependentStartupTab = this.dependentStartupItem.length-1
            this.inputdependentStartupItem()
            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
        },
        clickDependentStartuptab() {
            this.isdeleteFunctionG = false
            this.selectDelectFunctionGItem = []
        },
        changeDependentStartupTab() {
            if(this.dependentStartupItem.length > 0) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.dependentStartupTab)}, 300);
            }
        },
        deleteDependentStartup(idx) {
            for(let i=0; i<this.dependentStartupItem[this.dependentStartupTab].functionItem.length; i++){
                var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+i+'-'+idx)
                if(endLineCon != undefined) {
                    this.deleteLine(this.element.uuid+'/fgcontext-'+i+'-'+idx)
                }
                var endLinetarg = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+i+'-'+idx)
                if(endLinetarg != undefined) {
                    this.deleteLine(this.element.uuid+'/fgtarget-'+i+'-'+idx)
                }
            }
            var endLine
            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+idx)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processresorce-'+idx)
            }
            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+idx)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processstartup-'+idx)
            }

            this.dependentStartupItem.splice(idx, 1)
            this.inputdependentStartupItem()
        },
        isCheckFunctionG() {
            if (this.isdeleteFunctionG == true) {
                this.isdeleteFunctionG = false
                this.selectDelectFunctionGItem = []
            } else {
                this.isdeleteFunctionG = true
            }
        },
        deleteFunctionG() {
            if (this.isdeleteFunctionG == true) {
                for(let i=0; i<this.dependentStartupItem[this.dependentStartupTab].functionItem.length; i++){
                    var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+i+'-'+this.dependentStartupTab)
                    if(endLineCon != undefined) {
                        this.deleteLine(this.element.uuid+'/fgcontext-'+i+'-'+this.dependentStartupTab)
                    }
                    var endLinetarg = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+i+'-'+this.dependentStartupTab)
                    if(endLinetarg != undefined) {
                        this.deleteLine(this.element.uuid+'/fgtarget-'+i+'-'+this.dependentStartupTab)
                    }
                    if(endLineCon != undefined || endLinetarg != undefined) {
                        this.changeLineFunc.push({contextMode:this.dependentStartupItem[this.dependentStartupTab].functionItem[i].contextMode, targetMode:this.dependentStartupItem[this.dependentStartupTab].functionItem[i].targetMode, endLineCon:endLineCon, endLineTarg:endLinetarg})
                    }
                }

                this.dependentStartupItem[this.dependentStartupTab].functionItem = this.dependentStartupItem[this.dependentStartupTab].functionItem.filter(item => {
                         return this.selectDelectFunctionGItem.indexOf(item) < 0 })

                let idx = 0 
                for(let n=0; n<this.dependentStartupItem[this.dependentStartupTab].functionItem.length; n++) {
                    let rigth= true
                    while (rigth) {
                        if (this.dependentStartupItem[this.dependentStartupTab].functionItem[n].contextMode == this.changeLineFunc[idx].contextMode &&
                            this.dependentStartupItem[this.dependentStartupTab].functionItem[n].targetMode == this.changeLineFunc[idx].targetMode) {
                                rigth = false
                                idx--
                        }
                        idx++
                    }
                    console.log('escape')
                    if (this.dependentStartupItem[this.dependentStartupTab].functionItem[n].contextMode != null) {
                        this.newLine(this.element.uuid+'/fgcontext-'+n+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.changeLineFunc[idx].endLineCon)
                    }
                    if (this.dependentStartupItem[this.dependentStartupTab].functionItem[n].targetMode != null) {
                        this.newLine(this.element.uuid+'/fgtarget-'+n+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.changeLineFunc[idx].endLineTarg)
                    }
                }

                this.isdeleteFunctionG = false
                this.selectDelectFunctionGItem = []
                this.changeLineFunc = []
                this.inputdependentStartupItem()
            }
        },
        openFunctionG(idx) {
            this.selContextMode = this.$store.getters.getModeDeclarationGP
            this.selTargetMode = this.$store.getters.getModeDeclaration

            if (this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].contextMode != null ) {
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+this.dependentStartupTab+'/'+idx)
                if (endLineC == undefined) {
                    endLineC = this.$store.getters.getMachinePath(this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].contextMode, 2)
                }
                this.editFunctionGItem.contextMode = { name :this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].contextMode, uuid: endLineC }
            }
            if (this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].targetMode != null) {
                var endLineT = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+this.dependentStartupTab+'/'+idx)
                if (endLineT == undefined) {
                    endLineT = this.$store.getters.getModeDeclarationPath(this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].targetMode, 1)
                }
                this.editFunctionGItem.targetMode = { name :this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].targetMode, uuid: endLineT }
            }
        },
        editFunctionG(idx) {
            var endcontextMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab)
            if (endcontextMLine != undefined && this.editFunctionGItem.contextMode == null) {
                this.deleteLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab)
                this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].contextMode = null
            } else if (endcontextMLine != undefined && endcontextMLine != this.editFunctionGItem.contextMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab)
                this.newLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.contextMode.uuid)
                this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].contextMode = this.editFunctionGItem.contextMode.name
            } else if(endcontextMLine == undefined && this.editFunctionGItem.contextMode != null) {
                this.newLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.contextMode.uuid)
                this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].contextMode = this.editFunctionGItem.contextMode.name
            }

            var endtargetMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab)
            if (endtargetMLine != undefined && this.editFunctionGItem.targetMode == null) {
                this.deleteLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab)
                this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].targetMode = null
            } else if (endtargetMLine != undefined && endtargetMLine != this.editFunctionGItem.targetMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab)
                this.newLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.targetMode.uuid)
                this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].targetMode = this.editFunctionGItem.targetMode.name
            } else if (endtargetMLine == undefined && this.editFunctionGItem.targetMode != undefined) {
                this.newLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.targetMode.uuid)
                this.dependentStartupItem[this.dependentStartupTab].functionItem[idx].targetMode = this.editFunctionGItem.targetMode.name
            }
            
            this.cancelFunctionG()
            this.inputdependentStartupItem()
        },
        cancelFunctionG() {
            this.editFunctionGItem = Object.assign({}, this.defaultFunctionGItem)
            this.setactiveUUID()
        },
        addFunctionG() {
            var datacount
            if(this.dependentStartupItem[this.dependentStartupTab].functionItem == undefined) {
                datacount = 0
            }else {
                datacount = this.dependentStartupItem[this.dependentStartupTab].functionItem.length
            }

            if( this.editFunctionGItem.contextMode != null) {
                this.newLine(this.element.uuid+'/fgcontext-'+datacount+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.contextMode.uuid)
                this.editFunctionGItem.contextMode = this.editFunctionGItem.contextMode.name
            }
            if( this.editFunctionGItem.targetMode != null) {
                this.newLine(this.element.uuid+'/fgtarget-'+datacount+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.targetMode.uuid)
                this.editFunctionGItem.targetMode = this.editFunctionGItem.targetMode.name
            }
            const addObj = Object.assign({}, this.editFunctionGItem)
            this.dependentStartupItem[this.dependentStartupTab].functionItem.push(addObj)
            this.cancelFunctionG()
            this.inputdependentStartupItem()
        },
        setContextModeSelect() {
            if (this.isEditingContextMode == true) { 
                if (this.editFunctionGItem.contextMode != null && this.editFunctionGItem.contextMode.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editFunctionGItem.contextMode.uuid, element: constant.Machine_str} )
                }
                this.setContextMList()
                this.isEditingContextMode = false
            } else {
                this.isEditingContextMode = true
            }
        },
        setContextMList() {
            this.selContextMode =  this.$store.getters.getModeDeclarationGP
            console.log('setTargetMList'+this.selContextMode.length)
            this.setactiveUUID()
        },
        clearContextModeRef() {
            this.isEditingContextMode = true
            this.editFunctionGItem.contextMode = null
        },
        setTargetModeSelect() {
            if (this.isEditingTargetMode == true) { 
                if (this.editFunctionGItem.targetMode != null && this.editFunctionGItem.targetMode.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editFunctionGItem.targetMode.uuid, element: constant.ModeDeclarationGroup_str} )
                }
                this.setTargetMList()
                this.isEditingTargetMode = false
            } else {
                this.isEditingTargetMode = true
            }
        },
        setTargetMList() {
            this.selTargetMode =  this.$store.getters.getModeDeclaration
            console.log('setTargetMList'+this.selTargetMode.length)
            this.setactiveUUID()
        },
        clearTargetModeRef() {
            this.isEditingTargetMode = true
            this.editFunctionGItem.targetMode = null
        },


        clearResourceG(item) {
            item.resourceRef = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
            }
            this.inputdependentStartupItem()
        },
        setResourceGSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinePath(item.resourceRef, 1)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Machine_str} )
            }
        },
        setResourceGList() {
            this.selResourceG = this.$store.getters.getResourceGroup
            this.setactiveUUID()
        },
        setResourceG(item, tab) {
            if(tab.resourceRef != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab, this.element.uuid+'/processresorce'+this.dependentStartupTab, item.uuid)
                }
                tab.resourceRef = item.name
                this.inputdependentStartupItem()
            }
            this.setactiveUUID()
        },

        clearStartupC(item) {
            item.startupConfigRef = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
            }
            this.inputdependentStartupItem()
        },
        setStartupCSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getStartupConfigPath(item.startupConfigRef)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.StartupConfig_str} )
            }
        },
        setStartupCList() {
            this.selStartupC = this.$store.getters.getStartupConfig
            this.setactiveUUID()
        },
        setStartupC(item, tab) {
            if(tab.startupConfigRef != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab, this.element.uuid+'/processstartup'+this.dependentStartupTab, item.uuid)
                tab.startupConfigRef = item.name
                this.inputdependentStartupItem()
            }
            this.setactiveUUID()
        },
        newStartupC() {
            this.$store.commit('addElementStartupConfig', {
                name: this.$store.getters.getNameStartupConfig, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                configname: '', policy:null, priority:'', entertimeout:'', exittimeout:''
            })
            EventBus.$emit('add-element', constant.StartupConfig_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
