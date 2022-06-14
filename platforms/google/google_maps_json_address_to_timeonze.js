const axios = require('axios');

exports.main = async (event, callback) => {

	const base_url = 'https://maps.googleapis.com/maps/api/';
	const city = event.inputFields['city'];
	const state = event.inputFields['state'];
	const country = event.inputFields['country'];
	let latlng = false;
	let timezone = false;

	try {
		let url_parameters = 'geocode/json?address=' + city + ', ' + state + ', ' + country;
		url_parameters += '&key=' + process.env.GOOGLE_MAPS_API

		axios.get( base_url + url_parameters ).then(response => {
			//console.log( response.data );
			if( response.data.status === "OK" ) {
				latlng = response.data.results[0].geometry.location;

				if( latlng !== false ) {
					try {
						let datetime = new Date();
						let url_timezone = 'timezone/json?location=' + latlng.lat + ',' + latlng.lng;
						url_timezone += '&timestamp=' + Math.round(datetime.getTime() / 1000 );
						url_timezone += '&key=' + process.env.GOOGLE_MAPS_API;

						axios.get( base_url + url_timezone ).then(response2 => {
							if( response2.data.status === "OK" ) {
								timezone = ( response2.data.rawOffset / 3600 );
								if( timezone !== false ) {
									let timeZoneString = "UTC";
									if( timezone > 0 ) {
										timeZoneString = "UTC+";
									}
									callback({
										outputFields: {
											timezone: timeZoneString + timezone + " (" + response2.data.timeZoneId + ")",
										}
									});
								}
							}
						}).catch(e2 => {
							console.log("b",e2);
						});

					} catch ( err2 ) {

						console.log( "2",err2 );
						throw err2;
					}
				}

			}
		}).catch(e => {
			console.log("a",e);
		});
	} catch (err) {
		console.error("1",err);
		// We will automatically retry when the code fails because of a rate limiting error from the HubSpot API.
		throw err;
	}

}