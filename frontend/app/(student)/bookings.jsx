import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import BookingCard from "../../src/components/booking/BookingCard";
import BookingFilterTabs from "../../src/components/booking/BookingFilterTabs";
import Text from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";
import { useBookings } from "../../src/features/bookings/hooks/useBookings";
import { formatBooking } from "../../src/features/bookings/utils/bookingView";
import LoadingState from "../../src/components/common/LoadingState";

const filters = ["All", "Upcoming", "Completed"];
const bookings = [
  {
    id: "sarah",
    name: "Dr. Sarah Smith",
    department: "Information Technology",
    date: "Oct 12, 2026",
    time: "12:00 PM - 12:30 PM",
    location: "Room 402",
    status: "Approved",
    group: "Upcoming",
    image: require("./student-img/sarah.png"),
  },
  {
    id: "james",
    name: "Prof. James Wilson",
    department: "Computer Science",
    date: "Oct 15, 2026",
    time: "2:30 PM - 3:00 PM",
    location: "Room 105",
    status: "Pending",
    group: "Upcoming",
    image: require("./student-img/james.png"),
  },
  {
    id: "patrick",
    name: "Prof. Patrick Bond",
    department: "Information Technology",
    date: "Sep 28, 2026",
    time: "10:00 AM - 10:30 AM",
    location: "Admin Office",
    status: "Completed",
    group: "Completed",
    image: require("./student-img/james.png"),
  },
];

export default function StudentBookingsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const { data, isLoading } = useBookings();
  if (isLoading) return <LoadingState title="Loading your bookings" message="We’re organising your upcoming consultations." />;
  const apiBookings = (data || []).map((item) => formatBooking(item, "student", require("./student-img/profile.png")));
  const visibleBookings = (data ? apiBookings : bookings).filter(
    (item) => activeFilter === "All" || item.group === activeFilter,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>YOUR SCHEDULE</Text>
          <Text style={styles.heroTitle}>Bookings</Text>
          <Text style={styles.heroSubtitle}>Track every consultation in one calm, organised place.</Text>
          <View style={styles.heroCount}><Text style={styles.heroCountValue}>{visibleBookings.length}</Text><Text style={styles.heroCountLabel}>appointments</Text></View>
        </View>
        <View style={styles.filters}>
          <BookingFilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
        </View>
        <View style={styles.list}>
          {visibleBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onPress={() => router.push({
                pathname: "/(student)/booking-details/[bookingId]",
                params: {
                  bookingId: booking.id,
                  name: booking.name,
                  department: booking.department,
                  date: booking.date,
                  time: booking.time,
                  location: booking.location,
                  status: booking.status,
                },
              })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FB" },
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
  hero: { position: "relative", minHeight: 170, padding: 22, borderRadius: 26, backgroundColor: "#003F78", overflow: "hidden" },
  heroEyebrow: { color: "#BFD8ED", fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  heroTitle: { marginTop: 5, color: "#FFFFFF", fontSize: 30, fontWeight: "800" },
  heroSubtitle: { marginTop: 6, maxWidth: 235, color: "#D7E6F2", fontSize: 13, lineHeight: 19 },
  heroCount: { position: "absolute", right: 20, bottom: 18, alignItems: "center", justifyContent: "center", width: 82, height: 62, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.14)" },
  heroCountValue: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },
  heroCountLabel: { color: "#D7E6F2", fontSize: 9, fontWeight: "600" },
  eyebrow: {
    color: "#52708D",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    marginTop: 3,
    color: "#102F4E",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },
  subtitle: { marginTop: 5, color: "#687887", fontSize: 14, lineHeight: 20 },
  filters: { marginTop: 22 },
  list: { marginTop: 18, gap: 14 },
});
