import { useState, useEffect } from "react";
import { useMessageBoard } from "../../context/MessageBoardContext";
import styles from "./ChannelList.module.css";

const ChannelList = () => {
  const {
    channels,
    fetchChannels,
    selectedChannel,
    setSelectedChannel,
    fetchMessages,
    error,
  } = useMessageBoard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const handleChannelSelect = async (channel) => {
    setSelectedChannel(channel);
    await fetchMessages(channel.id);
    toggleSidebar();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderChannelList = () => {
    if (error) {
      return <div> Error in fetching channels</div>;
    } else {
      return (
        <ul className={styles.channelList}>
          {channels.map((channel) => (
            <li
              key={channel.id}
              onClick={() => handleChannelSelect(channel)}
              className={
                selectedChannel?.id === channel.id ? styles.selectedChannel : ""
              }
            >
              {channel.name}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      <button className={styles.sidebarToggle} onClick={toggleSidebar}>
        {isSidebarOpen ? "X" : "☰"}
      </button>
      <div
        className={`${styles.navigation} ${isSidebarOpen ? styles.show : ""}`}
      >
        <h2 className={styles.title}>Chat App</h2>
        {renderChannelList()}
      </div>
    </>
  );
};

export default ChannelList;
