import React from "react";
import Communication from "./Communication";

let CommunicationList = props => {
  return (
    <aside className="menu" style={{ backgroundColor: "#EEEEEE",
                                     padding: "1%",
                                     height: "100%"}}>
      <p className="menu-label">Communications</p>
      <ul className="menu-list">
        {props.communications.map(comm => (
          <Communication
            communication={comm}
            selectedCommunication={props.selectedCommunication}
            setSelectedCommunication={props.setSelectedCommunication}
          ></Communication>
        ))}
      </ul>
      <button style={{marginTop: "2vh"}}
        className="button is-primary is-light"
        onClick={props.addCommunication}
      >
        New Communication
      </button>
    </aside>
  );
};

export default CommunicationList;
