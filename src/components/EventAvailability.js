import { View, Text, StyleSheet } from "react-native";

const EventAvailability = ({ event }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Capacity: {event.capacity}</Text>

      <Text style={styles.info}>Reserved tickets: {event.reservedTickets}</Text>

      <Text style={styles.info}>
        Available tickets: {event.availableTickets}
      </Text>

      <Text style={styles.info}>Occupancy: {event.occupancyPercentage}%</Text>

      <View style={styles.occupancyBar}>
        <View
          style={[
            styles.occupancyFill,
            { width: `${event.occupancyPercentage}%` },
          ]}
        />
      </View>

      <Text style={styles.status}>
        {event.soldOut ? "Sold out" : "Tickets available"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  info: {
    marginTop: 10,
    fontSize: 16,
  },
  occupancyBar: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  occupancyFill: {
    height: "100%",
    backgroundColor: "#333",
  },
  status: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventAvailability;
