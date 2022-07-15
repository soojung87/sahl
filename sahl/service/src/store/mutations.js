import Vue from 'vue';
import Vuex from 'vuex';
import constant from "./constants.js"
import { uuid } from "vue-uuid";
import { EventBus } from "../main.js"
import { saveAs } from 'file-saver'; // eslint-disable-line no-unused-vars

Vue.use(Vuex);

const mutations = {
    saveOpenProject(state, payload) {
        state = payload
    },
    selectOpenProject(state, payload) {
        state.openProjectIndex = payload.openProjectIndex
    },
    setmakeProject(state, payload) {
        state.ismakeProject = payload.makeproject
    },
    addProject(state, payload) {
        var newUUid = uuid.v1()
        state.SAHLProject.push({
            uuid: newUUid,
            name: payload.name,
            DataTypes: { CompuMethod: [], DataConstr: [], ApplicationArrayDataType: [], ImplementationDataType: [] },
            Service: {
                SomeIPServiceInterfaceDeployment: [],
                ServiceInterface: [],
                SomeIPClientEvent: [],
                SomeIPServerEvent: [],
                Error: [],
                ErrorSet: [],
                ErrorDomain: [],
                SomeIPClientServiceInstance: [],
                SomeIPServerServiceInstance: [],
                SomeIPServiceInstanceToMachine: [],
                ServiceInstanceToPortPrototype: [],
                RequiredSomeIP: [],
                ProvidedSomeIP: []
            },
            Machine: { Machine: [], MachineDesign: [], EthernetCluster: [], ModeDeclarationGroup: [], HWElement: [] },
            AdaptiveApplication: { ProtoMachineMapping: [], SWComponents: [], Process: [], Executable: [], StartupConfig: [], DeterministicClient: [], ProcessDesign: [] },
            Per: { PERFileArray: [], PERFileProxy: [], PERKeyValueD: [], PERKeyValueDI: [], PERPPtoFileArray: [], PERPPtoKeyValue: [] },
            Phm: { PHMContribution: [], PHMtoMachine: [], PHMHealth: [], PHMRecovery: [], PHMSupervised: [], RecoveryVia: [] },
            IamG: { FieldG: [], EventG: [], MethodG: [], FieldGD: [], EventGD: [], MethodGD: [] },
            UCM: { SoftWareCluster: [], SoftWarePackage: [], VehiclePackage: [], ModuleInstant: [], }
        })
        state.navigatorList.push({
            uuid: newUUid,
            name: payload.name,
            validation: false,
            children: [{
                    uuid: constant.DateType_str,
                    name: constant.DateType_str,
                    icon: "mdi-folder",
                    validation: false,
                    children: [
                        { uuid: constant.CompuMethod_str, name: constant.CompuMethod_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.DataConstr_str, name: constant.DataConstr_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.ApplicationArray_str, name: constant.ApplicationArray_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.Implementation_str, name: constant.Implementation_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                    ]
                },
                {
                    uuid: constant.Service_str,
                    name: constant.Service_str,
                    icon: "mdi-folder",
                    validation: false,
                    children: [{
                            uuid: constant.ServiceInterfaces_str,
                            name: constant.ServiceInterfaces_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.SomeIPServiceInterfaceDeployment_str, name: constant.SomeIPServiceInterfaceDeployment_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ServiceInterface_str, name: constant.ServiceInterface_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] }
                            ]
                        },
                        {
                            uuid: constant.SomeIPEvents_str,
                            name: constant.SomeIPEvents_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.Client_str, name: constant.Client_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.Server_str, name: constant.Server_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },
                        {
                            uuid: constant.ServiceInstances_str,
                            name: constant.ServiceInstances_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.SomeIPClient_str, name: constant.SomeIPClient_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.SomeIPServer_str, name: constant.SomeIPServer_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.SomeIPToMachineMapping_str, name: constant.SomeIPToMachineMapping_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ToPortPrototypeMapping_str, name: constant.ToPortPrototypeMapping_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.RequiredSomeIP_str, name: constant.RequiredSomeIP_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ProvidedSomeIP_str, name: constant.ProvidedSomeIP_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },
                        {
                            uuid: constant.Errors_str,
                            name: constant.Errors_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.Error_str, name: constant.Error_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.Errorset_str, name: constant.Errorset_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ErrorDomain_str, name: constant.ErrorDomain_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },
                    ]
                },
                {
                    uuid: constant.AdaptiveApplication_str,
                    name: constant.AdaptiveApplication_str,
                    icon: "mdi-folder",
                    validation: false,
                    children: [
                        { uuid: constant.ProcesstoMachineMapping_str, name: constant.ProcesstoMachineMapping_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.SWComponents_str, name: constant.SWComponents_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.Process_str, name: constant.Process_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.ProcessDesign_str, name: constant.ProcessDesign_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.Executable_str, name: constant.Executable_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.StartupConfig_str, name: constant.StartupConfig_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.DeterministicClient_str, name: constant.DeterministicClient_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] }
                    ]
                },
                {
                    uuid: constant.Machines_str,
                    name: constant.Machines_str,
                    icon: "mdi-folder",
                    validation: false,
                    children: [
                        { uuid: constant.Machine_str, name: constant.Machine_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.MachineDesigne_str, name: constant.MachineDesigne_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.EthernetCluster_str, name: constant.EthernetCluster_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.ModeDeclarationGroup_str, name: constant.ModeDeclarationGroup_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                        { uuid: constant.HWElement_str, name: constant.HWElement_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                    ]
                },
                {
                    uuid: constant.Platform_str,
                    name: constant.Platform_str,
                    icon: "mdi-folder",
                    validation: false,
                    children: [{
                            uuid: constant.PER_str,
                            name: constant.PER_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.FileArray_str, name: constant.FileArray_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.FileProxyInterf_str, name: constant.FileProxyInterf_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.KeyValueData_str, name: constant.KeyValueData_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.KeyValueDI_str, name: constant.KeyValueDI_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.PortProtoFileA_str, name: constant.PortProtoFileA_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.PortProtoKeyV_str, name: constant.PortProtoKeyV_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },
                        {
                            uuid: constant.PHM_str,
                            name: constant.PHM_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.PlatformHealthManagC_str, name: constant.PlatformHealthManagC_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ContritoMachine_str, name: constant.ContritoMachine_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.HealthChannel_str, name: constant.HealthChannel_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.RecoveryVA_str, name: constant.RecoveryVA_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.PHMSupervised_str, name: constant.PHMSupervised_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.RecoveryActionInterf_str, name: constant.RecoveryActionInterf_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },
                        {
                            uuid: constant.NM_str,
                            name: constant.NM_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.NMInstantiation_str, name: constant.NMInstantiation_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.NMNetWorkHandle_str, name: constant.NMNetWorkHandle_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.UDPNMCluster_str, name: constant.UDPNMCluster_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.UDPNMNetworkC_str, name: constant.UDPNMNetworkC_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.UDPNMNode_str, name: constant.UDPNMNode_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.NMConfig_str, name: constant.NMConfig_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },
                        {
                            uuid: constant.Log_str,
                            name: constant.Log_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.LogandTrace_str, name: constant.LogandTrace_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.DLTlogChannel_str, name: constant.DLTlogChannel_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.DLTMessage_str, name: constant.DLTMessage_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.DLTLogChanneltoPro_str, name: constant.DLTLogChanneltoPro_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },
                        {
                            uuid: constant.IAM_str,
                            name: constant.IAM_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.ComFieldGrant_str, name: constant.ComFieldGrant_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ComEventGrant_str, name: constant.ComEventGrant_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ComMethodGrant_str, name: constant.ComMethodGrant_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ComFieldGDesign_str, name: constant.ComFieldGDesign_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ComEventGDesign_str, name: constant.ComEventGDesign_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ComMethodGDesign_str, name: constant.ComMethodGDesign_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },
                        {
                            uuid: constant.UCM_str,
                            name: constant.UCM_str,
                            icon: "mdi-folder",
                            validation: false,
                            children: [{ uuid: constant.SWCluster_str, name: constant.SWCluster_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.SWPackage_str, name: constant.SWPackage_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.VehiclePackage_str, name: constant.VehiclePackage_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                                { uuid: constant.ModuleInstantiation_str, name: constant.ModuleInstantiation_str, icon: 'mdi-alpha-e-circle-outline', validation: false, children: [] },
                            ]
                        },

                    ]
                }
            ]
        })
        state.connectionLine.push({ start: [], end: [] })
            //localStorage.setItem("SAHLProject", JSON.stringify(state.SAHLProject))
            //localStorage.setItem("navigatorList", JSON.stringify(state.navigatorList))
    },
    deleteProject(state) {
        state.ismakeProject = false
        state.openProjectIndex = 0
        state.SAHLProject = []
        state.navigatorList = []
        state.connectionLine = []
        state.detailViewerList = []
        state.detailViewer = { uuid: '', element: '' }
        state.activeUUID = null
        state.detailViewUUID = null
        state.idexDetailView = undefined
        state.strSavePath = []
        EventBus.$emit('delete-line', 'all')
            //localStorage.setItem("SAHLProject", JSON.stringify(state.SAHLProject))
            //localStorage.setItem("navigatorList", JSON.stringify(state.navigatorList))
    },
    setuuid(state, payload) {
        state.activeUUID = payload.uuid
    },
    copyElement(state, payload) {
        var idxEle = null,
            copyEle
        const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
        const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

        if (payload.parent == constant.CompuMethod_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxEle]))
            state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameCompuMethod
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.CompuMethod_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.DataConstr_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxEle]))
            state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameDataConstr
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.DataConstr_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ApplicationArray_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxEle]))
            state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameApplicationArray
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.ApplicationArray_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.Implementation_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxEle]))
            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameImplementation
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.Machine_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Machine.Machine[idxEle]))
            state.SAHLProject[state.openProjectIndex].Machine.Machine[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameMachine
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Machine.Machine.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.MachineDesigne_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxEle]))
            state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameMachineDesign
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.EthernetCluster_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxEle]))
            state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameEthernetCluster
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ModeDeclarationGroup_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxEle]))
            state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameModeDeclarationGroup
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.ModeDeclarationGroup_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.HWElement_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.HWElement.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxEle]))
            state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameHWElement
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Machine.HWElement.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.HWElement_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ProcesstoMachineMapping_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxEle]))
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameProcesstoMachineMapping
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcesstoMachineMapping_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.SWComponents_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxEle]))
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameSWComponents
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.Process_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxEle]))
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameProcess
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ProcessDesign_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxEle]))
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameProcessDesign
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcessDesign_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.Executable_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxEle]))
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameExecutable
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Executable_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.StartupConfig_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxEle]))
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameStartupConfig
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.StartupConfig_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.DeterministicClient_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxEle]))
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameDeterministicClient
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.DeterministicClient_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.SomeIPServiceInterfaceDeployment_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameSomeIPService
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ServiceInterface_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameServiceInterface
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.Client_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameClient
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.SomeIPEvents_index].children[constant.Client_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.Server_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameServer
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.SomeIPEvents_index].children[constant.Server_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.SomeIPClient_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameSomeIPClient
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPClient_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.SomeIPServer_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameSomeIPServer
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPServer_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.SomeIPToMachineMapping_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameSomeIPtoMachine
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ToPortPrototypeMapping_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameToPortPrototype
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.RequiredSomeIP_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameRequiredSomeIP
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ProvidedSomeIP_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameProvidedSomeIP
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.Error_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.Error[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.Error[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameError
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.Error.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Error_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.Errorset_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameErrorSet
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.ErrorSet.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Errorset_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ErrorDomain_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxEle]))
            state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameErrorDomain
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.ErrorDomain_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.FileArray_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxEle]))
            state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePERFileArray
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Per.PERFileArray.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileArray_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.FileProxyInterf_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[idxEle]))
            state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePERFileProxy
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileProxyInterf_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.KeyValueData_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxEle]))
            state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePERKeyValueD
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.KeyValueDI_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxEle]))
            state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePERKeyValueDI
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueDI_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.PortProtoFileA_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxEle]))
            state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePERPPtoFileArray
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.PortProtoKeyV_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxEle]))
            state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePERPPtoKeyValue
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.PlatformHealthManagC_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Phm.PHMContribution[idxEle]))
            state.SAHLProject[state.openProjectIndex].Phm.PHMContribution[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePHMContribution
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.PlatformHealthManagC_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ContritoMachine_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxEle]))
            state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePHMtoMachine
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.ContritoMachine_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.HealthChannel_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[idxEle]))
            state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePHMHealth
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.HealthChannel_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.RecoveryVA_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[idxEle]))
            state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePHMRecovery
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryVA_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.PHMSupervised_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[idxEle]))
            state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNamePHMSupervised
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.PHMSupervised_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.RecoveryActionInterf_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxEle]))
            state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameRecoveryVia
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ComFieldGrant_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxEle]))
            state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameFieldG
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].IamG.FieldG.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGrant_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ComEventGrant_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].IamG.EventG[idxEle]))
            state.SAHLProject[state.openProjectIndex].IamG.EventG[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameEventG
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].IamG.EventG.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGrant_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ComMethodGrant_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxEle]))
            state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameMethodG
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].IamG.MethodG.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGrant_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ComFieldGDesign_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxEle]))
            state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameFieldGD
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].IamG.FieldGD.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ComEventGDesign_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxEle]))
            state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameEventGD
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].IamG.EventGD.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ComMethodGDesign_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxEle]))
            state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameMethodGD
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].IamG.MethodGD.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.SWCluster_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxEle]))
            state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameSoftWareCluster
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.SWCluster_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxEle]))
            state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameSoftWarePackage
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWPackage_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.VehiclePackage_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxEle]))
            state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameVehiclePackage
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.VehiclePackage_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        } else if (payload.parent == constant.ModuleInstantiation_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.findIndex(item => item.uuid === payload.uuid)
            copyEle = JSON.parse(JSON.stringify(state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant[idxEle]))
            state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant[idxEle].zindex = 2
            copyEle.uuid = uuid.v1()
            copyEle.name = this.getters.getNameModuleInstant
            copyEle.left = elementX
            copyEle.top = elementY
            state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.push(copyEle)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.ModuleInstantiation_index].children.push({ uuid: copyEle.uuid, name: copyEle.name, icon: "mdi-clipboard-outline", validation: false, })
        }
        state.activeUUID = copyEle.uuid
        Vue.nextTick(() => { // 선 하나씩 그려주기 때문에 끝날때 active line 해줘야한다.
            EventBus.$emit('setLineActive', payload.uuid, false)
            EventBus.$emit('new-element', copyEle.uuid)
            Vue.nextTick(() => {
                var activeLine = this.getters.getactiveLine(payload.uuid)
                activeLine.forEach((i, n) => {
                    console.log(i)
                    var startUUID = state.connectionLine[state.openProjectIndex].start[i].split('/')
                    var tableLine = startUUID[1].split('-')
                    if (startUUID[0] == payload.uuid) {
                        console.log(startUUID[1])
                        Vue.nextTick(() => {
                            this.commit('setConnectionline', { start: copyEle.uuid + '/' + startUUID[1], end: state.connectionLine[state.openProjectIndex].end[i] })
                        })
                        Vue.nextTick(() => {
                            var changTab = null,
                                tabId = null //tab에서 선은 따로따로 그리기 때문에 하나씩 넣어야한다.
                            if (tableLine[0] == 'field' || tableLine[0] == 'event' || tableLine[0] == 'argtable' || tableLine[0] == 'methoderrors' || tableLine[0] == 'methoderror' ||
                                tableLine[0] == 'providEventG' || tableLine[0] == 'providServer' || tableLine[0] == 'requiredEventG' || tableLine[0] == 'requiredClient' ||
                                tableLine[0] == 'fgcontext' || tableLine[0] == 'fgtarget' || tableLine[0] == 'processresorce' || tableLine[0] == 'processstartup' ||
                                tableLine[0] == 'edcontext' || tableLine[0] == 'edtarget' || tableLine[0] == 'comconet' || tableLine[0] == 'PERKeyV' ||
                                tableLine[0] == 'PPortI' || tableLine[0] == 'pportQSC' || tableLine[0] == 'pportFSC' ||
                                tableLine[0] == 'PRPortI' || tableLine[0] == 'prporttab' ||
                                tableLine[0] == 'RPortI' || tableLine[0] == 'rportQRC' || tableLine[0] == 'rportCC') {
                                changTab = true
                                if (tableLine[0] == 'argtable' || tableLine[0] == 'methoderrors' || tableLine[0] == 'methoderror') {
                                    tabId = 'methods'
                                } else if (tableLine[0] == 'providEventG' || tableLine[0] == 'providServer') {
                                    tabId = 'providE'
                                } else if (tableLine[0] == 'requiredEventG' || tableLine[0] == 'requiredClient') {
                                    tabId = 'requiredE'
                                } else if (tableLine[0] == 'edcontext' || tableLine[0] == 'edtarget' || tableLine[0] == 'fgcontext' || tableLine[0] == 'fgtarget' || tableLine[0] == 'processresorce' || tableLine[0] == 'processstartup') {
                                    tabId = 'processStarupC'
                                } else if (tableLine[0] == 'comconet') {
                                    tabId = 'conditional'
                                } else if (tableLine[0] == 'PPortI' || tableLine[0] == 'pportQSC' || tableLine[0] == 'pportFSC') {
                                    tabId = 'pport'
                                } else if (tableLine[0] == 'PRPortI' || tableLine[0] == 'prporttab') {
                                    tabId = 'prport'
                                } else if (tableLine[0] == 'RPortI' || tableLine[0] == 'rportQRC' || tableLine[0] == 'rportCC') {
                                    tabId = 'rport'
                                } else {
                                    tabId = tableLine[0]
                                }
                            }
                            EventBus.$emit('copy-line', copyEle.uuid, state.connectionLine[state.openProjectIndex].end[i], i, changTab, tabId)
                            if (n == activeLine.length - 1) {
                                Vue.nextTick(() => {
                                    //console.log(state.visibleLine)
                                    if (state.visibleLine) {
                                        EventBus.$emit('setLineActive', copyEle.uuid, true)
                                    }
                                })
                            }
                        })
                    }
                })
            })
        })
    },
    setConnectionline(state, payload) {
        //console.log('setConnectionline ' + payload.start + ' /// ' + payload.end)
        state.connectionLine[state.openProjectIndex].start.push(payload.start)
        state.connectionLine[state.openProjectIndex].end.push(payload.end)
    },
    deletConnectionline(state, payload) {
        state.connectionLine[state.openProjectIndex].start.splice(payload.startnum, 1)
        state.connectionLine[state.openProjectIndex].end.splice(payload.startnum, 1)
    },
    setDetailView(state, payload) {
        console.log('setDetailView**' + state.detailViewer.uuid + '//' + payload.uuid)
        if (state.detailViewer.uuid != payload.uuid) {
            console.log('...' + state.idexDetailView + '+' + state.detailViewerList.length)
            if (state.idexDetailView < state.detailViewerList.length - 1) {
                console.log('.##.' + state.detailViewerList[state.idexDetailView + 1].uuid + '+' + payload.uuid)
                if (state.detailViewerList[state.idexDetailView + 1].uuid != payload.uuid) {
                    state.detailViewerList.splice(state.idexDetailView + 1)
                    console.log('splice' + state.idexDetailView)
                } else {
                    this.commit('setfrontDetailView')
                    console.log('splice else ' + state.idexDetailView)
                    return
                }
            }
            state.detailViewer = { uuid: payload.uuid, element: payload.element }
            state.detailViewerList.push({ uuid: payload.uuid, element: payload.element })
            state.idexDetailView = state.detailViewerList.length - 1
            state.detailViewUUID = payload.uuid
            console.log('set//' + state.idexDetailView + '//' + state.detailViewer.element + '//' + state.detailViewer.uuid)
            console.log(state.detailViewerList)
        } else {
            state.detailViewerList.splice(state.detailViewerList.length - 1, 1)
            state.detailViewer = { uuid: payload.uuid, element: payload.element }
            state.detailViewerList.push({ uuid: payload.uuid, element: payload.element })
            state.idexDetailView = state.detailViewerList.length - 1
            state.detailViewUUID = payload.uuid
        }
    },
    setBackDetailView(state) {
        if (state.idexDetailView == 0) {
            return
        }
        state.idexDetailView -= 1
        state.detailViewer = { uuid: state.detailViewerList[state.idexDetailView].uuid, element: state.detailViewerList[state.idexDetailView].element }
        state.detailViewUUID = state.detailViewerList[state.idexDetailView].uuid
        console.log('back' + state.detailViewerList[state.idexDetailView].element + '//' + state.detailViewer.uuid)
    },
    setfrontDetailView(state) {
        if (state.idexDetailView == state.detailViewerList.length - 1) {
            return
        }
        state.idexDetailView += 1
        state.detailViewer = { uuid: state.detailViewerList[state.idexDetailView].uuid, element: state.detailViewerList[state.idexDetailView].element }
        state.detailViewUUID = state.detailViewerList[state.idexDetailView].uuid
        console.log('front' + state.detailViewer.element + '//' + state.detailViewer.uuid)

    },
    setVisibleDetailView(state, payload) {
        state.visibleDetailView = payload.visible
        localStorage.setItem("visibleDetailView", JSON.stringify(state.visibleDetailView))
    },
    setVisibleLine(state, payload) {
        state.visibleLine = payload.isvisible
    },
    setExit() {
        console.log('setExit')
            //, JSON.stringify(state.SAHLProject))
            //localStorage.setItem("navigatorList", JSON.stringify(state.navigatorList))
    },
    deleteDetailViewerList(state) {
        state.detailViewerList = []
        state.detailViewer = { uuid: '', element: '' }
        state.detailViewUUID = null
        console.log(state.detailViewerList)
    },
    setPanesNum(state, payload) {
        state.numPanes = payload.panes
    },
    setSelectScreen(state, payload) {
        state.selectScreen = payload.num
    },
    setZoomInOut(state, payload) {
        if (payload.valueDetail == null) {
            state.setting = { zoomMain: payload.valueMain, zoomDetail: state.setting.zoomDetail }
        } else {
            state.setting = { zoomMain: payload.valueMain, zoomDetail: payload.valueDetail }
        }
        // 이렇게 변경해야지 watch에서 변경되었는지 알수있다!!!!
        localStorage.setItem("setting", JSON.stringify(state.setting))
    },
    setOpenCloseSearch(state, payload) {
        state.isOpenCloseSearch = payload.isopen
    },
    setOpenCloseDetailView(state, payload) {
        state.isOpenCloseDetailView = payload.isopen
    },
    setOpenCloseNavigationView(state, payload) {
        state.isOpenCloseNavigationView = payload.isopen
    },
    setPositionofLine(state, payload) {
        state.isPositionLine = payload.up
    },
    setDraggable(state, payload) {
        state.isDraggable = payload.drag
    },
    setSaveValidate(state, payload) {
        console.log('setSaveValidate')
        state.errorList = []
        for (var data in state.SAHLProject[state.openProjectIndex]) {
            if (data != 'uuid' && data != 'name') {
                for (var datatype in state.SAHLProject[state.openProjectIndex][data]) {
                    state.SAHLProject[state.openProjectIndex][data][datatype].forEach((ele, elidx) => {
                        payload.savelist.forEach(list => {
                            list.saveFile.forEach(item => {
                                if (item.uuid == ele.uuid) {
                                    if (ele.name == '') {
                                        state.errorList.push({ uuid: ele.uuid, name: ele.name, parent: data, path: ele.path, error: 'name' })
                                    }
                                    if (ele.path == '') {
                                        state.errorList.push({ uuid: ele.uuid, name: ele.name, parent: data, path: ele.path, error: 'path' })
                                    }

                                    if (ele.name == '' || ele.path == '') {
                                        this.commit('checkVaildationElement', { datatype: datatype, elidx: elidx })
                                    }
                                }
                            })
                        })
                    })
                }
            }
        }
    },
    setCheckValidate(state) {
        console.log('setCheckValidate')
        state.errorList = []
        for (var data in state.SAHLProject[state.openProjectIndex]) {
            if (data != 'uuid' && data != 'name') {
                for (var datatype in state.SAHLProject[state.openProjectIndex][data]) {
                    state.SAHLProject[state.openProjectIndex][data][datatype].forEach((ele, elidx) => {
                        var checkNameSpace = false

                        if (ele.name == '') {
                            state.errorList.push({ uuid: ele.uuid, name: ele.name, parent: data, path: ele.path, error: 'name' })
                        }
                        if (ele.path == '') {
                            state.errorList.push({ uuid: ele.uuid, name: ele.name, parent: data, path: ele.path, error: 'path' })
                        }
                        if (ele.namespace != undefined) {
                            var namespace = ele.namespace.split(',')
                            console.log(namespace)
                            namespace.forEach((item, i) => {
                                if (!(item == '' && i == namespace.length - 1)) {
                                    var strSymble = item.split('/')
                                    console.log(strSymble)
                                    if (strSymble.length != 2 || strSymble[0] == '' || strSymble[0] == undefined || strSymble[1] == '' || strSymble[1] == undefined) {
                                        if (checkNameSpace == false) {
                                            state.errorList.push({ uuid: ele.uuid, name: ele.name, parent: data, path: ele.path, error: 'Name Space' })
                                        }
                                        checkNameSpace = true
                                    }
                                }
                            })

                        }

                        if (ele.name == '' || ele.path == '' || checkNameSpace == true) {
                            this.commit('checkVaildationElement', { datatype: datatype, elidx: elidx })
                        }
                    })
                }

            }
        }
    },
    checkVaildationElement(state, payload) {
        var idxchild = null,
            idxchildchild = null,
            idxService = null

        if (payload.datatype == 'CompuMethod') {
            idxchild = constant.DateType_index
            idxchildchild = constant.CompuMethod_index
        } else if (payload.datatype == 'DataConstr') {
            idxchild = constant.DateType_index
            idxchildchild = constant.DataConstr_index
        } else if (payload.datatype == 'ApplicationArrayDataType') {
            idxchild = constant.DateType_index
            idxchildchild = constant.ApplicationArray_index
        } else if (payload.datatype == 'ImplementationDataType') {
            idxchild = constant.DateType_index
            idxchildchild = constant.Implementation_index
        } else if (payload.datatype == 'Machine') {
            idxchild = constant.Machines_index
            idxchildchild = constant.Machine_index
        } else if (payload.datatype == 'MachineDesign') {
            idxchild = constant.Machines_index
            idxchildchild = constant.MachineDesigne_index
        } else if (payload.datatype == 'EthernetCluster') {
            idxchild = constant.Machines_index
            idxchildchild = constant.EthernetCluster_index
        } else if (payload.datatype == 'ModeDeclarationGroup') {
            idxchild = constant.Machines_index
            idxchildchild = constant.ModeDeclarationGroup_index
        } else if (payload.datatype == 'HWElement') {
            idxchild = constant.Machines_index
            idxchildchild = constant.HWElement_index
        } else if (payload.datatype == 'ProtoMachineMapping') {
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.ProcesstoMachineMapping_index
        } else if (payload.datatype == 'SWComponents') {
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.SWComponents_index
        } else if (payload.datatype == 'Process') {
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.Process_index
        } else if (payload.datatype == 'Executable') {
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.Executable_index
        } else if (payload.datatype == 'StartupConfig') {
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.StartupConfig_index
        } else if (payload.datatype == 'DeterministicClient') {
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.DeterministicClient_index
        } else if (payload.datatype == 'ProcessDesign') {
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.ProcessDesign_index
        } else if (payload.datatype == 'SomeIPServiceInterfaceDeployment') {
            idxService = constant.ServiceInterfaces_index
            idxchild = constant.Service_index
            idxchildchild = constant.SomeIPServiceInterfaceDeployment_index
        } else if (payload.datatype == 'ServiceInterface') {
            idxService = constant.ServiceInterfaces_index
            idxchild = constant.Service_index
            idxchildchild = constant.ServiceInterface_index
        } else if (payload.datatype == 'SomeIPClientEvent') {
            idxService = constant.SomeIPEvents_index
            idxchild = constant.Service_index
            idxchildchild = constant.Client_index
        } else if (payload.datatype == 'SomeIPServerEvent') {
            idxService = constant.SomeIPEvents_index
            idxchild = constant.Service_index
            idxchildchild = constant.Server_index
        } else if (payload.datatype == 'Error') {
            idxService = constant.Errors_index
            idxchild = constant.Service_index
            idxchildchild = constant.Error_index
        } else if (payload.datatype == 'ErrorSet') {
            idxService = constant.Errors_index
            idxchild = constant.Service_index
            idxchildchild = constant.Errorset_index
        } else if (payload.datatype == 'ErrorDomain') {
            idxService = constant.Errors_index
            idxchild = constant.Service_index
            idxchildchild = constant.ErrorDomain_index
        } else if (payload.datatype == 'SomeIPClientServiceInstance') {
            idxService = constant.ServiceInstances_index
            idxchild = constant.Service_index
            idxchildchild = constant.SomeIPClient_index
        } else if (payload.datatype == 'SomeIPServerServiceInstance') {
            idxService = constant.ServiceInstances_index
            idxchild = constant.Service_index
            idxchildchild = constant.SomeIPServer_index
        } else if (payload.datatype == 'SomeIPServiceInstanceToMachine') {
            idxService = constant.ServiceInstances_index
            idxchild = constant.Service_index
            idxchildchild = constant.SomeIPToMachineMapping_index
        } else if (payload.datatype == 'ServiceInstanceToPortPrototype') {
            idxService = constant.ServiceInstances_index
            idxchild = constant.Service_index
            idxchildchild = constant.ToPortPrototypeMapping_index
        } else if (payload.datatype == 'RequiredSomeIP') {
            idxService = constant.ServiceInstances_index
            idxchild = constant.Service_index
            idxchildchild = constant.RequiredSomeIP_index
        } else if (payload.datatype == 'ProvidedSomeIP') {
            idxService = constant.ServiceInstances_index
            idxchild = constant.Service_index
            idxchildchild = constant.ProvidedSomeIP_index
        } else if (payload.datatype == 'PERFileArray') {
            idxService = constant.PER_index
            idxchild = constant.Platform_index
            idxchildchild = constant.FileArray_index
        } else if (payload.datatype == 'PERFileProxy') {
            idxService = constant.PER_index
            idxchild = constant.Platform_index
            idxchildchild = constant.FileProxyInterf_index
        } else if (payload.datatype == 'PERKeyValueD') {
            idxService = constant.PER_index
            idxchild = constant.Platform_index
            idxchildchild = constant.KeyValueData_index
        } else if (payload.datatype == 'PERKeyValueDI') {
            idxService = constant.PER_index
            idxchild = constant.Platform_index
            idxchildchild = constant.KeyValueDI_index
        } else if (payload.datatype == 'PERPPtoFileArray') {
            idxService = constant.PER_index
            idxchild = constant.Platform_index
            idxchildchild = constant.PortProtoFileA_index
        } else if (payload.datatype == 'PERPPtoKeyValue') {
            idxService = constant.PER_index
            idxchild = constant.Platform_index
            idxchildchild = constant.PortProtoKeyV_index
        } else if (payload.datatype == 'PHMContribution') {
            idxService = constant.PHM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.PlatformHealthManagC_index
        } else if (payload.datatype == 'PHMtoMachine') {
            idxService = constant.PHM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.ContritoMachine_index
        } else if (payload.datatype == 'PHMHealth') {
            idxService = constant.PHM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.HealthChannel_index
        } else if (payload.datatype == 'PHMRecovery') {
            idxService = constant.PHM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.RecoveryVA_index
        } else if (payload.datatype == 'PHMSupervised') {
            idxService = constant.PHM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.PHMSupervised_index
        } else if (payload.datatype == 'RecoveryVia') {
            idxService = constant.PHM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.RecoveryActionInterf_index
        } else if (payload.datatype == 'FieldG') {
            idxService = constant.IAM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.ComFieldGrant_index
        } else if (payload.datatype == 'EventG') {
            idxService = constant.IAM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.ComEventGrant_index
        } else if (payload.datatype == 'MethodG') {
            idxService = constant.IAM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.ComMethodGrant_index
        } else if (payload.datatype == 'FieldGD') {
            idxService = constant.IAM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.ComFieldGDesign_index
        } else if (payload.datatype == 'EventGD') {
            idxService = constant.IAM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.ComEventGDesign_index
        } else if (payload.datatype == 'MethodGD') {
            idxService = constant.IAM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.ComMethodGDesign_index
        } else if (payload.datatype == 'SoftWareCluster') {
            idxService = constant.UCM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.SWCluster_index
        } else if (payload.datatype == 'SoftWarePackage') {
            idxService = constant.UCM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.SWPackage_index
        } else if (payload.datatype == 'VehiclePackage') {
            idxService = constant.UCM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.VehiclePackage_index
        } else if (payload.datatype == 'ModuleInstant') {
            idxService = constant.UCM_index
            idxchild = constant.Platform_index
            idxchildchild = constant.ModuleInstantiation_index
        }

        if (idxchild == constant.Service_index) {
            state.navigatorList[state.openProjectIndex].children[idxchild].children[idxService].children[idxchildchild].children[payload.elidx].validation = true
            state.navigatorList[state.openProjectIndex].children[idxchild].children[idxService].children[idxchildchild].validation = true
            state.navigatorList[state.openProjectIndex].children[idxchild].children[idxService].validation = true
            state.navigatorList[state.openProjectIndex].children[idxchild].validation = true
            state.navigatorList[state.openProjectIndex].validation = true
        } else {
            state.navigatorList[state.openProjectIndex].children[idxchild].children[idxchildchild].children[payload.elidx].validation = true
            state.navigatorList[state.openProjectIndex].children[idxchild].children[idxchildchild].validation = true
            state.navigatorList[state.openProjectIndex].children[idxchild].validation = true
            state.navigatorList[state.openProjectIndex].validation = true
        }
    },
    setSavePath(state, payload) {
        state.strSavePath.push(payload.strPath)
        localStorage.setItem("savePath", JSON.stringify(state.strSavePath))
    },
    deleteSavePath(state, payload) {
        state.strSavePath = state.strSavePath.filter(item => {
            return payload.deletePath.indexOf(item) < 0
        })
        localStorage.setItem("savePath", JSON.stringify(state.strSavePath))
    },
    setzIndex(state, payload) {
        //console.log('setzIndex/  ' + payload.zindex)
        //console.log(payload.parent)
        //console.log(payload.uuid)
        if (payload.parent == constant.CompuMethod_str) {
            this.commit('editCompuMehtod', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.DataConstr_str) {
            this.commit('editDataConstr', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ApplicationArray_str) {
            this.commit('editApplicationArray', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.Implementation_str) {
            this.commit('editImplementation', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.SomeIPServiceInterfaceDeployment_str) {
            this.commit('editSomeIPService', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ServiceInterface_str) {
            this.commit('editServiceInterface', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.Client_str) {
            this.commit('editClient', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.Server_str) {
            this.commit('editServer', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.SomeIPClient_str) {
            this.commit('editSomeIPClient', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.SomeIPServer_str) {
            this.commit('editSomeIPServer', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.SomeIPToMachineMapping_str) {
            this.commit('editSomeIPtoMachine', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ToPortPrototypeMapping_str) {
            this.commit('editToPortPrototype', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.RequiredSomeIP_str) {
            this.commit('editRequiredSomeIP', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ProvidedSomeIP_str) {
            this.commit('editProvidedSomeIP', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.Error_str) {
            this.commit('editError', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.Errorset_str) {
            this.commit('editErrorSet', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ErrorDomain_str) {
            this.commit('editErrorDomain', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ProcesstoMachineMapping_str) {
            this.commit('editProtoMachineMapping', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.SWComponents_str) {
            this.commit('editSWComponents', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.Process_str) {
            this.commit('editProcess', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ProcessDesign_str) {
            this.commit('editProcessDesign', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.Executable_str) {
            this.commit('editExecutable', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.StartupConfig_str) {
            this.commit('editStartupConfig', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.DeterministicClient_str) {
            this.commit('editDeterministicClien', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.Machine_str) {
            this.commit('editMachine', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.MachineDesigne_str) {
            this.commit('editMachineDesign', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.EthernetCluster_str) {
            this.commit('editEthernetCluster', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ModeDeclarationGroup_str) {
            this.commit('editModeDeclarationGroup', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.HWElement_str) {
            this.commit('editHWElement', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.FileArray_str) {
            this.commit('editPERFileArray', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.FileProxyInterf_str) {
            this.commit('editPERFileProxy', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.KeyValueData_str) {
            this.commit('editPERKeyValueD', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.KeyValueDI_str) {
            this.commit('editPERKeyValueDI', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.PortProtoFileA_str) {
            this.commit('editPERPPtoFileArray', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.PortProtoKeyV_str) {
            this.commit('editPERPPtoKeyValue', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.PlatformHealthManagC_str) {
            this.commit('editPHMContribution', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ContritoMachine_str) {
            this.commit('editPHMtoMachine', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.HealthChannel_str) {
            this.commit('editPHMHealth', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.RecoveryVA_str) {
            this.commit('editPHMRecovery', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.PHMSupervised_str) {
            this.commit('editPHMSupervised', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.RecoveryActionInterf_str) {
            this.commit('editPHMRecoveryVia', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ComMethodGDesign_str) {
            this.commit('editMethodGD', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ComEventGDesign_str) {
            this.commit('editEventGD', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ComFieldGDesign_str) {
            this.commit('editFieldGD', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ComMethodGrant_str) {
            this.commit('editMethodG', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ComEventGrant_str) {
            this.commit('editEventG', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ComFieldGrant_str) {
            this.commit('editFieldG', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.SWCluster_str) {
            this.commit('editSoftWareCluster', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.SWPackage_str) {
            this.commit('editSoftWarePackage', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.VehiclePackage_str) {
            this.commit('editVehiclePackage', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        } else if (payload.parent == constant.ModuleInstantiation_str) {
            this.commit('editModuleInstant', { compo: "z", uuid: payload.uuid, zindex: payload.zindex })
        }
    },
    saveInputfile(state, payload) {
        const getEditPath = (ele, path) => {
            if (ele.parentNode.parentNode.nodeName == 'AR-PACKAGE') {
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        path = item.childNodes[0].nodeValue + '/' + path
                    }
                })
                return getEditPath(ele.parentNode.parentNode, path)
            }

            ele.childNodes.forEach(item => {
                if (item.nodeName == "SHORT-NAME") {
                    path = '/' + item.childNodes[0].nodeValue + '/' + path
                }
            })
            path = path.substr(0, path.length - 1)
            return path
        }

        /// COMPU-METHOD
        var compu = payload.xmlDoc.getElementsByTagName('COMPU-METHOD')
        compu.forEach(ele => {
                var compuName = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    compuCate = ''
                var scalesItem = []

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        compuName = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "CATEGORY") {
                        compuCate = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "COMPU-INTERNAL-TO-PHYS") {
                        var scales = item.childNodes[1].childNodes
                        scales.forEach((scale, s) => {
                            if (s % 2 != 0) {
                                var editScaleItem = { const: '', symbol: '', lowerlimit: '', upperlimit: '', desc: '' }
                                scale.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "COMPU-CONST") {
                                            editScaleItem.const = data.childNodes[1].childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SYMBOL") {
                                            editScaleItem.symbol = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "LOWER-LIMIT") {
                                            editScaleItem.lowerlimit = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "UPPER-LIMIT") {
                                            editScaleItem.upperlimit = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "DESC") {
                                            editScaleItem.desc = data.childNodes[1].childNodes[0].nodeValue
                                        }
                                    }
                                })
                                const addObj = Object.assign({}, editScaleItem)
                                scalesItem.push(addObj)
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementCompuMehtod', {
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    name: compuName,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    category: compuCate,
                    scales: scalesItem,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + compuName, parent: constant.CompuMethod_str })
                EventBus.$emit('add-element', constant.DateType_str)
                EventBus.$emit('add-element', constant.CompuMethod_str)
            })
            /// Data-Constr
        var datacon = payload.xmlDoc.getElementsByTagName('DATA-CONSTR')
        datacon.forEach(ele => {
                var dataconName = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    dataconLow = '',
                    dataconUpper = ''

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        dataconName = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DATA-CONSTR-RULES") {
                        var rules = item.childNodes[1].childNodes[1].childNodes
                        rules.forEach(data => {
                            if (data.nodeName == "LOWER-LIMIT") {
                                dataconLow = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "UPPER-LIMIT") {
                                dataconUpper = data.childNodes[0].nodeValue
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementDataConstr', {
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    name: dataconName,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    lowerlimit: dataconLow,
                    upperlimit: dataconUpper,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + dataconName, parent: constant.DataConstr_str })
                EventBus.$emit('add-element', constant.DateType_str)
                EventBus.$emit('add-element', constant.DataConstr_str)
            })
            /// APPLICATION-ARRAY-DATA-TYPE
        var application = payload.xmlDoc.getElementsByTagName('APPLICATION-ARRAY-DATA-TYPE')
        application.forEach(ele => {
                var appliName = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    appliCategory = '',
                    appliDynamicArrySize = '',
                    appliElename = '',
                    appliElehandling = null,
                    appliElesemantics = null,
                    appliElemaxnumber = ''

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        appliName = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "CATEGORY") {
                        appliCategory = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DYNAMIC-ARRAY-SIZE-PROFILE") {
                        appliDynamicArrySize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ELEMENT") {
                        item.childNodes.forEach(data => {
                            if (data.nodeName == "SHORT-NAME") {
                                appliElename = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "ARRAY-SIZE-HANDLING") {
                                appliElehandling = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "ARRAY-SIZE-SEMANTICS") {
                                appliElesemantics = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "MAX-NUMBER-OF-ELEMENTS") {
                                appliElemaxnumber = data.childNodes[0].nodeValue
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementApplicationArray', {
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    name: appliName,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    category: appliCategory,
                    dynamicArrySize: appliDynamicArrySize,
                    elename: appliElename,
                    elehandling: appliElehandling,
                    elesemantics: appliElesemantics,
                    elemaxnumber: appliElemaxnumber,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + appliName, parent: constant.ApplicationArray_str })
                EventBus.$emit('add-element', constant.DateType_str)
                EventBus.$emit('add-element', constant.ApplicationArray_str)
            })
            //STD-CPP-IMPLEMENTATION-DATA-TYPE
        var implement = payload.xmlDoc.getElementsByTagName('STD-CPP-IMPLEMENTATION-DATA-TYPE')
        implement.forEach(ele => {
                var impName = '',
                    id = 0,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    impcategory = '',
                    impnamespace = '',
                    imparraysize = '',
                    imptypeemitter = '',
                    imptyperef = null,
                    imptemplatetype = null,
                    impdesc = ''
                var DDPCItem = [],
                    IDTElementItem = []
                console.log(ele.childNodes)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        impName = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "CATEGORY") {
                        impcategory = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "NAMESPACES") {
                        item.childNodes.forEach((symbol, s) => {
                            if (s % 2 != 0) {
                                symbol.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        impnamespace += data.childNodes[0].nodeValue
                                        impnamespace += '/'
                                    }
                                })
                                impnamespace = impnamespace.substr(0, impnamespace.length - 1)
                                impnamespace += ','
                            }
                        })
                    }
                    if (item.nodeName == "ARRAY-SIZE") {
                        imparraysize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "TYPE-EMITTER") {
                        imptypeemitter = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "TYPE-REFERENCE-REF") {
                        imptyperef = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "TEMPLATE-ARGUMENTS") {
                        imptemplatetype = item.childNodes[1].childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DESC") {
                        impdesc = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SW-DATA-DEF-PROPS") {
                        id = 0
                        var swdata = item.childNodes[1].childNodes
                        swdata.forEach((condi, c) => {
                            var editDDPCItem = { compumethod: null, dataconstr: null, id: '' }
                            if (c % 2 != 0) {
                                condi.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "COMPU-METHOD-REF") {
                                            editDDPCItem.compumethod = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "DATA-CONSTR-REF") {
                                            editDDPCItem.dataconstr = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editDDPCItem.id = id
                                const addObj = Object.assign({}, editDDPCItem)
                                DDPCItem.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "SUB-ELEMENTS") {
                        id = 0
                        item.childNodes.forEach((cppImp, c) => {
                            var editIDTElementItem = { name: '', typeref: null, inplace: false, desc: '', id: '' }
                            if (c % 2 != 0) {
                                cppImp.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editIDTElementItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "DESC") {
                                            editIDTElementItem.desc = data.childNodes[1].childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "TYPE-REFERENCE") {
                                            data.childNodes.forEach((typeR, t) => {
                                                if (t % 2 != 0) {
                                                    if (typeR.nodeName == "INPLACE") {
                                                        editIDTElementItem.inplace = typeR.childNodes[0].nodeValue
                                                    }
                                                    if (typeR.nodeName == "TYPE-REFERENCE-REF") {
                                                        editIDTElementItem.typeref = typeR.childNodes[0].nodeValue
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                                editIDTElementItem.id = id
                                const addObj = Object.assign({}, editIDTElementItem)
                                IDTElementItem.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementImplementation', {
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    name: impName,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    category: impcategory,
                    namespace: impnamespace,
                    arraysize: imparraysize,
                    typeemitter: imptypeemitter,
                    typeref: imptyperef,
                    templatetype: imptemplatetype,
                    desc: impdesc,
                    ddpc: DDPCItem,
                    idtelement: IDTElementItem,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + impName, parent: constant.Implementation_str })
                EventBus.$emit('add-element', constant.DateType_str)
                EventBus.$emit('add-element', constant.Implementation_str)
            })
            // MACHINE
        var machine = payload.xmlDoc.getElementsByTagName('MACHINE')
        machine.forEach(ele => {
                var name = '',
                    id = 0,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    machineDesign = null,
                    timeout = '',
                    exelaunch = null,
                    admin = '',
                    hwele = [],
                    functionG = [],
                    processor = [],
                    module = []

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MACHINE-DESIGN-REF") {
                        machineDesign = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DEFAULT-APPLICATION-TIMEOUT") {
                        timeout = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "TRUSTED-PLATFORM-EXECUTABLE-LAUNCH-BEHAVIOR") {
                        exelaunch = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ADMIN-DATA") {
                        admin = item.childNodes[1].childNodes[1].childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "HW-ELEMENT-REFS") {
                        id = 0
                        item.childNodes.forEach((data, d) => {
                            var editHWItem = { hwelement: null, id: '' }
                            if (d % 2 != 0) {
                                if (data.nodeName == "HW-ELEMENT-REF") {
                                    editHWItem.hwelement = data.childNodes[0].nodeValue
                                    editHWItem.id = id
                                    const addObj = Object.assign({}, editHWItem)
                                    hwele.push(addObj)
                                    id++
                                }
                            }
                        })
                    }
                    if (item.nodeName == "FUNCTION-GROUPS") {
                        id = 0
                        item.childNodes.forEach((mode, m) => {
                            var editFunctionItem = { name: '', type: null, id: '' }
                            if (m % 2 != 0) {
                                mode.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editFunctionItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "TYPE-TREF") {
                                            editFunctionItem.type = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editFunctionItem.id = id
                                const addObj = Object.assign({}, editFunctionItem)
                                functionG.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "PROCESSORS") {
                        id = 0
                        item.childNodes.forEach((pros, p) => {
                            var editPro = { name: '', core: [] }
                            if (p % 2 != 0) {
                                pros.childNodes.forEach((pro, r) => {
                                    if (r % 2 != 0) {
                                        if (pro.nodeName == "SHORT-NAME") {
                                            editPro.name = pro.childNodes[0].nodeValue
                                        }
                                        if (pro.nodeName == "CORES") {
                                            pro.childNodes.forEach((procor, o) => {
                                                if (o % 2 != 0) {
                                                    var editCoreItem = { name: '', idCore: '', id: '' }
                                                    procor.childNodes.forEach((data, d) => {
                                                        if (d % 2 != 0) {
                                                            if (data.nodeName == "SHORT-NAME") {
                                                                editCoreItem.name = data.childNodes[0].nodeValue
                                                            }
                                                            if (data.nodeName == "CORE-ID") {
                                                                editCoreItem.idCore = data.childNodes[0].nodeValue
                                                            }
                                                        }
                                                    })
                                                    editCoreItem.id = id
                                                    const addObjRes = Object.assign({}, editCoreItem)
                                                    editPro.core.push(addObjRes)
                                                    id++
                                                }
                                            })
                                        }
                                    }
                                })
                                const addObj = Object.assign({}, editPro)
                                processor.push(addObj)
                            }
                        })
                    }
                    if (item.nodeName == "MODULE-INSTANTIATIONS") {
                        id = 0
                        item.childNodes.forEach((os, o) => {
                            var editModule = { name: '', resource: [] }
                            if (o % 2 != 0) {
                                os.childNodes.forEach((osmodul, s) => {
                                    if (s % 2 != 0) {
                                        if (osmodul.nodeName == "SHORT-NAME") {
                                            editModule.name = osmodul.childNodes[0].nodeValue
                                        }
                                        if (osmodul.nodeName == "RESOURCE-GROUPS") {
                                            osmodul.childNodes.forEach((group, g) => {
                                                var editModuleInsItem = { name: '', cpuUsage: '', memoryUsage: '', id: '' }
                                                if (g % 2 != 0) {
                                                    group.childNodes.forEach((data, d) => {
                                                        if (d % 2 != 0) {
                                                            if (data.nodeName == "SHORT-NAME") {
                                                                editModuleInsItem.name = data.childNodes[0].nodeValue
                                                            }
                                                            if (data.nodeName == "CPU-USAGE") {
                                                                editModuleInsItem.cpuUsage = data.childNodes[0].nodeValue
                                                            }
                                                            if (data.nodeName == "MEM-USAGE") {
                                                                editModuleInsItem.memoryUsage = data.childNodes[0].nodeValue
                                                            }
                                                        }
                                                    })
                                                    editModuleInsItem.id = id
                                                    const addObjRes = Object.assign({}, editModuleInsItem)
                                                    editModule.resource.push(addObjRes)
                                                    id++
                                                }
                                            })
                                        }
                                    }
                                })
                                const addObj = Object.assign({}, editModule)
                                module.push(addObj)
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementMachine', {
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    name: name,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    machinedesign: machineDesign,
                    timeout: timeout,
                    hwelement: hwele,
                    executable: exelaunch,
                    admin: admin,
                    functiongroup: functionG,
                    processor: processor,
                    moduleinstant: module,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + name, parent: constant.Machine_str })
                EventBus.$emit('add-element', constant.Machines_str)
                EventBus.$emit('add-element', constant.Machine_str)
            })
            // MACHINE-DESIGN
        var machineDesign = payload.xmlDoc.getElementsByTagName('MACHINE-DESIGN')
        machineDesign.forEach(ele => {
                var Name = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    access = null,
                    pntimer = '',
                    communi = [],
                    service = []
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ACCESS-CONTROL") {
                        access = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PN-RESET-TIMER") {
                        pntimer = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "COMMUNICATION-CONNECTORS") {
                        var id = 0
                        item.childNodes.forEach((ethernet, e) => {
                            var editedItemCC = { name: '', mtu: '', mtuenable: null, timeout: '', endpoint: null, mask: '', id: '' }
                            if (e % 2 != 0) {
                                ethernet.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editedItemCC.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "MAXIMUM-TRANSMISSION-UNIT") {
                                            editedItemCC.mtu = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "PATH-MTU-ENABLED") {
                                            editedItemCC.mtuenable = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "PATH-MTU-TIMEOUT") {
                                            editedItemCC.timeout = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "UNICAST-NETWORK-ENDPOINT-REF") {
                                            editedItemCC.endpoint = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "PNC-FILTER-DATA-MASK") {
                                            editedItemCC.mask = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editedItemCC.id = id
                                const addObj = Object.assign({}, editedItemCC)
                                communi.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "SERVICE-DISCOVER-CONFIGS") {
                        var idS = 0
                        item.childNodes.forEach((someIP, s) => {
                            var editedItemSDC = { msia: null, ssdp: '', id: '' }
                            if (s % 2 != 0) {
                                someIP.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "MULTICAST-SD-IP-ADDRESS-REF") {
                                            editedItemSDC.msia = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SOMEIP-SERVICE-DISCOVERY-PORT") {
                                            editedItemSDC.ssdp = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editedItemSDC.id = idS
                                const addObj = Object.assign({}, editedItemSDC)
                                service.push(addObj)
                                idS++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementMachineDesign', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    access: access,
                    resettimer: pntimer,
                    connector: communi,
                    servicediscover: service,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.MachineDesigne_str })
                EventBus.$emit('add-element', constant.Machines_str)
                EventBus.$emit('add-element', constant.MachineDesigne_str)
            })
            // ETHERNET-CLUSTER
        var ethernetCluster = payload.xmlDoc.getElementsByTagName('ETHERNET-CLUSTER')
        ethernetCluster.forEach(ele => {
                var Name = '',
                    idC = 0,
                    idP = 0,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    condition = []
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ETHERNET-CLUSTER-VARIANTS") {
                        item.childNodes.forEach((ethernet, e) => {
                            if (e % 2 != 0) {
                                var editedEthernet = { name: '', version: '', channel: [], id: '' }
                                ethernet.childNodes.forEach((protocol, p) => {
                                    if (p % 2 != 0) {
                                        if (protocol.nodeName == "PROTOCOL-NAME") {
                                            editedEthernet.name = protocol.childNodes[0].nodeValue
                                        }
                                        if (protocol.nodeName == "PROTOCOL-VERSION") {
                                            editedEthernet.version = protocol.childNodes[0].nodeValue
                                        }
                                        if (protocol.nodeName == "PHYSICAL-CHANNELS") {
                                            protocol.childNodes.forEach((channels, c) => {
                                                if (c % 2 != 0) {
                                                    var editChannel = { name: '', comconnect: [], endpoint: [], id: '' }
                                                    channels.childNodes.forEach((channel, h) => {
                                                        if (h % 2 != 0) {
                                                            if (channel.nodeName == "SHORT-NAME") {
                                                                editChannel.name = channel.childNodes[0].nodeValue
                                                            }
                                                            if (channel.nodeName == "COMM-CONNECTORS") {
                                                                var id = 0
                                                                channel.childNodes.forEach((comm, o) => {
                                                                    if (o % 2 != 0) {
                                                                        var editCCItem = { connector: null, id: '' }
                                                                        comm.childNodes.forEach(data => {
                                                                            if (data.nodeName == "COMMUNICATION-CONNECTOR-REF") {
                                                                                editCCItem.connector = data.childNodes[0].nodeValue
                                                                            }
                                                                        })
                                                                        editCCItem.id = id
                                                                        const addObj = Object.assign({}, editCCItem)
                                                                        editChannel.comconnect.push(addObj)
                                                                        id++
                                                                    }
                                                                })
                                                            }
                                                            if (channel.nodeName == "NETWORK-ENDPOINTS") {
                                                                channel.childNodes.forEach((network, n) => {
                                                                    if (n % 2 != 0) {
                                                                        var editNetwork = { name: '', domainname: '', ip4address: [], ip6address: [], priority: '' }
                                                                        network.childNodes.forEach((endpoint, d) => {
                                                                            if (d % 2 != 0) {
                                                                                if (endpoint.nodeName == "SHORT-NAME") {
                                                                                    editNetwork.name = endpoint.childNodes[0].nodeValue
                                                                                }
                                                                                if (endpoint.nodeName == "FULLY-QUALIFIED-DOMAIN-NAME") {
                                                                                    editNetwork.domainname = endpoint.childNodes[0].nodeValue
                                                                                }
                                                                                if (endpoint.nodeName == "PRIORITY") {
                                                                                    editNetwork.priority = endpoint.childNodes[0].nodeValue
                                                                                }
                                                                                if (endpoint.nodeName == "NETWORK-ENDPOINT-ADDRESSES") {
                                                                                    var id4 = 0,
                                                                                        id6 = 0
                                                                                    endpoint.childNodes.forEach((config, f) => {
                                                                                        if (f % 2 != 0) {
                                                                                            var editIP4Item = { gateway: '', behavior: null, address: '', addresssorce: null, mask: '', id: '' }
                                                                                            var editIP6Item = { priority: '', behavior: null, prelength: '', address: '', addresssource: null, id: '' }
                                                                                            if (config.nodeName == "IPV-4-CONFIGURATION") {
                                                                                                config.childNodes.forEach((data, a) => {
                                                                                                    if (a % 2 != 0) {
                                                                                                        if (data.nodeName == "DEFAULT-GATEWAY") {
                                                                                                            editIP4Item.gateway = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                        if (data.nodeName == "IP-ADDRESS-KEEP-BEHAVIOR") {
                                                                                                            editIP4Item.behavior = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                        if (data.nodeName == "IPV-4-ADDRESS") {
                                                                                                            editIP4Item.address = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                        if (data.nodeName == "IPV-4-ADDRESS-SOURCE") {
                                                                                                            editIP4Item.addresssorce = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                        if (data.nodeName == "NETWORK-MASK") {
                                                                                                            editIP4Item.mask = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                    }
                                                                                                })
                                                                                                editIP4Item.id = id4
                                                                                                const addObj = Object.assign({}, editIP4Item)
                                                                                                editNetwork.ip4address.push(addObj)
                                                                                                id4++
                                                                                            }
                                                                                            if (config.nodeName == "IPV-6-CONFIGURATION") {
                                                                                                config.childNodes.forEach((data, t) => {
                                                                                                    if (t % 2 != 0) {
                                                                                                        if (data.nodeName == "ASSIGNMENT-PRIORITY") {
                                                                                                            editIP6Item.priority = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                        if (data.nodeName == "IP-ADDRESS-KEEP-BEHAVIOR") {
                                                                                                            editIP6Item.behavior = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                        if (data.nodeName == "IP-ADDRESS-PREFIX-LENGTH") {
                                                                                                            editIP6Item.prelength = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                        if (data.nodeName == "IPV-6-ADDRESS") {
                                                                                                            editIP6Item.address = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                        if (data.nodeName == "IPV-6-ADDRESS-SOURCE") {
                                                                                                            editIP6Item.addresssource = data.childNodes[0].nodeValue
                                                                                                        }
                                                                                                    }
                                                                                                })
                                                                                                editIP6Item.id = id6
                                                                                                const addObj = Object.assign({}, editIP6Item)
                                                                                                editNetwork.ip6address.push(addObj)
                                                                                                id6++
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        })
                                                                        const addObj = Object.assign({}, editNetwork)
                                                                        editChannel.endpoint.push(addObj)
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    })
                                                    editChannel.id = idP
                                                    const addObjRes = Object.assign({}, editChannel)
                                                    editedEthernet.channel.push(addObjRes)
                                                    idP++
                                                }
                                            })
                                        }
                                    }
                                })
                                editedEthernet.id = idC
                                const addObj = Object.assign({}, editedEthernet)
                                condition.push(addObj)
                                idC++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementEthernetCluster', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    conditional: condition,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.EthernetCluster_str })
                EventBus.$emit('add-element', constant.Machines_str)
                EventBus.$emit('add-element', constant.EthernetCluster_str)
            })
            // MODE-DECLARATION-GROUP
        var modeDeclatation = payload.xmlDoc.getElementsByTagName('MODE-DECLARATION-GROUP')
        modeDeclatation.forEach(ele => {
                var Name = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    mode = [],
                    initmode = null
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "INITIAL-MODE-REF") {
                        var init = item.childNodes[0].nodeValue
                        var arrayMode = init.split('/')
                        initmode = arrayMode[arrayMode.length - 1]
                    }
                    if (item.nodeName == "MODE-DECLARATIONS") {
                        item.childNodes.forEach((modede, m) => {
                            if (m % 2 != 0) {
                                modede.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            mode.push(data.childNodes[0].nodeValue)
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementModeDeclarationGroup', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    modedeclaration: mode,
                    initmode: initmode,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ModeDeclarationGroup_str })
                EventBus.$emit('add-element', constant.Machines_str)
                EventBus.$emit('add-element', constant.ModeDeclarationGroup_str)
            })
            // HW-ELEMENT
        var HWElement = payload.xmlDoc.getElementsByTagName('HW-ELEMENT')
        HWElement.forEach(ele => {
            var Name = '',
                id = 0,
                path = '',
                strPath = getEditPath(ele.parentNode.parentNode, path),
                category = null,
                attri = []
            ele.childNodes.forEach(item => {
                if (item.nodeName == "SHORT-NAME") {
                    Name = item.childNodes[0].nodeValue
                }
                if (item.nodeName == "HW-CATEGORY-REFS") {
                    category = item.childNodes[1].childNodes[0].nodeValue
                }
                if (item.nodeName == "HW-ATTRIBUTE-VALUES") {
                    item.childNodes.forEach((value, v) => {
                        if (v % 2 != 0) {
                            var editAttributeItem = { attr: null, vt: '', v: '', id: '' }
                            value.childNodes.forEach((data, d) => {
                                if (d % 2 != 0) {
                                    if (data.nodeName == "HW-ATTRIBUTE-DEF-REF") {
                                        editAttributeItem.attr = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "VT") {
                                        editAttributeItem.vt = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "V") {
                                        editAttributeItem.v = data.childNodes[0].nodeValue
                                    }
                                }
                            })
                            editAttributeItem.id = id
                            const addObj = Object.assign({}, editAttributeItem)
                            attri.push(addObj)
                            id++
                        }
                    })
                }
            })
            var UUID = ele.getAttribute("UUID")
            var idxEle = state.SAHLProject[state.openProjectIndex].Machine.HWElement.findIndex(data => data.uuid === UUID)
            if (UUID == null || idxEle != -1) {
                UUID = uuid.v1()
            }
            const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
            const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

            this.commit('addElementHWElement', {
                name: Name,
                input: true,
                path: strPath,
                uuid: UUID,
                top: elementY,
                left: elementX,
                zindex: 2,
                category: category,
                attribute: attri,
                icon: "mdi-clipboard-outline",
                validation: false
            })
            state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.HWElement_str })
            EventBus.$emit('add-element', constant.Machines_str)
            EventBus.$emit('add-element', constant.HWElement_str)
        })

        // PROCESS-TO-MACHINE-MAPPING-SET
        var processtoMachine = payload.xmlDoc.getElementsByTagName('PROCESS-TO-MACHINE-MAPPING-SET')
        processtoMachine.forEach(ele => {
                var Name = '',
                    ptmmname = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    machine = null,
                    process = null
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-TO-MACHINE-MAPPINGS") {
                        item.childNodes.forEach((mapping, m) => {
                            if (m % 2 != 0) {
                                mapping.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            ptmmname = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "MACHINE-REF") {
                                            machine = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "PROCESS-REF") {
                                            process = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementProtoMachineMapping', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    ptmmname: ptmmname,
                    ptmmMachine: machine,
                    ptmmProcess: process,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ProcesstoMachineMapping_str })
                EventBus.$emit('add-element', constant.AdaptiveApplication_str)
                EventBus.$emit('add-element', constant.ProcesstoMachineMapping_str)
            })
            // ADAPTIVE-APPLICATION-SW-COMPONENT-TYPE
        var SWComponent = payload.xmlDoc.getElementsByTagName('ADAPTIVE-APPLICATION-SW-COMPONENT-TYPE')
        SWComponent.forEach(ele => {
                var Name = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    pPort = [],
                    rPort = [],
                    prPort = []
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PORTS") {
                        var idP = 0,
                            idR = 0,
                            idPR = 0
                        item.childNodes.forEach((port, p) => {
                            if (p % 2 != 0) {
                                if (port.nodeName == "P-PORT-PROTOTYPE") {
                                    var editPPortItem = { name: '', selectI: null, interface: null, queued: [], field: [], id: '' }
                                    port.childNodes.forEach((data, d) => {
                                        if (d % 2 != 0) {
                                            if (data.nodeName == "SHORT-NAME") {
                                                editPPortItem.name = data.childNodes[0].nodeValue
                                            }
                                            if (data.nodeName == "PROVIDED-INTERFACE-TREF") {
                                                editPPortItem.interface = data.childNodes[0].nodeValue
                                                editPPortItem.selectI = data.getAttribute("DEST")
                                            }
                                            if (data.nodeName == "PROVIDED-COM-SPECS") {
                                                data.childNodes.forEach((pro, r) => {
                                                    if (r % 2 != 0) {
                                                        if (pro.nodeName == "QUEUED-SENDER-COM-SPEC") {
                                                            var editPQSC = { dataE: null, senderCapa: null, id: '' },
                                                                idPQ = 0
                                                            pro.childNodes.forEach((que, q) => {
                                                                if (q % 2 != 0) {
                                                                    if (que.nodeName == "DATA-ELEMENT-REF") {
                                                                        editPQSC.dataE = que.childNodes[0].nodeValue
                                                                    }
                                                                    if (que.nodeName == "SENDER-CAPABILITY") {
                                                                        editPQSC.senderCapa = que.childNodes[0].nodeValue
                                                                    }
                                                                }
                                                            })
                                                            editPQSC.id = idPQ
                                                            const addObj = Object.assign({}, editPQSC)
                                                            editPPortItem.queued.push(addObj)
                                                            idPQ++
                                                        }
                                                        if (pro.nodeName == "FIELD-SENDER-COM-SPEC") {
                                                            var editPFSC = { dataE: null, senderCapa: null, id: '' },
                                                                idPF = 0
                                                            pro.childNodes.forEach((fie, q) => {
                                                                if (q % 2 != 0) {
                                                                    if (fie.nodeName == "DATA-ELEMENT-REF") {
                                                                        editPFSC.dataE = fie.childNodes[0].nodeValue
                                                                    }
                                                                    if (fie.nodeName == "SENDER-CAPABILITY") {
                                                                        editPFSC.senderCapa = fie.childNodes[0].nodeValue
                                                                    }
                                                                }
                                                            })
                                                            editPFSC.id = idPF
                                                            const addObj = Object.assign({}, editPFSC)
                                                            editPPortItem.field.push(addObj)
                                                            idPF++
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                    editPPortItem.id = idP
                                    const addObj = Object.assign({}, editPPortItem)
                                    pPort.push(addObj)
                                    idP++
                                }
                                if (port.nodeName == "PR-PORT-PROTOTYPE") {
                                    var editPRPortItem = { name: '', selectI: null, interface: null, provide: [], id: '' }
                                    port.childNodes.forEach((data, d) => {
                                        if (d % 2 != 0) {
                                            if (data.nodeName == "SHORT-NAME") {
                                                editPRPortItem.name = data.childNodes[0].nodeValue
                                            }
                                            if (data.nodeName == "PROVIDED-REQUIRED-INTERFACE-TREF") {
                                                editPRPortItem.interface = data.childNodes[0].nodeValue
                                                editPRPortItem.selectI = data.getAttribute("DEST")
                                            }
                                            if (data.nodeName == "PROVIDED-COM-SPECS") {
                                                data.childNodes.forEach((pro, r) => {
                                                    if (r % 2 != 0) {
                                                        if (pro.nodeName == "PERSISTENCY-DATA-PROVIDED-COM-SPEC") {
                                                            var editProvide = { dataE: null, id: '' },
                                                                idPRP = 0
                                                            pro.childNodes.forEach((que, q) => {
                                                                if (q % 2 != 0) {
                                                                    if (que.nodeName == "DATA-ELEMENT-REF") {
                                                                        editProvide.dataE = que.childNodes[0].nodeValue
                                                                    }
                                                                }
                                                            })
                                                            editProvide.id = idPRP
                                                            const addObj = Object.assign({}, editProvide)
                                                            editPRPortItem.provide.push(addObj)
                                                            idPRP++
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                    editPRPortItem.id = idPR
                                    const addObj = Object.assign({}, editPRPortItem)
                                    prPort.push(addObj)
                                    idPR++
                                }
                                if (port.nodeName == "R-PORT-PROTOTYPE") {
                                    var editRPortItem = { name: '', selectI: null, interface: null, queued: [], client: [], id: '' }
                                    port.childNodes.forEach((data, d) => {
                                        if (d % 2 != 0) {
                                            if (data.nodeName == "SHORT-NAME") {
                                                editRPortItem.name = data.childNodes[0].nodeValue
                                            }
                                            if (data.nodeName == "REQUIRED-INTERFACE-TREF") {
                                                editRPortItem.interface = data.childNodes[0].nodeValue
                                                editRPortItem.selectI = data.getAttribute("DEST")
                                            }
                                            if (data.nodeName == "REQUIRED-COM-SPECS") {
                                                data.childNodes.forEach((pro, r) => {
                                                    if (r % 2 != 0) {
                                                        if (pro.nodeName == "QUEUED-RECEIVER-COM-SPEC") {
                                                            var editRQRC = { select: null, dataE: null, receiveCapa: null, id: '' },
                                                                idRQ = 0
                                                            pro.childNodes.forEach((que, q) => {
                                                                if (q % 2 != 0) {
                                                                    if (que.nodeName == "DATA-ELEMENT-REF") {
                                                                        editRQRC.dataE = que.childNodes[0].nodeValue
                                                                        editRQRC.select = que.getAttribute("DEST")
                                                                    }
                                                                    if (que.nodeName == "SENDER-CAPABILITY") {
                                                                        editRQRC.receiveCapa = que.childNodes[0].nodeValue
                                                                    }
                                                                }
                                                            })
                                                            editRQRC.id = idRQ
                                                            const addObj = Object.assign({}, editRQRC)
                                                            editRPortItem.queued.push(addObj)
                                                            idRQ++
                                                        }
                                                        if (pro.nodeName == "CLIENT-COM-SPEC") {
                                                            var editRCC = { operation: null, clientCapa: null, id: '' },
                                                                idRC = 0
                                                            pro.childNodes.forEach((cl, q) => {
                                                                if (q % 2 != 0) {
                                                                    if (cl.nodeName == "OPERATION-REF") {
                                                                        editRCC.operation = cl.childNodes[0].nodeValue
                                                                    }
                                                                    if (cl.nodeName == "CLIENT-CAPABILITY") {
                                                                        editRCC.clientCapa = cl.childNodes[0].nodeValue
                                                                    }
                                                                }
                                                            })
                                                            editRCC.id = idRC
                                                            const addObj = Object.assign({}, editRCC)
                                                            editRPortItem.client.push(addObj)
                                                            idRC++
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                    editRPortItem.id = idR
                                    const addObj = Object.assign({}, editRPortItem)
                                    rPort.push(addObj)
                                    idR++
                                }
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementSWComponents', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    pport: pPort,
                    rport: rPort,
                    prport: prPort,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.SWComponents_str })
                EventBus.$emit('add-element', constant.AdaptiveApplication_str)
                EventBus.$emit('add-element', constant.SWComponents_str)
            })
            // PROCESS
        var process = payload.xmlDoc.getElementsByTagName('PROCESS')
        process.forEach(ele => {
                var Name = '',
                    design = null,
                    determin = null,
                    exe = null,
                    proname = '',
                    type = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    config = []
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DESIGN-REF") {
                        design = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DETERMINISTIC-CLIENT-REF") {
                        determin = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "EXECUTABLE-REF") {
                        exe = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-STATE-MACHINE") {
                        item.childNodes.forEach(machine => {
                            if (machine.nodeName == "SHORT-NAME") {
                                proname = machine.childNodes[0].nodeValue
                            }
                            if (machine.nodeName == "TYPE-TREF") {
                                type = machine.childNodes[0].nodeValue
                            }
                        })
                    }
                    if (item.nodeName == "STATE-DEPENDENT-STARTUP-CONFIGS") {
                        var idS = 0,
                            idF = 0,
                            idE = 0
                        item.childNodes.forEach((state, s) => {
                            var editItem = { exection: [], functionItem: [], resourceRef: null, startupConfigRef: null, id: '' }
                            if (s % 2 != 0) {
                                state.childNodes.forEach((con, c) => {
                                    if (c % 2 != 0) {
                                        if (con.nodeName == "RESOURCE-GROUP-REF") {
                                            editItem.resourceRef = con.childNodes[0].nodeValue
                                        }
                                        if (con.nodeName == "STARTUP-CONFIG-REF") {
                                            editItem.startupConfigRef = con.childNodes[0].nodeValue
                                        }
                                        if (con.nodeName == "FUNCTION-GROUP-STATE-IREFS") {
                                            con.childNodes.forEach((iref, i) => {
                                                var editFunctionGItem = { contextMode: null, targetMode: null, id: '' }
                                                if (i % 2 != 0) {
                                                    iref.childNodes.forEach((data, d) => {
                                                        if (d % 2 != 0) {
                                                            if (data.nodeName == "CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF") {
                                                                editFunctionGItem.contextMode = data.childNodes[0].nodeValue
                                                            }
                                                            if (data.nodeName == "TARGET-MODE-DECLARATION-REF") {
                                                                editFunctionGItem.targetMode = data.childNodes[0].nodeValue
                                                            }
                                                        }
                                                    })
                                                    editFunctionGItem.id = idF
                                                    const addObj = Object.assign({}, editFunctionGItem)
                                                    editItem.functionItem.push(addObj)
                                                    idF++
                                                }
                                            })
                                        }
                                        if (con.nodeName == "EXECUTION-DEPENDENCYS") {
                                            con.childNodes.forEach((eds, i) => {
                                                if (i % 2 != 0) {
                                                    eds.childNodes.forEach((ed, e) => {
                                                        var editExecutionDItem = { contextMode: null, targetMode: null, id: '' }
                                                        if (e % 2 != 0) {
                                                            ed.childNodes.forEach((data, d) => {
                                                                if (d % 2 != 0) {
                                                                    if (data.nodeName == "CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF") {
                                                                        editExecutionDItem.contextMode = data.childNodes[0].nodeValue
                                                                    }
                                                                    if (data.nodeName == "TARGET-MODE-DECLARATION-REF") {
                                                                        editExecutionDItem.targetMode = data.childNodes[0].nodeValue
                                                                    }
                                                                }
                                                            })
                                                            editExecutionDItem.id = idE
                                                            const addObj = Object.assign({}, editExecutionDItem)
                                                            editItem.exection.push(addObj)
                                                            idE++
                                                        }
                                                    })
                                                }
                                            })
                                        }

                                    }
                                })
                                editItem.id = idS
                                const addObj = Object.assign({}, editItem)
                                config.push(addObj)
                                idS++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementProcess', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    prodesign: design,
                    determin: determin,
                    execut: exe,
                    machinname: proname,
                    machinetype: type,
                    dependent: config
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.Process_str })
                EventBus.$emit('add-element', constant.AdaptiveApplication_str)
                EventBus.$emit('add-element', constant.Process_str)
            })
            // PROCESS-DESIGN
        var processDesign = payload.xmlDoc.getElementsByTagName('PROCESS-DESIGN')
        processDesign.forEach(ele => {
                var Name = '',
                    determininistic = [],
                    exe = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "EXECUTABLE-REF") {
                        exe = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DETERMINISTIC-CLIENT-RESOURCE-NEEDSS") {
                        item.childNodes.forEach((need, n) => {
                            var editItem = {
                                swname: '',
                                hardwareP: '',
                                initnofinstruction: '',
                                initsequentialbegin: '',
                                initsequentialend: '',
                                initspeedup: '',
                                runnofinstruction: '',
                                runsequentialbegin: '',
                                runsequentialend: '',
                                runspeedup: ''
                            }
                            if (n % 2 != 0) {
                                need.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.swname = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "HARDWARE-PLATFORM") {
                                            editItem.hardwareP = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "INIT-RESOURCE") {
                                            data.childNodes.forEach((init, i) => {
                                                if (i % 2 != 0) {
                                                    if (init.nodeName == "NUMBER-OF-INSTRUCTIONS") {
                                                        editItem.initnofinstruction = init.childNodes[0].nodeValue
                                                    }
                                                    if (init.nodeName == "SEQUENTIAL-INSTRUCTIONS-BEGIN") {
                                                        editItem.initsequentialbegin = init.childNodes[0].nodeValue
                                                    }
                                                    if (init.nodeName == "SEQUENTIAL-INSTRUCTIONS-END") {
                                                        editItem.initsequentialend = init.childNodes[0].nodeValue
                                                    }
                                                    if (init.nodeName == "SPEEDUP") {
                                                        editItem.initspeedup = init.childNodes[0].nodeValue
                                                    }
                                                }
                                            })
                                        }
                                        if (data.nodeName == "RUN-RESOURCE") {
                                            data.childNodes.forEach((run, r) => {
                                                if (r % 2 != 0) {
                                                    if (run.nodeName == "NUMBER-OF-INSTRUCTIONS") {
                                                        editItem.runnofinstruction = run.childNodes[0].nodeValue
                                                    }
                                                    if (run.nodeName == "SEQUENTIAL-INSTRUCTIONS-BEGIN") {
                                                        editItem.runsequentialbegin = run.childNodes[0].nodeValue
                                                    }
                                                    if (run.nodeName == "SEQUENTIAL-INSTRUCTIONS-END") {
                                                        editItem.runsequentialend = run.childNodes[0].nodeValue
                                                    }
                                                    if (run.nodeName == "SPEEDUP") {
                                                        editItem.runspeedup = run.childNodes[0].nodeValue
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                                const addObj = Object.assign({}, editItem)
                                determininistic.push(addObj)
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))


                this.commit('addElementProcessDesign', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    executableref: exe,
                    determin: determininistic
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ProcessDesign_str })
                EventBus.$emit('add-element', constant.AdaptiveApplication_str)
                EventBus.$emit('add-element', constant.ProcessDesign_str)
            })
            // EXECUTABLE
        var executable = payload.xmlDoc.getElementsByTagName('EXECUTABLE')
        executable.forEach(ele => {
                var Name = '',
                    version = '',
                    category = '',
                    log = null,
                    build = null,
                    report = null,
                    swname = '',
                    appli = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "CATEGORY") {
                        category = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "BUILD-TYPE") {
                        build = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "LOGGING-BEHAVIOR") {
                        log = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REPORTING-BEHAVIOR") {
                        report = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "VERSION") {
                        version = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ROOT-SW-COMPONENT-PROTOTYPE") {
                        item.childNodes.forEach((data, d) => {
                            if (d % 2 != 0) {
                                if (data.nodeName == "SHORT-NAME") {
                                    swname = data.childNodes[0].nodeValue
                                }
                                if (data.nodeName == "APPLICATION-TYPE-TREF") {
                                    appli = data.childNodes[0].nodeValue
                                }
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementExecutable', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    version: version,
                    category: category,
                    buildType: build,
                    loggingBehabior: log,
                    reportingBehabior: report,
                    swname: swname,
                    applicationtyperef: appli,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.Executable_str })
                EventBus.$emit('add-element', constant.AdaptiveApplication_str)
                EventBus.$emit('add-element', constant.Executable_str)
            })
            // STARTUP-CONFIG-SET
        var startup = payload.xmlDoc.getElementsByTagName('STARTUP-CONFIG-SET')
        startup.forEach(ele => {
                var Name = '',
                    config = [],
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "STARTUP-CONFIGS") {
                        var idS = 0,
                            idO = 0
                        item.childNodes.forEach((eve, e) => {
                            var editItem = { configname: '', policy: null, priority: '', entertimeout: '', exittimeout: '', option: [], id: '' }
                            if (e % 2 != 0) {
                                eve.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.configname = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SCHEDULING-POLICY") {
                                            editItem.policy = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SCHEDULING-PRIORITY") {
                                            editItem.priority = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "TIMEOUT") {
                                            data.childNodes.forEach(time => {
                                                if (time.nodeName == "ENTER-TIMEOUT-VALUE") {
                                                    editItem.entertimeout = time.childNodes[0].nodeValue
                                                }
                                                if (time.nodeName == "EXIT-TIMEOUT-VALUE") {
                                                    editItem.exittimeout = time.childNodes[0].nodeValue
                                                }
                                            })
                                        }
                                        if (data.nodeName == "STARTUP-OPTIONS") {
                                            data.childNodes.forEach((ops, v) => {
                                                var editOption = { arg: '', kind: null, id: '' }
                                                if (v % 2 != 0) {
                                                    ops.childNodes.forEach(op => {
                                                        if (op.nodeName == "OPTION-ARGUMENT") {
                                                            editOption.arg = op.childNodes[0].nodeValue
                                                        }
                                                        if (op.nodeName == "OPTION-KIND") {
                                                            editOption.kind = op.childNodes[0].nodeValue
                                                        }
                                                    })
                                                    editOption.id = idO
                                                    const addObjObj = Object.assign({}, editOption)
                                                    editItem.option.push(addObjObj)
                                                    idO++
                                                }
                                            })
                                        }
                                    }
                                })
                                editItem.id = idS
                                const addObj = Object.assign({}, editItem)
                                config.push(addObj)
                                idS++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementStartupConfig', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    config: config,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.StartupConfig_str })
                EventBus.$emit('add-element', constant.AdaptiveApplication_str)
                EventBus.$emit('add-element', constant.StartupConfig_str)
            })
            // DETERMINISTIC-CLIENT
        var deterministic = payload.xmlDoc.getElementsByTagName('DETERMINISTIC-CLIENT')
        deterministic.forEach(ele => {
                var Name = '',
                    cycle = '',
                    number = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "CYCLE-TIME-VALUE") {
                        cycle = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "NUMBER-OF-WORKERS") {
                        number = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementDeterministicClien', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    cycletiem: cycle,
                    numofworkers: number,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.DeterministicClient_str })
                EventBus.$emit('add-element', constant.AdaptiveApplication_str)
                EventBus.$emit('add-element', constant.DeterministicClient_str)
            })
            // SOMEIP-SERVICE-INTERFACE-DEPLOYMENT
        var someIPService = payload.xmlDoc.getElementsByTagName('SOMEIP-SERVICE-INTERFACE-DEPLOYMENT')
        someIPService.forEach(ele => {
                var Name = '',
                    service = null,
                    majversion = '',
                    minversion = '',
                    id = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    eventG = [],
                    eventD = [],
                    methodD = [],
                    fieldD = []

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "EVENT-DEPLOYMENTS") {
                        var idE = 0
                        item.childNodes.forEach((eve, e) => {
                            var editEventD = { name: '', event: null, idG: '', maxlength: '', time: '', serializer: null, protocal: null, id: '' }
                            if (e % 2 != 0) {
                                eve.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editEventD.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "EVENT-REF") {
                                            editEventD.event = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "EVENT-ID") {
                                            editEventD.idG = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "MAXIMUM-SEGMENT-LENGTH") {
                                            editEventD.maxlength = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "EVENT") {
                                            editEventD.time = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SEPARATION-TIME") {
                                            editEventD.serializer = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "TRANSPORT-PROTOCOL") {
                                            editEventD.protocal = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editEventD.id = idE
                                const addObj = Object.assign({}, editEventD)
                                eventD.push(addObj)
                                idE++
                            }
                        })
                    }
                    if (item.nodeName == "SERVICE-INTERFACE-REF") {
                        service = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "EVENT-GROUPS") {
                        var idEG = 0,
                            idTE = 0
                        item.childNodes.forEach((eve, e) => {
                            var editItem = { name: '', idG: '', event: [], id: '' }
                            if (e % 2 != 0) {
                                eve.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "EVENT-GROUP-ID") {
                                            editItem.idG = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "EVENT-REFS") {
                                            data.childNodes.forEach((eventref, v) => {
                                                var editEvent = { event: null, id: '' }
                                                if (v % 2 != 0) {
                                                    if (eventref.nodeName == "EVENT-REF") {
                                                        editEvent.event = eventref.childNodes[0].nodeValue
                                                        editEvent.id = idEG
                                                        const addObjObj = Object.assign({}, editEvent)
                                                        editItem.event.push(addObjObj)
                                                        idEG++
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                                editItem.id = idTE
                                const addObj = Object.assign({}, editItem)
                                eventG.push(addObj)
                                idTE++
                            }
                        })
                    }
                    if (item.nodeName == "SERVICE-INTERFACE-ID") {
                        id = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INTERFACE-VERSION") {
                        item.childNodes.forEach((data, d) => {
                            if (d % 2 != 0) {
                                if (data.nodeName == "MAJOR-VERSION") {
                                    majversion = data.childNodes[0].nodeValue
                                }
                                if (data.nodeName == "MINOR-VERSION") {
                                    minversion = data.childNodes[0].nodeValue
                                }
                            }
                        })
                    }
                    if (item.nodeName == "FIELD-DEPLOYMENTS") {
                        var idF = 0
                        item.childNodes.forEach((fie, f) => {
                            var editItem = {
                                name: '',
                                field: null,
                                getname: '',
                                getid: '',
                                getmaxreq: '',
                                getmaxres: '',
                                gettimereq: '',
                                gettimeres: '',
                                getproto: null,
                                setname: '',
                                setid: '',
                                setmaxreq: '',
                                setmaxres: '',
                                settimereq: '',
                                settimeres: '',
                                setproto: null,
                                notname: '',
                                notid: '',
                                notmax: '',
                                nottime: '',
                                notserial: null,
                                notproto: null,
                                id: ''
                            }
                            if (f % 2 != 0) {
                                fie.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "FIELD-REF") {
                                            editItem.field = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "GET") {
                                            data.childNodes.forEach((getfield, g) => {
                                                if (g % 2 != 0) {
                                                    if (getfield.nodeName == "SHORT-NAME") {
                                                        editItem.getname = getfield.childNodes[0].nodeValue
                                                    }
                                                    if (getfield.nodeName == "METHOD-ID") {
                                                        editItem.getid = getfield.childNodes[0].nodeValue
                                                    }
                                                    if (getfield.nodeName == "MAXIMUM-SEGMENT-LENGTH-REQUEST") {
                                                        editItem.getmaxreq = getfield.childNodes[0].nodeValue
                                                    }
                                                    if (getfield.nodeName == "MAXIMUM-SEGMENT-LENGTH-RESPONSE") {
                                                        editItem.getmaxres = getfield.childNodes[0].nodeValue
                                                    }
                                                    if (getfield.nodeName == "SEPARATION-TIME-REQUEST") {
                                                        editItem.gettimereq = getfield.childNodes[0].nodeValue
                                                    }
                                                    if (getfield.nodeName == "SEPARATION-TIME-RESPONSE") {
                                                        editItem.gettimeres = getfield.childNodes[0].nodeValue
                                                    }
                                                    if (getfield.nodeName == "TRANSPORT-PROTOCOL") {
                                                        editItem.getproto = getfield.childNodes[0].nodeValue
                                                    }
                                                }
                                            })
                                        }
                                        if (data.nodeName == "SET") {
                                            data.childNodes.forEach((setfield, s) => {
                                                if (s % 2 != 0) {
                                                    if (setfield.nodeName == "SHORT-NAME") {
                                                        editItem.setname = setfield.childNodes[0].nodeValue
                                                    }
                                                    if (setfield.nodeName == "METHOD-ID") {
                                                        editItem.setid = setfield.childNodes[0].nodeValue
                                                    }
                                                    if (setfield.nodeName == "MAXIMUM-SEGMENT-LENGTH-REQUEST") {
                                                        editItem.setmaxreq = setfield.childNodes[0].nodeValue
                                                    }
                                                    if (setfield.nodeName == "MAXIMUM-SEGMENT-LENGTH-RESPONSE") {
                                                        editItem.setmaxres = setfield.childNodes[0].nodeValue
                                                    }
                                                    if (setfield.nodeName == "SEPARATION-TIME-REQUEST") {
                                                        editItem.settimereq = setfield.childNodes[0].nodeValue
                                                    }
                                                    if (setfield.nodeName == "SEPARATION-TIME-RESPONSE") {
                                                        editItem.settimeres = setfield.childNodes[0].nodeValue
                                                    }
                                                    if (setfield.nodeName == "TRANSPORT-PROTOCOL") {
                                                        editItem.setproto = setfield.childNodes[0].nodeValue
                                                    }
                                                }
                                            })
                                        }
                                        if (data.nodeName == "NOTIFIER") {
                                            data.childNodes.forEach((noti, n) => {
                                                if (n % 2 != 0) {
                                                    if (noti.nodeName == "SHORT-NAME") {
                                                        editItem.notname = noti.childNodes[0].nodeValue
                                                    }
                                                    if (noti.nodeName == "EVENT-ID") {
                                                        editItem.notid = noti.childNodes[0].nodeValue
                                                    }
                                                    if (noti.nodeName == "MAXIMUM-SEGMENT-LENGTH") {
                                                        editItem.notmax = noti.childNodes[0].nodeValue
                                                    }
                                                    if (noti.nodeName == "SEPARATION-TIME") {
                                                        editItem.nottime = noti.childNodes[0].nodeValue
                                                    }
                                                    if (noti.nodeName == "SERIALIZER") {
                                                        editItem.notserial = noti.childNodes[0].nodeValue
                                                    }
                                                    if (noti.nodeName == "TRANSPORT-PROTOCOL") {
                                                        editItem.notproto = noti.childNodes[0].nodeValue
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                                editItem.id = idF
                                const addObj = Object.assign({}, editItem)
                                fieldD.push(addObj)
                                idF++
                            }
                        })
                    }
                    if (item.nodeName == "METHOD-DEPLOYMENTS") {
                        var idM = 0
                        item.childNodes.forEach((met, m) => {
                            var editMethodD = { name: '', method: null, idM: '', maxrequest: '', maxresponse: '', timerequest: '', timeresponse: '', protocal: null, id: '' }
                            if (m % 2 != 0) {
                                met.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editMethodD.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "METHOD-REF") {
                                            editMethodD.method = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "METHOD-ID") {
                                            editMethodD.idM = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "MAXIMUM-SEGMENT-LENGTH-REQUEST") {
                                            editMethodD.maxrequest = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "MAXIMUM-SEGMENT-LENGTH-RESPONSE") {
                                            editMethodD.maxresponse = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SEPARATION-TIME-REQUEST") {
                                            editMethodD.timerequest = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SEPARATION-TIME-RESPONSE") {
                                            editMethodD.timeresponse = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "TRANSPORT-PROTOCOL") {
                                            editMethodD.protocal = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editMethodD.id = idM
                                const addObj = Object.assign({}, editMethodD)
                                methodD.push(addObj)
                                idM++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementSomeIPService', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    service: service,
                    majversion: majversion,
                    minversion: minversion,
                    id: id,
                    eventG: eventG,
                    eventD: eventD,
                    methodD: methodD,
                    fieldD: fieldD,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.SomeIPServiceInterfaceDeployment_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.ServiceInterfaces_str)
                EventBus.$emit('add-element', constant.SomeIPServiceInterfaceDeployment_str)
            })
            // SERVICE-INTERFACE
        var serviceInterface = payload.xmlDoc.getElementsByTagName('SERVICE-INTERFACE')
        serviceInterface.forEach(ele => {
                var Name = '',
                    id = 0,
                    max = '',
                    min = '',
                    namespace = '',
                    isservice = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    events = [],
                    fields = [],
                    methods = []
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "NAMESPACES") {
                        item.childNodes.forEach((symbol, s) => {
                            if (s % 2 != 0) {
                                symbol.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        namespace += data.childNodes[0].nodeValue
                                        namespace += '/'
                                    }
                                })
                                namespace = namespace.substr(0, namespace.length - 1)
                                namespace += ','
                            }
                        })
                    }
                    if (item.nodeName == "IS-SERVICE") {
                        isservice = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MAJOR-VERSION") {
                        max = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MINOR-VERSION") {
                        min = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "EVENTS") {
                        id = 0
                        item.childNodes.forEach((eve, e) => {
                            var editEvent = { name: '', type: null, id: '' }
                            if (e % 2 != 0) {
                                eve.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editEvent.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "TYPE-TREF") {
                                            editEvent.type = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editEvent.id = id
                                const addObj = Object.assign({}, editEvent)
                                events.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "FIELDS") {
                        id = 0
                        item.childNodes.forEach((fie, f) => {
                            var editField = { name: '', type: null, getter: null, setter: null, notifier: null, id: '' }
                            if (f % 2 != 0) {
                                fie.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editField.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "TYPE-TREF") {
                                            editField.type = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "HAS-GETTER") {
                                            editField.getter = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "HAS-SETTER") {
                                            editField.setter = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "HAS-NOTIFIER") {
                                            editField.notifier = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editField.id = id
                                const addObj = Object.assign({}, editField)
                                fields.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "METHODS") {
                        var idA = 0,
                            idE = 0,
                            idES = 0
                        id = 0
                        item.childNodes.forEach((met, m) => {
                            var editedItem = { name: '', fireforget: null, argument: [], errorSet: [], error: [], descrip: '', id: '' }
                            if (m % 2 != 0) {
                                met.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editedItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "ARGUMENTS") {
                                            data.childNodes.forEach((arg, a) => {
                                                var editArgItem = { name: '', type: null, dir: null, descrip: '', id: '' }
                                                if (a % 2 != 0) {
                                                    arg.childNodes.forEach(proto => {
                                                        if (proto.nodeName == "SHORT-NAME") {
                                                            editArgItem.name = proto.childNodes[0].nodeValue
                                                        }
                                                        if (proto.nodeName == "TYPE-TREF") {
                                                            editArgItem.type = proto.childNodes[0].nodeValue
                                                        }
                                                        if (proto.nodeName == "DIRECTION") {
                                                            editArgItem.dir = proto.childNodes[0].nodeValue
                                                        }
                                                        if (proto.nodeName == "DESC") {
                                                            editArgItem.descrip = proto.childNodes[1].childNodes[0].nodeValue
                                                        }
                                                    })
                                                    editArgItem.id = idA
                                                    const addObj = Object.assign({}, editArgItem)
                                                    editedItem.argument.push(addObj)
                                                    idA++
                                                }
                                            })
                                        }
                                        if (data.nodeName == "FIRE-AND-FORGET") {
                                            editedItem.fireforget = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "POSSIBLE-AP-ERROR-SET-REFS") {
                                            data.childNodes.forEach((err, e) => {
                                                var editErrorSetItem = { error: null, id: '' }
                                                if (e % 2 != 0) {
                                                    if (err.nodeName == "POSSIBLE-AP-ERROR-SET-REF") {
                                                        editErrorSetItem.error = err.childNodes[0].nodeValue
                                                        editErrorSetItem.id = idES
                                                        const addObj = Object.assign({}, editErrorSetItem)
                                                        editedItem.errorSet.push(addObj)
                                                        idES++
                                                    }
                                                }
                                            })
                                        }
                                        if (data.nodeName == "POSSIBLE-AP-ERROR-REFS") {
                                            data.childNodes.forEach((err, e) => {
                                                var editErrorItem = { error: null, id: '' }
                                                if (e % 2 != 0) {
                                                    if (err.nodeName == "POSSIBLE-AP-ERROR-REF") {
                                                        editErrorItem.error = err.childNodes[0].nodeValue
                                                        editErrorItem.id = idE
                                                        const addObj = Object.assign({}, editErrorItem)
                                                        editedItem.error.push(addObj)
                                                        idE++
                                                    }
                                                }
                                            })
                                        }
                                        if (data.nodeName == "DESC") {
                                            editedItem.descrip = data.childNodes[1].childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editedItem.id = id
                                const addObj = Object.assign({}, editedItem)
                                methods.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementService', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    versionMaj: max,
                    versionMin: min,
                    namespace: namespace,
                    isservice: isservice,
                    events: events,
                    fields: fields,
                    methods: methods
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ServiceInterface_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.ServiceInterfaces_str)
                EventBus.$emit('add-element', constant.ServiceInterface_str)
            })
            // SOMEIP-SD-CLIENT-EVENT-GROUP-TIMING-CONFIG
        var client = payload.xmlDoc.getElementsByTagName('SOMEIP-SD-CLIENT-EVENT-GROUP-TIMING-CONFIG')
        client.forEach(ele => {
                var Name = '',
                    max = '',
                    min = '',
                    time = '',
                    retryD = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    retryM = ''
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SUBSCRIBE-EVENTGROUP-RETRY-DELAY") {
                        retryD = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SUBSCRIBE-EVENTGROUP-RETRY-MAX") {
                        retryM = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "TIME-TO-LIVE") {
                        time = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REQUEST-RESPONSE-DELAY") {
                        item.childNodes.forEach(data => {
                            if (data.nodeName == "MAX-VALUE") {
                                max = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "MIN-VALUE") {
                                min = data.childNodes[0].nodeValue
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementClient', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    delay: retryD,
                    max: retryM,
                    timetolive: time,
                    delaymax: max,
                    delaymin: min,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.Client_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.SomeIPEvents_str)
                EventBus.$emit('add-element', constant.Client_str)
            })
            // SOMEIP-SD-SERVER-EVENT-GROUP-TIMING-CONFIG
        var server = payload.xmlDoc.getElementsByTagName('SOMEIP-SD-SERVER-EVENT-GROUP-TIMING-CONFIG')
        server.forEach(ele => {
                var Name = '',
                    max = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    min = ''
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REQUEST-RESPONSE-DELAY") {
                        item.childNodes.forEach(data => {
                            if (data.nodeName == "MAX-VALUE") {
                                max = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "MIN-VALUE") {
                                min = data.childNodes[0].nodeValue
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementServer', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    delaymax: max,
                    delaymin: min,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.Server_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.SomeIPEvents_str)
                EventBus.$emit('add-element', constant.Server_str)
            })
            // SOMEIP-SD-CLIENT-SERVICE-INSTANCE-CONFIG
        var someIPClient = payload.xmlDoc.getElementsByTagName('SOMEIP-SD-CLIENT-SERVICE-INSTANCE-CONFIG')
        someIPClient.forEach(ele => {
                var Name = '',
                    time = '',
                    delayMax = '',
                    delayMin = '',
                    delay = '',
                    max = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-FIND-TIME-TO-LIVE") {
                        time = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "INITIAL-FIND-BEHAVIOR") {
                        item.childNodes.forEach(data => {
                            if (data.nodeName == "INITIAL-DELAY-MAX-VALUE") {
                                delayMax = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "INITIAL-DELAY-MIN-VALUE") {
                                delayMin = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "INITIAL-REPETITIONS-BASE-DELAY") {
                                delay = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "INITIAL-REPETITIONS-MAX") {
                                max = data.childNodes[0].nodeValue
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementSomeIPClient', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    findtime: time,
                    inidelaymax: delayMax,
                    inidelaymin: delayMin,
                    inibasedelay: delay,
                    inirepetimax: max,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.SomeIPClient_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.ServiceInstances_str)
                EventBus.$emit('add-element', constant.SomeIPClient_str)
            })
            // SOMEIP-SD-SERVER-SERVICE-INSTANCE-CONFIG
        var someIPServer = payload.xmlDoc.getElementsByTagName('SOMEIP-SD-SERVER-SERVICE-INSTANCE-CONFIG')
        someIPServer.forEach(ele => {
                var Name = '',
                    time = '',
                    delayMax = '',
                    delayMin = '',
                    delay = '',
                    max = '',
                    cyclic = '',
                    maxvalue = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    minvalue = ''
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "INITIAL-OFFER-BEHAVIOR") {
                        item.childNodes.forEach(data => {
                            if (data.nodeName == "INITIAL-DELAY-MAX-VALUE") {
                                delayMax = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "INITIAL-DELAY-MIN-VALUE") {
                                delayMin = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "INITIAL-REPETITIONS-BASE-DELAY") {
                                delay = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "INITIAL-REPETITIONS-MAX") {
                                max = data.childNodes[0].nodeValue
                            }
                        })
                    }
                    if (item.nodeName == "OFFER-CYCLIC-DELAY") {
                        cyclic = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REQUEST-RESPONSE-DELAY") {
                        item.childNodes.forEach(data => {
                            if (data.nodeName == "MAX-VALUE") {
                                maxvalue = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "MIN-VALUE") {
                                minvalue = data.childNodes[0].nodeValue
                            }
                        })
                    }
                    if (item.nodeName == "SERVICE-OFFER-TIME-TO-LIVE") {
                        time = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementSomeIPServer', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    inidelaymax: delayMax,
                    inidelaymin: delayMin,
                    inibasedelay: delay,
                    inirepetimax: max,
                    delaymax: maxvalue,
                    delaymin: minvalue,
                    offer: cyclic,
                    tiemtolive: time,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.SomeIPServer_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.ServiceInstances_str)
                EventBus.$emit('add-element', constant.SomeIPServer_str)
            })
            // SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING
        var someIPtoMachine = payload.xmlDoc.getElementsByTagName('SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING')
        someIPtoMachine.forEach(ele => {
                var Name = '',
                    connect = null,
                    serviceI = [],
                    udp = '',
                    tcp = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "COMMUNICATION-CONNECTOR-REF") {
                        connect = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INSTANCE-REFS") {
                        var id = 0
                        item.childNodes.forEach(data => {
                            var editItem = { ref: '', service: null, id: '' }
                            if (data.nodeName == "SERVICE-INSTANCE-REF") {
                                editItem.ref = data.getAttribute("DEST")
                                editItem.service = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                serviceI.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "UDP-PORT") {
                        udp = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "TCP-PORT") {
                        tcp = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementSomeIPtoMachine', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    ccref: connect,
                    udp: udp,
                    tcp: tcp,
                    serviceI: serviceI,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.SomeIPToMachineMapping_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.ServiceInstances_str)
                EventBus.$emit('add-element', constant.SomeIPToMachineMapping_str)
            })
            // SERVICE-INSTANCE-TO-PORT-PROTOTYPE-MAPPING
        var toProtProto = payload.xmlDoc.getElementsByTagName('SERVICE-INSTANCE-TO-PORT-PROTOTYPE-MAPPING')
        toProtProto.forEach(ele => {
                var Name = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    selectPort = null,
                    porttype = null,
                    process = null,
                    selectServiceIns = null,
                    serviceIns = null

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PORT-PROTOTYPE-IREF") {
                        selectPort = item.childNodes[1].getAttribute("DEST")
                        porttype = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-REF") {
                        process = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INSTANCE-REF") {
                        selectServiceIns = item.getAttribute("DEST")
                        serviceIns = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementToPortPrototype', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    selectPort: selectPort,
                    porttype: porttype,
                    process: process,
                    selectServiceIns: selectServiceIns,
                    serviceIns: serviceIns,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ToPortPrototypeMapping_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.ServiceInstances_str)
                EventBus.$emit('add-element', constant.ToPortPrototypeMapping_str)
            })
            // REQUIRED-SOMEIP-SERVICE-INSTANCE
        var required = payload.xmlDoc.getElementsByTagName('REQUIRED-SOMEIP-SERVICE-INSTANCE')
        required.forEach(ele => {
                var Name = '',
                    deployref = null,
                    minorver = '',
                    id = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    clientref = null,
                    ver = null,
                    methodP = [],
                    requiredevent = []
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INTERFACE-DEPLOYMENT-REF") {
                        deployref = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REQUIRED-MINOR-VERSION") {
                        minorver = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REQUIRED-SERVICE-INSTANCE-ID") {
                        id = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SD-CLIENT-CONFIG-REF") {
                        clientref = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "VERSION-DRIVEN-FIND-BEHAVIOR") {
                        ver = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "METHOD-REQUEST-PROPSS") {
                        var id = 0
                        item.childNodes.forEach((prop, p) => {
                            var editMethodItem = { method: null, id: '' }
                            if (p % 2 != 0) {
                                prop.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "METHOD-REF") {
                                            editMethodItem.method = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editMethodItem.id = id
                                const addObj = Object.assign({}, editMethodItem)
                                methodP.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "REQUIRED-EVENT-GROUPS") {
                        var idEG = 0
                        item.childNodes.forEach((group, g) => {
                            var editItem = { name: '', eventG: null, client: null, id: '' }
                            if (g % 2 != 0) {
                                group.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "EVENT-GROUP-REF") {
                                            editItem.eventG = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SD-CLIENT-EVENT-GROUP-TIMING-CONFIG-REF") {
                                            editItem.client = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = idEG
                                const addObj = Object.assign({}, editItem)
                                requiredevent.push(addObj)
                                idEG++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementRequiredSomeIP', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    deployref: deployref,
                    minover: minorver,
                    id: id,
                    clientref: clientref,
                    ver: ver,
                    method: methodP,
                    requiredevent: requiredevent
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.RequiredSomeIP_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.ServiceInstances_str)
                EventBus.$emit('add-element', constant.RequiredSomeIP_str)
            })
            // PROVIDED-SOMEIP-SERVICE-INSTANCE
        var provided = payload.xmlDoc.getElementsByTagName('PROVIDED-SOMEIP-SERVICE-INSTANCE')
        provided.forEach(ele => {
                var Name = '',
                    deployref = null,
                    someips = null,
                    id = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    eventP = [],
                    method = [],
                    eventG = []

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INTERFACE-DEPLOYMENT-REF") {
                        deployref = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SD-SERVER-CONFIG-REF") {
                        someips = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INSTANCE-ID") {
                        id = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "EVENT-PROPSS") {
                        var idE = 0
                        item.childNodes.forEach((prop, p) => {
                            var editItem = { event: null, id: '' }
                            if (p % 2 != 0) {
                                prop.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "EVENT-REF") {
                                            editItem.event = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = idE
                                const addObj = Object.assign({}, editItem)
                                eventP.push(addObj)
                                idE++
                            }
                        })
                    }
                    if (item.nodeName == "METHOD-RESPONSE-PROPSS") {
                        var idM = 0
                        item.childNodes.forEach((prop, p) => {
                            var editMethodItem = { method: null, id: '' }
                            if (p % 2 != 0) {
                                prop.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "METHOD-REF") {
                                            editMethodItem.method = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editMethodItem.id = idM
                                const addObj = Object.assign({}, editMethodItem)
                                method.push(addObj)
                                idM++
                            }
                        })
                    }
                    if (item.nodeName == "PROVIDED-EVENT-GROUPS") {
                        var idEG = 0
                        item.childNodes.forEach((group, g) => {
                            var editItem = { name: '', eventG: null, udp: '', ipv4: '', ipv6: '', threshold: '', server: null, id: '' }
                            if (g % 2 != 0) {
                                group.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "EVENT-GROUP-REF") {
                                            editItem.eventG = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "EVENT-MULTICAST-UDP-PORT") {
                                            editItem.udp = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "IPV-4-MULTICAST-IP-ADDRESS") {
                                            editItem.ipv4 = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "IPV-6-MULTICAST-IP-ADDRESS") {
                                            editItem.ipv6 = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "MULTICAST-THRESHOLD") {
                                            editItem.threshold = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SD-SERVER-EVENT-GROUP-TIMING-CONFIG-REF") {
                                            editItem.server = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = idEG
                                const addObj = Object.assign({}, editItem)
                                eventG.push(addObj)
                                idEG++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementProvidedSomeIP', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    deployref: deployref,
                    someips: someips,
                    id: id,
                    eventP: eventP,
                    method: method,
                    eventG: eventG
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ProvidedSomeIP_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.ServiceInstances_str)
                EventBus.$emit('add-element', constant.ProvidedSomeIP_str)
            })
            // AP-APPLICATION-ERROR
        var error = payload.xmlDoc.getElementsByTagName('AP-APPLICATION-ERROR')
        error.forEach(ele => {
                var Name = '',
                    desc = '',
                    code = '',
                    domain = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DESC") {
                        desc = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ERROR-CODE") {
                        code = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ERROR-DOMAIN-REF") {
                        domain = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000)) // (max - min) + min
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementError', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    desc: desc,
                    errorcode: code,
                    errorDref: domain
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.Error_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.Errors_str)
                EventBus.$emit('add-element', constant.Error_str)
            })
            // AP-APPLICATION-ERROR-SET
        var errorSet = payload.xmlDoc.getElementsByTagName('AP-APPLICATION-ERROR-SET')
        errorSet.forEach(ele => {
                var Name = '',
                    id = 0,
                    errorref = [],
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "AP-APPLICATION-ERROR-REFS") {
                        item.childNodes.forEach(data => {
                            var editItem = { error: null, id: '' }
                            if (data.nodeName == "AP-APPLICATION-ERROR-REF") {
                                editItem.error = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                errorref.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementErrorSet', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    errorref: errorref
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.Errorset_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.Errors_str)
                EventBus.$emit('add-element', constant.Errorset_str)
            })
            // AP-APPLICATION-ERROR-DOMAIN
        var errorDomain = payload.xmlDoc.getElementsByTagName('AP-APPLICATION-ERROR-DOMAIN')
        errorDomain.forEach(ele => {
                var Name = '',
                    namespace = '',
                    value = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "NAMESPACES") {
                        item.childNodes.forEach((symbol, s) => {
                            if (s % 2 != 0) {
                                symbol.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        namespace += data.childNodes[0].nodeValue
                                        namespace += '/'
                                    }
                                })
                                namespace = namespace.substr(0, namespace.length - 1)
                                namespace += ','
                            }
                        })
                    }
                    if (item.nodeName == "VALUE") {
                        value = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementErrorDomain', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    namespace: namespace,
                    value: value,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ErrorDomain_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.Errors_str)
                EventBus.$emit('add-element', constant.ErrorDomain_str)
            })
            // PERSISTENCY-FILE-ARRAY
        var perFileArray = payload.xmlDoc.getElementsByTagName('PERSISTENCY-FILE-ARRAY')
        perFileArray.forEach(ele => {
                var Name = '',
                    id = 0,
                    sdgs = [],
                    maxsize = '',
                    minisize = '',
                    updateS = null,
                    files = [],
                    uri = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ADMIN-DATA") {
                        id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { sdg: '', sd: '', port: null, id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SDG" && data.getAttribute("GID") == "DATA-ENCRYPTION") {
                                            if (data.childNodes.length == 1) {
                                                editItem.sd = ''
                                                editItem.sdg = "DATA-ENCRYPTION"
                                                editItem.id = id
                                                const addObj = Object.assign({}, editItem)
                                                sdgs.push(addObj)
                                                id++
                                            } else {
                                                data.childNodes.forEach((sdg, s) => {
                                                    if (s % 2 != 0) {
                                                        editItem = { sdg: '', sd: '', port: null, id: '' }
                                                        if (sdg.nodeName == "SD" && sdg.getAttribute("GID") == "USE-DATA-ENCRYPTION") {
                                                            editItem.sd = sdg.childNodes[0].nodeValue
                                                            editItem.sdg = "DATA-ENCRYPTION"
                                                            editItem.id = id
                                                            const addObj = Object.assign({}, editItem)
                                                            sdgs.push(addObj)
                                                            id++
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                        if (data.nodeName == "SDG" && data.getAttribute("GID") == "PERSISTENCY-DEPLOYMENT-EXTENSION") {
                                            console.log(data.childNodes.length)
                                            if (data.childNodes.length == 1) {
                                                editItem.port = null
                                                editItem.sdg = "PERSISTENCY-DEPLOYMENT-EXTENSION"
                                                editItem.id = id
                                                const addObj = Object.assign({}, editItem)
                                                sdgs.push(addObj)
                                                id++
                                            } else {
                                                data.childNodes.forEach((sdg, s) => {
                                                    if (s % 2 != 0) {
                                                        editItem = { sdg: '', sd: '', port: null, id: '' }
                                                        editItem.port = sdg.childNodes[0].nodeValue
                                                        editItem.sdg = "PERSISTENCY-DEPLOYMENT-EXTENSION"
                                                        editItem.id = id
                                                        const addObj = Object.assign({}, editItem)
                                                        sdgs.push(addObj)
                                                        id++
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            }
                        })
                    }
                    if (item.nodeName == "MAXIMUM-ALLOWED-SIZE") {
                        maxsize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MINIMUM-SUSTAINED-SIZE") {
                        minisize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "UPDATE-STRATEGY") {
                        updateS = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "URI") {
                        uri = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "FILES") {
                        id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { name: '', url: '', filename: '', strategy: null, id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "CONTENT-URI") {
                                            editItem.url = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "FILE-NAME") {
                                            editItem.filename = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "UPDATE-STRATEGY") {
                                            editItem.strategy = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                files.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPERFileArray', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    sdgs: sdgs,
                    maxSize: maxsize,
                    miniSize: minisize,
                    updateS: updateS,
                    uri: uri,
                    files: files,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.FileArray_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.FileArray_str)
            })
            // PERSISTENCY-FILE-PROXY-INTERFACE
        var perFileProxy = payload.xmlDoc.getElementsByTagName('PERSISTENCY-FILE-PROXY-INTERFACE')
        perFileProxy.forEach(ele => {
                var Name = '',
                    category = '',
                    minisize = '',
                    redundancy = null,
                    updateS = null,
                    encoding = '',
                    proxy = [],
                    maxfiles = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "CATEGORY") {
                        category = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MINIMUM-SUSTAINED-SIZE") {
                        minisize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REDUNDANCY") {
                        redundancy = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "UPDATE-STRATEGY") {
                        updateS = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ENCODING") {
                        encoding = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "FILE-PROXYS") {
                        var id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { name: '', url: '', filename: '', strategy: null, id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "CONTENT-URI") {
                                            editItem.url = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "FILE-NAME") {
                                            editItem.filename = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "UPDATE-STRATEGY") {
                                            editItem.strategy = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                proxy.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "MAX-NUMBER-OF-FILES") {
                        maxfiles = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPERFileProxy', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    category: category,
                    minisize: minisize,
                    redundancy: redundancy,
                    updateS: updateS,
                    encoding: encoding,
                    proxy: proxy,
                    maxfiles: maxfiles
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.FileProxyInterf_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.FileProxyInterf_str)
            })
            // PERSISTENCY-KEY-VALUE-DATABASE 
        var perKeyValueD = payload.xmlDoc.getElementsByTagName('PERSISTENCY-KEY-VALUE-DATABASE')
        perKeyValueD.forEach(ele => {
                var Name = '',
                    sdgs = [],
                    maxsize = '',
                    minisize = '',
                    updateS = null,
                    redundancy = [],
                    keyValue = [],
                    uri = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ADMIN-DATA") {
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { sdg: '', sd: '', port: null, id: '' },
                                id = 0
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SDG" && data.getAttribute("GID") == "DATA-ENCRYPTION") {
                                            if (data.childNodes.length == 1) {
                                                editItem.sd = ''
                                                editItem.sdg = "DATA-ENCRYPTION"
                                                editItem.id = id
                                                const addObj = Object.assign({}, editItem)
                                                sdgs.push(addObj)
                                                id++
                                            } else {
                                                data.childNodes.forEach((sdg, s) => {
                                                    if (s % 2 != 0) {
                                                        editItem = { sdg: '', sd: '', port: null, id: '' }
                                                        if (sdg.nodeName == "SD" && sdg.getAttribute("GID") == "USE-DATA-ENCRYPTION") {
                                                            editItem.sd = sdg.childNodes[0].nodeValue
                                                            editItem.sdg = "DATA-ENCRYPTION"
                                                            editItem.id = id
                                                            const addObj = Object.assign({}, editItem)
                                                            sdgs.push(addObj)
                                                            id++
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                        if (data.nodeName == "SDG" && data.getAttribute("GID") == "PERSISTENCY-DEPLOYMENT-EXTENSION") {
                                            console.log(data.childNodes.length)
                                            if (data.childNodes.length == 1) {
                                                editItem.port = null
                                                editItem.sdg = "PERSISTENCY-DEPLOYMENT-EXTENSION"
                                                editItem.id = id
                                                const addObj = Object.assign({}, editItem)
                                                sdgs.push(addObj)
                                                id++
                                            } else {
                                                data.childNodes.forEach((sdg, s) => {
                                                    if (s % 2 != 0) {
                                                        editItem = { sdg: '', sd: '', port: null, id: '' }
                                                        editItem.port = sdg.childNodes[0].nodeValue
                                                        editItem.sdg = "PERSISTENCY-DEPLOYMENT-EXTENSION"
                                                        editItem.id = id
                                                        const addObj = Object.assign({}, editItem)
                                                        sdgs.push(addObj)
                                                        id++
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            }
                        })
                    }
                    if (item.nodeName == "MAXIMUM-ALLOWED-SIZE") {
                        maxsize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MINIMUM-SUSTAINED-SIZE") {
                        minisize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "UPDATE-STRATEGY") {
                        updateS = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "URI") {
                        uri = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REDUNDANCY-HANDLINGS") {
                        var idRed = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { scope: null, m: '', n: '', id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SCOPE") {
                                            editItem.scope = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "M") {
                                            editItem.m = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "N") {
                                            editItem.n = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = idRed
                                const addObj = Object.assign({}, editItem)
                                redundancy.push(addObj)
                                idRed++
                            }
                        })
                    }
                    if (item.nodeName == "KEY-VALUE-PAIRS") {
                        item.childNodes.forEach((fie, f) => {
                            var editItem = {
                                name: '',
                                update: null,
                                datatype: null,
                                array: [],
                                numerical: []
                            }
                            if (f % 2 != 0) {
                                fie.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "UPDATE-STRATEGY") {
                                            editItem.update = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "VALUE-DATA-TYPE-REF") {
                                            editItem.datatype = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "INIT-VALUE") {
                                            var idArry = 0,
                                                idNum = 0
                                            data.childNodes.forEach(init => {
                                                if (init.nodeName == "NUMERICAL-VALUE-SPECIFICATION") {
                                                    var editNumItem = { value: '', id: '' }
                                                    init.childNodes.forEach(val => {
                                                        if (val.nodeName == 'VALUE') {
                                                            editNumItem.value = val.childNodes[0].nodeValue
                                                            editNumItem.id = idNum
                                                            const addObj = Object.assign({}, editNumItem)
                                                            editItem.numerical.push(addObj)
                                                            idNum++
                                                        }
                                                    })
                                                }
                                                if (init.nodeName == "ARRAY-VALUE-SPECIFICATION") {
                                                    init.childNodes.forEach((arr, g) => {
                                                        if (g % 2 != 0) {
                                                            if (arr.nodeName == "ELEMENTS") {
                                                                arr.childNodes.forEach((val, v) => {
                                                                    if (v % 2 != 0) {
                                                                        if (val.nodeName == "NUMERICAL-VALUE-SPECIFICATION") {
                                                                            var editArrItem = { value: '', id: '' }
                                                                            val.childNodes.forEach(ch => {
                                                                                if (ch.nodeName == 'VALUE') {
                                                                                    editArrItem.value = ch.childNodes[0].nodeValue
                                                                                    editArrItem.id = idArry
                                                                                    const addObj = Object.assign({}, editArrItem)
                                                                                    editItem.array.push(addObj)
                                                                                    idArry++
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                })
                                const addObj = Object.assign({}, editItem)
                                keyValue.push(addObj)
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPERKeyValueD', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    sdgs: sdgs,
                    maxSize: maxsize,
                    miniSize: minisize,
                    updateS: updateS,
                    uri: uri,
                    redundancy: redundancy,
                    keyValue: keyValue
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.KeyValueData_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.KeyValueData_str)
            })
            // PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE
        var perKeyValueDI = payload.xmlDoc.getElementsByTagName('PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE')
        perKeyValueDI.forEach(ele => {
                var Name = '',
                    id = 0,
                    minisize = '',
                    redundancy = null,
                    updateS = null,
                    data = [],
                    serialization = [],
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MINIMUM-SUSTAINED-SIZE") {
                        minisize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REDUNDANCY") {
                        redundancy = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "UPDATE-STRATEGY") {
                        updateS = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DATA-ELEMENTS") {
                        id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { name: '', type: null, strategy: null, id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((el, d) => {
                                    if (d % 2 != 0) {
                                        if (el.nodeName == "SHORT-NAME") {
                                            editItem.name = el.childNodes[0].nodeValue
                                        }
                                        if (el.nodeName == "TYPE-TREF") {
                                            editItem.type = el.childNodes[0].nodeValue
                                        }
                                        if (el.nodeName == "UPDATE-STRATEGY") {
                                            editItem.strategy = el.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                data.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "DATA-TYPE-FOR-SERIALIZATION-REFS") {
                        id = 0
                        item.childNodes.forEach(data => {
                            var editItem = { serial: null, id: '' }
                            if (data.nodeName == "DATA-TYPE-FOR-SERIALIZATION-REF") {
                                editItem.serial = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                serialization.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPERKeyValueDI', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    minisize: minisize,
                    redundancy: redundancy,
                    updateS: updateS,
                    data: data,
                    serialization: serialization
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.KeyValueDI_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.KeyValueDI_str)
            })
            // PERSISTENCY-PORT-PROTOTYPE-TO-FILE-ARRAY-MAPPING
        var perPPtoFileArray = payload.xmlDoc.getElementsByTagName('PERSISTENCY-PORT-PROTOTYPE-TO-FILE-ARRAY-MAPPING')
        perPPtoFileArray.forEach(ele => {
                var Name = '',
                    fileArray = null,
                    port = null,
                    process = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PERSISTENCY-FILE-ARRAY-REF") {
                        fileArray = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PORT-PROTOTYPE-IREF") {
                        port = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-REF") {
                        process = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPERPPtoFileArray', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    fileArray: fileArray,
                    port: port,
                    process: process
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.PortProtoFileA_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.PortProtoFileA_str)
            })
            // PERSISTENCY-PORT-PROTOTYPE-TO-KEY-VALUE-DATABASE-MAPPING
        var perPPtoKeyValue = payload.xmlDoc.getElementsByTagName('PERSISTENCY-PORT-PROTOTYPE-TO-KEY-VALUE-DATABASE-MAPPING')
        perPPtoKeyValue.forEach(ele => {
                var Name = '',
                    keyValue = null,
                    port = null,
                    process = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "KEY-VALUE-STORAGE-REF") {
                        keyValue = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PORT-PROTOTYPE-IREF") {
                        port = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-REF") {
                        process = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPERPPtoKeyValue', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    keyValue: keyValue,
                    port: port,
                    process: process
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.PortProtoKeyV_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.PortProtoKeyV_str)
            })
            // PHM-CONTRIBUTION-TO-MACHINE-MAPPING
        var phmtoMachine = payload.xmlDoc.getElementsByTagName('PHM-CONTRIBUTION-TO-MACHINE-MAPPING')
        phmtoMachine.forEach(ele => {
                var Name = '',
                    machine = null,
                    contri = [],
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MACHINE-REF") {
                        machine = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PHM-CONTRIBUTION-REFS") {
                        var id = 0
                        item.childNodes.forEach(data => {
                            var editItem = { con: null, id: '' }
                            if (data.nodeName == "PHM-CONTRIBUTION-REF") {
                                editItem.con = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                contri.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPHMtoMachine', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    machine: machine,
                    contri: contri
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ContritoMachine_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.ContritoMachine_str)
            })
            // PHM-HEALTH-CHANNEL-INTERFACE
        var phmHealth = payload.xmlDoc.getElementsByTagName('PHM-HEALTH-CHANNEL-INTERFACE')
        phmHealth.forEach(ele => {
                var Name = '',
                    status = [],
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "STATUSS") {
                        var id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { name: '', status: '', id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "STATUS-ID") {
                                            editItem.status = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                status.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPHMHealth', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    status: status,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.HealthChannel_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.HealthChannel_str)
            })
            // PHM-RECOVERY-ACTION-INTERFACE
        var phmRecovery = payload.xmlDoc.getElementsByTagName('PHM-RECOVERY-ACTION-INTERFACE')
        phmRecovery.forEach(ele => {
                var Name = '',
                    reconame = '',
                    faf = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "RECOVERY") {
                        item.childNodes.forEach(data => {
                            if (data.nodeName == "SHORT-NAME") {
                                reconame = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "FIRE-AND-FORGET") {
                                faf = data.childNodes[0].nodeValue
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPHMRecovery', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    reconame: reconame,
                    faf: faf,

                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.RecoveryVA_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.RecoveryVA_str)
            })
            // PHM-SUPERVISED-ENTITY-INTERFACE
        var phmSupervised = payload.xmlDoc.getElementsByTagName('PHM-SUPERVISED-ENTITY-INTERFACE')
        phmSupervised.forEach(ele => {
                var Name = '',
                    checkpoint = [],
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "CHECKPOINTS") {
                        var id = 0
                        item.childNodes.forEach((check, m) => {
                            var editItem = { name: '', check: '', id: '' }
                            if (m % 2 != 0) {
                                check.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "CHECKPOINT-ID") {
                                            editItem.check = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                checkpoint.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementPHMSupervised', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    checkpoint: checkpoint,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.PHMSupervised_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.PHMSupervised_str)
            })
            // RECOVERY-VIA-APPLICATION-ACTION-TO-CLIENT-SERVER-OPERATION-MAPPING
        var phmRecoveryVia = payload.xmlDoc.getElementsByTagName('RECOVERY-VIA-APPLICATION-ACTION-TO-CLIENT-SERVER-OPERATION-MAPPING')
        phmRecoveryVia.forEach(ele => {
                var Name = '',
                    swcomponent = null,
                    port = null,
                    process = null,
                    phmRecovery = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-REF") {
                        process = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "RECOVERY-ACTION-IREF") {
                        item.childNodes.forEach(data => {
                            if (data.nodeName == "CONTEXT-ROOT-SW-COMPONENT-PROTOTYPE-REF") {
                                swcomponent = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "CONTEXT-P-PORT-PROTOTYPE-REF") {
                                port = data.childNodes[0].nodeValue
                            }
                            if (data.nodeName == "TARGET-METHOD-REF") {
                                phmRecovery = data.childNodes[0].nodeValue
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementRecoveryVia', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    process: process,
                    swcomponent: swcomponent,
                    port: port,
                    phmRecovery: phmRecovery,

                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.RecoveryActionInterf_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.RecoveryActionInterf_str)
            })
            // COM-FIELD-GRANT
        var fieldG = payload.xmlDoc.getElementsByTagName('COM-FIELD-GRANT')
        fieldG.forEach(ele => {
                var Name = '',
                    designR = null,
                    provide = null,
                    role = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DESIGN-REF") {
                        designR = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INSTANCE-REF") {
                        provide = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ROLE") {
                        role = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementFieldG', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    fieldD: designR,
                    provide: provide,
                    role: role
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ComFieldGrant_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.IAM_str)
                EventBus.$emit('add-element', constant.ComFieldGrant_str)
            })
            // COM-EVENT-GRANT
        var eventG = payload.xmlDoc.getElementsByTagName('COM-EVENT-GRANT')
        eventG.forEach(ele => {
                var Name = '',
                    designR = null,
                    provide = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DESIGN-REF") {
                        designR = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INSTANCE-REF") {
                        provide = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                this.commit('addElementEventG', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    eventD: designR,
                    provide: provide,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ComEventGrant_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.IAM_str)
                EventBus.$emit('add-element', constant.ComEventGrant_str)
            })
            // COM-METHOD-GRANT
        var methodG = payload.xmlDoc.getElementsByTagName('COM-METHOD-GRANT')
        methodG.forEach(ele => {
                var Name = '',
                    designR = null,
                    provide = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "DESIGN-REF") {
                        designR = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SERVICE-INSTANCE-REF") {
                        provide = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementMethodG', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    methodD: designR,
                    provide: provide,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ComMethodGrant_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.IAM_str)
                EventBus.$emit('add-element', constant.ComMethodGrant_str)
            })
            // COM-FIELD-GRANT-DESIGN
        var fieldGD = payload.xmlDoc.getElementsByTagName('COM-FIELD-GRANT-DESIGN')
        fieldGD.forEach(ele => {
                var Name = '',
                    serviceI = null,
                    processD = null,
                    role = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "FIELD-IREF") {
                        serviceI = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-DESIGN-REF") {
                        processD = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ROLE") {
                        role = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementFieldGD', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    processD: processD,
                    SIField: serviceI,
                    role: role
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ComFieldGDesign_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.IAM_str)
                EventBus.$emit('add-element', constant.ComFieldGDesign_str)
            })
            // COM-EVENT-GRANT-DESIGN
        var eventGD = payload.xmlDoc.getElementsByTagName('COM-EVENT-GRANT-DESIGN')
        eventGD.forEach(ele => {
                var Name = '',
                    serviceI = null,
                    processD = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "EVENT-IREF") {
                        serviceI = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-DESIGN-REF") {
                        processD = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementEventGD', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    processD: processD,
                    SIEvent: serviceI,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ComEventGDesign_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.IAM_str)
                EventBus.$emit('add-element', constant.ComEventGDesign_str)
            })
            // COM-METHOD-GRANT-DESIGN
        var methodGD = payload.xmlDoc.getElementsByTagName('COM-METHOD-GRANT-DESIGN')
        methodGD.forEach(ele => {
                var Name = '',
                    serviceI = null,
                    processD = null,
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "METHOD-IREF") {
                        serviceI = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PROCESS-DESIGN-REF") {
                        processD = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementMethodGD', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    processD: processD,
                    SIMethod: serviceI,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ComMethodGDesign_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.IAM_str)
                EventBus.$emit('add-element', constant.ComMethodGDesign_str)
            })
            // SOFTWARE-CLUSTER
        var softwareC = payload.xmlDoc.getElementsByTagName('SOFTWARE-CLUSTER')
        softwareC.forEach(ele => {
                var Name = '',
                    id = '',
                    category = '',
                    idVendor = '',
                    version = '',
                    sdgs = [],
                    executable = [],
                    machineD = [],
                    toMachine = [],
                    process = [],
                    sswc = [],
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "CATEGORY") {
                        category = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "VENDOR-ID") {
                        idVendor = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "VERSION") {
                        version = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ADMIN-DATA") {
                        id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { sdg: '', sd: '', id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SDG") {
                                            if (data.childNodes.length == 1) {
                                                editItem.sd = ''
                                                editItem.sdg = data.getAttribute("GID")
                                                editItem.id = id
                                                const addObj = Object.assign({}, editItem)
                                                sdgs.push(addObj)
                                                id++
                                            } else {
                                                data.childNodes.forEach((sdg, s) => {
                                                    if (s % 2 != 0) {
                                                        editItem = { sdg: '', sd: '', id: '' }
                                                        if (sdg.nodeName == "SD") {
                                                            editItem.sd = sdg.childNodes[0].nodeValue
                                                            editItem.sdg = sdg.getAttribute("GID")
                                                            editItem.id = id
                                                            const addObj = Object.assign({}, editItem)
                                                            sdgs.push(addObj)
                                                            id++
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            }
                        })
                    }
                    if (item.nodeName == "CONTAINED-AR-ELEMENT-REFS") {
                        id = 0
                        item.childNodes.forEach(data => {
                            var editItem = { execut: null, id: '' }
                            if (data.nodeName == "CONTAINED-AR-ELEMENT-REF") {
                                editItem.execut = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                executable.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "CONTAINED-FIBEX-ELEMENT-REFS") {
                        id = 0
                        item.childNodes.forEach(data => {
                            var editItem = { machine: null, id: '' }
                            if (data.nodeName == "CONTAINED-FIBEX-ELEMENT-REF") {
                                editItem.machine = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                machineD.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "CONTAINED-PACKAGE-ELEMENT-REFS") {
                        id = 0
                        item.childNodes.forEach(data => {
                            var editItem = { mapping: null, id: '' }
                            if (data.nodeName == "CONTAINED-PACKAGE-ELEMENT-REF") {
                                editItem.mapping = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                toMachine.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "CONTAINED-PROCESS-REFS") {
                        id = 0
                        item.childNodes.forEach(data => {
                            var editItem = { pro: null, id: '' }
                            if (data.nodeName == "CONTAINED-PROCESS-REF") {
                                editItem.pro = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                process.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "SUB-SOFTWARE-CLUSTER-REFS") {
                        id = 0
                        item.childNodes.forEach(data => {
                            var editItem = { swc: null, id: '' }
                            if (data.nodeName == "SUB-SOFTWARE-CLUSTER-REF") {
                                editItem.swc = data.childNodes[0].nodeValue
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                sswc.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementSoftWareCluster', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    category: category,
                    idVendor: idVendor,
                    version: version,
                    sdgs: sdgs,
                    executable: executable,
                    machineD: machineD,
                    toMachine: toMachine,
                    process: process,
                    sswc: sswc,
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.SWCluster_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.UCM_str)
                EventBus.$emit('add-element', constant.SWCluster_str)
            })
            // SOFTWARE-PACKAGE
        var softwareP = payload.xmlDoc.getElementsByTagName('SOFTWARE-PACKAGE')
        softwareP.forEach(ele => {
                var Name = '',
                    action = null,
                    activation = null,
                    compSWPsize = '',
                    deltaPakage = null,
                    maximunVer = '',
                    minimunVer = '',
                    id = '',
                    postReboot = null,
                    preReboot = null,
                    swcluster = null,
                    uncompSWCsize = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ACTION-TYPE") {
                        action = item.childNodes[1].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ACTIVATION-ACTION") {
                        activation = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "COMPRESSED-SOFTWARE-PACKAGE-SIZE") {
                        compSWPsize = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "IS-DELTA-PACKAGE") {
                        deltaPakage = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MAXIMUM-SUPPORTED-UCM-VERSION") {
                        maximunVer = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "MINIMUM-SUPPORTED-UCM-VERSION") {
                        minimunVer = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PACKAGER-ID") {
                        id = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "POST-VERIFICATION-REBOOT") {
                        postReboot = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "PRE-ACTIVATION-REBOOT") {
                        preReboot = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "SOFTWARE-CLUSTER-REF") {
                        swcluster = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "UNCOMPRESSED-SOFTWARE-CLUSTER-SIZE") {
                        uncompSWCsize = item.childNodes[0].nodeValue
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementSoftWarePackage', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    action: action,
                    activation: activation,
                    compSWPsize: compSWPsize,
                    deltaPakage: deltaPakage,
                    maximunVer: maximunVer,
                    minimunVer: minimunVer,
                    id: id,
                    postReboot: postReboot,
                    preReboot: preReboot,
                    swcluster: swcluster,
                    uncompSWCsize: uncompSWCsize
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.SWPackage_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.UCM_str)
                EventBus.$emit('add-element', constant.SWPackage_str)
            })
            // VEHICLE-PACKAGE
        var UCMVehicle = payload.xmlDoc.getElementsByTagName('VEHICLE-PACKAGE')
        UCMVehicle.forEach(ele => {
                var Name = '',
                    id = 0,
                    reposi = '',
                    sdgs = [],
                    driver = [],
                    rollout = [],
                    ucms = [],
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path)

                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "REPOSITORY") {
                        reposi = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "ADMIN-DATA") {
                        id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { sd: '', id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SDG") {
                                            data.childNodes.forEach((sdg, s) => {
                                                if (s % 2 != 0) {
                                                    editItem = { sd: '', id: '' }
                                                    if (sdg.nodeName == "SD") {
                                                        editItem.sd = sdg.childNodes[0].nodeValue
                                                        editItem.id = id
                                                        const addObj = Object.assign({}, editItem)
                                                        sdgs.push(addObj)
                                                        id++
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                    if (item.nodeName == "DRIVER-NOTIFICATIONS") {
                        id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { appro: null, notify: null, id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "APPROVAL-REQUIRED") {
                                            editItem.appro = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "NOTIFICATION-STATE") {
                                            editItem.notify = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                driver.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "ROLLOUT-QUALIFICATIONS") {
                        id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { name: '', policy: '', id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "SAFETY-POLICY") {
                                            editItem.policy = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                rollout.push(addObj)
                                id++
                            }
                        })
                    }
                    if (item.nodeName == "UCMS") {
                        id = 0
                        item.childNodes.forEach((stat, m) => {
                            var editItem = { name: '', ident: '', module: null, id: '' }
                            if (m % 2 != 0) {
                                stat.childNodes.forEach((data, d) => {
                                    if (d % 2 != 0) {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "IDENTIFIER") {
                                            editItem.ident = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "UCM-MODULE-INSTANTIATION-REF") {
                                            editItem.module = data.childNodes[0].nodeValue
                                        }
                                    }
                                })
                                editItem.id = id
                                const addObj = Object.assign({}, editItem)
                                ucms.push(addObj)
                                id++
                            }
                        })
                    }
                })
                var UUID = ele.getAttribute("UUID")
                var idxEle = state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.findIndex(data => data.uuid === UUID)
                if (UUID == null || idxEle != -1) {
                    UUID = uuid.v1()
                }
                const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
                const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

                this.commit('addElementVehiclePackage', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: UUID,
                    top: elementY,
                    left: elementX,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    reposi: reposi,
                    sdgs: sdgs,
                    driver: driver,
                    rollout: rollout,
                    ucms: ucms
                })
                state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.VehiclePackage_str })
                EventBus.$emit('add-element', constant.Platform_str)
                EventBus.$emit('add-element', constant.UCM_str)
                EventBus.$emit('add-element', constant.VehiclePackage_str)
            })
            // UCM-MODULE-INSTANTIATION
        var UCMModule = payload.xmlDoc.getElementsByTagName('UCM-MODULE-INSTANTIATION')
        UCMModule.forEach(ele => {
            var Name = '',
                ident = '',
                path = '',
                strPath = getEditPath(ele.parentNode.parentNode, path)

            ele.childNodes.forEach(item => {
                if (item.nodeName == "SHORT-NAME") {
                    Name = item.childNodes[0].nodeValue
                }
                if (item.nodeName == "IDENTIFIER") {
                    ident = item.childNodes[0].nodeValue
                }
            })
            var UUID = ele.getAttribute("UUID")
            var idxEle = state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.findIndex(data => data.uuid === UUID)
            if (UUID == null || idxEle != -1) {
                UUID = uuid.v1()
            }
            const elementX = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3000))

            this.commit('addElementModuleInstant', {
                name: Name,
                input: true,
                path: strPath,
                uuid: UUID,
                top: elementY,
                left: elementX,
                zindex: 2,
                icon: "mdi-clipboard-outline",
                validation: false,
                ident: ident,
            })
            state.inputFileList.push({ uuid: UUID, path: strPath + '/' + Name, parent: constant.ModuleInstantiation_str })
            EventBus.$emit('add-element', constant.Platform_str)
            EventBus.$emit('add-element', constant.UCM_str)
            EventBus.$emit('add-element', constant.ModuleInstantiation_str)
        })

    },
    setInputFileComplate(state) { //바로 라인 그리면 element가 다 그려지기 전이라 선의 id값을 찾지 못한다.
        state.isInputFileComplate = false // element들이 다 그려졌다는걸 알려 주는것임
    },
    checkLineInputXml(state) {
        console.log(state.inputFileList)
        state.inputFileList.forEach(ele => {
            var idxelement = null
            if (ele.parent == constant.Implementation_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].typeref != null) {
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].typeref == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/typeref', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/typeref', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].templatetype != null) {
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                        console.log(state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].templatetype + ' ==== ' + item.path + '/' + item.name)
                        if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].templatetype == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/templateType', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/templateType', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].ddpc.length > 0) {
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].ddpc.forEach((data, i) => {
                        if (data.compumethod != null) {
                            state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.forEach(item => {
                                if (data.compumethod == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/ddpccompu-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/DDPC', item.uuid)
                                }
                            })
                        }
                        if (data.dataconstr != null) {
                            state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.forEach(item => {
                                if (data.dataconstr == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/ddpcdata-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/DDPC', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].idtelement.length > 0) {
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].idtelement.forEach((data, i) => {
                        if (data.typeref != null) {
                            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                                if (data.typeref == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/idtetable-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/idtetable', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.Machine_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].machinedesign != null) {
                    state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].machinedesign == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/machinedesign', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/machinedesign', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].hwelement.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].hwelement.forEach((data, i) => {
                        if (data.hwelement != null) {
                            state.SAHLProject[state.openProjectIndex].Machine.HWElement.forEach(item => {
                                if (data.hwelement == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/hwelement-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/hwelement', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].functiongroup != null) {
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].functiongroup.forEach((data, i) => {
                        if (data.type != null) {
                            state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.forEach(item => {
                                if (data.type == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/functiontable-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/functiontable', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.MachineDesigne_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].connector.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].connector.forEach((data, i) => {
                        if (data.endpoint != null) {
                            state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach(item => {
                                if (item.conditional.length > 0) {
                                    item.conditional.forEach(condi => {
                                        if (condi.channel != null) {
                                            condi.channel.forEach(channel => {
                                                if (channel.endpoint != null) {
                                                    channel.endpoint.forEach(end => {
                                                        if (data.endpoint == (item.path + '/' + item.name + '/' + condi.name + '/' + channel.name + '/' + end.name)) {
                                                            this.commit('setConnectionline', { start: ele.uuid + '/cctable-' + i, end: item.uuid })
                                                            EventBus.$emit('new-line', ele.uuid + '/cctable', item.uuid)
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })

                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].servicediscover.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].servicediscover.forEach((data, i) => {
                        if (data.msia != null) {
                            state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach(item => {
                                if (item.conditional.length > 0) {
                                    item.conditional.forEach(condi => {
                                        if (condi.channel != null) {
                                            condi.channel.forEach(channel => {
                                                if (channel.endpoint != null) {
                                                    channel.endpoint.forEach(end => {
                                                        if (data.msia == (item.path + '/' + item.name + '/' + condi.name + '/' + channel.name + '/' + end.name)) {
                                                            this.commit('setConnectionline', { start: ele.uuid + '/sdctable-' + i, end: item.uuid })
                                                            EventBus.$emit('new-line', ele.uuid + '/sdctable', item.uuid)
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.EthernetCluster_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxelement].conditional.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxelement].conditional.forEach((condi, n) => {
                        if (condi.channel != null) {
                            condi.channel.forEach((channel, v) => {
                                if (channel.comconnect != null) {
                                    channel.comconnect.forEach((connect, c) => {
                                        if (connect.connector != null) {
                                            state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.forEach(data => {
                                                data.connector.forEach(con => {
                                                    if (connect.connector == (data.path + '/' + data.name + '/' + con.name)) {
                                                        this.commit('setConnectionline', { start: ele.uuid + '/comconet-' + c + '-' + v + '-' + n, end: data.uuid })
                                                        if (n == 0 && v == 0) {
                                                            EventBus.$emit('new-line', ele.uuid + '/comconet-' + channel.id + '-' + condi.id, data.uuid)
                                                        } else if (n == 0 && v != 0) {
                                                            EventBus.$emit('new-line', ele.uuid + '/channel' + condi.id, data.uuid)
                                                        } else {
                                                            EventBus.$emit('new-line', ele.uuid + '/conditional', data.uuid)
                                                        }
                                                    }
                                                })
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.ProcesstoMachineMapping_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxelement].ptmmMachine != null) {
                    state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxelement].ptmmMachine == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/machinefromptmm', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/machinefromptmm', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxelement].ptmmProcess != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxelement].ptmmProcess == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/processfromptmm', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/processfromptmm', item.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.SWComponents_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].pport.length > 0) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].pport.forEach((data, i) => {
                        console.log(data.selectI)
                        if (data.selectI == "SERVICE-INTERFACE") {
                            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                if (data.interface == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PPortI-' + data.id, end: item.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/PPortI-' + data.id, item.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/pport', item.uuid)
                                    }
                                }
                            })
                        } else if (data.selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                            state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.forEach(item => {
                                if (data.interface == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PPortI-' + data.id, end: item.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/PPortI-' + data.id, item.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/pport', item.uuid)
                                    }
                                }
                            })
                        }
                        if (data.queued.length > 0) {
                            data.queued.forEach(pro => {
                                if (pro.dataE != null) {
                                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                        if (item.events.length > 0) {
                                            item.events.forEach(el => {
                                                if (pro.dataE == (item.path + '/' + item.name + '/' + el.name)) {
                                                    this.commit('setConnectionline', { start: ele.uuid + '/pportQSC-' + pro.id + '-' + data.id, end: item.uuid })
                                                    if (i == 0) {
                                                        EventBus.$emit('new-line', ele.uuid + '/pportQSC-' + data.id, item.uuid)
                                                    } else {
                                                        EventBus.$emit('new-line', ele.uuid + '/pport', item.uuid)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        if (data.field.length > 0) {
                            data.field.forEach(pro => {
                                if (pro.dataE != null) {
                                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                        if (item.fields.length > 0) {
                                            item.fields.forEach(el => {
                                                if (pro.dataE == (item.path + '/' + item.name + '/' + el.name)) {
                                                    this.commit('setConnectionline', { start: ele.uuid + '/pportFSC-' + pro.id + '-' + data.id, end: item.uuid })
                                                    if (i == 0) {
                                                        EventBus.$emit('new-line', ele.uuid + '/pportFSC-' + data.id, item.uuid)
                                                    } else {
                                                        EventBus.$emit('new-line', ele.uuid + '/pport', item.uuid)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].prport.length > 0) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].prport.forEach((data, i) => {
                        if (data.interface != null) {
                            if (data.selectI == "SERVICE-INTERFACE") {
                                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                    if (data.interface == (item.path + '/' + item.name)) {
                                        this.commit('setConnectionline', { start: ele.uuid + '/PRPortI-' + data.id, end: item.uuid })
                                        if (i == 0) {
                                            EventBus.$emit('new-line', ele.uuid + '/PRPortI-' + data.id, item.uuid)
                                        } else {
                                            EventBus.$emit('new-line', ele.uuid + '/prport', item.uuid)
                                        }
                                    }
                                })
                            } else if (data.selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                                state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.forEach(item => {
                                    if (data.interface == (item.path + '/' + item.name)) {
                                        this.commit('setConnectionline', { start: ele.uuid + '/PRPortI-' + data.id, end: item.uuid })
                                        if (i == 0) {
                                            EventBus.$emit('new-line', ele.uuid + '/PRPortI-' + data.id, item.uuid)
                                        } else {
                                            EventBus.$emit('new-line', ele.uuid + '/prport', item.uuid)
                                        }
                                    }
                                })
                            } else if (data.selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                                state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.forEach(item => {
                                    if (data.interface == (item.path + '/' + item.name)) {
                                        this.commit('setConnectionline', { start: ele.uuid + '/PRPortI-' + data.id, end: item.uuid })
                                        if (i == 0) {
                                            EventBus.$emit('new-line', ele.uuid + '/PRPortI-' + data.id, item.uuid)
                                        } else {
                                            EventBus.$emit('new-line', ele.uuid + '/prport', item.uuid)
                                        }
                                    }
                                })
                            }
                        }
                        if (data.provide.length > 0) {
                            data.provide.forEach(pro => {
                                if (pro.dataE != null) {
                                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.forEach(item => {
                                        if (item.data.length > 0) {
                                            item.data.forEach(el => {
                                                if (pro.dataE == (item.path + '/' + item.name + '/' + el.name)) {
                                                    this.commit('setConnectionline', { start: ele.uuid + '/prporttab-' + pro.id + '-' + data.id, end: item.uuid })
                                                    if (i == 0) {
                                                        EventBus.$emit('new-line', ele.uuid + '/prporttab-' + data.id, item.uuid)
                                                    } else {
                                                        EventBus.$emit('new-line', ele.uuid + '/prport', item.uuid)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].rport.length > 0) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].rport.forEach((data, i) => {
                        if (data.selectI == "SERVICE-INTERFACE") {
                            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                if (data.interface == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/RPortI-' + data.id, end: item.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/RPortI-' + data.id, item.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/rport', item.uuid)
                                    }
                                }
                            })
                        } else if (data.selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                            state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.forEach(item => {
                                if (data.interface == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/RPortI-' + data.id, end: item.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/RPortI-' + data.id, item.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/rport', item.uuid)
                                    }
                                }
                            })
                        } else if (data.selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                            state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.forEach(item => {
                                if (data.interface == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/RPortI-' + data.id, end: item.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/RPortI-' + data.id, item.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/rport', item.uuid)
                                    }
                                }
                            })
                        }
                        if (data.queued.length > 0) {
                            data.queued.forEach(que => {
                                if (que.dataE != null) {
                                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                        if (item.events.length > 0 && que.select == "VARIABLE-DATA-PROTOTYPE") {
                                            item.events.forEach(el => {
                                                if (que.dataE == (item.path + '/' + item.name + '/' + el.name)) {
                                                    this.commit('setConnectionline', { start: ele.uuid + '/rportQRC-' + que.id + '-' + data.id, end: item.uuid })
                                                    if (i == 0) {
                                                        EventBus.$emit('new-line', ele.uuid + '/rportQRC-' + data.id, item.uuid)
                                                    } else {
                                                        EventBus.$emit('new-line', ele.uuid + '/rport', item.uuid)
                                                    }
                                                }
                                            })
                                        } else if (item.fields.length > 0 && que.select == "FIELD") {
                                            item.fields.forEach(el => {
                                                if (que.dataE == (item.path + '/' + item.name + '/' + el.name)) {
                                                    this.commit('setConnectionline', { start: ele.uuid + '/rportQRC-' + que.id + '-' + data.id, end: item.uuid })
                                                    if (i == 0) {
                                                        EventBus.$emit('new-line', ele.uuid + '/rportQRC-' + data.id, item.uuid)
                                                    } else {
                                                        EventBus.$emit('new-line', ele.uuid + '/rport', item.uuid)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        if (data.client.length > 0) {
                            data.client.forEach(cl => {
                                if (cl.operation != null) {
                                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                        if (item.methods.length > 0) {
                                            item.methods.forEach(el => {
                                                if (cl.operation == (item.path + '/' + item.name + '/' + el.name)) {
                                                    this.commit('setConnectionline', { start: ele.uuid + '/rportCC-' + cl.id + '-' + data.id, end: item.uuid })
                                                    if (i == 0) {
                                                        EventBus.$emit('new-line', ele.uuid + '/rportCC-' + data.id, item.uuid)
                                                    } else {
                                                        EventBus.$emit('new-line', ele.uuid + '/rport', item.uuid)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.Process_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].prodesign != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].prodesign == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/processprodesign', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/processprodesign', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].determin != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].determin == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/processdetermin', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/processdetermin', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].execut != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].execut == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/processexecut', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/processexecut', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].machinetype != null) {
                    state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].machinetype == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/processmodedeclar', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/processmodedeclar', item.uuid)
                        }
                    })
                }
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].dependent.forEach((data, i) => {
                    if (data.resourceRef != null) {
                        state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(machine => {
                            machine.moduleinstant.forEach(item => {
                                if (data.resourceRef == (machine.path + '/' + machine.name + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/processresorce-' + i, end: machine.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/processresorce' + i, machine.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/processStarupC', machine.uuid)
                                    }
                                }
                            })
                        })
                    }
                    if (data.startupConfigRef != null) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.forEach(item => {
                            if (data.startupConfigRef == (item.path + '/' + item.name)) {
                                this.commit('setConnectionline', { start: ele.uuid + '/processstartup-' + i, end: item.uuid })
                                EventBus.$emit('new-line', ele.uuid + '/processstartup', item.uuid)
                                if (i == 0) {
                                    EventBus.$emit('new-line', ele.uuid + '/processresorce' + i, item.uuid)
                                } else {
                                    EventBus.$emit('new-line', ele.uuid + '/processStarupC', item.uuid)
                                }
                            }
                        })
                    }
                    if (data.exection != null) {
                        data.exection.forEach((exec, f) => {
                            if (exec.contextMode != null) {
                                state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(item => {
                                    item.functiongroup.forEach(group => {
                                        if (exec.contextMode == (item.path + '/' + item.name + '/' + group.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/edcontext-' + f + '-' + i, end: item.uuid })
                                            if (i == 0) {
                                                EventBus.$emit('new-line', ele.uuid + '/edtable' + i, item.uuid)
                                            } else {
                                                EventBus.$emit('new-line', ele.uuid + '/processStarupC', item.uuid)
                                            }
                                        }
                                    })
                                })
                            }
                            if (exec.targetMode != null) {
                                state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.forEach(item => {
                                    item.modedeclaration.forEach(mode => {
                                        if (exec.targetMode == (item.path + '/' + item.name + '/' + mode)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/edtarget-' + f + '-' + i, end: item.uuid })
                                            if (i == 0) {
                                                EventBus.$emit('new-line', ele.uuid + '/edtable' + i, item.uuid)
                                            } else {
                                                EventBus.$emit('new-line', ele.uuid + '/processStarupC', item.uuid)
                                            }
                                        }
                                    })
                                })
                            }
                        })
                    }
                    if (data.functionItem != null) {
                        data.functionItem.forEach((func, f) => {
                            if (func.contextMode != null) {
                                state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(item => {
                                    item.functiongroup.forEach(group => {
                                        if (func.contextMode == (item.path + '/' + item.name + '/' + group.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/fgcontext-' + f + '-' + i, end: item.uuid })
                                            if (i == 0) {
                                                EventBus.$emit('new-line', ele.uuid + '/fgtable' + i, item.uuid)
                                            } else {
                                                EventBus.$emit('new-line', ele.uuid + '/processStarupC', item.uuid)
                                            }
                                        }
                                    })
                                })
                            }
                            if (func.targetMode != null) {
                                state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.forEach(item => {
                                    item.modedeclaration.forEach(mode => {
                                        if (func.targetMode == (item.path + '/' + item.name + '/' + mode)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/fgtarget-' + f + '-' + i, end: item.uuid })
                                            if (i == 0) {
                                                EventBus.$emit('new-line', ele.uuid + '/fgtable' + i, item.uuid)
                                            } else {
                                                EventBus.$emit('new-line', ele.uuid + '/processStarupC', item.uuid)
                                            }
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            } else if (ele.parent == constant.ProcessDesign_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxelement].executableref != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxelement].executableref == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/prodesignexecutable', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/prodesignexecutable', item.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.Executable_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxelement].applicationtyperef != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxelement].applicationtyperef == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/applicationtyperef', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/applicationtyperef', item.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.SomeIPServiceInterfaceDeployment_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].service != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].service == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/service', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/service', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].fieldD.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].fieldD.forEach((data, i) => {
                        if (data.field != null) {
                            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                item.fields.forEach(service => {
                                    if (data.field == (item.path + '/' + item.name + '/' + service.name)) {
                                        this.commit('setConnectionline', { start: ele.uuid + '/field-' + i, end: item.uuid })
                                        if (i == 0) {
                                            EventBus.$emit('new-line', ele.uuid + '/fieldtab' + data.id, item.uuid)
                                        } else {
                                            EventBus.$emit('new-line', ele.uuid + '/field', item.uuid)
                                        }
                                    }
                                })
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].eventG.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].eventG.forEach((eve, i) => {
                        if (eve.event != null) {
                            eve.event.forEach((group, g) => {
                                if (group.event != null) {
                                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                                        if (item.eventD.length > 0) {
                                            item.eventD.forEach(data => {
                                                if (group.event == (item.path + '/' + item.name + '/' + data.name)) {
                                                    this.commit('setConnectionline', { start: ele.uuid + '/event-' + g + '-' + i, end: item.uuid })
                                                    if (i == 0) {
                                                        EventBus.$emit('new-line', ele.uuid + '/eventtab' + eve.id, item.uuid)
                                                    } else {
                                                        EventBus.$emit('new-line', ele.uuid + '/event', item.uuid)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].eventD.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].eventD.forEach((eve, i) => {
                        if (eve.event != null) {
                            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                if (item.events.length > 0) {
                                    item.events.forEach(data => {
                                        if (eve.event == (item.path + '/' + item.name + '/' + data.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/serviceEventD-' + i, end: item.uuid })
                                            EventBus.$emit('new-line', ele.uuid + '/serviceEventD', item.uuid)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].methodD.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].methodD.forEach((method, i) => {
                        if (method.method != null) {
                            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                if (item.methods.length > 0) {
                                    item.methods.forEach(data => {
                                        if (method.method == (item.path + '/' + item.name + '/' + data.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/serviceMethodD-' + i, end: item.uuid })
                                            EventBus.$emit('new-line', ele.uuid + '/serviceMethodD', item.uuid)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.ServiceInterface_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].events.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].events.forEach((eve, i) => {
                        if (eve.type != null) {
                            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                                if (eve.type == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/Eventtable-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/Eventtable', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].fields.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].fields.forEach((data, i) => {
                        if (data.type != null) {
                            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                                if (data.type == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/Fieldtable-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/Fieldtable', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].methods.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].methods.forEach((data, i) => {
                        if (data.argument != null) {
                            data.argument.forEach((arg, a) => {
                                if (arg.type != null) {
                                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                                        if (arg.type == (item.path + '/' + item.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/argtable-' + a + '-' + i, end: item.uuid })
                                            if (i == 0) {
                                                EventBus.$emit('new-line', ele.uuid + '/argtable' + data.id, item.uuid)
                                            } else {
                                                EventBus.$emit('new-line', ele.uuid + '/methods', item.uuid)
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        if (data.errorSet != null) {
                            data.errorSet.forEach((error, e) => {
                                if (error.error != null) {
                                    state.SAHLProject[state.openProjectIndex].Service.ErrorSet.forEach(item => {
                                        if (error.error == (item.path + '/' + item.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/methoderrors-' + e + '-' + i, end: item.uuid })
                                            if (i == 0) {
                                                EventBus.$emit('new-line', ele.uuid + '/methoderrors' + data.id, item.uuid)
                                            } else {
                                                EventBus.$emit('new-line', ele.uuid + '/methods', item.uuid)
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        if (data.error != null) {
                            data.error.forEach((err, e) => {
                                if (err.error != null) {
                                    state.SAHLProject[state.openProjectIndex].Service.Error.forEach(item => {
                                        if (err.error == (item.path + '/' + item.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/methoderror-' + e + '-' + i, end: item.uuid })
                                            if (i == 0) {
                                                EventBus.$emit('new-line', ele.uuid + '/methoderror' + data.id, item.uuid)
                                            } else {
                                                EventBus.$emit('new-line', ele.uuid + '/methods', item.uuid)
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.SomeIPToMachineMapping_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].ccref != null) {
                    state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.forEach(data => {
                        data.connector.forEach(item => {
                            if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].ccref == data.path + '/' + data.name + '/' + item.name) {
                                this.commit('setConnectionline', { start: ele.uuid + '/tomachinCC', end: data.uuid })
                                EventBus.$emit('new-line', ele.uuid + '/tomachinCC', data.uuid)
                            }
                        })
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].serviceI.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].serviceI.forEach((ser, i) => {
                        console.log(ser.ref)
                        if (ser.ref == 'PROVIDED-SOMEIP-SERVICE-INSTANCE') {
                            state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach(data => {
                                if (ser.service == data.path + '/' + data.name) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/toMachinServiceIns-' + i, end: data.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/toMachinServiceIns', data.uuid)
                                }
                            })
                        } else if (ser.ref == 'REQUIRED-SOMEIP-SERVICE-INSTANCE') {
                            state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.forEach(data => {
                                if (ser.service == data.path + '/' + data.name) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/toMachinServiceIns-' + i, end: data.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/toMachinServiceIns', data.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.ToPortPrototypeMapping_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].porttype != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].selectPort == 'P-PORT-PROTOTYPE') {
                            item.pport.forEach(data => {
                                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].porttype == (item.path + '/' + item.name + '/' + data.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/toportport', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/toportport', item.uuid)
                                }
                            })
                        } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].selectPort == 'R-PORT-PROTOTYPE') {
                            item.rport.forEach(data => {
                                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].porttype == (item.path + '/' + item.name + '/' + data.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/toportport', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/toportport', item.uuid)
                                }
                            })
                        } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].selectPort == 'PR-PORT-PROTOTYPE') {
                            item.prport.forEach(data => {
                                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].porttype == (item.path + '/' + item.name + '/' + data.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/toportport', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/toportport', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].process != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].process == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/toportprocess', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/toportprocess', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].serviceIns != null) {
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].selectServiceIns == 'PROVIDED-SOMEIP-SERVICE-INSTANCE') {
                        state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach(item => {
                            if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].serviceIns == (item.path + '/' + item.name)) {
                                this.commit('setConnectionline', { start: ele.uuid + '/toportservice', end: item.uuid })
                                EventBus.$emit('new-line', ele.uuid + '/toportservice', item.uuid)
                            }
                        })
                    } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].selectServiceIns == 'REQUIRED-SOMEIP-SERVICE-INSTANCE') {
                        state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.forEach(item => {
                            if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].serviceIns == (item.path + '/' + item.name)) {
                                this.commit('setConnectionline', { start: ele.uuid + '/toportservice', end: item.uuid })
                                EventBus.$emit('new-line', ele.uuid + '/toportservice', item.uuid)
                            }
                        })
                    }
                }
            } else if (ele.parent == constant.RequiredSomeIP_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].deployref != null) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].deployref == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/requiredDeploy', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/requiredDeploy', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].someipclient != null) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].someipclient == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/requiredSomeIPC', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/requiredSomeIPC', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].method.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].method.forEach((method, i) => {
                        if (method.method != null) {
                            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                                if (item.methodD.length > 0) {
                                    item.methodD.forEach(data => {
                                        if (method.method == (item.path + '/' + item.name + '/' + data.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/requiredMethod-' + i, end: item.uuid })
                                            EventBus.$emit('new-line', ele.uuid + '/requiredMethod', item.uuid)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].requiredevent.forEach((data, i) => {
                    if (data.eventG != null) {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(eve => {
                            eve.eventG.forEach(item => {
                                if (data.eventG == (eve.path + '/' + eve.name + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/requiredEventG-' + i, end: eve.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/requiredEventG' + data.id, eve.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/requiredE', eve.uuid)
                                    }
                                }
                            })
                        })
                    }
                    if (data.client != null) {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.forEach(item => {
                            if (data.client == (item.path + '/' + item.name)) {
                                this.commit('setConnectionline', { start: ele.uuid + '/requiredClient-' + i, end: item.uuid })
                                if (i == 0) {
                                    EventBus.$emit('new-line', ele.uuid + '/requiredClient' + data.id, item.uuid)
                                } else {
                                    EventBus.$emit('new-line', ele.uuid + '/requiredE', item.uuid)
                                }
                            }
                        })
                    }
                })
            } else if (ele.parent == constant.ProvidedSomeIP_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].deployref != null) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].deployref == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/providDeploy', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/providDeploy', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].someipserver != null) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.forEach(item => {
                        if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].someipserver == (item.path + '/' + item.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/providSomeIPS', end: item.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/providSomeIPS', item.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].eventP.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].eventP.forEach((eventp, i) => {
                        if (eventp.event != null) {
                            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                                if (item.eventD.length > 0) {
                                    item.eventD.forEach(data => {
                                        if (eventp.event == (item.path + '/' + item.name + '/' + data.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/proviedEventP-' + i, end: item.uuid })
                                            EventBus.$emit('new-line', ele.uuid + '/proviedEventP', item.uuid)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].method != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].method.forEach((method, i) => {
                        if (method.method != null) {
                            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                                if (item.methodD.length > 0) {
                                    item.methodD.forEach(data => {
                                        if (method.method == (item.path + '/' + item.name + '/' + data.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/proviedMethod-' + i, end: item.uuid })
                                            EventBus.$emit('new-line', ele.uuid + '/proviedMethod', item.uuid)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].eventG.forEach((data, i) => {
                    if (data.eventG != null) {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(eve => {
                            eve.eventG.forEach(item => {
                                if (data.eventG == (eve.path + '/' + eve.name + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/providEventG-' + i, end: eve.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/providEventG' + data.id, eve.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/providE', eve.uuid)
                                    }
                                }
                            })
                        })
                    }
                    if (data.server != null) {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.forEach(item => {
                            if (data.server == (item.path + '/' + item.name)) {
                                this.commit('setConnectionline', { start: ele.uuid + '/providServer-' + i, end: item.uuid })
                                if (i == 0) {
                                    EventBus.$emit('new-line', ele.uuid + '/providServer' + data.id, item.uuid)
                                } else {
                                    EventBus.$emit('new-line', ele.uuid + '/providE', item.uuid)
                                }
                            }
                        })
                    }
                })
            } else if (ele.parent == constant.Error_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Service.Error[idxelement].errorDref != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.forEach(domain => {
                        if (state.SAHLProject[state.openProjectIndex].Service.Error[idxelement].errorDref == (domain.path + '/' + domain.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/errordomain', end: domain.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/errordomain', domain.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.Errorset_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxelement].errorref.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxelement].errorref.forEach(data => {
                        if (data.error != null) {
                            state.SAHLProject[state.openProjectIndex].Service.Error.forEach(item => {
                                if (data.error == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/error-' + data.id, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/error', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.FileArray_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxelement].sdgs.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxelement].sdgs.forEach((data, i) => {
                        if (data.port != null) {
                            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(item => {
                                if (item.prport.length > 0) {
                                    item.prport.forEach(pr => {
                                        if (data.port == (item.path + '/' + item.name + '/' + pr.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/PERArraySDG-' + i, end: item.uuid })
                                            EventBus.$emit('new-line', ele.uuid + '/PERArraySDG', item.uuid)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.KeyValueData_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxelement].keyValue.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxelement].keyValue.forEach((data, i) => {
                        if (data.datatype != null) {
                            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                                if (data.datatype == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PERKeyV-' + i, end: item.uuid })
                                    if (i == 0) {
                                        EventBus.$emit('new-line', ele.uuid + '/PERDBImple' + data.name, item.uuid)
                                    } else {
                                        EventBus.$emit('new-line', ele.uuid + '/PERKeyV', item.uuid)
                                    }
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxelement].sdgs.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxelement].sdgs.forEach((data, i) => {
                        if (data.port != null) {
                            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(item => {
                                if (item.prport.length > 0) {
                                    item.prport.forEach(pr => {
                                        if (data.port == (item.path + '/' + item.name + '/' + pr.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/PERKeyDSDG-' + i, end: item.uuid })
                                            EventBus.$emit('new-line', ele.uuid + '/PERKeyDSDG', item.uuid)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.KeyValueDI_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxelement].data.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxelement].data.forEach((el, i) => {
                        if (el.type != null) {
                            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                                if (el.type == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PERData-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/PERData', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxelement].serialization.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxelement].serialization.forEach((data, i) => {
                        if (data.serial != null) {
                            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                                if (data.serial == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PERSerial-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/PERSerial', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.PortProtoFileA_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxelement].fileArray != null) {
                    state.SAHLProject[state.openProjectIndex].Per.PERFileArray.forEach(data => {
                        if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxelement].fileArray == (data.path + '/' + data.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/PPPtoFileArray', end: data.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/PPPtoFileArray', data.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxelement].port != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(item => {
                        if (item.prport.length > 0) {
                            item.prport.forEach(data => {
                                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxelement].port == (item.path + '/' + item.name + '/' + data.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PPPtoFilePRPort', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/PPPtoFilePRPort', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxelement].process != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach(pro => {
                        if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxelement].process == (pro.path + '/' + pro.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/PPPtoFileProcess', end: pro.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/PPPtoFileProcess', pro.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.PortProtoKeyV_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxelement].keyValue != null) {
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.forEach(data => {
                        if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxelement].keyValue == (data.path + '/' + data.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/PPPtoKeyValue', end: data.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/PPPtoKeyValue', data.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxelement].port != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(item => {
                        if (item.prport.length > 0) {
                            item.prport.forEach(data => {
                                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxelement].port == (item.path + '/' + item.name + '/' + data.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PPPtoKeyPRPort', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/PPPtoKeyPRPort', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxelement].process != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach(pro => {
                        if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxelement].process == (pro.path + '/' + pro.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/PPPtoKeyProcess', end: pro.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/PPPtoKeyProcess', pro.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.ContritoMachine_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxelement].machine != null) {
                    state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(data => {
                        if (state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxelement].machine == (data.path + '/' + data.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/PHMtoMachine', end: data.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/PHMtoMachine', data.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxelement].contri.length > 0) {
                    state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxelement].contri.forEach((data, i) => {
                        if (data.con != null) {
                            state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.forEach(item => {
                                if (data.con == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PHMContri-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/PHMContri', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.RecoveryActionInterf_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].process != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach(data => {
                        if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].process == (data.path + '/' + data.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/PHMViaPro', end: data.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/PHMViaPro', data.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].swcomponent != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(pro => {
                        if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].swcomponent == (pro.path + '/' + pro.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/PHMViaSWCompo', end: pro.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/PHMViaSWCompo', pro.uuid)
                        }
                    })
                }

                if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].port != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(item => {
                        if (item.pport.length > 0) {
                            item.pport.forEach(data => {
                                if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].port == (item.path + '/' + item.name + '/' + data.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/PHMViaPPort', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/PHMViaPPort', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].phmRecovery != null) {
                    state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.forEach(pro => {
                        if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].phmRecovery == (pro.path + '/' + pro.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/PHMViaRecovery', end: pro.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/PHMViaRecovery', pro.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.ComFieldGrant_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxelement].fieldD != null) {
                    state.SAHLProject[state.openProjectIndex].IamG.FieldGD.forEach(design => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxelement].fieldD == (design.path + '/' + design.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/FieldGD', end: design.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/FieldGD', design.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxelement].provide != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach(pro => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxelement].provide == (pro.path + '/' + pro.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/FGProvide', end: pro.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/FGProvide', pro.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.ComEventGrant_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].IamG.EventG[idxelement].eventD != null) {
                    state.SAHLProject[state.openProjectIndex].IamG.EventGD.forEach(design => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.EventG[idxelement].eventD == (design.path + '/' + design.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/EventGD', end: design.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/EventGD', design.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.EventG[idxelement].provide != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach(pro => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.EventG[idxelement].provide == (pro.path + '/' + pro.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/EGProvide', end: pro.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/EGProvide', pro.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.ComMethodGrant_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxelement].methodD != null) {
                    state.SAHLProject[state.openProjectIndex].IamG.MethodGD.forEach(design => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxelement].methodD == (design.path + '/' + design.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/MethodGD', end: design.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/MethodGD', design.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxelement].provide != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach(pro => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxelement].provide == (pro.path + '/' + pro.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/MGProvide', end: pro.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/MGProvide', pro.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.ComFieldGDesign_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxelement].processD != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.forEach(proce => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxelement].processD == (proce.path + '/' + proce.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/FGDproD', end: proce.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/FGDproD', proce.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxelement].SIField != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                        if (item.fields.length > 0) {
                            item.fields.forEach(service => {
                                if (state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxelement].SIField == (item.path + '/' + item.name + '/' + service.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/FGDserviceI', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/FGDserviceI', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.ComEventGDesign_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxelement].processD != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.forEach(proce => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxelement].processD == (proce.path + '/' + proce.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/EGDproD', end: proce.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/EGDproD', proce.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxelement].SIEvent != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                        if (item.events.length > 0) {
                            item.events.forEach(service => {
                                if (state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxelement].SIEvent == (item.path + '/' + item.name + '/' + service.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/EGDserviceI', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/EGDserviceI', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.ComMethodGDesign_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxelement].processD != null) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.forEach(proce => {
                        if (state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxelement].processD == (proce.path + '/' + proce.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/MGDproD', end: proce.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/MGDproD', proce.uuid)
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxelement].SIMethod != null) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                        if (item.methods.length > 0) {
                            item.methods.forEach(service => {
                                if (state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxelement].SIMethod == (item.path + '/' + item.name + '/' + service.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/MGDserviceI', end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/MGDserviceI', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.SWCluster_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].executable.length > 0) {
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].executable.forEach((data, i) => {
                        if (data.execut != null) {
                            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.forEach(item => {
                                if (data.execut == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/SCExecutable-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/SCExecutable', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].machineD.length > 0) {
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].machineD.forEach((data, i) => {
                        if (data.machine != null) {
                            state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.forEach(item => {
                                if (data.machine == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/SCMachineD-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/SCMachineD', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].toMachine.length > 0) {
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].toMachine.forEach((data, i) => {
                        if (data.mapping != null) {
                            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.forEach(item => {
                                if (data.mapping == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/SCtoMachine-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/SCtoMachine', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].process.length > 0) {
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].process.forEach((data, i) => {
                        if (data.pro != null) {
                            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach(item => {
                                if (data.pro == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/SCProcess-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/SCProcess', item.uuid)
                                }
                            })
                        }
                    })
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].sswc.length > 0) {
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].sswc.forEach((data, i) => {
                        if (data.swc != null) {
                            state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.forEach(item => {
                                if (data.swc == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/SCswc-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/SCswc', item.uuid)
                                }
                            })
                        }
                    })
                }
            } else if (ele.parent == constant.SWPackage_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxelement].swcluster != null) {
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.forEach(swc => {
                        if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxelement].swcluster == (swc.path + '/' + swc.name)) {
                            this.commit('setConnectionline', { start: ele.uuid + '/UCMSWPSWC', end: swc.uuid })
                            EventBus.$emit('new-line', ele.uuid + '/UCMSWPSWC', swc.uuid)
                        }
                    })
                }
            } else if (ele.parent == constant.VehiclePackage_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(item => item.uuid === ele.uuid)
                if (state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxelement].ucms.length > 0) {
                    state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxelement].ucms.forEach((data, i) => {
                        if (data.module != null) {
                            state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.forEach(item => {
                                if (data.module == (item.path + '/' + item.name)) {
                                    this.commit('setConnectionline', { start: ele.uuid + '/UCMModule-' + i, end: item.uuid })
                                    EventBus.$emit('new-line', ele.uuid + '/UCMModule', item.uuid)
                                }
                            })
                        }
                    })
                }
            }
        })
        state.inputFileList = []
    },

    addElementCompuMehtod(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            category: payload.category,
            scales: payload.scales,
        })
        state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.CompuMethod_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editCompuMehtod(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.findIndex(data => data.uuid === payload.uuid)
        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.CompuMethod_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].left[payload.location] = payload.left
                //console.log(state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].top[payload.location] + ' / ' + state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].left[payload.location])
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].zindex = payload.zindex
        }
    },
    addElementDataConstr(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            lowerlimit: payload.lowerlimit,
            upperlimit: payload.upperlimit,
        })
        state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.DataConstr_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editDataConstr(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.findIndex(data => data.uuid === payload.uuid)
        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.DataConstr_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxElement].zindex = payload.zindex
        }
    },
    addElementApplicationArray(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            category: payload.category,
            dynamicArrySize: payload.dynamicArrySize,
            elename: payload.elename,
            elehandling: payload.elehandling,
            elesemantics: payload.elesemantics,
            elemaxnumber: payload.elemaxnumber,
        })
        state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.ApplicationArray_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editApplicationArray(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.ApplicationArray_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxElement].zindex = payload.zindex
        }
    },
    addElementImplementation(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        //console.log('!!! UUID !!!' + newUUid)
        state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            category: payload.category,
            namespace: payload.namespace,
            arraysize: payload.arraysize,
            typeemitter: payload.typeemitter,
            typeref: payload.typeref,
            templatetype: payload.templatetype,
            desc: payload.desc,
            ddpc: payload.ddpc,
            idtelement: payload.idtelement,
        })
        state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editImplementation(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].zindex = payload.zindex
        }
    },
    addElementMachine(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Machine.Machine.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            machinedesign: payload.machinedesign,
            timeout: payload.timeout,
            hwelement: payload.hwelement,
            executable: payload.executable,
            admin: payload.admin,
            functiongroup: payload.functiongroup,
            processor: payload.processor,
            moduleinstant: payload.moduleinstant,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editMachine(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].zindex = payload.zindex
        }
    },
    addElementHWElement(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Machine.HWElement.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            category: payload.category,
            attribute: payload.attribute,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.HWElement_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editHWElement(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Machine.HWElement.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.HWElement_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxElement].zindex = payload.zindex
        }
    },

    addElementMachineDesign(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            access: payload.access,
            resettimer: payload.resettimer,
            connector: payload.connector,
            servicediscover: payload.servicediscover
        })
        state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editMachineDesign(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].zindex = payload.zindex
        }
    },
    addElementModeDeclarationGroup(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            modedeclaration: payload.modedeclaration,
            initmode: payload.initmode,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.ModeDeclarationGroup_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editModeDeclarationGroup(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.ModeDeclarationGroup_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxElement].zindex = payload.zindex
        }
    },
    addElementEthernetCluster(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            conditional: payload.conditional,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editEthernetCluster(state, payload) {
        //console.log('editEthernetCluster' + payload.uuid + '///' + payload.zindex)
        var idxElement = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].zindex = payload.zindex
        }
    },
    addElementProtoMachineMapping(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            ptmmname: payload.ptmmname,
            ptmmMachine: payload.ptmmMachine,
            ptmmProcess: payload.ptmmProcess,
        })
        state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcesstoMachineMapping_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editProtoMachineMapping(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcesstoMachineMapping_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].zindex = payload.zindex
        }
    },
    addElementSWComponents(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            pport: payload.pport,
            rport: payload.rport,
            prport: payload.prport,
        })
        state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editSWComponents(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].zindex = payload.zindex
        }
    },
    addElementProcess(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            prodesign: payload.prodesign,
            determin: payload.determin,
            execut: payload.execut,
            machinname: payload.machinname,
            machinetype: payload.machinetype,
            dependent: payload.dependent,
        })
        state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editProcess(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].zindex = payload.zindex
        }
    },
    addElementProcessDesign(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            executableref: payload.executableref,
            determin: payload.determin
        })
        state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcessDesign_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editProcessDesign(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcessDesign_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].zindex = payload.zindex
        }
    },
    addElementExecutable(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            version: payload.version,
            category: payload.category,
            buildType: payload.buildType,
            loggingBehabior: payload.loggingBehabior,
            reportingBehabior: payload.reportingBehabior,
            swname: payload.swname,
            applicationtyperef: payload.applicationtyperef

        })
        state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Executable_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editExecutable(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Executable_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxElement].left, payload.location, payload.left)
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxElement].top[payload.location] = payload.top
                //state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxElement].left[payload.location] = payload.left
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxElement].zindex = payload.zindex
        }
    },
    addElementStartupConfig(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            config: payload.config,
        })
        state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.StartupConfig_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editStartupConfig(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.StartupConfig_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxElement].zindex = payload.zindex
        }
    },
    addElementDeterministicClien(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            cycletiem: payload.cycletiem,
            numofworkers: payload.numofworkers,
        })
        state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.DeterministicClient_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editDeterministicClien(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.DeterministicClient_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxElement].zindex = payload.zindex
        }

    },
    addElementSomeIPService(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            service: payload.service,
            majversion: payload.majversion,
            minversion: payload.minversion,
            id: payload.id,
            eventG: payload.eventG,
            eventD: payload.eventD,
            methodD: payload.methodD,
            fieldD: payload.fieldD,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editSomeIPService(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].zindex = payload.zindex
        }
    },
    addElementService(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            majversion: payload.versionMaj,
            minversion: payload.versionMin,
            namespace: payload.namespace,
            isservice: payload.isservice,
            events: payload.events,
            fields: payload.fields,
            methods: payload.methods
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editServiceInterface(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].zindex = payload.zindex
        }
    },
    addElementClient(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            retrydelay: payload.delay,
            retrymax: payload.max,
            timetolive: payload.timetolive,
            delaymax: payload.delaymax,
            delaymin: payload.delaymin,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.SomeIPEvents_index].children[constant.Client_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editClient(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.SomeIPEvents_index].children[constant.Client_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxElement].zindex = payload.zindex
        }
    },
    addElementServer(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            delaymax: payload.delaymax,
            delaymin: payload.delaymin,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.SomeIPEvents_index].children[constant.Server_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editServer(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.SomeIPEvents_index].children[constant.Server_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxElement].zindex = payload.zindex
        }
    },
    addElementSomeIPClient(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            findtime: payload.findtime,
            inidelaymax: payload.inidelaymax,
            inidelaymin: payload.inidelaymin,
            inibasedelay: payload.inibasedelay,
            inirepetimax: payload.inirepetimax,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPClient_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editSomeIPClient(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPClient_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxElement].zindex = payload.zindex
        }
    },
    addElementSomeIPServer(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            inidelaymax: payload.inidelaymax,
            inidelaymin: payload.inidelaymin,
            inibasedelay: payload.inibasedelay,
            inirepetimax: payload.inirepetimax,
            delaymax: payload.delaymax,
            delaymin: payload.delaymin,
            offer: payload.offer,
            timetolive: payload.tiemtolive,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPServer_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editSomeIPServer(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPServer_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxElement].zindex = payload.zindex
        }
    },
    addElementSomeIPtoMachine(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            ccref: payload.ccref,
            udp: payload.udp,
            tcp: payload.tcp,
            serviceI: payload.serviceI,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editSomeIPtoMachine(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].zindex = payload.zindex
        }
    },
    addElementToPortPrototype(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            selectPort: payload.selectPort,
            porttype: payload.porttype,
            process: payload.process,
            selectServiceIns: payload.selectServiceIns,
            serviceIns: payload.serviceIns,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editToPortPrototype(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].zindex = payload.zindex
        }
    },
    addElementRequiredSomeIP(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            deployref: payload.deployref,
            minorver: payload.minover,
            serviceInsid: payload.id,
            someipclient: payload.clientref,
            version: payload.ver,
            method: payload.method,
            requiredevent: payload.requiredevent
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editRequiredSomeIP(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].zindex = payload.zindex
        }
    },
    addElementProvidedSomeIP(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            deployref: payload.deployref,
            someipserver: payload.someips,
            instanceid: payload.id,
            eventP: payload.eventP,
            method: payload.method,
            eventG: payload.eventG
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editProvidedSomeIP(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].zindex = payload.zindex
        }
    },

    addElementError(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.Error.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            desc: payload.desc,
            errorcode: payload.errorcode,
            errorDref: payload.errorDref
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Error_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editError(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Error_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.Error[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.Error[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.Error[idxElement].zindex = payload.zindex
        }
    },
    addElementErrorSet(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.ErrorSet.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            errorref: payload.errorref
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Errorset_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editErrorSet(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Errorset_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].zindex = payload.zindex
        }
    },
    addElementErrorDomain(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            namespace: payload.namespace,
            value: payload.value,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.ErrorDomain_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editErrorDomain(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.ErrorDomain_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxElement].zindex = payload.zindex
        }
    },
    ////////////////////////////////////
    addElementPERFileArray(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Per.PERFileArray.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            sdgs: payload.sdgs,
            maxSize: payload.maxSize,
            miniSize: payload.miniSize,
            updateS: payload.updateS,
            uri: payload.uri,
            files: payload.files,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileArray_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPERFileArray(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileArray_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxElement].zindex = payload.zindex
        }
    },
    addElementPERFileProxy(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            category: payload.category,
            minisize: payload.minisize,
            redundancy: payload.redundancy,
            updateS: payload.updateS,
            encoding: payload.encoding,
            proxy: payload.proxy,
            maxfiles: payload.maxfiles
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileProxyInterf_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPERFileProxy(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileProxyInterf_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[idxElement].zindex = payload.zindex
        }
    },
    addElementPERKeyValueD(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            sdgs: payload.sdgs,
            maxSize: payload.maxSize,
            miniSize: payload.miniSize,
            updateS: payload.updateS,
            uri: payload.uri,
            redundancy: payload.redundancy,
            keyValue: payload.keyValue
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPERKeyValueD(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxElement].zindex = payload.zindex
        }
    },
    addElementPERKeyValueDI(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            minisize: payload.minisize,
            redundancy: payload.redundancy,
            updateS: payload.updateS,
            data: payload.data,
            serialization: payload.serialization
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueDI_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPERKeyValueDI(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueDI_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxElement].zindex = payload.zindex
        }
    },
    addElementPERPPtoFileArray(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            fileArray: payload.fileArray,
            port: payload.port,
            process: payload.process
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPERPPtoFileArray(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxElement].zindex = payload.zindex
        }
    },
    addElementPERPPtoKeyValue(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            keyValue: payload.keyValue,
            port: payload.port,
            process: payload.process
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPERPPtoKeyValue(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxElement].zindex = payload.zindex
        }
    },
    addElementPHMContribution(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.PlatformHealthManagC_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPHMContribution(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.PlatformHealthManagC_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMContribution[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMContribution[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Phm.PHMContribution[idxElement].zindex = payload.zindex
        }
    },
    addElementPHMtoMachine(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            machine: payload.machine,
            contri: payload.contri
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.ContritoMachine_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPHMtoMachine(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.ContritoMachine_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxElement].zindex = payload.zindex
        }
    },
    addElementPHMHealth(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            status: payload.status
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.HealthChannel_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPHMHealth(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.HealthChannel_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[idxElement].zindex = payload.zindex
        }
    },
    addElementPHMRecovery(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            reconame: payload.reconame,
            faf: payload.faf,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryVA_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPHMRecovery(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryVA_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[idxElement].zindex = payload.zindex
        }
    },
    addElementPHMSupervised(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            checkpoint: payload.checkpoint
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.PHMSupervised_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPHMSupervised(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.PHMSupervised_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[idxElement].zindex = payload.zindex
        }
    },

    addElementRecoveryVia(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            process: payload.process,
            swcomponent: payload.swcomponent,
            port: payload.port,
            phmRecovery: payload.phmRecovery,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editPHMRecoveryVia(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].zindex = payload.zindex
        }
    },
    addElementMethodGD(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].IamG.MethodGD.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            processD: payload.processD,
            SIMethod: payload.SIMethod,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editMethodGD(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxElement].zindex = payload.zindex
        }
    },
    addElementEventGD(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].IamG.EventGD.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            processD: payload.processD,
            SIEvent: payload.SIEvent,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editEventGD(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxElement].zindex = payload.zindex
        }
    },
    addElementFieldGD(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].IamG.FieldGD.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            processD: payload.processD,
            SIField: payload.SIField,
            role: payload.role
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editFieldGD(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxElement].zindex = payload.zindex
        }
    },
    addElementMethodG(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].IamG.MethodG.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            methodD: payload.methodD,
            provide: payload.provide,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGrant_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editMethodG(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGrant_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxElement].zindex = payload.zindex
        }
    },
    addElementEventG(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].IamG.EventG.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            eventD: payload.eventD,
            provide: payload.provide,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGrant_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editEventG(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGrant_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.EventG[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.EventG[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].IamG.EventG[idxElement].zindex = payload.zindex
        }
    },
    addElementFieldG(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].IamG.FieldG.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            fieldD: payload.fieldD,
            provide: payload.provide,
            role: payload.role
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGrant_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editFieldG(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGrant_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxElement].zindex = payload.zindex
        }
    },
    addElementSoftWareCluster(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            category: payload.category,
            idVendor: payload.idVendor,
            version: payload.version,
            sdgs: payload.sdgs,
            executable: payload.executable,
            machineD: payload.machineD,
            toMachine: payload.toMachine,
            process: payload.process,
            sswc: payload.sswc
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editSoftWareCluster(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxElement].zindex = payload.zindex
        }
    },
    addElementSoftWarePackage(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            action: payload.action,
            activation: payload.activation,
            compSWPsize: payload.compSWPsize,
            deltaPakage: payload.deltaPakage,
            maximunVer: payload.maximunVer,
            minimunVer: payload.minimunVer,
            id: payload.id,
            postReboot: payload.postReboot,
            preReboot: payload.preReboot,
            swcluster: payload.swcluster,
            uncompSWCsize: payload.uncompSWCsize
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWPackage_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editSoftWarePackage(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWPackage_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxElement].zindex = payload.zindex
        }
    },
    addElementVehiclePackage(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            reposi: payload.reposi,
            sdgs: payload.sdgs,
            driver: payload.driver,
            rollout: payload.rollout,
            ucms: payload.ucms,
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.VehiclePackage_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editVehiclePackage(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.VehiclePackage_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxElement].zindex = payload.zindex
        }
    },
    addElementModuleInstant(state, payload) {
        var newUUid
        if (!payload.input) {
            newUUid = uuid.v1()
        } else {
            newUUid = payload.uuid
        }
        state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.push({
            uuid: newUUid,
            path: payload.path,
            top: payload.top,
            left: payload.left,
            zindex: payload.zindex,
            name: payload.name,
            ident: payload.ident
        })
        state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.ModuleInstantiation_index].children.push({ uuid: newUUid, name: payload.name, icon: payload.icon, validation: false, })
        if (!payload.input) {
            state.activeUUID = newUUid
        }
        EventBus.$emit('new-element', newUUid)
    },
    editModuleInstant(state, payload) {
        var idxElement = state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.findIndex(data => data.uuid === payload.uuid)

        if (payload.compo == "Name") {
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.ModuleInstantiation_index].children[idxElement].name = payload.name
        } else if (payload.compo == "drag") {
            Vue.set(state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant[idxElement].top, payload.location, payload.top)
            Vue.set(state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant[idxElement].left, payload.location, payload.left)
        } else if (payload.compo == "z") {
            state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant[idxElement].zindex = payload.zindex
        }
    },


    renameElement(state, payload) {
        var idxEle, ele, editmethod
        if (payload.parent == constant.CompuMethod_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxEle]
            editmethod = 'editCompuMehtod'
        } else if (payload.parent == constant.DataConstr_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxEle]
            editmethod = 'editDataConstr'
        } else if (payload.parent == constant.ApplicationArray_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxEle]
            editmethod = 'editApplicationArray'
        } else if (payload.parent == constant.Implementation_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxEle]
            editmethod = 'editImplementation'
        } else if (payload.parent == constant.Machine_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Machine.Machine[idxEle]
            editmethod = 'editMachine'
        } else if (payload.parent == constant.MachineDesigne_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxEle]
            editmethod = 'editMachineDesign'
        } else if (payload.parent == constant.EthernetCluster_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxEle]
            editmethod = 'editEthernetCluster'
        } else if (payload.parent == constant.ModeDeclarationGroup_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxEle]
            editmethod = 'editModeDeclarationGroup'
        } else if (payload.parent == constant.HWElement_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Machine.HWElement.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxEle]
            editmethod = 'editHWElement'
        } else if (payload.parent == constant.ProcesstoMachineMapping_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxEle]
            editmethod = 'editProtoMachineMapping'
        } else if (payload.parent == constant.SWComponents_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxEle]
            editmethod = 'editSWComponents'
        } else if (payload.parent == constant.Process_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxEle]
            editmethod = 'editProcess'
        } else if (payload.parent == constant.ProcessDesign_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxEle]
            editmethod = 'editProcessDesign'
        } else if (payload.parent == constant.Executable_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxEle]
            editmethod = 'editExecutable'
        } else if (payload.parent == constant.StartupConfig_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxEle]
            editmethod = 'editStartupConfig'
        } else if (payload.parent == constant.DeterministicClient_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxEle]
            editmethod = 'editDeterministicClien'
        } else if (payload.parent == constant.SomeIPServiceInterfaceDeployment_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxEle]
            editmethod = 'editSomeIPService'
        } else if (payload.parent == constant.ServiceInterface_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxEle]
            editmethod = 'editServiceInterface'
        } else if (payload.parent == constant.Client_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxEle]
            editmethod = 'editClient'
        } else if (payload.parent == constant.Server_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxEle]
            editmethod = 'editServer'
        } else if (payload.parent == constant.SomeIPClient_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxEle]
            editmethod = 'editSomeIPClient'
        } else if (payload.parent == constant.SomeIPServer_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxEle]
            editmethod = 'editSomeIPServer'
        } else if (payload.parent == constant.SomeIPToMachineMapping_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxEle]
            editmethod = 'editSomeIPtoMachine'
        } else if (payload.parent == constant.ToPortPrototypeMapping_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxEle]
            editmethod = 'editToPortPrototype'
        } else if (payload.parent == constant.RequiredSomeIP_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxEle]
            editmethod = 'editRequiredSomeIP'
        } else if (payload.parent == constant.ProvidedSomeIP_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxEle]
            editmethod = 'editProvidedSomeIP'
        } else if (payload.parent == constant.Error_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.Error[idxEle]
            editmethod = 'editError'
        } else if (payload.parent == constant.Errorset_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxEle]
            editmethod = 'editErrorSet'
        } else if (payload.parent == constant.ErrorDomain_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxEle]
            editmethod = 'editErrorDomain'
        } else if (payload.parent == constant.FileArray_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxEle]
            editmethod = 'editPERFileArray'
        } else if (payload.parent == constant.FileProxyInterf_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[idxEle]
            editmethod = 'editPERFileProxy'
        } else if (payload.parent == constant.KeyValueData_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxEle]
            editmethod = 'editPERKeyValueD'
        } else if (payload.parent == constant.KeyValueDI_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxEle]
            editmethod = 'editPERKeyValueDI'
        } else if (payload.parent == constant.PortProtoFileA_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxEle]
            editmethod = 'editPERPPtoFileArray'
        } else if (payload.parent == constant.PortProtoKeyV_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxEle]
            editmethod = 'editPERPPtoKeyValue'
        } else if (payload.parent == constant.PlatformHealthManagC_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution[idxEle]
            editmethod = 'editPHMContribution'
        } else if (payload.parent == constant.ContritoMachine_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxEle]
            editmethod = 'editPHMtoMachine'
        } else if (payload.parent == constant.HealthChannel_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[idxEle]
            editmethod = 'editPHMHealth'
        } else if (payload.parent == constant.RecoveryVA_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[idxEle]
            editmethod = 'editPHMRecovery'
        } else if (payload.parent == constant.PHMSupervised_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[idxEle]
            editmethod = 'editPHMSupervised'
        } else if (payload.parent == constant.RecoveryActionInterf_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxEle]
            editmethod = 'editPHMRecoveryVia'
        } else if (payload.parent == constant.ComFieldGrant_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxEle]
            editmethod = 'editFieldG'
        } else if (payload.parent == constant.ComEventGrant_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].IamG.EventG[idxEle]
            editmethod = 'editEventG'
        } else if (payload.parent == constant.ComMethodGrant_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxEle]
            editmethod = 'editMethodG'
        } else if (payload.parent == constant.ComFieldGDesign_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxEle]
            editmethod = 'editFieldGD'
        } else if (payload.parent == constant.ComEventGDesign_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxEle]
            editmethod = 'editEventGD'
        } else if (payload.parent == constant.ComMethodGDesign_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxEle]
            editmethod = 'editMethodGD'
        } else if (payload.parent == constant.SWCluster_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxEle]
            editmethod = 'editSoftWareCluster'
        } else if (payload.parent == constant.SWPackage_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxEle]
            editmethod = 'editSoftWarePackage'
        } else if (payload.parent == constant.VehiclePackage_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxEle]
            editmethod = 'editVehiclePackage'
        } else if (payload.parent == constant.ModuleInstantiation_str) {
            idxEle = state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.findIndex(item => item.uuid === payload.uuid)
            ele = state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant[idxEle]
            editmethod = 'editModuleInstant'
        }

        ele.name = payload.name
        this.commit(editmethod, { compo: "Name", uuid: payload.uuid, name: payload.name })
        this.commit('changePathElement', { uuid: payload.uuid, path: ele.path, name: ele.name })
    },
    changePathElement(state, payload) {
        var indices = this.getters.getchangenamelist(payload.uuid)
        indices.forEach(idx => {
            var startUUID = state.connectionLine[state.openProjectIndex].start[idx].split('/')
            var tableLine = startUUID[1].split('-')
            var idxElement = null,
                intablename = null,
                idxIDTab = null,
                idxIDTable = null
            if (tableLine[0] == 'ddpccompu') { // compu method 변경시 => implementation 에서 compu method ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].ddpc[tableLine[1]].compumethod = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'ddpcdata') { // data constr변경시 => implementation 에서 data constr ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].ddpc[tableLine[1]].dataconstr = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'typeref') { //implementation 변경시 =>  implementation 에서 implementation ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].typeref = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'templateType') { //implementation 변경시 =>   implementation 에서 implementation ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].templatetype = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'idtetable') { //implementation 변경시 =>   implementation 에서 implementation ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].idtelement[tableLine[1]].typeref = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'Eventtable') { //implementation 변경시 =>   ServiceInterface 에서 Implementation ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].events[tableLine[1]].type = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'Fieldtable') { //implementation 변경시 =>   ServiceInterface 에서 Implementation ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].fields[tableLine[1]].type = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'argtable') { //implementation 변경시 =>   ServiceInterface 에서 Implementation ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods[tableLine[2]].argument[tableLine[1]].type = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PERKeyV') { //ImplementationDataType 변경시 => PERKeyValueD 에서 ImplementationDataType ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(data => data.uuid === startUUID[0])
                intablename = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxElement].keyValue[tableLine[1]].datatype.split('/')
                state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxElement].keyValue[tableLine[1]].datatype = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
            } else if (tableLine[0] == 'PERData') { //ImplementationDataType 변경시 => PERKeyValueDI 에서 ImplementationDataType ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxElement].data[tableLine[1]].type = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PERSerial') { //ImplementationDataType 변경시 =>  PERKeyValueDI 에서 ImplementationDataType ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxElement].serialization[tableLine[1]].serial = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'machinefromptmm') { // Machine 변경시 => Process to Machine Mapping set 에서 Machine ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].ptmmMachine = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'processresorce') { //Machine 변경시 =>  Process 에서 Machine -> Module Instantiation ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'ModuleIns') {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[1]].resourceRef = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[1]].resourceRef.split('/')
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[1]].resourceRef = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'fgcontext') { //Machine 변경시 =>  Process 에서 Machine -> Function Group ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'functionG') {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].functionItem[tableLine[1]].contextMode = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].functionItem[tableLine[1]].contextMode.split('/')
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].functionItem[tableLine[1]].contextMode = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'edcontext') { //Machine 변경시 =>  Process 에서 Machine -> Execution dependency ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'functionG') {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].exection[tableLine[1]].contextMode = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].exection[tableLine[1]].contextMode.split('/')
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].exection[tableLine[1]].contextMode = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'PHMtoMachine') { // Machine 변경시 => PHMtoMachine 에서 Machine ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxElement].machine = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'machinedesign') { //MachineDesign 변경시 =>  machin에서 machinDesign ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].machinedesign = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'SCMachineD') { //MachineDesign 변경시 =>  Software Cluster에서 machinDesign ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxElement].machineD[tableLine[1]].machine = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'comconet') { //MachineDesign 변경시 =>   EthernetCluster에서 MachineDesign -> Communication Connector ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'CommunicationC') {
                    state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[tableLine[3]].channel[tableLine[2]].comconnect[tableLine[1]].connector = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[tableLine[3]].channel[tableLine[2]].comconnect[tableLine[1]].connector.split('/')
                    state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[tableLine[3]].channel[tableLine[2]].comconnect[tableLine[1]].connector = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'tomachinCC') { //MachineDesign 변경시 =>   SomeIPtoMachineMapping 에서 MachineDesgin의 Communication Connected ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'CommunicationC') {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].ccref = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].ccref.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].ccref = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'cctable') { //EthernetCluster 변경시 => machinDesign에서 EthernetCluster Endpoint ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].connector[tableLine[1]].endpoint = payload.path + '/' + payload.name + '/' + payload.condi + '/' + payload.channl + '/' + payload.endpoint
            } else if (tableLine[0] == 'sdctable') { //EthernetCluster 변경시 =>  machinDesign에서 EthernetCluster Endpoint ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].servicediscover[tableLine[1]].msia = payload.path + '/' + payload.name + '/' + payload.condi + '/' + payload.channl + '/' + payload.endpoint
            } else if (tableLine[0] == 'functiontable') { //Mode Declaration  변경시 =>  machin에서 Mode Declaration ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].functiongroup[tableLine[1]].type = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'processmodedeclar') { //Mode Declaration  변경시 =>  Process 에서 Mode Declaration ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].machinetype = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'fgtarget') { //Mode Declaration  변경시 =>  Process 에서  Module Declaration-> mode Declarations ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].functionItem[tableLine[1]].targetMode.split('/')
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].functionItem[tableLine[1]].targetMode = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
            } else if (tableLine[0] == 'edtarget') { //Mode Declaration  변경시 =>  Process 에서  Module Declaration-> mode Declarations ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].exection[tableLine[1]].targetMode.split('/')
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[2]].exection[tableLine[1]].targetMode = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
            } else if (tableLine[0] == 'hwelement') { //HW Element 변경시 =>  machin에서 HWElement ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].hwelement[tableLine[1]].hwelement = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'applicationtyperef') { //SW Component 변경시 =>  Executable 에서 SW Components ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxElement].applicationtyperef = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'toportport') { //SW Component 변경시 =>   Service Instance to port prototype 에서 SWComponent port ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'pPort' && state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].selectPort == 'P-PORT-PROTOTYPE') {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].porttype = payload.path + '/' + payload.name + '/' + payload.listname
                } else if (payload.changeName == 'prPort' && state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].selectPort == 'PR-PORT-PROTOTYPE') {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].porttype = payload.path + '/' + payload.name + '/' + payload.listname
                } else if (payload.changeName == 'rPort' && state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].selectPort == 'R-PORT-PROTOTYPE') {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].porttype = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].porttype.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].porttype = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'PERArraySDG') { //SW Component 변경시 =>  PERFileArray 에서 SW Component ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'prPort') {
                    state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxElement].sdgs[tableLine[1]].port = payload.path + '/' + payload.name + '/' + payload.listname
                } else if (payload.changeName == undefined) {
                    intablename = state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxElement].sdgs[tableLine[1]].port.split('/')
                    state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxElement].sdgs[tableLine[1]].port = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'PERKeyDSDG') { //SW Component 변경시 =>  PERKeyValueD 에서 SW Component ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'prPort') {
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxElement].sdgs[tableLine[1]].port = payload.path + '/' + payload.name + '/' + payload.listname
                } else if (payload.changeName == undefined) {
                    intablename = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxElement].sdgs[tableLine[1]].port.split('/')
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxElement].sdgs[tableLine[1]].port = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'PPPtoFilePRPort') { //SW Component 변경시 =>  PPP to File Array 에서 SW Component ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'prPort') {
                    state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxElement].port = payload.path + '/' + payload.name + '/' + payload.listname
                } else if (payload.changeName == undefined) {
                    intablename = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxElement].port.split('/')
                    state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxElement].port = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'PPPtoKeyPRPort') { //SW Component 변경시 =>  PPP to Key Value 에서 SW Component ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'prPort') {
                    state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxElement].port = payload.path + '/' + payload.name + '/' + payload.listname
                } else if (payload.changeName == undefined) {
                    intablename = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxElement].port.split('/')
                    state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxElement].port = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'PHMViaSWCompo') { //SW Component 변경시 =>  PHMRecoveryVia 에서 SW Components ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].swcomponent = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PHMViaPPort') { //SW Component 변경시 =>  PHMRecoveryVia 에서 SW Component p port ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'pPort') {
                    state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].port = payload.path + '/' + payload.name + '/' + payload.listname
                } else if (payload.changeName == undefined) {
                    intablename = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].port.split('/')
                    state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].port = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'processfromptmm') { //Process 변경 시  =>  Process to Machine Mapping set 에서 Process ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].ptmmProcess = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PPPtoFileProcess') { //Process 변경시 =>  PPP to File Array 에서 Process ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxElement].process = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PPPtoKeyProcess') { //Process 변경시 =>  PPP to Key Value 에서 Process ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxElement].process = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PHMViaPro') { //Process 변경시 =>  PHMRecoveryVia 에서 Process ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].process = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'SCProcess') { //Process 변경시 =>  Software Cluster에서 Process ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxElement].process[tableLine[1]].pro = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'processprodesign') { //ProcessDesign 변경 시  =>   Process 에서 Process Design ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].prodesign = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'toportprocess') { //ProcessDesign 변경 시  =>   Service Instance to port prototype 에서 process design ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].process = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'MGDproD') { //ProcessDesign 변경 시  =>   MethodGD 에서 process design ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxElement].processD = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'EGDproD') { //ProcessDesign 변경 시  =>   EventGD 에서 process design ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxElement].processD = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'FGDproD') { //ProcessDesign 변경 시  =>   FieldGD 에서 process design ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxElement].processD = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'prodesignexecutable') { //Executable 변경시 =>  ProcessDesign 에서  Executable ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].executableref = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'processexecut') { //Executable 변경시 =>  Process 에서 Executable ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].execut = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'SCExecutable') { //Executable 변경시 =>  Software Cluster에서 Executable ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxElement].executable[tableLine[1]].execut = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'processstartup') { // Startup Config 변경시 =>  Process 에서 Startup Config ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[1]].startupConfigRef = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'processdetermin') { //Deterministric  변경시 =>  Process 에서 Deterministric ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].determin = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'event') { //Service Deployment 변경시 =>  ServiceInterface Deploymant에서 serviceinterface Deploymant Event Deployment ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'EventD') {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventG[tableLine[2]].event[tableLine[1]].event = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventG[tableLine[2]].event[tableLine[1]].event.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventG[tableLine[2]].event[tableLine[1]].event = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'requiredDeploy') { //Service Deployment 변경시 => Required SomeIP Service Instance 에서 Service Deployment ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].deployref = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'requiredMethod') { //Service Deployment 변경시 =>  Required SomeIP Service Instance 에서 Service Deployment Method Deployment ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'MethodD') {
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].method[tableLine[1]].method = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].method[tableLine[1]].method.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].method[tableLine[1]].method = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'requiredEventG') { //Service Deployment 변경시 =>  Required SomeIP Service Instance 에서 Service Deployment Event Group ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'EventG') {
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].requiredevent[tableLine[1]].eventG = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].requiredevent[tableLine[1]].eventG.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].requiredevent[tableLine[1]].eventG = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'providDeploy') { //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deployment ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].deployref = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'proviedEventP') { //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deploment의  eventD ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'EventD') {
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventP[tableLine[1]].event = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventP[tableLine[1]].event.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventP[tableLine[1]].event = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'proviedMethod') { //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deploment의 MethodD ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'MethodD') {
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].method[tableLine[1]].method = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].method[tableLine[1]].method.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].method[tableLine[1]].method = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'providEventG') { //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deploment의 eventG ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'EventG') {
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[tableLine[1]].eventG = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[tableLine[1]].eventG.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[tableLine[1]].eventG = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'pportQSC') { //ServiceInterface 변경 시 =>  SW Components의 Queued 에서 ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].queued, tableLine[1])
                if (payload.changeName == 'serviceEventD') {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].queued[idxIDTable].dataE = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].queued[idxIDTable].dataE.split('/')
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].queued[idxIDTable].dataE = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'pportFSC') { //ServiceInterface 변경 시 =>  SW Components의 field 에서 ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].field, tableLine[1])
                if (payload.changeName == 'field') {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].field[idxIDTable].dataE = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].field[idxIDTable].dataE.split('/')
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].field[idxIDTable].dataE = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'PPortI') { //ServiceInterface 변경 시 =>  SW Components 에서 ServiceInterface ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[idxIDTab].interface = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PRPortI') { //ServiceInterface 변경 시 =>  SW Components 에서 ServiceInterface ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport[idxIDTab].interface = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'RPortI') { //ServiceInterface 변경 시 =>  SW Components 에서 ServiceInterface ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].interface = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'rportQRC') { //ServiceInterface 변경 시 =>  SW Components의 queued 에서 ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].queued, tableLine[1])
                if ((payload.changeName == 'field' && state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].queued[idxIDTable].select == "FIELD") ||
                    (payload.changeName == 'serviceEventD' && state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].queued[idxIDTable].select == "VARIABLE-DATA-PROTOTYPE")) {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].queued[idxIDTable].dataE = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].queued[idxIDTable].dataE.split('/')
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].queued[idxIDTable].dataE = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'rportCC') { //ServiceInterface 변경 시 =>  SW Components의 client 에서 ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].client, tableLine[1])
                if (payload.changeName == 'serviceMethodD') {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].client[idxIDTable].operation = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].client[idxIDTable].operation.split('/')
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[idxIDTab].client[idxIDTable].operation = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'service') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서 serviceInterface ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].service = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'serviceEventD') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서 serviceinterface Event ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'serviceEventD') {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventD[tableLine[1]].event = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventD[tableLine[1]].event.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventD[tableLine[1]].event = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'serviceMethodD') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서 serviceinterface Method ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'serviceMethodD') {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].methodD[tableLine[1]].method = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].methodD[tableLine[1]].method.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].methodD[tableLine[1]].method = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'field') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서 serviceinterface Field ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'field') {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[tableLine[1]].field = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[tableLine[1]].field.split('/')
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[tableLine[1]].field = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'MGDserviceI') { //ServiceInterface 변경 시 =>  MethodGD에서 serviceinterface Method ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'serviceMethodD') {
                    state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxElement].SIMethod = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxElement].SIMethod.split('/')
                    state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxElement].SIMethod = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'EGDserviceI') { //ServiceInterface 변경 시 =>  EventGD에서 serviceinterface Event ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'serviceEventD') {
                    state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxElement].SIEvent = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxElement].SIEvent.split('/')
                    state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxElement].SIEvent = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'FGDserviceI') { //ServiceInterface 변경 시 =>  FieldGD에서 serviceinterface Field ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(data => data.uuid === startUUID[0])
                if (payload.changeName == 'field') {
                    state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxElement].SIField = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxElement].SIField.split('/')
                    state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxElement].SIField = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'requiredClient') { //Client event 변경시 => Required SomeIP Service Instance 에서 Client event ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].requiredevent[tableLine[1]].client = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'providServer') { //Server event 변경시 =>  Provided SomeIP Service Instance 에서 Server ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[tableLine[1]].server = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'requiredSomeIPC') { //SomeIP Client 변경시 => Required SomeIP Service Instance 에서 SomeIP Client ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].someipclient = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'providSomeIPS') { //SomeIP Server 변경시 =>  Provided SomeIP Service Instance 에서 SomIP Server ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].someipserver = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'SCtoMachine') { //SoomeIP To Machine Mapping 변경시 =>  Software Cluster에서 SoomeIP To Machine Mapping ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxElement].toMachine[tableLine[1]].mapping = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'toMachinServiceIns') { //Required SomeIP 변경시 =>  SomeIPtoMachineMapping 에서 Required SomeIP ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].serviceI[tableLine[1]].service = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'toportservice') { //Required Provided 변경시 => Service Instance to port prototype 에서 provided,required ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === startUUID[0])
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE" && payload.req == false) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].serviceIns = payload.path + '/' + payload.name
                } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE" && payload.req == true) {
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].serviceIns = payload.path + '/' + payload.name
                }
            } else if (tableLine[0] == 'toMachinServiceIns') { //Provided SomeIP 변경시 =>  SomeIPtoMachineMapping 에서 Provided SomeIP ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].serviceI[tableLine[1]].service = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'FGProvide') { //Provided 변경시 =>  Field Grant 에서 Provided ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxElement].provide = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'EGProvide') { //Provided 변경시 =>  Event Grant 에서 Provided ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.EventG[idxElement].provide = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'MGProvide') { //Provided 변경시 =>  Method Grant 에서 Provided ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxElement].provide = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'methoderrors') { // Error 변경시 => ServiceInterface 에서 Error ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods[tableLine[2]].errorSet[tableLine[1]].error = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'error') { //Error 변경시 =>  Error Set 에서 Error  ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(data => data.uuid === startUUID[0])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].errorref, tableLine[1])
                state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].errorref[idxIDTable].error = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'methoderror') { // Error set 변경시 =>  ServiceInterface 에서 ErrorSet ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods[tableLine[2]].error[tableLine[1]].error = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'errordomain') { //ErrorDomain 변경시 =>  Error 에서 Error Domain ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.Error[idxElement].errorDref = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PPPtoFileArray') { //Per File Array 변경시 =>  PPP to File Array 에서 Per File Array ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxElement].fileArray = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PPPtoKeyValue') { //per Key Value Data 변경시 =>  PPP to Key Value 에서 per Key Value Data ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxElement].keyValue = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'prporttab') { //per Key Value Data Interface 변경 시 =>  SW Components의 prport provide 에서 ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport[idxIDTab].provide, tableLine[1])
                if (payload.changeName == 'PerDataInter') {
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport[idxIDTab].provide[idxIDTable].dataE = payload.path + '/' + payload.name + '/' + payload.listname
                } else {
                    intablename = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport[idxIDTab].provide[idxIDTable].dataE.split('/')
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport[idxIDTab].provide[idxIDTable].dataE = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                }
            } else if (tableLine[0] == 'PHMContri') { //PHMContribution 변경시 =>  PHMtoMachine 에서 PHMContribution ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxElement].contri[tableLine[1]].con = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'PHMViaRecovery') { //PHMRecovery 변경시 =>  PHMRecoveryVia 에서 PHMRecovery ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxElement].phmRecovery = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'FieldGD') { //Field Grant Design 변경시 =>  Field Grant 에서 Field Grant Design ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxElement].fieldD = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'EventGD') { //Event Grant Design 변경시 =>  Event Grant 에서 Event Grant Design ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.EventG[idxElement].eventD = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'MethodGD') { //Method Grant Design 변경시 =>  Method Grant 에서 Method Grant Design ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxElement].methodD = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'SCswc') { //SoftWareCluster 변경시 =>  Software Cluster에서 SoftWareCluster ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxElement].sswc[tableLine[1]].swc = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'UCMSWPSWC') { //SoftWareCluster 변경시 =>  SoftWarePackage 에서 SoftWareCluster ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxElement].swcluster = payload.path + '/' + payload.name
            } else if (tableLine[0] == 'UCMModule') { //ModuleInstant 변경시 =>  VehiclePackage 에서 ModuleInstant ref할때
                idxElement = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxElement].ucms[tableLine[1]].module = payload.path + '/' + payload.name
            }
        })
    },
    isintoErrorList(state, payload) {
        state.errorList.forEach((item, i) => {
            if (item.uuid == payload.uuid) {
                if (item.error == 'name' && payload.name != '') {
                    state.errorList.splice(i, 1)
                }
                if (item.error == 'path' && payload.path != '') {
                    state.errorList.splice(i, 1)
                }
                if (item.error == 'Name Space') {
                    var namespace = payload.namespace.split(',')
                    var isTrue = true
                    namespace.forEach((item, i) => {
                        if (!(item == '' && i == namespace.length - 1)) {
                            var strSymble = item.split('/')
                            console.log(strSymble)
                            if (strSymble.length != 2 || strSymble[0] == '' || strSymble[0] == undefined || strSymble[1] == '' || strSymble[1] == undefined) {
                                isTrue = false
                            }
                        }
                    })
                    if (isTrue) {
                        state.errorList.splice(i, 1)
                    }
                }
            }
        })
    },

    deleteRefTable(state, payload) {
        //console.log(payload.deletItemList)
        if (payload.deleteTab) {
            if (payload.deleteName == 'ModuleIns') { //Machine 변경시 =>  Process 에서 Machine -> Module Instantiation ref할때
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach((ele, i) => {
                    if (ele.dependent.length > 0) {
                        ele.dependent.forEach((data, n) => {
                            if (data.resourceRef == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                var idx = this.getters.getconnectLineNum(ele.uuid + '/processresorce-' + n)
                                if (idx != -1) {
                                    data.resourceRef = null
                                    EventBus.$emit('delete-line', idx)
                                    this.commit('deletConnectionline', { startnum: idx })
                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }
                        })
                    }
                })
            } else if (payload.deleteName == 'modeDeclar') { //Mode Declaration  변경시 =>  Process 에서  Module Declaration-> mode Declarations ref할때
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach((ele, i) => {
                    if (ele.dependent.length > 0) {
                        ele.dependent.forEach((data, n) => {
                            if (data.functionItem != null) {
                                data.functionItem.forEach((item, f) => {
                                    if (item.targetMode == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/fgtarget-' + f + '-' + n)
                                        if (idx != -1) {
                                            item.targetMode = null
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    }
                                })
                            }
                            if (data.exection != null) {
                                data.exection.forEach((item, f) => {
                                    if (item.targetMode == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/edtarget-' + f + '-' + n)
                                        if (idx != -1) {
                                            item.targetMode = null
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            } else if (payload.deleteName == 'methodSI') {
                //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Method ref할때
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach((ele, i) => {
                        if (ele.methodD.length > 0) {
                            ele.methodD.forEach((item, n) => {
                                if (item.method == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                    var idx = this.getters.getconnectLineNum(ele.uuid + '/serviceMethodD-' + n)
                                    if (idx != -1) {
                                        item.method = null
                                        EventBus.$emit('delete-line', idx)
                                        this.commit('deletConnectionline', { startnum: idx })
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
                                    }
                                }
                            })
                        }
                    })
                    //ServiceInterface 변경 시 =>  MethodGD에서에서 serviceinterface Event ref할때
                state.SAHLProject[state.openProjectIndex].IamG.MethodGD.forEach((ele, i) => {
                        if (ele.SIMethod == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                            var idx = this.getters.getconnectLineNum(ele.uuid + '/MGDserviceI')
                            if (idx != -1) {
                                ele.SIMethod = null
                                EventBus.$emit('delete-line', idx)
                                this.commit('deletConnectionline', { startnum: idx })
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].children[i].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                                state.navigatorList[state.openProjectIndex].validation = true
                            }
                        }
                    })
                    //ServiceInterface 변경 시 =>  SWConponent-> rport client에서  ref할때
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach((ele, i) => {
                    if (ele.rport.length > 0) {
                        ele.rport.forEach(port => {
                            if (port.client.length > 0) {
                                port.client.forEach(item => {
                                    if (item.operation == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/rportCC-' + item.id + '-' + port.id)
                                        if (idx != -1) {
                                            item.operation = null
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            } else if (payload.deleteName == 'eventG') {
                //Service Deployment 변경시 =>  Required SomeIP Service Instance 에서 Service Deployment Event Group ref할때
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.forEach((ele, i) => {
                        if (ele.requiredevent.length > 0) {
                            ele.requiredevent.forEach((item, n) => {
                                if (item.eventG == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                    var idx = this.getters.getconnectLineNum(ele.uuid + '/requiredEventG-' + n)
                                    if (idx != -1) {
                                        item.eventG = null
                                        EventBus.$emit('delete-line', idx)
                                        this.commit('deletConnectionline', { startnum: idx })
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
                                    }
                                }
                            })
                        }
                    })
                    //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deploment의 eventG ref할때
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach((ele, i) => {
                    if (ele.eventG.length > 0) {
                        ele.eventG.forEach((item, n) => {
                            if (item.eventG == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                var idx = this.getters.getconnectLineNum(ele.uuid + '/providEventG-' + n)
                                if (idx != -1) {
                                    item.eventG = null
                                    EventBus.$emit('delete-line', idx)
                                    this.commit('deletConnectionline', { startnum: idx })
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }
                        })
                    }
                })
            } else if (payload.deleteName == 'machineD') { //EthernetCluster 변경기 => MachineDesign에서 communication-C, service discover -> endpoint ref할때
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.forEach((ele, i) => {
                    if (ele.connector.length > 0) {
                        ele.connector.forEach(item => {
                            if (item.endpoint != null) {
                                var tabName = item.endpoint.split('/')
                                if ((item.endpoint == (payload.path + '/' + payload.name + '/' + payload.tabName) && payload.deletTab == '3') ||
                                    ((tabName[0] + '/' + tabName[1]) == (payload.path + '/' + payload.name) && payload.deletTab == '2' && (tabName[2] + '/' + tabName[3] == payload.tabName)) ||
                                    ((tabName[0] + '/' + tabName[1]) == (payload.path + '/' + payload.name) && payload.deletTab == '1' && (tabName[2] == payload.tabName))) {
                                    item.endpoint = null
                                    state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }
                        })
                    }
                    if (ele.servicediscover.length > 0) {
                        ele.servicediscover.forEach(item => {
                            if (item.msia != null) {
                                var tabName = item.msias.split('/')
                                if ((item.msia == (payload.path + '/' + payload.name + '/' + payload.tabName) && payload.deletTab == '3') ||
                                    ((tabName[0] + '/' + tabName[1]) == (payload.path + '/' + payload.name) && payload.deletTab == '2' && (tabName[2] + '/' + tabName[3] == payload.tabName)) ||
                                    ((tabName[0] + '/' + tabName[1]) == (payload.path + '/' + payload.name) && payload.deletTab == '1' && (tabName[2] == payload.tabName))) {
                                    item.msia = null
                                    state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }
                        })
                    }
                })
            } else if (payload.deleteName == 'ptab' || payload.deleteName == 'rtab' || payload.deleteName == 'prtab') {
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.forEach((ele, i) => {
                    if ((ele.selectPort == 'P-PORT-PROTOTYPE' && payload.deleteName == 'ptab' && ele.porttype == (payload.path + '/' + payload.name + '/' + payload.tabName)) ||
                        (ele.selectPort == 'R-PORT-PROTOTYPE' && payload.deleteName == 'rtab' && ele.porttype == (payload.path + '/' + payload.name + '/' + payload.tabName)) ||
                        (ele.selectPort == 'PR-PORT-PROTOTYPE' && payload.deleteName == 'prtab' && ele.porttype == (payload.path + '/' + payload.name + '/' + payload.tabName))) {
                        var idx = this.getters.getconnectLineNum(ele.uuid + '/toportport')
                        if (idx != -1) {
                            ele.porttype = null
                            EventBus.$emit('delete-line', idx)
                            this.commit('deletConnectionline', { startnum: idx })
                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children[i].validation = true
                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].validation = true
                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                            state.navigatorList[state.openProjectIndex].validation = true
                        }
                    }
                })
                if (payload.deleteName == 'pPort') {
                    //SWComponemt 변경 시 =>  PHMRecoveryVia SWComponemt P port ref할때
                    state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.forEach((ele, i) => {
                        if (ele.port == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                            var idx = this.getters.getconnectLineNum(ele.uuid + '/PHMViaPPort')
                            ele.port = null
                            if (idx != -1) {
                                ele.port = null
                                EventBus.$emit('delete-line', idx)
                                this.commit('deletConnectionline', { startnum: idx })
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children[i].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                                state.navigatorList[state.openProjectIndex].validation = true
                            }
                        }
                    })
                }
                if (payload.deleteName == 'prPort') {
                    //SWComponemt 변경 시 =>  PERFileArray 에서 SWComponemt의  pr port ref할때
                    state.SAHLProject[state.openProjectIndex].Per.PERFileArray.forEach((ele, i) => {
                            if (ele.sdgs.length > 0) {
                                ele.sdgs.forEach((item, n) => {
                                    if (item.port == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/PERArraySDG-' + n)
                                        if (idx != -1) {
                                            item.port = null
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileArray_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileArray_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    }
                                })
                            }
                        })
                        //SWComponemt 변경 시 =>  PERKeyValueD 에서 SWComponemt의  pr port ref할때
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.forEach((ele, i) => {
                            if (ele.sdgs.length > 0) {
                                ele.sdgs.forEach((item, n) => {
                                    if (item.port == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/PERKeyDSDG-' + n)
                                        if (idx != -1) {
                                            item.port = null
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    }
                                })
                            }
                        })
                        //SWComponemt 변경 시 =>  PERPPtoFileArray에서 SWComponemt PR port ref할때
                    state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.forEach((ele, i) => {
                            if (ele.port == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                var idx = this.getters.getconnectLineNum(ele.uuid + '/PPPtoFilePRPort')
                                if (idx != -1) {
                                    ele.port = null
                                    EventBus.$emit('delete-line', idx)
                                    this.commit('deletConnectionline', { startnum: idx })
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }
                        })
                        //SWComponemt 변경 시 =>  PERPPtoKeyValue에서 SWComponemt PR port ref할때
                    state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.forEach((ele, i) => {
                        if (ele.port == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                            var idx = this.getters.getconnectLineNum(ele.uuid + '/PPPtoKeyPRPort')
                            if (idx != -1) {
                                ele.port = null
                                EventBus.$emit('delete-line', idx)
                                this.commit('deletConnectionline', { startnum: idx })
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].children[i].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                                state.navigatorList[state.openProjectIndex].validation = true
                            }
                        }
                    })
                }
            }
        } else {
            payload.deletItemList.forEach(deleteList => {
                if (payload.deleteName == 'functionG') { //Machine 변경시 =>  Process 에서 Machine -> Function Group ref할때
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach((ele, i) => {
                        if (ele.dependent.length > 0) {
                            ele.dependent.forEach((data, n) => {
                                if (data.functionItem != null) {
                                    data.functionItem.forEach((item, f) => {
                                        if (item.contextMode == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                            var idx = this.getters.getconnectLineNum(ele.uuid + '/fgcontext-' + f + '-' + n)
                                            if (idx != -1) {
                                                item.contextMode = null
                                                EventBus.$emit('delete-line', idx)
                                                this.commit('deletConnectionline', { startnum: idx })
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[i].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                                state.navigatorList[state.openProjectIndex].validation = true

                                            }
                                        }
                                    })
                                }
                                if (data.exection != null) {
                                    data.exection.forEach((item, f) => {
                                        if (item.contextMode == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                            var idx = this.getters.getconnectLineNum(ele.uuid + '/edcontext-' + f + '-' + n)
                                            if (idx != -1) {
                                                item.contextMode = null
                                                EventBus.$emit('delete-line', idx)
                                                this.commit('deletConnectionline', { startnum: idx })
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[i].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                                state.navigatorList[state.openProjectIndex].validation = true

                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else if (payload.deleteName == 'CommunicationC') {
                    //MachineDesign 변경시 =>   EthernetCluster에서 MachineDesign -> Communication Connector ref할때
                    state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach((ele, i) => {
                            if (ele.conditional.length > 0) {
                                ele.conditional.forEach((condi, c) => {
                                    if (condi.channel != null) {
                                        condi.channel.forEach((channel, n) => {
                                            if (channel.comconnect != null) {
                                                channel.comconnect.forEach((com, v) => {
                                                    if (com.connector == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/comconet-' + v + '-' + n + '-' + c)
                                                        if (idx != -1) {
                                                            com.connector = null
                                                            EventBus.$emit('delete-line', idx)
                                                            this.commit('deletConnectionline', { startnum: idx })
                                                            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].children[i].validation = true
                                                            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].validation = true
                                                            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                                                            state.navigatorList[state.openProjectIndex].validation = true
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        //MachineDesign 변경시 =>   SomeIPtoMachineMapping 에서 MachineDesgin의 Communication Connected ref할때
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.forEach((ele, i) => {
                            if (ele.ccref == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                var idx = this.getters.getconnectLineNum(ele.uuid + '/tomachinCC')
                                if (idx != -1) {
                                    ele.ccref = null
                                    EventBus.$emit('delete-line', idx)
                                    this.commit('deletConnectionline', { startnum: idx })
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }
                        }) //SW Component 변경시 =>   Service Instance to port prototype 에서 SWComponent port ref할때
                } else if (payload.deleteName == 'eventSI') {
                    //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Event ref할때
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach((ele, i) => {
                            if (ele.eventD.length > 0) {
                                ele.eventD.forEach((item, n) => {
                                    if (item.event == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/serviceEventD-' + n)
                                        if (idx != -1) {
                                            item.event = null
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    }
                                })
                            }
                        })
                        //ServiceInterface 변경 시 =>  EventGD에서에서 serviceinterface Event ref할때
                    state.SAHLProject[state.openProjectIndex].IamG.EventGD.forEach((ele, i) => {
                            if (ele.SIEvent == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                var idx = this.getters.getconnectLineNum(ele.uuid + '/EGDserviceI')
                                if (idx != -1) {
                                    ele.SIEvent = null
                                    EventBus.$emit('delete-line', idx)
                                    this.commit('deletConnectionline', { startnum: idx })
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }
                        })
                        //ServiceInterface 변경 시 =>  SWConponent에서 serviceinterface event ref할때
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach((ele, i) => {
                            if (ele.pport.length > 0) {
                                ele.pport.forEach(port => {
                                    if (port.queued.length > 0) {
                                        port.queued.forEach(item => {
                                            if (item.dataE == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                                var idx = this.getters.getconnectLineNum(ele.uuid + '/pportQSC-' + item.id + '-' + port.id)
                                                if (idx != -1) {
                                                    item.dataE = null
                                                    EventBus.$emit('delete-line', idx)
                                                    this.commit('deletConnectionline', { startnum: idx })
                                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[i].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].validation = true
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        //ServiceInterface 변경 시 =>  SWConponent-> serviceinterface rport queued에서  ref할때
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach((ele, i) => {
                        if (ele.rport.length > 0) {
                            ele.rport.forEach(port => {
                                if (port.queued.length > 0) {
                                    port.queued.forEach(item => {
                                        if (item.select == "VARIABLE-DATA-PROTOTYPE" && (item.dataE == (payload.path + '/' + payload.name + '/' + deleteList.name))) {
                                            var idx = this.getters.getconnectLineNum(ele.uuid + '/rportQRC-' + item.id + '-' + port.id)
                                            if (idx != -1) {
                                                item.dataE = null
                                                EventBus.$emit('delete-line', idx)
                                                this.commit('deletConnectionline', { startnum: idx })
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[i].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                                state.navigatorList[state.openProjectIndex].validation = true
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else if (payload.deleteName == 'fieldSI') {
                    //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Field ref할때
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach((ele, i) => {
                            if (ele.fieldD.length > 0) {
                                ele.fieldD.forEach((item, n) => {
                                    if (item.field == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/field-' + n)
                                        if (idx != -1) {
                                            item.field = null
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    }
                                })
                            }
                        })
                        //ServiceInterface 변경 시 =>  FieldGD에서에서 serviceinterface Field ref할때
                    state.SAHLProject[state.openProjectIndex].IamG.FieldGD.forEach((ele, i) => {
                            if (ele.SIField == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                var idx = this.getters.getconnectLineNum(ele.uuid + '/FGDserviceI')
                                if (idx != -1) {
                                    ele.SIField = null
                                    EventBus.$emit('delete-line', idx)
                                    this.commit('deletConnectionline', { startnum: idx })
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }
                        })
                        //ServiceInterface 변경 시 =>  SWConponent에서 serviceinterface Field ref할때
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach((ele, i) => {
                            if (ele.pport.length > 0) {
                                ele.pport.forEach(port => {
                                    if (port.field.length > 0) {
                                        port.field.forEach(item => {
                                            if (item.dataE == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                                var idx = this.getters.getconnectLineNum(ele.uuid + '/pportFSC-' + item.id + '-' + port.id)
                                                if (idx != -1) {
                                                    item.dataE = null
                                                    EventBus.$emit('delete-line', idx)
                                                    this.commit('deletConnectionline', { startnum: idx })
                                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[i].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].validation = true
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        //ServiceInterface 변경 시 =>  SWConponent-> serviceinterface rport queued에서  ref할때
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach((ele, i) => {
                        if (ele.rport.length > 0) {
                            ele.rport.forEach(port => {
                                if (port.queued.length > 0) {
                                    port.queued.forEach(item => {
                                        if (item.select == "FIELD" && (item.dataE == (payload.path + '/' + payload.name + '/' + deleteList.name))) {
                                            var idx = this.getters.getconnectLineNum(ele.uuid + '/rportQRC-' + item.id + '-' + port.id)
                                            if (idx != -1) {
                                                item.dataE = null
                                                EventBus.$emit('delete-line', idx)
                                                this.commit('deletConnectionline', { startnum: idx })
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[i].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                                state.navigatorList[state.openProjectIndex].validation = true
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else if (payload.deleteName == 'eventD') {
                    //Service Deployment 변경시 =>  ServiceInterface Deploymant에서에서 serviceinterface Deploymant Event Deployment ref할때
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach((ele, i) => {
                            if (ele.eventG.length > 0) {
                                ele.eventG.forEach((item, n) => {
                                    if (item.event != null) {
                                        item.event.forEach((data, d) => {
                                            if (data.event == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                                var idx = this.getters.getconnectLineNum(ele.uuid + '/event-' + d + '-' + n)
                                                if (idx != -1) {
                                                    data.event = null
                                                    EventBus.$emit('delete-line', idx)
                                                    this.commit('deletConnectionline', { startnum: idx })
                                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[i].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].validation = true
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deploment의  eventD ref할때
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach((ele, i) => {
                        if (ele.eventP.length > 0) {
                            ele.eventP.forEach((item, n) => {
                                if (item.event == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                    var idx = this.getters.getconnectLineNum(ele.uuid + '/proviedEventP-' + n)
                                    if (idx != -1) {
                                        item.event = null
                                        EventBus.$emit('delete-line', idx)
                                        this.commit('deletConnectionline', { startnum: idx })
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
                                    }
                                }
                            })
                        }
                    })
                } else if (payload.deleteName == 'methodD') {
                    //Service Deployment 변경시 =>  Required SomeIP Service Instance 에서 Service Deployment Method Deployment ref할때
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.forEach((ele, i) => {
                            if (ele.method.length > 0) {
                                ele.method.forEach((item, n) => {
                                    if (item.method == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/requiredMethod-' + n)
                                        if (idx != -1) {
                                            item.method = null
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    }
                                })
                            }

                        })
                        //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deploment의 MethodD ref할때
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach((ele, i) => {
                        if (ele.method != null) {
                            ele.method.forEach((item, n) => {
                                if (item.method == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                    var idx = this.getters.getconnectLineNum(ele.uuid + '/proviedMethod-' + n)
                                    if (idx != -1) {
                                        item.method = null
                                        EventBus.$emit('delete-line', idx)
                                        this.commit('deletConnectionline', { startnum: idx })
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
                                    }
                                }
                            })
                        }
                    })
                } else if (payload.deleteName == 'perKVDIdata') {
                    //PERKeyValueDI 변경 시 =>  SWConponent에서 PERKeyValueDI data ref할때
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach((ele, i) => {
                        if (ele.prport.length > 0) {
                            ele.prport.forEach(port => {
                                if (port.provide.length > 0) {
                                    port.provide.forEach(item => {
                                        if (item.dataE == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                            var idx = this.getters.getconnectLineNum(ele.uuid + '/prporttab-' + item.id + '-' + port.id)
                                            if (idx != -1) {
                                                item.dataE = null
                                                EventBus.$emit('delete-line', idx)
                                                this.commit('deletConnectionline', { startnum: idx })
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[i].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                                state.navigatorList[state.openProjectIndex].validation = true
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    },
    deleteRefElement(state, payload) { // 지울 element를  ref하는곳 찾기 => 화살표의 끝
        var indices = this.getters.getchangenamelist(payload.uuid)
        console.log('==deleteRefElement==' + indices)

        for (let i = 0; i < indices.length; i++) {
            var startUUID = state.connectionLine[state.openProjectIndex].start[indices[i]].split('/')
            var tableLine = startUUID[1].split('-')
            var idxIDTab = 0,
                idxIDTable = 0

            if (tableLine[0] == 'ddpccompu') { // implementation 에서 compu method ref할때
                var idxImpleCom = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxImpleCom].ddpc[tableLine[1]].compumethod = ''
                state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children[idxImpleCom].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.DateType_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'ddpcdata') { // implementation 에서 data constr ref할때
                var idxImpleDa = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxImpleDa].ddpc[tableLine[1]].dataconstr = ''
                state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children[idxImpleDa].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.DateType_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'typeref') { // implementation 에서 implementation ref할때
                var idxImpletype = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                if (payload.uuid != startUUID[0]) {
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxImpletype].typeref = null
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children[idxImpletype].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].validation = true
                    state.navigatorList[state.openProjectIndex].validation = true
                }
            } else if (tableLine[0] == 'templateType') { // implementation 에서 implementation ref할때
                var idxImpletemp = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                if (payload.uuid != startUUID[0]) {
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxImpletemp].templatetype = null
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children[idxImpletemp].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].validation = true
                    state.navigatorList[state.openProjectIndex].validation = true
                }
            } else if (tableLine[0] == 'idtetable') { // implementation 에서 implementation ref할때
                var idxImpleImple = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === startUUID[0])
                if (payload.uuid != startUUID[0]) {
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxImpleImple].idtelement[tableLine[1]].typeref = ''
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children[idxImpleImple].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.DateType_index].validation = true
                    state.navigatorList[state.openProjectIndex].validation = true
                }
            } else if (tableLine[0] == 'machinedesign') { // machin에서 machinDesign ref할때
                var idxMachineD = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxMachineD].machinedesign = null
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].children[idxMachineD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'hwelement') { // machin에서 HWElement ref할때
                var idxMachineHWE = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxMachineHWE].hwelement[tableLine[1]].hwelement = null
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].children[idxMachineHWE].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'functiontable') { // machin에서 Mode Declaration ref할때
                var idxMachineMD = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxMachineMD].functiongroup[tableLine[1]].type = null
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].children[idxMachineMD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'cctable') { // machinDesign에서 EthernetCluster Endpoint ref할때
                var idxMachineDCC = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxMachineDCC].connector[tableLine[1]].endpoint = null
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].children[idxMachineDCC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'sdctable') { // machinDesign에서 EthernetCluster Endpoint ref할때
                var idxMachineDSDC = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxMachineDSDC].servicediscover[tableLine[1]].msia = null
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].children[idxMachineDSDC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'comconet') { // EthernetCluster에서 MachineDesign -> Communication Connector ref할때
                var idxEthernet = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxEthernet].conditional[tableLine[3]].channel[tableLine[2]].comconnect[tableLine[1]].connector = ''
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].children[idxEthernet].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'machinefromptmm') { // Process to Machine Mapping set 에서 Machine ref할때
                var idxPTMMMachine = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxPTMMMachine].ptmmMachine = ''
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcesstoMachineMapping_index].children[idxPTMMMachine].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcesstoMachineMapping_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'processfromptmm') { // Process to Machine Mapping set 에서 Process ref할때
                var idxPTMMProcess = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxPTMMProcess].ptmmProcess = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcesstoMachineMapping_index].children[idxPTMMProcess].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcesstoMachineMapping_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PPortI') { // SW Components 에서 ServiceInterface ref할때
                var idxpport = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxpport].pport, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxpport].pport[idxIDTab].interface = ''
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxpport].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'pportQSC') { // SW Components 에서 Service Interface -> events ref할때
                var idxSWPQSC = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWPQSC].pport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWPQSC].pport[idxIDTab].queued, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWPQSC].pport[idxIDTab].queued[idxIDTable].dataE = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxSWPQSC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'pportFSC') { // SW Components 에서 Service Interface-> Fields ref할때
                var idxSWPFSC = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWPFSC].pport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWPFSC].pport[idxIDTab].field, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWPFSC].pport[idxIDTab].field[idxIDTable].dataE = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxSWPFSC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PRPortI') { // SW Components 에서 ServiceInterface ref할때
                var idxprport = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxprport].pport, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxprport].prport[idxIDTab].interface = ''
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxprport].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'prporttab') { // SW Components 에서 Service Interface-> Fields ref할때
                var idxPRPro = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxPRPro].prport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxPRPro].prport[idxIDTab].provide, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxPRPro].prport[idxIDTab].provide[idxIDTable].dataE = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxPRPro].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'RPortI') { // SW Components 에서 ServiceInterface ref할때
                var idxrport = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxrport].rport[tableLine[1]].interface = ''
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxrport].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'rportQRC') { // SW Components 에서 Service Interface -> events ref할때
                var idxSWRQRC = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWRQRC].rport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWRQRC].rport[idxIDTab].queued, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWRQRC].rport[idxIDTab].queued[idxIDTable].dataE = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxSWRQRC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'rportCC') { // SW Components 에서 Service Interface-> method ref할때
                var idxSWRCC = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                idxIDTab = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWRCC].rport, tableLine[2])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWRCC].rport[idxIDTab].client, tableLine[1])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxSWRCC].rport[idxIDTab].client[idxIDTable].operation = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxSWRCC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'applicationtyperef') { // Executable 에서 SW Components ref할때
                var idxExecutable = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxExecutable].applicationtyperef = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Executable_index].children[idxExecutable].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Executable_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'prodesignexecutable') { // ProcessDesign 에서  Executable ref할때
                var idxProDExecutable = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxProDExecutable].executableref = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcessDesign_index].children[idxProDExecutable].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcessDesign_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'processprodesign') { // Process 에서 Process Design ref할때
                var idxProProDesign = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProProDesign].prodesign = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProProDesign].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'processdetermin') { // Process 에서 Deterministric ref할때
                var idxProDetermin = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProDetermin].determin = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProDetermin].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'processexecut') { // Process 에서 Executable ref할때
                var idxProExe = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProExe].execut = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProExe].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'processmodedeclar') { // Process 에서 Mode Declaration ref할때
                var idxProMod = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProMod].machinetype = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProMod].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'processstartup') { // Process 에서 Startup Config ref할때
                var idxProStart = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProStart].dependent[tableLine[1]].startupConfigRef = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProStart].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'processresorce') { // Process 에서 Machine -> Module Instantiation ref할때
                var idxProMI = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProMI].dependent[tableLine[1]].resourceRef = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProMI].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'fgcontext') { // Process 에서 Machine -> Function Group ref할때
                var idxProMachine = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProMachine].dependent[tableLine[2]].functionItem[tableLine[1]].contextMode = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProMachine].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'fgtarget') { // Process 에서  Module Declaration-> mode Declarations ref할때
                var idxProMD = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProMD].dependent[tableLine[2]].functionItem[tableLine[1]].targetMode = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProMD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'edcontext') { // Process 에서 Machine -> Function Group ref할때
                var idxProEDC = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProEDC].dependent[tableLine[2]].exection[tableLine[1]].contextMode = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProEDC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'edtarget') { // Process 에서  Module Declaration-> mode Declarations ref할때
                var idxProEDT = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxProEDT].dependent[tableLine[2]].exection[tableLine[1]].targetMode = null
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[idxProEDT].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'errordomain') { // Error 에서 Error Domain ref할때
                var idxErrorD = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.Error[idxErrorD].errorDref = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Error_index].children[idxErrorD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Error_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'error') { // Error Set 에서 Error  ref할때
                var idxError = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(data => data.uuid === startUUID[0])
                idxIDTable = this.getters.getTableNum(state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxError].errorref, tableLine[1])
                state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxError].errorref[idxIDTable].error = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Errorset_index].children[idxError].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Errorset_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'service') { // ServiceInterface Deploymant에서 serviceInterface ref할때
                var idxSIDservice = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxSIDservice].service = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[idxSIDservice].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'event') { // ServiceInterface Deploymant에서에서 serviceinterface Deploymant Event Deployment ref할때
                var idxSIDeventG = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                if (payload.uuid != startUUID[0]) {
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxSIDeventG].eventG[tableLine[2]].event[tableLine[1]].event = null
                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[idxSIDeventG].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                    state.navigatorList[state.openProjectIndex].validation = true
                }
            } else if (tableLine[0] == 'serviceEventD') { // ServiceInterface Deploymant에서에서 serviceinterface Event ref할때
                var idxSIDeventD = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxSIDeventD].eventD[tableLine[1]].event = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[idxSIDeventD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'serviceMethodD') { // ServiceInterface Deploymant에서에서 serviceinterface Method ref할때
                var idxSIDMethodD = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxSIDMethodD].methodD[tableLine[1]].method = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[idxSIDMethodD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'field') { // ServiceInterface Deploymant에서에서 serviceinterface Field ref할때
                var idxSIDFieldD = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxSIDFieldD].fieldD[tableLine[1]].field = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[idxSIDFieldD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'Eventtable') { // ServiceInterface 에서 Implementation ref할때
                var idxSIevent = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxSIevent].events[tableLine[1]].type = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children[idxSIevent].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'Fieldtable') { // ServiceInterface 에서 Implementation ref할때
                var idxSIfield = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxSIfield].fields[tableLine[1]].type = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children[idxSIfield].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'argtable') { // ServiceInterface 에서 Implementation ref할때
                var idxSIImp = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxSIImp].methods[tableLine[2]].argument[tableLine[1]].type = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children[idxSIImp].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'methoderrors') { // ServiceInterface 에서 Error ref할때
                var idxSIError = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxSIError].methods[tableLine[2]].errorSet[tableLine[1]].error = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children[idxSIError].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'methoderror') { // ServiceInterface 에서 ErrorSet ref할때
                var idxSIErrorS = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxSIErrorS].methods[tableLine[2]].error[tableLine[1]].error = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children[idxSIErrorS].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'tomachinCC') { // SomeIPtoMachineMapping 에서 MachineDesgin의 Communication Connected ref할때
                var idxSIMMCC = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxSIMMCC].ccref = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].children[idxSIMMCC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'toMachinServiceIns') { // SomeIPtoMachineMapping 에서 Required SomeIP / Provide SomeIP ref할때
                var idxSIRequired = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxSIRequired].serviceI[tableLine[1]].service = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].children[idxSIRequired].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'toportport') { // Service Instance to port prototype 에서 SWComponent port ref할때
                var idxtoportport = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxtoportport].selectPort = null
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxtoportport].porttype = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children[idxtoportport].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'toportprocess') { // Service Instance to port prototype 에서 process design ref할때
                var idxtoportproess = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxtoportproess].process = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children[idxtoportproess].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'toportservice') { // Service Instance to port prototype 에서 provided,required ref할때
                var idxtoportservice = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxtoportservice].selectServiceIns = null
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxtoportservice].serviceIns = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children[idxtoportservice].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'requiredDeploy') { // Required SomeIP Service Instance 에서 Service Deployment ref할때
                var idxRequiredD = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxRequiredD].deployref = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[idxRequiredD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'requiredSomeIPC') { // Required SomeIP Service Instance 에서 SomeIP Client ref할때
                var idxRequiredS = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxRequiredS].someipclient = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[idxRequiredS].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'requiredMethod') { // Required SomeIP Service Instance 에서 Service Deployment Method Deployment ref할때
                var idxRequiredM = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxRequiredM].method[tableLine[1]].method = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[idxRequiredM].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'requiredEventG') { // Required SomeIP Service Instance 에서 Service Deployment Event Group ref할때
                var idxRequiredE = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxRequiredE].requiredevent[tableLine[1]].eventG = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[idxRequiredE].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'requiredClient') { // Required SomeIP Service Instance 에서 Client event ref할때
                var idxRequiredC = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxRequiredC].requiredevent[tableLine[1]].client = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[idxRequiredC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'providDeploy') { // Provided SomeIP Service Instance 에서 Service Deployment ref할때
                var idxProvidD = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxProvidD].deployref = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[idxProvidD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'providSomeIPS') { // Provided SomeIP Service Instance 에서 SomIP Server ref할때
                var idxProvidSS = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxProvidSS].someipserver = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[idxProvidSS].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'proviedEventP') { // Provided SomeIP Service Instance 에서 Service Deploment의  eventD ref할때
                var idxProvidEP = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxProvidEP].eventP[tableLine[1]].event = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[idxProvidEP].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'proviedMethod') { // Provided SomeIP Service Instance 에서 Service Deploment의 MethodD ref할때
                var idxProvidM = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxProvidM].method[tableLine[1]].method = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[idxProvidM].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'providEventG') { // Provided SomeIP Service Instance 에서 Service Deploment의 eventG ref할때
                var idxProvidEG = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxProvidEG].eventG[tableLine[1]].eventG = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[idxProvidEG].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'providServer') { // Provided SomeIP Service Instance 에서 Server ref할때
                var idxProvidS = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxProvidS].eventG[tableLine[1]].server = null
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[idxProvidS].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            }
            /////////
            else if (tableLine[0] == 'PERArraySDG') { // PERFileArray에서 SWComponent ref할때
                var idxPerAsdg = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxPerAsdg].sdgs[tableLine[1]].port = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileArray_index].children[idxPerAsdg].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileArray_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PERKeyDSDG') { // PERKeyValueD에서 SWComponent ref할때
                var idxPerKsdg = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxPerKsdg].sdgs[tableLine[1]].port = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].children[idxPerKsdg].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PERKeyV') { // PERKeyValueD에서 ImplementationDataType ref할때
                var idxPerKeyV = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxPerKeyV].keyValue[tableLine[1]].datatype = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].children[idxPerKeyV].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PERData') { // PERKeyValueDI에서 ImplementationDataType ref할때
                var idxPerData = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxPerData].data[tableLine[1]].type = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueDI_index].children[idxPerData].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueDI_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PERSerial') { // PERKeyValueDI에서 ImplementationDataType ref할때
                var idxPERSerial = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxPERSerial].serialization[tableLine[1]].serial = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueDI_index].children[idxPERSerial].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueDI_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PPPtoFileArray') { // PPP to File Array에서 PERSISTENCY-FILE-ARRAY ref할때
                var idxPPPtoFileArray = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxPPPtoFileArray].fileArray = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].children[idxPPPtoFileArray].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PPPtoFilePRPort') { // PPP to File Array에서 PR port ref할때
                var idxPPPtoFilePort = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxPPPtoFilePort].port = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].children[idxPPPtoFilePort].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PPPtoFileProcess') { // PPP to File Array에서 Process ref할때
                var idxPPPtoFileProce = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxPPPtoFileProce].process = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].children[idxPPPtoFileProce].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PPPtoKeyValue') { // PPP to Key Value에서 PERSISTENCY-FILE-ARRAY ref할때
                var idxPPPtoKeyValue = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxPPPtoKeyValue].keyValue = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].children[idxPPPtoKeyValue].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PPPtoKeyPRPort') { // PPP to Key Value에서 PR port ref할때
                var idxPPPtoKeyPort = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxPPPtoKeyPort].port = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].children[idxPPPtoKeyPort].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PPPtoKeyProcess') { // PPP to Key Value에서 Process ref할때
                var idxPPPtoKeyProce = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxPPPtoKeyProce].process = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].children[idxPPPtoKeyProce].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PHMtoMachine') { // PHMtoMachine 에서 Machine ref할때
                var idxPHMtoMachine = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxPHMtoMachine].machine = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.ContritoMachine_index].children[idxPHMtoMachine].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.ContritoMachine_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PHMContri') { // PHMtoMachine 에서 PHMContribution ref할때
                var idxPHMContri = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxPHMContri].contri[tableLine[1]].con = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.ContritoMachine_index].children[idxPHMContri].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.ContritoMachine_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PHMViaPro') { // PHMRecovertVia에서 Process ref할때
                var idxPHMViaPro = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxPHMViaPro].process = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children[idxPHMViaPro].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PHMViaSWCompo') { // PHMRecovertVia에서 SW Copoment ref할때
                var idxPHMViaSWC = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxPHMViaSWC].swcomponent = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children[idxPHMViaSWC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PHMViaPPort') { // PHMRecovertVia에서 P Port ref할때
                var idxPHMViaPort = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxPHMViaPort].port = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children[idxPHMViaPort].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'PHMViaRecovery') { // PHMRecovertVia에서 PHMRecovery ref할때
                var idxPHMViaRe = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxPHMViaRe].phmRecovery = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children[idxPHMViaRe].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'FGDproD') { // Field Grant Design에서 Process Design ref할때
                var idxFGDPro = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxFGDPro].processD = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].children[idxFGDPro].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'EGDproD') { // Event Grant Design에서 Process Design ref할때
                var idxEGDPro = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxEGDPro].processD = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].children[idxEGDPro].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'MGDproD') { // Method Grant Design에서 Process Design ref할때
                var idxMGDPro = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxMGDPro].processD = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].children[idxMGDPro].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'FGDserviceI') { // Field Grant Design에서 Service Interface Field ref할때
                var idxFGDSI = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxFGDSI].SIField = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].children[idxFGDSI].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'EGDserviceI') { // Event Grant Design에서 Service Interface Event ref할때
                var idxEGDSI = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxEGDSI].SIEvent = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].children[idxEGDSI].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'MGDserviceI') { // Method Grant Design에서 Service Interface Method ref할때
                var idxMGDSI = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxMGDSI].SIMethod = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].children[idxMGDSI].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'FieldGD') { // Field Grant 에서 Field Grant Design ref할때
                var idxFGD = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxFGD].fieldD = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGrant_index].children[idxFGD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGrant_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'EventGD') { // Event Grant 에서 Event Grant Design ref할때
                var idxEGD = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.EventG[idxEGD].eventD = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGrant_index].children[idxEGD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGrant_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'MethodGD') { // Method Grant 에서 Method Grant Design ref할때
                var idxMGD = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxMGD].methodD = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGrant_index].children[idxMGD].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGrant_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'FGProvide') { // Field Grant 에서 Provide SomeIP ref할때
                var idxFGProvide = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxFGProvide].provide = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGrant_index].children[idxFGProvide].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGrant_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'EGProvide') { // Event Grant 에서 Provide SomeIP ref할때
                var idxEGProvide = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.EventG[idxEGProvide].provide = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGrant_index].children[idxEGProvide].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGrant_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'MGProvide') { // Method Grant 에서 Provide SomeIP ref할때
                var idxMGProvide = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxMGProvide].provide = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGrant_index].children[idxMGProvide].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGrant_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'SCExecutable') { // SoftWareCluster 에서 Executable ref할때
                var idxSCE = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxSCE].executable[tableLine[1]].execut = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children[idxSCE].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'SCMachineD') { // SoftWareCluster 에서 Server ref할때
                var idxSCM = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxSCM].machineD[tableLine[1]].machine = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children[idxSCM].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'SCtoMachine') { //SoftWareCluster 에서 Server ref할때
                var idxSCS = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxSCS].toMachine[tableLine[1]].mapping = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children[idxSCS].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'SCProcess') { // SoftWareCluster 에서 Server ref할때
                var idxSCP = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxSCP].process[tableLine[1]].pro = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children[idxSCP].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'SCswc') { // SoftWareCluster 에서 Server ref할때
                var idxSCSC = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxSCSC].sswc[tableLine[1]].swc = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children[idxSCSC].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'UCMSWPSWC') { //SoftWarePackage 에서 SoftWareCluster ref할때
                var idxUCMSWP = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxUCMSWP].provide = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWPackage_index].children[idxUCMSWP].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWPackage_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            } else if (tableLine[0] == 'UCMModule') { //VehiclePackage 에서 ModuleInstant ref할때
                var idxUCMModule = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(data => data.uuid === startUUID[0])
                state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxUCMModule].ucms[tableLine[1]].module = null
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.VehiclePackage_index].children[idxUCMModule].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.VehiclePackage_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].validation = true
                state.navigatorList[state.openProjectIndex].children[constant.Platform_index].validation = true
                state.navigatorList[state.openProjectIndex].validation = true
            }
        }

        for (let n = indices.length; n >= 0; n--) {
            if (indices[n] != undefined) {
                state.connectionLine[state.openProjectIndex].start.splice(indices[n], 1)
                state.connectionLine[state.openProjectIndex].end.splice(indices[n], 1)
                EventBus.$emit('delete-line', indices[n])
            }
        }
    },
    deleteElementLine(state, payload) { //지우는 element에서 line 나가는것 지우기 ==> 화살표의 시작
        var endLine = []
            //console.log('deleteE ' + endLine)
        state.connectionLine[state.openProjectIndex].start.forEach(item => {
            var startUUID = item.split('/')
            if (startUUID[0] == payload.uuid) {
                endLine.push(this.getters.getconnectLineNum(item))
            }
        })

        for (let n = endLine.length; n >= 0; n--) {
            if (endLine[n] != undefined) {
                state.connectionLine[state.openProjectIndex].start.splice(endLine[n], 1)
                state.connectionLine[state.openProjectIndex].end.splice(endLine[n], 1)
                EventBus.$emit('delete-line', endLine[n])
            }
        }
    },

    deleteElement(state, payload) {
        var idxElement
            //console.log('deleteElement' + payload.parent)
        if (payload.parent == constant.CompuMethod_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.CompuMethod_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.DataConstr_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.DataConstr_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ApplicationArray_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.ApplicationArray_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.Implementation_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.DateType_index].children[constant.Implementation_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.Machine_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Machine.Machine.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.Machine_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.MachineDesigne_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.MachineDesigne_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.EthernetCluster_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ModeDeclarationGroup_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.ModeDeclarationGroup_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.HWElement_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.HWElement.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Machine.HWElement.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.HWElement_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ProcesstoMachineMapping_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcesstoMachineMapping_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.SWComponents_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.Process_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ProcessDesign_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.ProcessDesign_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.Executable_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Executable_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.StartupConfig_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.StartupConfig_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.DeterministicClient_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.DeterministicClient_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.SomeIPServiceInterfaceDeployment_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ServiceInterface_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.ServiceInterface_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.Client_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.SomeIPEvents_index].children[constant.Client_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.Server_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.SomeIPEvents_index].children[constant.Server_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.SomeIPClient_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPClient_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.SomeIPServer_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPServer_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.SomeIPToMachineMapping_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ToPortPrototypeMapping_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.RequiredSomeIP_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ProvidedSomeIP_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.Error_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.Error.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Error_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.Errorset_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.ErrorSet.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.Errorset_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ErrorDomain_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.Errors_index].children[constant.ErrorDomain_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.FileArray_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Per.PERFileArray.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileArray_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.FileProxyInterf_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.FileProxyInterf_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.KeyValueData_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueData_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.KeyValueDI_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.KeyValueDI_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.PortProtoFileA_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoFileA_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.PortProtoKeyV_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PER_index].children[constant.PortProtoKeyV_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.PlatformHealthManagC_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.PlatformHealthManagC_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ContritoMachine_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.ContritoMachine_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.HealthChannel_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.HealthChannel_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.RecoveryVA_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryVA_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.PHMSupervised_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.PHMSupervised_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.RecoveryActionInterf_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.PHM_index].children[constant.RecoveryActionInterf_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ComFieldGrant_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].IamG.FieldG.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGrant_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ComEventGrant_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].IamG.EventG.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGrant_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ComMethodGrant_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].IamG.MethodG.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGrant_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ComFieldGDesign_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].IamG.FieldGD.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComFieldGDesign_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ComEventGDesign_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].IamG.EventGD.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComEventGDesign_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ComMethodGDesign_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].IamG.MethodGD.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.IAM_index].children[constant.ComMethodGDesign_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.SWCluster_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWCluster_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.SWPackage_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.SWPackage_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.VehiclePackage_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.VehiclePackage_index].children.splice(idxElement, 1)
        } else if (payload.parent == constant.ModuleInstantiation_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.findIndex(data => data.uuid === payload.uuid)
            state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.splice(idxElement, 1)
            state.navigatorList[state.openProjectIndex].children[constant.Platform_index].children[constant.UCM_index].children[constant.ModuleInstantiation_index].children.splice(idxElement, 1)
        }
        state.detailViewerList.forEach((data, i) => {
            if (data.uuid == payload.uuid) {
                state.detailViewerList.splice(i, 1)
            }
        })
        if (state.detailViewer.uuid == payload.uuid) {
            state.detailViewer = { uuid: '', element: '' }
            state.detailViewUUID = null
        }
        state.idexDetailView = state.detailViewerList.length - 1
        state.activeUUID = null
    },
    setValidation(state, payload) {
        var idxElement = null,
            isValidation = false,
            idxchild = null,
            idxchildchild = null,
            idxService = null,
            idxParent = null
        if (payload.parent == constant.CompuMethod_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.DateType_index
            idxchildchild = constant.CompuMethod_index
        } else if (payload.parent == constant.DataConstr_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.DateType_index
            idxchildchild = constant.DataConstr_index
        } else if (payload.parent == constant.ApplicationArray_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.DateType_index
            idxchildchild = constant.ApplicationArray_index
        } else if (payload.parent == constant.Implementation_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.DateType_index
            idxchildchild = constant.Implementation_index
        } else if (payload.parent == constant.Machine_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.Machines_index
            idxchildchild = constant.Machine_index
        } else if (payload.parent == constant.MachineDesigne_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.Machines_index
            idxchildchild = constant.MachineDesigne_index
        } else if (payload.parent == constant.EthernetCluster_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.Machines_index
            idxchildchild = constant.EthernetCluster_index
        } else if (payload.parent == constant.ModeDeclarationGroup_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.Machines_index
            idxchildchild = constant.ModeDeclarationGroup_index
        } else if (payload.parent == constant.HWElement_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Machine.HWElement.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.Machines_index
            idxchildchild = constant.HWElement_index
        } else if (payload.parent == constant.ProcesstoMachineMapping_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.ProcesstoMachineMapping_index
        } else if (payload.parent == constant.SWComponents_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.SWComponents_index
        } else if (payload.parent == constant.Process_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.Process_index
        } else if (payload.parent == constant.ProcessDesign_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.ProcessDesign_index
        } else if (payload.parent == constant.Executable_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.Executable_index
        } else if (payload.parent == constant.StartupConfig_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.StartupConfig_index
        } else if (payload.parent == constant.DeterministicClient_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.findIndex(data => data.uuid === payload.uuid)
            idxchild = constant.AdaptiveApplication_index
            idxchildchild = constant.DeterministicClient_index
        } else if (payload.parent == constant.SomeIPServiceInterfaceDeployment_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.SomeIPServiceInterfaceDeployment_index
            idxService = constant.ServiceInterfaces_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.ServiceInterface_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ServiceInterface_index
            idxService = constant.ServiceInterfaces_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.Client_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.Client_index
            idxService = constant.SomeIPEvents_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.Server_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.Server_index
            idxService = constant.SomeIPEvents_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.SomeIPClient_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.SomeIPClient_index
            idxService = constant.ServiceInstances_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.SomeIPServer_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.SomeIPServer_index
            idxService = constant.ServiceInstances_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.SomeIPToMachineMapping_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.SomeIPToMachineMapping_index
            idxService = constant.ServiceInstances_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.ToPortPrototypeMapping_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ToPortPrototypeMapping_index
            idxService = constant.ServiceInstances_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.RequiredSomeIP_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.RequiredSomeIP_index
            idxService = constant.ServiceInstances_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.ProvidedSomeIP_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ProvidedSomeIP_index
            idxService = constant.ServiceInstances_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.Error_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.Error_index
            idxService = constant.Errors_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.Errorset_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.Errorset_index
            idxService = constant.Errors_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.ErrorDomain_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ErrorDomain_index
            idxService = constant.Errors_index
            idxParent = constant.Service_index
        } else if (payload.parent == constant.FileArray_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.FileArray_index
            idxService = constant.PER_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.FileProxyInterf_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.FileProxyInterf_index
            idxService = constant.PER_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.KeyValueData_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.KeyValueData_index
            idxService = constant.PER_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.KeyValueDI_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.KeyValueDI_index
            idxService = constant.PER_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.PortProtoFileA_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.PortProtoFileA_index
            idxService = constant.PER_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.PortProtoKeyV_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.PortProtoKeyV_index
            idxService = constant.PER_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.PlatformHealthManagC_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.PlatformHealthManagC_index
            idxService = constant.PHM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.ContritoMachine_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ContritoMachine_index
            idxService = constant.PHM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.HealthChannel_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.HealthChannel_index
            idxService = constant.PHM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.RecoveryVA_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.RecoveryVA_index
            idxService = constant.PHM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.PHMSupervised_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.PHMSupervised_index
            idxService = constant.PHM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.RecoveryActionInterf_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.RecoveryActionInterf_index
            idxService = constant.PHM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.ComFieldGrant_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ComFieldGrant_index
            idxService = constant.IAM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.ComEventGrant_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ComEventGrant_index
            idxService = constant.IAM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.ComMethodGrant_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ComMethodGrant_index
            idxService = constant.IAM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.ComFieldGDesign_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ComFieldGDesign_index
            idxService = constant.IAM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.ComEventGDesign_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ComEventGDesign_index
            idxService = constant.IAM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.ComMethodGDesign_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ComMethodGDesign_index
            idxService = constant.IAM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.SWCluster_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.SWCluster_index
            idxService = constant.UCM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.SWPackage_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.SWPackage_index
            idxService = constant.UCM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.VehiclePackage_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.VehiclePackage_index
            idxService = constant.UCM_index
            idxParent = constant.Platform_index
        } else if (payload.parent == constant.ModuleInstantiation_str) {
            idxElement = state.SAHLProject[state.openProjectIndex].UCM.ModuleInstant.findIndex(data => data.uuid === payload.uuid)
            idxchildchild = constant.ModuleInstantiation_index
            idxService = constant.UCM_index
            idxParent = constant.Platform_index
        }

        if (idxService == null) {
            state.navigatorList[state.openProjectIndex].children[idxchild].children[idxchildchild].children[idxElement].validation = false
            state.navigatorList[state.openProjectIndex].children[idxchild].children[idxchildchild].children.forEach(item => {
                if (item.validation == true) {
                    isValidation = true
                }
            })
            if (!isValidation) {
                state.navigatorList[state.openProjectIndex].children[idxchild].children[idxchildchild].validation = false
                state.navigatorList[state.openProjectIndex].children[idxchild].children.forEach(child => {
                    if (child.validation == true) {
                        isValidation = true
                    }
                })
                if (!isValidation) {
                    state.navigatorList[state.openProjectIndex].children[idxchild].validation = false
                    state.navigatorList[state.openProjectIndex].children.forEach(childchild => {
                        if (childchild.validation == true) {
                            isValidation = true
                        }
                    })
                    if (!isValidation) {
                        state.navigatorList[state.openProjectIndex].validation = false
                    }
                }
            }
        } else {
            state.navigatorList[state.openProjectIndex].children[idxParent].children[idxService].children[idxchildchild].children[idxElement].validation = false
            state.navigatorList[state.openProjectIndex].children[idxParent].children[idxService].children[idxchildchild].children.forEach(item => {
                if (item.validation == true) {
                    isValidation = true
                }
            })
            if (!isValidation) {
                state.navigatorList[state.openProjectIndex].children[idxParent].children[idxService].children[idxchildchild].validation = false
                state.navigatorList[state.openProjectIndex].children[idxParent].children[idxService].children.forEach(item => {
                    if (item.validation == true) {
                        isValidation = true
                    }
                })
                if (!isValidation) {
                    state.navigatorList[state.openProjectIndex].children[idxParent].children[idxService].validation = false
                    state.navigatorList[state.openProjectIndex].children[idxParent].children.forEach(child => {
                        if (child.validation == true) {
                            isValidation = true
                        }
                    })
                    if (!isValidation) {
                        state.navigatorList[state.openProjectIndex].children[idxParent].validation = false
                        state.navigatorList[state.openProjectIndex].children.forEach(childchild => {
                            if (childchild.validation == true) {
                                isValidation = true
                            }
                        })
                        if (!isValidation) {
                            state.navigatorList[state.openProjectIndex].validation = false
                        }
                    }
                }
            }
        }
    },
    saveElement(state, payload) {
        var FileSaver = require('file-saver');
        //var blob = new Blob([JSON.stringify(this.getters.getSaveObject(payload.list))], { type: "text/plain;charset=utf-8" });
        var s = new XMLSerializer(); //DOM 트리를 직렬화하여 XML을 포함하는 문자열로 변환합니다.
        var saveList = this.getters.sortSaveList(payload.list)
        var d = this.getters.getSaveObject(saveList);
        var str = '<?xml version="1.0" encoding="UTF-8"?>\n' //getSaveObject에 넣으면 개행이 안된다!!!!
        str += s.serializeToString(d); //문서의 DOM 트리를 XML로 다시 직렬화할 수 있습니다.
        var blob = new Blob([str], { type: "text/xml" });
        try { FileSaver.saveAs(blob, payload.saveName); } catch (e) { alert('Failed to save the file !'); }
    },
    saveList(state, payload) {
        var FileSaver = require('file-saver');
        var blob = new Blob([JSON.stringify(payload.list)], { type: "text/plain;charset=utf-8" });
        try { FileSaver.saveAs(blob, payload.saveName); } catch (e) { alert('Failed to save the file !'); }
    },

    uploadFileprocess(state, payload) {
        var parser, xmlDoc
        console.log(payload.fileInfo)
        parser = new DOMParser()
        xmlDoc = parser.parseFromString(payload.fileInfo, "text/xml")
        this.commit('saveInputfile', { xmlDoc: xmlDoc })
        Vue.nextTick(() => { //mainview에만 넣으니 tab이 늦게 그려져서 선이 안그려짐
            state.isInputFileComplate = true
        })
    },
    initialiseStore(state) {
        // if (localStorage.getItem("SAHLProject")) {
        //     //console.log("loading SAHLProject");
        //     state.SAHLProject = JSON.parse(localStorage.getItem("SAHLProject"))
        // }
        // if (localStorage.getItem("navigatorList")) {
        //     //console.log("loading navigatorList");
        //     state.navigatorList = JSON.parse(localStorage.getItem("navigatorList"))
        // }
        if (localStorage.getItem("setting")) {
            //console.log("loading setting");
            state.setting = JSON.parse(localStorage.getItem("setting"))
        }
        if (localStorage.getItem("savePath")) {
            //console.log("loading savePath");
            state.strSavePath = JSON.parse(localStorage.getItem("savePath"))
        }
        if (localStorage.getItem("visibleDetailView")) {
            //console.log("loading visibleDetailView");
            state.visibleDetailView = JSON.parse(localStorage.getItem("visibleDetailView"))
        }
    }
}

export default mutations