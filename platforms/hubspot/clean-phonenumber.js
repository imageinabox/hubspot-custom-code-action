/*******************************************
 * NOT PERFECT but it doesn't help clean up US Phone
 * Numbers in HubSpot.
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/

exports.main = async (event, callback) => {
    /*****
     Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
     *****/
    const phone = event.inputFields['phone'];
    let cleaned = ('' + phone).replace(/\D/g, '');
    let newPhone = cleaned;
    let different = false;

    if( cleaned.length === 10 || ( cleaned.substr(0, 1) === "1" && cleaned.length === 11 ) ) {
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '');
            if( typeof match[1]==='undefined' ) {
                intlCode = '+1 ';
            }
            newPhone = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
    } else {
        newPhone = '+' + newPhone;
    }

    if( phone !== newPhone ) {
        different = true;
    }

    /*****
     Use the callback function to output data that can be used in later actions in your workflow.
     *****/
    callback({
        outputFields: {
            formattedPhone: newPhone,
            isDifferent: different
        }
    });
}