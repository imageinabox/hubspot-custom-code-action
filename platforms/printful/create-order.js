/*******************************************
 * Create a new DRAFT Order in Printful
 * for a specific product
 *
 * License: GNU GPLv3
 * Copyright: 2024 Image in a Box, LLC
 ********************************************/
// Import the Axios module
const axios = require('axios');

// Your Printful API Key
const API_KEY = process.env.PRINTFUL;

// Printful API endpoint for creating orders
const API_ENDPOINT = 'https://api.printful.com/orders';

exports.main = async (event, callback) => {
    /*****
     Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
     *****/
    const inputArgs = event.inputFields;

    let success = false;
    let orderID = '';

    orderID = await createOrder(inputArgs);
    if( orderID ) {
        success = true;
    }
    /*****
     Use the callback function to output data that can be used in later actions in your workflow.
     *****/
    callback({
        outputFields: {
            result: success,
            orderID: orderID,
        }
    });
}

// Function to create a new order
async function createOrder(inputArgs) {
    try {
        // Order data
        const orderData = {
            recipient: {
                name: inputArgs.firstname + ' ' + inputArgs.lastname,
                address1: inputArgs.address,
                city: inputArgs.city,
                state_code: inputArgs.state,
                country_code: inputArgs.country,
                zip: inputArgs.zip,
                phone: inputArgs.phone
            },
            items: [
                {
                    variant_id: inputArgs.variationID, // Replace with the actual variant ID
                    quantity: 1
                }
            ],
            shipping: 'STANDARD'
        };

        const response = await axios.post(API_ENDPOINT, orderData, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Check if the request was successful
        if (response.status === 200 && response.data.code === 200) {
            console.log('Order created successfully!');
            console.log('Order ID:', response.data.result.id);
            console.log('Order Status:', response.data.result.status);
            return response.data.result.id;
        } else {
            console.error('Error creating order:', response.data.result);
        }
    } catch (error) {
        // Log any error that occurs during the request
        console.error('Request failed:', error.response ? error.response.data : error.message);
    }
}

// Call the function to create an order
createOrder();