import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import BookingCard from "../../src/components/booking/BookingCard";
import BookingFilterTabs, {
  BookingEmptyState,
} from "../../src/components/booking/BookingFilterTabs";
import Text from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";
import { useBookings } from "../../src/features/bookings/hooks/useBookings";
import { useApproveBooking } from "../../src/features/bookings/hooks/useApproveBooking";
import { useRejectBooking } from "../../src/features/bookings/hooks/useRejectBooking";
import { formatBooking } from "../../src/features/bookings/utils/bookingView";
import AppModal from "../../src/components/common/AppModal";
import { Ionicons } from "@expo/vector-icons";

const filters = ["Requests", "Upcoming", "Approved", "Rejected"];
const bookings = [
  {
    id: "alex",
    name: "Alex Thompson",
    topic: "Thesis Review",
    date: "Oct 24, 2026",
    time: "10:00 AM - 10:30 AM",
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
    time: "2:30 PM - 3:00 PM",
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
    time: "11:30 AM - 12:00 PM",
    location: "Room 105",
    status: "Approved",
    group: "Upcoming",
    image: require("./lect-img/th.png"),
  },
];

export default function LecturerBookingsScreen() {
  const [activeFilter, setActiveFilter] = useState("Requests");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { data } = useBookings();
  const approveMutation = useApproveBooking();
  const rejectMutation = useRejectBooking();
  const apiBookings = (data || []).map((item) => formatBooking(item, "lecturer", require("./lect-img/lec.png")));
  const currentBookings = data ? apiBookings : bookings;
  const visibleBookings = currentBookings.filter((item) => {
    if (activeFilter === "Requests") return item.status === "Pending";
    if (activeFilter === "Approved") return item.status === "Approved";
    if (activeFilter === "Rejected") return item.status === "Rejected";
    return item.group === "Upcoming";
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headingHero}>
          <View style={styles.headingCopy}>
            <Text style={styles.heroEyebrow}>APPOINTMENT CENTRE</Text>
            <Text style={styles.heroTitle}>Bookings</Text>
            <Text style={styles.heroSubtitle}>
              Review requests and manage your schedule.
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.count}>{currentBookings.filter((item) => item.group === "Requests").length}</Text>
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
              <BookingCard key={booking.id} booking={booking} role="lecturer" onPress={() => setSelectedBooking(booking)} onApprove={() => approveMutation.mutate(booking.id)} onReject={() => rejectMutation.mutate(booking.id)} />
            ))
          ) : (
            <BookingEmptyState
              title={`No ${activeFilter.toLowerCase()} bookings`}
              message={activeFilter === "Approved" ? "Approved requests will appear here." : activeFilter === "Rejected" ? "Rejected requests will appear here." : "Bookings will appear here when available."}
            />
          )}
        </View>
      </ScrollView>
      <AppModal visible={Boolean(selectedBooking)} title="Booking details" onClose={() => setSelectedBooking(null)}>
        {selectedBooking ? <View style={styles.modalContent}>
          <View style={styles.modalTextRow}><Text style={styles.modalTextLabel}>Name:</Text><Text style={styles.modalName}>{selectedBooking.name}</Text></View>
          <View style={styles.modalTextRow}><Text style={styles.modalTextLabel}>Reason:</Text><Text style={styles.modalTopic}>{selectedBooking.topic}</Text></View>
          <ModalDetail icon="calendar-outline" label="Date" value={selectedBooking.date} />
          <ModalDetail icon="time-outline" label="Time" value={selectedBooking.time} />
          <ModalDetail icon="location-outline" label="Location" value={selectedBooking.location} />
          <ModalDetail icon="information-circle-outline" label="Status" value={selectedBooking.status} />
        </View> : null}
      </AppModal>
    </SafeAreaView>
  );
}

function ModalDetail({ icon, label, value }) {
  return <View style={styles.modalRow}><View style={styles.modalIcon}><Ionicons name={icon} size={18} color="#315D86" /></View><View style={styles.modalCopy}><Text style={styles.modalLabel}>{label}</Text><Text style={styles.modalValue}>{value || "Not available"}</Text></View></View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FB" },
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
  headingHero: { minHeight: 160, padding: 22, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 12, borderRadius: 26, backgroundColor: "#003F78" },
  heroEyebrow: { color: "#BFD8ED", fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  heroTitle: { marginTop: 5, color: "#FFFFFF", fontSize: 30, fontWeight: "800" },
  heroSubtitle: { marginTop: 6, maxWidth: 220, color: "#D7E6F2", fontSize: 13, lineHeight: 19 },
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
  modalContent: { gap: 14 },
  modalTextRow: { flexDirection: "row", alignItems: "flex-start", gap: 7 },
  modalTextLabel: { color: "#84909C", fontSize: 13, fontWeight: "600" },
  modalName: { flex: 1, color: "#102F4E", fontSize: 15, fontWeight: "700" },
  modalTopic: { flex: 1, color: "#31475C", fontSize: 14, lineHeight: 20 },
  modalRow: { flexDirection: "row", alignItems: "center", gap: 11 },
  modalIcon: { width: 38, height: 38, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: "#EDF4FA" },
  modalCopy: { flex: 1 },
  modalLabel: { color: "#84909C", fontSize: 11 },
  modalValue: { marginTop: 2, color: "#31475C", fontSize: 14, fontWeight: "600" },
});
