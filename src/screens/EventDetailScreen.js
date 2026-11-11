import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import EventAvailability from "../components/EventAvailability";
import { getEventAvailability } from "../services/eventService";

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;

  const [availability, setAvailability] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [date = "", timeWithSeconds = ""] = (event.startTime ?? "").split("T");
  const time = timeWithSeconds.slice(0, 5);

  useEffect(() => {
    const loadAvailability = async () => {
      setErrorMessage("");

      try {
        const data = await getEventAvailability(event.id);
        setAvailability(data);
      } catch (error) {
        console.error("Failed to load availability:", error);
        setErrorMessage("Availability could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailability();
  }, [event.id]);

  const eventWithAvailability = availability
    ? {
        ...event,
        ...availability,
      }
    : event;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {event.homeTeamName} vs {event.awayTeamName}
      </Text>

      <Text style={styles.venue}>{event.venueName}</Text>

      <Text style={styles.info}>Date: {date}</Text>
      <Text style={styles.info}>Time: {time}</Text>
      <Text style={styles.info}>
        Ticket price: €{Number(event.ticketPrice).toFixed(2)}
      </Text>

      {isLoading && <Text style={styles.info}>Loading availability...</Text>}

      {errorMessage !== "" && <Text style={styles.info}>{errorMessage}</Text>}

      {availability && <EventAvailability event={eventWithAvailability} />}

      {availability && (
        <Pressable
          style={[
            styles.bookButton,
            availability.soldOut && styles.disabledButton,
          ]}
          disabled={availability.soldOut}
          onPress={() =>
            navigation.navigate("Booking", {
              event: eventWithAvailability,
            })
          }
        >
          <Text style={styles.bookButtonText}>
            {availability.soldOut ? "Sold out" : "Book tickets"}
          </Text>
        </Pressable>
      )}
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
