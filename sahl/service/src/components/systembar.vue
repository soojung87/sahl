<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    File
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in fileItem" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    Project
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in projectItem" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    Save
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in saveItem" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    Tool
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in toolItem" :key="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    Search
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in searchItem" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    Help
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in helpItem" :key="index" @click="item.menuAction(item.title)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-dialog v-model='dialogNewProject' width="500" persistent>
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
        <v-dialog v-model='dialogSetting' width="500" persistent>
            <v-card>
                <v-card-title class="text-h6 green accent-1"> Settings</v-card-title>
                <v-subheader >Main View Zoom</v-subheader>
                <v-card-text>
                    <v-slider v-model="zoomMain" append-icon="mdi-magnify-plus-outline" prepend-icon="mdi-magnify-minus-outline"
                        :max="2" :min="0.3" @click:append="zoomMainIn" @click:prepend="zoomMainOut" step="0.05" ticks="always" tick-size="3"></v-slider>
                </v-card-text>
                <v-subheader >Detail View</v-subheader>
                <v-card-text>
                    <v-switch v-model="switchDetailView" inset :label="switchDetailView ? 'visible' : 'unvisible'" @change="changeDetailView()"></v-switch>
                </v-card-text>
                <v-subheader >Detail View Zoom</v-subheader>
                <v-card-text>
                    <v-slider v-model="zoomDetail" append-icon="mdi-magnify-plus-outline" prepend-icon="mdi-magnify-minus-outline"
                        :max="1.2" :min="0.8" @click:append="zoomDetailIn" @click:prepend="zoomDetailOut" step="0.1" ticks="always" tick-size="3"></v-slider>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="saveSetting()" >
                        Save
                    </v-btn>
                    <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text @click="cancelSetting()">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogError" persistent width="600">
            <v-card >
                <v-alert v-model="dialogError" width="600" prominent border="left" outlined type="warning" dismissible>
                    먼저 Project를 만들어 주세요.
                </v-alert>
            </v-card>
        </v-dialog>
        <dialogSave v-model="dialogSaveWindow"/>
    </div>
</template>

<script>
import dialogSave from '../components/dialogSave.vue'
import { EventBus } from '../main'

export default({
    components: { dialogSave},
    computed: {
        setting() {
            return this.$store.state.setting
        },
        visibleDetailView() {
            return this.$store.state.visibleDetailView
        },
        ismakeProject() {
            return this.$store.state.ismakeProject
        },
    },
    watch: {
        ismakeProject() { // project가 없는상태에서 다른 compoment들을 만들어 놓으니 에러가 떠서 만들어줌
            this.isprojectOpen = true
        }
    },
    data() {
        return {
            fileItem: [
                { title: 'New File', menuAction: action => { this.newFile(action) }},
                { title: 'Delete File', menuAction: action => { this.deleteFile(action) }},
                { title: 'Close Screen'},
            ],
            projectItem: [
                { title: 'New Prpject',    menuAction: action => { this.newProject(action) }},
                { title: 'Delete Prpject'},
                { title: 'Open'},
                { title: 'Save'},
                { title: 'Auto Save'},
                { title: 'Revert Prpject'},
                { title: 'Close Screen'},
            ],
            saveItem: [
                { title: 'Save as', menuAction: action => { this.save(action) }},
            ],
            toolItem: [
                { title: 'Undo'},
                { title: 'Redo'},
                { title: 'Cut'},
                { title: 'Copy'},
                { title: 'Paste'},
            ],
            searchItem: [
                { title: 'Search', menuAction: action => { this.setSearch(action) }},
            ],
            helpItem: [
                { title: 'Manual', },
                { title: 'Setting', menuAction: action => { this.setSetting(action) }},
            ],
            dialogNewProject: false,
            dialogSetting: false,
            strProjectName: null,
            zoomMain: 0,
            zoomDetail: 0,
            dialogSaveWindow: false,
            isprojectOpen: false,
            dialogError: false,
            isOpenCloseSearch: false,
            switchDetailView: this.$store.state.visibleDetailView,
        }
    },
    methods: {
        newProject() {
            this.dialogNewProject = true
        },
        newFile() {
            if (this.isprojectOpen) {
                EventBus.$emit('new-file',)
            }
        },
        deleteFile() {
            if (this.isprojectOpen) {
              EventBus.$emit('delete-file',)
            }
        },
        setSetting() {
            this.zoomMain = this.$store.state.setting.zoomMain
            this.zoomDetail = this.$store.state.setting.zoomDetail
            this.dialogSetting = true
        },
        setSearch() {
            if(!this.isprojectOpen){
                this.dialogError = true
                setTimeout(() => {this.dialogError = false}, 4000)
            } else {
                this.isOpenCloseSearch = this.isOpenCloseSearch ? false : true
                this.$store.commit('setOpenCloseSearch', {isopen: this.isOpenCloseSearch} )
            }
        },
        addproject () {
            this.$store.commit('addProject', {name:this.strProjectName})
            this.$store.commit('selectOpenProject', {openProjectIndex: (this.$store.getters.projectCount -1 )})
            this.$store.commit('setmakeProject', {makeproject:true})
            this.cancelproject()
        },
        cancelproject () {
            this.dialogNewProject = false
            this.strProjectName = null
        },
        save() {
            if(!this.isprojectOpen){
                this.dialogError = true
                setTimeout(() => {this.dialogError = false}, 4000)
            } else {
                this.dialogSaveWindow = true
            }
        },
        saveSetting() {
            this.$store.commit('setZoomInOut', {valueMain: this.zoomMain, valueDetail: this.zoomDetail})
            this.cancelSetting()
        },
        cancelSetting() {
            this.dialogSetting = false
        },
        changeDetailView() {
            this.$store.commit('setVisibleDetailView', {visible : this.switchDetailView})
            this.$store.commit('setOpenCloseDetailView', {isopen: true} )
        },
        zoomMainOut () {
            this.zoomMain = this.zoomMain <= 0.2 ? 0.2 : this.zoomMain - 0.1
        },
        zoomMainIn () {
            this.zoomMain = this.zoomMain >= 2 ? 2 : this.zoomMain + 0.1
        },
        zoomDetailOut () {
            this.zoomDetail = this.zoomDetail <= 0.8 ? 0.8 : this.zoomDetail - 0.1
        },
        zoomDetailIn () {
            this.zoomDetail = this.zoomDetail >= 1.2 ? 1.2 : this.zoomDetail + 0.1
        },

    },
})
</script>
