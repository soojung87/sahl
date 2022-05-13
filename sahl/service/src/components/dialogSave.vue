<template>
    <v-dialog v-model='dialogSaveWindow' width="900" persistent >
        <v-card>
            <v-card-title class="text-h6 green accent-1"> Select Save Element  
                <v-spacer></v-spacer>
                <v-btn @click="newSaveWindow" icon color="teal darken" x-samll dark>
                    <v-icon dense dark>mdi-plus</v-icon>
                </v-btn>
                <v-btn @click="isDeleteSaveWindow = isDeleteSaveWindow ? false : true" icon color="teal darken" x-samll dark>
                    <v-icon dense dark>mdi-check</v-icon>
                </v-btn>
                <v-btn v-if="isDeleteSaveWindow" @click="deleteSaveWindow" icon color="teal darken" x-samll dark>
                    <v-icon dense dark>mdi-minus</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <br>
                <v-row>
                    <v-col cols="6">
                        <v-card class="savetreeview">
                            <v-tabs v-model='listTab' background-color="teal darken-3" dark show-arrows>
                                <v-tab v-for="(tab, idx) in tabListItem" :key="idx" @click="clickListTab(idx)"> 
                                    {{tab.name}}
                                </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="listTab">
                                <v-tab-item v-for="(tab, idx) in tabListItem" :key="idx">
                                    <v-card flat>
                                        <v-card-text>
                                            <v-treeview v-model="tab.select" :items="tab.list" activatable expand-icon="mdi-chevron-down" selectable dense return-object :open.sync="tab.openIds"  item-key="uuid" >
                                            <!-- <v-treeview ref="saveTree" v-model="tab.select" :items="tab.list" activatable expand-icon="mdi-chevron-down" selectable dense return-object open-all item-key="name" > -->
                                                <template v-slot:prepend="{item}">
                                                    <v-icon class="pa-0 ma-0">{{item.icon}}</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'A')" color="red" small class="pa-0 ma-n1">mdi mdi-alpha-a</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'B')" color="primary" small class="pa-0 ma-n1">mdi mdi-alpha-b</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'C')" color="green" small class="pa-0 ma-n1">mdi mdi-alpha-c</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'D')" color="brown" small class="pa-0 ma-n1">mdi mdi-alpha-d</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'E')" color="pink" small class="pa-0 ma-n1">mdi mdi-alpha-e</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'F')" color="purple" small class="pa-0 ma-n1">mdi mdi-alpha-f</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'G')" color="orange" small class="pa-0 ma-n1">mdi mdi-alpha-g</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'H')" color="indigo" small class="pa-0 ma-n1">mdi mdi-alpha-h</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'I')" color="teal" small class="pa-0 ma-n1">mdi mdi-alpha-i</v-icon>
                                                    <v-icon v-if="isIncludeSaveWindow(item.uuid, 'J')" color="cyan" small class="pa-0 ma-n1">mdi mdi-alpha-j</v-icon>
                                                </template>
                                            </v-treeview>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                        <v-row>
                            <v-col>
                                <v-checkbox v-model="checkAll" label="Check All" dense @click="checkAllLeft"></v-checkbox>
                            </v-col>
                            <v-col>
                                <v-checkbox v-model="onlyList" label="Only With List" dense @click="checkOnlyList"></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="1">
                        <br><br><br><br><br><br><br><br><br><br>
                        <v-row>
                            <v-btn @click="moveRigth" small ><v-icon>mdi-chevron-right</v-icon></v-btn>
                        </v-row>
                        <br><br><br><br><br><br><br><br>
                        <v-row>
                            <v-btn @click="moveLeft" small ><v-icon>mdi-chevron-left</v-icon></v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="5">
                        <v-row>
                            <v-col cols="3">
                                <v-btn @click="btnSaveFile" dense color="teal darken" dark> find save file </v-btn>
                                <input ref="saveloader" class="d-none" type="file" @click="onClickSaveFile" @change="uploadSaveFile">
                            </v-col>
                        </v-row>
                        <v-row>
                        <v-card class="saveSelectView">
                            <v-radio-group v-model="radios" dense>
                                <template v-for="(item,i) in saveList">
                                    <v-radio :value="item.radio" color="success" :key="i+'r'">
                                        <template v-slot:label>
                                            <v-text-field v-model="item.savename" :label="item.label" placeholder="String" style="height: 26px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                                        </template>
                                    </v-radio>
                                    <v-list dense :key="i+'l'"> <!--key값이 i로 중복이라고 Duplicate keys detected: '0'. This may cause an update error. 이런 에러가 나옴 ::해결방법-->
                                        <v-list-item-group v-model="item.selectItem" color="primary">
                                            <draggable class="draggable-list" :list="item.saveFile" group="my-group" @end="endDrag">
                                                <v-list-item v-for="(ele, i) in item.saveFile" :key="i" dense>
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="ele.name"></v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </draggable>
                                        </v-list-item-group>
                                    </v-list>
                                </template>
                            </v-radio-group>
                        </v-card>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text  @click="saveElement">
                    Save
                </v-btn>
                <v-snackbar v-model="snackbar" :timeout="timeout" color="red accent-2">
                    {{ text }}
                        <template v-slot:action="{ attrs }">
                        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
                <v-btn color="primary" text @click="cancelSave">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import constant from "../store/constants.js"
