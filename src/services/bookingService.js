const createBooking = async (eventId, numberOfTickets) => {
  return {
    eventId,
    numberOfTickets,
    status: "CONFIRMED",
  };
};

export default createBooking;
