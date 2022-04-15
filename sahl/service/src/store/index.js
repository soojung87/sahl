import Vue from 'vue';
import Vuex from 'vuex';
import { uuid } from "vue-uuid";
import constant from "./constants.js"
import { saveAs } from 'file-saver'; // eslint-disable-line no-unused-vars
import { EventBus } from "../main.js"


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        openProjectIndex: 0,
        navigatorList: [],
        SAHLProject: [],
        activeUUID: null,
        detailViewUUID: null,
        connectionLine: [],
        ismakeProject: false,
        detailViewerList: [], // project가 바뀔때 마다 reset해야한다.
        idexDetailView: undefined,
        checkVaildation: false,
        errorList: [],
        detailViewer: { uuid: '', element: '' },
        setting: { zoomMain: 0, zoomDetail: 0, },
        visibleDetailView: true,
        visibleLine: true,
        isOpenCloseSearch: false,
        isOpenCloseDetailView: true,
        isOpenCloseNavigationView: true,
        strSavePath: [], // Path List
        isInputFileComplate: false, //input file값 저장후 화면에 그린 뒤 line 그리기 위해
        inputFileList: [], // input file 값저장 후 line 그리기 위해 어떤것이 들어왔는지 알려고
    },
    getters: {
        projectCount(state) {
            return state.SAHLProject.length;
        },
        getNameCompuMethod(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.CompuMethod_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.some(ele => ele.name === name)
            }
            return name
        },
        getNameDataConstr(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.DataConstr_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.some(ele => ele.name === name)
            }
            return name
        },
        getNameApplicationArray(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.ApplicationArray_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.some(ele => ele.name === name)
            }
            return name
        },
        getNameImplementation(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.Implementation_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.some(ele => ele.name === name)
            }
            return name
        },
        getNameMachine(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.Machine_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Machine.Machine.some(ele => ele.name === name)
            }
            return name
        },
        getNameMachineDesign(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.MachineDesigne_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.some(ele => ele.name === name)
            }
            return name
        },
        getNameModeDeclarationGroup(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.ModeDeclarationGroup_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.some(ele => ele.name === name)
            }
            return name
        },
        getNameHWElement(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.HWElement_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Machine.HWElement.some(ele => ele.name === name)
            }
            return name
        },
        getNameEthernetCluster(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.EthernetCluster_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.some(ele => ele.name === name)
            }
            return name
        },
        getNameProcesstoMachineMapping(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.ProcesstoMachineMapping_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.some(ele => ele.name === name)
            }
            return name
        },
        getNamSWComponents(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.SWComponents_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.some(ele => ele.name === name)
            }
            return name
        },
        getNameProcess(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.Process_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.some(ele => ele.name === name)
            }
            return name
        },
        getNameProcessDesign(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.ProcessDesign_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.some(ele => ele.name === name)
            }
            return name
        },
        getNameExecutable(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.Executable_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.some(ele => ele.name === name)
            }
            return name
        },
        getNameStartupConfig(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.StartupConfig_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.some(ele => ele.name === name)
            }
            return name
        },
        getNameDeterministicClient(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.DeterministicClient_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.some(ele => ele.name === name)
            }
            return name
        },
        getNameSomeIPService(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.SomeIPServiceInterfaceDeployment_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.some(ele => ele.name === name)
            }
            return name
        },
        getNameServiceInterface(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.ServiceInterface_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.some(ele => ele.name === name)
            }
            return name
        },
        getNameClient(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.Client_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.some(ele => ele.name === name)
            }
            return name
        },
        getNameServer(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.Server_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.some(ele => ele.name === name)
            }
            return name
        },
        getNameSomeIPClient(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.SomeIPClient_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.some(ele => ele.name === name)
            }
            return name
        },
        getNameSomeIPServer(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.SomeIPServer_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.some(ele => ele.name === name)
            }
            return name
        },
        getNameSomeIPtoMachine(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.SomeIPToMachineMapping_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.some(ele => ele.name === name)
            }
            return name
        },
        getNameToPortPrototype(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.ToPortPrototypeMapping_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.some(ele => ele.name === name)
            }
            return name
        },
        getNameRequiredSomeIP(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.RequiredSomeIP_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.some(ele => ele.name === name)
            }
            return name
        },
        getNameProvidedSomeIP(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.ProvidedSomeIP_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.some(ele => ele.name === name)
            }
            return name
        },
        getNameError(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.Error_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.Error.some(ele => ele.name === name)
            }
            return name
        },
        getNameErrorSet(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.Errorset_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.some(ele => ele.name === name)
            }
            return name
        },
        getNameErrorDomain(state) {
            let name = null,
                res = true,
                n = 0

            while (res) {
                name = constant.ErrorDomain_str + '_' + n++;
                res = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.some(ele => ele.name === name)
            }
            return name
        },

        getImplementationDataType(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getCompuMethod(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getDataConstr(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getMachine(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Machine.Machine.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getMachineDesign(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getHWElement(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Machine.HWElement.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getModeDeclarationG(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getModeDeclaration(state) { //Mode Declaration Group의 mode Declaration
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.forEach(ele => {
                if (ele.modedeclaration != null) {
                    ele.modedeclaration.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getNetworkEndPoint(state) {
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach(ethernet => {
                if (ethernet.conditional != null) {
                    ethernet.conditional.forEach((condi, n) => {
                        if (condi.channel != null) {
                            condi.channel.forEach((channel, v) => {
                                if (channel.endpoint != null) {
                                    channel.endpoint.forEach((end, c) => {
                                        datatype.push({
                                            uuid: ethernet.uuid,
                                            ethernetname: ethernet.name,
                                            condidx: n,
                                            channelidx: v,
                                            endpoineidx: c,
                                            fullname: ethernet.name + '/' + condi.name + '/' + channel.name + '/' + end.name,
                                            name: ethernet.path + '/' + ethernet.name + '/' + condi.name + '/' + channel.name + '/' + end.name
                                        })
                                    })
                                }
                            })
                        }
                    })
                }
            })
            return datatype
        },
        getCommunicationConnect(state) { // MachineDesign Comunication Connect
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.forEach(ele => {
                if (ele.connector != null) {
                    ele.connector.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getResourceGroup(state) { // Machine안에 Module Instantiation
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(ele => {
                if (ele.moduleinstant != null) {
                    ele.moduleinstant.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getModeDeclarationGP(state) { //Machine안에 Function Group
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(ele => {
                if (ele.functiongroup != null) {
                    ele.functiongroup.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getSWComponentType(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getPPortPrototype(state) { //SWComponent안에 P Port
            var datatype = []
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(ele => {
                if (ele.pport != null) {
                    ele.pport.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getRPortPrototype(state) { //SWComponent안에 R Port
            var datatype = []
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(ele => {
                if (ele.rport != null) {
                    ele.rport.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getPRPortPrototype(state) { //SWComponent안에 PR Port
            var datatype = []
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(ele => {
                if (ele.prport != null) {
                    ele.prport.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getProcess(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype

        },
        getProcessDesign(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getExecutable(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getStartupConfig(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getDeterministicClient(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getSIDeployment(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getDeploymentMethod(state) { //Service Deployment 안에 method-Deployment
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(ele => {
                if (ele.methodD != null) {
                    ele.methodD.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getEventGroup(state) { //Service Deployment 안에 Event Group
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(ele => {
                if (ele.eventG != null) {
                    ele.eventG.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getEventDeployment(state) { //Service Deployment 안에 Event Deployment
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(ele => {
                if (ele.eventD != null) {
                    ele.eventD.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getServiceInterface(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getVariableDataPrototype(state) { //ServiceInterface 안에 Event
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(ele => {
                if (ele.events != null) {
                    ele.events.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getClientServer(state) { //ServiceInterface 안에 Method
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(ele => {
                if (ele.methods != null) {
                    ele.methods.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getField(state) { //ServiceInterface 안에 Field
            var datatype = []
            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(ele => {
                if (ele.fields != null) {
                    ele.fields.forEach(item => {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + item.name,
                            uuid: ele.uuid
                        })
                    })
                }
            })
            return datatype
        },
        getClient(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getServer(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getSomeIPClient(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getSomeIPServer(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getRequiredSomeIP(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getProvidedSomeIP(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getError(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.Error.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getErrorDomain(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },
        getErrorSet(state) {
            var datatype = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.map(ele => {
                var returnObj = {}
                returnObj['name'] = ele.path + '/' + ele.name
                returnObj['uuid'] = ele.uuid
                return returnObj
            })
            return datatype
        },

        gettreeviewitems(state) {
            const replaceChildren = (obj, parent) => {
                const clone = Object.assign({}, obj)
                delete clone.children
                if (parent) clone.parent = parent
                return clone
            }

            const addItems = (arr, parent) => {
                const items = arr.reduce((acc, x) => {
                    acc.push(replaceChildren(x, parent))
                    if (x.children) {
                        acc.push(addItems(x.children, x.uuid))
                    }
                    return acc
                }, [])

                return items.flat()
            }

            return addItems(state.navigatorList[state.openProjectIndex].children).reduce((acc, x) => {
                acc[x.uuid] = x
                return acc
            }, {})
        },
        getconnectLineNum: (state) => (startID) => {
            return state.connectionLine[state.openProjectIndex].start.findIndex(id => id == startID)
        },
        getChangeEndLine: (state, getters) => (startID) => {
            var idxstartId = getters.getconnectLineNum(startID)
                //console.log(idxstartId + '+' + state.connectionLine[state.openProjectIndex].end[idxstartId])
            return state.connectionLine[state.openProjectIndex].end[idxstartId]
        },
        getDataImplementation: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.find(data => data.uuid === uuid)
        },
        getDataCompuMethod: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.find(data => data.uuid === uuid)
        },
        getDataDataConstr: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.find(data => data.uuid === uuid)
        },
        getDataMachine: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Machine.Machine.find(data => data.uuid === uuid)
        },
        getDataMachineDesign: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.find(data => data.uuid === uuid)
        },
        getDataEthernetCluster: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.find(data => data.uuid === uuid)
        },
        getDataModeDeclaration: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.find(data => data.uuid === uuid)
        },
        getDataSWComponent: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.find(data => data.uuid === uuid)
        },
        getDataProcessDesign: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.find(data => data.uuid === uuid)
        },
        getDataExecutable: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.find(data => data.uuid === uuid)
        },
        getDataStartupConfig: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.find(data => data.uuid === uuid)
        },
        getDataDeterministicClient: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.find(data => data.uuid === uuid)
        },
        getDataSomeIPService: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.find(data => data.uuid === uuid)
        },
        getDataServiceInterface: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.find(data => data.uuid === uuid)
        },
        getDataClient: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.find(data => data.uuid === uuid)
        },
        getDataServer: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.find(data => data.uuid === uuid)
        },
        getDataSomeIPClient: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.find(data => data.uuid === uuid)
        },
        getDataSomeIPServer: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.find(data => data.uuid === uuid)
        },
        getDataRequiredSomeIP: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.find(data => data.uuid === uuid)
        },
        getDataProvidedSomeIP: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.find(data => data.uuid === uuid)
        },
        getDataError: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.Error.find(data => data.uuid === uuid)
        },
        getDataErrorDomain: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.find(data => data.uuid === uuid)
        },
        getDataErrorSet: (state) => (uuid) => {
            return state.SAHLProject[state.openProjectIndex].Service.ErrorSet.find(data => data.uuid === uuid)
        },
        getchangenamelist: (state) => (uuid) => {
            var idx = state.connectionLine[state.openProjectIndex].end.indexOf(uuid)
            var indices = []
            while (idx != -1) {
                indices.push(idx)
                idx = state.connectionLine[state.openProjectIndex].end.indexOf(uuid, idx + 1)
            }
            return indices
        },
        getImplementationName: (state) => (uuid) => { // service Interface->method->in/out arg edit dialog일때 type수정했을 경우 type이름 수정해 주려고 넣었음 
            var idx = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(data => data.uuid === uuid)
            return state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idx].name
        },
        getactiveLine: (state) => (uuid) => {
            var indices = []
            for (let i = 0; i < state.connectionLine[state.openProjectIndex].start.length; i++) {
                var onlyuuid = state.connectionLine[state.openProjectIndex].start[i].split('/')
                if (onlyuuid[0] == uuid) {
                    indices.push(i)
                }
            }
            //console.log('+getactiveLine++++++' + uuid + '///' + indices[0])
            return indices
        },
        getEndLineInfo: (state) => (idx) => {
            return state.connectionLine[state.openProjectIndex].end[idx]
        },
        getStartLineInfo: (state) => (idx) => {
            return state.connectionLine[state.openProjectIndex].start[idx]
        },
        getCompuMethodPath: (state) => (compu) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === compu) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getDataConstrPath: (state) => (datacon) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === datacon) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getImplementationPath: (state) => (TypeRef) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === TypeRef) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getServiceInterfaceDeploymentPath: (state) => (serviceD, idx) => { //idx=0 : element전체  1: eventG, 2:eventD, 3:MethodD
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === serviceD && idx == 0) {
                    uuidRef = data.uuid
                } else if (idx == 1) {
                    data.eventG.forEach(item => {
                        var strEvent = data.path + '/' + data.name + '/' + item.name
                            //var strEvent = data.name + '/' + item.name
                        if (serviceD == strEvent) {
                            uuidRef = data.uuid
                        }
                    })
                } else if (idx == 2) {
                    data.eventD.forEach(item => {
                        var strEvent = data.path + '/' + data.name + '/' + item.name
                            //var strEvent = data.name + '/' + item.name
                        if (serviceD == strEvent) {
                            uuidRef = data.uuid
                        }
                    })
                } else if (idx == 3) {
                    data.methodD.forEach(item => {
                        var strEvent = data.path + '/' + data.name + '/' + item.name
                            //var strEvent = data.name + '/' + item.name
                        if (serviceD == strEvent) {
                            uuidRef = data.uuid
                        }
                    })
                }
            })
            return uuidRef
        },
        getServiceInterfacePath: (state) => (service, idx) => { //idx=0 : element전체  1: event, 2:Filed, 3:Method
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === service && idx == 0) {
                    uuidRef = data.uuid
                } else if (idx == 1) {
                    data.events.forEach(item => {
                        var strEvent = data.path + '/' + data.name + '/' + item.name
                            //var strEvent = data.name + '/' + item.name
                        if (service == strEvent) {
                            uuidRef = data.uuid
                        }
                    })
                } else if (idx == 2) {
                    data.fields.forEach(item => {
                        var strField = data.path + '/' + data.name + '/' + item.name
                            //var strField = data.name + '/' + item.name
                        if (service == strField) {
                            uuidRef = data.uuid
                        }
                    })
                } else if (idx == 3) {
                    data.methods.forEach(item => {
                        var strMethod = data.path + '/' + data.name + '/' + item.name
                            //var strMethod = data.name + '/' + item.name
                        if (service == strMethod) {
                            uuidRef = data.uuid
                        }
                    })
                }
            })
            return uuidRef
        },
        getClientPath: (state) => (client) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === client) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getServerPath: (state) => (server) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === server) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getSomeIPClientPath: (state) => (client) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === client) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getSomeIPServerPath: (state) => (server) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === server) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getRequiredSomeIPPath: (state) => (requir) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === requir) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getProvidedSomeIPPath: (state) => (proc) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === proc) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getErrorPath: (state) => (error) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.Error.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === error) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getErrorSetPath: (state) => (error) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.ErrorSet.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === error) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getErrorDomainPath: (state) => (error) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === error) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getSWComponentPath: (state) => (swcompo, idx) => { //idx=0 : element전체  1: pPort, 2:rPort, 3:prPort
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === swcompo && idx == 0) {
                    uuidRef = data.uuid
                } else if (idx == 1) {
                    data.pport.forEach(item => {
                        var strPort = data.path + '/' + data.name + '/' + item.name
                            //var strPort = data.name + '/' + item.name
                        if (swcompo == strPort) {
                            uuidRef = data.uuid
                        }
                    })
                } else if (idx == 2) {
                    data.rport.forEach(item => {
                        var strPort = data.path + '/' + data.name + '/' + item.name
                            //var strPort = data.name + '/' + item.name
                        if (swcompo == strPort) {
                            uuidRef = data.uuid
                        }
                    })
                } else if (idx == 3) {
                    data.prport.forEach(item => {
                        var strPort = data.path + '/' + data.name + '/' + item.name
                            //var strPort = data.name + '/' + item.name
                        if (swcompo == strPort) {
                            uuidRef = data.uuid
                        }
                    })
                }
            })
            return uuidRef
        },
        getProcessPath: (state) => (pro) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === pro) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getProcessDesignPath: (state) => (processD) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === processD) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getExecutablePath: (state) => (exe) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === exe) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getStartupConfigPath: (state) => (start) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === start) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getDeterministicClientPath: (state) => (deter) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === deter) {
                    uuidRef = data.uuid
                }
            })
            return uuidRef
        },
        getMachinePath: (state) => (machine, idx) => { //idx=0 : element전체  1: Modul  2: function   3:
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === machine && idx == 0) {
                    uuidRef = data.uuid
                } else if (idx == 1) {
                    data.moduleinstant.forEach(item => {
                        strPath = data.path + '/' + data.name + '/' + item.name
                            //strPath = data.name + '/' + item.name
                        if (machine == strPath) {
                            uuidRef = data.uuid
                        }
                    })
                } else if (idx == 2) {
                    data.functiongroup.forEach(item => {
                        strPath = data.path + '/' + data.name + '/' + item.name
                            //strPath = data.name + '/' + item.name
                        if (machine == strPath) {
                            uuidRef = data.uuid
                        }
                    })
                }
            })
            return uuidRef
        },
        getMachinDesignPath: (state) => (machineD, idx) => { //idx=0 : element전체  1: communication
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === machineD && idx == 0) {
                    uuidRef = data.uuid
                } else if (idx == 1) {
                    data.connector.forEach(item => {
                        var strCC = data.path + '/' + data.name + '/' + item.name
                            //var strCC = data.name + '/' + item.name
                        if (machineD == strCC) {
                            uuidRef = data.uuid
                        }
                    })
                }
            })
            return uuidRef
        },
        getEthernetClusterPath: (state) => (ether) => {
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach(data => {
                var strName = data.path + '/' + data.name
                    // var strName = data.name
                var strCondiName = null,
                    strChanName = null,
                    strEndName = null

                data.conditional.forEach(condi => {
                    strCondiName = condi.name
                    condi.channel.forEach(chan => {
                        strChanName = chan.name
                        chan.endpoint.forEach(end => {
                            strEndName = end.name
                            if (ether == (strName + '/' + strCondiName + '/' + strChanName + '/' + strEndName)) {
                                uuidRef = data.uuid
                            }
                        })
                    })
                })
            })
            return uuidRef
        },
        getModeDeclarationPath: (state) => (mode, idx) => { //idx=0 : element전체  1: Mode declarations
            var uuidRef = null
            state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.forEach(data => {
                var strPath = data.path + '/' + data.name
                    //var strPath = data.name
                if (strPath === mode && idx == 0) {
                    uuidRef = data.uuid
                } else if (idx == 1) {
                    data.modedeclaration.forEach(item => {
                        strPath = data.path + '/' + data.name + '/' + item
                            //strPath = data.name + '/' + item
                        if (mode == strPath) {
                            uuidRef = data.uuid
                        }
                    })
                }
            })
            return uuidRef
        },

        sortSaveList: (state) => (savelist) => {
            var pathList = [],
                sortList = []

            savelist.forEach(data => {
                var idxelement
                if (data.parent == constant.CompuMethod_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.DataConstr_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.ApplicationArray_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.Implementation_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.Machine_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.MachineDesigne_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.EthernetCluster_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.ModeDeclarationGroup_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.HWElement_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Machine.HWElement.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.ProcesstoMachineMapping_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.SWComponents_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.Process_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.ProcessDesign_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.Executable_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.StartupConfig_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.DeterministicClient_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.SomeIPServiceInterfaceDeployment_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.ServiceInterface_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.Client_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.Server_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.SomeIPClient_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.SomeIPServer_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.SomeIPToMachineMapping_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.ToPortPrototypeMapping_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.RequiredSomeIP_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.ProvidedSomeIP_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.Error_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.Error[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.Error[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.Errorset_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                } else if (data.parent == constant.ErrorDomain_str) {
                    idxelement = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(item => item.uuid === data.uuid)
                    pathList.push({
                        path: state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxelement].path,
                        pathLength: state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxelement].path.split('/').length,
                        idx: idxelement,
                        parent: data.parent
                    })
                }
            })
            while (pathList.length > 0) {
                pathList.sort((a, b) => { if (b.pathLength > a.pathLength) { return 1 } else if (b.pathLength < a.pathLength) { return -1 } else return 0; })
                    //console.log(pathList)
                sortList.push(pathList[0])
                const numPath = pathList[0].path.split('/')
                    //console.log(numPath)
                for (let v = numPath.length - 1; v >= 0; v--) {
                    for (let i = 1; i < pathList.length; i++) {
                        const otherPath = pathList[i].path.split('/')
                        let n = v,
                            isSame = true
                        while (n >= 0) {
                            if (numPath[n] != otherPath[n]) {
                                isSame = false
                            }
                            n--
                        }
                        if (isSame) {
                            sortList.push(pathList[i])
                            pathList.splice(i, 1)
                            i--
                        }
                    }
                }
                pathList.splice(0, 1)
            }
            console.log(sortList)
            return sortList
        },
        getSaveObject: (state) => (savelist) => {
            var saveStr = '',
                namespace
            let xmlDoc, endPath = 0

            saveStr += '<AUTOSAR xmlns="http://autosar.org/schema/r4.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://autosar.org/schema/r4.0 AUTOSAR_00048.xsd">'
            var start_one = savelist[0].path.split('/')
            start_one.forEach(ele => {
                saveStr += "<AR-PACKAGES><AR-PACKAGE>"
                saveStr += "<SHORT-NAME>" + ele + "</SHORT-NAME>"
            })
            saveStr += "<ELEMENTS>"
                //console.log(saveStr)

            savelist.forEach((data, i) => {
                if (data != savelist[0]) {
                    var nowPath = data.path.split('/'),
                        beforPath = savelist[i - 1].path.split('/')
                    console.log('beforPath = ' + beforPath)
                    console.log('i = ' + i)
                    var samePath = true,
                        n = 0
                    while (samePath) {
                        if (beforPath[n] != nowPath[n] || n == beforPath.length) {
                            samePath = false
                            endPath = beforPath.length - n // 마지막에 끝날때 <AR-PACKAGES><AR-PACKAGE> 이거 해야해서 숫자를 알아햐하는거임
                        }
                        n++
                    }
                    console.log('endPath = ' + endPath)
                    var notsame = endPath
                    var otherPath = beforPath.length - endPath

                    console.log('**   ' + savelist[i - 1].path + '  /  ' + savelist[i - 1].pathLength)
                    console.log('**   ' + data.path + '  /  ' + data.pathLength)
                    if (notsame != 0) {
                        saveStr += "</ELEMENTS>"
                    }
                    //if (endPath == savelist[i - 1].pathLength) { // 앞 뒤의 path가 같은게 없으면 </AR-PACKAGES>까지 가면 안되니 하나 줄여줘야함
                    if ((beforPath.length - endPath == 0) || (data.pathLength + endPath != beforPath.length)) {
                        notsame -= 1
                    }

                    if (otherPath != endPath) {
                        while (notsame > 0) {
                            saveStr += "</AR-PACKAGE></AR-PACKAGES>"
                            notsame--
                        }
                    }

                    var repeat = data.pathLength - otherPath
                    if (repeat < 0) {
                        repeat = 0
                    }
                    console.log('repeat = ' + repeat)
                    if (repeat > 0 && savelist[i - 1].path.indexOf(data.path) == -1) {
                        saveStr += "</AR-PACKAGE>"
                        saveStr += "<AR-PACKAGE><SHORT-NAME>" + nowPath[otherPath++] + "</SHORT-NAME>"
                        repeat--
                    }
                    while (repeat > 0) {
                        saveStr += "<AR-PACKAGES><AR-PACKAGE>"
                        saveStr += "<SHORT-NAME>" + nowPath[otherPath++] + "</SHORT-NAME>"
                        repeat--
                    }
                    if (endPath != 0) {
                        saveStr += "<ELEMENTS>"
                    }
                    console.log(saveStr)
                }

                if (data.parent == constant.CompuMethod_str) {
                    saveStr += '<COMPU-METHOD UUID ="' + state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].category != '') {
                        saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].category + "</CATEGORY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].scales != null) {
                        saveStr += "<COMPU-INTERNAL-TO-PHYS><COMPU-SCALES>"
                        state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].scales.forEach(ele => {
                            saveStr += "<COMPU-SCALE>"
                            if (ele.const != '') {
                                saveStr += "<COMPU-CONST><VT>" + ele.const+"</VT></COMPU-CONST>"
                            }
                            if (ele.symbol != '') {
                                saveStr += "<SYMBOL>" + ele.symbol + "</SYMBOL>"
                            }
                            if (ele.lowerlimit != '') {
                                saveStr += '<LOWER-LIMIT INTERVAL-TYPE="CLOSED">' + ele.lowerlimit + "</LOWER-LIMIT>"
                            }
                            if (ele.upperlimit != '') {
                                saveStr += '<UPPER-LIMIT INTERVAL-TYPE="CLOSED">' + ele.upperlimit + "</UPPER-LIMIT>"
                            }
                            if (ele.desc != '') {
                                saveStr += '<DESC><L-2 L="EN">' + ele.desc + "</L-2></DESC>"
                            }
                            saveStr += "</COMPU-SCALE>"
                        })
                        saveStr += "</COMPU-SCALES></COMPU-INTERNAL-TO-PHYS>"
                    }
                    saveStr += "</COMPU-METHOD>"
                } else if (data.parent == constant.DataConstr_str) {
                    saveStr += '<DATA-CONSTR UUID ="' + state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].lowerlimit != '') {
                        saveStr += "<DATA-CONSTR-RULES><DATA-CONSTR-RULE><INTERNAL-CONSTRS><LOWER-LIMIT>" +
                            state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].lowerlimit + "</LOWER-LIMIT>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].upperlimit != '') {
                        saveStr += "<UPPER-LIMIT>" + state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].upperlimit +
                            "</UPPER-LIMIT></INTERNAL-CONSTRS></DATA-CONSTR-RULE></DATA-CONSTR-RULES>"
                    }
                    saveStr += "</DATA-CONSTR>"
                } else if (data.parent == constant.ApplicationArray_str) {
                    saveStr += '<APPLICATION-ARRAY-DATA-TYPE UUID="' + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].category != '') {
                        saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].category + "</CATEGORY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].dynamicArrySize != '') {
                        saveStr += "<DYNAMIC-ARRAY-SIZE-PROFILE>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].dynamicArrySize + "</DYNAMIC-ARRAY-SIZE-PROFILE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elename != '' ||
                        state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elehandling != null ||
                        state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elesemantics != null ||
                        state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elemaxnumber != '') {
                        saveStr += "<ELEMENT>"
                        if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elename != '') {
                            saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elename + "</SHORT-NAME>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elehandling != null) {
                            saveStr += "<ARRAY-SIZE-HANDLING>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elehandling + "</ARRAY-SIZE-HANDLING>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elesemantics != null) {
                            saveStr += "<ARRAY-SIZE-SEMANTICS>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elesemantics + "</ARRAY-SIZE-SEMANTICS>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elemaxnumber != '') {
                            saveStr += "<MAX-NUMBER-OF-ELEMENTS>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elemaxnumber + "</MAX-NUMBER-OF-ELEMENTS>"
                        }
                        saveStr += "</ELEMENT>"
                    }
                    saveStr += '</APPLICATION-ARRAY-DATA-TYPE>'
                } else if (data.parent == constant.Implementation_str) {
                    saveStr += '<STD-CPP-IMPLEMENTATION-DATA-TYPE UUID="' + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].category) {
                        saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].category + "</CATEGORY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].namespace != '') {
                        namespace = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].namespace.split(',')
                        saveStr += "<NAMESPACES>"
                        namespace.forEach(ele => {
                            var symbol = ele.split('/')
                            saveStr += "<SYMBOL-PROPS>"
                            saveStr += "<SHORT-NAME>" + symbol[0] + "</SHORT-NAME>"
                            saveStr += "<SYMBOL>" + symbol[1] + "</SYMBOL>"
                            saveStr += "</SYMBOL-PROPS>"
                        })
                        saveStr += "</NAMESPACES>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].arraysize != '') {
                        saveStr += "<ARRAY-SIZE>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].arraysize + "</ARRAY-SIZE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].typeemitter != '') {
                        saveStr += "<TYPE-EMITTER>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].typeemitter + "</TYPE-EMITTER>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].typeref != null) {
                        saveStr += '<TYPE-REFERENCE-REF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].typeref + "</TYPE-REFERENCE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].templatetype != null) {
                        saveStr += '<TEMPLATE-ARGUMENTS><CPP-TEMPLATE-ARGUMENT><TEMPLATE-TYPE-REF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].templatetype +
                            "</TEMPLATE-TYPE-REF></CPP-TEMPLATE-ARGUMENT></TEMPLATE-ARGUMENTS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].desc != '') {
                        saveStr += '<DESC><L-2 L="EN">' + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].desc + "</L-2></DESC>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].ddpc != null) {
                        saveStr += "<SW-DATA-DEF-PROPS><SW-DATA-DEF-PROPS-VARIANTS>"
                        state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].ddpc.forEach(ele => {
                            saveStr += '<SW-DATA-DEF-PROPS-CONDITIONAL>'
                            if (ele.compumethod != null) {
                                saveStr += '<COMPU-METHOD-REF DEST="COMPU-METHOD">' + ele.compumethod + '</COMPU-METHOD-REF>'
                            }
                            if (ele.dataconstr != null) {
                                saveStr += '<DATA-CONSTR-REF DEST="DATA-CONSTR">' + ele.dataconstr + '</DATA-CONSTR-REF>'
                            }
                            saveStr += '</SW-DATA-DEF-PROPS-CONDITIONAL>'
                        })
                        saveStr += "</SW-DATA-DEF-PROPS-VARIANTS></SW-DATA-DEF-PROPS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].idtelement != null) {
                        saveStr += "<SUB-ELEMENTS>"
                        state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].idtelement.forEach(ele => {
                            saveStr += "<CPP-IMPLEMENTATION-DATA-TYPE-ELEMENT>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.desc != '') {
                                saveStr += '<DESC><L-2 L="EN">' + ele.desc + "</L-2></DESC>"
                            }
                            if (ele.typeref != null) {
                                saveStr += "<TYPE-REFERENCE>"
                                saveStr += "<INPLACE>" + ele.inplace + "</INPLACE>"
                                saveStr += '<TYPE-REFERENCE-REF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + ele.typeref + "</TYPE-REFERENCE-REF>"
                                saveStr += "</TYPE-REFERENCE>"
                            }
                            saveStr += "</CPP-IMPLEMENTATION-DATA-TYPE-ELEMENT>"
                        })
                        saveStr += "</SUB-ELEMENTS>"
                    }
                    saveStr += "</STD-CPP-IMPLEMENTATION-DATA-TYPE>"
                } else if (data.parent == constant.Machine_str) {
                    saveStr += '<MACHINE UUID="' + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].machinedesign != null) {
                        saveStr += '<MACHINE-DESIGN-REF DEST="MACHINE-DESIGN">' + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].machinedesign + "</MACHINE-DESIGN-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].timeout != '') {
                        saveStr += "<DEFAULT-APPLICATION-TIMEOUT>"
                        saveStr += "<EXIT-TIMEOUT-VALUE>" + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].timeout + "</EXIT-TIMEOUT-VALUE>"
                        saveStr += "</DEFAULT-APPLICATION-TIMEOUT>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].hwelement != null) {
                        saveStr += "<HW-ELEMENT-REFS>"
                        state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].hwelement.forEach(ele => {
                            if (ele.hwelement != null) {
                                saveStr += '<HW-ELEMENT-REF DEST="HW-ELEMENT">' + ele.hwelement + "</HW-ELEMENT-REF>"
                            }
                        })
                        saveStr += "</HW-ELEMENT-REFS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].executable != null) {
                        saveStr += "<TRUSTED-PLATFORM-EXECUTABLE-LAUNCH-BEHAVIOR>" + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].executable + "</TRUSTED-PLATFORM-EXECUTABLE-LAUNCH-BEHAVIOR>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].admin != '') {
                        saveStr += '<ADMIN-DATA><SDGS><SDG GID="PER-STORAGE-PATH"><SD GID="PATH">' + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].admin + "</SD></SDG></SDGS></ADMIN-DATA>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].functiongroup != null) {
                        saveStr += "<FUNCTION-GROUPS>"
                        state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].functiongroup.forEach(ele => {
                            saveStr += "<MODE-DECLARATION-GROUP-PROTOTYPE>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.type != null) {
                                saveStr += '<TYPE-TREF DEST="MODE-DECLARATION-GROUP">' + ele.type + "</TYPE-TREF>"
                            }
                            saveStr += "</MODE-DECLARATION-GROUP-PROTOTYPE>"
                        })
                        saveStr += "</FUNCTION-GROUPS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].processor != null) {
                        saveStr += "<PROCESSORS>"
                        state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].processor.forEach(ele => {
                            saveStr += "<PROCESSOR>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.core != null) {
                                saveStr += "<CORES>"
                                ele.core.forEach(core => {
                                    saveStr += "<PROCESSOR-CORE>"
                                    if (core.name != '') {
                                        saveStr += "<SHORT-NAME>" + core.name + "</SHORT-NAME>"
                                    }
                                    if (core.id != '') {
                                        saveStr += "<CORE-ID>" + core.id + "</CORE-ID>"
                                    }
                                    saveStr += "</PROCESSOR-CORE>"
                                })
                                saveStr += "</CORES>"
                            }
                            saveStr += "</PROCESSOR>"
                        })
                        saveStr += "</PROCESSORS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].moduleinstant != null) {
                        saveStr += "<MODULE-INSTANTIATIONS>"
                        state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].moduleinstant.forEach(ele => {
                            saveStr += "<OS-MODULE-INSTANTIATION>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.resource != null) {
                                saveStr += "<RESOURCE-GROUPS>"
                                ele.resource.forEach(res => {
                                    saveStr += "<RESOURCE-GROUP>"
                                    if (res.name != '') {
                                        saveStr += "<SHORT-NAME>" + res.name + "</SHORT-NAME>"
                                    }
                                    if (res.cpuUsage != '') {
                                        saveStr += "<CPU-USAGE>" + res.cpuUsage + "</CPU-USAGE>"
                                    }
                                    if (res.memoryUsage != '') {
                                        saveStr += "<MEM-USAGE>" + res.memoryUsage + "</MEM-USAGE>"
                                    }
                                    saveStr += "</RESOURCE-GROUP>"
                                })
                                saveStr += "</RESOURCE-GROUPS>"
                            }
                            saveStr += "</OS-MODULE-INSTANTIATION>"
                        })
                        saveStr += "</MODULE-INSTANTIATIONS>"
                    }
                    saveStr += "</MACHINE>"
                } else if (data.parent == constant.MachineDesigne_str) {
                    saveStr += '<MACHINE-DESIGN UUID="' + state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].access != null) {
                        saveStr += "<ACCESS-CONTROL>" + state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].access + "</ACCESS-CONTROL>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].resettimer != '') {
                        saveStr += "<PN-RESET-TIMER>" + state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].resettimer + "</PN-RESET-TIMER>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].connector != null) {
                        saveStr += "<COMMUNICATION-CONNECTORS>"
                        state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].connector.forEach(ele => {
                            saveStr += "<ETHERNET-COMMUNICATION-CONNECTOR>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.mtu != '') {
                                saveStr += "<MAXIMUM-TRANSMISSION-UNIT>" + ele.mtu + "</MAXIMUM-TRANSMISSION-UNIT>"
                            }
                            if (ele.mtuenable != null) {
                                saveStr += "<PATH-MTU-ENABLED>" + ele.mtuenable + "</PATH-MTU-ENABLED>"
                            }
                            if (ele.timeout != '') {
                                saveStr += "<PATH-MTU-TIMEOUT>" + ele.timeout + "</PATH-MTU-TIMEOUT>"
                            }
                            if (ele.endpoint != null) {
                                saveStr += '<UNICAST-NETWORK-ENDPOINT-REF DEST="NETWORK-ENDPOINT">' + ele.endpoint + "</UNICAST-NETWORK-ENDPOINT-REF>"
                            }
                            if (ele.mask != '') {
                                saveStr += "<PNC-FILTER-DATA-MASK>" + ele.mask + "</PNC-FILTER-DATA-MASK>"
                            }
                            saveStr += "</ETHERNET-COMMUNICATION-CONNECTOR>"
                        })
                        saveStr += "</COMMUNICATION-CONNECTORS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].servicediscover != null) {
                        saveStr += "<SERVICE-DISCOVER-CONFIGS>"
                        state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].servicediscover.forEach(ele => {
                            saveStr += "<SOMEIP-SERVICE-DISCOVERY>"
                            if (ele.msia != null) {
                                saveStr += '<MULTICAST-SD-IP-ADDRESS-REF DEST="NETWORK-ENDPOINT">' + ele.msia + "</MULTICAST-SD-IP-ADDRESS-REF>"
                            }
                            if (ele.ssdp != '') {
                                saveStr += "<SOMEIP-SERVICE-DISCOVERY-PORT>" + ele.ssdp + "</SOMEIP-SERVICE-DISCOVERY-PORT>"
                            }
                            saveStr += "</SOMEIP-SERVICE-DISCOVERY>"
                        })
                        saveStr += "</SERVICE-DISCOVER-CONFIGS>"
                    }
                    saveStr += "</MACHINE-DESIGN>"
                } else if (data.parent == constant.EthernetCluster_str) {
                    saveStr += '<ETHERNET-CLUSTER UUID="' + state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].conditional != null) {
                        saveStr += "<ETHERNET-CLUSTER-VARIANTS>"
                        state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].conditional.forEach(ele => {
                            saveStr += "<ETHERNET-CLUSTER-CONDITIONAL>"
                            if (ele.name != '') {
                                saveStr += "<PROTOCOL-NAME>" + ele.name + "</PROTOCOL-NAME>"
                            }
                            if (ele.version != '') {
                                saveStr += "<PROTOCOL-VERSION>" + ele.version + "</PROTOCOL-VERSION>"
                            }
                            if (ele.channel != null) {
                                saveStr += "<PHYSICAL-CHANNELS>"
                                ele.channel.forEach(channel => {
                                    saveStr += "<ETHERNET-PHYSICAL-CHANNEL>"
                                    if (channel.name != '') {
                                        saveStr += "<SHORT-NAME>" + channel.name + "</SHORT-NAME>"
                                    }
                                    if (channel.comconnect.length > 0) {
                                        saveStr += "<COMM-CONNECTORS>"
                                        channel.comconnect.forEach(com => {
                                            saveStr += "<COMMUNICATION-CONNECTOR-REF-CONDITIONAL>"
                                            if (com.connector != null) {
                                                saveStr += '<COMMUNICATION-CONNECTOR-REF DEST="ETHERNET-COMMUNICATION-CONNECTOR">' + com.connector + "</COMMUNICATION-CONNECTOR-REF>"
                                            }
                                            saveStr += "</COMMUNICATION-CONNECTOR-REF-CONDITIONAL>"
                                        })
                                        saveStr += "</COMM-CONNECTORS>"
                                    }
                                    if (channel.endpoint.length > 0) {
                                        saveStr += "<NETWORK-ENDPOINTS>"
                                        channel.endpoint.forEach(endpoint => {
                                            saveStr += "<NETWORK-ENDPOINT>"
                                            if (endpoint.name != '') {
                                                saveStr += "<SHORT-NAME>" + endpoint.name + "</SHORT-NAME>"
                                            }
                                            if (endpoint.domainname != '') {
                                                saveStr += "<FULLY-QUALIFIED-DOMAIN-NAME>" + endpoint.domainname + "</FULLY-QUALIFIED-DOMAIN-NAME>"
                                            }
                                            if (endpoint.ip4address.length > 0 || endpoint.ip6address.length > 0) {
                                                saveStr += "<NETWORK-ENDPOINT-ADDRESSES>"
                                            }
                                            if (endpoint.ip4address.length > 0) {
                                                endpoint.ip4address.forEach(ip4 => {
                                                    saveStr += "<IPV-4-CONFIGURATION>"
                                                    if (ip4.gateway != '') {
                                                        saveStr += "<DEFAULT-GATEWAY>" + ip4.gateway + "</DEFAULT-GATEWAY>"
                                                    }
                                                    if (ip4.behavior != null) {
                                                        saveStr += "<IP-ADDRESS-KEEP-BEHAVIOR>" + ip4.behavior + "</IP-ADDRESS-KEEP-BEHAVIOR>"
                                                    }
                                                    if (ip4.address != '') {
                                                        saveStr += "<IPV-4-ADDRESS>" + ip4.address + "</IPV-4-ADDRESS>"
                                                    }
                                                    if (ip4.addresssorce != null) {
                                                        saveStr += "<IPV-4-ADDRESS-SOURCE>" + ip4.addresssorce + "</IPV-4-ADDRESS-SOURCE>"
                                                    }
                                                    if (ip4.mask != '') {
                                                        saveStr += "<NETWORK-MASK>" + ip4.mask + "</NETWORK-MASK>"
                                                    }
                                                    saveStr += "</IPV-4-CONFIGURATION>"
                                                })
                                            }
                                            if (endpoint.ip6address.length > 0) {
                                                endpoint.ip6address.forEach(ip6 => {
                                                    saveStr += "<IPV-6-CONFIGURATION>"
                                                    if (ip6.priority != '') {
                                                        saveStr += "<ASSIGNMENT-PRIORITY>" + ip6.priority + "</ASSIGNMENT-PRIORITY>"
                                                    }
                                                    if (ip6.behavior != null) {
                                                        saveStr += "<IP-ADDRESS-KEEP-BEHAVIOR>" + ip6.behavior + "</IP-ADDRESS-KEEP-BEHAVIOR>"
                                                    }
                                                    if (ip6.prelength != '') {
                                                        saveStr += "<IP-ADDRESS-PREFIX-LENGTH>" + ip6.prelength + "</IP-ADDRESS-PREFIX-LENGTH>"
                                                    }
                                                    if (ip6.address != null) {
                                                        saveStr += "<IPV-6-ADDRESS>" + ip6.address + "</IPV-6-ADDRESS>"
                                                    }
                                                    if (ip6.addresssource != '') {
                                                        saveStr += "<IPV-6-ADDRESS-SOURCE>" + ip6.addresssource + "</IPV-6-ADDRESS-SOURCE>"
                                                    }
                                                    saveStr += "</IPV-6-CONFIGURATION>"
                                                })

                                            }
                                            if (endpoint.ip4address.length > 0 || endpoint.ip6address.length > 0) {
                                                saveStr += "</NETWORK-ENDPOINT-ADDRESSES>"
                                            }
                                            if (endpoint.priority != '') {
                                                saveStr += "<PRIORITY>" + endpoint.priority + "</PRIORITY>"
                                            }
                                            saveStr += "</NETWORK-ENDPOINT>"
                                        })
                                        saveStr += "</NETWORK-ENDPOINTS>"
                                    }
                                    saveStr += "</ETHERNET-PHYSICAL-CHANNEL>"
                                })
                                saveStr += "</PHYSICAL-CHANNELS>"
                            }
                            saveStr += "</ETHERNET-CLUSTER-CONDITIONAL>"
                        })
                        saveStr += "</ETHERNET-CLUSTER-VARIANTS>"
                    }
                    saveStr += "</ETHERNET-CLUSTER>"
                } else if (data.parent == constant.ModeDeclarationGroup_str) {
                    saveStr += '<MODE-DECLARATION-GROUP UUID="' + state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].initmode != null) {
                        saveStr += '<INITIAL-MODE-REF DEST="MODE-DECLARATION">' + state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].initmode + "</INITIAL-MODE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].modedeclaration != null) {
                        saveStr += "<MODE-DECLARATIONS>"
                        state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].modedeclaration.forEach(ele => {
                            saveStr += "<MODE-DECLARATION>"
                            saveStr += "<SHORT-NAME>" + ele + "</SHORT-NAME>"
                            saveStr += "</MODE-DECLARATION>"
                        })
                        saveStr += "</MODE-DECLARATIONS>"
                    }
                    saveStr += "</MODE-DECLARATION-GROUP>"
                } else if (data.parent == constant.HWElement_str) {
                    saveStr += '<HW-ELEMENT UUID="' + state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].category != null) {
                        saveStr += "<HW-CATEGORY-REFS>"
                        saveStr += '<HW-CATEGORY-REF DEST="HW-CATEGORY">' + state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].category + "</HW-CATEGORY-REF>"
                        saveStr += "</HW-CATEGORY-REFS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].attribute != null) {
                        saveStr += "<HW-ATTRIBUTE-VALUES>"
                        state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].attribute.forEach(ele => {
                            saveStr += "<HW-ATTRIBUTE-VALUE>"
                            if (ele.attr != null) {
                                saveStr += '<HW-ATTRIBUTE-DEF-REF DEST="HW-ATTRIBUTE-DEF">' + ele.attr + "</HW-ATTRIBUTE-DEF-REF>"
                            }
                            if (ele.vt != '') {
                                saveStr += "<VT>" + ele.vt + "</VT>"
                            }
                            if (ele.v != '') {
                                saveStr += "<V>" + ele.v + "</V>"
                            }
                            saveStr += "</HW-ATTRIBUTE-VALUE>"
                        })
                        saveStr += "</HW-ATTRIBUTE-VALUES>"
                    }
                    saveStr += "</HW-ELEMENT>"
                } else if (data.parent == constant.ProcesstoMachineMapping_str) {
                    saveStr += '<PROCESS-TO-MACHINE-MAPPING-SET UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmname != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmMachine != null ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmProcess != null) {
                        saveStr += "<PROCESS-TO-MACHINE-MAPPINGS><PROCESS-TO-MACHINE-MAPPING>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmname != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmname + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmMachine != null) {
                        saveStr += '<MACHINE-REF DEST="MACHINE">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmMachine + "</MACHINE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmProcess != null) {
                        saveStr += '<PROCESS-REF DEST="PROCESS">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmProcess + "</PROCESS-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmname != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmMachine != null ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].ptmmProcess != null) {
                        saveStr += "</PROCESS-TO-MACHINE-MAPPING></PROCESS-TO-MACHINE-MAPPINGS>"
                    }
                    saveStr += "</PROCESS-TO-MACHINE-MAPPING-SET>"
                } else if (data.parent == constant.SWComponents_str) {
                    saveStr += '<ADAPTIVE-APPLICATION-SW-COMPONENT-TYPE UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].pport != null ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].rport != null ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].prport != null) {
                        saveStr += "<PORTS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].pport != null) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].pport.forEach(ele => {
                            saveStr += "<P-PORT-PROTOTYPE>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.interface != null) {
                                saveStr += '<PROVIDED-INTERFACE-TREF DEST="SERVICE-INTERFACE">' + ele.interface + "</PROVIDED-INTERFACE-TREF>"
                            }
                            saveStr += "</P-PORT-PROTOTYPE>"
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].rport != null) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].rport.forEach(ele => {
                            saveStr += "<R-PORT-PROTOTYPE>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.interface != null) {
                                saveStr += '<REQUIRED-INTERFACE-TREF DEST="SERVICE-INTERFACE">' + ele.interface + "</REQUIRED-INTERFACE-TREF>"
                            }
                            saveStr += "</R-PORT-PROTOTYPE>"
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].prport != null) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].prport.forEach(ele => {
                            saveStr += "<PR-PORT-PROTOTYPE>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.interface != null) {
                                saveStr += '<PROVIDED-REQUIRED-INTERFACE-TREF DEST="SERVICE-INTERFACE">' + ele.interface + "</PROVIDED-REQUIRED-INTERFACE-TREF>"
                            }
                            saveStr += "</PR-PORT-PROTOTYPE>"
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].pport != null ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].rport != null ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].prport != null) {
                        saveStr += "</PORTS>"
                    }
                    saveStr += "</ADAPTIVE-APPLICATION-SW-COMPONENT-TYPE>"
                } else if (data.parent == constant.Process_str) {
                    saveStr += '<PROCESS UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].prodesign != null) {
                        saveStr += '<DESIGN-REF DEST="PROCESS-DESIGN">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].prodesign + "</DESIGN-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].determin != null) {
                        saveStr += '<DETERMINISTIC-CLIENT-REF DEST="DETERMINISTIC-CLIENT">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].determin + "</DETERMINISTIC-CLIENT-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].execut != null) {
                        saveStr += '<EXECUTABLE-REF DEST="EXECUTABLE">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].execut + "</EXECUTABLE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinname != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinetype != null) {
                        saveStr += "<PROCESS-STATE-MACHINE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinname != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinname + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinetype != null) {
                        saveStr += '<TYPE-TREF DEST="MODE-DECLARATION-GROUP">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinetype + "</TYPE-TREF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinname != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinetype != null) {
                        saveStr += "</PROCESS-STATE-MACHINE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].dependent != null) {
                        saveStr += "<STATE-DEPENDENT-STARTUP-CONFIGS>"
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].dependent.forEach(ele => {
                            saveStr += "<STATE-DEPENDENT-STARTUP-CONFIG>"
                            if (ele.functionItem.length > 0) {
                                saveStr += "<FUNCTION-GROUP-STATE-IREFS>"
                                ele.functionItem.forEach(fun => {
                                    saveStr += "<FUNCTION-GROUP-STATE-IREF>"
                                    if (fun.contextMode != null) {
                                        saveStr += '<CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF DEST="MODE-DECLARATION-GROUP-PROTOTYPE">' + fun.contextMode + "</CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF>"
                                    }
                                    if (fun.targetMode != null) {
                                        saveStr += '<TARGET-MODE-DECLARATION-REF DEST="MODE-DECLARATION">' + fun.targetMode + "</TARGET-MODE-DECLARATION-REF>"
                                    }
                                    saveStr += "</FUNCTION-GROUP-STATE-IREF>"
                                })
                                saveStr += "</FUNCTION-GROUP-STATE-IREFS>"
                            }
                            if (ele.resourceRef != null) {
                                saveStr += '<RESOURCE-GROUP-REF DEST="RESOURCE-GROUP">' + ele.resourceRef + "</RESOURCE-GROUP-REF>"
                            }
                            if (ele.startupConfigRef != null) {
                                saveStr += '<STARTUP-CONFIG-REF DEST="STARTUP-CONFIG">' + ele.startupConfigRef + "</STARTUP-CONFIG-REF>"
                            }
                            saveStr += "</STATE-DEPENDENT-STARTUP-CONFIG>"
                        })
                        saveStr += "</STATE-DEPENDENT-STARTUP-CONFIGS>"
                    }

                    saveStr += "</PROCESS>"
                } else if (data.parent == constant.ProcessDesign_str) {
                    saveStr += '<PROCESS-DESIGN UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].executableref != null) {
                        saveStr += '<EXECUTABLE-REF DEST="EXECUTABLE">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].executableref + "</EXECUTABLE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].determin != null) {
                        saveStr += "<DETERMINISTIC-CLIENT-RESOURCE-NEEDSS>"
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].determin.forEach(ele => {
                            saveStr += "<DETERMINISTIC-CLIENT-RESOURCE-NEEDS>"
                            if (ele.swname != '') {
                                saveStr += "<SHORT-NAME>" + ele.swname + "</SHORT-NAME>"
                            }
                            if (ele.hardwareP != '') {
                                saveStr += "<HARDWARE-PLATFORM>" + ele.hardwareP + "</HARDWARE-PLATFORM>"
                            }
                            if (ele.initnofinstruction != '' || ele.initsequentialbegin != '' ||
                                ele.initsequentialend != '' || ele.initspeedup != '') {
                                saveStr += "<INIT-RESOURCE>"
                            }
                            if (ele.initnofinstruction != '') {
                                saveStr += "<NUMBER-OF-INSTRUCTIONS>" + ele.initnofinstruction + "</NUMBER-OF-INSTRUCTIONS>"
                            }
                            if (ele.initsequentialbegin != '') {
                                saveStr += "<SEQUENTIAL-INSTRUCTIONS-BEGIN>" + ele.initsequentialbegin + "</SEQUENTIAL-INSTRUCTIONS-BEGIN>"
                            }
                            if (ele.initsequentialend != '') {
                                saveStr += "<SEQUENTIAL-INSTRUCTIONS-END>" + ele.initsequentialend + "</SEQUENTIAL-INSTRUCTIONS-END>"
                            }
                            if (ele.initspeedup != '') {
                                saveStr += "<SPEEDUP>" + ele.initspeedup + "</SPEEDUP>"
                            }
                            if (ele.initnofinstruction != '' || ele.initsequentialbegin != '' ||
                                ele.initsequentialend != '' || ele.initspeedup != '') {
                                saveStr += "</INIT-RESOURCE>"
                            }
                            if (ele.runnofinstruction != '' || ele.runsequentialbegin != '' ||
                                ele.runsequentialend != '' || ele.runspeedup != '') {
                                saveStr += "<RUN-RESOURCE>"
                            }
                            if (ele.runnofinstruction != '') {
                                saveStr += "<NUMBER-OF-INSTRUCTIONS>" + ele.runnofinstruction + "</NUMBER-OF-INSTRUCTIONS>"
                            }
                            if (ele.runsequentialbegin != '') {
                                saveStr += "<SEQUENTIAL-INSTRUCTIONS-BEGIN>" + ele.runsequentialbegin + "</SEQUENTIAL-INSTRUCTIONS-BEGIN>"
                            }
                            if (ele.runsequentialend != '') {
                                saveStr += "<SEQUENTIAL-INSTRUCTIONS-END>" + ele.runsequentialend + "</SEQUENTIAL-INSTRUCTIONS-END>"
                            }
                            if (ele.runspeedup != '') {
                                saveStr += "<SPEEDUP>" + ele.runspeedup + "</SPEEDUP>"
                            }
                            if (ele.runnofinstruction != '' || ele.runsequentialbegin != '' ||
                                ele.runsequentialend != '' || ele.runspeedup != '') {
                                saveStr += "</RUN-RESOURCE>"
                            }
                            saveStr += "</DETERMINISTIC-CLIENT-RESOURCE-NEEDS>"
                        })
                        saveStr += "</DETERMINISTIC-CLIENT-RESOURCE-NEEDSS>"
                    }
                    saveStr += "</PROCESS-DESIGN>"
                } else if (data.parent == constant.Executable_str) {
                    saveStr += '<EXECUTABLE UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].category != '') {
                        saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].category + "</CATEGORY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].buildType != null) {
                        saveStr += "<BUILD-TYPE>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].buildType + "</BUILD-TYPE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].loggingBehabior != null) {
                        saveStr += "<LOGGING-BEHAVIOR>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].loggingBehabior + "</LOGGING-BEHAVIOR>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].reportingBehabior != null) {
                        saveStr += "<REPORTING-BEHAVIOR>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].reportingBehabior + "</REPORTING-BEHAVIOR>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].version != '') {
                        saveStr += "<VERSION>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].version + "</VERSION>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].swname != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].applicationtyperef != null) {
                        saveStr += "<ROOT-SW-COMPONENT-PROTOTYPE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].swname != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].swname + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].applicationtyperef != null) {
                        saveStr += '<APPLICATION-TYPE-TREF DEST="ADAPTIVE-APPLICATION-SW-COMPONENT-TYPE">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].applicationtyperef + "</APPLICATION-TYPE-TREF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].swname != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].applicationtyperef != null) {
                        saveStr += "</ROOT-SW-COMPONENT-PROTOTYPE>"
                    }
                    saveStr += "</EXECUTABLE>"
                } else if (data.parent == constant.StartupConfig_str) {
                    saveStr += '<STARTUP-CONFIG-SET UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].configname != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].policy != null ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].priority != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].entertimeout != '' ||
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].exittimeout != '') {
                        saveStr += "<STARTUP-CONFIGS><STARTUP-CONFIG>"
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].configname != '') {
                            saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].configname + "</SHORT-NAME>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].policy != null) {
                            saveStr += "<SCHEDULING-POLICY>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].policy + "</SCHEDULING-POLICY>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].priority != '') {
                            saveStr += "<SCHEDULING-PRIORITY>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].priority + "</SCHEDULING-PRIORITY>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].entertimeout != '' ||
                            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].exittimeout != '') {
                            saveStr += "<TIMEOUT>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].entertimeout != '') {
                            saveStr += "<ENTER-TIMEOUT-VALUE>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].entertimeout + "</ENTER-TIMEOUT-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].exittimeout != '') {
                            saveStr += "<EXIT-TIMEOUT-VALUE>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].exittimeout + "</EXIT-TIMEOUT-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].entertimeout != '' ||
                            state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].exittimeout != '') {
                            saveStr += "</TIMEOUT>"
                        }
                        saveStr += "</STARTUP-CONFIG></STARTUP-CONFIGS>"
                    }
                    saveStr += "</STARTUP-CONFIG-SET>"
                } else if (data.parent == constant.DeterministicClient_str) {
                    saveStr += '<DETERMINISTIC-CLIENT UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].cycletiem != '') {
                        saveStr += "<CYCLE-TIME-VALUE>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].cycletiem + "</CYCLE-TIME-VALUE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].numofworkers != '') {
                        saveStr += "<NUMBER-OF-WORKERS>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].numofworkers + "</NUMBER-OF-WORKERS>"
                    }
                    saveStr += "</DETERMINISTIC-CLIENT>"
                } else if (data.parent == constant.SomeIPServiceInterfaceDeployment_str) {
                    saveStr += '<SOMEIP-SERVICE-INTERFACE-DEPLOYMENT UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].service != null) {
                        saveStr += '<SERVICE-INTERFACE-REF DEST="SERVICE-INTERFACE">' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].service + "</SERVICE-INTERFACE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].majversion != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].minversion != '') {
                        saveStr += "<SERVICE-INTERFACE-VERSION>"
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].majversion != '') {
                            saveStr += "<MAJOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].majversion + "</MAJOR-VERSION>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].minversion != '') {
                            saveStr += "<MINOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].minversion + "</MINOR-VERSION>"
                        }
                        saveStr += "</SERVICE-INTERFACE-VERSION>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].id != '') {
                        saveStr += "<SERVICE-INTERFACE-ID>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].id + "</SERVICE-INTERFACE-ID>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].eventG != null) {
                        saveStr += "<EVENT-GROUPS>"
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].eventG.forEach(ele => {
                            saveStr += "<SOMEIP-EVENT-GROUP>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.id != '') {
                                saveStr += "<EVENT-GROUP-ID>" + ele.id + "</EVENT-GROUP-ID>"
                            }
                            if (ele.event != null) {
                                saveStr += "<EVENT-REFS>"
                                ele.event.forEach(item => {
                                    saveStr += '<EVENT-REF DEST="SOMEIP-EVENT-DEPLOYMENT">' + item.event + "</EVENT-REF>"
                                })
                                saveStr += "</EVENT-REFS>"
                            }
                            saveStr += "</SOMEIP-EVENT-GROUP>"
                        })
                        saveStr += "</EVENT-GROUPS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].eventD != null) {
                        saveStr += "<EVENT-DEPLOYMENTS>"
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].eventD.forEach(ele => {
                            saveStr += "<SOMEIP-EVENT-DEPLOYMENT>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.event != null) {
                                saveStr += '<EVENT-REF DEST="VARIABLE-DATA-PROTOTYPE">' + ele.event + "</EVENT-REF>"
                            }
                            if (ele.id != '') {
                                saveStr += "<EVENT-ID>" + ele.id + "</EVENT-ID>"
                            }
                            if (ele.maxlength != '') {
                                saveStr += "<MAXIMUM-SEGMENT-LENGTH>" + ele.maxlength + "</MAXIMUM-SEGMENT-LENGTH>"
                            }
                            if (ele.time != '') {
                                saveStr += "<SEPARATION-TIME>" + ele.time + "</SEPARATION-TIME>"
                            }
                            if (ele.serializer != null) {
                                saveStr += '<SERIALIZER>' + ele.serializer + "</SERIALIZER>"
                            }
                            if (ele.protocal != null) {
                                saveStr += '<TRANSPORT-PROTOCOL>' + ele.protocal + "</TRANSPORT-PROTOCOL>"
                            }
                            saveStr += "</SOMEIP-EVENT-DEPLOYMENT>"
                        })
                        saveStr += "</EVENT-DEPLOYMENTS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].methodD != null) {
                        saveStr += "<METHOD-DEPLOYMENTS>"
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].methodD.forEach(ele => {
                            saveStr += "<SOMEIP-METHOD-DEPLOYMENT>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.method != null) {
                                saveStr += '<METHOD-REF DEST="CLIENT-SERVER-OPERATION">' + ele.method + "</METHOD-REF>"
                            }
                            if (ele.id != '') {
                                saveStr += "<METHOD-ID>" + ele.id + "</METHOD-ID>"
                            }
                            if (ele.maxrequest != '') {
                                saveStr += "<MAXIMUM-SEGMENT-LENGTH-REQUEST>" + ele.maxrequest + "</MAXIMUM-SEGMENT-LENGTH-REQUEST>"
                            }
                            if (ele.maxresponse != '') {
                                saveStr += "<MAXIMUM-SEGMENT-LENGTH-RESPONSE>" + ele.maxresponse + "</MAXIMUM-SEGMENT-LENGTH-RESPONSE>"
                            }
                            if (ele.timerequest != '') {
                                saveStr += "<SEPARATION-TIME-REQUEST>" + ele.timerequest + "</SEPARATION-TIME-REQUEST>"
                            }
                            if (ele.timeresponse != '') {
                                saveStr += "<SEPARATION-TIME-RESPONSE>" + ele.timeresponse + "</SEPARATION-TIME-RESPONSE>"
                            }
                            if (ele.protocal != null) {
                                saveStr += '<TRANSPORT-PROTOCOL>' + ele.protocal + "</TRANSPORT-PROTOCOL>"
                            }
                            saveStr += "</SOMEIP-METHOD-DEPLOYMENT>"
                        })
                        saveStr += "</METHOD-DEPLOYMENTS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].fieldD != null) {
                        saveStr += "<FIELD-DEPLOYMENTS>"
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].fieldD.forEach(ele => {
                            saveStr += "<SOMEIP-FIELD-DEPLOYMENT>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.field != null) {
                                saveStr += '<FIELD-REF DEST="FIELD">' + ele.field + "</FIELD-REF>"
                            }
                            if (ele.getname != '' || ele.getid != '' || ele.getmaxreq != '' ||
                                ele.getmaxres != '' || ele.gettimereq != '' || ele.gettimeres != '' || ele.getproto != null) {
                                saveStr += "<GET>"
                                if (ele.getname != '') {
                                    saveStr += "<SHORT-NAME>" + ele.getname + "</SHORT-NAME>"
                                }
                                if (ele.getid != '') {
                                    saveStr += "<METHOD-ID>" + ele.getid + "</METHOD-ID>"
                                }
                                if (ele.getmaxreq != '') {
                                    saveStr += "<MAXIMUM-SEGMENT-LENGTH-REQUEST>" + ele.getmaxreq + "</MAXIMUM-SEGMENT-LENGTH-REQUEST>"
                                }
                                if (ele.getmaxres != '') {
                                    saveStr += "<MAXIMUM-SEGMENT-LENGTH-RESPONSE>" + ele.getmaxres + "</MAXIMUM-SEGMENT-LENGTH-RESPONSE>"
                                }
                                if (ele.gettimereq != '') {
                                    saveStr += "<SEPARATION-TIME-REQUEST>" + ele.gettimereq + "</SEPARATION-TIME-REQUEST>"
                                }
                                if (ele.gettimeres != '') {
                                    saveStr += "<SEPARATION-TIME-RESPONSE>" + ele.gettimeres + "</SEPARATION-TIME-RESPONSE>"
                                }
                                if (ele.getproto != null) {
                                    saveStr += '<TRANSPORT-PROTOCOL>' + ele.getproto + "</TRANSPORT-PROTOCOL>"
                                }
                                saveStr += "</GET>"
                            }
                            if (ele.setname != '' || ele.setid != '' || ele.setmaxreq != '' ||
                                ele.setmaxres != '' || ele.settimereq != '' || ele.settimeres != '' || ele.setproto != null) {
                                saveStr += "<SET>"
                                if (ele.setname != '') {
                                    saveStr += "<SHORT-NAME>" + ele.setname + "</SHORT-NAME>"
                                }
                                if (ele.setid != '') {
                                    saveStr += "<METHOD-ID>" + ele.setid + "</METHOD-ID>"
                                }
                                if (ele.setmaxreq != '') {
                                    saveStr += "<MAXIMUM-SEGMENT-LENGTH-REQUEST>" + ele.setmaxreq + "</MAXIMUM-SEGMENT-LENGTH-REQUEST>"
                                }
                                if (ele.setmaxres != '') {
                                    saveStr += "<MAXIMUM-SEGMENT-LENGTH-RESPONSE>" + ele.setmaxres + "</MAXIMUM-SEGMENT-LENGTH-RESPONSE>"
                                }
                                if (ele.settimereq != '') {
                                    saveStr += "<SEPARATION-TIME-REQUEST>" + ele.settimereq + "</SEPARATION-TIME-REQUEST>"
                                }
                                if (ele.settimeres != '') {
                                    saveStr += "<SEPARATION-TIME-RESPONSE>" + ele.settimeres + "</SEPARATION-TIME-RESPONSE>"
                                }
                                if (ele.setproto != null) {
                                    saveStr += '<TRANSPORT-PROTOCOL>' + ele.setproto + "</TRANSPORT-PROTOCOL>"
                                }
                                saveStr += "</SET>"
                            }
                            if (ele.notname != '' || ele.notid != '' || ele.notmax != '' ||
                                ele.nottime != '' || ele.notserial != null || ele.notproto != null) {
                                saveStr += "<NOTIFIER>"
                                if (ele.notname != '') {
                                    saveStr += "<SHORT-NAME>" + ele.notname + "</SHORT-NAME>"
                                }
                                if (ele.notid != '') {
                                    saveStr += "<EVENT-ID>" + ele.notid + "</EVENT-ID>"
                                }
                                if (ele.notmax != '') {
                                    saveStr += "<MAXIMUM-SEGMENT-LENGTH>" + ele.notmax + "</MAXIMUM-SEGMENT-LENGTH>"
                                }
                                if (ele.nottime != '') {
                                    saveStr += "<SEPARATION-TIME>" + ele.nottime + "</SEPARATION-TIME>"
                                }
                                if (ele.notserial != null) {
                                    saveStr += "<SERIALIZER>" + ele.notserial + "</SERIALIZER>"
                                }
                                if (ele.notproto != null) {
                                    saveStr += '<TRANSPORT-PROTOCOL>' + ele.notproto + "</TRANSPORT-PROTOCOL>"
                                }
                                saveStr += "</NOTIFIER>"
                            }
                            saveStr += "</SOMEIP-FIELD-DEPLOYMENT>"
                        })
                        saveStr += "</FIELD-DEPLOYMENTS>"
                    }
                    saveStr += "</SOMEIP-SERVICE-INTERFACE-DEPLOYMENT>"
                } else if (data.parent == constant.ServiceInterface_str) {
                    saveStr += '<SERVICE-INTERFACE UUID="' + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].majversion != '') {
                        saveStr += "<MAJOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].majversion + "</MAJOR-VERSION>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].minversion != '') {
                        saveStr += "<MINOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].minversion + "</MINOR-VERSION>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].namespace != '') {
                        namespace = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].namespace.split(',')
                        saveStr += "<NAMESPACES>"
                        namespace.forEach(ele => {
                            var symbol = ele.split('/')
                            saveStr += "<SYMBOL-PROPS>"
                            saveStr += "<SHORT-NAME>" + symbol[0] + "</SHORT-NAME>"
                            saveStr += "<SYMBOL>" + symbol[1] + "</SYMBOL>"
                            saveStr += "</SYMBOL-PROPS>"
                        })
                        saveStr += "</NAMESPACES>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].isservice != '') {
                        saveStr += "<IS-SERVICE>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].isservice + "</IS-SERVICE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].events != null) {
                        saveStr += "<EVENTS>"
                        state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].events.forEach(ele => {
                            saveStr += "<VARIABLE-DATA-PROTOTYPE>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.type != null) {
                                saveStr += '<TYPE-TREF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + ele.type + "</TYPE-TREF>"
                            }
                            saveStr += "</VARIABLE-DATA-PROTOTYPE>"
                        })
                        saveStr += "</EVENTS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].fields != null) {
                        saveStr += "<FIELDS>"
                        state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].fields.forEach(ele => {
                            saveStr += "<FIELD>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.type != null) {
                                saveStr += '<TYPE-TREF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + ele.type + "</TYPE-TREF>"
                            }
                            if (ele.getter != null) {
                                saveStr += "<HAS-GETTER>" + ele.getter + "</HAS-GETTER>"
                            }
                            if (ele.setter != null) {
                                saveStr += "<HAS-SETTER>" + ele.setter + "</HAS-SETTER>"
                            }
                            if (ele.notifier != null) {
                                saveStr += "<HAS-NOTIFIER>" + ele.notifier + "</HAS-NOTIFIER>"
                            }
                            saveStr += "</FIELD>"
                        })
                        saveStr += "</FIELDS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].methods != null) {
                        saveStr += "<METHODS>"
                        state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].methods.forEach(ele => {
                            saveStr += "<CLIENT-SERVER-OPERATION>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.fireforget != null) {
                                saveStr += "<FIRE-AND-FORGET>" + ele.fireforget + "</FIRE-AND-FORGET>"
                            }
                            if (ele.argument.length > 0) {
                                saveStr += "<ARGUMENTS>"
                                ele.argument.forEach(arg => {
                                    saveStr += "<ARGUMENT-DATA-PROTOTYPE>"
                                    if (arg.name != '') {
                                        saveStr += "<SHORT-NAME>" + arg.name + "</SHORT-NAME>"
                                    }
                                    if (arg.type != null) {
                                        saveStr += '<TYPE-TREF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + arg.type + "</TYPE-TREF>"
                                    }
                                    if (arg.dir != null) {
                                        saveStr += "<DIRECTION>" + arg.dir + "</DIRECTION>"
                                    }
                                    if (arg.descrip != '') {
                                        saveStr += '<DESC><L-2 L="EN">' + arg.descrip + "</L-2></DESC>"
                                    }
                                    saveStr += "</ARGUMENT-DATA-PROTOTYPE>"
                                })
                                saveStr += "</ARGUMENTS>"
                            }
                            if (ele.errorSet.length > 0) {
                                saveStr += "<POSSIBLE-AP-ERROR-SET-REFS>"
                                ele.errorSet.forEach(errset => {
                                    if (errset.error != null) {
                                        saveStr += '<POSSIBLE-AP-ERROR-SET-REF DEST="AP-APPLICATION-ERROR-SET">' + errset.error + "</POSSIBLE-AP-ERROR-SET-REF>"
                                    }
                                })
                                saveStr += "</POSSIBLE-AP-ERROR-SET-REFS>"
                            }
                            if (ele.error.length > 0) {
                                saveStr += "<POSSIBLE-AP-ERROR-REFS>"
                                ele.error.forEach(err => {
                                    if (err.error != null) {
                                        saveStr += '<POSSIBLE-AP-ERROR-REF DEST="AP-APPLICATION-ERROR">' + err.error + "</POSSIBLE-AP-ERROR-REF>"
                                    }
                                })
                                saveStr += "</POSSIBLE-AP-ERROR-REFS>"
                            }
                            if (ele.descrip != '') {
                                saveStr += '<DESC><L-2 L="EN">' + ele.descrip + "</L-2></DESC>"
                            }
                            saveStr += "</CLIENT-SERVER-OPERATION>"
                        })
                        saveStr += "</METHODS>"
                    }
                    saveStr += "</SERVICE-INTERFACE>"
                } else if (data.parent == constant.Client_str) {
                    saveStr += '<SOMEIP-SD-CLIENT-EVENT-GROUP-TIMING-CONFIG UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].retrydelay != '') {
                        saveStr += "<SUBSCRIBE-EVENTGROUP-RETRY-DELAY>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].retrydelay + "</SUBSCRIBE-EVENTGROUP-RETRY-DELAY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].retrymax != '') {
                        saveStr += "<SUBSCRIBE-EVENTGROUP-RETRY-MAX>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].retrymax + "</SUBSCRIBE-EVENTGROUP-RETRY-MAX>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].timetolive != '') {
                        saveStr += "<TIME-TO-LIVE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].timetolive + "</TIME-TO-LIVE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymax != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymin != '') {
                        saveStr += "<REQUEST-RESPONSE-DELAY>"
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymax != '') {
                            saveStr += "<MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymax + "</MAX-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymin != '') {
                            saveStr += "<MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymin + "</MIN-VALUE>"
                        }
                        saveStr += "</REQUEST-RESPONSE-DELAY>"
                    }
                    saveStr += "</SOMEIP-SD-CLIENT-EVENT-GROUP-TIMING-CONFIG>"
                } else if (data.parent == constant.Server_str) {
                    saveStr += '<SOMEIP-SD-SERVER-EVENT-GROUP-TIMING-CONFIG UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymax != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymin != '') {
                        saveStr += "<REQUEST-RESPONSE-DELAY>"
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymax != '') {
                            saveStr += "<MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymax + "</MAX-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymin != '') {
                            saveStr += "<MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymin + "</MIN-VALUE>"
                        }
                        saveStr += "</REQUEST-RESPONSE-DELAY>"
                    }
                    saveStr += "</SOMEIP-SD-SERVER-EVENT-GROUP-TIMING-CONFIG>"
                } else if (data.parent == constant.SomeIPClient_str) {
                    saveStr += '<SOMEIP-SD-CLIENT-SERVICE-INSTANCE-CONFIG UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].findtime != '') {
                        saveStr += "<SERVICE-FIND-TIME-TO-LIVE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].findtime + "</SERVICE-FIND-TIME-TO-LIVE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymax != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymin != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inibasedelay != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inirepetimax != '') {
                        saveStr += "<INITIAL-FIND-BEHAVIOR>"
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymax != '') {
                            saveStr += "<INITIAL-DELAY-MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymax + "</INITIAL-DELAY-MAX-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymin != '') {
                            saveStr += "<INITIAL-DELAY-MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymin + "</INITIAL-DELAY-MIN-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inibasedelay != '') {
                            saveStr += "<INITIAL-REPETITIONS-BASE-DELAY>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inibasedelay + "</INITIAL-REPETITIONS-BASE-DELAY>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inirepetimax != '') {
                            saveStr += "<INITIAL-REPETITIONS-MAX>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inirepetimax + "</INITIAL-REPETITIONS-MAX>"
                        }
                        saveStr += "</INITIAL-FIND-BEHAVIOR>"
                    }
                    saveStr += "</SOMEIP-SD-CLIENT-SERVICE-INSTANCE-CONFIG>"
                } else if (data.parent == constant.SomeIPServer_str) {
                    saveStr += '<SOMEIP-SD-SERVER-SERVICE-INSTANCE-CONFIG UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymax != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymin != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inibasedelay != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inirepetimax != '') {
                        saveStr += "<INITIAL-OFFER-BEHAVIOR>"
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymax != '') {
                            saveStr += "<INITIAL-DELAY-MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymax + "</INITIAL-DELAY-MAX-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymin != '') {
                            saveStr += "<INITIAL-DELAY-MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymin + "</INITIAL-DELAY-MIN-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inibasedelay != '') {
                            saveStr += "<INITIAL-REPETITIONS-BASE-DELAY>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inibasedelay + "</INITIAL-REPETITIONS-BASE-DELAY>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inirepetimax != '') {
                            saveStr += "<INITIAL-REPETITIONS-MAX>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inirepetimax + "</INITIAL-REPETITIONS-MAX>"
                        }
                        saveStr += "</INITIAL-OFFER-BEHAVIOR>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymax != '' ||
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymin != '') {
                        saveStr += "<REQUEST-RESPONSE-DELAY>"
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymax != '') {
                            saveStr += "<MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymax + "</MAX-VALUE>"
                        }
                        if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymin != '') {
                            saveStr += "<MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymin + "</MIN-VALUE>"
                        }
                        saveStr += "</REQUEST-RESPONSE-DELAY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].offer != '') {
                        saveStr += "<OFFER-CYCLIC-DELAY>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].offer + "</OFFER-CYCLIC-DELAY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].timetolive != '') {
                        saveStr += "<SERVICE-OFFER-TIME-TO-LIVE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].timetolive + "</SERVICE-OFFER-TIME-TO-LIVE>"
                    }
                    saveStr += "</SOMEIP-SD-SERVER-SERVICE-INSTANCE-CONFIG>"
                } else if (data.parent == constant.SomeIPToMachineMapping_str) {
                    saveStr += '<SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].ccref != null) {
                        saveStr += '<COMMUNICATION-CONNECTOR-REF DEST="ETHERNET-COMMUNICATION-CONNECTOR">' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].ccref + "</COMMUNICATION-CONNECTOR-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].siref != null) {
                        saveStr += "<SERVICE-INSTANCE-REFS>"
                        saveStr += '<SERVICE-INSTANCE-REF DEST="PROVIDED-SOMEIP-SERVICE-INSTANCE">' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].siref + "</SERVICE-INSTANCE-REF>"
                        saveStr += "</SERVICE-INSTANCE-REFS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].tcp != '') {
                        saveStr += "<TCP-PORT>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].tcp + "</TCP-PORT>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].udp != '') {
                        saveStr += "<UDP-PORT>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].udp + "</UDP-PORT>"
                    }
                    saveStr += "</SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING>"
                } else if (data.parent == constant.ToPortPrototypeMapping_str) {
                    saveStr += '<SERVICE-INSTANCE-TO-PORT-PROTOTYPE-MAPPING UUID="' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].porttype != null) {
                        saveStr += "<PORT-PROTOTYPE-IREF>"
                        if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectPort == "P-PORT-PROTOTYPE") {
                            saveStr += '<TARGET-PORT-PROTOTYPE-REF DEST="P-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].porttype + "</TARGET-PORT-PROTOTYPE-REF>"
                        } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectPort == "R-PORT-PROTOTYPE") {
                            saveStr += '<TARGET-PORT-PROTOTYPE-REF DEST="R-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].porttype + "</TARGET-PORT-PROTOTYPE-REF>"
                        } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectPort == "PR-PORT-PROTOTYPE") {
                            saveStr += '<TARGET-PORT-PROTOTYPE-REF DEST="PR-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].porttype + "</TARGET-PORT-PROTOTYPE-REF>"
                        }
                        saveStr += "</PORT-PROTOTYPE-IREF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].process != null) {
                        saveStr += '<PROCESS-REF DEST="PROCESS-DESIGN">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].process + "</PROCESS-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].serviceIns != null) {
                        if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                            saveStr += '<SERVICE-INSTANCE-REF DEST="PROVIDED-SOMEIP-SERVICE-INSTANCE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].serviceIns + "</SERVICE-INSTANCE-REF>"
                        } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                            saveStr += '<SERVICE-INSTANCE-REF DEST="REQUIRED-SOMEIP-SERVICE-INSTANCE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].serviceIns + "</SERVICE-INSTANCE-REF>"
                        }
                    }
                    saveStr += "</SERVICE-INSTANCE-TO-PORT-PROTOTYPE-MAPPING>"
                } else if (data.parent == constant.RequiredSomeIP_str) {
                    saveStr += '<REQUIRED-SOMEIP-SERVICE-INSTANCE UUID="' + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].deployref != null) {
                        saveStr += '<SERVICE-INTERFACE-DEPLOYMENT-REF DEST="SOMEIP-SERVICE-INTERFACE-DEPLOYMENT">' + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].deployref + "</SERVICE-INTERFACE-DEPLOYMENT-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].minorver != '') {
                        saveStr += "<REQUIRED-MINOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].minorver + "</REQUIRED-MINOR-VERSION>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].serviceInsid != '') {
                        saveStr += "<REQUIRED-SERVICE-INSTANCE-ID>" + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].serviceInsid + "</REQUIRED-SERVICE-INSTANCE-ID>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].someipclient != null) {
                        saveStr += '<SD-CLIENT-CONFIG-REF DEST="SOMEIP-SD-CLIENT-SERVICE-INSTANCE-CONFIG">' + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].someipclient + "</SD-CLIENT-CONFIG-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].version != null) {
                        saveStr += "<VERSION-DRIVEN-FIND-BEHAVIOR>" + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].version + "</VERSION-DRIVEN-FIND-BEHAVIOR>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].method != null) {
                        saveStr += "<METHOD-REQUEST-PROPSS>"
                        state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].method.forEach(ele => {
                            saveStr += "<SOMEIP-METHOD-PROPS>"
                            if (ele.method != null) {
                                saveStr += '<METHOD-REF DEST="SOMEIP-METHOD-DEPLOYMENT">' + ele.method + "</METHOD-REF>"
                            }
                            saveStr += "</SOMEIP-METHOD-PROPS>"
                        })
                        saveStr += "</METHOD-REQUEST-PROPSS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].requiredevent != null) {
                        saveStr += "<REQUIRED-EVENT-GROUPS>"
                        state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].requiredevent.forEach(ele => {
                            saveStr += "<SOMEIP-REQUIRED-EVENT-GROUP>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.eventG != null) {
                                saveStr += '<EVENT-GROUP-REF DEST="SOMEIP-EVENT-GROUP">' + ele.eventG + "</EVENT-GROUP-REF>"
                            }
                            if (ele.client != null) {
                                saveStr += '<SD-CLIENT-EVENT-GROUP-TIMING-CONFIG-REF DEST="SOMEIP-SD-CLIENT-EVENT-GROUP-TIMING-CONFIG">' + ele.client + "</SD-CLIENT-EVENT-GROUP-TIMING-CONFIG-REF>"
                            }
                            saveStr += "</SOMEIP-REQUIRED-EVENT-GROUP>"
                        })
                        saveStr += "</REQUIRED-EVENT-GROUPS>"
                    }
                    saveStr += "</REQUIRED-SOMEIP-SERVICE-INSTANCE>"
                } else if (data.parent == constant.ProvidedSomeIP_str) {
                    saveStr += '<PROVIDED-SOMEIP-SERVICE-INSTANCE UUID="' + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].deployref != null) {
                        saveStr += '<SERVICE-INTERFACE-DEPLOYMENT-REF DEST="SOMEIP-SERVICE-INTERFACE-DEPLOYMENT">' + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].deployref + "</SERVICE-INTERFACE-DEPLOYMENT-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].someipserver != null) {
                        saveStr += '<SD-SERVER-CONFIG-REF DEST="SOMEIP-SD-SERVER-SERVICE-INSTANCE-CONFIG">' + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].someipserver + "</SD-SERVER-CONFIG-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].instanceid != '') {
                        saveStr += "<SERVICE-INSTANCE-ID>" + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].instanceid + "</SERVICE-INSTANCE-ID>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].eventP != null) {
                        saveStr += "<EVENT-PROPSS>"
                        state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].eventP.forEach(ele => {
                            saveStr += "<SOMEIP-EVENT-PROPS>"
                            if (ele.event != null) {
                                saveStr += '<EVENT-REF DEST="SOMEIP-EVENT-DEPLOYMENT">' + ele.event + "</EVENT-REF>"
                            }
                            saveStr += "</SOMEIP-EVENT-PROPS>"
                        })
                        saveStr += "</EVENT-PROPSS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].method != null) {
                        saveStr += "<METHOD-RESPONSE-PROPSS>"
                        state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].method.forEach(ele => {
                            saveStr += "<SOMEIP-METHOD-PROPS>"
                            if (ele.method != null) {
                                saveStr += '<METHOD-REF DEST="SOMEIP-METHOD-DEPLOYMENT">' + ele.method + "</METHOD-REF>"
                            }
                            saveStr += "</SOMEIP-METHOD-PROPS>"
                        })
                        saveStr += "</METHOD-RESPONSE-PROPSS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].eventG != null) {
                        saveStr += "<PROVIDED-EVENT-GROUPS>"
                        state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].eventG.forEach(ele => {
                            saveStr += "<SOMEIP-PROVIDED-EVENT-GROUP>"
                            if (ele.name != '') {
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.eventG != null) {
                                saveStr += '<EVENT-GROUP-REF DEST="SOMEIP-EVENT-GROUP">' + ele.eventG + "</EVENT-GROUP-REF>"
                            }
                            if (ele.udp != '') {
                                saveStr += "<EVENT-MULTICAST-UDP-PORT>" + ele.udp + "</EVENT-MULTICAST-UDP-PORT>"
                            }
                            if (ele.ipv4 != '') {
                                saveStr += "<IPV-4-MULTICAST-IP-ADDRESS>" + ele.ipv4 + "</IPV-4-MULTICAST-IP-ADDRESS>"
                            }
                            if (ele.ipv6 != '') {
                                saveStr += "<IPV-6-MULTICAST-IP-ADDRESS>" + ele.ipv6 + "</IPV-6-MULTICAST-IP-ADDRESS>"
                            }
                            if (ele.threshold != '') {
                                saveStr += "<MULTICAST-THRESHOLD>" + ele.threshold + "</MULTICAST-THRESHOLD>"
                            }
                            if (ele.server != null) {
                                saveStr += '<SD-SERVER-EVENT-GROUP-TIMING-CONFIG-REF DEST="SOMEIP-SD-SERVER-EVENT-GROUP-TIMING-CONFIG">' + ele.server + "</SD-SERVER-EVENT-GROUP-TIMING-CONFIG-REF>"
                            }
                            saveStr += "</SOMEIP-PROVIDED-EVENT-GROUP>"
                        })
                        saveStr += "</PROVIDED-EVENT-GROUPS>"
                    }
                    saveStr += "</PROVIDED-SOMEIP-SERVICE-INSTANCE>"
                } else if (data.parent == constant.Error_str) {
                    saveStr += '<AP-APPLICATION-ERROR UUID="' + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].desc != '') {
                        saveStr += '<DESC><L-2 L="EN">' + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].desc + "</L-2></DESC>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].errorcode != '') {
                        saveStr += "<ERROR-CODE>" + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].errorcode + "</ERROR-CODE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].errorDref != null) {
                        saveStr += '<ERROR-DOMAIN-REF DEST="AP-APPLICATION-ERROR-DOMAIN">' + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].errorDref + "</ERROR-DOMAIN-REF>"
                    }
                    saveStr += "</AP-APPLICATION-ERROR>"
                } else if (data.parent == constant.Errorset_str) {
                    saveStr += '<AP-APPLICATION-ERROR-SET UUID="' + state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].errorref != null) {
                        saveStr += "<AP-APPLICATION-ERROR-REFS>"
                        state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].errorref.forEach(ele => {
                            if (ele.error != null) {
                                saveStr += '<AP-APPLICATION-ERROR-REF DEST="AP-APPLICATION-ERROR">' + ele.error + "</AP-APPLICATION-ERROR-REF>"
                            }
                        })
                        saveStr += "</AP-APPLICATION-ERROR-REFS>"
                    }
                    saveStr += "</AP-APPLICATION-ERROR-SET>"
                } else if (data.parent == constant.ErrorDomain_str) {
                    saveStr += '<AP-APPLICATION-ERROR-DOMAIN UUID="' + state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].uuid + '">'
                    if (state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].name != '') {
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].name + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].namespace != '') {
                        namespace = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].namespace.split(',')
                        saveStr += "<NAMESPACES>"
                        namespace.forEach(ele => {
                            var symbol = ele.split('/')
                            saveStr += "<SYMBOL-PROPS>"
                            saveStr += "<SHORT-NAME>" + symbol[0] + "</SHORT-NAME>"
                            saveStr += "<SYMBOL>" + symbol[1] + "</SYMBOL>"
                            saveStr += "</SYMBOL-PROPS>"
                        })
                        saveStr += "</NAMESPACES>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].value != '') {
                        saveStr += "<VALUE>" + state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].value + "</VALUE>"
                    }
                    saveStr += "</AP-APPLICATION-ERROR-DOMAIN>"
                }
                console.log(saveStr)
            })
            var repeat = savelist[savelist.length - 1].path.split('/').length
            saveStr += "</ELEMENTS>"
            console.log('endPath = ' + endPath + ' / ' + 'repeat = ' + repeat)
            while (repeat--) {
                saveStr += "</AR-PACKAGE></AR-PACKAGES>"
            }
            saveStr += "</AUTOSAR>"

            const parser = new DOMParser() //XML이 포함된 문자열을 구문 분석하여 입력 데이터를 기반으로 XMLDocument 또는 문서를 적절히 반환하여 DOM 트리를 생성합니다.
            xmlDoc = parser.parseFromString(saveStr, "text/xml")

            console.log(xmlDoc)
            return xmlDoc
        },
        getSamePathList: (state) => (editPath) => {
            return state.strSavePath.indexOf(editPath)
        },
    },
    mutations: {
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
                Platform: {}
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
                        children: []
                    }
                ]
            })
            state.connectionLine.push({ start: [], end: [] })
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
        },
        setuuid(state, payload) {
            state.activeUUID = payload.uuid
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
        deleteDetailViewerList(state) {
            state.detailViewerList = []
            state.detailViewer = { uuid: '', element: '' }
            console.log(state.detailViewerList)
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
        setcheckVaildation(state, payload) {
            state.checkVaildation = payload.value
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
            state.checkVaildation = true
        },
        setCheckValidate(state) {
            console.log('setCheckValidate')
            state.errorList = []
            for (var data in state.SAHLProject[state.openProjectIndex]) {
                if (data != 'uuid' && data != 'name') {
                    for (var datatype in state.SAHLProject[state.openProjectIndex][data]) {
                        state.SAHLProject[state.openProjectIndex][data][datatype].forEach((ele, elidx) => {
                            if (ele.name == '') {
                                state.errorList.push({ uuid: ele.uuid, name: ele.name, parent: data, path: ele.path, error: 'name' })
                            }
                            if (ele.path == '') {
                                state.errorList.push({ uuid: ele.uuid, name: ele.name, parent: data, path: ele.path, error: 'path' })
                            }

                            if (ele.name == '' || ele.path == '') {
                                this.commit('checkVaildationElement', { datatype: datatype, elidx: elidx })
                            }
                        })
                    }

                }
            }
            state.checkVaildation = true
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
                            path = item.childNodes[0].nodeValue + '/' + path
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
                            var scales = item.childNodes[0].childNodes
                            scales.forEach(scale => {
                                var editScaleItem = { const: '', symbol: '', lowerlimit: '', upperlimit: '', desc: '' }
                                scale.childNodes.forEach(data => {
                                    if (data.nodeName == "COMPU-CONST") {
                                        editScaleItem.const = data.childNodes[0].childNodes[0].nodeValue
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
                                        editScaleItem.desc = data.childNodes[0].childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editScaleItem)
                                scalesItem.push(addObj)
                            })
                        }
                    })
                    var uuid = ele.getAttribute("UUID")
                    if (uuid == null) {
                        uuid = uuid.v1()
                    }
                    this.commit('addElementCompuMehtod', {
                        input: true,
                        path: strPath,
                        uuid: uuid,
                        name: compuName,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        category: compuCate,
                        scales: scalesItem,
                        icon: "mdi-clipboard-outline",
                        validation: false
                    })
                    state.inputFileList.push({ uuid: uuid, path: strPath + '/' + compuName, parent: constant.CompuMethod_str })
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
                            var rules = item.childNodes[0].childNodes[0].childNodes
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
                    var uuid = ele.getAttribute("UUID")
                    if (uuid == null) {
                        uuid = uuid.v1()
                    }
                    this.commit('addElementDataConstr', {
                        input: true,
                        path: strPath,
                        uuid: uuid,
                        name: dataconName,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        lowerlimit: dataconLow,
                        upperlimit: dataconUpper,
                        icon: "mdi-clipboard-outline",
                        validation: false
                    })
                    state.inputFileList.push({ uuid: uuid, path: strPath + '/' + dataconName, parent: constant.DataConstr_str })
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
                    this.commit('addElementApplicationArray', {
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        name: appliName,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + appliName, parent: constant.ApplicationArray_str })
                    EventBus.$emit('add-element', constant.DateType_str)
                    EventBus.$emit('add-element', constant.ApplicationArray_str)
                })
                //STD-CPP-IMPLEMENTATION-DATA-TYPE
            var implement = payload.xmlDoc.getElementsByTagName('STD-CPP-IMPLEMENTATION-DATA-TYPE')
            implement.forEach(ele => {
                    var impName = '',
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

                    ele.childNodes.forEach(item => {
                        if (item.nodeName == "SHORT-NAME") {
                            impName = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "CATEGORY") {
                            impcategory = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "NAMESPACES") {
                            item.childNodes.forEach(symbol => {
                                symbol.childNodes.forEach(data => {
                                    impnamespace += data.childNodes[0].nodeValue
                                    impnamespace += '/'
                                })
                                impnamespace = impnamespace.substr(0, impnamespace.length - 1)
                                impnamespace += ','
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
                            imptemplatetype = item.childNodes[0].childNodes[0].childNodes[0].nodeValue
                        }
                        if (item.nodeName == "DESC") {
                            impdesc = item.childNodes[0].childNodes[0].nodeValue
                        }
                        if (item.nodeName == "SW-DATA-DEF-PROPS") {
                            var swdata = item.childNodes[0].childNodes
                            swdata.forEach(condi => {
                                var editDDPCItem = { compumethod: null, dataconstr: null }
                                condi.childNodes.forEach(data => {
                                    if (data.nodeName == "COMPU-METHOD-REF") {
                                        editDDPCItem.compumethod = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "DATA-CONSTR-REF") {
                                        editDDPCItem.dataconstr = data.childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editDDPCItem)
                                DDPCItem.push(addObj)
                            })
                        }
                        if (item.nodeName == "SUB-ELEMENTS") {
                            item.childNodes.forEach(cppImp => {
                                var editIDTElementItem = { name: '', typeref: null, inplace: false, desc: '' }
                                cppImp.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editIDTElementItem.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "DESC") {
                                        editIDTElementItem.desc = data.childNodes[0].childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "TYPE-REFERENCE") {
                                        data.childNodes.forEach(typeR => {
                                            if (typeR.nodeName == "INPLACE") {
                                                editIDTElementItem.inplace = typeR.childNodes[0].nodeValue
                                            }
                                            if (typeR.nodeName == "TYPE-REFERENCE-REF") {
                                                editIDTElementItem.typeref = typeR.childNodes[0].nodeValue
                                            }
                                        })
                                    }
                                })
                                const addObj = Object.assign({}, editIDTElementItem)
                                IDTElementItem.push(addObj)
                            })
                        }
                    })
                    this.commit('addElementImplementation', {
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        name: impName,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + impName, parent: constant.Implementation_str })
                    EventBus.$emit('add-element', constant.DateType_str)
                    EventBus.$emit('add-element', constant.Implementation_str)
                })
                // MACHINE
            var machine = payload.xmlDoc.getElementsByTagName('MACHINE')
            machine.forEach(ele => {
                    var name = '',
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
                            timeout = item.childNodes[0].childNodes[0].nodeValue
                        }
                        if (item.nodeName == "TRUSTED-PLATFORM-EXECUTABLE-LAUNCH-BEHAVIOR") {
                            exelaunch = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "ADMIN-DATA") {
                            admin = item.childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue
                        }
                        if (item.nodeName == "HW-ELEMENT-REFS") {
                            item.childNodes.forEach(data => {
                                var editHWItem = { hwelement: null }
                                if (data.nodeName == "HW-ELEMENT-REF") {
                                    editHWItem.hwelement = data.childNodes[0].nodeValue
                                    const addObj = Object.assign({}, editHWItem)
                                    hwele.push(addObj)
                                }
                            })
                        }
                        if (item.nodeName == "FUNCTION-GROUPS") {
                            item.childNodes.forEach(mode => {
                                var editFunctionItem = { name: '', type: null, }
                                mode.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editFunctionItem.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "TYPE-TREF") {
                                        editFunctionItem.type = data.childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editFunctionItem)
                                functionG.push(addObj)
                            })
                        }
                        if (item.nodeName == "PROCESSORS") {
                            item.childNodes.forEach(pros => {
                                var editPro = { name: '', core: [] }
                                pros.childNodes.forEach(pro => {
                                    if (pro.nodeName == "SHORT-NAME") {
                                        editPro.name = pro.childNodes[0].nodeValue
                                    }
                                    if (pro.nodeName == "CORES") {
                                        pro.childNodes.forEach(procor => {
                                            var editCoreItem = { name: '', id: '' }
                                            procor.childNodes.forEach(data => {
                                                if (data.nodeName == "SHORT-NAME") {
                                                    editCoreItem.name = data.childNodes[0].nodeValue
                                                }
                                                if (data.nodeName == "CORE-ID") {
                                                    editCoreItem.id = data.childNodes[0].nodeValue
                                                }
                                            })
                                            const addObjRes = Object.assign({}, editCoreItem)
                                            editPro.core.push(addObjRes)
                                        })
                                    }
                                })
                                const addObj = Object.assign({}, editPro)
                                processor.push(addObj)
                            })
                        }
                        if (item.nodeName == "MODULE-INSTANTIATIONS") {
                            item.childNodes.forEach(os => {
                                var editModule = { name: '', resource: [] }
                                os.childNodes.forEach(osmodul => {
                                    if (osmodul.nodeName == "SHORT-NAME") {
                                        editModule.name = osmodul.childNodes[0].nodeValue
                                    }
                                    if (osmodul.nodeName == "RESOURCE-GROUPS") {
                                        osmodul.childNodes.forEach(group => {
                                            var editModuleInsItem = { name: '', cpuUsage: '', memoryUsage: '' }
                                            group.childNodes.forEach(data => {
                                                if (data.nodeName == "SHORT-NAME") {
                                                    editModuleInsItem.name = data.childNodes[0].nodeValue
                                                }
                                                if (data.nodeName == "CPU-USAGE") {
                                                    editModuleInsItem.cpuUsage = data.childNodes[0].nodeValue
                                                }
                                                if (data.nodeName == "MEM-USAGE") {
                                                    editModuleInsItem.memoryUsage = data.childNodes[0].nodeValue
                                                }
                                            })
                                            const addObjRes = Object.assign({}, editModuleInsItem)
                                            editModule.resource.push(addObjRes)
                                        })
                                    }
                                })
                                const addObj = Object.assign({}, editModule)
                                module.push(addObj)
                            })
                        }
                    })
                    this.commit('addElementMachine', {
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        name: name,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + name, parent: constant.Machine_str })
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
                            item.childNodes.forEach(ethernet => {
                                var editedItemCC = { name: '', mtu: '', mtuenable: null, timeout: '', endpoint: null, mask: '' }
                                ethernet.childNodes.forEach(data => {
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
                                })
                                const addObj = Object.assign({}, editedItemCC)
                                communi.push(addObj)
                            })
                        }
                        if (item.nodeName == "SERVICE-DISCOVER-CONFIGS") {
                            item.childNodes.forEach(someIP => {
                                var editedItemSDC = { msia: null, ssdp: '' }
                                someIP.childNodes.forEach(data => {
                                    if (data.nodeName == "MULTICAST-SD-IP-ADDRESS-REF") {
                                        editedItemSDC.msia = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "SOMEIP-SERVICE-DISCOVERY-PORT") {
                                        editedItemSDC.ssdp = data.childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editedItemSDC)
                                service.push(addObj)
                            })
                        }
                    })
                    this.commit('addElementMachineDesign', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        access: access,
                        resettimer: pntimer,
                        connector: communi,
                        servicediscover: service,
                        icon: "mdi-clipboard-outline",
                        validation: false
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.MachineDesigne_str })
                    EventBus.$emit('add-element', constant.Machines_str)
                    EventBus.$emit('add-element', constant.MachineDesigne_str)
                })
                // ETHERNET-CLUSTER
            var ethernetCluster = payload.xmlDoc.getElementsByTagName('ETHERNET-CLUSTER')
            ethernetCluster.forEach(ele => {
                    var Name = '',
                        path = '',
                        strPath = getEditPath(ele.parentNode.parentNode, path),
                        condition = []
                    ele.childNodes.forEach(item => {
                        if (item.nodeName == "SHORT-NAME") {
                            Name = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "ETHERNET-CLUSTER-VARIANTS") {
                            item.childNodes.forEach(ethernet => {
                                var editedEthernet = { name: '', version: '', channel: [] }
                                ethernet.childNodes.forEach(protocol => {
                                    if (protocol.nodeName == "PROTOCOL-NAME") {
                                        editedEthernet.name = protocol.childNodes[0].nodeValue
                                    }
                                    if (protocol.nodeName == "PROTOCOL-VERSION") {
                                        editedEthernet.version = protocol.childNodes[0].nodeValue
                                    }
                                    if (protocol.nodeName == "PHYSICAL-CHANNELS") {
                                        protocol.childNodes.forEach(channels => {
                                            var editChannel = { name: '', comconnect: [], endpoint: [] }
                                            channels.childNodes.forEach(channel => {
                                                if (channel.nodeName == "SHORT-NAME") {
                                                    editChannel.name = channel.childNodes[0].nodeValue
                                                }
                                                if (channel.nodeName == "COMM-CONNECTORS") {
                                                    channel.childNodes.forEach(comm => {
                                                        var editCCItem = { connector: null }
                                                        comm.childNodes.forEach(data => {
                                                            if (data.nodeName == "COMMUNICATION-CONNECTOR-REF") {
                                                                editCCItem.connector = data.childNodes[0].nodeValue
                                                            }
                                                        })
                                                        const addObj = Object.assign({}, editCCItem)
                                                        editChannel.comconnect.push(addObj)
                                                    })
                                                }
                                                if (channel.nodeName == "NETWORK-ENDPOINTS") {
                                                    channel.childNodes.forEach(network => {
                                                        var editNetwork = { name: '', domainname: '', ip4address: [], ip6address: [], priority: '' }
                                                        network.childNodes.forEach(endpoint => {
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
                                                                endpoint.childNodes.forEach(config => {
                                                                    var editIP4Item = { gateway: '', behavior: null, address: '', addresssorce: null, mask: '', }
                                                                    var editIP6Item = { priority: '', behavior: null, prelength: '', address: '', addresssource: null, }
                                                                    if (config.nodeName == "IPV-4-CONFIGURATION") {
                                                                        config.childNodes.forEach(data => {
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
                                                                        })
                                                                        const addObj = Object.assign({}, editIP4Item)
                                                                        editNetwork.ip4address.push(addObj)
                                                                    }
                                                                    if (config.nodeName == "IPV-6-CONFIGURATION") {
                                                                        config.childNodes.forEach(data => {
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
                                                                        })
                                                                        const addObj = Object.assign({}, editIP6Item)
                                                                        editNetwork.ip6address.push(addObj)
                                                                    }
                                                                })
                                                            }
                                                        })
                                                        const addObj = Object.assign({}, editNetwork)
                                                        editChannel.endpoint.push(addObj)
                                                    })
                                                }
                                            })
                                            const addObjRes = Object.assign({}, editChannel)
                                            editedEthernet.channel.push(addObjRes)
                                        })
                                    }
                                })
                                const addObj = Object.assign({}, editedEthernet)
                                condition.push(addObj)
                            })
                        }
                    })
                    this.commit('addElementEthernetCluster', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        conditional: condition,
                        icon: "mdi-clipboard-outline",
                        validation: false
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.EthernetCluster_str })
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
                            initmode = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "MODE-DECLARATIONS") {
                            item.childNodes.forEach(modede => {
                                modede.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        mode.push(data.childNodes[0].nodeValue)
                                    }
                                })
                            })
                        }
                    })
                    this.commit('addElementModeDeclarationGroup', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        modedeclaration: mode,
                        initmode: initmode,
                        icon: "mdi-clipboard-outline",
                        validation: false
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.ModeDeclarationGroup_str })
                    EventBus.$emit('add-element', constant.Machines_str)
                    EventBus.$emit('add-element', constant.ModeDeclarationGroup_str)
                })
                // HW-ELEMENT
            var HWElement = payload.xmlDoc.getElementsByTagName('HW-ELEMENT')
            HWElement.forEach(ele => {
                var Name = '',
                    path = '',
                    strPath = getEditPath(ele.parentNode.parentNode, path),
                    category = null,
                    attri = []
                ele.childNodes.forEach(item => {
                    if (item.nodeName == "SHORT-NAME") {
                        Name = item.childNodes[0].nodeValue
                    }
                    if (item.nodeName == "HW-CATEGORY-REFS") {
                        category = item.childNodes[0].childNodes[0].nodeValue
                    }
                    if (item.nodeName == "HW-ATTRIBUTE-VALUES") {
                        item.childNodes.forEach(value => {
                            var editAttributeItem = { attr: null, vt: '', v: '' }
                            value.childNodes.forEach(data => {
                                if (data.nodeName == "HW-ATTRIBUTE-DEF-REF") {
                                    editAttributeItem.attr = data.childNodes[0].nodeValue
                                }
                                if (data.nodeName == "VT") {
                                    editAttributeItem.vt = data.childNodes[0].nodeValue
                                }
                                if (data.nodeName == "V") {
                                    editAttributeItem.v = data.childNodes[0].nodeValue
                                }
                            })
                            const addObj = Object.assign({}, editAttributeItem)
                            attri.push(addObj)
                        })
                    }
                })
                this.commit('addElementHWElement', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: ele.getAttribute("UUID"),
                    top: Math.floor(Math.random() * (200 - 6)) + 5,
                    left: Math.floor(Math.random() * (1400 - 11)) + 10,
                    zindex: 2,
                    category: category,
                    attribute: attri,
                    icon: "mdi-clipboard-outline",
                    validation: false
                })
                state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.HWElement_str })
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
                            item.childNodes.forEach(mapping => {
                                mapping.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        ptmmname = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "MACHINE-REF") {
                                        machine = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "PROCESS-REF") {
                                        process = data.childNodes[0].nodeValue
                                    }
                                })
                            })
                        }
                    })

                    this.commit('addElementProtoMachineMapping', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        ptmmname: ptmmname,
                        ptmmMachine: machine,
                        ptmmProcess: process,
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.ProcesstoMachineMapping_str })
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
                            item.childNodes.forEach(port => {
                                if (port.nodeName == "P-PORT-PROTOTYPE") {
                                    var editPPortItem = { name: '', interface: null }
                                    port.childNodes.forEach(data => {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editPPortItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "PROVIDED-INTERFACE-TREF") {
                                            editPPortItem.interface = data.childNodes[0].nodeValue
                                        }
                                    })
                                    const addObj = Object.assign({}, editPPortItem)
                                    pPort.push(addObj)
                                }
                                if (port.nodeName == "PR-PORT-PROTOTYPE") {
                                    var editPRPortItem = { name: '', interface: null }
                                    port.childNodes.forEach(data => {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editPRPortItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "PROVIDED-REQUIRED-INTERFACE-TREF") {
                                            editPRPortItem.interface = data.childNodes[0].nodeValue
                                        }
                                    })
                                    const addObj = Object.assign({}, editPRPortItem)
                                    prPort.push(addObj)
                                }
                                if (port.nodeName == "R-PORT-PROTOTYPE") {
                                    var editRPortItem = { name: '', interface: null }
                                    port.childNodes.forEach(data => {
                                        if (data.nodeName == "SHORT-NAME") {
                                            editRPortItem.name = data.childNodes[0].nodeValue
                                        }
                                        if (data.nodeName == "REQUIRED-INTERFACE-TREF") {
                                            editRPortItem.interface = data.childNodes[0].nodeValue
                                        }
                                    })
                                    const addObj = Object.assign({}, editRPortItem)
                                    rPort.push(addObj)
                                }
                            })
                        }
                    })
                    var uuid = ele.getAttribute("UUID")
                    if (uuid == null) {
                        uuid = uuid.v1()
                    }
                    this.commit('addElementSWComponents', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: uuid,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        pport: pPort,
                        rport: rPort,
                        prport: prPort,
                    })
                    state.inputFileList.push({ uuid: uuid, path: strPath + '/' + Name, parent: constant.SWComponents_str })
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
                            item.childNodes.forEach(state => {
                                var editItem = { functionItem: [], resourceRef: null, startupConfigRef: null }
                                state.childNodes.forEach(con => {
                                    if (con.nodeName == "RESOURCE-GROUP-REF") {
                                        editItem.resourceRef = con.childNodes[0].nodeValue
                                    }
                                    if (con.nodeName == "STARTUP-CONFIG-REF") {
                                        editItem.startupConfigRef = con.childNodes[0].nodeValue
                                    }
                                    if (con.nodeName == "FUNCTION-GROUP-STATE-IREFS") {
                                        con.childNodes.forEach(iref => {
                                            var editFunctionGItem = { contextMode: null, targetMode: null }
                                            iref.childNodes.forEach(data => {
                                                if (data.nodeName == "CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF") {
                                                    editFunctionGItem.contextMode = data.childNodes[0].nodeValue
                                                }
                                                if (data.nodeName == "TARGET-MODE-DECLARATION-REF") {
                                                    editFunctionGItem.targetMode = data.childNodes[0].nodeValue
                                                }
                                            })
                                            const addObj = Object.assign({}, editFunctionGItem)
                                            editItem.functionItem.push(addObj)
                                        })
                                    }
                                })
                                const addObj = Object.assign({}, editItem)
                                config.push(addObj)
                            })
                        }
                    })
                    var uuid = ele.getAttribute("UUID")
                    if (uuid == null) {
                        uuid = uuid.v1()
                    }
                    this.commit('addElementProcess', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: uuid,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: uuid, path: strPath + '/' + Name, parent: constant.Process_str })
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
                            item.childNodes.forEach(need => {
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
                                need.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editItem.swname = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "HARDWARE-PLATFORM") {
                                        editItem.hardwareP = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "INIT-RESOURCE") {
                                        data.childNodes.forEach(init => {
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
                                        })
                                    }
                                    if (data.nodeName == "RUN-RESOURCE") {
                                        data.childNodes.forEach(run => {
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
                                        })
                                    }
                                })
                                const addObj = Object.assign({}, editItem)
                                determininistic.push(addObj)
                            })
                        }
                    })

                    this.commit('addElementProcessDesign', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        executableref: exe,
                        determin: determininistic
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.ProcessDesign_str })
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
                            item.childNodes.forEach(data => {
                                if (data.nodeName == "SHORT-NAME") {
                                    swname = data.childNodes[0].nodeValue
                                }
                                if (data.nodeName == "APPLICATION-TYPE-TREF") {
                                    appli = data.childNodes[0].nodeValue
                                }
                            })
                        }
                    })
                    var uuid = ele.getAttribute("UUID")
                    if (uuid == null) {
                        uuid = uuid.v1()
                    }
                    this.commit('addElementExecutable', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: uuid,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: uuid, path: strPath + '/' + Name, parent: constant.Executable_str })
                    EventBus.$emit('add-element', constant.AdaptiveApplication_str)
                    EventBus.$emit('add-element', constant.Executable_str)
                })
                // STARTUP-CONFIG-SET
            var startup = payload.xmlDoc.getElementsByTagName('STARTUP-CONFIG-SET')
            startup.forEach(ele => {
                    var Name = '',
                        configName = '',
                        policy = null,
                        priority = '',
                        enter = '',
                        exit = '',
                        path = '',
                        strPath = getEditPath(ele.parentNode.parentNode, path)
                    ele.childNodes.forEach(item => {
                        if (item.nodeName == "SHORT-NAME") {
                            Name = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "STARTUP-CONFIGS") {
                            item.childNodes.forEach(configs => {
                                configs.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        configName = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "SCHEDULING-POLICY") {
                                        policy = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "SCHEDULING-PRIORITY") {
                                        priority = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "TIMEOUT") {
                                        data.childNodes.forEach(time => {
                                            if (time.nodeName == "ENTER-TIMEOUT-VALUE") {
                                                enter = time.childNodes[0].nodeValue
                                            }
                                            if (time.nodeName == "EXIT-TIMEOUT-VALUE") {
                                                exit = time.childNodes[0].nodeValue
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    })
                    var uuid = ele.getAttribute("UUID")
                    if (uuid == null) {
                        uuid = uuid.v1()
                    }
                    this.commit('addElementStartupConfig', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: uuid,
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        configname: configName,
                        policy: policy,
                        priority: priority,
                        entertimeout: enter,
                        exittimeout: exit
                    })
                    state.inputFileList.push({ uuid: uuid, path: strPath + '/' + Name, parent: constant.StartupConfig_str })
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

                    this.commit('addElementDeterministicClien', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        cycletiem: cycle,
                        numofworkers: number,
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.DeterministicClient_str })
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
                            item.childNodes.forEach(eve => {
                                var editEventD = { name: '', event: null, id: '', maxlength: '', time: '', serializer: null, protocal: null }
                                eve.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editEventD.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "EVENT-REF") {
                                        editEventD.event = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "EVENT-ID") {
                                        editEventD.id = data.childNodes[0].nodeValue
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
                                })
                                const addObj = Object.assign({}, editEventD)
                                eventD.push(addObj)
                            })
                        }
                        if (item.nodeName == "SERVICE-INTERFACE-REF") {
                            service = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "EVENT-GROUPS") {
                            item.childNodes.forEach(eve => {
                                var editItem = { name: '', id: '', event: [] }
                                eve.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editItem.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "EVENT-GROUP-ID") {
                                        editItem.id = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "EVENT-REFS") {
                                        var editEvent = { event: null }
                                        data.childNodes.forEach(eventref => {
                                            if (eventref.nodeName == "EVENT-REF") {
                                                editEvent.event = eventref.childNodes[0].nodeValue
                                            }
                                        })
                                        const addObjObj = Object.assign({}, editEvent)
                                        editItem.event.push(addObjObj)
                                    }
                                })
                                const addObj = Object.assign({}, editItem)
                                eventG.push(addObj)
                            })
                        }
                        if (item.nodeName == "SERVICE-INTERFACE-ID") {
                            id = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "SERVICE-INTERFACE-VERSION") {
                            item.childNodes.forEach(data => {
                                if (data.nodeName == "MAJOR-VERSION") {
                                    majversion = data.childNodes[0].nodeValue
                                }
                                if (data.nodeName == "MINOR-VERSION") {
                                    minversion = data.childNodes[0].nodeValue
                                }
                            })
                        }
                        if (item.nodeName == "FIELD-DEPLOYMENTS") {
                            item.childNodes.forEach(fie => {
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
                                    notproto: null
                                }
                                fie.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editItem.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "FIELD-REF") {
                                        editItem.field = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "GET") {
                                        data.childNodes.forEach(getfield => {
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
                                        })
                                    }
                                    if (data.nodeName == "SET") {
                                        data.childNodes.forEach(setfield => {
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
                                        })
                                    }
                                    if (data.nodeName == "NOTIFIER") {
                                        data.childNodes.forEach(noti => {
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
                                        })
                                    }
                                })
                                const addObj = Object.assign({}, editItem)
                                fieldD.push(addObj)
                            })

                        }
                        if (item.nodeName == "METHOD-DEPLOYMENTS") {
                            item.childNodes.forEach(met => {
                                var editMethodD = { name: '', method: null, id: '', maxrequest: '', maxresponse: '', timerequest: '', timeresponse: '', protocal: null }
                                met.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editMethodD.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "METHOD-REF") {
                                        editMethodD.method = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "METHOD-ID") {
                                        editMethodD.id = data.childNodes[0].nodeValue
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
                                })
                                const addObj = Object.assign({}, editMethodD)
                                methodD.push(addObj)
                            })
                        }
                    })

                    this.commit('addElementSomeIPService', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.SomeIPServiceInterfaceDeployment_str })
                    EventBus.$emit('add-element', constant.Service_str)
                    EventBus.$emit('add-element', constant.ServiceInterfaces_str)
                    EventBus.$emit('add-element', constant.SomeIPServiceInterfaceDeployment_str)
                })
                // SERVICE-INTERFACE
            var serviceInterface = payload.xmlDoc.getElementsByTagName('SERVICE-INTERFACE')
            serviceInterface.forEach(ele => {
                    var Name = '',
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
                            item.childNodes.forEach(symbol => {
                                symbol.childNodes.forEach(data => {
                                    namespace += data.childNodes[0].nodeValue
                                    namespace += '/'
                                })
                                namespace = namespace.substr(0, namespace.length - 1)
                                namespace += ','
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
                            item.childNodes.forEach(eve => {
                                var editEvent = { name: '', type: null }
                                eve.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editEvent.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "TYPE-TREF") {
                                        editEvent.type = data.childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editEvent)
                                events.push(addObj)
                            })
                        }
                        if (item.nodeName == "FIELDS") {
                            item.childNodes.forEach(fie => {
                                var editField = { name: '', type: null, getter: null, setter: null, notifier: null }
                                fie.childNodes.forEach(data => {
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
                                })
                                const addObj = Object.assign({}, editField)
                                fields.push(addObj)
                            })
                        }
                        if (item.nodeName == "METHODS") {
                            item.childNodes.forEach(met => {
                                var editedItem = { name: '', fireforget: null, argument: [], errorSet: [], error: [], descrip: '' }
                                met.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editedItem.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "ARGUMENTS") {
                                        data.childNodes.forEach(arg => {
                                            var editArgItem = { name: '', type: null, dir: null, descrip: '' }
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
                                                    editArgItem.descrip = proto.childNodes[0].childNodes[0].nodeValue
                                                }
                                            })
                                            const addObj = Object.assign({}, editArgItem)
                                            editedItem.argument.push(addObj)
                                        })
                                    }
                                    if (data.nodeName == "FIRE-AND-FORGET") {
                                        editedItem.fireforget = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "POSSIBLE-AP-ERROR-SET-REFS") {
                                        var editErrorSetItem = { error: null }
                                        data.childNodes.forEach(err => {
                                            if (err.nodeName == "POSSIBLE-AP-ERROR-SET-REF") {
                                                editErrorSetItem.error = err.childNodes[0].nodeValue
                                            }
                                        })
                                        const addObj = Object.assign({}, editErrorSetItem)
                                        editedItem.errorSet.push(addObj)
                                    }
                                    if (data.nodeName == "POSSIBLE-AP-ERROR-REFS") {
                                        var editErrorItem = { error: null }
                                        data.childNodes.forEach(err => {
                                            if (err.nodeName == "POSSIBLE-AP-ERROR-REF") {
                                                editErrorItem.error = err.childNodes[0].nodeValue
                                            }
                                        })
                                        const addObj = Object.assign({}, editErrorItem)
                                        editedItem.error.push(addObj)
                                    }
                                    if (data.nodeName == "DESC") {
                                        editedItem.descrip = data.childNodes[0].childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editedItem)
                                methods.push(addObj)
                            })
                        }
                    })
                    this.commit('addElementService', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.ServiceInterface_str })
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
                    this.commit('addElementClient', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        delay: retryD,
                        max: retryM,
                        timetolive: time,
                        delaymax: max,
                        delaymin: min,
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.Client_str })
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

                    this.commit('addElementServer', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        delaymax: max,
                        delaymin: min,
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.Server_str })
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
                    this.commit('addElementSomeIPClient', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        findtime: time,
                        inidelaymax: delayMax,
                        inidelaymin: delayMin,
                        inibasedelay: delay,
                        inirepetimax: max,
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.SomeIPClient_str })
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

                    this.commit('addElementSomeIPServer', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.SomeIPServer_str })
                    EventBus.$emit('add-element', constant.Service_str)
                    EventBus.$emit('add-element', constant.ServiceInstances_str)
                    EventBus.$emit('add-element', constant.SomeIPServer_str)
                })
                // SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING
            var someIPtoMachine = payload.xmlDoc.getElementsByTagName('SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING')
            someIPtoMachine.forEach(ele => {
                    var Name = '',
                        connect = null,
                        service = null,
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
                            service = item.childNodes[0].childNodes[0].nodeValue
                        }
                        if (item.nodeName == "UDP-PORT") {
                            udp = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "TCP-PORT") {
                            tcp = item.childNodes[0].nodeValue
                        }
                    })

                    this.commit('addElementSomeIPtoMachine', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        ccref: connect,
                        udp: udp,
                        tcp: tcp,
                        siref: service,
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.SomeIPToMachineMapping_str })
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
                            selectPort = item.childNodes[0].getAttribute("DEST")
                            porttype = item.childNodes[0].childNodes[0].nodeValue
                        }
                        if (item.nodeName == "PROCESS-REF") {
                            process = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "SERVICE-INSTANCE-REF") {
                            selectServiceIns = item.getAttribute("DEST")
                            serviceIns = item.childNodes[0].nodeValue
                        }
                    })

                    this.commit('addElementToPortPrototype', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        selectPort: selectPort,
                        porttype: porttype,
                        process: process,
                        selectServiceIns: selectServiceIns,
                        serviceIns: serviceIns,
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.ToPortPrototypeMapping_str })
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
                            item.childNodes.forEach(prop => {
                                var editMethodItem = { method: null }
                                prop.childNodes.forEach(data => {
                                    if (data.nodeName == "METHOD-REF") {
                                        editMethodItem.method = data.childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editMethodItem)
                                methodP.push(addObj)
                            })
                        }
                        if (item.nodeName == "REQUIRED-EVENT-GROUPS") {
                            item.childNodes.forEach(group => {
                                var editItem = { name: '', eventG: null, client: null }
                                group.childNodes.forEach(data => {
                                    if (data.nodeName == "SHORT-NAME") {
                                        editItem.name = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "EVENT-GROUP-REF") {
                                        editItem.eventG = data.childNodes[0].nodeValue
                                    }
                                    if (data.nodeName == "SD-CLIENT-EVENT-GROUP-TIMING-CONFIG-REF") {
                                        editItem.client = data.childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editItem)
                                requiredevent.push(addObj)
                            })
                        }
                    })

                    this.commit('addElementRequiredSomeIP', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.RequiredSomeIP_str })
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
                            item.childNodes.forEach(prop => {
                                var editItem = { event: null }
                                prop.childNodes.forEach(data => {
                                    if (data.nodeName == "EVENT-REF") {
                                        editItem.event = data.childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editItem)
                                eventP.push(addObj)
                            })
                        }
                        if (item.nodeName == "METHOD-RESPONSE-PROPSS") {
                            item.childNodes.forEach(prop => {
                                var editMethodItem = { method: null }
                                prop.childNodes.forEach(data => {
                                    if (data.nodeName == "METHOD-REF") {
                                        editMethodItem.method = data.childNodes[0].nodeValue
                                    }
                                })
                                const addObj = Object.assign({}, editMethodItem)
                                method.push(addObj)
                            })
                        }
                        if (item.nodeName == "PROVIDED-EVENT-GROUPS") {
                            item.childNodes.forEach(group => {
                                var editItem = { name: '', eventG: null, udp: '', ipv4: '', ipv6: '', threshold: '', server: null }
                                group.childNodes.forEach(data => {
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
                                })
                                const addObj = Object.assign({}, editItem)
                                eventG.push(addObj)
                            })
                        }
                    })

                    this.commit('addElementProvidedSomeIP', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
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
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.ProvidedSomeIP_str })
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
                            desc = item.childNodes[0].childNodes[0].nodeValue
                        }
                        if (item.nodeName == "ERROR-CODE") {
                            code = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "ERROR-DOMAIN-REF") {
                            domain = item.childNodes[0].nodeValue
                        }
                    })

                    this.commit('addElementError', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        desc: desc,
                        errorcode: code,
                        errorDref: domain
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.Error_str })
                    EventBus.$emit('add-element', constant.Service_str)
                    EventBus.$emit('add-element', constant.Errors_str)
                    EventBus.$emit('add-element', constant.Error_str)
                })
                // AP-APPLICATION-ERROR-SET
            var errorSet = payload.xmlDoc.getElementsByTagName('AP-APPLICATION-ERROR-SET')
            errorSet.forEach(ele => {
                    var Name = '',
                        errorref = [],
                        path = '',
                        strPath = getEditPath(ele.parentNode.parentNode, path)
                    ele.childNodes.forEach(item => {
                        if (item.nodeName == "SHORT-NAME") {
                            Name = item.childNodes[0].nodeValue
                        }
                        if (item.nodeName == "AP-APPLICATION-ERROR-REFS") {
                            item.childNodes.forEach(data => {
                                var editItem = { error: null }
                                if (data.nodeName == "AP-APPLICATION-ERROR-REF") {
                                    editItem.error = data.childNodes[0].nodeValue
                                }
                                const addObj = Object.assign({}, editItem)
                                errorref.push(addObj)
                            })
                        }
                    })

                    this.commit('addElementErrorSet', {
                        name: Name,
                        input: true,
                        path: strPath,
                        uuid: ele.getAttribute("UUID"),
                        top: Math.floor(Math.random() * (200 - 6)) + 5,
                        left: Math.floor(Math.random() * (1400 - 11)) + 10,
                        zindex: 2,
                        icon: "mdi-clipboard-outline",
                        validation: false,
                        errorref: errorref
                    })
                    state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.Errorset_str })
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
                        item.childNodes.forEach(symbol => {
                            symbol.childNodes.forEach(data => {
                                namespace += data.childNodes[0].nodeValue
                                namespace += '/'
                            })
                            namespace = namespace.substr(0, namespace.length - 1)
                            namespace += ','
                        })
                    }
                    if (item.nodeName == "VALUE") {
                        value = item.childNodes[0].nodeValue
                    }
                })

                this.commit('addElementErrorDomain', {
                    name: Name,
                    input: true,
                    path: strPath,
                    uuid: ele.getAttribute("UUID"),
                    top: Math.floor(Math.random() * (200 - 6)) + 5,
                    left: Math.floor(Math.random() * (1400 - 11)) + 10,
                    zindex: 2,
                    icon: "mdi-clipboard-outline",
                    validation: false,
                    namespace: namespace,
                    value: value,
                })
                state.inputFileList.push({ uuid: ele.getAttribute("UUID"), path: strPath + '/' + Name, parent: constant.ErrorDomain_str })
                EventBus.$emit('add-element', constant.Service_str)
                EventBus.$emit('add-element', constant.Errors_str)
                EventBus.$emit('add-element', constant.ErrorDomain_str)
            })
        },
        setInputFileComplate(state) { //바로 라인 그리면 element가 다 그려지기 전이라 선의 id값을 찾지 못한다.
            state.isInputFileComplate = false // element들이 다 그려졌다는걸 알려 주는것임
        },
        checkLineInputXml(state) {
            //console.log(state.inputFileList)
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
                            if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].templatetype == (item.path + '/' + item.name)) {
                                this.commit('setConnectionline', { start: ele.uuid + '/templateType', end: item.uuid })
                                EventBus.$emit('new-line', ele.uuid + '/templateType', item.uuid)
                            }
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].ddpc != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].idtelement != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].hwelement != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].connector != null) {
                        state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].connector.forEach((data, i) => {
                            if (data.endpoint != null) {
                                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach(item => {
                                    if (item.conditional != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].servicediscover != null) {
                        state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].servicediscover.forEach((data, i) => {
                            if (data.msia != null) {
                                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach(item => {
                                    if (item.conditional != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxelement].conditional != null) {
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
                                                                EventBus.$emit('new-line', ele.uuid + '/comconet' + channel.name + '-' + condi.name, data.uuid)
                                                            } else if (n == 0 && v != 0) {
                                                                EventBus.$emit('new-line', ele.uuid + '/channel' + condi.name, data.uuid)
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
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].pport != null) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].pport.forEach((data, i) => {
                            if (data.interface != null) {
                                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                    if (data.interface == (item.path + '/' + item.name)) {
                                        this.commit('setConnectionline', { start: ele.uuid + '/pporttable-' + i, end: item.uuid })
                                        EventBus.$emit('new-line', ele.uuid + '/pporttable', item.uuid)
                                    }
                                })
                            }
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].rport != null) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].rport.forEach((data, i) => {
                            if (data.interface != null) {
                                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                    if (data.interface == (item.path + '/' + item.name)) {
                                        this.commit('setConnectionline', { start: ele.uuid + '/rporttable-' + i, end: item.uuid })
                                        EventBus.$emit('new-line', ele.uuid + '/rporttable', item.uuid)
                                    }
                                })
                            }
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].prport != null) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].prport.forEach((data, i) => {
                            if (data.interface != null) {
                                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                    if (data.interface == (item.path + '/' + item.name)) {
                                        this.commit('setConnectionline', { start: ele.uuid + '/prporttable-' + i, end: item.uuid })
                                        EventBus.$emit('new-line', ele.uuid + '/prporttable', item.uuid)
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
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].fieldD != null) {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].fieldD.forEach((data, i) => {
                            if (data.field != null) {
                                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                    item.fields.forEach(service => {
                                        if (data.field == (item.path + '/' + item.name + '/' + service.name)) {
                                            this.commit('setConnectionline', { start: ele.uuid + '/field-' + i, end: item.uuid })
                                            if (i == 0) {
                                                EventBus.$emit('new-line', ele.uuid + '/fieldtab' + data.name, item.uuid)
                                            } else {
                                                EventBus.$emit('new-line', ele.uuid + '/field', item.uuid)
                                            }
                                        }
                                    })
                                })
                            }
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].eventG != null) {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].eventG.forEach((eve, i) => {
                            if (eve.event != null) {
                                eve.event.forEach((group, g) => {
                                    if (group.event != null) {
                                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                                            if (item.eventD != null) {
                                                item.eventD.forEach(data => {
                                                    if (group.event == (item.path + '/' + item.name + '/' + data.name)) {
                                                        this.commit('setConnectionline', { start: ele.uuid + '/event-' + g + '-' + i, end: item.uuid })
                                                        if (i == 0) {
                                                            EventBus.$emit('new-line', ele.uuid + '/eventtab' + group.name, item.uuid)
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
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].eventD != null) {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].eventD.forEach((eve, i) => {
                            if (eve.event != null) {
                                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                    if (item.events != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].methodD != null) {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].methodD.forEach((method, i) => {
                            if (method.method != null) {
                                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(item => {
                                    if (item.methods != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].events != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].fields != null) {
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
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].methods != null) {
                        state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].methods.forEach((data, i) => {
                            if (data.argument != null) {
                                data.argument.forEach((arg, a) => {
                                    if (arg.type != null) {
                                        state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.forEach(item => {
                                            if (arg.type == (item.path + '/' + item.name)) {
                                                this.commit('setConnectionline', { start: ele.uuid + '/argtable-' + a + '-' + i, end: item.uuid })
                                                if (i == 0) {
                                                    EventBus.$emit('new-line', ele.uuid + '/argtable' + data.name, item.uuid)
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
                                                    EventBus.$emit('new-line', ele.uuid + '/methoderrors' + data.name, item.uuid)
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
                                                    EventBus.$emit('new-line', ele.uuid + '/methoderror' + data.name, item.uuid)
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
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].siref != null) {
                        state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.forEach(data => {
                            if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].siref == data.path + '/' + data.name) {
                                this.commit('setConnectionline', { start: ele.uuid + '/tomachinServiceIns', end: data.uuid })
                                EventBus.$emit('new-line', ele.uuid + '/tomachinServiceIns', data.uuid)
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
                    if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].method != null) {
                        state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].method.forEach((method, i) => {
                            if (method.method != null) {
                                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                                    if (item.methodD != null) {
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
                                            EventBus.$emit('new-line', ele.uuid + '/requiredEventG' + data.name, eve.uuid)
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
                                        EventBus.$emit('new-line', ele.uuid + '/requiredClient' + data.name, item.uuid)
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
                    if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].eventP != null) {
                        state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].eventP.forEach((eventp, i) => {
                            if (eventp.event != null) {
                                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(item => {
                                    if (item.eventD != null) {
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
                                    if (item.methodD != null) {
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
                                            EventBus.$emit('new-line', ele.uuid + '/providEventG' + data.name, eve.uuid)
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
                                        EventBus.$emit('new-line', ele.uuid + '/providServer' + data.name, item.uuid)
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
                    if (state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxelement].errorref != null) {
                        state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxelement].errorref.forEach((data, i) => {
                            if (data.error != null) {
                                state.SAHLProject[state.openProjectIndex].Service.Error.forEach(item => {
                                    if (data.error == (item.path + '/' + item.name)) {
                                        this.commit('setConnectionline', { start: ele.uuid + '/error-' + i, end: item.uuid })
                                        EventBus.$emit('new-line', ele.uuid + '/error', item.uuid)
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
            } else if (payload.compo == "Scale") {
                state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].scales = payload.scales.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].typeemitter = payload.typeemitter
            } else if (payload.compo == "DDPC") {
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].ddpc = payload.ddpc.slice()
            } else if (payload.compo == "IDT Element") {
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].idtelement = payload.idtelement.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxElement].left = payload.left
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
            } else if (payload.compo == 'HWElement') {
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].hwelement = payload.hwelement.slice()
            } else if (payload.compo == 'function') {
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].functiongroup = payload.functiongroup.slice()
            } else if (payload.compo == 'Processor') {
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].processor = payload.processor.slice()
            } else if (payload.compo == 'Processor Name') {
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].processor[payload.idx].name = payload.name
            } else if (payload.compo == 'Processor Core') {
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].processor[payload.idx].core = payload.core
            } else if (payload.compo == "module Ins") {
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].moduleinstant = payload.ModuleIns.slice()
            } else if (payload.compo == 'module Name') {
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].moduleinstant[payload.idx].name = payload.name
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].left = payload.left
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
            } else if (payload.compo == 'Attribute') {
                state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxElement].attribute = payload.attribute.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxElement].left = payload.left
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
            } else if (payload.compo == 'CC item') {
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].connector = payload.cc.slice()
            } else if (payload.compo == 'SDC item') {
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].servicediscover = payload.sdc.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxElement].left = payload.left
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
            } else if (payload.compo == 'Mode declaration') {
                state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxElement].modedeclaration = payload.modedeclaration.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxElement].left = payload.left
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
            } else if (payload.compo == "Condi Name") {
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[payload.conditab].name = payload.name
            } else if (payload.compo == "version") {
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[payload.conditab].version = payload.version
            } else if (payload.compo == "Channel Name") {
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[payload.conditab].channel[payload.channeltab].name = payload.name
            } else if (payload.compo == "Endpoint Name") {
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[payload.conditab].channel[payload.channeltab].endpoint[payload.endtab].name = payload.name
            } else if (payload.compo == "Domain Name") {
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[payload.conditab].channel[payload.channeltab].endpoint[payload.endtab].domainname = payload.name
            } else if (payload.compo == "Priority") {
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional[payload.conditab].channel[payload.channeltab].endpoint[payload.endtab].priority = payload.name
            } else if (payload.compo == "conditional") {
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].conditional = payload.conditional.slice() //JSON.parse(JSON.stringify(payload.conditional))
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].left = payload.left
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
            } else if (payload.compo == "pport") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport = payload.pport.slice()
            } else if (payload.compo == "rport") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport = payload.rport.slice()
            } else if (payload.compo == "prport") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport = payload.prport.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].left = payload.left
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
            } else if (payload.compo == "dependent") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent = payload.dependent.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].left = payload.left
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
            } else if (payload.compo == "determin") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin = payload.determin.slice()
            } else if (payload.compo == "Stort Name") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].swname = payload.name
            } else if (payload.compo == "Hardware Platform") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].hardwareP = payload.name
            } else if (payload.compo == "Init Instruct") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].initnofinstruction = payload.name
            } else if (payload.compo == "Init Begin") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].initsequentialbegin = payload.name
            } else if (payload.compo == "Init End") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].initsequentialend = payload.name
            } else if (payload.compo == "Init Speedup") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].initspeedup = payload.name
            } else if (payload.compo == "Run Instruct") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].runnofinstruction = payload.name
            } else if (payload.compo == "Run Begin") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].runsequentialbegin = payload.name
            } else if (payload.compo == "Run End") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].runsequentialend = payload.name
            } else if (payload.compo == "Run Speedup") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].determin[payload.determinTab].runspeedup = payload.name
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxElement].left = payload.left
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
                configname: payload.configname,
                policy: payload.policy,
                priority: payload.priority,
                entertimeout: payload.entertimeout,
                exittimeout: payload.exittimeout,

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
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxElement].left = payload.left
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
            } else if (payload.compo == "Event Group") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventG = payload.eventG.slice()
            } else if (payload.compo == "EventG name") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventG[payload.eventGtab].name = payload.name
            } else if (payload.compo == "EventG size") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventG[payload.eventGtab].size = payload.size
            } else if (payload.compo == "Event Deployment") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventD = payload.eventD.slice()
            } else if (payload.compo == "Method Deployment") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].methodD = payload.methodD.slice()
            } else if (payload.compo == "Field Deployment") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD = payload.fieldD.slice()
            } else if (payload.compo == "Field name") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].name = payload.name
            } else if (payload.compo == "get name") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].getname = payload.str
            } else if (payload.compo == "get id") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].getid = payload.str
            } else if (payload.compo == "get MaxReq") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].getmaxreq = payload.str
            } else if (payload.compo == "get MaxRes") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].getmaxres = payload.str
            } else if (payload.compo == "get TimeReq") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].gettimereq = payload.str
            } else if (payload.compo == "get TimeRes") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].gettimeres = payload.str
            } else if (payload.compo == "get Proto") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].getproto = payload.str
            } else if (payload.compo == "set Name") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].setname = payload.str
            } else if (payload.compo == "set id") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].setid = payload.str
            } else if (payload.compo == "set MaxReq") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].setmaxreq = payload.str
            } else if (payload.compo == "set MaxRes") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].setmaxres = payload.str
            } else if (payload.compo == "set TimeReq") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].settimereq = payload.str
            } else if (payload.compo == "set TimeRes") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].settimeres = payload.str
            } else if (payload.compo == "set Proto") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].setproto = payload.str
            } else if (payload.compo == "notifier name") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].notname = payload.str
            } else if (payload.compo == "notifier id") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].notid = payload.str
            } else if (payload.compo == "notifier max") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].notmax = payload.str
            } else if (payload.compo == "notifier time") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].nottime = payload.str
            } else if (payload.compo == "notifier serial") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].notserial = payload.str
            } else if (payload.compo == "notifier proto") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[payload.fieldtab].notproto = payload.str
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].left = payload.left
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
            } else if (payload.compo == "Event") {
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].events = payload.events.slice()
            } else if (payload.compo == "Field") {
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].fields = payload.fields.slice()
            } else if (payload.compo == "Method") {
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods = payload.methods.slice()
            } else if (payload.compo == "Method Name") {
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods[payload.methodtab].name = payload.name
            } else if (payload.compo == "Method FF") {
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods[payload.methodtab].fireforget = payload.fireforget
            } else if (payload.compo == "Method Descript") {
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods[payload.methodtab].descrip = payload.discrip
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxElement].left = payload.left
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
                siref: payload.siref,
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
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].left = payload.left
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
            } else if (payload.compo == "method") {
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].method = payload.methodref.slice()
            } else if (payload.compo == "Event name") {
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].requiredevent[payload.tab].name = payload.name
            } else if (payload.compo == "Required Event") {
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].requiredevent = payload.eventG.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxElement].left = payload.left
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
            } else if (payload.compo == "method") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].method = payload.methodref.slice()
            } else if (payload.compo == "event") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventP = payload.eventref.slice()
            } else if (payload.compo == "Required Event") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG = payload.eventG.slice()
            } else if (payload.compo == "Event name") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[payload.tab].name = payload.name
            } else if (payload.compo == "Event udp") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[payload.tab].udp = payload.name
            } else if (payload.compo == "Event ipv4") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[payload.tab].ipv4 = payload.name
            } else if (payload.compo == "Event ipv6") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[payload.tab].ipv6 = payload.name
            } else if (payload.compo == "Event threshold") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].eventG[payload.tab].threshold = payload.name
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].Service.Error[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.Error[idxElement].left = payload.left
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
            } else if (payload.compo == "error ref") {
                state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].errorref = payload.errorref.slice()
            } else if (payload.compo == "drag") {
                state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].left = payload.left
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
                state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxElement].top = payload.top
                state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxElement].left = payload.left
            } else if (payload.compo == "z") {
                state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxElement].zindex = payload.zindex
            }
        },

        changePathElement(state, payload) {
            var indices = this.getters.getchangenamelist(payload.uuid)
            indices.forEach(idx => {
                var startUUID = state.connectionLine[state.openProjectIndex].start[idx].split('/')
                var tableLine = startUUID[1].split('-')
                var idxElement = null,
                    intablename = null
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
                } else if (tableLine[0] == 'machinedesign') { //MachineDesign 변경시 =>  machin에서 machinDesign ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[idxElement].machinedesign = payload.path + '/' + payload.name
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
                } else if (tableLine[0] == 'processfromptmm') { //Process 변경 시  =>  Process to Machine Mapping set 에서 Process ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxElement].ptmmProcess = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'processprodesign') { //ProcessDesign 변경 시  =>   Process 에서 Process Design ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].prodesign = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'toportprocess') { //ProcessDesign 변경 시  =>   Service Instance to port prototype 에서 process design ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].process = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'prodesignexecutable') { //Executable 변경시 =>  ProcessDesign 에서  Executable ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxElement].executableref = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'processexecut') { //Executable 변경시 =>  Process 에서 Executable ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].execut = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'processstartup') { // Startup Config 변경시 =>  Process 에서 Startup Config ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].dependent[tableLine[1]].startupConfigRef = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'processdetermin') { //Deterministric  변경시 =>  Process 에서 Deterministric ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxElement].determin = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'event') { //Service Deployment 변경시 =>  ServiceInterface Deploymant에서에서 serviceinterface Deploymant Event Deployment ref할때
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
                } else if (tableLine[0] == 'pporttable') { //ServiceInterface 변경 시 =>  SW Components 에서 ServiceInterface ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].pport[tableLine[1]].interface = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'prporttable') { //ServiceInterface 변경 시 =>  SW Components 에서 ServiceInterface ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].prport[tableLine[1]].interface = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'rporttable') { //ServiceInterface 변경 시 =>  SW Components 에서 ServiceInterface ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxElement].rport[tableLine[1]].interface = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'service') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서 serviceInterface ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].service = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'serviceEventD') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Event ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                    if (payload.changeName == 'serviceEventD') {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventD[tableLine[1]].event = payload.path + '/' + payload.name + '/' + payload.listname
                    } else {
                        intablename = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventD[tableLine[1]].event.split('/')
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].eventD[tableLine[1]].event = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                    }
                } else if (tableLine[0] == 'serviceMethodD') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Method ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                    if (payload.changeName == 'serviceMethodD') {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].methodD[tableLine[1]].method = payload.path + '/' + payload.name + '/' + payload.listname
                    } else {
                        intablename = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].methodD[tableLine[1]].method.split('/')
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].methodD[tableLine[1]].method = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
                    }
                } else if (tableLine[0] == 'field') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Field ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(data => data.uuid === startUUID[0])
                    if (payload.changeName == 'field') {
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[tableLine[1]].field = payload.path + '/' + payload.name + '/' + payload.listname
                    } else {
                        intablename = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[tableLine[1]].field.split('/')
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxElement].fieldD[tableLine[1]].field = payload.path + '/' + payload.name + '/' + intablename[intablename.length - 1]
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
                } else if (tableLine[0] == 'tomachinServiceIns') { //Required SomeIP 변경시 =>  SomeIPtoMachineMapping 에서 Required SomeIP ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxElement].siref = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'toportservice') { //Required Provided 변경시 => Service Instance to port prototype 에서 provided,required ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === startUUID[0])
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE" && payload.req == false) {
                        state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].serviceIns = payload.path + '/' + payload.name
                    } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE" && payload.req == true) {
                        state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxElement].serviceIns = payload.path + '/' + payload.name
                    }
                } else if (tableLine[0] == 'methoderrors') { // Error 변경시 => ServiceInterface 에서 Error ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods[tableLine[2]].errorSet[tableLine[1]].error = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'error') { //Error 변경시 =>  Error Set 에서 Error  ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxElement].errorref[tableLine[1]].error = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'methoderror') { // Error set 변경시 =>  ServiceInterface 에서 ErrorSet ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxElement].methods[tableLine[2]].error[tableLine[1]].error = payload.path + '/' + payload.name
                } else if (tableLine[0] == 'errordomain') { //ErrorDomain 변경시 =>  Error 에서 Error Domain ref할때
                    idxElement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Service.Error[idxElement].errorDref = payload.path + '/' + payload.name
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
                }
            })
        },

        deleteRefTable(state, payload) {
            //console.log(payload.deletItemList)
            if (payload.deleteTab) {
                if (payload.deleteName == 'ModuleIns') { //Machine 변경시 =>  Process 에서 Machine -> Module Instantiation ref할때
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach((ele, i) => {
                        if (ele.dependent != null) {
                            ele.dependent.forEach((data, n) => {
                                if (data.resourceRef == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                    var idx = this.getters.getconnectLineNum(ele.uuid + '/processresorce-' + n)
                                    data.resourceRef = null
                                    if (idx != -1) {
                                        EventBus.$emit('delete-line', idx)
                                        this.commit('deletConnectionline', { startnum: idx })
                                    }
                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            })
                        }
                    })
                } else if (payload.deleteName == 'modeDeclar') { //Mode Declaration  변경시 =>  Process 에서  Module Declaration-> mode Declarations ref할때
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach((ele, i) => {
                        if (ele.dependent != null) {
                            ele.dependent.forEach((data, n) => {
                                if (data.functionItem != null) {
                                    data.functionItem.forEach((item, f) => {
                                        if (item.targetMode == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                            var idx = this.getters.getconnectLineNum(ele.uuid + '/fgtarget-' + f + '-' + n)
                                            item.targetMode = null
                                            if (idx != -1) {
                                                EventBus.$emit('delete-line', idx)
                                                this.commit('deletConnectionline', { startnum: idx })
                                            }
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else if (payload.deleteName == 'methodSI') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Method ref할때
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach((ele, i) => {
                        if (ele.methodD != null) {
                            ele.methodD.forEach((item, n) => {
                                if (item.method == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                    var idx = this.getters.getconnectLineNum(ele.uuid + '/serviceMethodD-' + n)
                                    item.method = null
                                    if (idx != -1) {
                                        EventBus.$emit('delete-line', idx)
                                        this.commit('deletConnectionline', { startnum: idx })
                                    }
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            })
                        }
                    })
                } else if (payload.deleteName == 'eventG') {
                    //Service Deployment 변경시 =>  Required SomeIP Service Instance 에서 Service Deployment Event Group ref할때
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.forEach((ele, i) => {
                            if (ele.requiredevent != null) {
                                ele.requiredevent.forEach((item, n) => {
                                    if (item.eventG == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/requiredEventG-' + n)
                                        item.eventG = null
                                        if (idx != -1) {
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                        }
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
                                    }
                                })
                            }
                        })
                        //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deploment의 eventG ref할때
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach((ele, i) => {
                        if (ele.eventG != null) {
                            ele.eventG.forEach((item, n) => {
                                if (item.eventG == (payload.path + '/' + payload.name + '/' + payload.tabName)) {
                                    var idx = this.getters.getconnectLineNum(ele.uuid + '/providEventG-' + n)
                                    item.eventG = null
                                    if (idx != -1) {
                                        EventBus.$emit('delete-line', idx)
                                        this.commit('deletConnectionline', { startnum: idx })
                                    }
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            })
                        }
                    })
                }
            } else {
                payload.deletItemList.forEach(deleteList => {
                    if (payload.deleteName == 'functionG') { //Machine 변경시 =>  Process 에서 Machine -> Function Group ref할때
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.forEach((ele, i) => {
                            if (ele.dependent != null) {
                                ele.dependent.forEach((data, n) => {
                                    if (data.functionItem != null) {
                                        data.functionItem.forEach((item, f) => {
                                            if (item.contextMode == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                                var idx = this.getters.getconnectLineNum(ele.uuid + '/fgcontext-' + f + '-' + n)
                                                item.contextMode = null
                                                if (idx != -1) {
                                                    EventBus.$emit('delete-line', idx)
                                                    this.commit('deletConnectionline', { startnum: idx })
                                                }
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].children[i].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.Process_index].validation = true
                                                state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                                                state.navigatorList[state.openProjectIndex].validation = true
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else if (payload.deleteName == 'CommunicationC') {
                        //MachineDesign 변경시 =>   EthernetCluster에서 MachineDesign -> Communication Connector ref할때
                        state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach((ele, i) => {
                                if (ele.conditional != null) {
                                    ele.conditional.forEach((condi, c) => {
                                        if (condi.channel != null) {
                                            condi.channel.forEach((channel, n) => {
                                                if (channel.comconnect != null) {
                                                    channel.comconnect.forEach((com, v) => {
                                                        if (com.connector == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                                            var idx = this.getters.getconnectLineNum(ele.uuid + '/comconet-' + v + '-' + n + '-' + c)
                                                            com.connector = null
                                                            if (idx != -1) {
                                                                EventBus.$emit('delete-line', idx)
                                                                this.commit('deletConnectionline', { startnum: idx })
                                                            }
                                                            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].children[i].validation = true
                                                            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].children[constant.EthernetCluster_index].validation = true
                                                            state.navigatorList[state.openProjectIndex].children[constant.Machines_index].validation = true
                                                            state.navigatorList[state.openProjectIndex].validation = true
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
                                    ele.ccref = null
                                    if (idx != -1) {
                                        EventBus.$emit('delete-line', idx)
                                        this.commit('deletConnectionline', { startnum: idx })
                                    }
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].children[i].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.SomeIPToMachineMapping_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                    state.navigatorList[state.openProjectIndex].validation = true
                                }
                            }) //SW Component 변경시 =>   Service Instance to port prototype 에서 SWComponent port ref할때
                    } else if (payload.deleteName == 'pPort' || payload.deleteName == 'prPort' || payload.deleteName == 'rPort') {
                        state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.forEach((ele, i) => {
                            if ((ele.selectPort == 'P-PORT-PROTOTYPE' && payload.deleteName == 'pPort' && ele.porttype == (payload.path + '/' + payload.name + '/' + deleteList.name)) ||
                                (ele.selectPort == 'R-PORT-PROTOTYPE' && payload.deleteName == 'rPort' && ele.porttype == (payload.path + '/' + payload.name + '/' + deleteList.name)) ||
                                (ele.selectPort == 'PR-PORT-PROTOTYPE' && payload.deleteName == 'prPort' && ele.porttype == (payload.path + '/' + payload.name + '/' + deleteList.name))) {
                                var idx = this.getters.getconnectLineNum(ele.uuid + '/toportport')
                                ele.porttype = null
                                if (idx != -1) {
                                    EventBus.$emit('delete-line', idx)
                                    this.commit('deletConnectionline', { startnum: idx })
                                }
                                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].children[i].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ToPortPrototypeMapping_index].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                state.navigatorList[state.openProjectIndex].validation = true
                            }
                        })
                    } else if (payload.deleteName == 'eventSI') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Event ref할때
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach((ele, i) => {
                            if (ele.eventD != null) {
                                ele.eventD.forEach((item, n) => {
                                    if (item.event == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/serviceEventD-' + n)
                                        item.event = null
                                        if (idx != -1) {
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                        }
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
                                    }
                                })
                            }
                        })
                    } else if (payload.deleteName == 'fieldSI') { //ServiceInterface 변경 시 =>  ServiceInterface Deploymant에서에서 serviceinterface Field ref할때
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach((ele, i) => {
                            if (ele.fieldD != null) {
                                ele.fieldD.forEach((item, n) => {
                                    if (item.field == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/field-' + n)
                                        item.field = null
                                        if (idx != -1) {
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                        }
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
                                    }
                                })
                            }
                        })
                    } else if (payload.deleteName == 'eventD') {
                        //Service Deployment 변경시 =>  ServiceInterface Deploymant에서에서 serviceinterface Deploymant Event Deployment ref할때
                        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach((ele, i) => {
                                if (ele.eventG != null) {
                                    ele.eventG.forEach((item, n) => {
                                        if (item.event != null) {
                                            item.event.forEach((data, d) => {
                                                if (data.event == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                                    var idx = this.getters.getconnectLineNum(ele.uuid + '/event-' + d + '-' + n)
                                                    data.event = null
                                                    if (idx != -1) {
                                                        EventBus.$emit('delete-line', idx)
                                                        this.commit('deletConnectionline', { startnum: idx })
                                                    }
                                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].children[i].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].children[constant.SomeIPServiceInterfaceDeployment_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInterfaces_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                                    state.navigatorList[state.openProjectIndex].validation = true
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            //Service Deployment 변경시 =>  Provided SomeIP Service Instance 에서 Service Deploment의  eventD ref할때
                        state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.forEach((ele, i) => {
                            if (ele.eventP != null) {
                                ele.eventP.forEach((item, n) => {
                                    if (item.event == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                        var idx = this.getters.getconnectLineNum(ele.uuid + '/proviedEventP-' + n)
                                        item.event = null
                                        if (idx != -1) {
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                        }
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
                                    }
                                })
                            }
                        })
                    } else if (payload.deleteName == 'methodD') {
                        //Service Deployment 변경시 =>  Required SomeIP Service Instance 에서 Service Deployment Method Deployment ref할때
                        state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.forEach((ele, i) => {
                                if (ele.method != null) {
                                    ele.method.forEach((item, n) => {
                                        if (item.method == (payload.path + '/' + payload.name + '/' + deleteList.name)) {
                                            var idx = this.getters.getconnectLineNum(ele.uuid + '/requiredMethod-' + n)
                                            item.method = null
                                            if (idx != -1) {
                                                EventBus.$emit('delete-line', idx)
                                                this.commit('deletConnectionline', { startnum: idx })
                                            }
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].children[i].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.RequiredSomeIP_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                            state.navigatorList[state.openProjectIndex].validation = true
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
                                        item.method = null
                                        if (idx != -1) {
                                            EventBus.$emit('delete-line', idx)
                                            this.commit('deletConnectionline', { startnum: idx })
                                        }
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].children[i].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].children[constant.ProvidedSomeIP_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[constant.ServiceInstances_index].validation = true
                                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = true
                                        state.navigatorList[state.openProjectIndex].validation = true
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
                //console.log('==deleteRefElement==' + indices)

            for (let i = 0; i < indices.length; i++) {
                var startUUID = state.connectionLine[state.openProjectIndex].start[indices[i]].split('/')
                var tableLine = startUUID[1].split('-')

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
                } else if (tableLine[0] == 'pporttable') { // SW Components 에서 ServiceInterface ref할때
                    var idxpport = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxpport].pport[tableLine[1]].interface = ''
                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxpport].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                    state.navigatorList[state.openProjectIndex].validation = true
                } else if (tableLine[0] == 'prporttable') { // SW Components 에서 ServiceInterface ref할때
                    var idxprport = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxprport].prport[tableLine[1]].interface = ''
                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxprport].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].validation = true
                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].validation = true
                    state.navigatorList[state.openProjectIndex].validation = true
                } else if (tableLine[0] == 'rporttable') { // SW Components 에서 ServiceInterface ref할때
                    var idxrport = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxrport].rport[tableLine[1]].interface = ''
                    state.navigatorList[state.openProjectIndex].children[constant.AdaptiveApplication_index].children[constant.SWComponents_index].children[idxrport].validation = true
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
                    state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxError].errorref[tableLine[1]].error = null
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
                } else if (tableLine[0] == 'tomachinServiceIns') { // SomeIPtoMachineMapping 에서 Required SomeIP ref할때
                    var idxSIRequired = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === startUUID[0])
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxSIRequired].siref = null
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
            }
            state.activeUUID = null
        },
        setValidation(state, payload) {
            var idxElement = null,
                isValidation = false,
                idxchild = null,
                idxchildchild = null,
                idxService = null
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
            } else if (payload.parent == constant.ServiceInterface_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.ServiceInterface_index
                idxService = constant.ServiceInterfaces_index
            } else if (payload.parent == constant.Client_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.Client_index
                idxService = constant.SomeIPEvents_index
            } else if (payload.parent == constant.Server_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.Server_index
                idxService = constant.SomeIPEvents_index
            } else if (payload.parent == constant.SomeIPClient_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.SomeIPClient_index
                idxService = constant.ServiceInstances_index
            } else if (payload.parent == constant.SomeIPServer_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.SomeIPServer_index
                idxService = constant.ServiceInstances_index
            } else if (payload.parent == constant.SomeIPToMachineMapping_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.SomeIPToMachineMapping_index
                idxService = constant.ServiceInstances_index
            } else if (payload.parent == constant.ToPortPrototypeMapping_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.ToPortPrototypeMapping_index
                idxService = constant.ServiceInstances_index
            } else if (payload.parent == constant.RequiredSomeIP_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.RequiredSomeIP_index
                idxService = constant.ServiceInstances_index
            } else if (payload.parent == constant.ProvidedSomeIP_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.ProvidedSomeIP_index
                idxService = constant.ServiceInstances_index
            } else if (payload.parent == constant.Error_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.Error_index
                idxService = constant.Errors_index
            } else if (payload.parent == constant.Errorset_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.Errorset_index
                idxService = constant.Errors_index
            } else if (payload.parent == constant.ErrorDomain_str) {
                idxElement = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(data => data.uuid === payload.uuid)
                idxchildchild = constant.ErrorDomain_index
                idxService = constant.Errors_index
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
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[idxService].children[idxchildchild].children[idxElement].validation = false
                state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[idxService].children[idxchildchild].children.forEach(item => {
                    if (item.validation == true) {
                        isValidation = true
                    }
                })
                if (!isValidation) {
                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[idxService].children[idxchildchild].validation = false
                    state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[idxService].children.forEach(item => {
                        if (item.validation == true) {
                            isValidation = true
                        }
                    })
                    if (!isValidation) {
                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children[idxService].validation = false
                        state.navigatorList[state.openProjectIndex].children[constant.Service_index].children.forEach(child => {
                            if (child.validation == true) {
                                isValidation = true
                            }
                        })
                        if (!isValidation) {
                            state.navigatorList[state.openProjectIndex].children[constant.Service_index].validation = false
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
            var str = s.serializeToString(d); //문서의 DOM 트리를 XML로 다시 직렬화할 수 있습니다.
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
            if (localStorage.getItem("setting")) {
                console.log("loading setting");
                state.setting = JSON.parse(localStorage.getItem("setting"))
            }
            if (localStorage.getItem("savePath")) {
                console.log("loading savePath");
                state.strSavePath = JSON.parse(localStorage.getItem("savePath"))
            }
            if (localStorage.getItem("visibleDetailView")) {
                console.log("loading visibleDetailView");
                state.visibleDetailView = JSON.parse(localStorage.getItem("visibleDetailView"))
            }
        }
    },
    actions: {}
});