import Vue from 'vue'
import VueRouter from 'vue-router'
// import Machine from '../components/Machine.vue'
// import MachineDesign from '../components/MachineDesign.vue'
// import HWElement from '../components/HWElement.vue'
// import ModeDeclarationGroup from '../components/ModeDeclarationGroup.vue'
import mainview from '../components/mainview.vue'
// import serviceInterface from '../components/serviceInterface.vue'
// import mainscreen from '../components/mainscreen.vue'
// import systembar from '../components/systembar.vue'
// import appbar from '../components/appbar.vue'
// import navigatorbar from '../components/navigatorbar.vue'
// import compumethod from '../components/compumethod.vue'
// import dataconstr from '../components/dataconstr.vue'
// import applicationArrayData from '../components/applicationArrayData.vue'
// import implementationData from '../components/implementationData.vue'
// import EthernetCluster from '../components/EthernetCluster.vue'
// import detailViewer from '../components/detailViewer.vue'
// import DeterministicClient from '../components/DeterministicClient.vue'
// import Executable from '../components/Executable.vue'
// import Process from '../components/Process.vue'
// import ProcessDesign from '../components/ProcessDesign.vue'
// import ProcessToMachine from '../components/ProcessToMachine.vue'
// import StartupConfig from '../components/StartupConfig.vue'
// import SWComponents from '../components/SWComponents.vue'
// import APErrorDomain from '../components/APErrorDomain.vue'
// import APErrorSet from '../components/APErrorSet.vue'
// import APError from '../components/APError.vue'
// import SomeIPService from '../components/SomeIPService.vue'
// import Client from '../components/ClientEventG.vue'
// import Server from '../components/Server.vue'
// import SomeIPClient from '../components/SomeIPClient.vue'
// import SomeIPServer from '../components/SomeIPServer.vue'
// import SomeIPtoMachine from '../components/SomeIPtoMachineMapping.vue'
// import ToPortPrototype from '../components/ToPortPrototype.vue'
// import RequiredSomeIP from '../components/RequiredSomeIP.vue'
// import ProvidedSomeIP from '../components/ProvidedSomeIP.vue'
// import dialogPathSetting from '../components/dialogPathSetting.vue'
// import dialogSave from '../components/dialogSave.vue'

Vue.use(VueRouter)

const routes = [
    // { path: '/machine', name: Machine, component: Machine },
    // { path: '/machineDesign', name: MachineDesign, component: MachineDesign },
    // { path: '/hwElement', name: HWElement, component: HWElement },
    // { path: '/modeDeclarationGroup', name: ModeDeclarationGroup, component: ModeDeclarationGroup },
    { path: '/mainview', name: mainview, component: mainview },
    // { path: '/serviceInterface', name: serviceInterface, component: serviceInterface },
    // { path: '/mainscreen', name: mainscreen, component: mainscreen },
    // { path: '/systembar', name: systembar, component: systembar },
    // { path: '/appbar', name: appbar, component: appbar },
    // { path: '/navigatorbar', name: navigatorbar, component: navigatorbar },
    // { path: '/compumethod', name: compumethod, component: compumethod },
    // { path: '/dataconstr', name: dataconstr, component: dataconstr },
    // { path: '/applicationArrayData', name: applicationArrayData, component: applicationArrayData },
    // { path: '/implementationData', name: implementationData, component: implementationData },
    // { path: '/EthernetCluster', name: EthernetCluster, component: EthernetCluster },
    // { path: '/detailViewer', name: detailViewer, component: detailViewer },
    // { path: '/DeterministicClient', name: DeterministicClient, component: DeterministicClient },
    // { path: '/Executable', name: Executable, component: Executable },
    // { path: '/Process', name: Process, component: Process },
    // { path: '/ProcessDesign', name: ProcessDesign, component: ProcessDesign },
    // { path: '/ProcessToMachine', name: ProcessToMachine, component: ProcessToMachine },
    // { path: '/StartupConfig', name: StartupConfig, component: StartupConfig },
    // { path: '/SWComponents', name: SWComponents, component: SWComponents },
    // { path: '/APErrorDomain', name: APErrorDomain, component: APErrorDomain },
    // { path: '/APErrorSet', name: APErrorSet, component: APErrorSet },
    // { path: '/APError', name: APError, component: APError },
    // { path: '/SomeIPService', name: SomeIPService, component: SomeIPService },
    // { path: '/ClientEventG', name: Client, component: Client },
    // { path: '/Server', name: Server, component: Server },
    // { path: '/SomeIPClient', name: SomeIPClient, component: SomeIPClient },
    // { path: '/SomeIPServer', name: SomeIPServer, component: SomeIPServer },
    // { path: '/SomeIPtoMachine', name: SomeIPtoMachine, component: SomeIPtoMachine },
    // { path: '/ToPortPrototype', name: ToPortPrototype, component: ToPortPrototype },
    // { path: '/RequiredSomeIP', name: RequiredSomeIP, component: RequiredSomeIP },
    // { path: '/ProvidedSomeIP', name: ProvidedSomeIP, component: ProvidedSomeIP },
    // { path: '/dialogPathSetting', name: dialogPathSetting, component: dialogPathSetting },
    // { path: '/dialogSave', name: dialogSave, component: dialogSave },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router