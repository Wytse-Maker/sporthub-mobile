import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import createBooking from "../services/bookingService";

const BookingScreen = ({ route, navigation }) => {
  const { event } = route.params;

  const [ticketCount, setTicketCount] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const maxTickets = Math.min(4, event.availableTickets);

  const handleConfirmBooking = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const booking = await createBooking(event.id, ticketCount);

      navigation.navigate("BookingConfirmation", {
        event: event,
        numberOfTickets: ticketCount,
        booking: booking,
      });
    } catch (error) {
      console.error("Booking failed:", error);

      setErrorMessage("Booking could not be completed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Tickets</Text>

      <Text style={styles.matchup}>
        {event.homeTeamName} vs {event.awayTeamName}
      </Text>

      <View style={styles.counter}>
        <Pressable
          style={styles.counterButton}
          onPress={() => {
            if (ticketCount > 1) {
              setTicketCount(ticketCount - 1);
            }
          }}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </Pressable>

        <Text style={styles.ticketCount}>{ticketCount}</Text>

        <Pressable
          style={styles.counterButton}
          onPress={() => {
            if (ticketCount < maxTickets) {
              setTicketCount(ticketCount + 1);
            }
          }}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </Pressable>
      </View>

      <Text style={styles.availabilityText}>
        Maximum {maxTickets} tickets for this booking
      </Text>

      {errorMessage !== "" && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <Pressable
        style={[styles.confirmButton, isSubmitting && styles.disabledButton]}
        disabled={isSubmitting}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.confirmButtonText}>
          {isSubmitting ? "Booking..." : "Confirm booking"}
        </Text>
      </Pressable>
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
  },

  matchup: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  counterButton: {
    width: 45,
    height: 45,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  counterButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  ticketCount: {
    marginHorizontal: 25,
    fontSize: 22,
    fontWeight: "bold",
  },

  availabilityText: {
    marginTop: 10,
    fontSize: 14,
  },

  confirmButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
  },

  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  errorText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BookingScreen;
