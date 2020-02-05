import React from "react";

let Communication = props => {
  return (
    <li
      className="Communication"
      onClick={e => {
        e.preventDefault();
        props.setSelectedCommunication(props.communication.communicationId);
      }}
    >
      <a className={props.communication.communicationId === props.selectedCommunication ? "is-active" : ""}>
        <b>{props.communication.name}</b> ({props.communication.phoneNumber})
      </a>
    </li>
  );
};

export default Communication;
