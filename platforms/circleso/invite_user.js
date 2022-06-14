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

			let url_parameters = '?';
			url_parameters += 'email=' + email;
			url_parameters += '&name=' + firstname + " " + lastname;
			url_parameters += '&community_id=12173&space_ids%5B%5D=88178&space_ids%5B%5D=93941&space_group_ids%5B%5D=28149'

			let config = {
				headers: {
					'Authorization'  : 'Bearer ' + process.env.CIRCLE_SO,
					'Content-Type'    : 'application/json'
				}
			};

			axios
				.post('https://app.circle.so/api/v1/community_members' + url_parameters, null, config)
				.then(response => {
					// Retrieve the translated text from the response
					console.log( response.data );
					let userID = response.data.user.id;
					//console.log(userID);

					// Store the text in an output String called "englishText". It can then be
					// copied in a property using "copy property value" workflow action.
					callback({
						outputFields: {
							circleSoID: userID
						}
					})
				});
		});
}