const formatTimeAgo = (timestamp) => {
  const currentTimestamp = new Date();
  const messageTimestamp = new Date(timestamp);

  const timeDifference = Math.floor(
    (currentTimestamp - messageTimestamp) / 1000
  );

  if (timeDifference < 60) {
    return `${timeDifference} ${
      timeDifference === 1 ? "second" : "seconds"
    } ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(timeDifference / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};

export default formatTimeAgo;
