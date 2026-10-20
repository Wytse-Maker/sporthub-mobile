import { View, Text, StyleSheet, Pressable } from "react-native";

const EventCard = ({ event, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.matchup}>
          {event.homeTeamName} vs {event.awayTeamName}
        </Text>

        <Text style={styles.venue}>{event.venueName}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 12,
  },
  matchup: {
    fontSize: 15,
    fontWeight: "bold",
  },
  venue: {
    marginTop: 10,
    fontSize: 10,
  },
});

export default EventCard;
