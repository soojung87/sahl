<template>
    <div :id="'main-view'+location"  v-dragscroll="drag" v-on:dragscrollmove="dragBackground()" v-bind:class="[{'grab-bing':'true'},{'main-view':minimaptoolbar},{'minimap-view':!minimaptoolbar}]"
        @mousewheel="onmouseWheel" @mousedown="onmouseDown" @mouseup="onmouseUp" @scroll="onScroll">
        <div id="wrapper"></div>
        <v-main id="sea" v-bind:style="{ transform: 'scale(' + zoom.value + ')' }"><!--<v-app>에서 바꿈 : v-app으로 하면 뭔가 안에 창이 하나 더생겨서 화면이 늘어나 scroll이 생긴다.-->
            <v-container>
            <div v-for="element in SAHLProject[openProjectIndex].DataTypes.CompuMethod"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form" 
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Compu Method')" @deactivated="onDeactivated(element.uuid, 'Compu Method')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Compu Method')"
                    @resizing="changeElementSize()">
                    <CompuMethod  :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable> <!-- 화면 분할하면 창마다 scroll이 움직이지 않기 때문에 id값을 바꿔줘야한다-->
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].DataTypes.DataConstr"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form" 
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Data Constr')" @deactivated="onDeactivated(element.uuid, 'Data Constr')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Data Constr')"
                    @resizing="changeElementSize()">
                    <DataConstr  :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable> <!-- 화면 분할하면 창마다 scroll이 움직이지 않기 때문에 id값을 바꿔줘야한다-->
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].DataTypes.SWBaseType"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SW Base Type')" @deactivated="onDeactivated(element.uuid, 'SW Base Type')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SW Base Type')"
                    @resizing="changeElementSize()">
                    <SWBaseType :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/>
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].DataTypes.ApplicationArrayDataType"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Application Array')" @deactivated="onDeactivated(element.uuid, 'Application Array')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Application Array')"
                    @resizing="changeElementSize()">
                    <ApplicationArrayDate :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].DataTypes.ImplementationDataType"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form" 
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Implementation')" @deactivated="onDeactivated(element.uuid, 'Implementation')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Implementation')"
                    @resizing="changeElementSize()">
                    <ImplementationDataType :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Machine.Machine"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form" 
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Machine')" @deactivated="onDeactivated(element.uuid, 'Machine')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Machine')"
                    @resizing="changeElementSize()">
                    <Machine :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Machine.HWElement"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'HW Element')" @deactivated="onDeactivated(element.uuid, 'HW Element')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'HW Element')"
                    @resizing="changeElementSize()">
                    <HWElement  :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Machine.HWCategory"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'HW Category')" @deactivated="onDeactivated(element.uuid, 'HW Category')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'HW Category')"
                    @resizing="changeElementSize()">
                    <HWCategory  :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Machine.MachineDesign"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible"  :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Machine Designs')" @deactivated="onDeactivated(element.uuid, 'Machine Designs')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Machine Designs')"
                    @resizing="changeElementSize()">
                    <MachineDesign :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Machine.ModeDeclarationGroup"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Mode Declaration Group')" @deactivated="onDeactivated(element.uuid, 'Mode Declaration Group')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Mode Declaration Group')"
                    @resizing="changeElementSize()">
                    <ModeDeclarationGroup :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Machine.EthernetCluster"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Ethernet Cluster')" @deactivated="onDeactivated(element.uuid, 'Ethernet Cluster')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Ethernet Cluster')"
                    @resizing="changeElementSize()">
                    <EthernetCluster :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.ProtoMachineMapping"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Process to Machine Mapping Set')" @deactivated="onDeactivated(element.uuid, 'Process to Machine Mapping Set')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Process to Machine Mapping Set')"
                    @resizing="changeElementSize()">
                    <ProcessToMachine :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.SWComponents"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SW Components')" @deactivated="onDeactivated(element.uuid, 'SW Components')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SW Components')"
                    @resizing="changeElementSize()">
                    <SWComponents :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.Process"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Process')" @deactivated="onDeactivated(element.uuid, 'Process')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Process')"
                    @resizing="changeElementSize()">
                    <Process :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.ProcessDesign"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Process Design')" @deactivated="onDeactivated(element.uuid, 'Process Design')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Process Design')"
                    @resizing="changeElementSize()">
                    <ProcessDesign :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.Executable"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Executable')" @deactivated="onDeactivated(element.uuid, 'Executable')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Executable')"
                    @resizing="changeElementSize()">
                    <Executable :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.StartupConfig"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Startup Config Set')" @deactivated="onDeactivated(element.uuid, 'Startup Config Set')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Startup Config Set')"
                    @resizing="changeElementSize()">
                    <StartupConfig :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.DeterministicClient"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Deterministic Client')" @deactivated="onDeactivated(element.uuid, 'Deterministic Client')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Deterministic Client')"
                    @resizing="changeElementSize()">
                    <DeterministicClient :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.SomeIPServiceInterfaceDeployment"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SomeIP Service Interface Deployment')" @deactivated="onDeactivated(element.uuid, 'SomeIP Service Interface Deployment')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SomeIP Service Interface Deployment')"
                    @resizing="changeElementSize()">
                    <SomeIPService :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/>  <!-- :drag-handle="'.drag-handle'" -->
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.ServiceInterface"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Service Interface')" @deactivated="onDeactivated(element.uuid, 'Service Interface')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Service Interface')"
                    @resizing="changeElementSize()">
                    <ServiceInterface :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/>  <!-- :drag-handle="'.drag-handle'" -->
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.SomeIPClientEvent"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Client')" @deactivated="onDeactivated(element.uuid, 'Client')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Client')"
                    @resizing="changeElementSize()">
                    <Client :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.SomeIPServerEvent"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Server')" @deactivated="onDeactivated(element.uuid, 'Server')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Server')"
                    @resizing="changeElementSize()">
                    <Server :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.SomeIPClientServiceInstance"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SomeIP Client')" @deactivated="onDeactivated(element.uuid, 'SomeIP Client')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SomeIP Client')"
                    @resizing="changeElementSize()">
                    <SomeIPClient :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.SomeIPServerServiceInstance"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SomeIP Server')" @deactivated="onDeactivated(element.uuid, 'SomeIP Server')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SomeIP Server')"
                    @resizing="changeElementSize()">
                    <SomeIPServer :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.SomeIPServiceInstanceToMachine"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SomeIP To Machine Mapping')" @deactivated="onDeactivated(element.uuid, 'SomeIP To Machine Mapping')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SomeIP To Machine Mapping')"
                    @resizing="changeElementSize()">
                    <SomeIPtoMachine :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.ServiceInstanceToPortPrototype"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'To Port Prototype Mapping')" @deactivated="onDeactivated(element.uuid, 'To Port Prototype Mapping')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'To Port Prototype Mapping')"
                    @resizing="changeElementSize()">
                    <ToPortPrototype :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.RequiredSomeIP"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Required SomeIP')" @deactivated="onDeactivated(element.uuid, 'Required SomeIP')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Required SomeIP')"
                    @resizing="changeElementSize()">
                    <RequiredSomeIP :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.ProvidedSomeIP"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Provided SomeIP')" @deactivated="onDeactivated(element.uuid, 'Provided SomeIP')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Provided SomeIP')"
                    @resizing="changeElementSize()">
                    <ProvidedSomeIP :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.E2EProfileConfig"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'E2E Profile Configuration Set')" @deactivated="onDeactivated(element.uuid, 'E2E Profile Configuration Set')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'E2E Profile Configuration Set')"
                    @resizing="changeElementSize()">
                    <E2EProfileConfig :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.SdgDef"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SDG DEF')" @deactivated="onDeactivated(element.uuid, 'SDG DEF')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SDG DEF')"
                    @resizing="changeElementSize()">
                    <SdgDef :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.ErrorDomain"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Error Domain')" @deactivated="onDeactivated(element.uuid, 'Error Domain')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Error Domain')"
                    @resizing="changeElementSize()">
                    <APErrorDomain :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.ErrorSet"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Error Set')" @deactivated="onDeactivated(element.uuid, 'Error Set')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Error Set')"
                    @resizing="changeElementSize()">
                    <APErrorSet :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Service.Error"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Error')" @deactivated="onDeactivated(element.uuid, 'Error')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Error')"
                    @resizing="changeElementSize()">
                    <APError :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Per.PERFileArray"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'File Array')" @deactivated="onDeactivated(element.uuid, 'File Array')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'File Array')"
                    @resizing="changeElementSize()">
                    <PerFileArray :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Per.PERFileProxy"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'File Proxy Interface')" @deactivated="onDeactivated(element.uuid, 'File Proxy Interface')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'File Proxy Interface')"
                    @resizing="changeElementSize()">
                    <PerFileProxy :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Per.PERKeyValueD"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'KeyV Database')" @deactivated="onDeactivated(element.uuid, 'KeyV Database')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'KeyV Database')"
                    @resizing="changeElementSize()">
                    <PerKeyValueDB :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Per.PERKeyValueDI"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'KeyV Database Interface')" @deactivated="onDeactivated(element.uuid, 'KeyV Database Interface')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'KeyV Database Interface')"
                    @resizing="changeElementSize()">
                    <PerKeyValueDI :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Per.PERPPtoFileArray"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'PP To File Array Mapping')" @deactivated="onDeactivated(element.uuid, 'PP To File Array Mapping')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'PP To File Array Mapping')"
                    @resizing="changeElementSize()">
                    <PPPtoFileArray :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Per.PERPPtoKeyValue"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'PP To Key Value Database Mapping')" @deactivated="onDeactivated(element.uuid, 'PP To Key Value Database Mapping')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'PP To Key Value Database Mapping')"
                    @resizing="changeElementSize()">
                    <PPPtoKeyValue :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Phm.PHMContribution"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Platform Health Management Contribution')" @deactivated="onDeactivated(element.uuid, 'Platform Health Management Contribution')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Platform Health Management Contribution')"
                    @resizing="changeElementSize()">
                    <PHMContribution :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Phm.PHMtoMachine"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Contribution To Machine Mapping')" @deactivated="onDeactivated(element.uuid, 'Contribution To Machine Mapping')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Contribution To Machine Mapping')"
                    @resizing="changeElementSize()">
                    <PHMtoMachine :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Phm.PHMHealth"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Health Channel Interface')" @deactivated="onDeactivated(element.uuid, 'Health Channel Interface')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Health Channel Interface')"
                    @resizing="changeElementSize()">
                    <PHMHealthChannel :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Phm.PHMRecovery"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Recovery Action Interface')" @deactivated="onDeactivated(element.uuid, 'Recovery Action Interface')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Recovery Action Interface')"
                    @resizing="changeElementSize()">
                    <PHMRecovery :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Phm.PHMSupervised"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Supervised Enity Interface')" @deactivated="onDeactivated(element.uuid, 'Supervised Enity Interface')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Supervised Enity Interface')"
                    @resizing="changeElementSize()">
                    <PHMSupervised :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].Phm.RecoveryVia"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Recovery VIA Application')" @deactivated="onDeactivated(element.uuid, 'Recovery VIA Application')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Recovery VIA Application')"
                    @resizing="changeElementSize()">
                    <PHMRecoveryVia :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].IamG.MethodGD"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Com Method Grant Design')" @deactivated="onDeactivated(element.uuid, 'Com Method Grant Design')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Com Method Grant Design')"
                    @resizing="changeElementSize()">
                    <MethodGrantD :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].IamG.EventGD"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Com Event Grant Design')" @deactivated="onDeactivated(element.uuid, 'Com Event Grant Design')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Com Event Grant Design')"
                    @resizing="changeElementSize()">
                    <EventGrantD :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].IamG.FieldGD"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Com Field Grant Design')" @deactivated="onDeactivated(element.uuid, 'Com Field Grant Design')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Com Field Grant Design')"
                    @resizing="changeElementSize()">
                    <FieldGrantD :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].IamG.MethodG"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Com Method Grant')" @deactivated="onDeactivated(element.uuid, 'Com Method Grant')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Com Method Grant')"
                    @resizing="changeElementSize()">
                    <MethodGrant :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].IamG.EventG"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Com Event Grant')" @deactivated="onDeactivated(element.uuid, 'Com Event Grant')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Com Event Grant')"
                    @resizing="changeElementSize()">
                    <EventGrant :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].IamG.FieldG"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Com Field Grant')" @deactivated="onDeactivated(element.uuid, 'Com Field Grant')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Com Field Grant')"
                    @resizing="changeElementSize()">
                    <FieldGrant :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' :location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].UCM.SoftWareCluster"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SoftWare Cluster')" @deactivated="onDeactivated(element.uuid, 'SoftWare Cluster')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SoftWare Cluster')"
                    @resizing="changeElementSize()">
                    <SoftwareCluster :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].UCM.SoftWarePackage"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'SoftWare Package')" @deactivated="onDeactivated(element.uuid, 'SoftWare Package')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SoftWare Package')"
                    @resizing="changeElementSize()">
                    <SoftwarePackage :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' location='location'/> 
                </vue-draggable-resizable>
            </div>
            <div v-for="element in SAHLProject[openProjectIndex].UCM.VehiclePackage"  :key="element.uuid">
                <vue-draggable-resizable :id="element.uuid+location"
                    class-name-active="my-active-class"
                    class-name="basic-form"
                    v-if="element.isVisible" :scale="zoom.value"
                    :x="element.left" :y="element.top" :w=400 :h=100 :z='element.zindex'
                    :resizable="true" :draggable="isDraggable"
                    :handles="['mr','ml']" :min-width="400"
                    @activated="onActivated(element.uuid, 'Vehicle Package')" @deactivated="onDeactivated(element.uuid, 'Vehicle Package')"
                    @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Vehicle Package')"
                    @resizing="changeElementSize()">
                    <VehiclePackage :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar' location='location'/> 
                </vue-draggable-resizable>
            </div>
            </v-container>
        </v-main>
        <!-- <v-dialog v-model='dialogSelectElement' hide-overlay width="1200" persistent scrollable>
            <v-card>
                <v-toolbar class="text-h6 green accent-1">
                    <v-toolbar-title>Select Input Element</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <br id="scroll-target" >
                    <ZkTable
                        ref="editTable"
                        :data="editInputList[0].children"
                        :columns="columnsDialogSelect"
                        :stripe="props.stripe"
                        :border="props.border"
                        :show-header="props.showHeader"
                        :show-summary="props.showSummary"
                        :show-row-hover="props.showRowHover"
                        :show-index="props.showIndex"
                        :tree-type="props.treeType"
                        :is-fold="props.isFold"
                        :expand-type="props.expandType"
                        :selection-type="props.selectionType"
                        >
                    </ZkTable>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text  @click="startProgress()">
                        Select
                    </v-btn>
                    <v-btn color="primary" text @click="cancelInputElement()">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <v-dialog v-model="dialogLoadingProgress" hide-overlay persistent width="500">
            <v-card color="primary" dark>
                <v-card-text>
                    Please stand by
                    <v-progress-linear indeterminate color="white" rounded class="mb-0" height="6"></v-progress-linear>
                </v-card-text>
            </v-card>
      </v-dialog>
    </div>
