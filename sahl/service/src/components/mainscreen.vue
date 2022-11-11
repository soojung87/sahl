<template>
    <v-app>
        <v-system-bar app >
            <systembar />
            <v-spacer></v-spacer>
            <v-hover v-slot="{ hover }">
                <v-btn small icon @click="clickExit()"  >
                    <v-icon :color="hover? '#ff0000': '#000000'">mdi-close</v-icon>
                </v-btn>
            </v-hover>
        </v-system-bar>
        <v-app-bar app dense flat clipped-left clipped-right>
            <appbar />
            <v-select v-if="panesNumber > 1 && isSearch && isprojectOpen" v-model="selectScreen" :items="screenItem" label="Select a Screen" outlined dense class="selectScreen"></v-select>
            <v-icon v-if="isSearch && isprojectOpen" style="left: 347px;">mdi-magnify</v-icon>
            <v-autocomplete v-if="isSearch && isprojectOpen" v-model='model' :items='searchList' item-text='name' item-value="uuid" class="lable-placeholer-color searchElement"
                :search-input.sync="search" return-object clearable @click="setSearchList()"
                hide-no-data hide-selected placeholder="Start typing to Search Element" >
            </v-autocomplete>
            <v-btn v-if="isSearch && isprojectOpen" icon @click="goElement()" style="left: 590px;">
                <v-icon >mdi-crosshairs-gps</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <!-- <v-tooltip bottom v-if="isprojectOpen" >  
                <template v-slot:activator="{on, attrs}">
                    <v-btn small icon v-bind="attrs" v-on="on" @click="addPanes()" :disabled="panesNumber == 3">
                        <v-icon>mdi-monitor-multiple</v-icon>
                    </v-btn>
                </template>
                <span>Split Editor Right</span>
            </v-tooltip>
            <v-tooltip bottom v-if="isprojectOpen">  
                <template v-slot:activator="{on, attrs}">
                    <v-btn small icon v-bind="attrs" v-on="on" @click="deletePanes()" :disabled="panesNumber == 1">
                        <v-icon>mdi-minus-box-outline</v-icon>
                    </v-btn>
                </template>
                <span>Delete Split Editor</span>
            </v-tooltip> -->
        </v-app-bar>
        <v-navigation-drawer ref="drawer" v-model="navigation.shown" :width="navigation.width" app clipped disable-resize-watcher>
            <navigatorbar />
        </v-navigation-drawer>
        <v-main v-if="isprojectOpen">
            <!-- <mainview :minimaptoolbar='true'/> -->
            <splitpanes>
                <pane v-for="i in panesNumber" :key="i" min-size="20">
                    <mainview :minimaptoolbar='true' :location='i'/>
                </pane>
            </splitpanes>
            <!--<div class='minimap-resize'>
                <v-btn small :text="btnMinimapResize" @click="onClickMinimapResize()"><v-icon>mdi-arrow-expand</v-icon></v-btn>
            </div>
            <div class='mini-map' v-show="btnMinimapResize">
                <mainview :minimaptoolbar='false' :location='1'/>
            </div>-->
        </v-main>
        <!-- <v-navigation-drawer ref="detailViewer" :width="drawViewernavi.width" app v-model="drawViewernavi.shown" clipped right >
            <detailViewer />
        </v-navigation-drawer> -->
        <v-footer padless app>
            <footbar />
        </v-footer> 
        <v-dialog v-model="dialogErrorSelectScreen" persistent width="600">
            <v-card >
                <v-alert v-model="dialogErrorSelectScreen" width="600" prominent border="left" outlined type="warning" dismissible>
                    먼저 Screen을 선택해 주세요.
                </v-alert>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import Systembar from '@/components/systembar.vue'
import Appbar from '@/components/appbar.vue'
import Navigatorbar from '@/components/navigatorbar.vue'
import Mainview from '@/components/mainview.vue'
//import DetailViewer from '@/components/detailViewer.vue'
import footbar from '@/components/footbar.vue'
import { EventBus } from '../main'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'



