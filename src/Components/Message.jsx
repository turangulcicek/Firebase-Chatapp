import React from "react";
import { auth } from "../Firebase/config";

const Message = ({ msg }) => {
  if (msg.user.uuid === auth.currentUser.uid) {
    return (
      <>
        <p className="msg-user">{msg.text}</p>
      </>
    );
  }
  return (
    <div className="msg-other flex items-center">
      <p className="user-info flex items-center gap-2">
        <img src={msg.user.photo} alt="" />
        <span className="font-bold uppercase me-1">{msg.user.name}: </span>
      </p>
      <p className="msg-text">{msg.text}</p>
    </div>
  );
};

export default Message;