</template>

<script>
import ServiceInterface from './serviceInterface.vue'
import CompuMethod from './compumethod.vue'
import DataConstr from './dataconstr.vue'
import SWBaseType from './SWBaseType.vue'
import ApplicationArrayDate from './applicationArrayData.vue'
import ImplementationDataType from './implementationData.vue'
import Machine from '../components/Machine.vue'
import HWElement from '../components/HWElement.vue'
import HWCategory from '../components/HWCategory.vue'
import ModeDeclarationGroup from '../components/ModeDeclarationGroup.vue'
import MachineDesign from '../components/MachineDesign.vue'
import EthernetCluster from '../components/EthernetCluster.vue'
import DeterministicClient from '../components/DeterministicClient.vue'
import Executable from '../components/Executable.vue'
import Process from '../components/Process.vue'
import ProcessDesign from '../components/ProcessDesign.vue'
import ProcessToMachine from '../components/ProcessToMachine.vue'
import StartupConfig from '../components/StartupConfig.vue'
import SWComponents from '../components/SWComponents.vue'
import APErrorDomain from '../components/APErrorDomain.vue'
import APErrorSet from '../components/APErrorSet.vue'
import APError from '../components/APError.vue'
import Client from '../components/ClientEventG.vue'
import Server from '../components/Server.vue'
import SomeIPClient from '../components/SomeIPClient.vue'
import SomeIPServer from '../components/SomeIPServer.vue'
import SomeIPtoMachine from '../components/SomeIPtoMachineMapping.vue'
import SomeIPService from '../components/SomeIPService.vue'
import ToPortPrototype from '../components/ToPortPrototype.vue'
import RequiredSomeIP from '../components/RequiredSomeIP.vue'
import ProvidedSomeIP from '../components/ProvidedSomeIP.vue'
import E2EProfileConfig from '../components/E2EProfileConfigurationSet.vue'
import SdgDef from '../components/SDG-DEF.vue'
import PerFileArray from './PerFileArray.vue'
import PerFileProxy from '../components/PerFileProxy.vue'
import PerKeyValueDB from '../components/PerKeyValueDB.vue'
import PerKeyValueDI from '../components/PerKeyValueDI.vue'
import PPPtoKeyValue from '../components/PPPtoKeyValue.vue'
import PPPtoFileArray from '../components/PPPtoFileArray.vue'
import PHMContribution from '../components/PHMContribution.vue'
import PHMtoMachine from '../components/PHMtoMachine.vue'
import PHMSupervised from '../components/PHMSupervised.vue'
import PHMHealthChannel from '../components/PHMHealthChannel.vue'
import PHMRecovery from '../components/PHMRecoveryAction.vue'
import PHMRecoveryVia from '../components/PHMRecoveryVia.vue'
import MethodGrantD from '../components/MethodGrantDesign.vue'
import EventGrantD from '../components/EventGrantDesign.vue'
import FieldGrantD from '../components/FieldGrantDesign.vue'
import MethodGrant from '../components/MethodGrant.vue'
import EventGrant from '../components/EventGrant.vue'
import FieldGrant from '../components/FieldGrant.vue'
import SoftwareCluster from '../components/UCMSoftwareCluster.vue'
import SoftwarePackage from '../components/UCMSoftWarePackage.vue'
import VehiclePackage from '../components/UCMVehiclePackage.vue'

