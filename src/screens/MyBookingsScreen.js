import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getBookingsByUserId, cancelBooking } from "../services/bookingService";
import { getEventById } from "../services/eventService";

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadErrorMessage, setLoadErrorMessage] = useState("");
  const [actionErrorMessage, setActionErrorMessage] = useState("");
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setLoadErrorMessage("");

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
      setLoadErrorMessage("Bookings could not be loaded.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, [loadBookings]),
  );

  const handleCancelBooking = async (bookingId) => {
    if (cancellingBookingId !== null) {
      return;
    }

    setCancellingBookingId(bookingId);
    setActionErrorMessage("");

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
      setActionErrorMessage("Booking could not be cancelled.");
    } finally {
      setCancellingBookingId(null);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  if (loadErrorMessage !== "") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{loadErrorMessage}</Text>

        <Pressable style={styles.retryButton} onPress={loadBookings}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      {actionErrorMessage !== "" && (
        <Text style={styles.errorText}>{actionErrorMessage}</Text>
      )}

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>You don't have any bookings yet.</Text>
        }
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
                  style={[
                    styles.cancelButton,
                    cancellingBookingId === item.id && styles.disabledButton,
                  ]}
                  disabled={cancellingBookingId === item.id}
                  onPress={() => handleCancelBooking(item.id)}
                >
                  <Text style={styles.cancelButtonText}>
                    {cancellingBookingId === item.id
                      ? "Cancelling..."
                      : "Cancel booking"}
                  </Text>
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

  retryButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },

  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  disabledButton: {
    opacity: 0.5,
  },

  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default MyBookingsScreen;
