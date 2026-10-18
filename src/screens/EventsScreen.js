import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { useState } from "react";

const sampleEvents = [
  {
    id: "1",
    homeTeamName: "Boston Celtics",
    awayTeamName: "Los Angeles Lakers",
    venueName: "Boston Garden",
  },
  {
    id: "2",
    homeTeamName: "Chicago Bulls",
    awayTeamName: "Detroit Pistons",
    venueName: "United Center",
  },
  {
    id: "3",
    homeTeamName: "Denver Nuggets",
    awayTeamName: "Minnesota Timberwolves",
    venueName: "Ball Arena",
  },
];

const EventsScreen = () => {
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
          <View style={styles.card}>
            <Text style={styles.matchup}>
              {item.homeTeamName} vs {item.awayTeamName}
            </Text>
            <Text style={styles.venue}>{item.venueName}</Text>
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
  card: {
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 12,
  },
  matchup: {
    fontsize: 15,
    fontWeight: "bold",
  },
  venue: {
    marginTop: 10,
    fonstSize: 10,
  },
});
export default EventsScreen;
