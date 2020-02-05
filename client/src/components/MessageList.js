import React, { useState, useEffect } from "react";
import Message from "./Message";
import { apiUrl } from "../consts";

let MessageList = props => {
  const [messages, setMessages] = useState([]);
  let pollingInterval;
  useEffect(() => {
    window.clearInterval(pollingInterval);
    if (props.selectedCommunication !== null) {
      fetch(`${apiUrl}/communications/${props.selectedCommunication}/messages`)
        .then(res => {
          res.json().then(jsonRes => {
            setMessages(jsonRes);
          });
        })
        .catch(err => {
          console.log(err);
          setMessages([]);
        });

      //Poll for messages every 4 seconds
      //TODO replace with websockets
      pollingInterval = setInterval(
        () =>
          fetch(
            `${apiUrl}/communications/${props.selectedCommunication}/messages`
          )
            .then(res => {
              res.json().then(jsonRes => {
                setMessages(jsonRes);
              });
            })
            .catch(err => {
              console.log(err);
              setMessages([]);
            }),
        4000
      );
    }
  }, [props.selectedCommunication]);
  if (props.selectedCommunication !== null) {
    return (
      <div style={{ padding: "1%", width: "100%", maxHeight: "100vh" }}>
        <div style={{ height: "80vh", overflowY: "scroll" }}>
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
          <div className="columns">
            <input
              className="input column is-10"
              type="text"
              placeholder="New Message"
              id="newMessage"
              name="newMessage"
            ></input>
            <button className="button column is-primary">Send</button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div>Please Select a Communication</div>;
  }
};

export default MessageList;
