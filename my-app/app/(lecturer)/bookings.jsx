import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import BookingCard from "../../src/components/booking/BookingCard";
import BookingFilterTabs, {
  BookingEmptyState,
} from "../../src/components/booking/BookingFilterTabs";
import Text from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";

const filters = ["Requests", "Upcoming", "Past"];
const bookings = [
  {
    id: "alex",
    name: "Alex Thompson",
    topic: "Thesis Review",
    date: "Oct 24, 2026",
    time: "10:00 AM",
    location: "Room 402",
    status: "Pending",
    group: "Requests",
    image: require("./lect-img/th.png"),
  },
  {
    id: "sarah",
    name: "Sarah Miller",
    topic: "Course Enquiry",
    date: "Oct 25, 2026",
    time: "2:30 PM",
    location: "Virtual meeting",
    status: "Pending",
    group: "Requests",
    image: require("./lect-img/sa.png"),
  },
  {
    id: "james",
    name: "James Wilson",
    topic: "Project Guidance",
    date: "Oct 28, 2026",
    time: "11:30 AM",
    location: "Room 105",
    status: "Approved",
    group: "Upcoming",
    image: require("./lect-img/th.png"),
  },
];

export default function LecturerBookingsScreen() {
  const [activeFilter, setActiveFilter] = useState("Requests");
  const visibleBookings = bookings.filter(
    (item) => item.group === activeFilter,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader avatarSource={require("./lect-img/lec.png")} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headingRow}>
          <View style={styles.headingCopy}>
            <Text style={styles.title}>Bookings</Text>
            <Text style={styles.subtitle}>
              Review requests and manage your schedule.
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.count}>2</Text>
            <Text style={styles.countLabel}>Pending</Text>
          </View>
        </View>
        <View style={styles.filters}>
          <BookingFilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
        </View>
        <View style={styles.list}>
          {visibleBookings.length ? (
            visibleBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} role="lecturer" />
            ))
          ) : (
            <BookingEmptyState
              title="No past bookings"
              message="Completed consultations will appear here."
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FB" },
  content: { padding: 20, paddingBottom: 36 },
  headingRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
  },
  headingCopy: { flex: 1 },
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
  countBadge: {
    minWidth: 58,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFF2D1",
  },
  count: { color: "#9A6700", fontSize: 18, lineHeight: 22, fontWeight: "800" },
  countLabel: { color: "#9A6700", fontSize: 10, fontWeight: "700" },
  filters: { marginTop: 22 },
  list: { marginTop: 18, gap: 14 },
});
