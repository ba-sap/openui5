/*!
 * ${copyright}
 */

sap.ui.define(["./library"],
	function(library) {
	"use strict";

	/**
	 * ActionTileContentRenderer
	 * @namespace
	 */
	var ActionTileContentRenderer = {
		apiVersion: 2    // enable in-place DOM patching
	};

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer
	 * @param {sap.m.ActionTileContent} oControl An object representation of the control that is rendered
	 */
	ActionTileContentRenderer.render = function(oRm, oControl) {
		var Priority = library.Priority;

		oRm.openStart("div",oControl );
		oRm.class("sapMATC");
		oRm.openEnd();
		if (oControl.getPriority() !== Priority.None && oControl.getPriorityText()) {
			this._renderPriority(oRm,oControl);
		}
		this._renderContent(oRm,oControl);
		oRm.close("div");
	};

	/**
	 * Renders the priority inside the ActionTileContent
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer
	 * @param {sap.m.ActionTileContent} oControl The control that is rendered
	 * @private
	 */
	ActionTileContentRenderer._renderPriority = function(oRm, oControl) {
		var sPriorityText = oControl.getPriorityText();
		oRm.openStart("div", oControl.getId() + "-priority-value");
		oRm.class("sapMTilePriorityValue");
		oRm.class(oControl.getPriority());
		oRm.openEnd();
		oRm.text(sPriorityText);
		oRm.close("div");
	};

	/**
	 * Renders the TileAttributess inside the ActionTileContent
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer
	 * @param {sap.m.ActionTileContent} oControl The control that is rendered
	 * @private
	 */
	ActionTileContentRenderer._renderContent = function(oRm, oControl) {
		oRm.openStart("div",oControl.getId() + "-contentContainer");
		oRm.class("sapMContainer");
		oRm.openEnd();
		oControl.getAttributes().forEach(function(oAttribute) {
			oRm.renderControl(oAttribute);
		});
		oRm.close("div");
	};
	return ActionTileContentRenderer;
}, /* bExport= */ true);