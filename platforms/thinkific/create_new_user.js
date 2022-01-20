const hubspot = require('@hubspot/api-client');
// Import Axios library for easier HTTP request making
const axios = require('axios');

exports.main = (event, callback) => {
	// Instantiate HubSpot Client that will be used to interface with Source Portal (Portal A)
	const hubspotClient = new hubspot.Client({
		apiKey: process.env.HAPIKEY
	});

	// Store the contact properties to sync in variables
	hubspotClient.crm.contacts.basicApi
		.getById(
			event.object.objectId,
			['email', 'firstname', 'lastname']
		)
		.then(contact => {
			let email = contact.body.properties.email;
			let firstname = contact.body.properties.firstname;
			let lastname = contact.body.properties.lastname;

			//console.log(contact.body.properties);

			let data = {
				'first_name': '' + firstname,
				'last_name' : '' + lastname,
				'email'     : '' + email
			};

			let config = {
				headers: {
					'X-Auth-API-Key'  : '' + process.env.THINKIFIC_APIKEY,
					'X-Auth-Subdomain': '' + process.env.THINKIFIC_SUBDOMAIN,
					'Content-Type'    : 'application/json'
				}
			};

			axios
				.post('https://api.thinkific.com/api/public/v1/users', data, config)
				.then(response => {
					// Retrieve the translated text from the response
					//console.log( response.data );
					let userID = response.data.id;
					//console.log(userID);

					// Store the text in an output String called "englishText". It can then be
					// copied in a property using "copy property value" workflow action.
					callback({
						outputFields: {
							thinkificUserID: userID
						}
					})
				});
		});
}