<template>
    <div>
        <v-icon class="subtitle-1 green" style="margin:0 5px 0 15px;" dark >mdi-view-dashboard</v-icon>
                    SAHL
        <v-divider></v-divider>
        <v-list dense>
            <v-list-group v-for="(item,idx) in navigatorList" :key="idx"
                    prepend-icon="mdi-alpha-p-circle-outline" no-action sub-group v-model="openlist"> <!--  sub-group 빼면 리스트가 하나씩만 보인다-->
                <template v-slot:activator>
                    <v-list-item-icon v-if="item.validation">
                        <v-icon color="red" dark>mdi-exclamation</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.name" style="fontsize:20px" @contextmenu="show($event, 0)"></v-list-item-title>
                    </v-list-item-content>
                </template> 
                <v-card flat @contextmenu="show($event,1)">
                    <v-treeview ref="tree" :items="item.children" activatable item-key="uuid" :open.sync="openIds" :active.sync="activenode" dense @update:open="openNode" @update:active="activeElement()" class="caption">
                        <template v-slot:prepend="{ item, open }">
                            <!-- <v-badge v-if="item.validation" bordered dot color="red" offset-x="10" offset-y="12"> -->
                            <div v-if="item.validation">
                                <v-icon color="red" v-if="item.icon=='mdi-folder'" >
                                    mdi-folder-alert
                                </v-icon>
                                <v-icon v-else-if="item.children" color="red">mdi-alpha-e-circle-outline</v-icon>
                                <v-icon v-else color="red">mdi-clipboard-alert-outline</v-icon>
                            </div>
                            <!-- </v-badge> -->
                            <div v-else>
                                <v-icon color="#ECB35D" v-if="item.icon=='mdi-folder'" >
                                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                                </v-icon>
                                <v-icon v-else-if="item.children && item.children.length == 0" color="primary">mdi-alpha-e</v-icon>
                                <v-icon v-else color="primary">{{item.icon}}</v-icon>
                            </div>
                        </template>
                    </v-treeview>
                </v-card>
            </v-list-group>
        </v-list>
        <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
            <v-list v-if="ismenu == 2" dense class="text-start">
                <v-edit-dialog eager large persistent cancel-text='Ok' save-text="Cancel" @cancel="setRename()" @save="cancelRename()"> 
                    <v-list-item @click="renameElement()">
                        <v-list-item-content>
                            <v-list-item-title>Element Rename</v-list-item-title> <!--이름을 길게 안하면 menu밑에 text가 길어서 active된 라인이 짧아짐-->
                        </v-list-item-content>
                    </v-list-item>
                    <template v-slot:input>
                        <br>
                        <v-text-field v-model="rename.name" outlined clearable label="Rename" type="text"></v-text-field>
                    </template>
                </v-edit-dialog>
                <v-list-item  v-for="(item, index) in menuElementitems" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else-if="ismenu == 0" dense class="text-start">
                <v-list-item  v-for="(item, index) in menuProjectitems" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else-if="ismenu == 1" dense class="text-start">
                <v-list-item  v-for="(item, index) in menuitems" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else dense class="text-start">
                <v-list-item  v-for="(item, index) in menuFirstitems" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-dialog v-model="dialogDeleteProject" persistent width="600">
            <v-card color="red accent-2">
                <v-card-title class="text-h6 white--text" height="10px"> 
                    <v-icon color="white lighten-1">mdi-alert-outline</v-icon>
                    warning 
                </v-card-title>
                <v-card-text class="text-h5 text--primary text-center">
                    {{strDelete}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="white darken-1" text  @click="okDelete(ismenu)" >
                        Ok
                    </v-btn>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="white darken-1" text @click="dialogDeleteProject = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '../main'
import constant from "../store/constants.js"


export default({
    computed: {
        SAHLProject () {
            return this.$store.state.SAHLProject
        },
        openProjectIndex () {
            return this.$store.state.openProjectIndex
        },
        navigatorList () {
            return this.$store.state.navigatorList
        },
        activeUUID() {
            return this.$store.state.activeUUID
        },
        ismakeProject() {
            return this.$store.state.ismakeProject
        },
    },
    watch:{
        activeUUID(val) {
            //console.log('activeUUID '+this.activenode[0])
            //console.log('activeUUID*** '+ val)
            if(this.activenode[0] != null) {
                if(val != null) {
                    this.activenode = []
                    this.activenode.push(val)
                } else if (val == null && this.activenode[0].indexOf('-') !== -1) {
                    this.activenode = []
                }
            } else if (this.activenode[0] == undefined && val != null) {
                this.activenode.push(val)
            }
        },
        ismakeProject(val) {
            if (!val) {
                this.openIds = []
            }
        },
    },
    data() {
        return {
            rules: { name:  [val => (val || '').length > 0 ],},
            showMenu: false,
            x: 0,
            y: 0,
            openlist: true,
            ismenu: 0,
            activenode: [],
            openIds: [],
            dialogDeleteProject: false,
            strDelete: null,
            rename: { id: 0, name: null, parent: null},
            menuElementitems: [
                // { title: 'Rename', menuAction: action => { this.renameElement(action) } },
                { title: 'Delete', menuAction: action => { this.deleteElement(action) } },
                { title: 'Copy & Paste', menuAction: action => { this.copyElement(action) } },
            ],
            menuFirstitems: [
                { title: 'New',    menuAction: action => { this.newGroupElement(action) } },
                { title: 'Open',   menuAction: action => { this.openElement(action) } },
                { title: 'Close',   menuAction: action => { this.closeElement(action) } },
            ],
            menuitems: [
                { title: 'New',    menuAction: action => { this.newElement(action) } },
                { title: 'Open',   menuAction: action => { this.openElement(action) } },
                { title: 'Close',   menuAction: action => { this.closeElement(action) } },
            ],
            menuProjectitems: [
                { title: 'Open All',   menuAction: action => { this.openAll(action) } },
                { title: 'Close All',   menuAction: action => { this.closeAll(action) } },
                { title: 'Delete Project', menuAction: action => { this.deleteProject(action) } },
                { title: 'Save',           menuAction: action => { this.saveElement(action) } },
            ],
        }
    },
    mounted () {
        EventBus.$on('add-element', (element) => { 
            if(!this.openIds.some(item => item === element)){
                this.openIds.push(element)
            }
        })
        EventBus.$on('active-element', (uuid) => {
            this.activenode = []
            if (uuid != null) {
                this.activenode.push(uuid)
            }
            //console.log(this.activenode)
        })
        EventBus.$on('new-file', () => {this.newElement()})
        EventBus.$on('delete-file', () => {this.deleteElement()})
        EventBus.$on('delete-project', () => {this.deleteProject()})
    },

    methods: {
        show (e, isprojectmenu) {
            e.preventDefault()
            if (this.activenode[0] != null || isprojectmenu == 0) {
                this.ismenu = 3
                if (isprojectmenu == 0) {
                    this.ismenu = isprojectmenu
                } else if (this.activenode[0].indexOf('-') != -1) {
                    this.ismenu = 2
                } else if (!(this.activenode[0] == constant.DateType_str || this.activenode[0] == constant.Service_str || this.activenode[0] == constant.AdaptiveApplication_str
                    || this.activenode[0] == constant.Machines_str || this.activenode[0] == constant.Platform_str || this.activenode[0] == constant.ServiceInterfaces_str
                    || this.activenode[0] == constant.SomeIPEvents_str || this.activenode[0] == constant.ServiceInstances_str || this.activenode[0] == constant.Errors_str
                    || this.activenode[0] == constant.PER_str || this.activenode[0] == constant.PHM_str || this.activenode[0] == constant.NM_str || this.activenode[0] == constant.Log_str
                    || this.activenode[0] == constant.IAM_str || this.activenode[0] == constant.UCM_str)) {
                    this.ismenu = isprojectmenu
                }
                this.showMenu = false
                this.x = e.clientX
                this.y = e.clientY
                this.$nextTick(() => {
                    this.showMenu = true
                })
            }
        },
        openNode() {
            //alert(this.openIds)
        },
        newElement() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000)) // (max - min) + min
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            // const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10) // (max - min) + min
            // const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            if (this.activenode[0] == constant.CompuMethod_str) {
                this.$store.commit('addElementCompuMehtod', {
                    name: this.$store.getters.getNameCompuMethod, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, category:'', attributeName: '', scales:[], icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.DataConstr_str) {
                this.$store.commit('addElementDataConstr', {
                    name: this.$store.getters.getNameDataConstr, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, lowerlimit:'', upperlimit:'', icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.SWBaseType_str) {
                this.$store.commit('addElementSWBaseType', {
                    name: this.$store.getters.getNameSWBaseType, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, category:'', encoding:'', icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.ApplicationArray_str) {
                this.$store.commit('addElementApplicationArray', { // elehandling, elesemantics 는 select라서 초기값이 null이다.
                    name: this.$store.getters.getNameApplicationArray,  input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category:'', dynamicArrySize:'', elename: '', elehandling: null, elesemantics: null, elemaxnumber:'', 
                })
            } else if (this.activenode[0] == constant.Implementation_str) {
                this.$store.commit('addElementImplementation', { //typeref, templatetype  는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameImplementation, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10,  icon:"mdi-clipboard-outline", validation: false,
                    category:'', namespace:'', arraysize:'', typeemitter:'', 
                    typeref: null, templatetype:null, desc:'', traceName: '', trace: [], ddpc:[], idtelement:[],
                })
            } else if (this.activenode[0] == constant.Machine_str) {
                this.$store.commit('addElementMachine', {
                    name: this.$store.getters.getNameMachine, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, machinedesign:null, timeout:'', hwelement:[], executable:null, admin: '',
                    functiongroup:[], environ: [], processor: [], moduleinstant: [], ucm: [], iam: [], icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.MachineDesigne_str) {
                this.$store.commit('addElementMachineDesign', {
                    name: this.$store.getters.getNameMachineDesign, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, access: null, resettimer:'', connector:[], servicediscover:[], icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.ModeDeclarationGroup_str) {
                this.$store.commit('addElementModeDeclarationGroup', {
                    name: this.$store.getters.getNameModeDeclarationGroup, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, modedeclaration:[], initmode:null, icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.HWElement_str) {
                this.$store.commit('addElementHWElement', { //category 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameHWElement,  input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, category:null, attribute:[], icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.HWCategory_str) {
                this.$store.commit('addElementHWCategory', { 
                    name: this.$store.getters.getNameHWCategory,  input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    attribute: []
                })
            }else if (this.activenode[0] == constant.EthernetCluster_str) {
                this.$store.commit('addElementEthernetCluster', {
                    name: this.$store.getters.getNameEthernetCluster, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, conditional:[], icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.ProcesstoMachineMapping_str) {
                this.$store.commit('addElementProtoMachineMapping', { //ptmmMachine, ptmmProcess  는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameProcesstoMachineMapping, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    mapping: [],
                })
            } else if (this.activenode[0] == constant.SWComponents_str) {
                this.$store.commit('addElementSWComponents', {
                    name: this.$store.getters.getNameSWComponents, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    pport: [], rport: [], prport: [],
                })
            } else if (this.activenode[0] == constant.Process_str) {
                this.$store.commit('addElementProcess', { //prodesign, determin, execut, machinetype  는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameProcess, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    logLevel: null, logPath: '', logProDesc: '', logProID: '', restart: '', preMapping: null, logMode: [],
                    prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: []
                })
            } else if (this.activenode[0] == constant.ProcessDesign_str) {
                this.$store.commit('addElementProcessDesign', { //executableref 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameProcessDesign, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10,icon:"mdi-clipboard-outline", validation: false,
                    executableref: null, determin: [],
                })
            } else if (this.activenode[0] == constant.Executable_str) {
                this.$store.commit('addElementExecutable', { //applicationtyperef 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameExecutable, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    version: '', category:'', buildType:null, loggingBehabior:null, reportingBehabior:null, swname:'', applicationtyperef: null,
                })
            } else if (this.activenode[0] == constant.StartupConfig_str) {
                this.$store.commit('addElementStartupConfig', {
                    name: this.$store.getters.getNameStartupConfig, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    config: []
                })
            } else if (this.activenode[0] == constant.DeterministicClient_str) {
                this.$store.commit('addElementDeterministicClien', {
                    name: this.$store.getters.getNameDeterministicClient, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    cycletiem: '', numofworkers: '',
                })
            } else if (this.activenode[0] == constant.SomeIPServiceInterfaceDeployment_str) {
                this.$store.commit('addElementSomeIPService', {
                    name: this.$store.getters.getNameSomeIPService, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, version:null, namespace:null, events:null, fields:null, methods:null, icon:"mdi-clipboard-outline", validation: false,
                    service: null, majversion:'', minversion:'', id: '', eventG:[], eventD: [], methodD:[], fieldD:[],
                })
            } else if (this.activenode[0] == constant.ServiceInterface_str) {
                this.$store.commit('addElementService', {
                    name: this.$store.getters.getNameServiceInterface, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    versionMaj:'', versionMin:'', namespace:'', events:[], fields:[], methods:[], isservice: null,
                })
            } else if (this.activenode[0] == constant.Client_str) {
                this.$store.commit('addElementClient', { 
                    name: this.$store.getters.getNameClient, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    delay: '', max: '', timetolive: '', delaymax: '', delaymin:''
                })
            } else if (this.activenode[0] == constant.Server_str) {
                this.$store.commit('addElementServer', { 
                    name: this.$store.getters.getNameServer, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    delaymax: '', delaymin: '',
                })
            } else if (this.activenode[0] == constant.SomeIPClient_str) {
                this.$store.commit('addElementSomeIPClient', { 
                    name: this.$store.getters.getNameSomeIPClient, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    findtime: '', inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: '',
                })
            } else if (this.activenode[0] == constant.SomeIPServer_str) {
                this.$store.commit('addElementSomeIPServer', { 
                    name: this.$store.getters.getNameSomeIPServer, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: '', delaymax: '', delaymin: '',
                    offer: '', tiemtolive: '',
                })
            } else if (this.activenode[0] == constant.SomeIPToMachineMapping_str) {
                this.$store.commit('addElementSomeIPtoMachine', { //ccref, siref  는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameSomeIPtoMachine, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    ccref: null, serviceI: [], tcp:'', udp: '',
                })
            } else if (this.activenode[0] == constant.ToPortPrototypeMapping_str) {
                this.$store.commit('addElementToPortPrototype', { 
                    name: this.$store.getters.getNameToPortPrototype, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    selectPort:null, porttype: null, context: null, process:null, selectServiceIns: null, serviceIns: null,
                })
            } else if (this.activenode[0] == constant.RequiredSomeIP_str) {
                this.$store.commit('addElementRequiredSomeIP', {  //deployref, clientref,ver는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameRequiredSomeIP, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    deployref: null, minover: '', id: '', clientref: null, ver: null, method: [], requiredevent: [], E2EEvent: [], E2EMethod: []
                })
            } else if (this.activenode[0] == constant.ProvidedSomeIP_str) {
                this.$store.commit('addElementProvidedSomeIP', {
                    name: this.$store.getters.getNameProvidedSomeIP, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    deployref: null, someipserver: null, id: '', loadPriority: '', loadWeight: '', eventP: [], method: [], eventG: [], E2EEvent: [], E2EMethod: []
                })
            } else if (this.activenode[0] == constant.E2EProfileConfig_str) {
                this.$store.commit('addElementE2EProfileConfig', {
                    name: this.$store.getters.getNameE2EProfileConfig, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    profile: []
                })
            } else if (this.activenode[0] == constant.SDG_DEF_str) {
                this.$store.commit('addElementSDG_DEF', {
                    name: this.$store.getters.getNameSDG_DEF, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    sdgClass: []
                })
            } else if (this.activenode[0] == constant.Error_str) {
                this.$store.commit('addElementError', { //errorDref 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameError, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    desc: '', errorcode: '', errorDref: null
                })
            } else if (this.activenode[0] == constant.Errorset_str) {
                this.$store.commit('addElementErrorSet', {
                    name: this.$store.getters.getNameErrorSet, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    errorref: [],
                })
            } else if (this.activenode[0] == constant.ErrorDomain_str) {
                this.$store.commit('addElementErrorDomain', {
                    name: this.$store.getters.getNameErrorDomain, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    namespace: '', value: '',
                })
            } else if (this.activenode[0] == constant.FileArray_str) {
                this.$store.commit('addElementPERFileArray', {
                    name: this.$store.getters.getNamePERFileArray, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    sdgs: [], maxSize: '', miniSize: '', updateS: null, uri: '', files: [],
                })
            } else if (this.activenode[0] == constant.FileProxyInterf_str) {
                this.$store.commit('addElementPERFileProxy', {
                    name: this.$store.getters.getNamePERFileProxy, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category: '', minisize: '', redundancy: null, updateS: null, encoding: '', proxy: [], maxfiles: ''
                })
            } else if (this.activenode[0] == constant.KeyValueData_str) {
                this.$store.commit('addElementPERKeyValueD', {
                    name: this.$store.getters.getNamePERKeyValueD, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    sdgs: [], maxSize: '', miniSize: '', updateS: null, uri: '', redundancy: [], keyValue: []
                })
            } else if (this.activenode[0] == constant.KeyValueDI_str) {
                this.$store.commit('addElementPERKeyValueDI', {
                    name: this.$store.getters.getNamePERKeyValueDI, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    minisize: '', redundancy: null, updateS: null, data: [], serialization: []
                })
            } else if (this.activenode[0] == constant.PortProtoFileA_str) {
                this.$store.commit('addElementPERPPtoFileArray', {
                    name: this.$store.getters.getNamePERPPtoFileArray, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    fileArray: null, port: null, process: null
                })
            } else if (this.activenode[0] == constant.PortProtoKeyV_str) {
                this.$store.commit('addElementPERPPtoKeyValue', {
                    name: this.$store.getters.getNamePERPPtoKeyValue, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    keyValue: null, port: null, process: null
                })
            } else if (this.activenode[0] == constant.PlatformHealthManagC_str) {
                this.$store.commit('addElementPHMContribution', {
                    name: this.$store.getters.getNamePHMContribution, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                })
            } else if (this.activenode[0] == constant.ContritoMachine_str) {
                this.$store.commit('addElementPHMtoMachine', {
                    name: this.$store.getters.getNamePHMtoMachine, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    machine: null, contri: []
                })
            } else if (this.activenode[0] == constant.HealthChannel_str) {
                this.$store.commit('addElementPHMHealth', {
                    name: this.$store.getters.getNamePHMHealth, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    status: []
                })
            } else if (this.activenode[0] == constant.RecoveryVA_str) {
                this.$store.commit('addElementPHMRecovery', {
                    name: this.$store.getters.getNamePHMRecovery, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    reconame: '', faf: null
                })
            } else if (this.activenode[0] == constant.PHMSupervised_str) {
                this.$store.commit('addElementPHMSupervised', {
                    name: this.$store.getters.getNamePHMSupervised, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    checkpoint: []
                })
            } else if (this.activenode[0] == constant.RecoveryActionInterf_str) {
                this.$store.commit('addElementRecoveryVia', {
                    name: this.$store.getters.getNameRecoveryVia, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    process: null, swcomponent: null, port: null, phmRecovery: null
                })
            } else if (this.activenode[0] == constant.ComMethodGDesign_str) {
                this.$store.commit('addElementMethodGD', {
                    name: this.$store.getters.getNameMethodGD, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    processD: null, SIMethod: null,
                })
            } else if (this.activenode[0] == constant.ComEventGDesign_str) {
                this.$store.commit('addElementEventGD', {
                    name: this.$store.getters.getNameEventGD, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    processD: null, SIEvent: null,
                })
            } else if (this.activenode[0] == constant.ComFieldGDesign_str) {
                this.$store.commit('addElementFieldGD', {
                    name: this.$store.getters.getNameFieldGD, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    processD: null, SIField: null, role: null
                })
            } else if (this.activenode[0] == constant.ComMethodGrant_str) {
                this.$store.commit('addElementMethodG', {
                    name: this.$store.getters.getNameMethodG, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    methodD: null, provide: null,
                })
            } else if (this.activenode[0] == constant.ComEventGrant_str) {
                this.$store.commit('addElementEventG', {
                    name: this.$store.getters.getNameEventG, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    eventD: null, provide: null,
                })
            } else if (this.activenode[0] == constant.ComFieldGrant_str) {
                this.$store.commit('addElementFieldG', {
                    name: this.$store.getters.getNameFieldG, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    fieldD: null, provide: null, role: null
                })
            } else if (this.activenode[0] == constant.SWCluster_str) {
                this.$store.commit('addElementSoftWareCluster', {
                    name: this.$store.getters.getNameSoftWareCluster, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category: '', idVendor: '', version: '', sdgs: [], executable: [], machineD: [], toMachine: [], process: [], sswc: [],
                })
            } else if (this.activenode[0] == constant.SWPackage_str) {
                this.$store.commit('addElementSoftWarePackage', {
                    name: this.$store.getters.getNameSoftWarePackage, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    action: null, activation: null, compSWPsize: '', deltaPakage: null, maximunVer: '', minimunVer: '',
                    id: '', postReboot: null, preReboot: null, swcluster: null, uncompSWCsize: ''
                })
            } else if (this.activenode[0] == constant.VehiclePackage_str) {
                this.$store.commit('addElementVehiclePackage', {
                    name: this.$store.getters.getNameVehiclePackage, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    reposi: '', sdgs: [], driver: [], rollout: [], ucms: [],
                })
            }

            if(!this.openIds.some(item => item === this.activenode[0])){
                this.openIds.push(this.activenode[0])
            }
        },
        newGroupElement() {
            if (this.activenode[0] == constant.AdaptiveApplication_str) {
                if(!this.openIds.some(item => item === constant.AdaptiveApplication_str)){
                    this.openIds.push(constant.AdaptiveApplication_str)
                }
                this.$store.commit('addElementProtoMachineMapping', { 
                    name: this.$store.getters.getNameProcesstoMachineMapping, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, icon:"mdi-clipboard-outline", validation: false, mapping: [],
                })
                if(!this.openIds.some(item => item === constant.ProcesstoMachineMapping_str)){
                    this.openIds.push(constant.ProcesstoMachineMapping_str)
                }
                this.$store.commit('addElementSWComponents', {
                    name: this.$store.getters.getNameSWComponents, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    pport: [], rport: [], prport: [],
                })
                if(!this.openIds.some(item => item === constant.SWComponents_str)){
                    this.openIds.push(constant.SWComponents_str)
                }
                this.$store.commit('addElementProcess', { 
                    name: this.$store.getters.getNameProcess, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    logLevel: null, logPath: '', logProDesc: '', logProID: '', restart: '', preMapping: null, logMode: [],
                    prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: []
                })
                if(!this.openIds.some(item => item === constant.Process_str)){
                    this.openIds.push(constant.Process_str)
                }
                this.$store.commit('addElementProcessDesign', {
                    name: this.$store.getters.getNameProcessDesign, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10,icon:"mdi-clipboard-outline", validation: false,
                    executableref: null, determin: [],
                })
                if(!this.openIds.some(item => item === constant.ProcessDesign_str)){
                    this.openIds.push(constant.ProcessDesign_str)
                }
                this.$store.commit('addElementExecutable', { 
                    name: this.$store.getters.getNameExecutable, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() *3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    version: '', category:'', buildType:null, loggingBehabior:null, reportingBehabior:null, swname:'', applicationtyperef: null,
                })
                if(!this.openIds.some(item => item === constant.Executable_str)){
                    this.openIds.push(constant.Executable_str)
                }
                this.$store.commit('addElementStartupConfig', {
                    name: this.$store.getters.getNameStartupConfig, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    config: []
                })
                if(!this.openIds.some(item => item === constant.StartupConfig_str)){
                    this.openIds.push(constant.StartupConfig_str)
                }
                this.$store.commit('addElementDeterministicClien', {
                    name: this.$store.getters.getNameDeterministicClient, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    cycletiem: '', numofworkers: '',
                })
                if(!this.openIds.some(item => item === constant.DeterministicClient_str)){
                    this.openIds.push(constant.DeterministicClient_str)
                }
            } else if (this.activenode[0] == constant.Machines_str) {
                if(!this.openIds.some(item => item === constant.Machines_str)){
                    this.openIds.push(constant.Machines_str)
                }
                this.$store.commit('addElementMachine', {
                    name: this.$store.getters.getNameMachine, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, machinedesign:null, timeout:'', hwelement:[], executable:null, admin: '',
                    functiongroup:[], processor: [], moduleinstant: [], icon:"mdi-clipboard-outline", validation: false
                })
                if(!this.openIds.some(item => item === constant.Machine_str)){
                    this.openIds.push(constant.Machine_str)
                }
                this.$store.commit('addElementMachineDesign', {
                    name: this.$store.getters.getNameMachineDesign, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, access: null, resettimer:'', connector:[], servicediscover:[], icon:"mdi-clipboard-outline", validation: false
                })
                if(!this.openIds.some(item => item === constant.MachineDesigne_str)){
                    this.openIds.push(constant.MachineDesigne_str)
                }
                this.$store.commit('addElementModeDeclarationGroup', {
                    name: this.$store.getters.getNameModeDeclarationGroup, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, modedeclaration:[], initmode:null, icon:"mdi-clipboard-outline", validation: false
                })
                if(!this.openIds.some(item => item === constant.ModeDeclarationGroup_str)){
                    this.openIds.push(constant.ModeDeclarationGroup_str)
                }
                this.$store.commit('addElementHWElement', {
                    name: this.$store.getters.getNameHWElement,  input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, category:null, attribute:[], icon:"mdi-clipboard-outline", validation: false
                })
                if(!this.openIds.some(item => item === constant.HWElement_str)){
                    this.openIds.push(constant.HWElement_str)
                }
                this.$store.commit('addElementHWCategory', {
                    name: this.$store.getters.getNameHWCategory,  input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, icon:"mdi-clipboard-outline", validation: false, attribute: []
                })
                if(!this.openIds.some(item => item === constant.HWCategory_str)){
                    this.openIds.push(constant.HWCategory_str)
                }
                this.$store.commit('addElementEthernetCluster', {
                    name: this.$store.getters.getNameEthernetCluster, input: false, path: '',
                    top: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), left: Array.from({length:4}, () => Math.floor(Math.random() * 3000)), 
                    zindex: 10, conditional:[], icon:"mdi-clipboard-outline", validation: false
                })
                if(!this.openIds.some(item => item === constant.EthernetCluster_str)){
                    this.openIds.push(constant.EthernetCluster_str)
                }
            }
        },
        openElement() {
            if(!this.openIds.some(item => item === this.activenode[0])){
                this.openIds.push(this.activenode[0])
            }
        },
        closeElement() {
            this.openIds.forEach((ele,i) => {
                if( ele == this.activenode[0]) {
                    this.openIds.splice(i,1)
                }
            })
        },
        activeElement() {
            var treeitem
            var arrelement
            //console.log('00 '+ this.$store.state.activeUUID)
            if(this.activenode[0] != this.$store.state.activeUUID) {
                if(this.$store.state.activeUUID != null) {
                    treeitem = Object.values(this.$store.getters.gettreeviewitems)
                    arrelement = treeitem.find(data =>  data.uuid === this.$store.state.activeUUID)
                    //console.log(arrelement)
                    if (this.activenode[0] != undefined && this.activenode[0].indexOf('-') !== -1) {
                        var actelement = treeitem.find(data =>  data.uuid === this.activenode[0])
                        this.$store.commit('setzIndex', {parent:arrelement.parent, uuid: this.$store.state.activeUUID, zindex: 2} )
                        EventBus.$emit('setLineActive', this.$store.state.activeUUID, false)
                        this.$store.commit('setzIndex', {parent:actelement.parent, uuid: this.activenode[0], zindex: 10} )
                        EventBus.$emit('setLineActive', this.activenode[0], true)
                        this.$store.commit('setuuid', {uuid: this.activenode[0]} )

                        if(actelement.validation) { 
                            //console.log('111111'+this.activenode[0])
                            this.$store.commit('setValidation', {parent:actelement.parent, uuid:this.activenode[0]})
                        }

                    } else {
                        EventBus.$emit('setLineActive', this.$store.state.activeUUID, false)
                        this.$store.commit('setzIndex', {parent:arrelement.parent, uuid: this.$store.state.activeUUID, zindex: 2} )
                        this.$store.commit('setuuid', {uuid: null} )
                    }
                } else if (this.activenode[0] != undefined){
                    //console.log('=====    '+ this.activenode[0])
                    if (this.activenode[0].indexOf('-') !== -1) {
                        treeitem = Object.values(this.$store.getters.gettreeviewitems)
                        arrelement = treeitem.find(data =>  data.uuid === this.activenode[0])
                        //console.log(arrelement)
                        this.$store.commit('setzIndex', {parent:arrelement.parent, uuid: this.activenode[0], zindex: 10} )
                        this.$store.commit('setuuid', {uuid: this.activenode[0]} )
                        EventBus.$emit('setLineActive', this.activenode[0], true)

                        if(arrelement.validation) { 
                            this.$store.commit('setValidation', {parent:arrelement.parent, uuid:this.activenode[0]})
                        }
                    }
                } 
            }
        },
        deleteElement () {
            this.dialogDeleteProject = true
            this.strDelete = "Element를 삭제하시겠습니까?"
        },
        renameElement() {
            //console.log('renameElement')
            if (this.rename.id == 0) {
                this.rename.id = this.activenode[0]
            }
            this.showMenu = false
            var treeitem = Object.values(this.$store.getters.gettreeviewitems)
            var arrelement = treeitem.find(data =>  data.uuid === this.rename.id)
            this.rename.name = arrelement.name
            this.rename.parent = arrelement.parent
        },
        setRename() {
            //console.log('setRename')
            this.$store.commit('renameElement', {uuid: this.rename.id, parent: this.rename.parent, name: this.rename.name})
            this.cancelRename()
        },
        cancelRename() {
            this.rename = { id: 0, name: null, parent: null}
        },
        saveElement () {
            EventBus.$emit('shortcut-keys', 'save')
        },
        openAll() {
            this.$store.state.navigatorList[this.$store.state.openProjectIndex].children.forEach( fir => {
                if(!this.openIds.some(item => item === fir.name)){
                        this.openIds.push(fir.name)
                }
                fir.children.forEach(sec => {
                    if(sec.children.length > 0) {
                        if(!this.openIds.some(item => item === sec.name)){
                            this.openIds.push(sec.name)
                        }
                    }
                    if(fir.name == constant.Service_str) {
                        sec.children.forEach(thr => {
                            if(thr.children.length > 0) {
                                if(!this.openIds.some(item => item === thr.name)){
                                    this.openIds.push(thr.name)
                                }
                            }
                        })
                    }
                    if(fir.name == constant.Platform_str) {
                        sec.children.forEach(thr => {
                            if(thr.children.length > 0) {
                                if(!this.openIds.some(item => item === thr.name)){
                                    this.openIds.push(thr.name)
                                }
                            }
                        })
                    }
                })
            })
        },
        closeAll() {
            this.openIds = []
        },
        deleteProject() {
            this.dialogDeleteProject = true
            this.strDelete = "Project를 삭제하시겠습니까?"
        },
        okDelete() {
            if(this.ismenu == 0) { //project
                this.$store.commit( 'deleteProject')
            } else if (this.ismenu == 2) {
                var treeitem = Object.values(this.$store.getters.gettreeviewitems)
                var arrelement = treeitem.find(data =>  data.uuid === this.activenode[0])
                this.$store.commit('deleteRefElement', {uuid:this.activenode[0]} ) // 내가 화살표의 끝인가?
                this.$store.commit('deleteElementLine', {uuid:this.activenode[0]} ) // 내가 화살표의 시작인가?
                this.$store.commit('deleteElement', {parent:arrelement.parent, uuid:this.activenode[0]} )
            }
            this.dialogDeleteProject = false
        },
        copyElement() {
            var treeitem = Object.values(this.$store.getters.gettreeviewitems)
            var arrelement = treeitem.find(data =>  data.uuid === this.$store.state.activeUUID)
            this.$store.commit('copyElement', {parent:arrelement.parent, uuid: this.$store.state.activeUUID} )
        },
    },
})
</script>
