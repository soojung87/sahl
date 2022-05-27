<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showEthernetCluster">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Ethernet Cluster</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Ethernet Cluster</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose && !isDatailView">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputEthernetClusterName' outlined dense></v-text-field>
                    <!-- <v-card outlined class="mx-auto ehternetcluster"> --> <!--화면 고정에 스크롤 할것인지 말것인지--> 
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/conditional'">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showEthernetClusterItem" x-small color="indigo">
                                    <v-icon>{{ isEthernetClusterOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Conditional
                            <v-btn v-if="isEthernetClusterOpenClose && selectViewedit" @click="addEthernetCluster()" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn v-if="isEthernetClusterOpenClose" :disabled="selectViewedit" color="indigo" @click="setViewEdit()" outlined x-small text>
                                panel
                            </v-btn>
                            <v-btn v-if="isEthernetClusterOpenClose" :disabled="!selectViewedit" color="indigo" @click="setViewEdit()" outlined x-small text>
                                Table
                            </v-btn>
                        </div>
                        <div v-if="selectViewedit">
                            <v-tabs v-model='conditionalTab' height="30px" v-if="isEthernetClusterOpenClose" show-arrows @change="changeConditionalTab()">
                                <v-tab v-for="(tab, idx) in element.conditional" :key="idx" @click="clickConditionaltab(idx)"> 
                                    {{tab.name}}
                                    <v-btn text x-small @click="deleteConditional(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="conditionalTab" v-if="isEthernetClusterOpenClose">
                                <v-tab-item v-for="(tab, idx) in element.conditional" :key="idx">
                                    <v-card flat>
                                        <v-card-text>
                                            <v-text-field v-model="tab.name" :rules="rules.name" label="Protocol Name" @input="inputConditionalName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            <v-text-field v-model="tab.version" label="Protocol Version" placeholder="Numeric Only(Unit Second)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            <div class="subtitle-2" style="height:20px" :id="element.uuid+'/channel'+tab.name">
                                                <v-hover v-slot="{ hover }">
                                                    <v-btn text @click="showPhysicalChannelItem" x-small color="indigo">
                                                        <v-icon>{{ isPhysicalChannelOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                    </v-btn>
                                                </v-hover>
                                                Physical Channel
                                                <v-btn v-if="isPhysicalChannelOpenClose" @click="addPhysicalChannel()" text x-small color="indigo">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </div>
                                            <v-tabs v-model='channelTab[idx]' height="30px" v-if="isPhysicalChannelOpenClose" show-arrows @change="changeChannelTab()">
                                                <v-tab v-for="(subtab, channelidx) in tab.channel" :key="channelidx" @click="clickChanneltab(channelidx)"> 
                                                    {{subtab.name}}
                                                    <v-btn text x-small @click="deleteChannel(channelidx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                            </v-tabs>
                                            <v-tabs-items v-model="channelTab[idx]" v-if="isPhysicalChannelOpenClose">
                                                <v-tab-item v-for="(subtab, channelidx) in tab.channel" :key="channelidx">
                                                    <v-card flat>
                                                        <v-card-text>
                                                            <v-text-field v-model="subtab.name" :rules="rules.name" label="Name" @input="inputChannelName(subtab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <div class="subtitle-2" style="height:20px" :id="element.uuid+'/comconet-'+subtab.name+'-'+tab.name">
                                                                <v-hover v-slot="{ hover }">
                                                                    <v-btn text @click="showCommConnectItem" x-small color="indigo">
                                                                        <v-icon>{{ isCommConnectOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                    </v-btn>
                                                                </v-hover>
                                                                Comm Connector
                                                                <v-btn v-if="isCommConnectOpenClose" @click="isCommConnect" text x-small color="indigo">
                                                                    <v-icon>mdi-check</v-icon>
                                                                </v-btn>
                                                                <v-btn v-if="isCommConnectOpenClose && isdeleteCommConnect" @click="deleteCommConnect" text x-small color="indigo">
                                                                    <v-icon>mdi-minus</v-icon>
                                                                </v-btn>
                                                            </div>
                                                            <v-data-table v-model="selectDelectCommConnectItem" :headers="headerCommConnector" :items="subtab.comconnect" :items-per-page='20'
                                                                    :show-select="isdeleteCommConnect" item-key="connector" height="100px" v-if="isCommConnectOpenClose" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteCommConnect" v-slot:body="{ items }">
                                                                    <tbody>
                                                                        <tr v-for="(item,idxCC) in items" :key="idxCC">
                                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openCommConnect(idxCC)" @cancel="editCommConnect(idxCC)" @save="cancelCommConnect" large >
                                                                                {{item.connector}}
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-autocomplete v-model='editCCItem.connector' label='Communication Connector Reference' :items='selCommunicationConnect' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                                return-object :readonly="!isEditingCC" clearable @click="setCommuniCSelect()" 
                                                                                                @click:clear='clearCommuniC' @blur="isEditingCC=true" outlined dense style="height: 45px;">
                                                                                    </v-autocomplete>
                                                                                </template>
                                                                            </v-edit-dialog>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addCommConnect()" @save="cancelCommConnect"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="230px">
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editCCItem.connector' label='Communication Connector Reference' :items='selCommunicationConnect' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingCC" clearable @click="setCommuniCSelect()" 
                                                                                            @click:clear='clearCommuniC' @blur="isEditingCC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </th>
                                                                        </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-data-table>
                                                            <div class="subtitle-2" style="height:20px">
                                                                <v-hover v-slot="{ hover }">
                                                                    <v-btn text @click="showNetworkEndpointItem" x-small color="indigo">
                                                                        <v-icon>{{ isNetworkEndpointOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                    </v-btn>
                                                                </v-hover>
                                                                Network Endpoint
                                                                <v-btn v-if="isNetworkEndpointOpenClose" @click="addNetworkEndpoint" text x-small color="indigo">
                                                                    <v-icon>mdi-plus</v-icon>
                                                                </v-btn>
                                                            </div>
                                                            <v-tabs v-model='endpointTab[idx][channelidx]' height="30px" v-if="isNetworkEndpointOpenClose" show-arrows>
                                                                <v-tab v-for="(subendpointtab, endpoingidx) in subtab.endpoint" :key="endpoingidx" @click="clickEndpointTab(endpoingidx)"> 
                                                                    {{subendpointtab.name}}
                                                                    <v-btn text x-small @click="deleteEndpointTab(endpoingidx)"><v-icon x-small>mdi-close</v-icon></v-btn>
                                                                </v-tab>
                                                            </v-tabs>
                                                            <v-tabs-items v-model="endpointTab[idx][channelidx]" v-if="isNetworkEndpointOpenClose">
                                                                <v-tab-item v-for="(subendpointtab, endpoingidx) in subtab.endpoint" :key="endpoingidx">
                                                                    <br>
                                                                    <v-text-field v-model="subendpointtab.name" :rules="rules.name" label="Name" @input="inputEndPointName(subendpointtab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="subendpointtab.domainname" label="Fully Qualified Domain Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="subendpointtab.priority" label="Priority" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <div class="subtitle-2" style="height:20px">
                                                                        <v-hover v-slot="{ hover }">
                                                                            <v-btn text @click="showIP4Item" x-small color="indigo">
                                                                                <v-icon>{{ isIP4OpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                            </v-btn>
                                                                        </v-hover>
                                                                        IPV-4 Configuration
                                                                        <v-btn v-if="isIP4OpenClose" @click="isEndpointIP4" text x-small color="indigo">
                                                                            <v-icon>mdi-check</v-icon>
                                                                        </v-btn>
                                                                        <v-btn v-if="isIP4OpenClose && isdeleteIP4Item" @click="deleteIP4" text x-small color="indigo">
                                                                            <v-icon>mdi-minus</v-icon>
                                                                        </v-btn>
                                                                    </div>
                                                                    <v-data-table v-model="selectDelectIP4tem" :headers="headerIP4" :items="subendpointtab.ip4address" :items-per-page='20'
                                                                            :show-select="isdeleteIP4Item" v-if="isIP4OpenClose" item-key="address" height="100px" dense hide-default-footer >
                                                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                        </template>
                                                                        <template v-if="!isdeleteIP4Item" v-slot:body="{ items, headers }">
                                                                            <tbody>
                                                                                <tr v-for="(item,idxIP4) in items" :key="idxIP4">
                                                                                    <td v-for="(header,key) in headers" :key="key">
                                                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openIP4(idxIP4)" @cancel="editIP4(idxIP4)" @save="cancelIP4" large >
                                                                                            {{item[header.value]}}
                                                                                            <template v-slot:input>
                                                                                                <br>
                                                                                                <v-text-field v-model="editIP4Item.gateway" label="Default Gateway" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                <v-text-field v-model="editIP4Item.address" label="IPV-4 Address" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                <v-select v-model="editIP4Item.addresssorce" clearable :items="addressSourceIP4" label="IPV-4 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                <v-text-field v-model="editIP4Item.mask" label="Network Mask" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                            </template>
                                                                                        </v-edit-dialog>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th colspan="3">
                                                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addIP4()" @save="cancelIP4"> 
                                                                                            <v-btn outlined color="indigo" dense text small block width="270px">
                                                                                                <v-icon >mdi-plus</v-icon>New Item
                                                                                            </v-btn>
                                                                                            <template v-slot:input>
                                                                                                <br>
                                                                                                <v-text-field v-model="editIP4Item.gateway" label="Default Gateway" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                <v-text-field v-model="editIP4Item.address" label="IPV-4 Address" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                <v-select v-model="editIP4Item.addresssorce" clearable :items="addressSourceIP4" label="IPV-4 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                <v-text-field v-model="editIP4Item.mask" label="Network Mask" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                            </template>
                                                                                        </v-edit-dialog>
                                                                                    </th>
                                                                                </tr>
                                                                            </tbody>
                                                                        </template>
                                                                    </v-data-table>
                                                                    <div class="subtitle-2" style="height:20px">
                                                                        <v-hover v-slot="{ hover }">
                                                                            <v-btn text @click="showIP6Item" x-small color="indigo">
                                                                                <v-icon>{{ isIP6OpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                            </v-btn>
                                                                        </v-hover>
                                                                        IPV-6 Configuration
                                                                        <v-btn v-if="isIP6OpenClose" @click="isEndpointIP6" text x-small color="indigo">
                                                                            <v-icon>mdi-check</v-icon>
                                                                        </v-btn>
                                                                        <v-btn v-if="isIP6OpenClose && isdeleteIP6Item" @click="deleteIP6" text x-small color="indigo">
                                                                            <v-icon>mdi-minus</v-icon>
                                                                        </v-btn>
                                                                    </div>
                                                                    <v-data-table v-model="selectDelectIP6tem" :headers="headerIP6" :items="subendpointtab.ip6address" :items-per-page='20'
                                                                            :show-select="isdeleteIP6Item" v-if="isIP6OpenClose" item-key="address" height="100px" dense hide-default-footer >
                                                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                        </template>
                                                                        <template v-if="!isdeleteIP6Item" v-slot:body="{ items, headers }">
                                                                            <tbody>
                                                                                <tr v-for="(item,idxIP6) in items" :key="idxIP6">
                                                                                    <td v-for="(header,key) in headers" :key="key">
                                                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openIP6(idxIP6)" @cancel="editIP6(idxIP6)" @save="cancelIP6" large >
                                                                                            {{item[header.value]}}
                                                                                            <template v-slot:input>
                                                                                                <br>
                                                                                                <v-text-field v-model="editIP6Item.priority" label="Assigment Priority" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                <v-select v-model="editIP6Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                <v-text-field v-model="editIP6Item.address" label="IPV-6 Address" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                <v-select v-model="editIP6Item.addresssorce" clearable :items="addressSourceIP6" label="IPV-6 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                <v-text-field v-model="editIP6Item.prelength" label="IP Address Prefix Length" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                            </template>
                                                                                        </v-edit-dialog>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th colspan="3">
                                                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addIP6()" @save="cancelIP6"> 
                                                                                            <v-btn outlined color="indigo" dense text small block width="270px">
                                                                                                <v-icon >mdi-plus</v-icon>New Item
                                                                                            </v-btn>
                                                                                            <template v-slot:input>
                                                                                                <br>
                                                                                                <v-text-field v-model="editIP6Item.priority" label="Assigment Priority" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                <v-select v-model="editIP6Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                <v-text-field v-model="editIP6Item.address" label="IPV-6 Address" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                <v-select v-model="editIP6Item.addresssorce" clearable :items="addressSourceIP6" label="IPV-6 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                <v-text-field v-model="editIP6Item.prelength" label="IP Address Prefix Length" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                            </template>
                                                                                        </v-edit-dialog>
                                                                                    </th>
                                                                                </tr>
                                                                            </tbody>
                                                                        </template>
                                                                    </v-data-table>
                                                                </v-tab-item>
                                                            </v-tabs-items>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-tab-item>
                                            </v-tabs-items>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </div>
                        <div v-else>
                            <v-data-table v-if="isEthernetClusterOpenClose" :headers="viewHeader" :items="viewList" item-key="id" single-select :items-per-page='20'
                                height="370px" dense hide-default-footer @click:row="editDialogEthernetCluster" @click="setactiveUUID" class="elevation-1">
                            </v-data-table>
                        </div>
                    </v-card>
                </v-card-text>
                <v-card-text v-else-if="iselementOpenClose && isDatailView">
                    <div class="subtitle-2" style="height:20px">
                        Conditional
                    </div>
                    <v-text-field v-model="element.conditional[viewInfo.idxConditional].name" @input="inputConditionalName(element.conditional[viewInfo.idxConditional].name)" 
                                    :rules="rules.name" label="Protocol Name"  placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.conditional[viewInfo.idxConditional].version" 
                                    label="Protocol Version" placeholder="Numeric Only(Unit Second)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <div v-if="viewInfo.isChannel">
                        <div class="subtitle-2" style="height:20px" >
                            Physical Channel
                        </div>
                        <v-text-field v-model="element.conditional[viewInfo.idxConditional].channel[viewInfo.idxChannel].name" :rules="rules.name" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        <div class="subtitle-2" style="height:20px">
                            Comm Connector
                            <v-btn  @click="isdialogCC" text x-small color="indigo">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isdeleteInfoCC" @click="deletedialogCC" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-data-table v-model="selectDelectInfoCC" :headers="headerCommConnector" :items="element.conditional[viewInfo.idxConditional].channel[viewInfo.idxChannel].comconnect"  
                                :show-select="isdeleteInfoCC" item-key="connector" height="100px" dense hide-default-footer :items-per-page='20'>
                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                            </template>
                            <template v-if="!isdeleteInfoCC" v-slot:body="{ items }">
                                <tbody>
                                    <tr v-for="(item,idx) in items" :key="idx">
                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="opendialogCC(idx)" @cancel="editdialogCC(idx)" @save="canceldialogCC" large >
                                            {{item.connector}}
                                            <template v-slot:input>
                                                <br>
                                                <v-autocomplete v-model='editCCItem.connector' label='Communication Connector Reference' :items='selCommunicationConnect' item-text='name' item-value="name" class="lable-placeholer-color"
                                                    return-object :readonly="!isEditingCC" clearable @click="setCommuniCSelect()" 
                                                    @click:clear='clearCommuniC' @blur="isEditingCC=true" outlined dense style="height: 45px;">
                                                </v-autocomplete>
                                            </template>
                                        </v-edit-dialog>
                                    </tr>
                                    <tr>
                                        <th>
                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="adddialogCC()" @save="canceldialogCC"> 
                                                <v-btn outlined color="indigo" dense text small block width="230px">
                                                    <v-icon >mdi-plus</v-icon>New Item
                                                </v-btn>
                                                <template v-slot:input>
                                                    <br>
                                                    <v-autocomplete v-model='editCCItem.connector' label='Communication Connector Reference' :items='selCommunicationConnect' item-text='name' item-value="name" class="lable-placeholer-color"
                                                        return-object :readonly="!isEditingCC" clearable @click="setCommuniCSelect()" 
                                                        @click:clear='clearCommuniC' @blur="isEditingCC=true" outlined dense style="height: 45px;">
                                                    </v-autocomplete>
                                                </template>
                                            </v-edit-dialog>
                                        </th>
                                    </tr>
                                </tbody>
                            </template>
                        </v-data-table>
                        <div v-if="viewInfo.isEndpoint">
                            <div class="subtitle-2" style="height:20px">
                                Network Endpoint
                            </div>
                            <v-text-field v-model="element.conditional[viewInfo.idxConditional].channel[viewInfo.idxChannel].endpoint[viewInfo.idxEndpoint].name" :rules="rules.name" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.conditional[viewInfo.idxConditional].channel[viewInfo.idxChannel].endpoint[viewInfo.idxEndpoint].domainname" label="Fully Qualified Domain Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.conditional[viewInfo.idxConditional].channel[viewInfo.idxChannel].endpoint[viewInfo.idxEndpoint].priority" label="Priority" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <div class="subtitle-2" style="height:20px">
                                IPV-4 Configuration
                                <v-btn @click="isEndpointDialogIP4" text x-small color="indigo">
                                    <v-icon>mdi-check</v-icon>
                                </v-btn>
                                <v-btn v-if="isdeleteInfoIPV4" @click="deletedialogIP4" text x-small color="indigo">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </div>
                            <v-data-table v-model="selectDelectInfoIP4" :headers="headerIP4" :items="element.conditional[viewInfo.idxConditional].channel[viewInfo.idxChannel].endpoint[viewInfo.idxEndpoint].ip4address" 
                                    :show-select="isdeleteInfoIPV4" item-key="address" height="100px" dense hide-default-footer :items-per-page='20'>
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteInfoIPV4" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="opendialogIP4(idx, items)" @cancel="editdialogIP4(idx, items)" @save="canceldialogIP4" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editIP4Item.gateway" label="Default Gateway" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID"  outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editIP4Item.address" label="IPV-4 Address" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editIP4Item.addresssorce" clearable :items="addressSourceIP4" label="IPV-4 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editIP4Item.mask" label="Network Mask" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="adddialogIP4()" @save="canceldialogIP4"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px">
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editIP4Item.gateway" label="Default Gateway" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editIP4Item.address" label="IPV-4 Address" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editIP4Item.addresssorce" clearable :items="addressSourceIP4" label="IPV-4 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editIP4Item.mask" label="Network Mask" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </th>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-data-table>
                            <div class="subtitle-2" style="height:20px">
                                IPV-6 Configuration
                                <v-btn @click="isEndpointDialogIPV6" text x-small color="indigo">
                                    <v-icon>mdi-check</v-icon>
                                </v-btn>
                                <v-btn v-if="isdeleteInfoIPV6" @click="deletedialogIP6" text x-small color="indigo">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </div>
                            <v-data-table v-model="selectDelectInfoIP6" :headers="headerIP6" :items="element.conditional[viewInfo.idxConditional].channel[viewInfo.idxChannel].endpoint[viewInfo.idxEndpoint].ip6address"
                                    :show-select="isdeleteInfoIPV6" item-key="address" height="100px" dense hide-default-footer :items-per-page='20'>
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteInfoIPV6" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="opendialogIP6(idx, items)" @cancel="editdialogIP6(idx, items)" @save="canceldialogIP6" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editIP6Item.priority" label="Assigment Priority" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editIP6Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editIP6Item.address" label="IPV-6 Address" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editIP6Item.addresssorce" clearable :items="addressSourceIP6" label="IPV-6 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editIP6Item.prelength" label="IP Address Prefix Length" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="adddialogIP6()" @save="canceldialogIP6"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px">
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editIP6Item.priority" label="Assigment Priority" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editIP6Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editIP6Item.address" label="IPV-6 Address" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editIP6Item.addresssorce" clearable :items="addressSourceIP6" label="IPV-6 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editIP6Item.prelength" label="IP Address Prefix Length" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </th>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-data-table>  
                        </div>
                    </div>
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
    props: ['element', 'isDatailView', 'viewInfo', 'minimaptoolbar', 'location'],
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
        /*endpointTab이 2차원 배열이기 때문에 복사하거나 fileInput 시 미리 정의해 줘야지 안그러면 error */
        if (this.element.conditional.length > 0) {
            this.element.conditional.forEach( (condi,i) => {
                this.channelTab[i] = 0
                if (condi.channel.length > 0) {
                    condi.channel.forEach( () => {
                        this.endpointTab.push([i, 0])
                    })
                }
            })
        }
    },
    data() {
        return {
            rules: {
                name:  [val => (val || '').length > 0 ],
            },
            colorToolbar: "#6A5ACD",
            dialogPath : false,
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌

            isEthernetClusterOpenClose: true,
            isPhysicalChannelOpenClose: true,
            isCommConnectOpenClose: true,
            isNetworkEndpointOpenClose: true,
            isIP4OpenClose: true,
            isIP6OpenClose: true,
            isdeleteCommConnect: false,
            isdeleteIP4Item: false,
            isdeleteIP6Item: false,
            selectViewedit: true, //true: edit  false: view
            selectDelectCommConnectItem: [],
            selectDelectIP4tem: [],
            selectDelectIP6tem: [],
            conditionalTab: 0,
            channelTab: [],
            endpointTab: [],
            headerCommConnector: [
                { text: 'Communication Connector Ref', align: 'start', sortable: false, value: 'connector' },
            ],
            editCCItem: { connector : null},
            selCommunicationConnect: this.$store.getters.getCommunicationConnect,
            isEditingCC: true,
            deleteCCLine: [],

            headerIP4: [
                { text: 'DEFAULT-GATEWAY', width:'140px', align: 'start', sortable: false, value: 'gateway' },
                { text: 'IP-ADDRESS-KEEP-BEHAVIOR', width:'200px', sortable: false, value: 'behavior'},
                { text: 'IPV-4-ADDRESS', width:'130px', sortable: false, value: 'address'},
                { text: 'IPV-4-ADDRESS-SOURCE', width:'180px', sortable: false, value: 'addresssorce'},
                { text: 'NETWORK-MASK', width:'130px', sortable: false, value: 'mask'},
            ],
            headerIP6: [
                { text: 'ASSIGNMENT-PRIORITY', width:'180px', sortable: false, value: 'priority'},
                { text: 'IP-ADDRESS-KEEP-BEHAVIOR', width:'200px', sortable: false, value: 'behavior'},
                { text: 'IP-ADDRESS-PREFIX-LENGTH', width:'200px', sortable: false, value: 'prelength'},
                { text: 'IPV-6-ADDRESS', width:'130px', sortable: false, value: 'address'},
                { text: 'IPV-6-ADDRESS-SOURCE', width:'180px', sortable: false, value: 'addresssource'},
            ],
            editIP4Item: { gateway:'', behavior: null, address:'', addresssorce:null, mask:'',},
            editIP6Item: { priority:'', behavior:null, prelength:'', address:'', addresssource:null,},
            defaultIP4Item: { gateway:'', behavior:null, address:'', addresssorce:null, mask:'',},
            defaultIP6Item: { priority:'', behavior:null, prelength:'', address:'', addresssource:null,},
            addressSourceIP4: [ 'FIXED', 'DHCPV-4', 'AUTO-IP', 'AUTO-IP--DOIP'],
            addressSourceIP6: [ 'FIXED', 'DHCPV-6', 'LINK-LOCAL', 'ROUTER-ADVERTISEMENT', 'LINK-LOCAL--DOIP'],
            addressBehavior: [ 'FORGET', 'STORE-PERSISTENTLY'],

            viewList: [],
            viewHeader: [
                { text: 'Conditional name', width:'130px', align: 'start', sortable: false, value: 'condiname' },
                { text: 'Channel name', width:'120px', sortable: false, value: 'channame' },
                { text: 'Connector', width:'70px', sortable: false, value: 'connector' },
                { text: 'Endpoint name', width:'120px', sortable: false, value: 'endname' },
                { text: 'IPV-4 Address', width:'120px', sortable: false, value: 'ipv4' },
                { text: 'IPV-6 Address', width:'120px', sortable: false, value: 'ipv6' },
            ],
            selectedViewId: -1,

            editViewMode: { name:'', version:'', channel: {name: '', comconnect:[], endpoint:{name: '', domainname:'', ip4address: [], ip6address: []}}},
            isdeleteInfoCC: false,
            isdeleteInfoIPV4: false,
            isdeleteInfoIPV6: false,
            selectDelectInfoCC: [],
            selectDelectInfoIP4: [],
            selectDelectInfoIP6: [],
        }
    },
    mounted () {
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            if(this.element.conditional[this.conditionalTab] != undefined) {
                if(this.element.conditional[this.conditionalTab].channel.length > 0) {
                    if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                        if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name != '') {
                            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        condi: this.element.conditional[this.conditionalTab].name,
                                                        channl: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name,
                                                        endpoint: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name} )
                        }
                    }
                }
            }
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
        showEthernetCluster() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose && this.location == 1) {
                    if(this.isEthernetClusterOpenClose) {
                        if(this.element.conditional[this.conditionalTab].channel.length > 0) {
                            if(this.isPhysicalChannelOpenClose) {
                                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name, this.element.conditional[this.conditionalTab].name)}, 300);
                            } else {
                                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].name)}, 300);
                            }
                        } else {
                            EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                        }
                    } else {
                        EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                    }
                } 
            })
        },
        showEthernetClusterItem() {
            this.isEthernetClusterOpenClose = this.isEthernetClusterOpenClose ? false : true
            var activeLine = this.$store.getters.getactiveLine(this.element.uuid)
            if (this.location == 1 && activeLine.length > 0) {
                this.$nextTick(() => {
                    if(this.isEthernetClusterOpenClose) {
                        if(this.element.conditional[this.conditionalTab].channel.length > 0) {
                            if(this.isPhysicalChannelOpenClose) {
                                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name, this.element.conditional[this.conditionalTab].name)}, 300);
                            } else {
                                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].name)}, 300);
                            }
                        } else {
                            EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                        }
                    } else {
                        EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        showPhysicalChannelItem() {
            this.isPhysicalChannelOpenClose = this.isPhysicalChannelOpenClose ? false : true
            if(this.element.conditional[this.conditionalTab].channel.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isPhysicalChannelOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name, this.element.conditional[this.conditionalTab].name)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].name)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        showCommConnectItem() {
            this.isCommConnectOpenClose = this.isCommConnectOpenClose ? false : true
        },
        showNetworkEndpointItem() {
            this.isNetworkEndpointOpenClose = this.isNetworkEndpointOpenClose ? false : true
        },
        showIP4Item() {
            this.isIP4OpenClose = this.isIP4OpenClose ? false : true
        },
        showIP6Item() {
            this.isIP6OpenClose = this.isIP6OpenClose ? false : true
        },
        setViewEdit() {
            if (this.selectViewedit == true) {
                this.selectViewedit = false
                this.settingViewList()
            } else {
                this.selectViewedit = true
                this.viewList = []
                this.selectedViewId = -1
            }
        },

        inputEthernetClusterName () {
            console.log('inputEthernetClusterName')
            this.$store.commit('editEthernetCluster', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if(this.element.conditional[this.conditionalTab].channel.length>0) {
                if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                    if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name != '') {
                        this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    condi: this.element.conditional[this.conditionalTab].name,
                                                    channl: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name,
                                                    endpoint: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name} )
                    }
                }
            }
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        inputConditionalName(name) {
            if(this.element.conditional[this.conditionalTab].channel.length>0) {
                if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                    if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name != '') {
                        this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    condi: name,
                                                    channl: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name,
                                                    endpoint: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name} )
                    }
                }
            }
        },
        inputChannelName(name) {
            if(this.element.conditional[this.conditionalTab].channel.length>0) {
                if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                    if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name != '') {
                        this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    condi: this.element.conditional[this.conditionalTab].name,
                                                    channl: name,
                                                    endpoint: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name} )
                    }
                }
            }
        },
        inputEndPointName(name) {
            if(this.element.conditional[this.conditionalTab].channel.length>0) {
                if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                    if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].name != '') {
                        this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    condi: this.element.conditional[this.conditionalTab].name,
                                                    channl: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name,
                                                    endpoint: name} )
                    }
                }
            }
        },

        addEthernetCluster() {
            //console.log('addEthernetCluster')
            const editItem = {name: '', version:'', channel: []}
            const addObj = new Object(editItem)
            addObj.name = 'Ethernet_'+(this.element.conditional.length+1)
            this.element.conditional.push(addObj)
            this.conditionalTab = this.element.conditional.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
            }
        },
        clickConditionaltab(idx) {
            this.conditionalTab = idx
            this.clickChanneltab(0)
        },
        changeConditionalTab() {
            console.log('changeConditionalTab    ' + this.conditionalTab)
            if (this.location == 1) {
                if(this.element.conditional.length > 0) {
                    if(this.isPhysicalChannelOpenClose) {
                        setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name, this.element.conditional[this.conditionalTab].name)}, 300);
                    } else {
                        setTimeout(() => {EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].name)}, 300);
                    }
                } else {
                    setTimeout(() => {EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, this.conditionalTab, this.conditionalTab)}, 300);
                }
            }
        },
        deleteConditional(idx) {
            //console.log('deleteConditional')
            for(let i=0; i<this.element.conditional[idx].channel.length; i++){
                if(this.element.conditional[idx].channel[i].comconnect != null) {
                    for(let n=0; n<this.element.conditional[idx].channel[i].comconnect.length; n++){
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+n+'-'+i+'-'+idx)
                        if(endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/comconet-'+n+'-'+i+'-'+idx)
                        }
                    }
                }
            }
            for(let i=idx+1; i<this.element.conditional.length; i++){
                for(let n=0; n<this.element.conditional[i].channel.length; n++){
                    for(let v=0; v<this.element.conditional[i].channel[n].comconnect.length; v++){
                        var endC = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+v+'-'+n+'-'+i)
                        if(endC != undefined) {
                            this.deleteLine(this.element.uuid+'/comconet-'+v+'-'+n+'-'+i)
                            this.newLine(this.element.uuid+'/comconet-'+v+'-'+n+'-'+(i-1), this.element.uuid+'/conditional', endC)
                        }
                    }
                }
            }

            this.$store.commit('deleteRefTable', {deleteName:'machineD', deleteTab: true, deletTab:'1', tabName: this.element.conditional[this.conditionalTab].name, path: this.element.path, name: this.element.name})
            this.element.conditional.splice(idx, 1)
            this.conditionalTab = 0
            this.channelTab[this.conditionalTab] = 0
            this.endpointTab[this.conditionalTab][this.channelTab] = 0
            this.changeConditionalTab()
        },
        addPhysicalChannel() {
            //console.log('addPhysicalChannel  '+this.conditionalTab)
            this.endpointTab.push([this.conditionalTab,0]) //2차원 배열로 초기화 해줘야지 안그러면 tab이 안생김
            const editItem = {name: '', comconnect:[], endpoint: []}
            const addObj = new Object(editItem)
            addObj.name = 'PhysicalChannel_'+(this.element.conditional[this.conditionalTab].channel.length+1)
            this.element.conditional[this.conditionalTab].channel.push(addObj)
            this.channelTab[this.conditionalTab] = this.element.conditional[this.conditionalTab].channel.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].name)
            }
            //console.log(this.channelTab)
            //console.log(this.endpointTab)
        },
        clickChanneltab(idx) {
           // console.log('clickChanneltab ' + this.channelTab[this.conditionalTab]+ '  /  '+ idx +'   /  '+this.conditionalTab)
            this.channelTab[this.conditionalTab] = idx
            this.isdeleteCommConnect = false
            this.selectDelectCommConnectItem = []
            this.clickEndpointTab(0)
        },
        changeChannelTab() {
            if (this.element.conditional[this.conditionalTab].channel.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.channelTab[this.conditionalTab], this.conditionalTab, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name, this.element.conditional[this.conditionalTab].name)}, 300);
            }
        },
        deleteChannel(idx) {
            //console.log('deleteChannel')
            for(let i=0; i<this.element.conditional[this.conditionalTab].channel[idx].comconnect.length; i++){
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+i+'-'+idx+'-'+this.conditionalTab)
                if(endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/comconet-'+i+'-'+idx+'-'+this.conditionalTab)
                }
            }
            for(let i=idx+1; i<this.element.conditional[this.conditionalTab].channel.length; i++){
                for(let n=0; n<this.element.conditional[this.conditionalTab].channel[i].comconnect.length; n++){
                    var endC = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+n+'-'+i+'-'+this.conditionalTab)
                    if(endC != undefined) {
                        this.deleteLine(this.element.uuid+'/comconet-'+n+'-'+i+'-'+this.conditionalTab)
                        this.newLine(this.element.uuid+'/comconet-'+n+'-'+(i-1)+'-'+this.conditionalTab, this.element.uuid+'/channel'+this.element.conditional[this.conditionalTab].name, endC)
                    }
                }
            }

            this.$store.commit('deleteRefTable', {deleteName:'machineD', deleteTab: true, deletTab:'2', tabName: this.element.conditional[this.conditionalTab].name+'/'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name, path: this.element.path, name: this.element.name})
            this.element.conditional[this.conditionalTab].channel.splice(idx, 1)
            this.channelTab[this.conditionalTab] = 0
            this.endpointTab[this.conditionalTab][this.channelTab] = 0
            this.changeChannelTab()
        },

        isCommConnect() {
            if (this.isdeleteCommConnect == true) {
                this.isdeleteCommConnect = false
                this.selectDelectCommConnectItem = []
            } else {
                this.isdeleteCommConnect = true
            }
        },
        deleteCommConnect() {
            if (this.isdeleteCommConnect == true) {
                for(let i=0; i<this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+i+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab)
                    if(endLine != undefined) {
                        this.deleteCCLine.push({name:this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[i].connector, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/comconet-'+i+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab)
                    }
                }

                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.filter(item => {
                        return this.selectDelectCommConnectItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.length; n++) {
                    for(let idx=0; idx<this.deleteCCLine.length; idx++) {
                        if (this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[n].connector == this.deleteCCLine[idx].name) {
                            this.newLine(this.element.uuid+'/comconet-'+n+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab, this.element.uuid+'/comconet'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name+'-'+this.element.conditional[this.conditionalTab].name, this.deleteCCLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteCommConnect = false
                this.selectDelectCommConnectItem = []
                this.deleteCCLine = []
            } 
        },
        addCommConnect() {
            if( this.editCCItem.connector != null) {
                var datacount
                if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect == undefined) {
                    datacount = 0
                }else {
                    datacount = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.length
                }
                this.newLine(this.element.uuid+'/comconet-'+datacount+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab, this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name+'-'+this.element.conditional[this.conditionalTab].name, this.editCCItem.connector.uuid)
                this.editCCItem.connector = this.editCCItem.connector.name
            }
            //console.log(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name+'-'+this.element.conditional[this.conditionalTab].name)
            const addObj = Object.assign({}, this.editCCItem)
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.push(addObj);

            this.cancelCommConnect()
        },
        cancelCommConnect() {
            this.editCCItem.connector = null
            this.setactiveUUID()
        },
        editCommConnect(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+idx+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab)
            if (endLine != undefined && this.editCCItem.connector == null) {
                this.deleteLine(this.element.uuid+'/comconet-'+idx+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab)
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector = null
            } else if (endLine != undefined && endLine != this.editCCItem.connector.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/comconet-'+idx+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab)
                this.newLine(this.element.uuid+'/comconet-'+idx+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab, this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name+'-'+this.element.conditional[this.conditionalTab].name, this.editCCItem.connector.uuid)
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector = this.editCCItem.connector.name
            } else if (endLine == undefined && this.editCCItem.connector != null) {
                this.newLine(this.element.uuid+'/comconet-'+idx+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab, this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name+'-'+this.element.conditional[this.conditionalTab].name, this.editCCItem.connector.uuid)
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector = this.editCCItem.connector.name
            }
            
            this.cancelCommConnect()
        },
        openCommConnect(idx) {
            this.selCommunicationConnect = this.$store.getters.getCommunicationConnect
            if ( this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+idx+'-'+this.channelTab[this.conditionalTab]+'-'+this.conditionalTab)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getMachinDesignPath(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector, 1)
                }
                this.editCCItem.connector = { name: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector, uuid: endLine }
            }
        },
        setCommuniCSelect() {
            if (this.isEditingCC == true) {
                if (this.editCCItem.connector != null && this.editCCItem.connector.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editCCItem.connector.uuid, element: constant.MachineDesigne_str} )
                }
                this.setComunicationConnetList()
                this.isEditingCC = false
            } else {
                this.isEditingCC = true
            }
        },
        setComunicationConnetList() {
            this.selCommunicationConnect = this.$store.getters.getCommunicationConnect
            this.setactiveUUID()
        },
        clearCommuniC() {
            this.isEditingCC = true
            this.editCCItem.connector = null
        },

        addNetworkEndpoint() {
            const editItem = {name: '', domainname:'', ip4address: [], ip6address: [], priority: ''}
            const addObj = new Object(editItem)
            addObj.name = 'Endpoint'+(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length+1)
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.push(addObj)
            this.endpointTab[this.conditionalTab][this.channelTab] = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length-1
        },
        clickEndpointTab(idx) {
            //console.log('clickEndpointTab '+ this.conditionalTab +'  /  ' + this.channelTab)
            this.endpointTab[this.conditionalTab][this.channelTab] = idx
            this.isdeleteIP4Item = false
            this.isdeleteIP6Item = false
            this.selectDelectIP4tem = []
            this.selectDelectIP6tem = []
        },
        deleteEndpointTab(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'machineD', deleteTab: true, deletTab:'3', tabName: this.element.conditional[this.conditionalTab].name+'/'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name+'/'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[idx].name, path: this.element.path, name: this.element.name})
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.splice(idx, 1)
            this.endpointTab[this.conditionalTab][this.channelTab] = 0
        },
        isEndpointIP4() {
            if (this.isdeleteIP4Item == true) {
                this.isdeleteIP4Item = false
                this.selectDelectIP4tem = []
            } else {
                this.isdeleteIP4Item = true
            }
        },
        deleteIP4() {
            if (this.isdeleteIP4Item == true) {
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address.filter(item => {
                         return this.selectDelectIP4tem.indexOf(item) < 0 })
                this.isdeleteIP4Item = false
                this.selectDelectIP4tem = []
            } 
        },
        isEndpointIP6() {
            if (this.isdeleteIP6Item == true) {
                this.isdeleteIP6Item = false
                this.selectDelectIP6tem = []
            } else {
                this.isdeleteIP6Item = true
            }
        },
        deleteIP6() {
            if (this.isdeleteIP6Item == true) {
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address.filter(item => {
                         return this.selectDelectIP6tem.indexOf(item) < 0 })
                this.isdeleteIP6Item = false
                this.selectDelectIP6tem = []
            } 
        },
        openIP4(idx) {
            this.editIP4Item.gateway = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].gateway
            this.editIP4Item.behavior = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].behavior
            this.editIP4Item.address = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].address
            this.editIP4Item.addresssorce = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].addresssorce
            this.editIP4Item.mask = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].mask
        },
        editIP4(idx) {
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].gateway = this.editIP4Item.gateway
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].behavior = this.editIP4Item.behavior
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].address = this.editIP4Item.address
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].addresssorce = this.editIP4Item.addresssorce
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address[idx].mask = this.editIP4Item.mask
            this.cancelIP4()
        },
        addIP4() {
            const addObj = Object.assign({}, this.editIP4Item)
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip4address.push(addObj)
            this.cancelIP4()
        },
        cancelIP4() {
            this.editIP4Item = Object.assign({}, this.defaultIP4Item)
            this.setactiveUUID()
        },
        openIP6(idx) {
            this.editIP6Item.priority = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].priority
            this.editIP6Item.behavior = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].behavior
            this.editIP6Item.prelength = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].prelength
            this.editIP6Item.address = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].address
            this.editIP6Item.addresssource = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].addresssource
        },
        editIP6(idx) {
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].gatpriorityway = this.editIP6Item.priority
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].behavior = this.editIP6Item.behavior
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].prelength = this.editIP6Item.prelength
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab].ip6address[idx].address = this.editIP6Item.address
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address[idx].addresssource = this.editIP6Item.addresssource
            this.cancelIP6()
        },
        addIP6() {
            const addObj = Object.assign({}, this.editIP6Item)
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab]].ip6address.push(addObj)
            this.cancelIP6()
        },
        cancelIP6() {
            this.editIP6Item = Object.assign({}, this.defaultIP6Item)
            this.setactiveUUID()
        },

        settingViewList() {
            var connector = [], isendpoint = false, isChannel = false
            var ipv4 = [], ipv6 =[], id = 0
            for(const i in this.element.conditional) {
                for(const v in this.element.conditional[i].channel ) {
                    isChannel = true
                    this.element.conditional[i].channel[v].comconnect.forEach(connectorItem => {
                        connector.push(connectorItem.connector)
                    })
                    for(const n in this.element.conditional[i].channel[v].endpoint) {
                        this.element.conditional[i].channel[v].endpoint[n].ip4address.forEach(ip4Item => {
                            ipv4.push(ip4Item.address)
                        })
                        this.element.conditional[i].channel[v].endpoint[n].ip6address.forEach(ip6Item => {
                            ipv6.push(ip6Item.address)
                        })
                        isendpoint= true
                        this.viewList.push({
                            condiname: this.element.conditional[i].name, 
                            channame:this.element.conditional[i].channel[v].name, 
                            connector:connector.join(), 
                            endname:this.element.conditional[i].channel[v].endpoint[n].name,
                            ipv4:ipv4.join(), ipv6:ipv6.join(),
                            condidx: i,
                            channelidx: v,
                            endpointidx: n,
                            id: id++
                        })
                        ipv4 = []
                        ipv6 =[]
                    }
                    if(isendpoint == false) {
                        this.viewList.push({
                            condiname: this.element.conditional[i].name, 
                            channame:this.element.conditional[i].channel[v].name, 
                            connector:connector.join(), 
                            endname:null, ipv4:null, ipv6:null,
                            condidx: i, channelidx: v, endpointidx: null,
                            id: id++
                        })
                    }
                    isendpoint = false
                    connector = []
                }
                if(isChannel == false) {
                    this.viewList.push({
                        condiname: this.element.conditional[i].name, 
                        channame:null, connector:null, endname:null, 
                        ipv4:null, ipv6:null,
                        condidx: i, channelidx: null, endpointidx: null,
                        id: id++
                    })
                }
                isChannel = false
            }
        },
        editDialogEthernetCluster(item, row) {
            var info = {  isChannel: false, isEndpoint: false, idxConditional: 0, idxChannel: null,  idxEndpoint: null,}
            if(this.element.conditional[item.condidx].channel.length > 0) {
                info.isChannel = true
                if(this.element.conditional[item.condidx].channel[item.channelidx].endpoint.length > 0) {
                    info.isEndpoint = true
                    info.idxEndpoint = item.endpointidx
                }
                info.idxChannel = item.channelidx
            }
            info.idxConditional = item.condidx
            this.$store.commit('setDetailView', {uuid: this.element.uuid, element: constant.EthernetCluster_str} )
            row.select(true)
            this.selectedViewId = item.id
            EventBus.$emit('detailViewInfo',info)
        },
        isdialogCC() {
            if (this.isdeleteInfoCC == true) {
                this.isdeleteInfoCC = false
                this.selectDelectInfoCC = []
            } else {
                this.isdeleteInfoCC = true
            }
        },
        deletedialogCC() {
            if (this.isdeleteInfoCC == true) {
                for(let i=0; i<this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+i+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional)
                    if(endLine != undefined) {
                        this.deleteCCLine.push({name:this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[i].connector, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/comconet-'+i+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional)
                    }
                }

                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect.filter(item => {
                        return this.selectDelectInfoCC.indexOf(item) < 0 })

                for(let n=0; n<this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect.length; n++) {
                    for(let idx=0; idx<this.deleteCCLine.length; idx++) {
                        if (this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[n].connector == this.deleteCCLine[idx].name) {
                            this.newLine(this.element.uuid+'/comconet-'+n+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional, this.element.uuid+'/comconet-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].name+'-'+this.element.conditional[this.viewInfo.idxConditional].name, this.deleteCCLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteInfoCC = false
                this.selectDelectInfoCC = []
                this.deleteCCLine = []
            } 
        },
        opendialogCC(idx) {
            this.selCommunicationConnect = this.$store.getters.getCommunicationConnect
            if ( this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector != null) {
                this.editCCItem.connector = { name: this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector, 
                                              uuid: this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+idx+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional) }
            }
        },
        editdialogCC(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+idx+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional)
            if (endLine != undefined && this.editCCItem.connector == null) {
                this.deleteLine(this.element.uuid+'/comconet-'+idx+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional)
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector = null
            } else if (endLine != undefined && endLine != this.editCCItem.connector.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/comconet-'+idx+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional)
                this.newLine(this.element.uuid+'/comconet-'+idx+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional, this.element.uuid+'/comconet-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].name+'-'+this.element.conditional[this.viewInfo.idxConditional].name, this.editCCItem.connector.uuid)
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector = this.editCCItem.connector.name
            } else if (endLine == undefined && this.editCCItem.connector != null) {
                this.newLine(this.element.uuid+'/comconet-'+idx+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional, this.element.uuid+'/comconet-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].name+'-'+this.element.conditional[this.viewInfo.idxConditional].name, this.editCCItem.connector.uuid)
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector = this.editCCItem.connector.name
            }
            
            this.canceldialogCC()
        },
        canceldialogCC() {
            this.isEditingCC = true
            this.editCCItem.connector = null
        },
        adddialogCC() {
            if( this.editCCItem.connector != null) {
                var datacount
                if(this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect == undefined) {
                    datacount = 0
                }else {
                    datacount = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect.length
                }
                this.newLine(this.element.uuid+'/comconet-'+datacount+'-'+this.viewInfo.idxChannel+'-'+this.viewInfo.idxConditional, this.element.uuid+'/comconet-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].name+'-'+this.element.conditional[this.viewInfo.idxConditional].name, this.editCCItem.connector.uuid)
                this.editCCItem.connector = this.editCCItem.connector.name
            }
            const addObj = Object.assign({}, this.editCCItem)
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect.push(addObj);

            this.canceldialogCC()
        },

        isEndpointDialogIP4() {
            if (this.isdeleteInfoIPV4 == true) {
                this.isdeleteInfoIPV4 = false
                this.selectDelectInfoIP4 = []
            } else {
                this.isdeleteInfoIPV4 = true
            }
        },
        deletedialogIP4() {
            if (this.isdeleteInfoIPV4 == true) {
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address.filter(item => {
                         return this.selectDelectInfoIP4.indexOf(item) < 0 })
                this.isdeleteInfoIPV4 = false
                this.selectDelectInfoIP4 = []
            } 
        },
        opendialogIP4(idx) {
            this.editIP4Item.gateway = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].gateway
            this.editIP4Item.behavior = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].behavior
            this.editIP4Item.address = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].address
            this.editIP4Item.addresssorce = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].addresssorce
            this.editIP4Item.mask = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].mask
        },
        editdialogIP4(idx) {
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].gateway = this.editIP4Item.gateway
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].behavior = this.editIP4Item.behavior
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].address = this.editIP4Item.address
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].addresssorce = this.editIP4Item.addresssorce
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].mask = this.editIP4Item.mask
            this.canceldialogIP4()
        },
        canceldialogIP4() {
            this.editIP4Item = Object.assign({}, this.defaultIP4Item)
        },
        adddialogIP4() {
            const addObj = Object.assign({}, this.editIP4Item)
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address.push(addObj)
            this.canceldialogIP4()
        },
        isEndpointDialogIPV6() {
            if (this.isdeleteInfoIPV6 == true) {
                this.isdeleteInfoIPV6 = false
                this.selectDelectInfoIP6 = []
            } else {
                this.isdeleteInfoIPV6 = true
            }
        },
        deletedialogIP6() {
            if (this.isdeleteInfoIPV6 == true) {
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address.filter(item => {
                         return this.selectDelectInfoIP6.indexOf(item) < 0 })
                this.isdeleteInfoIPV6 = false
                this.selectDelectInfoIP6 = []
            } 
        },
        opendialogIP6(idx) {
            this.editIP6Item.priority = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].priority
            this.editIP6Item.behavior = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].behavior
            this.editIP6Item.prelength = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].prelength
            this.editIP6Item.address = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].address
            this.editIP6Item.addresssource = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].addresssource
        },
        editdialogIP6(idx) {
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].gatpriorityway = this.editIP6Item.priority
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].behavior = this.editIP6Item.behavior
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].prelength = this.editIP6Item.prelength
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].address = this.editIP6Item.address
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address[idx].addresssource = this.editIP6Item.addresssource
            this.canceldialogIP6()
        },
        canceldialogIP6() {
            this.editIP6Item = Object.assign({}, this.defaultIP6Item)
        },
        adddialogIP6() {
            const addObj = Object.assign({}, this.editIP6Item)
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address.push(addObj)
            this.canceldialogIP6()
        },


        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editEthernetCluster', {compo:"z", uuid:this.element.uuid, zindex:10} )
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