/*******************************************
 * Auto enrolls a user into a Thinkific Course
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/
const axios = require('axios');

//Needs to CHANGE per Workflow
const course_id = 0;
const enrollDate = new Date();


exports.main = (event) => {
	// Instantiate HubSpot Client that will be used to interface with Source Portal (Portal A)
	const thinkific_user_id = event.inputFields['thinkific_user_id'];

	let data = {
		'course_id': '' + course_id,
		'user_id'  : '' + thinkific_user_id,
		'activated_at': '' + enrollDate.toISOString()
	};

	let config = {
		headers: {
			'X-Auth-API-Key'  : '' + process.env.THINKIFIC_APIKEY,
			'X-Auth-Subdomain': '' + process.env.THINKIFIC_SUBDOMAIN,
			'Content-Type'    : 'application/json'
		}
	};

	axios
		.post('https://api.thinkific.com/api/public/v1/enrollments', data, config)
		.then(response => {
			// Retrieve the translated text from the response
			console.log( response.data );
		});
}