<template>
    <div>
        <v-tooltip bottom> 
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex" small icon v-bind="attrs" v-on="on" @click="showNavigation()">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </template>
            <span>project menu</span>
        </v-tooltip>
        <v-dialog v-model='dialogNewProject' width="500" >
            <template v-slot:activator="{ on:ondialog}">
                <v-tooltip bottom>  
                    <template v-slot:activator="{on:ontooltip}">
                        <v-btn class="d-inline-flex ml-3 mr-1" small icon v-on="{ ...ontooltip, ...ondialog }">
                            <v-icon>mdi-folder-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>add Profect</span>
                </v-tooltip>
            </template>
            <v-card>
                <v-card-title class="text-h6 green accent-1"> Name New Project </v-card-title>
                <v-card-text>
                    <v-text-field single-line label="project name" v-model="strProjectName">
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
                <v-btn class="d-inline-flex ml-3 mr-1"  small icon v-bind="attrs" v-on="on" @click="inputFile()">
                    <v-icon> mdi-open-in-app</v-icon>
                </v-btn>
                <input ref="uploader" class="d-none" type="file" @change="uploadProject">
            </template>
            <span>File input</span>
        </v-tooltip>
        <v-tooltip bottom>  
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1"  small icon v-bind="attrs" v-on="on" @click="clickSave()">
                    <v-icon> mdi-content-save-settings</v-icon>
                </v-btn>
            </template>
            <span>select save</span>
        </v-tooltip>
        <dialogSave v-model="dialogSaveWindow"/>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" small icon v-bind="attrs" v-on="on" @click="clickValidate()">
                    <v-icon>mdi-play</v-icon>
                </v-btn>
            </template>
            <span>validate</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-inline-flex ml-3 mr-1" small icon v-bind="attrs" v-on="on" @click="showDetailView()">
                    <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
            </template>
            <span>Detail View Open</span>
        </v-tooltip>
        
        <v-dialog v-model="dialogValidate" hide-overlay persistent width="600">
            <v-card >
                <v-card-text>
                    validate 체크중입니다. 기다려주세요.
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogError" persistent width="600">
            <v-card >
                <v-alert v-model="dialogError" width="600" prominent border="left" outlined type="warning" dismissible>
                    먼저 Project를 만들어 주세요.
                </v-alert>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
//import draggable from "vuedraggable";
import dialogSave from '../components/dialogSave.vue'
import { EventBus } from '../main'

export default({
    components: { dialogSave},//draggable
    computed: {
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
        checkVaildation() {
            return this.$store.state.checkVaildation
        },
    },
    watch: {
        ismakeProject(val) { // project가 없는상태에서 다른 compoment들을 만들어 놓으니 에러가 떠서 만들어줌
            this.isprojectOpen = val
        },
        checkValidate(val) {
            //console.log(val)
            if (!val){
                return
            }
            this.dialogValidate = false
            this.checkValidate = false
            this.$store.commit('setcheckVaildation', {value: false})
        },
        checkVaildation(value) {
            this.checkValidate = value
        }
    },
    data() {
        return {
            rules: { name:  [val => (val || '').length > 0 ]},
            isOpenCloseNavigation: true,
            isOpenCloseDetailV: true,
            isprojectOpen: false,
            dialogNewProject: false,
            dialogValidate: false,
            strProjectName: null,
            checkValidate: false,
            dialogSaveWindow: false,
            dialogError: false,
        }
    },
    mounted() {
          EventBus.$on('shortcut-keys-appbar', (str) => {
              if (str == 'validation') {
                  this.clickValidate()
              } else if (str == 'openfile') {
                  this.inputFile()
              }
          })
    },
    methods: {
        addproject () {
            this.$store.commit('addProject', {name:this.strProjectName})
            this.$store.commit('selectOpenProject', {openProjectIndex: (this.$store.getters.projectCount -1 )})
            this.$store.commit('setmakeProject', {makeproject:true})
            this.dialogNewProject = false
            this.strProjectName = null
        },
        cancelproject () {
            this.dialogNewProject = false
            this.strProjectName = null
        },
        removeproject () {
            alert(this.$store.s.projectCount)
        },
        uploadProject () {    
            let file = this.$refs.uploader.files[0];
            if(!file || file.type !== 'text/xml') return;
            
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload =  evt => {
                this.text = evt.target.result;
                this.$store.commit('uploadFileprocess', {fileInfo:evt.target.result})
            }
            reader.onerror = evt => {
                console.error(evt);
            }        
        },
        uploadSaveFile () {
            let file = this.$refs.saveloader.files[0];
            if(!file || file.type !== 'text/plain') return;
            
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload =  evt => {
                this.text = evt.target.result;
                const object = JSON.parse(evt.target.result)
                this.saveList = []
                object.forEach( item => {
                    this.saveList.push(
                        { radio: item.radio, 
                          savename: item.savename, 
                          label: item.label, 
                          selectItem:undefined, 
                          saveFile: item.saveFile, },
                    )
                })
            }
            reader.onerror = evt => {
                console.error(evt);
            }        
        },
        clickSave() {
            if(!this.isprojectOpen){
                this.dialogError = true
                setTimeout(() => {this.dialogError = false}, 4000);
            } else {
                this.dialogSaveWindow = true
            }
        },
        clickValidate() {
            console.log('clickValidate')
            this.dialogValidate = true
            this.$store.commit('setCheckValidate')
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
        inputFile() {
            if(!this.isprojectOpen){
                this.dialogError = true
                setTimeout(() => {this.dialogError = false}, 4000);
            } else {
                this.$refs.uploader.click()
            }
        },
    },
})
</script>
