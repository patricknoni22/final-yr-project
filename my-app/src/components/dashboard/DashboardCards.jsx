import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "../InterText";

export function StatCard({ icon, value, label, accent }) {
  return <View style={[styles.statCard, accent && styles.statAccent]}><View style={styles.iconBox}><Ionicons name={icon} size={20} color="#003F78" /></View><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

export function AppointmentCard({ appointment, onPress }) {
  const approved = appointment.status === "Approved";
  return (
    <View style={styles.card}>
      <View style={styles.personRow}><Image source={appointment.image} style={styles.avatar} /><View style={styles.copy}><Text style={styles.name}>{appointment.name}</Text><Text style={styles.secondary}>{appointment.detail}</Text></View><Text style={[styles.status, approved ? styles.approved : styles.pending]}>{appointment.status}</Text></View>
      <View style={styles.metaRow}><Ionicons name="calendar-outline" size={16} color="#52708D" /><Text style={styles.metaText}>{appointment.date}</Text></View>
      <Pressable style={styles.lightButton} onPress={onPress}><Text style={styles.lightButtonText}>View details</Text><Ionicons name="arrow-forward" size={15} color="#003F78" /></Pressable>
    </View>
  );
}

export function MetricCard({ item }) {
  return <View style={styles.metricCard}><View style={[styles.metricIcon, { backgroundColor: item.tone }]}><Ionicons name={item.icon} size={19} color={item.color} /></View><View><Text style={styles.metricValue}>{item.value}</Text><Text style={styles.metricLabel}>{item.label}</Text></View></View>;
}

export function RequestCard({ request }) {
  return (
    <View style={styles.card}>
      <View style={styles.personRow}><Image source={request.image} style={styles.avatar} /><View style={styles.copy}><Text style={styles.name}>{request.name}</Text><Text style={styles.secondary}>{request.info}</Text></View></View>
      <View style={styles.actions}><Pressable style={styles.outlineButton}><Text style={styles.outlineText}>Decline</Text></Pressable><Pressable style={styles.primaryButton}><Text style={styles.primaryText}>Approve</Text></Pressable></View>
    </View>
  );
}

export function ScheduleCard({ schedule, onPress }) {
  return (
    <View style={styles.scheduleCard}>
      <View style={styles.scheduleHeading}><Text style={styles.scheduleTitle}>Today&apos;s Schedule</Text><Text style={styles.dateBadge}>Oct 22</Text></View>
      {schedule.map(([time, period, name, info], index) => <View key={`${time}-${name}`} style={[styles.scheduleRow, index === 0 && styles.currentRow]}><View style={styles.timeBlock}><Text style={styles.time}>{time}</Text><Text style={styles.period}>{period}</Text></View><View style={styles.copy}><Text style={styles.eventName}>{name}</Text><Text style={styles.secondary}>{info}</Text></View></View>)}
      <Pressable style={styles.lightButton} onPress={onPress}><Text style={styles.lightButtonText}>Open full calendar</Text><Ionicons name="arrow-forward" size={15} color="#003F78" /></Pressable>
    </View>
  );
}

export function DashboardQuickAction({ icon, label, onPress }) {
  return <Pressable style={styles.quickButton} onPress={onPress}><Ionicons name={icon} size={19} color="#FFFFFF" /><Text style={styles.quickText}>{label}</Text><Ionicons name="arrow-forward" size={15} color="#FFFFFF" /></Pressable>;
}

export function DashboardSectionHeader({ title, link, onPress }) {
  return <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text><Pressable onPress={onPress} hitSlop={10}><Text style={styles.sectionLink}>{link}</Text></Pressable></View>;
}

const styles = StyleSheet.create({
  statCard: { flex: 1, minHeight: 132, padding: 16, borderWidth: 1, borderColor: "#E0E6EC", borderRadius: 14, backgroundColor: "#FFFFFF" },
  statAccent: { backgroundColor: "#EDF5FC", borderColor: "#D2E4F3" }, iconBox: { width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: "#E2EDF7" },
  statValue: { marginTop: 12, color: "#102F4E", fontSize: 26, lineHeight: 30, fontWeight: "800" }, statLabel: { marginTop: 2, color: "#657687", fontSize: 13, lineHeight: 18 },
  card: { padding: 16, borderWidth: 1, borderColor: "#E0E6EC", borderRadius: 14, backgroundColor: "#FFFFFF", shadowColor: "#173A5E", shadowOpacity: 0.05, shadowRadius: 7, elevation: 2 },
  personRow: { flexDirection: "row", alignItems: "center" }, avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#E8EDF3" }, copy: { flex: 1, marginLeft: 11 },
  name: { color: "#173A5E", fontSize: 16, lineHeight: 22, fontWeight: "700" }, secondary: { marginTop: 2, color: "#71808E", fontSize: 12, lineHeight: 18 },
  status: { paddingHorizontal: 8, paddingVertical: 5, overflow: "hidden", borderRadius: 999, fontSize: 11, fontWeight: "700" }, approved: { color: "#1D7A4D", backgroundColor: "#E8F7EF" }, pending: { color: "#9A6700", backgroundColor: "#FFF5DB" },
  metaRow: { marginTop: 14, padding: 11, flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 9, backgroundColor: "#F5F8FA" }, metaText: { color: "#40566B", fontSize: 13, fontWeight: "600" },
  lightButton: { minHeight: 42, marginTop: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, borderRadius: 9, backgroundColor: "#EAF1F7" }, lightButtonText: { color: "#003F78", fontSize: 13, fontWeight: "700" },
  metricCard: { width: "48%", minHeight: 112, padding: 15, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#E0E6EC", borderRadius: 14, backgroundColor: "#FFFFFF" }, metricIcon: { width: 38, height: 38, alignItems: "center", justifyContent: "center", borderRadius: 10 }, metricValue: { color: "#102F4E", fontSize: 22, fontWeight: "800" }, metricLabel: { maxWidth: 80, marginTop: 2, color: "#657687", fontSize: 11, lineHeight: 15 },
  actions: { marginTop: 14, flexDirection: "row", gap: 10 }, outlineButton: { flex: 1, minHeight: 42, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#CBD4DC", borderRadius: 9 }, outlineText: { color: "#526577", fontSize: 13, fontWeight: "700" }, primaryButton: { flex: 1, minHeight: 42, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: "#003F78" }, primaryText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  scheduleCard: { padding: 16, borderWidth: 1, borderColor: "#E0E6EC", borderRadius: 14, backgroundColor: "#FFFFFF" }, scheduleHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, scheduleTitle: { color: "#173A5E", fontSize: 18, fontWeight: "700" }, dateBadge: { paddingHorizontal: 9, paddingVertical: 5, overflow: "hidden", borderRadius: 999, color: "#003F78", backgroundColor: "#E6F0F9", fontSize: 11, fontWeight: "700" },
  scheduleRow: { minHeight: 66, paddingVertical: 11, paddingHorizontal: 8, flexDirection: "row", alignItems: "flex-start", borderBottomWidth: 1, borderBottomColor: "#EDF0F3" }, currentRow: { borderLeftWidth: 3, borderLeftColor: "#003F78" }, timeBlock: { width: 62 }, time: { color: "#173A5E", fontSize: 13, fontWeight: "700" }, period: { marginTop: 2, color: "#71808E", fontSize: 11 }, eventName: { color: "#173A5E", fontSize: 14, fontWeight: "700" },
  quickButton: { minHeight: 46, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", gap: 9, borderRadius: 9, backgroundColor: "#003F78" }, quickText: { flex: 1, color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, sectionTitle: { color: "#173A5E", fontSize: 18, lineHeight: 24, fontWeight: "700" }, sectionLink: { color: "#003F78", fontSize: 13, fontWeight: "700" },
});
