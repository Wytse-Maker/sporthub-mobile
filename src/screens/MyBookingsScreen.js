import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getBookingsByUserId } from "../services/bookingService";

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      setErrorMessage("");

      try {
        const data = await getBookingsByUserId(1);
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings:", error);
        setErrorMessage("Bookings could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

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
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.info}>Booking ID: {item.id}</Text>
            <Text style={styles.info}>Event ID: {item.sportEventId}</Text>
            <Text style={styles.info}>Tickets: {item.numberOfTickets}</Text>
            <Text style={styles.info}>Status: {item.status}</Text>
          </View>
        )}
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

  info: {
    marginBottom: 5,
    fontSize: 16,
  },
});

export default MyBookingsScreen;