import draggable from "vuedraggable";

export default {
    components: {draggable},
    computed: {
        openProjectIndex () {
            return this.$store.state.openProjectIndex
        },
        navigatorList () {
            return this.$store.state.navigatorList
        },
        errorList() {
            return this.$store.state.errorList
        },

        dialogSaveWindow: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            checkAll: false,
            onlyList: false,
            tabListItem: [
                { name: 'All', list: [], select: [], checkAll: false, onlyList: false, openIds: []}, 
                { name: 'Service', list: [], select: [], checkAll: false, onlyList: false, openIds: []}, 
                { name: 'Application', list: [], select: [], checkAll: false, onlyList: false, openIds: []},
                { name: 'Machine', list: [], select: [], checkAll: false, onlyList: false, openIds: []},
            ],
            listTab: 0,
            radios: null,
            isDeleteSaveWindow: false,
            saveList: [ {radio:'A', savename:'', label: 'A Save File Name', selectItem:undefined, saveFile: [], },],
            editSaveList: {radio:'', savename:'', label: '', selectItem:undefined, saveFile: [], },
            defaultSaveList: {radio:'', savename:'', label: '', selectItem:undefined, saveFile: [], },
            checkList: [
                { existence: false, key:'A'},
                { existence: false, key:'B'},
                { existence: false, key:'C'},
                { existence: false, key:'D'},
                { existence: false, key:'E'},
                { existence: false, key:'F'},
                { existence: false, key:'G'},
                { existence: false, key:'H'},
                { existence: false, key:'I'},
                { existence: false, key:'J'},
            ],
            dialogNoValidation: false,
            snackbar: false,
            text: '정확하게 작성한 뒤 저장을 시도해 주세요.',
            timeout: 2000,
            dialogOpen: false,
            reOpen: true, // update,beforeupdate는 무언가를 누를때마다 불린다. cancle누르면  둘다 불려서 dialogOpen이 true로 변하기 떄문에 이걸로 바뀌지 않게 잡아줘야함.
            //openIds: [],
        }
    },
    watch: {
    },

    updated() {
        //console.log('updated '+ this.dialogOpen +' - ' + this.reOpen )
        if(this.dialogOpen == false) {
            this.reOpen = true
        }
    },
    beforeUpdate() { //  updated에 넣으면 project만들기 전에 불리기 때문에 children이 없어서 에러남 
        //console.log('beforeUpdate '+ this.dialogOpen +' - ' + this.reOpen )
        if(!this.dialogOpen && this.reOpen) {
            this.tabListItem[0].list = JSON.parse(JSON.stringify(this.navigatorList[this.openProjectIndex].children))
            this.tabListItem[1].list = JSON.parse(JSON.stringify(this.navigatorList[this.openProjectIndex].children[constant.Service_index].children))
            this.tabListItem[2].list = JSON.parse(JSON.stringify(this.navigatorList[this.openProjectIndex].children[constant.AdaptiveApplication_index].children))
            this.tabListItem[3].list = JSON.parse(JSON.stringify(this.navigatorList[this.openProjectIndex].children[constant.Machines_index].children))
            this.dialogOpen = true
            this.reOpen = false
            this.setOpenList(0)
        }
    },
    methods: {
        newSaveWindow() {
            if (this.saveList.length < 10) {
                var radio = ''
                this.saveList.forEach( list => {
                    this.checkList.forEach ( item => {
                        if (list.radio == item.key) {
                            item.existence = true
                        }
                    })
                })
                this.checkList.forEach( item => {
                    if (!item.existence) {
                        radio = item.key
                    }
                })
                this.editSaveList = {radio: radio, savename:'', label: radio+ ' Save File Name', selectItem:undefined, saveFile: [], }
                const addObj = Object.assign({}, this.editSaveList)
                this.saveList.push(addObj);

                this.editSaveList = Object.assign({}, this.defaultSaveList)
                this.checkList.forEach( item => {
                    item.existence = false
                })            
            }
        },
        deleteSaveWindow() {
            if (this.isDeleteSaveWindow) {
                this.saveList.forEach((item,i) => {
                    if(item.radio == this.radios) {
                        this.saveList.splice(i,1)
                    }
                })
                this.isDeleteSaveWindow = false
            }
        },
        clickListTab(idx) {
            this.checkAll = this.tabListItem[idx].checkAll
            this.onlyList = this.tabListItem[idx].onlyList 
            this.setOpenList(idx)
        },
        isIncludeSaveWindow(uuid, radio) {
            var isInclude = false
            this.saveList.forEach( ele => {
                if (ele.radio == radio) {
                    ele.saveFile.forEach ( data => {
                        if (data.uuid === uuid){
                            isInclude = true
                        }
                    })
                }
            })
            return isInclude
        },
        checkAllLeft() {
            if (this.checkAll) {
                this.tabListItem[this.listTab].checkAll = true
                var treeitem = Object.values(this.$store.getters.gettreeviewitems)
                this.tabListItem[this.listTab].select = []
                treeitem.forEach(data => {
                    if (data.name != data.uuid ) {
                        if (this.listTab == 0) { //All
                            this.tabListItem[this.listTab].select.push(data)
                        } else if (this.listTab == 1 &&  //Serveice
                                    (data.parent == constant.SomeIPServiceInterfaceDeployment_str || data.parent == constant.ServiceInterface_str || data.parent == constant.Client_str || data.parent == constant.Server_str ||
                                     data.parent == constant.SomeIPClient_str || data.parent == constant.SomeIPServer_str || data.parent == constant.SomeIPToMachineMapping_str || 
                                     data.parent == constant.ToPortPrototypeMapping_str || data.parent == constant.RequiredSomeIP_str || data.parent == constant.ProvidedSomeIP_str ||
                                     data.parent == constant.Error_str || data.parent == constant.Errorset_str || data.parent == constant.ErrorDomain_str )) {
                            this.tabListItem[this.listTab].select.push(data)
                        } else if (this.listTab == 2 && 
                                    ( data.parent == constant.ProcesstoMachineMapping_str || data.parent == constant.SWComponents_str || data.parent == constant.Process_str ||
                                      data.parent == constant.ProcessDesign_str || data.parent == constant.Executable_str || data.parent == constant.StartupConfig_str || 
                                      data.parent == constant.DeterministicClient_str )) {
                            this.tabListItem[this.listTab].select.push(data)
                        } else if (this.listTab == 3 && 
                                    ( data.parent == constant.Machine_str || data.parent == constant.MachineDesigne_str || data.parent == constant.EthernetCluster_str ||
                                      data.parent == constant.ModeDeclarationGroup_str || data.parent == constant.HWElement_str )) {
                            this.tabListItem[this.listTab].select.push(data)
                        }
                } })
            } else {
                this.tabListItem[this.listTab].checkAll = false
                this.tabListItem[this.listTab].select = []
            }
        },
        checkOnlyList() {
            if(this.onlyList) {
                this.tabListItem[this.listTab].onlyList = true
                if (this.listTab == 0) {
                    for(let i=this.tabListItem[this.listTab].list.length-1; i>=0; i--) {
                        for(let n=this.tabListItem[this.listTab].list[i].children.length-1; n>=0; n--) {
                            if( i == 1) {
                                for(let l=this.tabListItem[this.listTab].list[i].children[n].children.length-1; l>=0; l--) { //service
                                    if (this.tabListItem[this.listTab].list[i].children[n].children[l].children.length == 0) {
                                        this.tabListItem[this.listTab].list[i].children[n].children.splice(l,1)
                                    }
                                }
                            }
                            if (this.tabListItem[this.listTab].list[i].children[n].children.length == 0) {
                                this.tabListItem[this.listTab].list[i].children.splice(n,1)
                            }
                        }
                        if (this.tabListItem[this.listTab].list[i].children.length == 0) {
                            this.tabListItem[this.listTab].list.splice(i,1)
                        }
                    }
                } else if (this.listTab == 1){  //service
                    for(let i=this.tabListItem[this.listTab].list.length-1; i>=0; i--) {
                        for(let n=this.tabListItem[this.listTab].list[i].children.length-1; n>=0; n--) {
                            if (this.tabListItem[this.listTab].list[i].children[n].children.length == 0) {
                                this.tabListItem[this.listTab].list[i].children.splice(n,1)
                            }
                        }
                        if (this.tabListItem[this.listTab].list[i].children.length == 0) {
                            this.tabListItem[this.listTab].list.splice(i,1)
                        }
                    }
                } else {
                    for(let i=this.tabListItem[this.listTab].list.length-1; i>=0; i--) {
                        if (this.tabListItem[this.listTab].list[i].children.length == 0) {
                            this.tabListItem[this.listTab].list.splice(i,1)
                        }
                    }
                }
            } else {
                this.tabListItem[this.listTab].onlyList = false
                if (this.listTab == 0) {
                    this.tabListItem[0].list = JSON.parse(JSON.stringify(this.navigatorList[this.openProjectIndex].children))
                } else if (this.listTab == 1) {
                    this.tabListItem[1].list = JSON.parse(JSON.stringify(this.navigatorList[this.openProjectIndex].children[constant.Service_index].children))
                } else if (this.listTab == 2) {
                    this.tabListItem[2].list = JSON.parse(JSON.stringify(this.navigatorList[this.openProjectIndex].children[constant.AdaptiveApplication_index].children))
                } else if (this.listTab == 3) {
                    this.tabListItem[3].list = JSON.parse(JSON.stringify(this.navigatorList[this.openProjectIndex].children[constant.Machines_index].children))
                }
            }
        },
        moveRigth() {
            this.saveList.forEach ( list => {
                if (this.radios == list.radio) {
                    this.tabListItem[this.listTab].select.forEach( data => {
                        if (data.name != data.uuid) {
                            let isExist = false
                            list.saveFile.forEach ( item => {
                                if (item.uuid == data.uuid) {
                                    isExist = true
                                }
                            })
                            if (!isExist) {
                                list.saveFile.push(data)
                            }
                        }
                    })
                }
            })

            this.tabListItem[this.listTab].select = []
            if (this.checkAll) {
                this.checkAll = false
                this.tabListItem[this.listTab].checkAll = false
            }
        },
        moveLeft() {
            this.saveList.forEach( list => {
                if (this.radios == list.radio && list.selectItem != undefined) {
                    var treeitem = Object.values(this.$store.getters.gettreeviewitems)
                    treeitem.forEach(data => {
                        if (data.name != data.uuid) {
                            if (data.uuid == list.saveFile[list.selectItem].uuid) {
                                this.compareList(list.saveFile[list.selectItem], data.parent)
                                list.saveFile.splice(list.selectItem,1)
                                list.selectItem = undefined
                            }
                        }
                    })

                }
            })
        },
        compareList(data, parent) {
            this.tabListItem[0].select.push(data)
            if (parent == constant.SomeIPServiceInterfaceDeployment_str || parent == constant.ServiceInterface_str || parent == constant.Client_str || parent == constant.Server_str ||
                parent == constant.SomeIPClient_str || parent == constant.SomeIPServer_str || parent == constant.SomeIPToMachineMapping_str || 
                parent == constant.ToPortPrototypeMapping_str || parent == constant.RequiredSomeIP_str || parent == constant.ProvidedSomeIP_str ||
                parent == constant.Error_str || parent == constant.Errorset_str || parent == constant.ErrorDomain_str ) {
                this.tabListItem[1].select.push(data)
            } else if (parent == constant.ProcesstoMachineMapping_str || parent == constant.SWComponents_str || parent == constant.Process_str ||
                parent == constant.ProcessDesign_str || parent == constant.Executable_str || parent == constant.StartupConfig_str || 
                parent == constant.DeterministicClient_str ) {
                this.tabListItem[2].select.push(data)
            } else if (parent == constant.Machine_str || parent == constant.MachineDesigne_str || parent == constant.EthernetCluster_str ||
                parent == constant.ModeDeclarationGroup_str || parent == constant.HWElement_str) {
                this.tabListItem[3].select.push(data)
            }
        },
        btnSaveFile() {
            this.$refs.saveloader.click()
        },
        onClickSaveFile(e) {
            e.target.value = ''
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
                    console.log(item)
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
        endDrag() {
            this.saveList.forEach( list => {
                let uniqueJson
                uniqueJson = list.saveFile.filter((thing, index) => {
                const _thing = JSON.stringify(thing)
                return index === list.saveFile.findIndex(obj => {
                    return JSON.stringify(obj) === _thing
                })})
                list.saveFile = uniqueJson.slice()
            })
        },
        saveElement() {
            this.$store.commit('setSaveValidate', {savelist: this.saveList})
            if(this.$store.state.errorList.length == 0) {
                var treeitem = Object.values(this.$store.getters.gettreeviewitems)
                var arrelement
                this.saveList.forEach( list => {
                    if (list.savename != '') {
                        this.moveSaveFile = []
                        list.saveFile.forEach (item => {
                            arrelement = treeitem.find(data =>  data.uuid === item.uuid)
                            this.moveSaveFile.push({parent: arrelement.parent, uuid: item.uuid})
                        })
                        if(this.moveSaveFile.length > 0) {
                            this.$store.commit('saveElement', {list: this.moveSaveFile, saveName: list.savename+".xml"} )
                        }
                    }
                })
                let today = new Date();  
                this.$store.commit('saveList', {list: this.saveList, saveName: today.toLocaleString()+".txt"} )
                this.cancelSave()
            } else {
                this.snackbar = true
            }
        },
        cancelSave() {
            this.tabListItem.forEach(ele => {
                ele.list = []
                ele.select = []
                ele.checkAll = false
                ele.onlyList = false
                ele.openIds = []
            })
            this.dialogSaveWindow = false  
            this.dialogOpen = false    
            this.listTab = 0
            this.moveSaveFile = []
            this.radios = null
            this.saveList = [ {radio:'A', savename:'', label: 'A Save File Name', selectItem:undefined, saveFile: [], },]
        },
        setOpenList(idx) {
            this.tabListItem[idx].list.forEach(item => {
                if(item.children != null && item.children.length > 0) {
                    item.children.forEach(data => {
                        if(data.children != null && data.children.length > 0) {
                            data.children.forEach(ser => {
                                if(ser.children != null && ser.children.length > 0) {
                                    if(!this.tabListItem[idx].openIds.some(ele => ele === ser)){
                                        this.tabListItem[idx].openIds.push(ser)
                                    }
                                }
                            })
                            if(!this.tabListItem[idx].openIds.some(ele => ele === data)){
                                this.tabListItem[idx].openIds.push(data)
                            }
                        }
                    })
                    if(!this.tabListItem[idx].openIds.some(ele => ele === item)){
                        this.tabListItem[idx].openIds.push(item)
                    }
                }
            })
        },
    },
}
</script>
