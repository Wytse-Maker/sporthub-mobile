import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";

import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import getEvents from "../services/eventService";

const EventsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadEvents = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to load events:", error);
      setErrorMessage("Events could not be loaded. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const now = new Date();

  const filteredEvents = events
    .filter((item) => {
      const searchValue = searchText.toLowerCase();

      return (
        item.homeTeamName.toLowerCase().includes(searchValue) ||
        item.awayTeamName.toLowerCase().includes(searchValue) ||
        item.venueName.toLowerCase().includes(searchValue)
      );
    })
    .sort((eventA, eventB) => {
      const dateA = new Date(eventA.startTime);
      const dateB = new Date(eventB.startTime);

      const eventAIsPast = dateA < now;
      const eventBIsPast = dateB < now;

      if (eventAIsPast && !eventBIsPast) {
        return 1;
      }

      if (!eventAIsPast && eventBIsPast) {
        return -1;
      }

      if (!eventAIsPast && !eventBIsPast) {
        return dateA - dateB;
      }

      return dateB - dateA;
    });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (errorMessage !== "") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage}</Text>

        <Pressable style={styles.retryButton} onPress={loadEvents}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SportHub Events</Text>

      <Pressable
        style={styles.bookingsButton}
        onPress={() => navigation.navigate("MyBookings")}
      >
        <Text style={styles.bookingsButtonText}>My Bookings</Text>
      </Pressable>

      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchbar}
        placeholder="Search events..."
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={
          filteredEvents.length === 0 ? styles.emptyList : undefined
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events found.</Text>
        }
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() =>
              navigation.navigate("EventDetail", {
                event: item,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 10,
  },

  bookingsButton: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },

  bookingsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  searchbar: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    margin: 10,
  },

  loadingText: {
    margin: 20,
    fontSize: 16,
  },

  errorText: {
    margin: 20,
    fontSize: 16,
    fontWeight: "bold",
  },

  retryButton: {
    marginHorizontal: 20,
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

  emptyList: {
    flexGrow: 1,
  },

  emptyText: {
    margin: 20,
    fontSize: 16,
  },
});

export default EventsScreen;
