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

const getBookingsByUserId = async (userId) => {
  return apiRequest(`/api/bookings/users/${userId}`);
};

const cancelBooking = async (bookingId) => {
  return apiRequest(`/api/bookings/${bookingId}/cancel`, {
    method: "PATCH",
  });
};

export { getBookingsByUserId, cancelBooking };
export default createBooking;
