import React, { useState, useEffect} from "react";
import {isValidPhoneNumber} from "../common"
let NewCommunication = props => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [pending, setPending] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setErrorMessage(null);
    setPending(true);
    
    //Validate all form fields have values
    if(!name || !phone || !message){
      setErrorMessage("All fields are required");
      return false;
    }

    //Validate phone number
    if(!isValidPhoneNumber(phone)){
      setErrorMessage("Invalid phone number format");
      return false;
    }
    props.initiateCommunication(name, phone, message).then(res => {
      setPending(false)
      setName("");
      setPhone("");
      setMessage("");
      props.close();
    });
  };


  return (
    <form onSubmit={handleSubmit}>
      <label className="label" htmlFor="name">
        Name :
        <input
          className="input"
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        ></input>
      </label>
      <label className="label" htmlFor="phoneNumber">
        Phone Number :
        <input
          className="input"
          type="phone"
          id="phoneNumber"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        ></input>
      </label>
      <label className="label" htmlFor="message">
        Message{" "}
        <textarea
          className="textarea"
          value={message}
          onChange={e => setMessage(e.target.value)}
        ></textarea>
      </label>
      {errorMessage ? (
        <div className="notification is-warning">{errorMessage}</div>
      ) : null}
      <button className={`button ${pending ? "disabled" : ""}`}>
        {pending ? "Sending" : "Submit"}
      </button>
    </form>
  );
};

export default NewCommunication;
