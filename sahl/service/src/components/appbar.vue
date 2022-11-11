<template>
    <div>
        <v-tooltip bottom> 
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex" aria-label="Name" small icon v-bind="attrs" v-on="on" @click="showNavigation()">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </template>
            <span>Project Menu</span>
        </v-tooltip>
        <v-tooltip bottom>  
            <template v-slot:activator="{on, attrs}">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name" small icon v-bind="attrs" v-on="on" @click="newProject()">
                    <v-icon>mdi-folder-plus</v-icon>
                </v-btn>
            </template>
            <span>New Project</span>
        </v-tooltip>
        <v-dialog v-model='dialogNewProject' width="500" >
            <!-- <template v-slot:activator="{ on:ondialog}">
                <v-tooltip bottom>  
                    <template v-slot:activator="{on:ontooltip}">
                        <v-btn class="d-inline-flex ml-3 mr-1" small icon v-on="{ ...ontooltip, ...ondialog }">
                            <v-icon>mdi-folder-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>add Profect</span>
                </v-tooltip> 
            </template>-->
            <v-card>
                <v-card-title class="text-h6 green accent-1"> New Project </v-card-title>
                <v-card-text>
                    <v-text-field single-line label="project name" v-model="strProjectName" :rules="rules.name">
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="addproject()" >
                        Accept
                    </v-btn>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text @click="cancelproject">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-tooltip bottom>  
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name"  small icon v-bind="attrs" v-on="on" @click="loadProject()">
                    <v-icon> mdi-open-in-app</v-icon>
                </v-btn>
                <input ref="loadProject" class="d-none" aria-label="file" type="file" multiple @change="setProgressStart" @click="onClickLoadProject">
            </template>
            <span>Load Project</span>
        </v-tooltip>
        <v-tooltip bottom>  
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name"  small icon v-bind="attrs" v-on="on" @click="clickSave()">
                    <v-icon>mdi-content-save-settings</v-icon>
                </v-btn>
            </template>
            <span>Save Project</span>
        </v-tooltip>
        <v-tooltip bottom>  
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name"  small icon v-bind="attrs" v-on="on" @click="importFile()">
                    <v-icon> mdi-file-import</v-icon>
                </v-btn>
                <input ref="uploader" class="d-none" aria-label="file" type="file" multiple @change="changeImportFile" @click="onClickLoadFile">
            </template>
            <span>Import Arxml</span>
        </v-tooltip>
        <v-tooltip bottom>  
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name"  small icon v-bind="attrs" v-on="on" @click="importFolder()">
                    <v-icon> mdi-folder-download</v-icon>
                </v-btn>
                <input ref="uploaderFolder" class="d-none" type="file" webkitdirectory @change="changeImportFolder" @click="onClickImportFolder">
            </template>
            <span>Import Folder</span>
        </v-tooltip>
        <v-tooltip bottom>  
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name"  small icon v-bind="attrs" v-on="on" @click="clickExportFile()">
                    <v-icon>mdi-file-export</v-icon> 
                </v-btn>
            </template>
            <span>Export Arxml</span>
        </v-tooltip>
        <dialogSave v-model="dialogSaveWindow"/>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name" small icon v-bind="attrs" v-on="on" @click="clickValidate()">
                    <v-icon>mdi-play</v-icon>
                </v-btn>
            </template>
            <span>Validate</span>
        </v-tooltip>
        <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name" small icon v-bind="attrs" v-on="on" @click="showDetailView()">
                    <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
            </template>
            <span>Detail View Open</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" aria-label="Name" small icon v-bind="attrs" v-on="on" @click="setLindPosition()">
                    <v-icon>mdi-swap-vertical</v-icon>
                </v-btn>
            </template>
            <span>Position of the Line</span>
        </v-tooltip> -->
        
        <!-- <v-dialog v-model="dialogValidate" hide-overlay persistent width="600">
            <v-card >
                <v-card-text>
                    validate 체크중입니다. 기다려주세요.
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-card-text>
            </v-card>
        </v-dialog> -->
        <v-dialog v-model="dialogError" persistent width="600">
            <v-card >
                <v-alert v-model="dialogError" width="600" prominent border="left" outlined type="warning" dismissible>
                    먼저 Project를 만들어 주세요.
                </v-alert>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogLoadError" persistent width="600">
            <v-card >
                <v-alert v-model="dialogLoadError" width="600" prominent border="left" outlined type="warning" dismissible>
                    잘못된 형식의 파일입니다.
                </v-alert>
            </v-card>
        </v-dialog>
        <v-dialog v-model='dialogSelectNewProject' persistent width="500" >
            <v-card>
                <v-card-title class="text-h6 green accent-1">Project Start Option </v-card-title>
                <v-card-text>
                    <!-- <v-radio-group v-model="selectNewProject">
                        <v-radio label="Start a project with examples" value='examples'></v-radio>
                        <v-radio label="Start a project with nothing" value='nothing'></v-radio>
                    </v-radio-group> -->
                    <v-checkbox v-model="selectNewProject" label="Load default Template"></v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="selectCreateProject()" >
                        OK
                    </v-btn>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text @click="cancelCreateProject()">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogLoadingProgress" hide-overlay persistent width="500">
            <v-card color="primary" dark>
                <v-card-text>
                    Please stand by
                    <v-progress-linear indeterminate color="white" rounded class="mb-0" height="6"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogIsSave" persistent width="600">
            <v-card>
                <v-card-title class="text-h6 green accent-1"> 
                    <v-icon>mdi-alert-circle-outline</v-icon>
                </v-card-title>
                <v-card-text class="text-h5 text--primary text-center">
                    <br>
                    저장하고 새로운 프로젝트를 만드시겠습니까?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="saveAndNewPro()" >
                        Save
                    </v-btn>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="noSaveNewPro()" >
                        Do not save
                    </v-btn>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text @click="cancelNewPro()">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
