sap.ui.define([], function () {
	'use strict';
	return {
		"_version": "1.14.0",
		"sap.app": {
			"id": "cards.performance.manifests.analyticalCard",
			"type": "card",
			"title": "Sample of a Line Chart",
			"subTitle": "Sample of a Line Chart",
			"applicationVersion": {
				"version": "1.0.0"
			},
			"shortTitle": "A short title for this Card",
			"info": "Additional information about this Card",
			"description": "A long description for this Card",
			"tags": {
				"keywords": [
					"Analytical",
					"Card",
					"Line",
					"Sample"
				]
			}
		},
		"sap.ui": {
			"technology": "UI5",
			"icons": {
				"icon": "sap-icon://line-chart"
			}
		},
		"sap.card": {
			"type": "Analytical",
			"header": {
				"type": "Numeric",
				"data": {
					"json": {
						"number": "65.34",
						"unit": "K",
						"trend": "Down",
						"state": "Error",
						"target": {
							"number": 100,
							"unit": "K"
						},
						"deviation": {
							"number": 34.7,
							"state": "Critical"
						},
						"details": "Q1, 2018"
					}
				},
				"title": "Project Cloud Transformation",
				"subTitle": "Revenue",
				"unitOfMeasurement": "EUR",
				"mainIndicator": {
					"number": "{number}",
					"unit": "{unit}",
					"trend": "{trend}",
					"state": "{state}"
				},
				"details": "{details}",
				"sideIndicators": [{
						"title": "Target",
						"number": "{target/number}",
						"unit": "{target/unit}"
					},
					{
						"title": "Deviation",
						"number": "{deviation/number}",
						"unit": "%",
						"state": "{deviation/state}"
					}
				]
			},
			"content": {
				"chartType": "Line",
				"chartProperties": {
					"title": {
						"text": "Line chart",
						"visible": true,
						"alignment": "left"
					},
					"legend": {
						"visible": "{legend/visible}"
					},
					"legendGroup": {
						"layout": {
							"position": "{legend/position}",
							"alignment": "{legend/alignment}"
						}
					},
					"plotArea": {
						"dataLabel": {
							"visible": true
						}
					},
					"categoryAxis": {
						"title": {
							"visible": false
						}
					},
					"valueAxis": {
						"title": {
							"visible": false
						}
					}
				},
				"data": {
					"json": {
						"dimensions": {
							"weekLabel": "Weeks"
						},
						"measures": {
							"revenueLabel": "Revenue",
							"costLabel": "Costs"
						},
						"legend": {
							"visible": true,
							"position": "bottom",
							"alignment": "topLeft"
						},
						"list": [{
								"Week": "CW14",
								"Revenue": 431000.22,
								"Cost": 230000.00,
								"Cost1": 24800.63,
								"Cost2": 205199.37,
								"Cost3": 199999.37,
								"Target": 500000.00,
								"Budget": 210000.00
							},
							{
								"Week": "CW15",
								"Revenue": 494000.30,
								"Cost": 238000.00,
								"Cost1": 99200.39,
								"Cost2": 138799.61,
								"Cost3": 200199.37,
								"Target": 500000.00,
								"Budget": 224000.00
							},
							{
								"Week": "CW16",
								"Revenue": 491000.17,
								"Cost": 221000.00,
								"Cost1": 70200.54,
								"Cost2": 150799.46,
								"Cost3": 80799.46,
								"Target": 500000.00,
								"Budget": 238000.00
							},
							{
								"Week": "CW17",
								"Revenue": 536000.34,
								"Cost": 280000.00,
								"Cost1": 158800.73,
								"Cost2": 121199.27,
								"Cost3": 108800.46,
								"Target": 500000.00,
								"Budget": 252000.00
							},
							{
								"Week": "CW18",
								"Revenue": 675000.00,
								"Cost": 230000.00,
								"Cost1": 140000.91,
								"Cost2": 89999.09,
								"Cost3": 100099.09,
								"Target": 600000.00,
								"Budget": 266000.00
							},
							{
								"Week": "CW19",
								"Revenue": 680000.00,
								"Cost": 250000.00,
								"Cost1": 172800.15,
								"Cost2": 77199.85,
								"Cost3": 57199.85,
								"Target": 600000.00,
								"Budget": 280000.00
							},
							{
								"Week": "CW20",
								"Revenue": 659000.14,
								"Cost": 325000.00,
								"Cost1": 237200.74,
								"Cost2": 87799.26,
								"Cost3": 187799.26,
								"Target": 600000.00,
								"Budget": 294000.00
							}
						]
					},
					"path": "/list"
				},
				"dimensions": [{
					"name": "{dimensions/weekLabel}",
					"value": "{Week}"
				}],
				"measures": [{
						"name": "{measures/revenueLabel}",
						"value": "{Revenue}"
					},
					{
						"name": "{measures/costLabel}",
						"value": "{Cost}"
					}
				],
				"feeds": [{
						"uid": "valueAxis",
						"type": "Measure",
						"values": [
							"{measures/revenueLabel}",
							"{measures/costLabel}"
						]
					},
					{
						"uid": "categoryAxis",
						"type": "Dimension",
						"values": [
							"{dimensions/weekLabel}"
						]
					}
				]
			}
		}
	};
});