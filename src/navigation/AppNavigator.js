import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EventsScreen from "../screens/EventsScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import BookingScreen from "../screens/BookingScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{ title: "SportHub Events" }}
      />

      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={({ route }) => ({
          title: `${route.params.event.homeTeamName} vs ${route.params.event.awayTeamName}`,
        })}
      />

      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{ title: "Book Tickets" }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
