import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import LoadingState from "../../src/components/common/LoadingState";

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
  const { data: dashboard, isLoading: dashboardLoading } = useStudentDashboard();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: bookingData, isLoading: bookingsLoading } = useBookings();
  if (dashboardLoading || profileLoading || bookingsLoading) return <LoadingState title="Preparing your dashboard" message="We’re bringing your schedule and profile together." />;
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
        <View style={styles.hero}>
          <View style={styles.heroOrb} />
          <View style={styles.welcomeRow}>
            <View style={styles.welcomeCopy}>
              <Text style={styles.heroEyebrow}>STUDENT SPACE</Text>
              <Text style={styles.heroTitle}>Hello, {profile?.username?.split(" ")[0] || "Student"}!</Text>
            </View>
            <View style={styles.todayBadge}><Text style={styles.todayText}>Today</Text></View>
          </View>
          <Text style={styles.heroSubtitle}>Ready for your academic consultations today?</Text>
          <Pressable style={styles.heroAction} onPress={() => router.push("/(student)/search")}>
            <Ionicons name="add" size={19} color="#003F78" />
            <Text style={styles.heroActionText}>Book a consultation</Text>
          </Pressable>
        </View>

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
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 44 },
  hero: { position: "relative", overflow: "hidden", padding: 22, borderRadius: 26, backgroundColor: "#003F78", shadowColor: "#003F78", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 6 },
  heroOrb: { position: "absolute", width: 150, height: 150, right: -45, top: -65, borderRadius: 75, backgroundColor: "rgba(255,255,255,0.09)" },
  welcomeRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  welcomeCopy: { flex: 1 },
  todayBadge: { marginTop: 3, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.15)" },
  todayText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  heroEyebrow: { color: "#BFD8ED", fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  heroTitle: { marginTop: 5, color: "#FFFFFF", fontSize: 27, lineHeight: 34, fontWeight: "800" },
  heroSubtitle: { marginTop: 7, maxWidth: 260, color: "#D7E6F2", fontSize: 13, lineHeight: 19 },
  heroAction: { alignSelf: "flex-start", minHeight: 43, marginTop: 18, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", gap: 7, borderRadius: 13, backgroundColor: "#FFFFFF" },
  heroActionText: { color: "#003F78", fontSize: 13, fontWeight: "700" },
  eyebrow: {
    color: "#52708D",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    marginTop: 5,
    color: "#102F4E",
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "800",
  },
  subtitle: { marginTop: 5, color: "#687887", fontSize: 14, lineHeight: 20 },
  stats: { marginTop: 18, flexDirection: "row", gap: 12 },
  quickCard: {
    marginTop: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E6EC",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#102F4E", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 14, elevation: 2,
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