export default ({
    components:{  Splitpanes, Pane, Systembar, Appbar, Navigatorbar, Mainview, footbar }, //DetailViewer
    computed: { 
        ismakeProject() {
            return this.$store.state.ismakeProject
        },
        navigatorList () {
            return this.$store.state.navigatorList
        },
        isOpenCloseDetailView() {
            return this.$store.state.isOpenCloseDetailView
        },
        isOpenCloseNavigationView() {
            return this.$store.state.isOpenCloseNavigationView
        },
        isOpenCloseSearch() {
            return this.$store.state.isOpenCloseSearch
        },
        visibleDetailView() {
            return this.$store.state.visibleDetailView
        },
    },
    watch: {
        ismakeProject(val) { // project가 없는상태에서 다른 compoment들을 만들어 놓으니 에러가 떠서 만들어줌
            this.isprojectOpen = val
            /*if (val) {
                this.$nextTick(() => { //이렇게 안해주면 minimap을 그리기 전에 호출되서 undefine으로 나옴 
                    //this.setMinimapLeft()
                })
            }*/
        },
        isOpenCloseDetailView(val) {
            //console.log('isOpenCloseDetailView ' + val)
            this.drawViewernavi.shown = val
            this.setMinimapLeft()
        },
        isOpenCloseNavigationView(val) {
            //console.log(val)
            this.navigation.shown = val
            setTimeout(() => {EventBus.$emit('drawLine')}, 200)
        },
        isOpenCloseSearch(val) {
            this.isSearch = val
        },
        visibleDetailView(val) {
            //console.log('visibleDetailView ' + val)
            this.drawViewernavi.shown = val
            this.setMinimapLeft()
        }
    },
    created() {
        this.drawViewernavi.shown = this.$store.state.visibleDetailView
        //console.log('Viewnavi  ' + this.drawViewernavi.shown)
    },
    data() {
        return {
            isprojectOpen: false,
            navigation: { width: 200, borderSize: 3, minSize: 10, shown: true},
            drawViewernavi: {width: 300, borderSize: 3, minSize: 5, shown: this.$store.state.visibleDetailView},
            isSearch: false,
            search: null, //찾은 이름이 나옴
            model: null, // 찾은 아이템 정보가 담김
            searchList: [],
            btnMinimapResize: false,
            panesNumber: 1,
            screenItem: ['1'],
            selectScreen: null,
            dialogErrorSelectScreen: false,
            isResize: false
        }
    },
    updated() { //창크기 변환하면 this.drawViewernavi.show가 true로 변함
        if(this.$store.state.visibleDetailView == true && this.$store.state.isOpenCloseDetailView == true) {
            this.drawViewernavi.shown = true
        } else if(this.$store.state.visibleDetailView == true && this.$store.state.isOpenCloseDetailView == false) {
            this.drawViewernavi.shown = false
        } else {
            this.drawViewernavi.shown = false
        }

    },
    mounted() {
        this.setBorderNavigationWidth()
        this.setEventsNavigation()
        //this.setBorderDetailViewerWidth()
        //this.setEventsDetailViewer()
    },
    methods: {
        onClickMinimapResize() {
            this.btnMinimapResize = this.btnMinimapResize ? false : true
        },
        setBorderNavigationWidth() {
            let i = this.$refs.drawer.$el.querySelector(".v-navigation-drawer__border")
            i.style.width = this.navigation.borderSize + "px"
            i.style.cursor = "ew-resize"
        },
        setBorderDetailViewerWidth() {
            let i = this.$refs.detailViewer.$el.querySelector(".v-navigation-drawer__border")
            i.style.width = this.drawViewernavi.borderSize + "px"
            i.style.cursor = "ew-resize"
        },
        setEventsNavigation() {
            const el = this.$refs.drawer.$el
            const drawerBorder = el.querySelector(".v-navigation-drawer__border")
            const vm = this
            const direction = el.classList.contains("v-navigation-drawer--right") ? "right" : "left"

            function resize(e) {
                vm.isResize = true
                document.body.style.cursor = "ew-resize"
                let f = direction === "right" ? document.body.scrollWidth - e.clientX : e.clientX
                if (f >= vm.navigation.minSize) {
                    el.style.width = f + "px"
                    vm.navigation.width = el.style.width
                    EventBus.$emit('drawLine')
                }
            }

            drawerBorder.addEventListener(
                "mousedown",
                function() {
                    el.style.transition ='initial';
                    document.addEventListener("mousemove", resize, false)
                    if (this.isprojectOpen) {
                        for(var i=1; i<=vm.panesNumber; i++) {
                            document.getElementById('main-view'+i).style.overflow= "hidden"
                        }
                    }
                },
                false
            );

            document.addEventListener(
                "mouseup",
                function() {
                    el.style.transition =''
                    vm.navigation.width = el.style.width
                    document.body.style.cursor = ""
                    document.removeEventListener("mousemove", resize, false)
                    
                    if (vm.isResize) {
                        /*for(var i=1; i<=vm.panesNumber; i++) {
                            document.getElementById('main-view'+i).style.overflow= "auto"
                        }*/
                        setTimeout(() => {EventBus.$emit('drawLine')}, 100)
                        vm.isResize = false
                    }
                },
                false
            );
        },
        setEventsDetailViewer() {
            const el = this.$refs.detailViewer.$el
            const drawerBorder = el.querySelector(".v-navigation-drawer__border")
            const vm = this
            const direction = el.classList.contains("v-navigation-drawer--right") ? "right" : "left"

            function resize(e) {
                document.body.style.cursor = "ew-resize"
                let f = direction === "right" ? document.body.scrollWidth - e.clientX : e.clientX;
                if (f >= vm.drawViewernavi.minSize) {
                    el.style.width = f + "px"
                    vm.drawViewernavi.width = el.style.width
                    if(vm.$store.state.visibleDetailView && vm.isprojectOpen) {
                        document.getElementsByClassName('mini-map')[0].style.left = (window.innerWidth - f - 320) +'px'
                        document.getElementsByClassName('minimap-resize')[0].style.left = (window.innerWidth - f - 72) +'px'
                    }
                }
            }

            drawerBorder.addEventListener(
                "mousedown",
                function() {
                    el.style.transition ='initial'
                    document.addEventListener("mousemove", resize, false)
                    if (vm.isprojectOpen) {
                        for(var i=1; i<=vm.panesNumber; i++) {
                            document.getElementById('main-view'+i).style.overflow= "hidden"
                        }
                    }
                },
                false
            );

            document.addEventListener(
                "mouseup",
                function() {
                    el.style.transition =''
                    vm.drawViewernavi.width = el.style.width
                    document.body.style.cursor = ""
                    document.removeEventListener("mousemove", resize, false)
                    if (vm.isprojectOpen) {
                        for(var i=1; i<=vm.panesNumber; i++) {
                            document.getElementById('main-view'+i).style.overflow= "auto"
                        }
                        EventBus.$emit('drawLine')
                    }
                },
                false
            );
        },
        goElement() {
            console.log('goElement')
            if (this.panesNumber==1 || (this.selectScreen != null && this.panesNumber > 1)) {
                if(this.model != null && this.model.uuid != null) {
                    if (this.panesNumber > 1) {
                        this.$store.commit( 'setSelectScreen', {num: this.selectScreen})
                    } else {
                        this.$store.commit( 'setSelectScreen', {num: 1})
                    }
                    EventBus.$emit('goElement', this.model.uuid)
                }
                this.model = null
            } else if (this.selectScreen == null && this.panesNumber > 1) {
                this.dialogErrorSelectScreen = true
                setTimeout(() => {this.dialogErrorSelectScreen = false}, 4000);
            }
        },
        addPanes() {
            this.panesNumber++
            this.$store.commit( 'setPanesNum', {panes: this.panesNumber})
            this.screenItem.push(this.panesNumber)
            this.selectScreen = null
        },
        deletePanes() {
            this.panesNumber--
            this.$store.commit( 'setPanesNum', {panes: this.panesNumber})
            this.screenItem.pop()
            this.selectScreen = null
        },
        setSearchList() {
            this.searchList = []
            var treeitem = Object.values(this.$store.getters.gettreeviewitems)
            treeitem.forEach( item => {
                if(item.name != item.uuid) {
                    this.searchList.push(item)
                }
            })
            //console.log(this.searchList)
        },
        setMinimapLeft() {
            if (this.isprojectOpen) {
                if(this.$store.state.visibleDetailView && this.drawViewernavi.shown) {
                    var detailViewWidth = this.drawViewernavi.width.replace(/[^0-9]/g,'')
                    document.getElementsByClassName('mini-map')[0].style.left = (window.innerWidth - detailViewWidth - 330) +'px'
                    document.getElementsByClassName('minimap-resize')[0].style.left = (window.innerWidth - detailViewWidth - 82) +'px'
                } else {
                    document.getElementsByClassName('mini-map')[0].style.left = (window.innerWidth - 330) +'px'
                    document.getElementsByClassName('minimap-resize')[0].style.left = (window.innerWidth - 82) +'px'
                }
            }
        },
        clickExit() {
            if(this.isprojectOpen) {
                this.$store.commit('saveProject', {} )
            }
            this.$store.commit('setExit', )
            window.open('about:blank','_self').self.close()
            window.close()
        },
    },
})
</script>
