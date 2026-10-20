import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

const BookingScreen = ({ route }) => {
  const { event } = route.params;

  const [ticketCount, setTicketCount] = useState(1);

  const maxTickets = Math.min(4, event.availableTickets);

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

      <Pressable
        style={styles.confirmButton}
        onPress={() =>
          console.log("Booking:", {
            eventId: event.id,
            numberOfTickets: ticketCount,
          })
        }
      >
        <Text style={styles.confirmButtonText}>Confirm booking</Text>
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
});

export default BookingScreen;
