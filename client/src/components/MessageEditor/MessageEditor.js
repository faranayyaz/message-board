import { useState, useEffect } from "react";
import { useMessageBoard } from "../../context/MessageBoardContext";
import styles from "./MessageEditor.module.css";

const MessageEditor = () => {
  const { selectedChannel, chat, postMessage, socket, setChat } =
    useMessageBoard();
  const [message, setMessage] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    setMessage("");
  }, [selectedChannel]);

  useEffect(() => {
    setIsSubmitEnabled(message.trim().length > 0);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitEnabled) {
      const newMessage = {
        id: chat.messages.length + 1,
        text: message.trim(),
        timestamp: new Date().toISOString(),
      };

      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));

      socket.emit("newMessage", selectedChannel.id, newMessage);
      await postMessage(selectedChannel.id, message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isSubmitEnabled) {
        handleSubmit(e);
      }
    }
  };

  return (
    <div className={styles.messageEditor}>
      <textarea
        className={styles.messageInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message"
      />
      <button
        className={styles.sendButton}
        disabled={!message.trim()}
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default MessageEditor;
