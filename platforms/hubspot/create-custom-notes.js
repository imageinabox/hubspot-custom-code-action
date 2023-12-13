/*******************************************
 * This create a NOTE Activity on the contact record.
 * Useful when you need to log activity from another system.
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/
const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
    const deal_id = event.inputFields['deal_id'];

    const hubspotClient = new hubspot.Client({accessToken: process.env.appToken});
    const now = new Date();
    let codeResult = false;

    const properties = {
        properties: {
            hs_timestamp: now.toISOString(),
            hs_note_body: "<strong>Production Note:</strong><br/>" + event.inputFields['note']
        }
    };


    //Results now
    hubspotClient.crm.objects.basicApi.create('notes', properties).then((result) => {

        hubspotClient.crm.objects.associationsApi.create('note', result.id, 'deal', deal_id, 'note_to_deal').then(() => {
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