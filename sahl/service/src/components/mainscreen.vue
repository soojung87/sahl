<template>
    <v-app>
        <v-system-bar app >
            <systembar />
        </v-system-bar>
        <v-app-bar app dense flat clipped-left clipped-right >
            <appbar />
            <v-spacer></v-spacer>
            <v-icon v-if="isSearch && isprojectOpen">mdi-magnify</v-icon>
            <v-autocomplete v-if="isSearch && isprojectOpen" v-model='model' :items='searchList' item-text='name' item-value="uuid" class="lable-placeholer-color"
                :search-input.sync="search" return-object clearable @click="setSearchList()"
                hide-no-data hide-selected placeholder="Start typing to Search Element">
            </v-autocomplete>
            <v-btn v-if="isSearch && isprojectOpen" icon @click="goElement()" >
                <v-icon >mdi-crosshairs-gps</v-icon>
            </v-btn>
            <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        </v-app-bar>
        <v-navigation-drawer ref="drawer" v-model="navigation.shown" :width="navigation.width" app clipped>
            <navigatorbar />
        </v-navigation-drawer>
        <v-main v-if="isprojectOpen">
            <mainview :minimaptoolbar='true'/>
            <div class='minimap-resize'>
                <v-btn small :text="btnMinimapResize" @click="onClickMinimapResize()"><v-icon>mdi-arrow-expand</v-icon></v-btn>
            </div>
            <div class='mini-map' v-show="btnMinimapResize">
                <mainview :minimaptoolbar='false'/>
            </div>
        </v-main>
        <v-navigation-drawer ref="detailViewer" :width="drawViewernavi.width" app v-model="drawViewernavi.shown" clipped right >
            <detailViewer />
        </v-navigation-drawer>
        <v-footer app>
            <footbar />
        </v-footer> 
    </v-app>
</template>

<script>
import Systembar from '@/components/systembar.vue'
import Appbar from '@/components/appbar.vue'
import Navigatorbar from '@/components/navigatorbar.vue'
import Mainview from '@/components/mainview.vue'
import DetailViewer from '@/components/detailViewer.vue'
import footbar from '@/components/footbar.vue'
import { EventBus } from '../main'



export default ({
    components:{  Systembar, Appbar, Navigatorbar, Mainview, DetailViewer, footbar },
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
            if (val) {
                this.isprojectOpen = true
                this.$nextTick(() => { //이렇게 안해주면 minimap을 그리기 전에 호출되서 undefine으로 나옴 
                    this.setMinimapLeft()
                })
            }
        },
        isOpenCloseDetailView(val) {
            this.drawViewernavi.shown = val
            this.setMinimapLeft()
        },
        isOpenCloseNavigationView(val) {
            console.log(val)
            this.navigation.shown = val
        },
        isOpenCloseSearch(val) {
            this.isSearch = val
        },
    },
    data() {
        return {
            isprojectOpen: false,
            navigation: { width: 200, borderSize: 3, minSize: 10, shown: true},
            drawViewernavi: {width: 300, borderSize: 3, minSize: 5, shown: true},
            isSearch: false,
            search: null, //찾은 이름이 나옴
            model: null, // 찾은 아이템 정보가 담김
            searchList: [],
            btnMinimapResize: true,
        }
    },
    mounted() {
        this.setBorderNavigationWidth()
        this.setEventsNavigation()
        this.setBorderDetailViewerWidth()
        this.setEventsDetailViewer()
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
                document.body.style.cursor = "ew-resize"
                let f = direction === "right" ? document.body.scrollWidth - e.clientX : e.clientX
                if (f >= vm.navigation.minSize) {
                    el.style.width = f + "px"
                    vm.navigation.width = el.style.width
                }
            }

            drawerBorder.addEventListener(
                "mousedown",
                function() {
                    el.style.transition ='initial';
                    document.addEventListener("mousemove", resize, false)
                    if (this.isprojectOpen) {
                        document.getElementById('main-view').style.overflow= "hidden"
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
                    if (this.isprojectOpen) {
                        document.getElementById('main-view').style.overflow= "scroll"
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
                    if (this.isprojectOpen) {
                        document.getElementById('main-view').style.overflow = "hidden"
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
                    if (this.isprojectOpen) {
                        document.getElementById('main-view').style.overflow = "scroll"
                    }
                },
                false
            );

        },
        goElement() {
            //console.log(this.model.uuid)
            if(this.model != null && this.model.uuid != null) {
                EventBus.$emit('goElement', this.model.uuid)
            }
            this.model = null
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
                    console.log(detailViewWidth)
                    document.getElementsByClassName('mini-map')[0].style.left = (window.innerWidth - detailViewWidth - 330) +'px'
                    document.getElementsByClassName('minimap-resize')[0].style.left = (window.innerWidth - detailViewWidth - 82) +'px'
                } else {
                    document.getElementsByClassName('mini-map')[0].style.left = (window.innerWidth - 330) +'px'
                    document.getElementsByClassName('minimap-resize')[0].style.left = (window.innerWidth - 82) +'px'
                }
            }
        }
    },
})
</script>
