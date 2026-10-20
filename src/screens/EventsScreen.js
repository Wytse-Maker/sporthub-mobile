import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { useState } from "react";
import EventCard from "../components/EventCard";

const sampleEvents = [
  {
    id: "1",
    homeTeamName: "Boston Celtics",
    awayTeamName: "Los Angeles Lakers",
    venueName: "Boston Garden",
    date: "2026-11-15",
    time: "20:00",
    capacity: 20000,
    reservedTickets: 14000,
    availableTickets: 6000,
    occupancyPercentage: 70,
    soldOut: false,
  },
  {
    id: "2",
    homeTeamName: "Chicago Bulls",
    awayTeamName: "Detroit Pistons",
    venueName: "United Center",
    date: "2026-11-18",
    time: "19:30",
    capacity: 21000,
    reservedTickets: 21000,
    availableTickets: 0,
    occupancyPercentage: 100,
    soldOut: true,
  },
  {
    id: "3",
    homeTeamName: "Denver Nuggets",
    awayTeamName: "Minnesota Timberwolves",
    venueName: "Ball Arena",
    date: "2026-11-22",
    time: "21:00",
    capacity: 19000,
    reservedTickets: 9500,
    availableTickets: 9500,
    occupancyPercentage: 50,
    soldOut: false,
  },
];

const EventsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const filteredEvents = sampleEvents.filter(
    (item) =>
      item.homeTeamName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.awayTeamName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.venueName.toLowerCase().includes(searchText.toLowerCase()),
  );

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate("EventDetail", { event: item })}
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
});

export default EventsScreen;
