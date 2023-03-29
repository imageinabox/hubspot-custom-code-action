exports.main = async (event, callback) => {
    /*****
     Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
     *****/
    const phone = event.inputFields['phone'];
    let newPhone = '';
    let cleaned = ('' + phone).replace(/\D/g, '');
    let addPlusOne = false;
    if( cleaned.length === 10 ) {
        addPlusOne = true;
    }
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        newPhone = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }

    console.log( phone );
    if(addPlusOne) {
        newPhone = "+1 " + newPhone;
    }
    console.log( newPhone );
    /*****
     Use the callback function to output data that can be used in later actions in your workflow.
     *****/
    callback({
        outputFields: {
            formattedPhone: newPhone
        }
    });
}