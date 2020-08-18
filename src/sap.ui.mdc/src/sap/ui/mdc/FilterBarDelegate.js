/*
 * ! ${copyright}
 */

// ---------------------------------------------------------------------------------------
// Delegate class used to help create content in the filterbar and fill relevant metadata
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
sap.ui.define(["sap/ui/mdc/AggregationBaseDelegate"], function(AggregationBaseDelegate) {
	"use strict";
	/**
	 * Base Delegate for {@link sap.ui.mdc.FilterBar FilterBar}. Extend this object in your project to use all functionalites of the {@link sap.ui.mdc.FilterBar FilterBar}.
	 * <b>Note:</b>
	 * The class is experimental and the API/behavior is not finalized and hence this should not be used for productive usage.
	 * @author SAP SE
	 * @private
	 * @experimental
	 * @since 1.61.0
	 * @alias sap.ui.mdc.FilterBarDelegate
	 */
	var FilterBarDelegate = Object.assign({}, AggregationBaseDelegate);

	FilterBarDelegate.addItem = function(sPropertyName, oFilterBar, mPropertyBag) {
		return Promise.resolve(null);
	};

	FilterBarDelegate.removeItem = function(sPropertyName, oFilterBar, mPropertyBag) {
		// return true within the Promise for default behavior
		return Promise.resolve(true);
	};

	return FilterBarDelegate;
});