//import draggable from "vuedraggable";
import dialogSave from '../components/dialogSave.vue'
import { EventBus } from '../main'
//import constants from '../store/constants'

export default({
    components: { dialogSave},//draggable
    computed: {
        SAHLProject() {
            return this.$store.state.SAHLProject
        },
        openProjectIndex () {
            return this.$store.state.openProjectIndex
        },
        navigatorList () {
            return this.$store.state.navigatorList
        },
        ismakeProject() {
            return this.$store.state.ismakeProject
        },
        visibleDetailView() {
            return this.$store.state.visibleDetailView
        },
        isOpenCloseDetailView() {
            return this.$store.state.isOpenCloseDetailView
        },
        setLoadingProgress() {
            return this.$store.state.setLoadingProgress
        }
    },
    watch: {
        ismakeProject(val) { // project가 없는상태에서 다른 compoment들을 만들어 놓으니 에러가 떠서 만들어줌
            this.isprojectOpen = val
        },
        setLoadingProgress(newVal) {
            console.log('=========== '+newVal)
            if (!newVal) {
                this.dialogLoadingProgress = false
            }
        },
    },
    data() {
        return {
            rules: { name:  [v => /^[a-zA-Z0-9]*$/.test(v) ]},
            isOpenCloseNavigation: true,
            isOpenCloseDetailV: true,
            isprojectOpen: false,
            isPositionofLine: true, // true: element아래에  / false: element위에 보여진다.
            dialogNewProject: false,
            dialogSelectNewProject: false,
            dialogValidate: false,
            strProjectName: '',
            dialogSaveWindow: false,
            dialogError: false,
            dialogLoadError: false,
            dialogLoadingProgress: false,
            dialogIsSave: false,
            selectNewProject: true,
        }
    },
    mounted() {
        EventBus.$on('shortcut-keys-appbar', (str) => {
            if (str == 'validation') {
                this.clickValidate()
            } else if (str == 'ImportARXML') {
                this.importFile()
            }
        })
        EventBus.$on('new-Project', () => this.newProject())
        EventBus.$on('load-Project', () => this.loadProject())
    },
    methods: {
        selectCreateProject() {
            this.dialogNewProject = true
            this.dialogSelectNewProject = false
        },
        cancelCreateProject() {
            this.dialogSelectNewProject = false
            this.selectNewProject = true
        },
        addproject () {
            if (this.strProjectName != '') {
                this.$store.commit('setmakeProject', {makeproject:true})
                this.$store.commit('addProject', {name:this.strProjectName})
                this.$store.commit('selectOpenProject', {openProjectIndex: (this.$store.getters.projectCount -1 )})
                if (this.selectNewProject) {
                    this.dialogLoadingProgress = true
                    this.$store.commit('setLoadingImport', {setProgress: true})
                    setTimeout(() => {this.$store.commit('newProjectAddElement', {})}, 500);
                    //this.addElement()
                }
                this.cancelproject()
            }
        },
        cancelproject () {
            this.dialogNewProject = false
            this.strProjectName = null
            this.selectNewProject = true
        },
        loadProject() {
            this.$refs.loadProject.click()
        },
        setProgressStart() {
            this.dialogLoadingProgress = true
            this.$store.commit('setLoadingImport', {setProgress: true})
            setTimeout(() => { this.changeloadProject()}, 500)
        },
        changeloadProject() {
            let file = this.$refs.loadProject.files[0];
            if(!file) {// || file.type !== 'text/plain') { //firefox에서 저장하면 확장자가 없음
                this.dialogLoadError = true
                setTimeout(() => {this.dialogLoadError = false}, 4000);
                return
            }
            
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload =  evt => {
                this.text = evt.target.result;
                const object = JSON.parse(evt.target.result)
                console.log(object)
                if (object[0].sahl == 'BNSoft') { // file 안에 sahl:'BNSoft'가 있어야  loading가능하다.
                    this.$store.commit('loadProject', {project: object})
                } else {
                    this.dialogLoadError = true
                    setTimeout(() => {this.dialogLoadError = false}, 4000);
                }
                /*object.forEach( item => {
                    console.log(item)
                    this.saveList.push(
                        { radio: item.radio, 
                          savename: item.savename, 
                          label: item.label, 
                          selectItem:undefined, 
                          saveFile: item.saveFile, },
                    )
                })*/
            }
            reader.onerror = evt => {
                console.error(evt);
            }    
        },
        onClickLoadProject(e) {
            e.target.value = ''
        },
        clickSave() {
            this.$store.commit('saveProject', {} )
        },
        onClickLoadFile(e) {
            e.target.value = ''
        },
        onClickImportFolder(e) {
            e.target.value = ''
        },
        changeImportFile () {
            this.dialogLoadingProgress = true
            this.$store.commit('setLoadingImport', {setProgress: true})

            let file = this.$refs.uploader.files;
            this.$store.commit('importFileprocess', {fileInfo:file})

            /*let type = file.name.split('.')
            if(!file && (type[1] != "arxml" || type[1] != 'xml')){//file.type !== 'text/xml')) {
                console.log(file)
                return;
            }
            
            let reader = new FileReader();
            reader.readAsText(file, );
            reader.onload =  evt => {
                this.text = evt.target.result;
                this.$store.commit('importFileprocess', {fileInfo:evt.target.result, filename: file.name})
            }
            reader.onerror = evt => {
                console.error(evt);
            }*/
        },
        changeImportFolder () {
            const files = this.$refs.uploaderFolder.files
            this.$store.commit('importFileprocess', {fileInfo:files})
        },
        clickExportFile() {
            if(!this.isprojectOpen){
                this.dialogError = true
                setTimeout(() => {this.dialogError = false}, 4000);
            } else {
                this.dialogSaveWindow = true
            }
        },
        clickValidate() {
            console.log('clickValidate')
            //this.dialogValidate = true
            this.$store.commit('setCheckValidate')
        },
        newProject() {
            if (this.$store.state.SAHLProject.length == 0) {
                this.dialogSelectNewProject = true
            } else {
                this.dialogIsSave = true
            }
        },
        showNavigation() {
            this.isOpenCloseNavigation = this.isOpenCloseNavigation ? false : true
            this.$store.commit('setOpenCloseNavigationView', {isopen: this.isOpenCloseNavigation} )
        },
        showDetailView() {
            if (this.$store.state.visibleDetailView) {
                this.isOpenCloseDetailV = this.$store.state.isOpenCloseDetailView
                this.isOpenCloseDetailV = this.isOpenCloseDetailV ? false : true
                this.$store.commit('setOpenCloseDetailView', {isopen: this.isOpenCloseDetailV} )
            }
        },
        importFile() {
            if(!this.isprojectOpen){
                this.dialogError = true
                setTimeout(() => {this.dialogError = false}, 4000);
            } else {
                this.$refs.uploader.click()
            }
        },
        importFolder() {
            if(!this.isprojectOpen){
                this.dialogError = true
                setTimeout(() => {this.dialogError = false}, 4000);
            } else {
                this.$refs.uploaderFolder.click()
            }
        },
        setLindPosition() {
            this.isPositionofLine = this.isPositionofLine ? false : true
            this.$store.commit('setPositionofLine', {up: this.isPositionofLine})
        },
        addElement() {
            this.$store.commit('newProjectAddElement', {name: this.strProjectName})
        },
        cancelNewPro() {
            this.dialogIsSave = false
        },
        saveAndNewPro() {
            this.$store.commit('saveProject', {} )
            this.noSaveNewPro()
        },
        noSaveNewPro() {
            this.$store.commit('deleteProject', {})
            this.cancelNewPro()
            this.dialogSelectNewProject = true
        },
    },
})
</script>
