<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn  icon @click="showError">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>AP Application Error</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>AP Application Error</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputErrorName' outlined dense></v-text-field>
                    <v-text-field v-model="element.desc" label="Desc" placeholder="string" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.errorcode" label="Error Code" placeholder="int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="element.errorDref" readonly @click="setErrorDSelect()" clearable @click:clear='clearErrorD()' label="Error Domain Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/errordomain'" dark icon v-bind="attrs" v-on="on" @click="setErrorDList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selErrorDomain" :key="i" link @click="setErrorD(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newErrorD" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text v-else>
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                readonly outlined dense></v-text-field>
                </v-card-text>
            </v-card>
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
        }
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        }
    },
    created() {
        this.setToolbarColor(this.$store.state.activeUUID)
    },
    data() {
        return {
            rules: {
                name:  [val => (val || '').length > 0 ],
            },
            colorToolbar: "#6A5ACD",
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            selErrorDomain: this.$store.getters.getErrorDomain,
            dialogPath: false,
            path:'aaaaaaaaa',
        }
    },
    mounted () {
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
        },
        setToolbarColor(uuid) 
        {
            if(this.element.uuid == uuid) {
                this.colorToolbar = "#FF1493" 
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        setToolbarColorDetailView(isdetail) {
            if(this.element.uuid == isdetail) {
                this.colorToolbar = "#B0E0E6" 
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        showError () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        inputErrorName () {
            this.$store.commit('editError', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
        },

        clearErrorD() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/errordomain')
            if (endLine != undefined) {
                this.element.errorDref = null
                this.deleteLine(this.element.uuid+'/errordomain')
            }
        },
        setErrorDSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/errordomain')
            if (endLine == undefined) {
                endLine = this.$store.getters.getErrorDomainPath(this.element.errorDref)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ErrorDomain_str} )
            }
        },
        setErrorDList() {
            this.selErrorDomain = this.$store.getters.getErrorDomain
            this.setactiveUUID()
        },
        setErrorD(item){
            console.log(item)
            if( this.element.errorDref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/errordomain')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/errordomain')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/errordomain', this.element.uuid+'/errordomain', item.uuid)
                this.element.errorDref = item.name
            }
            this.setactiveUUID()
        },
        newErrorD() {
            this.$store.commit('addElementErrorDomain', {
                name: this.$store.getters.getNameErrorDomain,  input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                namespace:'', value:'',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.Errors_str)
            EventBus.$emit('add-element', constant.ErrorDomain_str)
            this.$store.commit('editError', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editError', {compo:"z", uuid:this.element.uuid, zindex:10} )
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