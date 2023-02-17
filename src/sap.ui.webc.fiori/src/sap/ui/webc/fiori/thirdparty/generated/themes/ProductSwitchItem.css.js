sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/asset-registries/Themes", "sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css", "./sap_fiori_3/parameters-bundle.css"], function (_exports, _Themes, _parametersBundle, _parametersBundle2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _parametersBundle = _interopRequireDefault(_parametersBundle);
  _parametersBundle2 = _interopRequireDefault(_parametersBundle2);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => _parametersBundle.default);
  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents-fiori", "sap_fiori_3", () => _parametersBundle2.default);
  var _default = {
    packageName: "@ui5/webcomponents-fiori",
    fileName: "themes/ProductSwitchItem.css",
    content: ":host{width:var(--_ui5_product_switch_item_width);height:var(--_ui5_product_switch_item_height);margin:.25rem;border-radius:.25rem;box-sizing:border-box;background:var(--sapList_Background)}:host([selected]){background:var(--sapList_SelectionBackgroundColor);border:.125rem solid var(--sapList_SelectionBorderColor)}:host(:hover){background:var(--sapList_Hover_Background)}:host([selected]:hover){background:var(--sapList_Hover_SelectionBackground)}:host([active]),:host([selected][active]){background:var(--sapList_Active_Background)}:host([active]) .ui5-product-switch-item-root .ui5-product-switch-item-icon,:host([active]) .ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-subtitle,:host([active]) .ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-title{color:var(--sapList_Active_TextColor)}:host([focused]){outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:var(--_ui5_product_switch_item_outline_offset)}:host([active][focused]){outline-color:var(--_ui5_product_switch_item_active_outline_color)}.ui5-product-switch-item-root{user-select:none;width:100%;height:100%;flex-direction:column;display:flex;align-items:center;text-decoration:none;outline:none;box-sizing:border-box;padding:.5rem;padding-top:4rem;cursor:pointer;border:var(--_ui5_product_switch_item_border)}:host([icon]) .ui5-product-switch-item-root{padding-top:.5rem}:host([selected]) .ui5-product-switch-item-root{padding:.375rem}.ui5-product-switch-item-root .ui5-product-switch-item-icon{width:3rem;height:3rem;padding:.75rem;margin-bottom:.5rem;box-sizing:border-box;color:var(--sapContent_IconColor);pointer-events:none}.ui5-product-switch-item-root .ui5-product-switch-item-text-content{display:flex;align-items:center;flex-direction:column;max-width:10.25rem}.ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-subtitle,.ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-title{line-height:1.25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;pointer-events:none;text-align:center}.ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-title{font-size:var(--sapFontHeader6Size);color:var(--sapGroup_TitleTextColor)}.ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-title:only-child{white-space:normal;-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical}.ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-subtitle{font-size:var(--sapFontSmallSize);color:var(--sapContent_LabelColor)}@media only screen and (max-width:600px){:host{margin:0;width:100%;max-width:600px;height:5rem;border-radius:0}.ui5-product-switch-item-root{padding:0 1rem;flex-direction:row}:host([icon]) .ui5-product-switch-item-root{padding-top:0}.ui5-product-switch-item-root .ui5-product-switch-item-icon{padding:.875rem;color:var(--sapContent_NonInteractiveIconColor);margin:0 .75rem 0 0}.ui5-product-switch-item-root .ui5-product-switch-item-text-content{align-items:flex-start;max-width:100%}:host([icon]) .ui5-product-switch-item-root .ui5-product-switch-item-text-content{max-width:calc(100% - 3.75rem)}.ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-subtitle,.ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-title{line-height:normal}.ui5-product-switch-item-root .ui5-product-switch-item-text-content .ui5-product-switch-item-subtitle{font-size:var(--sapFontSize);padding-top:.75rem}}[ui5-product-switch-item][focused]{outline:none;position:relative}[ui5-product-switch-item][focused] .ui5-product-switch-item-root:after{content:\"\";position:absolute;border-color:var(--_ui5_product_switch_item_outline_color);border-width:var(--_ui5_product_switch_item_outline_width);border-style:dotted;top:var(--_ui5_product_switch_item_outline_offset_positive);bottom:var(--_ui5_product_switch_item_outline_offset_positive);left:var(--_ui5_product_switch_item_outline_offset_positive);right:var(--_ui5_product_switch_item_outline_offset_positive)}[ui5-product-switch-item][active][focused] .ui5-product-switch-item-root:after{border-color:var(--_ui5_product_switch_item_active_outline_color)}"
  };
  _exports.default = _default;
});