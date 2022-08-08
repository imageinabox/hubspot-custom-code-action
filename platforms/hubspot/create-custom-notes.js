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

    hubspotClient.crm.objects.basicApi.create('notes', properties).then((results) => {
        let note = results.body;

        hubspotClient.crm.objects.associationsApi.create('note', note.id, 'deal', deal_id, 'note_to_deal').then((results2) => {
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