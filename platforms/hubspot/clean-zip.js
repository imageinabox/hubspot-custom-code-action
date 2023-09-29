/*******************************************
 * Trims whitespace and only keeps 5 digits
 * in the zip field.
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/

exports.main = async (event, callback) => {

	//Take the input field.
	const current_zip = event.inputFields['zip'];

	//Trim it, substring to only the first 5 characters.
	let cleaned_zip = current_zip.trim().substring(0, 5);

	callback({
		outputFields: {
			cleaned_zip: cleaned_zip,
		}
	});
}

