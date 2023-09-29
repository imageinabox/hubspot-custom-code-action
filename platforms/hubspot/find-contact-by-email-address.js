/*******************************************
 * Finds another contacts that match that same
 * email address.
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/

const axios = require('axios');

exports.main = async (event, callback) => {
    /*****
     Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
     *****/

    const email = event.inputFields['email'];

    let foundContact = false;

    let data = JSON.stringify({
        "query": email
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.HubSpot_appToken
        },
        data: data
    };

    await axios.request(config)
        .then(response => {
            if( response?.data?.total > 0 ){
                foundContact = true;
            }
        })
        .catch(err => {
            console.log(err);
        });

    /*****
     Use the callback function to output data that can be used in later actions in your workflow.
     *****/
    callback({
        outputFields: {
            foundContact: foundContact
        }
    });
}