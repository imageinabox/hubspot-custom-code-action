/*******************************************
 * Build a search property value for Contact Record.
 *
 * License: GNU GPLv3
 * Copyright: 2024 Image in a Box, LLC
 ********************************************/

exports.main = async (event, callback) => {
    /*****
     Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
     *****/
    const input_args = event.inputFields;

    //US ONLY
    const link = 'https://www.linkedin.com/search/results/people/?geoUrn=%5B%22103644278%22%5D&keywords='+ input_args['firstname'] +'%20'+ input_args['lastname'] +'&origin=FACETED_SEARCH&sid=vHU'

    /*****
     Use the callback function to output data that can be used in later actions in your workflow.
     *****/
    callback({
        outputFields: {
            link: link
        }
    });
}