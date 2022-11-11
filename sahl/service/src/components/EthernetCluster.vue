<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Ethernet Cluster</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputEthernetClusterName' @click="clickEthernetClusterName" outlined dense></v-text-field>
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
                                    <!--<v-btn v-if="isEthernetClusterOpenClose" :disabled="selectViewedit" color="indigo" @click="setViewEdit()" outlined x-small text>
                                        panel
                                    </v-btn>
                                    <v-btn v-if="isEthernetClusterOpenClose" :disabled="!selectViewedit" color="indigo" @click="setViewEdit()" outlined x-small text>
                                        Table
                                    </v-btn> -->
                                </div>
                                <div v-if="selectViewedit">
                                    <v-tabs v-model='conditionalTab' height="30px" v-if="isEthernetClusterOpenClose" show-arrows @change="changeConditionalTab()">
                                        <v-tab v-for="(tab, idx) in element.conditional" :key="idx" @click="clickConditionaltab(idx)"> 
                                            {{tab.id}}.{{tab.name}}
                                            <v-btn text x-small @click="deleteConditional(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="conditionalTab" v-if="isEthernetClusterOpenClose">
                                        <v-tab-item v-for="(tab, idx) in element.conditional" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" :rules="rules.name" label="Protocol Name" @input="inputConditionalName(tab.name)" @click="clickConditionalName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.version" label="Protocol Version" placeholder="Numeric Only(Unit Second)" @click="clickOtherFields()" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.baudrate" label="Baudrate" placeholder="Int" @click="clickOtherFields()" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/channel-'+tab.id">
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
                                                            {{subtab.id}}.{{subtab.name}}
                                                            <v-btn text x-small @click="deleteChannel(channelidx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                                    </v-tabs>
                                                    <v-tabs-items v-model="channelTab[idx]" v-if="isPhysicalChannelOpenClose">
                                                        <v-tab-item v-for="(subtab, channelidx) in tab.channel" :key="channelidx">
                                                            <v-card flat>
                                                                <v-card-text>
                                                                    <v-text-field v-model="subtab.name" :rules="rules.name" label="Name" @input="inputChannelName(subtab.name)" @click="clickChannelName(subtab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/comconet-'+subtab.id+'-'+tab.id">
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
                                                                    <v-data-table v-model="selectDelectCommConnectItem" :headers="headerCommConnector" :items="subtab.comconnect" :items-per-page='$setNumTableList'
                                                                            :show-select="isdeleteCommConnect" item-key="id" style="width:100%;height:140px" v-if="isCommConnectOpenClose" dense hide-default-footer >
                                                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                        </template>
                                                                        <template v-if="!isdeleteCommConnect" v-slot:body="{ items, headers }">
                                                                            <tbody>
                                                                                <tr v-for="(item,idxCC) in items" :key="idxCC">
                                                                                    <td v-for="(header,key) in headers" :key="key">
                                                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refCommuni === item.id ? 'red' : null " @click="rowClick(idxCC)">mdi-pencil</v-icon>
                                                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openCommConnect(idxCC)" @cancel="cancelCommConnect" @save="editCommConnect(idxCC)" large >
                                                                                            {{item[header.value]}}
                                                                                            <template v-slot:input>
                                                                                                <br>
                                                                                                <v-autocomplete v-model='editCCItem.connector' label='Communication Connector Reference' :items='selCommunicationConnect' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                                            return-object :readonly="!isEditingCC" clearable @click="setCommuniCSelect()" 
                                                                                                            @click:clear='clearCommuniC' @blur="isEditingCC=true" outlined dense style="height: 45px;">
                                                                                                </v-autocomplete>
                                                                                            </template>
                                                                                        </v-edit-dialog>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th colspan="3">
                                                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelCommConnect" @save="addCommConnect()"> 
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
                                                                            {{subendpointtab.id}}.{{subendpointtab.name}}
                                                                            <v-btn text x-small @click="deleteEndpointTab(endpoingidx)"><v-icon x-small>mdi-close</v-icon></v-btn>
                                                                        </v-tab>
                                                                    </v-tabs>
                                                                    <v-tabs-items v-model="endpointTab[idx][channelidx]" v-if="isNetworkEndpointOpenClose">
                                                                        <v-tab-item v-for="(subendpointtab, endpoingidx) in subtab.endpoint" :key="endpoingidx">
                                                                            <br>
                                                                            <v-text-field v-model="subendpointtab.name" :rules="rules.name" label="Name" @input="inputEndPointName(subendpointtab.name)" @click="clickEndPointName(subendpointtab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                            <v-text-field v-model="subendpointtab.domainname" label="Fully Qualified Domain Name" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                            <v-text-field v-model="subendpointtab.priority" label="Priority" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                                            <v-data-table v-model="selectDelectIP4tem" :headers="headerIP4" :items="subendpointtab.ip4address" :items-per-page='$setNumTableList'
                                                                                    :show-select="isdeleteIP4Item" v-if="isIP4OpenClose" item-key="id" height="140px" dense hide-default-footer >
                                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                                </template>
                                                                                <template v-if="!isdeleteIP4Item" v-slot:body="{ items, headers }">
                                                                                    <tbody>
                                                                                        <tr v-for="(item,idxIP4) in items" :key="idxIP4">
                                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                                <v-edit-dialog persistent @open="openIP4(idxIP4)" @cancel="cancelIP4" @save="editIP4(idxIP4)" large >
                                                                                                    {{item[header.value]}}
                                                                                                    <template v-slot:input>
                                                                                                        <br>
                                                                                                        <v-text-field v-model="editIP4Item.gateway" label="Default Gateway" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-text-field v-model="editIP4Item.DNSAddr" label="DNS-SERVER-ADDR" placeholder="Int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID"  outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-text-field v-model="editIP4Item.address" label="IPV-4 Address" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-select v-model="editIP4Item.addresssorce" clearable :items="addressSourceIP4" label="IPV-4 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-text-field v-model="editIP4Item.mask" label="Network Mask" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-text-field v-model="editIP4Item.ttl" label="TTL" placeholder="Int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>    
                                                                                                    </template>
                                                                                                </v-edit-dialog>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th colspan="3">
                                                                                                <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelIP4" @save="addIP4()"> 
                                                                                                    <v-btn outlined color="indigo" dense text small block width="270px">
                                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                                    </v-btn>
                                                                                                    <template v-slot:input>
                                                                                                        <br>
                                                                                                        <v-text-field v-model="editIP4Item.gateway" label="Default Gateway" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-text-field v-model="editIP4Item.DNSAddr" label="DNS-SERVER-ADDR" placeholder="Int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-text-field v-model="editIP4Item.address" label="IPV-4 Address" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-select v-model="editIP4Item.addresssorce" clearable :items="addressSourceIP4" label="IPV-4 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-text-field v-model="editIP4Item.mask" label="Network Mask" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-text-field v-model="editIP4Item.ttl" label="TTL" placeholder="Int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                                            <v-data-table v-model="selectDelectIP6tem" :headers="headerIP6" :items="subendpointtab.ip6address" :items-per-page='$setNumTableList'
                                                                                    :show-select="isdeleteIP6Item" v-if="isIP6OpenClose" item-key="id" height="140px" dense hide-default-footer >
                                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                                </template>
                                                                                <template v-if="!isdeleteIP6Item" v-slot:body="{ items, headers }">
                                                                                    <tbody>
                                                                                        <tr v-for="(item,idxIP6) in items" :key="idxIP6">
                                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                                <v-edit-dialog persistent @open="openIP6(idxIP6)" @cancel="cancelIP6" @save="editIP6(idxIP6)" large >
                                                                                                    {{item[header.value]}}
                                                                                                    <template v-slot:input>
                                                                                                        <br>
                                                                                                        <v-text-field v-model="editIP6Item.priority" label="Assigment Priority" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-select v-model="editIP6Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-text-field v-model="editIP6Item.address" label="IPV-6 Address" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-select v-model="editIP6Item.addresssorce" clearable :items="addressSourceIP6" label="IPV-6 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-text-field v-model="editIP6Item.prelength" label="IP Address Prefix Length" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                    </template>
                                                                                                </v-edit-dialog>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th colspan="3">
                                                                                                <v-edit-dialog  large persistent  @open="clickOtherFields()" @cancel="cancelIP6" @save="addIP6()"> 
                                                                                                    <v-btn outlined color="indigo" dense text small block width="270px">
                                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                                    </v-btn>
                                                                                                    <template v-slot:input>
                                                                                                        <br>
                                                                                                        <v-text-field v-model="editIP6Item.priority" label="Assigment Priority" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-select v-model="editIP6Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-text-field v-model="editIP6Item.address" label="IPV-6 Address" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                                        <v-select v-model="editIP6Item.addresssorce" clearable :items="addressSourceIP6" label="IPV-6 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                                        <v-text-field v-model="editIP6Item.prelength" label="IP Address Prefix Length" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-data-table v-if="isEthernetClusterOpenClose" :headers="viewHeader" :items="viewList" item-key="id" single-select :items-per-page='$setNumTableList'
                                        height="370px" dense hide-default-footer @click:row="editDialogEthernetCluster" @click="setactiveUUID" class="elevation-1">
                                    </v-data-table>
                                </div>
                            </v-card>
                        </v-card-text>
                        <!-- <v-card-text v-if="iselementOpenClose && isDatailView">
                            <div class="subtitle-2" style="height:20px">
                                Conditional
                            </div>
                            <v-text-field v-model="element.conditional[viewInfo.idxConditional].name" @input="inputConditionalName(element.conditional[viewInfo.idxConditional].name)" 
                                            :rules="rules.name" label="Protocol Name"  placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.conditional[viewInfo.idxConditional].version" 
                                            label="Protocol Version" placeholder="Numeric Only(Unit Second)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.conditional[viewInfo.idxConditional].baudrate" label="Baudrate" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                        :show-select="isdeleteInfoCC" item-key="id" height="140px" dense hide-default-footer :items-per-page='$setNumTableList'>
                                    <template v-slot:item.data-table-select="{ isSelected, select }">
                                        <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                    </template>
                                    <template v-if="!isdeleteInfoCC" v-slot:body="{ items }">
                                        <tbody>
                                            <tr v-for="(item,idx) in items" :key="idx">
                                                <v-edit-dialog persistent @open="opendialogCC(idx)" @cancel="canceldialogCC" @save="editdialogCC(idx)" large >
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
                                                    <v-edit-dialog  large persistent @cancel="canceldialogCC" @save="adddialogCC()"> 
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
                                            :show-select="isdeleteInfoIPV4" item-key="id" height="140px" dense hide-default-footer :items-per-page='$setNumTableList'>
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteInfoIPV4" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent @open="opendialogIP4(idx, items)" @cancel="canceldialogIP4" @save="editdialogIP4(idx, items)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editIP4Item.gateway" label="Default Gateway" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editIP4Item.DNSAddr" label="DNS-SERVER-ADDR" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID"  outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-model="editIP4Item.address" label="IPV-4 Address" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-select v-model="editIP4Item.addresssorce" clearable :items="addressSourceIP4" label="IPV-4 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-model="editIP4Item.mask" label="Network Mask" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editIP4Item.ttl" label="TTL" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @cancel="canceldialogIP4" @save="adddialogIP4()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px">
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editIP4Item.gateway" label="Default Gateway" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editIP4Item.DNSAddr" label="DNS-SERVER-ADDR" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-select v-model="editIP4Item.behavior" clearable :items="addressBehavior" label="IP Address Keep Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-model="editIP4Item.address" label="IPV-4 Address" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-select v-model="editIP4Item.addresssorce" clearable :items="addressSourceIP4" label="IPV-4 Address Source" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-model="editIP4Item.mask" label="Network Mask" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editIP4Item.ttl" label="TTL" placeholder="int" style="height: 45px;" @click="setactiveUUID" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                            :show-select="isdeleteInfoIPV6" item-key="id" height="140px" dense hide-default-footer :items-per-page='$setNumTableList'>
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteInfoIPV6" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent @open="opendialogIP6(idx, items)" @cancel="canceldialogIP6" @save="editdialogIP6(idx, items)" large >
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
                                                        <v-edit-dialog  large persistent @cancel="canceldialogIP6" @save="adddialogIP6()"> 
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
                        </v-card-text> -->
                        <v-card-text v-show="!iselementOpenClose || !minimaptoolbar">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        readonly outlined dense></v-text-field>
                        </v-card-text>
                    </v-card>
                </template>
                <span>{{ element.name }}</span>
            </v-tooltip>
            <v-dialog v-model="dialogText" persistent width="1000">
                <v-card >
                    <v-card-title class="text-h6 green accent-1"> Edit Text </v-card-title>
                    <v-card-text>
                        <br>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;ETHERNET-CLUSTER-VARIANTS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextCondi()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog-Ethernet" style="height: 670px;">
                            <v-row v-for="(item, i) in editARXML.conditional" :key="i" style="height: 810px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextCondi(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;ETHERNET-CLUSTER-CONDITIONAL&#62;</label>
                                    </v-row>
                                    <v-row style="height: 10px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;BAUDRATE&#62;</label>
                                        <v-text-field v-model="item.baudrate" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;BAUDRATE&#62;</label>
                                    </v-row>                               
                                    <v-row style="height: 25px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;PHYSICAL-CHANNELS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;ETHERNET-PHYSICAL-CHANNEL&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextChannel(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 600px;">
                                        <v-row v-for="(cha, c) in item.channel" :key="c" style="height: 450px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextChannel(c,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;ETHERNET-PHYSICAL-CHANNEL&#62;</label>
                                                </v-row>
                                                <v-row style="height: 15px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;SHORT-NAME&#62;</label>
                                                    <v-text-field v-model="cha.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                                </v-row>
                                                <v-row style="height: 50px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 130px;">&#60;COMM-CONNECTORS&#62;</label>
                                                    <v-btn style="margin: 3px 0px 0px -10px" @click="newTextCommuni(c,i)" icon color="teal darken" x-samll dark>
                                                        <v-icon dense dark>mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-row>
                                                <div class="text-Inner-editDialog" style="height: 150px;">
                                                    <v-row v-for="(com, co) in cha.comconnect" :key="co" style="height: 80px;">
                                                        <div>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <v-btn style="margin: 15px -100px 0px 120px" @click="deletTextCommuni(co, i, c)" text x-small color="indigo">
                                                                    <v-icon>mdi-minus</v-icon>
                                                                </v-btn>
                                                                <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;COMMUNICATION-CONNECTOR-REF-CONDITIONAL&#62;</label>
                                                            </v-row>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <v-col cols="6">
                                                                    <label style="padding:10px;margin:2px 0px 2px 160px;">&#60;COMMUNICATION-CONNECTOR-REF&#62;</label>
                                                                </v-col><v-col cols="4">
                                                                    <v-text-field v-model="com.connector" placeholder="Path" style="margin:-5px 0px 0px 30px" class="lable-placeholer-color" dense></v-text-field>
                                                                </v-col><v-col cols="2">
                                                                    <label style="padding:10px;">&#60;&#47;COMMUNICATION-CONNECTOR-REF&#62;</label>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 155px;">&#60;&#47;COMMUNICATION-CONNECTOR-REF-CONDITIONAL&#62;</label>
                                                            </v-row>
                                                        </div>
                                                    </v-row>
                                                </div>
                                                <v-row style="height: 10px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;&#47;COMM-CONNECTORS&#62;</label>
                                                </v-row>
                                                <v-row style="height: 50px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 130px;">&#60;NETWORK-ENDPOINTS&#62;</label>
                                                    <v-btn style="margin: 3px 0px 0px -10px" @click="newTextEndPoint(i,c)" icon color="teal darken" x-samll dark>
                                                        <v-icon dense dark>mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-row>
                                                <div class="text-Inner-editDialog" style="height: 600px;">
                                                    <v-row v-for="(end, e) in cha.endpoint" :key="e" style="height: 530px;">
                                                        <div>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <v-btn style="margin: 15px -100px 0px 100px" @click="deletTextEndPoint(e, i, c)" text x-small color="indigo">
                                                                    <v-icon>mdi-minus</v-icon>
                                                                </v-btn>
                                                                <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;NETWORK-ENDPOINT&#62;</label>
                                                            </v-row>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 150px;">&#60;SHORT-NAME&#62;</label>
                                                                <v-text-field v-model="end.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                                                <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                                            </v-row>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <v-col cols="6">
                                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;FULLY-QUALIFIED-DOMAIN-NAME&#62;</label>
                                                                </v-col><v-col cols="4">
                                                                    <v-text-field v-model="end.domainname" placeholder="String" style="margin: -5px 0px 0px 0px" class="lable-placeholer-color" dense></v-text-field>
                                                                </v-col><v-col cols="2">
                                                                    <label style="padding:10px;">&#60;&#47;FULLY-QUALIFIED-DOMAIN-NAME&#62;</label>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 150px;">&#60;PRIORITY&#62;</label>
                                                                <v-text-field v-model="end.priority" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                <label style="padding:10px;">&#60;&#47;PRIORITY&#62;</label>
                                                            </v-row>
                                                            <v-row style="height: 15px;margin:0px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 150px;">&#60;NETWORK-ENDPOINT-ADDRESSES&#62;</label>
                                                            </v-row>
                                                            <v-row style="height: 50px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 180px;">&#60;IPV-4-CONFIGURATION&#62;</label>
                                                                <v-btn style="margin: 3px 0px 0px -10px" @click="newTextIP4(i, c, e)" icon color="teal darken" x-samll dark>
                                                                    <v-icon dense dark>mdi-plus</v-icon>
                                                                </v-btn>
                                                            </v-row>
                                                            <div class="text-Inner-editDialog" style="height: 120px;">
                                                                <v-row v-for="(ip4, pf) in end.ip4address" :key="pf" style="height: 180px;">
                                                                    <div>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <v-btn style="margin: 13px -170px 0px 170px" @click="deletTextIP4(pf, i, c, e)" text x-small color="indigo">
                                                                                <v-icon>mdi-minus</v-icon>
                                                                            </v-btn>
                                                                            <label style="padding:10px;margin:2px 0px 2px 160px;">&#60;DEFAULT-GATEWAY&#62;</label>
                                                                            <v-text-field v-model="ip4.gateway" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;DEFAULT-GATEWAY&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;DNS-SERVER-ADDRESSES&#62;</label>
                                                                            <v-text-field v-model="ip4.DNSAddr" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;DNS-SERVER-ADDRESSES&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;IP-ADDRESS-KEEP-BEHAVIOR&#62;</label>
                                                                            <v-text-field v-model="ip4.behavior" placeholder="FORGET or STORE-PERSISTENTLY" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;IP-ADDRESS-KEEP-BEHAVIOR&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;IPV-4-ADDRESS&#62;</label>
                                                                            <v-text-field v-model="ip4.address" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;IPV-4-ADDRESS&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;IPV-4-ADDRESS-SOURCE&#62;</label>
                                                                            <v-text-field v-model="ip4.addresssorce" placeholder="FIXED or DHCPV-4 or AUTO-IP or AUTO-IP-DOIP" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;IPV-4-ADDRESS-SOURCE&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;NETWORK-MASK&#62;</label>
                                                                            <v-text-field v-model="ip4.mask" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;NETWORK-MASK&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;TTL&#62;</label>
                                                                            <v-text-field v-model="ip4.ttl" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;TTL&#62;</label>
                                                                        </v-row>
                                                                    </div>
                                                                </v-row>
                                                            </div>
                                                            <v-row style="height: 10px;margin:0px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 170px;">&#60;&#47;IPV-4-CONFIGURATION&#62;</label>
                                                            </v-row>
                                                            <v-row style="height: 50px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 180px;">&#60;IPV-6-CONFIGURATION&#62;</label>
                                                                <v-btn style="margin: 3px 0px 0px -10px" @click="newTextIP6(i, c, e)" icon color="teal darken" x-samll dark>
                                                                    <v-icon dense dark>mdi-plus</v-icon>
                                                                </v-btn>
                                                            </v-row>
                                                            <div class="text-Inner-editDialog" style="height: 120px;">
                                                                <v-row v-for="(ip6, ps) in end.ip6address" :key="ps" style="height: 130px;">
                                                                    <div>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <v-btn style="margin: 15px -170px 0px 170px" @click="deletTextIP6(ps, i, c, e)" text x-small color="indigo">
                                                                                <v-icon>mdi-minus</v-icon>
                                                                            </v-btn>
                                                                            <label style="padding:10px;margin:2px 0px 2px 160px;">&#60;ASSIGNMENT-PRIORITY&#62;</label>
                                                                            <v-text-field v-model="ip6.priority" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;ASSIGNMENT-PRIORITY&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;IP-ADDRESS-KEEP-BEHAVIOR&#62;</label>
                                                                            <v-text-field v-model="ip6.behavior" placeholder="FORGET or STORE-PERSISTENTLY" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;IP-ADDRESS-KEEP-BEHAVIOR&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;IP-ADDRESS-PREFIX-LENGTH&#62;</label>
                                                                            <v-text-field v-model="ip6.prelength" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;IP-ADDRESS-PREFIX-LENGTH&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;IPV-6-ADDRESS&#62;</label>
                                                                            <v-text-field v-model="ip6.address" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;IPV-6-ADDRESS&#62;</label>
                                                                        </v-row>
                                                                        <v-row style="height: 25px;margin:0px;">
                                                                            <label style="padding:10px;margin:2px 0px 2px 205px;">&#60;IPV-6-ADDRESS-SOURCE&#62;</label>
                                                                            <v-text-field v-model="ip6.addresssorce" placeholder="FIXED or DHCPV-6 or LINK-LOCAL or ROUTER-ADVERTISEMENT or LINK-LOCAL-DOIP" class="lable-placeholer-color" dense></v-text-field>
                                                                            <label style="padding:10px;">&#60;&#47;IPV-6-ADDRESS-SOURCE&#62;</label>
                                                                        </v-row>
                                                                    </div>
                                                                </v-row>
                                                            </div>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 170px;">&#60;&#47;IPV-6-CONFIGURATION&#62;</label>
                                                            </v-row>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 150px;">&#60;&#47;NETWORK-ENDPOINT-ADDRESSES&#62;</label>
                                                            </v-row>
                                                            <v-row style="height: 25px;margin:0px;">
                                                                <label style="padding:10px;margin:2px 0px 2px 132px;">&#60;&#47;NETWORK-ENDPOINT&#62;</label>
                                                            </v-row>
                                                        </div>
                                                    </v-row>
                                                </div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;&#47;NETWORK-ENDPOINTS&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 110px;">&#60;&#47;ETHERNET-PHYSICAL-CHANNEL&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 35px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;PHYSICAL-CHANNELS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 65px;">&#60;PROTOCOL-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;PROTOCOL-NAME&#62;</label>
                                    </v-row>                               
                                    <v-row style="height: 30px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 65px;">&#60;PROTOCOL-VERSION&#62;</label>
                                        <v-text-field v-model="item.version" placeholder="Numeric Only(Unit Second)" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;PROTOCOL-VERSION&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin-left:65px;">&#60;&#47;ETHERNET-CLUSTER-CONDITIONAL&#62;</label>
                                    </v-row>                         
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;ETHERNET-CLUSTER-VARIANTS&#62;</label>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="saveARXML()" >
                            Save
                        </v-btn>
                        <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text @click="cancelARXML()">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
        setting() {
            return this.$store.state.setting
        },
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        /*detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        },*/
        setting(value) {
            this.zoomvalue = value.zoomMain
            if (this.zoomvalue < this.$setZoominTooltip) {
                this.isTooltip = false
            } else {
                this.isTooltip = this.minimaptoolbar
                if (this.zoomvalue  > this.$setZoominLineTitle && this.zoomvalue < this.$setZoominLineSetupStart) {
                    EventBus.$emit('drawLineTitleBar', this.element.uuid, false)
                } else if (this.zoomvalue > this.$setZoominLineSetupStart && this.zoomvalue < this.$setZoominLineSetupEnd) {
                    this.$nextTick(() => {
                        EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                        if(this.iselementOpenClose && this.location == 1) {
                            if(this.isEthernetClusterOpenClose && this.element.conditional.length > 0) {
                                if(this.element.conditional[this.conditionalTab].channel.length > 0) {
                                    if(this.isPhysicalChannelOpenClose) {
                                        setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id, this.element.conditional[this.conditionalTab].id)}, 300);
                                    } else {
                                        setTimeout(() => {EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.element.conditional[this.conditionalTab].id)}, 300);
                                    }
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                                }
                            } else {
                                EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                            }
                        } 
                    })
                }
            }
        },
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
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            dialogPath : false,
            iselementOpenClose: true, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogText: false,
            editARXML: {name:'', conditional:[]},
            editTextCondi: {name: '', version:'', channel: [], id: ''},
            editTextChannel: {name: '', comconnect:[], endpoint: [], id: ''},
            editTextEndPoint: {name: '', domainname:'', ip4address: [], ip6address: [], priority: '', id: ''},
            editTextCommuni: {connector : null, id: ''},
            editTextIP4: {gateway:'', DNSAddr:'', behavior: null, address:'', addresssorce:null, mask:'', id: '', ttl: ''},
            editTextIP6: {priority:'', behavior:null, prelength:'', address:'', addresssource:null, id: ''},
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
            endpointTab: [[],[]],
            headerCommConnector: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Communication Connector Ref', align: 'start', sortable: false, value: 'connector' },
            ],
            editCCItem: { connector : null, id: ''},
            selCommunicationConnect: this.$store.getters.getCommunicationConnect,
            isEditingCC: true,

            headerIP4: [
                { text: 'DEFAULT-GATEWAY', width:'140px', align: 'start', sortable: false, value: 'gateway' },
                { text: 'DNS-SERVER-ADDR', width:'140px', align: 'start', sortable: false, value: 'DNSAddr' },
                { text: 'IP-ADDRESS-KEEP-BEHAVIOR', width:'200px', sortable: false, value: 'behavior'},
                { text: 'IPV-4-ADDRESS', width:'130px', sortable: false, value: 'address'},
                { text: 'IPV-4-ADDRESS-SOURCE', width:'180px', sortable: false, value: 'addresssorce'},
                { text: 'NETWORK-MASK', width:'130px', sortable: false, value: 'mask'},
                { text: 'TTL', sortable: false, value: 'ttl'},
            ],
            headerIP6: [
                { text: 'ASSIGNMENT-PRIORITY', width:'180px', sortable: false, value: 'priority'},
                { text: 'IP-ADDRESS-KEEP-BEHAVIOR', width:'200px', sortable: false, value: 'behavior'},
                { text: 'IP-ADDRESS-PREFIX-LENGTH', width:'200px', sortable: false, value: 'prelength'},
                { text: 'IPV-6-ADDRESS', width:'130px', sortable: false, value: 'address'},
                { text: 'IPV-6-ADDRESS-SOURCE', width:'180px', sortable: false, value: 'addresssource'},
            ],
            editIP4Item: { gateway:'', DNSAddr:'', behavior: null, address:'', addresssorce:null, mask:'', id: '', ttl: ''},
            editIP6Item: { priority:'', behavior:null, prelength:'', address:'', addresssource:null, id: ''},
            defaultIP4Item: { gateway:'', DNSAddr:'', behavior:null, address:'', addresssorce:null, mask:'', id: '', ttl: ''},
            defaultIP6Item: { priority:'', behavior:null, prelength:'', address:'', addresssource:null, id: ''},
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

            beforePath: '',
            beforeName: '',
            beforeCondi: '',
            beforeChannl: '',
            beforeEnd: '',

            refCommuni: null
        }
    },
    mounted () {
        //console.log('-----EthernetC mout ' + this.conditionalTab)
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, tabID, id, isDeleteItem) => {
            if (isDeleteItem) {
                if (this.refCommuni == id) {
                    this.clickOtherFields()
                }
            } else {
                this.refCommuni = null
                if (refNum == 1) {
                    this.conditionalTab = tabID//idxTab[0]
                    this.channelTab[this.conditionalTab] = id//idxTab[1]
                    this.refCommuni = idxID
                }
            }
        })
    },
    methods: {
        submitDialog(element) {
            this.beforePath = this.element.path
            this.element.path = element
            if(this.element.conditional[this.conditionalTab] != undefined) {
                if(this.element.conditional[this.conditionalTab].channel.length > 0) {
                    if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                        //if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].name != '') {
                            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        beforename: this.beforePath, changeName: 'path'} )
                        //}
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
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
            /*this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose && this.location == 1) {
                    if(this.isEthernetClusterOpenClose && this.element.conditional.length > 0) {
                        if(this.element.conditional[this.conditionalTab].channel.length > 0) {
                            if(this.isPhysicalChannelOpenClose) {
                                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id, this.element.conditional[this.conditionalTab].id)}, 300);
                            } else {
                                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.element.conditional[this.conditionalTab].id)}, 300);
                            }
                        } else {
                            EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                        }
                    } else {
                        EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                    }
                } 
            })*/
        },
        showEthernetClusterItem() {
            this.clickOtherFields()
            this.isEthernetClusterOpenClose = this.isEthernetClusterOpenClose ? false : true
            /*var activeLine = this.$store.getters.getactiveLine(this.element.uuid)
            if (this.location == 1 && activeLine.length > 0) {
                this.$nextTick(() => {
                    if(this.isEthernetClusterOpenClose && this.element.conditional.length > 0) {
                        if(this.element.conditional[this.conditionalTab].channel.length > 0) {
                            if(this.isPhysicalChannelOpenClose) {
                                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id, this.element.conditional[this.conditionalTab].id)}, 300);
                            } else {
                                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.element.conditional[this.conditionalTab].id)}, 300);
                            }
                        } else {
                            EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                        }
                    } else {
                        EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
        },
        showPhysicalChannelItem() {
            this.clickOtherFields()
            this.isPhysicalChannelOpenClose = this.isPhysicalChannelOpenClose ? false : true
            /*if(this.element.conditional[this.conditionalTab].channel.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isPhysicalChannelOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id, this.element.conditional[this.conditionalTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.element.conditional[this.conditionalTab].id)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
        },
        showCommConnectItem() {
            this.clickOtherFields()
            this.isCommConnectOpenClose = this.isCommConnectOpenClose ? false : true
        },
        showNetworkEndpointItem() {
            this.clickOtherFields()
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
        clickOtherFields() {
            if (this.refCommuni != null) {
                this.deleteOpenElement()
                this.refCommuni = null
            }
        },
        rowClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refCommuni != this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getMachineDesignPath(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector, 1)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    var isExist = true
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editMachineDesign', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id, endLine, isExist)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id, 
                                        end:endLine, iscircle:false, refNum:1, 
                                        idxID: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id, 
                                        tabID: this.conditionalTab,
                                        twoTab: this.channelTab[this.conditionalTab]})
                }
                this.refCommuni = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id
            }
        },

        clickEthernetClusterName() {
            this.beforeName = this.element.name
            this.conditionalTab = 1
            this.channelTab[this.conditionalTab] = 1
        },
        inputEthernetClusterName () {
            console.log('inputEthernetClusterName')
            this.$store.commit('editEthernetCluster', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if(this.element.conditional[this.conditionalTab].channel.length>0) {
                if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                    //if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].name != '') {
                        this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    beforename: this.beforeName, changeName: 'name'} )
                        this.beforeName = this.element.name
                    //}
                }
            }
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickConditionalName(name) {
            this.clickOtherFields()
            this.beforeCondi = name
        },
        inputConditionalName(name) {
            console.log(name +' / '+ this.beforeCondi)
            if(this.element.conditional[this.conditionalTab].channel.length>0) {
                if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                    //if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].name != '') {
                        this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    condi: name,
                                                    beforename: this.beforeCondi, changeName: 'condi'} )
                        this.beforeCondi = name
                    //}
                }
            }
        },
        clickChannelName(name) {
            this.clickOtherFields()
            this.beforeChannel = name
        },
        inputChannelName(name) {
            if(this.element.conditional[this.conditionalTab].channel.length>0) {
                if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                    //if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].name != '') {
                        this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    condi: this.element.conditional[this.conditionalTab].name,
                                                    channel: name,
                                                    beforename: this.beforeChannel, changeName: 'channel'} )
                        this.beforeChannel = name
                    //}
                }
            }
        },
        clickEndPointName(name) {
            this.clickOtherFields()
            this.beforeEnd = name
        },
        inputEndPointName(name) {
            if (this.element.conditional.length > 0) {
                if(this.element.conditional[this.conditionalTab].channel.length>0) {
                    if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length > 0) {
                        //if(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].name != '') {
                            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        condi: this.element.conditional[this.conditionalTab].name,
                                                        channel: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name,
                                                        endpoint: name,
                                                        beforename: this.beforeEnd, changeName: 'endpoint'} )
                            this.beforeEnd = name
                        //}
                    }
                }
            }
        },

        addEthernetCluster() {
            this.clickOtherFields()
            const editItem = {name: '', version:'', channel: [], baudrate: '', id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Ethernet_' + n++;
                res = this.element.conditional.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
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
            if (this.refCommuni != null) {
                this.deleteOpenElement()
                this.refCommuni = null
            }
            /*if (this.location == 1) {
                if(this.element.conditional.length > 0) {
                    if(this.isPhysicalChannelOpenClose && this.element.conditional[this.conditionalTab].channel.length > 0) {
                        setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid, this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id, this.element.conditional[this.conditionalTab].id)}, 300);
                    } else {
                        setTimeout(() => {EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.element.conditional[this.conditionalTab].id)}, 300);
                    }
                } else {
                    setTimeout(() => {EventBus.$emit('changeLine-someipService', 'conditional', this.element.uuid, this.conditionalTab, this.conditionalTab)}, 300);
                }
            }*/
        },
        deleteConditional(idx) {
            //console.log('deleteConditional')
            this.clickOtherFields()
            for(let i=0; i<this.element.conditional[idx].channel.length; i++){
                if(this.element.conditional[idx].channel[i].comconnect != null) {
                    for(let n=0; n<this.element.conditional[idx].channel[i].comconnect.length; n++){
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.conditional[idx].channel[i].comconnect[n].id+'-'+this.element.conditional[idx].channel[i].id+'-'+this.element.conditional[idx].id)
                        if(endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/comconet-'+this.element.conditional[idx].channel[i].comconnect[n].id+'-'+this.element.conditional[idx].channel[i].id+'-'+this.element.conditional[idx].id)
                        }
                    }
                }
            }

            var deleteName = this.element.conditional[this.conditionalTab].name
            if(this.element.conditional[this.conditionalTab].name != '') {
                deleteName += '/'
            }
            this.$store.commit('deleteRefTable', {deleteName:'machineD', deleteTab: true, tabPosition:'conditional', 
                                            tabName: deleteName, path: this.element.path, name: this.element.name})
            this.element.conditional.splice(idx, 1)
            this.conditionalTab = 0
            this.channelTab[this.conditionalTab] = 0
            this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]] = 0
            //this.changeConditionalTab() /*delete하면 자동적으로 tab이 바뀌기 때문에 따로 안불러도 불려진다*/
        },
        addPhysicalChannel() {
            this.clickOtherFields()
            //this.endpointTab.push([this.conditionalTab,0]) //2차원 배열로 초기화 해줘야지 안그러면 tab이 안생김
            const editItem = {name: '', comconnect:[], endpoint: [], id: ''}
            const addObj = new Object(editItem)

            let res = true, n = 0
            while (res) {
                addObj.name = 'PhysicalChannel_' + n++;
                res = this.element.conditional[this.conditionalTab].channel.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.conditional[this.conditionalTab].channel.push(addObj)
            this.channelTab[this.conditionalTab] = this.element.conditional[this.conditionalTab].channel.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'channel', this.element.uuid, this.element.conditional[this.conditionalTab].id)
            }
        },
        clickChanneltab(idx) {
           // console.log('clickChanneltab ' + this.channelTab[this.conditionalTab]+ '  /  '+ idx +'   /  '+this.conditionalTab)
            this.channelTab[this.conditionalTab] = idx
            this.isdeleteCommConnect = false
            this.selectDelectCommConnectItem = []
            this.clickEndpointTab(0)
        },
        changeChannelTab() {
            if (this.refCommuni != null) {
                this.deleteOpenElement()
                this.refCommuni = null
            }
            /*if (this.element.conditional[this.conditionalTab].channel.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'connector', this.element.uuid,  this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id, this.element.conditional[this.conditionalTab].id)}, 300);
            }*/
        },
        deleteChannel(idx) {
            //console.log('deleteChannel')
            this.clickOtherFields()
            for(let i=0; i<this.element.conditional[this.conditionalTab].channel[idx].comconnect.length; i++){
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[idx].comconnect[i].id+'-'+this.element.conditional[this.conditionalTab].channel[idx].id+'-'+this.element.conditional[this.conditionalTab].id)
                if(endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[idx].comconnect[i].id+'-'+this.element.conditional[this.conditionalTab].channel[idx].id+'-'+this.element.conditional[this.conditionalTab].id)
                }
            }

            var deleteName = this.element.conditional[this.conditionalTab].name
            if(this.element.conditional[this.conditionalTab].name != '') {
                deleteName += '/'
            }
            deleteName += this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name
            if (this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name != '') {
                deleteName += '/'
            }
            this.$store.commit('deleteRefTable', {deleteName:'machineD', deleteTab: true, tabPosition:'channel', tabName: deleteName, path: this.element.path, name: this.element.name})
            this.element.conditional[this.conditionalTab].channel.splice(idx, 1)
            this.channelTab[this.conditionalTab] = 0
            this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]] = 0
            //this.changeChannelTab()
            console.log('22222222222222222222')
            console.log(this.element)
        },

        isCommConnect() {
            this.clickOtherFields()
            if (this.isdeleteCommConnect == true) {
                this.isdeleteCommConnect = false
                this.selectDelectCommConnectItem = []
            } else {
                this.isdeleteCommConnect = true
            }
        },
        deleteCommConnect() {
            this.clickOtherFields()
            if (this.isdeleteCommConnect == true) {
                this.selectDelectCommConnectItem.forEach(item => {
                    for(let i=0; i<this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.length; i++){
                        if (item.id == this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[i].id+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[i].id+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id)
                            }
                        }
                    }
                })

                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.filter(item => {
                        return this.selectDelectCommConnectItem.indexOf(item) < 0 })

                this.isdeleteCommConnect = false
                this.selectDelectCommConnectItem = []
            } 
        },
        addCommConnect() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.some(item => item.id === n)
            }
            this.editCCItem.id = n
            var endLine = null
            if( this.editCCItem.connector != null) {
                var isExist = true
                endLine = this.editCCItem.connector.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editCCItem.connector.uuid) == -1) {
                    this.$store.commit('editMachineDesign', {compo:"drag", uuid: this.editCCItem.connector.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    isExist = false
                }
                this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: this.editCCItem.connector.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editCCItem.connector = this.editCCItem.connector.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/comconet-'+n+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id, 
                                this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id, 
                                endLine, true, isExist)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id, 
                                    end:endLine, iscircle:false, refNum:1, idxID: this.editCCItem.id, tabID: this.conditionalTab, twoTab: this.channelTab[this.conditionalTab]})
            }
            //console.log(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name+'-'+this.element.conditional[this.conditionalTab].name)
            const addObj = Object.assign({}, this.editCCItem)
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect.push(addObj);
            this.refCommuni = n
            this.cancelCommConnect()
        },
        cancelCommConnect() {
            this.editCCItem.connector = null
            this.setactiveUUID()
        },
        editCommConnect(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id)
            if (endLine != undefined && this.editCCItem.connector == null) {
                this.deleteLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id)
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector = null
            } else if (endLine != undefined && endLine != this.editCCItem.connector.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id)
                this.newLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id,
                                 this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id, this.editCCItem.connector.uuid, false)
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector = this.editCCItem.connector.name
            } else if (endLine == undefined && this.editCCItem.connector != null && this.editCCItem.connector.uuid != null) {
                this.newLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id,
                                 this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id, this.editCCItem.connector.uuid, false)
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector = this.editCCItem.connector.name
            } else if (this.editCCItem.connector != null && endLine == this.editCCItem.connector.uuid && this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector != this.editCCItem.connector.name) {
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector = this.editCCItem.connector.name
            }

            if (this.refCommuni == this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id) {
                this.deleteOpenElement()
                if (this.editCCItem.connector != null && this.editCCItem.connector.uuid != null) {
                    var isExist = true, endLineChange = this.editCCItem.connector.uuid
                    if (this.$store.getters.getDeleteOpenElement(endLineChange) == -1) {
                        this.$store.commit('editMachineDesign', {compo:"drag", uuid: endLineChange, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: endLineChange, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id,
                                         endLineChange, isExist)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id,
                                     end:endLineChange, iscircle:false, refNum:1, idxID: this.refCommuni})
                }
            }
            
            this.cancelCommConnect()
        },
        openCommConnect(idx) {
            this.selCommunicationConnect = this.$store.getters.getCommunicationConnect
            if ( this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].id+'-'+this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].id+'-'+this.element.conditional[this.conditionalTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getMachineDesignPath(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector, 1)
                }
                this.editCCItem.connector = { name: this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].comconnect[idx].connector, uuid: endLine }
            }
        },
        setCommuniCSelect() {
            if (this.isEditingCC == true) {
                if (this.editCCItem.connector != null && this.editCCItem.connector.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editCCItem.connector.uuid, element: constant.MachineDesigne_str} )
                    /*document.getElementById(this.editCCItem.connector.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editCCItem.connector.uuid)*/
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
            this.clickOtherFields()
            const editItem = {name: '', domainname:'', ip4address: [], ip6address: [], priority: '', id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.some(ele => ele.id === n)
            }
            addObj.id = n
            addObj.name = 'Endpoint'+(this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length+1)
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.push(addObj)
            this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]] = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.length-1
        },
        clickEndpointTab(idx) {
            //console.log('clickEndpointTab '+ this.conditionalTab +'  /  ' + this.channelTab)
            this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]] = idx
            this.isdeleteIP4Item = false
            this.isdeleteIP6Item = false
            this.selectDelectIP4tem = []
            this.selectDelectIP6tem = []
        },
        deleteEndpointTab(idx) {
            this.clickOtherFields()
            var deleteName = this.element.conditional[this.conditionalTab].name
            if(this.element.conditional[this.conditionalTab].name != '') {
                deleteName += '/'
            } 
            deleteName += this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name
            if (this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].name != '') {
                deleteName += '/'
            }
            deleteName += this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[idx].name
            this.$store.commit('deleteRefTable', {deleteName:'machineD', deleteTab: true, tabPosition:'endpoint', tabName: deleteName, path: this.element.path, name: this.element.name})
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint.splice(idx, 1)
            this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]] = 0
        },
        isEndpointIP4() {
            this.clickOtherFields()
            if (this.isdeleteIP4Item == true) {
                this.isdeleteIP4Item = false
                this.selectDelectIP4tem = []
            } else {
                this.isdeleteIP4Item = true
            }
        },
        deleteIP4() {
            this.clickOtherFields()
            if (this.isdeleteIP4Item == true) {
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address.filter(item => {
                         return this.selectDelectIP4tem.indexOf(item) < 0 })
                this.isdeleteIP4Item = false
                this.selectDelectIP4tem = []
            } 
        },
        isEndpointIP6() {
            this.clickOtherFields()
            if (this.isdeleteIP6Item == true) {
                this.isdeleteIP6Item = false
                this.selectDelectIP6tem = []
            } else {
                this.isdeleteIP6Item = true
            }
        },
        deleteIP6() {
            this.clickOtherFields()
            if (this.isdeleteIP6Item == true) {
                this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address.filter(item => {
                         return this.selectDelectIP6tem.indexOf(item) < 0 })
                this.isdeleteIP6Item = false
                this.selectDelectIP6tem = []
            } 
        },
        openIP4(idx) {
            this.editIP4Item.gateway = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].gateway
            this.editIP4Item.behavior = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].behavior
            this.editIP4Item.address = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].address
            this.editIP4Item.addresssorce = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].addresssorce
            this.editIP4Item.mask = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].mask
            this.editIP4Item.DNSAddr = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].DNSAddr
            this.editIP4Item.ttl = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].ttl
        },
        editIP4(idx) {
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].gateway = this.editIP4Item.gateway
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].behavior = this.editIP4Item.behavior
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].address = this.editIP4Item.address
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].addresssorce = this.editIP4Item.addresssorce
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].mask = this.editIP4Item.mask
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].DNSAddr = this.editIP4Item.DNSAddr
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address[idx].ttl = this.editIP4Item.ttl
            this.cancelIP4()
        },
        addIP4() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address.some(item => item.id === n)
            }
            this.editIP4Item.id = n

            const addObj = Object.assign({}, this.editIP4Item)
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip4address.push(addObj)
            this.cancelIP4()
        },
        cancelIP4() {
            this.editIP4Item = Object.assign({}, this.defaultIP4Item)
            this.setactiveUUID()
        },
        openIP6(idx) {
            this.editIP6Item.priority = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].priority
            this.editIP6Item.behavior = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].behavior
            this.editIP6Item.prelength = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].prelength
            this.editIP6Item.address = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].address
            this.editIP6Item.addresssource = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].addresssource
        },
        editIP6(idx) {
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].gatpriorityway = this.editIP6Item.priority
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].behavior = this.editIP6Item.behavior
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].prelength = this.editIP6Item.prelength
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].address = this.editIP6Item.address
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address[idx].addresssource = this.editIP6Item.addresssource
            this.cancelIP6()
        },
        addIP6() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address.some(item => item.id === n)
            }
            this.editIP6Item.id = n

            const addObj = Object.assign({}, this.editIP6Item)
            this.element.conditional[this.conditionalTab].channel[this.channelTab[this.conditionalTab]].endpoint[this.endpointTab[this.conditionalTab][this.channelTab[this.conditionalTab]]].ip6address.push(addObj)
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
            /*document.getElementById(this.element.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
            EventBus.$emit('active-element', this.element.uuid)*/

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
                this.selectDelectInfoCC.forEach(item => {
                    for(let i=0; i<this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect.length; i++){
                        if (item.id == this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[i].id+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/comconet-'+this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[i].id+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id)
                            }
                        }
                    }
                })

                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect.filter(item => {
                        return this.selectDelectInfoCC.indexOf(item) < 0 })

                this.isdeleteInfoCC = false
                this.selectDelectInfoCC = []
            } 
        },
        opendialogCC(idx) {
            this.selCommunicationConnect = this.$store.getters.getCommunicationConnect
            if ( this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector != null) {
                this.editCCItem.connector = { name: this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector, 
                                              uuid: this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].id+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id) }
            }
        },
        editdialogCC(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].id+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id)
            if (endLine != undefined && this.editCCItem.connector == null) {
                this.deleteLine(this.element.uuid+'/comconet-'+this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].id+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id)
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector = null
            } else if (endLine != undefined && endLine != this.editCCItem.connector.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/comconet-'+this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].id+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id)
                this.newLine(this.element.uuid+'/comconet-'+this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].id+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id,
                                 this.element.uuid+'/comconet-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id, this.editCCItem.connector.uuid, false)
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector = this.editCCItem.connector.name
            } else if (endLine == undefined && this.editCCItem.connector != null && this.editCCItem.connector.uuid != null) {
                this.newLine(this.element.uuid+'/comconet-'+this.element.this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].id+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id, 
                                this.element.uuid+'/comconet-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id, this.editCCItem.connector.uuid, false)
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector = this.editCCItem.connector.name
            } else if (this.editCCItem.connector != null && endLine == this.editCCItem.connector.uuid && this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector != this.editCCItem.connector.name) {
                this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect[idx].connector = this.editCCItem.connector.name
            }
            
            this.canceldialogCC()
        },
        canceldialogCC() {
            this.isEditingCC = true
            this.editCCItem.connector = null
        },
        adddialogCC() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].comconnect.some(item => item.id === n)
            }
            this.editCCItem.id = n

            if( this.editCCItem.connector != null) {
                this.newLine(this.element.uuid+'/comconet-'+n+'-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id, 
                                this.element.uuid+'/comconet-'+this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].id+'-'+this.element.conditional[this.viewInfo.idxConditional].id, this.editCCItem.connector.uuid, false)
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
            this.editIP4Item.DNSAddr = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].DNSAddr
            this.editIP4Item.ttl = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].ttl
        },
        editdialogIP4(idx) {
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].gateway = this.editIP4Item.gateway
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].behavior = this.editIP4Item.behavior
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].address = this.editIP4Item.address
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].addresssorce = this.editIP4Item.addresssorce
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].mask = this.editIP4Item.mask
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].DNSAddr = this.editIP4Item.DNSAddr
            this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address[idx].ttl = this.editIP4Item.ttl
            this.canceldialogIP4()
        },
        canceldialogIP4() {
            this.editIP4Item = Object.assign({}, this.defaultIP4Item)
        },
        adddialogIP4() {
                        let res = true, n = 0
            while (res) {
                n++
                res = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip4address.some(item => item.id === n)
            }
            this.editIP4Item.id = n

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
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.conditional[this.viewInfo.idxConditional].channel[this.viewInfo.idxChannel].endpoint[this.viewInfo.idxEndpoint].ip6address.some(item => item.id === n)
            }
            this.editIP6Item.id = n

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
                this.$store.commit('deletConnectionline', {startnum: linenum} )
                this.deleteOpenElement()
            }
        },
        deleteOpenElement() {
            console.log('ethernetC deleteOpenElement')
            //EventBus.$emit('delete-line', this.$store.getters.getDeleteOpenElement(this.element.uuid))
            this.$store.commit('deleteOpenElemnt', {uuid: this.element.uuid, isDeleteAll: false, startUUID: this.element.uuid} )
        },
        newLine(startLine, drawLine, endLine, isView, isExist) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            if (isView) {
                EventBus.$emit('new-line', drawLine, endLine, isExist)
            }
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.conditional = JSON.parse(JSON.stringify(this.element.conditional))
            this.dialogText= true
        },
        saveARXML() {
            this.editTableList()
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editEthernetCluster', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            
            this.element.conditional.forEach(item => {
                item.channel.forEach(cha => {
                    cha.comconnect.forEach(data => {
                        if (data.connector != null) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/comconet-'+data.id+'-'+cha.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/comconet-'+data.id+'-'+cha.id+'-'+item.id)
                            }
                        }
                    })
                })
            })
            this.editARXML.conditional.forEach(item => {
                item.channel.forEach(cha => {
                    cha.comconnect.forEach(data => {
                        if (data.connector != null) {
                            var changEndLine = this.$store.getters.getMachineDesignPath(data.connector, 1)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/comconet-'+data.id+'-'+cha.id+'-'+item.id, this.element.uuid+'/conditional', changEndLine, false)
                            }
                        }
                    })
                })
            })

            this.editARXML.conditional.forEach(condi => {
                condi.channel.forEach(chan => {
                    chan.endpoint.forEach(end => {
                        end.ip4address.forEach(ip => {
                            if (ip.behavior != null) {
                                ip.behavior = ip.behavior.toUpperCase()
                                if(!(ip.behavior == 'FORGET' || ip.behavior == 'STORE-PERSISTENTLY')) {
                                    ip.behavior = null
                                }
                            }
                            if (ip.addresssorce != null) {
                                ip.addresssorce = ip.addresssorce.toUpperCase()
                                if(!(ip.addresssorce == 'FIXED' || ip.addresssorce == 'DHCPV-4' ||
                                    ip.addresssorce == 'AUTO-IP' || ip.addresssorce == 'AUTO-IP-DOIP')) {
                                    ip.addresssorce = null
                                }
                            }
                        })
                        end.ip6address.forEach(ip => {
                            if (ip.behavior != null) {
                                ip.behavior = ip.behavior.toUpperCase()
                                if(!(ip.behavior == 'FORGET' || ip.behavior == 'STORE-PERSISTENTLY')) {
                                    ip.behavior = null
                                }
                            }
                            if (ip.addresssorce != null) {
                                ip.addresssorce = ip.addresssorce.toUpperCase()
                                if(!(ip.addresssorce == 'FIXED' || ip.addresssorce == 'DHCPV-6' ||
                                    ip.addresssorce == 'LINK-LOCAL' || ip.addresssorce == 'ROUTER-ADVERTISEMENT' ||
                                    ip.addresssorce == 'LINK-LOCAL-DOIP')) {
                                    ip.addresssorce = null
                                }
                            }
                        })
                    })
                })
            })

            this.element.conditional = JSON.parse(JSON.stringify(this.editARXML.conditional))
            this.cancelARXML()
        },
        editTableList() {
            if (this.editARXML.conditional > 0) {
                this.element.conditional.forEach(condi => {
                    var isHaveTable = false
                    condi.channel.forEach(cha => {
                        cha.endpoint.forEach(item => {
                            isHaveTable = false
                            this.editARXML.conditional.forEach(editcondi => {
                                editcondi.channel.forEach(editcha => {
                                    editcha.endpoint.forEach(data => {
                                        if (data.id == item.id) {
                                            isHaveTable = true
                                            if (data.name != item.name) {
                                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        condi: editcondi.name,
                                                        channel: editcha.name,
                                                        endpoint: item.name,
                                                        beforename: data.name, changeName: 'endpoint'} )
                                            }
                                        }
                                    })
                                    if (isHaveTable && (cha.name != editcha.name)) {
                                        this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    condi: editcondi.name,
                                                    channel: cha.name,
                                                    beforename: editcha.name, changeName: 'channel'} )
                                    }
                                })
                                if (isHaveTable && (condi.name != editcondi.name)) {
                                    this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                    condi: condi.name,
                                                    beforename: editcondi.name, changeName: 'condi'} )
                                }
                            })
                            if (!isHaveTable) {
                                var deleteName = item.name
                                if(item.name != '') {
                                    deleteName += '/'
                                } 
                                deleteName += cha.name
                                if (cha.name != '') {
                                    deleteName += '/'
                                }
                                deleteName += condi.name
                                this.$store.commit('deleteRefTable', {deleteName:'machineD', deleteTab: true, tabPosition:'endpoint', tabName: deleteName, path: this.element.path, name: this.element.name})
                            } else if (isHaveTable && this.editARXML.name != this.element.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name,
                                                    beforename: this.element.name, changeName: 'name'} )

                            }
                        })
                    })
                })
            } else {
                if (this.element.conditional.length > 0) {
                    this.element.conditional.forEach(item => {
                        var deleteName = item.name
                        if(item.name != '') {
                            deleteName += '/'
                        }
                        this.$store.commit('deleteRefTable', {deleteName:'machineD', deleteTab: true, tabPosition:'conditional', tabName: deleteName, path: this.element.path, name: this.element.name})
                    })
                }
            }
        },
        cancelARXML() {
            this.editARXML = {name:'', conditional:[]}
            this.editTextCondi = {name: '', version:'', channel: [], baudrate: '', id: ''}
            this.editTextChannel = {name: '', comconnect:[], endpoint: [], id: ''}
            this.editTextEndPoint = {name: '', domainname:'', ip4address: [], ip6address: [], priority: '', id: ''}
            this.editTextCommuni = {connector : null, id: ''}
            this.editTextIP4 = {gateway:'', DNSAddr:'', behavior: null, address:'', addresssorce:null, mask:'', id: '', ttl: ''}
            this.editTextIP6 = {priority:'', behavior:null, prelength:'', address:'', addresssource:null, id: ''}
            this.dialogText = false
        },
        newTextCondi() {
            this.editTextCondi = {name: '', version:'', channel: [], baudrate: '', id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextCondi.name = 'Ethernet_' + n++;
                res = this.editARXML.conditional.some(item => item.id === n)
            }
            this.editTextCondi.id = n

            const addObj = Object.assign({}, this.editTextCondi)
            this.editARXML.conditional.push(addObj);
        },
        deletTextCondi(idx) {
            this.editARXML.conditional.splice(idx,1)
        },
        newTextChannel(idxC) {
            this.editTextChannel = {name: '', comconnect:[], endpoint: [], baudrate: '', id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextChannel.name = 'PhysicalChannel_' + n++;
                res = this.editARXML.conditional[idxC].channel.some(item => item.id === n)
            }
            this.editTextChannel.id = n

            const addObj = Object.assign({}, this.editTextChannel)
            this.editARXML.conditional[idxC].channel.push(addObj);
        },
        deletTextChannel(idx, idxC) {
            this.editARXML.conditional[idxC].channel.splice(idx,1)
        },
        newTextCommuni(idxP, idxC) {
            this.editTextCommuni = {connector : null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.conditional[idxC].channel[idxP].comconnect.some(item => item.id === n)
            }
            this.editTextCommuni.id = n

            const addObj = Object.assign({}, this.editTextCommuni)
            this.editARXML.conditional[idxC].channel[idxP].comconnect.push(addObj);
        },
        deletTextCommuni(idx, idxC, idxP) {
            this.editARXML.conditional[idxC].channel[idxP].comconnect.splice(idx,1)
        },
        newTextEndPoint(idxC, idxP) {
            this.editTextEndPoint = {name: '', domainname:'', ip4address: [], ip6address: [], priority: '', id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextEndPoint.name = 'Endpoint' + n++;
                res = this.editARXML.conditional[idxC].channel[idxP].endpoint.some(item => item.id === n)
            }
            this.editTextEndPoint.id = n

            const addObj = Object.assign({}, this.editTextEndPoint)
            this.editARXML.conditional[idxC].channel[idxP].endpoint.push(addObj);
        },
        deletTextEndPoint(idx, idxC, idxP) {
            this.editARXML.conditional[idxC].channel[idxP].endpoint.splice(idx,1)
        },
        newTextIP4(idxC, idxP, idxE) {
            this.editTextIP4 = {gateway:'', DNSAddr:'', behavior: null, address:'', addresssorce:null, mask:'', id: '', ttl: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.conditional[idxC].channel[idxP].endpoint[idxE].ip4address.some(item => item.id === n)
            }
            this.editTextIP4.id = n

            const addObj = Object.assign({}, this.editTextIP4)
            this.editARXML.conditional[idxC].channel[idxP].endpoint[idxE].ip4address.push(addObj);
        },
        deletTextIP4(idx, idxC, idxP, idxE) {
            this.editARXML.conditional[idxC].channel[idxP].endpoint[idxE].ip4address.splice(idx,1)
        },
        newTextIP6(idxC, idxP, idxE) {
            this.editTextIP6 = {priority:'', behavior:null, prelength:'', address:'', addresssource:null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.conditional[idxC].channel[idxP].endpoint[idxE].ip6address.some(item => item.id === n)
            }
            this.editTextIP6.id = n

            const addObj = Object.assign({}, this.editTextIP6)
            this.editARXML.conditional[idxC].channel[idxP].endpoint[idxE].ip6address.push(addObj);
        },
        deletTextIP6(idx, idxC, idxP, idxE) {
            this.editARXML.conditional[idxC].channel[idxP].endpoint[idxE].ip6address.splice(idx,1)
        },
    },
}
</script>