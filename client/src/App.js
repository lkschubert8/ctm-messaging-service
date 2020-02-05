import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import CommunicationList from "./components/CommunicationList";
import MessageList from "./components/MessageList";
import { apiUrl } from "./consts";
import NewCommunication from "./components/NewCommunication";

const sendMessage = (selectedCommunicationId, message) => {
  console.log(selectedCommunicationId);
  return fetch(`${apiUrl}/communications/${selectedCommunicationId}/messages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  });
};

const initiateCommunication = (name, phoneNumber, message) => {
  return fetch(`${apiUrl}/communications`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, message, phoneNumber })
  });
};

function App() {
  const [communications, setCommunications] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/communications`).then(res => {
      res.json().then(jsonRes => {
        setCommunications(jsonRes);
      });
    });
  }, []); //Run once on component initialization
  const [selectedCommunication, setSelectedCommunication] = useState(null);
  const [displayNewCommunication, setDisplayNewCommunication] = useState(false);

  
  return (
    <div className="columns" style={{height: "100vh"}}>
      <CommunicationList
        className="column is-3"
        communications={communications}
        selectedCommunication={selectedCommunication}
        setSelectedCommunication={setSelectedCommunication}
        addCommunication={e => setDisplayNewCommunication(true)}
      ></CommunicationList>
      <MessageList
        className="column"
        selectedCommunication={selectedCommunication}
        sendMessage={sendMessage}
      ></MessageList>
      <div className={`modal ${displayNewCommunication ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <button
              class="modal-close is-large"
              aria-label="close"
              onClick={_ => setDisplayNewCommunication(false)}
            ></button>
            <NewCommunication
              initiateCommunication={initiateCommunication}
              close={_ => setDisplayNewCommunication(false)}
            ></NewCommunication>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
