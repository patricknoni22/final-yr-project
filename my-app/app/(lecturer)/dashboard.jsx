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
  {
    icon: "star-outline",
    label: "Average rating",
    value: "4.9",
    tone: "#DEE8FF",
    color: "#315C9A",
  },
  {
    icon: "clipboard-outline",
    label: "Pending reviews",
    value: "03",
    tone: "#FFE0D1",
    color: "#B8653D",
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
  ["09:00", "AM", "Office Hours", "Room 402 · Public Session"],
  ["11:30", "AM", "James Wilson", "Project Guidance · Virtual"],
  ["02:00", "PM", "Department Meeting", "Conference Hall B"],
  ["04:15", "PM", "Elena Rodriguez", "Grade Appeal · Room 402"],
];

export default function LecturerDashboard() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader avatarSource={require("./lect-img/lec.png")} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Welcome back, Dr. Chen</Text>
        <Text style={styles.subtitle}>
          You have 4 new booking requests this week.
        </Text>
        <Pressable style={styles.availabilityButton} onPress={() => router.push("/(lecturer)/availability")}>
          <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
          <Text style={styles.availabilityText}>Manage availability</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </Pressable>
        <View style={styles.metrics}>
          {metrics.map((item) => (
            <MetricCard key={item.label} item={item} />
          ))}
        </View>
        <View style={styles.sectionHeader}>
          <DashboardSectionHeader title="Booking requests" link="View all" onPress={() => router.push("/(lecturer)/bookings")} />
        </View>
        <View style={styles.list}>
          {requests.map((request) => (
            <RequestCard key={request.name} request={request} />
          ))}
        </View>
        <View style={styles.schedule}>
          <ScheduleCard schedule={schedule} onPress={() => router.push("/(lecturer)/availability")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FB" },
  content: { padding: 20, paddingBottom: 40 },
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
  availabilityButton: {
    minHeight: 48,
    marginTop: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderRadius: 10,
    backgroundColor: "#003F78",
  },
  availabilityText: {
    flex: 1,
    color: "#FFFFFF",
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
