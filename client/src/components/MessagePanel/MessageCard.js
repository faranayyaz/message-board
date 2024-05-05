import React from "react";
import formatTimeAgo from "../../services/timeUtils";
import styles from "./MessagePanel.module.css";

const MessageCard = ({ message }) => {
  const { text, timestamp } = message;
  const timeAgo = formatTimeAgo(timestamp);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>{text}</div>
      <div className={styles.timestamp}>{timeAgo}</div>
    </div>
  );
};

export default MessageCard;
