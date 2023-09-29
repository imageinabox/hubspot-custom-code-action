/*******************************************
 * Returns the internal value of a field.
 *
 * License: GNU GPLv3
 * Copyright: 2023 Image in a Box, LLC
 ********************************************/

exports.main = async (event, callback) => {

    //Whatever inputField you add. Make sure the name matches this.
    //I used a custom property that was a select field that stored the internal value as the ID I needed.
    const string_datetime = event.inputFields['datetime'];

    callback({
        outputFields: {
            result: string_datetime
        }
    });
}