

/*!
 * ${copyright}
 */

// sap.ui.mdc.BaseDelegate
sap.ui.define(['sap/ui/mdc/enum/BaseType', 'sap/ui/mdc/DefaultTypeMap', "sap/base/Log"], function (BaseType, DefaultTypeMap, Log) {
	"use strict";

	/**
	 * Basic Delegate for {@link sap.ui.mdc.Control}, {@link sap.ui.mdc.Element}<br>
	 *
	 * All delegate implementations for MDC controls must be derived directly or indirectly from this entity.
	 *
	 * <b>Note:</b> The method getTypeUtil is final. Please implement {@link sap.ui.mdc.BaseDelegate.getTypeMap getTypeMap} to customize type configuration for your usage-scenarios.
	 *
	 * @namespace
	 * @alias module:sap/ui/mdc/BaseDelegate
	 * @author SAP SE
	 * @private
	 * @ui5-restricted sap.fe
	 * @MDC_PUBLIC_CANDIDATE
	 * @experimental
	 * @since 1.79.0
	 */
	var BaseDelegate = {};

	/**
	* Returns a TypeUtil for this delegate.
	*
	* <b>Note:</b>
	* Since 1.114.0 <code>getTypeUtil</code> is final!
	* Applications should implement {@link sap.ui.mdc.BaseDelegate.getTypeMap getTypeMap} instead to provide type mappings.
	* Please also see the following extensible presets: {@link sap.ui.mdc.DefaultTypeMap}, {@link sap.ui.mdc.odata.TypeMap}, {@link sap.ui.mdc.odata.v4.TypeMap}
	*
	* @param {sap.ui.mdc.Control} oControl Delegate payload object
	* @return {sap.ui.mdc.util.TypeUtil|sap.ui.mdc.util.TypeMap} configured TypeUtil/TypeMap
	* @since 1.79.0
	* @deprecated (since 1.115.0) - please see {@link #getTypeMap}
	*
	*/
	BaseDelegate.getTypeUtil = function (oControl) {
		if (this.getTypeMap && this.getTypeMap.__mapped) {
			return this.getTypeMap.getOriginalMethod().call(this, oControl);
		} else {
			return this.getTypeMap(oControl);
		}
	};



	/**
	 * Returns the typeutil configuration for this delegate.
	 *
	 * @param {sap.ui.mdc.Control} oControl Delegate payload object
	 * @return {sap.ui.mdc.util.TypeMap} typeMap configuration for this delegate
	 * Note: The returned array will also serve as a key in the weakmap-based typeutil cache of BaseDelegate
	 * @since 1.114.0
	 */
	BaseDelegate.getTypeMap = function (oControl) {
		// Support existing custom TypeUtils until all stakeholders switched to TypeMaps
		var fnInstanceGetter = (this.getTypeUtil && this.getTypeUtil.__mapped) ? this.getTypeUtil.getOriginalMethod() : this.getTypeUtil;
		var fnBaseGetter = (BaseDelegate.getTypeUtil && BaseDelegate.getTypeUtil.__mapped) ? BaseDelegate.getTypeUtil.getOriginalMethod() : BaseDelegate.getTypeUtil;
		var bHasTypeUtil = fnInstanceGetter && fnInstanceGetter !== fnBaseGetter;
		return bHasTypeUtil ? fnInstanceGetter.call(this, oControl) : DefaultTypeMap;
	};

	return BaseDelegate;
});
