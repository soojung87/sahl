<template>
    <div>
        <v-icon class="subtitle-1 green" style="margin:0 5px 0 15px;" dark >mdi-view-dashboard</v-icon>
                    SAHL
        <v-divider></v-divider>
        <v-list dense>
            <v-list-group v-for="(item,idx) in navigatorList" :key="idx"
                    prepend-icon="mdi-alpha-p-circle-outline" no-action sub-group> <!--  sub-group 빼면 리스트가 하나씩만 보인다-->
                <template v-slot:activator>
                    <v-list-item-icon v-if="item.validation">
                        <v-icon color="red" dark>mdi-exclamation</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.name" style="fontsize:20px" @contextmenu="show($event, true)"></v-list-item-title>
                    </v-list-item-content>
                </template> 
                <v-card flat @contextmenu="show($event,false)">
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
            <v-list v-if="isProjectmenu" dense class = "text-start">
                <v-list-item  v-for="(item, index) in menuProjectitems" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else dense class = "text-start">
                <v-list-item  v-for="(item, index) in menuitems" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
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
    },
    watch:{
        // activenode() {
        //     if(this.activenode[0] == null) {
        //         this.$store.commit('setuuid', { uuid: null} )
        //     }
        // },
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
    },
    data() {
        return {
            showMenu: false,
            x: 0,
            y: 0,
            isProjectmenu: false,
            activenode: [],
            openIds: [],
            menuitems: [
                { title: 'New',    menuAction: action => { this.newElement(action) } },
                //{ title: 'Open',   menuAction: action => { this.newOpen(action) } },
                //{ title: 'Rename', menuAction: action => { this.newOption(action) } },
                { title: 'Delete', menuAction: action => { this.deleteElement(action) } },
                //{ title: 'Import', menuAction: action => { this.newOption(action) } },
                //{ title: 'Cut',    menuAction: action => { this.newOption(action) } },
                //{ title: 'Copy',   menuAction: action => { this.newOption(action) } },
                //{ title: 'Paste',  menuAction: action => { this.newOption(action) } },
                //{ title: 'Save',   menuAction: action => { this.saveElement(action) } },
            ],
            menuProjectitems: [
                { title: 'New Project',    menuAction: action => { this.newOption(action) } },
                { title: 'Open Project',   menuAction: action => { this.newOption(action) } },
                { title: 'Rename Project', menuAction: action => { this.newOption(action) } },
                { title: 'Delete Project',  menuAction: action => { this.newOption(action) } },
                { title: 'Import Project',  menuAction: action => { this.newOption(action) } },
                { title: 'Cut',             menuAction: action => { this.newOption(action) } },
                { title: 'Copy',            menuAction: action => { this.newOption(action) } },
                { title: 'Paste',           menuAction: action => { this.newOption(action) } },
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
    },

    methods: {
        show (e, isprojectmenu) {
            e.preventDefault()
            if (this.activenode[0] != null) {
                

                this.isProjectmenu = isprojectmenu
                this.showMenu = false
                this.x = e.clientX
                this.y = e.clientY
                this.$nextTick(() => {
                    this.showMenu = true
                })
            }
        },
        newOption () {
            //alert('this.selectItem[0]')
        },
        openNode() {
            //alert(this.openIds)
        },
        newElement () {
            var elementX = Math.floor(Math.random() * (1400 - 11)) + 10 // (max - min) + min
            var elementY = Math.floor(Math.random() * (200 - 6)) + 5

            if (this.activenode[0] == constant.CompuMethod_str) {
                this.$store.commit('addElementCompuMehtod', {
                    name: this.$store.getters.getNameCompuMethod, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, category:'', scales:null, icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.DataConstr_str) {
                this.$store.commit('addElementDataConstr', {
                    name: this.$store.getters.getNameDataConstr, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, lowerlimit:'', upperlimit:'', icon:"mdi-clipboard-outline", validation: false
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
                    typeref: null, templatetype:null, desc:'', ddpc:null, idtelement:null,
                })
            }
            else if (this.activenode[0] == constant.Machine_str) {
                this.$store.commit('addElementMachine', {
                    name: this.$store.getters.getNameMachine, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, machinedesign:null, timeout:'', hwelement:null, executable:null, admin: '',
                    functiongroup:null, processor: null, moduleinstant: null, icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.MachineDesigne_str) {
                this.$store.commit('addElementMachineDesign', {
                    name: this.$store.getters.getNameMachineDesign, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, access: null, resettimer:'', connector:null, servicediscover:null, icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.ModeDeclarationGroup_str) {
                this.$store.commit('addElementModeDeclarationGroup', {
                    name: this.$store.getters.getNameModeDeclarationGroup, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, modedeclaration:null, initmode:null, icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.HWElement_str) {
                this.$store.commit('addElementHWElement', { //category 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameHWElement,  input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, category:null, attribute:null, icon:"mdi-clipboard-outline", validation: false
                })
            } else if (this.activenode[0] == constant.EthernetCluster_str) {
                this.$store.commit('addElementEthernetCluster', {
                    name: this.$store.getters.getNameEthernetCluster, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, conditional:null, icon:"mdi-clipboard-outline", validation: false
                })
            } 
            else if (this.activenode[0] == constant.ProcesstoMachineMapping_str) {
                this.$store.commit('addElementProtoMachineMapping', { //ptmmMachine, ptmmProcess  는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameProcesstoMachineMapping, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    ptmmname: '',  ptmmMachine: null, ptmmProcess: null,
                })
            } else if (this.activenode[0] == constant.SWComponents_str) {
                this.$store.commit('addElementSWComponents', {
                    name: this.$store.getters.getNamSWComponents, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    pport: null, rport: null, prport: null,
                })
            } else if (this.activenode[0] == constant.Process_str) {
                this.$store.commit('addElementProcess', { //prodesign, determin, execut, machinetype  는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameProcess, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: null
                })
            } else if (this.activenode[0] == constant.ProcessDesign_str) {
                this.$store.commit('addElementProcessDesign', { //executableref 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameProcessDesign, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10,icon:"mdi-clipboard-outline", validation: false,
                    executableref: null, determin: null,
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
                    configname: '', policy:null, priority:'', entertimeout:'', exittimeout:''
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
                    service: null, majversion:'', minversion:'', id: '', eventG:null, eventD: null, methodD:null, fieldD:null,
                })
            } else if (this.activenode[0] == constant.ServiceInterface_str) {
                this.$store.commit('addElementService', {
                    name: this.$store.getters.getNameServiceInterface, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    versionMaj:'', versionMin:'', namespace:'', events:null, fields:null, methods:null, isservice: '',
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
                    ccref: null, siref: null, tcp:'', udp: '',
                })
            } else if (this.activenode[0] == constant.ToPortPrototypeMapping_str) {
                this.$store.commit('addElementToPortPrototype', { 
                    name: this.$store.getters.getNameToPortPrototype, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    selectPort:null, porttype: null, process:null, selectServiceIns: null, serviceIns: null,
                })
            } else if (this.activenode[0] == constant.RequiredSomeIP_str) {
                this.$store.commit('addElementRequiredSomeIP', {  //deployref, clientref,ver는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameRequiredSomeIP, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    deployref: null, minover: '', id: '', clientref: null, ver: null, method: null, requiredevent: null,
                })
            } else if (this.activenode[0] == constant.ProvidedSomeIP_str) {
                this.$store.commit('addElementProvidedSomeIP', {
                    name: this.$store.getters.getNameProvidedSomeIP, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    deployref: null, someipserver: null, id: '', eventP: null, method: null, eventG: null,
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
                    errorref: null,
                })
            } else if (this.activenode[0] == constant.ErrorDomain_str) {
                this.$store.commit('addElementErrorDomain', {
                    name: this.$store.getters.getNameErrorDomain, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    namespace: '', value: '',
                })
            }

            if(!this.openIds.some(item => item === this.activenode[0])){
                this.openIds.push(this.activenode[0])
            }
        },
        activeElement() {
            //console.log('activeElement '+ this.activenode[0]+',,,'+this.$store.state.activeUUID)
            var treeitem
            var arrelement
            //console.log('00'+ this.$store.state.activeUUID)
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
                            console.log('111111'+this.activenode[0])
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
            var treeitem = Object.values(this.$store.getters.gettreeviewitems)
            var arrelement = treeitem.find(data =>  data.uuid === this.activenode[0])
            this.$store.commit('deleteRefElement', {uuid:this.activenode[0]} ) // 내가 화살표의 끝인가?
            this.$store.commit('deleteElementLine', {uuid:this.activenode[0]} ) // 내가 화살표의 시작인가?
            this.$store.commit('deleteElement', {parent:arrelement.parent, uuid:this.activenode[0]} )
        },
        saveElement () {
            var treeitem = Object.values(this.$store.getters.gettreeviewitems)
            var arrelement = treeitem.find(data =>  data.uuid === this.activenode[0])
            this.$store.commit('saveElement', {parent:arrelement.parent, uuid:this.activenode[0]} )
        },
    },
})
</script>
