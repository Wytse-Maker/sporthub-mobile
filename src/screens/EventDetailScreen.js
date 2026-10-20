import { View, Text, StyleSheet, Pressable } from "react-native";
import EventAvailability from "../components/EventAvailability";

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {event.homeTeamName} vs {event.awayTeamName}
      </Text>

      <Text style={styles.venue}>{event.venueName}</Text>

      <Text style={styles.info}>Date: {event.date}</Text>

      <Text style={styles.info}>Time: {event.time}</Text>

      <EventAvailability event={event} />

      <Pressable
        style={[styles.bookButton, event.soldOut && styles.disabledButton]}
        disabled={event.soldOut}
        onPress={() =>
          navigation.navigate("Booking", {
            event: event,
          })
        }
      >
        <Text style={styles.bookButtonText}>
          {event.soldOut ? "Sold out" : "Book tickets"}
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

  venue: {
    marginTop: 10,
    fontSize: 16,
  },

  info: {
    marginTop: 10,
    fontSize: 16,
  },

  bookButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.4,
  },

  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventDetailScreen;
