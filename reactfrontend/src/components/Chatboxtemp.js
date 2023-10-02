import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faMessage } from "@fortawesome/free-solid-svg-icons"; // Import the faRobot icon

import './ChatboxStyle.css';

class Chatbox extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      messages: [],
      userInput: "",
    };
  }

  toggleChatbox = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleUserInput = (e) => {
    this.setState({ userInput: e.target.value });
  };

  // ...

handleSendMessage = () => {
  const { userInput, messages } = this.state;

  console.log(userInput);

  if (userInput === "") return;

  const userMessage = { name: "User", message: userInput };
  this.setState({
    messages: [...messages, userMessage],
    userInput: "",
  });

  // Send the user message to Flask server
  fetch("http://127.0.0.1:5000/predict", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botMessage = { name: "Bot", message: data.answer };
      this.setState({
        messages: [...this.state.messages, botMessage],
      });
    })
    .catch((error) => {
      console.error("Error sending m`essage:", error);
    });
};

// ...


    // Your fetch logic here...


  render() {
    const { isOpen, messages, userInput } = this.state;


    return (
      <div>
        <div
          className={`chatbox__header ${isOpen ? "open" : ""}`}
          onClick={this.toggleChatbox}
        >
          <div className="chatbox__image--header">
            {/* You can replace this with your own icon */}
            <FontAwesomeIcon icon={faMessage} />


          </div>
        </div>

        {isOpen && (
            <div className="chatbox__popup">
            <div className="chatbox__popup-header">
              <div className="chatbox__header-icon">
                {/* Add your icon here */}
            <FontAwesomeIcon icon={faRobot} />
              </div>
              <div className="chatbox__header-content">
                <h3 className="chatbox__header-title">Chat Support</h3>
                <p className="chatbox__header-description">
                  Hi. My name is Alexa. How can I help you?
                </p>
              </div>
            </div>

            <div className="chatbox__popup-messages">
      {/* Display chat messages here */}
    </div>

    <div className="chatbox__popup-messages">
  {messages.map((message, index) => (
    <div key={index} className={`message ${message.name.toLowerCase()}`}>
      <strong>{message.name}:</strong> {message.message}
    </div>
  ))}
</div>

    <div className="chatbox__popup-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={userInput}
        onChange={this.handleUserInput}
      />
      <button onClick={this.handleSendMessage}>Send</button>
    </div>

          </div>
        )}
      </div>
    );
  }
}

export default Chatbox;
