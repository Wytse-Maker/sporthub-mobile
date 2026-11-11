import apiRequest from "./apiClient";

const createBooking = async (eventId, numberOfTickets) => {
  return apiRequest("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      sportEventId: eventId,
      numberOfTickets: numberOfTickets,
    }),
  });
};

export default createBooking;
