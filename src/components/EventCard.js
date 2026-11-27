import { View, Text, StyleSheet, Pressable } from "react-native";

const EventCard = ({ event, onPress }) => {
  const eventDateTime = new Date(event.startTime);
  const isPastEvent = eventDateTime < new Date();

  const [date = "", timeWithSeconds = ""] = (event.startTime ?? "").split("T");
  const time = timeWithSeconds.slice(0, 5);

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card, isPastEvent && styles.pastEventCard]}>
        <Text style={styles.matchup}>
          {event.homeTeamName} vs {event.awayTeamName}
        </Text>

        <Text style={styles.venue}>{event.venueName}</Text>

        <Text style={styles.info}>Date: {date}</Text>

        <Text style={styles.info}>Time: {time}</Text>

        {isPastEvent && <Text style={styles.endedText}>Event ended</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 12,
  },

  pastEventCard: {
    opacity: 0.5,
  },

  matchup: {
    fontSize: 15,
    fontWeight: "bold",
  },

  venue: {
    marginTop: 10,
    fontSize: 12,
  },

  info: {
    marginTop: 5,
    fontSize: 12,
  },

  endedText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default EventCard;
