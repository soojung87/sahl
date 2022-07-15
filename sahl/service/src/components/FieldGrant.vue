<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showFieldG">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Com Field Grant</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Com Field Grant</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputFieldGName' outlined dense  @click="setactiveUUID"></v-text-field>
                            <v-select v-model="element.role" :items="roleLaunch" clearable label="Role" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.fieldD" readonly @click="setFieldDRefSelect()" clearable @click:clear='clearFieldDRef()' label="Design Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/FieldGD'" dark icon v-bind="attrs" v-on="on" @click="setFieldDList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selFieldD" :key="i" link @click="setFieldD(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newFieldD()" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.provide" readonly @click="setProvideSelect()" clearable @click:clear='clearProvide()' label="Target Field Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/FGProvide'" icon v-bind="attrs" v-on="on" @click="setProvideList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list >
                                            <v-list-item v-for="(item, i) in selProvide" :key="i" link @click="setProvide(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newProvide()" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-text v-else-if="zoomvalue > $setZoominElement || !minimaptoolbar">
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
import constant from "../store/constants.js"
import { EventBus } from "../main.js"
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
            roleLaunch: ['GETTER-SETTER',],
            selFieldD: this.$store.getters.getFieldGrantDesign,
            selProvide: this.$store.getters.getProvidedSomeIP,
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
        showFieldG() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        inputFieldGName() {
            this.$store.commit('editFieldG', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clearFieldDRef() {
            this.element.fieldD = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/FieldGD')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/FieldGD')
            }
        },
        setFieldDRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/FieldGD')
            if (endLine == undefined) {
                endLine = this.$store.getters.getFieldDesignPath(this.element.fieldD)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ComFieldGDesign_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setFieldDList() {
            this.selFieldD = this.$store.getters.getFieldGrantDesign
            this.setactiveUUID()
        },
        setFieldD(item) {
            if(this.element.fieldD != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/FieldGD')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/FieldGD')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/FieldGD', this.element.uuid+'/FieldGD', item.uuid)
                this.element.fieldD = item.name
            }
            this.setactiveUUID()
        },
        newFieldD() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementFieldGD', { 
                name: this.$store.getters.getNameFieldGD, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                processD: null, SIField: null, role: null
            })
            EventBus.$emit('add-element', constant.ComFieldGDesign_str)
            EventBus.$emit('add-element', constant.IAM_str)
            EventBus.$emit('add-element', constant.Platform_str)
            this.$store.commit('editFieldG', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setProvideSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/FGProvide')
            if (endLine == undefined) {
                endLine = this.$store.getters.getProvidedSomeIPPath(this.element.provide)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ProvidedSomeIP_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        newProvide() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementProvidedSomeIP', {
                name: this.$store.getters.getNameProvidedSomeIP, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                deployref: null, someipserver: null, id: '', eventP: [], method: [], eventG: [],
            })
            EventBus.$emit('add-element', constant.ProvidedSomeIP_str)
            EventBus.$emit('add-element', constant.ServiceInstances_str)
            EventBus.$emit('add-element', constant.Service_str)
            this.$store.commit('editFieldG', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        clearProvide() {
            this.element.provide = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/FGProvide')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/FGProvide')
            }
        },
        setProvideList() {
            this.selProvide = this.$store.getters.getProvidedSomeIP
            this.setactiveUUID()
        },
        setProvide(item) {
            if(this.element.provide != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/FGProvide')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/FGProvide')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/FGProvide', this.element.uuid+'/FGProvide', item.uuid)
                }
                this.element.provide = item.name
            }
            this.setactiveUUID()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editFieldG', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
        deleteLine(fineLine) {
            var linenum = this.$store.getters.getconnectLineNum(fineLine)
            if (linenum != -1) {
                EventBus.$emit('delete-line', linenum)
                this.$store.commit('deletConnectionline', {startnum: linenum} )
            }
        },
        newLine(startLine, drawLine, endLine) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            EventBus.$emit('new-line', drawLine, endLine)
        },

    },
}
</script>
