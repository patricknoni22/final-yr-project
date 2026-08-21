import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import {
  AppointmentCard,
  DashboardQuickAction,
  DashboardSectionHeader,
  StatCard,
} from "../../src/components/dashboard/DashboardCards";
import Text from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";
import { useStudentDashboard } from "../../src/features/dashboard/hooks/useDashboard";
import { useMyProfile } from "../../src/features/profile/hooks/useProfile";
import { formatBooking } from "../../src/features/bookings/utils/bookingView";
import { useBookings } from "../../src/features/bookings/hooks/useBookings";

const appointments = [
  {
    id: "sarah",
    name: "Dr. Sarah Smith",
    detail: "LDS Dept · Room 402",
    date: "Oct 12, 12:00 PM - 12:30 PM",
    status: "Approved",
    image: require("./student-img/sarah.png"),
  },
  {
    id: "james",
    name: "Prof. James Wilson",
    detail: "Mathematics · Room 105",
    date: "Oct 15, 2:30 PM - 3:00 PM",
    status: "Pending",
    image: require("./student-img/james.png"),
  },
];

export default function StudentDashboard() {
  const router = useRouter();
  const { data: dashboard } = useStudentDashboard();
  const { data: profile } = useMyProfile();
  const { data: bookingData } = useBookings();
  const upcomingBookings = (bookingData || []).filter((item) => new Date(item.startTime) >= new Date() && !["CANCELLED", "REJECTED"].includes(item.status)).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  const apiAppointments = upcomingBookings.slice(0, 3).map((item) => {
    const booking = formatBooking(item, "student", require("./student-img/profile.png"));
    return { ...booking, detail: `${booking.department} · ${booking.location}`, date: booking.dateTime };
  });
  const visibleAppointments = bookingData ? apiAppointments : appointments;
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Hello, {profile?.username?.split(" ")[0] || "Student"}!</Text>
        <Text style={styles.subtitle}>
          Ready for your academic consultations today?
        </Text>

        <View style={styles.stats}>
          <StatCard
            icon="calendar-outline"
            value={String(dashboard?.upcoming?.length || 0)}
            label="Upcoming bookings"
            accent
          />
          <StatCard icon="time-outline" value={String(dashboard?.past?.length || 0)} label="Past consultations" />
        </View>

        <View style={styles.quickCard}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <View style={styles.quickActions}>
            <DashboardQuickAction
              icon="search-outline"
              label="Find a lecturer"
              onPress={() => router.push("/(student)/search")}
            />
            <DashboardQuickAction
              icon="calendar-outline"
              label="Booking history"
              onPress={() => router.push("/(student)/bookings")}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <DashboardSectionHeader
            title="Upcoming appointments"
            link="View all"
            onPress={() => router.push("/(student)/bookings")}
          />
        </View>
        <View style={styles.list}>
          {visibleAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.name}
              appointment={appointment}
              onPress={() => router.push({
                pathname: "/(student)/booking-details/[bookingId]",
                params: {
                  bookingId: appointment.id,
                  name: appointment.name,
                  department: appointment.detail,
                  date: appointment.date,
                  time: appointment.time,
                  status: appointment.status,
                  location: appointment.location || appointment.detail.split("·").pop().trim(),
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
  stats: { marginTop: 22, flexDirection: "row", gap: 12 },
  quickCard: {
    marginTop: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E6EC",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    color: "#173A5E",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  quickActions: { marginTop: 13, gap: 10 },
  sectionHeader: { marginTop: 24, marginBottom: 12 },
  list: { gap: 14 },
});
