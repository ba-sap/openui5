/*global QUnit, sinon */
sap.ui.define([
	"sap/base/i18n/Localization",
	"sap/ui/core/Element",
	"sap/ui/core/Lib",
	"sap/ui/qunit/QUnitUtils",
	"sap/m/SegmentedButton",
	"sap/m/SegmentedButtonItem",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Bar",
	"sap/ui/core/library",
	"sap/ui/core/IconPool",
	"sap/m/OverflowToolbar",
	"sap/m/Dialog",
	"sap/m/Label",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/ChangeReason",
	"sap/ui/thirdparty/jquery",
	"sap/ui/core/CustomData",
	"sap/ui/core/LayoutData",
	"sap/ui/core/InvisibleText",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/events/KeyCodes",
	"sap/base/Log",
	"sap/ui/core/Core",
	"sap/ui/qunit/utils/nextUIUpdate"
], function(
	Localization,
	Element,
	Library,
	qutils,
	SegmentedButton,
	SegmentedButtonItem,
	Button,
	mobileLibrary,
	Bar,
	coreLibrary,
	IconPool,
	OverflowToolbar,
	Dialog,
	Label,
	JSONModel,
	ChangeReason,
	jQuery,
	CustomData,
	LayoutData,
	InvisibleText,
	XMLView,
	KeyCodes,
	Log,
	oCore,
	nextUIUpdate
) {
	"use strict";

	// shortcut for sap.ui.core.TextDirection
	var TextDirection = coreLibrary.TextDirection;

	// shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;

	var IMAGE_PATH = "test-resources/sap/m/images/";

	var oResourceBundle = Library.getResourceBundleFor("sap.m");

	/* =========================================================== */
	/* Initialize module                                           */
	/* =========================================================== */

	QUnit.module("Init");

	QUnit.test("Initial Check", function(assert) {
		// System under Test
		var oSegmentedButton = new SegmentedButton();

		// Act
		var s1 = Element.getElementById(oSegmentedButton.getId());

		// Assert
		assert.ok((s1 !== undefined) && (s1 != null), "SegmentedButton should be found");

		// Cleanup
		oSegmentedButton.destroy();
	});

	QUnit.test("clone", function(assert) {
		//arrange
		var oSB = new SegmentedButton({
				items: [
					new SegmentedButtonItem({ text: 'a' }),
					new SegmentedButtonItem({ text: 'b' })
				]
			}),
			oSBClone;

		oSB.setSelectedButton(oSB.getButtons()[1]);

		//act
		oSBClone = oSB.clone();

		//assert
		assert.equal(oSBClone.getButtons().length, oSB.getButtons().length, "cloning has the same number of buttons");
		assert.equal(oSBClone.getSelectedButton(), oSBClone.getButtons()[1].getId(), "cloning has the same button selected");
	});

	/* =========================================================== */
	/* Render module                                               */
	/* =========================================================== */

	QUnit.module("Render");

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Check if buttons are rendered", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button(),
			oButton3 = new Button();

		// Prerequisite for custom style class support
		oButton3.addStyleClass("custom-style-class");

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2, oButton3]
		});

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert
		assert.ok(oSegmentedButton.$().hasClass("sapMSegB"), "SegmentedButton should be rendered");
		assert.ok(oButton1.$().hasClass("sapMSegBBtn"), "Button should be rendered");
		assert.ok(oButton2.$().hasClass("sapMSegBBtn"), "Button should be rendered");
		assert.ok(oButton3.$().hasClass("sapMSegBBtn"), "Button should be rendered");

		// Check for CustomStyleClass support
		assert.ok(oSegmentedButton.getButtons()[2].$().hasClass("custom-style-class"), "Button should have custom style class");

		// Cleanup
		oSegmentedButton.destroy();
		oButton1.destroy();
		oButton2.destroy();
		oButton3.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton selection after rendering", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2]
		});

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Act
		oSegmentedButton.setSelectedButton(oButton1);

		// Assert
		assert.ok(oButton1.$().hasClass("sapMSegBBtnSel"), "Button1 should have class sapMSegBBtnSel");
		assert.ok(!oButton2.$().hasClass("sapMSegBBtnSel"), "Button2 should not have class sapMSegBBtnSel");

		// Cleanup
		oSegmentedButton.destroy();
	});

	QUnit.test("Accessibility state is written when SegmentedButton is rendered as a sap.m.Select", function(assert) {
		// prepare
		var oSegmentedButton = new SegmentedButton({
				ariaLabelledBy: [
					new Label("labelledBy_test", {text: "labelledBy_test"})
				],
				ariaDescribedBy: [
					new Label("describedBy_test", {text: "describedBy_test"})
				]
			}),
			oSelect;

		// act
		oSegmentedButton._toSelectMode();
		oSelect = oSegmentedButton.getAggregation("_select");

		// assert
		assert.equal(oSelect.getAriaLabelledBy()[0], "labelledBy_test", "select control has corret ariaLabelledBy values from sap.m.SegmentedButton");
		assert.equal(oSelect.getAriaLabelledBy()[1], "describedBy_test", "select control has corret ariaDescribedBy values from sap.m.SegmentedButton");

		// clean
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton selection before and after rendering", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			selectedButton: oButton1,
			buttons : [oButton1, oButton2]
		});

		// Act
		oSegmentedButton.setSelectedButton(oButton1);

		// Assert before rendering
		assert.strictEqual(oButton1.getId(), oSegmentedButton.getSelectedButton(), "The id of Button1 should be set as property \"selectedButton\"");

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert again after rendering
		assert.ok(oButton1.$().hasClass("sapMSegBBtnSel"), "Button1 should still have class sapMSegBBtnSel");
		assert.ok(!oButton2.$().hasClass("sapMSegBBtnSel"), "Button2 should still not have class sapMSegBBtnSel");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton set selected button to invalid value before rendering", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2]
		});

		// Act
		oSegmentedButton.setSelectedButton("doesnotexist");
		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert: no button is selected
		assert.ok(!oButton1.$().hasClass("sapMSegBBtnSel"), "Button1 should not have class sapMSegBBtnSel");
		assert.ok(!oButton2.$().hasClass("sapMSegBBtnSel"), "Button2 should not have class sapMSegBBtnSel");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton set selected button to invalid value after rendering", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2]
		});

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Act
		oSegmentedButton.setSelectedButton("doesnotexist");
		oCore.applyChanges();

		// Assert (no button is selected)
		assert.ok(!oButton1.$().hasClass("sapMSegBBtnSel"), "Button1 should not have class sapMSegBBtnSel");
		assert.ok(!oButton2.$().hasClass("sapMSegBBtnSel"), "Button2 should not have class sapMSegBBtnSel");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton set selected button to null value", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2]
		});

		// Act: setting to null before rendering
		oSegmentedButton.setSelectedButton(null);

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert (should be Button1 after rendering)
		assert.strictEqual(oSegmentedButton.getSelectedButton(), oButton1.getId(), "The first button should be selected when passing null to the association \"selectedButton\"");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton set selected button to undefined value", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2]
		});

		// Act: setting to undefined before rendering
		oSegmentedButton.setSelectedButton(undefined);

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert (should be Button1 after rendering)
		assert.strictEqual(oSegmentedButton.getSelectedButton(), oButton1.getId(), "The first button should be selected when passing undefined to the association \"selectedButton\"");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton set selected button to \"\" value", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2]
		});

		// Act: setting to undefined before rendering
		oSegmentedButton.setSelectedButton("");

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert (should be Button1 after rendering)
		assert.strictEqual(oSegmentedButton.getSelectedButton(), oButton1.getId(), "The first button should be selected when passing \"\" to the association \"selectedButton\"");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton set selected button before adding the buttons", function(assert) {
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			selectedButton: oButton1.getId()
		});

		oSegmentedButton.addButton(oButton1);
		oSegmentedButton.addButton(oButton2);

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Act

		// Assert
		assert.ok(oButton1.$().hasClass("sapMSegBBtnSel"), "After rendering of the SegmentedButton, Button1 is selected");
		assert.ok(!oButton2.$().hasClass("sapMSegBBtnSel"), "Button2 should not have class sapMSegBBtnSel");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Check icon button", function(assert) {
		// Arrange
		var oButton1 = new Button({
			text : "My Button 1"
		});
		var oButton2 = new Button({
			type : ButtonType.Default,
			icon : IMAGE_PATH + "settings_64.png"
		});
		var oButton3 = new Button({
			type : ButtonType.Default,
			icon : "sap-icon://task"
		});
		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2, oButton3]
		});

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert
		assert.equal(oButton1.$().text(), "My Button 1", "Button1 should have text: My Button 1");
		assert.ok(oButton2.$('img').hasClass("sapMBtnIcon"), "Button2 should have class: sapMBtnIcon");
		assert.ok(oButton2.$('img').hasClass("sapMImg"), "Button2 should have class: sapMImg");
		assert.equal(oButton2.$().text(), "", "Button2 should have no Label");
		assert.ok(oButton3.$('img').hasClass("sapMBtnIcon"), "Button3 should have class: sapMBtnIcon");
		assert.ok(oButton3.$('img').hasClass("sapUiIcon"), "Button3 should have class: sapUiIcon");
		assert.equal(oButton3.$().text(), "", "Button3 should have no Label");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Check icon and text button", function(assert) {
		// Arrange
		var oButton1 = new Button({
			type : ButtonType.Default,
			icon : IMAGE_PATH + "settings_64.png",
			text : "My Mixed Button 1"
		});
		var oButton2 = new Button({
			type : ButtonType.Default,
			icon : "sap-icon://task",
			text : "My Mixed Button 2"
		});
		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2]
		});

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert
		assert.equal(oButton1.$().text(), "My Mixed Button 1", "Button1 should have text: My Mixed Button 1");
		assert.ok(oButton1.$('img').hasClass("sapMBtnIcon"), "Button2 should have class: sapMBtnIcon");
		assert.ok(oButton1.$('img').hasClass("sapMImg"), "Button2 should have class: sapMImg");
		assert.equal(oButton2.$().text(), "My Mixed Button 2", "Button2 should have text: My Mixed Button 2");
		assert.ok(oButton2.$('img').hasClass("sapMBtnIcon"), "Button3 should have class: sapMBtnIcon");
		assert.ok(oButton2.$('img').hasClass("sapUiIcon"), "Button3 should have class: sapUiIcon");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Check when in bar container with button width set in percent", function(assert) {

		var oButton1,
			oButton2,
			oSegmentedButton,
			oBar,
			elementWidth;

		// Arrange
		oButton1 = new Button({
			text: "hallo",
			enabled: true,
			width: "50%"
		});

		oButton2 = new Button({
			text: "hallo",
			width: "50%",
			enabled: true
		});

		// System under Test
		oSegmentedButton = new SegmentedButton({
			buttons: [oButton1, oButton2]
		});

		oBar = new Bar({contentMiddle: oSegmentedButton});

		oBar.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Using native getBoundingClientRect() method because jQuery.width|outerWidth report rounded widths and
		// the test becomes unstable.
		elementWidth = oSegmentedButton.getDomRef().getBoundingClientRect().width;

		// Assert
		assert.strictEqual(oButton1.getDomRef().getBoundingClientRect().width +
					oButton2.getDomRef().getBoundingClientRect().width,
					elementWidth, "Control outer width is the same as sum of all buttons width");

		// Cleanup
		oBar.destroy();
		oButton1.destroy();
		oButton2.destroy();
		oSegmentedButton.destroy();

	});


	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Button textDirecton attribute", function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			buttons: [
				new Button({text: "(+359) 111 222 333", textDirection: TextDirection.RTL}),
				new Button({text: "(+359) 111 222 333", textDirection: TextDirection.LTR}),
				new Button({text: "20/06/1983 11:54"})
			]
		});

		oSegmentedButton.createButton("(+359) 111 222 333", null, null, TextDirection.RTL);
		oSegmentedButton.createButton("20/06/1983 11:54", null, null, TextDirection.LTR);

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		var oButtons = oSegmentedButton.getButtons();

		// Assert
		assert.strictEqual(oButtons[0].$().attr("dir"), "rtl", "Button 1 dir attribute should be set to 'rtl'.");
		assert.strictEqual(oButtons[1].$().attr("dir"), "ltr", "Button 2 dir attribute should be set to 'ltr'.");
		assert.strictEqual(oButtons[2].$().attr("dir"), undefined, "Button 3 dir attribute should not be rendered.");
		assert.strictEqual(oButtons[3].$().attr("dir"), "rtl", "Button 4 dir attribute should be set to 'rtl' button created using the createButton method.");
		assert.strictEqual(oButtons[4].$().attr("dir"), "ltr", "Button 5 dir attribute should be set to 'ltr' button created using the createButton method.");

		// Cleanup
		oSegmentedButton.destroy();

	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Button visible attribute", function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			buttons: [
				new Button({
					text: "Button 1"
				}),
				new Button({
					text: "Button 2"
				}),
				new Button({
					text: "Button 3"
				}),
				new Button({
					text: "Invisible Button",
					visible: false
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons().length, 4, "Control should have 4 buttons from the button aggregation");
		assert.strictEqual(oSegmentedButton.$().find("li.sapMSegBBtn").length, 3, "Control should have 3 buttons visible");
		assert.strictEqual(oSegmentedButton.$().find("li.sapUiHiddenPlaceholder").length, 1, "Control should have 1 button invisible");

		//Act
		oSegmentedButton.getButtons()[3].setVisible(true);
		oCore.applyChanges();

		//Assert
		assert.strictEqual(oSegmentedButton.$().find("li.sapMSegBBtn").length, 4, "Control should have 4 buttons visible");
		assert.strictEqual(oSegmentedButton.$().find("li.sapUiHiddenPlaceholder").length, 0, "Control should have 0 button invisible");

		// Cleanup
		oSegmentedButton.destroy();

	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Mixed content buttons width calculation when in bar (all buttons should have the same width)", function(assert) {

		// Arrange
		var oButton1 = new Button({text: "All"}),
			oButton2 = new Button({text: "Text", icon: IconPool.getIconURI("attachment")}),
			oButton3 = new Button({text: "Text", icon: IconPool.getIconURI("attachment")}),
			oSegmentedButton = new SegmentedButton({
				buttons: [oButton1, oButton2, oButton3]
			}),
			oBar = new Bar({contentMiddle: oSegmentedButton}),
			iButton1Width,
			iButton2Width,
			iButton3Width,
			iControlWidth;

		// System under Test
		oBar.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Using native getBoundingClientRect() method because jQuery.width|outerWidth report rounded widths and
		// the test becomes unstable.
		iControlWidth = oSegmentedButton.getDomRef().getBoundingClientRect().width;
		iButton1Width = oButton1.getDomRef().getBoundingClientRect().width;
		iButton2Width = oButton2.getDomRef().getBoundingClientRect().width;
		iButton3Width = oButton3.getDomRef().getBoundingClientRect().width;

		// Assert
		assert.strictEqual(Math.floor(iButton2Width), Math.floor(iButton1Width), 'Second button width should be equal to the ' +
				'first button width (mind here we add 1px to the expected result because of the 2 borders of middle' +
				'buttons)');

		assert.strictEqual(Math.floor(iButton3Width), Math.floor(iButton1Width), 'Third button width should be equal to the ' +
				'first button width');

		assert.strictEqual(Math.round(iControlWidth), Math.round(iButton1Width + iButton2Width + iButton3Width), "The sum of all buttons width " +
				"should be the same as the control width");

		// Cleanup
		oBar.destroy();
		oCore.applyChanges();
	});

	QUnit.test("Initialize with items aggregation", async function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			items: [
				new SegmentedButtonItem({
					text: "Button 1"
				}),
				new SegmentedButtonItem({
					text: "Button 2"
				}),
				new SegmentedButtonItem({
					text: "Button 3"
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getItems().length, 3, "Control should have 3 items");
		assert.strictEqual(oSegmentedButton.getButtons().length, 3, "Control should have 3 buttons from the button aggregation");
		assert.strictEqual(oSegmentedButton.$().find("li").length, 3, "Control should have 3 buttons rendered");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("Items aggregation tooltip", async function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			items: [
				new SegmentedButtonItem({
					text: "Button 1",
					tooltip: "Tooltip 1"
				}),
				new SegmentedButtonItem({
					text: "Button 2"
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		var aButtons = oSegmentedButton.getButtons(),
			$button1 = aButtons[0].$(),
			$button2 = aButtons[1].$();


		assert.strictEqual($button1.attr("title"), "Tooltip 1", "First button should have a title with the setted value");
		assert.strictEqual($button2.attr("title"), undefined, "There should be no title for the second button");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);
	});

	QUnit.test("Items aggregation visible property", async function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			items: [
				new SegmentedButtonItem({
					text: "Button 1"
				}),
				new SegmentedButtonItem({
					text: "Button 2"
				}),
				new SegmentedButtonItem({
					text: "Button 3"
				}),
				new SegmentedButtonItem({
					text: "Invisible Button",
					visible: false
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getItems().length, 4, "Control should have 4 items");
		assert.strictEqual(oSegmentedButton.getButtons().length, 4, "Control should have 4 buttons from the button aggregation");
		assert.strictEqual(oSegmentedButton.$().find("li.sapMSegBBtn").length, 3, "Control should have 3 buttons visible");
		assert.strictEqual(oSegmentedButton.$().find("li.sapUiHiddenPlaceholder").length, 1, "Control should have 1 button invisible");

		//Act
		oSegmentedButton.getItems()[3].setVisible(true);
		await nextUIUpdate(this.clock);

		//Assert
		assert.strictEqual(oSegmentedButton.$().find("li.sapMSegBBtn").length, 4, "Control should have 4 buttons visible");
		assert.strictEqual(oSegmentedButton.$().find("li.sapUiHiddenPlaceholder").length, 0, "Control should have 0 button invisible");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("selectedKey is set correctly for invisible items and removes the selection from other items", async function(assert) {

		//Arrange
		var oSegmentedButton = new SegmentedButton({
			items: [
				new SegmentedButtonItem({
					key: "k1",
					text: "item 1"
				}),
				new SegmentedButtonItem({
					key: "k2",
					text: "item 2",
					visible: false
				}),
				new SegmentedButtonItem({
					key: "k3",
					text: "item 3"
				})
			],
			selectedKey: "k1"
		});

		//System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		//Assert
		assert.strictEqual(oSegmentedButton.$().find("li.sapMSegBBtn.sapMSegBBtnSel").length, 1, "1 selected button is rendered");

		//Act
		oSegmentedButton.setSelectedKey("k2");
		await nextUIUpdate(this.clock);

		//Assert
		assert.strictEqual(oSegmentedButton.getSelectedButton(), oSegmentedButton.getButtons()[1].getId(), "The invisible button is selected");
		assert.strictEqual(oSegmentedButton.$().find("li.sapMSegBBtn.sapMSegBBtnSel").length, 0, "No selected buttons are rendered");

		//Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("Initialize with XML view", async function(assert) {

		// Arrange
		var xmlData = '<mvc:View\
		xmlns="sap.m"\
		xmlns:mvc="sap.ui.core.mvc">\
		<SegmentedButton\
		id="XMLSegmentedButton"\
		selectedKey="b2">\
		<items>\
		<SegmentedButtonItem key="b1" text="Btn 1" />\
		<SegmentedButtonItem key="b2" text="Btn 2" />\
		<SegmentedButtonItem key="b3" text="Btn 3" />\
		</items>\
		</SegmentedButton>\
		</mvc:View>';

		var oView = await XMLView.create({
			definition: xmlData
		});
		var oSegmentedButton = oView.byId("XMLSegmentedButton");

		// System under Test
		oView.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getItems().length, 3, "Control should have 3 items");
		assert.strictEqual(oSegmentedButton.getButtons().length, 3, "Control should have 3 buttons from the button aggregation");
		assert.strictEqual(oSegmentedButton.$().find("li").length, 3, "Control should have 3 buttons rendered");
		assert.strictEqual(oSegmentedButton.getButtons()[0].getText(), "Btn 1", "Button text should be equal to xml view ListItem text");
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "b2", "selectedKey should be 'b2'");

		// Cleanup
		oView.destroy();
		await nextUIUpdate(this.clock);
	});

	QUnit.test("ID's of internal elements properly set/rendered", async function(assert) {

		var sItemIdComponent = "segmentedButtonItem-",
			aButtons,
			oSegmentedButton,
			getExpectedButtonId,
			getExpectedImageId,
			i = 0;

		getExpectedButtonId = function (iIndex) {
			return sItemIdComponent + iIndex + "-button";
		};

		getExpectedImageId = function (iIndex) {
			return sItemIdComponent + iIndex + "-button-img";
		};

		// Arrange
		oSegmentedButton = new SegmentedButton("segmentedButton", {
			items: [
				new SegmentedButtonItem(sItemIdComponent + 0, {
					icon: "sap-icon://home",
					text: "Button 1"
				}),
				new SegmentedButtonItem(sItemIdComponent + 1, {
					icon: "sap-icon://home",
					text: "Button 2"
				}),
				new SegmentedButtonItem(sItemIdComponent + 2, {
					icon: IMAGE_PATH + "candy_star_46x46.png",
					text: "Button 3"
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		aButtons = oSegmentedButton.getButtons();

		// Assert
		for (;i < aButtons.length;i++) {
			// Buttons
			assert.strictEqual(aButtons[i].getId(), getExpectedButtonId(i),
					"Internal button id should be equal to the expected id");

			assert.strictEqual(aButtons[i].$().attr("id"), getExpectedButtonId(i),
					"Rendered button id should be equal to the expected id");

			// Images|icons
			assert.strictEqual(aButtons[i].$().find(".sapMBtnIcon").attr("id"), getExpectedImageId(i),
					"Rendered image id should be equal to the expected id");
		}

		// Cleanup
		aButtons = null;
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("Using the .sapMSegmentedButtonNoAutoWidth CSS class", async function (assert) {

		// Arrange
		var oSB,
			aButtons,
			iBtn1Width,
			iBtn2Width,
			iBtn3Width,
			iBtn4Width;

		oSB = new SegmentedButton({
			items: [
					new SegmentedButtonItem({text: "All"}),
					new SegmentedButtonItem({text: "Some long text"}),
					new SegmentedButtonItem({text: "Other long text"}),
					new SegmentedButtonItem({text: "All"})
			]
		}).addStyleClass("sapMSegmentedButtonNoAutoWidth").placeAt("qunit-fixture");

		await nextUIUpdate(this.clock);

		aButtons = oSB.getButtons();

		iBtn1Width = Math.ceil(aButtons[0].getDomRef().getBoundingClientRect().width);
		iBtn2Width = Math.ceil(aButtons[1].getDomRef().getBoundingClientRect().width);
		iBtn3Width = Math.ceil(aButtons[2].getDomRef().getBoundingClientRect().width);
		iBtn4Width = Math.ceil(aButtons[3].getDomRef().getBoundingClientRect().width);

		// Assert
		assert.ok(iBtn1Width > 0, "The width of the first button is greater than zero");
		assert.strictEqual(iBtn1Width, iBtn4Width, "The width of the first button is equal to the width of the last button");
		assert.ok((iBtn1Width * 2) < iBtn2Width, "The width of the first button multiplied is greater than the second button");
		assert.ok((iBtn1Width * 2) < iBtn3Width, "The width of the first button multiplied is greater than the third button");
		assert.ok((iBtn4Width * 2) < iBtn2Width, "The width of the last button multiplied is greater than the second button");
		assert.ok((iBtn4Width * 2) < iBtn3Width, "The width of the last button multiplied is greater than the third button");

		// Cleanup
		aButtons = null;
		iBtn1Width = null;
		iBtn2Width = null;
		iBtn3Width = null;
		iBtn4Width = null;
		oSB.destroy();
		oSB = null;
		await nextUIUpdate(this.clock);

	});

	QUnit.test("Too long SegmentedButton inside the OveflowToolbar", async function (assert) {

		// Arrange
		var oSB,
			oOTB,
			iWidth = jQuery("#qunit-fixture").width();

		jQuery("#qunit-fixture").css({ width: "160px" });

		oSB = new SegmentedButton({
			items: [
				new SegmentedButtonItem({text: "Button 1"}),
				new SegmentedButtonItem({text: "Button 2"})
			]
		});

		oOTB = new OverflowToolbar({
			content: [ oSB ]
		}).placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.ok(oOTB._getOverflowButtonNeeded(), "The SegmentedButton is hidden and Overflow button is visible.");

		// Cleanup
		jQuery("#qunit-fixture").css({ width: iWidth });
		oSB.destroy();
		oSB = null;
		oOTB.destroy();
		oOTB = null;
		await nextUIUpdate(this.clock);
	});

	/* =========================================================== */
	/* Event module                                                */
	/* =========================================================== */

	QUnit.module("Event");

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton Select Events", function(assert) {
		// Arrange
		var oButton1 = new Button();
		var oButton2 = new Button();
		var oButton3 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2, oButton3]
		});
		var fnFireSelectSpy = this.spy(oSegmentedButton, "fireSelect");

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Act
		oButton1.firePress();

		// Assert
		assert.strictEqual(fnFireSelectSpy.callCount, 0, "Event should not be fired, because the button is selected");

		// Act
		oButton2.firePress();
		// Assert
		assert.strictEqual(fnFireSelectSpy.callCount, 1, "Event should be fired once");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Select event fire count", function(assert) {
		// Arrange
		var fnCallback = sinon.spy();
		var oButton1 = new Button();
		var oButton2 = new Button();
		var oButton3 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			select : fnCallback,
			buttons : [oButton1, oButton2, oButton3]
		});
		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Act
		oButton2.firePress();
		// Assert
		assert.ok(fnCallback.calledOnce, "select event callback should be called just once");

		// Act
		oButton3.firePress();
		// Assert
		assert.strictEqual(fnCallback.callCount, 2, "select event callback should be called twice");

		// Cleanup
		oSegmentedButton.destroy();
		oCore.applyChanges();
	});

	/**
	 * BCP: 1780019055
	 * @deprecated as of version 1.52, replaced by <code>selectionChange</code> event
	 */
	QUnit.test("Select event in overflowed mode", async function(assert) {
		//arrange
		var fnCallback = sinon.spy(),
			oBtn1 = new SegmentedButtonItem({
				text: "button 1"
			}),
			oBtn2 = new SegmentedButtonItem({
				text: "button 2"
			}),
			oSegmentedButton = new SegmentedButton({
				width: "300px",
				items : [oBtn1,oBtn2],
				select: fnCallback
			}),
			oToolbar = new OverflowToolbar({
				width: "200px",
				content : [oSegmentedButton]
			}),
			oInnerSelect;

		oToolbar.placeAt('qunit-fixture');
		await nextUIUpdate(this.clock);

		oInnerSelect = oSegmentedButton.getAggregation("_select");

		//act
		oInnerSelect.fireChange({ selectedItem: oInnerSelect.getItems()[1] });

		//assert
		assert.strictEqual(fnCallback.callCount, 1, "select event callback should be called once");

		//clean
		oToolbar.destroy();
		await nextUIUpdate(this.clock);
	});

	//BCP: 1770067241
	QUnit.test("SegmentedItem press", async function(assert) {
		//arrange
		var fnOnPress = function(oEvent) {
				sSelectedKeyInsidePressHandler = oSB.getSelectedKey();
				bFired = true;
			},
			oSB = new SegmentedButton({
				items: [
					new SegmentedButtonItem({
						key: 'KEY1',
						text: 'First',
						press: fnOnPress
					}),
					new SegmentedButtonItem({
						key: 'KEY2',
						text: 'Second',
						press: fnOnPress
					})
				]
			}).placeAt('qunit-fixture'),
			sSelectedKeyInsidePressHandler,
			bFired,
			fnFireSelectionChangeSpy;

		fnFireSelectionChangeSpy = this.spy(oSB, "fireSelectionChange");
		await nextUIUpdate(this.clock);

		//act
		oSB.getButtons()[1].firePress();

		//assert
		assert.ok(bFired, 'item fires press when a button is pressed');
		assert.equal(sSelectedKeyInsidePressHandler, "KEY1", 'item fires press before the selected key changes');
		assert.strictEqual(fnFireSelectionChangeSpy.callCount, 1, "SelectionChange is fired");
		assert.strictEqual(fnFireSelectionChangeSpy.args[0][0].item, oSB.getItems()[1],
				"SelectionChange is returning the right reference to the selected item");

		//clean
		oSB.destroy();
		await nextUIUpdate(this.clock);
	});

	/* =========================================================== */
	/* Dialog module                                               */
	/* =========================================================== */
	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.module("SegmentedButton in Dialog", {
		before : function () { sinon.config.useFakeTimers = false; },
		after : function () { sinon.config.useFakeTimers = true; }
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton in Dialog's header", function(assert) {
		assert.expect(3);
		var done = assert.async();
		// Arrange
		var oButton1 = new Button(),
			oButton2 = new Button(),
			oButton3 = new Button(),
			oBar,
			oDialog;

		// System under Test
		oBar = new Bar({
			contentMiddle : [new SegmentedButton({
				width : "100%",
				buttons : [oButton1, oButton2, oButton3]
			})]
		});

		oDialog = new Dialog({
			subHeader : oBar,
			content : [new Button({
				text : "long button",
				width : "600px"
			})]
		});

		oCore.applyChanges();

		// Assert
		oDialog.attachAfterOpen(function () {
			oDialog.close();
		});

		oDialog.attachBeforeClose(function () {
			// Compared to two because the element has border
			assert.ok(Math.abs(oButton1.$().width() - oButton2.$().width()) <= 2,
					"Buttons in SegmentedButton should have identical width");
			assert.ok(Math.abs(oButton1.$().width() - oButton3.$().width()) <= 2,
					"Buttons in SegmentedButton should have identical width");
			assert.ok(Math.abs(oBar.$().find(".sapMBarPH").width() - oButton1.$().outerWidth() - oButton2.$().outerWidth()
					- oButton3.$().outerWidth()) <= 5, "SegmentedButton should occupy the whole width of dialog");

			// Cleanup
			oDialog.destroy();

			done();
		});

		// Act
		oDialog.open();
	});

	/* =========================================================== */
	/* API module                                                  */
	/* =========================================================== */

	QUnit.module("API");

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("SegmentedButton setSelectedButton API call", function(assert) {

		// Arrange
		var oButton1 = new Button({
			text : "first button"
		}), oButton2 = new Button({
			text : "second button"
		}), oButton3 = new Button({
			text : "third button"
		}), oThisForChaining;

		// System under test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2, oButton3]
		});

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedButton(), oButton1.getId(), "initially the first button is selected");
		assert.ok(oButton1.$().hasClass("sapMSegBBtnSel"),
				"the first button's DOM element initially has style class \"sapMSegBBtnSel\"");

		// Act
		oThisForChaining = oSegmentedButton.setSelectedButton(oButton2);
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedButton(), oButton2.getId(), "now the second button is selected");
		assert.ok(oButton2.$().hasClass("sapMSegBBtnSel"), "the second button's DOM element has style class \"sapMSegBBtnSel\"");
		assert.ok(oThisForChaining instanceof SegmentedButton, "the setter should return 'this' instance of the control itself to enable chaining");

		// Act
		oSegmentedButton.setSelectedButton(oButton3.getId());
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedButton(), oButton3.getId(), "now the third button is selected");
		assert.ok(oButton3.$().hasClass("sapMSegBBtnSel"), "the third button's DOM element has style class \"sapMSegBBtnSel\"");

		// Act
		oSegmentedButton.setSelectedButton("mumpitz");
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedButton(), "mumpitz", "selectedButton association contains \"mumpitz\"");
		assert.ok(!oButton3.$().hasClass("sapMSegBBtnSel"),
				"the third button's DOM element does not have style class \"sapMSegBBtnSel\" anymore");

		// Cleanup
		oSegmentedButton.destroy();
		oCore.applyChanges();
	});

	QUnit.test("SegmentedButton setSelectedItem API call", async function(assert) {

		// Arrange
		var oButton1 = new SegmentedButtonItem({text : "first button"}),
			oButton2 = new SegmentedButtonItem({text : "second button"}),
			oButton3 = new SegmentedButtonItem({text : "third button"}),
			oThisForChaining,
			oLabel = new Label("label", {});

		// System under test
		var oSegmentedButton = new SegmentedButton({
			items : [oButton1, oButton2, oButton3]
		});

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedItem(), oButton1.getId(),
				"initially the first button is selected");
		assert.ok(oButton1.$().hasClass("sapMSegBBtnSel"),
				"the first button's DOM element initially has style class \"sapMSegBBtnSel\"");

		// Act
		oThisForChaining = oSegmentedButton.setSelectedItem(oButton2);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedItem(), oButton2.getId(), "now the second button is selected");
		assert.ok(oButton2.$().hasClass("sapMSegBBtnSel"), "the second button's DOM element has style class \"sapMSegBBtnSel\"");
		assert.ok(oThisForChaining instanceof SegmentedButton, "the setter should return 'this' instance of the control itself to enable chaining");

		// Act
		oSegmentedButton.setSelectedItem("label");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedItem(), "label",
				"selectedItem association contains an existing id from another control and this does not break the control, only removes the selection style");
		assert.ok(!oButton2.$().hasClass("sapMSegBBtnSel"),
				"the last button's DOM element does not have style class \"sapMSegBBtnSel\" anymore");

		// Act
		oSegmentedButton.setSelectedItem(oLabel);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedItem(), oLabel.getId(),
				"selectedItem association contains an existing another control, not SegmentedButtonItem and this does not break the control, only removes the selection style");

		// Act
		oSegmentedButton.setSelectedItem(undefined);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedItem(), oSegmentedButton.getItems()[0].getId(),
				"When selectedItem is set to undefined, the selection goes to the first item");
		assert.ok(oButton1.$().hasClass("sapMSegBBtnSel"),
				"the first button does have the coresponding selected style class");

		// Act
		oSegmentedButton.setSelectedItem(oButton3.getId());
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedItem(), oButton3.getId(), "now the third button is selected");
		assert.ok(oButton3.$().hasClass("sapMSegBBtnSel"), "the third button's DOM element has style class \"sapMSegBBtnSel\"");

		// Act
		oSegmentedButton.setSelectedItem("mumpitz");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedItem(), "mumpitz", "selectedItem association contains \"mumpitz\"");
		assert.ok(!oButton3.$().hasClass("sapMSegBBtnSel"),
				"the third button's DOM element does not have style class \"sapMSegBBtnSel\" anymore");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);
	});

	/* ------------------------------ */
	/* Check default values           */
	/* ------------------------------ */

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Test default values", function(assert) {
		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [new Button(), new Button()]
		});

		oSegmentedButton.placeAt("qunit-fixture");

		assert.strictEqual(oSegmentedButton.getSelectedButton(), null, "by default the \"selectedButton\" aggregation is not filled before rendering");
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons()[0].getId(), oSegmentedButton.getSelectedButton(), "By default the first button in the SegmentedButton should be selected");
		assert.strictEqual(oSegmentedButton.getSelectedButton(), oSegmentedButton.getButtons()[0].getId(), "by default the \"selectedButton\" aggregation should be the first button after rendering");

		assert.strictEqual(oSegmentedButton.getWidth(), "", "by default width property is empty string");
		assert.strictEqual(oSegmentedButton.getWidth(), "", "by default width property is empty string");
		assert.strictEqual(oSegmentedButton.getVisible(), true, "By default the SegmentedButton control is visible");
		assert.strictEqual(oSegmentedButton.getEnabled(), true, "By default the SegmentedButton control control is enabled");
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "", "By default the selectedKey aggregation should be undefined when the segmented button is initialized with the buttons aggregation");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/* ------------------------------ */
	/* addButton and indexOfButton    */
	/* ------------------------------ */

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("addButton and indexOfButton ", function(assert) {
		// System under Test
		var oSegmentedButton = new SegmentedButton();

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Act
		oSegmentedButton.addButton(new Button());
		oSegmentedButton.addButton(new Button());

		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons().length, 2, "There should be 2 buttons");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("indexOfButton ", function(assert) {
		// System under Test
		var oSegmentedButton = new SegmentedButton();

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Act
		oSegmentedButton.addButton(new Button());
		oSegmentedButton.addButton(new Button());

		var oButton = new Button();
		oSegmentedButton.insertButton(oButton, 2);

		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.indexOfButton(oButton), 2, "The button should be at second index");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/* ------------------------------ */
	/* setEnabled()                   */
	/* ------------------------------ */

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Disbale SegmentedButton", function(assert) {
		// Arrange
		var oButton1 = new Button();
		var oButton2 = new Button();
		var oButton3 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton();

		oSegmentedButton.placeAt("qunit-fixture");

		oSegmentedButton.addButton(oButton1);
		oSegmentedButton.addButton(oButton2);
		oSegmentedButton.addButton(oButton3);
		oCore.applyChanges();

		// Act
		oSegmentedButton.setEnabled(false);
		oCore.applyChanges();

		// Assert
		assert.ok(oButton1.$().hasClass("sapMSegBBtnDis"), "the first button is disabled");
		assert.ok(oButton2.$().hasClass("sapMSegBBtnDis"), "the second button is disabled");
		assert.ok(oButton3.$().hasClass("sapMSegBBtnDis"), "the third button is disabled");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Disable single button", function(assert) {
		// Arrange
		var oButton1 = new Button();
		var oButton2 = new Button();
		var oButton3 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton();

		oSegmentedButton.placeAt("qunit-fixture");

		oSegmentedButton.addButton(oButton1);
		oSegmentedButton.addButton(oButton2);
		oSegmentedButton.addButton(oButton3);
		oCore.applyChanges();

		// Act
		oButton1.setEnabled(false);
		oCore.applyChanges();

		// Assert
		assert.ok(oButton1.$().hasClass("sapMSegBBtnDis"), "The first button is disabled");
		assert.ok(!oButton2.$().hasClass("sapMSegBBtnDis"), "The second button should not be disabled");
		assert.ok(!oButton3.$().hasClass("sapMSegBBtnDis"), "The third button should not be disabled");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/* ------------------------------ */
	/* removeButton()                 */
	/* ------------------------------ */

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("remove button", function(assert) {
		// Arrange
		var oButton1 = new Button();
		var oButton2 = new Button();
		var oButton3 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton();

		oSegmentedButton.placeAt("qunit-fixture");

		oSegmentedButton.addButton(oButton1);
		oSegmentedButton.addButton(oButton2);
		oSegmentedButton.addButton(oButton3);
		oCore.applyChanges();

		// Act
		oSegmentedButton.removeButton(oButton2);
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons().length, 2, "The second button is removed");
		assert.strictEqual(oSegmentedButton.indexOfButton(oButton2), -1, "The second button is removed");

		// Cleanup
		oButton2.destroy();
		oSegmentedButton.destroy();
	});

	/**
	 * BCP: 1880235141
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("remove button returns the removed button", function (assert) {
		// Arrange
		var oResult,
			oButton1 = new Button("button1"),
			oButton2 = new Button("button2"),
			oSegmentedButton = new SegmentedButton({ buttons: [oButton1, oButton2] });

		// Act
		oResult = oSegmentedButton.removeButton(oButton1);

		// Assert
		assert.equal(oResult.getId(), oButton1.getId(), "removeButton should return the removed button");

		// Cleanup
		oSegmentedButton.destroy();
		oButton1.destroy();
		oButton2.destroy();
	});

	/* ------------------------------ */
	/* removeAllButtons()             */
	/* ------------------------------ */

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("remove all buttons", function(assert) {
		// Arrange
		var oButton1 = new Button();
		var oButton2 = new Button();
		var oButton3 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton();

		oSegmentedButton.placeAt("qunit-fixture");

		oSegmentedButton.addButton(oButton1);
		oSegmentedButton.addButton(oButton2);
		oSegmentedButton.addButton(oButton3);
		oCore.applyChanges();

		// Act
		oSegmentedButton.removeAllButtons(oSegmentedButton);
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons().length, 0, "All buttons are removed");
		assert.strictEqual(oSegmentedButton.indexOfButton(oButton1), -1, "the first button is removed");
		assert.strictEqual(oSegmentedButton.indexOfButton(oButton2), -1, "the second button is removed");
		assert.strictEqual(oSegmentedButton.indexOfButton(oButton3), -1, "the third button is removed");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * BCP: 1880235141
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("remove all buttons returns the removed buttons", function (assert) {
		assert.expect(2);
		// Arrange
		var aResult,
			aButtons = [new Button("button1"), new Button("button2")],
			oSegmentedButton = new SegmentedButton({ buttons: aButtons });

		// Act
		aResult = oSegmentedButton.removeAllButtons();

		// Assert
		aResult.forEach(function (oRemovedButton, index) {
			assert.equal(oRemovedButton.getId(), aButtons[index].getId(), "removeAllButtons should remove button " + oRemovedButton.getId());
		});

		// Cleanup
		oSegmentedButton.destroy();
		aButtons[0].destroy();
		aButtons[1].destroy();
	});

	/* ------------------------------ */
	/* destroyButtons()               */
	/* ------------------------------ */

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Destroy button", function(assert) {
		// Arrange
		var oButton1 = new Button();
		var oButton2 = new Button();
		var oButton3 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2, oButton3]
		});

		// Act
		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		oSegmentedButton.destroyButtons();
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons().length, 0, "There should be 0 buttons in the SegmentedButton");

		// Cleanup
		oSegmentedButton.destroy();
		oCore.applyChanges();
	});

	QUnit.test("getSelectedKey()", async function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			selectedKey: "b2",
			items: [
				new SegmentedButtonItem({
					key: "b1",
					text: "Button 1"
				}),
				new SegmentedButtonItem({
					key: "b2",
					text: "Button 2"
				}),
				new SegmentedButtonItem({
					key: "b3",
					text: "Button 3"
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "b2", "selectedKey should be 'b2'");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("when using items & setSelectedKey() is called, setSelectedButton() is called too", async function(assert) {
		// Arrange
		var oItem1 = new SegmentedButtonItem({
			key: "b1",
			text: "Button 1"
		});
		var oItem2 = new SegmentedButtonItem({
			key: "b2",
			text: "Button 2"
		});
		var oItem3 = new SegmentedButtonItem({
			key: "b3",
			text: "Button 3"
		});

		var oSetSelectedButtonSpy = this.spy(SegmentedButton.prototype, 'setSelectedButton');

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			items : [oItem1, oItem2, oItem3],
			selectedKey : "b2"
		});

		assert.equal(oSetSelectedButtonSpy.callCount, 1, "setSelectedButton is called");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("setSelectedKey()", async function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			items: [
				new SegmentedButtonItem({
					key: "b1",
					text: "Button 1"
				}),
				new SegmentedButtonItem({
					key: "b2",
					text: "Button 2"
				}),
				new SegmentedButtonItem({
					key: "b3",
					text: "Button 3"
				})
			]
		}),
		oThisForChaining;

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "b1", "When not set selectedKey should be equal to the first key in the list 'b1'");
		assert.strictEqual(oSegmentedButton.getProperty("selectedKey"), "b1", "When not set selectedKey property should be equal to the first key in the list 'b1'");

		// Act
		// Change selectedKey to "b2"
		oThisForChaining = oSegmentedButton.setSelectedKey("b2");

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "b2", "selectedKey should be 'b2'");
		assert.strictEqual(oSegmentedButton.getProperty("selectedKey"), "b2", "selectedKey property should be 'b2'");
		assert.ok(oThisForChaining instanceof SegmentedButton, "the setter should return 'this' instance of the control itself to enable chaining");

		// Act
		// Change selectedKey to non existing key
		oSegmentedButton.setSelectedKey("NonexistingKey");

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "b2", "selectedKey should be unchanged = 'b2'");
		assert.strictEqual(oSegmentedButton.getProperty("selectedKey"), "b2", "selectedKey property should be unchanged = 'b2'");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("selectedKey property on button press", async function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			items: [
				new SegmentedButtonItem({
					key: "b1",
					text: "Button 1"
				}),
				new SegmentedButtonItem({
					key: "b2",
					text: "Button 2"
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Act
		// Click on the second button
		oSegmentedButton.getButtons()[1].$().trigger("tap");
		oSegmentedButton.getButtons()[1].$().trigger("click");

		// Assert
		assert.strictEqual(oSegmentedButton.getProperty("selectedKey"), "b2", "selectedKey property should be 'b2'");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("sap.m.SegmentedButtonItem property update", async function (assert) {

		// Arrange
		var oSBI = new SegmentedButtonItem({
			key: "b1",
			text: "Btn 1"
		});

		var oSegmentedButton = new SegmentedButton({
			items: [
				oSBI
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Act
		oSBI.setText("Btn changed");
		oSBI.setIcon("sap-icon://attachment");
		oSBI.setTextDirection(TextDirection.RTL);
		oSBI.setEnabled(false);
		oSBI.setWidth("300px");
		oSBI.setKey("changed");
		oSegmentedButton.setSelectedKey("changed");

		await nextUIUpdate(this.clock);

		// Assert
		var oButton = oSegmentedButton.getButtons()[0];
		var $LI = jQuery(oSegmentedButton.$().find("li")[0]);

		assert.strictEqual(oButton.getText(), "Btn changed", "Button text should have the new value");
		assert.strictEqual(oButton.getIcon(), "sap-icon://attachment", "Button should have the new value");
		assert.strictEqual(oButton.getTextDirection(), TextDirection.RTL, "Button should have the new value");
		assert.strictEqual(oButton.getEnabled(), false, "Button should have the new value");
		assert.strictEqual(oButton.getWidth(), "300px", "Button should have the new value");
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "changed", "SegmentedButton getSelectedKey() should return the new value");

		assert.strictEqual($LI.text(), "Btn changed", "Rendered li text should have the new value");
		assert.ok($LI.find(".sapMBtnIcon"), "Rendered li should contain a icon span");
		assert.strictEqual($LI.attr("dir"), "rtl", "Rendered li should have attribute dir equal to 'rtl'");
		assert.ok($LI.hasClass("sapMSegBBtnDis"), "Rendered li should have a disabled class");
		assert.strictEqual($LI.outerWidth(), 300, "Rendered li width must be equal the new value");

	});

	QUnit.test("Method 'getFormDoNotAdjustWidth' always returns true", function(assert) {
		// prepare
		var oSB = new SegmentedButton();

		// act
		// assert
		assert.equal(oSB.getFormDoNotAdjustWidth(), true, "The method has returned the correct value.");

		// clean
		oSB.destroy();
	});

	QUnit.module("API Items aggregation", {
		beforeEach: async function () {
			this.oSB = new SegmentedButton().placeAt("qunit-fixture");
			await nextUIUpdate(this.clock);
		},
		afterEach: async function () {
			this.oSB.destroy();
			this.oSB = null;
			this.applyChanges = null;
			await nextUIUpdate(this.clock);
		}
	});

	QUnit.test("addItem", async function (assert) {
		// Arrange
		var aItems,
			aButtons;

		// Act - add first item
		this.oSB.addItem(new SegmentedButtonItem({text: "Button 1"}));
		aItems = this.oSB.getButtons();
		aButtons = this.oSB.getButtons();
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(aItems.length, 1, "There should be one item");
		assert.strictEqual(aButtons.length, 1, "There should be one button created");
		assert.strictEqual(aButtons[0].getText(), aItems[0].getText(), "The button text should equal the item test");
		assert.strictEqual(this.oSB.getSelectedButton(), aButtons[0].getId(),
			"The button created should be the selected button");
		assert.ok(aButtons[0].getDomRef().classList.contains("sapMSegBtnLastVisibleButton"), "The last button have sapMSegBtnLastVisibleButton styleClass");

		// Act - add second button and set selection to the newly added button
		this.oSB.addItem(new SegmentedButtonItem({text: "Button 2"}));
		aButtons = this.oSB.getButtons();
		this.oSB.setSelectedButton(aButtons[1]);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getItems().length, 2, "There should be two items");
		assert.strictEqual(aButtons.length, 2, "There should be two buttons created from items");
		assert.strictEqual(this.oSB.getSelectedButton(), aButtons[1].getId(),
			"The second button created should be selected");
		assert.notOk(aButtons[0].getDomRef().classList.contains("sapMSegBtnLastVisibleButton"), "The old last button is remove styleClass sapMSegBtnLastVisibleButton");
		assert.ok(aButtons[1].getDomRef().classList.contains("sapMSegBtnLastVisibleButton"), "The last button have correct style class");

		// Act - add third item
		this.oSB.addItem(new SegmentedButtonItem({text: "Button 3"}));
		aButtons = this.oSB.getButtons();
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getItems().length, 3, "There should be three items");
		assert.strictEqual(aButtons.length, 3, "There should be three buttons");
		assert.strictEqual(this.oSB.getSelectedButton(), aButtons[1].getId(),
			"The second button should remain selected");
	});

	QUnit.test("removeItem", async function (assert){
		var aItems;

		// Arrange
		this.oSB.addItem(new SegmentedButtonItem({key: "b1", text: "Button 1"}));
		this.oSB.addItem(new SegmentedButtonItem({key: "b2", text: "Button 2"}));
		this.oSB.addItem(new SegmentedButtonItem({key: "b3", text: "Button 3"}));
		this.oSB.setSelectedKey("b3");
		aItems = this.oSB.getItems();

		// Act - remove Button 2
		this.oSB.removeItem(aItems[1]);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getItems().length, 2, "There are 2 items");
		assert.strictEqual(this.oSB.getButtons().length, 2, "There are 2 buttons");
		assert.strictEqual(this.oSB.$().find("li").length, 2, "There are 2 buttons rendered");
		assert.strictEqual(this.oSB.getSelectedKey(), "b3", "Button with key 'b3' is selected");

		// Act - remove Button 3
		this.oSB.removeItem(aItems[2]);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getButtons().length, 1, "There is one button");
		assert.strictEqual(this.oSB.getSelectedKey(), "b1", "Button with key 'b1' is selected");

		// Act - remove last button
		this.oSB.removeItem(aItems[0]);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getButtons().length, 0, "There are no buttons");
		assert.strictEqual(this.oSB.getSelectedKey(), "", "There is no selected key");
		assert.strictEqual(this.oSB.$().find("li").length, 0, "There are no buttons rendered");

		// Act - adding an item after all ware removed
		this.oSB.addItem(new SegmentedButtonItem({key: "b4", text: "Button 4"}));
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.$().find("li").length, 1, "There is one buttons rendered");
		assert.strictEqual(this.oSB.getSelectedKey(), "b4", "Button with key 'b4' is selected");
	});

	// BCP: 1880235141
	QUnit.test("remove item returns the removed item", function (assert) {
		// Arrange
		var oResult,
			oSegmentedButtonItem1 = new SegmentedButtonItem("item1"),
			oSegmentedButtonItem2 = new SegmentedButtonItem("item2"),
			oSegmentedButton = new SegmentedButton({ items: [oSegmentedButtonItem1, oSegmentedButtonItem2] });

		// Act
		oResult = oSegmentedButton.removeItem(oSegmentedButtonItem1);

		// Assert
		assert.equal(oResult.getId(), oSegmentedButtonItem1.getId(), "removeItem should return the removed item");

		// Cleanup
		oSegmentedButton.destroy();
		oSegmentedButtonItem1.destroy();
		oSegmentedButtonItem2.destroy();
	});

	QUnit.test("insertItem", async function (assert) {
		// Arrange
		this.oSB.addItem(new SegmentedButtonItem({text: "Button 1"}));
		this.oSB.addItem(new SegmentedButtonItem({text: "Button 2"}));

		// Act - insert item between Button 1 and 2
		this.oSB.insertItem(new SegmentedButtonItem({text: "Button 3"}), 1);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getItems().length, 3, "There are 3 items");
		assert.strictEqual(this.oSB.getButtons().length, 3, "There are 3 buttons");
		assert.strictEqual(this.oSB.$().find("li").length, 3, "There are 3 buttons rendered");
		assert.strictEqual(this.oSB.getButtons()[1].getText(), "Button 3",
			"Button with text 'Button 3' should be the second button");
	});

	QUnit.test("removeAllItems", async function (assert) {
		// Arrange
		this.oSB.addItem(new SegmentedButtonItem({key: "b1", text: "Button 1"}));
		this.oSB.addItem(new SegmentedButtonItem({key: "b2", text: "Button 2"}));
		this.oSB.addItem(new SegmentedButtonItem({key: "b3", text: "Button 3"}));
		this.oSB.setSelectedKey("b2");

		// Act
		this.oSB.removeAllItems();
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getItems().length, 0, "There are 0 items");
		assert.strictEqual(this.oSB.getButtons().length, 0, "There are 0 buttons");
		assert.strictEqual(this.oSB.getSelectedKey(), "", "There is no selected key");
		assert.strictEqual(this.oSB.getSelectedButton(), null, "There is no selected button");
		assert.strictEqual(this.oSB.$().find("li").length, 0, "There are 0 buttons rendered");
	});

	// BCP: 1880235141
	QUnit.test("remove all items returns the removed items", function (assert) {
		assert.expect(2);
		// Arrange
		var aResult,
			aItems = [new SegmentedButtonItem("item1"), new SegmentedButtonItem("item2")],
			oSegmentedButton = new SegmentedButton({ items: aItems });

		// Act
		aResult = oSegmentedButton.removeAllItems();

		// Assert
		aResult.forEach(function (oRemovedItem, index) {
			assert.equal(oRemovedItem.getId(), aItems[index].getId(), "removeAllItems should remove item " + oRemovedItem.getId());
		});

		// Cleanup
		oSegmentedButton.destroy();
		aItems[0].destroy();
		aItems[1].destroy();
	});


	/* =========================================================== */
	/* API module                                                  */
	/* =========================================================== */

	/* =========================================================== */
	/* Helper functionality module                                 */
	/* =========================================================== */

	QUnit.module("Helper functions");

	QUnit.test("_getButtonWidth private method", function (assert) {
		// Arrange
		var oSB = new SegmentedButton(),
			aButtons;

		// Setting internal custom width marker so width calculations will pass
		oSB._bCustomButtonWidth = true;

		// Assert
		aButtons = [
			new Button(),
			new Button({width: "300px"}),
			new Button()
		];
		assert.strictEqual(oSB._getButtonWidth(aButtons), "calc(50% - 150px)", "Resulting css width should be calc(50% - 150px)");

		aButtons = [
			new Button(),
			new Button({width: "300px"}),
			new Button({width: "300px"})
		];
		assert.strictEqual(oSB._getButtonWidth(aButtons), "calc(100% - 600px)", "Resulting css width should be calc(100% - 600px)");

		aButtons = [
			new Button(),
			new Button(),
			new Button({width: "60%"}),
			new Button({width: "300px"})
		];
		assert.strictEqual(oSB._getButtonWidth(aButtons), "calc(20% - 150px)", "Resulting css width should be calc(20% - 150px)");

		aButtons = [
			new Button(),
			new Button({width: "70%"}),
			new Button()
		];
		assert.strictEqual(oSB._getButtonWidth(aButtons), "15%", "Resulting css width should be 15%");

		aButtons = [
			new Button({width: "100px"}),
			new Button({width: "100px"}),
			new Button({width: "100px"})
		];
		assert.strictEqual(oSB._getButtonWidth(aButtons), false, "Resulting css width should be false because there are no buttons" +
				"without custom widths");

		aButtons = [
			new Button({width: "50%"}),
			new Button({width: "50%"}),
			new Button()
		];
		assert.strictEqual(oSB._getButtonWidth(aButtons), "0%", "Resulting css width should be 0% because the other buttons" +
				" are occupying all the available width");

		// Cleanup
		oSB.destroy();
		oSB = null;
		aButtons = null;
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("_getRenderedButtonWidths private method", function (assert) {
		// Arrange
		var oSB,
			aButtons;

		oSB = new SegmentedButton({
			buttons: [
				new Button({text: "Btn 1", width: "99.5px"}),
				new Button({text: "Btn 2 long", width: "99.5px"}),
				new Button({text: "Btn 3 again longer", width: "99.5px"})
			]
		});
		aButtons = oSB.getButtons();

		// Assert
		assert.deepEqual(oSB._getRenderedButtonWidths(aButtons), [null,null,null], "Before the control is rendered an array " +
				"of empty widths is returned");

		// Act
		oSB.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert
		assert.deepEqual(oSB._getRenderedButtonWidths(aButtons), [99.5,99.5,99.5], "Returned array of widths " +
				"equals to predefined widths of the buttons");

		// Cleanup
		oSB.destroy();
		oSB = null;
		aButtons = null;
		oCore.applyChanges();
	});

	QUnit.test("_clearAutoWidthAppliedToControl private method", async function (assert) {
		// Arrange
		var oSB,
			aButtons,
			i;

		oSB = new SegmentedButton({
			items: [
				new SegmentedButtonItem({text: "Btn 1"}),
				new SegmentedButtonItem({text: "Btn 2", width: "20px"}),
				new SegmentedButtonItem({text: "Btn 3"})
			]
		}).placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		aButtons = oSB.getButtons();

		// Assert
		assert.ok(oSB.$().attr("style").indexOf("width:") !== -1, "Auto width is applied to control");
		for (i = 0;i < aButtons.length; i++) {
			assert.ok(aButtons[i].$().attr("style").indexOf("width:") !== -1, "Auto|predefined width is applied to internal " +
					"button");
		}

		// Act
		oSB._clearAutoWidthAppliedToControl();

		// Assert
		assert.notOk(oSB.$().attr("style"), "Auto width is removed from control");
		assert.notOk(aButtons[0].$().attr("style"), "Auto width is removed from internal button");
		assert.ok(aButtons[1].$().attr("style").indexOf("20px") !== -1, "Predefined width is not removed from internal button");
		assert.notOk(aButtons[2].$().attr("style"), "Auto width is removed from internal button");

		// Act
		oSB.setWidth("200px");
		aButtons[0].setWidth("10px");
		await nextUIUpdate(this.clock);
		oSB._clearAutoWidthAppliedToControl();

		// Assert
		assert.ok(oSB.$().attr("style").indexOf("200px") !== -1, "Control width is not cleared if predefined");
		assert.ok(aButtons[0].$().attr("style").indexOf("10px") !== -1, "First button width is not cleared if predefined");

		// Cleanup
		oSB.destroy();
		oSB = null;
		aButtons = null;
		await nextUIUpdate(this.clock);
	});

	QUnit.test("_handleContainerResize private method", function (assert) {
		// Arrange
		var oSB = new SegmentedButton({
			items: [
				new SegmentedButtonItem({text: "Btn 1"}),
				new SegmentedButtonItem({text: "Btn 2"}),
				new SegmentedButtonItem({text: "Btn 3"})
			]
		});

		this.spy(oSB, "_clearAutoWidthAppliedToControl");
		this.spy(oSB, "_getRenderedButtonWidths");
		this.spy(oSB, "_updateWidth");

		// Act
		oSB._handleContainerResize();

		// Assert
		assert.ok(oSB._clearAutoWidthAppliedToControl.calledOnce, "Method _clearAutoWidthAppliedToControl called once");
		assert.ok(oSB._getRenderedButtonWidths.calledOnce, "Method _getRenderedButtonWidths called once");
		assert.ok(oSB._updateWidth.calledOnce, "Method _updateWidth called once");

		// Cleanup
		oSB.destroy();
		oSB = null;
	});

	QUnit.test("_updateWidth private method", async function (assert) {
		// Arrange
		var oSB,
			aButtons,
			i;

		oSB = new SegmentedButton({
			items: [
				new SegmentedButtonItem({text: "Btn 1"}),
				new SegmentedButtonItem({text: "Btn 2"}),
				new SegmentedButtonItem({text: "Btn 3"}),
				new SegmentedButtonItem({text: "Btn 4"})
			]
		}).placeAt("qunit-fixture");

		await nextUIUpdate(this.clock);

		aButtons = oSB.getButtons();

		// Act
		oSB._aWidths = [20, 20, 20, 20];
		oSB._updateWidth();

		// Assert
		assert.strictEqual(oSB.$().attr("style"), "width: 81px;", "Result should be sum of all 4 button widths which is 80 " +
				"plus one pixel added for the border");

		// Act
		oSB.setWidth("400px");

		// Assert
		for (i = 0;i < aButtons.length;i++) {
			assert.strictEqual(aButtons[i].$().attr("style"), "width: 25%;", "Width of all buttons should be 25%");
		}

		// Act
		oSB._aWidths = [0, 0, 0, 0];
		oSB._updateWidth();

		// Assert
		assert.notOk(oSB.$().css("width") === "1px", "Corner case when all reported inner buttons width is 0 applied width " +
				"should not be 1px");

		// Cleanup
		aButtons = null;
		oSB.destroy();
		oSB = null;
		await nextUIUpdate(this.clock);
	});

	QUnit.test("_updateWidth - sum of buttons width is greater than parent element width", async function (assert) {
		// Arrange
		var that = this,
			oSB = new SegmentedButton({
				items: [
					new SegmentedButtonItem({text: "Btn 1"}),
					new SegmentedButtonItem({text: "Btn 2"}),
					new SegmentedButtonItem({text: "Btn 3"}),
					new SegmentedButtonItem({text: "Btn 4"})
				]
			}).placeAt("qunit-fixture");

		await nextUIUpdate(this.clock);

		// Act
		// Here we replace the jQuery.innerWidth method to report stable width for the parent element if the parent
		// element is the qunit-fixture itself
		this._ojQueryInnerWidthMethod = jQuery.fn.innerWidth;
		jQuery.fn.innerWidth = function (sWidth) {
			if (!sWidth && this[0].id === "qunit-fixture") {
				return 100;
			}
			return that._ojQueryInnerWidthMethod.apply(this, arguments);
		};

		oSB._aWidths = [100, 100, 100];
		oSB._updateWidth();

		// Assert
		assert.ok(oSB.$().hasClass("sapMSegBFit"), "The proper class is set");

		// Restore jQuery.innerWidth method
		jQuery.fn.innerWidth = this._ojQueryInnerWidthMethod;

		// Cleanup
		oSB.destroy();
		oSB = null;
		this._ojQueryInnerWidthMethod = null;
		await nextUIUpdate(this.clock);
	});

	QUnit.test("_handleContainerResize fires _containerWidthChanged event when width is changed", async function (assert) {
		// Arrange
		var oSB = new SegmentedButton({
			items: [
				new SegmentedButtonItem({text: "Btn 1"}),
				new SegmentedButtonItem({text: "Btn 2"}),
				new SegmentedButtonItem({text: "Btn 3"})
			]
		}).placeAt("qunit-fixture");

		this.spy(oSB, "fireEvent");

		await nextUIUpdate(this.clock);

		// Assert
		assert.equal(oSB.fireEvent.callCount, 0, "FireEvent is not called on first rendering");

		// Act
		oSB.$().parent().innerWidth("10px");
		oSB._handleContainerResize();

		// Assert
		assert.ok(oSB.fireEvent.calledWith("_containerWidthChanged"), "The _containerWidthChanged event is fired");

		// Cleanup
		oSB.destroy();
		oSB = null;
		await nextUIUpdate(this.clock);
	});

	QUnit.test("getOverflowToolbarConfig - correct configuration for sap.m.OverflowToolbar control", function (assert) {
		// Arrange
		var oSB = new SegmentedButton(),
			oExpected = {
				canOverflow: true,
				listenForEvents: ["selectionChange"],
				autoCloseEvents: ["selectionChange"], // BCP: 1970012411 In overflow - selection should close the popover.
				propsUnrelatedToSize: ["enabled", "selectedKey"],
				invalidationEvents: ["_containerWidthChanged"],
				onBeforeEnterOverflow: oSB._onBeforeEnterOverflow,
				onAfterExitOverflow: oSB._onAfterExitOverflow
			};

		// Assert
		assert.deepEqual(oSB.getOverflowToolbarConfig(), oExpected,
			"Return object is valid for sap.m.OverflowToolbar configuration");

	});

	/* =========================================================== */
	/* Helper functionality module                                 */
	/* =========================================================== */

	QUnit.module("Data binding");

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Data binding buttons aggregation", function(assert) {
		// Arrange
		var mData = {
			"items" : [{
				"value" : "button0",
				"text" : "item0",
				"enabled" : true
			}, {
				"value" : "button1",
				"text" : "item1",
				"enabled" : true
			}, {
				"value" : "button2",
				"text" : "item2",
				"enabled" : true
			}, {
				"value" : "button3",
				"text" : "item3",
				"enabled" : true
			}, {
				"value" : "button4",
				"text" : "item4",
				"enabled" : true
			}, {
				"value" : "button5",
				"text" : "item5",
				"enabled" : true
			}, {
				"value" : "button6",
				"text" : "item6",
				"enabled" : false
			}, {
				"value" : "button7",
				"text" : "item7",
				"enabled" : true
			}, {
				"value" : "button8",
				"text" : "item8",
				"enabled" : true
			}

			],
			"selected" : "button6"
		};

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : {
				path : "/items",
				template : new Button({
					type : ButtonType.Default,
					text : "{text}",
					enabled : "{enabled}"
				})
			}
		});

		var oModel = new JSONModel();
		oModel.setData(mData);

		oSegmentedButton.setModel(oModel);

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons()[6].getText(), oModel.getData().items[6].text,
				"Button text should be equal to Model text");
		assert.strictEqual(oSegmentedButton.getButtons()[6].getEnabled(), oModel.getData().items[6].enabled,
				"Button enabled property should be equal to Model enabled property");

		// Act
		mData.items[6].enabled = true;
		oModel.updateBindings();
		oSegmentedButton.getButtons()[6].setText('sLabel');

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons()[6].getEnabled(), oModel.getData().items[6].enabled,
				"Button enabled property should be equal to Model enabled property");
		assert.strictEqual(oSegmentedButton.getButtons()[6].getText(), 'sLabel',
				"Button should have label: 'sLabel'");

		// Cleanup
		oSegmentedButton.destroy();
		oCore.applyChanges();
	});

	QUnit.test("Data binding items aggregation", async function(assert) {
		// Arrange
		var mData = {
			selectedKey: "b7",
			items: [
				{key: "b1", text: "btn 1", icon: "sap-icon://attachment"},
				{key: "b2", text: "btn 2", enabled: false},
				{key: "b3", text: "111 222 333", textDirection: TextDirection.RTL},
				{key: "b4", text: "btn 4", icon: "sap-icon://home"},
				{key: "b5", text: "btn 4", icon: "sap-icon://attachment"},
				{key: "b6", text: "btn 4", width: "100px"},
				{key: "b7", text: "btn 4", icon: "sap-icon://home"},
				{key: "b8", text: "btn 4"}
			]
		};

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			selectedKey: "{/selectedKey}",
			items : {
				path : "/items",
				template : new SegmentedButtonItem({
					key: "{key}",
					text: "{text}",
					icon: "{icon}",
					enabled: "{enabled}",
					textDirection: "{textDirection}",
					width: "{width}"
				})
			}
		});

		var oModel = new JSONModel();
		oModel.setData(mData);

		oSegmentedButton.setModel(oModel);

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getSelectedKey(), oModel.getData().selectedKey,
				"selectedKey property should be equal to Model");

		// Assert
		assert.strictEqual(oSegmentedButton.getItems()[0].getIcon(), oModel.getData().items[0].icon,
				"Button icon should be equal to Model icon");
		assert.strictEqual(oSegmentedButton.getItems()[6].getText(), oModel.getData().items[6].text,
				"Button text should be equal to Model text");
		assert.strictEqual(oSegmentedButton.getItems()[1].getEnabled(), oModel.getData().items[1].enabled,
				"Button enabled property should be equal to Model enabled property");
		assert.strictEqual(oSegmentedButton.getItems()[2].getTextDirection(), oModel.getData().items[2].textDirection,
				"Button textDirection should be equal to Model textDirection");
		assert.strictEqual(oSegmentedButton.getItems()[5].getWidth(), oModel.getData().items[5].width,
				"Button width should be equal to Model text");

		// Act
		mData.items[6].enabled = true;
		mData.items[6].text = "sLabel";

		// Update bindings with a change reason
		oModel.updateBindings(ChangeReason.Change);

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons()[6].getEnabled(), oModel.getData().items[6].enabled,
				"Button enabled property should be equal to Model enabled property after model update");

		assert.strictEqual(oSegmentedButton.getButtons()[6].getText(), 'sLabel',
				"Button should have label: 'sLabel' after model update");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);
	});

	QUnit.test("Data binding items aggregation live model change", async function(assert) {
		var mDataInitial,
			mDataSecond,
			oSegmentedButton,
			oModel;

		// Arrange
		mDataInitial = {
			items: [
				{key: "b1", text: "Initial btn 1"},
				{key: "b2", text: "Initial btn 2"},
				{key: "b3", text: "Initial btn 3"}
			]
		};

		mDataSecond = {
			selectedKey: "b7",
			items: [
				{key: "b1", text: "btn 1", icon: "sap-icon://attachment"},
				{key: "b2", text: "btn 2", enabled: false},
				{key: "b3", text: "111 222 333", textDirection: TextDirection.RTL},
				{key: "b4", text: "btn 4", icon: "sap-icon://home"},
				{key: "b5", text: "btn 4", icon: "sap-icon://home"},
				{key: "b6", text: "btn 4"},
				{key: "b7", text: "btn 4", icon: "sap-icon://home"},
				{key: "b8", text: "btn 4"}
			]
		};

		// System under Test
		oSegmentedButton = new SegmentedButton({
			selectedKey: "{/selectedKey}",
			items : {
				path : "/items",
				template : new SegmentedButtonItem({
					key: "{key}",
					text: "{text}",
					icon: "{icon}",
					enabled: "{enabled}",
					textDirection: "{textDirection}"
				})
			}
		});

		oModel = new JSONModel();
		oModel.setData(mDataInitial);

		oSegmentedButton.setModel(oModel);

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getItems().length, 3, "Should have 3 items");
		assert.strictEqual(oSegmentedButton.getButtons().length, 3, "Should have 3 buttons");
		assert.strictEqual(oSegmentedButton.$().find("li").length, 3, "Should have 3 buttons rendered");
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "b1", "selectedKey should be the default first item key");
		assert.strictEqual(oSegmentedButton.getItems()[0].getText(),
				"Initial btn 1", "Button text should be equal to initial Model text");

		// Act
		oModel.setData(mDataSecond);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(oSegmentedButton.getItems().length, 8, "Should have 8 items");
		assert.strictEqual(oSegmentedButton.getButtons().length, 8, "Should have 8 buttons");
		assert.strictEqual(oSegmentedButton.$().find("li").length, 8, "Should have 8 buttons rendered");
		assert.strictEqual(oSegmentedButton.getSelectedKey(), "b7", "selectedKey should be equal to the second model selectedKey");
		assert.strictEqual(oSegmentedButton.getButtons()[0].getText(), "btn 1",
				"Button text should be equal to second Model text");
		assert.strictEqual(oSegmentedButton.getButtons()[1].getEnabled(), false,
				"Button enabled should be equal to second Model enabled");
		assert.strictEqual(oSegmentedButton.getButtons()[2].getTextDirection(), TextDirection.RTL,
				"Button textDirection should be equal to second Model textDirection");
		assert.strictEqual(jQuery(oSegmentedButton.$().find("li")[2]).attr("dir"), TextDirection.RTL.toLowerCase(),
				"Button textDirection should be rendered to second Model textDirection");
		assert.strictEqual(oSegmentedButton.getButtons()[3].getIcon(), "sap-icon://home",
				"Button icon should be equal to second Model icon");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);
	});

	QUnit.module("Keyboard handling");

	QUnit.test("alt/meta key + right/left or + home/end is not handled", async function(assert) {
		var oSegmentedButton = new SegmentedButton({
			items: [
				new SegmentedButtonItem({ text: 'a'}),
				new SegmentedButtonItem({ text: 'b'}),
				new SegmentedButtonItem({ text: 'c'})
			]
		}).placeAt('qunit-fixture');
		await nextUIUpdate(this.clock);

		var oModifiers = oSegmentedButton._oItemNavigation.getDisabledModifiers();
		assert.ok(oModifiers["sapnext"], "sapnext has disabled modifiers");
		assert.ok(oModifiers["sapprevious"], "sapprevious has disabled modifiers");
		assert.ok(oModifiers["saphome"], "saphome has disabled modifiers");
		assert.ok(oModifiers["sapend"], "sapend has disabled modifiers");
		assert.ok(oModifiers["sapnext"].indexOf("alt") !== -1, "right is not handled when alt is pressed");
		assert.ok(oModifiers["sapnext"].indexOf("meta") !== -1, "right is not handled when meta key is pressed");
		assert.ok(oModifiers["sapprevious"].indexOf("alt") !== -1, "left is not handled when alt is pressed");
		assert.ok(oModifiers["sapprevious"].indexOf("meta") !== -1, "left is not handled when meta key is pressed");
		assert.ok(oModifiers["saphome"].indexOf("alt") !== -1, "home is not handled when alt is pressed");
		assert.ok(oModifiers["saphome"].indexOf("meta") !== -1, "home is not handled when meta key is pressed");
		assert.ok(oModifiers["sapend"].indexOf("meta") !== -1, "end is not handled when meta key is pressed");

		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	function checkKeyboardEventhandling(sTestName, oOptions) {
		QUnit.test(sTestName, function(assert) {
			// Arrange
			var oButton1 = new Button();
			var oButton2 = new Button();
			var oButton3 = new Button();

			// System under Test
			var oSegmentedButton = new SegmentedButton({
				buttons : [oButton1, oButton2, oButton3]
			});

			oSegmentedButton.placeAt("qunit-fixture");
			oCore.applyChanges();

			// Act
			var fnFireSelectSpy = this.spy(oSegmentedButton, "fireSelect");
			qutils.triggerKeydown(oButton1.getDomRef(), oOptions.keyCode);
			qutils.triggerKeyup(oButton1.getDomRef(), oOptions.keyCode);

			// Assert
			assert.strictEqual(fnFireSelectSpy.callCount, 0, "Event should not be fired, because the button is selected");

			// Act
			qutils.triggerKeydown(oButton2.getDomRef(), oOptions.keyCode);
			qutils.triggerKeyup(oButton2.getDomRef(), oOptions.keyCode);

			// Assert
			assert.strictEqual(fnFireSelectSpy.callCount, 1, "Event should be fired once");

			// Act
			qutils.triggerKeydown(oButton2.getDomRef(), oOptions.keyCode);
			qutils.triggerKeyup(oButton2.getDomRef(), oOptions.keyCode);

			// Assert
			assert.strictEqual(fnFireSelectSpy.callCount, 1, "Event should be fired once");

			// Cleanup
			oSegmentedButton.destroy();
		});
	}

	/**
	 * @deprecated Since version 1.28.
	 */
	checkKeyboardEventhandling("Firing ENTER event", {
		keyCode : KeyCodes.ENTER
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	checkKeyboardEventhandling("Firing SPACE event", {
		keyCode : KeyCodes.SPACE
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	function testNavigationSegmentedButton4Items(options) {
		//Arrange
		var sAddIconURI = IconPool.getIconURI("add");
		var oButton1 = new Button('buttonIcon0', {
			type: ButtonType.Default,
			icon: sAddIconURI,
			enabled: true
		});
		var oButton2 = new Button('buttonIcon1', {
			type: ButtonType.Default,
			icon: sAddIconURI,
			enabled: true
		});
		var oButton3 = new Button('buttonIcon2', {
			type: ButtonType.Default,
			icon: sAddIconURI,
			enabled: true
		});
		var oButton4 = new Button('buttonIcon3', {
			type: ButtonType.Default,
			icon: sAddIconURI,
			enabled: true
		});

		//System under test
		var SegmentedIcons = new SegmentedButton('SegmentedIcons', {
			buttons: [oButton1, oButton2, oButton3, oButton4],
			select: function(oEvent) {
				Log.info('press event segmented: ' + oEvent.getParameter('id'));
			}
		});
		SegmentedIcons.placeAt("qunit-fixture");
		oCore.applyChanges();

		//Arrange
		var btn = SegmentedIcons.getButtons()[options.initialSelectedIndex];
		SegmentedIcons.setSelectedButton(btn);
		btn.focus();

		//Act
		qutils.triggerKeydown(btn.getDomRef(), options.keycode);
		qutils.triggerKeyup(btn.getDomRef(), options.keycode);

		//Assert
		var focussedButtonId = document.activeElement.id;
		QUnit.assert.strictEqual(focussedButtonId,
				'buttonIcon' + options.expectedFocusedIndex,
				"Button with index " + options.expectedFocusedIndex + " should be focussed.");

		//Clean up
		SegmentedIcons.destroy();
		oCore.applyChanges();
	}

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Left Arrow after setSelectedButton call on image buttons - fix 619572', function(assert) {
		// Flip the arrow keys in RTL mode
		var keyCode = (Localization.getRTL()) ? KeyCodes.ARROW_RIGHT : KeyCodes.ARROW_LEFT;
		testNavigationSegmentedButton4Items({initialSelectedIndex: 3, expectedFocusedIndex: 2, keycode: keyCode});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Left Arrow when the first button has the focus', function(assert) {
		var keyCode = (Localization.getRTL()) ? KeyCodes.ARROW_RIGHT : KeyCodes.ARROW_LEFT;
		testNavigationSegmentedButton4Items({initialSelectedIndex: 0, expectedFocusedIndex: 0, keycode: keyCode});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Right Arrow', function(assert) {
		var keyCode = (Localization.getRTL()) ? KeyCodes.ARROW_LEFT : KeyCodes.ARROW_RIGHT;
		testNavigationSegmentedButton4Items({initialSelectedIndex: 1, expectedFocusedIndex: 2, keycode: keyCode});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Right Arrow when the last button has the focus', function(assert) {
		var keyCode = (Localization.getRTL()) ? KeyCodes.ARROW_LEFT : KeyCodes.ARROW_RIGHT;
		testNavigationSegmentedButton4Items({initialSelectedIndex: 3, expectedFocusedIndex: 3, keycode: keyCode});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Up Arrow', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 3, expectedFocusedIndex: 2, keycode: KeyCodes.ARROW_UP});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Up Arrow when the first button has the focus', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 0, expectedFocusedIndex: 0, keycode: KeyCodes.ARROW_UP});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Down Arrow', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 1, expectedFocusedIndex: 2, keycode: KeyCodes.ARROW_DOWN});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Down Arrow when the last button has the focus', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 3, expectedFocusedIndex: 3, keycode: KeyCodes.ARROW_DOWN});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Home', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 2, expectedFocusedIndex: 0, keycode: KeyCodes.HOME});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Home when the first button has the focus', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 0, expectedFocusedIndex: 0, keycode: KeyCodes.HOME});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Page up', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 2, expectedFocusedIndex: 0, keycode: KeyCodes.PAGE_UP});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Page up when the first button has the focus', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 0, expectedFocusedIndex: 0, keycode: KeyCodes.PAGE_UP});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('End', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 1, expectedFocusedIndex: 3, keycode: KeyCodes.END});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('End when the last button has the focus', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 3, expectedFocusedIndex: 3, keycode: KeyCodes.END});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Page up', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 1, expectedFocusedIndex: 3, keycode: KeyCodes.PAGE_DOWN});
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test('Page up when the last button has the focus', function(assert) {
		testNavigationSegmentedButton4Items({initialSelectedIndex: 3, expectedFocusedIndex: 3, keycode: KeyCodes.PAGE_DOWN});
	});

	QUnit.test("Press 'SPACE' should not scroll the page", function (assert) {
		// Arrange
		var oSB = new SegmentedButton(),
			oSpy = this.spy(),
			oEvent = {
				preventDefault: function () {
					oSpy();
				}
			};

		// Act
		oSB.onsapspace(oEvent);

		// Assert
		assert.equal(oSpy.callCount, 1, "preventDefault should be called on 'SPACE' to prevent scrolling");

		// Cleanup
		oSB.destroy();
	});

	/* Module ARIA*/

	QUnit.module('ARIA');

	QUnit.test("Root's general ARIA attributes", async function (assert) {
		var oFirstButton = new SegmentedButtonItem({ text: "First" }),
			oSecondButton = new SegmentedButtonItem({ text: "Second" }),
			oSegmentedButton = new SegmentedButton({
				items: [oFirstButton, oSecondButton]
			}),
			$segmentedButton;

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);


		$segmentedButton = oSegmentedButton.$();
		assert.strictEqual($segmentedButton.attr("role"), "listbox", "Control has role 'listbox'");
		assert.strictEqual($segmentedButton.attr("aria-multiselectable"), "true", "aria-multiselectable is set to 'true'");
		assert.strictEqual($segmentedButton.attr("aria-roledescription"), oResourceBundle.getText("SEGMENTEDBUTTON_NAME"),
			"Additional description for control's role is added");
		assert.strictEqual($segmentedButton.attr("aria-describedby"), InvisibleText.getStaticId("sap.m", "SEGMENTEDBUTTON_SELECTION"),
			"Tutor message for selection is added");

		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("Inner buttons' general ARIA attributes", async function (assert) {
		var oInnerButton = new SegmentedButtonItem({ text: "First" }),
			oInnerDisabledButton = new SegmentedButtonItem({ text: "Second", enabled: false }),
			oSegmentedButton = new SegmentedButton({
				items: [oInnerButton, oInnerDisabledButton]
			}),
			$innerButton,
			$innerDisabledButton;

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		$innerButton = oInnerButton.$();
		$innerDisabledButton = oInnerDisabledButton.$();

		assert.strictEqual($innerButton.attr("role"), "option", "Inner button has role 'option'");
		assert.strictEqual($innerDisabledButton.attr("role"), "option", "Second inner button has role 'option' as well");

		assert.strictEqual($innerButton.attr("aria-roledescription"), oResourceBundle.getText("SEGMENTEDBUTTON_BUTTONS_NAME"),
			"First button has an additional description of its role");
		assert.strictEqual($innerDisabledButton.attr("aria-roledescription"), oResourceBundle.getText("SEGMENTEDBUTTON_BUTTONS_NAME"),
			"Second button has an additional description of its role as well");

		assert.notOk($innerButton.attr("aria-disabled"), "Non-disabled buttons aren't marked as disabled");
		assert.strictEqual($innerDisabledButton.attr("aria-disabled"), "true", "Disabled buttons have aria-disabled");

		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Selection", function(assert) {
		// Arrange
		var oButton1 = new Button();
		var oButton2 = new Button();

		// System under Test
		var oSegmentedButton = new SegmentedButton({
			buttons : [oButton1, oButton2]
		});
		oSegmentedButton.setSelectedButton(oButton1);

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oButton1.$().attr("aria-selected"), "true", "Property 'aria-selected' of Button1 should be 'true'");
		assert.strictEqual(oButton2.$().attr("aria-selected"), "false", "Property 'aria-selected'  of Button2 should be 'false'");

		oButton2.$().trigger("tap");	// in a real mobile browser both tap and click are fired
		oButton2.$().trigger("click");

		assert.strictEqual(oButton1.$().attr("aria-selected"), "false", "Property 'aria-selected' of Button1 after deselect should be 'false'");
		assert.strictEqual(oButton2.$().attr("aria-selected"), "true", "Property 'aria-selected'  of Button2 after select should be 'true'");

		// Cleanup
		oSegmentedButton.destroy();
		oCore.applyChanges();
	});

	QUnit.test("Text-only SegmentedButtonItem's ARIA", async function (assert) {
		var oItem = new SegmentedButtonItem({ text: "Something" }),
			oSegmentedButton = new SegmentedButton({ items: oItem }),
			oItemDomRef;

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		oItemDomRef = oItem.getDomRef();
		assert.notOk(oItemDomRef.getAttribute("title"), "Default tooltip isn't added");
		assert.notOk(oItemDomRef.getAttribute("aria-label"), "aria-label isn't added");

		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("Icon-only SegmentedButtonItem's ARIA", async function (assert) {
		var oDefaultItem = new SegmentedButtonItem({
				icon: "sap-icon://list"
			}),
			oItemWithTooltip = new SegmentedButtonItem({
				icon: "sap-icon://list",
				tooltip: "Something"
			}),
			oSegmentedButton = new SegmentedButton({
				items: [
					oDefaultItem,
					oItemWithTooltip
				]
			}),
			oDefaultItemDomRef,
			oItemWithTooltipDomRef;

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		oDefaultItemDomRef = oDefaultItem.getDomRef();
		assert.strictEqual(oDefaultItemDomRef.getAttribute("title"), "list", "Icon's name serves as the tooltip");
		assert.strictEqual(oDefaultItemDomRef.getAttribute("aria-label"), "list", "Icon's name is added in aria-label");

		oItemWithTooltipDomRef = oItemWithTooltip.getDomRef();
		assert.strictEqual(oItemWithTooltipDomRef.getAttribute("title"), "Something", "User-provided tooltip is prioritized over icon's name ");
		assert.strictEqual(oItemWithTooltipDomRef.getAttribute("aria-label"), "Something", "This tooltip is added in aria-label as well");

		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);

	});

	QUnit.test("Combined(text + icon) SegmentedButtonItem's ARIA", async function (assert) {
		var oItem = new SegmentedButtonItem({ text: "Something", icon: "sap-icon://list" }),
			oSegmentedButton = new SegmentedButton({ items: oItem }),
			oItemDomRef;

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		oItemDomRef = oItem.getDomRef();
		assert.notOk(oItemDomRef.getAttribute("title"), "Default tooltip isn't added");
		assert.notOk(oItemDomRef.getAttribute("aria-label"), "aria-label isn't added");

		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Chech aria-posinset and aria-setsize attributes for SegmentedButton with invisible button ", function(assert) {
		// Arrange
		var oButton1 = new Button({ text: "First" }),
			oButton2 = new Button({ text: "Second", visible: false }),
			oButton3 = new Button({ text: "Third" }),
			oSegmentedButton = new SegmentedButton({
				buttons : [oButton1, oButton2, oButton3]
			});

		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		// Act
		// Assert
		assert.strictEqual(oButton1.$().attr("aria-posinset"), "1", "Property 'aria-pointset' of First is set correctly");
		assert.strictEqual(oButton1.$().attr("aria-setsize"), "2", "Property 'aria-setsize' of First is set correctly");
		assert.strictEqual(oButton3.$().attr("aria-posinset"), "2", "Property 'aria-pointset' of Third is set correctly");
		assert.strictEqual(oButton3.$().attr("aria-setsize"), "2", "Property 'aria-setsize' of Third is set correctly");

		// Act
		oButton2.setVisible(true);
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oButton1.$().attr("aria-posinset"), "1", "Property 'aria-pointset' of First is set correctly");
		assert.strictEqual(oButton1.$().attr("aria-setsize"), "3", "Property 'aria-setsize' of First is set correctly");
		assert.strictEqual(oButton2.$().attr("aria-posinset"), "2", "Property 'aria-pointset' of Second is set correctly");
		assert.strictEqual(oButton2.$().attr("aria-setsize"), "3", "Property 'aria-setsize' of Second is set correctly");
		assert.strictEqual(oButton3.$().attr("aria-posinset"), "3", "Property 'aria-pointset' of Third is set correctly");
		assert.strictEqual(oButton3.$().attr("aria-setsize"), "3", "Property 'aria-setsize' of Third is set correctly");

		// Cleanup
		oSegmentedButton.destroy();
		oCore.applyChanges();
	});

	QUnit.test("getAccessibilityInfo", async function(assert) {
		// Arrange
		var SegmentedItem = new SegmentedButtonItem({
				tooltip: "Tooltip",
				icon: "sap-icon://save"
			}),
			oSegmentedButton = new SegmentedButton({
				items : [ SegmentedItem ]
			}),
			oAccInfoSpy = this.spy(SegmentedItem.oButton, "getAccessibilityInfo"),
			sDescription;

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		// Act
		sDescription = oSegmentedButton.getAccessibilityInfo().description;

		// Assert
		assert.ok(oAccInfoSpy.calledOnce, "getAccessibilityInfo from sap.m.Button gets called");
		assert.strictEqual(sDescription, SegmentedItem.getTooltip(), "Proper description is generated");

		// Clean
		oSegmentedButton.destroy();
	});

	/* Module Select Mode */

	QUnit.module('Select Mode');

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("When not in select mode, there is no overhead", function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			buttons : [
				new Button({
					text: "button 1"
				}),
				new Button({
					text: "button 2"
				}),
				new Button({
					text: "button 3"
				})
			]
		});

		// Act
		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();
		oSegmentedButton.getButtons()[0].setText("new text");
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getAggregation("_select"),
				null,
				"The hidden select has not been instantiated");

		assert.strictEqual(oSegmentedButton._bInOverflow,
				undefined,
				"The property _bInOverflow does not exist at all");

		assert.strictEqual(oSegmentedButton.$("select").length,
				0,
				"The select is not in the DOM");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Activating select mode works", function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			buttons : [
				new Button({
					text: "button 1"
				}),
				new Button({
					text: "button 2"
				}),
				new Button({
					text: "button 3"
				})
			]
		});

		// Act
		oSegmentedButton.placeAt("qunit-fixture");
		oSegmentedButton._toSelectMode();
		oCore.applyChanges();

		// Assert
		assert.strictEqual(oSegmentedButton.getAggregation("_select").getMetadata().getName(),
				"sap.m.Select",
				"The hidden select is instantiated");

		assert.strictEqual(oSegmentedButton._bInOverflow,
				true,
				"The property _bInOverflow is set to true");

		assert.strictEqual(oSegmentedButton.$("select").length,
				1,
				"The select in in the DOM");

		// Cleanup
		oSegmentedButton.destroy();
	});


	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Modifying the segmented button affects the select", function(assert) {
		var newText = "new text",
			newIcon = "sap-icon://accept";

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			buttons : [
				new Button({
					text: "button 1",
					icon: "sap-icon://taxi"
				}),
				new Button({
					text: "button 2",
					icon: "sap-icon://lab"
				}),
				new Button({
					text: "button 3",
					icon: "sap-icon://competitor"
				})
			]
		});

		// Act
		oSegmentedButton.placeAt("qunit-fixture");
		oSegmentedButton._toSelectMode();
		oCore.applyChanges();

		oSegmentedButton.getButtons()[0].setText(newText);
		oSegmentedButton.getButtons()[0].setIcon(newIcon);
		this.clock.tick(1000);

		// Assert
		assert.strictEqual(oSegmentedButton.getAggregation("_select").getItems()[0].getText(),
				newText,
				"The select has been synced");

		assert.strictEqual(oSegmentedButton.getAggregation("_select").getItems()[0].getIcon(),
				newIcon,
				"The select's icon has been synced");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Modifying the select affects the segmented button", function(assert) {
		var newText = "new text";

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			buttons : [
				new Button({
					text: "button 1"
				}),
				new Button({
					text: "button 2"
				}),
				new Button({
					text: "button 3"
				})
			]
		});

		// Act
		oSegmentedButton.placeAt("qunit-fixture");
		oSegmentedButton._toSelectMode();
		oCore.applyChanges();

		oSegmentedButton.getButtons()[0].setText(newText);
		this.clock.tick(1000);

		// Assert
		assert.strictEqual(oSegmentedButton.getAggregation("_select").getItems()[0].getText(),
				newText,
				"The select has been synced");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("When switched to select mode and back to normal mode, the select is reused", function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			buttons : [
				new Button({
					text: "button 1"
				}),
				new Button({
					text: "button 2"
				}),
				new Button({
					text: "button 3"
				})
			]
		});

		// Act
		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();
		oSegmentedButton._toSelectMode();
		this.clock.tick(1000);
		oSegmentedButton._toNormalMode();
		this.clock.tick(1000);

		// Assert
		assert.ok(oSegmentedButton.getAggregation("_select"),
			"The hidden select has not been destroyed");

		assert.strictEqual(oSegmentedButton._bInOverflow,
				undefined,
				"The property _bInOverflow does not exist at all");

		assert.strictEqual(oSegmentedButton.$("select").length,
				1,
				"The select is still in the DOM");

		// Cleanup
		oSegmentedButton.destroy();
	});

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("_toSelectMode transfers only visible buttons into select items", function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			buttons: [
				new Button({
					text: "Button 1"
				}),
				new Button({
					text: "Button 2",
					visible: false
				}),
				new Button({
					text: "Button 3"
				}),
				new Button({
					text: "Invisible Button",
					visible: false
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		oCore.applyChanges();

		//Act
		oSegmentedButton._toSelectMode();

		// Assert
		assert.strictEqual(oSegmentedButton.getButtons().length, 4, "Control should still have 4 buttons");
		assert.strictEqual(oSegmentedButton.getAggregation("_select").getItems().length, 2, "Select should have 2 items");

		//Act
		oSegmentedButton.getButtons()[1].setVisible(true);

		// Assert
		assert.strictEqual(oSegmentedButton.getAggregation("_select").getItems().length, 3, "Select should have 3 items");

		// Cleanup
		oSegmentedButton.destroy();
		oCore.applyChanges();
	});

	QUnit.test("Can work with special characters in the ID", async function(assert) {

		// Arrange
		var oSegmentedButton = new SegmentedButton({
			items: [
				new SegmentedButtonItem({
					id: "contains::colon",
					text: "Button 1"
				}),
				new SegmentedButtonItem({
					text: "Button 2"
				}),
				new SegmentedButtonItem({
					text: "Button 3"
				})
			]
		});

		// System under Test
		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);

		assert.ok(oSegmentedButton.getDomRef(), "SegmentedButton should be rendered");

		oSegmentedButton.destroy();
	});

	QUnit.module("SegmentedButton in communicates changes in its aggregated items/buttons");

	/**
	 * @deprecated Since version 1.28.
	 */
	QUnit.test("Changing the text property aggregated buttons", function (assert) {
		// Arrange
		var oTestButton = new Button({text: "Button 1"}),
			oSegmentedButton = new SegmentedButton({buttons: [oTestButton]}),
			sNewText = "new Text",
			fnChangHandler = this.spy();

		oSegmentedButton.placeAt("qunit-fixture");

		oSegmentedButton.attachEvent("_change", fnChangHandler);

		// Assert
		assert.equal(fnChangHandler.callCount, 0, "Initially the change event hasn't been fired");

		//Act
		oTestButton.setText(sNewText);

		//Assert
		assert.strictEqual(oTestButton.getText(), sNewText, "The internal button has changed its text");
		assert.equal(fnChangHandler.callCount, 1, "The change event has been fired after the button's property has changed");

		// Cleanup
		oSegmentedButton.destroy();
		oCore.applyChanges();
	});


	QUnit.test("Changing the text property aggregated items", async function (assert) {
		// Arrange
		var oTestItem = new SegmentedButtonItem({text: "Button 1"}),
			oSegmentedButton = new SegmentedButton({items: [oTestItem]}),
			sNewText = "new Text",
			fnChangHandler = this.spy();

		oSegmentedButton.placeAt("qunit-fixture");
		await nextUIUpdate(this.clock);
		oSegmentedButton.attachEvent("_change", fnChangHandler);

		// Assert
		assert.equal(fnChangHandler.callCount, 0, "Initially the change event hasn't been fired");

		//Act
		oTestItem.setText(sNewText);

		//Assert
		assert.strictEqual(oTestItem.getText(), sNewText, "The internal button has changed its text");
		assert.equal(fnChangHandler.callCount, 1, "The change event has been fired after the SegmentedButtonItem's property has changed");

		// Cleanup
		oSegmentedButton.destroy();
		await nextUIUpdate(this.clock);
	});

	QUnit.test("Adding items (XML view with binding)", function(assert) {
		// Arrange
		var fnChangHandler = this.spy();

		return XMLView.create({
			definition:  '<mvc:View xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc">'
						+ '  <SegmentedButton id="SB" items="{/}">'
						+ '    <items>'
						+ '      <SegmentedButtonItem text="{text}"/>'
						+ '    </items>'
						+ '  </SegmentedButton>'
						+ '</mvc:View>'
		}).then(function(oView) {

			oView.setModel(new JSONModel());

			oView.byId("SB").attachEvent("_change", fnChangHandler);

			// Assert
			assert.equal(fnChangHandler.callCount, 0, "Initially the change event hasn't been fired");

			// Act
			oView.getModel().setData([{text: "Test"}]);

			// Assert
			assert.equal(fnChangHandler.callCount, 1, "The change event has been fired after new item is added");

			// Cleanup
			oView.destroy();
		});
	});

	QUnit.test("Removing items (XML view with binding)", function(assert) {
		// Arrange
		var fnChangHandler = this.spy();

		return XMLView.create({
			definition:  '<mvc:View xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc">'
				+ '  <SegmentedButton id="SB" items="{/}">'
				+ '    <items>'
				+ '      <SegmentedButtonItem text="{text}"/>'
				+ '    </items>'
				+ '  </SegmentedButton>'
				+ '</mvc:View>'
		}).then(function(oView) {

			oView.setModel(new JSONModel([{text: "Test"}]));

			oView.byId("SB").attachEvent("_change", fnChangHandler);

			// Assert
			assert.equal(fnChangHandler.callCount, 0, "Initially the change event hasn't been fired");

			// Act
			oView.getModel().setData([]);

			// Assert
			assert.equal(fnChangHandler.callCount, 1, "The change event has been fired after new item is added");

			// Cleanup
			oView.destroy();
		});
	});

	QUnit.module("SegmentedButtonItem", {
		beforeEach: function () {
			this.oSBI = new SegmentedButtonItem();
		},
		afterEach: function () {
			this.oSBI.destroy();
			this.oSBI = null;
		}
	});

	QUnit.test("Objects needed for CustomStyleClass sync between item and internal button", function (assert) {
		// Arrange
		var oB = this.oSBI.oButton,
			oSBI = this.oSBI;

		// Assert
		assert.strictEqual(oB.aCustomStyleClasses, oSBI.aCustomStyleClasses, "This should be a reference to the same object");
		assert.strictEqual(oB.mCustomStyleClassMap, oSBI.mCustomStyleClassMap, "This should be a reference to the same object");
	});

	QUnit.test("CustomData sync", function (assert) {
		// Arrange
		var oCustomData = new CustomData({
			key: "my",
			value: "5"
		});
		this.oSBI.addCustomData(oCustomData);

		// Assert
		assert.strictEqual(this.oSBI.oButton.getCustomData()[0], oCustomData,
			"The CustomData returned from the internal button should be a reference to the same CustomData added in the item");
	});

	QUnit.test("LayoutData sync", function (assert) {
		// Arrange
		// Keep in mind that we are using sap.ui.core.LayoutData which is an abstract class and this usage is ok only for testing
		var oLayoutData = new LayoutData();
		this.oSBI.setLayoutData(oLayoutData);

		// Assert
		assert.strictEqual(this.oSBI.oButton.getLayoutData(), oLayoutData,
			"The LayoutData returned from the internal button should be a reference to the same LayoutData set in the item");
	});

	QUnit.test("Press event", function (assert) {
		// Arrange
		var oSB = new SegmentedButton({
			items: [
				this.oSBI
			]
		}),
		aButtons = oSB.getButtons();

		this.oSBI.attachPress(function () {
			// Assert
			assert.ok(true, "Event attached to the item should be fired when the button event is fired");
		});

		// Act
		aButtons[0].firePress();
	});

	QUnit.test("Cleanup - standalone", function (assert) {
		// Arrange
		var oDestroySpy = this.spy(this.oSBI.oButton, "destroy");

		// Act
		this.oSBI.destroy();

		// Internal created button should be destroyed
		assert.strictEqual(oDestroySpy.callCount, 1, "Destroy method of the button should be called once");
		assert.strictEqual(this.oSBI.oButton, null, "Internal button pointer should be null");

		// Cleanup
		oDestroySpy.restore();
	});

	QUnit.test("Cleanup - sap.m.SegmentedButton", function (assert) {
		// Arrange
		var oSB = new SegmentedButton({
			items: [
				this.oSBI
			]
		});

		// Act - destroy the SegmentedButton
		oSB.destroy();

		// Assert
		assert.strictEqual(this.oSBI.oButton, null, "The internal button should be destroyed");
	});

	QUnit.test("destroyItems should destroy internal buttons created from the SegmentedButtonItem", async function (assert) {
		// Arrange
		var oSegmentedButtonItem = new SegmentedButtonItem(),
			oButtonDestroySpy = this.spy(oSegmentedButtonItem.oButton, "destroy"),
			oSB = new SegmentedButton({ items: oSegmentedButtonItem }).placeAt("qunit-fixture");

		// Act
		oSB.destroyItems();

		// Assert
		assert.equal(oButtonDestroySpy.callCount, 1, "internal button should be destroyed");

		// Cleanup
		oSB.destroy();
		oButtonDestroySpy.restore();
		await nextUIUpdate(this.clock);
	});

	QUnit.test("destroyItems should destroy internal buttons and adding item with the same ID should not throw an exception", async function (assert) {
		// Arrange
		var sSegmentedButtonId = "testId",
			oSegmentedButtonItem = new SegmentedButtonItem(sSegmentedButtonId),
			oSB = new SegmentedButton({ items: oSegmentedButtonItem });

		// Act
		oSB.destroyItems();
		oSB.addItem(new SegmentedButtonItem(sSegmentedButtonId));

		// Assert
		assert.ok(true, "no dublicate id exception is thrown");

		// Cleanup
		oSB.destroy();
		await nextUIUpdate(this.clock);
	});

	QUnit.module("sap.ui.core.CustomData and 'items' aggregation", {
		beforeEach: async function () {
			// Create the control
			this.oSB = new SegmentedButton({
				items: [
					new SegmentedButtonItem({
						text: "Btn1",
						customData: {
							key: "my",
							value: "1",
							writeToDom: true
						}
					}),
					new SegmentedButtonItem({
						text: "Btn2",
						customData: {
							key: "my",
							value: "2",
							writeToDom: true
						}
					}),
					new SegmentedButtonItem({
						text: "Btn3"
					})
				]
			}).placeAt("qunit-fixture");
			// Get custom data of the first item
			this.oCD = this.oSB.getItems()[0].getCustomData()[0];

			await nextUIUpdate(this.clock);
		},
		afterEach: async function () {
			this.oSB.destroy();
			this.oSB = null;

			this.oCD.destroy();
			this.oCD = null;
			await nextUIUpdate(this.clock);
		}
	});

	QUnit.test("CustomData is rendered correct in the dom", function (assert) {
		// Arrange
		var aBtn = this.oSB.getButtons();

		// Assert
		assert.strictEqual(aBtn[0].getCustomData()[0].getKey(), "my", "There is CustomData with key 'my' in the first button");
		assert.strictEqual(aBtn[0].$().data("my"), 1, "There is CustomData attribute with value '1' rendered on the first button");
		assert.strictEqual(aBtn[1].$().data("my"), 2, "There is CustomData attribute with value '2' rendered on the second button");
		assert.strictEqual(aBtn[2].getCustomData().length, 0, "There is no CustomData on the third button");
		assert.strictEqual(aBtn[2].$().data("my"), undefined, "There is no CustomData rendered on the third button");
	});

	QUnit.test("Update of item's CustomData Value property must be reflected in the SegmentedButton", async function (assert) {
		// Act - change the CustomData value of the item
		this.oCD.setValue("2222");
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getButtons()[0].$().data("my"), 2222, "The rendered CustomData on the first button should be updated");
	});

	QUnit.test("Update of item's CustomData Key property must be reflected in the SegmentedButton", async function (assert) {
		// Arrange
		var oFirstButton;

		// Act - change the CustomData key of the item
		this.oCD.setKey("yours");
		await nextUIUpdate(this.clock);

		// Get first button after update because it's regenerated
		oFirstButton = this.oSB.getButtons()[0];

		// Assert
		assert.strictEqual(oFirstButton.$().data("my"), undefined,
			"There should be no CustomData with key 'my' rendered on the first");
		assert.strictEqual(oFirstButton.$().data("yours"), 1,
			"There should be new CustomData with key 'yours' rendered on the first button");
	});

	QUnit.test("Update of item's CustomData writeToDom property must be reflected in the SegmentedButton", async function (assert) {
		// Act - change the CustomData writeToDom property
		this.oCD.setWriteToDom(false);
		await nextUIUpdate(this.clock);

		// Assert
		assert.strictEqual(this.oSB.getButtons()[0].$().data(this.oCD.getKey()), undefined,
			"There should be new CustomData with key 'yours' rendered on the first button");
	});
});
