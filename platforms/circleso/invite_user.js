/*******************************************
 * Automatically adds a new user to a CIRCLE.so
 * Account
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/

const hubspot = require('@hubspot/api-client');
// Import Axios library for easier HTTP request making
const axios = require('axios');

//SETUP! Needs to change per account.
const community_id = 0;
const space_ids = [0, 0];
const space_group_ids = [ 0 ];

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
			url_parameters += '&community_id='+community_id+'&space_ids[]='+space_ids.join('&space_ids[]=') + '&space_group_ids[]='+space_group_ids.join('&space_group_ids[]=');
			url_parameters = encodeURI(url_parameters);

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
				})
				.catch(err=>{
					console.log(err);
					throw err;
				});
		});
}