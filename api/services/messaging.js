const twilio = require('twilio');
//Requires environment variables TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_NUMBER

class TwilioMessagingService {
    constructor(accountSid, authToken, twilioNumber){
        this.client = twilio(accountSid, authToken);
        this.phoneNumber = twilioNumber;
    }

    sendMessage(toPhoneNumber, contents){
        return this.client.messages.create({body: contents,
                                     to: toPhoneNumber,
                                     from: this.phoneNumber})
    }
}

if(!process.env.TWILIO_ACCOUNT_SID ||
   !process.env.TWILIO_AUTH_TOKEN ||
   !process.env.TWILIO_NUMBER){
    console.error("Environment variables required for TwilioMessagingService not set");
    process.exit(1);
}
module.exports = new TwilioMessagingService(process.env.TWILIO_ACCOUNT_SID,
                                            process.env.TWILIO_AUTH_TOKEN,
                                            process.env.TWILIO_NUMBER)
