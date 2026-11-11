import apiRequest from "./apiClient";

const getEvents = async () => {
  const data = await apiRequest("/api/sport-events");

  return data.content;
};

const getEventAvailability = async (sportEventId) => {
  return apiRequest(`/api/sport-events/${sportEventId}/availability`);
};

export { getEventAvailability };
export default getEvents;
