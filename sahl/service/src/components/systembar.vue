<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    File
                </v-btn>
            </template>
            <v-list>
                <template v-for="(item, index) in fileItem.slice(0, 7)">
                    <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                    <v-list-item v-else :key="index" @click="item.menuAction(item.title)">
                            <v-icon  left small>{{item.icon}} </v-icon> 
                            <v-list-item-content  class="font-weight-medium">
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action v-text="item.Shortcut" class="font-weight-light"></v-list-item-action>
                    </v-list-item>
                </template>
            </v-list>
        </v-menu>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    Project
                </v-btn>
            </template>
            <v-list>
                <template v-for="(item, index) in projectItem.slice(0, 5)">
                    <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                    <v-list-item v-else :key="index" @click="item.menuAction(item.title)">
                            <v-icon  left small>{{item.icon}} </v-icon> 
                            <v-list-item-content class="font-weight-medium">
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action v-text="item.Shortcut" class="font-weight-light"></v-list-item-action>
                    </v-list-item>
                </template>
            </v-list>
        </v-menu>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    Tool
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in toolItem" :key="index"  @click="item.menuAction(item.title)">
                    <v-icon  left small>{{item.icon}} </v-icon> 
                    <v-list-item-content class="font-weight-medium">
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action v-text="item.Shortcut" class="font-weight-light"></v-list-item-action>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    Setting
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in settingItem" :key="index" @click="item.menuAction(item.title)">
                    <v-icon  left small>{{item.icon}} </v-icon> 
                    <v-list-item-content class="font-weight-medium">
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action v-text="item.Shortcut" class="font-weight-light"></v-list-item-action>
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
                    <v-icon  left small>{{item.icon}} </v-icon> 
                    <v-list-item-content class="font-weight-medium">
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action v-text="item.Shortcut" class="font-weight-light"></v-list-item-action>
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
                    <v-switch v-model="switchDetailView" inset :label="switchDetailView ? 'visible' : 'unvisible'"></v-switch>
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

document.onkeydown = function(e) { //단축키 만들기
  //console.log(e)
  if(e.shiftKey && e.keyCode == 78) { // shift+n  => new file
    EventBus.$emit('shortcut-keys', 'newfile')
  } 
  if(e.shiftKey && e.keyCode == 79) { //shift+o => open file
  EventBus.$emit('shortcut-keys-appbar', 'openfile')
  }
  if(e.shiftKey && e.keyCode == 83) { //shift+s => save
  EventBus.$emit('shortcut-keys', 'save')
  }
  if(e.ctrlKey && e.keyCode == 86 && e.shiftKey) { //ctrl+shift+v => validation check
  EventBus.$emit('shortcut-keys-appbar', 'validation')
  }
  if(e.ctrlKey && e.keyCode == 70 && e.shiftKey) { //ctrl+shift+f => search
  EventBus.$emit('shortcut-keys', 'search')
  }
  if(e.ctrlKey && e.keyCode == 68 && e.shiftKey) { //ctrl+shift+d => delete file
  EventBus.$emit('shortcut-keys', 'deletefile')
  }
  if(e.shiftKey && e.keyCode == 69) { //shift+e => setting
  EventBus.$emit('shortcut-keys', 'setting')
  }
}

export default({
    components: { dialogSave},
    computed: {
        setting() {
            return this.$store.state.setting
        },
        visibleDetailView() {
            return this.$store.state.visibleDetailView
        },
        visibleLine() {
            return this.$store.state.visibleLine
        },
        ismakeProject() {
            return this.$store.state.ismakeProject
        },
    },
    watch: {
        ismakeProject(val) { // project가 없는상태에서 다른 compoment들을 만들어 놓으니 에러가 떠서 만들어줌
            this.isprojectOpen = val
        }
    },
    data() {
        return {
            fileItem: [
                { title: 'New File', Shortcut:'Shift+N', icon:'mdi-file-plus', menuAction: action => { this.newFile(action) }},
                { title: 'Delete File', Shortcut:'Ctrl+Shift+D', icon:'mdi-delete', menuAction: action => { this.deleteFile(action) }},
                { title: 'Open File', Shortcut:'Shift+O', icon:'mdi-open-in-app', menuAction: action => { this.inputFile(action) }},
                { divider: true, inset: true},
                { title: 'Save', Shortcut:'Shift+S', icon:'mdi-content-save', menuAction: action => { this.save(action) }},
                { divider: true, inset: true},
                { title: 'Exit', icon:'mdi-exit-to-app'}
            ],
            projectItem: [
                { title: 'New Project', icon:'mdi-folder-plus',  menuAction: action => { this.newProject(action) }},
                { title: 'Delete Project', icon:'mdi-delete', menuAction: () => {  }},
                { title: 'Close Project', icon:'mdi-window-close', menuAction: () => {  }},
                { divider: true, inset: true},
                { title: 'Save', Shortcut:'Shift+S', icon:'mdi-content-save', menuAction: action => { this.save(action) }}
            ],
            toolItem: [
                { title: 'Search', Shortcut:'Ctrl+Shift+F', icon:'mdi-magnify', menuAction: action => { this.setSearch(action) }},
            ],
            settingItem: [
                { title: 'Setting', Shortcut:'Shigt+E', icon:'mdi-cog-outline', menuAction: action => { this.setSetting(action) }},
                { title: 'Visible Line', icon:'mdi-vector-line', menuAction: action => { this.setVisibleLine(action) }},
            ],
            helpItem: [
                { title: 'Manual', icon:'mdi-help-circle-outline', },
            ],
            dialogNewProject: false,
            dialogSetting: false,
            strProjectName: null,
            zoomMain: this.$store.state.setting.zoomMain,
            zoomDetail: this.$store.state.setting.zoomDetail,
            dialogSaveWindow: false,
            isprojectOpen: false,
            dialogError: false,
            isOpenCloseSearch: false,
            switchDetailView: this.$store.state.visibleDetailView,
        }
    },
    mounted() {
        EventBus.$on('shortcut-keys', (str) => {
            console.log(str)
            if (str == 'newfile') {
                this.newFile()
            } else if (str == 'save') {
                this.save()
            } else if (str == 'search') {
                this.setSearch()
            } else if (str == 'deletefile') {
                this.deleteFile()
            } else if (str == 'setting') {
                this.setSetting()
            }
        })
    },
    methods: {
        newProject() {
            this.dialogNewProject = true
        },
        newFile() {
            if (this.isprojectOpen) {
                EventBus.$emit('new-file')
            }
        },
        deleteFile() {
            if (this.isprojectOpen) {
              EventBus.$emit('delete-file')
            }
        },
        inputFile() {
            EventBus.$emit('shortcut-keys-appbar', 'openfile')
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
            this.$store.commit('setVisibleDetailView', {visible : this.switchDetailView})
            this.$store.commit('setOpenCloseDetailView', {isopen: this.switchDetailView} )
            this.cancelSetting()
        },
        cancelSetting() {
            this.dialogSetting = false
            this.switchDetailView = this.$store.state.visibleDetailView
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
        setVisibleLine() {
            var isVisible = this.$store.state.visibleLine ? false : true
            this.$store.commit('setVisibleLine', {isvisible: isVisible})
        },

    },
})
</script>
