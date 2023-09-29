const axios = require('axios');
const _ = require('lodash');

exports.main = async (event, callback) => {

    const axiosConfig = {
        baseURL: 'https://api.hubapi.com',
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.HubSpot_appToken
        }
    };

    /*****
     Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
     *****/
    let input_args = event.inputFields;
    let result = false;

    //Function/Logic here


    callback({
        outputFields: {
            result: result
        }
    });
}