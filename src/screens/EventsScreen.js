import { View, Text, StyleSheet } from "react-native";

const EventsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SportHub Events</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default EventsScreen;
