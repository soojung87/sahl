import Vue from 'vue';
import Vuex from 'vuex';
//import constant from "./constants.js"
import { saveAs } from 'file-saver'; // eslint-disable-line no-unused-vars
//import { EventBus } from "../main.js"
import getters from "./getters"
import mutations from "./mutations"


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
        errorList: [],
        detailViewer: { uuid: '', element: '' },
        setting: { zoomMain: 0.8, zoomDetail: 0.9, },
        visibleDetailView: true,
        visibleLine: true,
        isOpenCloseSearch: false,
        isOpenCloseDetailView: true,
        isOpenCloseNavigationView: true,
        isPositionLine: false,
        isDraggable: true,
        strSavePath: [], // Path List
        inputFileList: [], // input file 값저장 후 line 그리기 위해 어떤것이 들어왔는지 알려고
        numPanes: 1, //화면분할 몇개 했는지
        selectScreen: 1,
        editInputElement: [],
        editInputList: [],
        beforeSaveList: [], //save창에서 validation해서 save못했을 경우 저장해놓는 곳,
        openElement: [],// 화면에 어떤것이 보여지고 있는지 불러진 차례로 들어간다.
        connectionsLine: [], //저장시에 라인 정보 알고있어야 해서
        setLoadingProgress: false,
        elementLeft: null,
    },
    getters,
    mutations,
    actions: {}
});