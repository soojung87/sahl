<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showErrorSet">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>AP Application Error Set</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>AP Application Error Set</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputErrorSetName' outlined dense></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/error'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showErrorRef" x-small color="indigo">
                                    <v-icon>{{ isErrorRefOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Error Reference
                            <v-btn @click="isCheckErrorRef" text x-small color="indigo" v-if="isErrorRefOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isErrorRefOpenClose && isdeleteErrorRefItem" @click="deletErrorRef" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isErrorRefOpenClose">
                            <v-data-table v-model="selectDelectErrorRef" :headers="headerErrorRef" :items="element.errorref" :items-per-page='20'
                                    :show-select="isdeleteErrorRefItem" item-key="id" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteErrorRefItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openErrorRef(idx)" @cancel="editErrorRef(idx)" @save="cancelErrorRef" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editItem.error' label='Error Reference' :items='selError' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingError" clearable @click="setErrorSelect()" 
                                                                    @click:clear='clearErrorRef' @blur="isEditingError=true" outlined dense style="height: 45px;">
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newError">
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                            </template>
                                                        </v-autocomplete>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addErrorRef()" @save="cancelErrorRef"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editItem.error' label='Error Reference' :items='selError' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingError" clearable @click="setErrorSelect()" 
                                                                    @click:clear='clearErrorRef' @blur="isEditingError=true" outlined dense style="height: 45px;">
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newError">
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                            </template>
                                                        </v-autocomplete>
                                                    </template>
                                                </v-edit-dialog>
                                            </th>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
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
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            isErrorRefOpenClose: true,
            selError: this.$store.getters.getError,
            isEditingError: true,
            isdeleteErrorRefItem: false,
            selectDelectErrorRef: [],
            headerErrorRef: [
                { text: 'AP Application Error Ref', align: 'start', sortable: false, value: 'error' },
            ],
            errorItem: [],
            editItem: { error : null, id: ''},
            deleteChangeLine : [],
        }
    },
    mounted () {
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
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
            } else if (this.element.uuid == this.$store.state.activeUUID) {
                this.colorToolbar  = "#FF1493"
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        showErrorSet () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showErrorRef() {
            this.isErrorRefOpenClose = this.isErrorRefOpenClose ? false : true
        },
        inputErrorSetName () {
            this.$store.commit('editErrorSet', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        isCheckErrorRef() {
            if (this.isdeleteErrorRefItem == true) {
                this.isdeleteErrorRefItem = false
                this.selectDelectErrorRef = []
            } else {
                this.isdeleteErrorRefItem = true
            }
        },
        deletErrorRef() {
            if (this.isdeleteErrorRefItem == true) {
                for(let i=0; i<this.element.errorref.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLine.push({name:this.element.errorref[i].error, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/error-'+i)
                    }
                }

                this.element.errorref = this.element.errorref.filter(item => {
                        return this.selectDelectErrorRef.indexOf(item) < 0 })

                for(let n=0; n<this.element.errorref.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLine.length; idx++) {
                        if (this.element.errorref[n].error == this.deleteChangeLine[idx].name) {
                            this.newLine(this.element.uuid+'/error-'+n, this.element.uuid+'/error', this.deleteChangeLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteErrorRefItem = false
                this.selectDelectErrorRef = []
                this.deleteChangeLine = []
            } 
        },
        openErrorRef(idx) {
            this.selError = this.$store.getters.getError
            if ( this.element.errorref[idx].error != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorPath(this.element.errorref[idx].error)
                }
                this.editItem.error = { name: this.element.errorref[idx].error, uuid: endLine }
            }
        },
        editErrorRef(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/error-'+idx)
            if (endLine != undefined && this.editItem.error == null) {
                this.deleteLine(this.element.uuid+'/error-'+idx)
                this.element.errorref[idx].error = null
            } else if (endLine != undefined && endLine != this.editItem.error.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/error-'+idx)
                this.newLine(this.element.uuid+'/error-'+idx, this.element.uuid+'/error', this.editItem.error.uuid)
                this.element.errorref[idx].error = this.editItem.error.name
            } else if (endLine == undefined && this.editItem.error != null) {
                this.newLine(this.element.uuid+'/error-'+idx, this.element.uuid+'/error', this.editItem.error.uuid)
                this.element.errorref[idx].error = this.editItem.error.name
            }
            
            this.cancelErrorRef()
        },
        cancelErrorRef() {
            this.editItem.error = null
            this.setactiveUUID()
        },
        addErrorRef() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.errorref.some(item => item.id === n)
            }
            this.editItem.id = n

            if( this.editItem.error != null) {
                var datacount = this.element.errorref.length
                this.newLine(this.element.uuid+'/error-'+datacount, this.element.uuid+'/error', this.editItem.error.uuid)
                this.editItem.error = this.editItem.error.name
            }
            const addObj = Object.assign({}, this.editItem)
            this.element.errorref.push(addObj);

            this.cancelErrorRef()
        },

        clearErrorRef() {
            this.isEditingError = true
            this.editItem.error = null
        },
        setErrorSelect() {
            if (this.isEditingError == true) {
                if (this.editItem.error != null && this.editItem.error.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editItem.error.uuid, element: constant.Error_str} )
                }
                this.setErrorList()
                this.isEditingError = false
            } else {
                this.isEditingError = true
            }
        },
        setErrorList() {
            this.selError = this.$store.getters.getError
            this.setactiveUUID()
        },
        newError() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)


            this.$store.commit('addElementError', {
                name: this.$store.getters.getNameError,  input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                desc: '', errorcode: '', errorDref: null
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.Errors_str)
            EventBus.$emit('add-element', constant.Error_str)
            this.$store.commit('editErrorSet', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editErrorSet', {compo:"z", uuid:this.element.uuid, zindex:10} )
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