import { View, Text, StyleSheet, Pressable } from "react-native";

const BookingConfirmationScreen = ({ route, navigation }) => {
  const { event, numberOfTickets, booking } = route.params;

  const totalPrice = event.ticketPrice * numberOfTickets;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed</Text>

      <Text style={styles.message}>
        Your booking has been created successfully.
      </Text>

      <Text style={styles.info}>
        {event.homeTeamName} vs {event.awayTeamName}
      </Text>

      <Text style={styles.info}>Venue: {event.venueName}</Text>

      <Text style={styles.info}>
        Price per ticket: €{Number(event.ticketPrice).toFixed(2)}
      </Text>

      <Text style={styles.info}>Tickets: {numberOfTickets}</Text>

      <Text style={styles.totalPrice}>
        Total price: €{totalPrice.toFixed(2)}
      </Text>

      <Text style={styles.info}>Status: {booking.status}</Text>

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.backButtonText}>Back to Events</Text>
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

  message: {
    marginTop: 15,
    fontSize: 16,
  },

  info: {
    marginTop: 10,
    fontSize: 16,
  },

  totalPrice: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
  },

  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingConfirmationScreen;
