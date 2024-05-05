import { useEffect, useRef } from "react";
import { useMessageBoard } from "../../context/MessageBoardContext";
import styles from "./MessagePanel.module.css";
import MessageCard from "./MessageCard";

const MessagePanel = () => {
  const { selectedChannel, chat, setChat, socket } = useMessageBoard();
  const messageListRef = useRef(null);

  const messageArray = chat.messages || [];

  useEffect(() => {
    if (selectedChannel && selectedChannel.id) {
      socket.emit("joinChannel", selectedChannel.id);

      const newMessageListener = (newMessage) => {
        if (newMessage.channelId === selectedChannel.id) {
          setChat((prevChat) => ({
            ...prevChat,
            messages: [...prevChat.messages, newMessage],
          }));
        }
      };

      socket.on("newMessage", newMessageListener);

      return () => {
        socket.off("newMessage", newMessageListener);
        socket.close();
      };
    }
  }, [selectedChannel, setChat, socket]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <>
      <h2 className={styles.messagePanelTitle}>{selectedChannel.name}</h2>
      <div className={styles.messageList} ref={messageListRef}>
        {messageArray.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
    </>
  );
};

export default MessagePanel;
