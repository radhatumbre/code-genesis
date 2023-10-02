import React, { Component } from "react";
import "./ChatboxStyle.css";

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

  handleSendMessage = () => {
    const { userInput, messages } = this.state;

    console.log(userInput);

    if (userInput === "") return;


    const userMessage = { name: "User", message: userInput };
    this.setState({
      messages: [...messages, userMessage],
      userInput: "",
    });

    // Your fetch logic here...
  };

  render() {
    const { isOpen, messages, userInput } = this.state;

    return (
      <div className="chatbox">
        <button className="chatbox__button" onClick={this.toggleChatbox}>
          <img src="./images/chatbox-icon.svg" alt="Chatbox" />
        </button>
        <div className={`chatbox__support ${isOpen ? "chatbox--active" : ""}`}>
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                alt="image"
              />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Chat support</h4>
              <p className="chatbox__description--header">
                Hi. My name is Sam. How can I help you?
              </p>
            </div>
          </div>

          <div className="chatbox__messages">
            <div></div>
          </div>
          <div className="chatbox__footer">
            <input type="text" placeholder="Write a message..." />
            <button
              className="chatbox__send--footer send__button"
              onClick={this.handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chatbox;
