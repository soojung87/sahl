<template>
    <div v-bind:style="{ transform: 'scale(' + zoom + ')'}" class="zoom-width" > 
        <v-card flat >
            <v-toolbar dense flat color="#FFFAF0">
                <v-btn small icon @click="hideDetailViewer">
                    <v-icon>mdi-chevron-double-right</v-icon>
                </v-btn>
                <v-toolbar-title>Detail Viewer</v-toolbar-title>
                <v-btn small icon @click="backViewer()" :disabled="!isbackpossible">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-btn small icon @click="frontViewer()" :disabled="!isfrontpossible">
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
                <v-btn small icon @click="deleteDetailViewerList()" :disabled="detailViewerList.length > 0 ? false : true">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-toolbar>
            <div v-if="detailViewer.element == 'Compu Method'">
                <CompuMethod :element= this.$store.getters.getDataCompuMethod(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Data Constr'">
                <DataConstr :element= this.$store.getters.getDataDataConstr(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Application Array'">
                <ApplicationArrayDate :element='element' :isDatailView="true"/> 
            </div>
            <div v-else-if="detailViewer.element == 'Implementation'">
                <ImplementationDataType :element= this.$store.getters.getDataImplementation(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>

            <div v-else-if="detailViewer.element == 'SW Components'">
                <SWComponents :element= this.$store.getters.getDataSWComponent(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Process Design'">
                <ProcessDesign :element= this.$store.getters.getDataProcessDesign(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Executable'">
                <Executable :element= this.$store.getters.getDataExecutable(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Startup Config Set'">
                <StartupConfig :element= this.$store.getters.getDataStartupConfig(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Deterministic Client'">
                <DeterministicClient :element= this.$store.getters.getDataDeterministicClient(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>

            <div v-else-if="detailViewer.element == 'Machine'">
                <Machine :element= this.$store.getters.getDataMachine(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Machine Designs'">
                <MachineDesign :element= this.$store.getters.getDataMachineDesign(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Ethernet Cluster'">
                <EthernetCluster :element= this.$store.getters.getDataEthernetCluster(detailViewer.uuid) :isDatailView="true" :viewInfo="ethernetClusterInfo" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Mode Declaration Group'">
                <ModeDeclarationGroup :element= this.$store.getters.getDataModeDeclaration(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'HW Element'">
                <HWElement :element= this.$store.getters.getDataHWElement(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>

            <div v-else-if="detailViewer.element == 'Error'">
                <APError :element= this.$store.getters.getDataError(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Error Domain'">
                <APErrorDomain :element= this.$store.getters.getDataErrorDomain(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Error Set'">
                <APErrorSet :element= this.$store.getters.getDataErrorSet(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'SomeIP Service Interface Deployment'">
                <SomeIPService :element= this.$store.getters.getDataSomeIPService(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Service Interface'">
                <ServiceInterface :element= this.$store.getters.getDataServiceInterface(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Client'">
                <Client :element= this.$store.getters.getDataClient(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Server'">
                <Server :element= this.$store.getters.getDataServer(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'SomeIP Client'">
                <SomeIPClient :element= this.$store.getters.getDataSomeIPClient(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'SomeIP Server'">
                <SomeIPServer :element= this.$store.getters.getDataSomeIPServer(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'SomeIP To Machine Mapping'">
                <SomeIPtoMachine :element= this.$store.getters.getDataSomeIPToMachine(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Required SomeIP'">
                <Required :element= this.$store.getters.getDataRequiredSomeIP(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Provided SomeIP'">
                <Provided :element= this.$store.getters.getDataProvidedSomeIP(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>

            <div v-else-if="detailViewer.element == 'File Array'">
                <PerFileArray :element= this.$store.getters.getDataPERFileArray(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'File Proxy Interface'">
                <PerFileProxy :element= this.$store.getters.getDataPERFileProxy(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'KeyV Database'">
                <PerKeyValueDB :element= this.$store.getters.getDataPERKeyValueD(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'KeyV Database Interface'">
                <PerKeyValueDI :element= this.$store.getters.getDataPERKeyValueDI(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Platform Health Management Contribution'">
                <PHMContribution :element= this.$store.getters.getDataPHMContribution(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Health Channel Interface'">
                <PHMHealthChannel :element= this.$store.getters.getDataPHMHealth(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Recovery Action Interface'">
                <PHMRecovery :element= this.$store.getters.getDataPHMRecovery(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Supervised Enity Interface'">
                <PHMSupervised :element= this.$store.getters.getDataPHMSupervised(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Com MEthod Grant Design'">
                <MethodGrantD :element= this.$store.getters.getDataMethodGrantDesign(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Com Event Grant Design'">
                <EventGrantD :element= this.$store.getters.getDataEventGrantDesign(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'Com Field Grant Design'">
                <FieldGrantD :element= this.$store.getters.getDataFieldGrantDesign(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>
            <div v-else-if="detailViewer.element == 'UCM Module Instantiation'">
                <UCMModuleIns :element= this.$store.getters.getDataModuleInstant(detailViewer.uuid) :isDatailView="true" :minimaptoolbar='true'/> 
            </div>

        </v-card>
    </div>
</template>

<script>
//import constant from "../store/constants.js"
import { EventBus } from '../main'
import CompuMethod from './compumethod.vue'
import DataConstr from './dataconstr.vue'
import ApplicationArrayDate from './applicationArrayData.vue'
import ImplementationDataType from './implementationData.vue'
import SWComponents from '../components/SWComponents.vue'
import ProcessDesign from '../components/ProcessDesign.vue'
import Executable from '../components/Executable.vue'
import StartupConfig from '../components/StartupConfig.vue'
import DeterministicClient from '../components/DeterministicClient.vue'
import Machine from '../components/Machine.vue'
import MachineDesign from '../components/MachineDesign.vue'
import EthernetCluster from '../components/EthernetCluster.vue'
import ModeDeclarationGroup from '../components/ModeDeclarationGroup.vue'
import HWElement from '../components/HWElement.vue'
import APErrorDomain from '../components/APErrorDomain.vue'
import APError from '../components/APError.vue'
import APErrorSet from '../components/APErrorSet.vue'
import ServiceInterface from './serviceInterface.vue'
import SomeIPService from '../components/SomeIPService.vue'
import Client from '../components/ClientEventG.vue'
import Server from '../components/Server.vue'
import SomeIPClient from '../components/SomeIPClient.vue'
import SomeIPServer from '../components/SomeIPServer.vue'
import SomeIPtoMachine from '../components/SomeIPtoMachineMapping.vue'
import Required from '../components/RequiredSomeIP.vue'
import Provided from '../components/ProvidedSomeIP.vue'

import PerFileArray from './PerFileArray.vue'
import PerFileProxy from './PerFileProxy.vue'
import PerKeyValueDB from '../components/PerKeyValueDB.vue'
import PerKeyValueDI from '../components/PerKeyValueDI.vue'
import PHMContribution from '../components/PHMContribution.vue'
import PHMHealthChannel from '../components/PHMHealthChannel.vue'
import PHMRecovery from '../components/PHMRecoveryAction.vue'
import PHMSupervised from '../components/PHMSupervised.vue'
import MethodGrantD from '../components/MethodGrantDesign.vue'
import EventGrantD from '../components/EventGrantDesign.vue'
import FieldGrantD from '../components/FieldGrantDesign.vue'
import UCMModuleIns from '../components/UCMModuleIns.vue'

//SWCluster_str

export default {
    components:{CompuMethod, DataConstr, ApplicationArrayDate, ImplementationDataType,
                SomeIPService, ServiceInterface, Client, Server,
                SomeIPClient, SomeIPServer, SomeIPtoMachine, Required, Provided,
                APError, APErrorDomain, APErrorSet,
                SWComponents, ProcessDesign, Executable, StartupConfig, DeterministicClient,
                Machine, MachineDesign, EthernetCluster, ModeDeclarationGroup, HWElement,
                PerFileArray, PerFileProxy, PerKeyValueDB, PerKeyValueDI,
                PHMContribution, PHMHealthChannel, PHMRecovery, PHMSupervised,
                MethodGrantD, EventGrantD, FieldGrantD, UCMModuleIns },
    computed: {
        detailViewer() {
            return this.$store.state.detailViewer
        },
        idexDetailView() {
            return this.$store.state.idexDetailView
        },
        setting() {
            return this.$store.state.setting
        },
        detailViewerList() {
            return this.$store.state.detailViewerList
        }
    },
    watch: {
        idexDetailView(val) {
            if (val <= this.$store.state.detailViewerList.length-1 && val >= 0) {
                this.isbackpossible = true
                this.isfrontpossible = true
            }
            if (val == 0) {
                this.isbackpossible = false
            }
            if (val == (this.$store.state.detailViewerList.length-1 )) {
                this.isfrontpossible = false
            }
        },
        setting(value) {
            //console.log('///'+value.zoomDetail)
            this.zoom = value.zoomDetail
        }
    },
    data() {
        return {
            isbackpossible: false,
            isfrontpossible: false,
            zoom: this.$store.state.setting.zoomDetail,
            ethernetClusterInfo: {  isChannel: false, isEndpoint: false, 
                                    idxConditional: null, idxChannel: null,  idxEndpoint: null,} ,
            }
    },
    mounted () {
        EventBus.$on('detailViewInfo',(info) => {
            this.ethernetClusterInfo.isChannel = info.isChannel
            this.ethernetClusterInfo.isEndpoint = info.isEndpoint
            this.ethernetClusterInfo.idxConditional = info.idxConditional
            this.ethernetClusterInfo.idxChannel = info.idxChannel
            this.ethernetClusterInfo.idxEndpoint = info.idxEndpoint
        })
    },
    methods: {
        hideDetailViewer() {
            //console.log('hideDetailViewer')
            this.$store.commit('setOpenCloseDetailView', {isopen: false} )
        },
        backViewer() {
            if (this.$store.state.idexDetailView == 0) {
                this.isbackpossible = false
                return
            }
            this.$store.commit('setBackDetailView')
        },
        frontViewer() {
            if (this.$store.state.idexDetailView == (this.$store.state.detailViewerList.length-1)) {
                this.isfrontpossible = false
                return
            }
            this.$store.commit('setfrontDetailView')
        },
        deleteDetailViewerList() {
            this.$store.commit('deleteDetailViewerList')
            this.isbackpossible = false
            this.isfrontpossible = false
        },
    },
}
</script>
<style>
.zoom-width{
    transform-origin: 0 0; /* 이거 넣으니 확대했을때 title안나오던거 보임 */
    margin: 0 10px 0 0;
}
</style>