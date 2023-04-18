/* global QUnit, sinon */

sap.ui.define([
	"sap/ui/core/Core",
	"sap/ui/mdc/Chart",
    "sap/ui/mdc/chart/Item",
	"sap/ui/core/UIComponent",
	"sap/ui/core/ComponentContainer",
    "delegates/odata/v4/vizChart/ChartDelegate",
    "sap/chart/Chart",
    "sap/m/VBox",
    "sap/ui/mdc/chart/PropertyHelper",
    "sap/ui/mdc/chart/ChartImplementationContainer"
],
function(
	Core,
	Chart,
    Item,
	UIComponent,
	ComponentContainer,
    ChartDelegate,
    SapChart,
    VBox,
    ChartPropertyHelper,
    ChartImplementationContainer
) {
    "use strict";

    var sandbox;
    var sDelegatePath = "test-resources/sap/ui/mdc/delegates/ChartDelegate";

    var getLayoutConfig = function() {

        return [
            {
                "key": "column",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "bar",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "line",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "combination",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "pie",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "donut",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_column",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_bar",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_line",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "stacked_bar",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "scatter",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "bubble",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "axis3",
                    "category",
                    "series"
                ]
            },
            {
                "key": "heatmap",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "category2"
                ]
            },
            {
                "key": "bullet",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "vertical_bullet",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_stacked_bar",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "100_stacked_bar",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "stacked_column",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_stacked_column",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "100_stacked_column",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_combination",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_horizontal_combination",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_horizontal_combination",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_stacked_combination",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "dual_horizontal_stacked_combination",
                "allowedLayoutOptions": [
                    "axis1",
                    "axis2",
                    "category",
                    "series"
                ]
            },
            {
                "key": "stacked_combination",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "100_dual_stacked_bar",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "100_dual_stacked_column",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "horizontal_stacked_combination",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ]
            },
            {
                "key": "waterfall",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "category2"
                ]
            },
            {
                "key": "horizontal_waterfall",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "category2"
                ]
            }
        ];
    };

	QUnit.module("sap.ui.mdc.delegate.odata.v4.vizChart.ChartDelegate: State Handling", {

		beforeEach: function() {
			var TestComponent = UIComponent.extend("test", {
				metadata: {
					manifest: {
						"sap.app": {
							"id": "",
							"type": "application"
						}
					}
				},
				createContent: function() {
					return new Chart("IDChart", {delegate: {
                        name: sDelegatePath,
					    payload: {
						collectionPath: "/testPath"
						}}
					});
				}
			});
			this.oUiComponent = new TestComponent("IDComponent");
			this.oUiComponentContainer = new ComponentContainer({
				component: this.oUiComponent,
				async: false
			});
            this.oMDCChart = this.oUiComponent.getRootControl();

			this.oUiComponentContainer.placeAt("qunit-fixture");
			Core.applyChanges();

		},
		afterEach: function() {
			this.oUiComponentContainer.destroy();
			this.oUiComponent.destroy();

            ChartDelegate._deleteState(this.oMDCChart);
		}

    });

	QUnit.test("exit", function(assert) {
		assert.ok(true);
	});

    QUnit.test("_getState", function(assert) {
		assert.equal(ChartDelegate._getState(this.oMDCChart), undefined, "Undefined returned for empty state");
	});

    QUnit.test("_setState", function(assert) {
		assert.equal(ChartDelegate._getState(this.oMDCChart), undefined, "Undefined returned for empty state");

        var testData = {test: "Test123"};
        ChartDelegate._setState(this.oMDCChart, testData);
        assert.equal(ChartDelegate._getState(this.oMDCChart), testData, "State correctly set");
	});

    QUnit.test("_setInnerStructure", function(assert) {
		assert.equal(ChartDelegate._getState(this.oMDCChart), undefined, "Undefined returned for empty state");

        var testData = {test: "Test123"};
        ChartDelegate._setInnerStructure(this.oMDCChart, testData);
        assert.equal(ChartDelegate._getState(this.oMDCChart).innerStructure, testData, "State correctly set");
	});

    QUnit.test("_setBindingInfoForState", function(assert) {
		assert.equal(ChartDelegate._getState(this.oMDCChart), undefined, "Undefined returned for empty state");

        var testData = {test: "Test123"};
        ChartDelegate._setBindingInfoForState(this.oMDCChart, testData);
        assert.equal(ChartDelegate._getState(this.oMDCChart).bindingInfo, testData, "State correctly set");
	});

    QUnit.test("_setUpChartObserver", function(assert) {
		assert.equal(ChartDelegate._getState(this.oMDCChart), undefined, "Undefined returned for empty state");

        ChartDelegate._setState(this.oMDCChart, {});
        ChartDelegate._setUpChartObserver(this.oMDCChart);
        assert.equal(ChartDelegate._getState(this.oMDCChart).observer.getMetadata()._sClassName, 'sap.ui.base.ManagedObjectObserver', "Observer is setup");
	});

    QUnit.module("sap.ui.mdc.delegate.odata.v4.vizChart.ChartDelegate: General Functions", {

		beforeEach: function() {
			var TestComponent = UIComponent.extend("test", {
				metadata: {
					manifest: {
						"sap.app": {
							"id": "",
							"type": "application"
						}
					}
				},
				createContent: function() {
					return new Chart("IDChart", {delegate: {
                        name: sDelegatePath,
                        inResultDimensions: ["Dimension2"],
					    payload: {
						    collectionPath: "/testPath"
						}}
					});
				}
			});
			this.oUiComponent = new TestComponent("IDComponent");
			this.oUiComponentContainer = new ComponentContainer({
				component: this.oUiComponent,
				async: false
			});
            this.oMDCChart = this.oUiComponent.getRootControl();

			this.oUiComponentContainer.placeAt("qunit-fixture");
			Core.applyChanges();

            this.oInnerStructure = new VBox();
            this.oInnerChart = new SapChart();

            var oState = {
                innerStructure: this.oInnerStructure,
                innerChart: this.oInnerChart
            };

            ChartDelegate._setState(this.oMDCChart, oState);

            sandbox = sinon.sandbox.create();
		},
		afterEach: function() {
			this.oUiComponentContainer.destroy();
			this.oUiComponent.destroy();

            ChartDelegate._deleteState(this.oMDCChart);
            sandbox.restore();
		}

    });

    QUnit.test("exit", function(assert) {
		var oInnerDestroySpy = sinon.spy(this.oInnerStructure, "destroy");
        var oDeleteSpy = sinon.spy(ChartDelegate, "_deleteState");

        ChartDelegate.exit(this.oMDCChart);
        ChartDelegate.exit({getId: function(){}});

        assert.ok(oInnerDestroySpy.calledOnce, "Inner structure destroy was called once");
        assert.ok(oDeleteSpy.calledTwice, "State deletion was called twice");
	});

    QUnit.test("zoomIn zoomOut getZoomState", function(assert) {
		var oZoomSpy = sinon.spy(this.oInnerChart, "zoom");
        var oZoomInfoSpy = sinon.spy(this.oInnerChart, "getZoomInfo");

        ChartDelegate.zoomIn(this.oMDCChart);
        assert.ok(oZoomSpy.calledOnce, "Zoom was called once");

        ChartDelegate.zoomOut(this.oMDCChart);
        assert.ok(oZoomSpy.calledTwice, "Zoom was called twice");

        ChartDelegate.getZoomState(this.oMDCChart);
        assert.ok(oZoomInfoSpy.calledOnce, "getZoomState called on inner chart");

        //Should not call anything with missing MDC Chart reference
        ChartDelegate.zoomIn();
        ChartDelegate.zoomOut();
        ChartDelegate.getZoomState();
        assert.ok(oZoomSpy.calledTwice, "Zoom was called twice");
        assert.ok(oZoomInfoSpy.calledOnce, "getZoomState called on inner chart");
	});

    QUnit.test("getAdaptionUI", function(assert) {
        var done = assert.async();

        assert.ok(ChartDelegate._aChartTypeLayout === undefined, "No layout config cached initially");
		assert.equal(JSON.stringify(ChartDelegate.getChartTypeLayoutConfig()), JSON.stringify(getLayoutConfig()), "Layout config is correct");
        assert.ok(ChartDelegate._aChartTypeLayout, "Layout config now cached");

        ChartDelegate.getAdaptionUI(this.oMDCChart).then(function(oChartPanel){
            var oExpPanelConfig = {
                "key": "column",
                "allowedLayoutOptions": [
                    "axis1",
                    "category",
                    "series"
                ],
                "templateConfig": [
                    {
                        "kind": "Groupable"
                    },
                    {
                        "kind": "Aggregatable"
                    }
                ]
            };

            assert.ok(oChartPanel, "Panel was returned");
            assert.equal(JSON.stringify(oChartPanel.getPanelConfig()), JSON.stringify(oExpPanelConfig), "Panel config is correct");

            done();
        });
	});

    QUnit.test("setLegendVisible", function(assert) {
        ChartDelegate.setLegendVisible(this.oMDCChart, false);
        assert.ok(!this.oInnerChart.getVizProperties().legend.visible, "Legend is set invisible");
        assert.ok(!this.oInnerChart.getVizProperties().sizeLegend.visible, "Legend is set invisible");

        ChartDelegate.setLegendVisible(this.oMDCChart, true);
        assert.ok(this.oInnerChart.getVizProperties().legend.visible, "Legend is set visible");
        assert.ok(this.oInnerChart.getVizProperties().sizeLegend.visible, "Legend is set visible");
    });

    // QUnit.test("getSorterForItem", function(assert) {
    //     var oAggrItem = new Item("aggrItem", {name: "Item1", type: "aggregatable"});
    //     var oGroupItem = new Item("groupItem", {name: "Item2", type: "groupable"});

    //     this.oMDCChart.addItem(oAggrItem);
    //     this.oMDCChart.addItem(oGroupItem);

    //     var oAggrSorter = ChartDelegate.getSorterForItem(oAggrItem, {descending: true});
    //     var oGroupSorter = ChartDelegate.getSorterForItem(oGroupItem, {name: "Item2", descending: true});
    //     assert.ok(oAggrSorter, "Sorter returned");
    //     assert.ok(oGroupSorter, "Sorter returned");

    // });

    QUnit.test("insertItemToInnerChart function", function(assert) {
        sandbox.stub(ChartDelegate, "getPropertyFromNameAndKind").returns(undefined);
        assert.ok(this.oInnerChart.getVisibleDimensions().length === 0, "Visible dimensions are empty");
        assert.ok(this.oInnerChart.getVisibleMeasures().length === 0, "Visible dimensions are empty");

        var oAggrItem = new Item("aggrItem", {name: "Item1", type: "aggregatable", label: "Label"});
        var oGroupItem = new Item("groupItem", {name: "Item2", type: "groupable", label: "Label"});

        this.oMDCChart.addItem(oAggrItem);
        this.oMDCChart.addItem(oGroupItem);

        ChartDelegate.insertItemToInnerChart(this.oMDCChart, oAggrItem, 0);
        ChartDelegate.insertItemToInnerChart(this.oMDCChart, oGroupItem, 0);

        assert.ok(this.oInnerChart.getVisibleDimensions().includes("Item2"), "Visible dimensions are set up correctly");
        assert.ok(this.oInnerChart.getVisibleDimensions().length === 1, "Visible dimensions are set up correctly");
        assert.ok(this.oInnerChart.getVisibleMeasures().includes("Item1"), "Visible measures are set up correctly");
        assert.ok(this.oInnerChart.getVisibleMeasures().length === 1, "Visible measures are set up correctly");

    });

    QUnit.test("_createMDCChartItem function", function(assert) {
        var done = assert.async();
        var oStub = sandbox.stub(this.oMDCChart, "_getPropertyByNameAsync");
        oStub.withArgs("Item1").returns(Promise.resolve({
            name: "Item1",
            groupable: true,
            label: "Label 1"
        }));
        oStub.withArgs("Item2").returns(Promise.resolve({
            name: "Item2",
            aggregatable: true,
            label: "Label 2"
        }));

        ChartDelegate._createMDCChartItem("Item1", this.oMDCChart).then(function(oItemGroup){
            ChartDelegate._createMDCChartItem("Item2", this.oMDCChart).then(function(oItemAggr){
                assert.ok(oItemGroup, "Grouped Item was created");
                assert.equal(oItemGroup.getName(), "Item1", "Name is correct");
                assert.equal(oItemGroup.getType(), "groupable", "Type is correct");
                assert.equal(oItemGroup.getLabel(), "Label 1", "Label is correct");
                assert.ok(oItemAggr, "Aggregated Item was created");
                assert.equal(oItemAggr.getName(), "Item2", "Name is correct");
                assert.equal(oItemAggr.getType(), "aggregatable", "Type is correct");
                assert.equal(oItemAggr.getLabel(), "Label 2", "Label is correct");

                done();
            });
        }.bind(this));
    });


    QUnit.test("getInnerChart", function(assert) {
        assert.equal(ChartDelegate.getInnerChart(this.oMDCChart), this.oInnerChart, "Inner chart is returned");
    });

    QUnit.test("getChartTypeInfo", function(assert) {

        var oExpectedChartTypeInfo = {
            "icon": "sap-icon://vertical-bar-chart",
            "text": "Selected Chart Type: Column Chart"
        };

        assert.equal(JSON.stringify(ChartDelegate.getChartTypeInfo(this.oMDCChart)), JSON.stringify(oExpectedChartTypeInfo), "Expected Chart Type info was returned");
    });

    QUnit.test("getDrillableItems", function(assert) {

        var oAggrItem = new Item("aggrItem", {name: "Item1", type: "aggregatable"});
        var oGroupItem = new Item("groupItem1", {name: "Item2", type: "groupable"});
        var oGroupItem2 = new Item("groupItem2", {name: "Item3", type: "groupable"});

        this.oMDCChart.addItem(oAggrItem);
        this.oMDCChart.addItem(oGroupItem);
        this.oMDCChart.addItem(oGroupItem2);

        var aDrillableItems = ChartDelegate.getDrillableItems(this.oMDCChart);
        assert.equal(aDrillableItems.length, 2, "Two items should be returned");
        assert.equal(aDrillableItems[0], oGroupItem, "Correct item returned");
        assert.equal(aDrillableItems[1], oGroupItem2, "Correct item returned");
    });

    QUnit.test("setChartType", function(assert) {

        var oSetSpy = sinon.spy(this.oInnerChart, "setChartType");

        ChartDelegate.setChartType(this.oMDCChart, "bar");

        assert.ok(oSetSpy.calledWith("bar"), "bar", "SetChart type was called on inner chart");
    });

    QUnit.test("requestToolbarUpdate", function(assert) {
        //MDC Chart with no item should result in avoiding to call renderComplete
        ChartDelegate.requestToolbarUpdate(this.oMDCChart);

        assert.ok(!ChartDelegate._getState(this.oMDCChart).toolbarUpdateRequested, "Request not set");

        //MDC Chart with items should result in request being set
        var oAggrItem = new Item("aggrItem", {name: "Item1", type: "aggregatable"});
        var oGroupItem = new Item("groupItem", {name: "Item2", type: "groupable"});

        this.oMDCChart.addItem(oAggrItem);
        this.oMDCChart.addItem(oGroupItem);

        ChartDelegate.requestToolbarUpdate(this.oMDCChart);

        assert.ok(ChartDelegate._getState(this.oMDCChart).toolbarUpdateRequested, "Request successfully set");
    });

    QUnit.test("getBindingInfo", function(assert) {
        var oDelegate = {
            payload: {
                collectionName: "TestCollection"
            }
        };
        sandbox.stub(this.oMDCChart, "getDelegate").returns(oDelegate);

        assert.equal(ChartDelegate.getBindingInfo(this.oMDCChart).path, "/TestCollection", "Correct path returned");
    });

    /**Not implemented yet**/

    QUnit.test("getTypeMap", function(assert) {
        assert.ok(true, "This must be implemented by custom delegate");
    });

    QUnit.test("getFilterDelegate", function(assert) {
        assert.ok(true, "This must be implemented by custom delegate");
    });

    QUnit.test("addCondition", function(assert) {
        assert.ok(true, "This must be implemented by custom delegate");
    });

    QUnit.test("removeCondition", function(assert) {
        assert.ok(true, "This must be implemented by custom delegate");
    });

    QUnit.test("_setChart & _getChart", function(assert) {
        ChartDelegate._setChart(this.oMDCChart, "ABC");
        assert.equal(ChartDelegate._getChart(this.oMDCChart), "ABC", "Correct internal state was returned by _getChart");
    });

    QUnit.test("_setInnerStructure & _getInnerStructure", function(assert) {
        ChartDelegate._setInnerStructure(this.oMDCChart, "ABC");
        assert.equal(ChartDelegate._getInnerStructure(this.oMDCChart), "ABC", "Correct internal state was returned by _getChart");
    });

    QUnit.test("getInnerChartSelectionHandler", function(assert) {
        ChartDelegate._setChart(this.oMDCChart, "ABC");

        var oSelectionHandler = ChartDelegate.getInnerChartSelectionHandler(this.oMDCChart);

        assert.ok(oSelectionHandler, "Selection Hanlder returned");
        assert.equal(oSelectionHandler.eventId, "_selectionDetails", "Correct eventId");
        assert.equal(oSelectionHandler.listener, "ABC", "Correct listener returned");
    });

    QUnit.test("removeItemFromInnerChart", function(assert) {

        var oInnerChartMock = {getVisibleDimensions: function(){return ["Dimension3", "Dimension1", "Dimension2"];}, getVisibleMeasures: function(){return ["Measure3", "Measure1", "Measure2"];}, setVisibleDimensions: function(){}, setVisibleMeasures: function(){}, getMeasureByName: function(){}, removeMeasure: function(){}};

        ChartDelegate._setChart(this.oMDCChart, oInnerChartMock);
        ChartDelegate._getState(this.oMDCChart).inResultDimensions = [];
        sandbox.stub(ChartDelegate, "_updateColoring");
        sandbox.stub(ChartDelegate, "_updateSemanticalPattern");

        var oSetVisibleDimensionSpy = sinon.spy(oInnerChartMock, "setVisibleDimensions");
        var oSetVisibleMeasuresSpy = sinon.spy(oInnerChartMock, "setVisibleMeasures");

        var oDim = new Item({name: "Dimension1", type: "groupable"});
        var oMeas1 = new Item({name: "Measure1", type: "aggregatable"});
        var oMeas2 = new Item({name: "Measure2", type: "aggregatable"});
        var oMeas3 = new Item({name: "Measure3", type: "aggregatable"});

        this.oMDCChart.addItem(oDim);
        this.oMDCChart.addItem(oMeas3);
        this.oMDCChart.addItem(oMeas1);
        this.oMDCChart.addItem(oMeas2);

        ChartDelegate.removeItemFromInnerChart(this.oMDCChart, oDim);
        ChartDelegate.removeItemFromInnerChart(this.oMDCChart, oMeas1);

        assert.ok(oSetVisibleDimensionSpy.calledWithExactly(["Dimension3", "Dimension2"]), "Dimension were set correctly");
        assert.ok(oSetVisibleMeasuresSpy.calledWithExactly(["Measure3", "Measure2"]), "Measure were set correctly");

    });

    QUnit.test("addItem", function(assert) {
        var done = assert.async();
        var oCreateSpy = sinon.spy(ChartDelegate, "_createMDCChartItem");
        sandbox.stub(ChartDelegate, "_getPropertyInfosByName").returns(Promise.resolve(undefined));

        ChartDelegate.addItem(this.oMDCChart, "ABC").then(function(){
            assert.ok(oCreateSpy.called, "Create was called");
            done();
        });

    });

    QUnit.test("removeItem", function(assert) {
        var done = assert.async();

        ChartDelegate.removeItem().then(function(oReturnValue){
            assert.ok(oReturnValue, "Return value is set to true");
            done();
        });
    });

    QUnit.test("checkAndUpdateMDCItems", function(assert) {
        var done = assert.async();

        var oDim = new Item({name: "Dimension1", type: "groupable", label: "Dim1"});
        var oMeas = new Item({name: "Measure1", type: "aggregatable"});

        this.oMDCChart.addItem(oDim);
        this.oMDCChart.addItem(oMeas);

        var oLabelSpyDim = sinon.spy(oDim, "setLabel");
        var oRoleSpyDim = sinon.spy(oDim, "setRole");
        var oLabelSpyMeas = sinon.spy(oMeas, "setLabel");
        var oRoleSpyMeas = sinon.spy(oMeas, "setRole");

        var oStub = sandbox.stub(this.oMDCChart, "_getPropertyByNameAsync");
        oStub.withArgs("Dimension1").returns(Promise.resolve({
            name: "Dimension1",
            groupable: true,
            label: "Label 1"
        }));
        oStub.withArgs("Measure1").returns(Promise.resolve({
            name: "Measure1",
            aggregatable: true,
            label: "Label 2"
        }));

        ChartDelegate.checkAndUpdateMDCItems(this.oMDCChart).then(function(){

            assert.ok(!oLabelSpyDim.calledWithExactly("Dim1"), "Dimension label was changed");
            assert.ok(oRoleSpyDim.calledWithExactly("category"), "Role set to category");
            assert.ok(oLabelSpyMeas.calledWithExactly("Label 2"), "Label was set");
            assert.ok(oRoleSpyMeas.calledWithExactly("axis1"), "Role was set to axis1");

            done();
        });

    });

    QUnit.test("_createMDCChartItem", function(assert) {
        var done = assert.async();
        var oStub = sandbox.stub(this.oMDCChart, "_getPropertyByNameAsync");
        oStub.withArgs("Dimension1").returns(Promise.resolve({
            name: "Dimension1",
            groupable: true,
            label: "Label 1"
        }));

        ChartDelegate._createMDCChartItem("Dimension1", this.oMDCChart, "series").then(function(oCreatedItem){
            assert.equal(oCreatedItem.getName(), "Dimension1", "Name is correct");
            assert.equal(oCreatedItem.getType(), "groupable", "Item is groupable");
            assert.equal(oCreatedItem.getRole(), "series", "Role was set correctly");
            assert.equal(oCreatedItem.getLabel(), "Label 1", "Label was set correctly");

            done();
        });
    });

    QUnit.test("initializeInnerChart", function(assert) {
        var done = assert.async();
        this.oMDCChart.setNoDataText("ABCDEFG");
        sandbox.stub(ChartDelegate, "_loadChart").returns(Promise.resolve());

        var oInnerStructSpy = sinon.spy(ChartDelegate, "_setInnerStructure");
        var oObserverSpy = sinon.spy(ChartDelegate, "_setUpChartObserver");

        ChartDelegate.initializeInnerChart(this.oMDCChart).then(function(){

            assert.ok(oInnerStructSpy.called, "InnerStruct wes set");
            assert.ok(oObserverSpy.called, "Observer was setup");

            var oInnerStruct = ChartDelegate._getInnerStructure(this.oMDCChart);
            assert.equal(oInnerStruct.getNoDataContent().getText(), "ABCDEFG", "No data text was set on inner struct");
            assert.ok(this.oMDCChart.hasStyleClass("sapUiMDCChartTempTextOuter"), "MDC Chart has correct style class set");

            done();
        }.bind(this));
    });

    QUnit.test("initializeInnerChart with noData", function(assert) {
        var done = assert.async();
        this.oMDCChart.setNoData(new VBox("testID"));
        sandbox.stub(ChartDelegate, "_loadChart").returns(Promise.resolve());

        ChartDelegate.initializeInnerChart(this.oMDCChart).then(function(){

            var oInnerStruct = ChartDelegate._getInnerStructure(this.oMDCChart);
            assert.equal(oInnerStruct.getChartNoDataContent(), "testID", "Association to noData struct set");

            done();
        }.bind(this));
    });

    QUnit.test("_createContentFromItems", function(assert) {
        var done = assert.async();
        var oInnerChartMock = {getVisibleDimensions: function(){return ["Dimension3", "Dimension1", "Dimension2"];}, getVisibleMeasures: function(){return ["Measure3", "Measure1", "Measure2"];}, setVisibleDimensions: function(){},
                                setVisibleMeasures: function(){}, getMeasureByName: function(){}, removeMeasure: function(){}, addDimension: function(){}, setInResultDimensions: function(){}};

        var oDim = new Item({name: "Dimension1", type: "groupable", label: "Dim1"});
        var oMeas = new Item({name: "Measure1", type: "aggregatable"});

        this.oMDCChart.addItem(oDim);
        this.oMDCChart.addItem(oMeas);

        var oStub = sandbox.stub(this.oMDCChart, "_getPropertyByNameAsync");
        oStub.withArgs("Dimension1").returns(Promise.resolve({
            name: "Dimension1",
            groupable: true,
            label: "Label 1"
        }));
        oStub.withArgs("Dimension2").returns(Promise.resolve({
            name: "Dimension2",
            groupable: true,
            label: "Label 2"
        }));
        oStub.withArgs("Measure1").returns(Promise.resolve({
            name: "Measure1",
            aggregatable: true,
            label: "Label 2"
        }));

        var oColStub = sandbox.stub(ChartDelegate, "_updateColoring");
        var oSemStub = sandbox.stub(ChartDelegate, "_updateSemanticalPattern");
        var oAddDimStub = sandbox.stub(ChartDelegate, "_addInnerDimension");
        var oAddMeasStub = sandbox.stub(ChartDelegate, "_addInnerMeasure");
        var oSetVisDimSpy = sinon.spy(oInnerChartMock, "setVisibleDimensions");
        var oSetVisMeasSpy = sinon.spy(oInnerChartMock, "setVisibleMeasures");
        var oAddDimSpy = sinon.spy(oInnerChartMock, "addDimension");

        ChartDelegate._setState(this.oMDCChart, {innerChart: oInnerChartMock, aColMeasures: [], aInSettings: [], inResultDimensions: []});

        ChartDelegate._loadChart().then(function(){
            ChartDelegate._createContentFromItems(this.oMDCChart).then(function(){
                assert.ok(oAddDimStub.calledOnce, "Dimension add function was called");
                assert.ok(oAddMeasStub.calledOnce, "Measure add function was called");
                assert.ok(oAddDimSpy.calledOnce, "InResult dimension was added");
                assert.ok(oColStub.calledOnce, "Coloring function was called");
                assert.ok(oSemStub.calledOnce, "Semantic function was called");
                assert.ok(oSetVisDimSpy.calledWithExactly(["Dimension1"]), "Visible dimension were set correctly");
                assert.ok(oSetVisMeasSpy.calledWithExactly(["Measure1"]), "Visible measures were set correctly");
                done();
            });
        }.bind(this));

    });

    QUnit.test("_prepareColoringForItem & addCriticality", function(assert) {
        var done = assert.async();

        var oStub = sandbox.stub(this.oMDCChart, "_getPropertyByNameAsync");
        oStub.withArgs("Measure1").returns(Promise.resolve({
            name: "Measure1",
            aggregatable: true,
            label: "Label 2",
            datapoint: {
                criticality : {
                    DynamicThresholds : {
                        usedMeasures : ["Measure2"]
                    }
                }
            }
        }));
        //sandbox.stub(ChartDelegate, "_addCriticality").returns(Promise.resolve());
        ChartDelegate._setState(this.oMDCChart, { aInSettings: [], aColMeasures : [] });

        var oMeas = new Item({name: "Measure1", type: "aggregatable"});
        this.oMDCChart.addItem(oMeas);

        ChartDelegate._prepareColoringForItem(oMeas).then(function(){
            assert.ok(ChartDelegate._getState(this.oMDCChart).aColMeasures.indexOf("Measure2") > -1, "Coloring measure added to state");
            done();
        }.bind(this));
    });

    QUnit.test("_updateColoring", function(assert) {
        var done = assert.async();
        var oInnerChartMock = {setColorings: function(){}, setActiveColoring: function(){}};

        var oStub = sandbox.stub(this.oMDCChart, "_getPropertyByNameAsync");
        oStub.withArgs("Dimension1").returns(Promise.resolve({
            name: "Dimension1",
            groupable: true,
            label: "Label 1",
            criticality: {
                "Positive": [
                    "1"
                ],
                "Critical": [
                    "2"
                ],
                "Negative": [
                    "3"
                ]
            }

        }));
        oStub.withArgs("Measure1").returns(Promise.resolve({
            name: "Measure1",
            aggregatable: true,
            label: "Label 2",
            datapoint: {
                criticality : {
                    DynamicThresholds : {
                        usedMeasures : ["Measure2"]
                    }
                }
            }
        }));

        ChartDelegate._setState(this.oMDCChart, { innerChart: oInnerChartMock, aInSettings: [], aColMeasures : [] });
        var oColorSpy = sinon.spy(oInnerChartMock, "setColorings");
        var oActiveColorSpy = sinon.spy(oInnerChartMock, "setActiveColoring");

        var oMeas = new Item({name: "Measure1", type: "aggregatable"});
        var oDim = new Item({name: "Dimension1", type: "groupable", label: "Dim1"});
        this.oMDCChart.addItem(oMeas);
        this.oMDCChart.addItem(oDim);

        var oCorrectColorConfig = {
            "Criticality": {
                "DimensionValues": {
                    "Dimension1": {
                        "Positive": {
                            "Values": [
                                "1"
                            ]
                        },
                        "Critical": {
                            "Values": [
                                "2"
                            ]
                        },
                        "Negative": {
                            "Values": [
                                "3"
                            ]
                        }
                    }
                }
            }
        };

        var oCorrectActiveColorConfig = {
            "coloring": "Criticality",
            "parameters": {
                "dimension": "Dimension1"
            }
        };

        ChartDelegate._prepareColoringForItem(oMeas).then(function(){
            ChartDelegate._prepareColoringForItem(oDim).then(function(){
                ChartDelegate._updateColoring(this.oMDCChart, ["Dimension1"], ["Measure2"]);

                assert.ok(oColorSpy.calledWithExactly(oCorrectColorConfig), "Color function called on inner chart");
                assert.ok(oActiveColorSpy.calledWithExactly(oCorrectActiveColorConfig), "ActiveColor funciton called on inner chart");
                done();
            }.bind(this));
        }.bind(this));
    });

    QUnit.test("_updateColoring only measure", function(assert) {
        var done = assert.async();
        var oInnerChartMock = {setColorings: function(){}, setActiveColoring: function(){}};

        var oStub = sandbox.stub(this.oMDCChart, "_getPropertyByNameAsync");
        oStub.withArgs("Measure1").returns(Promise.resolve({
            name: "Measure1",
            aggregatable: true,
            label: "Label 2",
            datapoint: {
                criticality : {
                    DynamicThresholds : {
                        usedMeasures : ["Measure2"]
                    }
                }
            }
        }));

        ChartDelegate._setState(this.oMDCChart, { innerChart: oInnerChartMock, aInSettings: [], aColMeasures : [] });
        var oColorSpy = sinon.spy(oInnerChartMock, "setColorings");
        var oActiveColorSpy = sinon.spy(oInnerChartMock, "setActiveColoring");

        var oMeas = new Item({name: "Measure1", type: "aggregatable"});
        this.oMDCChart.addItem(oMeas);

        var oCorrectColorConfig = {
            "Criticality": {
                "MeasureValues": {}
            }
        };

        var oCorrectActiveColorConfig = {
            "coloring": "Criticality",
            "parameters": {
                "measure": [
                    "Measure2"
                ]
            }
        };

        ChartDelegate._prepareColoringForItem(oMeas).then(function(){
            ChartDelegate._updateColoring(this.oMDCChart, ["Dimension1"], ["Measure2"]);

            assert.ok(oColorSpy.calledWithExactly(oCorrectColorConfig), "Color function called on inner chart");
            assert.ok(oActiveColorSpy.calledWithExactly(oCorrectActiveColorConfig), "ActiveColor funciton called on inner chart");
            done();
        }.bind(this));
    });

    QUnit.test("_updateSemanticalPattern", function(assert) {
        var oMeasureMock =  { setSemantics : function(){}, setSemanticallyRelatedMeasures: function(){} };
        var oInnerChartMock = {getVisibleMeasures: function(){return ["Measure1"];}, getMeasureByName: function(){return oMeasureMock;}};

        var oStub = sandbox.stub(ChartDelegate, "getPropertyFromNameAndKind");
        oStub.withArgs("Measure1").returns({
            name: "Measure1",
            aggregatable: true,
            label: "Label 1",
            datapoint: {
                targetValue: "100",
                foreCastValue: "10"
            }
        });

        var oSemanticsSpy = sinon.spy(oMeasureMock, "setSemantics");
        var oRelMeasSpy = sinon.spy(oMeasureMock, "setSemanticallyRelatedMeasures");

        ChartDelegate._setState(this.oMDCChart, { innerChart: oInnerChartMock});

        var oMeas = new Item({name: "Measure1", type: "aggregatable"});
        this.oMDCChart.addItem(oMeas);

        ChartDelegate._updateSemanticalPattern(this.oMDCChart);

        assert.ok(oRelMeasSpy.calledWithExactly({
            referenceValueMeasure: "100",
            projectedValueMeasure: "10"
        }), "SemanticallyRelatedMeasures correctly set");

        assert.ok(oSemanticsSpy.calledThrice, "Semantice have been set thrice (actual, reference, projected)");

        oStub.withArgs("Measure1").returns({
            name: "Measure1",
            aggregatable: true,
            label: "Label 1",
            datapoint: {
                targetValue: "100"
            }
        });

        ChartDelegate._updateSemanticalPattern(this.oMDCChart);
        assert.ok(oRelMeasSpy.calledWithExactly({
            referenceValueMeasure: "100",
            projectedValueMeasure: undefined
        }), "SemanticallyRelatedMeasures correctly set");

        oStub.withArgs("Measure1").returns({
            name: "Measure1",
            aggregatable: true,
            label: "Label 1",
            datapoint: {
                foreCastValue: "10"
            }
        });

        ChartDelegate._updateSemanticalPattern(this.oMDCChart);
        assert.ok(oRelMeasSpy.calledWithExactly({
            referenceValueMeasure: undefined,
            projectedValueMeasure: "10"
        }), "SemanticallyRelatedMeasures correctly set");

    });

    QUnit.test("getAvailableChartTypes", function(assert) {
        var oMockTypes =  {available : [{chart: "bar"}, {chart: "column"}]};
        var oMockChart = {getAvailableChartTypes: function(){return oMockTypes;}};
        ChartDelegate._setState(this.oMDCChart, { innerChart: oMockChart});

        var oChartSpy = sinon.spy(oMockChart, "getAvailableChartTypes");

        var aResult = ChartDelegate.getAvailableChartTypes(this.oMDCChart);

        assert.equal(aResult.length, 2, "2 Chart Types retuened");
        assert.ok(oChartSpy.calledOnce, "Chart types were get from inner chart");
        assert.equal(aResult[0].key, "bar", "First chart type has correct key");
        assert.equal(aResult[1].key, "column", "Second chart type has correct key");

    });

    QUnit.test("getDrillStack", function(assert) {
        var oMockStack =  [{dimension: ["A"]}, {dimension: ["A", "B"]}];
        var oMockChart = {getDrillStack: function(){return oMockStack;}};
        ChartDelegate._setState(this.oMDCChart, { innerChart: oMockChart});

        var oStub = sandbox.stub(ChartDelegate, "getPropertyFromNameAndKind");
        oStub.withArgs("A").returns({
            name: "A"
        });
        oStub.withArgs("B").returns({
            name: "B"
        });

        var oChartSpy = sinon.spy(oMockChart, "getDrillStack");

        var aResult = ChartDelegate.getDrillStack(this.oMDCChart);

        assert.ok(oChartSpy.calledOnce, "DrillStack was called on inner chart");
        assert.equal(aResult.length, 2, "DrillStack has a depth of 2");
        assert.equal(aResult[0].dimension[0], "A", "Correct dimension for depth 1");
        assert.equal(aResult[1].dimension[1], "B", "Correct dimension for depth 2");
    });

    QUnit.test("getSortedDimensions", function(assert) {
        assert.ok(true);
    });

    QUnit.test("_sortPropertyDimensions", function(assert) {
        var aProps = [
            {
                label: "C",
                groupable: true
            },
            {
                label: "D",
                groupable: false
            },
            {
                label: "A",
                groupable: true
            },
            {
                label: "B",
                groupable: true
            }
        ];

        var aRes = ChartDelegate._sortPropertyDimensions(aProps);
        assert.equal(aRes.length, 3, "Measure was filtered out");
        assert.equal(aRes[0].label, "A", "Pos 1 is correct");
        assert.equal(aRes[1].label, "B", "Pos 2 is correct");
        assert.equal(aRes[2].label, "C", "Pos 3 is correct");
    });

    QUnit.test("createInnerChartContent", function(assert) {
        assert.ok(true);
    });

    QUnit.test("_performInitialBind", function(assert) {
        var oMockChart = {bindData: function(){}};
        ChartDelegate._setState(this.oMDCChart, {innerChart: oMockChart, dataLoadedCallback: function(){}, innerStructure: new ChartImplementationContainer()});

        var oStub = sandbox.stub(ChartDelegate, "_addBindingListener");
        var oBindSpy = sinon.spy(oMockChart, "bindData");

        ChartDelegate._performInitialBind(this.oMDCChart, {Test: true, binding: {}});

        assert.ok(oStub.calledOnce, "Binding listener added");
        assert.ok(oBindSpy.calledOnce, "bindData called");
        assert.ok(ChartDelegate._getState(this.oMDCChart).bindingInfo.Test, "Binding info was cached");
        assert.ok(ChartDelegate._getState(this.oMDCChart).innerChartBound, "innerChartBound was set on state");

    });

    QUnit.test("createInnerMeasure", function(assert) {
        var oMockChart = {addMeasure: function(){}};
        ChartDelegate._setState(this.oMDCChart, {innerChart: oMockChart, dataLoadedCallback: function(){}});
        var oSpy = sinon.spy(oMockChart, "addMeasure");
        var done = assert.async();
        ChartDelegate._loadChart().then(function(){
            assert.ok(true, "Loaded completed");

            var oMockProps = {
                name: "test1",
                aggregatable: true,
                label: "Label1",
                textFormatter: "abc"
            };

            ChartDelegate._addInnerMeasure(this.oMDCChart, new Item({name: "test1", type: "aggregatable", label: "Label1"}), oMockProps);
            assert.ok(oSpy.calledOnce, "Measure added");

            done();
        }.bind(this));
    });

    QUnit.test("_addInnerDimension", function(assert) {
        var oMockChart = {addDimension: function(){}};
        ChartDelegate._setState(this.oMDCChart, {innerChart: oMockChart, dataLoadedCallback: function(){}});
        var oSpy = sinon.spy(oMockChart, "addDimension");
        var done = assert.async();
        ChartDelegate._loadChart().then(function(){
            assert.ok(true, "Loaded completed");

            var oMockProps = {
                name: "test1",
                groupable: true,
                label: "Label1",
                textFormatter: "abc"
            };

            ChartDelegate._addInnerDimension(this.oMDCChart, new Item({name: "test1", type: "groupable", label: "Label1"}), oMockProps);
            assert.ok(oSpy.calledOnce, "Dimension added");
            assert.equal(oSpy.getCall(0).args[0].getName(), "test1", "Correct name for dimension");
            assert.equal(oSpy.getCall(0).args[0].getLabel(), "Label1", "Correct label added");
            assert.equal(oSpy.getCall(0).args[0].getTextProperty(), undefined, "No text property specified");
            assert.ok(oSpy.getCall(0).args[0].getTextFormatter(), "Formatter function was set");

            done();
        }.bind(this));
    });

    QUnit.test("_addInnerMeasure", function(assert) {
        assert.ok(true);
    });

    QUnit.test("getAggregatedMeasureNameForProperty", function(assert) {
        assert.ok(true);
    });

    QUnit.test("rebind", function(assert) {
        var oMockChart = {bindData: function(){}};
        ChartDelegate._setState(this.oMDCChart, {innerChart: oMockChart, dataLoadedCallback: function(){}, innerStructure: new ChartImplementationContainer()});

        var oStub = sandbox.stub(ChartDelegate, "_addBindingListener");
        var oBindSpy = sinon.spy(oMockChart, "bindData");

        ChartDelegate.rebind(this.oMDCChart, {Test: true, binding: {}});

        assert.ok(oStub.calledOnce, "Binding listener added");
        assert.ok(oBindSpy.calledOnce, "bindData called");
        assert.ok(ChartDelegate._getState(this.oMDCChart).bindingInfo.Test, "Binding info was cached");
        assert.ok(ChartDelegate._getState(this.oMDCChart).bindingInfo.binding.bHasAnalyticalInfo, "bHasAnalyticalInfo was set in binding");
        assert.ok(ChartDelegate._getState(this.oMDCChart).innerChartBound, "innerChartBound was set on state");

    });

    QUnit.test("getInnerChartBound", function(assert) {
        ChartDelegate._setState(this.oMDCChart, {innerChartBound: true});

        assert.equal(ChartDelegate.getInnerChartBound(this.oMDCChart), true, "Returns innerhcartBound from state");
    });

    QUnit.test("updateBindingInfo", function(assert) {
        assert.ok(true, "This must be implemented by custom delegate");
    });

    QUnit.test("getSorters", function(assert) {
        this.oMDCChart.setSortConditions({sorters: [{name: "Test1", descending: true}, {name: "Test2", descending: false}, {name: "Test3", descending: true}]});
        var oDim = new Item({name: "Test1", type: "groupable"});
        var oMeas = new Item({name: "Test2", type: "aggregatable"});
        this.oMDCChart.addItem(oDim);
        this.oMDCChart.addItem(oMeas);


        var oRes = ChartDelegate.getSorters(this.oMDCChart);

        assert.equal(oRes.length, 2, "One sorter returned");
        assert.equal(oRes[0].sPath, "Test1", "Correct path returned");
        assert.equal(oRes[1].sPath, "Test2", "Correct path returned");
        assert.equal(oRes[0].bDescending, true, "Correct descending returned");
        assert.equal(oRes[1].bDescending, false, "Correct descending returned");

    });

    QUnit.test("getAggregatedMeasureNameForMDCItem", function(assert) {
        var oMeas = new Item({name: "Test1"});

        assert.equal(ChartDelegate._getAggregatedMeasureNameForMDCItem(oMeas), "Test1", "Should just return name in standard implementation");
    });

    QUnit.test("getInternalChartNameFromPropertyNameAndKind", function(assert) {
        assert.equal(ChartDelegate.getInternalChartNameFromPropertyNameAndKind("ABC"), "ABC", "Should return name in standard implementation");
    });

    QUnit.test("getPropertyFromNameAndKind", function(assert) {
        assert.ok(true);
    });

    QUnit.test("setChartTooltipVisibility", function(assert) {
        assert.ok(true);
    });

    QUnit.test("_loadChart", function(assert) {
        var done = assert.async();
        ChartDelegate._loadChart().then(function(){
            assert.ok(true, "Loaded completed");

            done();
        });
    });

    QUnit.test("getPropertyHelperClass", function(assert) {
        assert.equal(ChartDelegate.getPropertyHelperClass(), ChartPropertyHelper, "Correct default class for propertyHelper");
    });

    QUnit.test("formatText", function(assert) {
        assert.ok(ChartDelegate.formatText("ABC"), "ABC", "Must be implemented by custom delegate");
    });

    QUnit.test("setNoDataText", function(assert) {
        var oMockChart = {setCustomMessages: function(){}};
        var oSpy = sinon.spy(oMockChart, "setCustomMessages");
        ChartDelegate._setState(this.oMDCChart, { innerChart: oMockChart});

        ChartDelegate.setNoDataText(this.oMDCChart, "ABC");

        assert.ok(oSpy.calledWithExactly({
            'NO_DATA': "ABC"
        }), "Correct noData text set on inner chart");
    });

    QUnit.test("_onDataLoadComplete", function(assert){
        var oMockImplContainer = new ChartImplementationContainer();
        var oMockChart = { getNoData : function(){ return {};}, _innerChartDataLoadComplete : function(){}, getControlDelegate : function(){return { _getInnerStructure : function(){ return oMockImplContainer; } };}};
        var oMockEvent = { getSource : function(){ return { getCurrentContexts : function() { return []; } }; } };

        var oSetVisibleSpy = sinon.spy(oMockImplContainer, "setShowNoDataStruct");


        ChartDelegate._onDataLoadComplete.apply(oMockChart, [oMockEvent]);

        assert.ok(oSetVisibleSpy.calledWithExactly(true), "No Data text was set visible after empty data load");

        oMockEvent = { getSource : function(){ return { getCurrentContexts : function() { return ["abc"]; } }; } };
        ChartDelegate._onDataLoadComplete.apply(oMockChart, [oMockEvent]);

        assert.ok(oSetVisibleSpy.calledWithExactly(false), "No Data text was set invisible after non-empty data load");

    });


    QUnit.test("fetchProperties", function(assert) {
        assert.ok(true, "Must be implemented by custom delegate");
    });

    QUnit.test("_getPropertyInfosByName", function(assert) {
        assert.ok(true);
    });

    QUnit.test("_getModel", function(assert) {
        assert.ok(true, "Must be implemented by custom delegate");
    });

    QUnit.test("_addBindingListener", function(assert) {
        assert.ok(true);
    });

    //state related
    QUnit.test("_deleteState", function(assert) {
        assert.ok(true);
    });
    QUnit.test("_getBindingInfoFromState", function(assert) {
        assert.ok(true);
    });

});