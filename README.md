# Demo Messaging Application
An application for sending and receiving messages via a 3rd party SMS service
(in this specific case Twilio)

## Running
- git clone this repository
### API
- cd into api directory
- npm install 
- set the following environment variables
    - TWILIO_ACCOUNT_SID
    - TWILIO_AUTH_TOKEN
    - TWILIO_NUMBER
- set the twilio tunnel for receiving messages as follows
`twilio phone-numbers:update {YOUR_TWILIO_NUMBER} --sms-url="http://localhost:3001/api/communications/receive"`
- npm start
### Client
- cd into client directory
- npm install
- npm start

### Usage 
- navigate to localhost:3000 in your browser

