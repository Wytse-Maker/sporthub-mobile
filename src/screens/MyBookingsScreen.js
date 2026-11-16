import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getBookingsByUserId, cancelBooking } from "../services/bookingService";
import { getEventById } from "../services/eventService";

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadBookings = async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
          const data = await getBookingsByUserId(1);

          const bookingsWithEvents = await Promise.all(
            data.map(async (booking) => {
              const event = await getEventById(booking.sportEventId);

              return {
                ...booking,
                event: event,
              };
            }),
          );

          setBookings(bookingsWithEvents);
        } catch (error) {
          console.error("Failed to load bookings:", error);
          setErrorMessage("Bookings could not be loaded.");
        } finally {
          setIsLoading(false);
        }
      };

      loadBookings();
    }, []),
  );

  const handleCancelBooking = async (bookingId) => {
    setErrorMessage("");

    try {
      const updatedBooking = await cancelBooking(bookingId);

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                ...updatedBooking,
              }
            : booking,
        ),
      );
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      setErrorMessage("Booking could not be cancelled.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  if (errorMessage !== "") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const [date = "", timeWithSeconds = ""] = (
            item.event?.startTime ?? ""
          ).split("T");

          const time = timeWithSeconds.slice(0, 5);

          return (
            <View style={styles.card}>
              <Text style={styles.matchup}>
                {item.event?.homeTeamName} vs {item.event?.awayTeamName}
              </Text>

              <Text style={styles.info}>Venue: {item.event?.venueName}</Text>

              <Text style={styles.info}>Date: {date}</Text>
              <Text style={styles.info}>Time: {time}</Text>

              <Text style={styles.info}>Tickets: {item.numberOfTickets}</Text>

              <Text style={styles.info}>Status: {item.status}</Text>

              {item.status === "ACTIVE" && (
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => handleCancelBooking(item.id)}
                >
                  <Text style={styles.cancelButtonText}>Cancel booking</Text>
                </Pressable>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  matchup: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    marginBottom: 5,
    fontSize: 16,
  },

  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  errorText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyBookingsScreen;
