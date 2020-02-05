import React from "react";


let Message = props => {
  return (
      <div style={{width: "100%",
                   padding: "1em"}}>
    <div
      className={`box ${
        props.message.source
          ? "has-background-grey-lighter"
          : "has-background-light"
      }`}
      style={{ width: "45%",
               marginLeft: props.message.source ? "1%" : "auto", //used to put outbound messages on the right
                                                                 //and inbound messages on the left
               marginRight: props.message.source ? "auto": "1%", 
               padding: "1%"
                }}
    >
      <div>{props.message.contents}</div>
      <div className="has-text-grey-light">{props.message.timestamp}</div>
    </div>
    </div>
  );
};
export default Message;
