import apiRequest from "./apiClient";

const getEvents = async () => {
  const data = await apiRequest("/api/sport-events");

  return data.content;
};

export default getEvents;
