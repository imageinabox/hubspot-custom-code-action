/*******************************************
 * Creates a Task within WRITE in a specific
 * Folder.
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/

// Import Axios library for easier HTTP request making
const axios = require('axios');

exports.main = async (event, callback) => {

    let wrikeConfig = {
        headers: {
            'Authorization': 'Bearer ' + process.env.WRIKE,
        }
    };

    let meeting_date = new Date(parseInt(event.inputFields['meeting']));
    let meeting_date_local = new Date(meeting_date.toLocaleString("en-US", {timeZone: "America/Chicago"}));

    // URL Past
    let url_parameters = "?title=Sales Meeting - " + event.inputFields['first'] + " " + event.inputFields['last'];
    url_parameters += "&description=Sales meetings with " + event.inputFields['first'] + " " + event.inputFields['last'];
    url_parameters += "&importance=High";
    url_parameters += "&dates={'type':'Planned','duration':30,'start':'" + meeting_date_local.toJSON().split(".")[0] + "'}";
    url_parameters += "&responsibles=[KUAHSHVY,KUAHSH57]";

    let URL = "https://www.wrike.com/api/v4/folders/" + process.env.WRIKE_FOLDER_SALES + "/tasks" + url_parameters;

    console.log(URL);

    axios.post(URL, {}, wrikeConfig).then(response => {
        callback({
            outputFields: {
                result: true
            }
        });
    }).catch(error => {
        console.log(error);
    });
}
