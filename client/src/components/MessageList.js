import React, { useState, useEffect } from "react";
import Message from "./Message";
import { apiUrl } from "../consts";


//kept outside of component to prevent loss of reference
let pollingInterval;

const getMessages = (selectedCommunication, setMessagesCallback) => {
    fetch(`${apiUrl}/communications/${selectedCommunication}/messages`)
        .then(res => {
          res.json().then(jsonRes => {
            setMessagesCallback(jsonRes);
          });
        })
        .catch(err => {
          console.log(err);
          setMessagesCallback([]);
        });
};

let MessageList = props => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    window.clearInterval(pollingInterval);
    if (props.selectedCommunication !== null) {
      getMessages(props.selectedCommunication, setMessages);

      //Poll for messages every 4 seconds
      //TODO replace with websockets
      pollingInterval = setInterval(
        () => getMessages(props.selectedCommunication, setMessages),
        4000
      );
    }
  }, [props.selectedCommunication]);

  if (props.selectedCommunication !== null) {
    return (
      <div
        style={{
          padding: "1%",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {props.back ? (
          <button
            className="button is-small is-primary is-pulled-left"
            onClick={props.back}
          >
            Go Back
          </button>
        ) : null}
        <div style={{ overflowY: "scroll", height: "80vh" }}>
          {messages.map(message => (
            <Message message={message}></Message>
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            let contents = e.target[0].value;
            e.target[0].value = "";
            setMessages([...messages, { source: 0, contents: contents }]);
            props.sendMessage(props.selectedCommunication, contents);
          }}
        >
          <div className="columns" style={{ height: "20vh" }}>
            <div className="column is-11 is-full-mobile">
              <textarea
                className="textarea"
                placeholder="New Message"
                id="newMessage"
                name="newMessage"
              ></textarea>
            </div>
            <div className="column">
              <button className="button is-primary is-pulled-right">Send</button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return <div>Please Select a Communication</div>;
  }
};

export default MessageList;
