/*******************************************
 * Creates a Promotion Code off
 *
 * License: GNU GPLv3
 * Copyright: 2024 Image in a Box, LLC
 ********************************************/
const axios = require('axios');

// Your Stripe secret key
const stripeSecretKey = process.env.STRIPE;
const stripeMainCouponCode = process.env.STRIPE;

exports.main = async (event, callback) => {
    /*****
     Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
     *****/
    const company = event.inputFields['company'];
    let success = false;
    let expiration = new Date();
    let createdCode = '';
    // Call the function to create the promotion code
    let code = await createPromotionCode(company);
    if( code.code ) {
        success = true;
        createdCode = code.code;
        expiration = new Date(code.expires_at * 1000 )
    }
    /*****
     Use the callback function to output data that can be used in later actions in your workflow.
     *****/
    callback({
        outputFields: {
            result: success,
            code: createdCode,
            expiration: expiration.getTime()
        }
    });
}

// Function to create a one-time-use promotion code
async function createPromotionCode(company) {
    try {

        // Step 2: Calculate the expiration date (10 days from today at 23:59:59 in US-Central timezone)
        const now = new Date();

        // Convert the current time to the US-Central timezone offset
        const centralTimezoneOffset = -6; // CST is UTC-6
        const centralTimezoneOffsetDST = -5; // CDT is UTC-5, depending on daylight saving time

        // Check if daylight saving time is in effect for the calculated date
        const isDST = (new Date(now.getFullYear(), 2, -((new Date(now.getFullYear(), 2, 0).getDay() + 1) % 7 + 1))).getTime() <= now.getTime() &&
            now.getTime() < new Date(now.getFullYear(), 10, -((new Date(now.getFullYear(), 10, 0).getDay() + 1) % 7 + 1)).getTime();

        // Set the correct timezone offset based on DST
        const timezoneOffset = isDST ? centralTimezoneOffsetDST : centralTimezoneOffset;

        // Calculate the timestamp for 10 days from now at 23:59:59
        const expirationDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 10, 23 - timezoneOffset, 59, 59);
        const expirationTimestamp = Math.floor(expirationDate.getTime() / 1000);

        const regex = /[^a-zA-Z0-9]/g;

        let couponObject = {
            "code": company.toUpperCase().replaceAll(regex, ''),
            "coupon": stripeMainCouponCode,
            "expires_at": expirationTimestamp.toString(),
            "max_redemptions": "1",
            "restrictions": {
                "first_time_transaction": "true"
            }
        };

        // Step 3: Create the promotion code
        const promotionCodeResponse = await axios.post('https://api.stripe.com/v1/promotion_codes', couponObject,
            {
                headers: {
                    Authorization: `Bearer ${stripeSecretKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return promotionCodeResponse.data;
    } catch (error) {
        console.error('Error creating Promotion Code:', error.response ? error.response.data : error.message);
    }
}
