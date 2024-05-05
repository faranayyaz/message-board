import React from "react";
import ChannelList from "./components/ChannelList/ChannelList";
import MessagePanel from "./components/MessagePanel/MessagePanel";
import MessageEditor from "./components/MessageEditor/MessageEditor";
import { useMessageBoard } from "./context/MessageBoardContext";
import styles from "./App.module.css";

const App = () => {
  const { selectedChannel } = useMessageBoard();

  return (
    <div className={styles.appContainer}>
      <ChannelList />
      {!!selectedChannel && (
        <div className={styles.mainContainer}>
          <MessagePanel />
          <MessageEditor />
        </div>
      )}
    </div>
  );
};

export default App;
