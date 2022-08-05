<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showE2EProfileConfigS">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>E2E Profile Configuration Set</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>E2E Profile Configuration Set</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputE2EProfileConfigSName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showE2EProfileConfig" x-small color="indigo">
                                            <v-icon>{{ isE2EProfileConfigOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    E2E Profile Configurations
                                    <v-btn v-if="isE2EProfileConfigOpenClose" @click="addE2EProfileConfig()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isE2EProfileConfigOpenClose">
                                    <v-tabs v-model='configTab' height="30px" show-arrows @change="changeE2EProfileConfigTab()">
                                        <v-tab v-for="(tab, idx) in element.profile" :key="idx" @click="clickE2EProfileConfigTab()"> 
                                            {{tab.configName}}
                                            <v-btn text x-small @click="deleteE2EProfileConfig(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="configTab">
                                        <v-tab-item v-for="(tab, idx) in element.profile" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.configName" label="Name" @input='inputConfigName' @click="clickConfigName(tab.configName)" :rules="rules.name" placeholder="String" style="height: 25px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                    <v-checkbox v-model="tab.invalid" label="Clear From Valid To Invalid" value="tab.invalid" :indeterminate="tab.invalid==null? true:false" true-value="true" false-value="false" @click="setactiveUUID()" style="height: 35px;"></v-checkbox>
                                                    <v-select v-model="tab.IDMode" :items="enumDataIDMode" label="Data Id Mode" @click="setactiveUUID()" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                                                    <v-text-field v-model="tab.MaxConter" label="Max Delta Counter" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.errorInit" label="Max Error State Init" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.errorInvalid" label="Max Error State Invalid" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.errorValid" label="Max Error State Valid" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.okInit" label="Min OK State Init" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.okInvalid" label="Min OK State Invalid" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.okValid" label="Min OK State Valid" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.profileName" label="Profile Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.sizeInit" label="Window Size Init" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.sizeInvalid" label="Window Size Invalid" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.sizeValid" label="Window Size Valid" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                </v-card-text>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs-items>
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                        <v-card-text v-else-if="zoomvalue > $setZoominElement  || !minimaptoolbar">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        readonly outlined dense></v-text-field>
                        </v-card-text>
                    </v-card>
                </template>
                <span>{{ element.name }}</span>
            </v-tooltip>
        </v-container>
    </div>
</template>

<script>
import dialogPathSetting from '../components/dialogPathSetting.vue'

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar'],
    components:{dialogPathSetting},
    computed: {
        activeUUID() {
            return this.$store.state.activeUUID
        },
        detailViewUUID() {
            return this.$store.state.detailViewUUID
        },
        setting() {
            return this.$store.state.setting
        },
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        },
        setting(value) {
            this.zoomvalue = value.zoomMain
            if (this.zoomvalue < this.$setZoominTooltip) {
                this.isTooltip = false
            } else {
                this.isTooltip = this.minimaptoolbar
            }
        },
    },
    created() {
        this.setToolbarColor(this.$store.state.activeUUID)
    },

    data() {
        return {
            rules: {
                name:  [val => (val || '').length > 0 ],
            },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            isE2EProfileConfigOpenClose : true,
            enumDataIDMode: ['ALL-16-BIT', 'LOWER-12-BIT',],
            configTab: null,
            beforeName: '',
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
        },
        setToolbarColor(activeid) 
        {
            if(this.element.uuid == activeid) {
                this.colorToolbar = "#FF1493" 
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        setToolbarColorDetailView(isdetail) {
            if(this.element.uuid == isdetail) {
                this.colorToolbar = "#B0E0E6" 
            } else if (this.element.uuid == this.$store.state.activeUUID) {
                this.colorToolbar  = "#FF1493"
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        showE2EProfileConfigS() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
        },
        showE2EProfileConfig() {
            this.isE2EProfileConfigOpenClose = this.isE2EProfileConfigOpenClose ? false : true
        },
        inputE2EProfileConfigSName() {
            this.$store.commit('editE2EProfileConfig', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickConfigName(name) {
            this.beforeName = name
        },
        inputConfigName() {
            console.log('inputConfigName')
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'E2Econfig', listname: this.element.profile[this.configTab].configName, beforename: this.beforeName} )
            this.beforeName = this.element.profile[this.configTab].configName
        },

        addE2EProfileConfig() {
            const editItem = {configName: '', invalid: null, IDMode: null, MaxConter: '', errorInit: '', 
                              errorInvalid: '', errorValid: '', okInit: '', okInvalid: '', okValid: '', profileName: '',
                              sizeInit: '', sizeInvalid: '', sizeValid: '', id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.configName = 'E2EProfConfig_' + n++;
                res = this.element.profile.some(ele => ele.configName === addObj.configName)
            }
            addObj.id = n
            this.element.profile.push(addObj)
            this.configTab = this.element.profile.length-1
        },
        clickE2EProfileConfigTab() {
        },
        changeE2EProfileConfigTab() {
        },
        deleteE2EProfileConfig(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'E2Econfig', deleteTab: true, tabName: this.element.profile[idx].configName, path: this.element.path, name: this.element.name})
            this.element.profile.splice(idx, 1)
        },
        
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editE2EProfileConfig', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
    },
}
</script>
