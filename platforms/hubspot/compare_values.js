/*******************************************
 * Compares 6 input fields of scores and
 * returns the HIGHEST score.
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/

const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {

	const result = [
		'HubSpot',
		'Inbound Marketing',
		'Marketing Automation',
		'Sales Automation',
		'Sales Software',
		'Smarketing'
	];
	const test = [
		event.inputFields['intent___hubspot'],
		event.inputFields['intent___inbound_marketing'],
		event.inputFields['intent___marketing_automation'],
		event.inputFields['intent___sales_automation'],
		event.inputFields['intent___sales_software'],
		event.inputFields['intent___smarketing'],
	];

	test.forEach(function(value,key) {
		console.log(typeof value);
		if( typeof value === 'undefined' ) {
			test[key] = 0;
		} else {
			test[key] = parseInt(value);
		}
	});

	let maxValue = Math.max(...text);
	let indexOf = test.indexOf( maxValue );
	let highestIntent = result[indexOf];

	callback({
		outputFields: {
			intent: highestIntent,
		}
	});
}

