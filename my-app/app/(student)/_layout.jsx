import { Tabs } from "expo-router";

export default function StudentTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="lecturers" options={{ title: "Lecturers" }} />
      <Tabs.Screen name="bookings" options={{ title: "Bookings" }} />
      <Tabs.Screen name="notifications" options={{ title: "Notifications" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="lecturer-details/[lecturerId]" options={{ href: null }} />
      <Tabs.Screen name="book-appointment/[lecturerId]" options={{ href: null }} />
      <Tabs.Screen name="booking-details/[bookingId]" options={{ href: null }} />
    </Tabs>
  );
}