import { EventBus } from '../main'
import LeaderLine from 'leader-line-vue'
import constant from "../store/constants.js"
//import ZkTable from 'vue-table-with-tree-grid'


export default{
    props: ['minimaptoolbar', 'location'],
    components:{CompuMethod, DataConstr, SWBaseType, ApplicationArrayDate, ImplementationDataType, 
                SomeIPService, ServiceInterface, Client, Server,
                SomeIPClient, SomeIPServer, SomeIPtoMachine, ToPortPrototype, RequiredSomeIP, ProvidedSomeIP, E2EProfileConfig, SdgDef,
                APErrorDomain, APErrorSet, APError,
                Machine, HWElement, HWCategory, ModeDeclarationGroup, MachineDesign, EthernetCluster,
                DeterministicClient, Executable, Process, ProcessDesign, ProcessToMachine, StartupConfig, SWComponents,
                PerFileArray, PerFileProxy, PerKeyValueDB, PerKeyValueDI, PPPtoKeyValue, PPPtoFileArray,
                PHMContribution, PHMtoMachine, PHMHealthChannel, PHMRecovery, PHMSupervised, PHMRecoveryVia,
                MethodGrantD, EventGrantD, FieldGrantD, MethodGrant, EventGrant, FieldGrant,
                SoftwareCluster, SoftwarePackage, VehiclePackage},//, ZkTable},
    computed: {
        SAHLProject() {
            return this.$store.state.SAHLProject
        },
        openProjectIndex() {
            return this.$store.state.openProjectIndex
        },
        navigatorList() {
            return this.$store.state.navigatorList
        },
        connectionLine() {
            return this.$store.state.connectionLine
        },
        activeUUID() {
            return this.$store.state.activeUUID
        },
        setting() {
            return this.$store.state.setting
        },
        visibleDetailView() {
            return this.$store.state.visibleDetailView
        },
        visibleLine() {
            return this.$store.state.visibleLine
        },
        numPanes() {
            return this.$store.state.numPanes
        },
        selectScreen() {
            return this.$store.state.selectScreen
        },
        isPositionLine() {
            return this.$store.state.isPositionLine
        },
        isDraggable() {
            return this.$store.state.isDraggable
        },
        editInputList () {
            return this.$store.state.editInputList
        },
        setLoadingProgress() {
            return this.$store.state.setLoadingProgress
        }
    },
    data() {
        return {
            zoom: {
                min: 0.3,
                max: 2,
                value: this.$store.state.setting.zoomMain,
                step: 0.05,
            },
            drag: true, //true: 배경 움직임, false: diagram움직임
            connections: [],
            appendLine: [],
            dialogSelectElement: false,
            dialogLoadingProgress: false,
            isMainviewClick: false, //dialogLoadingProgress가 여기서 불린건지 check해야해서 
            checkAll: false,
            //openIds: [],
            isDrag: false,
            leftPositionDrag: null,
            topPositionDrag: null,
            eleDrag: '',
           
            props: {
                stripe: true,
                border: true,
                showHeader: true,
                showSummary: false,
                showRowHover: true,
                showIndex: false,
                treeType: true,
                isFold: false, //default가 전부 열려있게 할 지 여부
                expandType: false,
                selectionType: true,
            },
             columnsDialogSelect: [{label: "Short-Name", prop: "name", minWidth: "400px"},
                                  {label: "Full-Name", prop: "path", minWidth: "400px"}],
        }
    },
    watch: {
        /*setLoadingProgress(newVal) {
            console.log('=========== '+newVal)
            if (!newVal) {
                this.dialogLoadingProgress = false
            } else if (newVal) {
                if (this.isMainviewClick) {
                    this.dialogLoadingProgress = true
                    setTimeout(() => { this.selectInputElement()}, 500)
                    this.isMainviewClick = false
                }
            }
        },*/
        setting(value) {
            //console.log('// '+value.zoomMain)
            this.zoom.value = value.zoomMain
            this.$nextTick(() => {
                this.changeMinimapView()
                //console.log('wheel')
                setTimeout(() => {this.moveline()}, 200) //선이 똑바로 그려지지가 않아서 한타이밍 늦게 느려주게 구현
            })
        },
        /*activeUUID(newVal, oldVal) {
            console.log('activeUUID')
            this.$nextTick(() => {
                this.changeMinimapView()
                if (newVal != null) {
                    document.getElementById(newVal+'1').scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                this.setChangActiveUUID(newVal, oldVal)
                this.moveline()
            })
        },*/
        visibleLine(val) {
            //console.log('visibleLine   '+val)
            if(this.minimaptoolbar && this.location == '1') {
                if (val) {
                    this.connections.forEach( item => {
                        item.show()
                    })
                } else {
                    this.connections.forEach( item => {
                        item.hide()
                    })
                }
            }
        },
        numPanes() {
            this.$nextTick(() => { /* pane delete시 선이 제 위치에 있지 않아 텀을 좀 주었다*/
                setTimeout(() => { this.moveline(); this.changeMinimapView() }, 150)
            })
        },
        isPositionLine(val) {
            console.log(val)
            if (val) {
                document.getElementById('wrapper').style.zIndex = 0;
            } else {
                document.getElementById('wrapper').style.zIndex = 1;
            }
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.changeMinimapView()
            document.getElementById('wrapper').style.zIndex = 1 //  line항상 element 위에 있도록 함
        })
        EventBus.$off('new-element');
        EventBus.$on('new-element', () => {
            this.$nextTick(() => {
                console.log('new-element')
                //document.getElementById(uuid+'1').scrollIntoView(true)
            })
        })
        EventBus.$on('new-line', (startdiagram, enddiagram, iscircle) => {
            console.log('new-line '+ startdiagram + '  //  '+ enddiagram + iscircle)
            if (iscircle == undefined) {iscircle = false}
            this.addLine(startdiagram, enddiagram, iscircle)
            this.$nextTick(() => { // 다 그려진뒤에 move해줘야지 그려지기전에 하게되면 선이 이상한 곳에 가서 그려져있음
                this.setanimationLine(this.$store.state.activeUUID)
                this.moveline()
            })
        });
        EventBus.$on('delete-line', (numLine, isBackAll) => {
            //console.log('delete-line'+ numLine)
            if(this.minimaptoolbar && this.location == '1') {
                if (numLine == 'all') {
                    this.connections.forEach((item,i) => {
                        document.body.appendChild(this.appendLine[i])
                        item.remove()
                    })
                    this.connections = []
                    this.appendLine = []
                } else {
                    if (isBackAll) {
                        for (let i=this.connections.length-1; i>=(numLine-1); i--) {
                            if (this.appendLine[i] != undefined) {
                            document.body.appendChild(this.appendLine[i])
                            this.connections[i].remove()
                            this.connections.splice(i, 1)
                            this.appendLine.splice(i, 1)
                        }
                        }
                    } else {
                        if (this.appendLine[numLine-1] != undefined) {
                            document.body.appendChild(this.appendLine[numLine-1])
                            this.connections[numLine-1].remove()
                            this.connections.splice(numLine-1, 1)
                            this.appendLine.splice(numLine-1, 1)
                        }
                    }
                    /*if (this.appendLine[numLine] != undefined) {
                        document.body.appendChild(this.appendLine[numLine])
                        this.connections[numLine].remove()
                    }
                    this.connections.splice(numLine, 1)
                    this.appendLine.splice(numLine, 1)*/
                    //console.log(this.appendLine)
                }
            }
        });
        /*EventBus.$on('copy-line', (uuid, endLine, index, tab, tabId) => {
            if(this.minimaptoolbar && this.location == '1') {
                var startLine
                if(this.connections[index] != null && this.connections[index].start.id.indexOf('/') !== -1) {
                    if(tab != null) {
                            startLine = uuid+'/'+tabId
                    } else {
                        var copyId = this.connections[index].start.id.split('/')
                        startLine = uuid+'/'+copyId[1]
                    }
                } else { //titlabar 접혀있을때 copy하면 startLine이 uuid값만 가지고 있기때문에 다 그렇게 복사됨 접었다 열면 제자리 찾아감
                    startLine = uuid
                }
                this.$nextTick(() => { // 다 그려진뒤에 move해줘야지 그려지기전에 하게되면 선이 이상한 곳에 가서 그려져있음
                    this.addLine(startLine, endLine, false)
                    this.moveline()
                })
            }
        })*/
        EventBus.$on('setLineActive', (uuid, isactive) => {
            //console.log(uuid+'   / '+ isactive)
            this.setanimationLine(uuid, isactive)
        })
        EventBus.$on('drawLine', () => { //v-hover 일때 쓰임
            this.$nextTick(() => {  // 접혔던것들 다 그리고나서 그려줘야지 안그러면 선이 이동안한것 처럼 보인다
                this.moveline()
            })
        })
        EventBus.$on('drawLineTitleBar', (uuid, isopen) => { //title bar 일때 쓰임
            if (!isopen) {
                this.drawLineCloseTitlebar(uuid)
            } else {
                this.drawLineOpenTitlebar(uuid)
            }
            this.$nextTick(() => {  // 접혔던것들 다 그리고나서 그려줘야지 안그러면 선이 이동안한것 처럼 보인다
                this.setanimationLine(uuid, true)
                this.moveline()
            })
        })
        /*tab있는 element들은 화면 분할할때 선이 이상한 곳으로 가기때문에 location을 넘겨줘야한다 */
        EventBus.$on('changeLine-someipService', (item,uuid, idx, tabID, str1) => {  //하나의 element에 tab이 2개가 있을 경우 item으로 구분해줘야한다.
            this.$nextTick(() => { 
                if (uuid == this.$store.state.activeUUID) {
                    this.drawLinTabMoveSomeIPServeice(item,uuid, idx, tabID, str1) //ethernet Cluster에서 conditional name와 channel name이 필요해 str1로 나눔
                }
            })
        })
        EventBus.$off('goElement'); //중복호출되어 같이 정의해줘야 한번 들어온다. 
        EventBus.$on('goElement', (id) => {
            console.log('goElement  '+ this.$store.state.selectScreen)
            var activeLine = this.$store.getters.getactiveLine(this.$store.state.activeUUID)
            for (let i=0; i< activeLine.length;i++) {
                if (this.$store.getters.getViewLineVisible(activeLine[i])) {
                    document.getElementById(id+this.$store.state.selectScreen).scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }
            EventBus.$emit('active-element', id)
            this.$store.commit( 'setSelectScreen', {num: 1})
        })
        EventBus.$off('inputFile-element');
        EventBus.$on('inputFile-element', () => {
            console.log(this.$store.state.editInputList)
            //this.setOpenList()
            this.dialogSelectElement=true
            this.$nextTick(() => {
                document.getElementById('scroll-target').scrollIntoView() //dialog 열었을 경우 scroll이 항상 맨위로 가있는 방법
            })
        })
        EventBus.$on('endinputFile', () => {
            this.cancelInputElement()
            this.$store.commit('setLoadingImport', {setProgress: false})
        })
    },
    methods: {
        onActivated(uuid, parent) {
            //console.log('onActivated '+parent)
            if(this.minimaptoolbar == false && this.location == '1') {
                console.log('onActivated'+uuid)
                document.getElementById(uuid+this.location).scrollIntoView(true)
            }
            this.$store.commit('setzIndexVisible', {parent:parent, uuid: uuid, zindex: 10, compo: 'z'} )
            this.$store.commit('setuuid', {uuid: uuid} )
            this.isMouseDiagram = true
            //EventBus.$emit('active-element', uuid)
            this.drag = false
            this.setanimationLine(uuid, true)
        },
        onDeactivated(uuid, parent) {
            //console.log('onDeactivated '+ parent)
            this.setanimationLine(uuid, false)
            this.isMouseDiagram = false
            this.$store.commit('setzIndexVisible', {parent:parent, uuid: uuid, zindex: 2, compo: 'z'} )
            this.$store.commit('setuuid', {uuid: null} )
            //EventBus.$emit('active-element', null)
            this.drag = true
        },
        onElementDrag(uuid, left, top, ele) {
            console.log(left+' / '+top)
            if (!this.isDrag) {
                switch(ele) {
                    case constant.CompuMethod_str :
                           this.eleDrag = 'editCompuMethod'
                           break;
                    case constant.DataConstr_str :
                           this.eleDrag = 'editDataConstr'
                           break;
                    case constant.SWBaseType_str :
                           this.eleDrag = 'editSWBaseType'
                           break;
                    case constant.ApplicationArray_str :
                           this.eleDrag = 'editApplicationArray'
                           break;
                    case constant.Implementation_str :
                           this.eleDrag = 'editImplementation'
                           break;
                    case constant.Machine_str :
                           this.eleDrag = 'editMachine'
                           break;
                    case constant.MachineDesigne_str :
                           this.eleDrag = 'editMachineDesign'
                           break;
                    case constant.EthernetCluster_str :
                           this.eleDrag = 'editEthernetCluster'
                           break;
                    case constant.ModeDeclarationGroup_str :
                           this.eleDrag = 'editModeDeclarationGroup'
                           break;
                    case constant.HWElement_str :
                           this.eleDrag = 'editHWElement'
                           break;
                    case constant.HWCategory_str :
                           this.eleDrag = 'editHWCategory'
                           break;
                    case constant.ProcesstoMachineMapping_str :
                           this.eleDrag = 'editProtoMachineMapping'
                           break;
                    case constant.SWComponents_str :
                           this.eleDrag = 'editSWComponents'
                           break;
                    case constant.Process_str :
                           this.eleDrag = 'editProcess'
                           break;
                    case constant.ProcessDesign_str :
                           this.eleDrag = 'editProcessDesign'
                           break;
                    case constant.Executable_str :
                           this.eleDrag = 'editExecutable'
                           break;
                    case constant.StartupConfig_str :
                           this.eleDrag = 'editStartupConfig'
                           break;
                    case constant.DeterministicClient_str :
                           this.eleDrag = 'editDeterministicClien'
                           break;
                    case constant.SomeIPServiceInterfaceDeployment_str :
                           this.eleDrag = 'editSomeIPService'
                           break;
                    case constant.ServiceInterface_str :
                           this.eleDrag = 'editServiceInterface'
                           break;
                    case constant.Client_str :
                           this.eleDrag = 'editClient'
                           break;
                    case constant.Server_str:
                           this.eleDrag = 'editServer'
                           break;
                    case constant.SomeIPClient_str :
                           this.eleDrag = 'editSomeIPClient'
                           break;
                    case constant.SomeIPServer_str :
                           this.eleDrag = 'editSomeIPServer'
                           break;
                    case constant.SomeIPToMachineMapping_str :
                           this.eleDrag = 'editSomeIPtoMachine'
                           break;
                    case constant.ToPortPrototypeMapping_str :
                           this.eleDrag = 'editToPortPrototype'
                           break;
                    case constant.RequiredSomeIP_str :
                           this.eleDrag = 'editRequiredSomeIP'
                           break;
                    case constant.ProvidedSomeIP_str :
                           this.eleDrag = 'editProvidedSomeIP'
                           break;
                    case constant.E2EProfileConfig_str :
                           this.eleDrag = 'editE2EProfileConfig'
                           break;
                    case constant.SDG_DEF_str :
                           this.eleDrag = 'editSDG_DEF'
                           break;
                    case constant.Error_str :
                           this.eleDrag = 'editError'
                           break;
                    case constant.Errorset_str :
                           this.eleDrag = 'editErrorSet'
                           break;
                    case constant.ErrorDomain_str :
                           this.eleDrag = 'editErrorDomain'
                           break;
                    case constant.FileArray_str :
                           this.eleDrag = 'editPERFileArray'
                           break;
                    case constant.FileProxyInterf_str :
                           this.eleDrag = 'editSomeIPCeditPERFileProxylient'
                           break;
                    case constant.KeyValueData_str :
                           this.eleDrag = 'editPERKeyValueD'
                           break;
                    case constant.KeyValueDI_str :
                           this.eleDrag = 'editPERKeyValueDI'
                           break;
                    case constant.PortProtoFileA_str :
                           this.eleDrag = 'editPERPPtoFileArray'
                           break;
                    case constant.PortProtoKeyV_str :
                           this.eleDrag = 'editPERPPtoKeyValue'
                           break;
                    case constant.PlatformHealthManagC_str :
                           this.eleDrag = 'editPHMContribution'
                           break;
                    case constant.ContritoMachine_str :
                           this.eleDrag = 'editPHMtoMachine'
                           break;
                    case constant.HealthChannel_str :
                           this.eleDrag = 'editPHMHealth'
                           break;
                    case constant.RecoveryVA_str :
                           this.eleDrag = 'editPHMRecovery'
                           break;
                    case constant.PHMSupervised_str :
                           this.eleDrag = 'editPHMSupervised'
                           break;
                    case constant.RecoveryActionInterf_str :
                           this.eleDrag = 'editPHMRecoveryVia'
                           break;
                    case constant.ComMethodGDesign_str :
                           this.eleDrag = 'editMethodGD'
                           break;
                    case constant.ComEventGDesign_str :
                           this.eleDrag = 'editEventGD'
                           break;
                    case constant.ComFieldGDesign_str :
                           this.eleDrag = 'editFieldGD'
                           break;
                    case constant.ComMethodGrant_str:
                           this.eleDrag = 'editMethodG'
                           break;
                    case constant.ComEventGrant_str:
                           this.eleDrag = 'editEventG'
                           break;
                    case constant.ComFieldGrant_str :
                           this.eleDrag = 'editFieldG'
                           break;
                    case constant.SWCluster_str :
                           this.eleDrag = 'editSoftWareCluster'
                           break;
                    case constant.SWPackage_str :
                           this.eleDrag = 'editSoftWarePackage'
                           break;
                    case constant.VehiclePackage_str :
                           this.eleDrag = 'editVehiclePackage'
                           break;
                }
                
                this.isDrag = true
            }
            this.leftPositionDrag = left
            this.topPositionDrag = top

            //document.getElementById(uuid+this.location).scrollIntoView(true)
            //this.$store.commit(editStr, {compo:"drag", uuid: uuid, top: top, left: left, location: this.location} )
            this.moveline() /*넣으면 움질일때마다 선이 움직임*/ 
        },
        onmouseUp() {
            if (this.isDrag && this.eleDrag != '') { // drag가 끝났을 경우에만 값을 넣어준다.
                this.isDrag = false
                this.$store.commit(this.eleDrag, {compo:"drag", uuid: this.$store.state.activeUUID, top: this.topPositionDrag, left: this.leftPositionDrag, location: this.location} )
                this.topPositionDrag = null
                this.leftPositionDrag = null
                this.eleDrag = ''
            }
        },
        changeElementSize() {
            //console.log('changeElementSize')
            this.moveline()
        },
        moveline() {
            //console.log('moveline')
            if(this.minimaptoolbar && this.location == '1') {
                document.getElementById('wrapper').style.transform = 'none';
                var rectWrapper = document.getElementById('wrapper').getBoundingClientRect();
                document.getElementById('wrapper').style.transform = 'translate(' +
                                (-(rectWrapper.left + document.documentElement.scrollLeft)) + 'px, ' +
                                (-(rectWrapper.top + document.documentElement.scrollTop)) + 'px)';
                this.connections.forEach((connection) => {
                    if (connection != null) {
                        connection.position()
                    }
                })//connection.position())
            }
         },
        addLine(start, end, iscircle) {
            if(this.minimaptoolbar && this.location == '1') {
                var endSocket = 'left', path = 'straight'

                if (iscircle) {
                    endSocket = 'bottom'
                    path = 'arc'
                }
                /*if (start == end) {
                    this.connections.push (null)
                    this.appendLine.push(null)
                } else {
                    if (!isView) {
                        this.connections.push(null)
                        this.appendLine.push(null)
                        console.log(this.appendLine)
                    } else {*/
                        this.connections.push (
                                LeaderLine.setLine(document.getElementById(start),  document.getElementById(end), {
                                            startPlug: 'disc',
                                            endPlug: 'arrow1',
                                            startSocket: 'auto',
                                            endSocket: endSocket,
                                            endPlugSize: 2,
                                            color: 'rgba(253, 105, 68, 0.5)',
                                            size: 1,
                                            path: path,
                                            hide: !this.$store.state.visibleLine
                        }))
                        this.appendLine.push(document.querySelector('body>.leader-line:last-of-type'))
                        document.getElementById('wrapper').appendChild(this.appendLine[this.appendLine.length-1])
                        //console.log(this.appendLine)
                   /* }
                }*/
            }
        },
        setChangActiveUUID(newUUID, oldUUID) {
            console.log(newUUID + ' / '+ oldUUID)
            if(this.minimaptoolbar && this.location == '1') {
                if (oldUUID != null) {
                    var oldActiveLine = this.$store.getters.getactiveLine(oldUUID)
                    for (let i=0; i< oldActiveLine.length;i++) {
                        if (this.appendLine[oldActiveLine[i]] != null) {
                            document.body.appendChild(this.appendLine[oldActiveLine[i]])
                            this.connections[oldActiveLine[i]].remove()
                            this.connections.splice(oldActiveLine[i], 1, null)
                            this.appendLine.splice(oldActiveLine[i], 1, null)
                        }
                    }
                }
                if (newUUID != null) {
                    var newActiveLine = this.$store.getters.getactiveLine(newUUID)
                    for (let i=0; i< newActiveLine.length;i++) {
                        if (this.appendLine[newActiveLine[i]] != null) {
                            document.body.appendChild(this.appendLine[newActiveLine[i]])
                            this.connections[newActiveLine[i]].remove()
                        }
                        this.changeConnectionLineSplic(newActiveLine[i], newUUID)
                        if (newUUID !== this.$store.getters.getEndLineInfo(newActiveLine[i])) {
                            this.changeLineAppendChild(newActiveLine[i])         
                        } else {
                            this.appendLine.splice(newActiveLine[i], 1, null)
                        }
                        //this.connections[newActiveLine[i]].position()
                    }
                }
            }
        },
        setanimationLine(){//uuid, isactive) {
            /*if(this.minimaptoolbar && this.location == '1' && isactive != null) {
                var activeLine = this.$store.getters.getactiveLine(uuid)
                for (let i=0; i< activeLine.length;i++) {
                    if (this.connections[activeLine[i]] != null && this.$store.getters.getViewLineVisible(activeLine[i])) {
                        if (isactive && this.zoom.value < 0.6) { 
                            this.connections[activeLine[i]].size = 1
                            this.connections[activeLine[i]].color = 'rgba(30, 130, 250, 0.5)'
                        } else if (isactive) {
                            //this.connections[activeLine[i]].dash = {animation: isactive, len: 8, gap: 13}
                            this.connections[activeLine[i]].size = 2
                            this.connections[activeLine[i]].color = 'rgba(253, 105, 68, 1.5)'
                        } else {
                            //this.connections[activeLine[i]].dash = false
                            this.connections[activeLine[i]].size = 1
                            this.connections[activeLine[i]].color = 'rgba(30, 130, 250, 0.5)'
                        }
                    }
                }
            }*/
        },
        dragBackground() {
            //console.log('dragBackground')
            //this.moveline()
        },
        onmouseDown() { //edit dialog했을경우 임의로 activeuuid 값을 넣어줬기 때문에 배경을 누르면 toolbar색이 변하지 않는 이슈
            /*console.log('onmouseDown')
            if ((this.isMouseDiagram == false || this.isMouseDiagram == undefined) && this.drag == true) {
                console.log('1111')
                if (this.$store.state.activeUUID != null) {
                    var treeitem = Object.values(this.$store.getters.gettreeviewitems)
                    var arrelement = treeitem.find(data =>  data.uuid === this.$store.state.activeUUID)
                    // 기존에 setuuid에 가지고 있던 값 z값 낮춰줘야한다.
                    this.setanimationLine(this.$store.state.activeUUID, false)
                    this.$store.commit('setzIndex', {parent:arrelement.parent, uuid: this.$store.state.activeUUID, zindex: 2} )
                    this.$store.commit('setuuid', {uuid: null} )
                }
            }*/
        },
        onScroll() { //wheel을 빠르게 움직이면 line이 제대로 안그려지는데 여기에 moveline 넣으면 잘작동함
            //console.log('onScroll')
            this.changeMinimapView()
            this.moveline()
        },
        changeMinimapView() {
            //console.log('changeMinimapView')
            /*if (this.location == '1') {
                var bodyWidth = document.getElementById('main-view1').scrollWidth+200 //+200해주면 minimap에서 우측으로 갈때 element가 작게 보이는게 좀 나아짐
                var bodyHeight
                // if(this.zoom.value < 0.75) {
                //     bodyHeight = document.getElementById('main-view1').scrollHeight +300
                // } else {
                    bodyHeight = document.getElementById('main-view1').scrollHeight +300
                //}
                var realScaleX = document.getElementsByClassName('mini-map')[0].clientWidth /bodyWidth
                var realScaleY = document.getElementsByClassName('mini-map')[0].clientHeight /bodyHeight

                document.getElementsByClassName('minimap-view')[0].style.transform = `scale(${realScaleX}, ${realScaleY})`
                if(this.zoom.value < 0.75) { // minimap안에서 보여질때, 화면에서 왼쪽으로 이동시 minimap에 다 나타나지 않아서 설정해줌
                    document.getElementsByClassName('minimap-view')[0].style.width = (100 * (realScaleX+0.6-this.zoom.value)) + '%'
                } else {
                    document.getElementsByClassName('minimap-view')[0].style.width = (100 * realScaleX) + '%'
                }
                document.getElementsByClassName('minimap-view')[0].style.height = (100 * realScaleY) + '%'
            }*/
        },
        onmouseWheel(e) {
            //console.log('onmouseWheel   '+ e.shiftKey)
            //this.moveline()
            if (!e.shiftKey) {
                return
            }
            e.preventDefault()
            var scale 
            if (e.deltaY < 0) {
                scale = this.zoom.value >= this.zoom.max ? this.zoom.max : this.zoom.value + this.zoom.step;
            } else if (e.deltaY > 0) {
                scale = this.zoom.value <= this.zoom.min ? this.zoom.min : this.zoom.value - this.zoom.step;
            }
            this.$store.commit('setZoomInOut', {valueMain: scale, valueDetail: null})
            // this.$nextTick(() => {
            //     this.changeMinimapView()
            //     //console.log('wheel')
            //     setTimeout(() => {this.moveline()}, 200) //선이 똑바로 그려지지가 않아서 한타이밍 늦게 느려주게 구현
            // })
            /*if (e.deltaY < 0) {
                this.zoom.value = this.zoom.value >= this.zoom.max ? this.zoom.max : this.zoom.value + this.zoom.step;
            } else  if (e.deltaY > 0) {
                this.zoom.value = this.zoom.value <= this.zoom.min ? this.zoom.min : this.zoom.value - this.zoom.step;
            }
            */
            /*
            console.log(e.pageX +'  /  '+ e.pageY +'  /  '+e.clientX +'  /  '+e.clientY)
            var delta = e.delta || e.wheelDelta;
            var mainviewE = document.getElementById("main-view")
            if (delta === undefined) {
                delta = e.originalEvent.detail;
            }
            delta = Math.max(-1,Math.min(1,delta))
            var offset = {x: mainviewE.scrollLeft, y: mainviewE.scrollTop};
            var ele_loc = {x: e.pageX + offset.x-200, y: e.pageY + offset.y-72}
            var scale = this.zoom.value
            var zoom_point = {x:ele_loc.x/scale, y: ele_loc.y/scale}
            scale += delta*this.zoom.step * scale
            scale = Math.max(this.zoom.min,Math.min(this.zoom.max,scale))

            var zoom_point_new = {x:zoom_point.x * scale, y: zoom_point.y * scale}
            var newScroll = {x: zoom_point_new.x - e.pageX+200, y: zoom_point_new.y - e.pageY+72}
            //document.getElementById('sea').style.transform = `scale(${scale}, ${scale})`  
            mainviewE.scrollLeft = newScroll.x
            mainviewE.scrollTop = newScroll.y
            this.zoom.value = scale
            this.$store.commit('setZoomInOut', {valueMain: this.zoom.value, valueDetail: null})
            this.$nextTick(() => {
                this.changeMinimapView()
                console.log('wheel')
                setTimeout(() => {this.moveline()}, 200) //선이 똑바로 그려지지가 않아서 한타이밍 늦게 느려주게 구현
            })
            */
        },
        changeLineAppendChild(idx) {
            if (this.connections[idx] != null) {
                this.appendLine.splice(idx, 1, document.querySelector('body>.leader-line:last-of-type'))
                document.getElementById('wrapper').appendChild(this.appendLine[idx])
            }
        },
        changeConnectionLineSplic(idx, start) {
            //같은 category에서는 상관없는데 category가 달라지면 문제
            var elmEndTarget = this.$store.getters.getEndLineInfo(idx)
            if (start === elmEndTarget) {
                this.connections.splice(idx, 1, null)
            } else {
                this.connections.splice(idx, 1, LeaderLine.setLine(document.getElementById(start),  document.getElementById(elmEndTarget), {
                                            startPlug: 'disc',
                                            endPlug: 'arrow1',
                                            startSocket: 'auto',
                                            endSocket: 'auto',
                                            endPlugSize: 2,
                                            color: 'rgba(253, 105, 68, 0.5)',
                                            size: 1,
                                            path: 'straight',
                                            hide: !this.$store.state.visibleLine
                }))
            }
        },
        drawLineCloseTitlebar(uuid) {
            if(this.minimaptoolbar && this.location == '1' && uuid == this.$store.state.activeUUID) {
                var activeLine = this.$store.getters.getactiveLine(uuid)
                for (let i=0; i< activeLine.length;i++) {
                    //console.log(activeLine)
                    if (this.appendLine[activeLine[i]] != null) {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                    }
                    this.changeConnectionLineSplic(activeLine[i], uuid)
                    if (uuid != this.$store.getters.getEndLineInfo(activeLine[i])) {
                        this.changeLineAppendChild(activeLine[i])         
                    } else {
                        this.appendLine.splice(activeLine[i], 1, null)
                    }
                }
            }
        },
        drawLineOpenTitlebar(uuid) {
            console.log(uuid + ' ?? '+ this.$store.state.activeUUID)
            if(this.minimaptoolbar && this.location == '1' && uuid == this.$store.state.activeUUID) {
                var activeLine = this.$store.getters.getactiveLine(uuid)
                var startLine
                for (let i=0; i< activeLine.length;i++) {
                    startLine = this.$store.getters.getStartLineInfo(activeLine[i]) 
                    var startUUID = startLine.split('/')
                    var tableLine = startUUID[1].split('-')
                    //tab이 아닌 애들만 선그리기
                    if (!(tableLine[0] == 'iamM' || tableLine[0] == 'field' || tableLine[0] == 'eventtab' || tableLine[0] == 'argtable' || tableLine[0] == 'methoderrors' || tableLine[0] == 'methoderror' ||
                        tableLine[0] == 'requiredEventG' || tableLine[0] == 'requiredClient' || tableLine[0] == 'e2ePro' || tableLine[0] == 'e2eEvent' || tableLine[0] == 'e2eProM' || tableLine[0] == 'e2eMethod' || 
                        tableLine[0] == 'providEventG' || tableLine[0] == 'providServer' || tableLine[0] == 'e2ePropro' || tableLine[0] == 'e2eEventpro' || tableLine[0] == 'e2eProMpro' || tableLine[0] == 'e2eMethodpro' || 
                        tableLine[0] == 'edcontext' || tableLine[0] == 'edtarget' || tableLine[0] == 'fgcontext' || tableLine[0] == 'fgtarget' ||
                        tableLine[0] == 'processfromptmm' || tableLine[0] == 'machinefromptmm' || tableLine[0] == 'runOn' ||
                        tableLine[0] == 'processresorce' || tableLine[0] == 'processstartup' || tableLine[0] == 'comconet' || tableLine[0] == 'PERKeyV' ||
                        tableLine[0] == 'PPortI' || tableLine[0] == 'pportQSC' || tableLine[0] == 'pportFSC' || tableLine[0] == 'pportSC' || tableLine[0] == 'PRPortI' || tableLine[0] == 'prporttab' || 
                        tableLine[0] == 'RPortI' || tableLine[0] == 'rportQRC' || tableLine[0] == 'rportCC' || tableLine[0] == 'rportCCG' || tableLine[0] == 'rportCCS')) {
                        if (this.appendLine[activeLine[i]] != null) {
                            document.body.appendChild(this.appendLine[activeLine[i]])
                            this.connections[activeLine[i]].remove()
                        }
                        if(tableLine[0] == 'ddpccompu' || tableLine[0] == 'ddpcdata'){ //implementation에서 table에 ref가 두개라..
                            tableLine[0] = 'DDPC'
                        } 
                        this.changeConnectionLineSplic(activeLine[i], uuid+'/'+tableLine[0])
                        this.changeLineAppendChild(activeLine[i]) 
                    }
                }
            }
        },
        drawLinTabMoveSomeIPServeice(item, uuid, idx, tabID, str1) {
            console.log(item+uuid+ idx+ tabID+ str1)
            console.log('drawLinTabMoveSomeIPServeice')
            /*if(this.minimaptoolbar && this.location == '1') {
                var activeLine = this.$store.getters.getactiveLine(uuid)
                var startLine
                //console.log(activeLine)
                for (let i=0; i< activeLine.length;i++) {
                    startLine = this.$store.getters.getStartLineInfo(activeLine[i]) 
                    var startUUID = startLine.split('/')
                    var tableLine = startUUID[1].split('-')
                    //console.log(tableLine[0]+' / '+ item + ' / '+tableLine[2]+' / '+ tableLine[3])
                    //console.log(str1+' / '+ str2)
                    if (tableLine[0] == 'field' && item == 'field') {
                        //console.log('/field')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]){
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/fieldtab'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/field')
                        }
                        this.changeLineAppendChild(activeLine[i])
                    } else if (tableLine[0] == 'eventtab' && item == 'event') {
                        if (this.appendLine[activeLine[i]] != null){
                            document.body.appendChild(this.appendLine[activeLine[i]])
                            this.connections[activeLine[i]].remove()
                        }
                        //console.log('/event')
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/eventtab'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/event')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'argtable' ) {
                        //console.log('/argtable')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/argtable'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methods')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'methoderrors') {
                        //console.log('/methoderrors')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methoderrors'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methods')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'methoderror') {
                        //console.log('/methoderror')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methoderror'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methods')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'requiredEventG' && item == 'requiredEvent') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/requiredEventG-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/requiredE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'requiredClient' && item == 'requiredEvent') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/requiredClient-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/requiredE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'e2ePro' && item == 'E2EEvent') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/e2ePro-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/E2EE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'e2eEvent' && item == 'E2EEvent') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/e2eEvent-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/E2EE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'e2eProM' && item == 'E2EMethod') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/e2eProM-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/E2EM')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'e2eMethod' && item == 'E2EMethod') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/e2eMethod-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/E2EM')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'e2ePropro' && item == 'E2EEvent') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/e2ePropro-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/E2EEpro')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'e2eEventpro' && item == 'E2EEvent') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/e2eEventpro-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/E2EEpro')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'e2eProMpro' && item == 'E2EMethod') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/e2eProMpro-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/E2EMpro')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'e2eMethodpro' && item == 'E2EMethod') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/e2eMethodpro-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/E2EMpro')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'providEventG' && item == 'ProvidEvent') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/providEventG-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/providE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'providServer' && item == 'ProvidEvent') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/providServer-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/providE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'fgcontext') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/fgtable'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'fgtarget') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/fgtable'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'edcontext') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/edtable'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'edtarget') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/edtable'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'processresorce') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processresorce'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'processstartup') {
                        //console.log('processstartup')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processstartup'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'comconet' && item == 'connector') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[2] && tabID == tableLine[3]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/comconet-'+idx+'-'+tabID)
                        } else if (idx != tableLine[2] && tabID == tableLine[3]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/channel-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/conditional')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'comconet' && item == 'channel') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[3]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/channel-'+idx)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/conditional')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'comconet' && item == 'conditional') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        this.changeConnectionLineSplic(activeLine[i], uuid+'/conditional')
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'PERKeyV' && item == 'PERKeyV') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[1]){
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/PERDBImple'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/PERKeyV')
                        }
                        this.changeLineAppendChild(activeLine[i])
                    } else if (tableLine[0] == 'PPortI' && item == 'pport') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/PPortI-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/pport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'PRPortI' && item == 'prport') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/PRPortI-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/prport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'RPortI' && item == 'rport') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/RPortI-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/rport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'pportQSC' && item == 'pport') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/pportQSC-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/pport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'pportFSC' && item == 'pport') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/pportFSC-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/pport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'pportSC' && item == 'pport') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/pportSC-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/pport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'prporttab' && item == 'prport') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/prporttab-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/prport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'rportQRC' && item == 'rport') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/rportQRC-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/rport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if ((tableLine[0] == 'rportCC' && item == 'rport') || 
                               (tableLine[0] == 'rportCCG' && item == 'rport') ||
                               (tableLine[0] == 'rportCCS' && item == 'rport') ) {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/rportCC-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/rport')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'iamM') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2] && str1) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/grandtab-'+tabID)
                        } else if (item == 'module'){ // iam module 가 close일때
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/iamM')
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/moduleIns')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'processfromptmm') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processfromptmm-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/proMapping')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'machinefromptmm') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/machinefromptmm-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/proMapping')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'runOn') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabID == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/runOn-'+tabID)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/proMapping')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } 
                }
                //console.log(this.appendLine)
                this.$nextTick(() => {
                    if (this.$store.state.activeUUID == uuid) {
                        this.setanimationLine(uuid, true)
                    }
                    this.moveline()
                })
            }*/
        },
        startProgress() {
            this.$store.commit('setLoadingImport', {setProgress: true})
            this.isMainviewClick = true
        },
        selectInputElement() {
            var propsParnt = this.$refs.editTable.getCheckedProp("parent")
            var propsUUID = this.$refs.editTable.getCheckedProp("uuid")
            var propsName = this.$refs.editTable.getCheckedProp("name")
            var selectElement = []
            propsUUID.forEach((id,i) => {
                if (id != propsName[i]) {
                    selectElement.push({uuid:id, parent:propsParnt[i]})
                }
            })
            console.log(selectElement)
            this.$store.commit('setEditInputItem', {selectList: selectElement, select: true})
        },
        cancelInputElement() {
            this.$store.commit('setEditInputItem', {select: false})
            this.dialogSelectElement = false  
        },
        // setOpenList() {
        //     this.editInputList[0].children.forEach(item => {
        //         item.children.forEach(data => {
        //             if(data.children != null && data.children.length > 0) {
        //                 data.children.forEach(ele => {
        //                     if (item.name != constant.Platform_str) {
        //                         if(!this.openIds.some(num => num === ele)){
        //                             this.openIds.push(ele)
        //                         }
        //                         if(!this.openIds.some(num => num === data)){
        //                             this.openIds.push(data)
        //                         }
        //                         if(!this.openIds.some(num => num === item)){
        //                             this.openIds.push(item)
        //                         }
        //                         data.locked = false
        //                         item.locked = false
        //                     } else {
        //                         if(ele.children != null && ele.children.length > 0) {
        //                             ele.children.forEach(plat => {
        //                                 if(!this.openIds.some(num => num === plat)){
        //                                     this.openIds.push(plat)
        //                                 }
        //                                 if(!this.openIds.some(num => num === ele)){
        //                                     this.openIds.push(ele)
        //                                 }
        //                                 if(!this.openIds.some(num => num === data)){
        //                                     this.openIds.push(data)
        //                                 }
        //                                 if(!this.openIds.some(num => num === item)){
        //                                     this.openIds.push(item)
        //                                 }
        //                                 data.locked = false
        //                                 ele.locked = false
        //                                 item.locked = false
        //                             })
        //                         }
        //                     }
        //                 })
        //             }
        //         })
        //     })
        // },
    },
}
</script>