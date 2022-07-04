<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showPERFileProxy">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Persistency File Proxy Interface</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Persistency File Proxy Interface</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputPERFileProxyName' outlined dense></v-text-field>
                    <v-text-field v-model="element.category" label="Category" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.minisize" label="Minimun Sustained Size" placeholder="Integer" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-select v-model="element.redundancy" :items="enumRedundancy" clearable label="Redundance" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                    <v-select v-model="element.updateS" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                    <v-text-field v-model="element.encoding" label="Encoding" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.maxfiles" label="Max Number Of Files" placeholder="Integer" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showFileProxy" x-small color="indigo">
                                    <v-icon>{{ isFileProxyOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            File Proxy
                            <v-btn @click="isCheckFileProxy" text x-small color="indigo" v-if="isFileProxyOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isFileProxyOpenClose && isdeleteFileProxyItem" @click="deletFileProxy" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isFileProxyOpenClose">
                            <v-data-table v-model="selectDelectFileProxy" :headers="headerFileProxy" :items="element.proxy" :items-per-page='20'
                                    :show-select="isdeleteFileProxyItem" item-key="id" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteFileProxyItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openFileProxy(idx)" @cancel="editFileProxy(idx)" @save="cancelFileProxy" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editItem.url" label="Content URL" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editItem.filename" label="File Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editItem.strategy" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addFileProxy()" @save="cancelFileProxy"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editItem.url" label="Content URL" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editItem.filename" label="File Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editItem.strategy" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
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
            enumRedundancy: ['NONE', ' REDUNDANT', 'REDUNDANTPER-ELEMENT'],
            strategy: ['DELETE', 'KEEPEXISTING', 'OVERWRITE'],
            isFileProxyOpenClose: true,
            isdeleteFileProxyItem: false,
            selectDelectFileProxy: [],
            headerFileProxy: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Content URL', align: 'start', sortable: false, value: 'url' },
                { text: 'File Name', align: 'start', sortable: false, value: 'filename' },
                { text: 'Update Strategy', align: 'start', sortable: false, value: 'strategy' },
            ],
            editItem: { name : '', url: '', filename: '', strategy: null, id: ''},

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
        showPERFileProxy() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
        },
        showFileProxy() {
            this.isFileProxyOpenClose = this.isFileProxyOpenClose ? false : true
        },
        inputPERFileProxyName() {
            this.$store.commit('editPERFileProxy', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        }, 
  
        isCheckFileProxy() {
            if (this.isdeleteFileProxyItem == true) {
                this.isdeleteFileProxyItem = false
                this.selectDelectFileProxy = []
            } else {
                this.isdeleteFileProxyItem = true
            }
        },
        deletFileProxy() {
            if (this.isdeleteFileProxyItem == true) {
                this.element.proxy = this.element.proxy.filter(item => {
                        return this.selectDelectFileProxy.indexOf(item) < 0 })

                this.isdeleteFileProxyItem = false
                this.selectDelectFileProxy = []
            } 
        },
        editFileProxy(idx) {
            if (this.element.proxy[idx].name != this.editItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'PerFileProxy', listname: this.editItem.name} )
            }
            this.element.proxy[idx].name = this.editItem.name
            this.element.proxy[idx].url = this.editItem.url
            this.element.proxy[idx].filename = this.editItem.filename
            this.element.proxy[idx].strategy = this.editItem.strategy
            this.cancelFileProxy()
        },
        cancelFileProxy() {
            this.editItem.name = ''
            this.editItem.url = ''
            this.editItem.filename = ''
            this.editItem.strategy = null
            this.setactiveUUID()
        },
        openFileProxy(idx) {
            this.editItem.name = this.element.proxy[idx].name
            this.editItem.url = this.element.proxy[idx].url
            this.editItem.filename = this.element.proxy[idx].filename
            this.editItem.strategy = this.element.proxy[idx].strategy
        },
        addFileProxy() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.proxy.some(item => item.id === n)
            }
            this.editItem.id = n

            const addObj = Object.assign({}, this.editItem)
            this.element.proxy.push(addObj)
            this.cancelFileProxy()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editPERFileProxy', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
    },
}
</script>
