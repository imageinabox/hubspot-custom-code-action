/*******************************************
 * This create a SMS Logged Activity on the contact record.
 * Useful when you manually sending SMS messages through an API
 * or something other system.
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/

const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
    const message = event.inputFields['message'];
    const contact_id = event.inputFields['recordID'];

    const hubspotClient = new hubspot.Client({accessToken: process.env.appToken});
    const now = new Date();

    const data = {
        properties: {
            hs_communication_channel_type: "SMS",
            hs_communication_logged_from: "CRM",
            hs_timestamp: now.toISOString(),
            hs_communication_body: "<strong>SMS Message:</strong><br/>" + message
        },
        associations: [
            {
                to: {
                    id: contact_id
                },
                types: [{
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 81
                }]
            },
            {}
        ]
    };

    hubspotClient.crm.
    hubspotClient.crm.objects.basicApi.create('notes', properties).then((results) => {
        let note = results.body;

        hubspotClient.crm.objects.associationsApi.create('note', note.id, 'deal', deal_id, 'note_to_deal').then(() => {
            codeResult = true;
        }).catch((err2) => {
            console.log(err2);
        });

    }).catch((err) => {
        console.log(err);
    });

    callback({
        outputFields: {
            result: codeResult,
        }
    });
}