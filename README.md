# Demo Messaging Application
An application for sending and receiving messages via a 3rd party SMS service
(in this specific case Twilio)

## Running
- git clone this repository
### API
- cd into api directory
- npm install 
- set the following environment variables
    - TWILIO_ACCOUNT_SID={your twilio account sid}
    - TWILIO_AUTH_TOKEN={your twilio auth token}
    - TWILIO_NUMBER={your outbound twilio number}
    - PORT=3001
- set the twilio tunnel for receiving messages as follows
`twilio phone-numbers:update {YOUR_TWILIO_NUMBER} --sms-url="http://localhost:3001/api/communications/receive"`
- npm start
### Client
- cd into client directory
- npm install
- npm start

### Usage 
- navigate to localhost:3000 in your browser

## Future Work
- Replace sqlite3 with a more robust and non disk based sql server (MySQL, Postgres)
- the messaging service should ideally just put items on a queue that a queue triggered process
  then sends off. This would allow support for backoff when issues arise with the twilio service
  and a dead letter queue.
- The polling request that gets the current message for a communication could be converted to websockets

