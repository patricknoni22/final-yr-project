import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  DashboardSectionHeader,
  MetricCard,
  RequestCard,
  ScheduleCard,
} from "../../src/components/dashboard/DashboardCards";
import Text from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";
import { useLecturerDashboard } from "../../src/features/dashboard/hooks/useDashboard";
import { useBookings } from "../../src/features/bookings/hooks/useBookings";
import { useApproveBooking } from "../../src/features/bookings/hooks/useApproveBooking";
import { useRejectBooking } from "../../src/features/bookings/hooks/useRejectBooking";
import { useMyProfile } from "../../src/features/profile/hooks/useProfile";
import { formatBooking } from "../../src/features/bookings/utils/bookingView";
import { formatLecturerName } from "../../src/features/lecturers/utils/lecturerView";

const metrics = [
  {
    icon: "people-outline",
    label: "Total students",
    value: "142",
    tone: "#DDEBFF",
    color: "#24538A",
  },
  {
    icon: "time-outline",
    label: "Hours consulted",
    value: "48.5",
    tone: "#FFE5D5",
    color: "#96542F",
  },
];
const requests = [
  {
    name: "Alex Thompson",
    info: "Thesis Review · Tomorrow, 10:00 AM",
    image: require("./lect-img/th.png"),
  },
  {
    name: "Sarah Miller",
    info: "Course Enquiry · Oct 24, 2:30 PM",
    image: require("./lect-img/sa.png"),
  },
];
const schedule = [
  ["9:00 AM - 9:30 AM", "", "Office Hours", "Room 402 · Public Session"],
  ["11:30 AM - 12:00 PM", "", "James Wilson", "Project Guidance · Virtual"],
  ["2:00 PM - 2:30 PM", "", "Department Meeting", "Conference Hall B"],
  ["4:15 PM - 4:45 PM", "", "Elena Rodriguez", "Grade Appeal · Room 402"],
];

export default function LecturerDashboard() {
  const router = useRouter();
  const { data: dashboard } = useLecturerDashboard();
  const { data: bookingData } = useBookings();
  const { data: profile } = useMyProfile();
  const approveMutation = useApproveBooking();
  const rejectMutation = useRejectBooking();
  const formattedBookings = (bookingData || []).map((item) => formatBooking(item, "lecturer", require("./lect-img/lec.png")));
  const pending = formattedBookings.filter((item) => item.group === "Requests");
  const today = new Date();
  const apiMetrics = [
    { ...metrics[0], value: String(new Set((bookingData || []).map((item) => item.userId)).size) },
    { ...metrics[1], value: String(Math.round((bookingData || []).filter((item) => item.status === "COMPLETED").reduce((sum, item) => sum + (new Date(item.endTime) - new Date(item.startTime)) / 3600000, 0) * 10) / 10) },
  ];
  const apiRequests = pending.slice(0, 3).map((item) => ({ id: item.id, name: item.name, info: `${item.topic} · ${item.dateTime}`, image: item.image }));
  const apiSchedule = formattedBookings.filter((item) => {
    const start = new Date(item.raw.startTime);
    return item.raw.status === "CONFIRMED" && start.getFullYear() === today.getFullYear() && start.getMonth() === today.getMonth() && start.getDate() === today.getDate();
  }).slice(0, 4).map((item) => {
    return [item.time, "", item.name, `${item.topic} · ${item.location}`];
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroOrb} />
          <Text style={styles.heroEyebrow}>LECTURER WORKSPACE</Text>
          <Text style={styles.heroTitle}>Welcome back, {formatLecturerName(profile?.username, profile?.title)}</Text>
          <Text style={styles.heroSubtitle}>You have {pending.length} new booking requests waiting.</Text>
          <Pressable style={styles.availabilityButton} onPress={() => router.push("/(lecturer)/availability")}>
            <Ionicons name="calendar-outline" size={18} color="#003F78" />
            <Text style={styles.availabilityText}>Manage availability</Text>
            <Ionicons name="arrow-forward" size={16} color="#003F78" />
          </Pressable>
        </View>
        <View style={styles.metrics}>
          {(dashboard ? apiMetrics : metrics).map((item) => (
            <MetricCard key={item.label} item={item} />
          ))}
        </View>
        <View style={styles.sectionHeader}>
          <DashboardSectionHeader title="Booking requests" link="View all" onPress={() => router.push("/(lecturer)/bookings")} />
        </View>
        <View style={styles.list}>
          {(bookingData ? apiRequests : requests).map((request) => (
            <RequestCard key={request.id || request.name} request={request} onApprove={() => approveMutation.mutate(request.id)} onReject={() => rejectMutation.mutate(request.id)} />
          ))}
        </View>
        <View style={styles.schedule}>
          <ScheduleCard schedule={bookingData ? apiSchedule : schedule} onPress={() => router.push("/(lecturer)/bookings")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FB" },
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 44 },
  hero: { position: "relative", overflow: "hidden", padding: 22, borderRadius: 26, backgroundColor: "#003F78", shadowColor: "#003F78", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 6 },
  heroOrb: { position: "absolute", width: 170, height: 170, right: -55, top: -80, borderRadius: 85, backgroundColor: "rgba(255,255,255,0.09)" },
  heroEyebrow: { color: "#BFD8ED", fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  heroTitle: { marginTop: 5, maxWidth: 290, color: "#FFFFFF", fontSize: 25, lineHeight: 32, fontWeight: "800" },
  heroSubtitle: { marginTop: 7, color: "#D7E6F2", fontSize: 13, lineHeight: 19 },
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
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "800",
  },
  subtitle: { marginTop: 5, color: "#687887", fontSize: 14, lineHeight: 20 },
  availabilityButton: {
    minHeight: 52,
    marginTop: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#003F78", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 4,
  },
  availabilityText: {
    flex: 1,
    color: "#003F78",
    fontSize: 14,
    fontWeight: "700",
  },
  metrics: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  sectionHeader: { marginTop: 25, marginBottom: 12 },
  list: { gap: 14 },
  schedule: { marginTop: 22 },
});
