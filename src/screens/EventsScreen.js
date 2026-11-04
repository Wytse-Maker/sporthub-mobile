import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import getEvents from "../services/eventService";

const EventsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
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

    loadEvents();
  }, []);

  const filteredEvents = events.filter(
    (item) =>
      item.homeTeamName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.awayTeamName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.venueName.toLowerCase().includes(searchText.toLowerCase()),
  );

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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SportHub Events</Text>

      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchbar}
        placeholder="Search events..."
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
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
});

export default EventsScreen;
