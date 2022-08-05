import constant from "./constants.js"

const getters = {
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
    getNameSWBaseType(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.SWBaseType_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType.some(ele => ele.name === name)
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
    getNameHWCategory(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.HWCategory_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Machine.HWCategory.some(ele => ele.name === name)
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
    getNameSWComponents(state) {
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
    getNameE2EProfileConfig(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.E2EProfileConfig_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig.some(ele => ele.name === name)
        }
        return name
    },
    getNameSDG_DEF(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.SDG_DEF_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Service.SdgDef.some(ele => ele.name === name)
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
    ///////////////////////////////////
    getNamePERFileArray(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.FileArray_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.some(ele => ele.name === name)
        }
        return name
    },
    getNamePERFileProxy(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.FileProxyInterf_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.some(ele => ele.name === name)
        }
        return name
    },
    getNamePERKeyValueD(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.KeyValueData_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.some(ele => ele.name === name)
        }
        return name
    },
    getNamePERKeyValueDI(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.KeyValueDI_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.some(ele => ele.name === name)
        }
        return name
    },
    getNamePERPPtoFileArray(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.PortProtoFileA_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.some(ele => ele.name === name)
        }
        return name
    },
    getNamePERPPtoKeyValue(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.PortProtoKeyV_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.some(ele => ele.name === name)
        }
        return name
    },
    getNamePHMContribution(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.PlatformHealthManagC_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.some(ele => ele.name === name)
        }
        return name
    },
    getNamePHMtoMachine(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.ContritoMachine_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.some(ele => ele.name === name)
        }
        return name
    },
    getNamePHMHealth(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.HealthChannel_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.some(ele => ele.name === name)
        }
        return name
    },
    getNamePHMRecovery(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.RecoveryVA_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.some(ele => ele.name === name)
        }
        return name
    },
    getNamePHMSupervised(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.PHMSupervised_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.some(ele => ele.name === name)
        }
        return name
    },
    getNameRecoveryVia(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.RecoveryActionInterf_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.some(ele => ele.name === name)
        }
        return name
    },
    getNameMethodGD(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.ComMethodGDesign_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.some(ele => ele.name === name)
        }
        return name
    },
    getNameEventGD(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.ComEventGDesign_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].IamG.EventGD.some(ele => ele.name === name)
        }
        return name
    },
    getNameFieldGD(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.ComFieldGDesign_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.some(ele => ele.name === name)
        }
        return name
    },
    getNameMethodG(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.ComMethodGrant_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].IamG.MethodG.some(ele => ele.name === name)
        }
        return name
    },
    getNameEventG(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.ComEventGrant_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].IamG.EventG.some(ele => ele.name === name)
        }
        return name
    },
    getNameFieldG(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.ComFieldGrant_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].IamG.FieldG.some(ele => ele.name === name)
        }
        return name
    },
    getNameSoftWareCluster(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.SWCluster_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.some(ele => ele.name === name)
        }
        return name
    },
    getNameSoftWarePackage(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.SWPackage_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.some(ele => ele.name === name)
        }
        return name
    },
    getNameVehiclePackage(state) {
        let name = null,
            res = true,
            n = 0

        while (res) {
            name = constant.VehiclePackage_str + '_' + n++;
            res = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.some(ele => ele.name === name)
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
    getMachinProcessor(state) { //Machine의 process core
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(ele => {
            if (ele.processor.length > 0) {
                ele.processor.forEach(item => {
                    if (item.core.length > 0) {
                        item.core.forEach(data => {
                            datatype.push({
                                name: ele.path + '/' + ele.name + '/' + item.name + '/' + data.name,
                                uuid: ele.uuid,
                                id: data.id
                            })

                        })
                    }
                })
            }
        })
        return datatype
    },
    getUCMModuleIns(state) { //Machine의 ucm module
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(ele => {
            if (ele.ucm.length > 0) {
                ele.ucm.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
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
    getHWCategory(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Machine.HWCategory.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getHWAttributeDef(state) { //Mode Declaration Group의 mode Declaration
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Machine.HWCategory.forEach(ele => {
            if (ele.attribute.length > 0) {
                ele.attribute.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
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
            if (ele.modedeclaration.length > 0) {
                ele.modedeclaration.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getNetworkEndPoint(state) {
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.forEach(ethernet => {
            if (ethernet.conditional.length > 0) {
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
                                        endpointidx: c,
                                        fullname: ethernet.name + '/' + condi.name + '/' + channel.name + '/' + end.name,
                                        name: ethernet.path + '/' + ethernet.name + '/' + condi.name + '/' + channel.name + '/' + end.name,
                                        id: end.id
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
            if (ele.connector.length > 0) {
                ele.connector.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
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
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getMachineFG(state) { //Machine안에 Function Group
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(ele => {
            if (ele.functiongroup != null) {
                ele.functiongroup.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
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
            if (ele.pport.length > 0) {
                ele.pport.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getRPortPrototype(state) { //SWComponent안에 R Port
        var datatype = []
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(ele => {
            if (ele.rport.length > 0) {
                ele.rport.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getPRPortPrototype(state) { //SWComponent안에 PR Port
        var datatype = []
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.forEach(ele => {
            if (ele.prport.length > 0) {
                ele.prport.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
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
    getRootSWComponentPrototype(state) { //Executable안에 RootSWComponentPrototype
        var datatype = []
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.forEach(ele => {
            if (ele.swname != '') {
                datatype.push({
                    name: ele.path + '/' + ele.name + '/' + ele.swname,
                    uuid: ele.uuid,
                })
            }
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
            if (ele.methodD.length > 0) {
                ele.methodD.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getSomeIPMethodDeployment(state) { //Provided, Required의 Method Props를 위한 함수
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(ele => {
            if (ele.methodD.length > 0) {
                ele.methodD.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
            if (ele.fieldD.length > 0) {
                ele.fieldD.forEach(data => {
                    if (data.name != '') {
                        if (data.getname != '') {
                            datatype.push({
                                name: ele.path + '/' + ele.name + '/' + data.name + '/' + data.getname,
                                uuid: ele.uuid,
                                id: data.id
                            })
                        }
                        if (data.setname != '') {
                            datatype.push({
                                name: ele.path + '/' + ele.name + '/' + data.name + '/' + data.setname,
                                uuid: ele.uuid,
                                id: data.id
                            })
                        }
                    }
                })
            }
        })
        return datatype
    },
    getSomeIPEventDeployment(state) { //Provided,serviceD eventG의  Event Props를 위한 함수
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(ele => {
            if (ele.eventD.length > 0) {
                ele.eventD.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
            if (ele.fieldD.length > 0) {
                ele.fieldD.forEach(data => {
                    if (data.name != '' && data.notname != '') {
                        datatype.push({
                            name: ele.path + '/' + ele.name + '/' + data.name + '/' + data.notname,
                            uuid: ele.uuid,
                            id: data.id
                        })
                    }
                })
            }
        })
        return datatype
    },
    getEventGroup(state) { //Service Deployment 안에 Event Group
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(ele => {
            if (ele.eventG.length > 0) {
                ele.eventG.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getEventDeployment(state) { //Service Deployment 안에 Event Deployment
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(ele => {
            if (ele.eventD.length > 0) {
                ele.eventD.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
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
            if (ele.events.length > 0) {
                ele.events.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getClientServer(state) { //ServiceInterface 안에 Method
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(ele => {
            if (ele.methods.length > 0) {
                ele.methods.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getField(state) { //ServiceInterface 안에 Field
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.forEach(ele => {
            if (ele.fields.length > 0) {
                ele.fields.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
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
    getSomeIPToMachineMapping(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.map(ele => {
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
    getE2EProfileConfig(state) { //Service Deployment 안에 Event Group
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig.forEach(ele => {
            if (ele.profile.length > 0) {
                ele.profile.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.configName,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
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
    getPERFileArray(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getPERFileProxy(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getPERKeyValueD(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getPERKeyValueDI(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getPERKeyValueDIData(state) { //PERKeyValueDI 안에 Data Elements
        var datatype = []
        state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.forEach(ele => {
            if (ele.data.length > 0) {
                ele.data.forEach(item => {
                    datatype.push({
                        name: ele.path + '/' + ele.name + '/' + item.name,
                        uuid: ele.uuid,
                        id: item.id
                    })
                })
            }
        })
        return datatype
    },
    getPHMContribution(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getPHMHealth(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getPHMRecovery(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getPHMSupervised(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getFieldGrant(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].IamG.FieldG.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getEventGrant(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].IamG.EventG.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getMethodGrant(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].IamG.MethodG.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getFieldGrantDesign(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getEventGrantDesign(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].IamG.EventGD.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getMethodGrantDesign(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.map(ele => {
            var returnObj = {}
            returnObj['name'] = ele.path + '/' + ele.name
            returnObj['uuid'] = ele.uuid
            return returnObj
        })
        return datatype
    },
    getSWCluster(state) {
        var datatype = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.map(ele => {
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
    getDataHWElement: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Machine.HWElement.find(data => data.uuid === uuid)
    },
    getDataHWCategory: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Machine.HWCategory.find(data => data.uuid === uuid)
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
    getDataSomeIPToMachine: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.find(data => data.uuid === uuid)
    },
    getDataRequiredSomeIP: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.find(data => data.uuid === uuid)
    },
    getDataProvidedSomeIP: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.find(data => data.uuid === uuid)
    },
    getDataE2EProfileConfig: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig.find(data => data.uuid === uuid)
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
    getDataPERFileArray: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Per.PERFileArray.find(data => data.uuid === uuid)
    },
    getDataPERFileProxy: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.find(data => data.uuid === uuid)
    },
    getDataPERKeyValueD: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.find(data => data.uuid === uuid)
    },
    getDataPERKeyValueDI: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.find(data => data.uuid === uuid)
    },
    getDataPHMContribution: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.find(data => data.uuid === uuid)
    },
    getDataPHMHealth: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.find(data => data.uuid === uuid)
    },
    getDataPHMRecovery: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.find(data => data.uuid === uuid)
    },
    getDataPHMSupervised: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.find(data => data.uuid === uuid)
    },
    getDataFieldGrantDesign: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].IamG.FieldGD.find(data => data.uuid === uuid)
    },
    getDataEventGrantDesign: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].IamG.EventGD.find(data => data.uuid === uuid)
    },
    getDataMethodGrantDesign: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].IamG.MethodGD.find(data => data.uuid === uuid)
    },
    getDataFieldGrant: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].IamG.FieldG.find(data => data.uuid === uuid)
    },
    getDataEventGrant: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].IamG.EventG.find(data => data.uuid === uuid)
    },
    getDataMethodGrant: (state) => (uuid) => {
        return state.SAHLProject[state.openProjectIndex].IamG.MethodG.find(data => data.uuid === uuid)
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
    getSomeIPMethodDeploymentPath: (state) => (method) => { //Provided, Required의 Method Props를 위한 함수
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(data => {
            data.methodD.forEach(item => {
                var strEvent = data.path + '/' + data.name + '/' + item.name
                    //var strEvent = data.name + '/' + item.name
                if (method == strEvent) {
                    uuidRef = data.uuid
                }
            })
            data.fieldD.forEach(item => {
                var strGetter = data.path + '/' + data.name + '/' + item.name + '/' + item.getname,
                    strSetter = data.path + '/' + data.name + '/' + item.name + '/' + item.setname
                if (method == strGetter) {
                    uuidRef = data.uuid
                }
                if (method == strSetter) {
                    uuidRef = data.uuid
                }
            })
        })
        return uuidRef
    },
    getSomeIPEventDeploymentPath: (state) => (event) => { //Provided, ServiceD eventG의 event Props를 위한 함수
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.forEach(data => {
            data.eventD.forEach(item => {
                var strEvent = data.path + '/' + data.name + '/' + item.name
                    //var strEvent = data.name + '/' + item.name
                if (event == strEvent) {
                    uuidRef = data.uuid
                }
            })
            data.fieldD.forEach(item => {
                var strNoti = data.path + '/' + data.name + '/' + item.name + '/' + item.notname
                if (event == strNoti) {
                    uuidRef = data.uuid
                }
            })
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
    getE2EProfileConfigPath: (state) => (config) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === config) {
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
    getRootSWComponentPrototypePath: (state) => (exe) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.forEach(data => {
            var strPath = data.path + '/' + data.name + '/' + data.swname
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
    getMachinePath: (state) => (machine, idx) => { //idx=0 : element전체  1: Modul  2: function   3: ucm Module
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
            } else if (idx == 3) {
                data.ucm.forEach(item => {
                    strPath = data.path + '/' + data.name + '/' + item.name
                    if (machine == strPath) {
                        uuidRef = data.uuid
                    }
                })
            }
        })
        return uuidRef
    },
    getMachineProcessorPath: (state) => (machine) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Machine.Machine.forEach(data => {
            if (data.processor.length > 0) {
                data.processor.forEach(item => {
                    if (item.core.length > 0) {
                        item.core.forEach(co => {
                            if (machine == data.path + '/' + data.name + '/' + item.name + '/' + co.name) {
                                uuidRef = data.uuid
                            }
                        })
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
                    strPath = data.path + '/' + data.name + '/' + item.name
                        //strPath = data.name + '/' + item
                    if (mode == strPath) {
                        uuidRef = data.uuid
                    }
                })
            }
        })
        return uuidRef
    },
    getHWCategoryPath: (state) => (deter) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Machine.HWCategory.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === deter) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getPERFileArrayPath: (state) => (keyvalue) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Per.PERFileArray.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === keyvalue) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getPERFileProxyPath: (state) => (keyvalue) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === keyvalue) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getPERKeyValueDPath: (state) => (keyvalue) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === keyvalue) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getPERKeyValueDIPath: (state) => (keyvalue) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.forEach(data => {
            data.data.forEach(item => {
                var strEvent = data.path + '/' + data.name + '/' + item.name
                if (keyvalue == strEvent) {
                    uuidRef = data.uuid
                }
            })
        })
        return uuidRef
    },
    getPHMContributionPath: (state) => (keyvalue) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === keyvalue) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getPHMHealthPath: (state) => (keyvalue) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === keyvalue) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getPHMRecoveryPath: (state) => (keyvalue) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === keyvalue) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getPHMSupervisedPath: (state) => (keyvalue) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === keyvalue) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getFieldDesignPath: (state) => (fieldD) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].IamG.FieldGD.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === fieldD) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getEventPath: (state) => (eventD) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].IamG.EventG.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === eventD) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getMethodPath: (state) => (methodD) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].IamG.MethodG.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === methodD) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getFieldPath: (state) => (fieldD) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].IamG.FieldG.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === fieldD) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getEventDesignPath: (state) => (eventD) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].IamG.EventGD.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === eventD) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getMethodDesignPath: (state) => (methodD) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].IamG.MethodGD.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === methodD) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },
    getSWClusterPath: (state) => (methodD) => {
        var uuidRef = null
        state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.forEach(data => {
            var strPath = data.path + '/' + data.name
            if (strPath === methodD) {
                uuidRef = data.uuid
            }
        })
        return uuidRef
    },

    sortSaveList: (state) => (savelist) => {
        var pathList = [],
            sortList = []

        savelist.forEach(data => {
            var idxelement, path
            if (data.parent == constant.CompuMethod_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.DataConstr_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SWBaseType_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ApplicationArray_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.Implementation_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.Machine_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.Machine.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Machine.Machine[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.MachineDesigne_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.EthernetCluster_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ModeDeclarationGroup_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.HWElement_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.HWElement.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Machine.HWElement[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.HWCategory_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Machine.HWCategory.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Machine.HWCategory[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ProcesstoMachineMapping_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SWComponents_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.Process_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ProcessDesign_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.Executable_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.StartupConfig_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.DeterministicClient_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SomeIPServiceInterfaceDeployment_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ServiceInterface_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.Client_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.Server_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SomeIPClient_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SomeIPServer_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SomeIPToMachineMapping_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ToPortPrototypeMapping_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.RequiredSomeIP_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ProvidedSomeIP_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.E2EProfileConfig_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SDG_DEF_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.SdgDef.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.SdgDef[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.Error_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.Error.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.Error[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.Errorset_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ErrorSet.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.ErrorSet[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ErrorDomain_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.FileArray_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERFileArray.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Per.PERFileArray[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.FileProxyInterf_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.KeyValueData_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.KeyValueDI_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.PortProtoFileA_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.PortProtoKeyV_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.PlatformHealthManagC_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Phm.PHMContribution[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ContritoMachine_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.HealthChannel_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.RecoveryVA_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.PHMSupervised_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.RecoveryActionInterf_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ComFieldGrant_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.FieldG.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].IamG.FieldG[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ComEventGrant_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.EventG.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].IamG.EventG[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ComMethodGrant_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.MethodG.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].IamG.MethodG[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ComFieldGDesign_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.FieldGD.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].IamG.FieldGD[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ComEventGDesign_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.EventGD.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].IamG.EventGD[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.ComMethodGDesign_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].IamG.MethodGD.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].IamG.MethodGD[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SWCluster_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.SWPackage_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
                    idx: idxelement,
                    parent: data.parent
                })
            } else if (data.parent == constant.VehiclePackage_str) {
                idxelement = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage.findIndex(item => item.uuid === data.uuid)
                path = state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[idxelement].path.substr(1)
                pathList.push({
                    path: path,
                    pathLength: path.split('/').length,
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
    getEndterStr: () => (idx) => {
        var strEnter = '\n'
        for (let i = 0; i < idx; i++) {
            strEnter += '\t'
        }
        return strEnter
    },
    getSaveObject: (state, getters) => (savelist) => {
        var saveStr = '',
            namespace
        let xmlDoc, endPath = 0,
            enterLine = 1

        //saveStr += '<?xml version="1.0" encoding="UTF-8"?>'
        saveStr += '<AUTOSAR xmlns="http://autosar.org/schema/r4.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://autosar.org/schema/r4.0 AUTOSAR_00048.xsd">'
        saveStr += getters.getEndterStr(enterLine++)
        var start_one = savelist[0].path.split('/')
        start_one.forEach(ele => {
            saveStr += "<AR-PACKAGES>"
            saveStr += getters.getEndterStr(enterLine++)
            saveStr += "<AR-PACKAGE>"
            saveStr += getters.getEndterStr(enterLine)
            saveStr += "<SHORT-NAME>" + ele + "</SHORT-NAME>"
            saveStr += getters.getEndterStr(enterLine++)
        })
        saveStr += "<ELEMENTS>"
        enterLine--
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
                    saveStr += getters.getEndterStr(--enterLine)
                    saveStr += "</ELEMENTS>"
                } else {
                    enterLine--
                }
                //if (endPath == savelist[i - 1].pathLength) { // 앞 뒤의 path가 같은게 없으면 </AR-PACKAGES>까지 가면 안되니 하나 줄여줘야함
                if ((beforPath.length - endPath == 0) || (data.pathLength + endPath != beforPath.length)) {
                    notsame -= 1
                }

                if (otherPath != endPath) {
                    while (notsame > 0) {
                        saveStr += getters.getEndterStr(--enterLine)
                        saveStr += "</AR-PACKAGE>"
                        saveStr += getters.getEndterStr(--enterLine)
                        saveStr += "</AR-PACKAGES>"
                        notsame--
                    }
                }

                var repeat = data.pathLength - otherPath
                if (repeat < 0) {
                    repeat = 0
                }
                console.log('repeat = ' + repeat)
                if (repeat > 0 && savelist[i - 1].path.indexOf(data.path) == -1) {
                    saveStr += getters.getEndterStr(--enterLine)
                    saveStr += "</AR-PACKAGE>"
                    saveStr += getters.getEndterStr(enterLine) //saveStr += '\n'
                    saveStr += "<AR-PACKAGE>"
                    saveStr += getters.getEndterStr(++enterLine)
                    saveStr += "<SHORT-NAME>" + nowPath[otherPath++] + "</SHORT-NAME>"
                    repeat--
                }
                while (repeat > 0) {
                    saveStr += getters.getEndterStr(enterLine) //saveStr += '\n'
                    saveStr += "<AR-PACKAGES>"
                    saveStr += getters.getEndterStr(++enterLine)
                    saveStr += "<AR-PACKAGE>"
                    saveStr += getters.getEndterStr(++enterLine)
                    saveStr += "<SHORT-NAME>" + nowPath[otherPath++] + "</SHORT-NAME>"
                    repeat--
                }
                if (endPath != 0) {
                    saveStr += getters.getEndterStr(enterLine) //saveStr += '\n'
                    saveStr += "<ELEMENTS>"
                }
                console.log(saveStr)
            }
            var elementTab
            if (data.parent == constant.CompuMethod_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<COMPU-METHOD UUID ="' + state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].category != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].category + "</CATEGORY>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].attributeName != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<BLUEPRINT-POLICYS>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "<BLUEPRINT-POLICY-NOT-MODIFIABLE>"
                    saveStr += getters.getEndterStr(elementTab + 2)
                    saveStr += "<ATTRIBUTE-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].attributeName + "</ATTRIBUTE-NAME>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "</BLUEPRINT-POLICY-NOT-MODIFIABLE>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</BLUEPRINT-POLICYS>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].scales.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<COMPU-INTERNAL-TO-PHYS>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "<COMPU-SCALES>"
                    state.SAHLProject[state.openProjectIndex].DataTypes.CompuMethod[data.idx].scales.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 2)
                        saveStr += "<COMPU-SCALE>"
                        if (ele.const != '') {
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += "<COMPU-CONST>"
                            saveStr += getters.getEndterStr(elementTab + 4)
                            saveStr += "<VT>" + ele.const+"</VT>"
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += "</COMPU-CONST>"
                        }
                        if (ele.symbol != '') {
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += "<SYMBOL>" + ele.symbol + "</SYMBOL>"
                        }
                        if (ele.lowerlimit != '') {
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += '<LOWER-LIMIT INTERVAL-TYPE="CLOSED">' + ele.lowerlimit + "</LOWER-LIMIT>"
                        }
                        if (ele.upperlimit != '') {
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += '<UPPER-LIMIT INTERVAL-TYPE="CLOSED">' + ele.upperlimit + "</UPPER-LIMIT>"
                        }
                        if (ele.desc != '') {
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += '<DESC>'
                            saveStr += getters.getEndterStr(elementTab + 4)
                            saveStr += '<L-2 L="EN">' + ele.desc + "</L-2>"
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += "</DESC>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 2)
                        saveStr += "</COMPU-SCALE>"
                    })
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "</COMPU-SCALES>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</COMPU-INTERNAL-TO-PHYS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</COMPU-METHOD>"
            } else if (data.parent == constant.DataConstr_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<DATA-CONSTR UUID ="' + state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].lowerlimit != '' ||
                    state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].upperlimit != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<DATA-CONSTR-RULES>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "<DATA-CONSTR-RULE>"
                    saveStr += getters.getEndterStr(elementTab + 2)
                    saveStr += "<INTERNAL-CONSTRS>"
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].lowerlimit != '') {
                        saveStr += getters.getEndterStr(elementTab + 3)
                        saveStr += "<LOWER-LIMIT>" +
                            state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].lowerlimit + "</LOWER-LIMIT>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].upperlimit != '') {
                        saveStr += getters.getEndterStr(elementTab + 3)
                        saveStr += "<UPPER-LIMIT>" + state.SAHLProject[state.openProjectIndex].DataTypes.DataConstr[data.idx].upperlimit +
                            "</UPPER-LIMIT>"
                    }
                    saveStr += getters.getEndterStr(elementTab + 2)
                    saveStr += "</INTERNAL-CONSTRS>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "</DATA-CONSTR-RULE>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</DATA-CONSTR-RULES>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</DATA-CONSTR>"
            } else if (data.parent == constant.SWBaseType_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SW-BASE-TYPE UUID ="' + state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType[data.idx].category != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType[data.idx].category + "</CATEGORY>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType[data.idx].encoding != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<BASE-TYPE-ENCODING>" + state.SAHLProject[state.openProjectIndex].DataTypes.SWBaseType[data.idx].encoding + "</BASE-TYPE-ENCODING>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SW-BASE-TYPE>"
            } else if (data.parent == constant.ApplicationArray_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<APPLICATION-ARRAY-DATA-TYPE UUID="' + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].category != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].category + "</CATEGORY>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].dynamicArrySize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<DYNAMIC-ARRAY-SIZE-PROFILE>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].dynamicArrySize + "</DYNAMIC-ARRAY-SIZE-PROFILE>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elename != '' ||
                    state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elehandling != null ||
                    state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elesemantics != null ||
                    state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elemaxnumber != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ELEMENT>"
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elename != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elename + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elehandling != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<ARRAY-SIZE-HANDLING>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elehandling + "</ARRAY-SIZE-HANDLING>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elesemantics != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<ARRAY-SIZE-SEMANTICS>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elesemantics + "</ARRAY-SIZE-SEMANTICS>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elemaxnumber != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MAX-NUMBER-OF-ELEMENTS>" + state.SAHLProject[state.openProjectIndex].DataTypes.ApplicationArrayDataType[data.idx].elemaxnumber + "</MAX-NUMBER-OF-ELEMENTS>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ELEMENT>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += '</APPLICATION-ARRAY-DATA-TYPE>'
            } else if (data.parent == constant.Implementation_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<STD-CPP-IMPLEMENTATION-DATA-TYPE UUID="' + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].name != '') {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].category != '') {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].category + "</CATEGORY>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].traceName != '' ||
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].trace.length > 0) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<INTRODUCTION>"
                    saveStr += getters.getEndterStr(enterLine + 1)
                    saveStr += "<TRACE>"
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].traceName != '') {
                        saveStr += getters.getEndterStr(enterLine + 2)
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].traceName + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].trace.length > 0) {
                        saveStr += getters.getEndterStr(enterLine + 2)
                        saveStr += "<TRACE-REFS>"
                        state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].trace.forEach(trace => {
                            saveStr += getters.getEndterStr(enterLine + 3)
                            saveStr += '<TRACE-REF DEST="TRACEABLE">' + trace.traceref + "</TRACE-REF>"
                        })
                        saveStr += getters.getEndterStr(enterLine + 2)
                        saveStr += "</TRACE-REFS>"
                    }
                    saveStr += getters.getEndterStr(enterLine + 1)
                    saveStr += "</TRACE>"
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</INTRODUCTION>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].namespace != '') {
                    namespace = state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].namespace.split(',')
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<NAMESPACES>"
                    namespace.forEach((ele, e) => {
                        if (!(ele == '' && e == namespace.length - 1)) {
                            var symbol = ele.split('/')
                            saveStr += getters.getEndterStr(enterLine + 1)
                            saveStr += "<SYMBOL-PROPS>"
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<SHORT-NAME>" + symbol[0] + "</SHORT-NAME>"
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<SYMBOL>" + symbol[1] + "</SYMBOL>"
                            saveStr += getters.getEndterStr(enterLine + 1)
                            saveStr += "</SYMBOL-PROPS>"
                        }
                    })
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</NAMESPACES>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].arraysize != '') {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<ARRAY-SIZE>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].arraysize + "</ARRAY-SIZE>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].typeemitter != '') {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<TYPE-EMITTER>" + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].typeemitter + "</TYPE-EMITTER>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].typeref != null) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += '<TYPE-REFERENCE-REF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].typeref + "</TYPE-REFERENCE-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].templatetype != null) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += '<TEMPLATE-ARGUMENTS>'
                    saveStr += getters.getEndterStr(enterLine + 1)
                    saveStr += '<CPP-TEMPLATE-ARGUMENT>'
                    saveStr += getters.getEndterStr(enterLine + 2)
                    saveStr += '<TEMPLATE-TYPE-REF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].templatetype + "</TEMPLATE-TYPE-REF>"
                    saveStr += getters.getEndterStr(enterLine + 1)
                    saveStr += '</CPP-TEMPLATE-ARGUMENT>'
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</TEMPLATE-ARGUMENTS>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].desc != '') {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += '<DESC>'
                    saveStr += getters.getEndterStr(enterLine + 1)
                    saveStr += '<L-2 L="EN">' + state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].desc + "</L-2>"
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</DESC>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].ddpc.length > 0) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<SW-DATA-DEF-PROPS>"
                    saveStr += getters.getEndterStr(enterLine + 1)
                    saveStr += "<SW-DATA-DEF-PROPS-VARIANTS>"
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].ddpc.forEach(ele => {
                        saveStr += getters.getEndterStr(enterLine + 2)
                        saveStr += '<SW-DATA-DEF-PROPS-CONDITIONAL>'
                        if (ele.compumethod != null) {
                            saveStr += getters.getEndterStr(enterLine + 3)
                            saveStr += '<COMPU-METHOD-REF DEST="COMPU-METHOD">' + ele.compumethod + '</COMPU-METHOD-REF>'
                        }
                        if (ele.dataconstr != null) {
                            saveStr += getters.getEndterStr(enterLine + 3)
                            saveStr += '<DATA-CONSTR-REF DEST="DATA-CONSTR">' + ele.dataconstr + '</DATA-CONSTR-REF>'
                        }
                        saveStr += getters.getEndterStr(enterLine + 2)
                        saveStr += '</SW-DATA-DEF-PROPS-CONDITIONAL>'
                    })
                    saveStr += getters.getEndterStr(enterLine + 1)
                    saveStr += "</SW-DATA-DEF-PROPS-VARIANTS>"
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</SW-DATA-DEF-PROPS>"
                }
                if (state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].idtelement.length > 0) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<SUB-ELEMENTS>"
                    state.SAHLProject[state.openProjectIndex].DataTypes.ImplementationDataType[data.idx].idtelement.forEach(ele => {
                        saveStr += getters.getEndterStr(enterLine + 1)
                        saveStr += "<CPP-IMPLEMENTATION-DATA-TYPE-ELEMENT>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.desc != '') {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += '<DESC>'
                            saveStr += getters.getEndterStr(enterLine + 3)
                            saveStr += '<L-2 L="EN">' + ele.desc + "</L-2>"
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "</DESC>"
                        }
                        if (ele.typeref != null || ele.inplace != null) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<TYPE-REFERENCE>"
                            if (ele.inplace != null) {
                                saveStr += getters.getEndterStr(enterLine + 3)
                                saveStr += "<INPLACE>" + ele.inplace.toUpperCase() + "</INPLACE>"
                            }
                            if (ele.typeref != null) {
                                saveStr += getters.getEndterStr(enterLine + 3)
                                saveStr += '<TYPE-REFERENCE-REF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + ele.typeref + "</TYPE-REFERENCE-REF>"
                            }
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "</TYPE-REFERENCE>"
                        }
                        saveStr += getters.getEndterStr(enterLine + 1)
                        saveStr += "</CPP-IMPLEMENTATION-DATA-TYPE-ELEMENT>"
                    })
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</SUB-ELEMENTS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</STD-CPP-IMPLEMENTATION-DATA-TYPE>"
            } else if (data.parent == constant.Machine_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<MACHINE UUID="' + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].machinedesign != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<MACHINE-DESIGN-REF DEST="MACHINE-DESIGN">' + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].machinedesign + "</MACHINE-DESIGN-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].timeout != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<DEFAULT-APPLICATION-TIMEOUT>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "<EXIT-TIMEOUT-VALUE>" + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].timeout + "</EXIT-TIMEOUT-VALUE>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</DEFAULT-APPLICATION-TIMEOUT>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].hwelement.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<HW-ELEMENT-REFS>"
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].hwelement.forEach(ele => {
                        if (ele.hwelement != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<HW-ELEMENT-REF DEST="HW-ELEMENT">' + ele.hwelement + "</HW-ELEMENT-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</HW-ELEMENT-REFS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].executable != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<TRUSTED-PLATFORM-EXECUTABLE-LAUNCH-BEHAVIOR>" + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].executable + "</TRUSTED-PLATFORM-EXECUTABLE-LAUNCH-BEHAVIOR>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].admin != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<ADMIN-DATA>'
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '<SDGS>'
                    saveStr += getters.getEndterStr(elementTab + 2)
                    saveStr += '<SDG GID="PER-STORAGE-PATH">'
                    saveStr += getters.getEndterStr(elementTab + 3)
                    saveStr += '<SD GID="PATH">' + state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].admin + "</SD>"
                    saveStr += getters.getEndterStr(elementTab + 2)
                    saveStr += '</SDG>'
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '</SDGS>'
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ADMIN-DATA>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].functiongroup.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<FUNCTION-GROUPS>"
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].functiongroup.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MODE-DECLARATION-GROUP-PROTOTYPE>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.type != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<TYPE-TREF DEST="MODE-DECLARATION-GROUP">' + ele.type + "</TYPE-TREF>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</MODE-DECLARATION-GROUP-PROTOTYPE>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</FUNCTION-GROUPS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].environ.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ENVIRONMENT-VARIABLES>"
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].environ.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<TAG-WITH-OPTIONAL-VALUE>"
                        if (ele.key != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<KEY>" + ele.key + "</KEY>"
                        }
                        if (ele.value != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<VALUE>' + ele.value + "</VALUE>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</TAG-WITH-OPTIONAL-VALUE>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ENVIRONMENT-VARIABLES>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].processor.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PROCESSORS>"
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].processor.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PROCESSOR>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.core != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<CORES>"
                            ele.core.forEach(core => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<PROCESSOR-CORE>"
                                if (core.name != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<SHORT-NAME>" + core.name + "</SHORT-NAME>"
                                }
                                if (core.idCore != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<CORE-ID>" + core.idCore + "</CORE-ID>"
                                }
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "</PROCESSOR-CORE>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</CORES>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PROCESSOR>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PROCESSORS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].moduleinstant.length > 0 ||
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].ucm.length > 0 ||
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].iam.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<MODULE-INSTANTIATIONS>"
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].moduleinstant.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<OS-MODULE-INSTANTIATION>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.resource != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<RESOURCE-GROUPS>"
                            ele.resource.forEach(res => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<RESOURCE-GROUP>"
                                if (res.name != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<SHORT-NAME>" + res.name + "</SHORT-NAME>"
                                }
                                if (res.cpuUsage != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<CPU-USAGE>" + res.cpuUsage + "</CPU-USAGE>"
                                }
                                if (res.memoryUsage != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<MEM-USAGE>" + res.memoryUsage + "</MEM-USAGE>"
                                }
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "</RESOURCE-GROUP>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</RESOURCE-GROUPS>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</OS-MODULE-INSTANTIATION>"
                    })
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].ucm.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<UCM-MODULE-INSTANTIATION>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.ident != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<IDENTIFIER>" + ele.ident + "</IDENTIFIER>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</UCM-MODULE-INSTANTIATION>"
                    })
                    state.SAHLProject[state.openProjectIndex].Machine.Machine[data.idx].iam.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<IAM-MODULE-INSTANTIATION>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.grants.length > 0) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<GRANT-REFS>"
                            ele.grants.forEach(item => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<GRANT-REF DEST="' + item.select + '">' + item.grant + "</GRANT-REF>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</GRANT-REFS>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</IAM-MODULE-INSTANTIATION>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</MODULE-INSTANTIATIONS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</MACHINE>"
            } else if (data.parent == constant.MachineDesigne_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<MACHINE-DESIGN UUID="' + state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].access != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ACCESS-CONTROL>" + state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].access + "</ACCESS-CONTROL>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].resettimer != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PN-RESET-TIMER>" + state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].resettimer + "</PN-RESET-TIMER>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].connector.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<COMMUNICATION-CONNECTORS>"
                    state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].connector.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<ETHERNET-COMMUNICATION-CONNECTOR>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.mtu != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MAXIMUM-TRANSMISSION-UNIT>" + ele.mtu + "</MAXIMUM-TRANSMISSION-UNIT>"
                        }
                        if (ele.mtuenable != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<PATH-MTU-ENABLED>" + ele.mtuenable.toUpperCase() + "</PATH-MTU-ENABLED>"
                        }
                        if (ele.timeout != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<PATH-MTU-TIMEOUT>" + ele.timeout + "</PATH-MTU-TIMEOUT>"
                        }
                        if (ele.endpoint != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<UNICAST-NETWORK-ENDPOINT-REF DEST="NETWORK-ENDPOINT">' + ele.endpoint + "</UNICAST-NETWORK-ENDPOINT-REF>"
                        }
                        if (ele.mask != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<PNC-FILTER-DATA-MASK>" + ele.mask + "</PNC-FILTER-DATA-MASK>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</ETHERNET-COMMUNICATION-CONNECTOR>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</COMMUNICATION-CONNECTORS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].servicediscover.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SERVICE-DISCOVER-CONFIGS>"
                    state.SAHLProject[state.openProjectIndex].Machine.MachineDesign[data.idx].servicediscover.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-SERVICE-DISCOVERY>"
                        if (ele.msia != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MULTICAST-SD-IP-ADDRESS-REF DEST="NETWORK-ENDPOINT">' + ele.msia + "</MULTICAST-SD-IP-ADDRESS-REF>"
                        }
                        if (ele.ssdp != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SOMEIP-SERVICE-DISCOVERY-PORT>" + ele.ssdp + "</SOMEIP-SERVICE-DISCOVERY-PORT>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-SERVICE-DISCOVERY>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</SERVICE-DISCOVER-CONFIGS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</MACHINE-DESIGN>"
            } else if (data.parent == constant.EthernetCluster_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<ETHERNET-CLUSTER UUID="' + state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].conditional.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ETHERNET-CLUSTER-VARIANTS>"
                    state.SAHLProject[state.openProjectIndex].Machine.EthernetCluster[data.idx].conditional.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<ETHERNET-CLUSTER-CONDITIONAL>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<PROTOCOL-NAME>" + ele.name + "</PROTOCOL-NAME>"
                        }
                        if (ele.version != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<PROTOCOL-VERSION>" + ele.version + "</PROTOCOL-VERSION>"
                        }
                        if (ele.channel != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<PHYSICAL-CHANNELS>"
                            ele.channel.forEach(channel => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<ETHERNET-PHYSICAL-CHANNEL>"
                                if (channel.name != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<SHORT-NAME>" + channel.name + "</SHORT-NAME>"
                                }
                                if (channel.comconnect.length > 0) {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<COMM-CONNECTORS>"
                                    channel.comconnect.forEach(com => {
                                        saveStr += getters.getEndterStr(elementTab + 5)
                                        saveStr += "<COMMUNICATION-CONNECTOR-REF-CONDITIONAL>"
                                        if (com.connector != null) {
                                            saveStr += getters.getEndterStr(elementTab + 6)
                                            saveStr += '<COMMUNICATION-CONNECTOR-REF DEST="ETHERNET-COMMUNICATION-CONNECTOR">' + com.connector + "</COMMUNICATION-CONNECTOR-REF>"
                                        }
                                        saveStr += getters.getEndterStr(elementTab + 5)
                                        saveStr += "</COMMUNICATION-CONNECTOR-REF-CONDITIONAL>"
                                    })
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "</COMM-CONNECTORS>"
                                }
                                if (channel.endpoint.length > 0) {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<NETWORK-ENDPOINTS>"
                                    channel.endpoint.forEach(endpoint => {
                                        saveStr += getters.getEndterStr(elementTab + 5)
                                        saveStr += "<NETWORK-ENDPOINT>"
                                        if (endpoint.name != '') {
                                            saveStr += getters.getEndterStr(elementTab + 6)
                                            saveStr += "<SHORT-NAME>" + endpoint.name + "</SHORT-NAME>"
                                        }
                                        if (endpoint.domainname != '') {
                                            saveStr += getters.getEndterStr(elementTab + 6)
                                            saveStr += "<FULLY-QUALIFIED-DOMAIN-NAME>" + endpoint.domainname + "</FULLY-QUALIFIED-DOMAIN-NAME>"
                                        }
                                        if (endpoint.ip4address.length > 0 || endpoint.ip6address.length > 0) {
                                            saveStr += getters.getEndterStr(elementTab + 6)
                                            saveStr += "<NETWORK-ENDPOINT-ADDRESSES>"
                                        }
                                        if (endpoint.ip4address.length > 0) {
                                            endpoint.ip4address.forEach(ip4 => {
                                                saveStr += getters.getEndterStr(elementTab + 7)
                                                saveStr += "<IPV-4-CONFIGURATION>"
                                                if (ip4.gateway != '') {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<DEFAULT-GATEWAY>" + ip4.gateway + "</DEFAULT-GATEWAY>"
                                                }
                                                if (ip4.DNSAddr != '') {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<DNS-SERVER-ADDRESSES>"
                                                    saveStr += getters.getEndterStr(elementTab + 9)
                                                    saveStr += "<DNS-SERVER-ADDRESS>" + ip4.DNSAddr + "</DNS-SERVER-ADDRESS>"
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "</DNS-SERVER-ADDRESSES>"
                                                }
                                                if (ip4.behavior != null) {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<IP-ADDRESS-KEEP-BEHAVIOR>" + ip4.behavior + "</IP-ADDRESS-KEEP-BEHAVIOR>"
                                                }
                                                if (ip4.address != '') {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<IPV-4-ADDRESS>" + ip4.address + "</IPV-4-ADDRESS>"
                                                }
                                                if (ip4.addresssorce != null) {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<IPV-4-ADDRESS-SOURCE>" + ip4.addresssorce + "</IPV-4-ADDRESS-SOURCE>"
                                                }
                                                if (ip4.mask != '') {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<NETWORK-MASK>" + ip4.mask + "</NETWORK-MASK>"
                                                }
                                                if (ip4.ttl != '') {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<TTL>" + ip4.ttl + "</TTL>"
                                                }
                                                saveStr += getters.getEndterStr(elementTab + 7)
                                                saveStr += "</IPV-4-CONFIGURATION>"
                                            })
                                        }
                                        if (endpoint.ip6address.length > 0) {
                                            endpoint.ip6address.forEach(ip6 => {
                                                saveStr += getters.getEndterStr(elementTab + 7)
                                                saveStr += "<IPV-6-CONFIGURATION>"
                                                if (ip6.priority != '') {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<ASSIGNMENT-PRIORITY>" + ip6.priority + "</ASSIGNMENT-PRIORITY>"
                                                }
                                                if (ip6.behavior != null) {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<IP-ADDRESS-KEEP-BEHAVIOR>" + ip6.behavior + "</IP-ADDRESS-KEEP-BEHAVIOR>"
                                                }
                                                if (ip6.prelength != '') {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<IP-ADDRESS-PREFIX-LENGTH>" + ip6.prelength + "</IP-ADDRESS-PREFIX-LENGTH>"
                                                }
                                                if (ip6.address != '') {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<IPV-6-ADDRESS>" + ip6.address + "</IPV-6-ADDRESS>"
                                                }
                                                if (ip6.addresssource != null) {
                                                    saveStr += getters.getEndterStr(elementTab + 8)
                                                    saveStr += "<IPV-6-ADDRESS-SOURCE>" + ip6.addresssource + "</IPV-6-ADDRESS-SOURCE>"
                                                }
                                                saveStr += getters.getEndterStr(elementTab + 7)
                                                saveStr += "</IPV-6-CONFIGURATION>"
                                            })

                                        }
                                        if (endpoint.ip4address.length > 0 || endpoint.ip6address.length > 0) {
                                            saveStr += getters.getEndterStr(elementTab + 6)
                                            saveStr += "</NETWORK-ENDPOINT-ADDRESSES>"
                                        }
                                        if (endpoint.priority != '') {
                                            saveStr += getters.getEndterStr(elementTab + 6)
                                            saveStr += "<PRIORITY>" + endpoint.priority + "</PRIORITY>"
                                        }
                                        saveStr += getters.getEndterStr(elementTab + 5)
                                        saveStr += "</NETWORK-ENDPOINT>"
                                    })
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "</NETWORK-ENDPOINTS>"
                                }
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "</ETHERNET-PHYSICAL-CHANNEL>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</PHYSICAL-CHANNELS>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</ETHERNET-CLUSTER-CONDITIONAL>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ETHERNET-CLUSTER-VARIANTS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</ETHERNET-CLUSTER>"
            } else if (data.parent == constant.ModeDeclarationGroup_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<MODE-DECLARATION-GROUP UUID="' + state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].initmode != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<INITIAL-MODE-REF DEST="MODE-DECLARATION">' + state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].path + '/' + state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].name + '/' + state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].initmode + "</INITIAL-MODE-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].modedeclaration.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<MODE-DECLARATIONS>"
                    state.SAHLProject[state.openProjectIndex].Machine.ModeDeclarationGroup[data.idx].modedeclaration.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MODE-DECLARATION>"
                        saveStr += getters.getEndterStr(elementTab + 2)
                        saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        if (ele.value != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<VALUE>" + ele.value + "</VALUE>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</MODE-DECLARATION>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</MODE-DECLARATIONS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</MODE-DECLARATION-GROUP>"
            } else if (data.parent == constant.HWElement_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<HW-ELEMENT UUID="' + state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].category != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<HW-CATEGORY-REFS>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '<HW-CATEGORY-REF DEST="HW-CATEGORY">' + state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].category + "</HW-CATEGORY-REF>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</HW-CATEGORY-REFS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].attribute.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<HW-ATTRIBUTE-VALUES>"
                    state.SAHLProject[state.openProjectIndex].Machine.HWElement[data.idx].attribute.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<HW-ATTRIBUTE-VALUE>"
                        if (ele.attr != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<HW-ATTRIBUTE-DEF-REF DEST="HW-ATTRIBUTE-DEF">' + ele.attr + "</HW-ATTRIBUTE-DEF-REF>"
                        }
                        if (ele.vt != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<VT>" + ele.vt + "</VT>"
                        }
                        if (ele.v != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<V>" + ele.v + "</V>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</HW-ATTRIBUTE-VALUE>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</HW-ATTRIBUTE-VALUES>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</HW-ELEMENT>"
            } else if (data.parent == constant.HWCategory_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<HW-CATEGORY UUID ="' + state.SAHLProject[state.openProjectIndex].Machine.HWCategory[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Machine.HWCategory[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Machine.HWCategory[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Machine.HWCategory[data.idx].attribute.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<HW-ATTRIBUTE-DEFS>"
                    state.SAHLProject[state.openProjectIndex].Machine.HWCategory[data.idx].attribute.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<HW-ATTRIBUTE-DEF>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.category != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<CATEGORY>" + ele.category + "</CATEGORY>"
                        }
                        if (ele.isrequired != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<IS-REQUIRED>' + ele.isrequired.toUpperCase() + "</IS-REQUIRED>"
                        }
                        if (ele.literal != '') {
                            var literals = ele.literal.split('/')
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<HW-ATTRIBUTE-LITERALS>"
                            literals.forEach(item => {
                                if (item != '') {
                                    saveStr += getters.getEndterStr(elementTab + 3)
                                    saveStr += '<HW-ATTRIBUTE-LITERAL-DEF>'
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += '<SHORT-NAME>' + item + "</SHORT-NAME>"
                                    saveStr += getters.getEndterStr(elementTab + 3)
                                    saveStr += "</HW-ATTRIBUTE-LITERAL-DEF>"
                                }
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</HW-ATTRIBUTE-LITERALS>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</HW-ATTRIBUTE-DEF>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</HW-ATTRIBUTE-DEFS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</HW-CATEGORY>"
            } else if (data.parent == constant.ProcesstoMachineMapping_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PROCESS-TO-MACHINE-MAPPING-SET UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].mapping.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PROCESS-TO-MACHINE-MAPPINGS>"
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProtoMachineMapping[data.idx].mapping.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PROCESS-TO-MACHINE-MAPPING>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHOET-NAME>"
                        }
                        if (ele.ptmmMachine != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MACHINE-REF DEST="MACHINE">' + ele.ptmmMachine + "</MACHINE-REF>"
                        }
                        if (ele.ptmmProcess != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<PROCESS-REF DEST="PROCESS">' + ele.ptmmProcess + '<PROCESS-REF>'
                        }
                        if (ele.runon.length > 0) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHALL-RUN-ON-REFS>"
                            ele.runon.forEach(run => {
                                if (run.shall != null) {
                                    saveStr += getters.getEndterStr(elementTab + 3)
                                    saveStr += '<SHALL-NOT-RUN-ON-REF DEST="PROCESSOR-CORE">' + run.shall + "</SHALL-NOT-RUN-ON-REF>"
                                }
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</SHALL-RUN-ON-REFS>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PROCESS-TO-MACHINE-MAPPING>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PROCESS-TO-MACHINE-MAPPINGS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PROCESS-TO-MACHINE-MAPPING-SET>"
            } else if (data.parent == constant.SWComponents_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<ADAPTIVE-APPLICATION-SW-COMPONENT-TYPE UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].pport.length > 0 ||
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].rport.length > 0 ||
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].prport.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PORTS>"
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].pport.length > 0) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].pport.forEach(ele => {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += "<P-PORT-PROTOTYPE>"
                            if (ele.name != '') {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.interface != null) {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                if (ele.selectI == 'SERVICE-INTERFACE') {
                                    saveStr += '<PROVIDED-INTERFACE-TREF DEST="SERVICE-INTERFACE">' + ele.interface + "</PROVIDED-INTERFACE-TREF>"
                                } else if (ele.selectI == 'PHM-RECOVERY-ACTION-INTERFACE') {
                                    saveStr += '<PROVIDED-INTERFACE-TREF DEST="PHM-RECOVERY-ACTION-INTERFACE">' + ele.interface + "</PROVIDED-INTERFACE-TREF>"
                                }
                            }
                            if (ele.queued.length > 0 || ele.field.length > 0 || ele.server.length > 0) {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "<PROVIDED-COM-SPECS>"
                                if (ele.queued.length > 0) {
                                    ele.queued.forEach(que => {
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "<QUEUED-SENDER-COM-SPEC>"
                                        if (que.dataE != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<DATA-ELEMENT-REF DEST="VARIABLE-DATA-PROTOTYPE">' + que.dataE + "</DATA-ELEMENT-REF>"
                                        }
                                        if (que.senderCapa != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<SENDER-CAPABILITY>' + que.senderCapa + "</SENDER-CAPABILITY>"
                                        }
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "</QUEUED-SENDER-COM-SPEC>"
                                    })
                                }
                                if (ele.field.length > 0) {
                                    ele.field.forEach(fie => {
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "<FIELD-SENDER-COM-SPEC>"
                                        if (fie.dataE != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<DATA-ELEMENT-REF DEST="FIELD">' + fie.dataE + "</DATA-ELEMENT-REF>"
                                        }
                                        if (fie.senderCapa != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<SENDER-CAPABILITY>' + fie.senderCapa + "</SENDER-CAPABILITY>"
                                        }
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "</FIELD-SENDER-COM-SPEC>"
                                    })
                                }
                                if (ele.server.length > 0) {
                                    ele.server.forEach(ser => {
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "<SERVER-COM-SPEC>"
                                        if (ser.oper != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<OPERATION-REF DEST="CLIENT-SERVER-OPERATION">' + ser.oper + "</OPERATION-REF>"
                                        }
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "</SERVER-COM-SPEC>"
                                    })
                                }
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "</PROVIDED-COM-SPECS>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += "</P-PORT-PROTOTYPE>"
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].rport.length > 0) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].rport.forEach(ele => {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += "<R-PORT-PROTOTYPE>"
                            if (ele.name != '') {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.interface != null) {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                if (ele.selectI == 'SERVICE-INTERFACE') {
                                    saveStr += '<REQUIRED-INTERFACE-TREF DEST="SERVICE-INTERFACE">' + ele.interface + "</REQUIRED-INTERFACE-TREF>"
                                } else if (ele.selectI == 'PHM-HEALTH-CHANNEL-INTERFACE') {
                                    saveStr += '<REQUIRED-INTERFACE-TREF DEST="PHM-HEALTH-CHANNEL-INTERFACE">' + ele.interface + "</REQUIRED-INTERFACE-TREF>"
                                } else if (ele.selectI == 'PHM-SUPERVISED-ENTITY-INTERFACE') {
                                    saveStr += '<REQUIRED-INTERFACE-TREF DEST="PHM-SUPERVISED-ENTITY-INTERFACE">' + ele.interface + "</REQUIRED-INTERFACE-TREF>"
                                }
                            }
                            if (ele.queued.length > 0 || ele.client.length > 0) {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "<REQUIRED-COM-SPECS>"
                                if (ele.queued.length > 0) {
                                    ele.queued.forEach(que => {
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "<QUEUED-RECEIVER-COM-SPEC>"
                                        if (que.dataE != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            if (que.select == "VARIABLE-DATA-PROTOTYPE") {
                                                saveStr += '<DATA-ELEMENT-REF DEST="VARIABLE-DATA-PROTOTYPE">' + que.dataE + "</DATA-ELEMENT-REF>"
                                            } else if (que.select == "FIELD") {
                                                saveStr += '<DATA-ELEMENT-REF DEST="FIELD">' + que.dataE + "</DATA-ELEMENT-REF>"
                                            }
                                        }
                                        if (que.receiveCapa != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<RECEIVER-CAPABILITY>' + que.receiveCapa + "</RECEIVER-CAPABILITY>"
                                        }
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "</QUEUED-RECEIVER-COM-SPEC>"
                                    })
                                }
                                if (ele.client.length > 0) {
                                    ele.client.forEach(cl => {
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "<CLIENT-COM-SPEC>"
                                        if (cl.operation != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<OPERATION-REF DEST="CLIENT-SERVER-OPERATION">' + cl.operation + "</OPERATION-REF>"
                                        }
                                        if (cl.clientCapa != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<CLIENT-CAPABILITY>' + cl.clientCapa + "</CLIENT-CAPABILITY>"
                                        }
                                        if (cl.getter != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<GETTER-REF DEST="FIELD">' + cl.getter + "</GETTER-REF>"
                                        }
                                        if (cl.setter != null) {
                                            saveStr += getters.getEndterStr(elementTab + 4)
                                            saveStr += '<SETTER-REF DEST="FIELD">' + cl.setter + "</SETTER-REF>"
                                        }
                                        saveStr += getters.getEndterStr(elementTab + 3)
                                        saveStr += "</CLIENT-COM-SPEC>"
                                    })
                                }
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "</REQUIRED-COM-SPECS>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += "</R-PORT-PROTOTYPE>"
                        })
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].prport.length > 0) {
                        state.SAHLProject[state.openProjectIndex].AdaptiveApplication.SWComponents[data.idx].prport.forEach(ele => {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += "<PR-PORT-PROTOTYPE>"
                            if (ele.name != '') {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                            }
                            if (ele.interface != null) {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                if (ele.selectI == 'SERVICE-INTERFACE') {
                                    saveStr += '<PROVIDED-REQUIRED-INTERFACE-TREF DEST="SERVICE-INTERFACE">' + ele.interface + "</PROVIDED-REQUIRED-INTERFACE-TREF>"
                                } else if (ele.selectI == 'PERSISTENCY-FILE-PROXY-INTERFACE') {
                                    saveStr += '<PROVIDED-REQUIRED-INTERFACE-TREF DEST="PERSISTENCY-FILE-PROXY-INTERFACE">' + ele.interface + "</PROVIDED-REQUIRED-INTERFACE-TREF>"
                                } else if (ele.selectI == 'PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE') {
                                    saveStr += '<PROVIDED-REQUIRED-INTERFACE-TREF DEST="PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE">' + ele.interface + "</PROVIDED-REQUIRED-INTERFACE-TREF>"
                                }
                            }
                            if (ele.provide.length > 0) {
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "<PROVIDED-COM-SPECS>"
                                ele.provide.forEach(pro => {
                                    saveStr += getters.getEndterStr(elementTab + 3)
                                    saveStr += "<PERSISTENCY-DATA-PROVIDED-COM-SPEC>"
                                    if (pro.dataE != null) {
                                        saveStr += getters.getEndterStr(elementTab + 4)
                                        saveStr += '<DATA-ELEMENT-REF DEST="PERSISTENCY-DATA-ELEMENT">' + pro.dataE + "</DATA-ELEMENT-REF>"
                                    }
                                    saveStr += getters.getEndterStr(elementTab + 3)
                                    saveStr += "</PERSISTENCY-DATA-PROVIDED-COM-SPEC>"
                                })
                                saveStr += getters.getEndterStr(elementTab + 2)
                                saveStr += "</PROVIDED-COM-SPECS>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += "</PR-PORT-PROTOTYPE>"
                        })
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PORTS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</ADAPTIVE-APPLICATION-SW-COMPONENT-TYPE>"
            } else if (data.parent == constant.Process_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PROCESS UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].prodesign != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<DESIGN-REF DEST="PROCESS-DESIGN">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].prodesign + "</DESIGN-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].determin != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<DETERMINISTIC-CLIENT-REF DEST="DETERMINISTIC-CLIENT">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].determin + "</DETERMINISTIC-CLIENT-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].execut != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<EXECUTABLE-REF DEST="EXECUTABLE">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].execut + "</EXECUTABLE-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logLevel != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<LOG-TRACE-DEFAULT-LOG-LEVEL>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logLevel + "</LOG-TRACE-DEFAULT-LOG-LEVEL>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logPath != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<LOG-TRACE-FILE-PATH>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logPath + "</LOG-TRACE-FILE-PATH>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logMode.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<LOG-TRACE-LOG-MODES>'
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logMode.forEach(mode => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<LOG-TRACE-LOG-MODE>' + mode + '</LOG-TRACE-LOG-MODE>'
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '</LOG-TRACE-LOG-MODES>'
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logProDesc != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<LOG-TRACE-PROCESS-DESC>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logProDesc + "</LOG-TRACE-PROCESS-DESC>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logProID != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<LOG-TRACE-PROCESS-ID>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].logProID + "</LOG-TRACE-PROCESS-ID>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].restart != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<NUMBER-OF-RESTART-ATTEMPTS>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].restart + "</NUMBER-OF-RESTART-ATTEMPTS>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].preMapping != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PRE-MAPPING>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].preMapping.toUpperCase() + "</PRE-MAPPING>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinname != '' ||
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinetype != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PROCESS-STATE-MACHINE>"
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinname != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinname + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinetype != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<TYPE-TREF DEST="MODE-DECLARATION-GROUP">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].machinetype + "</TYPE-TREF>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PROCESS-STATE-MACHINE>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].dependent.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<STATE-DEPENDENT-STARTUP-CONFIGS>"
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Process[data.idx].dependent.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<STATE-DEPENDENT-STARTUP-CONFIG>"
                        if (ele.exection.length > 0) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<EXECUTION-DEPENDENCYS>"
                            ele.exection.forEach(fun => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<EXECUTION-DEPENDENCY>"
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "<PROCESS-STATE-IREF>"
                                if (fun.contextMode != null) {
                                    saveStr += getters.getEndterStr(elementTab + 5)
                                    saveStr += '<CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF DEST="MODE-DECLARATION-GROUP-PROTOTYPE">' + fun.contextMode + "</CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF>"
                                }
                                if (fun.targetMode != null) {
                                    saveStr += getters.getEndterStr(elementTab + 5)
                                    saveStr += '<TARGET-MODE-DECLARATION-REF DEST="MODE-DECLARATION">' + fun.targetMode + "</TARGET-MODE-DECLARATION-REF>"
                                }
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "</PROCESS-STATE-IREF>"
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "</EXECUTION-DEPENDENCY>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</EXECUTION-DEPENDENCYS>"
                        }
                        if (ele.functionItem.length > 0) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<FUNCTION-GROUP-STATE-IREFS>"
                            ele.functionItem.forEach(fun => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<FUNCTION-GROUP-STATE-IREF>"
                                if (fun.contextMode != null) {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += '<CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF DEST="MODE-DECLARATION-GROUP-PROTOTYPE">' + fun.contextMode + "</CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF>"
                                }
                                if (fun.targetMode != null) {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += '<TARGET-MODE-DECLARATION-REF DEST="MODE-DECLARATION">' + fun.targetMode + "</TARGET-MODE-DECLARATION-REF>"
                                }
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "</FUNCTION-GROUP-STATE-IREF>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</FUNCTION-GROUP-STATE-IREFS>"
                        }
                        if (ele.resourceRef != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<RESOURCE-GROUP-REF DEST="RESOURCE-GROUP">' + ele.resourceRef + "</RESOURCE-GROUP-REF>"
                        }
                        if (ele.startupConfigRef != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<STARTUP-CONFIG-REF DEST="STARTUP-CONFIG">' + ele.startupConfigRef + "</STARTUP-CONFIG-REF>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</STATE-DEPENDENT-STARTUP-CONFIG>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</STATE-DEPENDENT-STARTUP-CONFIGS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PROCESS>"
            } else if (data.parent == constant.ProcessDesign_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PROCESS-DESIGN UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].executableref != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<EXECUTABLE-REF DEST="EXECUTABLE">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].executableref + "</EXECUTABLE-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].determin.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<DETERMINISTIC-CLIENT-RESOURCE-NEEDSS>"
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.ProcessDesign[data.idx].determin.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<DETERMINISTIC-CLIENT-RESOURCE-NEEDS>"
                        if (ele.swname != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.swname + "</SHORT-NAME>"
                        }
                        if (ele.hardwareP != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<HARDWARE-PLATFORM>" + ele.hardwareP + "</HARDWARE-PLATFORM>"
                        }
                        if (ele.initnofinstruction != '' || ele.initsequentialbegin != '' || ele.initsequentialend != '' || ele.initspeedup != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<INIT-RESOURCE>"
                            if (ele.initnofinstruction != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<NUMBER-OF-INSTRUCTIONS>" + ele.initnofinstruction + "</NUMBER-OF-INSTRUCTIONS>"
                            }
                            if (ele.initsequentialbegin != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEQUENTIAL-INSTRUCTIONS-BEGIN>" + ele.initsequentialbegin + "</SEQUENTIAL-INSTRUCTIONS-BEGIN>"
                            }
                            if (ele.initsequentialend != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEQUENTIAL-INSTRUCTIONS-END>" + ele.initsequentialend + "</SEQUENTIAL-INSTRUCTIONS-END>"
                            }
                            if (ele.initspeedup != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SPEEDUP>" + ele.initspeedup + "</SPEEDUP>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</INIT-RESOURCE>"
                        }
                        if (ele.runnofinstruction != '' || ele.runsequentialbegin != '' || ele.runsequentialend != '' || ele.runspeedup != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<RUN-RESOURCE>"
                            if (ele.runnofinstruction != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<NUMBER-OF-INSTRUCTIONS>" + ele.runnofinstruction + "</NUMBER-OF-INSTRUCTIONS>"
                            }
                            if (ele.runsequentialbegin != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEQUENTIAL-INSTRUCTIONS-BEGIN>" + ele.runsequentialbegin + "</SEQUENTIAL-INSTRUCTIONS-BEGIN>"
                            }
                            if (ele.runsequentialend != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEQUENTIAL-INSTRUCTIONS-END>" + ele.runsequentialend + "</SEQUENTIAL-INSTRUCTIONS-END>"
                            }
                            if (ele.runspeedup != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SPEEDUP>" + ele.runspeedup + "</SPEEDUP>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</RUN-RESOURCE>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</DETERMINISTIC-CLIENT-RESOURCE-NEEDS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</DETERMINISTIC-CLIENT-RESOURCE-NEEDSS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PROCESS-DESIGN>"
            } else if (data.parent == constant.Executable_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<EXECUTABLE UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].category != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].category + "</CATEGORY>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].buildType != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<BUILD-TYPE>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].buildType + "</BUILD-TYPE>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].loggingBehabior != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<LOGGING-BEHAVIOR>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].loggingBehabior + "</LOGGING-BEHAVIOR>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].reportingBehabior != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REPORTING-BEHAVIOR>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].reportingBehabior + "</REPORTING-BEHAVIOR>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].version != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<VERSION>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].version + "</VERSION>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].swname != '' ||
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].applicationtyperef != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ROOT-SW-COMPONENT-PROTOTYPE>"
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].swname != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].swname + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].applicationtyperef != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<APPLICATION-TYPE-TREF DEST="ADAPTIVE-APPLICATION-SW-COMPONENT-TYPE">' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.Executable[data.idx].applicationtyperef + "</APPLICATION-TYPE-TREF>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ROOT-SW-COMPONENT-PROTOTYPE>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</EXECUTABLE>"
            } else if (data.parent == constant.StartupConfig_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<STARTUP-CONFIG-SET UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].config.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<STARTUP-CONFIGS>"
                    state.SAHLProject[state.openProjectIndex].AdaptiveApplication.StartupConfig[data.idx].config.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<STARTUP-CONFIG>"
                        if (ele.configname != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.configname + "</SHORT-NAME>"
                        }
                        if (ele.policy != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SCHEDULING-POLICY>" + ele.policy + "</SCHEDULING-POLICY>"
                        }
                        if (ele.priority != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SCHEDULING-PRIORITY>" + ele.priority + "</SCHEDULING-PRIORITY>"
                        }
                        if (ele.entertimeout != '' || ele.exittimeout != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<TIMEOUT>"
                            if (ele.entertimeout != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<ENTER-TIMEOUT-VALUE>" + ele.entertimeout + "</ENTER-TIMEOUT-VALUE>"
                            }
                            if (ele.exittimeout != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<EXIT-TIMEOUT-VALUE>" + ele.exittimeout + "</EXIT-TIMEOUT-VALUE>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</TIMEOUT>"
                        }
                        if (ele.option.length > 0) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<STARTUP-OPTIONS>"
                            ele.option.forEach(item => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<STARTUP-OPTION>"
                                if (item.arg != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<OPTION-ARGUMENT>" + item.arg + "</OPTION-ARGUMENT>"
                                }
                                if (item.kind != null) {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<OPTION-KIND>" + item.kind + "</OPTION-KIND>"
                                }
                                if (item.name != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<OPTION-KIND>" + item.name + "</OPTION-KIND>"
                                }
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "</STARTUP-OPTION>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</STARTUP-OPTIONS>"
                        }
                        if (ele.environ.length > 0) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<ENVIRONMENT-VARIABLES>"
                            ele.environ.forEach(item => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<TAG-WITH-OPTIONAL-VALUE>"
                                if (item.key != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<KEY>" + item.key + "</KEY>"
                                }
                                if (item.value != '') {
                                    saveStr += getters.getEndterStr(elementTab + 4)
                                    saveStr += "<VALUE>" + item.value + "</VALUE>"
                                }
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "</TAG-WITH-OPTIONAL-VALUE>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</ENVIRONMENT-VARIABLES>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</STARTUP-CONFIG>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</STARTUP-CONFIGS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</STARTUP-CONFIG-SET>"
            } else if (data.parent == constant.DeterministicClient_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<DETERMINISTIC-CLIENT UUID="' + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].cycletiem != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CYCLE-TIME-VALUE>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].cycletiem + "</CYCLE-TIME-VALUE>"
                }
                if (state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].numofworkers != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<NUMBER-OF-WORKERS>" + state.SAHLProject[state.openProjectIndex].AdaptiveApplication.DeterministicClient[data.idx].numofworkers + "</NUMBER-OF-WORKERS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</DETERMINISTIC-CLIENT>"
            } else if (data.parent == constant.SomeIPServiceInterfaceDeployment_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SOMEIP-SERVICE-INTERFACE-DEPLOYMENT UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].service != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SERVICE-INTERFACE-REF DEST="SERVICE-INTERFACE">' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].service + "</SERVICE-INTERFACE-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].majversion != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].minversion != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SERVICE-INTERFACE-VERSION>"
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].majversion != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MAJOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].majversion + "</MAJOR-VERSION>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].minversion != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MINOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].minversion + "</MINOR-VERSION>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</SERVICE-INTERFACE-VERSION>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].id != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SERVICE-INTERFACE-ID>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].id + "</SERVICE-INTERFACE-ID>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].eventG.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<EVENT-GROUPS>"
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].eventG.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-EVENT-GROUP>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.idG != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<EVENT-GROUP-ID>" + ele.idG + "</EVENT-GROUP-ID>"
                        }
                        if (ele.event != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<EVENT-REFS>"
                            ele.event.forEach(item => {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<EVENT-REF DEST="SOMEIP-EVENT-DEPLOYMENT">' + item.event + "</EVENT-REF>"
                            })
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</EVENT-REFS>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-EVENT-GROUP>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</EVENT-GROUPS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].eventD.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<EVENT-DEPLOYMENTS>"
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].eventD.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-EVENT-DEPLOYMENT>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.event != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<EVENT-REF DEST="VARIABLE-DATA-PROTOTYPE">' + ele.event + "</EVENT-REF>"
                        }
                        if (ele.idE != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<EVENT-ID>" + ele.idE + "</EVENT-ID>"
                        }
                        if (ele.maxlength != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MAXIMUM-SEGMENT-LENGTH>" + ele.maxlength + "</MAXIMUM-SEGMENT-LENGTH>"
                        }
                        if (ele.time != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SEPARATION-TIME>" + ele.time + "</SEPARATION-TIME>"
                        }
                        if (ele.serializer != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SERIALIZER>' + ele.serializer + "</SERIALIZER>"
                        }
                        if (ele.protocal != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<TRANSPORT-PROTOCOL>' + ele.protocal + "</TRANSPORT-PROTOCOL>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-EVENT-DEPLOYMENT>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</EVENT-DEPLOYMENTS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].methodD.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<METHOD-DEPLOYMENTS>"
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].methodD.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-METHOD-DEPLOYMENT>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.method != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<METHOD-REF DEST="CLIENT-SERVER-OPERATION">' + ele.method + "</METHOD-REF>"
                        }
                        if (ele.idM != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<METHOD-ID>" + ele.idM + "</METHOD-ID>"
                        }
                        if (ele.maxrequest != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MAXIMUM-SEGMENT-LENGTH-REQUEST>" + ele.maxrequest + "</MAXIMUM-SEGMENT-LENGTH-REQUEST>"
                        }
                        if (ele.maxresponse != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MAXIMUM-SEGMENT-LENGTH-RESPONSE>" + ele.maxresponse + "</MAXIMUM-SEGMENT-LENGTH-RESPONSE>"
                        }
                        if (ele.timerequest != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SEPARATION-TIME-REQUEST>" + ele.timerequest + "</SEPARATION-TIME-REQUEST>"
                        }
                        if (ele.timeresponse != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SEPARATION-TIME-RESPONSE>" + ele.timeresponse + "</SEPARATION-TIME-RESPONSE>"
                        }
                        if (ele.protocal != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<TRANSPORT-PROTOCOL>' + ele.protocal + "</TRANSPORT-PROTOCOL>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-METHOD-DEPLOYMENT>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</METHOD-DEPLOYMENTS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].fieldD.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<FIELD-DEPLOYMENTS>"
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInterfaceDeployment[data.idx].fieldD.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-FIELD-DEPLOYMENT>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.field != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<FIELD-REF DEST="FIELD">' + ele.field + "</FIELD-REF>"
                        }
                        if (ele.getname != '' || ele.getid != '' || ele.getmaxreq != '' ||
                            ele.getmaxres != '' || ele.gettimereq != '' || ele.gettimeres != '' || ele.getproto != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<GET>"
                            if (ele.getname != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SHORT-NAME>" + ele.getname + "</SHORT-NAME>"
                            }
                            if (ele.getid != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<METHOD-ID>" + ele.getid + "</METHOD-ID>"
                            }
                            if (ele.getmaxreq != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<MAXIMUM-SEGMENT-LENGTH-REQUEST>" + ele.getmaxreq + "</MAXIMUM-SEGMENT-LENGTH-REQUEST>"
                            }
                            if (ele.getmaxres != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<MAXIMUM-SEGMENT-LENGTH-RESPONSE>" + ele.getmaxres + "</MAXIMUM-SEGMENT-LENGTH-RESPONSE>"
                            }
                            if (ele.gettimereq != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEPARATION-TIME-REQUEST>" + ele.gettimereq + "</SEPARATION-TIME-REQUEST>"
                            }
                            if (ele.gettimeres != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEPARATION-TIME-RESPONSE>" + ele.gettimeres + "</SEPARATION-TIME-RESPONSE>"
                            }
                            if (ele.getproto != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<TRANSPORT-PROTOCOL>' + ele.getproto + "</TRANSPORT-PROTOCOL>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</GET>"
                        }
                        if (ele.setname != '' || ele.setid != '' || ele.setmaxreq != '' ||
                            ele.setmaxres != '' || ele.settimereq != '' || ele.settimeres != '' || ele.setproto != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SET>"
                            if (ele.setname != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SHORT-NAME>" + ele.setname + "</SHORT-NAME>"
                            }
                            if (ele.setid != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<METHOD-ID>" + ele.setid + "</METHOD-ID>"
                            }
                            if (ele.setmaxreq != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<MAXIMUM-SEGMENT-LENGTH-REQUEST>" + ele.setmaxreq + "</MAXIMUM-SEGMENT-LENGTH-REQUEST>"
                            }
                            if (ele.setmaxres != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<MAXIMUM-SEGMENT-LENGTH-RESPONSE>" + ele.setmaxres + "</MAXIMUM-SEGMENT-LENGTH-RESPONSE>"
                            }
                            if (ele.settimereq != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEPARATION-TIME-REQUEST>" + ele.settimereq + "</SEPARATION-TIME-REQUEST>"
                            }
                            if (ele.settimeres != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEPARATION-TIME-RESPONSE>" + ele.settimeres + "</SEPARATION-TIME-RESPONSE>"
                            }
                            if (ele.setproto != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<TRANSPORT-PROTOCOL>' + ele.setproto + "</TRANSPORT-PROTOCOL>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</SET>"
                        }
                        if (ele.notname != '' || ele.notid != '' || ele.notmax != '' ||
                            ele.nottime != '' || ele.notserial != null || ele.notproto != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<NOTIFIER>"
                            if (ele.notname != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SHORT-NAME>" + ele.notname + "</SHORT-NAME>"
                            }
                            if (ele.notid != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<EVENT-ID>" + ele.notid + "</EVENT-ID>"
                            }
                            if (ele.notmax != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<MAXIMUM-SEGMENT-LENGTH>" + ele.notmax + "</MAXIMUM-SEGMENT-LENGTH>"
                            }
                            if (ele.nottime != '') {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SEPARATION-TIME>" + ele.nottime + "</SEPARATION-TIME>"
                            }
                            if (ele.notserial != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<SERIALIZER>" + ele.notserial + "</SERIALIZER>"
                            }
                            if (ele.notproto != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<TRANSPORT-PROTOCOL>' + ele.notproto + "</TRANSPORT-PROTOCOL>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</NOTIFIER>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-FIELD-DEPLOYMENT>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</FIELD-DEPLOYMENTS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SOMEIP-SERVICE-INTERFACE-DEPLOYMENT>"
            } else if (data.parent == constant.ServiceInterface_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SERVICE-INTERFACE UUID="' + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].name != '') {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].majversion != '') {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<MAJOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].majversion + "</MAJOR-VERSION>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].minversion != '') {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<MINOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].minversion + "</MINOR-VERSION>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].namespace != '') {
                    namespace = state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].namespace.split(',')
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<NAMESPACES>"
                    namespace.forEach((ele, e) => {
                        if (!(ele == '' && e == namespace.length - 1)) {
                            var symbol = ele.split('/')
                            saveStr += getters.getEndterStr(enterLine + 1)
                            saveStr += "<SYMBOL-PROPS>"
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<SHORT-NAME>" + symbol[0] + "</SHORT-NAME>"
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<SYMBOL>" + symbol[1] + "</SYMBOL>"
                            saveStr += getters.getEndterStr(enterLine + 1)
                            saveStr += "</SYMBOL-PROPS>"
                        }
                    })
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</NAMESPACES>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].isservice != null) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<IS-SERVICE>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].isservice.toUpperCase() + "</IS-SERVICE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].events.length > 0) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<EVENTS>"
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].events.forEach(ele => {
                        saveStr += getters.getEndterStr(enterLine + 1)
                        saveStr += "<VARIABLE-DATA-PROTOTYPE>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.type != null) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += '<TYPE-TREF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + ele.type + "</TYPE-TREF>"
                        }
                        saveStr += getters.getEndterStr(enterLine + 1)
                        saveStr += "</VARIABLE-DATA-PROTOTYPE>"
                    })
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</EVENTS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].fields.length > 0) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<FIELDS>"
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].fields.forEach(ele => {
                        saveStr += getters.getEndterStr(enterLine + 1)
                        saveStr += "<FIELD>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.type != null) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += '<TYPE-TREF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + ele.type + "</TYPE-TREF>"
                        }
                        if (ele.getter != null) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<HAS-GETTER>" + ele.getter.toUpperCase() + "</HAS-GETTER>"
                        }
                        if (ele.setter != null) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<HAS-SETTER>" + ele.setter.toUpperCase() + "</HAS-SETTER>"
                        }
                        if (ele.notifier != null) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<HAS-NOTIFIER>" + ele.notifier.toUpperCase() + "</HAS-NOTIFIER>"
                        }
                        saveStr += getters.getEndterStr(enterLine + 1)
                        saveStr += "</FIELD>"
                    })
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</FIELDS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].methods.length > 0) {
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "<METHODS>"
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInterface[data.idx].methods.forEach(ele => {
                        saveStr += getters.getEndterStr(enterLine + 1)
                        saveStr += "<CLIENT-SERVER-OPERATION>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.fireforget != null) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<FIRE-AND-FORGET>" + ele.fireforget.toUpperCase() + "</FIRE-AND-FORGET>"
                        }
                        if (ele.argument.length > 0) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<ARGUMENTS>"
                            ele.argument.forEach(arg => {
                                saveStr += getters.getEndterStr(enterLine + 3)
                                saveStr += "<ARGUMENT-DATA-PROTOTYPE>"
                                if (arg.name != '') {
                                    saveStr += getters.getEndterStr(enterLine + 4)
                                    saveStr += "<SHORT-NAME>" + arg.name + "</SHORT-NAME>"
                                }
                                if (arg.type != null) {
                                    saveStr += getters.getEndterStr(enterLine + 4)
                                    saveStr += '<TYPE-TREF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + arg.type + "</TYPE-TREF>"
                                }
                                if (arg.dir != null) {
                                    saveStr += getters.getEndterStr(enterLine + 4)
                                    saveStr += "<DIRECTION>" + arg.dir + "</DIRECTION>"
                                }
                                if (arg.descrip != '') {
                                    saveStr += getters.getEndterStr(enterLine + 4)
                                    saveStr += '<DESC>'
                                    saveStr += getters.getEndterStr(enterLine + 5)
                                    saveStr += '<L-2 L="EN">' + arg.descrip + "</L-2>"
                                    saveStr += getters.getEndterStr(enterLine + 4)
                                    saveStr += "</DESC>"
                                }
                                saveStr += getters.getEndterStr(enterLine + 3)
                                saveStr += "</ARGUMENT-DATA-PROTOTYPE>"
                            })
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "</ARGUMENTS>"
                        }
                        if (ele.errorSet.length > 0) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<POSSIBLE-AP-ERROR-SET-REFS>"
                            ele.errorSet.forEach(errset => {
                                if (errset.error != null) {
                                    saveStr += getters.getEndterStr(enterLine + 3)
                                    saveStr += '<POSSIBLE-AP-ERROR-SET-REF DEST="AP-APPLICATION-ERROR-SET">' + errset.error + "</POSSIBLE-AP-ERROR-SET-REF>"
                                }
                            })
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "</POSSIBLE-AP-ERROR-SET-REFS>"
                        }
                        if (ele.error.length > 0) {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "<POSSIBLE-AP-ERROR-REFS>"
                            ele.error.forEach(err => {
                                if (err.error != null) {
                                    saveStr += getters.getEndterStr(enterLine + 3)
                                    saveStr += '<POSSIBLE-AP-ERROR-REF DEST="AP-APPLICATION-ERROR">' + err.error + "</POSSIBLE-AP-ERROR-REF>"
                                }
                            })
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "</POSSIBLE-AP-ERROR-REFS>"
                        }
                        if (ele.descrip != '') {
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += '<DESC>'
                            saveStr += getters.getEndterStr(enterLine + 3)
                            saveStr += '<L-2 L="EN">' + ele.descrip + "</L-2>"
                            saveStr += getters.getEndterStr(enterLine + 2)
                            saveStr += "</DESC>"
                        }
                        saveStr += getters.getEndterStr(enterLine + 1)
                        saveStr += "</CLIENT-SERVER-OPERATION>"
                    })
                    saveStr += getters.getEndterStr(enterLine)
                    saveStr += "</METHODS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SERVICE-INTERFACE>"
            } else if (data.parent == constant.Client_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SOMEIP-SD-CLIENT-EVENT-GROUP-TIMING-CONFIG UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].retrydelay != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SUBSCRIBE-EVENTGROUP-RETRY-DELAY>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].retrydelay + "</SUBSCRIBE-EVENTGROUP-RETRY-DELAY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].retrymax != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SUBSCRIBE-EVENTGROUP-RETRY-MAX>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].retrymax + "</SUBSCRIBE-EVENTGROUP-RETRY-MAX>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].timetolive != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<TIME-TO-LIVE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].timetolive + "</TIME-TO-LIVE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymax != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymin != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REQUEST-RESPONSE-DELAY>"
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymax != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymax + "</MAX-VALUE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymin != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientEvent[data.idx].delaymin + "</MIN-VALUE>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</REQUEST-RESPONSE-DELAY>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SOMEIP-SD-CLIENT-EVENT-GROUP-TIMING-CONFIG>"
            } else if (data.parent == constant.Server_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SOMEIP-SD-SERVER-EVENT-GROUP-TIMING-CONFIG UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymax != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymin != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REQUEST-RESPONSE-DELAY>"
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymax != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymax + "</MAX-VALUE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymin != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerEvent[data.idx].delaymin + "</MIN-VALUE>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</REQUEST-RESPONSE-DELAY>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SOMEIP-SD-SERVER-EVENT-GROUP-TIMING-CONFIG>"
            } else if (data.parent == constant.SomeIPClient_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SOMEIP-SD-CLIENT-SERVICE-INSTANCE-CONFIG UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].findtime != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SERVICE-FIND-TIME-TO-LIVE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].findtime + "</SERVICE-FIND-TIME-TO-LIVE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymax != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymin != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inibasedelay != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inirepetimax != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<INITIAL-FIND-BEHAVIOR>"
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymax != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<INITIAL-DELAY-MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymax + "</INITIAL-DELAY-MAX-VALUE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymin != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<INITIAL-DELAY-MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inidelaymin + "</INITIAL-DELAY-MIN-VALUE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inibasedelay != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<INITIAL-REPETITIONS-BASE-DELAY>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inibasedelay + "</INITIAL-REPETITIONS-BASE-DELAY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inirepetimax != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<INITIAL-REPETITIONS-MAX>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPClientServiceInstance[data.idx].inirepetimax + "</INITIAL-REPETITIONS-MAX>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</INITIAL-FIND-BEHAVIOR>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SOMEIP-SD-CLIENT-SERVICE-INSTANCE-CONFIG>"
            } else if (data.parent == constant.SomeIPServer_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SOMEIP-SD-SERVER-SERVICE-INSTANCE-CONFIG UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymax != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymin != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inibasedelay != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inirepetimax != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<INITIAL-OFFER-BEHAVIOR>"
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymax != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<INITIAL-DELAY-MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymax + "</INITIAL-DELAY-MAX-VALUE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymin != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<INITIAL-DELAY-MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inidelaymin + "</INITIAL-DELAY-MIN-VALUE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inibasedelay != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<INITIAL-REPETITIONS-BASE-DELAY>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inibasedelay + "</INITIAL-REPETITIONS-BASE-DELAY>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inirepetimax != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<INITIAL-REPETITIONS-MAX>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].inirepetimax + "</INITIAL-REPETITIONS-MAX>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</INITIAL-OFFER-BEHAVIOR>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymax != '' ||
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymin != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REQUEST-RESPONSE-DELAY>"
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymax != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MAX-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymax + "</MAX-VALUE>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymin != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<MIN-VALUE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].delaymin + "</MIN-VALUE>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</REQUEST-RESPONSE-DELAY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].offer != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<OFFER-CYCLIC-DELAY>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].offer + "</OFFER-CYCLIC-DELAY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].timetolive != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SERVICE-OFFER-TIME-TO-LIVE>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServerServiceInstance[data.idx].timetolive + "</SERVICE-OFFER-TIME-TO-LIVE>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SOMEIP-SD-SERVER-SERVICE-INSTANCE-CONFIG>"
            } else if (data.parent == constant.SomeIPToMachineMapping_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING UUID="' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].ccref != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<COMMUNICATION-CONNECTOR-REF DEST="ETHERNET-COMMUNICATION-CONNECTOR">' + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].ccref + "</COMMUNICATION-CONNECTOR-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].serviceI.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SERVICE-INSTANCE-REFS>"
                    state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].serviceI.forEach(item => {
                        if (item.ref == 'PROVIDED-SOMEIP-SERVICE-INSTANCE' && item.service != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<SERVICE-INSTANCE-REF DEST="PROVIDED-SOMEIP-SERVICE-INSTANCE">' + item.service + "</SERVICE-INSTANCE-REF>"
                        }
                        if (item.ref == 'REQUIRED-SOMEIP-SERVICE-INSTANCE' && item.service != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<SERVICE-INSTANCE-REF DEST="REQUIRED-SOMEIP-SERVICE-INSTANCE">' + item.service + "</SERVICE-INSTANCE-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</SERVICE-INSTANCE-REFS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].tcp != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<TCP-PORT>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].tcp + "</TCP-PORT>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].udp != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<UDP-PORT>" + state.SAHLProject[state.openProjectIndex].Service.SomeIPServiceInstanceToMachine[data.idx].udp + "</UDP-PORT>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING>"
            } else if (data.parent == constant.ToPortPrototypeMapping_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SERVICE-INSTANCE-TO-PORT-PROTOTYPE-MAPPING UUID="' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].porttype != null ||
                    state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].context != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PORT-PROTOTYPE-IREF>"
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectPort == "P-PORT-PROTOTYPE") {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<TARGET-PORT-PROTOTYPE-REF DEST="P-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].porttype + "</TARGET-PORT-PROTOTYPE-REF>"
                    } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectPort == "R-PORT-PROTOTYPE") {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<TARGET-PORT-PROTOTYPE-REF DEST="R-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].porttype + "</TARGET-PORT-PROTOTYPE-REF>"
                    } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectPort == "PR-PORT-PROTOTYPE") {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<TARGET-PORT-PROTOTYPE-REF DEST="PR-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].porttype + "</TARGET-PORT-PROTOTYPE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].context != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<CONTEXT-ROOT-SW-COMPONENT-PROTOTYPE-REF DEST="ROOT-SW-COMPONENT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].context + "</CONTEXT-ROOT-SW-COMPONENT-PROTOTYPE-REF>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PORT-PROTOTYPE-IREF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].process != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PROCESS-REF DEST="PROCESS-DESIGN">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].process + "</PROCESS-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].serviceIns != null) {
                    if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                        saveStr += getters.getEndterStr(elementTab)
                        saveStr += '<SERVICE-INSTANCE-REF DEST="PROVIDED-SOMEIP-SERVICE-INSTANCE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].serviceIns + "</SERVICE-INSTANCE-REF>"
                    } else if (state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                        saveStr += getters.getEndterStr(elementTab)
                        saveStr += '<SERVICE-INSTANCE-REF DEST="REQUIRED-SOMEIP-SERVICE-INSTANCE">' + state.SAHLProject[state.openProjectIndex].Service.ServiceInstanceToPortPrototype[data.idx].serviceIns + "</SERVICE-INSTANCE-REF>"
                    }
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SERVICE-INSTANCE-TO-PORT-PROTOTYPE-MAPPING>"
            } else if (data.parent == constant.RequiredSomeIP_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<REQUIRED-SOMEIP-SERVICE-INSTANCE UUID="' + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].E2EEvent.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<E-2-E-EVENT-PROTECTION-PROPSS>"
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].E2EEvent.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<END-2-END-EVENT-PROTECTION-PROPS>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.dataIds != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-IDS>'
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += '<DATA-ID>' + ele.dataIds + "</DATA-ID>"
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</DATA-IDS>'
                        }
                        if (ele.dataLength != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-LENGTH>' + ele.dataLength + "</DATA-LENGTH>"
                        }
                        if (ele.period != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-UPDATE-PERIOD>' + ele.period + "</DATA-UPDATE-PERIOD>"
                        }
                        if (ele.e2e != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<E-2-E-PROFILE-CONFIGURATION-REF DEST="E-2-E-PROFILE-CONFIGURATION">' + ele.e2e + "</E-2-E-PROFILE-CONFIGURATION-REF>"
                        }
                        if (ele.event != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<EVENT-REF DEST="SOMEIP-EVENT-DEPLOYMENT">' + ele.event + "</EVENT-REF>"
                        }
                        if (ele.max != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MAX-DATA-LENGTH>' + ele.max + "</MAX-DATA-LENGTH>"
                        }
                        if (ele.min != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MIN-DATA-LENGTH>' + ele.min + "</MIN-DATA-LENGTH>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</END-2-END-EVENT-PROTECTION-PROPS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</E-2-E-EVENT-PROTECTION-PROPSS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].E2EMethod.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<E-2-E-METHOD-PROTECTION-PROPSS>"
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].E2EMethod.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<END-2-END-METHOD-PROTECTION-PROPS>"
                        if (ele.dataIds != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-IDS>'
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += '<DATA-ID>' + ele.dataIds + "</DATA-ID>"
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</DATA-IDS>'
                        }
                        if (ele.dataLength != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-LENGTH>' + ele.dataLength + "</DATA-LENGTH>"
                        }
                        if (ele.period != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-UPDATE-PERIOD>' + ele.period + "</DATA-UPDATE-PERIOD>"
                        }
                        if (ele.e2e != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<E-2-E-PROFILE-CONFIGURATION-REF DEST="E-2-E-PROFILE-CONFIGURATION">' + ele.e2e + "</E-2-E-PROFILE-CONFIGURATION-REF>"
                        }
                        if (ele.method != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<METHOD-REF DEST="SOMEIP-METHOD-DEPLOYMENT">' + ele.method + "</METHOD-REF>"
                        }
                        if (ele.max != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MAX-DATA-LENGTH>' + ele.max + "</MAX-DATA-LENGTH>"
                        }
                        if (ele.min != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MIN-DATA-LENGTH>' + ele.min + "</MIN-DATA-LENGTH>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</END-2-END-METHOD-PROTECTION-PROPS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</E-2-E-METHOD-PROTECTION-PROPSS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].deployref != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SERVICE-INTERFACE-DEPLOYMENT-REF DEST="SOMEIP-SERVICE-INTERFACE-DEPLOYMENT">' + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].deployref + "</SERVICE-INTERFACE-DEPLOYMENT-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].minorver != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REQUIRED-MINOR-VERSION>" + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].minorver + "</REQUIRED-MINOR-VERSION>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].serviceInsid != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REQUIRED-SERVICE-INSTANCE-ID>" + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].serviceInsid + "</REQUIRED-SERVICE-INSTANCE-ID>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].someipclient != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SD-CLIENT-CONFIG-REF DEST="SOMEIP-SD-CLIENT-SERVICE-INSTANCE-CONFIG">' + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].someipclient + "</SD-CLIENT-CONFIG-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].version != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<VERSION-DRIVEN-FIND-BEHAVIOR>" + state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].version + "</VERSION-DRIVEN-FIND-BEHAVIOR>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].method.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<METHOD-REQUEST-PROPSS>"
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].method.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-METHOD-PROPS>"
                        if (ele.method != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<METHOD-REF DEST="SOMEIP-METHOD-DEPLOYMENT">' + ele.method + "</METHOD-REF>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-METHOD-PROPS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</METHOD-REQUEST-PROPSS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].requiredevent.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REQUIRED-EVENT-GROUPS>"
                    state.SAHLProject[state.openProjectIndex].Service.RequiredSomeIP[data.idx].requiredevent.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-REQUIRED-EVENT-GROUP>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.eventG != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<EVENT-GROUP-REF DEST="SOMEIP-EVENT-GROUP">' + ele.eventG + "</EVENT-GROUP-REF>"
                        }
                        if (ele.client != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SD-CLIENT-EVENT-GROUP-TIMING-CONFIG-REF DEST="SOMEIP-SD-CLIENT-EVENT-GROUP-TIMING-CONFIG">' + ele.client + "</SD-CLIENT-EVENT-GROUP-TIMING-CONFIG-REF>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-REQUIRED-EVENT-GROUP>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</REQUIRED-EVENT-GROUPS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</REQUIRED-SOMEIP-SERVICE-INSTANCE>"
            } else if (data.parent == constant.ProvidedSomeIP_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PROVIDED-SOMEIP-SERVICE-INSTANCE UUID="' + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].E2EEvent.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<E-2-E-EVENT-PROTECTION-PROPSS>"
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].E2EEvent.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<END-2-END-EVENT-PROTECTION-PROPS>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.dataIds != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-IDS>'
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += '<DATA-ID>' + ele.dataIds + "</DATA-ID>"
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</DATA-IDS>'
                        }
                        if (ele.dataLength != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-LENGTH>' + ele.dataLength + "</DATA-LENGTH>"
                        }
                        if (ele.period != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-UPDATE-PERIOD>' + ele.period + "</DATA-UPDATE-PERIOD>"
                        }
                        if (ele.e2e != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<E-2-E-PROFILE-CONFIGURATION-REF DEST="E-2-E-PROFILE-CONFIGURATION">' + ele.e2e + "</E-2-E-PROFILE-CONFIGURATION-REF>"
                        }
                        if (ele.event != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<EVENT-REF DEST="SOMEIP-EVENT-DEPLOYMENT">' + ele.event + "</EVENT-REF>"
                        }
                        if (ele.max != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MAX-DATA-LENGTH>' + ele.max + "</MAX-DATA-LENGTH>"
                        }
                        if (ele.min != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MIN-DATA-LENGTH>' + ele.min + "</MIN-DATA-LENGTH>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</END-2-END-EVENT-PROTECTION-PROPS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</E-2-E-EVENT-PROTECTION-PROPSS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].E2EMethod.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<E-2-E-METHOD-PROTECTION-PROPSS>"
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].E2EMethod.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<END-2-END-METHOD-PROTECTION-PROPS>"
                        if (ele.dataIds != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-IDS>'
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += '<DATA-ID>' + ele.dataIds + "</DATA-ID>"
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</DATA-IDS>'
                        }
                        if (ele.dataLength != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-LENGTH>' + ele.dataLength + "</DATA-LENGTH>"
                        }
                        if (ele.period != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<DATA-UPDATE-PERIOD>' + ele.period + "</DATA-UPDATE-PERIOD>"
                        }
                        if (ele.e2e != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<E-2-E-PROFILE-CONFIGURATION-REF DEST="E-2-E-PROFILE-CONFIGURATION">' + ele.e2e + "</E-2-E-PROFILE-CONFIGURATION-REF>"
                        }
                        if (ele.method != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<METHOD-REF DEST="SOMEIP-METHOD-DEPLOYMENT">' + ele.method + "</METHOD-REF>"
                        }
                        if (ele.max != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MAX-DATA-LENGTH>' + ele.max + "</MAX-DATA-LENGTH>"
                        }
                        if (ele.min != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<MIN-DATA-LENGTH>' + ele.min + "</MIN-DATA-LENGTH>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</END-2-END-METHOD-PROTECTION-PROPS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</E-2-E-METHOD-PROTECTION-PROPSS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].deployref != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SERVICE-INTERFACE-DEPLOYMENT-REF DEST="SOMEIP-SERVICE-INTERFACE-DEPLOYMENT">' + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].deployref + "</SERVICE-INTERFACE-DEPLOYMENT-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].someipserver != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SD-SERVER-CONFIG-REF DEST="SOMEIP-SD-SERVER-SERVICE-INSTANCE-CONFIG">' + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].someipserver + "</SD-SERVER-CONFIG-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].instanceid != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SERVICE-INSTANCE-ID>" + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].instanceid + "</SERVICE-INSTANCE-ID>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].eventP.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<EVENT-PROPSS>"
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].eventP.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-EVENT-PROPS>"
                        if (ele.event != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<EVENT-REF DEST="SOMEIP-EVENT-DEPLOYMENT">' + ele.event + "</EVENT-REF>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-EVENT-PROPS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</EVENT-PROPSS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].loadPriority != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<LOAD-BALANCING-PRIORITY>" + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].loadPriority + "</LOAD-BALANCING-PRIORITY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].loadWeight != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<LOAD-BALANCING-WEIGHT>" + state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].loadWeight + "</LOAD-BALANCING-WEIGHT>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].method != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<METHOD-RESPONSE-PROPSS>"
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].method.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-METHOD-PROPS>"
                        if (ele.method != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<METHOD-REF DEST="SOMEIP-METHOD-DEPLOYMENT">' + ele.method + "</METHOD-REF>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-METHOD-PROPS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</METHOD-RESPONSE-PROPSS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].eventG.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PROVIDED-EVENT-GROUPS>"
                    state.SAHLProject[state.openProjectIndex].Service.ProvidedSomeIP[data.idx].eventG.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SOMEIP-PROVIDED-EVENT-GROUP>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.eventG != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<EVENT-GROUP-REF DEST="SOMEIP-EVENT-GROUP">' + ele.eventG + "</EVENT-GROUP-REF>"
                        }
                        if (ele.udp != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<EVENT-MULTICAST-UDP-PORT>" + ele.udp + "</EVENT-MULTICAST-UDP-PORT>"
                        }
                        if (ele.ipv4 != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<IPV-4-MULTICAST-IP-ADDRESS>" + ele.ipv4 + "</IPV-4-MULTICAST-IP-ADDRESS>"
                        }
                        if (ele.ipv6 != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<IPV-6-MULTICAST-IP-ADDRESS>" + ele.ipv6 + "</IPV-6-MULTICAST-IP-ADDRESS>"
                        }
                        if (ele.threshold != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MULTICAST-THRESHOLD>" + ele.threshold + "</MULTICAST-THRESHOLD>"
                        }
                        if (ele.server != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SD-SERVER-EVENT-GROUP-TIMING-CONFIG-REF DEST="SOMEIP-SD-SERVER-EVENT-GROUP-TIMING-CONFIG">' + ele.server + "</SD-SERVER-EVENT-GROUP-TIMING-CONFIG-REF>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SOMEIP-PROVIDED-EVENT-GROUP>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PROVIDED-EVENT-GROUPS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PROVIDED-SOMEIP-SERVICE-INSTANCE>"
            } else if (data.parent == constant.E2EProfileConfig_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<E-2-E-PROFILE-CONFIGURATION-SET UUID="' + state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig[data.idx].profile.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<E-2-E-PROFILE-CONFIGURATIONS>"
                    state.SAHLProject[state.openProjectIndex].Service.E2EProfileConfig[data.idx].profile.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<E-2-E-PROFILE-CONFIGURATION>"
                        if (ele.configName != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.configName + "</SHORT-NAME>"
                        }
                        if (ele.invalid != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<CLEAR-FROM-VALID-TO-INVALID>" + ele.invalid.toUpperCase() + "</CLEAR-FROM-VALID-TO-INVALID>"
                        }
                        if (ele.IDMode != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<DATA-ID-MODE>" + ele.IDMode + "</DATA-ID-MODE>"
                        }
                        if (ele.MaxConter != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MAX-DELTA-COUNTER>" + ele.MaxConter + "</MAX-DELTA-COUNTER>"
                        }
                        if (ele.errorInit != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MAX-ERROR-STATE-INIT>" + ele.errorInit + "</MAX-ERROR-STATE-INIT>"
                        }
                        if (ele.errorInvalid != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MAX-ERROR-STATE-INVALID>" + ele.errorInvalid + "</MAX-ERROR-STATE-INVALID>"
                        }
                        if (ele.errorValid != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MAX-ERROR-STATE-VALID>" + ele.errorValid + "</MAX-ERROR-STATE-VALID>"
                        }
                        if (ele.okInit != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MIN-OK-STATE-INIT>" + ele.okInit + "</MIN-OK-STATE-INIT>"
                        }
                        if (ele.okInvalid != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MIN-OK-STATE-INVALID>" + ele.okInvalid + "</MIN-OK-STATE-INVALID>"
                        }
                        if (ele.okValid != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<MIN-OK-STATE-VALID>" + ele.okValid + "</MIN-OK-STATE-VALID>"
                        }
                        if (ele.profileName != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<PROFILE-NAME>" + ele.profileName + "</PROFILE-NAME>"
                        }
                        if (ele.sizeInit != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<WINDOW-SIZE-INIT>" + ele.sizeInit + "</WINDOW-SIZE-INIT>"
                        }
                        if (ele.sizeInvalid != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<WINDOW-SIZE-INVALID>" + ele.sizeInvalid + "</WINDOW-SIZE-INVALID>"
                        }
                        if (ele.sizeValid != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<WINDOW-SIZE-VALID>" + ele.sizeValid + "</WINDOW-SIZE-VALID>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</E-2-E-PROFILE-CONFIGURATION>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</E-2-E-PROFILE-CONFIGURATIONS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</E-2-E-PROFILE-CONFIGURATION-SET>"
            } else if (data.parent == constant.SDG_DEF_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SDG-DEF UUID="' + state.SAHLProject[state.openProjectIndex].Service.SdgDef[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.SdgDef[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.SdgDef[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.SdgDef[data.idx].sdgClass.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SDG-CLASSES>"
                    state.SAHLProject[state.openProjectIndex].Service.SdgDef[data.idx].sdgClass.forEach(ele => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<SDG-CLASS>"
                        if (ele.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + ele.name + "</SHORT-NAME>"
                        }
                        if (ele.gid != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<GID>" + ele.gid + "</GID>"
                        }
                        if (ele.metaClass != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<EXTENDS-META-CLASS>" + ele.metaClass + "</EXTENDS-META-CLASS>"
                        }
                        if (ele.attriName != '' || ele.lowMulti != '' || ele.upMulti != '' || ele.atrriGid != '' || ele.pattern != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<ATTRIBUTES>"
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += "<SDG-PRIMITIVE-ATTRIBUTE>"
                            if (ele.attriName != '') {
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "<SHORT-NAME>" + ele.attriName + "</SHORT-NAME>"
                            }
                            if (ele.lowMulti != '') {
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "<LOWER-MULTIPLICITY>" + ele.lowMulti + "</LOWER-MULTIPLICITY>"
                            }
                            if (ele.upMulti != '') {
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "<UPPER-MULTIPLICITY>" + ele.upMulti + "</UPPER-MULTIPLICITY>"
                            }
                            if (ele.atrriGid != '') {
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "<GID>" + ele.atrriGid + "</GID>"
                            }
                            if (ele.pattern != '') {
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "<PATTERN>" + ele.pattern + "</PATTERN>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += "</SDG-PRIMITIVE-ATTRIBUTE>"
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</ATTRIBUTES>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</SDG-CLASS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</SDG-CLASSES>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SDG-DEF>"
            } else if (data.parent == constant.Error_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<AP-APPLICATION-ERROR UUID="' + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].desc != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<DESC>'
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '<L-2 L="EN">' + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].desc + "</L-2>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</DESC>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].errorcode != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ERROR-CODE>" + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].errorcode + "</ERROR-CODE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].errorDref != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<ERROR-DOMAIN-REF DEST="AP-APPLICATION-ERROR-DOMAIN">' + state.SAHLProject[state.openProjectIndex].Service.Error[data.idx].errorDref + "</ERROR-DOMAIN-REF>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</AP-APPLICATION-ERROR>"
            } else if (data.parent == constant.Errorset_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<AP-APPLICATION-ERROR-SET UUID="' + state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].errorref.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<AP-APPLICATION-ERROR-REFS>"
                    state.SAHLProject[state.openProjectIndex].Service.ErrorSet[data.idx].errorref.forEach(ele => {
                        if (ele.error != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<AP-APPLICATION-ERROR-REF DEST="AP-APPLICATION-ERROR">' + ele.error + "</AP-APPLICATION-ERROR-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</AP-APPLICATION-ERROR-REFS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</AP-APPLICATION-ERROR-SET>"
            } else if (data.parent == constant.ErrorDomain_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<AP-APPLICATION-ERROR-DOMAIN UUID="' + state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].namespace != '') {
                    namespace = state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].namespace.split(',')
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<NAMESPACES>"
                    namespace.forEach((ele, e) => {
                        if (!(ele == '' && e == namespace.length - 1)) {
                            var symbol = ele.split('/')
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += "<SYMBOL-PROPS>"
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SHORT-NAME>" + symbol[0] + "</SHORT-NAME>"
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "<SYMBOL>" + symbol[1] + "</SYMBOL>"
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += "</SYMBOL-PROPS>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</NAMESPACES>"
                }
                if (state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].value != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<VALUE>" + state.SAHLProject[state.openProjectIndex].Service.ErrorDomain[data.idx].value + "</VALUE>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</AP-APPLICATION-ERROR-DOMAIN>"
            } else if (data.parent == constant.FileArray_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PERSISTENCY-FILE-ARRAY UUID="' + state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].sdgs.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ADMIN-DATA>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "<SDGS>"
                    state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].sdgs.forEach(item => {
                        if (item.sdg == "DATA-ENCRYPTION") {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SDG GID="DATA-ENCRYPTION">'
                            if (item.sd != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<SD GID="USE-DATA-ENCRYPTION">' + item.sd + "</SD>"
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<SD GID="CRYPTO-ALGORITHM"/>'
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</SDG>'
                        } else if (item.sdg == 'PERSISTENCY-DEPLOYMENT-EXTENSION') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SDG GID="PERSISTENCY-DEPLOYMENT-EXTENSION">'
                            if (item.port != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<SDX-REF DEST="PR-PORT-PROTOTYPE">' + item.port + "</SDX-REF>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</SDG>'
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "</SDGS>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ADMIN-DATA>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].maxSize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<MAXIMUM-ALLOWED-SIZE>' + state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].maxSize + "</MAXIMUM-ALLOWED-SIZE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].miniSize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<MINIMUM-SUSTAINED-SIZE>' + state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].miniSize + "</MINIMUM-SUSTAINED-SIZE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].updateS != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<UPDATE-STRATEGY>" + state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].updateS + "</UPDATE-STRATEGY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].files.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<FILES>"
                    state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].files.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PERSISTENCY-FILE>"
                        if (item.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + item.name + "</SHORT-NAME>"
                        }
                        if (item.url != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<CONTENT-URI>' + item.url + "</CONTENT-URI>"
                        }
                        if (item.filename != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<FILE-NAME>' + item.filename + "</FILE-NAME>"
                        }
                        if (item.strategy != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<UPDATE-STRATEGY>' + item.strategy + "</UPDATE-STRATEGY>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PERSISTENCY-FILE>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</FILES>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].uri != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<URI>" + state.SAHLProject[state.openProjectIndex].Per.PERFileArray[data.idx].uri + "</URI>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PERSISTENCY-FILE-ARRAY>"
            } else if (data.parent == constant.FileProxyInterf_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PERSISTENCY-FILE-PROXY-INTERFACE UUID="' + state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].category != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<CATEGORY>' + state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].category + "</CATEGORY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].minisize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<MINIMUM-SUSTAINED-SIZE>' + state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].minisize + "</MINIMUM-SUSTAINED-SIZE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].redundancy != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REDUNDANCY>" + state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].redundancy + "</REDUNDANCY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].updateS != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<UPDATE-STRATEGY>" + state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].updateS + "</UPDATE-STRATEGY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].encoding != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ENCODING>" + state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].encoding + "</ENCODING>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].proxy.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<FILE-PROXYS>"
                    state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].proxy.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PERSISTENCY-FILE-PROXY>"
                        if (item.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + item.name + "</SHORT-NAME>"
                        }
                        if (item.url != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<CONTENT-URI>' + item.url + "</CONTENT-URI>"
                        }
                        if (item.filename != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<FILE-NAME>' + item.filename + "</FILE-NAME>"
                        }
                        if (item.strategy != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<UPDATE-STRATEGY>' + item.strategy + "</UPDATE-STRATEGY>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PERSISTENCY-FILE-PROXY>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</FILE-PROXYS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].maxfiles != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<MAX-NUMBER-OF-FILES>" + state.SAHLProject[state.openProjectIndex].Per.PERFileProxy[data.idx].maxfiles + "</MAX-NUMBER-OF-FILES>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PERSISTENCY-FILE-PROXY-INTERFACE>"
            } else if (data.parent == constant.KeyValueData_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PERSISTENCY-KEY-VALUE-DATABASE UUID="' + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].sdgs.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ADMIN-DATA>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "<SDGS>"
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].sdgs.forEach(item => {
                        if (item.sdg == "DATA-ENCRYPTION") {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SDG GID="DATA-ENCRYPTION">'
                            if (item.sd != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<SD GID="USE-DATA-ENCRYPTION">' + item.sd + "</SD>"
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<SD GID="CRYPTO-ALGORITHM"/>'
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</SDG>'
                        } else if (item.sdg == 'PERSISTENCY-DEPLOYMENT-EXTENSION') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SDG GID="PERSISTENCY-DEPLOYMENT-EXTENSION">'
                            if (item.port != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<SDX-REF DEST="PR-PORT-PROTOTYPE">' + item.port + "</SDX-REF>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</SDG>'
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "</SDGS>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ADMIN-DATA>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].maxSize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<MAXIMUM-ALLOWED-SIZE>' + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].maxSize + "</MAXIMUM-ALLOWED-SIZE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].miniSize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<MINIMUM-SUSTAINED-SIZE>' + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].miniSize + "</MINIMUM-SUSTAINED-SIZE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].redundancy.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REDUNDANCY-HANDLINGS>"
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].redundancy.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PERSISTENCY-REDUNDANCY-M-OUT-OF-N>"
                        if (item.scope != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SCOPE>' + item.scope + "</SCOPE>"
                        }
                        if (item.m != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<M>' + item.m + "</M>"
                        }
                        if (item.n != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<N>' + item.n + "</N>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PERSISTENCY-REDUNDANCY-M-OUT-OF-N>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</REDUNDANCY-HANDLINGS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].updateS != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<UPDATE-STRATEGY>" + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].updateS + "</UPDATE-STRATEGY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].keyValue.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<KEY-VALUE-PAIRS>"
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].keyValue.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PERSISTENCY-KEY-VALUE-PAIR>"
                        if (item.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + item.name + "</SHORT-NAME>"
                        }
                        if (item.update != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<UPDATE-STRATEGY>' + item.update + "</UPDATE-STRATEGY>"
                        }
                        if (item.datatype != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<VALUE-DATA-TYPE-REF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + item.datatype + "</VALUE-DATA-TYPE-REF>"
                        }
                        if (item.array.length > 0 || item.numerical.length > 0) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<INIT-VALUE>'
                            if (item.array.length > 0) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "<ARRAY-VALUE-SPECIFICATION>"
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "<ELEMENTS>"
                                item.array.forEach(arr => {
                                    saveStr += getters.getEndterStr(elementTab + 5)
                                    saveStr += "<NUMERICAL-VALUE-SPECIFICATION>"
                                    if (arr.value != '') {
                                        saveStr += getters.getEndterStr(elementTab + 6)
                                        saveStr += '<VALUE>' + arr.value + "</VALUE>"
                                    }
                                    saveStr += getters.getEndterStr(elementTab + 5)
                                    saveStr += "</NUMERICAL-VALUE-SPECIFICATION>"
                                })
                                saveStr += getters.getEndterStr(elementTab + 4)
                                saveStr += "</ELEMENTS>"
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += "</ARRAY-VALUE-SPECIFICATION>"
                            }
                            if (item.numerical.length > 0) {
                                item.numerical.forEach(numeri => {
                                    saveStr += getters.getEndterStr(elementTab + 3)
                                    saveStr += "<NUMERICAL-VALUE-SPECIFICATION>"
                                    if (numeri.value != '') {
                                        saveStr += getters.getEndterStr(elementTab + 4)
                                        saveStr += '<VALUE>' + numeri.value + "</VALUE>"
                                    }
                                    saveStr += getters.getEndterStr(elementTab + 3)
                                    saveStr += "</NUMERICAL-VALUE-SPECIFICATION>"
                                })
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += "</INIT-VALUE>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PERSISTENCY-KEY-VALUE-PAIR>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</KEY-VALUE-PAIRS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].uri != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<URI>" + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueD[data.idx].uri + "</URI>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PERSISTENCY-KEY-VALUE-DATABASE>"
            } else if (data.parent == constant.KeyValueDI_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE UUID="' + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].minisize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<MINIMUM-SUSTAINED-SIZE>' + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].minisize + "</MINIMUM-SUSTAINED-SIZE>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].redundancy != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REDUNDANCY>" + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].redundancy + "</REDUNDANCY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].updateS != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<UPDATE-STRATEGY>" + state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].updateS + "</UPDATE-STRATEGY>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].data.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<DATA-ELEMENTS>"
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].data.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PERSISTENCY-DATA-ELEMENT>"
                        if (item.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + item.name + "</SHORT-NAME>"
                        }
                        if (item.type != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<TYPE-TREF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + item.type + "</TYPE-TREF>"
                        }
                        if (item.strategy != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<UPDATE-STRATEGY>' + item.strategy + "</UPDATE-STRATEGY>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PERSISTENCY-DATA-ELEMENT>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</DATA-ELEMENTS>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].serialization.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<DATA-TYPE-FOR-SERIALIZATION-REFS>"
                    state.SAHLProject[state.openProjectIndex].Per.PERKeyValueDI[data.idx].serialization.forEach(item => {
                        if (item.serial != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<DATA-TYPE-FOR-SERIALIZATION-REF DEST="STD-CPP-IMPLEMENTATION-DATA-TYPE">' + item.serial + "</DATA-TYPE-FOR-SERIALIZATION-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</DATA-TYPE-FOR-SERIALIZATION-REFS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE>"
            } else if (data.parent == constant.PortProtoFileA_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PERSISTENCY-PORT-PROTOTYPE-TO-FILE-ARRAY-MAPPING UUID="' + state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].fileArray != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PERSISTENCY-FILE-ARRAY-REF DEST="PERSISTENCY-FILE-ARRAY">' + state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].fileArray + "</PERSISTENCY-FILE-ARRAY-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].port != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PORT-PROTOTYPE-IREF>'
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '<TARGET-PORT-PROTOTYPE-REF DEST="PR-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].port + "</TARGET-PORT-PROTOTYPE-REF>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PORT-PROTOTYPE-IREF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].process != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PROCESS-REF DEST="PROCESS">' + state.SAHLProject[state.openProjectIndex].Per.PERPPtoFileArray[data.idx].process + "</PROCESS-REF>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PERSISTENCY-PORT-PROTOTYPE-TO-FILE-ARRAY-MAPPING>"
            } else if (data.parent == constant.PortProtoKeyV_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PERSISTENCY-PORT-PROTOTYPE-TO-KEY-VALUE-DATABASE-MAPPING UUID="' + state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].keyValue != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<KEY-VALUE-STORAGE-REF DEST="PERSISTENCY-KEY-VALUE-DATABASE">' + state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].keyValue + "</KEY-VALUE-STORAGE-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].port != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PORT-PROTOTYPE-IREF>'
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '<TARGET-PORT-PROTOTYPE-REF DEST="PR-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].port + "</TARGET-PORT-PROTOTYPE-REF>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PORT-PROTOTYPE-IREF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].process != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PROCESS-REF DEST="PROCESS">' + state.SAHLProject[state.openProjectIndex].Per.PERPPtoKeyValue[data.idx].process + "</PROCESS-REF>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PERSISTENCY-PORT-PROTOTYPE-TO-KEY-VALUE-DATABASE-MAPPING>"
            } else if (data.parent == constant.ContritoMachine_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PHM-CONTRIBUTION-TO-MACHINE-MAPPING UUID="' + state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[data.idx].machine != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<MACHINE-REF DEST="MACHINE">' + state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[data.idx].machine + "</MACHINE-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[data.idx].contri.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PHM-CONTRIBUTION-REFS>"
                    state.SAHLProject[state.openProjectIndex].Phm.PHMtoMachine[data.idx].contri.forEach(ele => {
                        if (ele.con != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<PHM-CONTRIBUTION-REF DEST="PLATFORM-HEALTH-MANAGEMENT-CONTRIBUTION">' + ele.con + "</PHM-CONTRIBUTION-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</PHM-CONTRIBUTION-REFS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PHM-CONTRIBUTION-TO-MACHINE-MAPPING>"
            } else if (data.parent == constant.HealthChannel_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PHM-HEALTH-CHANNEL-INTERFACE UUID="' + state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[data.idx].status.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<STATUSS>"
                    state.SAHLProject[state.openProjectIndex].Phm.PHMHealth[data.idx].status.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PHM-HEALTH-CHANNEL-STATUS>"
                        if (item.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + item.name + "</SHORT-NAME>"
                        }
                        if (item.status != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<STATUS-ID>' + item.status + "</STATUS-ID>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PHM-HEALTH-CHANNEL-STATUS>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</STATUSS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PHM-HEALTH-CHANNEL-INTERFACE>"
            } else if (data.parent == constant.RecoveryVA_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PHM-RECOVERY-ACTION-INTERFACE UUID="' + state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].reconame != '' ||
                    state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].faf != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<RECOVERY>'
                    if (state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].reconame != '') {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<SHORT-NAME>' + state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].reconame + "</SHORT-NAME>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].faf != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<FIRE-AND-FORGET>' + state.SAHLProject[state.openProjectIndex].Phm.PHMRecovery[data.idx].faf.toUpperCase() + "</FIRE-AND-FORGET>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</RECOVERY>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PHM-RECOVERY-ACTION-INTERFACE>"
            } else if (data.parent == constant.PHMSupervised_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<PHM-SUPERVISED-ENTITY-INTERFACE UUID="' + state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[data.idx].checkpoint.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CHECKPOINTS>"
                    state.SAHLProject[state.openProjectIndex].Phm.PHMSupervised[data.idx].checkpoint.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "<PHM-CHECKPOINT>"
                        if (item.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + item.name + "</SHORT-NAME>"
                        }
                        if (item.check != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<CHECKPOINT-ID>' + item.check + "</CHECKPOINT-ID>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += "</PHM-CHECKPOINT>"
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</CHECKPOINTS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</PHM-SUPERVISED-ENTITY-INTERFACE>"
            } else if (data.parent == constant.RecoveryActionInterf_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<RECOVERY-VIA-APPLICATION-ACTION-TO-CLIENT-SERVER-OPERATION-MAPPING UUID="' + state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].process != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PROCESS-REF DEST="PROCESS">' + state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].process + "</PROCESS-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].swcomponent != null ||
                    state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].port != null ||
                    state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].phmRecovery != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<RECOVERY-ACTION-IREF>'
                    if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].swcomponent != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<CONTEXT-ROOT-SW-COMPONENT-PROTOTYPE-REF DEST="ROOT-SW-COMPONENT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].swcomponent + "</CONTEXT-ROOT-SW-COMPONENT-PROTOTYPE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].port != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<CONTEXT-P-PORT-PROTOTYPE-REF DEST="P-PORT-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].port + "</CONTEXT-P-PORT-PROTOTYPE-REF>"
                    }
                    if (state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].phmRecovery != null) {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<TARGET-METHOD-REF DEST="CLIENT-SERVER-OPERATION">' + state.SAHLProject[state.openProjectIndex].Phm.RecoveryVia[data.idx].phmRecovery + "</TARGET-METHOD-REF>"
                    }
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</RECOVERY-ACTION-IREF>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</RECOVERY-VIA-APPLICATION-ACTION-TO-CLIENT-SERVER-OPERATION-MAPPING>"
            } else if (data.parent == constant.ComFieldGrant_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<COM-FIELD-GRANT UUID="' + state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].fieldD != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<DESIGN-REF DEST="COM-FIELD-GRANT-DESIGN">' + state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].fieldD + "</DESIGN-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].provide != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SERVICE-INSTANCE-REF DEST="PROVIDED-SOMEIP-SERVICE-INSTANCE">' + state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].provide + "</SERVICE-INSTANCE-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].role != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<ROLE>' + state.SAHLProject[state.openProjectIndex].IamG.FieldG[data.idx].role + "</ROLE>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</COM-FIELD-GRANT>"
            } else if (data.parent == constant.ComEventGrant_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<COM-EVENT-GRANT UUID="' + state.SAHLProject[state.openProjectIndex].IamG.EventG[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].IamG.EventG[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].IamG.EventG[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.EventG[data.idx].eventD != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<DESIGN-REF DEST="COM-EVENT-GRANT-DESIGN">' + state.SAHLProject[state.openProjectIndex].IamG.EventG[data.idx].eventD + "</DESIGN-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.EventG[data.idx].provide != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SERVICE-INSTANCE-REF DEST="PROVIDED-SOMEIP-SERVICE-INSTANCE">' + state.SAHLProject[state.openProjectIndex].IamG.EventG[data.idx].provide + "</SERVICE-INSTANCE-REF>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</COM-EVENT-GRANT>"
            } else if (data.parent == constant.ComMethodGrant_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<COM-METHOD-GRANT UUID="' + state.SAHLProject[state.openProjectIndex].IamG.MethodG[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodG[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].IamG.MethodG[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodG[data.idx].methodD != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<DESIGN-REF DEST="COM-METHOD-GRANT-DESIGN">' + state.SAHLProject[state.openProjectIndex].IamG.MethodG[data.idx].methodD + "</DESIGN-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodG[data.idx].provide != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SERVICE-INSTANCE-REF DEST="PROVIDED-SOMEIP-SERVICE-INSTANCE">' + state.SAHLProject[state.openProjectIndex].IamG.MethodG[data.idx].provide + "</SERVICE-INSTANCE-REF>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</COM-METHOD-GRANT>"
            } else if (data.parent == constant.ComFieldGDesign_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<COM-FIELD-GRANT-DESIGN UUID="' + state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].processD != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PROCESS-DESIGN-REF DEST="PROCESS-DESIGN">' + state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].processD + "</PROCESS-DESIGN-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].SIField != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<FIELD-IREF>'
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '<TARGET-FIELD-REF DEST="FIELD">' + state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].SIField + "</TARGET-FIELD-REF>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</FIELD-IREF>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].role != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<ROLE>' + state.SAHLProject[state.openProjectIndex].IamG.FieldGD[data.idx].role + "</ROLE>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</COM-FIELD-GRANT-DESIGN>"
            } else if (data.parent == constant.ComEventGDesign_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<COM-EVENT-GRANT-DESIGN UUID="' + state.SAHLProject[state.openProjectIndex].IamG.EventGD[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].IamG.EventGD[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].IamG.EventGD[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.EventGD[data.idx].processD != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PROCESS-DESIGN-REF DEST="PROCESS-DESIGN">' + state.SAHLProject[state.openProjectIndex].IamG.EventGD[data.idx].processD + "</PROCESS-DESIGN-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.EventGD[data.idx].SIEvent != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<EVENT-IREF>'
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '<TARGET-EVENT-REF DEST="VARIABLE-DATA-PROTOTYPE">' + state.SAHLProject[state.openProjectIndex].IamG.EventGD[data.idx].SIEvent + "</TARGET-EVENT-REF>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</EVENT-IREF>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</COM-EVENT-GRANT-DESIGN>"
            } else if (data.parent == constant.ComMethodGDesign_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<COM-METHOD-GRANT-DESIGN UUID="' + state.SAHLProject[state.openProjectIndex].IamG.MethodGD[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodGD[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].IamG.MethodGD[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodGD[data.idx].processD != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<PROCESS-DESIGN-REF DEST="PROCESS-DESIGN">' + state.SAHLProject[state.openProjectIndex].IamG.MethodGD[data.idx].processD + "</PROCESS-DESIGN-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].IamG.MethodGD[data.idx].SIMethod != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<METHOD-IREF>'
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += '<TARGET-METHOD-REF DEST="CLIENT-SERVER-OPERATION">' + state.SAHLProject[state.openProjectIndex].IamG.MethodGD[data.idx].SIMethod + "</TARGET-METHOD-REF>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</METHOD-IREF>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</COM-METHOD-GRANT-DESIGN>"
            } else if (data.parent == constant.SWCluster_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SOFTWARE-CLUSTER UUID="' + state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].category != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CATEGORY>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].category + "</CATEGORY>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].sdgs.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ADMIN-DATA>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "<SDGS>"
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].sdgs.forEach(item => {
                        if (item.sdg == "R20-11-CATEGORY") {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SDG GID="R20-11-CATEGORY">'
                            if (item.sd != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<SD GID="R20-11-CATEGORY">' + item.sd + "</SD>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</SDG>'
                        } else if (item.sdg == 'LICENSES') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SDG GID="LICENSES">'
                            if (item.sd != null) {
                                saveStr += getters.getEndterStr(elementTab + 3)
                                saveStr += '<SD GID="LICENSES">' + item.sd + "</SD>"
                            }
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '</SDG>'
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "</SDGS>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ADMIN-DATA>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].executable.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CONTAINED-AR-ELEMENT-REFS>"
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].executable.forEach(item => {
                        if (item.execut != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<CONTAINED-AR-ELEMENT-REF DEST="EXECUTABLE">' + item.execut + "</CONTAINED-AR-ELEMENT-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</CONTAINED-AR-ELEMENT-REFS>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].machineD.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CONTAINED-FIBEX-ELEMENT-REFS>"
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].machineD.forEach(item => {
                        if (item.machine != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<CONTAINED-FIBEX-ELEMENT-REF DEST="MACHINE-DESIGN">' + item.machine + "</CONTAINED-FIBEX-ELEMENT-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</CONTAINED-FIBEX-ELEMENT-REFS>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].toMachine.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CONTAINED-PACKAGE-ELEMENT-REFS>"
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].toMachine.forEach(item => {
                        if (item.mapping != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<CONTAINED-PACKAGE-ELEMENT-REF DEST="SOMEIP-SERVICE-INSTANCE-TO-MACHINE-MAPPING">' + item.mapping + "</CONTAINED-PACKAGE-ELEMENT-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</CONTAINED-PACKAGE-ELEMENT-REFS>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].process.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<CONTAINED-PROCESS-REFS>"
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].process.forEach(item => {
                        if (item.pro != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<CONTAINED-PROCESS-REF DEST="PROCESS">' + item.pro + "</CONTAINED-PROCESS-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</CONTAINED-PROCESS-REFS>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].sswc.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SUB-SOFTWARE-CLUSTER-REFS>"
                    state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].sswc.forEach(item => {
                        if (item.swc != null) {
                            saveStr += getters.getEndterStr(elementTab + 1)
                            saveStr += '<SUB-SOFTWARE-CLUSTER-REF DEST="SOFTWARE-CLUSTER">' + item.swc + "</SUB-SOFTWARE-CLUSTER-REF>"
                        }
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</SUB-SOFTWARE-CLUSTER-REFS>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].idVendor != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<VENDOR-ID>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].idVendor + "</VENDOR-ID>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].version != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<VERSION>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWareCluster[data.idx].version + "</VERSION>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SOFTWARE-CLUSTER>"
            } else if (data.parent == constant.SWPackage_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<SOFTWARE-PACKAGE UUID="' + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].action != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<ACTION-TYPE>' + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].action + "</ACTION-TYPE>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].activation != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<ACTIVATION-ACTION>' + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].activation + "</ACTIVATION-ACTION>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].compSWPsize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<COMPRESSED-SOFTWARE-PACKAGE-SIZE>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].compSWPsize + "</COMPRESSED-SOFTWARE-PACKAGE-SIZE>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].deltaPakage != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<IS-DELTA-PACKAGE>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].deltaPakage.toUpperCase() + "</IS-DELTA-PACKAGE>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].maximunVer != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<MAXIMUM-SUPPORTED-UCM-VERSION>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].maximunVer + "</MAXIMUM-SUPPORTED-UCM-VERSION>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].minimunVer != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<MINIMUM-SUPPORTED-UCM-VERSION>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].minimunVer + "</MINIMUM-SUPPORTED-UCM-VERSION>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].id != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PACKAGER-ID>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].id + "</PACKAGER-ID>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].postReboot != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<POST-VERIFICATION-REBOOT>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].postReboot.toUpperCase() + "</POST-VERIFICATION-REBOOT>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].preReboot != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<PRE-ACTIVATION-REBOOT>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].preReboot.toUpperCase() + "</PRE-ACTIVATION-REBOOT>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].swcluster != null) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += '<SOFTWARE-CLUSTER-REF DEST="SOFTWARE-CLUSTER">' + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].swcluster + "</SOFTWARE-CLUSTER-REF>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].uncompSWCsize != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<UNCOMPRESSED-SOFTWARE-CLUSTER-SIZE>" + state.SAHLProject[state.openProjectIndex].UCM.SoftWarePackage[data.idx].uncompSWCsize + "</UNCOMPRESSED-SOFTWARE-CLUSTER-SIZE>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</SOFTWARE-PACKAGE>"
            } else if (data.parent == constant.VehiclePackage_str) {
                saveStr += getters.getEndterStr(++enterLine)
                elementTab = enterLine + 1
                saveStr += '<VEHICLE-PACKAGE UUID="' + state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].uuid + '">'
                if (state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].name != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<SHORT-NAME>" + state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].name + "</SHORT-NAME>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].sdgs.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ADMIN-DATA>"
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "<SDGS>"
                    state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].sdgs.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 2)
                        saveStr += '<SDG GID="VEHICLE-DESCRIPTION">'
                        if (item.sd != null) {
                            saveStr += getters.getEndterStr(elementTab + 3)
                            saveStr += '<SD GID="VEHICLE-DESCRIPTION">' + item.sd + "</SD>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 2)
                        saveStr += '</SDG>'
                    })
                    saveStr += getters.getEndterStr(elementTab + 1)
                    saveStr += "</SDGS>"
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ADMIN-DATA>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].driver.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<DRIVER-NOTIFICATIONS>"
                    state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].driver.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<VEHICLE-DRIVER-NOTIFICATION>'
                        if (item.appro != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<APPROVAL-REQUIRED>' + item.appro + "</APPROVAL-REQUIRED>"
                        }
                        if (item.notify != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<NOTIFICATION-STATE>' + item.notify + "</NOTIFICATION-STATE>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '</VEHICLE-DRIVER-NOTIFICATION>'
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</DRIVER-NOTIFICATIONS>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].reposi != '') {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<REPOSITORY>" + state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].reposi + "</REPOSITORY>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].rollout.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<ROLLOUT-QUALIFICATIONS>"
                    state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].rollout.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<VEHICLE-ROLLOUT-STEP>'
                        if (item.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + item.name + "</SHORT-NAME>"
                        }
                        if (item.policy != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SAFETY-POLICY>' + item.policy + "</SAFETY-POLICY>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '</VEHICLE-ROLLOUT-STEP>'
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</ROLLOUT-QUALIFICATIONS>"
                }
                if (state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].ucms.length > 0) {
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "<UCMS>"
                    state.SAHLProject[state.openProjectIndex].UCM.VehiclePackage[data.idx].ucms.forEach(item => {
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '<UCM-DESCRIPTION>'
                        if (item.name != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<SHORT-NAME>' + item.name + "</SHORT-NAME>"
                        }
                        if (item.ident != '') {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<IDENTIFIER>' + item.ident + "</IDENTIFIER>"
                        }
                        if (item.module != null) {
                            saveStr += getters.getEndterStr(elementTab + 2)
                            saveStr += '<UCM-MODULE-INSTANTIATION-REF DEST="UCM-MODULE-INSTANTIATION">' + item.module + "</UCM-MODULE-INSTANTIATION-REF>"
                        }
                        saveStr += getters.getEndterStr(elementTab + 1)
                        saveStr += '</UCM-DESCRIPTION>'
                    })
                    saveStr += getters.getEndterStr(elementTab)
                    saveStr += "</UCMS>"
                }
                saveStr += getters.getEndterStr(enterLine)
                saveStr += "</VEHICLE-PACKAGE>"
            }

            console.log(saveStr)
        })
        var repeat = savelist[savelist.length - 1].path.split('/').length
        saveStr += getters.getEndterStr(--enterLine)
        saveStr += "</ELEMENTS>"
        console.log('endPath = ' + endPath + ' / ' + 'repeat = ' + repeat)
        while (repeat--) {
            saveStr += getters.getEndterStr(--enterLine)
            saveStr += "</AR-PACKAGE>"
            saveStr += getters.getEndterStr(--enterLine)
            saveStr += "</AR-PACKAGES>"
        }
        saveStr += getters.getEndterStr(--enterLine)
        saveStr += "</AUTOSAR>"

        const parser = new DOMParser() //XML이 포함된 문자열을 구문 분석하여 입력 데이터를 기반으로 XMLDocument 또는 문서를 적절히 반환하여 DOM 트리를 생성합니다.
        xmlDoc = parser.parseFromString(saveStr, "text/xml")

        console.log(xmlDoc)
        return xmlDoc
    },
    getSamePathList: (state) => (editPath) => {
        return state.strSavePath.indexOf(editPath)
    },
    getTableNum: () => (table, id) => {
        var idx = 0
        table.forEach((item, i) => {
            if (item.id == id) {
                idx = i
            }
        })
        return idx
    },
}

export default getters